/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Flame, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface BadabaduaDakaActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

export const BadabaduaDakaActivity: React.FC<BadabaduaDakaActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  // 1. Jute Sticks Lit, 2. Raised to Sky, 3. Sacred Chant Sung, 4. Jhoti Chita Drawn
  const [hasLitJuteSticks, setHasLitJuteSticks] = useState<boolean>(false);
  const [isRaisedToSky, setIsRaisedToSky] = useState<boolean>(false);
  const [hasRecitedChant, setHasRecitedChant] = useState<boolean>(false);
  const [hasDrawnJhoti, setHasDrawnJhoti] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleLightJuteSticks = () => {
    audioManager.playMatchStrikeSound();
    setTimeout(() => {
      audioManager.playDiyaLightSound();
    }, 200);
    setHasLitJuteSticks(true);
    checkDone(true, isRaisedToSky, hasRecitedChant, hasDrawnJhoti);
  };

  const handleRaiseToSky = () => {
    audioManager.playSparkleSound();
    setIsRaisedToSky(true);
    checkDone(hasLitJuteSticks, true, hasRecitedChant, hasDrawnJhoti);
  };

  const handleReciteChant = () => {
    audioManager.playShankhSound();
    setHasRecitedChant(true);
    checkDone(hasLitJuteSticks, isRaisedToSky, true, hasDrawnJhoti);
  };

  const handleDrawJhoti = () => {
    audioManager.playSparkleSound();
    setHasDrawnJhoti(true);
    checkDone(hasLitJuteSticks, isRaisedToSky, hasRecitedChant, true);
  };

  const checkDone = (lit: boolean, raised: boolean, chant: boolean, jhoti: boolean) => {
    if (lit && raised && chant && jhoti && !isCompleted) {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 85,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#F5A623', '#F4D995', '#FFE082', '#FFF5DE'],
        });
      } catch (e) {}
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    audioManager.playClickSound();
    setHasLitJuteSticks(false);
    setIsRaisedToSky(false);
    setHasRecitedChant(false);
    setHasDrawnJhoti(false);
    setIsCompleted(false);
  };

  const completedCount = (hasLitJuteSticks ? 1 : 0) + (isRaisedToSky ? 1 : 0) + (hasRecitedChant ? 1 : 0) + (hasDrawnJhoti ? 1 : 0);

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'बड़बड़ुआ डाका: कौणरिया काठी एवं पूर्वज वंदन'
                : currentLanguage === 'bn'
                ? 'বড়বড়ুয়া ডকা: কাউনরিয়া কাঠি ও পূর্বপুরুষের আলোর দিশা'
                : 'Badabadua Daka: Jute Stick Beacon for Ancestors'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'ओडिशा की भावुक परंपरा: कौणरिया काठी जलाकर आकाश की ओर दिखाएं और पूर्वजों के मोक्ष हेतु प्रार्थना करें।'
              : currentLanguage === 'bn'
              ? 'ওড়িশার ঐতিহ্য: পাটকাঠি জ্বেলে আকাশের দিকে তুলে ধরুন এবং পূর্বপুরুষদের আলোয় ফিরে যাওয়ার পথ দেখান।'
              : 'Hold burning bundles of Kaunriya Kathi towards the evening sky with the ancient Odia ancestral chant.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>{completedCount} / 4 {currentLanguage === 'hi' ? 'चरण' : currentLanguage === 'bn' ? 'ধাপ' : 'Steps'}</span>
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
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#091122] via-[#0E1B33] to-[#060B16]">
        {/* Starry Twilight Sky */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:20px_20px]" />

        {/* Golden Beacon Light radiating towards sky */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            opacity: hasLitJuteSticks ? (isRaisedToSky ? 0.75 : 0.4) : 0.1,
            background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 179, 71, 0.45) 0%, rgba(245, 166, 35, 0.2) 50%, transparent 80%)',
          }}
        />

        {/* Center: The Bundle of Kaunriya Kathi (Jute Sticks) */}
        <div className="relative z-10 my-auto w-full max-w-md mx-auto flex flex-col items-center">
          {/* Animated Skyward Sparks & Sacred Smoke */}
          {hasLitJuteSticks && (
            <div className="flex items-center gap-4 text-xl sm:text-2xl text-[#FFE082] animate-bounce pointer-events-none">
              <span>✨</span>
              <span className="text-sm text-[#FFB347] font-semibold animate-pulse">
                {currentLanguage === 'hi' ? 'आकाश में पूर्वजों को मार्ग दर्शन' : currentLanguage === 'bn' ? 'পূর্বপুরুষদের আলোকময় পথ' : 'Guiding ancestors to celestial light'}
              </span>
              <span>✨</span>
            </div>
          )}

          {/* Jute Sticks Illustration */}
          <div className={`relative transition-all duration-700 ${isRaisedToSky ? '-translate-y-4 scale-110' : ''}`}>
            <svg viewBox="0 0 160 200" className="w-32 sm:w-40 md:w-48 h-auto drop-shadow-2xl">
              {/* Flame & Glowing Embers if lit */}
              {hasLitJuteSticks && (
                <g className="animate-flame origin-bottom">
                  {/* Glowing Aura */}
                  <circle cx="80" cy="30" r="26" fill="rgba(255, 179, 71, 0.5)" filter="blur(6px)" />
                  {/* Outer Flame */}
                  <path d="M 80 8 C 72 20, 68 32, 72 45 C 75 52, 85 52, 88 45 C 92 32, 88 20, 80 8 Z" fill="#FFE082" />
                  {/* Core Brightness */}
                  <path d="M 80 18 C 76 25, 74 33, 76 40 C 78 44, 82 44, 84 40 C 86 33, 84 25, 80 18 Z" fill="#FFFFFF" className="animate-flame-core" />
                  {/* Crackling Jute Sparks */}
                  <circle cx="68" cy="18" r="2.5" fill="#FFB347" />
                  <circle cx="94" cy="22" r="2" fill="#FFB347" />
                  <circle cx="75" cy="5" r="1.5" fill="#FFFDE7" />
                  <circle cx="86" cy="2" r="2" fill="#FFE082" />
                </g>
              )}

              {/* Bundle of Kaunriya Jute Sticks (Slender fibrous rods tied with red sacred string) */}
              <line x1="72" y1="46" x2="68" y2="185" stroke="#C29B38" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="78" y1="44" x2="76" y2="188" stroke="#DDB856" strokeWidth="4" strokeLinecap="round" />
              <line x1="84" y1="45" x2="84" y2="186" stroke="#C29B38" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="90" y1="47" x2="92" y2="184" stroke="#DDB856" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="66" y1="50" x2="62" y2="182" stroke="#AA822A" strokeWidth="3" strokeLinecap="round" />
              <line x1="94" y1="49" x2="98" y2="182" stroke="#AA822A" strokeWidth="3" strokeLinecap="round" />

              {/* Red & Yellow Sacred Thread Binding the Bundle (Rakhi / Mauli) */}
              <rect x="62" y="110" width="36" height="12" rx="3" fill="#E53935" stroke="#FFD54F" strokeWidth="1.5" />
              <rect x="64" y="150" width="32" height="10" rx="3" fill="#E53935" stroke="#FFD54F" strokeWidth="1.5" />

              {/* Jhoti Chita Rice Art around base if drawn */}
              {hasDrawnJhoti && (
                <g className="animate-fade-in">
                  <ellipse cx="80" cy="190" rx="45" ry="8" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="45" cy="190" r="3" fill="#FFF" />
                  <circle cx="115" cy="190" r="3" fill="#FFF" />
                  <circle cx="80" cy="190" r="4" fill="#D6AD60" />
                </g>
              )}
            </svg>
          </div>

          {/* Sacred Odia Inscription Banner */}
          <div className="mt-3 text-center px-4 py-2 rounded-2xl bg-[#192747]/90 border border-[#D6AD60]/40 shadow-lg max-w-sm">
            <div className="font-royal text-xs sm:text-sm font-bold text-[#F4D995]">
              "ବଡ଼ବଡୁଆ ହୋ, ଅନ୍ଧାରରେ ଆସ, ଆଲୁଅରେ ଯାଅ"
            </div>
            <div className="text-[11px] text-[#FFF5DE]/85 italic mt-0.5">
              (O ancestors, come in darkness, return in celestial light)
            </div>
          </div>
        </div>

        {/* Bottom Interactive Controls */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#D6AD60]/20 bg-[#10172D]/85 backdrop-blur-md px-3 py-2 rounded-2xl">
          {/* Action 1 & 2 */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLightJuteSticks}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                hasLitJuteSticks
                  ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#FFB347]" />
              <span>{hasLitJuteSticks ? (currentLanguage === 'hi' ? 'काठी प्रज्वलित' : currentLanguage === 'bn' ? 'কাঠি প্রজ্বলিত' : 'Sticks Burning') : (currentLanguage === 'hi' ? 'कौणरिया काठी जलाएं' : currentLanguage === 'bn' ? 'কাউনরিয়া কাঠি জ্বালান' : 'Light Jute Sticks')}</span>
            </button>

            <button
              onClick={handleRaiseToSky}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                isRaisedToSky
                  ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
              }`}
            >
              <span>🌌</span>
              <span>{isRaisedToSky ? (currentLanguage === 'hi' ? 'आकाश की ओर अर्पित' : currentLanguage === 'bn' ? 'আকাশপানে উত্তোলিত' : 'Raised to Sky') : (currentLanguage === 'hi' ? 'आकाश की ओर उठाएं' : currentLanguage === 'bn' ? 'আকাশে তুলে ধরুন' : 'Raise to Sky')}</span>
            </button>
          </div>

          {/* Action 3 & 4 */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReciteChant}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                hasRecitedChant
                  ? 'bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D]'
                  : 'bg-[#192747] border-[#D6AD60]/40 text-[#F4D995] hover:bg-[#D6AD60]/20'
              }`}
            >
              <span>🐚</span>
              <span>{hasRecitedChant ? (currentLanguage === 'hi' ? 'शंखनाद व मंत्र संपन्न' : currentLanguage === 'bn' ? 'শঙ্খ ও মন্ত্র ধ্বনিত' : 'Chanted with Shankh') : (currentLanguage === 'hi' ? 'शंखनाद व पूर्वज मंत्र' : currentLanguage === 'bn' ? 'শঙ্খধ্বনি ও মন্ত্র' : 'Chant & Shankh')}</span>
            </button>

            <button
              onClick={handleDrawJhoti}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                hasDrawnJhoti
                  ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-[#FFF5DE]/70 hover:text-white'
              }`}
            >
              <span>🌸</span>
              <span>{hasDrawnJhoti ? (currentLanguage === 'hi' ? 'झोटी चिता संपन्न' : currentLanguage === 'bn' ? 'ঝোটি চিতা আঁকা শেষ' : 'Jhoti Drawn') : (currentLanguage === 'hi' ? 'झोटी चिता बनाएं' : currentLanguage === 'bn' ? 'ঝোটি আঁকুন' : 'Draw Jhoti')}</span>
            </button>
          </div>
        </div>

        {/* Completion Blessing Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fade-in text-center">
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60] shadow-2xl max-w-md mx-auto space-y-2">
              <span className="text-3xl">✨🐚🙏</span>
              <h4 className="font-royal text-xl sm:text-2xl font-extrabold text-[#F4D995]">
                {currentLanguage === 'hi'
                  ? 'जय जगन्नाथ! बड़बड़ुआ डाका सम्पन्न!'
                  : currentLanguage === 'bn'
                  ? 'জয় জগন্নাথ! বড়বড়ুয়া ডকা সম্পন্ন!'
                  : 'Jai Jagannath! Badabadua Daka Complete!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed">
                {currentLanguage === 'hi'
                  ? 'कौणरिया काठी के पावन आलोक और मंत्रोच्चार से आपके पूर्वजों का मार्ग प्रकाशित हो चुका है। महाप्रभु श्री जगन्नाथ के पावन धाम और पूर्वजों का मंगल आशीर्वाद आपके साथ है।'
                  : currentLanguage === 'bn'
                  ? 'কাউনরিয়া কাঠির স্নিগ্ধ আলো আর পবিত্র শঙ্খধ্বনিতে পূর্বপুরুষদের আত্মার শান্তি ও আলোকময় উত্তরণ সম্পন্ন হলো। মহাপ্রভু জগন্নাথের করুণা আপনার সহায় হোক।'
                  : 'The glowing jute beacon and sacred chant have illuminated the path for ancestors to return in celestial peace. May Lord Jagannath bless your family.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#10172D] bg-[#D6AD60] hover:bg-[#F4D995] cursor-pointer"
                >
                  {currentLanguage === 'hi' ? 'दर्शन करें' : currentLanguage === 'bn' ? 'দর্শন করুন' : 'View Beacon'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="w-full mt-2.5 text-center text-xs text-[#F4D995]/80 italic">
        {currentLanguage === 'hi'
          ? 'ओडिशा की परंपरा: काठी जलाकर आकाश की ओर दिखाएं, शंखनाद करें और चावल की झोटी चिता बनाएं।'
          : currentLanguage === 'bn'
          ? 'পাটকাঠি জ্বেলে আকাশে তুলে ধরুন, শাঁখ বাজান এবং চালের গুঁড়োয় ঝোটি চিতা আঁকুন।'
          : 'Traditional Odia ritual: ignite Kaunriya Kathi, point to heaven, blow the Shankha, and draw rice Jhoti.'}
      </div>
    </div>
  );
};
