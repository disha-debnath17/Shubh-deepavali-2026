/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Flame, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface NarakasuraDahanActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

export const NarakasuraDahanActivity: React.FC<NarakasuraDahanActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // 1. Sparklers Lit, 2. Effigy Burning, 3. Divine Dawn Light Emerged, 4. Festive Fov Served
  const [isIgnited, setIsIgnited] = useState<boolean>(false);
  const [isBurned, setIsBurned] = useState<boolean>(false);
  const [hasServedFov, setHasServedFov] = useState<boolean>(false);
  const [selectedFovType, setSelectedFovType] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const fovTypes = [
    { id: 1, name: { en: 'God Fov (Jaggery & Coconut)', hi: 'गोड़ फोव (गुड़-नारियल)', bn: 'মিষ্টি গুড়-নারকেল ফোভ' } },
    { id: 2, name: { en: 'Doodh Fov (Cardamom Milk)', hi: 'दूध फोव (इलायची दूध)', bn: 'দুধ-এলাচ ফোভ' } },
    { id: 3, name: { en: 'Batata Fov (Spiced Savory)', hi: 'बटाटा फोव (तीखा आलू)', bn: 'মশলাদার আলু ফোভ' } },
  ];

  const handleIgniteEffigy = () => {
    audioManager.playMatchStrikeSound();
    setIsIgnited(true);

    setTimeout(() => {
      audioManager.playFireworkSound();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#FF5722', '#FF9800', '#FFEB3B', '#F44336'],
        });
      } catch (e) {}
    }, 400);

    setTimeout(() => {
      audioManager.playSparkleSound();
      setIsBurned(true);
      checkDone(true, hasServedFov);
    }, 1400);
  };

  const handleServeFov = () => {
    audioManager.playMithaiRevealSound();
    setHasServedFov(true);
    checkDone(isBurned, true);
  };

  const checkDone = (burned: boolean, fov: boolean) => {
    if (burned && fov && !isCompleted) {
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
    setIsIgnited(false);
    setIsBurned(false);
    setHasServedFov(false);
    setIsCompleted(false);
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'गोवा नरकासुर दहन एवं पारंपरिक फोव पर्व'
                : currentLanguage === 'bn'
                ? 'গোয়া নরকাসুর বধ ও ঐতিহ্যবাহী ফোভ মিষ্টি'
                : 'Goa Narakasura Dahan & Festive Dawn Fov'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'भोर में नरकासुर के विशाल पुतले को आतिशबाजी संग जलाएं और नारियल-गुड़ से बने ५ प्रकार के स्वादिष्ट फोव का आनंद लें।'
              : currentLanguage === 'bn'
              ? 'ভোরে আতশবাজির রোশনাইয়ে নরকাসুর পুড়িয়ে শুভর জয় উদযাপন করুন ও গোয়ার বিখ্যাত নারকেল-গুড়ের ফোভ আস্বাদন করুন।'
              : 'Ignite the terrifying paper-mâché Narakasura effigy at dawn with sparklers and savor the 5 varieties of festive Goan Fov.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{isBurned ? (hasServedFov ? '2/2' : '1/2') : '0/2'} {currentLanguage === 'hi' ? 'अनुष्ठान' : currentLanguage === 'bn' ? 'অনুষ্ঠান' : 'Rituals'}</span>
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
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#1E0D10] via-[#1A182E] to-[#0A0D18]">
        {/* Ambient Fireworks & Golden Radiance */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: isBurned ? 0.75 : isIgnited ? 0.5 : 0.2,
            background: isBurned
              ? 'radial-gradient(ellipse at 50% 50%, rgba(255, 215, 79, 0.4) 0%, rgba(245, 166, 35, 0.2) 60%, transparent 85%)'
              : 'radial-gradient(ellipse at 50% 60%, rgba(255, 87, 34, 0.35) 0%, rgba(181, 83, 42, 0.2) 50%, transparent 80%)',
          }}
        />

        {/* Center: Narakasura Effigy or Divine Victory Sun */}
        <div className="relative z-10 my-auto w-full max-w-md mx-auto flex flex-col items-center">
          {!isBurned ? (
            <div className={`relative transition-all duration-500 ${isIgnited ? 'scale-105 animate-pulse' : ''}`}>
              <svg viewBox="0 0 200 180" className="w-40 sm:w-52 md:w-60 h-auto drop-shadow-2xl">
                {/* Sparklers and Fireworks if ignited */}
                {isIgnited && (
                  <g className="animate-flame origin-bottom">
                    <circle cx="100" cy="90" r="70" fill="rgba(255, 87, 34, 0.5)" filter="blur(8px)" />
                    <circle cx="60" cy="40" r="12" fill="#FFEB3B" filter="blur(2px)" />
                    <circle cx="140" cy="40" r="12" fill="#FFEB3B" filter="blur(2px)" />
                    <circle cx="40" cy="120" r="10" fill="#FF5722" />
                    <circle cx="160" cy="120" r="10" fill="#FF5722" />
                  </g>
                )}

                {/* Handcrafted Colorful Paper Effigy of Narakasura */}
                {/* Crown with Horns */}
                <polygon points="100,15 80,45 120,45" fill="#FFC107" stroke="#D32F2F" strokeWidth="2" />
                <path d="M 80 40 Q 55 15 50 30 Q 65 45 80 45 Z" fill="#D32F2F" />
                <path d="M 120 40 Q 145 15 150 30 Q 135 45 120 45 Z" fill="#D32F2F" />

                {/* Giant Mask Face */}
                <rect x="65" y="45" width="70" height="65" rx="12" fill="#2E7D32" stroke="#FFD54F" strokeWidth="3" />
                {/* Fierce Eyes */}
                <ellipse cx="85" cy="65" rx="10" ry="6" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
                <circle cx="85" cy="65" r="4" fill="#C62828" />
                <ellipse cx="115" cy="65" rx="10" ry="6" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
                <circle cx="115" cy="65" r="4" fill="#C62828" />

                {/* Mustache & Fangs */}
                <path d="M 75 85 Q 100 80 125 85 Q 100 100 75 85 Z" fill="#212121" />
                <polygon points="85,86 90,96 95,86" fill="#FFFFFF" />
                <polygon points="105,86 110,96 115,86" fill="#FFFFFF" />

                {/* Hay & Paper Torso draped in bright fabric */}
                <path d="M 60 110 L 40 170 L 160 170 L 140 110 Z" fill="#E65100" stroke="#FFD54F" strokeWidth="2" />
                <circle cx="100" cy="138" r="14" fill="#FFD54F" />

                {/* Sparkler trails on sides */}
                <line x1="30" y1="90" x2="60" y2="120" stroke="#FFD54F" strokeWidth="3" strokeDasharray="3 3" />
                <line x1="170" y1="90" x2="140" y2="120" stroke="#FFD54F" strokeWidth="3" strokeDasharray="3 3" />
              </svg>

              {/* Tap to ignite button if not yet lit */}
              {!isIgnited && (
                <div
                  onClick={handleIgniteEffigy}
                  className="mt-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#FF5722] via-[#FF9800] to-[#FFD54F] text-[#10172D] text-xs font-bold shadow-xl cursor-pointer hover:brightness-110 active:scale-95 flex items-center gap-1.5"
                >
                  <Flame className="w-4 h-4 text-red-900 fill-red-800" />
                  <span>{currentLanguage === 'hi' ? 'पुतले में आतिशबाजी सुलगाएं' : currentLanguage === 'bn' ? 'আতশবাজিতে আগুন দিন' : 'Ignite Narakasura'}</span>
                </div>
              )}
            </div>
          ) : (
            /* After Dahan: Divine Radiant Morning Sun of Triumph */
            <div className="flex flex-col items-center animate-fade-in space-y-2">
              <div className="relative">
                <svg viewBox="0 0 160 160" className="w-36 sm:w-44 h-auto drop-shadow-[0_0_25px_rgba(255,215,79,0.9)]">
                  <circle cx="80" cy="80" r="42" fill="#FFD54F" />
                  <circle cx="80" cy="80" r="30" fill="#FFF9C4" />
                  {/* Radiant Sun Rays */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                    <line
                      key={ang}
                      x1="80"
                      y1="80"
                      x2={80 + 65 * Math.cos((ang * Math.PI) / 180)}
                      y2={80 + 65 * Math.sin((ang * Math.PI) / 180)}
                      stroke="#FFB347"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl">
                  ✨
                </div>
              </div>

              <div className="text-center">
                <span className="font-royal text-base sm:text-lg font-bold text-[#F4D995]">
                  {currentLanguage === 'hi' ? 'अधर्म पर धर्म की विजय!' : currentLanguage === 'bn' ? 'অধর্মের ওপর ধর্মের জয়!' : 'Triumph of Light Over Shadows!'}
                </span>
                <p className="text-xs text-[#FFF5DE]/80 max-w-xs mt-0.5">
                  {currentLanguage === 'hi'
                    ? 'भगवान श्रीकृष्ण और सत्यभामा द्वारा नरकासुर का संहार। अंधकार विदा हुआ, भोर का पावन उजाला छा गया।'
                    : currentLanguage === 'bn'
                    ? 'শ্রীকৃষ্ণ ও সত্যভামার হাতে নরকাসুরের বিনাশ। পৃথিবীর আকাশে নেমে এলো বিজয়ের দিব্য আলো।'
                    : 'The demon is defeated. Righteousness and pure peace return to illuminate the dawn.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Interactive Goan Festive Fov Section */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D6AD60]/20 bg-[#10172D]/85 backdrop-blur-md px-3 py-2 rounded-2xl">
          {/* Fov Varieties Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] text-[#F4D995] font-semibold hidden sm:inline">
              {currentLanguage === 'hi' ? 'पारंपरिक फोव:' : currentLanguage === 'bn' ? 'গোয়ার ফোভ:' : 'Goan Fov:'}
            </span>
            {fovTypes.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFovType(f.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                  selectedFovType === f.id
                    ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                    : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
                }`}
              >
                {f.name[currentLanguage]}
              </button>
            ))}
          </div>

          {/* Serve Fov Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleServeFov}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                hasServedFov
                  ? 'bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D]'
                  : 'bg-[#192747] border-[#D6AD60]/50 text-[#F4D995] hover:bg-[#D6AD60]/20'
              }`}
            >
              <span>🥣</span>
              <span>{hasServedFov ? (currentLanguage === 'hi' ? 'स्वादिष्ट फोव परोसा' : currentLanguage === 'bn' ? 'ফোভ পরিবেশিত' : 'Fov Served') : (currentLanguage === 'hi' ? 'फोव का भोग लगाएं' : currentLanguage === 'bn' ? 'ফোভ পরিবেশন করুন' : 'Serve Festive Fov')}</span>
            </button>
          </div>
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">✨🌅🥣</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'गोवा दीपोत्सव एवं नरकासुर दहन सम्पन्न!'
                  : currentLanguage === 'bn'
                  ? 'গোয়া দীপাবলি ও নরকাসুর বধ সম্পন্ন!'
                  : 'Goa Deepavali Celebration Complete!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'भोर की आतिशबाजी में नरकासुर का नाश और नारियल-गुड़ के ५ प्रकार के फोव का स्वाद आपके दीपोत्सव को यादगार बना चुका है। सत्य और उल्लास की सदा जय हो!'
                  : currentLanguage === 'bn'
                  ? 'ভোরের আতশবাজিতে নরকাসুরের বিনাশ এবং নারকেল-গুড়ের ঐতিহ্যবাহী সুস্বাদু ফোভের স্বাদে গোয়ার দীপাবলি উদযাপন সার্থক। শুভ দীপাবলি!'
                  : 'The effigy of darkness has vanished into radiant sunrise, followed by the beloved Goan feast of festive Fov. May truth and joy triumph always!'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'दर्शन करें' : currentLanguage === 'bn' ? 'দর্শন করুন' : 'View Celebration'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {currentLanguage === 'hi'
          ? 'गोवा का दीपोत्सव: पुतले में आतिशबाजी सुलगाकर अंधकार दूर करें और नारियल-गुड़ के फोव का स्वाद लें।'
          : currentLanguage === 'bn'
          ? 'গোয়ার ঐতিহ্য: নরকাসুর পুড়িয়ে শুভর জয় আনুন এবং নারকেল-গুড় দিয়ে তৈরি ঐতিহ্যবাহী ফোভের স্বাদ নিন।'
          : 'Ignite the Narakasura effigy at dawn to defeat darkness, then savor Goan festive beaten rice (Fov).'}
      </div>
    </div>
  );
};
