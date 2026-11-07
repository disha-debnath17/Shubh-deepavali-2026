/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Music, Flame, RotateCcw, Sunrise, CheckCircle2 } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface DiwaliPahatActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

export const DiwaliPahatActivity: React.FC<DiwaliPahatActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // Samai lighting levels: 0 (unlit), 1 (base oil ready), 2 (lower wicks lit), 3 (middle wicks lit), 4 (top wick lit - fully radiant)
  const [samaiTier, setSamaiTier] = useState<number>(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [flowerShowerCount, setFlowerShowerCount] = useState<number>(0);
  const [selectedRaga, setSelectedRaga] = useState<'bhairav' | 'todi' | 'kalyan'>('bhairav');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const ragas = {
    bhairav: {
      name: { en: 'Raag Bhairav (भैरव)', hi: 'राग भैरव (प्रभात वंदन)', bn: 'রাগ ভৈরব' },
      mood: { en: 'Solemn, meditative dawn reverence', hi: 'गंभीर व शांत भोर की भक्ति', bn: 'গম্ভীর ও শান্ত ভোরের ভক্তি' },
    },
    todi: {
      name: { en: 'Raag Miyan Ki Todi (तोड़ी)', hi: 'राग तोड़ी (आत्मिक शांति)', bn: 'রাগ তোড়ী' },
      mood: { en: 'Deep longing and divine morning tranquility', hi: 'परम शांति व अंतर्मुखी भाव', bn: 'গভীর আধ্যাত্মিক প্রশান্তি' },
    },
    kalyan: {
      name: { en: 'Raag Yaman Kalyan (कल्याण)', hi: 'राग यमन कल्याण (मंगल शुरुआत)', bn: 'রাগ কল্যাণ' },
      mood: { en: 'Auspicious celebratory blessing', hi: 'मंगलमय व उल्लासपूर्ण वातावरण', bn: 'মাঙ্গলিক ও কল্যাণময় সুর' },
    },
  };

  const advanceSamai = () => {
    if (samaiTier < 4) {
      const next = samaiTier + 1;
      setSamaiTier(next);
      audioManager.playDiyaLightSound();
      if (next === 4) {
        audioManager.playHarmoniumChord();
        triggerCompletion();
      }
    } else {
      audioManager.playDiyaLightSound();
    }
  };

  const handlePlayMusic = () => {
    audioManager.playHarmoniumChord();
    setIsMusicPlaying(true);
    setTimeout(() => {
      audioManager.playDiyaLightSound();
    }, 450);
  };

  const handleShowerFlowers = () => {
    audioManager.playSparkleSound();
    setFlowerShowerCount((c) => Math.min(c + 1, 6));
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#F5A623', '#FFF5DE', '#F4D995', '#FFB347'],
      });
    } catch (e) {}
  };

  const triggerCompletion = () => {
    setIsCompleted(true);
    try {
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#F5A623', '#F4D995', '#D6AD60', '#FFE082'],
      });
    } catch (e) {}
    if (onComplete) onComplete();
  };

  const handleReset = () => {
    audioManager.playClickSound();
    setSamaiTier(1);
    setIsMusicPlaying(false);
    setFlowerShowerCount(0);
    setIsCompleted(false);
  };

  // Dawn atmosphere: from night navy to warm saffron dawn glow
  const dawnGlow = (samaiTier / 4) * 0.7 + (isMusicPlaying ? 0.2 : 0);

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎶</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'दिवाळी पहाट: भोर के शास्त्रीय राग व समाई प्रज्वलन'
                : currentLanguage === 'bn'
                ? 'দিওয়ালি পাহত: ভোরের শাস্ত্রীয় রাগ ও সামাই প্রদীপ'
                : 'Diwali Pahat: Dawn Melodies & Sacred Samai'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'सूर्योदय से पूर्व पीतल की भव्य समाई जलाएं और पावन रागों संग आत्मिक शांति पाएं।'
              : currentLanguage === 'bn'
              ? 'সূর্যোদয়ের আগে পিতলের সামাই প্রদীপ জ্বেলে ভোরের রাগের সাথে উৎসবের সূচনা করুন।'
              : 'Illuminate the tall Maharashtrian brass Samai tier-by-tier and immerse in morning classical ragas.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
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
      <div
        className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col items-center justify-between p-4 sm:p-6 transition-all duration-1000"
        style={{
          background: `linear-gradient(to top, rgba(245, 166, 35, ${0.15 + dawnGlow * 0.45}) 0%, #151F36 60%, #0A0F1D 100%)`,
        }}
      >
        {/* Subtle Dawn Horizon Sky Backdrop */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: dawnGlow,
            background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 179, 71, 0.45) 0%, rgba(181, 83, 42, 0.25) 50%, transparent 80%)',
          }}
        />

        {/* Stage Floating Mist / Soft Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D6AD60_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Top Floating Musical Notes if playing */}
        {isMusicPlaying && (
          <div className="absolute top-4 left-6 right-6 flex justify-between pointer-events-none text-xl sm:text-2xl text-[#F4D995]/80 animate-pulse">
            <span className="animate-bounce">🎵</span>
            <span className="animate-pulse delay-100">🎼</span>
            <span className="animate-bounce delay-200">🪕</span>
            <span className="animate-pulse delay-300">🎶</span>
          </div>
        )}

        {/* Center: The Majestic Tall Brass Samai Lamp */}
        <div className="relative z-10 my-auto flex flex-col items-center group cursor-pointer" onClick={advanceSamai}>
          <div className="relative">
            <svg viewBox="0 0 160 260" className="w-36 sm:w-44 md:w-52 h-auto drop-shadow-2xl">
              <defs>
                <linearGradient id="brassGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="35%" stopColor="#D6AD60" />
                  <stop offset="70%" stopColor="#B38634" />
                  <stop offset="100%" stopColor="#7A5212" />
                </linearGradient>
                <radialGradient id="brassAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFDE82" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#F5A623" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Flame Radiance Glow if lit */}
              {samaiTier >= 2 && (
                <circle
                  cx="80"
                  cy="70"
                  r={samaiTier === 4 ? 75 : 50}
                  fill="url(#brassAura)"
                  className="animate-pulse"
                />
              )}

              {/* Topmost Finial Flame (Tier 4) */}
              {samaiTier >= 4 && (
                <g className="animate-flame origin-bottom">
                  <path d="M 80 12 C 75 22, 73 28, 75 35 C 77 40, 83 40, 85 35 C 87 28, 85 22, 80 12 Z" fill="#FFE082" />
                  <path d="M 80 18 C 78 23, 77 27, 78 31 C 79 33, 81 33, 82 31 C 83 27, 82 23, 80 18 Z" fill="#FFFFFF" className="animate-flame-core" />
                </g>
              )}

              {/* Top Sacred Crown (Kalas / Finial) */}
              <path d="M 80 34 L 75 42 L 85 42 Z" fill="url(#brassGold)" />
              <ellipse cx="80" cy="42" rx="7" ry="2.5" fill="#7A5212" />

              {/* Tier 3: Upper 5-Wick Oil Plate Flames */}
              {samaiTier >= 3 && (
                <g className="animate-flame origin-bottom">
                  <circle cx="58" cy="54" r="5" fill="#FFD54F" />
                  <circle cx="102" cy="54" r="5" fill="#FFD54F" />
                  <circle cx="70" cy="50" r="6" fill="#FFE082" />
                  <circle cx="90" cy="50" r="6" fill="#FFE082" />
                </g>
              )}

              {/* Tier 2: Lower Ornate Oil Reservoir & Petals */}
              {samaiTier >= 2 && (
                <g className="animate-flame origin-bottom">
                  <circle cx="45" cy="80" r="6" fill="#FFB347" />
                  <circle cx="115" cy="80" r="6" fill="#FFB347" />
                  <circle cx="80" cy="74" r="8" fill="#FFE082" />
                </g>
              )}

              {/* Upper Oil Plate */}
              <ellipse cx="80" cy="58" rx="28" ry="7" fill="url(#brassGold)" />
              <ellipse cx="80" cy="57" rx="24" ry="5" fill="#7A5212" />

              {/* Main Lower Oil Bowl with 5 Beaks */}
              <ellipse cx="80" cy="86" rx="46" ry="11" fill="url(#brassGold)" />
              <ellipse cx="80" cy="84" rx="40" ry="8" fill="#66410E" />

              {/* Ornate Brass Central Pillar (Stambh) */}
              <path d="M 75 88 L 74 185 Q 70 195 65 205 L 95 205 Q 90 195 86 185 L 85 88 Z" fill="url(#brassGold)" />
              {/* Pillar Rings & Etchings */}
              <ellipse cx="80" cy="115" rx="12" ry="3.5" fill="#5E3808" />
              <ellipse cx="80" cy="145" rx="14" ry="4" fill="#5E3808" />
              <ellipse cx="80" cy="175" rx="16" ry="4.5" fill="#5E3808" />

              {/* Multi-layered Heavy Brass Flared Base (Pedestal) */}
              <path d="M 60 205 L 50 230 L 110 230 L 100 205 Z" fill="url(#brassGold)" />
              <ellipse cx="80" cy="232" rx="44" ry="12" fill="url(#brassGold)" />
              <ellipse cx="80" cy="240" rx="52" ry="13" fill="#6B410D" stroke="#D6AD60" strokeWidth="1.5" />
            </svg>

            {/* Tap cue indicator if not full */}
            {samaiTier < 4 && (
              <div className="absolute -top-3 right-0 px-2 py-0.5 rounded-full bg-[#D6AD60] text-[#10172D] text-[10px] font-bold shadow-lg animate-bounce flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span>{currentLanguage === 'hi' ? 'छूकर समाई प्रज्वलित करें' : currentLanguage === 'bn' ? 'স্পর্শ করে সামাই জ্বালান' : 'Tap to Light Samai'}</span>
              </div>
            )}
          </div>

          {/* Scented Fresh Flower Petals around Base */}
          {flowerShowerCount > 0 && (
            <div className="mt-1 flex items-center gap-1.5 flex-wrap justify-center text-xs animate-fade-in">
              {Array.from({ length: flowerShowerCount }).map((_, i) => (
                <span key={i} className="text-sm">🌼🌸</span>
              ))}
            </div>
          )}

          <div className="mt-2 text-center">
            <span className="px-3 py-1 rounded-full bg-[#192747]/90 border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995]">
              {samaiTier === 4
                ? (currentLanguage === 'hi' ? '✨ दिव्य समाई पूर्ण प्रज्वलित' : currentLanguage === 'bn' ? '✨ দিব্য সামাই পূর্ণ প্রজ্বলিত' : '✨ Sacred Samai Fully Radiant')
                : `${currentLanguage === 'hi' ? 'चरण' : currentLanguage === 'bn' ? 'ধাপ' : 'Tier'} ${samaiTier} / 4 · ${currentLanguage === 'hi' ? 'समाई की पावन बत्तियां' : currentLanguage === 'bn' ? 'সামাইয়ের আলোক শিখা' : 'Lighting Sacred Wicks'}`}
            </span>
          </div>
        </div>

        {/* Bottom Interactive Controls */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#D6AD60]/20 bg-[#10172D]/70 backdrop-blur-md px-3 py-2 rounded-2xl">
          {/* Raga Selection */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] text-[#F4D995] font-semibold hidden sm:inline">
              {currentLanguage === 'hi' ? 'प्रभात राग:' : currentLanguage === 'bn' ? 'ভোরের রাগ:' : 'Morning Raga:'}
            </span>
            {(['bhairav', 'todi', 'kalyan'] as const).map((rKey) => (
              <button
                key={rKey}
                onClick={() => {
                  setSelectedRaga(rKey);
                  handlePlayMusic();
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                  selectedRaga === rKey
                    ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                    : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
                }`}
              >
                {ragas[rKey].name[currentLanguage]}
              </button>
            ))}
          </div>

          {/* Interactive Music & Flower Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayMusic}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#192747] border border-[#D6AD60]/50 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Music className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>{isMusicPlaying ? (currentLanguage === 'hi' ? 'सुर सुन रहे हैं 🎶' : currentLanguage === 'bn' ? 'সুর বাজছে 🎶' : 'Melody Playing') : (currentLanguage === 'hi' ? 'हारमोनियम बजाएं' : currentLanguage === 'bn' ? 'হারমোনিয়াম বাজান' : 'Play Harmonium')}</span>
            </button>

            <button
              onClick={handleShowerFlowers}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D] hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentLanguage === 'hi' ? 'पुष्प वर्षा' : currentLanguage === 'bn' ? 'পুষ্প বৃষ্টি' : 'Offer Flowers'}</span>
            </button>
          </div>
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">🎶🪔🌅</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'शुभ प्रभात! दिवाळी पहाट संपन्न!'
                  : currentLanguage === 'bn'
                  ? 'শুভ প্রভাত! দিওয়ালি পাহত সম্পন্ন!'
                  : 'Shubh Prabhat! Diwali Pahat Complete!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'पीतल की पवित्र समाई और शास्त्रीय संगीत के दिव्य सुरों से आपका भोर पावन हो चुका है। पूरा दिन आपके लिए आनंदमय व मंगलमय रहे।'
                  : currentLanguage === 'bn'
                  ? 'পিতলের মঙ্গলময় সামাই এবং স্নিগ্ধ রাগ সঙ্গীতের সুরে আপনার ভোরের সূচনা হলো। সারা দিন আনন্দে ভরে উঠুক।'
                  : 'The brass Samai is radiant and the sacred morning ragas have filled the festive air with tranquility, welcoming an auspicious Deepavali morning.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'दर्शन करें' : currentLanguage === 'bn' ? 'দর্শন করুন' : 'View Dawn Altar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Raga Mood note */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        "{ragas[selectedRaga].mood[currentLanguage]}"
      </div>
    </div>
  );
};
