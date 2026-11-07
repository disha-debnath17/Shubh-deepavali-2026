/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Check, RotateCcw, PenTool, CircleDot, Flame } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface ChopdaPujanActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

export const ChopdaPujanActivity: React.FC<ChopdaPujanActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // 4 Sacred Stages of Chopda Pujan
  const [hasSwastik, setHasSwastik] = useState<boolean>(false);
  const [hasShubhLabh, setHasShubhLabh] = useState<boolean>(false);
  const [hasAkshatFlowers, setHasAkshatFlowers] = useState<boolean>(false);
  const [hasCoinAndDiya, setHasCoinAndDiya] = useState<boolean>(false);

  const completedSteps =
    (hasSwastik ? 1 : 0) +
    (hasShubhLabh ? 1 : 0) +
    (hasAkshatFlowers ? 1 : 0) +
    (hasCoinAndDiya ? 1 : 0);

  const isAllComplete = completedSteps === 4;

  const handleStep1Swastik = () => {
    audioManager.playChopdaStampSound();
    setHasSwastik(true);
  };

  const handleStep2ShubhLabh = () => {
    audioManager.playChopdaStampSound();
    setHasShubhLabh(true);
  };

  const handleStep3Akshat = () => {
    audioManager.playSparkleSound();
    setHasAkshatFlowers(true);
  };

  const handleStep4CoinDiya = () => {
    audioManager.playDiyaLightSound();
    setHasCoinAndDiya(true);
    try {
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#D6AD60', '#F5A623', '#D32F2F', '#FFF5DE'],
      });
    } catch (e) {}
    if (onComplete) onComplete();
  };

  const handleReset = () => {
    audioManager.playClickSound();
    setHasSwastik(false);
    setHasShubhLabh(false);
    setHasAkshatFlowers(false);
    setHasCoinAndDiya(false);
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'चोपड़ा पूजन (बही-खाता पूजन संस्कार)'
                : currentLanguage === 'bn'
                ? 'চোপড়া পূজন (খাতাপূজা ও শ্রী-লাভ)'
                : 'Chopda Pujan (Sacred Account Book Blessing)'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'लाल बही-खाते पर कुमकुम से स्वास्तिक बनाएं, शुभ-लाभ लिखें और नए वर्ष में न्याय व बरकत की प्रार्थना करें।'
              : currentLanguage === 'bn'
              ? 'নতুন লাল খাতায় সিঁদুরের স্বস্তিক এঁকে শুভ-লাভ ও সততার সাথে সমৃদ্ধির প্রার্থনা করুন।'
              : 'Consecrate the traditional red ledger with sacred kumkum Sathiya (Swastik), Shubh-Laabh, and silver blessings.'}
          </p>
        </div>

        {/* Progress & Reset */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995]">
            {completedSteps} / 4 {currentLanguage === 'hi' ? 'चरण संपन्न' : currentLanguage === 'bn' ? 'ধাপ সম্পন্ন' : 'Rituals Done'}
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chopda Ledger Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-[#1E263D] via-[#10172D] to-[#0B1020]">
        {/* Soft Sacred Amber Radiance */}
        <div className="absolute w-[360px] h-[360px] rounded-full bg-radial from-[#F5A623]/25 via-transparent to-transparent blur-2xl pointer-events-none" />

        {/* Traditional Open Red Cloth-Bound Ledger (Chopda) */}
        <div className="relative w-full max-w-[620px] aspect-[14/9] rounded-2xl bg-gradient-to-r from-[#8E1B1B] via-[#A82424] to-[#8E1B1B] border-4 border-[#D6AD60] shadow-2xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
          {/* Golden Corner Trimmings */}
          <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-[#FFE082]" />
          <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-[#FFE082]" />
          <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-[#FFE082]" />
          <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-[#FFE082]" />

          {/* Book Spine Center Seam */}
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#4A0E0E] shadow-sm transform -translate-x-1/2" />

          {/* Top Inscription Header */}
          <div className="relative z-10 flex items-center justify-between text-[#FFE082] text-xs sm:text-sm font-royal font-bold px-4 border-b border-[#D6AD60]/30 pb-2">
            <span>|| શ્રી ગણેશાય નમઃ ||</span>
            <span>|| શ્રી મહાલક્ષ્મ્યૈ નમઃ ||</span>
          </div>

          {/* Center Ledger Pages Content Area */}
          <div className="relative z-10 flex-1 grid grid-cols-2 gap-4 items-center px-4 py-2">
            {/* Left Page: Shubh + Auspicious Swastik (Sathiya) */}
            <div className="flex flex-col items-center justify-center space-y-2">
              {hasShubhLabh && (
                <div className="font-royal text-xl sm:text-2xl font-extrabold text-[#FFE082] tracking-wider animate-fade-in drop-shadow">
                  શુભ (SHUBH)
                </div>
              )}

              {/* Kumkum Sathiya / Swastik */}
              {hasSwastik ? (
                <div className="relative w-20 sm:w-28 h-20 sm:h-28 flex items-center justify-center animate-fade-in">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                    {/* Sacred Swastik in Kumkum Red with Golden outline */}
                    <path
                      d="M 50 15 L 50 85 M 15 50 L 85 50 M 50 15 L 80 15 M 85 50 L 85 80 M 50 85 L 20 85 M 15 50 L 15 20"
                      fill="none"
                      stroke="#FFD54F"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 50 15 L 50 85 M 15 50 L 85 50 M 50 15 L 80 15 M 85 50 L 85 80 M 50 85 L 20 85 M 15 50 L 15 20"
                      fill="none"
                      stroke="#D32F2F"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    {/* 4 Sacred Bindu Dots */}
                    <circle cx="32" cy="32" r="3.5" fill="#D32F2F" />
                    <circle cx="68" cy="32" r="3.5" fill="#D32F2F" />
                    <circle cx="32" cy="68" r="3.5" fill="#D32F2F" />
                    <circle cx="68" cy="68" r="3.5" fill="#D32F2F" />
                  </svg>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[#FFE082]/40 flex flex-col items-center justify-center text-[11px] text-[#FFE082]/60 p-2 text-center">
                  <span>Draw Sathiya</span>
                </div>
              )}
            </div>

            {/* Right Page: Laabh + Sacred Coin & Kodiyun Diya */}
            <div className="flex flex-col items-center justify-center space-y-2">
              {hasShubhLabh && (
                <div className="font-royal text-xl sm:text-2xl font-extrabold text-[#FFE082] tracking-wider animate-fade-in drop-shadow">
                  લાભ (LAABH)
                </div>
              )}

              {/* Silver Coin & Diya */}
              {hasCoinAndDiya ? (
                <div className="flex items-center gap-3 animate-fade-in">
                  {/* Silver Coin */}
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#CFD8DC] to-[#90A4AE] border-2 border-[#ECEFF1] shadow-lg flex items-center justify-center text-slate-800 text-xs font-bold font-royal">
                    🪙 ₹
                  </div>
                  {/* Kodiyun Diya */}
                  <div className="relative">
                    <svg viewBox="0 0 60 50" className="w-14 sm:w-16 h-auto drop-shadow-lg">
                      <path d="M 30 6 C 26 14, 24 20, 26 26 C 28 30, 32 30, 34 26 C 36 20, 34 14, 30 6 Z" fill="#FFE082" className="animate-flame origin-bottom" />
                      <ellipse cx="30" cy="32" rx="24" ry="10" fill="#B5532A" stroke="#823617" strokeWidth="1" />
                      <ellipse cx="30" cy="30" rx="18" ry="6" fill="#6B290E" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-[#FFE082]/40 flex flex-col items-center justify-center text-[11px] text-[#FFE082]/60 p-2 text-center">
                  <span>Coin & Diya</span>
                </div>
              )}
            </div>
          </div>

          {/* Render Scattered Akshat (Rice Grains) & Rose Petals */}
          {hasAkshatFlowers && (
            <div className="absolute inset-0 pointer-events-none z-20 animate-fade-in">
              {/* Rice Grains */}
              {[
                { x: 25, y: 30 }, { x: 35, y: 75 }, { x: 45, y: 55 },
                { x: 55, y: 40 }, { x: 65, y: 70 }, { x: 75, y: 28 },
                { x: 30, y: 60 }, { x: 70, y: 50 }, { x: 50, y: 80 },
              ].map((pos, idx) => (
                <div
                  key={idx}
                  style={{ position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%` }}
                  className="w-1.5 h-3 bg-[#FFFDF5] rounded-full transform rotate-35 shadow-xs"
                />
              ))}

              {/* Rose Petals */}
              {[
                { x: 20, y: 75 }, { x: 40, y: 25 }, { x: 60, y: 80 }, { x: 80, y: 35 }, { x: 50, y: 30 },
              ].map((pos, idx) => (
                <div
                  key={idx}
                  style={{ position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%` }}
                  className="w-4 h-4 bg-gradient-to-br from-[#E91E63] to-[#880E4F] rounded-full transform -rotate-25 shadow-sm opacity-90"
                />
              ))}
            </div>
          )}

          {/* Bottom Footer Note */}
          <div className="relative z-10 text-center text-[10px] text-[#FFE082]/75 border-t border-[#D6AD60]/30 pt-1.5 font-sans">
            {currentLanguage === 'hi'
              ? 'संवत २०८३ · सत्य व निष्ठा से व्यापार एवं गृह समृद्धि की कामना'
              : currentLanguage === 'bn'
              ? 'সংবৎ ২০৮৩ · ন্যায় ও নিষ্ঠার সাথে ব্যবসা ও পারিবারিক উন্নতির প্রার্থনা'
              : 'Vikram Samvat 2083 · Consecrated with Truth, Righteous Wealth & Wisdom'}
          </div>
        </div>
      </div>

      {/* 4 Interactive Ritual Step Triggers */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3.5">
        <button
          onClick={handleStep1Swastik}
          className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            hasSwastik
              ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#FFF5DE]'
              : 'bg-[#192747]/80 border-[#D6AD60]/30 text-[#FFF5DE]/70 hover:border-[#D6AD60]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">卐</span>
            <div>
              <div className="text-xs font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '१. स्वास्तिक बनाएं' : currentLanguage === 'bn' ? '১. স্বস্তিক আঁকা' : '1. Draw Sathiya'}
              </div>
              <div className="text-[10px] text-[#FFF5DE]/60">Kumkum Ink</div>
            </div>
          </div>
          {hasSwastik && <Check className="w-4 h-4 text-[#D6AD60]" />}
        </button>

        <button
          onClick={handleStep2ShubhLabh}
          className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            hasShubhLabh
              ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#FFF5DE]'
              : 'bg-[#192747]/80 border-[#D6AD60]/30 text-[#FFF5DE]/70 hover:border-[#D6AD60]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">✍️</span>
            <div>
              <div className="text-xs font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '२. शुभ-लाभ लिखें' : currentLanguage === 'bn' ? '২. শুভ-লাভ লেখা' : '2. Write Shubh-Labh'}
              </div>
              <div className="text-[10px] text-[#FFF5DE]/60">Golden Script</div>
            </div>
          </div>
          {hasShubhLabh && <Check className="w-4 h-4 text-[#D6AD60]" />}
        </button>

        <button
          onClick={handleStep3Akshat}
          className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            hasAkshatFlowers
              ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#FFF5DE]'
              : 'bg-[#192747]/80 border-[#D6AD60]/30 text-[#FFF5DE]/70 hover:border-[#D6AD60]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🌸</span>
            <div>
              <div className="text-xs font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '३. अक्षत व पुष्प' : currentLanguage === 'bn' ? '৩. অক্ষত ও ফুল' : '3. Akshat & Petals'}
              </div>
              <div className="text-[10px] text-[#FFF5DE]/60">Sacred Rice Shower</div>
            </div>
          </div>
          {hasAkshatFlowers && <Check className="w-4 h-4 text-[#D6AD60]" />}
        </button>

        <button
          onClick={handleStep4CoinDiya}
          className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            hasCoinAndDiya
              ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#FFF5DE]'
              : 'bg-[#192747]/80 border-[#D6AD60]/30 text-[#FFF5DE]/70 hover:border-[#D6AD60]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🪙</span>
            <div>
              <div className="text-xs font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '४. सिक्का व दीया' : currentLanguage === 'bn' ? '৪. মুদ্রা ও প্রদীপ' : '4. Coin & Kodiyun'}
              </div>
              <div className="text-[10px] text-[#FFF5DE]/60">Pure Lakshmi Blessing</div>
            </div>
          </div>
          {hasCoinAndDiya && <Check className="w-4 h-4 text-[#D6AD60]" />}
        </button>
      </div>

      {/* Completion Toast */}
      {isAllComplete && (
        <div className="w-full mt-3 p-3 rounded-2xl bg-[#192747]/95 border border-[#D6AD60] text-center animate-fade-in space-y-1">
          <span className="text-2xl">✨ સાલ મુબારક ✨</span>
          <h5 className="font-royal text-sm sm:text-base font-bold text-[#F4D995]">
            {currentLanguage === 'hi'
              ? 'चोपड़ा पूजन संपन्न: मां लक्ष्मी व सरस्वती की पावन कृपा!'
              : currentLanguage === 'bn'
              ? 'চোপড়া পূজন সম্পন্ন: মা লক্ষ্মী ও সরস্বতীর যুগল আশীর্বাদ!'
              : 'Chopda Pujan Consecrated: Blessed by Goddess Lakshmi and Saraswati!'}
          </h5>
          <p className="text-xs text-[#FFF5DE]/85">
            {currentLanguage === 'hi'
              ? 'नया बही-खाता सत्य, नीति और समृद्धि के संकल्प के साथ प्रारंभ हुआ। साल मुबारक!'
              : currentLanguage === 'bn'
              ? 'নতুন বছর আপনার জীবনে সততা, সমৃদ্ধি ও শুভবুদ্ধি বয়ে আনুক। সাল মুবারক!'
              : 'May the new financial year bring righteousness in trade, peace in mind, and abundance to your home. Saal Mubarak!'}
          </p>
        </div>
      )}
    </div>
  );
};
