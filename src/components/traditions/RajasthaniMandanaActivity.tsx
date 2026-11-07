/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Palette, RotateCcw, Flame, CheckCircle2 } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface RajasthaniMandanaActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

export const RajasthaniMandanaActivity: React.FC<RajasthaniMandanaActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // 5 Mandana layers: 1. Red Geru Wash, 2. Central Chowk Mandala, 3. Dancing Royal Peacocks (Mor), 4. Divine Footprints (Paglya), 5. Brass Deepams & Ghevar
  const [activeLayers, setActiveLayers] = useState<number[]>([1, 2]);
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');
  const [hasOfferedGhevar, setHasOfferedGhevar] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const totalLayers = 5;

  const toggleLayer = (id: number) => {
    audioManager.playSparkleSound();
    setActiveLayers((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      if (next.length === totalLayers && hasOfferedGhevar) {
        checkDone();
      }
      return next;
    });
  };

  const offerGhevar = () => {
    audioManager.playMithaiRevealSound();
    setHasOfferedGhevar(true);
    if (activeLayers.length >= 4) {
      checkDone();
    }
  };

  const drawAllMandana = () => {
    audioManager.playSparkleSound();
    setActiveLayers([1, 2, 3, 4, 5]);
    setHasOfferedGhevar(true);
    checkDone();
  };

  const checkDone = () => {
    setIsCompleted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#D6AD60', '#B5532A', '#FFF5DE', '#F4D995'],
      });
    } catch (e) {}
    if (onComplete) onComplete();
  };

  const handleReset = () => {
    audioManager.playClickSound();
    setActiveLayers([1, 2]);
    setHasOfferedGhevar(false);
    setIsCompleted(false);
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🦚</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'राजस्थानी मांडणा लोककला एवं हवेली दीपोत्सव'
                : currentLanguage === 'bn'
                ? 'রাজস্থানী মাণ্ডনা লোকশিল্প ও হাভেলি দীপমালা'
                : 'Rajasthani Mandana Art & Haveli Deepotsav'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'गेरू व चूने से पवित्र मांडणा चौक उकेरें, मोर व पगलिया सजाएं और शाही घेवर का भोग लगाएं।'
              : currentLanguage === 'bn'
              ? 'গেরু মাটির ওপর শুভ্র চুন দিয়ে মাণ্ডনার নকশা আঁকুন, ময়ূর ও চরণ সাজিয়ে ঘেবরের ভোগ নিবেদন করুন।'
              : 'Paint sacred geometric Mandana motifs with white lime paste on terracotta Geru and place royal deepams.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{activeLayers.length} / {totalLayers} {currentLanguage === 'hi' ? 'तत्व' : currentLanguage === 'bn' ? 'উপাদান' : 'Motifs'}</span>
          </div>

          <button
            onClick={activeLayers.length === totalLayers && hasOfferedGhevar ? handleReset : drawAllMandana}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {activeLayers.length === totalLayers && hasOfferedGhevar ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
                <span>{currentLanguage === 'hi' ? 'संपूर्ण मांडणा बनाएं' : currentLanguage === 'bn' ? 'সম্পূর্ণ আঁকুন' : 'Complete All'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#1E120C] via-[#2A180E] to-[#120B07]">
        {/* Authentic Rajasthani Terracotta Geru Mud-Washed Floor Texture */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #A84C24 1.5px, transparent 1.5px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Ambient Warm Rajasthani Haveli Glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: 0.2 + (activeLayers.length / totalLayers) * 0.5,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(245, 166, 35, 0.45) 0%, rgba(181, 83, 42, 0.3) 60%, transparent 85%)',
          }}
        />

        {/* Center: The Mandana Sacred Geometry SVG */}
        <div className="relative z-10 my-auto w-full max-w-md mx-auto flex items-center justify-center">
          <svg viewBox="0 0 300 240" className="w-64 sm:w-80 md:w-96 h-auto drop-shadow-2xl">
            {/* Red Geru Base Octagon Mat */}
            {activeLayers.includes(1) && (
              <polygon
                points="75,10 225,10 290,75 290,165 225,230 75,230 10,165 10,75"
                fill="#823617"
                stroke="#D6AD60"
                strokeWidth="2"
              />
            )}

            {/* Central Sacred Chowk Geometry (Chalk White & Gold) */}
            {activeLayers.includes(2) && (
              <g className="animate-fade-in">
                {/* Concentric diamonds */}
                <polygon points="150,40 230,120 150,200 70,120" fill="none" stroke="#FFFFFF" strokeWidth="3" />
                <polygon points="150,60 210,120 150,180 90,120" fill="none" stroke="#F4D995" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="150,80 190,120 150,160 110,120" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeWidth="2.5" />
                {/* Auspicious Crosslines & Central Lotus */}
                <line x1="70" y1="120" x2="230" y2="120" stroke="#FFFFFF" strokeWidth="1.5" />
                <line x1="150" y1="40" x2="150" y2="200" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="150" cy="120" r="14" fill="#D6AD60" />
                <circle cx="150" cy="120" r="7" fill="#FFFFFF" />
              </g>
            )}

            {/* Dancing Royal Peacocks (Mor) Motifs */}
            {activeLayers.includes(3) && (
              <g className="animate-fade-in">
                {/* Left Peacock */}
                <path d="M 40 100 Q 30 70 50 65 Q 65 65 60 90 Q 55 110 40 100 Z" fill="#26A69A" opacity="0.9" />
                <circle cx="50" cy="62" r="5" fill="#FFE082" />
                <path d="M 45 58 Q 42 50 48 50 Q 52 50 50 58" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                {/* Right Peacock */}
                <path d="M 260 100 Q 270 70 250 65 Q 235 65 240 90 Q 245 110 260 100 Z" fill="#26A69A" opacity="0.9" />
                <circle cx="250" cy="62" r="5" fill="#FFE082" />
                <path d="M 255 58 Q 258 50 252 50 Q 248 50 250 58" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
              </g>
            )}

            {/* Sacred Divine Footsteps (Paglya) welcoming Goddess Lakshmi */}
            {activeLayers.includes(4) && (
              <g className="animate-fade-in">
                {/* Left Footstep */}
                <ellipse cx="140" cy="145" rx="5" ry="9" fill="#FFFFFF" />
                <circle cx="137" cy="133" r="2" fill="#FFFFFF" />
                <circle cx="140" cy="132" r="2" fill="#FFFFFF" />
                <circle cx="143" cy="133" r="2" fill="#FFFFFF" />
                {/* Right Footstep */}
                <ellipse cx="160" cy="140" rx="5" ry="9" fill="#FFFFFF" />
                <circle cx="157" cy="128" r="2" fill="#FFFFFF" />
                <circle cx="160" cy="127" r="2" fill="#FFFFFF" />
                <circle cx="163" cy="128" r="2" fill="#FFFFFF" />
              </g>
            )}

            {/* Corner Rajasthani Brass Deepams */}
            {activeLayers.includes(5) && (
              <g className="animate-flame origin-bottom">
                {/* Top-Left Diya */}
                <circle cx="75" cy="25" r="8" fill="rgba(255, 179, 71, 0.6)" filter="blur(3px)" />
                <ellipse cx="75" cy="30" rx="10" ry="4" fill="#D6AD60" />
                <circle cx="75" cy="22" r="3.5" fill="#FFE082" />
                {/* Top-Right Diya */}
                <circle cx="225" cy="25" r="8" fill="rgba(255, 179, 71, 0.6)" filter="blur(3px)" />
                <ellipse cx="225" cy="30" rx="10" ry="4" fill="#D6AD60" />
                <circle cx="225" cy="22" r="3.5" fill="#FFE082" />
                {/* Bottom-Left Diya */}
                <circle cx="75" cy="215" r="8" fill="rgba(255, 179, 71, 0.6)" filter="blur(3px)" />
                <ellipse cx="75" cy="220" rx="10" ry="4" fill="#D6AD60" />
                <circle cx="75" cy="212" r="3.5" fill="#FFE082" />
                {/* Bottom-Right Diya */}
                <circle cx="225" cy="215" r="8" fill="rgba(255, 179, 71, 0.6)" filter="blur(3px)" />
                <ellipse cx="225" cy="220" rx="10" ry="4" fill="#D6AD60" />
                <circle cx="225" cy="212" r="3.5" fill="#FFE082" />
              </g>
            )}
          </svg>
        </div>

        {/* Bottom Interactive Motif Selection & Ghevar Sweet */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D6AD60]/20 bg-[#10172D]/85 backdrop-blur-md px-3 py-2 rounded-2xl">
          {/* Motifs to toggle */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {[
              { id: 2, label: { en: 'Chowk Mandala', hi: 'पवित्र चौक', bn: 'পবিত্র চক' }, icon: '✨' },
              { id: 3, label: { en: 'Royal Peacocks', hi: 'मोर आकृति', bn: 'ময়ূর মোটিফ' }, icon: '🦚' },
              { id: 4, label: { en: 'Divine Paglya', hi: 'शुभ पगलिया', bn: 'শুভ চরণ' }, icon: '👣' },
              { id: 5, label: { en: 'Brass Deepams', hi: 'हवेली दीप', bn: 'পিতলের প্রদীপ' }, icon: '🪔' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => toggleLayer(m.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  activeLayers.includes(m.id)
                    ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                    : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label[currentLanguage]}</span>
              </button>
            ))}
          </div>

          {/* Offer Royal Ghevar */}
          <div className="flex items-center gap-2">
            <button
              onClick={offerGhevar}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                hasOfferedGhevar
                  ? 'bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D]'
                  : 'bg-[#192747] border-[#D6AD60]/50 text-[#F4D995] hover:bg-[#D6AD60]/20'
              }`}
            >
              <span>🍯</span>
              <span>{hasOfferedGhevar ? (currentLanguage === 'hi' ? 'शाही घेवर समर्पित' : currentLanguage === 'bn' ? 'রাজকীয় ঘেবর নিবেদিত' : 'Ghevar Offered') : (currentLanguage === 'hi' ? 'शाही घेवर भोग' : currentLanguage === 'bn' ? 'রাজকীয় ঘেবর' : 'Offer Ghevar')}</span>
            </button>
          </div>
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">🦚✨🪔</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'खम्मा घणी! राजस्थानी मांडणा सम्पन्न!'
                  : currentLanguage === 'bn'
                  ? 'খান্মা ঘণী! রাজস্থানী মাণ্ডনা সম্পন্ন!'
                  : 'Khamma Ghani! Mandana Art Radiant!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'गेरू व चूने से सजा पारंपरिक मांडणा, मोर पंख, पगलिया और शाही घेवर से आपकी हवेली मां लक्ष्मी के स्वागत हेतु तैयार है। पधारो म्हारे देस!'
                  : currentLanguage === 'bn'
                  ? 'গেরু মাটির ওপর চুন ও রঙের নিখুঁত মাণ্ডনা, ময়ূরের শোভা ও রাজকীয় ঘেবরের মিষ্টান্নে আপনার গৃহ আলোকিত। রাজস্থানের রাজকীয় ঐতিহ্য শুভ হোক।'
                  : 'The traditional Geru Mandana, sacred footprints, dancing peacocks, and royal Ghevar sweet are complete. May royalty and prosperity bless your family.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'मांडणा दर्शन' : currentLanguage === 'bn' ? 'মাণ্ডনা দর্শন' : 'View Mandana'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {currentLanguage === 'hi'
          ? 'राजस्थानी मांडणा: तत्वों को छूकर पवित्र चौक, मोर और पगलिया बनाएं और शाही घेवर का भोग लगाएं।'
          : currentLanguage === 'bn'
          ? 'মাণ্ডনা শিল্প: মোটিফ স্পর্শ করে ক্যানভাস সাজান এবং রাজস্থানী ঘেবরের ভোগ নিবেদন করুন।'
          : 'Tap motifs to draw the sacred Rajasthani Mandana courtyard and offer royal Ghevar.'}
      </div>
    </div>
  );
};
