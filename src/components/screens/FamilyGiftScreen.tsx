import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  Edit3,
  Shield,
  Key,
  Trash2,
  Plus,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import { GIFTS, resolveGiftConfig } from '../../config/gifts';
import {
  RECIPIENT_ROLES,
  fetchCreatorTokens,
  generateRecipientToken,
  revokeRecipientToken,
} from '../../config/recipients';
import { GiftIllustration } from '../GiftIllustration';

interface FamilyGiftScreenProps {
  userName: string;
  recipientKey: string | null;
  isCreatorMode: boolean;
  creatorSessionToken?: string | null;
  onOpenCustomize: () => void;
  onContinue: () => void;
  currentLanguage: Language;
}

interface ServerTokenItem {
  id: string;
  role: string;
  recipientName: string;
  expiresAt: string;
  isRevoked: boolean;
  isExpired: boolean;
}

export const FamilyGiftScreen: React.FC<FamilyGiftScreenProps> = ({
  userName,
  recipientKey,
  isCreatorMode,
  creatorSessionToken,
  onOpenCustomize,
  onContinue,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage].gift;
  const tSec = TRANSLATIONS[currentLanguage].security;
  const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Creator token manager state
  const [managedTokens, setManagedTokens] = useState<ServerTokenItem[]>([]);
  const [newRecipientRole, setNewRecipientRole] = useState<string>('mom');
  const [newRecipientName, setNewRecipientName] = useState<string>('');
  const [newExpiryDays, setNewExpiryDays] = useState<number>(30);
  const [generatedLinkNotice, setGeneratedLinkNotice] = useState<string | null>(null);

  // Pre-seeded backwards-compatible recipient links
  const legacyRecipients = [
    { code: 'maa-x7q2', role: 'mom', name: currentLanguage === 'hi' ? 'माँ' : currentLanguage === 'bn' ? 'মা' : 'Maa' },
    { code: 'papa-k9d4', role: 'dad', name: currentLanguage === 'hi' ? 'पापा' : currentLanguage === 'bn' ? 'বাবা' : 'Papa' },
    { code: 'di-s5v3', role: 'sister', name: currentLanguage === 'hi' ? 'दीदी' : currentLanguage === 'bn' ? 'দিদি' : 'Sister' },
    { code: 'bhai-b7r1', role: 'brother', name: currentLanguage === 'hi' ? 'भाई' : currentLanguage === 'bn' ? 'ভাই' : 'Brother' },
    { code: 'bestie-y6n2', role: 'bestie', name: currentLanguage === 'hi' ? 'बेस्टी' : currentLanguage === 'bn' ? 'বেস্টি' : 'Bestie' },
    { code: 'yaara-f8c5', role: 'friend', name: currentLanguage === 'hi' ? 'मित्र' : currentLanguage === 'bn' ? 'বন্ধু' : 'Friend' },
  ];

  useEffect(() => {
    if (isCreatorMode && creatorSessionToken) {
      fetchCreatorTokens(creatorSessionToken).then((tokens) => {
        if (tokens) setManagedTokens(tokens);
      });
    }
  }, [isCreatorMode, creatorSessionToken]);

  // Resolve the recipient's gift based on verified role or default:
  const giftKey = recipientKey || 'default';
  const currentGift = resolveGiftConfig(giftKey, userName);

  const items =
    currentGift.items && currentGift.items.length > 0
      ? currentGift.items
      : [
          {
            id: 'default-item',
            title: currentGift.giftTitle,
            type: 'package',
            image: '/gifts/family.webp',
          },
        ];

  const currentItem = items[activeItemIndex] || items[0];

  const handleOpenBox = () => {
    if (isBoxOpen) return;
    setIsBoxOpen(true);
    audioManager.playSparkleSound();
    audioManager.playDiyaLightSound();

    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#D6AD60', '#F4D995', '#FFB347', '#FFF5DE', '#E91E63'],
    });
  };

  const handleCopyLink = (codeOrToken: string) => {
    const origin = window.location.origin + window.location.pathname;
    const url = `${origin}?k=${codeOrToken}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedCode(codeOrToken);
      audioManager.playClickSound();
      setTimeout(() => setCopiedCode(null), 2500);
    });
  };

  const handleGenerateNewToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorSessionToken) return;
    const res = await generateRecipientToken(
      creatorSessionToken,
      newRecipientRole,
      newRecipientName.trim() || undefined,
      newExpiryDays
    );
    if (res && res.token) {
      handleCopyLink(res.token);
      setGeneratedLinkNotice(tSec.tokenCopied);
      setTimeout(() => setGeneratedLinkNotice(null), 4000);
      setNewRecipientName('');
      // refresh token list
      const updated = await fetchCreatorTokens(creatorSessionToken);
      if (updated) setManagedTokens(updated);
    }
  };

  const handleRevoke = async (tokenId: string) => {
    if (!creatorSessionToken) return;
    const res = await revokeRecipientToken(creatorSessionToken, tokenId);
    if (res && res.success) {
      const updated = await fetchCreatorTokens(creatorSessionToken);
      if (updated) setManagedTokens(updated);
    }
  };

  const displayRecipientName =
    (currentGift.name && (currentGift.name[currentLanguage] || currentGift.name.en)) ||
    userName?.trim() ||
    (currentLanguage === 'hi' ? 'परिवार' : currentLanguage === 'bn' ? 'পরিবার' : 'Family');

  const visitorName = displayRecipientName;
  const recipientName = displayRecipientName;

  const localizedItemTitle =
    currentItem.title && typeof currentItem.title === 'object'
      ? currentItem.title[currentLanguage] || currentItem.title.en
      : currentItem.title || '';

  const localizedMessage =
    currentGift.message[currentLanguage] || currentGift.message.en || '';

  const localizedRelationship =
    currentGift.relationship[currentLanguage] || currentGift.relationship.en || '';

  // Playful dodging gift box state
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [dodgeOffset, setDodgeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isCatchable, setIsCatchable] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsCatchable(true);
    }
  }, []);

  const handlePointerNear = () => {
    if (isBoxOpen || isCatchable) return;

    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);

    if (nextCount >= 5) {
      setIsCatchable(true);
      // No sound on cursor move as requested
    } else {
      // No sound on cursor move as requested
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      const maxDistX = isMobile
        ? Math.min((window.innerWidth - 100) / 2, 145)
        : 260;
      const maxDistY = isMobile ? 120 : 155;

      const quadrants = [
        { x: maxDistX * 0.92, y: -maxDistY * 0.8 },
        { x: -maxDistX * 0.95, y: maxDistY * 0.85 },
        { x: -maxDistX * 0.9, y: -maxDistY * 0.82 },
        { x: maxDistX * 0.94, y: maxDistY * 0.84 },
      ];

      const target = quadrants[(nextCount - 1) % quadrants.length];
      const jitterX = (Math.random() - 0.5) * (maxDistX * 0.2);
      const jitterY = (Math.random() - 0.5) * (maxDistY * 0.2);

      setDodgeOffset({
        x: Math.round(target.x + jitterX),
        y: Math.round(target.y + jitterY),
      });
    }
  };

  const getDodgeHint = () => {
    if (isCatchable) {
      return t.dodgeHintLast || 'catch up!! 😆';
    }
    const hints = t.dodgeHints || [];
    return hints[dodgeCount - 1] || t.dodgeHintDefault || 'Tap or hover to unbox...';
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-start px-3.5 sm:px-6 py-4 sm:py-8 max-w-2xl mx-auto">
      {/* CREATOR MODE ONLY: Backend-Verified Private Link Generator */}
      {isCreatorMode && (
        <div className="w-full mb-5 p-4 rounded-2xl bg-[#192747]/95 border-2 border-[#D6AD60] shadow-xl text-left animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#F4D995] flex items-center gap-1.5 uppercase tracking-wider">
              <Shield className="w-4 h-4 text-[#FFB347]" />
              <span>{tSec.creatorModeTitle}</span>
            </span>
            <button
              onClick={onOpenCustomize}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#D6AD60]/20 text-[#FFF5DE] border border-[#D6AD60]/40 hover:bg-[#D6AD60]/40 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3 h-3 text-[#F4D995]" />
              <span>{tSec.customizeGiftsBtn}</span>
            </button>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mb-3">
            {tSec.creatorModeSubtitle}
          </p>

          {/* Quick Legacy Links */}
          <div className="mb-3">
            <span className="text-[11px] font-semibold text-[#F4D995] block mb-1.5">
              {tSec.activeTokensLabel}:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {legacyRecipients.map((r) => {
                const isCopied = copiedCode === r.code;
                return (
                  <button
                    key={r.code}
                    onClick={() => handleCopyLink(r.code)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-700/80 border-emerald-400 text-white'
                        : 'bg-[#10172D]/90 border-[#D6AD60]/40 text-[#F4D995] hover:bg-[#D6AD60]/20'
                    }`}
                  >
                    {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{r.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* New Random Secure Token Generator */}
          {creatorSessionToken && (
            <form onSubmit={handleGenerateNewToken} className="mt-3 pt-3 border-t border-[#D6AD60]/25 flex flex-wrap gap-2 items-center">
              <select
                value={newRecipientRole}
                onChange={(e) => setNewRecipientRole(e.target.value)}
                className="bg-[#10172D] text-xs text-[#FFF5DE] px-2.5 py-1.5 rounded-lg border border-[#D6AD60]/40 focus:outline-none"
              >
                {RECIPIENT_ROLES.map((role) => (
                  <option key={role.role} value={role.role}>
                    {role.name[currentLanguage] || role.name.en}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Optional Name"
                value={newRecipientName}
                onChange={(e) => setNewRecipientName(e.target.value)}
                className="bg-[#10172D] text-xs text-[#FFF5DE] px-2.5 py-1.5 rounded-lg border border-[#D6AD60]/40 placeholder:text-[#FFF5DE]/40 flex-1 min-w-[110px] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#D6AD60] text-[#10172D] text-xs font-bold px-3 py-1.5 rounded-lg hover:brightness-110 flex items-center gap-1 cursor-pointer transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{tSec.generateTokenBtn}</span>
              </button>
            </form>
          )}

          {generatedLinkNotice && (
            <div className="mt-2 text-xs text-emerald-300 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{generatedLinkNotice}</span>
            </div>
          )}

          {/* Active Backend-Managed Tokens List */}
          {managedTokens.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-[#D6AD60]/20 max-h-32 overflow-y-auto space-y-1.5 pr-1">
              {managedTokens.map((tok) => {
                const isCopied = copiedCode === tok.id;
                return (
                  <div
                    key={tok.id}
                    className="flex items-center justify-between text-[11px] p-1.5 rounded-md bg-[#10172D]/60 border border-[#D6AD60]/20"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Key className="w-3 h-3 text-[#F4D995] shrink-0" />
                      <span className="font-semibold text-[#FFF5DE]">{tok.role}</span>
                      {tok.recipientName && <span className="text-[#FFF5DE]/60">({tok.recipientName})</span>}
                      {tok.isRevoked && <span className="text-rose-400 font-bold">[{tSec.statusRevoked}]</span>}
                      {tok.isExpired && <span className="text-amber-400 font-bold">[{tSec.statusExpired}]</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      {!tok.isRevoked && !tok.isExpired && (
                        <button
                          onClick={() => handleRevoke(tok.id)}
                          title={tSec.revokeTokenBtn}
                          className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Screen Header */}
      <div className="text-center w-full mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/15 border border-[#D6AD60]/30 text-[#F4D995] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
          <span>{t.badge}</span>
        </div>
        <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#FFF5DE] leading-tight">
          {currentLanguage === 'hi' ? (
            visitorName ? (
              <>
                <span className="gold-gradient-text">{visitorName}</span> का खास दिवाली उपहार! 🎁
              </>
            ) : (
              <>आपका खास दिवाली उपहार! 🎁</>
            )
          ) : currentLanguage === 'bn' ? (
            visitorName ? (
              <>
                <span className="gold-gradient-text">{visitorName}</span>-এর বিশেষ দীপাবলি উপহার! 🎁
              </>
            ) : (
              <>আপনার বিশেষ দীপাবলি উপহার! 🎁</>
            )
          ) : (
            visitorName ? (
              <>
                <span className="gold-gradient-text">{visitorName}'s</span> Real Diwali Gift! 🎁
              </>
            ) : (
              <>Your Real Diwali Gift! 🎁</>
            )
          )}
        </h2>
        <p className="font-editorial text-sm sm:text-base text-[#F4D995] italic mt-1 font-light">
          {t.subheading}
        </p>
      </div>

      {/* Main Interactive Gift Box & Reveal Section */}
      <div className="w-full flex flex-col items-center">
        {!isBoxOpen ? (
          <div className="relative flex flex-col items-center my-4 w-full min-h-[380px] sm:min-h-[440px] justify-center overflow-visible">
            {/* Playful prompt tag */}
            <div className="mb-4 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md animate-pulse">
              {isCatchable ? (
                <span>catch up!! 😆</span>
              ) : (
                <>
                  <span>🎯</span>
                  <span>{getDodgeHint()}</span>
                </>
              )}
            </div>

            {/* Playful Dodging Gift Box Container */}
            <div
              onPointerEnter={handlePointerNear}
              onTouchStart={handlePointerNear}
              style={{
                transform: `translate(${dodgeOffset.x}px, ${dodgeOffset.y}px)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 1.25, 0.4, 1)',
              }}
              className="relative group cursor-pointer select-none"
            >
              <div className="absolute inset-0 w-24 sm:w-28 h-24 sm:h-28 bg-[#D6AD60]/20 rounded-full blur-xl transition-all pointer-events-none" />

              <button
                onClick={() => {
                  if (isCatchable) {
                    handleOpenBox();
                  } else {
                    handlePointerNear();
                  }
                }}
                aria-label={t.tapToUnbox}
                className="relative z-10 w-20 sm:w-24 h-20 sm:h-24 flex flex-col items-center justify-center active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F] rounded-2xl cursor-pointer"
              >
                <svg viewBox="0 0 280 280" className="w-full h-full filter drop-shadow(0 10px 18px rgba(0,0,0,0.8))">
                  <defs>
                    <linearGradient id="boxNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E2F5A" />
                      <stop offset="50%" stopColor="#131E38" />
                      <stop offset="100%" stopColor="#0B1224" />
                    </linearGradient>
                    <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2B2" />
                      <stop offset="35%" stopColor="#D6AD60" />
                      <stop offset="70%" stopColor="#8A6416" />
                      <stop offset="100%" stopColor="#F4D995" />
                    </linearGradient>
                  </defs>

                  <rect x="40" y="95" width="200" height="150" rx="14" fill="url(#boxNavyGrad)" stroke="#D6AD60" strokeWidth="2.5" />
                  <rect x="122" y="95" width="36" height="150" fill="url(#goldRibbonGrad)" />
                  <rect x="40" y="155" width="200" height="30" fill="url(#goldRibbonGrad)" />
                  <rect x="30" y="65" width="220" height="35" rx="8" fill="url(#boxNavyGrad)" stroke="#D6AD60" strokeWidth="3" />
                  <rect x="120" y="65" width="40" height="35" fill="url(#goldRibbonGrad)" />
                  <path d="M 140 65 C 100 20, 70 35, 125 65 Z" fill="url(#goldRibbonGrad)" />
                  <path d="M 140 65 C 180 20, 210 35, 155 65 Z" fill="url(#goldRibbonGrad)" />
                  <circle cx="140" cy="65" r="14" fill="url(#goldRibbonGrad)" stroke="#573D05" strokeWidth="1" />
                </svg>
              </button>
            </div>

            {/* Direct 1-Click Accessible Reveal Button (Essential for screen readers & motor accessibility) */}
            <button
              type="button"
              onClick={handleOpenBox}
              className="mt-6 px-4 py-2 min-h-[44px] rounded-xl text-xs font-semibold text-[#F4D995] bg-[#10172D]/90 border border-[#D6AD60]/40 hover:bg-[#D6AD60]/20 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>
                {currentLanguage === 'hi'
                  ? 'सीधे उपहार खोलें 🎁'
                  : currentLanguage === 'bn'
                  ? 'সরাসরি উপহার খুলুন 🎁'
                  : 'Open Gift Immediately 🎁'}
              </span>
            </button>
          </div>
        ) : (
          /* Gift Reveal Card: Consistent 4/3 Aspect Ratio Card with Warm Gold Border & Vignette */
          <div className="relative w-full rounded-3xl border-2 border-[#D6AD60] bg-gradient-to-b from-[#192747]/95 to-[#10172D]/95 p-4 sm:p-6 backdrop-blur-xl shadow-2xl gold-box-shadow animate-fade-in flex flex-col items-center text-center">
            {/* Header Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB347]/20 border border-[#FFB347]/40 text-[#FFE082] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>{t.giftFor} {recipientName}</span>
            </div>

            {/* REAL GIFT PHOTO CARD: Exact 4/3 Aspect Ratio, warm gold border, soft vignette, fallback */}
            <div className="relative w-full aspect-[4/3] max-w-sm rounded-2xl overflow-hidden border-2 border-[#D6AD60]/60 shadow-2xl mb-3.5 bg-[#0E1528] flex items-center justify-center group">
              {currentItem.image ? (
                <>
                  <img
                    src={currentItem.image}
                    alt={localizedItemTitle}
                    loading="eager"
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Graceful Fallback if image is loading or missing */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0E1528]">
                      <GiftIllustration type={currentItem.type || 'package'} className="w-full h-full" />
                    </div>
                  )}
                </>
              ) : (
                <GiftIllustration type={currentItem.type || 'package'} className="w-full h-full" />
              )}

              {/* Warm Golden Vignette & Shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              {/* Recipient Role Tag */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#10172D]/85 backdrop-blur-md border border-[#D6AD60]/40 text-[11px] font-semibold text-[#F4D995]">
                {localizedRelationship}
              </div>

              {/* If recipient has a pair of gifts (Papa: Watch + Kurta), show clean swipe controls */}
              {items.length > 1 && (
                <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                  <button
                    onClick={() => {
                      setImageLoaded(false);
                      setActiveItemIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
                    }}
                    className="pointer-events-auto min-w-[44px] min-h-[44px] rounded-full bg-[#10172D]/90 border border-[#D6AD60]/70 text-[#F4D995] flex items-center justify-center hover:bg-[#D6AD60] hover:text-[#10172D] transition-colors cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
                    aria-label="Previous gift item"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setImageLoaded(false);
                      setActiveItemIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
                    }}
                    className="pointer-events-auto min-w-[44px] min-h-[44px] rounded-full bg-[#10172D]/90 border border-[#D6AD60]/70 text-[#F4D995] flex items-center justify-center hover:bg-[#D6AD60] hover:text-[#10172D] transition-colors cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
                    aria-label="Next gift item"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* If Papa has a pair, show small swipe indicator inside his reveal */}
            {items.length > 1 && (
              <div className="flex items-center gap-2 mb-2">
                {items.map((_: unknown, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setImageLoaded(false);
                      setActiveItemIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeItemIndex === idx
                        ? 'w-6 bg-[#F4D995]'
                        : 'w-2 bg-[#FFF5DE]/30 hover:bg-[#FFF5DE]/60'
                    }`}
                    aria-label={`View gift item ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Gift Title */}
            <h3 className="font-royal text-lg sm:text-2xl font-bold text-[#FFF5DE] mb-2 leading-snug">
              {items.length > 1
                ? (currentGift.giftTitle && typeof currentGift.giftTitle === 'object'
                    ? currentGift.giftTitle[currentLanguage] || currentGift.giftTitle.en
                    : currentGift.giftTitle)
                : localizedItemTitle}
              {items.length > 1 && (
                <span className="block text-xs font-normal text-[#F4D995]/85 mt-1">
                  ({localizedItemTitle})
                </span>
              )}
            </h3>

            {/* Personalised Message */}
            <div className="relative p-3.5 sm:p-4 rounded-xl bg-[#10172D]/75 border border-[#D6AD60]/30 max-w-md w-full mb-4">
              <p className="font-editorial text-sm sm:text-base text-[#FFF5DE] italic leading-relaxed">
                "{localizedMessage}"
              </p>
            </div>

            {/* Continue to Personalised Letter CTA */}
            <div className="w-full max-w-sm flex flex-col gap-2">
              <button
                onClick={() => {
                  audioManager.playLetterOpenSound();
                  onContinue();
                }}
                className="w-full min-h-[50px] py-3 px-6 rounded-xl font-bold text-sm sm:text-base text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-xl shadow-[#D6AD60]/20 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF5DE]"
              >
                <span>{t.continueToLetter}</span>
                <ChevronRight className="w-4 h-4 text-[#10172D]" />
              </button>

              <button
                onClick={() => setIsBoxOpen(false)}
                className="text-xs text-[#F4D995]/70 hover:text-[#FFF5DE] py-1 cursor-pointer"
              >
                {t.closeBox}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
