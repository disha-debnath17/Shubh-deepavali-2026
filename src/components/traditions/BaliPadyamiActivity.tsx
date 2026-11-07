/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Crown, RotateCcw, Heart, Flame, CheckCircle2 } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface BaliPadyamiActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

export const BaliPadyamiActivity: React.FC<BaliPadyamiActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // Steps: 1. Clay Fort Built, 2. Sevanti Flowers Decorated, 3. Gomata Puja Tilak Offered, 4. Sweet Obbattu Offered
  const [fortTowersBuilt, setFortTowersBuilt] = useState<number>(1); // 1 to 4 towers
  const [hasDecoratedFlowers, setHasDecoratedFlowers] = useState<boolean>(false);
  const [hasWorshippedGomata, setHasWorshippedGomata] = useState<boolean>(false);
  const [hasOfferedObbattu, setHasOfferedObbattu] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleBuildTower = () => {
    audioManager.playFaralDropSound();
    if (fortTowersBuilt < 4) {
      setFortTowersBuilt((t) => t + 1);
      checkDone(fortTowersBuilt + 1, hasDecoratedFlowers, hasWorshippedGomata, hasOfferedObbattu);
    }
  };

  const handleDecorateFlowers = () => {
    audioManager.playSparkleSound();
    setHasDecoratedFlowers(true);
    checkDone(fortTowersBuilt, true, hasWorshippedGomata, hasOfferedObbattu);
  };

  const handleGomataPuja = () => {
    audioManager.playTempleBellSound();
    setHasWorshippedGomata(true);
    checkDone(fortTowersBuilt, hasDecoratedFlowers, true, hasOfferedObbattu);
  };

  const handleOfferObbattu = () => {
    audioManager.playDiyaLightSound();
    setHasOfferedObbattu(true);
    checkDone(fortTowersBuilt, hasDecoratedFlowers, hasWorshippedGomata, true);
  };

  const checkDone = (towers: number, flowers: boolean, cow: boolean, obbattu: boolean) => {
    if (towers >= 3 && flowers && cow && obbattu && !isCompleted) {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#F5A623', '#F4D995', '#D6AD60', '#FFE082'],
        });
      } catch (e) {}
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    audioManager.playClickSound();
    setFortTowersBuilt(1);
    setHasDecoratedFlowers(false);
    setHasWorshippedGomata(false);
    setHasOfferedObbattu(false);
    setIsCompleted(false);
  };

  const completedCount = (fortTowersBuilt >= 3 ? 1 : 0) + (hasDecoratedFlowers ? 1 : 0) + (hasWorshippedGomata ? 1 : 0) + (hasOfferedObbattu ? 1 : 0);

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">👑</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'बलि पाड्यमी: मिट्टी का किला एवं राजा बलि स्वागत'
                : currentLanguage === 'bn'
                ? 'বলি পাদ্যমী: মাটির কেল্লা ও রাজা বলির সংবর্ধনা'
                : 'Bali Padyami: Miniature Clay Fort & King Bali Welcome'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'कर्नाटक की परंपरा: मिट्टी का किला बनाएं, गेंदा-सेवंती से सजाएं, गो-पूजन करें और मीठी ओब्बट्टु का भोग लगाएं।'
              : currentLanguage === 'bn'
              ? 'মাটির কেল্লা সাজান, হলুদ সেবন্তী ফুল দিন, গো-মাতার আরাধনা করুন এবং মিষ্টি ওব্বাট্টু ভোগ দিন।'
              : 'Construct the miniature clay fort (Kote), adorn with Sevanti flowers, perform Gomata puja, and offer Obbattu.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{completedCount} / 4 {currentLanguage === 'hi' ? 'विधान' : currentLanguage === 'bn' ? 'আচার' : 'Rituals'}</span>
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

      {/* Main Interactive Stage */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#182645] via-[#10172D] to-[#0B0F1C]">
        {/* Festive Golden Halo */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: 0.15 + (completedCount / 4) * 0.5,
            background: 'radial-gradient(ellipse at 50% 65%, rgba(245, 166, 35, 0.4) 0%, rgba(25, 39, 71, 0.8) 60%, transparent 85%)',
          }}
        />

        {/* Center: Miniature Clay Fort (Kote) & King Bali Throne */}
        <div className="relative z-10 my-auto w-full max-w-2xl mx-auto flex flex-col items-center">
          <div className="relative w-full max-w-md flex flex-col items-center">
            {/* Crown of King Bali glowing on the fort */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl animate-bounce">👑</span>
              <span className="font-royal text-sm font-bold text-[#F4D995] bg-[#192747]/90 px-3 py-0.5 rounded-full border border-[#D6AD60]/40 shadow-md">
                {currentLanguage === 'hi' ? 'न्यायप्रिय राजा बलि का दरबार' : currentLanguage === 'bn' ? 'ন্যায়পরায়ণ রাজা বলির দরবার' : 'Righteous King Mahabali Court'}
              </span>
            </div>

            {/* Clay Fort Construction SVG */}
            <svg viewBox="0 0 280 140" className="w-56 sm:w-72 md:w-80 h-auto drop-shadow-2xl">
              <defs>
                <linearGradient id="clayFortGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C46E3A" />
                  <stop offset="60%" stopColor="#8D431D" />
                  <stop offset="100%" stopColor="#5E2B12" />
                </linearGradient>
              </defs>

              {/* Main Clay Fort Base & Walls */}
              <path d="M 20 120 L 40 60 L 240 60 L 260 120 Z" fill="url(#clayFortGrad)" />
              {/* Central Gate Arch */}
              <path d="M 120 120 L 120 85 Q 140 70 160 85 L 160 120 Z" fill="#2E1308" />
              {/* Fort Wall Battlements (Merlons) */}
              <rect x="50" y="52" width="16" height="12" fill="#A8572A" />
              <rect x="80" y="52" width="16" height="12" fill="#A8572A" />
              <rect x="184" y="52" width="16" height="12" fill="#A8572A" />
              <rect x="214" y="52" width="16" height="12" fill="#A8572A" />

              {/* Tower 1 (Left Wing) */}
              {fortTowersBuilt >= 1 && (
                <g>
                  <rect x="24" y="35" width="28" height="35" fill="url(#clayFortGrad)" />
                  <polygon points="24,35 38,15 52,35" fill="#A8572A" />
                  <circle cx="38" cy="14" r="2.5" fill="#D6AD60" />
                </g>
              )}

              {/* Tower 2 (Right Wing) */}
              {fortTowersBuilt >= 2 && (
                <g>
                  <rect x="228" y="35" width="28" height="35" fill="url(#clayFortGrad)" />
                  <polygon points="228,35 242,15 256,35" fill="#A8572A" />
                  <circle cx="242" cy="14" r="2.5" fill="#D6AD60" />
                </g>
              )}

              {/* Tower 3 & 4 (Grand Central Towers) */}
              {fortTowersBuilt >= 3 && (
                <g>
                  <rect x="115" y="25" width="50" height="40" fill="url(#clayFortGrad)" />
                  <polygon points="110,25 140,4 170,25" fill="#C46E3A" />
                  <circle cx="140" cy="4" r="3" fill="#FFE082" />
                </g>
              )}

              {/* Flower Garlands (Sevanti Yellow Blossoms) */}
              {hasDecoratedFlowers && (
                <g>
                  <ellipse cx="70" cy="62" rx="6" ry="6" fill="#FFEB3B" />
                  <ellipse cx="100" cy="62" rx="6" ry="6" fill="#FFC107" />
                  <ellipse cx="180" cy="62" rx="6" ry="6" fill="#FFEB3B" />
                  <ellipse cx="210" cy="62" rx="6" ry="6" fill="#FFC107" />
                  <path d="M 40 68 Q 140 100 240 68" fill="none" stroke="#FF9800" strokeWidth="3" strokeDasharray="6 6" />
                </g>
              )}

              {/* Diya at the gate if offered */}
              {hasOfferedObbattu && (
                <g className="animate-flame origin-bottom">
                  <circle cx="140" cy="88" r="6" fill="rgba(255, 179, 71, 0.6)" filter="blur(2px)" />
                  <ellipse cx="140" cy="94" rx="8" ry="3" fill="#D6AD60" />
                  <circle cx="140" cy="84" r="3" fill="#FFE082" />
                </g>
              )}
            </svg>
          </div>

          {/* Interactive Action Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mt-3">
            {/* 1. Build Fort Tower */}
            <button
              onClick={handleBuildTower}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                fortTowersBuilt >= 3
                  ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/80 hover:text-white'
              }`}
            >
              <span className="text-base">🏰</span>
              <span>{currentLanguage === 'hi' ? 'मिट्टी का किला' : currentLanguage === 'bn' ? 'মাটির কেল্লা' : 'Build Clay Fort'}</span>
              <span className="text-[10px] text-[#FFB347] font-normal">
                {fortTowersBuilt >= 3 ? (currentLanguage === 'hi' ? 'किला तैयार' : currentLanguage === 'bn' ? 'কেল্লা প্রস্তুত' : 'Fort Built') : `${fortTowersBuilt}/3 ${currentLanguage === 'hi' ? 'बुर्ज' : currentLanguage === 'bn' ? 'মিনার' : 'Towers'}`}
              </span>
            </button>

            {/* 2. Decorate with Sevanti Flowers */}
            <button
              onClick={handleDecorateFlowers}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                hasDecoratedFlowers
                  ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/80 hover:text-white'
              }`}
            >
              <span className="text-base">🌼</span>
              <span>{currentLanguage === 'hi' ? 'सेवंती पुष्प सज्जा' : currentLanguage === 'bn' ? 'সেবন্তী ফুল সাজানো' : 'Sevanti Flowers'}</span>
              <span className="text-[10px] text-[#FFB347] font-normal">
                {hasDecoratedFlowers ? (currentLanguage === 'hi' ? 'माला सुशोभित' : currentLanguage === 'bn' ? 'মালা সজ্জিত' : 'Decorated') : (currentLanguage === 'hi' ? 'पुष्प चढ़ाएं' : currentLanguage === 'bn' ? 'ফুল দিন' : 'Tap to add')}
              </span>
            </button>

            {/* 3. Gomata Puja */}
            <button
              onClick={handleGomataPuja}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                hasWorshippedGomata
                  ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/80 hover:text-white'
              }`}
            >
              <span className="text-base">🐄</span>
              <span>{currentLanguage === 'hi' ? 'गौ-माता पूजन' : currentLanguage === 'bn' ? 'গো-মাতা পূজা' : 'Gomata Puja'}</span>
              <span className="text-[10px] text-[#FFB347] font-normal">
                {hasWorshippedGomata ? (currentLanguage === 'hi' ? 'तिलक व अर्चन' : currentLanguage === 'bn' ? 'তিলক অর্পিত' : 'Worshipped') : (currentLanguage === 'hi' ? 'तिलक लगाएं' : currentLanguage === 'bn' ? 'তিলক দিন' : 'Offer Tilak')}
              </span>
            </button>

            {/* 4. Offer Sweet Obbattu */}
            <button
              onClick={handleOfferObbattu}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                hasOfferedObbattu
                  ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/80 hover:text-white'
              }`}
            >
              <span className="text-base">🥞</span>
              <span>{currentLanguage === 'hi' ? 'मीठी ओब्बट्टु भोग' : currentLanguage === 'bn' ? 'মিষ্টি ওব্বাট্টু ভোগ' : 'Offer Obbattu'}</span>
              <span className="text-[10px] text-[#FFB347] font-normal">
                {hasOfferedObbattu ? (currentLanguage === 'hi' ? 'नैवेद्य समर्पित' : currentLanguage === 'bn' ? 'ভোগ নিবেদিত' : 'Offered') : (currentLanguage === 'hi' ? 'भोग लगाएं' : currentLanguage === 'bn' ? 'ভোগ দিন' : 'Tap to serve')}
              </span>
            </button>
          </div>
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">👑🏰🌼</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'राजा बलि स्वागत व बलि पाड्यमी संपन्न!'
                  : currentLanguage === 'bn'
                  ? 'রাজা বলির সংবর্ধনা ও বলি পাদ্যমী সম্পন্ন!'
                  : 'King Bali Welcome & Bali Padyami Complete!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'मिट्टी के भव्य किले, सेवंती के पुष्पों और मीठी ओब्बट्टु के भोग से राजा बलि का सत्कार हो चुका है। त्याग, दानशीलता और गो-माता का पावन आशीर्वाद आपके परिवार को मिले।'
                  : currentLanguage === 'bn'
                  ? 'মাটির সুসজ্জিত কেল্লা এবং সুস্বাদু ওব্বাট্টুর ভোগে মহান রাজা বলির অভ্যর্থনা সম্পূর্ণ। প্রজাবৎসল রাজার আশীর্বাদে আপনার গৃহ সম্পদে ও সুখে ভরে উঠুক।'
                  : 'The miniature clay fort is adorned, Gomata worshipped, and Obbattu offered to King Mahabali. May generosity and prosperity bless your home.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'किला दर्शन करें' : currentLanguage === 'bn' ? 'কেল্লা দর্শন' : 'View Fort Altar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {currentLanguage === 'hi'
          ? 'कर्नाटक की पावन बलि पाड्यमी: चारों विधान पूर्ण कर राजा बलि का आशीर्वाद पाएं।'
          : currentLanguage === 'bn'
          ? 'কর্ণাটকের বলি পাদ্যমীর ঐতিহ্য মেনে কেল্লা গড়ে রাজা বলির কৃপা লাভ করুন।'
          : 'Complete all 4 rituals to honor King Mahabali on Bali Padyami in Karnataka.'}
      </div>
    </div>
  );
};
