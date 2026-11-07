/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, Trophy, RotateCcw, Volume2, Wand2, Music } from 'lucide-react';
import { Language } from '../../utils/translations';
import { awardMelaReward } from '../../data/melaData';
import { audioManager } from '../../utils/audio';

interface FountainTower {
  id: number;
  name: { en: string; hi: string; bn: string };
  color: string;
  glow: string;
  freq: number;
  icon: string;
}

const FOUNTAINS: FountainTower[] = [
  {
    id: 0,
    name: { en: 'Sunehra Anar (Gold)', hi: 'सुनहरा अनार', bn: 'সোনার ফোয়ারা' },
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.6)',
    freq: 392.0, // G4
    icon: '✨',
  },
  {
    id: 1,
    name: { en: 'Panna Jyoti (Emerald)', hi: 'पन्ना ज्योति', bn: 'পান্না জ্যোতি' },
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.6)',
    freq: 440.0, // A4
    icon: '🟢',
  },
  {
    id: 2,
    name: { en: 'Gulabi Chhatra (Ruby)', hi: 'गुलाबी छत्र', bn: 'গোলাপি আতশ' },
    color: '#F43F5E',
    glow: 'rgba(244, 63, 94, 0.6)',
    freq: 523.25, // C5
    icon: '🌸',
  },
  {
    id: 3,
    name: { en: 'Nilam Tara (Sapphire)', hi: 'नीलम तारा', bn: 'নীল তারা' },
    color: '#38BDF8',
    glow: 'rgba(56, 189, 248, 0.6)',
    freq: 587.33, // D5
    icon: '💠',
  },
];

interface FireworkPatternChallengeProps {
  language: Language;
  onRewardUpdate: () => void;
  onNextGame?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
}

export const FireworkPatternChallenge: React.FC<FireworkPatternChallengeProps> = ({
  language,
  onRewardUpdate,
  onNextGame,
}) => {
  const [tab, setTab] = useState<'challenge' | 'freeplay'>('challenge');

  // Pattern challenge state
  const [round, setRound] = useState<number>(1); // 1 (3 steps), 2 (4 steps), 3 (5 steps)
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [isPlayingSeq, setIsPlayingSeq] = useState<boolean>(false);
  const [activeFountainId, setActiveFountainId] = useState<number | null>(null);
  const [challengeWon, setChallengeWon] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Audio tone synth using Web Audio API for melodic fountain frequencies
  const playFountainTone = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // Audio fallback
      audioManager.playBellChime();
    }
  };

  // Launch particle fountain
  const spawnFountainParticles = (towerIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    const towerX = (width / 5) * (towerIdx + 1);
    const towerY = height - 40;
    const color = FOUNTAINS[towerIdx].color;

    for (let i = 0; i < 35; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.7;
      const speed = Math.random() * 7 + 4;
      particlesRef.current.push({
        x: towerX,
        y: towerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        size: Math.random() * 3.5 + 2,
      });
    }
  };

  // Spawn freeplay burst
  const spawnFreeplayBurst = (x: number, y: number, color?: string) => {
    const chosenColor =
      color || FOUNTAINS[Math.floor(Math.random() * FOUNTAINS.length)].color;
    playFountainTone(400 + Math.random() * 300);

    for (let i = 0; i < 45; i++) {
      const angle = (i * Math.PI * 2) / 45;
      const speed = Math.random() * 6 + 2;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: chosenColor,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        size: Math.random() * 3.5 + 2,
      });
    }
  };

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.fillStyle = 'rgba(10, 15, 36, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render & update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Generate sequence for current round
  const startChallengeRound = (targetRound: number) => {
    const stepsCount = targetRound + 2; // R1: 3 steps, R2: 4 steps, R3: 5 steps
    const newSeq: number[] = [];
    for (let i = 0; i < stepsCount; i++) {
      newSeq.push(Math.floor(Math.random() * 4));
    }

    setRound(targetRound);
    setSequence(newSeq);
    setPlayerInput([]);
    setChallengeWon(false);
    setMessage(
      language === 'hi'
        ? `राउंड ${targetRound}: रोशनी के क्रम को ध्यान से देखें...`
        : language === 'bn'
        ? `রাউন্ড ${targetRound}: আলোর ধারা লক্ষ্য করুন...`
        : `Round ${targetRound}: Watch the fountain sequence...`
    );

    // Playback sequence after short delay
    setTimeout(() => {
      playSequence(newSeq);
    }, 800);
  };

  const playSequence = async (seq: number[]) => {
    setIsPlayingSeq(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const towerId = seq[i];
      setActiveFountainId(towerId);
      spawnFountainParticles(towerId);
      playFountainTone(FOUNTAINS[towerId].freq);
      await new Promise((resolve) => setTimeout(resolve, 450));
      setActiveFountainId(null);
    }
    setIsPlayingSeq(false);
    setMessage(
      language === 'hi'
        ? 'अब आपकी बारी! उसी क्रम में फव्वारों पर टैप करें।'
        : language === 'bn'
        ? 'এবার আপনার পালা! একই ক্রমে ফোয়ারা স্পর্শ করুন।'
        : 'Your turn! Tap the fountains in the exact sequence.'
    );
  };

  const handleTowerClick = (towerId: number) => {
    if (isPlayingSeq || challengeWon) return;

    setActiveFountainId(towerId);
    spawnFountainParticles(towerId);
    playFountainTone(FOUNTAINS[towerId].freq);
    setTimeout(() => setActiveFountainId(null), 300);

    const nextInput = [...playerInput, towerId];
    setPlayerInput(nextInput);

    const stepIndex = nextInput.length - 1;

    // Check if correct so far
    if (nextInput[stepIndex] !== sequence[stepIndex]) {
      // Mistake
      audioManager.playButtonChime();
      setMessage(
        language === 'hi'
          ? 'क्रम टूट गया! पुनः प्रयास कर रहे हैं...'
          : language === 'bn'
          ? 'ভুল হয়েছে! আবার চেষ্টা করুন...'
          : 'Oops! Pattern broke. Let us replay the round...'
      );
      setTimeout(() => {
        startChallengeRound(round);
      }, 1400);
      return;
    }

    // If completed round
    if (nextInput.length === sequence.length) {
      audioManager.playPoojaBell();
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D6AD60', '#F59E0B', '#10B981'],
      });

      if (round < 3) {
        setMessage(
          language === 'hi'
            ? 'शानदार! अगला राउंड अनलॉक...'
            : language === 'bn'
            ? 'চমৎকার! পরের ধাপ আনলক...'
            : 'Brilliant pattern replica! Leveling up...'
        );
        setTimeout(() => {
          startChallengeRound(round + 1);
        }, 1200);
      } else {
        // Complete challenge
        setChallengeWon(true);
        awardMelaReward('firework_challenge', 25, 'eco_sparkler');
        onRewardUpdate();

        confetti({
          particleCount: 100,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#D6AD60', '#F59E0B', '#EF4444', '#10B981', '#38BDF8'],
        });
      }
    }
  };

  // Start on mount
  useEffect(() => {
    startChallengeRound(1);
  }, []);

  return (
    <div className="flex flex-col gap-5 max-w-4xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-amber-500/20 rounded-2xl p-4 backdrop-blur-md">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-amber-300 font-bold flex items-center gap-2">
            <span>🎆</span>
            {language === 'hi'
              ? 'डिजिटल पर्यावरण अनुकूल आतिशबाजी'
              : language === 'bn'
              ? 'ডিজিটাল পরিবেশবান্ধব আতশবাজি'
              : 'Digital Eco-Friendly Fireworks'}
          </h3>
          <p className="text-xs sm:text-sm text-amber-100/70">
            {language === 'hi'
              ? '१००% धुआं-मुक्त, ध्वनि प्रदूषण रहित आनंदमय प्रकाश उत्सव'
              : language === 'bn'
              ? '১০০% ধোঁয়াহীন ও দূষণমুক্ত আনন্দের আলোর উৎসব'
              : '100% smoke-free, zero-pollution digital celebration with harmonious tones'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10">
          <button
            onClick={() => setTab('challenge')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tab === 'challenge'
                ? 'bg-amber-500 text-amber-950 shadow-md font-bold'
                : 'text-amber-200/70 hover:text-amber-200'
            }`}
          >
            {language === 'hi' ? 'पैटर्न चुनौती' : language === 'bn' ? 'প্যাটার্ন খেলা' : 'Pattern Challenge'}
          </button>
          <button
            onClick={() => setTab('freeplay')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              tab === 'freeplay'
                ? 'bg-amber-500 text-amber-950 shadow-md font-bold'
                : 'text-amber-200/70 hover:text-amber-200'
            }`}
          >
            {language === 'hi' ? 'मुक्त आकाश' : language === 'bn' ? 'মুক্ত আকাশ' : 'Free Sky Sparks'}
          </button>
        </div>
      </div>

      {/* Main Firework Canvas Stage */}
      <div className="relative w-full aspect-[16/9] min-h-[360px] bg-gradient-to-b from-[#060a1a] via-[#0d1430] to-[#161c3c] rounded-2xl border-2 border-amber-500/30 overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Sky Canvas for particles */}
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          className="absolute inset-0 w-full h-full object-cover cursor-crosshair touch-none"
          onClick={(e) => {
            if (tab === 'freeplay') {
              const rect = e.currentTarget.getBoundingClientRect();
              const scaleX = 800 / rect.width;
              const scaleY = 450 / rect.height;
              const x = (e.clientX - rect.left) * scaleX;
              const y = (e.clientY - rect.top) * scaleY;
              spawnFreeplayBurst(x, y);
            }
          }}
          onTouchStart={(e) => {
            if (tab === 'freeplay' && e.touches.length > 0) {
              const touch = e.touches[0];
              const rect = e.currentTarget.getBoundingClientRect();
              const scaleX = 800 / rect.width;
              const scaleY = 450 / rect.height;
              const x = (touch.clientX - rect.left) * scaleX;
              const y = (touch.clientY - rect.top) * scaleY;
              spawnFreeplayBurst(x, y);
            }
          }}
        />

        {/* Top prompt bar */}
        <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
          {tab === 'challenge' && (
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/30">
              <span className="text-xs font-semibold text-amber-300">
                {language === 'hi' ? 'राउंड' : language === 'bn' ? 'রাউন্ড' : 'Round'} {round} / 3
              </span>
              <span className="text-white/40">|</span>
              <span className="text-xs text-amber-100/90 font-medium">{message}</span>
            </div>
          )}

          {tab === 'freeplay' && (
            <div className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'hi'
                  ? 'आकाश में कहीं भी क्लिक करें और जादुई रोशनी बिखेरें!'
                  : language === 'bn'
                  ? 'আকাশে স্পর্শ করুন এবং জাদুকরী আলো ছড়ান!'
                  : 'Tap anywhere in the night sky to burst smoke-free fireworks!'}
              </span>
            </div>
          )}

          {tab === 'challenge' && (
            <button
              onClick={() => startChallengeRound(round)}
              className="pointer-events-auto p-1.5 bg-black/50 hover:bg-black/80 text-amber-300 rounded-lg border border-amber-500/30 transition-colors"
              title="Replay Sequence"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Fountain Pedestals at the bottom */}
        <div className="relative z-10 grid grid-cols-4 gap-3 sm:gap-6 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          {FOUNTAINS.map((fountain) => {
            const isActive = activeFountainId === fountain.id;

            return (
              <button
                key={fountain.id}
                onClick={() => handleTowerClick(fountain.id)}
                disabled={isPlayingSeq && tab === 'challenge'}
                className={`relative group flex flex-col items-center justify-end transition-transform active:scale-95 disabled:cursor-not-allowed`}
              >
                {/* Active glow beacon */}
                {isActive && (
                  <div
                    className="absolute -top-16 w-12 h-16 rounded-full blur-md animate-pulse pointer-events-none"
                    style={{ backgroundColor: fountain.glow }}
                  />
                )}

                {/* Pedestal Top Spout */}
                <div
                  className={`w-10 sm:w-14 h-4 rounded-t-lg border-t-2 border-x-2 transition-all ${
                    isActive ? 'scale-110 shadow-lg' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? fountain.color : '#251b14',
                    borderColor: fountain.color,
                    boxShadow: isActive ? `0 0 20px ${fountain.color}` : 'none',
                  }}
                />

                {/* Pedestal Base */}
                <div
                  className={`w-14 sm:w-20 h-10 sm:h-12 rounded-b-xl border flex flex-col items-center justify-center p-1 transition-all ${
                    isActive
                      ? 'bg-amber-950/80 border-amber-300 shadow-lg'
                      : 'bg-black/60 border-amber-500/30 group-hover:border-amber-400'
                  }`}
                >
                  <span className="text-lg">{fountain.icon}</span>
                  <span
                    className="text-[10px] sm:text-xs font-bold truncate max-w-full"
                    style={{ color: fountain.color }}
                  >
                    {fountain.name[language].split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Challenge Victory Modal Overlay */}
        {challengeWon && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-4xl mb-3 shadow-xl shadow-amber-500/50 animate-bounce">
              <Trophy className="w-9 h-9 text-amber-950" />
            </div>

            <h4 className="font-serif text-2xl sm:text-3xl text-amber-300 font-bold mb-1">
              {language === 'hi'
                ? 'अद्भुत! पर्यावरण दीप ज्योति बैज अनलॉक!'
                : language === 'bn'
                ? 'চমৎকার! সবুজ আতশবাজি ব্যাজ আনলক!'
                : 'Eco Sparkler Mastered!'}
            </h4>

            <p className="text-amber-100/90 text-sm sm:text-base max-w-md mb-5 leading-relaxed">
              {language === 'hi'
                ? 'आपने बिना किसी धुआं या प्रदूषण के सभी संगीत व प्रकाश पैटर्न पूरे किए। आपको मिला २५ दिवाली सितारे व "पर्यावरण दीप ज्योति" बैज!'
                : language === 'bn'
                ? 'ধোঁয়াহীন ও দূষণমুক্ত সব আলোক ধারা আপনি সফলভাবে সম্পন্ন করেছেন। ২৫টি তারা ও "সবুজ আতশবাজি" ব্যাজ অর্জিত!'
                : 'You reproduced all the harmonious zero-smoke firework patterns! Unlocked "Eco Sparkler" badge and earned +25 Stars!'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => startChallengeRound(1)}
                className="px-5 py-2.5 rounded-xl border border-amber-500/40 text-amber-200 hover:bg-amber-500/20 text-sm font-medium transition-colors"
              >
                {language === 'hi' ? 'पुनः खेलें' : language === 'bn' ? 'আবার খেলুন' : 'Replay Challenge'}
              </button>

              <button
                onClick={() => {
                  setTab('freeplay');
                  setChallengeWon(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-sm font-medium transition-colors"
              >
                {language === 'hi' ? 'मुक्त आकाश में खेलें' : language === 'bn' ? 'মুক্ত আকাশে খেলুন' : 'Try Free Sky'}
              </button>

              {onNextGame && (
                <button
                  onClick={onNextGame}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
                >
                  {language === 'hi'
                    ? 'रंगोली निर्माता खेलें ➔'
                    : language === 'bn'
                    ? 'আলপনা তৈরি করুন ➔'
                    : 'Next: Rangoli Challenge ➔'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
