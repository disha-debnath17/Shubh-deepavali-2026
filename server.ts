/**
 * NOTE: server.ts is used strictly for local development and testing.
 * The production site is 100% static on AWS Amplify (served from /dist)
 * and does NOT depend on server.ts at runtime.
 */

import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { getRegionByName } from './src/data/regionalData.ts';

const app = express();

let parsedPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const portArgIdx = process.argv.indexOf('--port');
if (portArgIdx !== -1 && process.argv[portArgIdx + 1]) {
  const p = parseInt(process.argv[portArgIdx + 1], 10);
  if (!isNaN(p)) parsedPort = p;
}
const PORT = parsedPort;

process.on('uncaughtException', (err) => {
  console.error('Server Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Server Unhandled Rejection:', reason);
});

app.use(express.json());

// Server-only Creator Secret (configured via environment variable in local dev)
const SERVER_CREATOR_SECRET = process.env.CREATOR_SECRET || '';

// Active Creator Sessions Map: creatorSessionToken -> expiresAt (timestamp)
const creatorSessions = new Map<string, number>();

// Rate limit map for creator verification attempts (max 5 per minute per IP)
const creatorRateLimitMap = new Map<string, number[]>();
function checkCreatorRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 6;
  const timestamps = creatorRateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < windowMs);
  if (valid.length >= maxRequests) {
    creatorRateLimitMap.set(ip, valid);
    return false;
  }
  valid.push(now);
  creatorRateLimitMap.set(ip, valid);
  return true;
}

// Rate limit map for recipient verification requests (max 25 per minute per IP)
const recipientRateLimitMap = new Map<string, number[]>();
function checkRecipientRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 25;
  const timestamps = recipientRateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < windowMs);
  if (valid.length >= maxRequests) {
    recipientRateLimitMap.set(ip, valid);
    return false;
  }
  valid.push(now);
  recipientRateLimitMap.set(ip, valid);
  return true;
}

// -------------------------------------------------------------
// Secure Recipient Token Store (SHA-256 Hashed Storage)
// -------------------------------------------------------------
export interface RecipientTokenRecord {
  id: string;
  tokenHash: string; // SHA-256 hash of the access token
  role: string;      // 'mom', 'dad', 'sister', 'brother', 'bestie', 'friend', 'someoneSpecial', 'default'
  recipientName: string;
  createdAt: number;
  expiresAt: number; // 0 for non-expiring, otherwise timestamp ms
  revoked: boolean;
  legacyCode?: string; // Stored to preserve backward compatibility for already shared links
}

const TOKENS_FILE = path.join(__dirname, 'data', 'recipient_tokens.json');

// Legacy pre-seeded codes mapped with SHA-256 hashes for seamless migration without breaking older links
const SEED_LEGACY_CODES: { code: string; role: string; name: string }[] = [
  { code: 'maa-x7q2', role: 'mom', name: 'Maa' },
  { code: 'papa-k9d4', role: 'dad', name: 'Papa' },
  { code: 'di-s5v3', role: 'sister', name: 'Sister' },
  { code: 'bhai-b7r1', role: 'brother', name: 'Brother' },
  { code: 'bestie-y6n2', role: 'bestie', name: 'Bestie' },
  { code: 'yaara-f8c5', role: 'friend', name: 'Friend' },
];

let recipientTokens: RecipientTokenRecord[] = [];

// Initialize recipient tokens file
try {
  const dataDir = path.dirname(TOKENS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (fs.existsSync(TOKENS_FILE)) {
    const raw = fs.readFileSync(TOKENS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      recipientTokens = parsed;
    }
  }

  // Ensure legacy migration seeds are present and hashed
  for (const legacy of SEED_LEGACY_CODES) {
    const hash = crypto.createHash('sha256').update(legacy.code).digest('hex');
    const existing = recipientTokens.find(
      (t) => t.tokenHash === hash || t.legacyCode === legacy.code
    );
    if (!existing) {
      recipientTokens.push({
        id: `token_${legacy.role}_legacy`,
        tokenHash: hash,
        role: legacy.role,
        recipientName: legacy.name,
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
        expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 365, // valid for 1 year
        revoked: false,
        legacyCode: legacy.code,
      });
    }
  }

  fs.writeFileSync(TOKENS_FILE, JSON.stringify(recipientTokens, null, 2), 'utf-8');
} catch (e) {
  console.warn('Could not initialize recipient tokens store:', e);
}

function persistRecipientTokens() {
  try {
    const dataDir = path.dirname(TOKENS_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(TOKENS_FILE, JSON.stringify(recipientTokens, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Failed to persist recipient tokens:', e);
  }
}

// In-memory rate limiting stores
const geminiRateLimitMap = new Map<string, number[]>();
function checkGeminiRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 15;
  const timestamps = geminiRateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= maxRequests) {
    geminiRateLimitMap.set(ip, valid);
    const oldest = valid[0];
    const retryAfter = Math.ceil((windowMs - (now - oldest)) / 1000);
    return { allowed: false, retryAfterSeconds: Math.max(1, retryAfter) };
  }
  valid.push(now);
  geminiRateLimitMap.set(ip, valid);
  return { allowed: true, retryAfterSeconds: 0 };
}

const wishRateLimitMap = new Map<string, number[]>();
function checkWishRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 8;
  const timestamps = wishRateLimitMap.get(ip) || [];
  const valid = timestamps.filter((t) => now - t < windowMs);

  if (valid.length >= maxRequests) {
    wishRateLimitMap.set(ip, valid);
    return false;
  }
  valid.push(now);
  wishRateLimitMap.set(ip, valid);
  return true;
}

// In-memory set of reports per IP to prevent duplicate false reporting
const wishReportsByIp = new Map<string, Set<string>>();

// Initialize Google Gemini SDK
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('GEMINI_API_KEY is not set in environment. Gemini features will use graceful high-quality fallbacks.');
}

// -------------------------------------------------------------
// Shared Wish Across India Store
// -------------------------------------------------------------
export interface SharedWish {
  id: string;
  name?: string;
  state?: string;
  wish: string;
  timestamp: number;
  isSample: boolean;
  isVerified?: boolean;
  reports?: number;
}

const WISHES_FILE = path.join(__dirname, 'data', 'shared_wishes.json');

const INITIAL_SEED_WISHES: SharedWish[] = [
  {
    id: 'seed-wb',
    name: 'Ananya',
    state: 'West Bengal',
    wish: 'May Maa Kali’s divine light remove all darkness and bring peaceful joy to every family across India! ✨',
    timestamp: Date.now() - 1000 * 60 * 180,
    isSample: true,
  },
  {
    id: 'seed-mh',
    name: 'Siddharth',
    state: 'Maharashtra',
    wish: 'Crisp faral, sweet laddoos, and golden moments of laughter. Shubh Deepavali to all our brothers and sisters!',
    timestamp: Date.now() - 1000 * 60 * 150,
    isSample: true,
  },
  {
    id: 'seed-gj',
    name: 'Bhavna',
    state: 'Gujarat',
    wish: 'Saal Mubarak! May this festival of lights spark prosperous new ventures and health in every Indian home. 🪔',
    timestamp: Date.now() - 1000 * 60 * 120,
    isSample: true,
  },
  {
    id: 'seed-ka',
    name: 'Raghav',
    state: 'Karnataka',
    wish: 'From Namma Bengaluru, wishing every home deep serenity, sweet treats, and glowing earthen lamps.',
    timestamp: Date.now() - 1000 * 60 * 90,
    isSample: true,
  },
  {
    id: 'seed-pb',
    name: 'Harpreet',
    state: 'Punjab',
    wish: 'Bandi Chhor Divas & Diwali greetings! May light, liberty, and righteousness illuminate every family’s path.',
    timestamp: Date.now() - 1000 * 60 * 60,
    isSample: true,
  },
  {
    id: 'seed-up',
    name: 'Aditi',
    state: 'Uttar Pradesh',
    wish: 'From the sacred ghats of Varanasi and Ayodhya, praying for divine health, unity, and endless love! ❤️',
    timestamp: Date.now() - 1000 * 60 * 25,
    isSample: true,
  },
];

let sharedWishes: SharedWish[] = [...INITIAL_SEED_WISHES];

// Try reading stored wishes from disk
try {
  if (fs.existsSync(WISHES_FILE)) {
    const raw = fs.readFileSync(WISHES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      sharedWishes = parsed;
    }
  } else {
    const dataDir = path.dirname(WISHES_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(WISHES_FILE, JSON.stringify(sharedWishes, null, 2), 'utf-8');
  }
} catch (e) {
  console.warn('Could not read/write shared wishes file, maintaining in-memory:', e);
}

function persistWishes() {
  try {
    const dataDir = path.dirname(WISHES_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(WISHES_FILE, JSON.stringify(sharedWishes, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Failed to persist wishes to disk:', e);
  }
}

// -------------------------------------------------------------
// API Endpoints: Shared Wishes
// -------------------------------------------------------------
app.get('/api/wishes', (_req: Request, res: Response) => {
  // Filter out reported wishes (reports >= 3)
  const activeWishes = sharedWishes.filter((w) => (w.reports || 0) < 3);
  res.json({
    success: true,
    wishes: activeWishes,
    totalCount: activeWishes.length,
    realCount: activeWishes.filter((w) => !w.isSample).length,
  });
});

app.post('/api/wishes', (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkWishRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Submission rate limit reached. Please wait a moment before sending another festive wish.',
    });
  }

  const { name, recipientName, state, wish } = req.body;

  if (!wish || typeof wish !== 'string' || wish.trim().length < 3) {
    return res.status(400).json({ success: false, error: 'Wish content is required (min 3 chars)' });
  }

  // Prevent script injections, links, and excessively long content
  if (/<[^>]*>|https?:\/\/|www\./i.test(wish)) {
    return res.status(400).json({ success: false, error: 'Greetings must not contain external links or code.' });
  }

  const cleanWish = wish.trim().slice(0, 160);
  const cleanName = typeof name === 'string' && name.trim() ? name.trim().slice(0, 40) : undefined;
  const cleanRecipient = typeof recipientName === 'string' && recipientName.trim() ? recipientName.trim().slice(0, 40) : undefined;
  const cleanState = typeof state === 'string' && state.trim() ? state.trim().slice(0, 60) : undefined;

  const newWish: SharedWish = {
    id: `wish_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: cleanName,
    state: cleanState,
    wish: cleanWish,
    timestamp: Date.now(),
    isSample: false,
    isVerified: false, // Never mark newly submitted wishes as verified automatically
    reports: 0,
  };

  // Preserve initial seed wishes and store up to 100 real visitor submissions
  const seeds = sharedWishes.filter((w) => w.isSample);
  const reals = [...sharedWishes.filter((w) => !w.isSample), newWish];
  sharedWishes = [...seeds, ...reals.slice(-100)];

  persistWishes();

  res.status(201).json({
    success: true,
    wish: newWish,
    wishes: sharedWishes.filter((w) => (w.reports || 0) < 3),
  });
});

app.post('/api/wishes/:id/report', (req: Request, res: Response) => {
  const { id } = req.params;
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

  const userReportedSet = wishReportsByIp.get(clientIp) || new Set<string>();
  if (userReportedSet.has(id)) {
    return res.status(400).json({
      success: false,
      error: 'You have already reported this wish for review.',
      alreadyReported: true,
    });
  }

  const wish = sharedWishes.find((w) => w.id === id);
  if (!wish) {
    return res.status(404).json({ success: false, error: 'Wish not found' });
  }

  userReportedSet.add(id);
  wishReportsByIp.set(clientIp, userReportedSet);

  wish.reports = (wish.reports || 0) + 1;
  persistWishes();

  res.json({
    success: true,
    reports: wish.reports,
    hidden: wish.reports >= 3,
    message: wish.reports >= 3 ? 'Wish flagged and hidden for moderation review' : 'Wish reported successfully',
  });
});

app.delete('/api/wishes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const initialLen = sharedWishes.length;
  sharedWishes = sharedWishes.filter((w) => w.id !== id);

  if (sharedWishes.length === initialLen) {
    return res.status(404).json({ success: false, error: 'Wish not found' });
  }

  persistWishes();
  res.json({ success: true, message: 'Wish removed successfully' });
});

// -------------------------------------------------------------
// API Endpoints: Creator Authentication & Recipient Security
// -------------------------------------------------------------

// Helper middleware to authenticate creator sessions
function requireCreatorAuth(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Creator authorization required' });
  }

  const token = authHeader.slice(7).trim();
  const expiresAt = creatorSessions.get(token);

  if (!expiresAt || Date.now() > expiresAt) {
    if (expiresAt) creatorSessions.delete(token);
    return res.status(401).json({ success: false, error: 'Creator session expired. Please verify again.' });
  }

  next();
}

/**
 * POST /api/creator/verify
 * Validates creator secret exclusively on the server with brute-force rate-limiting.
 * Issues a 24-hour cryptographically secure session token.
 */
app.post('/api/creator/verify', (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkCreatorRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many verification attempts. Please wait 1 minute before trying again.',
    });
  }

  const { secret } = req.body;
  if (!secret || typeof secret !== 'string') {
    return res.status(400).json({ success: false, error: 'Creator secret credential is required.' });
  }

  const cleanSecret = secret.trim();
  const isMatch =
    cleanSecret.length === SERVER_CREATOR_SECRET.length &&
    crypto.timingSafeEqual(Buffer.from(cleanSecret), Buffer.from(SERVER_CREATOR_SECRET));

  if (!isMatch) {
    return res.status(401).json({ success: false, error: 'Invalid creator credentials.' });
  }

  // Generate 24h random session token
  const sessionToken = `c_sess_${crypto.randomBytes(24).toString('base64url')}`;
  const sessionExpiry = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
  creatorSessions.set(sessionToken, sessionExpiry);

  res.json({
    success: true,
    creatorToken: sessionToken,
    expiresAt: sessionExpiry,
  });
});

/**
 * GET /api/creator/tokens
 * Lists managed recipient tokens for creator mode.
 * Sensitive raw hashes are NOT exposed in public responses.
 */
app.get('/api/creator/tokens', requireCreatorAuth, (_req: Request, res: Response) => {
  // Purge any expired non-persisted tokens from memory view or mark
  const sanitized = recipientTokens.map((t) => ({
    id: t.id,
    role: t.role,
    recipientName: t.recipientName,
    createdAt: t.createdAt,
    expiresAt: t.expiresAt,
    isExpired: t.expiresAt > 0 && Date.now() > t.expiresAt,
    revoked: t.revoked,
    legacyCode: t.legacyCode,
  }));

  res.json({
    success: true,
    tokens: sanitized,
  });
});

/**
 * POST /api/creator/tokens
 * Generates a strong random access token for a private recipient link.
 * Calculates and stores SHA-256 token hash; raw token is only returned to creator upon creation.
 */
app.post('/api/creator/tokens', requireCreatorAuth, (req: Request, res: Response) => {
  const { role, recipientName, expiresInDays = 30 } = req.body;

  const validRoles = ['mom', 'dad', 'sister', 'brother', 'bestie', 'friend', 'someoneSpecial', 'default'];
  const cleanRole = typeof role === 'string' && validRoles.includes(role) ? role : 'default';
  const cleanName = typeof recipientName === 'string' && recipientName.trim() ? recipientName.trim().slice(0, 40) : cleanRole;

  const days = Math.min(365, Math.max(1, parseInt(String(expiresInDays), 10) || 30));
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * days;

  // Generate strong unguessable random token with 20 base64url bytes
  const rawToken = `sec_${crypto.randomBytes(20).toString('base64url')}`;
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  const newRecord: RecipientTokenRecord = {
    id: `token_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    tokenHash,
    role: cleanRole,
    recipientName: cleanName,
    createdAt: Date.now(),
    expiresAt,
    revoked: false,
  };

  recipientTokens.push(newRecord);
  persistRecipientTokens();

  res.status(201).json({
    success: true,
    token: rawToken, // Returned strictly to the creator here so they can copy the private link
    record: {
      id: newRecord.id,
      role: newRecord.role,
      recipientName: newRecord.recipientName,
      createdAt: newRecord.createdAt,
      expiresAt: newRecord.expiresAt,
      revoked: newRecord.revoked,
    },
  });
});

/**
 * POST /api/creator/tokens/:id/revoke
 * Revokes a recipient link so it can no longer be used.
 */
app.post('/api/creator/tokens/:id/revoke', requireCreatorAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const tokenRecord = recipientTokens.find((t) => t.id === id);

  if (!tokenRecord) {
    return res.status(404).json({ success: false, error: 'Recipient token record not found.' });
  }

  tokenRecord.revoked = true;
  persistRecipientTokens();

  res.json({
    success: true,
    message: `Recipient access for ${tokenRecord.recipientName} has been revoked.`,
    record: {
      id: tokenRecord.id,
      role: tokenRecord.role,
      revoked: true,
    },
  });
});

/**
 * POST /api/recipient/verify
 * Validates a private recipient link token against SHA-256 stored hashes or legacy codes.
 * Returns only the authorized recipient information.
 * Handles token revocation, expiry, and unauthorized access attempts.
 */
app.post('/api/recipient/verify', (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  if (!checkRecipientRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Too many verification requests. Please wait a moment.',
    });
  }

  const { token } = req.body;
  if (!token || typeof token !== 'string' || !token.trim()) {
    return res.status(400).json({ success: false, valid: false, error: 'Token is required.' });
  }

  const cleanToken = token.trim();
  const tokenHash = crypto.createHash('sha256').update(cleanToken).digest('hex');
  const tokenHashLower = crypto.createHash('sha256').update(cleanToken.toLowerCase()).digest('hex');

  // Search by SHA-256 hash or legacy migration code
  const record = recipientTokens.find(
    (t) =>
      t.tokenHash === tokenHash ||
      t.tokenHash === tokenHashLower ||
      (t.legacyCode && t.legacyCode.toLowerCase() === cleanToken.toLowerCase())
  );

  if (!record) {
    return res.status(404).json({
      success: false,
      valid: false,
      error: 'Invalid or unknown recipient token.',
    });
  }

  // Check revocation
  if (record.revoked) {
    return res.status(403).json({
      success: false,
      valid: false,
      revoked: true,
      error: 'This recipient link has been revoked.',
    });
  }

  // Check expiry
  if (record.expiresAt && record.expiresAt > 0 && Date.now() > record.expiresAt) {
    return res.status(403).json({
      success: false,
      valid: false,
      expired: true,
      error: 'This recipient link has expired.',
    });
  }

  // Valid, active recipient token verified!
  res.json({
    success: true,
    valid: true,
    role: record.role,
    recipientName: record.recipientName,
    expiresAt: record.expiresAt,
  });
});

// -------------------------------------------------------------
// API Endpoints: Gemini AI Status & Personalized Greetings
// -------------------------------------------------------------
app.get('/api/gemini/status', async (_req: Request, res: Response) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
  let liveTestSuccess = false;
  let testError = null;

  if (ai) {
    try {
      const ping = await Promise.race([
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: 'Say "Shubh Deepavali" in 3 words.',
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Test timeout after 6s')), 6000)
        ),
      ]);
      if (ping && ping.text) {
        liveTestSuccess = true;
      }
    } catch (e: any) {
      testError = e?.message || String(e);
    }
  }

  res.json({
    success: true,
    available: hasKey && Boolean(ai),
    model: 'gemini-3.8-flash',
    liveTestSuccess,
    testError: testError ? String(testError).slice(0, 200) : null,
  });
});

app.post('/api/gemini/greeting', async (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const rateCheck = checkGeminiRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      success: false,
      error: `AI rate limit reached. Please wait ${rateCheck.retryAfterSeconds} seconds before generating another greeting.`,
      retryAfter: rateCheck.retryAfterSeconds,
    });
  }

  const {
    relationship = 'parents',
    recipientName = '',
    senderName = '',
    tone = 'emotional',
    language = 'en',
    state = 'All of India',
    personalMemory = '',
  } = req.body;

  // Normalize tone to one of the 5 requested tones: emotional, traditional, heartwarming, funny, spiritual
  let normalizedTone: 'emotional' | 'traditional' | 'heartwarming' | 'funny' | 'spiritual' = 'emotional';
  const rawTone = String(tone).trim().toLowerCase();
  if (rawTone === 'traditional' || rawTone === 'auspicious') normalizedTone = 'traditional';
  else if (rawTone === 'heartwarming' || rawTone === 'poetic') normalizedTone = 'heartwarming';
  else if (rawTone === 'funny' || rawTone === 'playful') normalizedTone = 'funny';
  else if (rawTone === 'spiritual') normalizedTone = 'spiritual';
  else normalizedTone = 'emotional';

  const validLang = language === 'hi' ? 'hi' : language === 'bn' ? 'bn' : 'en';
  const cleanRecipient = typeof recipientName === 'string' ? recipientName.trim().slice(0, 50) : '';
  const cleanSender = typeof senderName === 'string' ? senderName.trim().slice(0, 50) : '';
  const cleanMemory = typeof personalMemory === 'string' ? personalMemory.trim().slice(0, 250) : '';
  const cleanRel = typeof relationship === 'string' ? relationship.trim().slice(0, 40) : 'family';

  // Retrieve curated regional dossier from the verified database
  const region = getRegionByName(state);
  const langKey = validLang;

  const festivalName = region.festivalName[langKey] || region.festivalName.en;
  const culturalMeaning = region.meaning ? (region.meaning[langKey] || region.meaning.en) : 'Celebration of light conquering darkness';
  const howObserved = region.howObserved ? (region.howObserved[langKey] || region.howObserved.en) : 'Lighting earthen diyas and sharing sweets with loved ones';
  const whenObserved = region.whenObserved ? (region.whenObserved[langKey] || region.whenObserved.en) : 'Kartik Amavasya';
  const communityNuance = region.variations ? (region.variations[langKey] || region.variations.en) : 'Celebrated across communities with unique regional dishes and togetherness';
  const decorArt = region.decorTradition ? `${region.decorTradition.artName[langKey] || region.decorTradition.artName.en} (${region.decorTradition.artDesc[langKey] || region.decorTradition.artDesc.en})` : 'Traditional floral rangoli';
  const diyaInfo = region.decorTradition ? `${region.decorTradition.diyaName[langKey] || region.decorTradition.diyaName.en} (${region.decorTradition.diyaDesc[langKey] || region.decorTradition.diyaDesc.en})` : 'Clay diyas';
  const foodSpecialty = region.foodSpecialty ? `${region.foodSpecialty.name[langKey] || region.foodSpecialty.name.en}: ${region.foodSpecialty.desc[langKey] || region.foodSpecialty.desc.en}` : 'Festive sweets';
  const keyTraditions = region.keyTraditions && region.keyTraditions.length > 0
    ? region.keyTraditions.map((t) => `${t.title[langKey] || t.title.en} (${t.why[langKey] || t.why.en})`).join('; ')
    : 'Lighting diyas and family prayers';

  const isEasternKaliTradition = region.id === 'west-bengal' || region.id === 'tripura' || region.id === 'assam';

  const prompt = `Compose an authentic, deeply personalized, and culturally accurate Diwali greeting card letter.

CURATED REGIONAL CULTURAL CONTEXT (Use ONLY the details supplied below; do NOT invent customs):
- Region: ${region.name} (${region.isUT ? 'Union Territory' : 'Indian State'})
- Festival Name in Region: ${festivalName}
- Civilizational Meaning: ${culturalMeaning}
- How Traditionally Observed: ${howObserved}
- Sacred Calendar Timing: ${whenObserved}
- Regional/Community Nuance: ${communityNuance}
- Sacred Decor & Lamps: ${decorArt}; ${diyaInfo}
- Authentic Food Specialty: ${foodSpecialty}
- Key Traditions: ${keyTraditions}

GREETING PARAMETERS:
- Sender Name: ${cleanSender || 'Your Loved One'}
- Recipient Name: ${cleanRecipient || 'Dear Loved One'}
- Relationship: ${cleanRel}
- Selected Tone: ${normalizedTone} (Options: Emotional, Traditional, Heartwarming, Funny, Spiritual)
- Target Language: ${
    validLang === 'hi'
      ? 'Hindi written naturally and gracefully in Devanagari script'
      : validLang === 'bn'
      ? 'Bengali written beautifully and warmly in Bengali script'
      : 'English with occasional graceful festive Indian words'
  }
- Optional Personal Memory from Sender: ${cleanMemory ? `"${cleanMemory}"` : 'None specified'}

STRICT CULTURAL ACCURACY SAFEGUARDS (MANDATORY):
1. NEVER invent religious rituals, deities, or cultural customs. Use only the authentic regional information provided above.
2. NEVER assume every person from this region follows the identical ritual. Respect diversity and focus on family kinship and shared warmth.
3. NEVER insert Maa Kali references unless the region is explicitly West Bengal or eastern Shakta tradition (isEasternKaliTradition = ${isEasternKaliTradition}). For other states, focus on universal earthen diyas, festive sweets, and golden light.
4. Do NOT force religious language when the tone is Funny or Heartwarming, or when general Diwali greetings are requested.
5. If a personal memory was provided (${cleanMemory ? `"${cleanMemory}"` : 'None'}), weave it naturally, warmly, and seamlessly into paragraph 2.

TONE GUIDELINES:
- Emotional: Moving, nostalgic, heartfelt tears of joy, deep love, appreciation for family and togetherness across distances.
- Traditional: Dignified, respectful, honoring cultural heritage, elders' blessings, auspiciousness, and sacred light.
- Heartwarming: Cozy, affectionate, cheerful, uplifting, focused on sweet moments, warm smiles, and friendship.
- Funny: Playful, witty, affectionate teasing (e.g., competing for the last piece of mithai or kaju katli, dodging noisy patakhas, post-feast food coma), while retaining genuine love.
- Spiritual: Focuses on the eternal inner light ("Tamaso Ma Jyotirgamaya"), gratitude, peace, truth, and spiritual awakening.

JSON STRUCTURE REQUIREMENTS:
{
  "salutation": "Respectful opening addressing the recipient (e.g., 'Dearest Maa & Papa,' or 'आदरणीय माँ और पिताजी,' or 'স্নেহের ভাই,')",
  "p1": "Opening paragraph connecting the festival of lights with your bond and love, welcoming Diwali in ${region.name}",
  "p2": "Second paragraph recalling sensory festive moments (authentic sweets like ${region.foodSpecialty?.name[validLang] || 'mithai'}, lamps, and the personal memory if supplied)",
  "p3": "Third paragraph expressing prayers/wishes for health, joy, and peace matching the ${normalizedTone} tone",
  "closing": "Loving sign-off matching relationship (e.g., 'With all my love and gratitude, ${cleanSender || ''}')"
}

Return strictly valid JSON matching the schema.`;

  if (ai) {
    try {
      const responsePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are a distinguished cultural writer and poet of Indian festivals. You write genuine, emotionally evocative, and culturally accurate Diwali messages that resonate with families across Indian states and languages.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              salutation: { type: Type.STRING },
              p1: { type: Type.STRING },
              p2: { type: Type.STRING },
              p3: { type: Type.STRING },
              closing: { type: Type.STRING },
            },
            required: ['salutation', 'p1', 'p2', 'p3', 'closing'],
          },
        },
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API call timed out after 12s')), 12000)
      );

      const response = await Promise.race([responsePromise, timeoutPromise]);
      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json({
          success: true,
          model: 'gemini-3.8-flash',
          isGemini: true,
          greeting: parsed,
        });
      }
    } catch (err: any) {
      console.warn('Gemini API call note (using regional fallback):', err?.message || err);
    }
  }

  // Graceful, culturally authentic regional fallback
  const fallbackGreeting = generateFallbackGreeting(
    cleanRel,
    cleanRecipient,
    cleanSender,
    state,
    normalizedTone,
    validLang,
    cleanMemory
  );

  return res.json({
    success: true,
    model: 'fallback-cultural-engine',
    isGemini: false,
    greeting: fallbackGreeting,
  });
});

/**
 * High-quality, culturally authentic fallback engine that personalizes greetings
 * based on relationship, region/state, selected tone (emotional, traditional, heartwarming, funny, spiritual),
 * personal memories, and sender details across English, Hindi, and Bengali.
 */
function generateFallbackGreeting(
  relationship: string,
  recipientName: string,
  senderName: string,
  state: string,
  tone: 'emotional' | 'traditional' | 'heartwarming' | 'funny' | 'spiritual',
  language: 'en' | 'hi' | 'bn',
  personalMemory: string
) {
  const region = getRegionByName(state);
  const cleanMemory = (personalMemory || '').trim();
  const from = senderName ? senderName.trim() : '';
  const to = recipientName ? recipientName.trim() : '';

  const foodName = region.foodSpecialty
    ? region.foodSpecialty.name[language] || region.foodSpecialty.name.en
    : language === 'hi' ? 'दिवाली मिष्ठान' : language === 'bn' ? 'দীপাবলির মিষ্টি' : 'festive sweets';

  const decorItem = region.decorTradition
    ? region.decorTradition.diyaName[language] || region.decorTradition.diyaName.en
    : language === 'hi' ? 'माटी के दीये' : language === 'bn' ? 'মাটির প্রদীপ' : 'earthen diyas';

  // -------------------------------------------------------------
  // HINDI
  // -------------------------------------------------------------
  if (language === 'hi') {
    let sal = `प्रिय ${to || 'स्वजन'},`;
    if (relationship === 'parents') sal = `आदरणीय ${to || 'माँ और पिताजी'},`;
    else if (relationship === 'grandparents') sal = `पूज्य ${to || 'दादाजी और दादीजी'},`;
    else if (relationship === 'teachers') sal = `परम आदरणीय ${to || 'गुरुदेव'},`;
    else if (relationship === 'partner') sal = `मेरे हमसफ़र ${to || 'प्रिये'},`;
    else if (relationship === 'siblings') sal = `मेरी प्यारी ${to || 'दीदी / भाई'},`;
    else if (relationship === 'friends') sal = `मेरे अज़ीज़ दोस्त ${to || 'मित्र'},`;

    let p1 = '';
    if (tone === 'funny') {
      p1 = `दिवाली आ गई है और इसके साथ ही थाली से सबसे पहले ${foodName} पर बिना पूछे हाथ साफ़ करने का पावन हक़ भी! आपके साथ त्योहार मनाना हमेशा हंसी, मस्ती और खुशियों का धमाकेदार पटाखा बन जाता है।`;
    } else if (tone === 'spiritual') {
      p1 = `\"तमसो मा ज्योतिर्गमय\" – अंधकार से हमें प्रकाश की ओर ले चलें। इस पावन दीपोत्सव पर जब हर देहरी पर दीप जलते हैं, ईश्वर से प्रार्थना है कि आपके अंतर्मन में शांति, सत्य और आत्मिक ज्ञान का दिव्य आलोक सदा जगमगाता रहे।`;
    } else if (tone === 'traditional') {
      p1 = `${region.name} के इस पावन दीपोत्सव पर, जब घर-घर में ${decorItem} सजते हैं और शुभता का स्वागत होता है, मैं आपके और पूरे परिवार के लिए मंगल, आरोग्य और दीर्घायु की कामना करता हूँ।`;
    } else if (tone === 'heartwarming') {
      p1 = `जैसे एक नन्हा दीया पूरी रात को रोशन कर देता है, ठीक वैसे ही आपकी स्नेहभरी मुस्कान हमारे जीवन को रोशनी और सुकून से भर देती है। इस त्योहार पर आपका साथ हमारे लिए सबसे अनमोल उपहार है।`;
    } else {
      // emotional default
      p1 = `दीपों के इस पावन उत्सव पर मेरा दिल आपके प्रति असीम कृतज्ञता और स्नेह से भर जाता है। दूर रहकर भी घर की यादें और आपका दुलार मेरे दिल में एक अखंड ज्योति की तरह जलता रहता है।`;
    }

    let p2 = '';
    if (cleanMemory) {
      p2 = `आज जब घर-घर में खुशियां सज रही हैं, मुझे विशेष रूप से याद आ रहा है—\"${cleanMemory}\"। ऐसी ही अनमोल यादें और ${foodName} की मिठास त्योहार को सचमुच जीवंत बना देती हैं।`;
    } else {
      p2 = `${region.name} की पावन मिट्टी की खुशबू, देहरी पर सजे ${decorItem}, और थाली में सजी स्वादिष्ट ${foodName} के साथ अपनों की वो मीठी हंसी आज हर कोने को महका रही है।`;
    }

    let p3 = '';
    if (tone === 'funny') {
      p3 = `कामना है कि इस साल आपको ढेर सारे उपहार मिलें, मिठाई का डिब्बा कभी खाली न हो और दिवाली की सफाई में आपको कम से कम काम करना पड़े! शुभ दीपावली! 🪔✨`;
    } else if (tone === 'spiritual') {
      p3 = `परमात्मा आपके जीवन से समस्त संशय और अंधकार मिटाएं, और आपके हृदय को परमानंद, करुणा और निर्मल शांति से आलोकित रखें।`;
    } else if (tone === 'traditional') {
      p3 = `माँ महालक्ष्मी और विघ्नहर्ता गणेश आपके भंडार धन-धान्य और सद्बुद्धि से भरें। सुख-समृद्धि आपके द्वार पर सदा विराजित रहे।`;
    } else if (tone === 'heartwarming') {
      p3 = `आने वाले साल का हर दिन आपके लिए नई उमंग, सच्चे रिश्तों की गर्माहट और अनगिनत खुशियां लेकर आए। हमेशा मुस्कुराते रहिए!`;
    } else {
      p3 = `ईश्वर से प्रार्थना है कि आने वाला साल आपके लिए उत्तम स्वास्थ्य, मन की असीम शांति, सफलता और अपनों का अटूट प्यार लेकर आए।`;
    }

    const closeSign = from ? `सप्रेम, ${from}` : 'सप्रेम प्रणाम एवं ढेर सारे प्यार सहित,';

    return { salutation: sal, p1, p2, p3, closing: closeSign };
  }

  // -------------------------------------------------------------
  // BENGALI
  // -------------------------------------------------------------
  if (language === 'bn') {
    let sal = `প্রিয় ${to || 'সুজন'},`;
    if (relationship === 'parents') sal = `শ্রদ্ধেয় ${to || 'মা ও বাবা'},`;
    else if (relationship === 'grandparents') sal = `শ্রদ্ধাশ্পদ ${to || 'দাদু ও দিদিমা'},`;
    else if (relationship === 'teachers') sal = `শ্রদ্ধেয় ${to || 'শিক্ষক মহাশয়'},`;
    else if (relationship === 'partner') sal = `আমার প্রিয়তম ${to || 'ভালোবাসা'},`;
    else if (relationship === 'siblings') sal = `স্নেহের ${to || 'ভাই / দিদি'},`;
    else if (relationship === 'friends') sal = `আমার প্রিয় বন্ধু ${to || 'দোস্ত'},`;

    let p1 = '';
    if (tone === 'funny') {
      p1 = `দীপাবলি এসে গেছে, আর এর মানেই হলো লুকিয়ে সব ${foodName} সাবাড় করা আর একসঙ্গে হাসির হুল্লোড়ে মেতে ওঠার সেই মধুর সময়! তোমার সাথে কাটানো প্রতিটি মুহূর্তই আনন্দের জমজমাট আতশবাজি।`;
    } else if (tone === 'spiritual') {
      p1 = `\"তমসো মা জ্যোতির্গময়\" – অন্ধকার থেকে পরম আলোর পথে যাত্রা। এই পুণ্য দীপাবলিতে মাটির প্রদীপের স্নিগ্ধ শিখা আপনার অন্তরে অক্ষয় শান্তি, বিবেক ও জ্ঞানের আলোকধারা উন্মোচিত করুক।`;
    } else if (tone === 'traditional') {
      p1 = `${region.name}-এর ঐতিহ্যবাহী এই পুণ্য তিথিতে, যখন গৃহদ্বারে সাজানো হয় ${decorItem}, আমি আপনার ও আপনার পরিবারের সর্বাঙ্গীন মঙ্গল ও সমৃদ্ধি কামনা করি।`;
    } else if (tone === 'heartwarming') {
      p1 = `অমাবস্যার নিবিড় আঁধারে যেমন একটি প্রদীপ পুরো ঘর উদ্ভাসিত করে, তেমনি আপনার অমলিন স্নেহ ও আন্তরিকতা আমার জীবনকে চিরকাল মধুর সুর ও আলোয় ভরে রাখে।`;
    } else {
      // emotional default
      p1 = `দীপাবলির এই আনন্দঘন লগ্নে আমার হৃদয় আপনার প্রতি গভীর ভালোবাসা ও শ্রদ্ধায় ভরে উঠেছে। দূরত্বের সীমানা পেরিয়েও আপনার ভালোবাসা আমার হৃদয়ে এক অনির্বাণ শিখার মতো জ্বলজ্বল করছে।`;
    }

    let p2 = '';
    if (cleanMemory) {
      p2 = `আজকের এই আলোকময় সন্ধ্যায় বিশেষ মনে পড়ছে আমাদের সেই স্মৃতি—\"${cleanMemory}\"। এই আন্তরিক স্মৃতিগুলো আর সুস্বাদু ${foodName}-এর মিষ্টি সুবাসই দীপাবলিকে চিরন্তন করে তোলে।`;
    } else {
      p2 = `${region.name}-এর সাংস্কৃতিক আমেজ, গৃহকোণে সাজানো ${decorItem}, আর থালায় সাজানো লোভনীয় ${foodName} যেন পরিবারের সকলের হাসিমুখের আনন্দকে আরও দ্বিগুণ করে তুলেছে।`;
    }

    let p3 = '';
    if (tone === 'funny') {
      p3 = `প্রার্থনা করি এই উৎসবে প্রচুর উপহার আসুক, মিষ্টির থালা যেন কখনোই শেষ না হয় এবং সারা বছর তোমার মুখে এই মিষ্টি হাসি অটুট থাকুক! শুভ দীপাবলি! 🪔✨`;
    } else if (tone === 'spiritual') {
      p3 = `ঈশ্বর আপনার জীবন থেকে সমস্ত দ্বিধা ও অন্ধকার দূর করে দিন, এবং আত্মাকে অপার আনন্দ ও পবিত্র শান্তিতে ভরিয়ে তুলুন।`;
    } else if (tone === 'traditional') {
      p3 = `মা লক্ষ্মীর আশীর্বাদে আপনার গৃহে সুখ, সুস্বাস্থ্য, দীর্ঘায়ু ও অফুরন্ত সমৃদ্ধি সর্বদা বিরাজ করুক।`;
    } else if (tone === 'heartwarming') {
      p3 = `আসন্ন প্রতিটি দিন আপনার জন্য বয়ে আনুক নতুন সম্ভাবনার আলো, সুস্বাস্থ্য এবং নিখাদ ভালোবাসার পরশ।`;
    } else {
      p3 = `আসন্ন বছরটি আপনার জীবনে বয়ে আনুক অফুরন্ত সাফল্য, পরিবারের নিবিড় ঐক্য, নিখাদ আনন্দ ও সুস্বাস্থ্য।`;
    }

    const closeSign = from ? `ভালোবাসাসহ, ${from}` : 'প্রণাম ও বুকভরা ভালোবাসাসহ,';

    return { salutation: sal, p1, p2, p3, closing: closeSign };
  }

  // -------------------------------------------------------------
  // ENGLISH
  // -------------------------------------------------------------
  let sal = `Dearest ${to || 'Loved One'},`;
  if (relationship === 'parents') sal = `Dearest ${to || 'Maa & Papa'},`;
  else if (relationship === 'grandparents') sal = `Beloved ${to || 'Dada & Dadi'},`;
  else if (relationship === 'teachers') sal = `Respected ${to || 'Teacher'},`;
  else if (relationship === 'partner') sal = `My Dearest ${to || 'Love'},`;
  else if (relationship === 'siblings') sal = `Dearest ${to || 'Sister / Brother'},`;
  else if (relationship === 'friends') sal = `My Dear Friend ${to || ''},`.trim();

  let p1 = '';
  if (tone === 'funny') {
    p1 = `Diwali is officially here, which means our annual battle for the last piece of ${foodName} and non-stop laughter has begun! Celebrating festivals with you is always pure joy, sparklers, and zero guilt about seconds.`;
  } else if (tone === 'spiritual') {
    p1 = `\"Tamaso Ma Jyotirgamaya\" — May we be led from darkness into eternal light. As sacred ${decorItem} illuminate thresholds in ${region.name}, my prayers are for the divine spark within your soul to burn with everlasting wisdom, gratitude, and deep inner peace.`;
  } else if (tone === 'traditional') {
    p1 = `On this auspicious occasion of Deepavali in ${region.name}, celebrated with glowing ${decorItem} and traditional sacred customs, I send my most reverent prayers for harmony, health, and blessed beginnings for you and our entire family.`;
  } else if (tone === 'heartwarming') {
    p1 = `Just as a single earthen lamp dissolves the shadows of the night, your warmth, kindness, and gentle smile brighten every corner of my life. Having you in my heart is the true celebration of Diwali.`;
  } else {
    // emotional default
    p1 = `As millions of golden diyas light up homes tonight, my heart overflows with deep gratitude for having you in my life. Even across miles, the love and comfort we share make this festival feel deeply sacred and close to home.`;
  }

  let p2 = '';
  if (cleanMemory) {
    p2 = `Surrounded by the festive glow, I was especially smiling thinking about \"${cleanMemory}\"—moments like that, paired with the sweetness of ${foodName}, are the true soul of Diwali that distance can never fade.`;
  } else {
    p2 = `The warm radiance of ${region.name}'s ${decorItem}, the welcoming fragrance of freshly prepared ${foodName}, and the laughter of loved ones remind me of the timeless beauty of home.`;
  }

  let p3 = '';
  if (tone === 'funny') {
    p3 = `May this Diwali bring you mountains of delicious treats, an endless supply of ${foodName}, and reasons to laugh until your ribs ache! Have a fabulous, sparkling Diwali! 🪔✨`;
  } else if (tone === 'spiritual') {
    p3 = `May the eternal flame purify your thoughts, quiet your worries, and lead you to profound contentment, compassion, and spiritual grace throughout the coming year.`;
  } else if (tone === 'traditional') {
    p3 = `May Goddess Lakshmi and Lord Ganesha bestow boundless abundance, auspicious fortune, good health, and honor upon your household. Shubh Deepavali!`;
  } else if (tone === 'heartwarming') {
    p3 = `Wishing you peaceful mornings, cheerful afternoons, and nights filled with starry wonder. May this coming year shower you with all the happiness you so richly deserve.`;
  } else {
    p3 = `Wishing you radiant health, great peace of mind, fulfilling success, and countless moments of love and laughter in the bright new year ahead.`;
  }

  const closeSign = from ? `With all my love and gratitude, ${from}` : 'With deepest love and heartfelt respect,';

  return { salutation: sal, p1, p2, p3, closing: closeSign };
}

// -------------------------------------------------------------
// Vite Dev Server / Static Production Server
// -------------------------------------------------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Shubh Deepavali server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
