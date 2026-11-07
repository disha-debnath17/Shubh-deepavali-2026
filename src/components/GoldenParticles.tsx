/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface GoldenParticlesProps {
  intensity?: 'subtle' | 'festive' | 'intense';
}

/**
 * High-Performance Golden Particles
 * - Pauses automatically when tab is hidden (respects battery & CPU)
 * - Honors prefers-reduced-motion (disables animation for motion sensitivity)
 * - Scales particle count for low-end mobile devices (16 on mobile vs 36 on desktop)
 */
export const GoldenParticles: React.FC<GoldenParticlesProps> = ({ intensity = 'subtle' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Check for reduced motion preference
    const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotionQuery.matches) {
      // Reduced motion active: render calm static backdrop, no continuous animation loop
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = !document.hidden;

    // Detect device scale for low-end phone performance
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;

    let width = (canvas.width = Math.min(window.innerWidth, 1920));
    let height = (canvas.height = window.innerHeight);

    const mousePos = { x: -1000, y: -1000, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.min(window.innerWidth, 1920);
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      mousePos.active = true;
      if ('touches' in e && e.touches.length > 0) {
        mousePos.x = e.touches[0].clientX;
        mousePos.y = e.touches[0].clientY;
      } else if ('clientX' in e) {
        mousePos.x = (e as MouseEvent).clientX;
        mousePos.y = (e as MouseEvent).clientY;
      }
    };

    const handlePointerLeave = () => {
      mousePos.active = false;
      mousePos.x = -1000;
      mousePos.y = -1000;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchend', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Particle budgeting for low-end mobile devices & battery life
    const baseCount = isMobile ? 16 : isTablet ? 26 : 38;
    const multiplier = intensity === 'intense' ? 1.4 : intensity === 'festive' ? 1.15 : 0.85;
    const particleCount = Math.floor(baseCount * multiplier);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      opacitySpeed: number;
      hue: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      particles.push({
        x: rx,
        y: ry,
        size: Math.random() * (isMobile ? 1.8 : 2.4) + 0.8,
        speedY: -(Math.random() * 0.35 + 0.12),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.2,
        opacitySpeed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        hue: Math.random() > 0.3 ? 42 : 36, // Gold to amber warm shimmer
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) return;

      // Throttle render frame delta on 120Hz screens or background hiccups
      const delta = Math.min((time - lastTime) / 16.67, 2.0);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY * delta;
        p.x += p.speedX * delta;
        p.opacity += p.opacitySpeed * delta;

        if (p.opacity > 0.8 || p.opacity < 0.15) {
          p.opacitySpeed = -p.opacitySpeed;
        }

        // Pointer proximity gentle repulsion/sparkle
        if (mousePos.active) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 10000) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 100) * 0.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchend', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
};
