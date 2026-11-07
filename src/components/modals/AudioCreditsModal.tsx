/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Volume2,
  Square,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Zap,
  Music,
  Info,
  AlertTriangle,
  Code,
  FileText,
} from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager, AUDIO_CREDITS, AudioCreditItem } from '../../utils/audio';

interface AudioCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export const AudioCreditsModal: React.FC<AudioCreditsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Trap focus and handle Escape key for accessibility
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Auto-focus close button on mount
    setTimeout(() => {
      if (modalRef.current) {
        const closeBtn = modalRef.current.querySelector<HTMLButtonElement>('button[aria-label="Close"]');
        closeBtn?.focus();
      }
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTogglePlay = (item: AudioCreditItem) => {
    if (playingId === item.id) {
      if (item.id === 'shankh') audioManager.stopShankhSound();
      else if (item.id === 'procedural-dhak') audioManager.stopDhakSound();
      else if (item.id === 'ambient-synthesizer') audioManager.stopAmbient();
      setPlayingId(null);
      return;
    }

    // Stop currently running previews
    audioManager.stopShankhSound();
    audioManager.stopDhakSound();

    setPlayingId(item.id);

    if (item.id === 'shankh') {
      audioManager.playShankhSound();
      setTimeout(() => setPlayingId((curr) => (curr === 'shankh' ? null : curr)), 12000);
    } else if (item.id === 'firecracker') {
      audioManager.playRealFireworkBurst();
      setTimeout(() => setPlayingId((curr) => (curr === 'firecracker' ? null : curr)), 2500);
    } else if (item.id === 'procedural-dhak' || item.id === 'dhak') {
      audioManager.playDhakBeat();
      setTimeout(() => setPlayingId((curr) => (curr === item.id ? null : curr)), 12000);
    } else if (item.id === 'ambient-synthesizer') {
      audioManager.startAmbient();
      setTimeout(() => setPlayingId((curr) => (curr === 'ambient-synthesizer' ? null : curr)), 9000);
    }
  };

  const handleCopyAllCredits = () => {
    const formatted = AUDIO_CREDITS.map(
      (c) =>
        `• ${c.name}\n  Category: ${c.category}\n  Artist / Uploader: ${c.author} (${c.authorRole})\n  Source Platform: ${c.source} [ID: ${c.sourceId}]\n  Direct Source URL: ${c.sourceUrl || 'Self-contained In-App Procedural Code'}\n  License: ${c.license}\n  Commercial / Demo Use Permitted: ${c.commercialUsePermitted ? 'YES' : 'NO'}\n  Verified Status: ${c.isVerified ? 'VERIFIED' : 'UNVERIFIED / DISCLOSED'}\n  Attribution: ${c.attributionRequirement}\n  Usage in App: ${c.usageInApp}\n  Audit Notes: ${c.auditNotes}`
    ).join('\n\n');

    const fullText = `SHUBH DEEPAVALI — AUDIO ASSETS & LICENSING AUDIT COMPLIANCE REPORT\nGenerated for Public Demonstration & Commercial Use Verification\n\n${formatted}\n\nOptimization & Legal Clearance Summary: All audio is either independently verified under open commercial licenses with direct asset URL citations, or procedurally generated via client-side Web Audio API math under Apache-2.0.`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2400);
    });
  };

  const headerTitle =
    currentLanguage === 'hi'
      ? 'ध्वनि आभार, लाइसेंस एवं ऑडिट सत्यापन'
      : currentLanguage === 'bn'
      ? 'অডিও ঋণস্বীকার, লাইসেন্স ও অডিট'
      : 'Audio Credits, Licences & Compliance Audit';

  const subtitle =
    currentLanguage === 'hi'
      ? 'उत्सव में प्रयुक्त सभी ध्वनियों के स्रोत, रिकॉर्डिस्ट, कॉपीराइट लाइसेंस एवं वाणिज्यिक अनुमतियों का पारदर्शी सत्यापन।'
      : currentLanguage === 'bn'
      ? 'উৎসবের সমস্ত অডিও উপাদানের উৎস, স্রষ্টা, কপিরাইট লাইসেন্স ও বাণিজ্যিক ব্যবহারের সত্যনিষ্ঠ যাচাইকরণ।'
      : 'Complete transparent legal audit of every recording, procedural synthesizer, and sound effect used in this project.';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audio-credits-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-auto rounded-3xl bg-[#141C33] border-2 border-[#D6AD60]/50 shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col max-h-[90vh] text-[#FFF5DE]"
      >
        {/* Header */}
        <div className="shrink-0 p-4 sm:p-6 border-b border-[#D6AD60]/25 bg-gradient-to-r from-[#192747] to-[#10172D] flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D6AD60]/20 border border-[#D6AD60]/40 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-[#D6AD60] font-semibold">
                  Audio Audit & Legal Verification
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  Checked & Attributed
                </span>
              </div>
              <h2
                id="audio-credits-title"
                className="text-lg sm:text-2xl font-bold font-royal text-[#F4D995] mt-1"
              >
                {headerTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/75 mt-1 max-w-xl leading-relaxed">
                {subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="min-h-[44px] min-w-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Audit Standard Banner */}
          <div className="rounded-2xl border border-amber-500/35 bg-gradient-to-r from-amber-500/15 via-[#192747]/70 to-amber-500/10 p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-[#FFF5DE]/90 space-y-1.5">
              <p className="font-bold text-[#F4D995] text-xs sm:text-sm">
                Legal Audit & Verified Attribution Policy
              </p>
              <p className="text-[11px] text-[#FFF5DE]/80 leading-relaxed">
                Every audio recording in this application has undergone strict manual review. General website homepages are never used as attribution links—only direct individual recording URLs are cited. A <strong>Verified</strong> badge is exclusively displayed where licensing, creator identity, and commercial/demonstration permissions were independently confirmed. Unverified third-party audio has been completely replaced with native Web Audio API physical modeling.
              </p>
            </div>
          </div>

          {/* Audio Cards */}
          <div className="space-y-4">
            {AUDIO_CREDITS.map((item) => {
              const isPlaying = playingId === item.id;
              const isVerifiedLicensed = item.category === 'licensed-verified';
              const isOriginalProcedural = item.category === 'original-synthesized';
              const isReplacedNotice = item.category === 'replaced-notice';

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                    isReplacedNotice
                      ? 'border-amber-400/30 bg-[#141C33]/60'
                      : isOriginalProcedural
                      ? 'border-emerald-500/35 bg-[#10172D]/85 hover:border-emerald-500/50'
                      : 'border-[#D6AD60]/35 bg-[#10172D]/85 hover:border-[#D6AD60]/55'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-[#F4D995] leading-snug">
                          {item.name}
                        </h3>

                        {/* Category & Verified Badges (Only displayed if truly verified!) */}
                        {isVerifiedLicensed && item.isVerified && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            Verified Licensed Recording
                          </span>
                        )}

                        {isOriginalProcedural && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            Original In-App Sound Design (Apache-2.0)
                          </span>
                        )}

                        {isReplacedNotice && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Audit Finding & Replacement Notice
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-amber-200/90 font-medium">
                        Creator / Sound Designer:{' '}
                        <strong className="text-[#FFF5DE]">{item.author}</strong>
                        {item.authorRole && (
                          <span className="text-[#FFF5DE]/65"> • {item.authorRole}</span>
                        )}
                      </p>
                    </div>

                    {/* Preview Button (not for replaced notice) */}
                    {!isReplacedNotice && (
                      <button
                        type="button"
                        onClick={() => handleTogglePlay(item)}
                        className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] ${
                          isPlaying
                            ? 'bg-amber-400 text-[#10172D] shadow-md shadow-amber-400/30'
                            : 'bg-[#192747] text-[#F4D995] hover:bg-[#D6AD60]/20 border border-[#D6AD60]/40'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-current" />
                            <span>Stop Preview</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Preview Sound</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Details grid */}
                  <div className="mt-3.5 pt-3.5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {/* Source Page (Direct Link) */}
                    <div>
                      <span className="text-[#FFF5DE]/50 block text-[10px] uppercase font-semibold">
                        Direct Source & Platform
                      </span>
                      {item.sourceUrl ? (
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#F4D995] hover:text-[#FFF5DE] underline inline-flex items-center gap-1 break-all text-[11px] font-medium"
                        >
                          <span>{item.source} (ID: {item.sourceId})</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-[#FFF5DE]/85 text-[11px]">{item.source} ({item.sourceId})</span>
                      )}
                    </div>

                    {/* Commercial / Public Demo Permission */}
                    <div>
                      <span className="text-[#FFF5DE]/50 block text-[10px] uppercase font-semibold">
                        Commercial & Public Demo Rights
                      </span>
                      <span
                        className={`font-semibold inline-flex items-center gap-1 text-[11px] ${
                          item.commercialUsePermitted
                            ? 'text-emerald-400'
                            : 'text-amber-300'
                        }`}
                      >
                        {item.commercialUsePermitted ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Permitted for Commercial & Public Use</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Restricted by Source (Safely Replaced)</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* License Name */}
                    <div>
                      <span className="text-[#FFF5DE]/50 block text-[10px] uppercase font-semibold">
                        Governing License
                      </span>
                      <span className="text-[#FFF5DE]/90 font-medium text-[11px]">
                        {item.license}
                      </span>
                    </div>

                    {/* Bandwidth / Delivery */}
                    <div>
                      <span className="text-[#FFF5DE]/50 block text-[10px] uppercase font-semibold">
                        Optimization & Bandwidth
                      </span>
                      <span className="text-emerald-400 font-medium text-[11px]">
                        {item.fileSizeNote}
                      </span>
                    </div>

                    {/* Usage in App */}
                    <div className="sm:col-span-2">
                      <span className="text-[#FFF5DE]/50 block text-[10px] uppercase font-semibold">
                        Usage in Diwali Celebration
                      </span>
                      <span className="text-[#FFF5DE]/85 text-[11px] leading-relaxed">
                        {item.usageInApp}
                      </span>
                    </div>

                    {/* Audit Notes & Attribution */}
                    <div className="sm:col-span-2 bg-[#192747]/60 rounded-xl p-2.5 border border-white/10 text-[11px] text-[#FFF5DE]/80 space-y-1">
                      <div className="flex items-start gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-200">Attribution & Audit Verification: </strong>
                          <span>{item.licenseDetails}</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-[#FFF5DE]/65 pl-5">
                        <strong>Compliance Note:</strong> {item.auditNotes}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 p-3 sm:p-4 border-t border-[#D6AD60]/25 bg-[#10172D] flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handleCopyAllCredits}
            className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#192747] text-[#F4D995] hover:bg-[#192747]/80 border border-[#D6AD60]/40 transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied Compliance Audit Report!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#D6AD60]" />
                <span>Copy Full Audit & Attributions</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#D6AD60] text-[#10172D] hover:bg-[#F4D995] transition-all cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-[#FFF5DE]"
          >
            {currentLanguage === 'hi' ? 'सत्यापित एवं संपन्न' : currentLanguage === 'bn' ? 'যাচাইকৃত ও সমাপ্ত' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
