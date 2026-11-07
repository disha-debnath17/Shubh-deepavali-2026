/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Check, Flame, RotateCcw } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface ChoddoProdipActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

interface DiyaSlot {
  id: number;
  label: { en: string; hi: string; bn: string };
  blessing: { en: string; hi: string; bn: string };
  x: number; // percentage in 2D layout
  y: number;
}

const DIYA_VIRTUES: DiyaSlot[] = [
  { id: 1, label: { en: 'Shanti', hi: 'शान्ति', bn: 'শান্তি' }, blessing: { en: 'Inner peace for all generations', hi: 'समस्त पीढ़ियों हेतु आत्मिक शान्ति', bn: 'সর্বজনের অন্তরে চিরন্তন শান্তি' }, x: 14, y: 18 },
  { id: 2, label: { en: 'Gyan', hi: 'ज्ञान', bn: 'জ্ঞান' }, blessing: { en: 'Wisdom that dispels darkness', hi: 'अज्ञान के अंधकार को मिटाने वाला ज्ञान', bn: 'অজ্ঞতার আঁধার নাশী দিব্য জ্ঞান' }, x: 38, y: 15 },
  { id: 3, label: { en: 'Arogya', hi: 'आरोग्य', bn: 'আরোগ্য' }, blessing: { en: 'Vital health and resilience', hi: 'उत्तम स्वास्थ्य एवं दीर्घायु', bn: 'নিরোগ দীর্ঘায়ু ও অটুট সুস্বাস্থ্য' }, x: 62, y: 15 },
  { id: 4, label: { en: 'Preeti', hi: 'प्रीति', bn: 'প্রীতি' }, blessing: { en: 'Unconditional love in the family', hi: 'परिवार में अगाध स्नेह व प्रेम', bn: 'পরিবারে অটুট স্নেহ ও ভালোবাসা' }, x: 86, y: 18 },

  { id: 5, label: { en: 'Abhaya', hi: 'अभय', bn: 'অভয়' }, blessing: { en: 'Courage against fear and shadows', hi: 'भय और नकारात्मकता से मुक्ति', bn: 'সকল ভয় ও অমঙ্গল হতে চিরমুক্তি' }, x: 10, y: 45 },
  { id: 6, label: { en: 'Samriddhi', hi: 'समृद्धि', bn: 'সমৃদ্ধি' }, blessing: { en: 'Honest abundance and grace', hi: 'सत्यमार्ग से प्राप्त बरकत', bn: 'সততা ও পবিত্রতার সাথে সমৃদ্ধি' }, x: 34, y: 42 },
  { id: 7, label: { en: 'Satya', hi: 'सत्य', bn: 'সত্য' }, blessing: { en: 'Steadfast truth in every word', hi: 'सदा सत्य के मार्ग पर चलने की शक्ति', bn: 'সত্যের পথে অবিচল থাকার প্রেরণা' }, x: 66, y: 42 },
  { id: 8, label: { en: 'Dharma', hi: 'धर्म', bn: 'ধর্ম' }, blessing: { en: 'Righteous conduct in life', hi: 'सदाचार एवं धर्म की रक्षा', bn: 'ন্যায্য জীবন ও সদাচারের আদর্শ' }, x: 90, y: 45 },

  { id: 9, label: { en: 'Karuna', hi: 'करुणा', bn: 'করুণা' }, blessing: { en: 'Compassion for all living beings', hi: 'समस्त जीवों के प्रति दया व करुणा', bn: 'সকল জীবের প্রতি গভীর সমবেদনা' }, x: 16, y: 72 },
  { id: 10, label: { en: 'Sneha', hi: 'स्नेह', bn: 'স্নেহ' }, blessing: { en: 'Kindness that warms every bond', hi: 'रिश्तों को मधुर बनाने वाला वात्सल्य', bn: 'সকল সম্পর্কের নিবিড় মিষ্টতা' }, x: 38, y: 70 },
  { id: 11, label: { en: 'Dhriti', hi: 'धृति', bn: 'ধৃতি' }, blessing: { en: 'Patience and mental strength', hi: 'धैर्य और मानसिक स्थिरता', bn: 'কঠিন সময়ে অবিচল ধৈর্য ও সাহস' }, x: 62, y: 70 },
  { id: 12, label: { en: 'Vinaya', hi: 'विनय', bn: 'বিনয়' }, blessing: { en: 'Humility and gentle grace', hi: 'नम्रता एवं बड़ों के प्रति आदर', bn: 'বিনম্র শ্রদ্ধা ও মনের অহংকার মুক্তি' }, x: 84, y: 72 },

  { id: 13, label: { en: 'Santosha', hi: 'संतोष', bn: 'সন্তোষ' }, blessing: { en: 'Contentment in every moment', hi: 'हृदय का सच्चा संतोष व आनंद', bn: 'হৃদয়ের পরম তৃপ্তি ও আনন্দ' }, x: 32, y: 92 },
  { id: 14, label: { en: 'Moksha', hi: 'मोक्ष ज्योति', bn: 'মোক্ষ জ্যোতি' }, blessing: { en: 'Supreme liberation and eternal light', hi: 'परम ज्योति एवं पूर्वजों का आशीर्वाद', bn: 'পরম আলো ও পূর্বপুরুষের আশীর্বাদ' }, x: 68, y: 92 },
];

export const ChoddoProdipActivity: React.FC<ChoddoProdipActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [litDiyas, setLitDiyas] = useState<boolean[]>(new Array(14).fill(false));
  const [lastRevealedVirtue, setLastRevealedVirtue] = useState<DiyaSlot | null>(null);

  const litCount = litDiyas.filter(Boolean).length;
  const isComplete = litCount === 14;

  const toggleDiya = (index: number) => {
    audioManager.playDiyaLightSound();
    setLitDiyas((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      const count = next.filter(Boolean).length;
      if (next[index]) {
        setLastRevealedVirtue(DIYA_VIRTUES[index]);
      }
      if (count === 14) {
        audioManager.playSparkleSound();
        try {
          confetti({
            particleCount: 65,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F5A623', '#F4D995', '#B5532A', '#FFE082'],
          });
        } catch (e) {}
        if (onComplete) onComplete();
      }
      return next;
    });
  };

  const lightAll = () => {
    audioManager.playDiyaLightSound();
    audioManager.playSparkleSound();
    setLitDiyas(new Array(14).fill(true));
    setLastRevealedVirtue(DIYA_VIRTUES[13]);
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F5A623', '#F4D995', '#D6AD60', '#FFE082'],
      });
    } catch (e) {}
    if (onComplete) onComplete();
  };

  const resetAll = () => {
    audioManager.playClickSound();
    setLitDiyas(new Array(14).fill(false));
    setLastRevealedVirtue(null);
  };

  // Ambient lighting level calculation: darkness recedes as litCount increases
  const warmthOpacity = (litCount / 14) * 0.85;

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Status & Progress */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🪔</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'चौदह दीप (१४ दीये) प्रज्वलन'
                : currentLanguage === 'bn'
                ? 'চোদ্দ প্রদীপ প্রজ্বালন প্রথা'
                : 'Lighting 14 Sacred Earthen Lamps'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'भूत चतुर्दशी: पारंपरिक लोक मान्यता के अनुसार घर के चौदह कोनों से अंधकार दूर कर पूर्वजों की स्मृति का वंदन करें।'
              : currentLanguage === 'bn'
              ? 'ভূত চতুর্দশী: চিরায়ত লোকবিশ্বাস অনুসারে গৃহের প্রতিটি কোণ আলোকিত করে চৌদ্দ পুরুষের স্মরণে আলোকপ্রার্থনা করুন।'
              : 'Tap each earthen lamp to dispel shadows, observing the traditional belief of honoring fourteen generations of ancestors.'}
          </p>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-2">
            <Flame className={`w-3.5 h-3.5 ${litCount > 0 ? 'text-[#FFB347] animate-pulse' : 'text-slate-400'}`} />
            <span>{litCount} / 14 {currentLanguage === 'hi' ? 'दीये' : currentLanguage === 'bn' ? 'প্রদীপ' : 'Lamps'}</span>
          </div>

          <button
            onClick={isComplete ? resetAll : lightAll}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {isComplete ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{currentLanguage === 'hi' ? 'पुनः जलाएं' : currentLanguage === 'bn' ? 'আবার শুরু' : 'Reset'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
                <span>{currentLanguage === 'hi' ? 'सभी १४ दीये जलाएं' : currentLanguage === 'bn' ? 'একসাথে সব জ্বালান' : 'Light All 14'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Altar / Courtyard Interactive Canvas */}
      <div
        className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl transition-all duration-1000 flex items-center justify-center p-3 sm:p-6"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(245, 166, 35, ${0.15 + warmthOpacity * 0.45}) 0%, rgba(25, 39, 71, 0.95) 60%, #0A0F1D 100%)`,
        }}
      >
        {/* Subtle Decorative Terracotta Courtyard Floor Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #D6AD60 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Ambient Warm Aura expanding with lit count */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: warmthOpacity,
            background: `radial-gradient(circle at 50% 50%, rgba(255, 179, 71, 0.35) 0%, rgba(181, 83, 42, 0.2) 50%, transparent 80%)`,
          }}
        />

        {/* Traditional Alpona Threshold Arch in SVG background */}
        <svg
          viewBox="0 0 800 500"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        >
          <ellipse cx="400" cy="250" rx="360" ry="210" fill="none" stroke="#D6AD60" strokeWidth="1" strokeDasharray="6 6" />
          <ellipse cx="400" cy="250" rx="270" ry="150" fill="none" stroke="#F4D995" strokeWidth="0.8" />
          <path d="M 100 250 Q 400 50 700 250" fill="none" stroke="#FFF5DE" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M 100 250 Q 400 450 700 250" fill="none" stroke="#FFF5DE" strokeWidth="1" strokeOpacity="0.3" />
        </svg>

        {/* 14 Interactive Diyas arranged in traditional geometry */}
        <div className="relative w-full h-full max-w-[720px] max-h-[420px] mx-auto">
          {DIYA_VIRTUES.map((diya, idx) => {
            const isLit = litDiyas[idx];
            return (
              <div
                key={diya.id}
                style={{
                  position: 'absolute',
                  left: `${diya.x}%`,
                  top: `${diya.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="z-20 flex flex-col items-center group cursor-pointer"
                onClick={() => toggleDiya(idx)}
              >
                {/* Organic Mitti Diya SVG */}
                <div className="relative transition-transform duration-300 group-hover:scale-115 active:scale-95">
                  <svg
                    viewBox="0 0 100 80"
                    className="w-11 sm:w-14 md:w-16 h-auto drop-shadow-md"
                  >
                    {/* Flame if lit */}
                    {isLit && (
                      <g className="animate-flame origin-bottom">
                        {/* Outer Glow */}
                        <circle cx="50" cy="22" r="18" fill="rgba(255, 179, 71, 0.4)" filter="blur(6px)" />
                        {/* Golden Flame Outer */}
                        <path
                          d="M 50 4 C 44 14, 40 22, 43 31 C 45 37, 55 37, 57 31 C 60 22, 56 14, 50 4 Z"
                          fill="url(#choddoFlameGrad)"
                        />
                        {/* Bright Core */}
                        <path
                          d="M 50 12 C 47 18, 45 24, 47 29 C 48 32, 52 32, 53 29 C 55 24, 53 18, 50 12 Z"
                          fill="#FFFDE7"
                          className="animate-flame-core"
                        />
                      </g>
                    )}

                    {/* Terracotta Clay Diya Bowl */}
                    <path
                      d="M 12 48 Q 50 82 88 48 C 76 60 24 60 12 48 Z"
                      fill="#823617"
                    />
                    <path
                      d="M 15 46 Q 50 72 85 46 Q 50 56 15 46 Z"
                      fill="#B5532A"
                    />
                    <ellipse cx="50" cy="46" rx="35" ry="8" fill="#5A240E" />
                    {/* Cotton wick tip */}
                    <path d="M 48 46 Q 50 34 50 30" stroke="#2D1810" strokeWidth="2.5" strokeLinecap="round" />
                    {isLit && (
                      <circle cx="50" cy="30" r="2.5" fill="#FFE082" />
                    )}

                    <defs>
                      <linearGradient id="choddoFlameGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFDE7" />
                        <stop offset="40%" stopColor="#FFD54F" />
                        <stop offset="75%" stopColor="#FF9800" />
                        <stop offset="100%" stopColor="#E65100" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Tap indicator badge if unlit */}
                  {!isLit && (
                    <span className="absolute -top-1 right-0 w-2.5 h-2.5 rounded-full bg-[#D6AD60] animate-ping" />
                  )}
                </div>

                {/* Virtue Label */}
                <div
                  className={`mt-1 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-semibold whitespace-nowrap transition-all ${
                    isLit
                      ? 'bg-[#192747]/90 text-[#F4D995] border border-[#D6AD60]/50 shadow-sm'
                      : 'bg-black/50 text-[#FFF5DE]/60'
                  }`}
                >
                  <span className="text-[8px] text-[#FFB347] mr-1">#{diya.id}</span>
                  <span>{diya.label[currentLanguage]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Completion Blessing Banner */}
        {isComplete && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">🪔✨</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'चौदह दीपों का दिव्य आलोक सम्पन्न!'
                  : currentLanguage === 'bn'
                  ? 'চৌদ্দ প্রদীপের পুণ্য আলোয় ঘর উদ্ভাসিত!'
                  : 'All 14 Sacred Lamps are Radiant!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'आपके घर की चौखट और कोनों से सारा अंधकार दूर हो गया है। १४ पीढ़ियों के पूर्वजों का पावन आशीर्वाद आपके साथ है।'
                  : currentLanguage === 'bn'
                  ? 'গৃহকোণের সমস্ত আঁধার দূর হয়ে নেমে এসেছে পরম শান্তি। চোদ্দ পুরুষের স্মরণে আপনার ঘর প্রেম ও পবিত্রতায় আলোকিত।'
                  : 'The shadows have receded from every corner. The memory and blessings of fourteen generations of ancestors fill your home with warmth and peace.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => audioManager.playSparkleSound()}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-gradient-to-r from-[#F4D995] to-[#D6AD60] hover:brightness-110 shadow-md cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'शुभ भूत चतुर्दशी 🙏' : currentLanguage === 'bn' ? 'শুভ ভূত চতুর্দশী 🙏' : 'Blessing Received 🙏'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Virtue Revelation Card below canvas */}
      {lastRevealedVirtue && !isComplete && (
        <div className="w-full mt-3 p-3 rounded-2xl bg-[#192747]/80 border border-[#D6AD60]/40 flex items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D6AD60]/20 border border-[#D6AD60]/50 flex items-center justify-center text-[#F4D995] text-xs font-bold">
              #{lastRevealedVirtue.id}
            </div>
            <div>
              <div className="text-xs font-bold text-[#F4D995]">
                {lastRevealedVirtue.label[currentLanguage]} · {currentLanguage === 'hi' ? 'पावन ज्योति' : currentLanguage === 'bn' ? 'পবিত্র প্রদীপ' : 'Sacred Lamp'}
              </div>
              <div className="text-[11px] text-[#FFF5DE]/80">
                "{lastRevealedVirtue.blessing[currentLanguage]}"
              </div>
            </div>
          </div>
          <span className="text-xs text-[#FFB347] font-semibold shrink-0">
            {litCount}/14 {currentLanguage === 'hi' ? 'प्रज्वलित' : currentLanguage === 'bn' ? 'প্রজ্বলিত' : 'Lit'}
          </span>
        </div>
      )}
    </div>
  );
};
