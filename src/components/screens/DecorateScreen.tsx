/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Check, ChevronRight, ChevronDown, ChevronUp, Zap, RefreshCw } from 'lucide-react';
import { DecorationState } from '../../types';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import { ToranSvg } from '../decoration/ToranSvg';
import { RangoliSvg } from '../decoration/RangoliSvg';
import { MittiDiyaSvg } from '../decoration/MittiDiyaSvg';
import { StepAndRoofLightsSvg } from '../decoration/StepAndRoofLightsSvg';
import { getRegionByName } from '../../data/regionalData';
import { ExperienceTraditionsSection } from '../traditions/ExperienceTraditionsSection';
import { RegionalActivity } from '../../types';

interface DecorateScreenProps {
  userName: string;
  userState?: string;
  onOpenExplorer?: () => void;
  onOpenActivity?: (activity: RegionalActivity) => void;
  onOpenEcoMela?: () => void;
  decoration: DecorationState;
  onUpdateDecoration: (update: Partial<DecorationState>) => void;
  onContinue: () => void;
  onSkip?: () => void;
  currentLanguage: Language;
}

// Fixed percentages converted to 1000x1000 viewBox (x*10, y*10)
const FIXED_DECOR = {
  // FAIRY LIGHTS: string through points (x%, y% as x*10, y*10)
  fairyLights: [
    { x: 22, y: 72 },
    { x: 116, y: 65 },
    { x: 211, y: 63 },
    { x: 305, y: 65 },
    { x: 407, y: 117 },
    { x: 516, y: 221 },
    { x: 625, y: 326 },
    { x: 734, y: 423 },
    { x: 829, y: 482 },
  ],
  // MARIGOLD TORAN:
  // left string from (17.1, 9.6) to (17.1, 67) -> (171, 96) to (171, 670)
  // right string from (37.5, 18.6) to (36.7, 67) -> (375, 186) to (367, 670)
  // lintel garland connects (17.1, 9.6) to (37.5, 18.6) -> (171, 96) to (375, 186)
  toran: {
    lintelLeft: { x: 171, y: 96 },
    lintelRight: { x: 375, y: 186 },
    leftString: { x1: 171, y1: 96, x2: 171, y2: 670 },
    rightString: { x1: 375, y1: 186, x2: 367, y2: 670 },
  },
  // ALPONA: centered at (75.2, 78.8) with radius 8.7% of image width
  alpona: {
    center: { cx: 752, cy: 788 },
    radius: 87,
  },
  // CHODDO PRODIP: 3 rows of diyas, evenly spaced along lines + 5 single diyas = 14 diyas
  choddoProdip: {
    diyas: [
      // Row 1: (10.9, 77.8) to (45.4, 78.8)
      { id: 1, x: 109, y: 778, label: 'Row 1 Left' },
      { id: 2, x: 282, y: 783, label: 'Row 1 Mid' },
      { id: 3, x: 454, y: 788, label: 'Row 1 Right' },

      // Row 2: (11.6, 83.2) to (49.6, 84.1)
      { id: 4, x: 116, y: 832, label: 'Row 2 Left' },
      { id: 5, x: 306, y: 837, label: 'Row 2 Mid' },
      { id: 6, x: 496, y: 841, label: 'Row 2 Right' },

      // Row 3: (13.1, 88.4) to (55.2, 89.5)
      { id: 7, x: 131, y: 884, label: 'Row 3 Left' },
      { id: 8, x: 342, y: 890, label: 'Row 3 Mid' },
      { id: 9, x: 552, y: 895, label: 'Row 3 Right' },

      // Single diyas:
      { id: 10, x: 276, y: 713, label: 'Doorstep Diya' },
      { id: 11, x: 568, y: 757, label: 'Courtyard Diya 1' },
      { id: 12, x: 651, y: 710, label: 'Courtyard Diya 2' },
      { id: 13, x: 725, y: 673, label: 'Alpona Approach' },
      { id: 14, x: 847, y: 705, label: 'Alpona Border' },
    ],
    stepLines: [
      { x1: 109, y1: 778, x2: 454, y2: 788 },
      { x1: 116, y1: 832, x2: 496, y2: 841 },
      { x1: 131, y1: 884, x2: 552, y2: 895 },
    ],
  },
};

export const DecorateScreen: React.FC<DecorateScreenProps> = ({
  userName,
  userState,
  onOpenExplorer,
  onOpenActivity,
  onOpenEcoMela,
  decoration,
  onUpdateDecoration,
  onContinue,
  currentLanguage,
}) => {
  const region = getRegionByName(userState || '');
  const t = TRANSLATIONS[currentLanguage].decorate;
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [isDecorBoxOpen, setIsDecorBoxOpen] = useState<boolean>(true);

  const decorBoxTranslations = {
    en: {
      title: 'Decor Box',
      subtitle: 'click and decorate',
      pick: 'click and use',
      placed: 'Placed',
      lit: 'Lit',
    },
    hi: {
      title: 'सजावट पिटारा',
      subtitle: 'क्लिक करें और सजाएं',
      pick: 'क्लिक करें और उपयोग करें',
      placed: 'सज गया',
      lit: 'प्रज्वलित',
    },
    bn: {
      title: 'সাজসজ্জা বাক্স',
      subtitle: 'ক্লিক করুন ও ঘর সাজান',
      pick: 'ক্লিক করে সাজান',
      placed: 'সাজানো',
      lit: 'জ্বলছে',
    },
  };
  const boxT = decorBoxTranslations[currentLanguage] || decorBoxTranslations.en;

  // Individual active diya slot flags (14 slots for Choddo Prodip)
  const [litSlots, setLitSlots] = useState<boolean[]>(() => {
    const slots = new Array(14).fill(false);
    for (let i = 0; i < Math.min(decoration.diyasCount, 14); i++) {
      slots[i] = true;
    }
    return slots;
  });

  // Sync litSlots with decoration.diyasCount
  useEffect(() => {
    const count = litSlots.filter(Boolean).length;
    if (count !== decoration.diyasCount) {
      onUpdateDecoration({ diyasCount: count });
    }
  }, [litSlots]);

  const activeDiyasCount = litSlots.filter(Boolean).length;

  const completedCount =
    (decoration.fairyLights ? 1 : 0) +
    (decoration.marigoldToran ? 1 : 0) +
    (decoration.rangoli ? 1 : 0) +
    (activeDiyasCount >= 7 ? 1 : activeDiyasCount > 0 ? 0.5 : 0);

  const isAllComplete =
    decoration.fairyLights &&
    decoration.marigoldToran &&
    decoration.rangoli &&
    activeDiyasCount >= 7;

  // Trigger celebration burst when all items are illuminated
  const prevCompleteRef = useRef<boolean>(false);
  useEffect(() => {
    if (isAllComplete && !prevCompleteRef.current) {
      audioManager.playSparkleSound();
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#D6AD60', '#F4D995', '#FFE082', '#FFB347', '#E91E63'],
      });
    }
    prevCompleteRef.current = isAllComplete;
  }, [isAllComplete]);

  const toggleFairyLights = () => {
    audioManager.playSparkleSound();
    const next = !decoration.fairyLights;
    onUpdateDecoration({ fairyLights: next });
  };

  const toggleToran = () => {
    audioManager.playSparkleSound();
    const next = !decoration.marigoldToran;
    onUpdateDecoration({ marigoldToran: next });
  };

  const toggleRangoli = () => {
    audioManager.playSparkleSound();
    const next = !decoration.rangoli;
    onUpdateDecoration({ rangoli: next });
  };

  const toggleDiyaSlot = (index: number) => {
    audioManager.playDiyaLightSound();
    setLitSlots((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const addDiyaBatch = () => {
    audioManager.playDiyaLightSound();
    const currentLit = litSlots.filter(Boolean).length;
    if (currentLit >= 14) {
      // clear
      setLitSlots(new Array(14).fill(false));
    } else {
      // fill next 2 slots
      setLitSlots((prev) => {
        const next = [...prev];
        let added = 0;
        for (let i = 0; i < 14 && added < 2; i++) {
          if (!next[i]) {
            next[i] = true;
            added++;
          }
        }
        return next;
      });
    }
  };

  const decorateAll = () => {
    audioManager.playSparkleSound();
    audioManager.playDiyaLightSound();
    onUpdateDecoration({
      fairyLights: true,
      marigoldToran: true,
      rangoli: true,
      diyasCount: 14,
    });
    setLitSlots(new Array(14).fill(true));
  };

  const resetAll = () => {
    audioManager.playClickSound();
    onUpdateDecoration({
      fairyLights: false,
      marigoldToran: false,
      rangoli: false,
      diyasCount: 0,
    });
    setLitSlots(new Array(14).fill(false));
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-start px-3 sm:px-6 py-4 sm:py-7 max-w-5xl mx-auto">
      {/* Header section */}
      <div className="text-center w-full max-w-2xl mb-3 sm:mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/15 border border-[#D6AD60]/30 text-[#F4D995] text-xs font-semibold uppercase tracking-wider mb-2">
          <span>{t.stageBadge}</span>
        </div>
        <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFF5DE] text-balance">
          {t.heading} <span className="gold-gradient-text">{userName}</span>!
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#F4D995]/85 mt-1 font-light">
          {isAllComplete
            ? (currentLanguage === 'hi'
                ? '✨ अद्भुत! हर कोना जगमगा उठा है, पूरा घर सुनहरी दिवाली रोशनी से खिल उठा है।'
                : currentLanguage === 'bn'
                ? '✨ অপূর্ব! প্রতিটি কোণ উজ্জ্বল হয়ে উঠেছে, সমগ্র গৃহ দীপাবলির আলোয় উদ্ভাসিত।'
                : '✨ Magnificent! Every corner is glowing brightly with warm festive Diwali light!')
            : completedCount > 0
            ? (currentLanguage === 'hi'
                ? 'दीपों और सजावट से अंधेरा मिट रहा है... हर कोना रोशन करें।'
                : currentLanguage === 'bn'
                ? 'প্রদীপ ও তোরণের আলোয় আঁধার কেটে যাচ্ছে... প্রতিটি কোণ আলোকিত করুন।'
                : 'The darkness recedes! Each decoration brings warm light to its corner of the home.')
            : (currentLanguage === 'hi'
                ? '🌙 अंधेरी रात में छत की लड़ियां, तोरण, अल्पना व दीये जलाकर घर को रोशन करें।'
                : currentLanguage === 'bn'
                ? '🌙 আঁধার রাতে তোরণ, আলপনা ও প্রদীপ জ্বালিয়ে গৃহ আলোকিত করে তুলুন।'
                : '🌙 The night is still and dark. Light the lamps and decorations to illuminate the home!')}
        </p>
      </div>

      {/* Regional Celebration Banner (if state selected) */}
      {region && (
        <div className="w-full flex items-center justify-between gap-2 px-3.5 py-2 mb-3 rounded-2xl bg-gradient-to-r from-[#192747]/90 via-[#10172D] to-[#192747]/90 border border-[#D6AD60]/40 text-xs shadow-md">
          <div className="flex items-center gap-2 text-[#F4D995] truncate">
            <span className="text-base">🪔</span>
            <div className="truncate text-left">
              <span className="font-royal font-bold text-xs sm:text-sm text-[#FFF5DE] truncate block">
                {currentLanguage === 'hi'
                  ? `${region.hi} दीपोत्सव परंपरा`
                  : currentLanguage === 'bn'
                  ? `${region.bn} দীপাবলি ঐতিহ্য`
                  : `${region.name} Celebration`}
                : <span className="text-[#F4D995] font-normal">{region.festivalName[currentLanguage]}</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#FFF5DE]/70 truncate block">
                ✨ {region.decorTradition.artName[currentLanguage]} & {region.decorTradition.diyaName[currentLanguage]}
              </span>
            </div>
          </div>

          {onOpenExplorer && (
            <button
              type="button"
              onClick={onOpenExplorer}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[#10172D] bg-gradient-to-r from-[#F4D995] to-[#D6AD60] hover:brightness-110 transition-all whitespace-nowrap cursor-pointer shrink-0 shadow flex items-center gap-1"
            >
              <span>🇮🇳</span>
              <span className="hidden sm:inline">Explore Traditions</span>
            </button>
          )}
        </div>
      )}

      {/* 1. ONE wrapper: position relative, width 100%, aspect-ratio 1376 / 768 */}
      <div
        className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl shadow-black/80 gold-box-shadow select-none bg-[#040714]"
        style={{ aspectRatio: '1376 / 768' }}
      >
        {/* Background image: fills it exactly */}
        <img
          src="/images/diwali_home_exterior.webp"
          alt="Diwali Home Exterior"
          className="w-full h-full object-fill block select-none pointer-events-none"
        />

        {/* ONE absolute SVG over it: inset 0, viewBox="0 0 1000 1000", preserveAspectRatio="none" */}
        <svg
          ref={svgRef}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full block"
        >
          <defs>
            {/* Feathering Gaussian blur filters for realistic candlelight & light beam falloff */}
            <filter id="nightLightBlurWide" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="40" />
            </filter>
            <filter id="nightLightBlurMedium" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="25" />
            </filter>

            {/* Radial ambient glow gradients for each illuminated zone */}
            <radialGradient id="roofAmbientGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#FFB347" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FF9100" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="doorAmbientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD54F" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#FF9800" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF9800" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="floorAmbientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFCA28" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#FF9100" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#FF9100" stopOpacity="0" />
            </radialGradient>

            {/* Dynamic Darkness Mask: White = deep night darkness; Black = illuminated opening */}
            <mask id="darknessScrimMask">
              {/* Initially: Pure White covers the entire house in deep midnight darkness */}
              <rect x="0" y="0" width="1000" height="1000" fill="white" />

              {/* When all tasks are completed, the whole mask turns black to lift all darkness */}
              {isAllComplete ? (
                <rect x="0" y="0" width="1000" height="1000" fill="black" />
              ) : (
                <>
                  {/* 1. Fairy string lights reveal the roof cornice & eaves brightly */}
                  {decoration.fairyLights && (
                    <g filter="url(#nightLightBlurWide)">
                      <path
                        d={`M ${FIXED_DECOR.fairyLights.map((p) => `${p.x} ${p.y}`).join(' L ')}`}
                        fill="none"
                        stroke="black"
                        strokeWidth="200"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <ellipse cx="440" cy="250" rx="420" ry="240" fill="black" />
                    </g>
                  )}

                  {/* 2. Marigold Toran reveals the entrance doorway brightly */}
                  {decoration.marigoldToran && (
                    <g filter="url(#nightLightBlurWide)">
                      <ellipse
                        cx={273}
                        cy={383}
                        rx="180"
                        ry="240"
                        fill="black"
                      />
                    </g>
                  )}

                  {/* 3. Sacred Rangoli / Alpona reveals the courtyard stone floor brightly */}
                  {decoration.rangoli && (
                    <g filter="url(#nightLightBlurWide)">
                      <ellipse
                        cx={FIXED_DECOR.alpona.center.cx}
                        cy={FIXED_DECOR.alpona.center.cy}
                        rx="220"
                        ry="140"
                        fill="black"
                      />
                    </g>
                  )}

                  {/* 4. Mitti Diyas reveal the steps & courtyard brightly */}
                  {activeDiyasCount > 0 && (
                    <g filter="url(#nightLightBlurMedium)">
                      {FIXED_DECOR.choddoProdip.diyas.map((slot, idx) =>
                        litSlots[idx] ? (
                          <circle
                            key={`mask-diya-hole-${idx}`}
                            cx={slot.x}
                            cy={slot.y}
                            r="95"
                            fill="black"
                          />
                        ) : null
                      )}
                    </g>
                  )}
                </>
              )}
            </mask>
          </defs>

          {/* Deep Night Darkness Scrim: starts fully dark (96% opacity) and reveals bright areas via mask */}
          <rect
            x="0"
            y="0"
            width="1000"
            height="1000"
            fill="#040714"
            mask="url(#darknessScrimMask)"
            opacity={isAllComplete ? 0 : 0.96}
            className="transition-opacity duration-1000 ease-out pointer-events-none"
          />

          {/* Warm Ambient Golden Light Overlays for lit zones */}
          {decoration.fairyLights && !isAllComplete && (
            <ellipse
              cx="440"
              cy="250"
              rx="420"
              ry="200"
              fill="url(#roofAmbientGlow)"
              className="pointer-events-none transition-opacity duration-700"
            />
          )}

          {decoration.marigoldToran && !isAllComplete && (
            <ellipse
              cx={273}
              cy={383}
              rx="170"
              ry="220"
              fill="url(#doorAmbientGlow)"
              className="pointer-events-none transition-opacity duration-700"
            />
          )}

          {decoration.rangoli && !isAllComplete && (
            <ellipse
              cx={FIXED_DECOR.alpona.center.cx}
              cy={FIXED_DECOR.alpona.center.cy}
              rx="200"
              ry="120"
              fill="url(#floorAmbientGlow)"
              className="pointer-events-none transition-opacity duration-700"
            />
          )}

          {/* Interactive House Hotspots for Direct Canvas Decoration */}
          {!decoration.fairyLights && (
            <g
              role="button"
              tabIndex={0}
              aria-label="Roof cornice (press Enter or Space to hang fairy string lights)"
              aria-pressed={false}
              onClick={toggleFairyLights}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFairyLights();
                }
              }}
              className="cursor-pointer group outline-none"
            >
              <ellipse
                cx="480"
                cy="260"
                rx="360"
                ry="45"
                fill="transparent"
                className="group-hover:fill-amber-400/10 group-focus-visible:stroke-[#FFD54F] group-focus-visible:stroke-2"
              />
            </g>
          )}

          {!decoration.marigoldToran && (
            <g
              role="button"
              tabIndex={0}
              aria-label="Entrance doorway arch (press Enter or Space to hang marigold toran)"
              aria-pressed={false}
              onClick={toggleToran}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleToran();
                }
              }}
              className="cursor-pointer group outline-none"
            >
              <rect
                x="171"
                y="96"
                width="204"
                height="300"
                fill="transparent"
                className="group-hover:fill-amber-400/10 group-focus-visible:stroke-[#FFD54F] group-focus-visible:stroke-2"
              />
            </g>
          )}

          {!decoration.rangoli && (
            <g
              role="button"
              tabIndex={0}
              aria-label="Courtyard stone floor (press Enter or Space to draw festive Rangoli art)"
              aria-pressed={false}
              onClick={toggleRangoli}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleRangoli();
                }
              }}
              className="cursor-pointer group outline-none"
            >
              <ellipse
                cx={FIXED_DECOR.alpona.center.cx}
                cy={FIXED_DECOR.alpona.center.cy}
                rx={FIXED_DECOR.alpona.radius}
                ry={FIXED_DECOR.alpona.radius * 0.45}
                fill="transparent"
                className="group-hover:fill-amber-400/10 group-focus-visible:stroke-[#FFD54F] group-focus-visible:stroke-2"
              />
            </g>
          )}

          {/* 1: Upper Roof Fairy String Lights */}
          <StepAndRoofLightsSvg
            roofLightPath={FIXED_DECOR.fairyLights}
            isRoofLit={decoration.fairyLights}
          />

          {/* 2: Traditional Toran along Door Lintel & Side Posts */}
          {decoration.marigoldToran && (
            <ToranSvg
              lintelLeft={FIXED_DECOR.toran.lintelLeft}
              lintelRight={FIXED_DECOR.toran.lintelRight}
              leftString={FIXED_DECOR.toran.leftString}
              rightString={FIXED_DECOR.toran.rightString}
            />
          )}

          {/* 3: Traditional Rangoli / Alpona squashed flat on Courtyard Stone */}
          {decoration.rangoli && (
            <RangoliSvg
              rangoliCenter={FIXED_DECOR.alpona.center}
              rangoliRadius={FIXED_DECOR.alpona.radius}
            />
          )}

          {/* 4: Step guide lines for the 3 rows */}
          <g className="step-lines-guide pointer-events-none opacity-40">
            {FIXED_DECOR.choddoProdip.stepLines.map((line, idx) => (
              <line
                key={`step-line-${idx}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#D6AD60"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity={activeDiyasCount > 0 ? 0.6 : 0.25}
              />
            ))}
          </g>

          {/* 5: Choddo Prodip (14 Mitti Ka Diyas) */}
          {FIXED_DECOR.choddoProdip.diyas.map((slot, idx) =>
            litSlots[idx] ? (
              <MittiDiyaSvg
                key={`diya-slot-${idx}`}
                x={slot.x}
                y={slot.y}
                isLit={true}
                onToggle={() => toggleDiyaSlot(idx)}
                scale={1}
                index={idx + 1}
              />
            ) : (
              <g
                key={`diya-unlit-spot-${idx}`}
                transform={`translate(${slot.x}, ${slot.y}) scale(1)`}
                className="cursor-pointer group select-none outline-none"
                onClick={() => toggleDiyaSlot(idx)}
                role="button"
                tabIndex={0}
                aria-pressed={false}
                aria-label={`${slot.label} #${idx + 1} (unlit diya, press Enter or Space to light)`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleDiyaSlot(idx);
                  }
                }}
              >
                {/* Generous touch target */}
                <circle cx="0" cy="0" r="26" fill="transparent" />
                <ellipse cx="0" cy="8" rx="15" ry="5" fill="#000000" opacity="0.4" />
                <ellipse cx="0" cy="0" rx="14" ry="5" fill="#8D431D" opacity="0.65" stroke="#4A1E0B" strokeWidth="0.8" />
                <circle cx="0" cy="-2" r="2.2" fill="#FFB347" opacity="0.5" className="animate-pulse" />
                {/* Focus ring for unlit diya */}
                <ellipse
                  cx="0"
                  cy="2"
                  rx="22"
                  ry="11"
                  fill="none"
                  stroke="#FFD54F"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  className="opacity-0 group-focus-visible:opacity-100"
                />
              </g>
            )
          )}
        </svg>
      </div>

      {/* Decor Box: Placed directly below the decoration image in normal document flow, full width & centered */}
      <div className="w-full mt-4 sm:mt-5 max-w-4xl mx-auto">
        {!isDecorBoxOpen ? (
          <div className="flex justify-center w-full">
            <button
              type="button"
              onClick={() => setIsDecorBoxOpen(true)}
              aria-expanded={false}
              aria-label="Open Decor Box"
              className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-[#090F20]/95 hover:bg-[#131D38] border-2 border-[#D6AD60]/80 text-[#FFF5DE] shadow-xl backdrop-blur-md flex items-center gap-2.5 cursor-pointer transition-all hover:scale-102 focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
              title="Open Decor Box"
            >
              <span className="text-base sm:text-lg">🎁</span>
              <div className="text-left">
                <div className="text-xs font-bold text-[#F4D995] flex items-center gap-1 font-royal">
                  <span>{boxT.title}</span>
                  <ChevronUp className="w-3.5 h-3.5 text-[#D6AD60]" />
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#FFF5DE]/75">
                  {completedCount >= 4 ? '✨ 4/4 Decorated' : `${completedCount}/4 Decorated`}
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div className="w-full bg-[#090F20]/95 backdrop-blur-xl border-2 border-[#D6AD60]/60 rounded-2xl shadow-xl p-3 sm:p-4 text-left">
            {/* Box Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#D6AD60]/20">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="text-lg sm:text-xl">🎁</span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#F4D995] font-royal flex items-center gap-1.5">
                    <span>{boxT.title}</span>
                    <span className="text-[10px] sm:text-xs px-1.5 py-0.2 rounded-full bg-[#D6AD60]/20 text-[#FFE082] font-sans font-semibold">
                      {completedCount >= 4 ? '4/4' : `${completedCount}/4`}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#FFF5DE]/70">
                    {boxT.subtitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsDecorBoxOpen(false)}
                  aria-expanded={true}
                  aria-label="Minimize Decor Box"
                  className="min-h-[44px] min-w-[44px] rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
                  title="Minimize Decor Box"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Decor Items to Pick and Use - 2x2 grid on desktop, single column on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {/* 1: Fairy Lights */}
              <div
                onClick={toggleFairyLights}
                role="button"
                tabIndex={0}
                aria-pressed={decoration.fairyLights}
                aria-label={`${t.lights}: ${decoration.fairyLights ? boxT.placed : boxT.pick}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFairyLights();
                  }
                }}
                className={`min-h-[46px] p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none ${
                  decoration.fairyLights
                    ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#FFF5DE]'
                    : 'bg-[#131C38]/80 border-[#D6AD60]/20 text-[#FFF5DE]/85 hover:border-[#D6AD60]/50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0">✨</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#F4D995] truncate">{t.lights}</div>
                    <div className="text-[10px] text-[#FFF5DE]/70 truncate">{t.lightsDesc}</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold shrink-0 ml-2 ${
                    decoration.fairyLights
                      ? 'bg-[#D6AD60] text-[#10172D] flex items-center gap-0.5'
                      : 'bg-[#192747] text-[#F4D995] border border-[#D6AD60]/30'
                  }`}
                >
                  {decoration.fairyLights ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" /> {boxT.placed}
                    </>
                  ) : (
                    boxT.pick
                  )}
                </span>
              </div>

              {/* 2: Marigold Toran */}
              <div
                onClick={toggleToran}
                role="button"
                tabIndex={0}
                aria-pressed={decoration.marigoldToran}
                aria-label={`${t.toran}: ${decoration.marigoldToran ? boxT.placed : boxT.pick}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleToran();
                  }
                }}
                className={`min-h-[46px] p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none ${
                  decoration.marigoldToran
                    ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#FFF5DE]'
                    : 'bg-[#131C38]/80 border-[#D6AD60]/20 text-[#FFF5DE]/85 hover:border-[#D6AD60]/50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0">🌼</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#F4D995] truncate">{t.toran}</div>
                    <div className="text-[10px] text-[#FFF5DE]/70 truncate">{t.toranDesc}</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold shrink-0 ml-2 ${
                    decoration.marigoldToran
                      ? 'bg-[#D6AD60] text-[#10172D] flex items-center gap-0.5'
                      : 'bg-[#192747] text-[#F4D995] border border-[#D6AD60]/30'
                  }`}
                >
                  {decoration.marigoldToran ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" /> {boxT.placed}
                    </>
                  ) : (
                    boxT.pick
                  )}
                </span>
              </div>

              {/* 3: Rangoli / Regional Art */}
              <div
                onClick={toggleRangoli}
                role="button"
                tabIndex={0}
                aria-pressed={decoration.rangoli}
                aria-label={`${region ? region.decorTradition.artName[currentLanguage] : t.rangoli}: ${decoration.rangoli ? boxT.placed : boxT.pick}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleRangoli();
                  }
                }}
                className={`min-h-[46px] p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none ${
                  decoration.rangoli
                    ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#FFF5DE]'
                    : 'bg-[#131C38]/80 border-[#D6AD60]/20 text-[#FFF5DE]/85 hover:border-[#D6AD60]/50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0">🌸</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#F4D995] truncate">
                      {region ? region.decorTradition.artName[currentLanguage] : t.rangoli}
                    </div>
                    <div className="text-[10px] text-[#FFF5DE]/70 truncate">
                      {region ? region.decorTradition.artDesc[currentLanguage] : t.rangoliDesc}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold shrink-0 ml-2 ${
                    decoration.rangoli
                      ? 'bg-[#D6AD60] text-[#10172D] flex items-center gap-0.5'
                      : 'bg-[#192747] text-[#F4D995] border border-[#D6AD60]/30'
                  }`}
                >
                  {decoration.rangoli ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" /> {boxT.placed}
                    </>
                  ) : (
                    boxT.pick
                  )}
                </span>
              </div>

              {/* 4: Mitti Diyas (Choddo Prodip) */}
              <div
                onClick={addDiyaBatch}
                role="button"
                tabIndex={0}
                aria-pressed={activeDiyasCount >= 14}
                aria-label={`${region ? region.decorTradition.diyaName[currentLanguage] : t.diyas}: ${activeDiyasCount} of 14 lit`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    addDiyaBatch();
                  }
                }}
                className={`min-h-[46px] p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none ${
                  activeDiyasCount >= 7
                    ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#FFF5DE]'
                    : 'bg-[#131C38]/80 border-[#D6AD60]/20 text-[#FFF5DE]/85 hover:border-[#D6AD60]/50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0">🪔</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#F4D995] truncate">
                      {region ? region.decorTradition.diyaName[currentLanguage] : t.diyas}
                    </div>
                    <div className="text-[10px] text-[#FFF5DE]/70 truncate">
                      {activeDiyasCount}/14 {boxT.lit} • {region ? region.decorTradition.diyaDesc[currentLanguage] : t.diyasDesc}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-lg font-semibold ${
                      activeDiyasCount >= 14
                        ? 'bg-[#D6AD60] text-[#10172D] flex items-center gap-0.5'
                        : 'bg-[#192747] text-[#FFB347] border border-[#D6AD60]/30'
                    }`}
                  >
                    {activeDiyasCount >= 14 ? (
                      <>
                        <Check className="w-3 h-3 stroke-[3]" /> {boxT.placed}
                      </>
                    ) : activeDiyasCount > 0 ? (
                      `${activeDiyasCount}/14 • ${boxT.pick}`
                    ) : (
                      boxT.pick
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Utility Row inside Box (Internal Controls) */}
            <div className="pt-2.5 mt-2.5 border-t border-[#D6AD60]/20 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs">
              <button
                type="button"
                onClick={decorateAll}
                className="px-2.5 py-1.5 rounded-lg bg-[#D6AD60]/20 hover:bg-[#D6AD60]/30 text-[#F4D995] font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-[#FFB347]" />
                <span>{t.decorateAll}</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.reset}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dedicated Section: "Some traditions are not just celebrated. They are felt, remembered and passed down." */}
      <ExperienceTraditionsSection
        userState={userState}
        currentLanguage={currentLanguage}
        onOpenActivity={(act) => {
          if (onOpenActivity) {
            onOpenActivity(act);
          }
        }}
        onOpenExplorer={onOpenExplorer}
      />

      {/* Completion & Next Step Action Controls */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-end gap-3 mt-4 sm:mt-5 pt-3 border-t border-[#D6AD60]/20">
        <div className="flex flex-wrap items-center justify-end gap-2.5 w-full sm:w-auto">
          {onOpenEcoMela && (
            <button
              onClick={onOpenEcoMela}
              className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/40 border border-emerald-400/40 hover:scale-102"
              title="Enter Eco Diwali Mela"
            >
              <span>🎪</span>
              <span>
                {currentLanguage === 'hi'
                  ? 'इको मेला खेलें >'
                  : currentLanguage === 'bn'
                  ? 'মজার খেলা >'
                  : 'Fun Games >'}
              </span>
            </button>
          )}

          <button
            onClick={onContinue}
            className={`w-full sm:w-auto min-h-[46px] px-7 py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
              isAllComplete
                ? 'bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] text-[#10172D] hover:brightness-110 shadow-[#D6AD60]/20 scale-102 font-bold'
                : 'bg-[#D6AD60] text-[#10172D] hover:bg-[#F4D995]'
            }`}
          >
            <span>
              {currentLanguage === 'hi'
                ? 'आतिशबाज़ी देखें'
                : currentLanguage === 'bn'
                ? 'আকাশে আতশবাজি'
                : 'Sky Fireworks'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
