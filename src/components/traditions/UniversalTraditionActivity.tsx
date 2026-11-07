/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Check, Flame, RotateCcw, Heart, Utensils, Palette, Bell, Flower2, CheckCircle2 } from 'lucide-react';
import { RegionalActivity } from '../../types';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface UniversalTraditionActivityProps {
  activity: RegionalActivity;
  currentLanguage: Language;
  onComplete?: () => void;
}

export const UniversalTraditionActivity: React.FC<UniversalTraditionActivityProps> = ({
  activity,
  currentLanguage,
  onComplete,
}) => {
  // Determine mode: 'food' | 'art' | 'diya' | 'grand-aarti'
  const isFood = activity.illustrationType === 'universal-food' || activity.id.includes('treat') || activity.id.includes('food');
  const isArt = activity.illustrationType === 'universal-rangoli' || activity.id.includes('art') || activity.id.includes('rangoli');
  
  // Experience Mode: Default to state tradition, but user can also toggle to Grand All-India Aarti
  const [activeTab, setActiveTab] = useState<'state-tradition' | 'grand-aarti'>('state-tradition');

  // --- STATE FOR FOOD / DELICACY PLATTER ---
  const [foodPiecesCount, setFoodPiecesCount] = useState<number>(2);
  const [hasSaffronDrizzle, setHasSaffronDrizzle] = useState<boolean>(false);
  const [hasPistachios, setHasPistachios] = useState<boolean>(false);
  const [hasSilverVark, setHasSilverVark] = useState<boolean>(false);

  // --- STATE FOR FOLK ART / RANGOLI ---
  const [artSectorsFilled, setArtSectorsFilled] = useState<number[]>([1]);
  const [selectedArtColor, setSelectedArtColor] = useState<string>('#FF5722');
  const [hasCenterDiya, setHasCenterDiya] = useState<boolean>(false);
  const [hasFlowerBorder, setHasFlowerBorder] = useState<boolean>(false);

  // --- STATE FOR DIYA / GRAND AARTI ---
  const [aartiWicksLit, setAartiWicksLit] = useState<number[]>([1, 2]);
  const [isIncenseLit, setIsIncenseLit] = useState<boolean>(false);
  const [urliFlowersCount, setUrliFlowersCount] = useState<number>(3);
  const [bellRungCount, setBellRungCount] = useState<number>(0);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // --- FOOD INTERACTIONS ---
  const handleAddFoodPiece = () => {
    audioManager.playFaralDropSound();
    setFoodPiecesCount((c) => Math.min(c + 1, 5));
    checkFoodDone(foodPiecesCount + 1, hasSaffronDrizzle, hasPistachios, hasSilverVark);
  };

  const handleDrizzleSaffron = () => {
    audioManager.playSparkleSound();
    setHasSaffronDrizzle(true);
    checkFoodDone(foodPiecesCount, true, hasPistachios, hasSilverVark);
  };

  const handleSprinkleNuts = () => {
    audioManager.playFaralDropSound();
    setHasPistachios(true);
    checkFoodDone(foodPiecesCount, hasSaffronDrizzle, true, hasSilverVark);
  };

  const handleApplySilverVark = () => {
    audioManager.playSparkleSound();
    setHasSilverVark(true);
    checkFoodDone(foodPiecesCount, hasSaffronDrizzle, hasPistachios, true);
  };

  const checkFoodDone = (pieces: number, saffron: boolean, nuts: boolean, silver: boolean) => {
    if (pieces >= 3 && (saffron || nuts || silver) && !isCompleted) {
      triggerSuccess();
    }
  };

  // --- ART INTERACTIONS ---
  const toggleArtSector = (id: number) => {
    audioManager.playSparkleSound();
    setArtSectorsFilled((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      if (next.length >= 4 && (hasCenterDiya || hasFlowerBorder) && !isCompleted) {
        triggerSuccess();
      }
      return next;
    });
  };

  const handleToggleCenterDiya = () => {
    audioManager.playDiyaLightSound();
    setHasCenterDiya(true);
    if (artSectorsFilled.length >= 3 && !isCompleted) {
      triggerSuccess();
    }
  };

  const handleAddFlowerBorder = () => {
    audioManager.playSparkleSound();
    setHasFlowerBorder(true);
    if (artSectorsFilled.length >= 3 && !isCompleted) {
      triggerSuccess();
    }
  };

  // --- DIYA & GRAND AARTI INTERACTIONS ---
  const toggleAartiWick = (idx: number) => {
    audioManager.playDiyaLightSound();
    setAartiWicksLit((prev) => {
      const next = prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx];
      if (next.length === 5 && (isIncenseLit || urliFlowersCount >= 4) && !isCompleted) {
        triggerSuccess();
      }
      return next;
    });
  };

  const handleLightIncense = () => {
    audioManager.playDiyaLightSound();
    setIsIncenseLit(true);
    if (aartiWicksLit.length >= 3 && !isCompleted) {
      triggerSuccess();
    }
  };

  const handleAddUrliFlower = () => {
    audioManager.playWaterSplashSound();
    setUrliFlowersCount((c) => Math.min(c + 1, 8));
  };

  const handleRingBell = () => {
    audioManager.playTempleBellSound();
    setBellRungCount((c) => c + 1);
  };

  const triggerSuccess = () => {
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
    setFoodPiecesCount(2);
    setHasSaffronDrizzle(false);
    setHasPistachios(false);
    setHasSilverVark(false);
    setArtSectorsFilled([1]);
    setHasCenterDiya(false);
    setHasFlowerBorder(false);
    setAartiWicksLit([1, 2]);
    setIsIncenseLit(false);
    setUrliFlowersCount(3);
    setIsCompleted(false);
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{activity.icon}</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {activity.title[currentLanguage]}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {activity.subtitle[currentLanguage]}
          </p>
        </div>

        {/* Tab & Reset Actions */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#10172D] p-1 rounded-2xl border border-[#D6AD60]/30">
            <button
              onClick={() => {
                audioManager.playClickSound();
                setActiveTab('state-tradition');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'state-tradition'
                  ? 'bg-[#D6AD60]/25 text-[#F4D995] border border-[#D6AD60]/40'
                  : 'text-[#FFF5DE]/60 hover:text-white'
              }`}
            >
              <span>{activity.badge[currentLanguage]}</span>
            </button>

            <button
              onClick={() => {
                audioManager.playClickSound();
                setActiveTab('grand-aarti');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'grand-aarti'
                  ? 'bg-[#D6AD60]/25 text-[#F4D995] border border-[#D6AD60]/40'
                  : 'text-[#FFF5DE]/60 hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3 text-[#FFB347]" />
              <span>{currentLanguage === 'hi' ? 'सर्वभारतीय महाआरती' : currentLanguage === 'bn' ? 'সর্বভারতীয় মহাদীপোৎসব' : 'All-India Grand Aarti'}</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#16223B] via-[#10172D] to-[#0A0E1A]">
        {/* Soft Golden Background Atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: 0.35,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(245, 166, 35, 0.35) 0%, rgba(25, 39, 71, 0.7) 60%, transparent 85%)',
          }}
        />

        {/* ----------------- 1. REGIONAL FOOD / SWEET PLATTER MODE ----------------- */}
        {activeTab === 'state-tradition' && isFood && (
          <div className="relative z-10 my-auto w-full max-w-md mx-auto flex flex-col items-center">
            {/* Royal Brass Offering Thali */}
            <div className="relative cursor-pointer group" onClick={handleAddFoodPiece}>
              <svg viewBox="0 0 280 200" className="w-56 sm:w-72 md:w-80 h-auto drop-shadow-2xl">
                <defs>
                  <linearGradient id="brassThaliGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF2B2" />
                    <stop offset="40%" stopColor="#D6AD60" />
                    <stop offset="75%" stopColor="#A67C2E" />
                    <stop offset="100%" stopColor="#6E4D14" />
                  </linearGradient>
                </defs>

                {/* Outer Fluted Edge & Rim */}
                <ellipse cx="140" cy="115" rx="130" ry="65" fill="#5E3808" />
                <ellipse cx="140" cy="110" rx="126" ry="62" fill="url(#brassThaliGrad)" />
                <ellipse cx="140" cy="108" rx="115" ry="54" fill="#3D2409" />
                <ellipse cx="140" cy="106" rx="108" ry="49" fill="url(#brassThaliGrad)" />
                <ellipse cx="140" cy="105" rx="100" ry="44" fill="#2E1A05" />

                {/* Sweet / Delicacy Pieces Arranged */}
                {Array.from({ length: foodPiecesCount }).map((_, i) => {
                  const offsets = [
                    { x: 140, y: 105 },
                    { x: 105, y: 95 },
                    { x: 175, y: 95 },
                    { x: 115, y: 118 },
                    { x: 165, y: 118 },
                  ];
                  const pos = offsets[i] || { x: 140, y: 105 };

                  return (
                    <g key={i} className="animate-fade-in">
                      {/* Golden Crisp Traditional Sweet / Mithai */}
                      <ellipse cx={pos.x} cy={pos.y + 4} rx="20" ry="12" fill="#5D2E0C" opacity="0.6" />
                      <ellipse cx={pos.x} cy={pos.y} rx="20" ry="12" fill="#E67E22" stroke="#F39C12" strokeWidth="1.5" />
                      <ellipse cx={pos.x} cy={pos.y - 2} rx="16" ry="8" fill="#F39C12" />

                      {/* Pure Silver Vark Foil */}
                      {hasSilverVark && (
                        <polygon
                          points={`${pos.x - 6},${pos.y - 4} ${pos.x + 8},${pos.y - 6} ${pos.x + 4},${pos.y + 3}`}
                          fill="#FFFFFF"
                          fillOpacity="0.85"
                          filter="drop-shadow(0 0 2px rgba(255,255,255,0.9))"
                        />
                      )}

                      {/* Crushed Pistachio / Almond Flecks */}
                      {hasPistachios && (
                        <g>
                          <circle cx={pos.x - 4} cy={pos.y - 3} r="1.5" fill="#4CAF50" />
                          <circle cx={pos.x + 5} cy={pos.y - 1} r="1.5" fill="#4CAF50" />
                          <circle cx={pos.x + 1} cy={pos.y + 2} r="1.5" fill="#8BC34A" />
                        </g>
                      )}

                      {/* Saffron Strands (Kesar) */}
                      {hasSaffronDrizzle && (
                        <path
                          d={`M ${pos.x - 5} ${pos.y - 1} Q ${pos.x} ${pos.y - 5} ${pos.x + 6} ${pos.y - 2}`}
                          stroke="#D84315"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Scented Rose Petals scattered on Thali */}
                <circle cx="80" cy="110" r="4" fill="#E91E63" />
                <circle cx="200" cy="105" r="4.5" fill="#E91E63" />
                <circle cx="140" cy="138" r="4" fill="#E91E63" />
              </svg>
            </div>

            <span className="font-royal text-sm sm:text-base font-bold text-[#F4D995] mt-2">
              {activity.title[currentLanguage]}
            </span>
            <span className="text-[11px] text-[#FFF5DE]/75">
              {foodPiecesCount} {currentLanguage === 'hi' ? 'विशेष पकवान थाली में सजे' : currentLanguage === 'bn' ? 'মিষ্টান্ন থালিতে সজ্জিত' : 'delicacy pieces on the festive thali'}
            </span>
          </div>
        )}

        {/* ----------------- 2. REGIONAL SACRED ART / RANGOLI MODE ----------------- */}
        {activeTab === 'state-tradition' && isArt && (
          <div className="relative z-10 my-auto w-full max-w-md mx-auto flex flex-col items-center">
            {/* Interactive Symmetrical Folk Art Canvas */}
            <div className="relative">
              <svg viewBox="0 0 260 220" className="w-56 sm:w-72 md:w-80 h-auto drop-shadow-2xl">
                {/* Traditional Sacred Floor Border */}
                <circle cx="130" cy="110" r="95" fill="#141E34" stroke="#D6AD60" strokeWidth="2" strokeDasharray="4 4" />

                {/* Flower Petal Outer Border if added */}
                {hasFlowerBorder && (
                  <circle cx="130" cy="110" r="88" fill="none" stroke="#FFC107" strokeWidth="4" strokeDasharray="6 8" />
                )}

                {/* 6 Clickable Symmetrical Mandala Sectors */}
                {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                  const num = idx + 1;
                  const isFilled = artSectorsFilled.includes(num);
                  const colors = ['#E91E63', '#FF9800', '#00BCD4', '#9C27B0', '#4CAF50', '#FFEB3B'];
                  const fill = isFilled ? colors[idx] : '#223254';

                  return (
                    <g key={angle} transform={`rotate(${angle} 130 110)`} onClick={() => toggleArtSector(num)} className="cursor-pointer group">
                      <path
                        d="M 130 110 C 112 65, 112 35, 130 25 C 148 35, 148 65, 130 110 Z"
                        fill={fill}
                        stroke="#D6AD60"
                        strokeWidth="1.5"
                        className="transition-colors duration-300 group-hover:brightness-125"
                      />
                      {isFilled && <circle cx="130" cy="55" r="4" fill="#FFFFFF" />}
                    </g>
                  );
                })}

                {/* Center Circle or Glowing Diya */}
                {hasCenterDiya ? (
                  <g className="animate-flame origin-bottom">
                    <circle cx="130" cy="98" r="14" fill="rgba(255, 179, 71, 0.6)" filter="blur(4px)" />
                    <ellipse cx="130" cy="112" rx="14" ry="6" fill="#8D431D" />
                    <ellipse cx="130" cy="110" rx="12" ry="4.5" fill="#C46E3A" />
                    <circle cx="130" cy="102" r="3.5" fill="#FFE082" />
                  </g>
                ) : (
                  <circle cx="130" cy="110" r="14" fill="#243457" stroke="#D6AD60" strokeWidth="2" strokeDasharray="3 3" onClick={handleToggleCenterDiya} className="cursor-pointer" />
                )}
              </svg>
            </div>

            <span className="font-royal text-sm sm:text-base font-bold text-[#F4D995] mt-2">
              {activity.title[currentLanguage]}
            </span>
            <span className="text-[11px] text-[#FFF5DE]/75">
              {artSectorsFilled.length}/6 {currentLanguage === 'hi' ? 'भाग रंगे गए' : currentLanguage === 'bn' ? 'অংশ রঙিন' : 'sectors filled'}
            </span>
          </div>
        )}

        {/* ----------------- 3. DIYA & GRAND ALL-INDIA AARTI MODE ----------------- */}
        {((activeTab === 'state-tradition' && !isFood && !isArt) || activeTab === 'grand-aarti') && (
          <div className="relative z-10 my-auto w-full max-w-md mx-auto flex flex-col items-center">
            {/* Grand Panchmukhi 5-Wick Aarti Thali & Urli Altar */}
            <div className="relative">
              <svg viewBox="0 0 280 200" className="w-56 sm:w-72 md:w-80 h-auto drop-shadow-2xl">
                {/* Sacred Water Urli Vessel */}
                <ellipse cx="140" cy="130" rx="110" ry="45" fill="#5E3808" />
                <ellipse cx="140" cy="125" rx="106" ry="42" fill="#D6AD60" />
                <ellipse cx="140" cy="123" rx="98" ry="36" fill="#26C6DA" opacity="0.8" />

                {/* Floating Marigolds & Rose Petals */}
                {Array.from({ length: urliFlowersCount }).map((_, i) => {
                  const petals = [
                    { x: 100, y: 120, c: '#FF9800' },
                    { x: 180, y: 120, c: '#FF9800' },
                    { x: 140, y: 140, c: '#E91E63' },
                    { x: 80, y: 126, c: '#FFC107' },
                    { x: 200, y: 126, c: '#E91E63' },
                    { x: 120, y: 114, c: '#FF9800' },
                    { x: 160, y: 114, c: '#FFC107' },
                    { x: 140, y: 125, c: '#E91E63' },
                  ];
                  const p = petals[i] || { x: 140, y: 125, c: '#FF9800' };
                  return (
                    <circle key={i} cx={p.x} cy={p.y} r="5.5" fill={p.c} className="animate-pulse shadow-sm" />
                  );
                })}

                {/* Central Heavy Brass Panchmukhi (5-Wick) Aarti Lamp */}
                <path d="M 125 120 L 122 80 L 158 80 L 155 120 Z" fill="#D6AD60" />
                <ellipse cx="140" cy="80" rx="42" ry="12" fill="#B58E3D" stroke="#7A5212" strokeWidth="1" />
                <ellipse cx="140" cy="78" rx="36" ry="9" fill="#5E3808" />

                {/* 5 Sacred Wicks (Flames) */}
                {[
                  { x: 104, y: 76, id: 1 },
                  { x: 122, y: 72, id: 2 },
                  { x: 140, y: 70, id: 3 },
                  { x: 158, y: 72, id: 4 },
                  { x: 176, y: 76, id: 5 },
                ].map((w) => {
                  const isLit = aartiWicksLit.includes(w.id);
                  return (
                    <g key={w.id} onClick={() => toggleAartiWick(w.id)} className="cursor-pointer">
                      {isLit && (
                        <g className="animate-flame origin-bottom">
                          <circle cx={w.x} cy={w.y - 12} r="8" fill="rgba(255, 179, 71, 0.5)" filter="blur(3px)" />
                          <path
                            d={`M ${w.x} ${w.y - 20} C ${w.x - 4} ${w.y - 14}, ${w.x - 3} ${w.y - 8}, ${w.x} ${w.y - 4} C ${w.x + 3} ${w.y - 8}, ${w.x + 4} ${w.y - 14}, ${w.x} ${w.y - 20} Z`}
                            fill="#FFE082"
                          />
                          <circle cx={w.x} cy={w.y - 8} r="2" fill="#FFFFFF" />
                        </g>
                      )}
                      {/* Cotton Wick Tip */}
                      <circle cx={w.x} cy={w.y - 2} r="2" fill={isLit ? '#FFE082' : '#3E2413'} />
                    </g>
                  );
                })}

                {/* Fragrant Agarbatti (Incense Sticks) on the side */}
                {isIncenseLit && (
                  <g className="animate-pulse">
                    <line x1="220" y1="120" x2="235" y2="60" stroke="#8D6E63" strokeWidth="2.5" />
                    <circle cx="235" cy="60" r="2.5" fill="#FF5722" />
                    {/* Aromatic Smoke Spirals */}
                    <path d="M 235 58 Q 230 45 238 35 T 242 15" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
                  </g>
                )}
              </svg>
            </div>

            <span className="font-royal text-sm sm:text-base font-bold text-[#F4D995] mt-2">
              {activeTab === 'grand-aarti' ? (currentLanguage === 'hi' ? 'अखिल भारतीय महादीपोत्सव एवं पावन महाआरती' : currentLanguage === 'bn' ? 'সর্বভারতীয় মহাদীপোৎসব ও আরতি' : 'Grand All-India Deepotsav & Aarti') : activity.title[currentLanguage]}
            </span>
            <span className="text-[11px] text-[#FFF5DE]/75">
              {aartiWicksLit.length}/5 {currentLanguage === 'hi' ? 'पावन बत्तियां प्रज्वलित' : currentLanguage === 'bn' ? 'শিখা প্রজ্বলিত' : 'sacred wicks radiant'}
            </span>
          </div>
        )}

        {/* Bottom Interactive Controls */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D6AD60]/20 bg-[#10172D]/85 backdrop-blur-md px-3 py-2 rounded-2xl">
          {/* Controls for FOOD */}
          {activeTab === 'state-tradition' && isFood && (
            <>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleAddFoodPiece}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#192747] border border-[#D6AD60]/40 text-[#F4D995] hover:bg-[#D6AD60]/20 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{currentLanguage === 'hi' ? 'पकवान जोड़ें' : currentLanguage === 'bn' ? 'মিষ্টি যোগ করুন' : 'Add Sweet'}</span>
                </button>

                <button
                  onClick={handleDrizzleSaffron}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    hasSaffronDrizzle ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]' : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70'
                  }`}
                >
                  <span>🌿</span>
                  <span>{currentLanguage === 'hi' ? 'केसर रस' : currentLanguage === 'bn' ? 'জাফরান' : 'Saffron'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleSprinkleNuts}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    hasPistachios ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]' : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70'
                  }`}
                >
                  <span>🥜</span>
                  <span>{currentLanguage === 'hi' ? 'पिस्ता-बादाम' : currentLanguage === 'bn' ? 'পেস্তা' : 'Pistachios'}</span>
                </button>

                <button
                  onClick={handleApplySilverVark}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-md ${
                    hasSilverVark ? 'bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D]' : 'bg-[#192747] border-[#D6AD60]/50 text-[#F4D995]'
                  }`}
                >
                  <span>✨</span>
                  <span>{currentLanguage === 'hi' ? 'चांदी का वर्क' : currentLanguage === 'bn' ? 'রুপার তবক' : 'Silver Vark'}</span>
                </button>
              </div>
            </>
          )}

          {/* Controls for ART */}
          {activeTab === 'state-tradition' && isArt && (
            <>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleArtSector(artSectorsFilled.length + 1)}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#192747] border border-[#D6AD60]/40 text-[#F4D995] hover:bg-[#D6AD60]/20 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>{currentLanguage === 'hi' ? 'रंग भरें' : currentLanguage === 'bn' ? 'রং ভরুন' : 'Fill Color'}</span>
                </button>

                <button
                  onClick={handleAddFlowerBorder}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    hasFlowerBorder ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]' : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70'
                  }`}
                >
                  <span>🌼</span>
                  <span>{currentLanguage === 'hi' ? 'गेंदा पुष्प बॉर्डर' : currentLanguage === 'bn' ? 'গাঁদা ফুলের সীমানা' : 'Marigold Border'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleToggleCenterDiya}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-md ${
                    hasCenterDiya ? 'bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D]' : 'bg-[#192747] border-[#D6AD60]/50 text-[#F4D995]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>{currentLanguage === 'hi' ? 'मध्य दीप प्रज्वलित' : currentLanguage === 'bn' ? 'কেন্দ্রীয় প্রদীপ' : 'Center Diya'}</span>
                </button>
              </div>
            </>
          )}

          {/* Controls for DIYA / GRAND AARTI */}
          {((activeTab === 'state-tradition' && !isFood && !isArt) || activeTab === 'grand-aarti') && (
            <>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRingBell}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#192747] border border-[#D6AD60]/40 text-[#F4D995] hover:bg-[#D6AD60]/20 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-[#FFB347]" />
                  <span>{currentLanguage === 'hi' ? 'घंटी बजाएं' : currentLanguage === 'bn' ? 'ঘণ্টা বাজান' : 'Ring Bell'}</span>
                </button>

                <button
                  onClick={handleLightIncense}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isIncenseLit ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]' : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70'
                  }`}
                >
                  <span>💨</span>
                  <span>{currentLanguage === 'hi' ? 'धूप/अगरबत्ती' : currentLanguage === 'bn' ? 'সুগন্ধি ধূপ' : 'Incense'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleAddUrliFlower}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-[#192747] border border-[#D6AD60]/40 text-[#FF80AB] hover:bg-[#D6AD60]/20 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Flower2 className="w-3.5 h-3.5" />
                  <span>{currentLanguage === 'hi' ? 'उरली में पुष्प तैराएं' : currentLanguage === 'bn' ? 'উরলিতে ফুল দিন' : 'Float Flowers'}</span>
                </button>

                <button
                  onClick={() => {
                    audioManager.playDiyaLightSound();
                    audioManager.playTempleBellSound();
                    setAartiWicksLit([1, 2, 3, 4, 5]);
                    triggerSuccess();
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D] hover:brightness-110 transition-all cursor-pointer shadow-md"
                >
                  <span>🪔</span>
                  <span>{currentLanguage === 'hi' ? 'पंचमुखी महाआरती' : currentLanguage === 'bn' ? 'পঞ্চমুখী মহাপ্রদীপ' : 'Grand Aarti'}</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">✨🪔🙏</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {activity.title[currentLanguage]} {currentLanguage === 'hi' ? 'सम्पन्न!' : currentLanguage === 'bn' ? 'সম্পন্ন!' : 'Completed!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                "{activity.significance[currentLanguage]}"
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'पुनः देखें' : currentLanguage === 'bn' ? 'আবার দেখুন' : 'View Ceremony'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {isFood
          ? (currentLanguage === 'hi' ? 'पकवान जोड़ें, केसर व बादाम छिड़कें और चांदी के वर्क से भोग सजाएं।' : currentLanguage === 'bn' ? 'মিষ্টি সাজান, জাফরান ও পেস্তা দিন এবং রূপার তবকে প্রসাদ অর্পণ করুন।' : 'Assemble the festive delicacy platter, drizzle saffron, and garnish with silver vark.')
          : isArt
          ? (currentLanguage === 'hi' ? 'पंखुड़ियों को छूकर रंग भरें, गेंदा पुष्प बॉर्डर सजाएं और मध्य दीप जलाएं।' : currentLanguage === 'bn' ? 'রং ভরুন, গাঁদা ফুলের বর্ডার দিন এবং মধ্য প্রদীপ জ্বালান।' : 'Fill vibrant colors, decorate with marigold border, and light the center diya.')
          : (currentLanguage === 'hi' ? 'मंदिर की घंटी बजाएं, धूप जलाएं और पंचमुखी दीप प्रज्वलित कर महाआरती करें।' : currentLanguage === 'bn' ? 'ঘণ্টা বাজান, ধূপ জ্বালান এবং পঞ্চমুখী প্রদীপে মহাদীপোৎসব আরতি করুন।' : 'Ring the temple bell, light sacred incense, and perform the five-wick grand aarti.')}
      </div>
    </div>
  );
};
