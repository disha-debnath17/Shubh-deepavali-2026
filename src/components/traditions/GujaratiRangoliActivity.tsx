/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Palette, RotateCcw, Flame, CheckCircle2 } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface GujaratiRangoliActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

export const GujaratiRangoliActivity: React.FC<GujaratiRangoliActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // Steps: 1. Sathiya (Swastik) with Kumkum, 2. Vibrant Powder Rangoli, 3. Sparkling Aabhla Mirrors, 4. Kodiyun Ghee Lamps
  const [hasStampedSathiya, setHasStampedSathiya] = useState<boolean>(true);
  const [rangoliFilledSectors, setRangoliFilledSectors] = useState<number[]>([1]);
  const [hasPlacedMirrors, setHasPlacedMirrors] = useState<boolean>(false);
  const [litKodiyunCount, setLitKodiyunCount] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalSectors = 6;
  const totalKodiyun = 4;

  const toggleSector = (id: number) => {
    audioManager.playSparkleSound();
    setRangoliFilledSectors((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      checkDone(hasStampedSathiya, next.length, hasPlacedMirrors, litKodiyunCount);
      return next;
    });
  };

  const handleStampSathiya = () => {
    audioManager.playChopdaStampSound();
    setHasStampedSathiya(true);
    checkDone(true, rangoliFilledSectors.length, hasPlacedMirrors, litKodiyunCount);
  };

  const handlePlaceMirrors = () => {
    audioManager.playSparkleSound();
    setHasPlacedMirrors(true);
    checkDone(hasStampedSathiya, rangoliFilledSectors.length, true, litKodiyunCount);
  };

  const toggleKodiyun = (idx: number) => {
    audioManager.playDiyaLightSound();
    setLitKodiyunCount((c) => {
      const next = Math.min(c + 1, totalKodiyun);
      checkDone(hasStampedSathiya, rangoliFilledSectors.length, hasPlacedMirrors, next);
      return next;
    });
  };

  const fillAllRangoli = () => {
    audioManager.playSparkleSound();
    audioManager.playDiyaLightSound();
    setHasStampedSathiya(true);
    setRangoliFilledSectors([1, 2, 3, 4, 5, 6]);
    setHasPlacedMirrors(true);
    setLitKodiyunCount(totalKodiyun);
    triggerCompletion();
  };

  const checkDone = (sathiya: boolean, sectorsCount: number, mirrors: boolean, kodiyun: number) => {
    if (sathiya && sectorsCount >= 4 && mirrors && kodiyun >= 2 && !isCompleted) {
      triggerCompletion();
    }
  };

  const triggerCompletion = () => {
    setIsCompleted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#F5A623', '#F4D995', '#D6AD60', '#FFE082'],
      });
    } catch (e) {}
    if (onComplete) onComplete();
  };

  const handleReset = () => {
    audioManager.playClickSound();
    setHasStampedSathiya(false);
    setRangoliFilledSectors([1]);
    setHasPlacedMirrors(false);
    setLitKodiyunCount(0);
    setIsCompleted(false);
  };

  const completedCount = (hasStampedSathiya ? 1 : 0) + (rangoliFilledSectors.length >= 4 ? 1 : 0) + (hasPlacedMirrors ? 1 : 0) + (litKodiyunCount >= 2 ? 1 : 0);

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'साथिया (स्वास्तिक) एवं कच्छी आभला रंगोली'
                : currentLanguage === 'bn'
                ? 'সাথিয়া (স্বস্তিক) ও আয়না বসানো গুজরাটি রঙ্গোলি'
                : 'Auspicious Sathiya & Mirror-work Rangoli'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'चौखट पर कुमकुम से साथिया बनाएं, रंग-बिरंगी रंगोली भरें, आभला कांच लगाएं और कोडिया दीप जलाएं।'
              : currentLanguage === 'bn'
              ? 'গৃহদ্বারে সিঁদুরের সাথিয়া আঁকুন, উজ্জ্বল রঙ ও কাঁচের চুমকি বসিয়ে মাটির কোদিয়া প্রদীপ জ্বালান।'
              : 'Stamp the kumkum Sathiya at the threshold, fill vibrant powder petals, add mirrors, and light Kodiyun.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{completedCount} / 4 {currentLanguage === 'hi' ? 'श्रृंगार' : currentLanguage === 'bn' ? 'সাজ' : 'Decorations'}</span>
          </div>

          <button
            onClick={completedCount === 4 ? handleReset : fillAllRangoli}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {completedCount === 4 ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
                <span>{currentLanguage === 'hi' ? 'सभी सजाएं' : currentLanguage === 'bn' ? 'সব সাজান' : 'Decorate All'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#192644] via-[#10172D] to-[#0A0F1D]">
        {/* Ambient Warm Golden Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: 0.15 + (completedCount / 4) * 0.5,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(245, 166, 35, 0.4) 0%, rgba(25, 39, 71, 0.8) 60%, transparent 85%)',
          }}
        />

        {/* Center: Sathiya & Mirror-work Rangoli SVG Canvas */}
        <div className="relative z-10 my-auto w-full max-w-md mx-auto flex items-center justify-center">
          <svg viewBox="0 0 280 240" className="w-64 sm:w-80 md:w-92 h-auto drop-shadow-2xl">
            {/* Outer Threshold Decorative Border Ring */}
            <circle cx="140" cy="120" r="105" fill="none" stroke="#D6AD60" strokeWidth="1.5" strokeDasharray="5 5" />
            <circle cx="140" cy="120" r="95" fill="#141E34" stroke="#B5532A" strokeWidth="2" />

            {/* 6 Symmetrical Petals / Sectors (Clickable to Fill) */}
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
              const num = idx + 1;
              const isFilled = rangoliFilledSectors.includes(num);
              const colors = ['#E91E63', '#FF9800', '#00BCD4', '#9C27B0', '#4CAF50', '#FFEB3B'];
              const fill = isFilled ? colors[idx] : '#243354';

              return (
                <g key={angle} transform={`rotate(${angle} 140 120)`} onClick={() => toggleSector(num)} className="cursor-pointer group">
                  <path
                    d="M 140 120 C 120 70, 120 40, 140 30 C 160 40, 160 70, 140 120 Z"
                    fill={fill}
                    stroke="#D6AD60"
                    strokeWidth="1.5"
                    className="transition-colors duration-300 group-hover:brightness-125"
                  />
                  {/* Inner embellishment */}
                  {isFilled && (
                    <circle cx="140" cy="65" r="5" fill="#FFFFFF" />
                  )}
                </g>
              );
            })}

            {/* Central Sacred Sathiya (Swastika) */}
            {hasStampedSathiya ? (
              <g className="animate-fade-in">
                {/* Kumkum Red Circular Base */}
                <circle cx="140" cy="120" r="26" fill="#C62828" stroke="#FFE082" strokeWidth="2" />
                {/* Traditional Sathiya Arms */}
                <path
                  d="M 140 102 L 140 138 M 122 120 L 158 120 M 140 102 L 154 102 M 140 138 L 126 138 M 122 120 L 122 106 M 158 120 L 158 134"
                  stroke="#FFEB3B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* 4 Auspicious Bindis (Dots) in quadrants */}
                <circle cx="130" cy="110" r="2" fill="#FFFFFF" />
                <circle cx="150" cy="110" r="2" fill="#FFFFFF" />
                <circle cx="130" cy="130" r="2" fill="#FFFFFF" />
                <circle cx="150" cy="130" r="2" fill="#FFFFFF" />
              </g>
            ) : (
              <circle cx="140" cy="120" r="26" fill="#1E2A44" stroke="#D6AD60" strokeWidth="1.5" strokeDasharray="3 3" />
            )}

            {/* Aabhla (Sparkling Small Real Glass Mirrors around the perimeter) */}
            {hasPlacedMirrors && (
              <g className="animate-fade-in">
                {[30, 90, 150, 210, 270, 330].map((angle) => (
                  <g key={angle} transform={`rotate(${angle} 140 120)`}>
                    <circle cx="140" cy="22" r="6.5" fill="#E0F7FA" stroke="#FFFFFF" strokeWidth="1.5" filter="drop-shadow(0 0 3px rgba(255,255,255,0.8))" />
                    <circle cx="140" cy="22" r="3" fill="#FFFFFF" />
                  </g>
                ))}
              </g>
            )}

            {/* 4 Clay Kodiyun Lamps at the four cardinal corners */}
            {[
              { x: 35, y: 35, idx: 1 },
              { x: 245, y: 35, idx: 2 },
              { x: 35, y: 205, idx: 3 },
              { x: 245, y: 205, idx: 4 },
            ].map(({ x, y, idx }) => {
              const isLit = litKodiyunCount >= idx;
              return (
                <g key={idx} transform={`translate(${x - 20}, ${y - 20})`} onClick={() => toggleKodiyun(idx)} className="cursor-pointer">
                  {/* Flame if lit */}
                  {isLit && (
                    <g className="animate-flame origin-bottom">
                      <circle cx="20" cy="10" r="8" fill="rgba(255, 179, 71, 0.6)" filter="blur(2px)" />
                      <circle cx="20" cy="10" r="4" fill="#FFE082" />
                    </g>
                  )}
                  {/* Terracotta Kodiyun Cup */}
                  <ellipse cx="20" cy="22" rx="14" ry="6" fill="#8D431D" />
                  <ellipse cx="20" cy="20" rx="11" ry="4" fill="#C46E3A" />
                  <circle cx="20" cy="17" r="2" fill={isLit ? '#FFE082' : '#3E1C0A'} />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Bottom Interactive Controls */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D6AD60]/20 bg-[#10172D]/85 backdrop-blur-md px-3 py-2 rounded-2xl">
          {/* Action 1 & 2 */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleStampSathiya}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                hasStampedSathiya
                  ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
              }`}
            >
              <span>卐</span>
              <span>{hasStampedSathiya ? (currentLanguage === 'hi' ? 'साथिया अंकित' : currentLanguage === 'bn' ? 'সাথিয়া আঁকা শেষ' : 'Sathiya Stamped') : (currentLanguage === 'hi' ? 'साथिया बनाएं' : currentLanguage === 'bn' ? 'সাথিয়া আঁকুন' : 'Stamp Sathiya')}</span>
            </button>

            <button
              onClick={handlePlaceMirrors}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                hasPlacedMirrors
                  ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
              }`}
            >
              <span>🪞</span>
              <span>{hasPlacedMirrors ? (currentLanguage === 'hi' ? 'आभला कांच जड़े' : currentLanguage === 'bn' ? 'কাঁচের চুমকি বসানো' : 'Mirrors Placed') : (currentLanguage === 'hi' ? 'आभला कांच लगाएं' : currentLanguage === 'bn' ? 'কাঁচ বসান' : 'Place Mirrors')}</span>
            </button>
          </div>

          {/* Action 3 & 4 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleKodiyun(litKodiyunCount + 1)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#192747] border border-[#D6AD60]/40 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Flame className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>{litKodiyunCount >= totalKodiyun ? (currentLanguage === 'hi' ? '४ कोडिया दीप प्रज्वलित' : currentLanguage === 'bn' ? '৪ কোদিয়া প্রদীপ প্রজ্বলিত' : '4 Kodiyun Lit') : `${currentLanguage === 'hi' ? 'कोडिया दीप जलाएं' : currentLanguage === 'bn' ? 'কোদিয়া প্রদীপ জ্বালান' : 'Light Kodiyun'} (${litKodiyunCount}/${totalKodiyun})`}</span>
            </button>
          </div>
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">✨卐🪔</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'साल मुबारक! साथिया एवं रंगोली सम्पन्न!'
                  : currentLanguage === 'bn'
                  ? 'শুভ নববর্ষ! সাথিয়া ও রঙ্গোলি সম্পন্ন!'
                  : 'Saal Mubarak! Sathiya Rangoli Radiant!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'कुमकुम का पावन साथिया, कांच जड़ी रंगोली और माटी के कोडिया दीपों की चमक से आपकी चौखट मां लक्ष्मी के सत्कार हेतु तैयार है। नया साल मंगलमय हो!'
                  : currentLanguage === 'bn'
                  ? 'সিঁদুরের শুভ সাথিয়া, কাঁচ বসানো উজ্জ্বল রঙ্গোলি ও কোদিয়া প্রদীপের আলোয় আপনার গৃহদ্বার উদ্ভাসিত। শুভ দীপাবলি ও শুভ নববর্ষ!'
                  : 'The auspicious kumkum Sathiya, shimmering mirror rangoli, and warm Kodiyun lamps bless your threshold. May prosperity and peace enter your home!'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'रंगोली दर्शन' : currentLanguage === 'bn' ? 'রঙ্গোলি দর্শন' : 'View Rangoli'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {currentLanguage === 'hi'
          ? 'पंखुड़ियों को छूकर रंग भरें, साथिया अंकित करें, आभला कांच लगाएं और कोडिया दीप जलाएं।'
          : currentLanguage === 'bn'
          ? 'পাপড়ি স্পর্শ করে রঙ ভরুন, সাথিয়া আঁকুন, কাঁচ বসান এবং কোদিয়া প্রদীপ জ্বালান।'
          : 'Tap petals to fill colors, stamp the Sathiya, add reflective mirrors, and light Kodiyun.'}
      </div>
    </div>
  );
};
