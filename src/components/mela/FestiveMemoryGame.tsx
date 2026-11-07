/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Eye, HelpCircle, Trophy, RotateCcw, Sparkles, Check, X } from 'lucide-react';
import { Language } from '../../utils/translations';
import { awardMelaReward } from '../../data/melaData';
import { audioManager } from '../../utils/audio';

interface MemoryItem {
  id: string;
  emoji: string;
  name: { en: string; hi: string; bn: string };
}

const ALL_FESTIVE_ITEMS: MemoryItem[] = [
  { id: 'diya', emoji: '🪔', name: { en: 'Mitti Diya', hi: 'मिट्टी का दीया', bn: 'মাটির প্রদীপ' } },
  { id: 'kaju', emoji: '🍬', name: { en: 'Kaju Katli', hi: 'काजू कतली', bn: 'কাজু বরফি' } },
  { id: 'marigold', emoji: '🌼', name: { en: 'Marigold Flower', hi: 'गेंदे का फूल', bn: 'গাঁদা ফুল' } },
  { id: 'sparkler', emoji: '✨', name: { en: 'Phuljhadi Sparkler', hi: 'फुलझड़ी', bn: 'ফুলঝুরি' } },
  { id: 'bell', emoji: '🔔', name: { en: 'Pooja Bell', hi: 'पूजा की घंटी', bn: 'পূজার ঘণ্টা' } },
  { id: 'gift', emoji: '🎁', name: { en: 'Mithai Gift Box', hi: 'उपहार का डिब्बा', bn: 'উপহারের বাক্স' } },
  { id: 'kalash', emoji: '🏺', name: { en: 'Mangal Kalash', hi: 'मंगल कलश', bn: 'মঙ্গল কলস' } },
  { id: 'coin', emoji: '🪙', name: { en: 'Lakshmi Coin', hi: 'लक्ष्मी सिक्का', bn: 'লক্ষ্মী মুদ্রা' } },
  { id: 'laddu', emoji: '🟡', name: { en: 'Motichoor Laddoo', hi: 'मोतीचूर लड्डू', bn: 'মতিচুর লাড্ডু' } },
  { id: 'toran', emoji: '🌿', name: { en: 'Mango Leaf Toran', hi: 'आम पत्ता तोरण', bn: 'আমপাতা তোরণ' } },
];

interface FestiveMemoryGameProps {
  language: Language;
  onRewardUpdate: () => void;
  onNextGame?: () => void;
}

export const FestiveMemoryGame: React.FC<FestiveMemoryGameProps> = ({
  language,
  onRewardUpdate,
  onNextGame,
}) => {
  const [level, setLevel] = useState<number>(1); // 1: 4 items, 2: 6 items, 3: 8 items
  const [phase, setPhase] = useState<'intro' | 'memorize' | 'guess' | 'won'>('intro');
  const [currentPool, setCurrentPool] = useState<MemoryItem[]>([]);
  const [missingItem, setMissingItem] = useState<MemoryItem | null>(null);
  const [options, setOptions] = useState<MemoryItem[]>([]);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(5);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getLevelConfig = (lvl: number) => {
    switch (lvl) {
      case 1:
        return { count: 4, seconds: 5, label: language === 'hi' ? 'आसान (4 वस्तुएं)' : language === 'bn' ? 'সহজ (৪টি সামগ্রী)' : 'Level 1: Novice (4 Objects)' };
      case 2:
        return { count: 6, seconds: 4, label: language === 'hi' ? 'मध्यम (6 वस्तुएं)' : language === 'bn' ? 'মাঝারি (৬টি সামগ্রী)' : 'Level 2: Adept (6 Objects)' };
      case 3:
      default:
        return { count: 8, seconds: 3.5, label: language === 'hi' ? 'कठिन (8 वस्तुएं)' : language === 'bn' ? 'কঠিন (৮টি সামগ্রী)' : 'Level 3: Master (8 Objects)' };
    }
  };

  const startRound = (targetLevel: number) => {
    const config = getLevelConfig(targetLevel);
    // Shuffle and pick pool
    const shuffled = [...ALL_FESTIVE_ITEMS].sort(() => Math.random() - 0.5);
    const pool = shuffled.slice(0, config.count);
    const chosenMissing = pool[Math.floor(Math.random() * pool.length)];

    // Create 4 multiple choice options: include missing item + 3 distractors
    const distractors = ALL_FESTIVE_ITEMS.filter((i) => i.id !== chosenMissing.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const roundOptions = [chosenMissing, ...distractors].sort(() => Math.random() - 0.5);

    setLevel(targetLevel);
    setCurrentPool(pool);
    setMissingItem(chosenMissing);
    setOptions(roundOptions);
    setSelectedGuess(null);
    setIsCorrect(null);
    setTimerSeconds(config.seconds);
    setPhase('memorize');

    audioManager.playButtonChime();
  };

  // Timer effect during memorize phase
  useEffect(() => {
    if (phase !== 'memorize') return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPhase('guess');
          audioManager.playBellChime();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  const handleGuess = (guessedItem: MemoryItem) => {
    if (phase !== 'guess' || selectedGuess !== null || !missingItem) return;

    setSelectedGuess(guessedItem.id);
    const correct = guessedItem.id === missingItem.id;
    setIsCorrect(correct);

    if (correct) {
      audioManager.playPoojaBell();
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D6AD60', '#F59E0B', '#10B981'],
      });

      setTimeout(() => {
        if (level < 3) {
          startRound(level + 1);
        } else {
          setPhase('won');
          awardMelaReward('memory_game', 25, 'memory_champion');
          onRewardUpdate();
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#D6AD60', '#F59E0B', '#EF4444', '#10B981'],
          });
        }
      }, 1500);
    } else {
      audioManager.playButtonChime();
    }
  };

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-amber-500/20 rounded-2xl p-4 backdrop-blur-md">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-amber-300 font-bold flex items-center gap-2">
            <span>🍬</span>
            {language === 'hi'
              ? 'उत्सव स्मृति खेल'
              : language === 'bn'
              ? 'উৎসবের স্মৃতি খেলা'
              : 'Festive Diwali Memory Challenge'}
          </h3>
          <p className="text-xs sm:text-sm text-amber-100/70">
            {language === 'hi'
              ? 'वस्तुओं को ध्यान से देखें। फिर बताएं कि कौन सी पवित्र वस्तु गायब हो गई!'
              : language === 'bn'
              ? 'সামগ্রীগুলো মনোযোগ দিয়ে দেখুন। তারপর বলুন কোন শুভ সামগ্রীটি অদৃশ্য হলো!'
              : 'Memorize the sacred objects briefly. Can you recall which item vanished?'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3].map((lvl) => (
            <div
              key={lvl}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${
                level === lvl && phase !== 'won'
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                  : level > lvl || phase === 'won'
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/5 border-white/10 text-white/40'
              }`}
            >
              <span>{level > lvl || phase === 'won' ? '✓' : `L${lvl}`}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="relative min-h-[380px] bg-gradient-to-b from-[#0c1228] to-[#171b35] rounded-2xl border-2 border-amber-500/30 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
        {/* Intro View */}
        {phase === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-700/20 border border-amber-500/40 flex items-center justify-center text-4xl mb-4 shadow-lg shadow-amber-500/20">
              🪔
            </div>
            <h4 className="font-serif text-2xl text-amber-300 font-bold mb-2">
              {language === 'hi'
                ? 'अपनी स्मृति परखें'
                : language === 'bn'
                ? 'আপনার স্মৃতিশক্তি পরীক্ষা করুন'
                : 'Test Your Festive Memory'}
            </h4>
            <p className="text-amber-100/80 text-sm leading-relaxed mb-6">
              {language === 'hi'
                ? 'दीवाली की शुभ वस्तुओं को कुछ सेकंड के लिए दिखाया जाएगा। फिर एक वस्तु गायब हो जाएगी। सही पहचान कर मिठाई चैंपियन बैज पाएं!'
                : language === 'bn'
                ? 'কয়েক সেকেন্ডের জন্য শুভ সামগ্রী দেখানো হবে। তারপর একটি সামগ্রী উধাও হবে। সঠিক উত্তর দিয়ে মিষ্টি চ্যাম্পিয়ন ব্যাজ জিতুন!'
                : 'Festive treasures will be displayed for a few seconds before one disappears. Identify the missing sacred object across 3 increasing levels!'}
            </p>
            <button
              onClick={() => startRound(1)}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-base shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
            >
              {language === 'hi'
                ? 'खेल शुरू करें'
                : language === 'bn'
                ? 'খেলা শুরু করুন'
                : 'Start Memory Challenge'}
            </button>
          </div>
        )}

        {/* Memorize Phase */}
        {phase === 'memorize' && (
          <div className="flex-1 flex flex-col justify-between">
            {/* Top Prompt with Timer */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold mb-2">
                <Eye className="w-4 h-4 text-amber-400 animate-pulse" />
                {language === 'hi'
                  ? 'ध्यान से याद रखें! समय शेष:'
                  : language === 'bn'
                  ? 'মনোযোগ দিয়ে মনে রাখুন! বাকি সময়:'
                  : 'Memorize these objects! Time left:'}{' '}
                <span className="text-amber-400 font-mono text-base font-bold">
                  {timerSeconds}s
                </span>
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-amber-300 font-bold">
                {getLevelConfig(level).label}
              </h4>
            </div>

            {/* Displayed Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto w-full my-auto">
              {currentPool.map((item) => (
                <div
                  key={item.id}
                  className="aspect-square bg-gradient-to-br from-white/10 to-white/5 border-2 border-amber-500/40 rounded-2xl flex flex-col items-center justify-center p-3 text-center shadow-lg transition-transform hover:scale-105"
                >
                  <span className="text-4xl sm:text-5xl mb-2 filter drop-shadow-md">
                    {item.emoji}
                  </span>
                  <span className="text-xs font-semibold text-amber-200 line-clamp-1">
                    {item.name[language]}
                  </span>
                </div>
              ))}
            </div>

            {/* Timer Bar */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-6">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${(timerSeconds / getLevelConfig(level).seconds) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Guess Phase */}
        {phase === 'guess' && missingItem && (
          <div className="flex-1 flex flex-col justify-between">
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold mb-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                {language === 'hi'
                  ? 'कौन सी वस्तु गायब है?'
                  : language === 'bn'
                  ? 'কোন সামগ্রীটি নিখোঁজ?'
                  : 'Which sacred object is missing?'}
              </span>
              <h4 className="font-serif text-lg sm:text-xl text-amber-300 font-bold">
                {language === 'hi'
                  ? 'नीचे दिए गए विकल्पों में से सही वस्तु चुनें'
                  : language === 'bn'
                  ? 'নিচের বিকল্পগুলি থেকে সঠিকটি নির্বাচন করুন'
                  : 'Select the missing object from the options below'}
              </h4>
            </div>

            {/* Grid showing remaining items + Question slot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto w-full my-auto">
              {currentPool.map((item) => {
                const isHidden = item.id === missingItem.id;
                if (isHidden) {
                  return (
                    <div
                      key="missing-slot"
                      className="aspect-square bg-amber-500/10 border-2 border-dashed border-amber-400 rounded-2xl flex flex-col items-center justify-center p-3 text-center animate-pulse"
                    >
                      <span className="text-4xl sm:text-5xl mb-2 text-amber-400 font-bold">
                        ?
                      </span>
                      <span className="text-xs font-bold text-amber-300">
                        {language === 'hi' ? 'गायब वस्तु' : language === 'bn' ? 'নিখোঁজ' : 'Missing'}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    className="aspect-square bg-white/5 border border-amber-500/20 rounded-2xl flex flex-col items-center justify-center p-3 text-center opacity-75"
                  >
                    <span className="text-4xl sm:text-5xl mb-2 filter drop-shadow-md">
                      {item.emoji}
                    </span>
                    <span className="text-xs font-semibold text-amber-200/80 line-clamp-1">
                      {item.name[language]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Multiple Choice Options */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {options.map((opt) => {
                  const isSelected = selectedGuess === opt.id;
                  const isThisCorrect = opt.id === missingItem.id;

                  let btnStyle =
                    'bg-white/5 border-amber-500/30 hover:border-amber-400 hover:bg-white/10 text-amber-200';

                  if (selectedGuess !== null) {
                    if (isThisCorrect) {
                      btnStyle =
                        'bg-emerald-950/60 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50';
                    } else if (isSelected && !isCorrect) {
                      btnStyle =
                        'bg-red-950/60 border-red-400 text-red-200 ring-2 ring-red-400/50';
                    } else {
                      btnStyle = 'opacity-40 border-white/10 text-white/50';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleGuess(opt)}
                      disabled={selectedGuess !== null}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center ${btnStyle}`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="text-xs font-bold leading-tight line-clamp-1">
                        {opt.name[language]}
                      </span>
                      {selectedGuess !== null && isThisCorrect && (
                        <Check className="w-4 h-4 text-emerald-400 mt-1" />
                      )}
                      {selectedGuess === opt.id && !isCorrect && (
                        <X className="w-4 h-4 text-red-400 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback if wrong */}
              {selectedGuess !== null && !isCorrect && (
                <div className="text-center mt-4">
                  <p className="text-xs text-red-300 mb-2">
                    {language === 'hi'
                      ? 'ओह! सही उत्तर था: '
                      : language === 'bn'
                      ? 'ভুল হয়েছে! সঠিক উত্তর ছিল: '
                      : 'Not quite! The missing item was: '}
                    <strong className="text-amber-300">
                      {missingItem.name[language]}
                    </strong>
                  </p>
                  <button
                    onClick={() => startRound(level)}
                    className="px-4 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-semibold inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {language === 'hi' ? 'पुनः प्रयास करें' : language === 'bn' ? 'আবার চেষ্টা করুন' : 'Try Level Again'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Won State */}
        {phase === 'won' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto py-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-4xl mb-4 shadow-xl shadow-amber-500/40 animate-bounce">
              <Trophy className="w-10 h-10 text-amber-950" />
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl text-amber-300 font-bold mb-2">
              {language === 'hi'
                ? 'उत्कृष्ट! स्मृति चैंपियन!'
                : language === 'bn'
                ? 'অসাধারণ! স্মৃতি চ্যাম্পিয়ন!'
                : 'Flawless Festive Memory!'}
            </h4>
            <p className="text-amber-100/90 text-sm leading-relaxed mb-6">
              {language === 'hi'
                ? 'आपने तीनों कठिन स्तरों में छिपी पवित्र वस्तुओं को बिल्कुल सही पहचाना। "मिठाई चैंपियन" बैज व २५ सितारे अनलॉक!'
                : language === 'bn'
                ? 'আপনি তিনটি কঠিন ধাপেই নির্ভুলভাবে হারিয়ে যাওয়া সামগ্রী শনাক্ত করেছেন। "মিষ্টি চ্যাম্পিয়ন" ব্যাজ ও ২৫টি তারা আনলক!'
                : 'You accurately recalled the missing festive objects across all 3 difficulty tiers! Unlocked "Mithai Champion" badge and +25 Stars!'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => startRound(1)}
                className="px-5 py-2.5 rounded-xl border border-amber-500/40 text-amber-200 hover:bg-amber-500/20 text-sm font-medium transition-colors"
              >
                {language === 'hi' ? 'पुनः खेलें' : language === 'bn' ? 'আবার খেলুন' : 'Replay Game'}
              </button>

              {onNextGame && (
                <button
                  onClick={onNextGame}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
                >
                  {language === 'hi'
                    ? 'अगला खेल: दीवाली प्रश्नोत्तरी ➔'
                    : language === 'bn'
                    ? 'পরের খেলা: দীপাবলি কুইজ ➔'
                    : 'Next Game: Diwali Quiz ➔'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
