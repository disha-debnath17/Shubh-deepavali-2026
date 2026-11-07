/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Paintbrush, Search, Brain, HelpCircle, Flame, ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../../utils/translations';
import { getStoredMelaRewards, MelaRewardState } from '../../data/melaData';
import { MelaRewardBar } from './MelaRewardBar';
import { RangoliChallenge } from './RangoliChallenge';
import { DiwaliTreasureHunt } from './DiwaliTreasureHunt';
import { FestiveMemoryGame } from './FestiveMemoryGame';
import { DiwaliQuiz } from './DiwaliQuiz';
import { FireworkPatternChallenge } from './FireworkPatternChallenge';
import { audioManager } from '../../utils/audio';

interface EcoDiwaliMelaModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  selectedState?: string;
  userName?: string;
}

export type MelaGameTab = 'rangoli' | 'hunt' | 'memory' | 'quiz' | 'fireworks';

export const EcoDiwaliMelaModal: React.FC<EcoDiwaliMelaModalProps> = ({
  isOpen,
  onClose,
  language,
  selectedState = 'West Bengal',
  userName = 'Friend',
}) => {
  const [activeTab, setActiveTab] = useState<MelaGameTab>('rangoli');
  const [rewardState, setRewardState] = useState<MelaRewardState>(getStoredMelaRewards());
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setRewardState(getStoredMelaRewards());
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        audioManager.playButtonChime();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRewardUpdate = () => {
    setRewardState(getStoredMelaRewards());
  };

  const navTabs: { id: MelaGameTab; label: { en: string; hi: string; bn: string }; icon: string }[] = [
    {
      id: 'rangoli',
      label: { en: 'A. Rangoli Challenge', hi: 'ए. रंगोली निर्माता', bn: 'ক. আলপনা চ্যালেঞ্জ' },
      icon: '🌸',
    },
    {
      id: 'hunt',
      label: { en: 'B. Treasure Hunt', hi: 'बी. खजाने की खोज', bn: 'খ. লুকানো ধন সন্ধান' },
      icon: '🔍',
    },
    {
      id: 'memory',
      label: { en: 'C. Memory Game', hi: 'सी. स्मृति चुनौती', bn: 'গ. স্মৃতি পরীক্ষা' },
      icon: '🍬',
    },
    {
      id: 'quiz',
      label: { en: 'D. Diwali Quiz', hi: 'डी. दिवाली क्विज़', bn: 'ঘ. দীপাবলি কুইজ' },
      icon: '🧭',
    },
    {
      id: 'fireworks',
      label: { en: 'E. Firework Pattern', hi: 'ई. डिजिटल आतिशबाजी', bn: 'ঙ. সবুজ আতশবাজি' },
      icon: '🎆',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mela-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-xl flex flex-col animate-fadeIn"
    >
      {/* Decorative ambient glowing background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Floating flower petals */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-xl opacity-40 select-none animate-floatPetal"
            style={{
              left: `${(i * 19) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${12 + (i % 6)}s`,
            }}
          >
            {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🌼' : '✨'}
          </div>
        ))}
      </div>

      {/* Top Navigation & App Bar */}
      <header className="sticky top-0 z-30 bg-[#0c1228]/95 border-b border-amber-500/30 backdrop-blur-md px-3 sm:px-6 py-3 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              onClick={() => {
                audioManager.playButtonChime();
                onClose();
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 border border-amber-500/30 transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-semibold shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">
                {language === 'hi' ? 'सजावट पर लौटें' : language === 'bn' ? 'ফিরে যান' : 'Back'}
              </span>
            </button>

            <div className="min-w-0">
              <h2
                id="mela-modal-title"
                className="font-serif text-base sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent flex items-center gap-1.5 sm:gap-2 truncate"
              >
                <span>🎡</span>
                <span className="truncate">
                  {language === 'hi'
                    ? 'शुभ दिवाली मेला: खेल और आनंद!'
                    : language === 'bn'
                    ? 'শুভ দীপাবলি মেলা: আনন্দ ও খেলাধূলা!'
                    : 'Shubh Diwali Fun & Games Mela!'}
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-amber-100/80 truncate">
                {language === 'hi'
                  ? `स्वागत है ${userName}! खेलें, पहेलियां सुलझाएं और ढेर सारे दिवाली सितारे जीतें! 🎯⭐`
                  : language === 'bn'
                  ? `স্বাগতম ${userName}! আনন্দময় খেলা খেলুন ও দীপাবলি তারা জিতে নিন! 🎯⭐`
                  : `Step right up, ${userName}! Playful challenges, joyful games & sparkly Diwali stars! 🎯⭐`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Audio toggle */}
            <button
              onClick={() => {
                const muted = audioManager.toggleMute();
                setIsMuted(muted);
              }}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 border border-amber-500/30 transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Close button */}
            <button
              onClick={() => {
                audioManager.playButtonChime();
                onClose();
              }}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 transition-colors flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              title="Close Mela"
              aria-label="Close Mela"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 flex flex-col gap-4 sm:gap-6">
        {/* Persistent Reward & Achievement Bar */}
        <MelaRewardBar language={language} rewardState={rewardState} />

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar touch-pan-x">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isFinished = rewardState.completedGames.includes(
              tab.id === 'hunt'
                ? 'treasure_hunt'
                : tab.id === 'memory'
                ? 'memory_game'
                : tab.id === 'quiz'
                ? 'diwali_quiz'
                : tab.id === 'fireworks'
                ? 'firework_challenge'
                : 'rangoli'
            );

            return (
              <button
                key={tab.id}
                onClick={() => {
                  audioManager.playButtonChime();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 sm:px-4 py-2.5 min-h-[44px] rounded-2xl border text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-102 sm:scale-105'
                    : 'bg-white/5 border-amber-500/20 hover:border-amber-400 text-amber-200/80 hover:bg-white/10'
                }`}
              >
                <span className="text-sm sm:text-base">{tab.icon}</span>
                <span>{tab.label[language]}</span>
                {isFinished && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-amber-950 text-amber-200' : 'bg-emerald-500/30 text-emerald-300'
                    }`}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Game Stage Component */}
        <div className="flex-1">
          {activeTab === 'rangoli' && (
            <RangoliChallenge
              language={language}
              onRewardUpdate={handleRewardUpdate}
              onNextGame={() => setActiveTab('hunt')}
            />
          )}

          {activeTab === 'hunt' && (
            <DiwaliTreasureHunt
              language={language}
              onRewardUpdate={handleRewardUpdate}
              onNextGame={() => setActiveTab('memory')}
            />
          )}

          {activeTab === 'memory' && (
            <FestiveMemoryGame
              language={language}
              onRewardUpdate={handleRewardUpdate}
              onNextGame={() => setActiveTab('quiz')}
            />
          )}

          {activeTab === 'quiz' && (
            <DiwaliQuiz
              language={language}
              selectedState={selectedState}
              onRewardUpdate={handleRewardUpdate}
              onNextGame={() => setActiveTab('fireworks')}
            />
          )}

          {activeTab === 'fireworks' && (
            <FireworkPatternChallenge
              language={language}
              onRewardUpdate={handleRewardUpdate}
              onNextGame={() => setActiveTab('rangoli')}
            />
          )}
        </div>
      </main>
    </div>
  );
};
