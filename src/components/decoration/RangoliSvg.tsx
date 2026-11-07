/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface RangoliSvgProps {
  rangoliCenter: { cx: number; cy: number };
  rangoliRadius: number;
}

export const RangoliSvg: React.FC<RangoliSvgProps> = ({
  rangoliCenter,
  rangoliRadius,
}) => {
  const r = rangoliRadius;

  return (
    <g
      className="rangoli-group pointer-events-none"
      transform={`translate(${rangoliCenter.cx} ${rangoliCenter.cy}) scale(1, 0.38)`}
      style={{
        animation: 'rangoliReveal 1.2s ease-out forwards',
      }}
    >
      <defs>
        {/* Soft stone blend and glow filter */}
        <filter id="rangoliStoneBlend" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="rangoliOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C2185B" stopOpacity="0.88" />
          <stop offset="50%" stopColor="#E65100" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#C2185B" stopOpacity="0.88" />
        </linearGradient>

        <linearGradient id="rangoliTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00897B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#004D40" stopOpacity="0.9" />
        </linearGradient>

        <radialGradient id="stoneGlowAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB347" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#FF9100" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Warm ambient painted glow on flagstone */}
      <circle cx="0" cy="0" r={r * 1.25} fill="url(#stoneGlowAura)" />

      {/* Outer Border Layer */}
      <circle
        cx="0"
        cy="0"
        r={r}
        fill="url(#rangoliOuterGrad)"
        stroke="#FFF5DE"
        strokeWidth="2.5"
        strokeDasharray="6 3"
        filter="url(#rangoliStoneBlend)"
        className="rangoli-stroke-anim"
      />

      {/* 16 Scalloped Flower Petals on Rim */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        return (
          <circle
            key={`petal-rim-${i}`}
            cx={px}
            cy={py}
            r="8"
            fill="#FBC02D"
            stroke="#FFF5DE"
            strokeWidth="1.2"
          />
        );
      })}

      {/* Secondary Ring (Turquoise & Gold) */}
      <circle
        cx="0"
        cy="0"
        r={r * 0.76}
        fill="url(#rangoliTealGrad)"
        stroke="#FFE082"
        strokeWidth="2"
      />

      {/* 8 Sacred Lotus Petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const deg = i * 45;
        return (
          <g key={`lotus-${i}`} transform={`rotate(${deg})`}>
            {/* Outer Petal */}
            <path
              d={`M 0 0 C -22 -35, -15 -${r * 0.72}, 0 -${r * 0.72} C 15 -${r * 0.72}, 22 -35, 0 0 Z`}
              fill="#E91E63"
              stroke="#FFF5DE"
              strokeWidth="1.5"
              filter="url(#rangoliStoneBlend)"
            />
            {/* Inner Gold Spine */}
            <path
              d={`M 0 0 C -10 -25, -6 -${r * 0.55}, 0 -${r * 0.55} C 6 -${r * 0.55}, 10 -25, 0 0 Z`}
              fill="#FFD54F"
            />
          </g>
        );
      })}

      {/* Third Ring (Saffron Orange) */}
      <circle
        cx="0"
        cy="0"
        r={r * 0.46}
        fill="#FF6D00"
        stroke="#FFF5DE"
        strokeWidth="2"
      />

      {/* Star of Lakshmi / 8-pointed Octagram */}
      <polygon
        points={`
          0,-${r * 0.44} 
          ${r * 0.12},-${r * 0.12} 
          ${r * 0.44},0 
          ${r * 0.12},${r * 0.12} 
          0,${r * 0.44} 
          -${r * 0.12},${r * 0.12} 
          -${r * 0.44},0 
          -${r * 0.12},-${r * 0.12}
        `}
        fill="#FFF5DE"
        stroke="#D6AD60"
        strokeWidth="1.5"
      />

      {/* Inner Bindu Flower Core */}
      <circle cx="0" cy="0" r={r * 0.22} fill="#C2185B" stroke="#FFE082" strokeWidth="1.5" />
      <circle cx="0" cy="0" r={r * 0.11} fill="#FFD54F" />
      <circle cx="0" cy="0" r={r * 0.05} fill="#D81B60" />

      {/* White Sacred Rice Powder Dots (Kolam dots) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const px = Math.cos(angle) * (r * 0.34);
        const py = Math.sin(angle) * (r * 0.34);
        return <circle key={`dot-${i}`} cx={px} cy={py} r="2.8" fill="#FFFFFF" />;
      })}

      <style>{`
        @keyframes rangoliReveal {
          0% {
            opacity: 0;
            filter: blur(8px);
          }
          100% {
            opacity: 0.95;
            filter: blur(0px);
          }
        }
        .rangoli-stroke-anim {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: rangoliDraw 1.4s ease-out forwards;
        }
        @keyframes rangoliDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </g>
  );
};
