/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Droplets, Flame, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface GangaSnanamActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

export const GangaSnanamActivity: React.FC<GangaSnanamActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // Step 1: Sesame Oil Anointed, Step 2: Holy Ganga Water Sprinkled, Step 3: Kutthu Vilakku Lit, Step 4: Marundhu Consumed
  const [hasAnointedOil, setHasAnointedOil] = useState<boolean>(false);
  const [waterDropsCount, setWaterDropsCount] = useState<number>(0);
  const [isVilakkuLit, setIsVilakkuLit] = useState<boolean>(false);
  const [hasTastedMarundhu, setHasTastedMarundhu] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleAnointOil = () => {
    audioManager.playFaralDropSound();
    setHasAnointedOil(true);
    checkDone(true, waterDropsCount, isVilakkuLit, hasTastedMarundhu);
  };

  const handleSprinkleWater = () => {
    audioManager.playWaterSplashSound();
    setWaterDropsCount((prev) => Math.min(prev + 1, 5));
    checkDone(hasAnointedOil, waterDropsCount + 1, isVilakkuLit, hasTastedMarundhu);
  };

  const handleLightVilakku = () => {
    audioManager.playDiyaLightSound();
    setIsVilakkuLit(true);
    checkDone(hasAnointedOil, waterDropsCount, true, hasTastedMarundhu);
  };

  const handleTasteMarundhu = () => {
    audioManager.playSparkleSound();
    setHasTastedMarundhu(true);
    checkDone(hasAnointedOil, waterDropsCount, isVilakkuLit, true);
  };

  const checkDone = (oil: boolean, water: number, vilakku: boolean, marundhu: boolean) => {
    if (oil && water >= 2 && vilakku && marundhu && !isCompleted) {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F5A623', '#F4D995', '#B5532A', '#80CBC4'],
        });
      } catch (e) {}
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    audioManager.playClickSound();
    setHasAnointedOil(false);
    setWaterDropsCount(0);
    setIsVilakkuLit(false);
    setHasTastedMarundhu(false);
    setIsCompleted(false);
  };

  const completedSteps = (hasAnointedOil ? 1 : 0) + (waterDropsCount >= 2 ? 1 : 0) + (isVilakkuLit ? 1 : 0) + (hasTastedMarundhu ? 1 : 0);

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌊</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'पावन गंगा स्नानम् एवं दीपावली मरुंधु'
                : currentLanguage === 'bn'
                ? 'পবিত্র ভোরের গঙ্গা স্নানম ও মারুন্ধু সেবন'
                : 'Pre-Dawn Ganga Snanam & Deepavali Marundhu'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'सूर्योदय से पूर्व तिल के तेल से लेप, पावन गंगाजल से स्नान, कुत्थु विलक्कु प्रज्वलन व औषधीय मरुंधु का सेवन।'
              : currentLanguage === 'bn'
              ? 'ভোরে তিলের তেল মালিশ, পবিত্র গঙ্গা স্নান, কুথু ভিলাক্কু প্রদীপ প্রজ্বলন ও সুস্বাদু ঔষধি মারুন্ধু গ্রহণ।'
              : 'Perform the pre-dawn herbal oil anointment, holy Ganga bath, light the bronze Kutthu Vilakku, and taste healing Marundhu.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{completedSteps} / 4 {currentLanguage === 'hi' ? 'चरण' : currentLanguage === 'bn' ? 'ধাপ' : 'Steps'}</span>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{currentLanguage === 'hi' ? 'पुनः शुरू' : currentLanguage === 'bn' ? 'আবার' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#142340] via-[#101A2F] to-[#0A101D]">
        {/* Sacred Traditional Kolam Grid Floor */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #F4D995 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Ambient Warm Golden Aura */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: 0.15 + (completedSteps / 4) * 0.45,
            background: 'radial-gradient(ellipse at 50% 60%, rgba(245, 166, 35, 0.4) 0%, rgba(25, 39, 71, 0.8) 60%, transparent 85%)',
          }}
        />

        {/* Stage Center Elements: Bronze Kutthu Vilakku + Urli with Water & Flowers + Marundhu Bowl */}
        <div className="relative z-10 my-auto w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Item 1: Warm Herbal Sesame Oil & Water Urli */}
          <div
            onClick={handleSprinkleWater}
            className="flex flex-col items-center p-3 rounded-2xl bg-[#192747]/70 border border-[#D6AD60]/30 hover:border-[#D6AD60] transition-all cursor-pointer group hover:scale-105 active:scale-95 shadow-lg"
          >
            <div className="relative">
              <svg viewBox="0 0 100 80" className="w-20 sm:w-24 h-auto drop-shadow-md">
                {/* Traditional South Indian Brass Urli Vessel */}
                <ellipse cx="50" cy="55" rx="42" ry="16" fill="#8F6220" />
                <ellipse cx="50" cy="50" rx="40" ry="14" fill="#D6AD60" />
                <ellipse cx="50" cy="48" rx="36" ry="11" fill="#4DD0E1" opacity="0.85" />
                {/* Water Ripples */}
                <ellipse cx="50" cy="48" rx="24" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
                {/* Floating Fresh Red Hibiscus & Neem Petals */}
                <circle cx="44" cy="47" r="4.5" fill="#E91E63" />
                <circle cx="58" cy="49" r="4" fill="#FFC107" />
                <ellipse cx="36" cy="46" rx="4" ry="2" fill="#4CAF50" />
                <ellipse cx="64" cy="47" rx="4" ry="2" fill="#4CAF50" />
              </svg>
              {waterDropsCount < 2 && (
                <span className="absolute -top-1 right-0 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              )}
            </div>

            <span className="font-semibold text-xs text-[#F4D995] mt-1.5 text-center">
              {waterDropsCount >= 2 ? '✨ ' + (currentLanguage === 'hi' ? 'गंगाजल पावन स्नान' : currentLanguage === 'bn' ? 'পবিত্র গঙ্গা স্নান' : 'Holy Ganga Bath') : (currentLanguage === 'hi' ? 'गंगाजल सिंचन करें' : currentLanguage === 'bn' ? 'গঙ্গাজল স্পর্শ করুন' : 'Touch Ganga Theertham')}
            </span>
            <span className="text-[10px] text-[#FFF5DE]/60">
              {waterDropsCount > 0 ? `${waterDropsCount} ${currentLanguage === 'hi' ? 'बार सिंचन' : currentLanguage === 'bn' ? 'বার সিঞ্চন' : 'drops sprinkled'}` : (currentLanguage === 'hi' ? 'स्पर्श करें' : currentLanguage === 'bn' ? 'স্পর্শ করুন' : 'Tap to sprinkle')}
            </span>
          </div>

          {/* Item 2: Ornate South Indian Kutthu Vilakku (Standing Bronze Lamp) */}
          <div
            onClick={handleLightVilakku}
            className="flex flex-col items-center p-3 rounded-2xl bg-[#192747]/70 border border-[#D6AD60]/30 hover:border-[#D6AD60] transition-all cursor-pointer group hover:scale-105 active:scale-95 shadow-lg"
          >
            <div className="relative">
              <svg viewBox="0 0 100 130" className="w-18 sm:w-22 h-auto drop-shadow-xl">
                {/* Vilakku Brass Finish */}
                <defs>
                  <linearGradient id="bronzeVilakku" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="40%" stopColor="#D6AD60" />
                    <stop offset="80%" stopColor="#8F6220" />
                    <stop offset="100%" stopColor="#5E3808" />
                  </linearGradient>
                </defs>

                {/* Flames when lit */}
                {isVilakkuLit && (
                  <g className="animate-flame origin-bottom">
                    <circle cx="50" cy="18" r="14" fill="rgba(255, 179, 71, 0.45)" filter="blur(4px)" />
                    <path d="M 50 4 C 46 12, 44 18, 46 24 C 48 28, 52 28, 54 24 C 56 18, 54 12, 50 4 Z" fill="#FFE082" />
                    <path d="M 50 10 C 48 15, 47 18, 48 22 C 49 24, 51 24, 52 22 C 53 18, 52 15, 50 10 Z" fill="#FFFFFF" className="animate-flame-core" />
                    {/* Side flames */}
                    <circle cx="28" cy="30" r="3.5" fill="#FFD54F" />
                    <circle cx="72" cy="30" r="3.5" fill="#FFD54F" />
                  </g>
                )}

                {/* Top Swan (Annam) finial */}
                <path d="M 50 26 Q 53 22 55 20 Q 57 23 54 26 Z" fill="url(#bronzeVilakku)" />
                {/* 5-spout Oil Bowl */}
                <ellipse cx="50" cy="35" rx="26" ry="8" fill="url(#bronzeVilakku)" />
                <ellipse cx="50" cy="33" rx="22" ry="5.5" fill="#5E3808" />

                {/* Tall Central Column with traditional beads */}
                <path d="M 47 36 L 47 90 L 53 90 L 53 36 Z" fill="url(#bronzeVilakku)" />
                <ellipse cx="50" cy="55" rx="8" ry="3" fill="#5E3808" />
                <ellipse cx="50" cy="75" rx="9" ry="3" fill="#5E3808" />

                {/* Flared Pedestal Base */}
                <path d="M 43 90 L 32 115 L 68 115 L 57 90 Z" fill="url(#bronzeVilakku)" />
                <ellipse cx="50" cy="116" rx="28" ry="8" fill="url(#bronzeVilakku)" />
              </svg>
              {!isVilakkuLit && (
                <span className="absolute -top-1 right-0 w-2.5 h-2.5 rounded-full bg-[#D6AD60] animate-ping" />
              )}
            </div>

            <span className="font-semibold text-xs text-[#F4D995] mt-1.5 text-center">
              {isVilakkuLit ? '🪔 ' + (currentLanguage === 'hi' ? 'कुत्थु विलक्कु प्रज्वलित' : currentLanguage === 'bn' ? 'কুথু ভিলাক্কু প্রজ্বলিত' : 'Kutthu Vilakku Lit') : (currentLanguage === 'hi' ? 'दीप प्रज्वलित करें' : currentLanguage === 'bn' ? 'প্রদীপ প্রজ্জ্বলন' : 'Light Kutthu Vilakku')}
            </span>
            <span className="text-[10px] text-[#FFF5DE]/60">
              {isVilakkuLit ? (currentLanguage === 'hi' ? 'पवित्र ज्योति' : currentLanguage === 'bn' ? 'পবিত্র শিখা' : 'Sacred Bronze Glow') : (currentLanguage === 'hi' ? 'छूकर जलाएं' : currentLanguage === 'bn' ? 'স্পর্শ করুন' : 'Tap to illuminate')}
            </span>
          </div>

          {/* Item 3: Healing Deepavali Marundhu Bowl */}
          <div
            onClick={handleTasteMarundhu}
            className="flex flex-col items-center p-3 rounded-2xl bg-[#192747]/70 border border-[#D6AD60]/30 hover:border-[#D6AD60] transition-all cursor-pointer group hover:scale-105 active:scale-95 shadow-lg"
          >
            <div className="relative">
              <svg viewBox="0 0 100 80" className="w-20 sm:w-24 h-auto drop-shadow-md">
                {/* Silver or Brass Offering Katori */}
                <ellipse cx="50" cy="58" rx="34" ry="14" fill="#A0A0A0" />
                <ellipse cx="50" cy="54" rx="32" ry="12" fill="#E0E0E0" />
                {/* Rich Dark Ayurvedic Marundhu Lehyam Paste */}
                <ellipse cx="50" cy="52" rx="26" ry="9" fill="#4E342E" />
                {/* Saffron and cardamom garnish */}
                <circle cx="48" cy="50" r="2" fill="#FFC107" />
                <circle cx="54" cy="52" r="1.5" fill="#FF9800" />
                <ellipse cx="44" cy="52" rx="2" ry="1" fill="#8D6E63" />
              </svg>
              {!hasTastedMarundhu && (
                <span className="absolute -top-1 right-0 w-2.5 h-2.5 rounded-full bg-[#FFB347] animate-ping" />
              )}
            </div>

            <span className="font-semibold text-xs text-[#F4D995] mt-1.5 text-center">
              {hasTastedMarundhu ? '🍯 ' + (currentLanguage === 'hi' ? 'मरुंधु प्रसाद ग्रहण' : currentLanguage === 'bn' ? 'মারুন্ধু আস্বাদিত' : 'Marundhu Tasted') : (currentLanguage === 'hi' ? 'दीपावली मरुंधु चखें' : currentLanguage === 'bn' ? 'মারুন্ধু গ্রহণ করুন' : 'Taste Deepavali Marundhu')}
            </span>
            <span className="text-[10px] text-[#FFF5DE]/60">
              {hasTastedMarundhu ? (currentLanguage === 'hi' ? 'आरोग्य व पाचक अमृत' : currentLanguage === 'bn' ? 'আরোগ্য ও অমৃত শক্তি' : 'Digestive Vitality') : (currentLanguage === 'hi' ? 'सौंठ-कालीमिर्च-गुड़' : currentLanguage === 'bn' ? 'আদা-মরিচ-গুড়' : 'Ayurvedic Wellness')}
            </span>
          </div>
        </div>

        {/* Traditional Blessing Greeting Bar: "Ganga Snanam Aacha?" */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D6AD60]/20 bg-[#10172D]/85 backdrop-blur-md px-3 py-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <button
              onClick={handleAnointOil}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                hasAnointedOil
                  ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
              }`}
            >
              <span>🧴</span>
              <span>{hasAnointedOil ? (currentLanguage === 'hi' ? 'तिल तेल लेप संपन्न' : currentLanguage === 'bn' ? 'তিলের তেল মালিশ শেষ' : 'Sesame Oil Applied') : (currentLanguage === 'hi' ? 'तिल तेल लेप करें' : currentLanguage === 'bn' ? 'তিলের তেল মালিশ' : 'Apply Sesame Oil')}</span>
            </button>
          </div>

          <div className="text-center font-editorial text-xs sm:text-sm text-[#F4D995] font-semibold italic">
            "கங்கா ஸ்நானம் ஆச்சா? (Ganga Snanam Aacha?)"
          </div>
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">🌊🪔🍯</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'गंगा स्नानम् एवं दीपावली मरुंधु संपन्न!'
                  : currentLanguage === 'bn'
                  ? 'গঙ্গা স্নানম ও মারুন্ধু সেবন সম্পন্ন!'
                  : 'Ganga Snanam & Marundhu Complete!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'पवित्र गंगाजल से स्नान और औषधीय मरुंधु के सेवन से शरीर निरोगी और मन पावन हो चुका है। तमिलनाडु की इस वात्सल्यमयी परंपरा का पावन आशीर्वाद आपके साथ है।'
                  : currentLanguage === 'bn'
                  ? 'ভোরের পুণ্য গঙ্গাজলে স্নান এবং ভেষজ মারুন্ধুর মধুর পরশে আপনার শরীর ও মন সতেজ ও রোগমুক্ত হলো। তামিলনাড়ুর স্নেহের ঐতিহ্য আপনার ঘরে আলো ছড়াক।'
                  : 'Your pre-dawn ritual is complete with sacred Ganga purity, glowing Kutthu Vilakku, and digestive vitality from Deepavali Marundhu. Happy Deepavali!'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'दर्शन करें' : currentLanguage === 'bn' ? 'দর্শন করুন' : 'View Altar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {currentLanguage === 'hi'
          ? 'तमिलनाडु की परंपरा: जलपात्र छूकर गंगा स्नान करें, कुत्थु विलक्कु जलाएं और औषधीय मरुंधु का स्वाद लें।'
          : currentLanguage === 'bn'
          ? 'তামিলনাড়ুর প্রথা: জল স্পর্শ করে গঙ্গা স্নান করুন, পিতলের ভিলাক্কু জ্বালান এবং মারুন্ধু গ্রহণ করুন।'
          : 'Traditional Tamil custom: touch the water for Ganga bath, light the bronze Kutthu Vilakku, and taste authentic Marundhu.'}
      </div>
    </div>
  );
};
