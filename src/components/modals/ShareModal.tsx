/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import { normalizeRecipientRole } from '../../config/recipients';

interface ShareModalProps {
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  userName,
  isOpen,
  onClose,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage].shareModal;
  const [copied, setCopied] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>(userName || 'Family & Friends');
  const [role, setRole] = useState<string>('default');
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

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
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const origin = window.location.origin + window.location.pathname;
  const shareUrl = `${origin}?name=${encodeURIComponent(recipient)}&to=${encodeURIComponent(role)}&lang=${currentLanguage}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      audioManager.playSparkleSound();
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const shareTitle =
          currentLanguage === 'hi'
            ? 'शुभ दीपावली - प्रेम का पावन उत्सव 🪔'
            : currentLanguage === 'bn'
            ? 'শুভ দীপাবলি - ভালোবাসার উৎসব 🪔'
            : 'Shubh Deepavali – A Little Celebration of Love 🪔';
        const shareText =
          currentLanguage === 'hi'
            ? 'नमस्ते! मैंने आपके लिए एक डिजिटल दिवाली उत्सव बनाया है। आइए दीया जलाएं और तोहफा देखें! ✨🪔'
            : currentLanguage === 'bn'
            ? 'নমস্কার! আপনার জন্য একটি সুন্দর ডিজিটাল দীপাবলি উৎসব তৈরি করেছি। আসুন প্রদীপ জ্বালাই! ✨🪔'
            : 'Hey! I made a digital Diwali celebration for you. Come light the diya and discover your surprise! ✨🪔';

        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        audioManager.playSparkleSound();
      } catch (e) {
        // user cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const familyQuickPresets = [
    { label: currentLanguage === 'hi' ? 'परिवार' : currentLanguage === 'bn' ? 'পরিবার' : 'Family', role: 'default' },
    { label: currentLanguage === 'hi' ? 'दोस्त' : currentLanguage === 'bn' ? 'বন্ধুরা' : 'Friends', role: 'default' },
    { label: currentLanguage === 'hi' ? 'माँ' : currentLanguage === 'bn' ? 'মা' : 'Maa', role: 'maa' },
    { label: currentLanguage === 'hi' ? 'पापा' : currentLanguage === 'bn' ? 'বাবা' : 'Papa', role: 'papa' },
    { label: currentLanguage === 'hi' ? 'भाई' : currentLanguage === 'bn' ? 'ভাই' : 'Brother', role: 'brother' },
    { label: currentLanguage === 'hi' ? 'बहन' : currentLanguage === 'bn' ? 'বোন' : 'Sister', role: 'sister' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-[#192747] border-2 border-[#D6AD60] p-5 sm:p-6 shadow-2xl text-[#FFF5DE] gold-border-glow animate-scale-up"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#D6AD60]/20">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪔</span>
            <h3 id="share-modal-title" className="font-royal text-base sm:text-lg font-bold text-[#F4D995]">
              {t.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#10172D]/50 transition-colors focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-3.5 text-left">
          <p className="text-xs text-[#FFF5DE]/85 leading-relaxed">
            {t.desc}
          </p>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5">
            {familyQuickPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setRole(preset.role);
                  setRecipient(preset.label);
                  audioManager.playClickSound();
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer min-h-[38px] focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none ${
                  role === preset.role && recipient === preset.label
                    ? 'bg-[#D6AD60] text-[#10172D] border-[#D6AD60] font-bold'
                    : 'bg-[#10172D]/60 text-[#FFF5DE]/90 border-[#D6AD60]/30 hover:border-[#D6AD60]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="shareRecipientInput" className="block text-xs font-semibold text-[#F4D995] uppercase tracking-wider mb-1">
              {t.nameLabel}
            </label>
            <input
              id="shareRecipientInput"
              type="text"
              value={recipient}
              onChange={(e) => {
                const val = e.target.value;
                setRecipient(val);
                const detected = normalizeRecipientRole(val);
                if (detected) {
                  setRole(detected);
                }
              }}
              placeholder="e.g. Papa, Maa, Priya..."
              maxLength={40}
              className="w-full h-11 px-3.5 rounded-xl bg-[#10172D] border border-[#D6AD60]/40 text-sm text-[#FFF5DE] focus:border-[#F4D995] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F] transition-all"
            />
          </div>

          {/* Share Link Preview */}
          <div className="p-3 rounded-xl bg-[#10172D]/80 border border-[#D6AD60]/30">
            <span className="text-[10px] text-[#F4D995]/70 uppercase font-semibold tracking-wider block mb-1">
              Personalized Link
            </span>
            <p className="text-xs text-[#FFF5DE]/90 truncate font-mono select-all">
              {shareUrl}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleNativeShare}
            className="w-full sm:flex-1 min-h-[46px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
          >
            <Share2 className="w-4 h-4" />
            <span>{t.shareAppBtn}</span>
          </button>

          <button
            onClick={handleCopy}
            className="w-full sm:flex-1 min-h-[46px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-[#F4D995] bg-[#10172D] border border-[#D6AD60]/60 hover:bg-[#10172D]/70 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">{t.copiedNotice}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#D6AD60]" />
                <span>{t.copyLinkBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
