/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, HelpCircle, RotateCcw, Trophy, Eye } from 'lucide-react';
import { Language } from '../../utils/translations';
import { TREASURE_ITEMS, TreasureItem, awardMelaReward } from '../../data/melaData';
import { audioManager } from '../../utils/audio';

interface DiwaliTreasureHuntProps {
  language: Language;
  onRewardUpdate: () => void;
  onNextGame?: () => void;
}

export const DiwaliTreasureHunt: React.FC<DiwaliTreasureHuntProps> = ({
  language,
  onRewardUpdate,
  onNextGame,
}) => {
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [selectedClueId, setSelectedClueId] = useState<string>('diya');
  const [highlightHintId, setHighlightHintId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);

  const handleItemClick = (item: TreasureItem) => {
    if (foundIds.includes(item.id)) return;

    audioManager.playBellChime();
    const newFound = [...foundIds, item.id];
    setFoundIds(newFound);

    confetti({
      particleCount: 24,
      spread: 50,
      origin: {
        x: item.x / 800,
        y: (item.y + 60) / 600,
      },
      colors: ['#D6AD60', '#F59E0B', '#EF4444', '#10B981'],
    });

    if (newFound.length === TREASURE_ITEMS.length) {
      setCompleted(true);
      awardMelaReward('treasure_hunt', 25, 'diya_master');
      onRewardUpdate();
      setTimeout(() => {
        audioManager.playPoojaBell();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D6AD60', '#F59E0B', '#10B981'],
        });
      }, 300);
    } else {
      // Advance to next unfound clue
      const nextUnfound = TREASURE_ITEMS.find((i) => !newFound.includes(i.id));
      if (nextUnfound) {
        setSelectedClueId(nextUnfound.id);
      }
    }
  };

  const handleShowHint = () => {
    const unfound = TREASURE_ITEMS.find((i) => !foundIds.includes(i.id));
    if (unfound) {
      audioManager.playButtonChime();
      setSelectedClueId(unfound.id);
      setHighlightHintId(unfound.id);
      setTimeout(() => setHighlightHintId(null), 3000);
    }
  };

  const handleReset = () => {
    setFoundIds([]);
    setCompleted(false);
    setSelectedClueId('diya');
    setHighlightHintId(null);
  };

  const currentClueItem =
    TREASURE_ITEMS.find((i) => i.id === selectedClueId) ||
    TREASURE_ITEMS.find((i) => !foundIds.includes(i.id)) ||
    TREASURE_ITEMS[0];

  return (
    <div className="flex flex-col gap-5 max-w-5xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-amber-500/20 rounded-2xl p-4 backdrop-blur-md">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-amber-300 font-bold flex items-center gap-2">
            <span>🔍</span>
            {language === 'hi'
              ? 'दिवाली खजाने की खोज'
              : language === 'bn'
              ? 'দীপাবলি লুকানো ধন সন্ধান'
              : 'Diwali Haveli Treasure Hunt'}
          </h3>
          <p className="text-xs sm:text-sm text-amber-100/70">
            {language === 'hi'
              ? 'हवेली के आंगन में छिपे 6 मंगलकारी उत्सव वस्तुओं को ढूंढें और सितारे जीतें!'
              : language === 'bn'
              ? 'উঠোনে লুকানো ৬টি শুভ উৎসবের সামগ্রী খুঁজে বের করুন!'
              : 'Find 6 auspicious festive objects hidden around the illuminated courtyard!'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-950/60 border border-amber-500/40 px-3.5 py-1.5 rounded-full flex items-center gap-2">
            <span className="text-sm font-semibold text-amber-200">
              {language === 'hi' ? 'मिले' : language === 'bn' ? 'পাওয়া গেছে' : 'Found'}:
            </span>
            <span className="text-amber-400 font-bold text-base">
              {foundIds.length} / {TREASURE_ITEMS.length}
            </span>
          </div>

          <button
            onClick={handleShowHint}
            disabled={foundIds.length === TREASURE_ITEMS.length}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 rounded-xl text-xs sm:text-sm transition-all disabled:opacity-40"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            {language === 'hi' ? 'संकेत' : language === 'bn' ? 'ইঙ্গিত' : 'Clue Hint'}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 hover:bg-white/10 rounded-lg text-amber-300/80 hover:text-amber-200 transition-colors"
            title="Reset Hunt"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Illustrated Courtyard Scene (SVG) */}
      <div className="relative w-full aspect-[16/10] max-h-[520px] bg-gradient-to-b from-[#0a0f24] via-[#121a36] to-[#1a1c29] rounded-2xl border-2 border-amber-500/30 overflow-hidden shadow-2xl select-none">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Sky gradient */}
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#080c1d" />
              <stop offset="50%" stopColor="#101735" />
              <stop offset="100%" stopColor="#251a3a" />
            </linearGradient>

            {/* Wall gradient */}
            <linearGradient id="haveliWall" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3d251e" />
              <stop offset="50%" stopColor="#4f2f24" />
              <stop offset="100%" stopColor="#3d251e" />
            </linearGradient>

            {/* Arch gradient */}
            <linearGradient id="archGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D6AD60" />
              <stop offset="50%" stopColor="#8A5A20" />
              <stop offset="100%" stopColor="#3A220A" />
            </linearGradient>

            {/* Floor gradient */}
            <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2b1810" />
              <stop offset="50%" stopColor="#3b2014" />
              <stop offset="100%" stopColor="#21110a" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Sparkle filter */}
            <radialGradient id="diyaLight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF2A3" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#EF4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Sky */}
          <rect x="0" y="0" width="800" height="500" fill="url(#skyGrad)" />

          {/* Distant stars */}
          {Array.from({ length: 45 }).map((_, i) => (
            <circle
              key={`star-${i}`}
              cx={(i * 67 + 23) % 800}
              cy={(i * 37 + 11) % 140}
              r={(i % 3) * 0.6 + 0.6}
              fill="#FDE68A"
              opacity={(i % 5) * 0.15 + 0.3}
            />
          ))}

          {/* Moon */}
          <circle cx="700" cy="65" r="28" fill="#FEF08A" opacity="0.85" filter="url(#glowGold)" />
          <circle cx="710" cy="60" r="24" fill="#0c1126" />

          {/* Courtyard Haveli Architecture */}
          {/* Back Wall */}
          <rect x="80" y="90" width="640" height="260" fill="url(#haveliWall)" />

          {/* Roof Cornice */}
          <path
            d="M 60 90 L 80 75 L 720 75 L 740 90 Z"
            fill="#6E3B20"
            stroke="#D6AD60"
            strokeWidth="2"
          />
          {/* Decorative roof brackets */}
          {Array.from({ length: 16 }).map((_, i) => (
            <rect
              key={`bracket-${i}`}
              x={90 + i * 40}
              y="77"
              width="14"
              height="11"
              fill="#8A4A28"
            />
          ))}

          {/* Main Central Arch (Teak doorway) */}
          <path
            d="M 310 350 L 310 190 Q 400 130 490 190 L 490 350 Z"
            fill="#180e0a"
            stroke="url(#archGold)"
            strokeWidth="5"
          />
          {/* Door inner glow */}
          <path
            d="M 320 350 L 320 198 Q 400 145 480 198 L 480 350 Z"
            fill="#2c170d"
            opacity="0.85"
          />
          {/* Doorway brass studs */}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={`stud-l-${i}`}
              cx="335"
              cy={215 + i * 16}
              r="2.5"
              fill="#F59E0B"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={`stud-r-${i}`}
              cx="465"
              cy={215 + i * 16}
              r="2.5"
              fill="#F59E0B"
            />
          ))}

          {/* Left Arch & Window (Jharokha) */}
          <path
            d="M 120 310 L 120 200 Q 185 160 250 200 L 250 310 Z"
            fill="#20110c"
            stroke="url(#archGold)"
            strokeWidth="3.5"
          />
          {/* Left window grill */}
          <line x1="145" y1="200" x2="145" y2="300" stroke="#8A5A20" strokeWidth="2" />
          <line x1="185" y1="185" x2="185" y2="300" stroke="#8A5A20" strokeWidth="2" />
          <line x1="225" y1="200" x2="225" y2="300" stroke="#8A5A20" strokeWidth="2" />

          {/* Right Arch & Balcony */}
          <path
            d="M 550 310 L 550 200 Q 615 160 680 200 L 680 310 Z"
            fill="#20110c"
            stroke="url(#archGold)"
            strokeWidth="3.5"
          />
          <line x1="575" y1="200" x2="575" y2="300" stroke="#8A5A20" strokeWidth="2" />
          <line x1="615" y1="185" x2="615" y2="300" stroke="#8A5A20" strokeWidth="2" />
          <line x1="655" y1="200" x2="655" y2="300" stroke="#8A5A20" strokeWidth="2" />

          {/* Marigold Toran Garland across top arch */}
          <path
            d="M 100 120 Q 250 155 400 120 Q 550 155 700 120"
            fill="none"
            stroke="#15803D"
            strokeWidth="3"
          />
          {Array.from({ length: 22 }).map((_, i) => {
            const t = i / 21;
            const x = 110 + t * 580;
            const y = 120 + Math.sin(t * Math.PI * 2) * 14;
            const isOrange = i % 2 === 0;
            return (
              <circle
                key={`flower-${i}`}
                cx={x}
                cy={y + 6}
                r="6"
                fill={isOrange ? '#F97316' : '#FBBF24'}
              />
            );
          })}

          {/* Hanging Brass Kootu Lanterns */}
          <line x1="185" y1="120" x2="185" y2="165" stroke="#D6AD60" strokeWidth="1.5" />
          <polygon points="185,165 178,178 192,178" fill="#F59E0B" />
          <circle cx="185" cy="184" r="6" fill="#FDE68A" filter="url(#glowGold)" />

          <line x1="615" y1="120" x2="615" y2="165" stroke="#D6AD60" strokeWidth="1.5" />
          <polygon points="615,165 608,178 622,178" fill="#F59E0B" />
          <circle cx="615" cy="184" r="6" fill="#FDE68A" filter="url(#glowGold)" />

          {/* Courtyard Steps & Plinth Floor */}
          <polygon points="50,335 750,335 780,365 20,365" fill="#462518" stroke="#8A4A28" />
          <polygon points="20,365 780,365 800,410 0,410" fill="#361c12" stroke="#5a2e19" />
          <rect x="0" y="410" width="800" height="90" fill="url(#floorGrad)" />

          {/* Floor Tiling Pattern */}
          <line x1="0" y1="455" x2="800" y2="455" stroke="#5a2e19" strokeWidth="1.5" strokeDasharray="6,6" />
          <line x1="160" y1="410" x2="100" y2="500" stroke="#5a2e19" strokeWidth="1.5" />
          <line x1="320" y1="410" x2="280" y2="500" stroke="#5a2e19" strokeWidth="1.5" />
          <line x1="480" y1="410" x2="520" y2="500" stroke="#5a2e19" strokeWidth="1.5" />
          <line x1="640" y1="410" x2="700" y2="500" stroke="#5a2e19" strokeWidth="1.5" />

          {/* Central Courtyard Rangoli Artwork */}
          <g transform="translate(400, 445)">
            <circle cx="0" cy="0" r="38" fill="#7F1D1D" stroke="#D6AD60" strokeWidth="2" />
            <circle cx="0" cy="0" r="28" fill="#B45309" stroke="#FEF08A" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="0" cy="0" r="14" fill="#15803D" />
            <circle cx="0" cy="0" r="5" fill="#FEF08A" />
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const px = Math.cos(angle) * 22;
              const py = Math.sin(angle) * 22;
              return <circle key={`petal-${i}`} cx={px} cy={py} r="4.5" fill="#FBBF24" />;
            })}
          </g>

          {/* Ambient Diya glow circles around stairs */}
          <ellipse cx="260" cy="385" rx="35" ry="15" fill="url(#diyaLight)" />
          <ellipse cx="540" cy="385" rx="35" ry="15" fill="url(#diyaLight)" />

          {/* Kalash on plinth left */}
          <g transform="translate(160, 310)">
            <ellipse cx="0" cy="0" rx="16" ry="12" fill="#D97706" />
            <polygon points="-12,-6 12,-6 0,-20" fill="#15803D" />
            <circle cx="0" cy="-22" r="7" fill="#78350F" />
          </g>

          {/* Verandah table right */}
          <g transform="translate(620, 335)">
            <ellipse cx="0" cy="0" rx="35" ry="14" fill="#522e1b" stroke="#8A5A20" />
            <rect x="-24" y="0" width="6" height="28" fill="#3a1f11" />
            <rect x="18" y="0" width="6" height="28" fill="#3a1f11" />
            {/* Brass Thali */}
            <ellipse cx="0" cy="-4" rx="22" ry="8" fill="#D6AD60" stroke="#FDE68A" strokeWidth="1" />
          </g>

          {/* ======================================================== */}
          {/* INTERACTIVE TREASURE HOTSPOTS (Plain objects blending naturally into the scene) */}
          {/* ======================================================== */}
          {TREASURE_ITEMS.map((item) => {
            const isFound = foundIds.includes(item.id);
            const isSelected = selectedClueId === item.id;
            const isHint = highlightHintId === item.id;

            return (
              <g
                key={item.id}
                transform={`translate(${item.x}, ${item.y})`}
                className="cursor-default"
                onClick={() => handleItemClick(item)}
              >
                {/* Hotspot hit area with generous touch target for smooth discovery */}
                <circle
                  cx="0"
                  cy="0"
                  r={Math.max(item.size, 34)}
                  fill="transparent"
                  pointerEvents="all"
                />

                {/* Hint pulse circle ONLY when hint button is explicitly clicked */}
                {isHint && (
                  <circle
                    cx="0"
                    cy="0"
                    r={item.size + 15}
                    fill="none"
                    stroke="#FBBF24"
                    strokeWidth="3"
                    className="animate-ping"
                    opacity="0.8"
                  />
                )}

                {/* Found golden aura & celebration ring */}
                {isFound && (
                  <g>
                    <circle
                      cx="0"
                      cy="0"
                      r={item.size + 6}
                      fill="url(#diyaLight)"
                      className="animate-pulse"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r={item.size}
                      fill="none"
                      stroke="#FDE68A"
                      strokeWidth="2.5"
                    />
                  </g>
                )}

                {/* 1. Diya: Plain earthen clay diya when unfound; radiant burning flame when found */}
                {item.id === 'diya' && (
                  <g transform={isFound ? 'scale(1.1)' : 'scale(1.0)'}>
                    {/* Terracotta earthen body */}
                    <path
                      d="M -15,4 Q 0,14 15,4 Q 8,-3 0,-2 Q -8,-3 -15,4 Z"
                      fill={isFound ? '#92400E' : '#6B3A0F'}
                      stroke={isFound ? '#D97706' : '#451A03'}
                      strokeWidth={isFound ? 1.5 : 1.2}
                    />
                    <ellipse
                      cx="0"
                      cy="2"
                      rx="10"
                      ry="3.5"
                      fill={isFound ? '#B45309' : '#3D1A04'}
                    />
                    {isFound ? (
                      /* Radiant celebratory flame */
                      <g>
                        <path
                          d="M 10,2 Q 17,-5 13,-14 Q 7,-8 10,2 Z"
                          fill="#FDE68A"
                          filter="url(#glowGold)"
                        />
                        <circle cx="12" cy="-6" r="3" fill="#EF4444" />
                      </g>
                    ) : (
                      /* Plain unlit cotton wick tucked into clay lamp */
                      <line
                        x1="8"
                        y1="2"
                        x2="12"
                        y2="-1"
                        stroke="#A8A29E"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    )}
                  </g>
                )}

                {/* 2. Gift: Plain parcel nestled in doorway corner; festive crimson & gold box when found */}
                {item.id === 'gift' && (
                  <g transform="scale(0.95)">
                    <rect
                      x="-14"
                      y="-12"
                      width="28"
                      height="24"
                      rx="2.5"
                      fill={isFound ? '#B91C1C' : '#3A1713'}
                      stroke={isFound ? '#D6AD60' : '#260E0B'}
                      strokeWidth={isFound ? 1.5 : 1}
                    />
                    <rect
                      x="-3.5"
                      y="-12"
                      width="7"
                      height="24"
                      fill={isFound ? '#FBBF24' : '#6B4F1D'}
                    />
                    <rect
                      x="-14"
                      y="-2"
                      width="28"
                      height="5"
                      fill={isFound ? '#FBBF24' : '#6B4F1D'}
                    />
                    <circle
                      cx="0"
                      cy="-13"
                      r={isFound ? 4 : 3}
                      fill={isFound ? '#FDE68A' : '#856427'}
                    />
                  </g>
                )}

                {/* 3. Sweet: Plain silver-toned sweet sitting inside the thali; bright kaju katli when found */}
                {item.id === 'sweet' && (
                  <g transform={isFound ? 'scale(0.95)' : 'scale(0.85)'}>
                    <polygon
                      points="0,-11 13,0 0,11 -13,0"
                      fill={isFound ? '#F8FAFC' : '#94A3B8'}
                      stroke={isFound ? '#E2E8F0' : '#64748B'}
                      strokeWidth="1"
                    />
                    <polygon
                      points="0,-7 8,0 0,7 -8,0"
                      fill={isFound ? '#E2E8F0' : '#CBD5E1'}
                      opacity={isFound ? 0.9 : 0.6}
                    />
                    {isFound && <circle cx="0" cy="0" r="1.5" fill="#64748B" />}
                  </g>
                )}

                {/* 4. Marigold: Plain natural blossom on archway lintel; bright blooming marigold when found */}
                {item.id === 'marigold' && (
                  <g transform={isFound ? 'scale(1)' : 'scale(0.85)'}>
                    <circle
                      cx="0"
                      cy="0"
                      r={isFound ? 10 : 8.5}
                      fill={isFound ? '#EA580C' : '#9A3412'}
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r={isFound ? 7 : 6}
                      fill={isFound ? '#F59E0B' : '#C2410C'}
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r={isFound ? 4 : 3}
                      fill={isFound ? '#FEF08A' : '#D97706'}
                    />
                  </g>
                )}

                {/* 5. Coin: Plain antique bronze/brass coin on plinth; gleaming sacred gold coin when found */}
                {item.id === 'coin' && (
                  <g transform={isFound ? 'scale(0.95)' : 'scale(0.85)'}>
                    <circle
                      cx="0"
                      cy="0"
                      r={isFound ? 12 : 11}
                      fill={isFound ? '#D97706' : '#5A3A10'}
                      stroke={isFound ? '#FEF08A' : '#3D260B'}
                      strokeWidth={isFound ? 2 : 1.2}
                    />
                    <text
                      x="0"
                      y={isFound ? 4 : 3.5}
                      textAnchor="middle"
                      fill={isFound ? '#FEF08A' : '#8A5A20'}
                      fontSize={isFound ? '10' : '8.5'}
                      fontWeight="bold"
                    >
                      卐
                    </text>
                  </g>
                )}

                {/* 6. Bell: Plain antique architectural brass bell on verandah pillar; polished shining bell when found */}
                {item.id === 'bell' && (
                  <g transform={isFound ? 'scale(1)' : 'scale(0.88)'}>
                    <path
                      d="M -8.5,9.5 C -8.5,2 -7.5,-7.5 0,-7.5 C 7.5,-7.5 8.5,2 8.5,9.5 Z"
                      fill={isFound ? '#D97706' : '#603813'}
                      stroke={isFound ? '#FEF08A' : '#3F2208'}
                      strokeWidth={isFound ? 1.5 : 1}
                    />
                    <ellipse
                      cx="0"
                      cy="9.5"
                      rx={isFound ? 8.5 : 7.5}
                      ry={isFound ? 2.8 : 2.2}
                      fill={isFound ? '#B45309' : '#452408'}
                    />
                    <circle
                      cx="0"
                      cy="11.5"
                      r={isFound ? 2.5 : 2}
                      fill={isFound ? '#FEF08A' : '#784C15'}
                    />
                  </g>
                )}

                {/* Discovery status checkmark badge (ONLY displayed when item is found) */}
                {isFound && (
                  <g transform="translate(12, -12)">
                    <circle cx="0" cy="0" r="8" fill="#10B981" />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      ✓
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Completed Celebration Overlay */}
        {completed && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/50 mb-3 animate-bounce">
              <Trophy className="w-9 h-9 text-amber-950" />
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl text-amber-300 font-bold mb-1">
              {language === 'hi'
                ? 'अद्भुत! सभी खजाने मिल गए!'
                : language === 'bn'
                ? 'চমৎকার! সমস্ত সম্পদ আবিষ্কৃত!'
                : 'Auspicious Discovery Complete!'}
            </h4>
            <p className="text-amber-100/90 text-sm sm:text-base max-w-md mb-4">
              {language === 'hi'
                ? 'आपने हवेली के सभी 6 मंगलकारी उत्सव प्रतीकों को खोज निकाला। आपको मिला दीया मास्टर बैज व २५ सितारे!'
                : language === 'bn'
                ? 'আপনি উঠোনের সমস্ত ৬টি শুভ প্রতীক খুঁজে বের করেছেন। আপনি অর্জন করলেন প্রদীপ মাস্টার ব্যাজ এবং ২৫টি তারা!'
                : 'You discovered all 6 festive treasures! Unlocked the "Diya Master" badge and earned +25 Diwali Stars!'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-amber-500/40 text-amber-200 hover:bg-amber-500/20 text-sm font-medium transition-colors"
              >
                {language === 'hi' ? 'पुनः खेलें' : language === 'bn' ? 'আবার খেলুন' : 'Play Again'}
              </button>

              {onNextGame && (
                <button
                  onClick={onNextGame}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
                >
                  {language === 'hi'
                    ? 'अगला खेल: याददाश्त चुनौती ➔'
                    : language === 'bn'
                    ? 'পরের খেলা: স্মৃতি পরীক্ষা ➔'
                    : 'Next Game: Festive Memory ➔'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Clues & Discovery Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {TREASURE_ITEMS.map((item) => {
          const isFound = foundIds.includes(item.id);
          const isSelected = selectedClueId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedClueId(item.id);
                audioManager.playButtonChime();
              }}
              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                isFound
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                  : isSelected
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400/40'
                  : 'bg-white/5 border-amber-500/20 hover:border-amber-500/40 text-amber-200/80 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl">{item.emoji}</span>
                {isFound ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] text-amber-400/80 font-mono">
                    #{TREASURE_ITEMS.indexOf(item) + 1}
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-bold leading-tight line-clamp-1">
                  {item.name[language]}
                </p>
                <p className="text-[10px] text-amber-200/60 mt-0.5">
                  {isFound
                    ? language === 'hi'
                      ? 'मिल गया ✓'
                      : language === 'bn'
                      ? 'পাওয়া গেছে ✓'
                      : 'Found ✓'
                    : language === 'hi'
                    ? 'छिपा हुआ'
                    : language === 'bn'
                    ? 'লুকানো'
                    : 'Hidden'}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Clue Display Banner */}
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3 backdrop-blur-sm">
        <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-xl">
          {currentClueItem.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {language === 'hi' ? 'संकेत' : language === 'bn' ? 'ইঙ্গিত' : 'Clue'}:{' '}
              {currentClueItem.name[language]}
            </span>
            {foundIds.includes(currentClueItem.id) && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {language === 'hi' ? 'खोज लिया' : language === 'bn' ? 'পাওয়া গেছে' : 'Discovered'}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-amber-100/90 italic mt-0.5">
            "{currentClueItem.clue[language]}"
          </p>
          <p className="text-[11px] text-amber-300/70 mt-1">
            <span className="font-medium">
              {language === 'hi' ? 'स्थान' : language === 'bn' ? 'অবস্থান' : 'Location hint'}:
            </span>{' '}
            {currentClueItem.locationDesc[language]}
          </p>
        </div>
      </div>
    </div>
  );
};
