/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Flame, RotateCcw, Bell, Moon, CheckCircle2 } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface BandiChhorActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

interface FloatingSarovarDiya {
  id: number;
  x: number;
  y: number;
}

export const BandiChhorActivity: React.FC<BandiChhorActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // Illumination of Amrit Sarovar around Harmandir Sahib
  const [sarovarDiyas, setSarovarDiyas] = useState<FloatingSarovarDiya[]>([
    { id: 1, x: 20, y: 76 },
    { id: 2, x: 40, y: 82 },
    { id: 3, x: 60, y: 80 },
    { id: 4, x: 80, y: 75 },
  ]);
  const [isDarshaniDeoriLit, setIsDarshaniDeoriLit] = useState<boolean>(false);
  const [hasLaunchedFireworks, setHasLaunchedFireworks] = useState<boolean>(false);
  const [hasOfferedParshad, setHasOfferedParshad] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const addSarovarDiya = () => {
    audioManager.playWaterSplashSound();
    setTimeout(() => {
      audioManager.playDiyaLightSound();
    }, 180);

    const newId = Date.now();
    const x = Math.floor(Math.random() * 70) + 15;
    const y = Math.floor(Math.random() * 20) + 70;

    setSarovarDiyas((prev) => [...prev.slice(-9), { id: newId, x, y }]);
    checkCompletion(sarovarDiyas.length + 1, isDarshaniDeoriLit, hasLaunchedFireworks, hasOfferedParshad);
  };

  const handleLightWalkway = () => {
    audioManager.playDiyaLightSound();
    setIsDarshaniDeoriLit(true);
    checkCompletion(sarovarDiyas.length, true, hasLaunchedFireworks, hasOfferedParshad);
  };

  const handleFireworkCelebration = () => {
    audioManager.playFireworkSound();
    setHasLaunchedFireworks(true);
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.4 },
        colors: ['#FFD54F', '#FFC107', '#FFA000', '#FFFDE7'],
      });
    } catch (e) {}
    checkCompletion(sarovarDiyas.length, isDarshaniDeoriLit, true, hasOfferedParshad);
  };

  const handleOfferParshad = () => {
    audioManager.playGurbaniChime();
    setHasOfferedParshad(true);
    checkCompletion(sarovarDiyas.length, isDarshaniDeoriLit, hasLaunchedFireworks, true);
  };

  const checkCompletion = (diyasCount: number, deori: boolean, fireworks: boolean, parshad: boolean) => {
    if (diyasCount >= 6 && deori && fireworks && parshad && !isCompleted) {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 95,
          origin: { y: 0.5 },
          colors: ['#F5A623', '#F4D995', '#D6AD60', '#FFE082'],
        });
      } catch (e) {}
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    audioManager.playClickSound();
    setSarovarDiyas([
      { id: 1, x: 20, y: 76 },
      { id: 2, x: 40, y: 82 },
      { id: 3, x: 60, y: 80 },
      { id: 4, x: 80, y: 75 },
    ]);
    setIsDarshaniDeoriLit(false);
    setHasLaunchedFireworks(false);
    setHasOfferedParshad(false);
    setIsCompleted(false);
  };

  const completedSteps = (sarovarDiyas.length >= 6 ? 1 : 0) + (isDarshaniDeoriLit ? 1 : 0) + (hasLaunchedFireworks ? 1 : 0) + (hasOfferedParshad ? 1 : 0);

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🪔</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'बंदी छोड़ दिवस: स्वर्ण मंदिर अमृत सरोवर दीपोत्सव'
                : currentLanguage === 'bn'
                ? 'বন্দী ছোড় দিবস: স্বর্ণমন্দির অমৃত সরোবরের দীপমালা'
                : 'Bandi Chhor Divas: Golden Temple Illumination'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'दिवाली संग समकालिक सिख मुक्ति पर्व: गुरु हरगोबिन्द साहिब जी व ५২ राजाओं की रिहाई की स्मृति में अमृत सरोवर में दीप तैराएं।'
              : currentLanguage === 'bn'
              ? 'দীপাবলির সমকালীন অনন্য শিখ মুক্তি উৎসব: শ্রীগুরু হরগোবিন্দ জী ও ৫২ জন রাজার মুক্তির স্মরণে অমৃত সরোবরে প্রদীপ ভাসান।'
              : 'A distinct Sikh festival of liberation coinciding with Diwali: commemorating the release of Guru Hargobind Ji & 52 kings by illuminating Sri Harmandir Sahib.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{completedSteps} / 4 {currentLanguage === 'hi' ? 'सेवाएं' : currentLanguage === 'bn' ? 'সেবা' : 'Rituals'}</span>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col justify-between p-3 sm:p-5 bg-gradient-to-b from-[#0A1124] via-[#101D38] to-[#080E1B]">
        {/* Golden Radiance Aura on the Water & Sky */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: 0.25 + (sarovarDiyas.length / 10) * 0.45,
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 79, 0.35) 0%, rgba(181, 83, 42, 0.15) 50%, transparent 80%)',
          }}
        />

        {/* Night Sky with Harmandir Sahib Golden Temple Illustration */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center mt-2">
          {/* Temple Crown SVG */}
          <svg viewBox="0 0 240 120" className="w-48 sm:w-60 md:w-68 h-auto drop-shadow-[0_0_15px_rgba(255,215,79,0.7)]">
            <defs>
              <linearGradient id="goldenTemple" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFF9C4" />
                <stop offset="30%" stopColor="#FFD54F" />
                <stop offset="70%" stopColor="#FFA000" />
                <stop offset="100%" stopColor="#D6AD60" />
              </linearGradient>
            </defs>

            {/* Central Golden Dome (Gumbad) & Kalash */}
            <path d="M 120 10 L 120 4" stroke="#FFF9C4" strokeWidth="2" strokeLinecap="round" />
            <circle cx="120" cy="3" r="2" fill="#FFFFFF" />
            <path d="M 100 35 C 100 15, 140 15, 140 35 Z" fill="url(#goldenTemple)" />

            {/* Side Small Golden Chhatris (4 Pavilions) */}
            <path d="M 75 38 C 75 25, 90 25, 90 38 Z" fill="url(#goldenTemple)" />
            <path d="M 150 38 C 150 25, 165 25, 165 38 Z" fill="url(#goldenTemple)" />

            {/* Upper Storey & Ornate Jharokhas */}
            <rect x="65" y="38" width="110" height="30" fill="url(#goldenTemple)" rx="2" />
            <rect x="75" y="44" width="14" height="18" fill="#141E34" rx="2" />
            <rect x="98" y="42" width="44" height="22" fill="#141E34" rx="3" />
            <rect x="151" y="44" width="14" height="18" fill="#141E34" rx="2" />

            {/* Parapet Railing & Inscriptions */}
            <line x1="60" y1="68" x2="180" y2="68" stroke="#FFF9C4" strokeWidth="2" />

            {/* Ground Level Marble Platform (Sanctum) */}
            <rect x="50" y="68" width="140" height="38" fill="url(#goldenTemple)" />
            {/* Doors on all four sides (Signifying open to all humanity) */}
            <rect x="105" y="74" width="30" height="32" fill="#141E34" rx="2" />
            <rect x="65" y="76" width="22" height="30" fill="#141E34" rx="2" />
            <rect x="153" y="76" width="22" height="30" fill="#141E34" rx="2" />

            {/* Darshani Deori Causeway Bridge leading to temple */}
            {isDarshaniDeoriLit && (
              <g>
                <line x1="20" y1="106" x2="220" y2="106" stroke="#FFE082" strokeWidth="3" />
                <circle cx="50" cy="103" r="2.5" fill="#FFF" className="animate-flame" />
                <circle cx="80" cy="103" r="2.5" fill="#FFF" className="animate-flame" />
                <circle cx="160" cy="103" r="2.5" fill="#FFF" className="animate-flame" />
                <circle cx="190" cy="103" r="2.5" fill="#FFF" className="animate-flame" />
              </g>
            )}
          </svg>
        </div>

        {/* The Sacred Amrit Sarovar (Pool of Nectar) with Floating Lamps */}
        <div className="relative w-full h-32 sm:h-38 rounded-2xl overflow-hidden mt-2 bg-gradient-to-b from-[#0B152B] via-[#0D1D3A] to-[#070D18] border border-[#D6AD60]/40 shadow-inner">
          {/* Subtle Golden Temple Water Reflection */}
          <div className="absolute inset-x-0 top-0 h-16 pointer-events-none opacity-40 bg-gradient-to-b from-[#FFD54F]/30 to-transparent blur-sm" />

          {/* Floating Sarovar Diyas */}
          {sarovarDiyas.map((diya) => (
            <div
              key={diya.id}
              style={{
                position: 'absolute',
                left: `${diya.x}%`,
                top: `${diya.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => {
                audioManager.playDiyaLightSound();
                try {
                  confetti({ particleCount: 15, spread: 35, origin: { y: 0.8 } });
                } catch (e) {}
              }}
              className="group cursor-pointer transition-transform hover:scale-125"
            >
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-3.5 rounded-full bg-[#FFE082] shadow-[0_0_12px_#FFD54F] animate-flame" />
                <ellipse cx="6" cy="3" rx="7" ry="2.5" fill="#B58E3D" className="shadow-md" />
              </div>
            </div>
          ))}

          <div className="absolute bottom-2 left-3 text-[10px] sm:text-xs text-[#F4D995]/80 italic flex items-center gap-1">
            <span>✨</span>
            <span>{currentLanguage === 'hi' ? 'पवित्र अमृत सरोवर दीपमाला' : currentLanguage === 'bn' ? 'পবিত্র অমৃত সরোবর দীপমালা' : 'Sacred Amrit Sarovar Deepmala'}</span>
          </div>
        </div>

        {/* Bottom Interactive Bar */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D6AD60]/20 bg-[#10172D]/85 backdrop-blur-md px-3 py-2 rounded-2xl">
          {/* Add Floating Diya & Light Walkway */}
          <div className="flex items-center gap-2">
            <button
              onClick={addSarovarDiya}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#192747] border border-[#D6AD60]/40 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>🪔</span>
              <span>{currentLanguage === 'hi' ? 'सरोवर में दीप तैराएं' : currentLanguage === 'bn' ? 'সরোবরে প্রদীপ ভাসান' : 'Float Sarovar Diya'}</span>
              <span className="text-[10px] text-[#FFB347] font-bold">({sarovarDiyas.length})</span>
            </button>

            <button
              onClick={handleLightWalkway}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                isDarshaniDeoriLit
                  ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isDarshaniDeoriLit ? (currentLanguage === 'hi' ? 'परिक्रमा मार्ग रोशन' : currentLanguage === 'bn' ? 'পরিক্রমা পথ উদ্ভাসিত' : 'Walkway Lit') : (currentLanguage === 'hi' ? 'परिक्रमा मार्ग रोशन करें' : currentLanguage === 'bn' ? 'পরিক্রমা পথ আলো করুন' : 'Light Walkway')}</span>
            </button>
          </div>

          {/* Fireworks & Karah Parshad */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOfferParshad}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                hasOfferedParshad
                  ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
              }`}
            >
              <span>🍯</span>
              <span>{hasOfferedParshad ? (currentLanguage === 'hi' ? 'कड़ाह प्रसाद समर्पित' : currentLanguage === 'bn' ? 'কড়াহ প্রসাদ নিবেদিত' : 'Parshad Offered') : (currentLanguage === 'hi' ? 'कड़ाह प्रसाद' : currentLanguage === 'bn' ? 'কড়াহ প্রসাদ' : 'Karah Parshad')}</span>
            </button>

            <button
              onClick={handleFireworkCelebration}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D] hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>🎆</span>
              <span>{currentLanguage === 'hi' ? 'आतिशबाजी' : currentLanguage === 'bn' ? 'আতশবাজি' : 'Fireworks'}</span>
            </button>
          </div>
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">✨🪔🎆</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'लाख-लाख वधाइयां! बंदी छोड़ दिवस सम्पन्न!'
                  : currentLanguage === 'bn'
                  ? 'লাখ লাখ শুভেচ্ছা! বন্দী ছোড় দিবস সম্পন্ন!'
                  : 'Bandi Chhor Divas Deepmala Radiant!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'अमृत सरोवर और श्री हरिमंदिर साहिब की पावन आभा से सारा संसार आलोकित हो उठा है। गुरु साहिब का त्याग, सत्य और निष्ठा आपके जीवन को प्रेरणा दे।'
                  : currentLanguage === 'bn'
                  ? 'স্বর্ণমন্দিরের পবিত্র অমৃত সরোবর আলোকমালায় ভাস্বর হয়ে উঠেছে। গুরু হরগোবিন্দ জির ন্যায় ও মানবতার আশীর্বাদ আপনার সঙ্গে থাকুক।'
                  : 'The sacred Amrit Sarovar and Sri Harmandir Sahib shine in celestial golden glow. May truth, freedom, and divine grace fill your home.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'सरोवर दर्शन' : currentLanguage === 'bn' ? 'সরোবর দর্শন' : 'View Sarovar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {currentLanguage === 'hi'
          ? 'पंजाब का बंदी छोड़ दिवस: सरोवर में दीप तैराएं, परिक्रमा मार्ग रोशन करें और कड़ाह प्रसाद ग्रहण करें।'
          : currentLanguage === 'bn'
          ? 'পাঞ্জাবের বন্দী ছোড় দিবস: সরোবরে প্রদীপ ভাসান এবং স্বর্ণমন্দিরের পবিত্র আলোকমালা দর্শন করুন।'
          : 'Float sacred lamps on the Amrit Sarovar, illuminate the walkway, and launch fireworks in Punjab.'}
      </div>
    </div>
  );
};
