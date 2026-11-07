/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';

interface StepAndRoofLightsSvgProps {
  roofLightPath: { x: number; y: number }[];
  steps?: { x1: number; y: number; x2: number }[];
  isRoofLit: boolean;
  isStepsLit?: boolean;
}

export const StepAndRoofLightsSvg: React.FC<StepAndRoofLightsSvgProps> = ({
  roofLightPath,
  isRoofLit,
}) => {
  // Generate roof cable path connecting roofLightPath points with natural catenary sag
  const roofCableD = useMemo(() => {
    if (roofLightPath.length === 0) return '';
    let d = `M ${roofLightPath[0].x} ${roofLightPath[0].y}`;
    for (let i = 0; i < roofLightPath.length - 1; i++) {
      const p1 = roofLightPath[i];
      const p2 = roofLightPath[i + 1];
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2 + 12; // sag down
      d += ` Q ${midX} ${midY}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, [roofLightPath]);

  // Generate intermediate roof bulb positions along the roof cable
  const roofBulbs = useMemo(() => {
    const bulbs: { x: number; y: number; color: string; animClass: string; delay: number }[] = [];
    const colors = ['#F4D995', '#FFB347', '#FFE082', '#FFF5DE'];
    const anims = ['animate-fairy-1', 'animate-fairy-2', 'animate-fairy-3'];

    for (let i = 0; i < roofLightPath.length - 1; i++) {
      const p1 = roofLightPath[i];
      const p2 = roofLightPath[i + 1];
      const count = 4;
      for (let k = 0; k < count; k++) {
        const t = (k + 0.5) / count;
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2 + 12;
        // quadratic point
        const bx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * midX + t * t * p2.x;
        const by = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * midY + t * t * p2.y;
        const bulbIdx = bulbs.length;
        bulbs.push({
          x: bx,
          y: by + 6,
          color: colors[bulbIdx % colors.length],
          animClass: anims[bulbIdx % anims.length],
          delay: bulbIdx * 65,
        });
      }
    }
    return bulbs;
  }, [roofLightPath]);

  return (
    <g className="lights-layer pointer-events-none">
      <defs>
        <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9C4" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#FFB347" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#FF9100" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* --- UPPER ROOF STRING LIGHTS --- */}
      {/* Cable */}
      {isRoofLit && (
        <path
          d={roofCableD}
          fill="none"
          stroke="rgba(244, 217, 149, 0.45)"
          strokeWidth="1.8"
        />
      )}

      {/* Roof Bulbs */}
      {isRoofLit &&
        roofBulbs.map((b, idx) => (
          <g key={`roof-bulb-${idx}`} transform={`translate(${b.x}, ${b.y})`}>
            {/* Wire drop */}
            <line x1="0" y1="-6" x2="0" y2="0" stroke="rgba(214, 173, 96, 0.3)" strokeWidth="1" />
            <g
              style={{
                animation: `stepLightPop 0.4s ease-out forwards`,
                animationDelay: `${b.delay}ms`,
                opacity: 0,
              }}
            >
              {/* Outer Glow Halo */}
              <circle cx="0" cy="2" r="12" fill="url(#bulbGlow)" className={b.animClass} />
              {/* Inner Teardrop Bulb */}
              <ellipse
                cx="0"
                cy="2"
                rx="3.2"
                ry="4.5"
                fill={b.color}
                stroke="#FFE082"
                strokeWidth="0.8"
              />
              <circle cx="0" cy="1" r="1.2" fill="#FFFFFF" />
            </g>
          </g>
        ))}

      <style>{`
        @keyframes stepLightPop {
          0% {
            opacity: 0;
            transform: scale(0.4);
          }
          70% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </g>
  );
};
