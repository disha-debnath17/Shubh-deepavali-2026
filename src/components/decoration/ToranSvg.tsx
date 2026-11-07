/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';

interface ToranSvgProps {
  lintelLeft: { x: number; y: number };
  lintelRight: { x: number; y: number };
  sideStrings?: { left: number; right: number; yTop: number; yBottom: number };
  leftString?: { x1: number; y1: number; x2: number; y2: number };
  rightString?: { x1: number; y1: number; x2: number; y2: number };
}

export const ToranSvg: React.FC<ToranSvgProps> = ({
  lintelLeft,
  lintelRight,
  sideStrings,
  leftString,
  rightString,
}) => {
  // Compute points along 3 scalloped swags between lintelLeft and lintelRight
  const { pathD, garlandPoints } = useMemo(() => {
    const x0 = lintelLeft.x;
    const y0 = lintelLeft.y;
    const x3 = lintelRight.x;
    const y3 = lintelRight.y;

    const span = x3 - x0;
    const x1 = x0 + span / 3;
    const x2 = x0 + (2 * span) / 3;

    // Sag depths
    const sag1 = 28;
    const sag2 = 38; // middle swag sags slightly deeper
    const sag3 = 28;

    // SVG path string with 3 quadratic beziers
    const d = `M ${x0} ${y0} 
      Q ${x0 + span / 6} ${y0 + sag1 * 1.8}, ${x1} ${y0 + (y3 - y0) * 0.33} 
      Q ${x1 + span / 6} ${y0 + sag2 * 1.8}, ${x2} ${y0 + (y3 - y0) * 0.66} 
      Q ${x2 + span / 6} ${y0 + sag3 * 1.8}, ${x3} ${y3}`;

    // Sample points along the 3 swags for marigolds and mango leaves
    const points: { x: number; y: number; isLeaf?: boolean }[] = [];

    const sampleSwag = (startX: number, startY: number, endX: number, endY: number, sag: number, count: number) => {
      const ctrlX = (startX + endX) / 2;
      const ctrlY = Math.max(startY, endY) + sag * 1.5;

      for (let i = 0; i <= count; i++) {
        const t = i / count;
        // Quadratic bezier formula
        const px = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
        const py = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;
        points.push({ x: px, y: py, isLeaf: i % 2 === 1 });
      }
    };

    sampleSwag(x0, y0, x1, y0 + (y3 - y0) * 0.33, sag1, 5);
    sampleSwag(x1, y0 + (y3 - y0) * 0.33, x2, y0 + (y3 - y0) * 0.66, sag2, 6);
    sampleSwag(x2, y0 + (y3 - y0) * 0.66, x3, y3, sag3, 5);

    return { pathD: d, garlandPoints: points };
  }, [lintelLeft, lintelRight]);

  // Vertical strings of marigolds down side strings / door frames
  const verticalLeftPoints = useMemo(() => {
    const pts = [];
    const count = 12;
    const x1 = leftString ? leftString.x1 : (sideStrings?.left ?? lintelLeft.x);
    const y1 = leftString ? leftString.y1 : (sideStrings?.yTop ?? lintelLeft.y);
    const x2 = leftString ? leftString.x2 : (sideStrings?.left ?? lintelLeft.x);
    const y2 = leftString ? leftString.y2 : (sideStrings?.yBottom ?? lintelLeft.y + 400);
    const dx = (x2 - x1) / count;
    const dy = (y2 - y1) / count;
    for (let i = 1; i <= count; i++) {
      pts.push({ x: x1 + i * dx, y: y1 + i * dy, idx: i });
    }
    return pts;
  }, [sideStrings, leftString, lintelLeft]);

  const verticalRightPoints = useMemo(() => {
    const pts = [];
    const count = 12;
    const x1 = rightString ? rightString.x1 : (sideStrings?.right ?? lintelRight.x);
    const y1 = rightString ? rightString.y1 : (sideStrings?.yTop ?? lintelRight.y);
    const x2 = rightString ? rightString.x2 : (sideStrings?.right ?? lintelRight.x);
    const y2 = rightString ? rightString.y2 : (sideStrings?.yBottom ?? lintelRight.y + 400);
    const dx = (x2 - x1) / count;
    const dy = (y2 - y1) / count;
    for (let i = 1; i <= count; i++) {
      pts.push({ x: x1 + i * dx, y: y1 + i * dy, idx: i });
    }
    return pts;
  }, [sideStrings, rightString, lintelRight]);

  const originX = (lintelLeft.x + lintelRight.x) / 2;
  const originY = Math.min(lintelLeft.y, lintelRight.y);

  return (
    <g
      className="toran-container pointer-events-none"
      style={{
        transformOrigin: `${originX}px ${originY}px`,
        animation: 'toranDropIn 1.1s cubic-bezier(0.2, 0.9, 0.3, 1) forwards',
      }}
    >
      <defs>
        {/* Soft shadow for depth against door */}
        <filter id="toranShadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* Hanging rope guide / mango leaves backing string */}
      <path
        d={pathD}
        fill="none"
        stroke="#1B5E20"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#toranShadow)"
      />

      {/* Vertical Side Strings Rope */}
      <line
        x1={leftString ? leftString.x1 : (sideStrings?.left ?? lintelLeft.x)}
        y1={leftString ? leftString.y1 : (sideStrings?.yTop ?? lintelLeft.y)}
        x2={leftString ? leftString.x2 : (sideStrings?.left ?? lintelLeft.x)}
        y2={leftString ? leftString.y2 : (sideStrings?.yBottom ?? lintelLeft.y + 400)}
        stroke="#1B5E20"
        strokeWidth="3"
        filter="url(#toranShadow)"
      />
      <line
        x1={rightString ? rightString.x1 : (sideStrings?.right ?? lintelRight.x)}
        y1={rightString ? rightString.y1 : (sideStrings?.yTop ?? lintelRight.y)}
        x2={rightString ? rightString.x2 : (sideStrings?.right ?? lintelRight.x)}
        y2={rightString ? rightString.y2 : (sideStrings?.yBottom ?? lintelRight.y + 400)}
        stroke="#1B5E20"
        strokeWidth="3"
        filter="url(#toranShadow)"
      />

      {/* Mango Leaves (Aam Patta) dangling along the swag curve */}
      {garlandPoints.map((pt, i) => {
        if (i % 2 !== 1) return null;
        return (
          <g key={`leaf-${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
            {/* Dark green mango leaf shape pointing downwards */}
            <path
              d="M 0 0 C -7 8, -8 24, 0 32 C 8 24, 7 8, 0 0 Z"
              fill="#2E7D32"
              stroke="#1B5E20"
              strokeWidth="0.8"
            />
            {/* Leaf central vein */}
            <line x1="0" y1="2" x2="0" y2="28" stroke="#81C784" strokeWidth="0.6" opacity="0.8" />
          </g>
        );
      })}

      {/* Marigold Genda Phool flowers along the swag curve */}
      {garlandPoints.map((pt, i) => {
        const isOrange = i % 2 === 0;
        const radius = i % 3 === 0 ? 11 : 9.5;
        return (
          <g key={`flower-${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
            {/* Outer fluffy petal ring */}
            <circle
              cx="0"
              cy="0"
              r={radius}
              fill={isOrange ? '#FF6D00' : '#FFD600'}
              stroke={isOrange ? '#E65100' : '#F57F17'}
              strokeWidth="1.2"
            />
            {/* Middle petal ring */}
            <circle
              cx="0"
              cy="0"
              r={radius * 0.65}
              fill={isOrange ? '#FF9100' : '#FFEE58'}
            />
            {/* Deep core */}
            <circle
              cx="0"
              cy="0"
              r={radius * 0.3}
              fill="#BF360C"
            />
          </g>
        );
      })}

      {/* Left Vertical Marigold Garland */}
      {verticalLeftPoints.map((pt) => {
        const isOrange = pt.idx % 2 === 0;
        return (
          <g key={`v-left-${pt.idx}`} transform={`translate(${pt.x}, ${pt.y})`}>
            {pt.idx % 3 === 0 && (
              <path
                d="M 0 0 C -6 6, -6 18, 0 22 C 6 18, 6 6, 0 0 Z"
                fill="#2E7D32"
                transform="rotate(25)"
              />
            )}
            <circle
              cx="0"
              cy="0"
              r="9"
              fill={isOrange ? '#FF6D00' : '#FFD600'}
              stroke={isOrange ? '#E65100' : '#F57F17'}
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="5.5" fill={isOrange ? '#FF9100' : '#FFEE58'} />
            <circle cx="0" cy="0" r="2.5" fill="#BF360C" />
          </g>
        );
      })}

      {/* Right Vertical Marigold Garland */}
      {verticalRightPoints.map((pt) => {
        const isOrange = pt.idx % 2 === 0;
        return (
          <g key={`v-right-${pt.idx}`} transform={`translate(${pt.x}, ${pt.y})`}>
            {pt.idx % 3 === 0 && (
              <path
                d="M 0 0 C -6 6, -6 18, 0 22 C 6 18, 6 6, 0 0 Z"
                fill="#2E7D32"
                transform="rotate(-25)"
              />
            )}
            <circle
              cx="0"
              cy="0"
              r="9"
              fill={isOrange ? '#FF6D00' : '#FFD600'}
              stroke={isOrange ? '#E65100' : '#F57F17'}
              strokeWidth="1"
            />
            <circle cx="0" cy="0" r="5.5" fill={isOrange ? '#FF9100' : '#FFEE58'} />
            <circle cx="0" cy="0" r="2.5" fill="#BF360C" />
          </g>
        );
      })}

      <style>{`
        @keyframes toranDropIn {
          0% {
            transform: translateY(-40px) rotate(-3.5deg);
            opacity: 0;
          }
          60% {
            transform: translateY(0) rotate(2deg);
            opacity: 1;
          }
          80% {
            transform: translateY(0) rotate(-1deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </g>
  );
};
