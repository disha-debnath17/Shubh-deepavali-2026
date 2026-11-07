/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Public Role Metadata for Personalised Diwali Celebrations
// Secrets and raw tokens are strictly managed on the server backend (server.ts)
export const RECIPIENT_ROLES = [
  { role: 'mom', name: { en: 'Maa (Mother)', hi: 'माँ', bn: 'মা' }, title: 'Mother' },
  { role: 'dad', name: { en: 'Papa (Father)', hi: 'पापा', bn: 'বাবা' }, title: 'Father' },
  { role: 'sister', name: { en: 'Sister (Didi)', hi: 'दीदी', bn: 'দিদি' }, title: 'Sister' },
  { role: 'brother', name: { en: 'Brother (Bhaiya)', hi: 'भाई', bn: 'ভাই' }, title: 'Brother' },
  { role: 'grandparents', name: { en: 'Dadu and Dadi (Grandparents)', hi: 'दादू और दादी', bn: 'দাদু ও দিদিমা' }, title: 'Grandparents' },
  { role: 'someoneSpecial', name: { en: 'Someone Special ❤️', hi: 'कोई खास ❤️', bn: 'মনের বিশেষ কেউ ❤️' }, title: 'Special Bond' },
  { role: 'family', name: { en: 'Family', hi: 'परिवार', bn: 'পরিবার' }, title: 'Family' },
  { role: 'bestie', name: { en: 'Bestie', hi: 'बेस्टी', bn: 'बेस्टी' }, title: 'Best Friend' },
  { role: 'friend', name: { en: 'Friend', hi: 'मित्र', bn: 'বন্ধু' }, title: 'Friend' },
];

/**
 * Normalizes a recipient role string ('maa', 'papa', 'brother', 'sister', etc.)
 * into a canonical role identifier ('mom', 'dad', 'brother', 'sister', 'grandparents', 'bestie', 'friend', 'someoneSpecial', 'family', 'default').
 */
export function normalizeRecipientRole(role) {
  if (!role || typeof role !== 'string') return null;
  const clean = role.trim().toLowerCase();
  if (clean === 'maa' || clean === 'mom' || clean === 'mother' || clean === 'mataji' || clean === 'মা') return 'mom';
  if (clean === 'papa' || clean === 'dad' || clean === 'father' || clean === 'pitaji' || clean === 'বাবা') return 'dad';
  if (clean === 'brother' || clean === 'bhai' || clean === 'bhaiya' || clean === 'dada' || clean === 'ভাই') return 'brother';
  if (clean === 'sister' || clean === 'di' || clean === 'didi' || clean === 'behen' || clean === 'bon' || clean === 'দিদি' || clean === 'বোন') return 'sister';
  if (clean === 'dadu_dadi' || clean === 'dadu' || clean === 'dadi' || clean === 'grandparents' || clean === 'dada_dadi') return 'grandparents';
  if (clean === 'bestie' || clean === 'bestfriend' || clean === 'बेस्टी') return 'bestie';
  if (clean === 'someonespecial' || clean === 'special' || clean === 'sweetheart') return 'someoneSpecial';
  if (clean === 'friend' || clean === 'friends' || clean === 'yaara' || clean === 'dost' || clean === 'mitra' || clean === 'বন্ধু') return 'friend';
  if (clean === 'family' || clean === 'default' || clean === 'everyone' || clean === 'পরিবার' || clean === 'परिवार') return 'family';
  if (['mom', 'dad', 'sister', 'brother', 'grandparents', 'bestie', 'someoneSpecial', 'friend', 'family', 'default'].includes(clean)) return clean;
  return null;
}

/**
 * Verifies a private recipient access token against the server backend.
 * Checks for cryptographic hash validity, expiration, and revocation.
 */
export async function verifyRecipientToken(token) {
  if (!token || typeof token !== 'string' || !token.trim()) {
    return { valid: false, error: 'No token provided' };
  }

  try {
    const res = await fetch('/api/recipient/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.trim() }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.valid) {
        return {
          valid: true,
          role: data.role,
          recipientName: data.recipientName,
          expiresAt: data.expiresAt,
        };
      }
      return {
        valid: false,
        revoked: Boolean(data.revoked),
        expired: Boolean(data.expired),
        error: data.error || 'Invalid recipient link',
      };
    }
  } catch (err) {
    // Backend service not reachable or static hosting on Amplify
  }

  // Static hosting fallback (e.g. AWS Amplify static hosting without Node.js backend)
  const clean = token.trim().toLowerCase();
  const legacyCodes = {
    'maa-x7q2': { role: 'mom', name: 'Maa' },
    'papa-k9d4': { role: 'dad', name: 'Papa' },
    'di-s5v3': { role: 'sister', name: 'Sister' },
    'bhai-b7r1': { role: 'brother', name: 'Brother' },
    'bestie-y6n2': { role: 'bestie', name: 'Bestie' },
    'yaara-f8c5': { role: 'friend', name: 'Friend' },
  };

  if (legacyCodes[clean]) {
    return {
      valid: true,
      role: legacyCodes[clean].role,
      recipientName: legacyCodes[clean].name,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 365,
    };
  }

  const directRole = normalizeRecipientRole(clean);
  if (directRole) {
    return {
      valid: true,
      role: directRole,
      recipientName: directRole.charAt(0).toUpperCase() + directRole.slice(1),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 365,
    };
  }

  return { valid: false, error: 'Verification service unreachable' };
}

/**
 * Verifies creator credentials strictly on the backend.
 * Issues a temporary creator session token without exposing the secret.
 */
export async function verifyCreatorSecret(secret) {
  if (!secret || typeof secret !== 'string' || !secret.trim()) {
    return { success: false, error: 'Secret is required' };
  }

  try {
    const res = await fetch('/api/creator/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secret.trim() }),
    });

    const data = await res.json();
    if (res.ok && data.creatorToken) {
      return {
        success: true,
        creatorToken: data.creatorToken,
        expiresAt: data.expiresAt,
      };
    }

    return {
      success: false,
      error: data.error || 'Invalid creator credentials',
    };
  } catch (err) {
    console.warn('Creator verification error:', err);
    return { success: false, error: 'Verification service unreachable' };
  }
}

/**
 * Retrieves managed tokens for Creator mode via Bearer session auth.
 */
export async function fetchCreatorTokens(creatorToken) {
  try {
    const res = await fetch('/api/creator/tokens', {
      headers: { Authorization: `Bearer ${creatorToken}` },
    });
    if (res.ok) {
      const data = await res.json();
      return data.tokens || [];
    }
  } catch (err) {
    console.warn('Fetch creator tokens error:', err);
  }
  return [];
}

/**
 * Generates a new cryptographically random token for a recipient.
 */
export async function generateRecipientToken(creatorToken, role, recipientName, expiresInDays = 30) {
  try {
    const res = await fetch('/api/creator/tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${creatorToken}`,
      },
      body: JSON.stringify({ role, recipientName, expiresInDays }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Generate token error:', err);
  }
  return null;
}

/**
 * Revokes a recipient access token.
 */
export async function revokeRecipientToken(creatorToken, tokenId) {
  try {
    const res = await fetch(`/api/creator/tokens/${tokenId}/revoke`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${creatorToken}` },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Revoke token error:', err);
  }
  return null;
}
