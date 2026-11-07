/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, Download, Sparkles, Trash2, Undo, Check } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { awardMelaReward } from '../../data/melaData';

interface RangoliChallengeProps {
  currentLanguage?: Language;
  language?: Language;
  onRewardAwarded?: (stars: number, badgeId?: string) => void;
  onRewardUpdate?: () => void;
  onNextGame?: () => void;
}

const RANGOLI_COLORS = [
  { name: 'Kumkum Red', hex: '#E11D48', hi: 'कुमकुम लाल', bn: 'কুমকুম লাল' },
  { name: 'Haldi Yellow', hex: '#FACC15', hi: 'हल्दी पीला', bn: 'হলুদ' },
  { name: 'Marigold Orange', hex: '#F97316', hi: 'गेंदा नारंगी', bn: 'গাঁদা কমলা' },
  { name: 'Peacock Green', hex: '#059669', hi: 'मोर हरा', bn: 'ময়ূর সবুজ' },
  { name: 'Lotus Pink', hex: '#F472B6', hi: 'कमल गुलाबी', bn: 'গোলাপী' },
  { name: 'Rice White', hex: '#FFFFFF', hi: 'चावल श्वेत', bn: 'সাদা চালগুঁড়ো' },
  { name: 'Royal Indigo', hex: '#6366F1', hi: 'नील', bn: 'নীল' },
  { name: 'Sacred Gold', hex: '#D6AD60', hi: 'स्वर्ण', bn: 'সোনালী' },
];

const STAMPS = [
  { id: 'petal', label: 'Petal', icon: '🌸' },
  { id: 'diya', label: 'Diya', icon: '🪔' },
  { id: 'star', label: 'Sparkle', icon: '✨' },
  { id: 'leaf', label: 'Mango Leaf', icon: '🍃' },
  { id: 'dot', label: 'Bindu', icon: '🟡' },
];

export const RangoliChallenge: React.FC<RangoliChallengeProps> = ({
  currentLanguage = 'en',
  language,
  onRewardAwarded,
  onRewardUpdate,
  onNextGame,
}) => {
  const activeLang = language || currentLanguage;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>(RANGOLI_COLORS[0].hex);
  const [brushSize, setBrushSize] = useState<number>(6);
  const [symmetry, setSymmetry] = useState<'none' | '4' | '8'>('8');
  const [activeTool, setActiveTool] = useState<'brush' | 'stamp'>('brush');
  const [selectedStamp, setSelectedStamp] = useState<string>('petal');
  const [history, setHistory] = useState<ImageData[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [hasSaved, setHasSaved] = useState<boolean>(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set dark courtyard stone background
    ctx.fillStyle = '#0F1626';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial state to history
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-12), data]);
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    audioManager.playClickSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // remove current
    const previous = newHistory[newHistory.length - 1];
    ctx.putImageData(previous, 0, 0);
    setHistory(newHistory);
  };

  const handleClear = () => {
    audioManager.playClickSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0F1626';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
    setHasSaved(false);
  };

  // Coordinates helper
  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const drawSymmetricPoints = (x: number, y: number, drawFn: (px: number, py: number) => void) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const dx = x - cx;
    const dy = y - cy;

    if (symmetry === 'none') {
      drawFn(x, y);
      return;
    }

    const count = symmetry === '8' ? 8 : 4;
    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const rx = cx + dx * cos - dy * sin;
      const ry = cy + dx * sin + dy * cos;
      drawFn(rx, ry);

      if (symmetry === '8') {
        // Mirrored reflection
        const mx = cx + dx * cos + dy * sin;
        const my = cy - dx * sin + dy * cos;
        drawFn(mx, my);
      }
    }
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);

    if (activeTool === 'stamp') {
      audioManager.playSparkleSound();
      drawSymmetricPoints(x, y, (px, py) => {
        ctx.save();
        ctx.font = `${brushSize * 4.5}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const stampEmoji = STAMPS.find((s) => s.id === selectedStamp)?.icon || '🌸';
        ctx.fillText(stampEmoji, px, py);
        ctx.restore();
      });
      saveState();
      return;
    }

    setIsDrawing(true);
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    drawSymmetricPoints(x, y, (px, py) => {
      ctx.beginPath();
      ctx.arc(px, py, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || activeTool === 'stamp') return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;

    drawSymmetricPoints(x, y, (px, py) => {
      ctx.beginPath();
      ctx.arc(px, py, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const handlePointerUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveState();
    }
  };

  const handleDownloadAndSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    audioManager.playSparkleSound();

    // Trigger celebratory confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#FACC15', '#F97316', '#059669', '#FFFFFF'],
    });

    // Award Mela reward
    awardMelaReward('rangoli_challenge', 25, 'rangoli_artist');
    if (onRewardAwarded) {
      onRewardAwarded(25, 'rangoli_artist');
    }
    if (onRewardUpdate) {
      onRewardUpdate();
    }
    setHasSaved(true);

    // Download image
    const link = document.createElement('a');
    link.download = `shubh-diwali-rangoli-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="w-full flex flex-col items-center max-w-2xl mx-auto space-y-3.5">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between gap-2 px-1">
        <div>
          <h3 className="font-royal text-lg sm:text-xl font-bold text-[#FFF5DE] flex items-center gap-1.5">
            <span>🌸</span>
            <span>
              {currentLanguage === 'hi'
                ? 'रंगोली व अल्पना कला स्टूडियो'
                : currentLanguage === 'bn'
                ? 'পবিত্র আলপনা ও রঙ্গোলি স্টুডিও'
                : 'Rangoli & Alpona Art Studio'}
            </span>
          </h3>
          <p className="text-xs text-[#F4D995]/80 font-light">
            {currentLanguage === 'hi'
              ? '८-कोणीय सममिति से तुरंत बनाएं पारंपरिक दिव्य रंगोली!'
              : currentLanguage === 'bn'
              ? '৮-কোণী চক্রাকার ছন্দে নিখুঁত উৎসবের আলপনা আঁকুন!'
              : 'Draw with 8-fold mandala mirror symmetry or place sacred stamps!'}
          </p>
        </div>

        {/* Undo and Clear */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            className="p-2 rounded-xl bg-[#192747] border border-[#D6AD60]/40 text-[#F4D995] disabled:opacity-40 hover:bg-[#D6AD60]/20 transition-all cursor-pointer"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded-xl bg-[#192747] border border-red-500/40 text-red-300 hover:bg-red-900/30 transition-all cursor-pointer"
            title="Clear Canvas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Drawing Canvas */}
      <div className="relative w-full aspect-square max-w-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/60 shadow-2xl bg-[#0F1626] touch-none select-none">
        <canvas
          ref={canvasRef}
          width={560}
          height={560}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          className="w-full h-full block cursor-crosshair"
        />

        {/* Mandala guide circle center cross overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15">
          <div className="w-48 h-48 rounded-full border border-dashed border-[#D6AD60]" />
          <div className="absolute w-72 h-72 rounded-full border border-dotted border-[#D6AD60]" />
        </div>
      </div>

      {/* Toolbar: Color Swatches */}
      <div className="w-full flex items-center justify-center gap-1.5 overflow-x-auto py-1 px-2 no-scrollbar">
        {RANGOLI_COLORS.map((c) => (
          <button
            key={c.hex}
            onClick={() => {
              audioManager.playClickSound();
              setSelectedColor(c.hex);
              setActiveTool('brush');
            }}
            title={c.name}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-transform cursor-pointer shrink-0 border-2 ${
              selectedColor === c.hex && activeTool === 'brush'
                ? 'scale-120 border-white shadow-lg ring-2 ring-[#F4D995]'
                : 'border-black/40 hover:scale-110'
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>

      {/* Toolbar: Symmetry Mode, Brush Size & Stamps */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-[#192747]/80 border border-[#D6AD60]/30 text-xs">
        {/* Symmetry Selector */}
        <div className="flex items-center gap-1">
          <span className="text-[#F4D995] font-semibold text-[11px] hidden sm:inline">Symmetry:</span>
          <button
            onClick={() => setSymmetry('none')}
            className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              symmetry === 'none' ? 'bg-[#D6AD60] text-[#10172D]' : 'bg-[#10172D] text-[#FFF5DE]/70'
            }`}
          >
            Free
          </button>
          <button
            onClick={() => setSymmetry('4')}
            className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              symmetry === '4' ? 'bg-[#D6AD60] text-[#10172D]' : 'bg-[#10172D] text-[#FFF5DE]/70'
            }`}
          >
            4-Fold
          </button>
          <button
            onClick={() => setSymmetry('8')}
            className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              symmetry === '8' ? 'bg-[#D6AD60] text-[#10172D]' : 'bg-[#10172D] text-[#FFF5DE]/70'
            }`}
          >
            8-Fold ✨
          </button>
        </div>

        {/* Stamps */}
        <div className="flex items-center gap-1">
          <span className="text-[#F4D995] font-semibold text-[11px] hidden sm:inline">Stamps:</span>
          {STAMPS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                audioManager.playClickSound();
                setSelectedStamp(s.id);
                setActiveTool('stamp');
              }}
              title={s.label}
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all cursor-pointer ${
                activeTool === 'stamp' && selectedStamp === s.id
                  ? 'bg-[#D6AD60] scale-110 shadow-sm'
                  : 'bg-[#10172D] hover:bg-[#D6AD60]/20'
              }`}
            >
              <span>{s.icon}</span>
            </button>
          ))}
        </div>

        {/* Brush Size Slider */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <span className="text-[#F4D995] text-[11px]">Size:</span>
          <input
            type="range"
            min="2"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20 accent-[#D6AD60] cursor-pointer"
          />
        </div>
      </div>

      {/* Save & Download Action Button */}
      <button
        onClick={handleDownloadAndSave}
        className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl font-bold text-sm text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D6AD60]/20 cursor-pointer"
      >
        <Download className="w-4 h-4 text-[#10172D]" />
        <span>
          {hasSaved
            ? (currentLanguage === 'hi' ? 'रंगोली डाउनलोड हुई (२५ सितारे प्राप्त) ✨' : currentLanguage === 'bn' ? 'আলপনা সংরক্ষিত (২৫ তারা অর্জিত) ✨' : 'Download Rangoli & Earn +25 Stars ⭐')
            : (currentLanguage === 'hi' ? 'रंगोली सहेजें व डाउनलोड करें (+२५ सितारे)' : currentLanguage === 'bn' ? 'আলপনা সংরক্ষণ ও ডাউনলোড (+২৫ তারা)' : 'Save & Download Rangoli (+25 Stars ⭐)')}
        </span>
      </button>
    </div>
  );
};
