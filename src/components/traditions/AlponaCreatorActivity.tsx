/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, RotateCcw, Undo2, Download, Brush, Stamp, Check } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';

interface AlponaCreatorActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

type ToolMode = 'draw' | 'stamp';
type StampType = 'lotus' | 'footprint' | 'conch' | 'kolka' | 'diya';

export const AlponaCreatorActivity: React.FC<AlponaCreatorActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [toolMode, setToolMode] = useState<ToolMode>('draw');
  const [selectedStamp, setSelectedStamp] = useState<StampType>('lotus');
  const [brushSize, setBrushSize] = useState<number>(4);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);
  const isDrawingRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI crispness
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial dark terracotta/indigo floor background
    renderBaseFloor(ctx, rect.width, rect.height);
    saveState();
  }, []);

  const renderBaseFloor = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Rich terracotta & deep midnight courtyard floor
    const grad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, Math.max(width, height) / 1.4);
    grad.addColorStop(0, '#1E2C4A');
    grad.addColorStop(0.6, '#141D33');
    grad.addColorStop(1, '#0C1222');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle traditional threshold guideline (soft golden circle)
    ctx.save();
    ctx.strokeStyle = 'rgba(214, 173, 96, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.38, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  };

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), imageData]);
  }, []);

  const handleUndo = () => {
    if (history.length <= 1) return;
    audioManager.playClickSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // remove current
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setHistory(newHistory);
  };

  const handleClear = () => {
    audioManager.playClickSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    renderBaseFloor(ctx, rect.width, rect.height);
    saveState();
    setHasDrawn(false);
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // Stamp drawing helper for authentic Bengali Alpona motifs
  const drawStampMotif = (ctx: CanvasRenderingContext2D, x: number, y: number, type: StampType) => {
    ctx.save();
    ctx.fillStyle = '#FFFDF2';
    ctx.strokeStyle = '#FFFDF2';
    ctx.shadowColor = 'rgba(244, 217, 149, 0.45)';
    ctx.shadowBlur = 6;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.translate(x, y);

    if (type === 'lotus') {
      // Traditional 8-petal Sacred Lotus (Podmo)
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.save();
        ctx.rotate(angle);
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(8, -18, 0, -32);
        ctx.quadraticCurveTo(-8, -18, 0, 0);
        ctx.fill();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFE082';
      ctx.fill();
    } else if (type === 'footprint') {
      // Auspicious Lakshmi Footprint pair (লক্ষ্মীর পা)
      [-10, 10].forEach((ox) => {
        ctx.save();
        ctx.translate(ox, 0);
        // Sole
        ctx.beginPath();
        ctx.ellipse(0, 4, 6, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        // 5 Tiny toes
        const toeAngles = [-0.6, -0.3, 0, 0.3, 0.6];
        toeAngles.forEach((a, ti) => {
          const tx = Math.sin(a) * 16;
          const ty = -Math.cos(a) * 16 - 2;
          ctx.beginPath();
          ctx.arc(tx, ty, 2 + (ti === 2 ? 0.6 : 0), 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      });
    } else if (type === 'conch') {
      // Shankhalata (Conch vine spiral)
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 1.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 1.6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.quadraticCurveTo(18, -12, 14, 10);
      ctx.stroke();
    } else if (type === 'kolka') {
      // Bengali Traditional Kolka (Paisley with decorative curls)
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.bezierCurveTo(-18, 10, -16, -16, 0, -28);
      ctx.bezierCurveTo(8, -20, 12, -10, 8, -4);
      ctx.bezierCurveTo(4, 2, -2, -2, -2, -6);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'diya') {
      // Earthen Diya motif
      ctx.beginPath();
      ctx.ellipse(0, 4, 16, 8, 0, 0, Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, -4, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFB347';
      ctx.fill();
    }

    ctx.restore();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (toolMode === 'stamp') {
      audioManager.playSparkleSound();
      drawStampMotif(ctx, coords.x, coords.y, selectedStamp);
      saveState();
      setHasDrawn(true);
      return;
    }

    isDrawingRef.current = true;
    lastPosRef.current = coords;
  };

  const drawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || toolMode !== 'draw') return;
    e.preventDefault();
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || !lastPosRef.current) return;

    // Authentic fluid rice-paste line
    ctx.save();
    ctx.strokeStyle = '#FFFDF5';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(244, 217, 149, 0.4)';
    ctx.shadowBlur = 4;

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    ctx.restore();

    lastPosRef.current = coords;
    setHasDrawn(true);
  };

  const endDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      lastPosRef.current = null;
      saveState();
    }
  };

  const loadTemplate = (type: 'mandala' | 'feet') => {
    audioManager.playSparkleSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();

    renderBaseFloor(ctx, rect.width, rect.height);
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    if (type === 'mandala') {
      // Central Lotus
      drawStampMotif(ctx, cx, cy, 'lotus');
      // Surrounding 8 petals
      const r = Math.min(rect.width, rect.height) * 0.28;
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        drawStampMotif(ctx, cx + Math.cos(a) * r, cy + Math.sin(a) * r, 'kolka');
      }
    } else {
      // Lakshmi Feet leading inward
      drawStampMotif(ctx, cx, cy + 60, 'footprint');
      drawStampMotif(ctx, cx, cy, 'footprint');
      drawStampMotif(ctx, cx, cy - 60, 'lotus');
    }

    saveState();
    setHasDrawn(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header controls bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎨</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'पारंपरिक अल्पना कला निर्माण'
                : currentLanguage === 'bn'
                ? 'পবিত্র চালের গুঁড়োর আলপনা আঁকা'
                : 'Sacred Bengali Alpona Creator'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'चावल के श्वेत लेप से चौखट व आंगन पर कमल, शंखलता व मां लक्ष्मी के चरण उकेरें।'
              : currentLanguage === 'bn'
              ? 'আতপ চালের শুভ্র লেই দিয়ে আঙুল বা ছাঁচের সাহায্যে মাঙ্গলিক পদ্ম ও শ্রীচরণ আঁকুন।'
              : 'Draw with organic white rice paste or place sacred Bengali motifs of lotus and divine feet.'}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            className={`p-2 rounded-xl text-xs border border-[#D6AD60]/40 transition-all flex items-center gap-1 ${
              history.length > 1
                ? 'bg-[#192747] text-[#F4D995] hover:bg-[#D6AD60]/20 cursor-pointer'
                : 'opacity-40 cursor-not-allowed bg-black/30'
            }`}
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleClear}
            className="p-2 rounded-xl text-xs border border-slate-700 bg-[#192747]/60 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Clear Canvas"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tools Palette Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 p-2 mb-3 rounded-2xl bg-[#192747]/80 border border-[#D6AD60]/30 text-xs">
        {/* Tool Mode: Freehand vs Stencils */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setToolMode('draw');
              audioManager.playClickSound();
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              toolMode === 'draw'
                ? 'bg-[#D6AD60] text-[#10172D] shadow-sm'
                : 'bg-transparent text-[#FFF5DE]/70 hover:bg-white/5'
            }`}
          >
            <Brush className="w-3.5 h-3.5" />
            <span>{currentLanguage === 'hi' ? 'मुक्त हस्त (ब्रश)' : currentLanguage === 'bn' ? 'আঙুল দিয়ে আঁকা' : 'Freehand Rice Paste'}</span>
          </button>

          <button
            onClick={() => {
              setToolMode('stamp');
              audioManager.playClickSound();
            }}
            className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              toolMode === 'stamp'
                ? 'bg-[#D6AD60] text-[#10172D] shadow-sm'
                : 'bg-transparent text-[#FFF5DE]/70 hover:bg-white/5'
            }`}
          >
            <Stamp className="w-3.5 h-3.5" />
            <span>{currentLanguage === 'hi' ? 'पावन प्रतीक छापें' : currentLanguage === 'bn' ? 'শুভ প্রতীক ছাঁচ' : 'Sacred Motifs'}</span>
          </button>
        </div>

        {/* Brush Size or Motif Selector */}
        {toolMode === 'draw' ? (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#FFF5DE]/70">
              {currentLanguage === 'hi' ? 'आकार:' : currentLanguage === 'bn' ? 'আকার:' : 'Thickness:'}
            </span>
            {[2.5, 5, 8].map((size, idx) => (
              <button
                key={idx}
                onClick={() => setBrushSize(size)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                  brushSize === size
                    ? 'border-[#D6AD60] bg-[#D6AD60]/20 text-[#F4D995]'
                    : 'border-slate-700 text-slate-400'
                }`}
              >
                <span
                  className="rounded-full bg-[#FFFDF5]"
                  style={{ width: `${size * 1.5}px`, height: `${size * 1.5}px` }}
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {(
              [
                { type: 'lotus', label: currentLanguage === 'bn' ? 'পদ্ম' : 'Lotus' },
                { type: 'footprint', label: currentLanguage === 'bn' ? 'শ্রীচরণ' : 'Lakshmi Feet' },
                { type: 'conch', label: currentLanguage === 'bn' ? 'শঙ্খলতা' : 'Conch' },
                { type: 'kolka', label: currentLanguage === 'bn' ? 'কলকা' : 'Kolka' },
                { type: 'diya', label: currentLanguage === 'bn' ? 'প্রদীপ' : 'Diya' },
              ] as { type: StampType; label: string }[]
            ).map((st) => (
              <button
                key={st.type}
                onClick={() => {
                  setSelectedStamp(st.type);
                  audioManager.playClickSound();
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  selectedStamp === st.type
                    ? 'border-[#D6AD60] bg-[#D6AD60]/25 text-[#F4D995]'
                    : 'border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Drawing Canvas Container */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl bg-[#0F162A] touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={drawMove}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={drawMove}
          onTouchEnd={endDrawing}
          className="w-full h-full block cursor-crosshair"
        />

        {/* Quick Template Presets Badge Overlay at bottom-left */}
        <div className="absolute bottom-2.5 left-2.5 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-black/60 backdrop-blur-md border border-[#D6AD60]/30 text-[11px]">
          <span className="text-[#F4D995] px-1 font-semibold">
            {currentLanguage === 'hi' ? 'तैयार नमूने:' : currentLanguage === 'bn' ? 'তৈরি নকশা:' : 'Presets:'}
          </span>
          <button
            onClick={() => loadTemplate('mandala')}
            className="px-2 py-1 rounded bg-[#192747] text-[#FFF5DE] hover:text-[#F4D995] cursor-pointer"
          >
            {currentLanguage === 'bn' ? 'পদ্ম মণ্ডল' : 'Lotus Mandala'}
          </button>
          <button
            onClick={() => loadTemplate('feet')}
            className="px-2 py-1 rounded bg-[#192747] text-[#FFF5DE] hover:text-[#F4D995] cursor-pointer"
          >
            {currentLanguage === 'bn' ? 'লক্ষ্মীর চরণ' : 'Divine Feet'}
          </button>
        </div>
      </div>

      {/* Status Notice */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {hasDrawn
          ? currentLanguage === 'hi'
            ? '✨ आपकी अल्पना मां लक्ष्मी और मां काली के चरणों का सत्कार कर रही है।'
            : currentLanguage === 'bn'
            ? '✨ আতপ চালের শুভ্র আলপনায় আপনার ঘরের শ্রী ফুটে উঠেছে।'
            : '✨ Sacred white rice patterns welcoming peace, light, and maternal blessings.'
          : currentLanguage === 'hi'
          ? 'कैनवास पर उंगली या माउस से बनाएं अथवा पावन प्रतीक छापें।'
          : currentLanguage === 'bn'
          ? 'ক্যানভাসে আঙুল দিয়ে আঁকুন অথবা পছন্দের ছাঁচে আলপনা সাজান।'
          : 'Draw with your finger/mouse or tap stamps onto the threshold canvas.'}
      </div>
    </div>
  );
};
