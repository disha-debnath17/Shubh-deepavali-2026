/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  SlidersHorizontal,
  Info,
  Menu,
  X,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { ScreenId } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import { LanguageSelector } from './LanguageSelector';
import { audioManager, AudioState } from '../utils/audio';
import { getRegionByName } from '../data/regionalData';

interface TopBarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  maxUnlockedScreen: ScreenId;
  onOpenShare?: () => void;
  onOpenCustomize: () => void;
  isCreatorMode?: boolean;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenAudioSettings?: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  activeState?: string;
  onOpenRegionalExplorer?: () => void;
  onOpenAudioCredits?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  onNavigate,
  maxUnlockedScreen,
  onOpenShare,
  onOpenCustomize,
  isCreatorMode = false,
  isAudioMuted,
  onToggleAudio,
  onOpenAudioSettings,
  currentLanguage,
  onSelectLanguage,
  activeState,
  onOpenRegionalExplorer,
  onOpenAudioCredits,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const region = getRegionByName(activeState || '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [audioState, setAudioState] = useState<AudioState>(() => audioManager.getState());

  useEffect(() => {
    const unsub = audioManager.subscribe((st) => setAudioState(st));
    return () => unsub();
  }, []);

  const steps: { id: ScreenId; label: string; icon: string }[] = [
    { id: 1, label: t.nav.welcome, icon: '🪔' },
    { id: 2, label: t.nav.decorate, icon: '✨' },
    { id: 3, label: t.nav.fireworks, icon: '🎆' },
    { id: 4, label: t.nav.mithai, icon: '🍬' },
    { id: 5, label: t.nav.gift, icon: '🎁' },
    { id: 6, label: t.nav.letter, icon: '💌' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#D6AD60]/25 bg-[#10172D]/95 px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          {/* Mobile menu hamburger toggle for screens < 1280px */}
          <button
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="xl:hidden min-h-[44px] min-w-[44px] rounded-xl bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] border border-[#D6AD60]/30 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              onNavigate(1);
            }}
            className="text-left font-royal text-sm sm:text-base md:text-lg font-bold tracking-wider text-[#F4D995] hover:text-[#FFF5DE] transition-colors whitespace-nowrap flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F] rounded-lg py-1 px-1.5"
          >
            <span className="text-amber-400 text-base sm:text-xl">🪔</span>
            <span className="truncate max-w-[130px] xs:max-w-[180px] sm:max-w-none">{t.appTitle}</span>
          </button>
        </div>

        {/* Zone 2: Navigation progress links (Desktop 1280px+) */}
        <nav aria-label="Celebration Journey" className="hidden xl:flex items-center gap-1.5 text-xs font-medium shrink-0">
          {steps.map((step) => {
            const isCurrent = currentScreen === step.id;
            const isUnlocked = step.id <= maxUnlockedScreen;

            return (
              <button
                key={step.id}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    audioManager.playClickSound();
                    onNavigate(step.id);
                  }
                }}
                className={`min-h-[40px] px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none ${
                  isCurrent
                    ? 'bg-[#D6AD60]/25 text-[#F4D995] border border-[#D6AD60]/60 font-bold shadow-xs'
                    : isUnlocked
                    ? 'text-[#FFF5DE]/80 hover:text-[#FFF5DE] hover:bg-[#192747]/80'
                    : 'text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                <span className="text-sm">{step.icon}</span>
                <span>{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary action & controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Pan-India Traditions Explorer */}
          {onOpenRegionalExplorer && (
            <button
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                onOpenRegionalExplorer();
              }}
              title="Explore India's Diwali Traditions (28 States & 8 UTs)"
              aria-label="Explore India's Diwali Traditions (28 States & 8 UTs)"
              className="min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#D6AD60]/40 bg-[#192747]/80 text-[#F4D995] hover:bg-[#D6AD60]/20 hover:text-[#FFF5DE] transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
            >
              <span className="text-sm">🇮🇳</span>
              <span className="hidden lg:inline truncate max-w-[90px]">
                {region ? (region.shortName || region.name) : 'All India'}
              </span>
            </button>
          )}

          {/* Multilingual Selector */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onSelectLanguage={onSelectLanguage}
            variant="header"
          />

          {/* Creator Mode Settings */}
          {isCreatorMode && (
            <button
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                onOpenCustomize();
              }}
              aria-label={t.editGifts}
              title={t.editGifts}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-[#D6AD60]/50 bg-[#D6AD60]/20 text-[#F4D995] hover:bg-[#D6AD60]/35 hover:text-[#FFF5DE] transition-colors focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          {/* Audio Controls & Volume Settings Drawer Button */}
          {onOpenAudioSettings ? (
            <button
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                onOpenAudioSettings();
              }}
              aria-label="Open Audio & Volume Controls"
              title="Audio & Volume Controls"
              className={`min-h-[44px] px-2.5 sm:px-3 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none cursor-pointer ${
                audioState.isMasterMuted
                  ? 'border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20'
                  : 'border-[#D6AD60]/50 bg-[#192747]/80 text-[#F4D995] hover:bg-[#D6AD60]/20'
              }`}
            >
              {audioState.isMasterMuted ? (
                <VolumeX className="w-4 h-4 text-rose-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#F4D995]" />
              )}
              <span className="hidden sm:inline">
                {audioState.isMasterMuted ? 'Muted' : `${Math.round(audioState.masterVolume * 100)}%`}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onToggleAudio}
              aria-label={isAudioMuted ? t.musicOn : t.musicOff}
              title={isAudioMuted ? t.musicOn : t.musicOff}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none cursor-pointer ${
                !isAudioMuted
                  ? 'border-[#D6AD60]/60 bg-[#D6AD60]/20 text-[#F4D995]'
                  : 'border-[#D6AD60]/30 bg-[#192747]/70 text-slate-400 hover:text-[#FFF5DE]'
              }`}
            >
              {!isAudioMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          )}

          {/* Audio Credits & Licences Button */}
          {onOpenAudioCredits && (
            <button
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                onOpenAudioCredits();
              }}
              aria-label={t.audioCreditsBtn || 'Audio Credits & Licences'}
              title={t.audioCreditsBtn || 'Audio Credits & Licences'}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-[#D6AD60]/30 bg-[#192747]/70 text-[#F4D995] hover:bg-[#D6AD60]/20 hover:text-[#FFF5DE] transition-colors focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none cursor-pointer"
            >
              <Info className="w-4 h-4 text-[#D6AD60]" />
            </button>
          )}
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer (< 1280px) */}
      {isMobileMenuOpen && (
        <div
          role="region"
          aria-label="Mobile Navigation"
          className="xl:hidden mt-2 pt-2 border-t border-[#D6AD60]/20 animate-fade-in"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-1">
            {steps.map((step) => {
              const isCurrent = currentScreen === step.id;
              const isUnlocked = step.id <= maxUnlockedScreen;

              return (
                <button
                  key={step.id}
                  disabled={!isUnlocked}
                  onClick={() => {
                    if (isUnlocked) {
                      audioManager.playClickSound();
                      onNavigate(step.id);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between gap-1.5 transition-all text-left border ${
                    isCurrent
                      ? 'bg-[#D6AD60]/25 text-[#F4D995] border-[#D6AD60] shadow-sm font-bold'
                      : isUnlocked
                      ? 'bg-[#192747]/80 text-[#FFF5DE]/90 border-[#D6AD60]/25 hover:border-[#D6AD60]/50'
                      : 'bg-[#10172D]/50 text-slate-500 border-white/5 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span>{step.icon}</span>
                    <span className="truncate">{step.label}</span>
                  </span>
                  {isUnlocked && <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
