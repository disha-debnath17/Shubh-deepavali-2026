/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Gift, Check, RotateCcw, Heart, Utensils } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface FaralPlatterActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

interface FaralItem {
  id: string;
  name: { en: string; hi: string; bn: string };
  marathi: string;
  taste: { en: string; hi: string; bn: string };
  desc: { en: string; hi: string; bn: string };
  icon: string;
  badge: { en: string; hi: string; bn: string };
  platePosition: { x: number; y: number; rotation: number };
}

const FARAL_DELICACIES: FaralItem[] = [
  {
    id: 'chakli',
    name: { en: 'Spiced Rice Chakli', hi: 'कुरकुरी चकली', bn: 'মুচমুচে চাকলি' },
    marathi: 'चकली',
    taste: { en: 'Crunchy, spiced with roasted cumin, sesame & ajwain', hi: 'भुने जीरे, तिल व अजवायन की महक संग कुरकुरी', bn: 'জিরে, তিল ও জোয়ানের সুবাসে মুচমুচে' },
    desc: {
      en: 'The spiral king of Faral made from roasted lentils and rice flour (bhajani), pressed through a brass mould.',
      hi: 'भुनी दालों और चावल के आटे (भाजणी) से बनी कांटेदार कुरकुरी चकली।',
      bn: 'ভাজা ডাল ও চালের গুঁড়োর তৈরি মহারাষ্ট্রের ঐতিহ্যবাহী কাঁটাযুক্ত চাকলি।',
    },
    icon: '🌀',
    badge: { en: 'Crisp & Savory', hi: 'नमकीन व खस्ता', bn: 'নোনতা ও মুচমুচে' },
    platePosition: { x: 30, y: 35, rotation: 15 },
  },
  {
    id: 'karanji',
    name: { en: 'Sweet Mawa Karanji', hi: 'शाही करंजी (गुझिया)', bn: 'মিষ্টি করঞ্জি' },
    marathi: 'करंजी',
    taste: { en: 'Crisp flaky crust filled with roasted coconut & cardamom', hi: 'भुने नारियल, खसखस और इलायची से भरी', bn: 'ভাজা নারকেল, পোস্ত ও এলাচের পুরভরা' },
    desc: {
      en: 'Golden crescent pastry filled with freshly desiccated coconut, poppy seeds, and fragrant nutmeg.',
      hi: 'सुनहरी अर्धचंद्राकार करंजी जो मुंह में जाते ही घुल जाती है।',
      bn: 'চাঁদের মতো দেখতে নরম মিষ্টি করঞ্জির অতুলনীয় স্বাদ।',
    },
    icon: '🥟',
    badge: { en: 'Sweet Crescent', hi: 'मीठी करंजी', bn: 'মিষ্টি পদ' },
    platePosition: { x: 70, y: 35, rotation: -20 },
  },
  {
    id: 'shankarpali',
    name: { en: 'Flaky Shankarpali', hi: 'शकरपारे (शंकरपाळी)', bn: 'শঙ্করপালি' },
    marathi: 'शंकरपाळी',
    taste: { en: 'Diamond-cut melt-in-mouth sweetness with pure ghee', hi: 'शुद्ध घी में तली हीरे जैसी कटिंग वाली मिठास', bn: 'খাঁটি ঘিয়ে ভাজা হীরক আকৃতির খাস্তা মিষ্টি' },
    desc: {
      en: 'Delicate dough fried in pure cow ghee to golden perfection—a child’s favourite festive jar snack.',
      hi: 'देसी घी में तली कुरकुरी शंकरपाळी जो बच्चों की सबसे प्रिय होती है।',
      bn: 'ঘিয়ে ভাজা টুকরো টুকরো মিষ্টি, যা ছাড়া দীপাবলির আড্ডা অসম্পূর্ণ।',
    },
    icon: '💎',
    badge: { en: 'Melt-in-Mouth', hi: 'घी की मिठास', bn: 'ঘিয়ে ভাজা' },
    platePosition: { x: 26, y: 68, rotation: 40 },
  },
  {
    id: 'besan-laddoo',
    name: { en: 'Pure Ghee Besan Laddoo', hi: 'दानेदार बेसन लाडू', bn: 'বেসন লাড্ডু' },
    marathi: 'बेसन लाडू',
    taste: { en: 'Velvety slow-roasted gram flour with cardamom & almonds', hi: 'धीमी आंच पर भुना देसी घी का दानेदार लड्डू', bn: 'ধিম আঁচে ভাজা সুস্বাদু দানাদার বেসন লাড্ডু' },
    desc: {
      en: 'Gram flour slow-roasted for hours in pure cow ghee until deeply nutty, shaped with love.',
      hi: 'घंटों शुद्ध घी में भूनकर बनाया गया सुगंधित पारंपरिक लाडू।',
      bn: 'বিশুদ্ধ ঘিয়ে অনেকক্ষণ ধরে কষে তৈরি মিষ্টি এলাচি লাড্ডু।',
    },
    icon: '🟡',
    badge: { en: 'Royal Sweet', hi: 'शाही मिष्ठान', bn: 'রাজকীয় লাড্ডু' },
    platePosition: { x: 50, y: 50, rotation: 0 },
  },
  {
    id: 'chivda',
    name: { en: 'Poha Chivda', hi: 'पोहा चिवड़ा', bn: 'পোহার চিবড়া' },
    marathi: 'पोहा चिवडा',
    taste: { en: 'Light, crunchy flattened rice with peanuts & curry leaves', hi: 'मूंगफली, कढ़ी पत्ता और हल्दी का हल्का चिवड़ा', bn: 'চিনাবাদাম ও কারিপাতায় সাজানো হালকা চিবড়া' },
    desc: {
      en: 'Roasted thin beaten rice tossed with golden peanuts, dried coconut slices, green chillies, and mustard seeds.',
      hi: 'कुरकुरा पोहा चिवड़ा जो चाय के साथ हर मराठी घर में परोसा जाता है।',
      bn: 'মুচমুচে চিঁড়ের চিবড়া, যা সকালের চায়ের সঙ্গী হিসেবে সেরা।',
    },
    icon: '🥣',
    badge: { en: 'Savory Delight', hi: 'हल्का नमकीन', bn: 'মুখরোচক' },
    platePosition: { x: 74, y: 68, rotation: -10 },
  },
  {
    id: 'anarsa',
    name: { en: 'Sesame Anarsa', hi: 'खसखस अनारसा', bn: 'তিল আনারসা' },
    marathi: 'अनारसा',
    taste: { en: 'Ancient fermented rice pastry with poppy seeds & jaggery', hi: 'गुड़ और खसखस से बना जालीदार अनारसा', bn: 'গুড় ও পোস্ত দিয়ে তৈরি খাস্তা আনারসা' },
    desc: {
      en: 'A historic delicacy made from rice soaked for days, ground with jaggery, and fried until intricately patterned.',
      hi: 'पारंपरिक विधि से भीगे चावल और गुड़ से तैयार शाही व्यंजन।',
      bn: 'চাল ভিজিয়ে রেখে গুড়ে মেখে অপূর্ব কায়দায় ভাজা প্রাচীন পদ।',
    },
    icon: '🍪',
    badge: { en: 'Traditional Gem', hi: 'प्राचीन धरोहर', bn: 'ঐতিহ্যবাহী পদ' },
    platePosition: { x: 50, y: 22, rotation: 0 },
  },
];

export const FaralPlatterActivity: React.FC<FaralPlatterActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(['chakli', 'karanji', 'besan-laddoo']);
  const [activeItem, setActiveItem] = useState<FaralItem | null>(FARAL_DELICACIES[0]);
  const [isShared, setIsShared] = useState<boolean>(false);

  const toggleItem = (item: FaralItem) => {
    audioManager.playFaralDropSound();
    setActiveItem(item);
    setSelectedItemIds((prev) => {
      const exists = prev.includes(item.id);
      const next = exists ? prev.filter((id) => id !== item.id) : [...prev, item.id];
      if (next.length >= 5 && onComplete) {
        onComplete();
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    audioManager.playFaralDropSound();
    audioManager.playSparkleSound();
    setSelectedItemIds(FARAL_DELICACIES.map((d) => d.id));
    if (onComplete) onComplete();
  };

  const handleShareWithNeighbors = () => {
    audioManager.playSparkleSound();
    setIsShared(true);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D6AD60', '#F5A623', '#FFF5DE', '#B5532A'],
      });
    } catch (e) {}
    if (onComplete) onComplete();
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🍪</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'पारंपरिक दीपोत्सवी फराळ थाली निर्माण'
                : currentLanguage === 'bn'
                ? 'ঐতিহ্যবাহী দিওয়ালি ফারাল থালি সাজানো'
                : 'Crafting the Festive Diwali Faral Platter'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'चकली, करंजी, शंकरपाळी और बेसन के लड्डू से सजी थाली तैयार कर पड़ोसियों में स्नेह बांटें।'
              : currentLanguage === 'bn'
              ? 'মুচমুচে চাকলি, মিষ্টি করঞ্জি ও লাড্ডু ভর্তি রাজকীয় কাঁসার থালি সাজিয়ে সবার সাথে ভাগ করে নিন।'
              : 'Select traditional homemade Maharashtrian snacks onto the royal brass thali and share with loved ones.'}
          </p>
        </div>

        {/* Count & Auto Fill */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
            <span>🍽️</span>
            <span>{selectedItemIds.length} / 6 {currentLanguage === 'hi' ? 'व्यंजन' : currentLanguage === 'bn' ? 'পদ' : 'Snacks'}</span>
          </div>

          <button
            onClick={handleSelectAll}
            className="px-3 py-1.5 rounded-xl text-xs font-medium border border-[#D6AD60]/40 bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#F4D995] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{currentLanguage === 'hi' ? 'पूरी थाली सजाएं' : currentLanguage === 'bn' ? 'সব পদ সাজান' : 'Fill All'}</span>
          </button>
        </div>
      </div>

      {/* Main Royal Brass Thali Canvas */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex items-center justify-center p-4 bg-gradient-to-b from-[#18233C] via-[#10172D] to-[#0A0F1D]">
        {/* Subtle Ambient Golden Glow */}
        <div className="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full bg-radial from-[#F5A623]/20 via-[#D6AD60]/10 to-transparent blur-2xl pointer-events-none" />

        {/* Embossed Royal Brass Thali SVG Plate */}
        <div className="relative w-[300px] sm:w-[380px] md:w-[420px] aspect-square flex items-center justify-center">
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
            {/* Outer Rim Shadow */}
            <circle cx="200" cy="200" r="195" fill="#4A2E18" opacity="0.6" />
            {/* Brass Outer Plate Rim */}
            <circle cx="200" cy="200" r="190" fill="url(#brassRimGrad)" stroke="#7A4C1C" strokeWidth="2" />
            {/* Traditional Engraved Geometric Beads */}
            {Array.from({ length: 36 }).map((_, i) => {
              const a = (i * Math.PI * 2) / 36;
              const x = 200 + Math.cos(a) * 178;
              const y = 200 + Math.sin(a) * 178;
              return <circle key={i} cx={x} cy={y} r="2.5" fill="#FFE082" />;
            })}
            {/* Inner Plate Surface */}
            <circle cx="200" cy="200" r="168" fill="url(#brassBaseGrad)" stroke="#B58E3D" strokeWidth="1.5" />
            {/* Center Engraved Floral Motif */}
            <circle cx="200" cy="200" r="50" fill="none" stroke="#D6AD60" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="25" fill="none" stroke="#F4D995" strokeWidth="1" />

            <defs>
              <linearGradient id="brassRimGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F4D995" />
                <stop offset="35%" stopColor="#D6AD60" />
                <stop offset="70%" stopColor="#8F6220" />
                <stop offset="100%" stopColor="#D6AD60" />
              </linearGradient>
              <radialGradient id="brassBaseGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F4D995" />
                <stop offset="45%" stopColor="#E2B866" />
                <stop offset="85%" stopColor="#B38029" />
                <stop offset="100%" stopColor="#805615" />
              </radialGradient>
            </defs>
          </svg>

          {/* Render Snacks Arranged on the Plate */}
          {FARAL_DELICACIES.map((item) => {
            const isPlaced = selectedItemIds.includes(item.id);
            if (!isPlaced) return null;

            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  left: `${item.platePosition.x}%`,
                  top: `${item.platePosition.y}%`,
                  transform: `translate(-50%, -50%) rotate(${item.platePosition.rotation}deg)`,
                }}
                className="z-20 cursor-pointer transition-transform hover:scale-115 active:scale-95 animate-fade-in"
                onClick={() => setActiveItem(item)}
              >
                {/* Specific Snack Visual SVG */}
                {item.id === 'chakli' && (
                  <svg viewBox="0 0 70 70" className="w-16 sm:w-20 h-auto drop-shadow-md">
                    {/* Golden Spiced Spiraled Chakli with ridges */}
                    <circle cx="35" cy="35" r="32" fill="none" stroke="#B56727" strokeWidth="9" strokeDasharray="2 3" />
                    <circle cx="35" cy="35" r="23" fill="none" stroke="#D9822B" strokeWidth="9" strokeDasharray="2 3" />
                    <circle cx="35" cy="35" r="14" fill="none" stroke="#F5A623" strokeWidth="8" strokeDasharray="2 2" />
                    <circle cx="35" cy="35" r="6" fill="#8C4713" />
                  </svg>
                )}

                {item.id === 'karanji' && (
                  <svg viewBox="0 0 80 50" className="w-18 sm:w-22 h-auto drop-shadow-md">
                    {/* Crescent Flaky Karanji with fluted edge */}
                    <path
                      d="M 8 36 C 14 10, 66 10, 72 36 C 40 46, 20 44, 8 36 Z"
                      fill="#F4D086"
                      stroke="#B5812B"
                      strokeWidth="2"
                    />
                    {/* Fluted crinkled seam */}
                    <path
                      d="M 8 36 C 24 45, 56 45, 72 36"
                      fill="none"
                      stroke="#8C5C15"
                      strokeWidth="2.5"
                      strokeDasharray="2 2.5"
                    />
                  </svg>
                )}

                {item.id === 'shankarpali' && (
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-br from-[#F5DE98] to-[#C9983E] border border-[#8C6017] transform rotate-45 rounded-xs drop-shadow"
                      />
                    ))}
                  </div>
                )}

                {item.id === 'besan-laddoo' && (
                  <svg viewBox="0 0 60 60" className="w-14 sm:w-16 h-auto drop-shadow-md">
                    <circle cx="30" cy="30" r="24" fill="url(#laddooGrad)" stroke="#A06716" strokeWidth="1" />
                    {/* Slivered pistachios & almond bits */}
                    <ellipse cx="26" cy="22" rx="4" ry="2" fill="#558B2F" transform="rotate(-30 26 22)" />
                    <ellipse cx="36" cy="28" rx="3" ry="1.5" fill="#FFE082" />
                    <ellipse cx="24" cy="36" rx="3.5" ry="1.5" fill="#689F38" transform="rotate(45 24 36)" />
                    <defs>
                      <radialGradient id="laddooGrad" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#FFE082" />
                        <stop offset="50%" stopColor="#F5B025" />
                        <stop offset="100%" stopColor="#BD7409" />
                      </radialGradient>
                    </defs>
                  </svg>
                )}

                {item.id === 'chivda' && (
                  <div className="relative w-16 sm:w-20 h-10 flex flex-wrap items-center justify-center p-1 bg-[#D99A38]/30 rounded-full border border-[#D99A38]/50 drop-shadow">
                    <span className="text-xs">🥜</span>
                    <span className="text-[10px] text-[#FFE082] font-mono">🌾🌾</span>
                    <span className="text-[10px] text-emerald-400">🍃</span>
                  </div>
                )}

                {item.id === 'anarsa' && (
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-br from-[#E0A84D] to-[#996216] border border-[#7A4508] p-1 flex items-center justify-center drop-shadow">
                    <div className="w-full h-full border border-dotted border-white/60 rounded-full opacity-80" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Shared Gift Box Overlay if shared */}
        {isShared && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-4xl">🎁✨</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'पड़ोसियों संग फराळ की मिठास बांटी गई!'
                  : currentLanguage === 'bn'
                  ? 'প্রতিবেশীদের সাথে ফারালের আনন্দ ভাগ করে নেওয়া হলো!'
                  : 'Faral Platter Shared with Neighbors & Friends!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? '"दिवाळीच्या फराळाची गोडी आणि आपुलकी" — कोई भी आपके घर से बिना मुंह मीठा किए नहीं जाएगा। स्नेह और खुशहाली का यह बंधन सदा बना रहे!'
                  : currentLanguage === 'bn'
                  ? 'মহারাষ্ট্রের এই সুন্দর আতিথেয়তার ঐতিহ্য আপনার ঘরেও আত্মীয়তা ও সৌহার্দ্যের আলো ছড়িয়ে দিক।'
                  : 'In Maharashtra, no festival is complete until Faral is lovingly exchanged across doorways. May your home always be rich in warm relationships and boundless joy!'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsShared(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'पुनः थाली देखें' : currentLanguage === 'bn' ? 'থালি দেখুন' : 'View Platter'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Selection Palette: Tap to add/remove snacks */}
      <div className="w-full mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {FARAL_DELICACIES.map((delicacy) => {
          const isSelected = selectedItemIds.includes(delicacy.id);
          return (
            <button
              key={delicacy.id}
              onClick={() => toggleItem(delicacy)}
              className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#D6AD60]/20 border-[#D6AD60] shadow-sm'
                  : 'bg-[#192747]/60 border-[#D6AD60]/20 opacity-75 hover:opacity-100 hover:border-[#D6AD60]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base sm:text-lg">{delicacy.icon}</span>
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-[#D6AD60]" />
                ) : (
                  <span className="text-[10px] text-slate-400">+ Add</span>
                )}
              </div>
              <div className="mt-1">
                <div className="text-xs font-bold text-[#F4D995] truncate">
                  {delicacy.name[currentLanguage]}
                </div>
                <div className="text-[10px] text-[#FFF5DE]/60 truncate">
                  {delicacy.marathi} · {delicacy.badge[currentLanguage]}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Action: Detail story and Share button */}
      <div className="w-full mt-3 p-3 rounded-2xl bg-[#192747]/80 border border-[#D6AD60]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        {activeItem && (
          <div className="text-left min-w-0">
            <span className="text-xs font-bold text-[#F4D995] flex items-center gap-1.5">
              <span>{activeItem.icon}</span>
              <span>{activeItem.name[currentLanguage]} ({activeItem.marathi})</span>
            </span>
            <span className="text-[11px] text-[#FFF5DE]/80 block truncate">
              {activeItem.taste[currentLanguage]}
            </span>
          </div>
        )}

        <button
          onClick={handleShareWithNeighbors}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10172D] bg-gradient-to-r from-[#F4D995] to-[#D6AD60] hover:brightness-110 shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Gift className="w-4 h-4 text-[#10172D]" />
          <span>
            {currentLanguage === 'hi'
              ? 'पड़ोसियों को फराळ भेंट करें 🎁'
              : currentLanguage === 'bn'
              ? 'প্রতিবেশীদের ফারাল উপহার দিন 🎁'
              : 'Share Faral Platter with Loved Ones 🎁'}
          </span>
        </button>
      </div>
    </div>
  );
};
