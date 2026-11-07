/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Check, RotateCcw, Droplets, Sun, Shirt, Flame } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface EnneMejjanaActivityProps {
  currentLanguage: Language;
  onComplete?: () => void;
}

export const EnneMejjanaActivity: React.FC<EnneMejjanaActivityProps> = ({
  currentLanguage,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const handlePerformStep = (stepNum: number) => {
    if (stepNum === 1) {
      audioManager.playClickSound();
    } else if (stepNum === 2) {
      audioManager.playChopdaStampSound();
    } else if (stepNum === 3) {
      audioManager.playWaterSplashSound();
    } else if (stepNum === 4) {
      audioManager.playTempleBellSound();
      audioManager.playDiyaLightSound();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F5A623', '#F4D995', '#D6AD60', '#FFE082'],
        });
      } catch (e) {}
      if (onComplete) onComplete();
    }

    setCurrentStep(stepNum);
    setCompletedSteps((prev) => (prev.includes(stepNum) ? prev : [...prev, stepNum]));
  };

  const isAllComplete = completedSteps.length >= 4;

  const handleReset = () => {
    audioManager.playClickSound();
    setCurrentStep(1);
    setCompletedSteps([1]);
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-[#FFF5DE]">
      {/* Header Info */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧴</span>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#F4D995]">
              {currentLanguage === 'hi'
                ? 'एण्णे मेज्जन (प्रभात औषधीय तेल स्नान)'
                : currentLanguage === 'bn'
                ? 'এন্নে মেজ্জনা (ভোরের ভেষজ তৈল স্নান)'
                : 'Enne Mejjana (Dawn Herbal Oil Bath Ritual)'}
            </h3>
          </div>
          <p className="text-xs text-[#FFF5DE]/75 mt-0.5">
            {currentLanguage === 'hi'
              ? 'सूर्योदय से पूर्व औषधीय तिल के तेल, चंदन व पवित्र जल से स्नान कर नरकासुर पर विजय व नई ऊर्जा का उत्सव मनाएं।'
              : currentLanguage === 'bn'
              ? 'সূর্যোদয়ের আগে ভেষজ তিলের তেল ও চন্দন মেখে পবিত্র স্নান সেরে পিতলের প্রদীপ প্রজ্বলন করুন।'
              : 'Perform the pre-dawn cleansing ritual with warm herbal sesame oil, fragrant sandalwood, and brass lamps.'}
          </p>
        </div>

        {/* Progress & Reset */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#192747] border border-[#D6AD60]/40 text-xs font-semibold text-[#F4D995]">
            {completedSteps.length} / 4 {currentLanguage === 'hi' ? 'अनुष्ठान संपन्न' : currentLanguage === 'bn' ? 'আচার সম্পন্ন' : 'Stages Complete'}
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Ritual Chamber Viewport */}
      <div className="relative w-full aspect-[16/10] max-h-[460px] rounded-3xl overflow-hidden border-2 border-[#D6AD60]/40 shadow-2xl flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-[#1B2742] via-[#10172D] to-[#0A0E1B]">
        {/* Soft Dawn Ambient Lighting changing with step */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
          style={{
            background:
              currentStep === 4
                ? 'radial-gradient(circle at 50% 40%, rgba(245, 166, 35, 0.4) 0%, rgba(25, 39, 71, 0.95) 70%, #0A0F1D 100%)'
                : 'radial-gradient(circle at 50% 40%, rgba(214, 173, 96, 0.2) 0%, rgba(16, 23, 45, 0.95) 70%, #0A0F1D 100%)',
          }}
        />

        {/* Visual Ritual Scene */}
        <div className="relative z-20 flex flex-col items-center justify-center max-w-lg w-full h-full text-center space-y-4">
          {/* Step 1: Sesame Oil Vessel */}
          {currentStep === 1 && (
            <div className="animate-fade-in flex flex-col items-center space-y-3">
              <div className="relative w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#FFB347]/20 rounded-full blur-xl animate-pulse" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                  {/* Brass Oil Urli with warm sesame oil */}
                  <ellipse cx="50" cy="65" rx="42" ry="16" fill="#B58E3D" stroke="#7A4C1C" strokeWidth="2" />
                  <ellipse cx="50" cy="62" rx="36" ry="12" fill="#E2B866" />
                  <ellipse cx="50" cy="60" rx="30" ry="9" fill="#996016" />
                  {/* Marigold flowers floating */}
                  <circle cx="42" cy="59" r="5" fill="#F5A623" />
                  <circle cx="58" cy="61" r="4.5" fill="#FFE082" />
                  <circle cx="50" cy="57" r="4" fill="#B5532A" />
                </svg>
              </div>
              <h4 className="font-royal text-base sm:text-lg font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '१. गुनगुना औषधीय तिल का तेल' : currentLanguage === 'bn' ? '১. ভেষজ তিলের তেল প্রস্তুত' : '1. Warm Herbal Sesame Oil Prepared'}
              </h4>
              <p className="text-xs text-[#FFF5DE]/85 max-w-sm">
                {currentLanguage === 'hi'
                  ? 'अदरक, अजवायन व काली मिर्च से सिद्ध तिल का तेल शरीर को स्फूर्ति प्रदान करता है।'
                  : currentLanguage === 'bn'
                  ? 'আদা ও গোলমরিচ দিয়ে ফোটানো ভেষজ তিলের তেল শরীরকে পুনরুজ্জীবিত করে।'
                  : 'Sesame oil infused with ginger and peppercorns warms the body and banishes lethargy.'}
              </p>
            </div>
          )}

          {/* Step 2: Sandalwood Ubtan */}
          {currentStep === 2 && (
            <div className="animate-fade-in flex flex-col items-center space-y-3">
              <div className="relative w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#F4D995]/20 rounded-full blur-xl animate-pulse" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                  {/* Brass bowl of Chandan Gandha Lepa */}
                  <ellipse cx="50" cy="62" rx="38" ry="14" fill="#D6AD60" stroke="#8F6220" strokeWidth="2" />
                  <ellipse cx="50" cy="58" rx="32" ry="10" fill="#FFF5DE" />
                  {/* Saffron paste mound */}
                  <path d="M 32 58 Q 50 36 68 58 Z" fill="#FFE082" />
                  <circle cx="50" cy="46" r="3" fill="#E65100" />
                </svg>
              </div>
              <h4 className="font-royal text-base sm:text-lg font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '२. सुगंधित चंदन उबटन (गंध लेप)' : currentLanguage === 'bn' ? '২. সুগন্ধি চন্দন ও হলুদ লেপন' : '2. Fragrant Sandalwood Ubtan (Gandha)'}
              </h4>
              <p className="text-xs text-[#FFF5DE]/85 max-w-sm">
                {currentLanguage === 'hi'
                  ? 'हल्दी और चंदन का लेप अहंकार का नाश कर मन को शांति और सौम्यता देता है।'
                  : currentLanguage === 'bn'
                  ? 'চন্দন ও হলুদের শুভ্র লেপন অন্তরকে শান্ত ও পবিত্র করে তোলে।'
                  : 'Sandalwood paste cools the mind and symbolizes the surrender of pride.'}
              </p>
            </div>
          )}

          {/* Step 3: Sacred Warm Water Bath */}
          {currentStep === 3 && (
            <div className="animate-fade-in flex flex-col items-center space-y-3">
              <div className="relative w-28 sm:w-36 h-28 sm:h-36 flex items-center justify-center">
                <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-xl animate-pulse" />
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                  {/* Traditional Brass Handi Water Pot with rising warmth */}
                  <path d="M 30 75 Q 50 85 70 75 L 75 48 Q 50 42 25 48 Z" fill="#D6AD60" stroke="#7A4C1C" strokeWidth="2" />
                  <ellipse cx="50" cy="46" rx="26" ry="8" fill="#81D4FA" />
                  {/* Droplets of warm holy water */}
                  <circle cx="50" cy="30" r="3" fill="#E1F5FE" className="animate-bounce" />
                  <circle cx="42" cy="24" r="2.5" fill="#E1F5FE" />
                  <circle cx="58" cy="26" r="2.5" fill="#E1F5FE" />
                </svg>
              </div>
              <h4 className="font-royal text-base sm:text-lg font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '३. पावन गुनगुने जल से स्नान' : currentLanguage === 'bn' ? '৩. পবিত্র উষ্ণ জলের স্নান' : '3. Sacred Warm Water Bathing'}
              </h4>
              <p className="text-xs text-[#FFF5DE]/85 max-w-sm">
                {currentLanguage === 'hi'
                  ? 'नरक चतुर्दशी की भोर में हर जल में मां गंगा का वास माना जाता है।'
                  : currentLanguage === 'bn'
                  ? 'বিশ্বাসের এই শুভ ভোরে সমস্ত জলেই গঙ্গার পবিত্রতা বিরাজ করে।'
                  : 'On this sacred dawn, all water carries the purifying presence of Ganga.'}
              </p>
            </div>
          )}

          {/* Step 4: Fresh Silks & Tall Brass Kuthuvilakku Lamp */}
          {currentStep === 4 && (
            <div className="animate-fade-in flex flex-col items-center space-y-3">
              <div className="relative w-32 sm:w-40 h-32 sm:h-40 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#FFB347]/30 rounded-full blur-2xl animate-aura" />
                <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
                  {/* Tall Brass Kuthuvilakku Lamp Glowing */}
                  <path d="M 50 14 C 47 22, 45 28, 47 34 C 49 38, 51 38, 53 34 C 55 28, 53 22, 50 14 Z" fill="#FFE082" className="animate-flame origin-bottom" />
                  {/* Brass Crowning Lotus */}
                  <ellipse cx="50" cy="38" rx="16" ry="5" fill="#D6AD60" stroke="#7A4C1C" strokeWidth="1" />
                  <rect x="47" y="40" width="6" height="54" fill="#D6AD60" />
                  <ellipse cx="50" cy="70" rx="10" ry="3" fill="#F4D995" />
                  <ellipse cx="50" cy="94" rx="28" ry="8" fill="#D6AD60" stroke="#7A4C1C" strokeWidth="1.5" />
                  <circle cx="50" cy="38" r="3" fill="#FFE082" />
                </svg>
              </div>
              <h4 className="font-royal text-base sm:text-lg font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '४. नवीन रेशमी वस्त्र एवं कुथुविलक्कु दीप' : currentLanguage === 'bn' ? '৪. নতুন রেশমি পোশাক ও পিতলের প্রদীপ' : '4. Auspicious Silks & Glowing Kuthuvilakku'}
              </h4>
              <p className="text-xs text-[#FFF5DE]/85 max-w-sm">
                {currentLanguage === 'hi'
                  ? 'स्नान के पश्चात नवीन वस्त्र धारण कर दीप प्रज्वलित किए गए। शुभ दीपावली!'
                  : currentLanguage === 'bn'
                  ? 'স্নান শেষে নতুন পোশাকে প্রদীপ জ্বেলে রাজা বলির শুভ আগমন বার্তা।'
                  : 'Cleanse complete! Fresh festive silks adorned and lamps lit to welcome Bali Padyami.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4 Interactive Ritual Stage Buttons */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3.5">
        <button
          onClick={() => handlePerformStep(1)}
          className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            currentStep === 1
              ? 'bg-[#D6AD60]/25 border-[#D6AD60] shadow-sm'
              : completedSteps.includes(1)
              ? 'bg-[#192747]/80 border-[#D6AD60]/40 text-[#FFF5DE]'
              : 'bg-[#192747]/60 border-slate-700 opacity-70'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🧴</span>
            <div>
              <div className="text-xs font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '१. औषधीय तेल' : currentLanguage === 'bn' ? '১. ভেষজ তেল' : '1. Sesame Oil'}
              </div>
              <div className="text-[10px] text-[#FFF5DE]/60">Warm Herb Infusion</div>
            </div>
          </div>
          {completedSteps.includes(1) && <Check className="w-3.5 h-3.5 text-[#D6AD60]" />}
        </button>

        <button
          onClick={() => handlePerformStep(2)}
          className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            currentStep === 2
              ? 'bg-[#D6AD60]/25 border-[#D6AD60] shadow-sm'
              : completedSteps.includes(2)
              ? 'bg-[#192747]/80 border-[#D6AD60]/40 text-[#FFF5DE]'
              : 'bg-[#192747]/60 border-slate-700 opacity-70'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <div>
              <div className="text-xs font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '२. चंदन उबटन' : currentLanguage === 'bn' ? '২. চন্দন লেপন' : '2. Gandha Paste'}
              </div>
              <div className="text-[10px] text-[#FFF5DE]/60">Sandalwood Lepa</div>
            </div>
          </div>
          {completedSteps.includes(2) && <Check className="w-3.5 h-3.5 text-[#D6AD60]" />}
        </button>

        <button
          onClick={() => handlePerformStep(3)}
          className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            currentStep === 3
              ? 'bg-[#D6AD60]/25 border-[#D6AD60] shadow-sm'
              : completedSteps.includes(3)
              ? 'bg-[#192747]/80 border-[#D6AD60]/40 text-[#FFF5DE]'
              : 'bg-[#192747]/60 border-slate-700 opacity-70'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🌊</span>
            <div>
              <div className="text-xs font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '३. पावन स्नान' : currentLanguage === 'bn' ? '৩. পবিত্র স্নান' : '3. Holy Bath'}
              </div>
              <div className="text-[10px] text-[#FFF5DE]/60">Warm Water Purify</div>
            </div>
          </div>
          {completedSteps.includes(3) && <Check className="w-3.5 h-3.5 text-[#D6AD60]" />}
        </button>

        <button
          onClick={() => handlePerformStep(4)}
          className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            currentStep === 4
              ? 'bg-[#D6AD60]/25 border-[#D6AD60] shadow-sm'
              : completedSteps.includes(4)
              ? 'bg-[#192747]/80 border-[#D6AD60]/40 text-[#FFF5DE]'
              : 'bg-[#192747]/60 border-slate-700 opacity-70'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🪔</span>
            <div>
              <div className="text-xs font-bold text-[#F4D995]">
                {currentLanguage === 'hi' ? '४. दीप व वस्त्र' : currentLanguage === 'bn' ? '৪. দীপ ও পোশাক' : '4. Silks & Diya'}
              </div>
              <div className="text-[10px] text-[#FFF5DE]/60">Kuthuvilakku Light</div>
            </div>
          </div>
          {completedSteps.includes(4) && <Check className="w-3.5 h-3.5 text-[#D6AD60]" />}
        </button>
      </div>

      {/* Completion Toast */}
      {isAllComplete && (
        <div className="w-full mt-3 p-3 rounded-2xl bg-[#192747]/95 border border-[#D6AD60] text-center animate-fade-in space-y-1">
          <span className="text-2xl">✨ ದೀಪಾವಳಿ ಹಬ್ಬದ ಶುಭಾಶಯಗಳು ✨</span>
          <h5 className="font-royal text-sm sm:text-base font-bold text-[#F4D995]">
            {currentLanguage === 'hi'
              ? 'एण्णे मेज्जन अनुष्ठान संपन्न: शरीर व मन को नई स्फूर्ति!'
              : currentLanguage === 'bn'
              ? 'এন্নে মেজ্জনা আচার সম্পন্ন: শরীর ও মনে নবচেতনার উন্মেষ!'
              : 'Enne Mejjana Cleansing Completed: Body & Mind Renewed!'}
          </h5>
          <p className="text-xs text-[#FFF5DE]/85">
            {currentLanguage === 'hi'
              ? 'राजा बलि और भगवान श्रीकृष्ण के आशीर्वाद से आपका घर सुख और शांति से भर जाए।'
              : currentLanguage === 'bn'
              ? 'রাজা বলি ও শ্রীকৃষ্ণের কৃপায় আপনার পরিবারে চিরসুখ ও মঙ্গল বিরাজ করুক।'
              : 'May the righteous blessings of King Mahabali and divine protection illuminate your life.'}
          </p>
        </div>
      )}
    </div>
  );
};
