/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface GiftIllustrationProps {
  type: 'watch' | 'kurta' | 'saree' | 'camera' | 'console' | 'package' | string;
  className?: string;
}

export const GiftIllustration: React.FC<GiftIllustrationProps> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'watch':
      return (
        <div className={`flex items-center justify-center p-4 bg-gradient-to-b from-[#192747] to-[#0E1528] ${className}`}>
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
            <defs>
              <linearGradient id="goldCase" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2B2" />
                <stop offset="35%" stopColor="#D6AD60" />
                <stop offset="70%" stopColor="#8A6416" />
                <stop offset="100%" stopColor="#F4D995" />
              </linearGradient>
              <linearGradient id="strapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2E1C0C" />
                <stop offset="50%" stopColor="#4A2E16" />
                <stop offset="100%" stopColor="#1E1208" />
              </linearGradient>
            </defs>

            {/* Leather Strap Top */}
            <rect x="74" y="10" width="52" height="50" rx="6" fill="url(#strapGrad)" stroke="#8A6416" strokeWidth="1.5" />
            <line x1="80" y1="12" x2="80" y2="55" stroke="#D6AD60" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="120" y1="12" x2="120" y2="55" stroke="#D6AD60" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* Leather Strap Bottom */}
            <rect x="74" y="140" width="52" height="50" rx="6" fill="url(#strapGrad)" stroke="#8A6416" strokeWidth="1.5" />
            <line x1="80" y1="145" x2="80" y2="188" stroke="#D6AD60" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="120" y1="145" x2="120" y2="188" stroke="#D6AD60" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* Watch Case Lugs */}
            <rect x="70" y="44" width="60" height="112" rx="10" fill="url(#goldCase)" opacity="0.9" />

            {/* Outer Bezel */}
            <circle cx="100" cy="100" r="54" fill="url(#goldCase)" stroke="#FFE082" strokeWidth="2" />
            {/* Inner Ring */}
            <circle cx="100" cy="100" r="46" fill="#0C1322" stroke="#D6AD60" strokeWidth="1.5" />

            {/* Dial Hour Markers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 100 + Math.sin(angle) * 38;
              const y1 = 100 - Math.cos(angle) * 38;
              const x2 = 100 + Math.sin(angle) * 43;
              const y2 = 100 - Math.cos(angle) * 43;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={i % 3 === 0 ? '#FFE082' : '#D6AD60'}
                  strokeWidth={i % 3 === 0 ? 2.5 : 1.5}
                />
              );
            })}

            {/* Chronograph Mini Dials */}
            <circle cx="100" cy="84" r="10" fill="none" stroke="#D6AD60" strokeWidth="0.8" opacity="0.6" />
            <circle cx="86" cy="108" r="9" fill="none" stroke="#D6AD60" strokeWidth="0.8" opacity="0.6" />

            {/* Hands */}
            {/* Hour Hand */}
            <line x1="100" y1="100" x2="80" y2="82" stroke="#FFF5DE" strokeWidth="3" strokeLinecap="round" />
            {/* Minute Hand */}
            <line x1="100" y1="100" x2="122" y2="72" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
            {/* Second Hand */}
            <line x1="100" y1="104" x2="100" y2="60" stroke="#FF5722" strokeWidth="1" strokeLinecap="round" />
            {/* Center Cap */}
            <circle cx="100" cy="100" r="3.5" fill="#FFE082" />
            {/* Crown */}
            <rect x="154" y="94" width="7" height="12" rx="2" fill="url(#goldCase)" />
          </svg>
        </div>
      );

    case 'kurta':
      return (
        <div className={`flex items-center justify-center p-4 bg-gradient-to-b from-[#192747] to-[#0E1528] ${className}`}>
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
            <defs>
              <linearGradient id="kurtaSilk" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9E6" />
                <stop offset="40%" stopColor="#F5E4B5" />
                <stop offset="80%" stopColor="#D8BE7A" />
                <stop offset="100%" stopColor="#B39347" />
              </linearGradient>
              <linearGradient id="goldBraid" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8860B" />
                <stop offset="50%" stopColor="#FFE082" />
                <stop offset="100%" stopColor="#8A6416" />
              </linearGradient>
            </defs>

            {/* Kurta Body Outline */}
            <path
              d="M 60 40 L 40 85 L 62 92 L 68 185 L 132 185 L 138 92 L 160 85 L 140 40 L 115 48 C 105 52, 95 52, 85 48 Z"
              fill="url(#kurtaSilk)"
              stroke="#D6AD60"
              strokeWidth="2"
            />

            {/* Mandarin Nehru Collar */}
            <path
              d="M 85 44 C 95 48, 105 48, 115 44 C 118 36, 116 32, 100 32 C 84 32, 82 36, 85 44 Z"
              fill="url(#goldBraid)"
              stroke="#8A6416"
              strokeWidth="1.5"
            />

            {/* Center Embroidered Placket */}
            <rect x="94" y="44" width="12" height="68" fill="url(#goldBraid)" stroke="#8A6416" strokeWidth="1" />

            {/* Royal Gold Buttons */}
            <circle cx="100" cy="54" r="2.5" fill="#FFE082" stroke="#573D05" strokeWidth="0.8" />
            <circle cx="100" cy="68" r="2.5" fill="#FFE082" stroke="#573D05" strokeWidth="0.8" />
            <circle cx="100" cy="82" r="2.5" fill="#FFE082" stroke="#573D05" strokeWidth="0.8" />
            <circle cx="100" cy="96" r="2.5" fill="#FFE082" stroke="#573D05" strokeWidth="0.8" />

            {/* Pocket Detail with Silk Pocket Square */}
            <rect x="74" y="74" width="18" height="2" fill="#8A6416" />
            <path d="M 77 74 L 83 66 L 89 74 Z" fill="#C2185B" />

            {/* Cuff Borders */}
            <rect x="42" y="82" width="18" height="5" transform="rotate(18 42 82)" fill="url(#goldBraid)" />
            <rect x="140" y="86" width="18" height="5" transform="rotate(-18 140 86)" fill="url(#goldBraid)" />

            {/* Bottom Hem Zari Border */}
            <rect x="68" y="177" width="64" height="8" fill="url(#goldBraid)" />
          </svg>
        </div>
      );

    case 'saree':
      return (
        <div className={`flex items-center justify-center p-4 bg-gradient-to-b from-[#192747] to-[#0E1528] ${className}`}>
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
            <defs>
              <linearGradient id="sareeCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C2185B" />
                <stop offset="50%" stopColor="#880E4F" />
                <stop offset="100%" stopColor="#4A0033" />
              </linearGradient>
              <linearGradient id="zariGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="50%" stopColor="#D6AD60" />
                <stop offset="100%" stopColor="#8A6416" />
              </linearGradient>
            </defs>

            {/* Folded Silk Saree Base */}
            <rect x="30" y="45" width="140" height="110" rx="10" fill="url(#sareeCrimson)" stroke="#D6AD60" strokeWidth="2" />

            {/* Intricate Gold Zari Pallu Border */}
            <rect x="30" y="45" width="40" height="110" rx="6" fill="url(#zariGold)" stroke="#573D05" strokeWidth="1" />

            {/* Paisley / Mango Kalka Motif on Pallu */}
            <path
              d="M 50 80 C 42 65, 58 60, 52 75 C 46 88, 38 100, 50 115 C 60 110, 55 95, 50 80 Z"
              fill="#880E4F"
              stroke="#FFF2B2"
              strokeWidth="1.2"
            />

            {/* Golden Butis (Polka Dots) across Silk */}
            {Array.from({ length: 6 }).map((_, i) => (
              <circle key={i} cx={90 + (i % 3) * 28} cy={70 + Math.floor(i / 3) * 35} r="3" fill="#FFE082" />
            ))}

            {/* Emerald Pleat Peek */}
            <path d="M 30 140 L 170 140 L 170 155 L 30 155 Z" fill="#00796B" stroke="#D6AD60" strokeWidth="1" />

            {/* Fresh Marigold Petal accents */}
            <circle cx="145" cy="55" r="8" fill="#FF9100" />
            <circle cx="145" cy="55" r="4" fill="#FFD600" />
            <circle cx="158" cy="62" r="6" fill="#FF6D00" />
          </svg>
        </div>
      );

    case 'camera':
      return (
        <div className={`flex items-center justify-center p-4 bg-gradient-to-b from-[#192747] to-[#0E1528] ${className}`}>
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
            <defs>
              <linearGradient id="cameraBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F0EBE0" />
                <stop offset="100%" stopColor="#D5CBBF" />
              </linearGradient>
              <radialGradient id="lensReflect" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#80D8FF" />
                <stop offset="40%" stopColor="#0091EA" />
                <stop offset="85%" stopColor="#002171" />
                <stop offset="100%" stopColor="#000A12" />
              </radialGradient>
            </defs>

            {/* Camera Body */}
            <rect x="35" y="45" width="130" height="110" rx="16" fill="url(#cameraBody)" stroke="#B0A090" strokeWidth="2" />

            {/* Vintage Color Stripes (Festive Diwali edition: Amber, Pink, Emerald) */}
            <rect x="35" y="105" width="130" height="4" fill="#FFB347" />
            <rect x="35" y="109" width="130" height="4" fill="#E91E63" />
            <rect x="35" y="113" width="130" height="4" fill="#00E676" />

            {/* Big Central Lens Barrel */}
            <circle cx="100" cy="100" r="36" fill="#212121" stroke="#D6AD60" strokeWidth="2.5" />
            <circle cx="100" cy="100" r="28" fill="url(#lensReflect)" stroke="#0D47A1" strokeWidth="1" />
            <circle cx="92" cy="92" r="6" fill="#FFFFFF" opacity="0.75" />

            {/* Viewfinder Window */}
            <rect x="48" y="55" width="18" height="14" rx="3" fill="#37474F" stroke="#263238" strokeWidth="1" />
            <rect x="51" y="58" width="12" height="8" rx="2" fill="#80D8FF" opacity="0.6" />

            {/* Flash Strobe */}
            <rect x="132" y="54" width="22" height="16" rx="3" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="1" />
            <line x1="135" y1="62" x2="151" y2="62" stroke="#B0BEC5" strokeWidth="1" />

            {/* Shutter Button (Red/Gold) */}
            <circle cx="48" cy="40" r="7" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5" />

            {/* Emerging Photo Print Slot at Bottom */}
            <rect x="55" y="152" width="90" height="6" rx="2" fill="#263238" />
            <rect x="62" y="156" width="76" height="24" rx="2" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="1" />
            <rect x="68" y="160" width="64" height="14" fill="#FFB347" opacity="0.8" />
          </svg>
        </div>
      );

    case 'console':
      return (
        <div className={`flex items-center justify-center p-4 bg-gradient-to-b from-[#192747] to-[#0E1528] ${className}`}>
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
            <defs>
              <linearGradient id="psWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#ECEFF1" />
                <stop offset="100%" stopColor="#CFD8DC" />
              </linearGradient>
            </defs>

            {/* White Winged Console Body */}
            {/* Left curved wing */}
            <path
              d="M 55 35 Q 60 100, 68 165 L 82 165 Q 76 100, 70 35 Z"
              fill="url(#psWhite)"
              stroke="#B0BEC5"
              strokeWidth="1.5"
            />
            {/* Center Black Core */}
            <rect x="74" y="42" width="26" height="122" rx="4" fill="#121824" stroke="#263238" strokeWidth="1" />
            {/* Blue LED Vent Glow Line */}
            <line x1="75" y1="45" x2="75" y2="160" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
            {/* Disc Slot */}
            <line x1="88" y1="90" x2="88" y2="135" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />

            {/* Right curved wing */}
            <path
              d="M 104 35 Q 98 100, 92 165 L 106 165 Q 112 100, 118 35 Z"
              fill="url(#psWhite)"
              stroke="#B0BEC5"
              strokeWidth="1.5"
            />
            {/* Console Base Stand */}
            <ellipse cx="88" cy="168" rx="34" ry="6" fill="#212121" stroke="#37474F" strokeWidth="1" />

            {/* Wireless Dual Controller Placed In Foreground */}
            <path
              d="M 115 130 C 110 120, 150 115, 175 130 C 185 145, 175 168, 168 172 C 160 176, 154 158, 145 158 C 136 158, 130 176, 122 172 C 115 168, 105 145, 115 130 Z"
              fill="#ECEFF1"
              stroke="#90A4AE"
              strokeWidth="1.5"
            />
            {/* Controller Touchpad */}
            <rect x="138" y="132" width="14" height="10" rx="2" fill="#212121" />
            <circle cx="132" cy="148" r="4.5" fill="#37474F" />
            <circle cx="158" cy="148" r="4.5" fill="#37474F" />
            <circle cx="162" cy="136" r="2" fill="#00E676" />
            <circle cx="166" cy="140" r="2" fill="#E91E63" />
          </svg>
        </div>
      );

    case 'package':
    default:
      return (
        <div className={`flex items-center justify-center p-4 bg-gradient-to-b from-[#192747] to-[#0E1528] ${className}`}>
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
            <defs>
              <linearGradient id="pkgNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E2F5A" />
                <stop offset="50%" stopColor="#131E38" />
                <stop offset="100%" stopColor="#0B1224" />
              </linearGradient>
              <linearGradient id="pkgGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2B2" />
                <stop offset="35%" stopColor="#D6AD60" />
                <stop offset="70%" stopColor="#8A6416" />
                <stop offset="100%" stopColor="#F4D995" />
              </linearGradient>
            </defs>

            <rect x="40" y="70" width="120" height="95" rx="8" fill="url(#pkgNavy)" stroke="#D6AD60" strokeWidth="2" />
            <rect x="90" y="70" width="20" height="95" fill="url(#pkgGold)" />
            <rect x="40" y="110" width="120" height="18" fill="url(#pkgGold)" />
            <rect x="34" y="52" width="132" height="22" rx="6" fill="url(#pkgNavy)" stroke="#D6AD60" strokeWidth="2" />
            <rect x="88" y="52" width="24" height="22" fill="url(#pkgGold)" />

            {/* Bow */}
            <path d="M 100 52 C 75 22, 55 35, 90 52 Z" fill="url(#pkgGold)" />
            <path d="M 100 52 C 125 22, 145 35, 110 52 Z" fill="url(#pkgGold)" />
            <circle cx="100" cy="52" r="8" fill="url(#pkgGold)" stroke="#573D05" strokeWidth="1" />

            {/* Small glowing Diya in front */}
            <ellipse cx="100" cy="155" rx="14" ry="5" fill="#FFB347" opacity="0.9" />
            <circle cx="100" cy="148" r="3" fill="#FFE082" className="animate-pulse" />
          </svg>
        </div>
      );
  }
};
