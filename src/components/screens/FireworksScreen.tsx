/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, ChevronRight, Zap } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';

interface FireworksScreenProps {
  userName: string;
  onContinue: () => void;
  currentLanguage: Language;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
}

export const FireworksScreen: React.FC<FireworksScreenProps> = ({
  userName,
  onContinue,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage].fireworks;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [burstCount, setBurstCount] = useState<number>(0);

  const triggerBurst = (x?: number, y?: number) => {
    audioManager.playRealFireworkBurst();
    setBurstCount((prev) => prev + 1);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const targetX = x ?? (Math.random() * 0.7 + 0.15) * canvas.width;
    const targetY = y ?? (Math.random() * 0.45 + 0.15) * canvas.height;

    const event = new CustomEvent('launch-firework', {
      detail: { x: targetX, y: targetY },
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    // Warm up audio buffer on-demand when visiting Fireworks terrace
    audioManager.warmupFireworkAudio();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 640;

    let animId: number;
    let isVisible = !document.hidden;
    let width = (canvas.width = Math.min(window.innerWidth, 1920));
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.min(window.innerWidth, 1920);
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const particles: Particle[] = [];
    const festiveColors = [
      '#FFD700',
      '#FF9100',
      '#FF4081',
      '#00E676',
      '#00E5FF',
      '#FFF5DE',
      '#E040FB',
    ];

    const createExplosion = (x: number, y: number) => {
      const color = festiveColors[Math.floor(Math.random() * festiveColors.length)];
      // Scaled particle count for mobile efficiency & battery preservation
      const baseCount = prefersReducedMotion ? 12 : isMobile ? 32 : 55;
      const count = Math.floor(Math.random() * 15) + baseCount;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const maxSpeed = prefersReducedMotion ? 2.2 : isMobile ? 4.5 : 5.8;
        const speed = Math.random() * maxSpeed + 0.8;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: prefersReducedMotion ? 0.04 : Math.random() * 0.016 + 0.012,
          color,
          size: Math.random() * (isMobile ? 2.0 : 2.5) + 1.0,
        });
      }
    };

    const handleLaunch = (e: any) => {
      const { x, y } = e.detail;
      createExplosion(x, y);
    };
    window.addEventListener('launch-firework', handleLaunch);

    const render = () => {
      if (!isVisible) return;

      // Soft clear with trail fade
      ctx.fillStyle = 'rgba(16, 23, 45, 0.25)';
      ctx.fillRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += prefersReducedMotion ? 0.02 : 0.045;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.alpha, 0);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('launch-firework', handleLaunch);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      onClick={(e) => {
        // Firecrackers burst when sky is clicked (ignore button clicks)
        if ((e.target as HTMLElement).closest('button')) return;
        triggerBurst(e.clientX, e.clientY);
      }}
      className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-between px-3 sm:px-6 py-5 sm:py-8 select-none cursor-crosshair"
    >
      {/* Background Interactive Sky Canvas */}
      <canvas
        ref={canvasRef}
        aria-label="Interactive Night Sky. click anywhere to enjoy sky fireworks"
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerBurst();
          }
        }}
        className="fixed inset-0 z-0 h-full w-full cursor-crosshair focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
      />

      {/* Header Info */}
      <div className="relative z-10 text-center max-w-xl mx-auto space-y-2 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/15 border border-[#D6AD60]/40 text-[#F4D995] text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Terrace Skyshots</span>
        </div>

        <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFF5DE] drop-shadow-md">
          {t.heading} <span className="text-[#F4D995]">{userName}</span>!
        </h2>

        {/* Clear user-requested instruction: "click anywhere to enjoy sky fireworks" */}
        <div className="pt-1.5">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-[#192747]/90 to-amber-500/20 border-2 border-[#D6AD60]/60 text-[#F4D995] text-xs sm:text-sm md:text-base font-bold tracking-wide shadow-xl backdrop-blur-md animate-pulse">
            <span className="text-base sm:text-lg" aria-hidden="true">🎆</span>
            <span>click anywhere to enjoy sky fireworks</span>
            <span className="text-base sm:text-lg" aria-hidden="true">✨</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#FFF5DE]/85 font-light leading-relaxed">
          {t.subheading}
        </p>

        {/* Dynamic Burst Counter with ARIA live region */}
        <div
          role="status"
          aria-live="polite"
          className="pt-1 flex items-center justify-center gap-2 text-xs font-semibold text-[#F4D995]"
        >
          <span className="px-3 py-1 rounded-full bg-[#192747]/90 border border-[#D6AD60]/40 backdrop-blur-md shadow-xs">
            ✨ {burstCount} {burstCount === 1 ? 'Skyshot Burst' : 'Skyshots Burst'}
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 pb-2 pointer-events-auto">
        <button
          type="button"
          onClick={() => {
            audioManager.playClickSound();
            onContinue();
          }}
          className="w-full sm:w-auto min-h-[50px] px-8 py-3 rounded-xl font-bold text-sm sm:text-base text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-xl shadow-[#D6AD60]/25 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF5DE]"
        >
          <span>{t.continueMithaiBtn}</span>
          <ChevronRight className="w-4 h-4 text-[#10172D]" />
        </button>
      </div>
    </div>
  );
};
