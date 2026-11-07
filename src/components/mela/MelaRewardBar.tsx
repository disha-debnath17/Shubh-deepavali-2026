/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Award, ChevronRight, X, Trophy, Sparkles } from 'lucide-react';
import { Language } from '../../utils/translations';
import { MELA_BADGES, MelaRewardState } from '../../data/melaData';
import { audioManager } from '../../utils/audio';

interface MelaRewardBarProps {
  language: Language;
  rewardState: MelaRewardState;
}

export const MelaRewardBar: React.FC<MelaRewardBarProps> = ({
  language,
  rewardState,
}) => {
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const totalGames = 5;
  const completedCount = rewardState.completedGames.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalGames) * 100));

  return (
    <>
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-amber-950/70 border border-amber-500/30 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        {/* Left: Star Counter */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-md shadow-amber-500/30 text-amber-950">
            <Star className="w-5 h-5 fill-amber-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg sm:text-xl font-bold text-amber-300">
                {rewardState.stars}
              </span>
              <span className="text-xs uppercase tracking-wider text-amber-200/70 font-semibold">
                {language === 'hi' ? 'दिवाली सितारे' : language === 'bn' ? 'দীপাবলি তারা' : 'Diwali Stars'}
              </span>
            </div>
            <p className="text-[11px] text-amber-100/60">
              {language === 'hi'
                ? 'प्रत्येक खेल पूरा करने पर +२५ सितारे'
                : language === 'bn'
                ? 'প্রতিটি খেলা সম্পন্ন করলে +২৫ তারা'
                : '+25 stars earned per festive challenge'}
            </p>
          </div>
        </div>

        {/* Middle: Progress Bar */}
        <div className="flex-1 min-w-[200px] max-w-sm hidden sm:block">
          <div className="flex justify-between items-center text-xs text-amber-200/80 mb-1 font-medium">
            <span>
              {language === 'hi' ? 'मेला प्रगति' : language === 'bn' ? 'মেলা অগ্রগতি' : 'Mela Activities'}
            </span>
            <span className="text-amber-400 font-bold font-mono">
              {completedCount} / {totalGames} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden border border-white/5">
            <div
              className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 h-full transition-all duration-500 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Badges Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioManager.playButtonChime();
              setShowBadgeModal(true);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold transition-all hover:scale-105"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>
              {language === 'hi' ? 'बैज' : language === 'bn' ? 'ব্যাজ' : 'Badges'}:{' '}
              <strong className="text-amber-300 font-mono">
                {rewardState.badges.length} / {MELA_BADGES.length}
              </strong>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400/70" />
          </button>
        </div>
      </div>

      {/* Badges Modal */}
      {showBadgeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-[#101735] to-[#1a203f] border-2 border-amber-500/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowBadgeModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-amber-200/70 hover:text-amber-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl text-amber-400">
                🏆
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-amber-300 font-bold">
                  {language === 'hi'
                    ? 'उत्सव बैज एवं उपलब्धियां'
                    : language === 'bn'
                    ? 'উৎসব ব্যাজ ও অর্জন'
                    : 'Festive Badges & Achievements'}
                </h3>
                <p className="text-xs sm:text-sm text-amber-100/70">
                  {language === 'hi'
                    ? 'सभी खेल खेलकर अद्वितीय दीपोत्सव सम्मान अर्जित करें!'
                    : language === 'bn'
                    ? 'সব খেলা খেলে বিশেষ দীপাবলি সম্মাননা অর্জন করুন!'
                    : 'Complete challenges across the Mela to unlock sacred honors!'}
                </p>
              </div>
            </div>

            {/* Badges List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {MELA_BADGES.map((badge) => {
                const isUnlocked = rewardState.badges.includes(badge.id);

                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                      isUnlocked
                        ? 'bg-amber-500/15 border-amber-400/60 shadow-md ring-1 ring-amber-400/20'
                        : 'bg-white/5 border-white/10 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                        isUnlocked
                          ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-md shadow-amber-500/30'
                          : 'bg-white/10 grayscale'
                      }`}
                    >
                      {badge.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-amber-200 truncate">
                          {badge.name[language]}
                        </h4>
                        {isUnlocked && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40">
                            {language === 'hi' ? 'अनलॉक' : language === 'bn' ? 'আনলক' : 'Unlocked'}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-amber-100/70 mt-0.5 leading-snug">
                        {badge.desc[language]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-2 border-t border-white/10">
              <button
                onClick={() => setShowBadgeModal(false)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-sm shadow-md transition-all"
              >
                {language === 'hi' ? 'बंद करें' : language === 'bn' ? 'বন্ধ করুন' : 'Back to Mela'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
