/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Music,
  Zap,
  Sliders,
  Check,
  ShieldCheck,
  Play,
  Square,
  Sparkles,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager, AudioState } from '../../utils/audio';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onOpenCredits: () => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onOpenCredits,
}) => {
  const [audioState, setAudioState] = React.useState<AudioState>(() => audioManager.getState());
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const unsub = audioManager.subscribe((st) => setAudioState(st));
    return () => unsub();
  }, []);

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

    // Auto-focus first focusable element
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

  const t = TRANSLATIONS[currentLanguage];

  const labels = {
    en: {
      title: 'Festive Audio Controls',
      subtitle: 'Adjust devotional background music and celebratory sound effects to your liking.',
      master: 'Master Volume',
      music: 'Festive Music (Ragas & Harp)',
      sfx: 'Sound Effects (Diyas & Bells)',
      musicDesc: 'Acoustic evening Raga Bhupali & Yaman melodies',
      sfxDesc: 'Temple bells, crackling fireworks, dhak percussion & diyas',
      testTitle: 'Test Sound Effects',
      testDiya: 'Light Diya',
      testBell: 'Temple Bell',
      testConch: 'Sacred Conch',
      testDhak: 'Bengali Dhak',
      testFirework: 'Sky Firework',
      muteAll: 'Mute Everything',
      unmuteAll: 'Unmute Audio',
      creditsBtn: 'Audio Credits & Verified Licences',
      done: 'Done',
    },
    hi: {
      title: 'उत्सव ध्वनि नियंत्रण',
      subtitle: 'भक्तिमय पृष्ठभूमि संगीत व उत्सव ध्वनियों को अपनी पसंद अनुसार व्यवस्थित करें।',
      master: 'मुख्य आवाज़ (मास्टर)',
      music: 'उत्सव संगीत (राग व वीणा)',
      sfx: 'ध्वनि प्रभाव (दीये व घंटियां)',
      musicDesc: 'शाम के राग भूपाली व यमन की मधुर धुनें',
      sfxDesc: 'मंदिर की घंटियां, शंख, दीया प्रज्वलन व आतिशबाज़ी',
      testTitle: 'ध्वनि परीक्षण करें',
      testDiya: 'दीया जलाएं',
      testBell: 'मंदिर घंटी',
      testConch: 'शंखनाद',
      testDhak: 'उत्सव ढाक',
      testFirework: 'आतिशबाज़ी',
      muteAll: 'सब मौन करें',
      unmuteAll: 'ध्वनि चालू करें',
      creditsBtn: 'ध्वनि आभार एवं सत्यापित लाइसेंस',
      done: 'पूर्ण',
    },
    bn: {
      title: 'উৎসব অডিও নিয়ন্ত্রণ',
      subtitle: 'ভক্তিমূলক রাগ সংগীত ও উৎসবের শব্দাবলী আপনার পছন্দমতো সামঞ্জস্য করুন।',
      master: 'মাস্টার ভলিউম',
      music: 'উৎসবের সংগীত (রাগ ও তানপুরা)',
      sfx: 'শব্দ প্রভাব (প্রদীপ ও কাঁসর-ঘণ্টা)',
      musicDesc: 'সন্ধ্যা রাগ ভূপালী ও ইমনের প্রশান্ত সুর',
      sfxDesc: 'মন্দিরের ঘণ্টা, শাঁখ, প্রদীপ ও ঢাকের বাদন',
      testTitle: 'শব্দ পরীক্ষা করুন',
      testDiya: 'প্রদীপ জ্বালান',
      testBell: 'মন্দির ঘণ্টা',
      testConch: 'শাঁখের ধ্বনি',
      testDhak: 'পূজোর ঢাক',
      testFirework: 'আতশবাজি',
      muteAll: 'সব নিঃশব্দ করুন',
      unmuteAll: 'শব্দ চালু করুন',
      creditsBtn: 'অডিও ঋণস্বীকার ও লাইসেন্স',
      done: 'সম্পন্ন',
    },
  };

  const curLabels = labels[currentLanguage] || labels.en;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audio-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg my-auto rounded-3xl bg-[#141C33] border-2 border-[#D6AD60]/50 shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col text-[#FFF5DE]"
      >
        {/* Header */}
        <div className="shrink-0 p-4 sm:p-6 border-b border-[#D6AD60]/25 bg-gradient-to-r from-[#192747] to-[#10172D] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D6AD60]/20 border border-[#D6AD60]/50 flex items-center justify-center text-amber-300 shrink-0">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="audio-settings-title"
                className="text-lg sm:text-xl font-bold font-royal text-[#F4D995]"
              >
                {curLabels.title}
              </h2>
              <p className="text-xs text-[#FFF5DE]/75 mt-0.5 leading-relaxed">
                {curLabels.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="min-h-[44px] min-w-[44px] rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Sliders */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* 1. Master Volume Control */}
          <div className="p-3.5 rounded-2xl bg-[#10172D]/90 border border-[#D6AD60]/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#F4D995]" />
                <span className="text-sm font-bold text-[#F4D995]">{curLabels.master}</span>
              </div>
              <button
                type="button"
                onClick={() => audioManager.toggleMasterMute()}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  audioState.isMasterMuted
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-[#192747] text-[#F4D995] border-[#D6AD60]/40 hover:bg-[#D6AD60]/20'
                }`}
              >
                {audioState.isMasterMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Muted</span>
                  </>
                ) : (
                  <span>{Math.round(audioState.masterVolume * 100)}%</span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <VolumeX className="w-4 h-4 text-[#FFF5DE]/40 shrink-0" />
              <input
                type="range"
                min="0"
                max="100"
                value={audioState.isMasterMuted ? 0 : Math.round(audioState.masterVolume * 100)}
                onChange={(e) => {
                  const val = Number(e.target.value) / 100;
                  audioManager.setMasterVolume(val);
                  if (audioState.isMasterMuted) audioManager.toggleMasterMute();
                }}
                aria-label={curLabels.master}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={audioState.isMasterMuted ? 0 : Math.round(audioState.masterVolume * 100)}
                className="w-full h-2 bg-[#192747] rounded-lg appearance-none cursor-pointer accent-[#FFB347] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              />
              <Volume2 className="w-4 h-4 text-[#F4D995] shrink-0" />
            </div>
          </div>

          {/* 2. Background Festive Music */}
          <div className="p-3.5 rounded-2xl bg-[#10172D]/90 border border-[#D6AD60]/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <Music className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-[#F4D995] block">{curLabels.music}</span>
                  <span className="text-[11px] text-[#FFF5DE]/65 block">{curLabels.musicDesc}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => audioManager.toggleMusic()}
                aria-pressed={!audioState.isMusicMuted}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  !audioState.isMusicMuted
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                {!audioState.isMusicMuted ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>ON</span>
                  </>
                ) : (
                  <span>OFF</span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#FFF5DE]/50 w-7 text-right">0%</span>
              <input
                type="range"
                min="0"
                max="100"
                disabled={audioState.isMusicMuted}
                value={audioState.isMusicMuted ? 0 : Math.round(audioState.musicVolume * 100)}
                onChange={(e) => {
                  const val = Number(e.target.value) / 100;
                  audioManager.setMusicVolume(val);
                }}
                aria-label={curLabels.music}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={audioState.isMusicMuted ? 0 : Math.round(audioState.musicVolume * 100)}
                className="w-full h-2 bg-[#192747] rounded-lg appearance-none cursor-pointer accent-[#D6AD60] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              />
              <span className="text-[11px] text-[#F4D995] w-9 font-mono">
                {Math.round(audioState.musicVolume * 100)}%
              </span>
            </div>
          </div>

          {/* 3. Sound Effects (SFX) Volume */}
          <div className="p-3.5 rounded-2xl bg-[#10172D]/90 border border-[#D6AD60]/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-bold text-[#F4D995] block">{curLabels.sfx}</span>
                  <span className="text-[11px] text-[#FFF5DE]/65 block">{curLabels.sfxDesc}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => audioManager.toggleSfx()}
                aria-pressed={!audioState.isSfxMuted}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  !audioState.isSfxMuted
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                {!audioState.isSfxMuted ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>ON</span>
                  </>
                ) : (
                  <span>OFF</span>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#FFF5DE]/50 w-7 text-right">0%</span>
              <input
                type="range"
                min="0"
                max="100"
                disabled={audioState.isSfxMuted}
                value={audioState.isSfxMuted ? 0 : Math.round(audioState.sfxVolume * 100)}
                onChange={(e) => {
                  const val = Number(e.target.value) / 100;
                  audioManager.setSfxVolume(val);
                }}
                aria-label={curLabels.sfx}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={audioState.isSfxMuted ? 0 : Math.round(audioState.sfxVolume * 100)}
                className="w-full h-2 bg-[#192747] rounded-lg appearance-none cursor-pointer accent-[#FFB347] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              />
              <span className="text-[11px] text-[#F4D995] w-9 font-mono">
                {Math.round(audioState.sfxVolume * 100)}%
              </span>
            </div>
          </div>

          {/* 4. Quick Sound Effect Test Buttons */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#D6AD60] block">
              {curLabels.testTitle}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => audioManager.playDiyaLightSound()}
                className="min-h-[44px] px-2.5 py-2 rounded-xl bg-[#192747]/80 hover:bg-[#D6AD60]/20 border border-[#D6AD60]/30 text-xs font-medium text-[#FFF5DE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              >
                <span>🪔</span>
                <span>{curLabels.testDiya}</span>
              </button>

              <button
                type="button"
                onClick={() => audioManager.playTempleBellSound()}
                className="min-h-[44px] px-2.5 py-2 rounded-xl bg-[#192747]/80 hover:bg-[#D6AD60]/20 border border-[#D6AD60]/30 text-xs font-medium text-[#FFF5DE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              >
                <span>🔔</span>
                <span>{curLabels.testBell}</span>
              </button>

              <button
                type="button"
                onClick={() => audioManager.playShankhSound()}
                className="min-h-[44px] px-2.5 py-2 rounded-xl bg-[#192747]/80 hover:bg-[#D6AD60]/20 border border-[#D6AD60]/30 text-xs font-medium text-[#FFF5DE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              >
                <span>🐚</span>
                <span>{curLabels.testConch}</span>
              </button>

              <button
                type="button"
                onClick={() => audioManager.playDhakBeat()}
                className="min-h-[44px] px-2.5 py-2 rounded-xl bg-[#192747]/80 hover:bg-[#D6AD60]/20 border border-[#D6AD60]/30 text-xs font-medium text-[#FFF5DE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              >
                <span>🥁</span>
                <span>{curLabels.testDhak}</span>
              </button>

              <button
                type="button"
                onClick={() => audioManager.playRealFireworkBurst()}
                className="min-h-[44px] px-2.5 py-2 rounded-xl bg-[#192747]/80 hover:bg-[#D6AD60]/20 border border-[#D6AD60]/30 text-xs font-medium text-[#FFF5DE] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] col-span-2 sm:col-span-1"
              >
                <span>🎆</span>
                <span>{curLabels.testFirework}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 p-3 sm:p-4 border-t border-[#D6AD60]/25 bg-[#10172D] flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCredits();
            }}
            className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#192747] text-[#F4D995] hover:bg-[#192747]/80 border border-[#D6AD60]/40 transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{curLabels.creditsBtn}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#D6AD60] text-[#10172D] hover:bg-[#F4D995] transition-all cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-[#FFF5DE]"
          >
            {curLabels.done}
          </button>
        </div>
      </div>
    </div>
  );
};
