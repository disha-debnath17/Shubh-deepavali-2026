/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Flame, RotateCcw, Bell, Waves } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface AyodhyaDeepotsavActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

interface RiverDiya {
  id: number;
  x: number; // percentage
  y: number;
  type: 'diya' | 'lotus';
}

export const AyodhyaDeepotsavActivity: React.FC<AyodhyaDeepotsavActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // Ghat steps: 4 rows of diyas, each with 4 lamps (16 total ghat lamps)
  const [litGhatSteps, setLitGhatSteps] = useState<number[]>([1, 2]);
  // River floating lamps & lotus
  const [floatingItems, setFloatingItems] = useState<RiverDiya[]>([
    { id: 101, x: 25, y: 72, type: 'diya' },
    { id: 102, x: 50, y: 82, type: 'lotus' },
    { id: 103, x: 75, y: 76, type: 'diya' },
  ]);
  const [bellRungCount, setBellRungCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalGhatLamps = 12;

  const toggleGhatLamp = (id: number) => {
    audioManager.playDiyaLightSound();
    setLitGhatSteps((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      if (next.length === totalGhatLamps) {
        checkCompletion();
      }
      return next;
    });
  };

  const addFloatingOffering = (type: 'diya' | 'lotus') => {
    audioManager.playWaterSplashSound();
    setTimeout(() => {
      audioManager.playDiyaLightSound();
    }, 200);

    const newId = Date.now();
    const randomX = Math.floor(Math.random() * 70) + 15;
    const randomY = Math.floor(Math.random() * 22) + 68;

    setFloatingItems((prev) => [...prev.slice(-7), { id: newId, x: randomX, y: randomY, type }]);

    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.8 },
        colors: type === 'lotus' ? ['#FF80AB', '#FF4081', '#F4D995'] : ['#F5A623', '#F4D995', '#FFE082'],
      });
    } catch (e) {}
  };

  const ringTempleBell = () => {
    audioManager.playTempleBellSound();
    setBellRungCount((c) => c + 1);
  };

  const blowShankh = () => {
    audioManager.playShankhSound();
  };

  const lightAllGhats = () => {
    audioManager.playTempleBellSound();
    audioManager.playSparkleSound();
    setLitGhatSteps(Array.from({ length: totalGhatLamps }, (_, i) => i + 1));
    checkCompletion();
  };

  const checkCompletion = () => {
    setIsCompleted(true);
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

  const handleReset = () => {
    audioManager.playClickSound();
    setLitGhatSteps([1, 2]);
    setFloatingItems([
      { id: 101, x: 25, y: 72, type: 'diya' },
      { id: 102, x: 50, y: 82, type: 'lotus' },
      { id: 103, x: 75, y: 76, type: 'diya' },
    ]);
    setIsCompleted(false);
  };

  const glowStrength = (litGhatSteps.length / totalGhatLamps) * 0.7 + (floatingItems.length / 8) * 0.3;

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🪔</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'अयोध्या सरयू दीपोत्सव एवं महाआरती'
                : currentLanguage === 'bn'
                ? 'অযোধ্যা সরযূ ঘাটের মহাদীপোৎসব ও আরতি'
                : 'Ayodhya Saryu Deepotsav & Ghat Aarti'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'सरयू के पावन घाटों पर दीप जलाएं, जल में कमल पुष्प व दीप तैराएं और शंख-घंटी की ध्वनि करें।'
              : currentLanguage === 'bn'
              ? 'সরযূ নদীর পবিত্র ঘাটে প্রদীপ জ্বালান, জলে পদ্ম ভাসান ও শাঁখ-ঘণ্টার ধ্বনিতে শ্রীরামকে বরণ করুন।'
              : 'Illuminate the ancient stone ghat steps, float glowing diyas and sacred lotus blossoms on the Saryu river.'}
          </p>
        </div>

        {/* Counter & Actions */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{litGhatSteps.length} / {totalGhatLamps} {currentLanguage === 'hi' ? 'घाट दीप' : currentLanguage === 'bn' ? 'ঘাটের প্রদীপ' : 'Ghat Diyas'}</span>
          </div>

          <button
            onClick={litGhatSteps.length === totalGhatLamps ? handleReset : lightAllGhats}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {litGhatSteps.length === totalGhatLamps ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
                <span>{currentLanguage === 'hi' ? 'सभी दीप जलाएं' : currentLanguage === 'bn' ? 'সব জ্বালান' : 'Light All'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col justify-between p-3 sm:p-5 bg-gradient-to-b from-[#111A2E] via-[#16233B] to-[#0A1222]">
        {/* Sacred Twilight Sky & Distant Temple Spires */}
        <div className="absolute inset-x-0 top-0 h-44 pointer-events-none opacity-60">
          <svg viewBox="0 0 800 240" className="w-full h-full object-cover">
            {/* Soft Crescent Moon & Stars */}
            <circle cx="720" cy="50" r="14" fill="#FFE082" opacity="0.85" />
            <circle cx="726" cy="46" r="12" fill="#111A2E" />

            {/* Distant Ayodhya Temple Silhouettes */}
            <path
              d="M 50 140 L 70 80 L 90 140 L 120 140 L 140 60 L 160 140 L 220 140 L 250 90 L 280 140 L 520 140 L 550 50 L 580 140 L 630 140 L 650 90 L 670 140 Z"
              fill="#0D1525"
            />
            {/* Kalash on Temples */}
            <circle cx="140" cy="58" r="3" fill="#D6AD60" />
            <circle cx="550" cy="48" r="4" fill="#D6AD60" />
          </svg>
        </div>

        {/* Golden River Radiance expanding with lit count */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: 0.2 + glowStrength * 0.65,
            background: 'radial-gradient(ellipse at 50% 85%, rgba(245, 166, 35, 0.45) 0%, rgba(181, 83, 42, 0.2) 50%, transparent 80%)',
          }}
        />

        {/* 3 Tiered Ancient Stone Ghat Steps with 12 Diyas */}
        <div className="relative z-10 w-full max-w-2xl mx-auto mt-4 space-y-2 sm:space-y-3">
          {/* Row 1 (Top Step: 3 Diyas) */}
          <div className="flex items-center justify-around px-8 sm:px-16 py-1.5 rounded-xl bg-[#1D2A45]/80 border-b border-[#D6AD60]/30 shadow-md">
            {[1, 2, 3].map((num) => {
              const isLit = litGhatSteps.includes(num);
              return (
                <div
                  key={num}
                  onClick={() => toggleGhatLamp(num)}
                  className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-120 active:scale-95"
                >
                  <div className="relative">
                    <svg viewBox="0 0 60 50" className="w-9 sm:w-11 h-auto drop-shadow-md">
                      {isLit && (
                        <g className="animate-flame origin-bottom">
                          <circle cx="30" cy="14" r="10" fill="rgba(255, 179, 71, 0.45)" filter="blur(4px)" />
                          <path d="M 30 2 C 26 9, 24 15, 26 21 C 28 25, 32 25, 34 21 C 36 15, 34 9, 30 2 Z" fill="#FFE082" />
                          <path d="M 30 8 C 28 12, 27 16, 28 19 C 29 21, 31 21, 32 19 C 33 16, 32 12, 30 8 Z" fill="#FFFFFF" className="animate-flame-core" />
                        </g>
                      )}
                      <path d="M 8 32 Q 30 46 52 32 C 44 38 16 38 8 32 Z" fill="#823617" />
                      <ellipse cx="30" cy="30" rx="20" ry="6" fill="#B5532A" />
                      <circle cx="30" cy="24" r="2" fill={isLit ? '#FFE082' : '#3E2114'} />
                    </svg>
                    {!isLit && (
                      <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#D6AD60] animate-ping" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2 (Middle Step: 4 Diyas) */}
          <div className="flex items-center justify-around px-6 sm:px-12 py-1.5 rounded-xl bg-[#19253F]/90 border-b border-[#D6AD60]/30 shadow-md">
            {[4, 5, 6, 7].map((num) => {
              const isLit = litGhatSteps.includes(num);
              return (
                <div
                  key={num}
                  onClick={() => toggleGhatLamp(num)}
                  className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-120 active:scale-95"
                >
                  <div className="relative">
                    <svg viewBox="0 0 60 50" className="w-10 sm:w-12 h-auto drop-shadow-md">
                      {isLit && (
                        <g className="animate-flame origin-bottom">
                          <circle cx="30" cy="14" r="11" fill="rgba(255, 179, 71, 0.45)" filter="blur(4px)" />
                          <path d="M 30 2 C 26 9, 24 15, 26 21 C 28 25, 32 25, 34 21 C 36 15, 34 9, 30 2 Z" fill="#FFE082" />
                          <path d="M 30 8 C 28 12, 27 16, 28 19 C 29 21, 31 21, 32 19 C 33 16, 32 12, 30 8 Z" fill="#FFFFFF" className="animate-flame-core" />
                        </g>
                      )}
                      <path d="M 8 32 Q 30 46 52 32 C 44 38 16 38 8 32 Z" fill="#823617" />
                      <ellipse cx="30" cy="30" rx="20" ry="6" fill="#B5532A" />
                      <circle cx="30" cy="24" r="2" fill={isLit ? '#FFE082' : '#3E2114'} />
                    </svg>
                    {!isLit && (
                      <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#D6AD60] animate-ping" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 3 (Waterfront Step: 5 Diyas) */}
          <div className="flex items-center justify-around px-4 sm:px-8 py-2 rounded-xl bg-[#141E34]/95 border-b-2 border-[#D6AD60]/40 shadow-lg">
            {[8, 9, 10, 11, 12].map((num) => {
              const isLit = litGhatSteps.includes(num);
              return (
                <div
                  key={num}
                  onClick={() => toggleGhatLamp(num)}
                  className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-120 active:scale-95"
                >
                  <div className="relative">
                    <svg viewBox="0 0 60 50" className="w-11 sm:w-13 h-auto drop-shadow-md">
                      {isLit && (
                        <g className="animate-flame origin-bottom">
                          <circle cx="30" cy="14" r="12" fill="rgba(255, 179, 71, 0.45)" filter="blur(4px)" />
                          <path d="M 30 2 C 26 9, 24 15, 26 21 C 28 25, 32 25, 34 21 C 36 15, 34 9, 30 2 Z" fill="#FFE082" />
                          <path d="M 30 8 C 28 12, 27 16, 28 19 C 29 21, 31 21, 32 19 C 33 16, 32 12, 30 8 Z" fill="#FFFFFF" className="animate-flame-core" />
                        </g>
                      )}
                      <path d="M 8 32 Q 30 46 52 32 C 44 38 16 38 8 32 Z" fill="#823617" />
                      <ellipse cx="30" cy="30" rx="20" ry="6" fill="#B5532A" />
                      <circle cx="30" cy="24" r="2" fill={isLit ? '#FFE082' : '#3E2114'} />
                    </svg>
                    {!isLit && (
                      <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#D6AD60] animate-ping" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sacred Saryu River Flowing Water Section */}
        <div className="relative w-full h-28 sm:h-36 rounded-2xl overflow-hidden mt-2 bg-gradient-to-b from-[#0F1E38] to-[#081224] border border-[#D6AD60]/30 shadow-inner">
          {/* Animated Water Ripples */}
          <svg viewBox="0 0 1000 200" className="absolute inset-0 w-full h-full opacity-35 pointer-events-none">
            <path
              d="M 0 50 Q 250 80 500 50 T 1000 50 M 0 100 Q 250 130 500 100 T 1000 100 M 0 150 Q 250 180 500 150 T 1000 150"
              fill="none"
              stroke="#F4D995"
              strokeWidth="1.5"
              strokeDasharray="12 18"
            />
          </svg>

          {/* Floating Sacred Diyas and Lotuses */}
          {floatingItems.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="group cursor-pointer transition-all duration-1000 animate-pulse"
              onClick={() => {
                audioManager.playDiyaLightSound();
                try {
                  confetti({ particleCount: 15, spread: 40, origin: { y: 0.8 } });
                } catch (e) {}
              }}
            >
              {item.type === 'lotus' ? (
                <div className="flex flex-col items-center">
                  <span className="text-2xl filter drop-shadow-[0_0_8px_rgba(255,105,180,0.6)]">🪷</span>
                  <div className="w-2.5 h-1 rounded-full bg-[#FFE082] blur-[1px] -mt-1" />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-3.5 rounded-full bg-[#FFE082] shadow-[0_0_10px_#FFB347] animate-flame" />
                  <span className="text-xl filter drop-shadow-[0_0_6px_rgba(245,166,35,0.8)]">🍃</span>
                </div>
              )}
            </div>
          ))}

          <div className="absolute bottom-2 left-3 text-[10px] sm:text-xs text-[#F4D995]/75 italic flex items-center gap-1">
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentLanguage === 'hi' ? 'पवित्र सरयू जल प्रवाह' : currentLanguage === 'bn' ? 'পবিত্র সরযূ নদীর প্রবাহ' : 'Holy Saryu River Current'}</span>
          </div>
        </div>

        {/* Bottom Interactive River Offerings & Aarti Action Bar */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D6AD60]/20 bg-[#10172D]/80 backdrop-blur-md px-3 py-2 rounded-2xl">
          {/* Float Diya and Lotus buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => addFloatingOffering('diya')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#192747] border border-[#D6AD60]/40 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>🪔</span>
              <span>{currentLanguage === 'hi' ? 'जल में दीप तैराएं' : currentLanguage === 'bn' ? 'জলে প্রদীপ ভাসান' : 'Float Diya'}</span>
            </button>

            <button
              onClick={() => addFloatingOffering('lotus')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#192747] border border-[#D6AD60]/40 hover:bg-[#D6AD60]/20 text-[#FF80AB] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>🪷</span>
              <span>{currentLanguage === 'hi' ? 'कमल पुष्प अर्पित करें' : currentLanguage === 'bn' ? 'পদ্ম ফুল নিবেদন' : 'Float Lotus'}</span>
            </button>
          </div>

          {/* Sacred Sounds: Ghanti & Shankh */}
          <div className="flex items-center gap-2">
            <button
              onClick={ringTempleBell}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#192747] border border-[#D6AD60]/50 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>{currentLanguage === 'hi' ? 'मंदिर की घंटी' : currentLanguage === 'bn' ? 'মন্দিরের ঘণ্টা' : 'Ring Bell'}</span>
            </button>

            <button
              onClick={blowShankh}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D] hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>🐚</span>
              <span>{currentLanguage === 'hi' ? 'शंखनाद करें' : currentLanguage === 'bn' ? 'শঙ্খধ্বনি' : 'Blow Shankh'}</span>
            </button>
          </div>
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">🪔✨🚩</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'सियावर रामचंद्र की जय! अयोध्या दीपोत्सव सम्पन्न!'
                  : currentLanguage === 'bn'
                  ? 'শ্রীরামচন্দ্র জয়যুক্ত হোন! অযোধ্যা মহাদীপোৎসব সম্পন্ন!'
                  : 'Jai Shri Ram! Ayodhya Deepotsav Radiant!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'सरयू के पावन घाट दीपों की रोशनी से जगमगा उठे हैं। भगवान श्री राम के अयोध्या लौटने की यह दिव्य स्मृति आपके जीवन में मर्यादा, धर्म और शांति लाए।'
                  : currentLanguage === 'bn'
                  ? 'সরযূ তটের প্রতিটি ঘাট আলোকিত হয়ে উঠেছে লক্ষ লক্ষ প্রদীপের মালায়। সত্য ও ধর্মের জয়বার্তা আপনার জীবনে সুখ ও শান্তি নিয়ে আসুক।'
                  : 'The holy ghats of Ayodhya glow in celestial light as Shri Ram, Sita, and Lakshman return. May your home be blessed with truth, virtue, and peace.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'सरयू दर्शन करें' : currentLanguage === 'bn' ? 'ঘাট দর্শন করুন' : 'View Saryu Ghat'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {currentLanguage === 'hi'
          ? 'घाट की सीढ़ियों पर दीये छूकर जलाएं और सरयू जल में दीप व कमल तैराकर मंगल कामना करें।'
          : currentLanguage === 'bn'
          ? 'ঘাটের সিঁড়িতে প্রদীপ স্পর্শ করে জ্বালান এবং নদীর জলে প্রদীপ ভাসিয়ে আশীর্বাদ প্রার্থনা করুন।'
          : 'Tap any ghat lamp to light it, and float sacred diyas and lotuses onto the holy current.'}
      </div>
    </div>
  );
};
