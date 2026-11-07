/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface MittiDiyaProps {
  lit?: boolean;
  isLit?: boolean;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  onTap?: () => void;
  ariaLabel?: string;
  showTapPrompt?: boolean;
  tapPromptText?: string;
  stand?: 'brass' | 'wood' | 'none';
  className?: string;
}

/**
 * Reusable Mitti Diya (Terracotta Clay Lamp)
 * Features matte terracotta clay, pinched ridged rim, cotton wick, charcoal soot smudge,
 * dark oil basin, warm amber flicker, glow bloom, and optional earthy brass/wood plate.
 * Accessible with keyboard Enter/Space controls and high-contrast focus rings.
 */
export const MittiDiya: React.FC<MittiDiyaProps> = ({
  lit,
  isLit: isLitProp,
  size = 140,
  onClick,
  onTap,
  ariaLabel,
  showTapPrompt = false,
  tapPromptText = 'Tap to light',
  stand = 'brass',
  className = '',
}) => {
  const isLit = lit !== undefined ? lit : (isLitProp ?? false);
  const handleClick = onClick || onTap;

  let pixelSize = 140;
  if (typeof size === 'number') {
    pixelSize = size;
  } else if (size === 'sm') {
    pixelSize = 70;
  } else if (size === 'md') {
    pixelSize = 110;
  } else if (size === 'lg') {
    pixelSize = 180;
  } else if (size === 'xl') {
    pixelSize = 240;
  }

  const uid = React.useId().replace(/:/g, '');

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#10172D] rounded-3xl p-1 transition-transform hover:scale-103 active:scale-98 ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-pressed={isLit}
      aria-label={ariaLabel || (isLit ? 'Mitti ka diya (lit, press to toggle)' : 'Mitti ka diya (unlit, press to light)')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick?.();
        }
      }}
      style={{ width: `${pixelSize}px`, height: `${Math.round(pixelSize * 0.85)}px` }}
    >
      <svg
        viewBox="0 0 200 170"
        className="w-full h-full overflow-visible drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`mittiSaucer_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C97349" />
            <stop offset="25%" stopColor="#AD5C35" />
            <stop offset="65%" stopColor="#8A421D" />
            <stop offset="100%" stopColor="#5E280E" />
          </linearGradient>

          <linearGradient id={`mittiRim_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D98256" />
            <stop offset="50%" stopColor="#9E4D26" />
            <stop offset="100%" stopColor="#692C11" />
          </linearGradient>

          <radialGradient id={`oilBasin_${uid}`} cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#D4A017" />
            <stop offset="40%" stopColor="#996515" />
            <stop offset="85%" stopColor="#4A2F08" />
            <stop offset="100%" stopColor="#2A1702" />
          </radialGradient>

          <linearGradient id={`flameOuter_${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FF3D00" />
            <stop offset="35%" stopColor="#FF9100" />
            <stop offset="70%" stopColor="#FFD600" />
            <stop offset="100%" stopColor="#FFF9C4" />
          </linearGradient>

          <linearGradient id={`flameCore_${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#FFEB3B" />
            <stop offset="75%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          <radialGradient id={`ambientBloom_${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB347" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#FF9100" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#FF6D00" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`brassPlate_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECC277" />
            <stop offset="30%" stopColor="#D6AD60" />
            <stop offset="70%" stopColor="#8A6726" />
            <stop offset="100%" stopColor="#543E12" />
          </linearGradient>

          <linearGradient id={`woodStand_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5D4037" />
            <stop offset="50%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#271202" />
          </linearGradient>
        </defs>

        {/* Earthy Surface under Diya (Brass plate or wood stand) */}
        {stand === 'brass' && (
          <g transform="translate(100, 142)">
            <ellipse cx="0" cy="8" rx="86" ry="16" fill="#000000" opacity="0.6" filter="blur(3px)" />
            <ellipse cx="0" cy="0" rx="85" ry="16" fill={`url(#brassPlate_${uid})`} stroke="#6E4D15" strokeWidth="1.5" />
            <ellipse cx="0" cy="-1" rx="81" ry="14" fill="#3D2B0F" opacity="0.4" />
            <ellipse cx="0" cy="-2" rx="77" ry="12" fill={`url(#brassPlate_${uid})`} stroke="#8A6726" strokeWidth="0.8" />
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i * Math.PI) / 9;
              const bx = Math.cos(angle) * 74;
              const by = -2 + Math.sin(angle) * 10.5;
              return <circle key={i} cx={bx} cy={by} r="1.2" fill="#FFE082" opacity="0.75" />;
            })}
          </g>
        )}

        {stand === 'wood' && (
          <g transform="translate(100, 142)">
            <ellipse cx="0" cy="8" rx="80" ry="15" fill="#000000" opacity="0.5" filter="blur(2px)" />
            <ellipse cx="0" cy="0" rx="78" ry="14" fill={`url(#woodStand_${uid})`} stroke="#271202" strokeWidth="2" />
            <ellipse cx="0" cy="-3" rx="72" ry="11" fill="#4E342E" stroke="#3E2723" strokeWidth="1" />
          </g>
        )}

        {/* Shadow of the clay diya */}
        <ellipse cx="100" cy="138" rx="55" ry="12" fill="#000000" opacity="0.7" filter="blur(3px)" />

        {/* Ambient Glow Bloom (Lit only) */}
        {isLit && (
          <g transform="translate(100, 75)" className="pointer-events-none">
            <circle cx="0" cy="0" r="95" fill={`url(#ambientBloom_${uid})`} className="animate-aura" />
            <circle cx="0" cy="-5" r="55" fill="#FFE082" opacity="0.25" filter="blur(8px)" />
          </g>
        )}

        {/* Terracotta Clay Diya Body */}
        <g id="mittiDiyaBody">
          <path
            d="M 45 110 C 45 138, 155 138, 155 110 C 145 102, 125 96, 100 96 C 75 96, 55 102, 45 110 Z"
            fill={`url(#mittiSaucer_${uid})`}
            stroke="#4A1E0B"
            strokeWidth="1.5"
          />

          <ellipse
            cx="100"
            cy="110"
            rx="55"
            ry="16"
            fill={`url(#mittiRim_${uid})`}
            stroke="#632B12"
            strokeWidth="1.5"
          />

          {Array.from({ length: 15 }).map((_, i) => {
            const angle = Math.PI - (i * Math.PI) / 14;
            const rx = 100 + Math.cos(angle) * 51;
            const ry = 110 + Math.sin(angle) * 14;
            return (
              <ellipse
                key={i}
                cx={rx}
                cy={ry}
                rx="2"
                ry="1.4"
                fill="#3D1808"
                opacity="0.85"
              />
            );
          })}

          <ellipse
            cx="100"
            cy="111"
            rx="42"
            ry="11"
            fill={`url(#oilBasin_${uid})`}
            stroke="#2B1504"
            strokeWidth="0.8"
          />

          <ellipse cx="94" cy="110" rx="28" ry="6" fill="#FFF9C4" opacity={isLit ? '0.35' : '0.12'} />

          <path
            d="M 88 100 Q 100 86, 112 100 Z"
            fill="#7A3614"
            stroke="#421908"
            strokeWidth="1"
          />

          <ellipse cx="100" cy="94" rx="14" ry="6" fill="#1C110A" opacity="0.88" />

          <path
            d="M 100 108 Q 98 94, 100 82 Q 102 94, 100 108"
            fill="#F5F5F5"
            stroke="#CFD8DC"
            strokeWidth="1.2"
          />
          <circle cx="100" cy="82" r="2.8" fill="#1A1A1A" />
        </g>

        {/* Realistic Flame (Lit only) */}
        {isLit ? (
          <g
            transform="translate(100, 82)"
            className="animate-flame select-none"
            style={{ transformOrigin: '0px 0px' }}
          >
            <ellipse cx="0" cy="-28" rx="22" ry="36" fill="#FF9100" opacity="0.35" filter="blur(5px)" />
            <path
              d="M 0 0 C -14 -12, -18 -36, 0 -54 C 18 -36, 14 -12, 0 0 Z"
              fill={`url(#flameOuter_${uid})`}
            />
            <path
              d="M 0 -2 C -7 -10, -9 -28, 0 -42 C 9 -28, 7 -10, 0 -2 Z"
              fill={`url(#flameCore_${uid})`}
            />
            <ellipse cx="0" cy="-6" rx="4" ry="7" fill="#FFFFFF" />
          </g>
        ) : (
          <g transform="translate(100, 80)" opacity="0.3" className="pointer-events-none">
            <path d="M 0 0 Q 3 -8, -1 -16 T 2 -26" fill="none" stroke="#ECEFF1" strokeWidth="0.8" />
          </g>
        )}
      </svg>

      {showTapPrompt && !isLit && (
        <div className="absolute -bottom-2 z-20 pointer-events-none animate-bounce">
          <span className="px-3 py-1 rounded-full bg-[#FFB347] text-[#10172D] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-[#FFE082]">
            <span>✨</span>
            <span>{tapPromptText}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export interface MittiDiyaSvgProps {
  x: number;
  y: number;
  isLit: boolean;
  onToggle?: () => void;
  scale?: number;
  index?: number;
}

/**
 * SVG group representation of Mitti Diya for direct inclusion inside SVG scenes (like DecorateScreen)
 * Fully keyboard accessible (Enter & Space) with visible high-contrast focus ring and generous 48x48+ touch target.
 */
export const MittiDiyaSvg: React.FC<MittiDiyaSvgProps> = ({
  x,
  y,
  isLit,
  onToggle,
  scale = 1,
  index = 1,
}) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      className="cursor-pointer group select-none outline-none"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-pressed={isLit}
      aria-label={
        isLit
          ? `Mitti Diya #${index} on step (lit, press Enter or Space to extinguish)`
          : `Mitti Diya #${index} on step (unlit, press Enter or Space to light)`
      }
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle?.();
        }
      }}
    >
      <defs>
        <linearGradient id="mittiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C06C47" />
          <stop offset="35%" stopColor="#A0522D" />
          <stop offset="70%" stopColor="#803D1A" />
          <stop offset="100%" stopColor="#5C2B12" />
        </linearGradient>

        <linearGradient id="oilPoolGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#5E3C00" />
        </linearGradient>

        <radialGradient id="mittiDiyaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB347" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FF9100" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="flameGradShared" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#E65100" />
          <stop offset="40%" stopColor="#FF9800" />
          <stop offset="80%" stopColor="#FFEB3B" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>

      {/* Accessible generous invisible touch hitbox (minimum 56x56 px equivalent) */}
      <circle cx="0" cy="0" r="28" fill="transparent" />

      {/* Visible Keyboard Focus Indicator */}
      {isFocused && (
        <ellipse
          cx="0"
          cy="2"
          rx="26"
          ry="14"
          fill="none"
          stroke="#FFD54F"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          className="animate-pulse"
        />
      )}

      {/* Diya Shadow */}
      <ellipse cx="0" cy="14" rx="20" ry="6" fill="#000000" opacity="0.65" filter="blur(2px)" />

      {/* Ambient Flame Glow (Lit only) */}
      {isLit && (
        <circle cx="0" cy="-6" r="38" fill="url(#mittiDiyaGlow)" className="animate-aura" />
      )}

      {/* Clay Saucer */}
      <path
        d="M -18 2 C -18 12, 18 12, 18 2 C 14 0, 8 -3, 0 -3 C -8 -3, -14 0, -18 2 Z"
        fill="url(#mittiGrad)"
        stroke="#6E3211"
        strokeWidth="1"
      />

      <ellipse cx="0" cy="2" rx="18" ry="6" fill="url(#mittiGrad)" stroke="#8A401A" strokeWidth="1" />
      {Array.from({ length: 9 }).map((_, i) => {
        const angle = Math.PI - (i * Math.PI) / 8;
        const rx = Math.cos(angle) * 17;
        const ry = 2 + Math.sin(angle) * 5.2;
        return (
          <circle key={i} cx={rx} cy={ry} r="1" fill="#4A1E0B" opacity="0.8" />
        );
      })}

      <ellipse cx="0" cy="2" rx="14" ry="4" fill="url(#oilPoolGrad)" />

      <path d="M -4 -2 Q 0 -6, 4 -2 Z" fill="#803D1A" />
      <ellipse cx="0" cy="-2.5" rx="5" ry="2" fill="#1C130D" opacity="0.85" />

      <path
        d="M 0 1 Q -1 -3, 0 -7 Q 1 -3, 0 1"
        fill="#ECEFF1"
        stroke="#CFD8DC"
        strokeWidth="0.8"
      />
      <circle cx="0" cy="-7" r="1.2" fill="#212121" />

      {/* Flame or Unlit Wick Indicator */}
      {isLit ? (
        <g transform="translate(0, -7)" className="animate-flame" style={{ transformOrigin: '0px 0px' }}>
          <ellipse cx="0" cy="-10" rx="9" ry="14" fill="#FF9100" opacity="0.35" filter="blur(3px)" />
          <path
            d="M 0 0 C -4.5 -4, -6 -11, 0 -18 C 6 -11, 4.5 -4, 0 0 Z"
            fill="url(#flameGradShared)"
          />
          <path
            d="M 0 -1 C -2.8 -4, -3.2 -9, 0 -14 C 3.2 -9, 2.8 -4, 0 -1 Z"
            fill="#FFF9C4"
            className="animate-flame-core"
          />
          <ellipse cx="0" cy="-1.5" rx="2" ry="1.2" fill="#1976D2" opacity="0.75" />
          <circle cx="1.5" cy="-22" r="0.8" fill="#FFF9C4" className="animate-ping" />
        </g>
      ) : (
        <g transform="translate(0, -10)" className="group-hover:opacity-100 opacity-60 transition-opacity">
          <circle cx="0" cy="0" r="4" fill="#FFB347" opacity="0.3" className="animate-pulse" />
          <circle cx="0" cy="0" r="1.5" fill="#FFE082" />
        </g>
      )}
    </g>
  );
};
