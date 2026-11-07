import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { audioManager } from '../../utils/audio';
import { Language, TRANSLATIONS } from '../../utils/translations';

interface ScratchMithaiBoxProps {
  id: 'kaju' | 'soan';
  title: string;
  badge: string;
  desc: string;
  boxImage: string;          // The closed packaging box image
  insideImage: string;       // The sweet image shown after opening (twist)
  twistLabel: string;
  isOpened: boolean;
  isScratched: boolean;
  isSelected: boolean;
  onScratchComplete: () => void;
  onSelect: () => void;
  pickBtnText: string;
  currentLanguage?: Language;
}

export const ScratchMithaiBox: React.FC<ScratchMithaiBoxProps> = ({
  id,
  title,
  badge,
  desc,
  boxImage,
  insideImage,
  twistLabel,
  isOpened,
  isScratched,
  isSelected,
  onScratchComplete,
  onSelect,
  pickBtnText,
  currentLanguage = 'en',
}) => {
  const t = TRANSLATIONS[currentLanguage].mithai;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const lastSoundTime = useRef(0);

  // Initialize dark scratch coat on canvas
  const drawDarkScratchCover = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Deep dark velvety night cover
    const grad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h));
    grad.addColorStop(0, '#1c2438');
    grad.addColorStop(0.65, '#0f172a');
    grad.addColorStop(1, '#060a14');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Ornate antique golden border
    ctx.strokeStyle = '#d6ad60';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    ctx.strokeStyle = 'rgba(244, 217, 149, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, w - 24, h - 24);

    // Shimmering gold dust specks
    ctx.fillStyle = '#f4d995';
    for (let i = 0; i < 45; i++) {
      const sx = (Math.sin(i * 143.7) * 0.5 + 0.5) * (w - 32) + 16;
      const sy = (Math.cos(i * 261.3) * 0.5 + 0.5) * (h - 32) + 16;
      ctx.globalAlpha = 0.25 + (i % 4) * 0.15;
      ctx.beginPath();
      ctx.arc(sx, sy, (i % 3) + 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Center festive Diya watermark & Scratch prompt
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🪔', w / 2, h / 2 - 20);

    ctx.fillStyle = '#ffb347';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(t.canvasDarkBox || 'DARK MYSTERY BOX', w / 2, h / 2 + 10);

    ctx.fillStyle = '#fff5de';
    ctx.font = 'italic 11px system-ui, sans-serif';
    ctx.fillText(t.canvasScratchPrompt || '✨ Scratch here to uncover ✨', w / 2, h / 2 + 28);
  }, [t]);

  // Set up canvas sizing and initial draw
  useEffect(() => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateCanvasSize = () => {
      const width = container.clientWidth || 208;
      const height = container.clientHeight || 208;
      canvas.width = width;
      canvas.height = height;
      drawDarkScratchCover(canvas);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [isScratched, drawDarkScratchCover]);

  // Check how much of the dark surface has been scratched away
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;

      // Sample every 16th pixel for super fast responsive performance
      const step = 16;
      let sampled = 0;
      for (let i = 3; i < data.length; i += step) {
        sampled++;
        if (data[i] < 45) {
          transparentPixels++;
        }
      }

      const percent = Math.round((transparentPixels / sampled) * 100);
      setScratchPercent(percent);

      if (percent >= 22) {
        audioManager.playSparkleSound();
        onScratchComplete();
      }
    } catch (e) {
      // ignore
    }
  }, [isScratched, onScratchComplete]);

  // Scratch stroke drawing
  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Soft feathered outer scratch
    ctx.beginPath();
    ctx.arc(x, y, 36, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fill();

    // Play subtle realistic scratch sound throttled
    const now = Date.now();
    if (now - lastSoundTime.current > 70) {
      audioManager.playScratchSound();
      lastSoundTime.current = now;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    if (isScratching) {
      setIsScratching(false);
      checkScratchPercentage();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      setIsScratching(true);
      const touch = e.touches[0];
      scratchAt(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching || e.touches.length === 0) return;
    const touch = e.touches[0];
    scratchAt(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    if (isScratching) {
      setIsScratching(false);
      checkScratchPercentage();
    }
  };

  return (
    <div
      className={`relative rounded-3xl border-2 transition-all duration-300 p-4 sm:p-5 backdrop-blur-md flex flex-col items-center text-center ${
        isSelected
          ? 'border-[#FFB347] bg-[#192747]/95 shadow-2xl shadow-[#FFB347]/30 scale-[1.02]'
          : 'border-[#D6AD60]/35 bg-[#192747]/65 hover:border-[#D6AD60] hover:bg-[#192747]/85'
      }`}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/20 text-[#F4D995] text-xs font-bold uppercase tracking-wider mb-3">
        <span>{isScratched || isOpened ? badge : t.mysteryBoxBadge}</span>
      </div>

      {/* The Display Box / Scratch Area */}
      <div
        ref={containerRef}
        onClick={() => {
          if (isScratched && !isOpened) {
            onSelect();
          }
        }}
        className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border border-[#D6AD60]/40 shadow-inner mb-3 bg-[#0d1326] flex items-center justify-center select-none ${
          isScratched && !isOpened ? 'cursor-pointer hover:border-[#FFB347] hover:scale-[1.02] transition-all' : ''
        }`}
      >
        {/* UNDERNEATH: The Sweet Box packaging (or opened twist content) */}
        {isOpened && isSelected ? (
          // THE TWIST OCCURS: Shows the opposite sweet inside!
          <div className="relative w-full h-full animate-fade-in flex flex-col">
            <img
              src={insideImage}
              alt="Inside Surprise"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 py-1.5 px-2 bg-red-600/95 text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-1">
              <span>{twistLabel}</span>
            </div>
          </div>
        ) : (
          // The closed sweet box packaging (shows the sweet box content label)
          <div className="relative w-full h-full">
            <img
              src={boxImage}
              alt={title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {isScratched && (
              <div className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex items-center justify-center">
                <span className="text-[11px] font-semibold text-[#FFF5DE] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {t.boxRevealed}
                </span>
              </div>
            )}
          </div>
        )}

        {/* DARK SCRATCH LAYER (On top of the box image until scratched) */}
        {!isScratched && !isOpened && (
          <canvas
            ref={canvasRef}
            role="button"
            tabIndex={0}
            aria-label={`Scratch card for ${title}. Drag to scratch, or press Enter or Space to uncover immediately.`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onScratchComplete();
              }
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="absolute inset-0 z-10 w-full h-full cursor-pointer touch-none focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
          />
        )}
      </div>

      {/* Box Name & Description (Hidden before scratching; revealed after scratching) */}
      {isScratched || isOpened ? (
        <div className="w-full animate-fade-in">
          <h3 className="font-royal text-lg sm:text-xl font-bold text-[#FFF5DE] mb-1">
            {title}
          </h3>
          <p className="text-xs text-[#F4D995]/80 mb-3 px-1 leading-relaxed">
            {desc}
          </p>
        </div>
      ) : (
        <div className="w-full min-h-[58px] flex flex-col items-center justify-center mb-3">
          <h3 className="font-royal text-base sm:text-lg font-bold text-[#F4D995] mb-0.5">
            {t.mysteryBoxTitle}
          </h3>
          <p className="text-xs text-[#FFF5DE]/60 italic">
            {t.mysteryBoxDesc}
          </p>
        </div>
      )}

      {/* Action Buttons: Scratch prompt or Pick Box */}
      <div className="w-full mt-auto space-y-2">
        {!isScratched && !isOpened ? (
          <div className="space-y-1.5">
            <div className="min-h-[44px] py-2 px-3 rounded-xl border border-[#D6AD60]/25 bg-[#10172D]/60 text-center flex items-center justify-center">
              <p className="text-xs text-[#F4D995] font-medium flex items-center justify-center gap-1.5">
                <span>👆</span>
                <span>{t.scratchInstruction}</span>
              </p>
            </div>
            {/* Accessible 1-click reveal for keyboard/motor accessibility */}
            <button
              type="button"
              onClick={onScratchComplete}
              className="w-full py-1.5 text-[11px] text-[#F4D995]/90 hover:text-white underline decoration-dotted transition-colors cursor-pointer rounded-lg focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
            >
              Reveal without scratching
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              if (!isOpened) {
                onSelect();
              }
            }}
            disabled={isOpened && isSelected}
            className={`w-full min-h-[46px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F] ${
              isSelected
                ? 'bg-[#FFB347] text-[#10172D] shadow-md ring-2 ring-[#FFF5DE]/40'
                : 'bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D] hover:brightness-110 active:scale-98 shadow-md'
            }`}
          >
            {isSelected && isOpened ? (
              <span>{t.openedBoxBadge}</span>
            ) : (
              <span>{pickBtnText}</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
