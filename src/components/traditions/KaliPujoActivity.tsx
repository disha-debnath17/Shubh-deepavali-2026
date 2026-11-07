/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Music, Bell, Heart, Flame } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';

interface KaliPujoActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

interface FlowerItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export const KaliPujoActivity: React.FC<KaliPujoActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [offeredFlowers, setOfferedFlowers] = useState<FlowerItem[]>([
    { id: 1, x: 42, y: 70, rotation: 12, scale: 0.9 },
    { id: 2, x: 58, y: 72, rotation: -18, scale: 0.95 },
  ]);
  const [isDhunachiLit, setIsDhunachiLit] = useState<boolean>(true);
  const [hasOfferedPranam, setHasOfferedPranam] = useState<boolean>(false);
  const [isDhakPlaying, setIsDhakPlaying] = useState<boolean>(false);

  const handleOfferFlower = (customPos?: { x: number; y: number }) => {
    audioManager.playChopdaStampSound();
    const x = customPos ? customPos.x : 35 + Math.random() * 30;
    const y = customPos ? customPos.y : 64 + Math.random() * 18;
    const newFlower: FlowerItem = {
      id: Date.now() + Math.random(),
      x,
      y,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    };
    setOfferedFlowers((prev) => [...prev, newFlower]);
    if (offeredFlowers.length >= 8 && onComplete) {
      onComplete();
    }
  };

  useEffect(() => {
    return () => {
      audioManager.stopDhakSound();
      audioManager.stopShankhSound();
    };
  }, []);

  const handleBlowShankh = () => {
    audioManager.playShankhSound();
  };

  const handlePlayDhak = () => {
    if (isDhakPlaying) {
      audioManager.stopDhakSound();
      setIsDhakPlaying(false);
    } else {
      setIsDhakPlaying(true);
      audioManager.playDhakBeat();
      // Reset indicator after the dhak rhythm finishes or allow manual toggle
      setTimeout(() => setIsDhakPlaying(false), 12000);
    }
  };

  const handleRingBell = () => {
    audioManager.playTempleBellSound();
  };

  const handlePranam = () => {
    audioManager.playSparkleSound();
    audioManager.playTempleBellSound();
    setHasOfferedPranam(true);
    if (onComplete) onComplete();
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Description */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌺</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'महाकाली पूजन व श्यामा संगीत'
                : currentLanguage === 'bn'
                ? 'নিশিরাতে শ্যামাপূজা ও শাঁখ-ঢাকের ধ্বনি'
                : 'Midnight Kali Puja & Sacred Reverence'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'लाल गुड़हल के पुष्प अर्पित करें, धूप जलाएं और शंख व ढाक की ध्वनि का अनुभव करें (कुछ विधियों में १०८ गुड़हल अर्पित होते हैं; घरों व मंदिरों में प्रथाएं भिन्न हैं)।'
              : currentLanguage === 'bn'
              ? 'মায়ের শ্রীচরণে রক্তজবা নিবেদন করুন ও শাঁখ-ঢাকের ধ্বনি শুনুন (কিছু বিধানে ১০৮টি জবা নিবেদনের প্রথা রয়েছে; গৃহ ও মন্দিরভেদে প্রথা ভিন্ন হয়)।'
              : 'Offer sacred red hibiscus (jaba phool), light incense, and hear Shankh and Dhak (some rituals include 108 hibiscus flowers; practices differ by household and temple).'}
          </p>
        </div>

        {/* Flower Count Badge */}
        <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
          <span className="text-rose-400">🌺</span>
          <span>{offeredFlowers.length} {currentLanguage === 'hi' ? 'पुष्प अर्पित' : currentLanguage === 'bn' ? 'জবা নিবেদিত' : 'Flowers Offered'}</span>
        </div>
      </div>

      {/* Main Kali Pujo Sanctum Canvas */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Kali Puja Altar floor (click or press Enter/Space to offer red hibiscus flowers)"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOfferFlower();
          }
        }}
        className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex items-center justify-center p-4 bg-gradient-to-b from-[#180B22] via-[#10142B] to-[#0A0D1B] focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          if (y > 45) {
            handleOfferFlower({ x, y });
          }
        }}
      >
        {/* Sacred Crimson & Gold Backlit Radiance */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 35%, rgba(181, 40, 42, 0.45) 0%, rgba(245, 166, 35, 0.25) 40%, transparent 75%)',
          }}
        />

        {/* Traditional Hanging Marigold and Mango Leaf Garlands on Top */}
        <svg viewBox="0 0 800 120" className="absolute top-0 left-0 right-0 w-full h-16 pointer-events-none z-10">
          <path d="M 0 10 Q 200 65 400 10 Q 600 65 800 10" fill="none" stroke="#F5A623" strokeWidth="6" strokeLinecap="round" />
          <path d="M 0 10 Q 200 75 400 10 Q 600 75 800 10" fill="none" stroke="#B5532A" strokeWidth="3" strokeDasharray="6 6" />
          {[50, 150, 250, 350, 450, 550, 650, 750].map((cx, i) => (
            <circle key={i} cx={cx} cy={25 + Math.sin(i) * 12} r="7" fill="#F4D995" />
          ))}
        </svg>

        {/* Central Divine Sanctum Altar Silhouette */}
        <div className="relative z-20 flex flex-col items-center justify-end w-full h-full pb-4 pointer-events-none">
          {/* Glowing Divine Aura and Sacred Diya / Lotus Sanctum */}
          <div className="relative flex flex-col items-center mb-6">
            <div className="w-48 sm:w-60 h-48 sm:h-60 rounded-full bg-radial from-[#FFB347]/30 via-[#B5282A]/20 to-transparent blur-xl animate-aura pointer-events-none" />

            {/* Sacred Lotus Altar Platform */}
            <div className="absolute bottom-0 flex flex-col items-center">
              <svg viewBox="0 0 120 70" className="w-24 sm:w-32 h-auto drop-shadow-xl">
                <ellipse cx="60" cy="55" rx="50" ry="12" fill="#D6AD60" stroke="#823617" strokeWidth="1.5" />
                <ellipse cx="60" cy="52" rx="44" ry="9" fill="#F4D995" />
                <path d="M 35 48 C 35 32, 60 20, 60 20 C 60 20, 85 32, 85 48 Z" fill="#B5282A" opacity="0.9" />
                <circle cx="60" cy="36" r="6" fill="#F4D995" />
              </svg>

              <span className="font-royal text-xs sm:text-sm font-bold text-[#F4D995] tracking-widest mt-1 text-center drop-shadow">
                {currentLanguage === 'hi' ? 'मां दक्षिणेश्वर काली' : currentLanguage === 'bn' ? 'মা ভবতারিণী' : 'Divine Mother Kali'}
              </span>
            </div>
          </div>

          {/* Dhunachi (Incense Burner) on Left Altar */}
          <div className="absolute left-6 sm:left-14 bottom-10 flex flex-col items-center pointer-events-none">
            {isDhunachiLit && (
              <div className="relative w-8 h-16 flex items-center justify-center">
                <span className="w-1.5 h-12 bg-gradient-to-t from-white/30 to-transparent blur-xs animate-pulse" />
              </div>
            )}
            <svg viewBox="0 0 60 70" className="w-10 sm:w-14 h-auto drop-shadow-md">
              <path d="M 10 20 L 50 20 L 38 48 L 22 48 Z" fill="#B5532A" stroke="#5A240E" strokeWidth="1" />
              <rect x="26" y="48" width="8" height="16" fill="#823617" />
              <ellipse cx="30" cy="64" rx="14" ry="4" fill="#B5532A" />
              <ellipse cx="30" cy="20" rx="20" ry="6" fill="#FFB347" opacity="0.8" />
            </svg>
            <span className="text-[9px] text-[#F4D995]/80 mt-1">{currentLanguage === 'bn' ? 'ধূনূচি' : 'Dhunachi'}</span>
          </div>

          {/* Brass Samai Diya on Right Altar */}
          <div className="absolute right-6 sm:right-14 bottom-10 flex flex-col items-center pointer-events-none">
            <svg viewBox="0 0 60 85" className="w-10 sm:w-14 h-auto drop-shadow-md">
              <path d="M 30 6 C 26 14, 24 20, 26 26 C 28 30, 32 30, 34 26 C 36 20, 34 14, 30 6 Z" fill="#FFE082" className="animate-flame origin-bottom" />
              <ellipse cx="30" cy="30" rx="14" ry="4" fill="#D6AD60" />
              <rect x="28" y="32" width="4" height="42" fill="#D6AD60" />
              <ellipse cx="30" cy="74" rx="18" ry="6" fill="#B58E3D" />
            </svg>
            <span className="text-[9px] text-[#F4D995]/80 mt-1">{currentLanguage === 'bn' ? 'প্রদীপ' : 'Diya'}</span>
          </div>

          {/* Render All Offered Red Hibiscus Flowers */}
          {offeredFlowers.map((f) => (
            <div
              key={f.id}
              style={{
                position: 'absolute',
                left: `${f.x}%`,
                top: `${f.y}%`,
                transform: `translate(-50%, -50%) rotate(${f.rotation}deg) scale(${f.scale})`,
              }}
              className="pointer-events-none transition-all duration-300 animate-fade-in"
            >
              <svg viewBox="0 0 60 60" className="w-8 sm:w-11 h-8 sm:h-11 drop-shadow-lg">
                {[0, 72, 144, 216, 288].map((angle, idx) => (
                  <path
                    key={idx}
                    d="M 30 30 C 20 16, 12 8, 30 2 C 48 8, 40 16, 30 30 Z"
                    fill="url(#hibiscusRedGrad)"
                    transform={`rotate(${angle} 30 30)`}
                  />
                ))}
                <circle cx="30" cy="30" r="4.5" fill="#FFE082" />
                <path d="M 30 30 L 30 18" stroke="#FFE082" strokeWidth="2" strokeLinecap="round" />
                <circle cx="30" cy="18" r="2.5" fill="#FFF5DE" />
              </svg>
            </div>
          ))}

          {/* Altar Tap Hint */}
          <div className="relative z-30 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D6AD60]/40 text-[10px] sm:text-[11px] text-[#F4D995] flex items-center gap-1.5 shadow-md">
            <span>👉</span>
            <span>{currentLanguage === 'hi' ? 'नीचे चौखट पर छूकर लाल गुड़हल अर्पित करें' : currentLanguage === 'bn' ? 'মায়ের চরণে রক্তজবা নিবেদন করতে নিচে স্পর্শ করুন' : 'Tap altar floor to offer red hibiscus flowers'}</span>
          </div>
        </div>

        {/* Global SVG Gradients */}
        <svg className="absolute w-0 h-0">
          <defs>
            <radialGradient id="hibiscusRedGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D32F2F" />
              <stop offset="70%" stopColor="#B71C1C" />
              <stop offset="100%" stopColor="#7F0000" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Interactive Sound & Ritual Action Bar */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3.5">
        {/* Button 1: Offer Flower */}
        <button
          type="button"
          onClick={() => handleOfferFlower()}
          className="min-h-[48px] p-2.5 sm:p-3 rounded-2xl border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#FFF5DE] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
        >
          <span className="text-lg group-hover:scale-120 transition-transform">🌺</span>
          <div className="text-left">
            <div className="text-xs font-bold text-[#F4D995]">
              {currentLanguage === 'hi' ? 'पुष्प अर्पित करें' : currentLanguage === 'bn' ? 'জবা নিবেদন' : 'Offer Hibiscus'}
            </div>
            <div className="text-[10px] text-[#FFF5DE]/70">{currentLanguage === 'bn' ? 'রক্তজবা অঞ্জলি' : 'Jaba Phool'}</div>
          </div>
        </button>

        {/* Button 2: Blow Sacred Shankh */}
        <button
          type="button"
          onClick={handleBlowShankh}
          className="min-h-[48px] p-2.5 sm:p-3 rounded-2xl border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#FFF5DE] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
        >
          <span className="text-lg group-hover:scale-120 transition-transform">🐚</span>
          <div className="text-left">
            <div className="text-xs font-bold text-[#F4D995]">
              {currentLanguage === 'hi' ? 'शंख ध्वनि' : currentLanguage === 'bn' ? 'শাঁখের ধ্বনি' : 'Blow Shankh'}
            </div>
            <div className="text-[10px] text-[#FFF5DE]/70">{currentLanguage === 'bn' ? 'পবিত্র শাঁখ বাজান' : 'Sacred Conch'}</div>
          </div>
        </button>

        {/* Button 3: Play Festive Dhak */}
        <button
          type="button"
          onClick={handlePlayDhak}
          aria-pressed={isDhakPlaying}
          className={`min-h-[48px] p-2.5 sm:p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none ${
            isDhakPlaying
              ? 'border-[#D6AD60] bg-[#D6AD60]/25 text-[#F4D995] animate-pulse'
              : 'border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#FFF5DE]'
          }`}
        >
          <span className="text-lg group-hover:scale-120 transition-transform">🥁</span>
          <div className="text-left">
            <div className="text-xs font-bold text-[#F4D995]">
              {currentLanguage === 'hi' ? 'उत्सव का ढाक' : currentLanguage === 'bn' ? 'পূজোর ঢাক' : 'Play Dhak'}
            </div>
            <div className="text-[10px] text-[#FFF5DE]/70">{currentLanguage === 'bn' ? 'ঐতিহ্যবাহী বোল' : 'Festive Drum'}</div>
          </div>
        </button>

        {/* Button 4: Offer Pranam */}
        <button
          type="button"
          onClick={handlePranam}
          className="min-h-[48px] p-2.5 sm:p-3 rounded-2xl border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#FFF5DE] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
        >
          <span className="text-lg group-hover:scale-120 transition-transform">🙏</span>
          <div className="text-left">
            <div className="text-xs font-bold text-[#F4D995]">
              {currentLanguage === 'hi' ? 'श्रद्धा प्रणाम' : currentLanguage === 'bn' ? 'ভক্তিভরে প্রণাম' : 'Offer Pranam'}
            </div>
            <div className="text-[10px] text-[#FFF5DE]/70">{currentLanguage === 'bn' ? 'আশীর্বাদ গ্রহণ' : 'Reverence'}</div>
          </div>
        </button>
      </div>

      {/* Pranam Blessing Banner */}
      {hasOfferedPranam && (
        <div className="w-full mt-3 p-3 rounded-2xl bg-[#192747]/90 border border-[#D6AD60] text-center animate-fade-in space-y-1">
          <span className="text-xl">✨🙏✨</span>
          <h5 className="font-royal text-sm sm:text-base font-bold text-[#F4D995]">
            {currentLanguage === 'hi'
              ? 'मां का पावन आशीष: भय का नाश, धर्म व शांति का प्रकाश!'
              : currentLanguage === 'bn'
              ? 'মা শ্যামার স্নেহাশিস: সর্ব অশুভ শক্তির বিনাশ ও অন্তরে আলোর উন্মেষ!'
              : 'Mother’s Sacred Blessing: Freedom from fear, ignorance, and inner darkness.'}
          </h5>
          <p className="text-xs text-[#FFF5DE]/85">
            {currentLanguage === 'hi'
              ? 'शंख और ढाक की मंगल ध्वनि से वातावरण पवित्र हो गया है।'
              : currentLanguage === 'bn'
              ? 'শাঁখ আর ঢাকের বোলে আপনার পূজা পূর্ণতা পেল।'
              : 'The sacred echoes of Shankh and Dhak sanctify your celebration.'}
          </p>
        </div>
      )}
    </div>
  );
};
