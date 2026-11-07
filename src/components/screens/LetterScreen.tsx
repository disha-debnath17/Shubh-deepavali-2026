/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Share2, X, Heart, Sparkles, PenTool, Mail, ArrowRight, Download, Award } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import { getLetterForRecipient } from '../../config/letters';
import { GIFTS, resolveGiftConfig } from '../../config/gifts';
import { DigitalGreetingCreator } from '../greeting/DigitalGreetingCreator';
import { WishAcrossIndiaSection } from '../wishes/WishAcrossIndiaSection';
import { DiwaliKeepsakeCollage } from '../keepsake/DiwaliKeepsakeCollage';
import { DecorationState } from '../../types';

interface LetterScreenProps {
  userName: string;
  userState?: string;
  recipientKey: string | null;
  onRestart: () => void;
  onOpenShare: () => void;
  currentLanguage: Language;
  onOpenAudioCredits?: () => void;
  initialTab?: 'read-letter' | 'create-greeting' | 'keepsake';
  onNavigateToScreen?: (screen: number) => void;
  decoration?: DecorationState;
  onOpenEcoMela?: () => void;
}

export const LetterScreen: React.FC<LetterScreenProps> = ({
  userName,
  userState,
  recipientKey,
  onRestart,
  onOpenShare,
  currentLanguage,
  onOpenAudioCredits,
  initialTab = 'read-letter',
  onNavigateToScreen,
  decoration,
  onOpenEcoMela,
}) => {
  const t = TRANSLATIONS[currentLanguage].letter;
  const [activeTab, setActiveTab] = useState<'read-letter' | 'create-greeting' | 'keepsake'>(initialTab);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  React.useEffect(() => {
    if (!isLetterOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLetterOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLetterOpen]);

  // Retrieve personalized letter strictly for this recipient or recognized user
  const letterData = getLetterForRecipient(recipientKey, userName);
  const letter = letterData[currentLanguage] || letterData.en;

  // Recipient / visitor name for handwritten envelope label and personalized note
  const giftConfig = resolveGiftConfig(recipientKey || 'default');
  const visitorName =
    userName?.trim() ||
    (recipientKey ? giftConfig.name[currentLanguage] || giftConfig.name.en : '') ||
    (currentLanguage === 'hi' ? 'प्रिय मित्र' : currentLanguage === 'bn' ? 'প্রিয় বন্ধু' : 'Friend');

  const handleOpenEnvelope = () => {
    if (isOpening || isLetterOpen) return;
    setIsOpening(true);
    audioManager.playLetterOpenSound();

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D6AD60', '#F4D995', '#FFF5DE', '#E91E63', '#B71C1C'],
      });
    }

    setTimeout(
      () => {
        setIsLetterOpen(true);
        setIsOpening(false);
      },
      prefersReducedMotion ? 100 : 700
    );
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-between px-3 sm:px-6 py-4 sm:py-8 max-w-5xl mx-auto text-center">
      {/* Ambient warm candlelight background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-35">
        <div className="w-[500px] h-[500px] rounded-full bg-radial from-[#FFB347]/20 via-[#D6AD60]/10 to-transparent blur-3xl" />
      </div>

      {/* Top Mode Navigation Switcher: [Read Special Note] vs [Diwali Keepsake Collage] vs [Create Greeting Letters] */}
      <div className="relative z-20 mb-4 sm:mb-6">
        <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-[#10172D]/90 border border-[#D6AD60]/40 shadow-xl backdrop-blur-md gap-1">
          <button
            onClick={() => {
              audioManager.playClickSound();
              setActiveTab('read-letter');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'read-letter'
                ? 'bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] text-[#10172D] shadow-md'
                : 'text-[#FFF5DE]/75 hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>{t.tabSealedLetter}</span>
          </button>

          <button
            onClick={() => {
              audioManager.playSparkleSound();
              setActiveTab('keepsake');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'keepsake'
                ? 'bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] text-[#10172D] shadow-md'
                : 'text-[#FFF5DE]/75 hover:text-[#F4D995]'
            }`}
          >
            <Download className="w-4 h-4 text-[#FFB347]" />
            <span>{t.tabKeepsake}</span>
          </button>

          <button
            onClick={() => {
              audioManager.playSparkleSound();
              setActiveTab('create-greeting');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'create-greeting'
                ? 'bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] text-[#10172D] shadow-md'
                : 'text-[#FFF5DE]/75 hover:text-[#F4D995]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FFB347]" />
            <span>{t.tabAiLetters}</span>
          </button>
        </div>
      </div>

      {/* -------------------- TAB 1: READ SEALED LETTER -------------------- */}
      {activeTab === 'read-letter' && (
        <div className="relative z-10 w-full flex flex-col items-center animate-fade-in my-auto">
          {/* Screen Heading */}
          <div className="text-center max-w-md mx-auto mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/20 text-[#F4D995] text-xs font-semibold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 text-[#FFB347] fill-[#FFB347]" />
              <span>{t.badge}</span>
            </div>
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#FFF5DE]">
              {t.heading}
            </h2>
            <p className="font-editorial text-xs sm:text-sm md:text-base text-[#F4D995] italic mt-1 font-light">
              {t.subheading}
            </p>
          </div>

          {/* REALISTIC ENVELOPE on Dark Wooden / Navy Surface */}
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <div
              onClick={handleOpenEnvelope}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenEnvelope();
                }
              }}
              aria-label="Tap to open the sealed handwritten Diwali letter"
              className="relative w-full aspect-[16/11] max-w-[420px] rounded-2xl cursor-pointer group select-none transition-transform duration-500 hover:scale-102 active:scale-98 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFD54F]"
              style={{
                transform: 'rotate(-1.5deg)',
                perspective: '1200px',
              }}
            >
              {/* Realistic Paper Envelope Body */}
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#FFFBF2] via-[#F7EFE0] to-[#EFE2CB] border border-[#D6AD60]/70 shadow-2xl shadow-black/90 overflow-hidden flex flex-col justify-between p-5 text-left">
                {/* Subtle paper grain texture overlay */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none bg-repeat"
                  style={{
                    backgroundImage:
                      'radial-gradient(#8A6726 0.75px, transparent 0.75px), radial-gradient(#8A6726 0.75px, #F7EFE0 0.75px)',
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 8px 8px',
                  }}
                />

                {/* Folded Envelope Seams */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 400 275"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 0 L 200 135 L 400 0"
                    fill="none"
                    stroke="#D6AD60"
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                  <path
                    d="M 0 275 L 145 130"
                    fill="none"
                    stroke="#C59B48"
                    strokeWidth="1.2"
                    opacity="0.3"
                  />
                  <path
                    d="M 400 275 L 255 130"
                    fill="none"
                    stroke="#C59B48"
                    strokeWidth="1.2"
                    opacity="0.3"
                  />
                </svg>

                {/* Top Flap with 3D Rotate Animation when Opening */}
                <div
                  className={`absolute top-0 inset-x-0 h-1/2 origin-top transition-transform duration-700 ease-in-out pointer-events-none ${
                    isOpening ? '[transform:rotateX(180deg)] opacity-60' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <svg
                    viewBox="0 0 400 140"
                    className="w-full h-full filter drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
                    preserveAspectRatio="none"
                  >
                    <polygon
                      points="0,0 400,0 200,135"
                      fill="#FFF7E6"
                      stroke="#D6AD60"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                {/* Postmark / Stamp */}
                <div className="self-end flex flex-col items-center border border-[#8A6726]/40 rounded-lg p-1.5 bg-[#FFF9ED]/80 shadow-xs z-10">
                  <span className="text-[9px] font-bold text-[#8A6726] tracking-widest uppercase">
                    SHUBH DEEPAVALI
                  </span>
                  <span className="text-base">🪔</span>
                  <span className="text-[8px] text-[#8A6726]/75">2026 · INDIA</span>
                </div>

                {/* Handwritten Label */}
                <div className="z-10 mt-auto pl-2 pb-1">
                  <span className="text-[10px] sm:text-xs text-[#8A6726]/85 uppercase tracking-widest font-semibold block mb-0.5">
                    Special Delivery · Shubh Deepavali
                  </span>
                  <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E2723] tracking-wide">
                    To {visitorName}
                  </p>
                  <p className="font-editorial text-xs italic text-[#5D4037]/80">
                    With endless love & blessings ✨
                  </p>
                </div>

                {/* Deep-Red Royal Wax Seal */}
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-transform duration-500 ${
                    isOpening ? 'scale-125 rotate-12 opacity-80' : 'group-hover:scale-108'
                  }`}
                >
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
                      <defs>
                        <radialGradient id="waxRedGrad" cx="40%" cy="35%" r="60%">
                          <stop offset="0%" stopColor="#D32F2F" />
                          <stop offset="45%" stopColor="#B71C1C" />
                          <stop offset="85%" stopColor="#7F0000" />
                          <stop offset="100%" stopColor="#4A0000" />
                        </radialGradient>
                      </defs>
                      <path
                        d="M 50 8 C 68 6, 85 18, 90 35 C 95 52, 88 74, 75 88 C 58 98, 38 94, 22 86 C 8 74, 6 52, 10 35 C 15 15, 32 10, 50 8 Z"
                        fill="url(#waxRedGrad)"
                        stroke="#4A0000"
                        strokeWidth="1.5"
                      />
                      <circle cx="50" cy="50" r="28" fill="none" stroke="#F4D995" strokeWidth="1.2" opacity="0.6" strokeDasharray="3 2" />
                      <g transform="translate(50, 48) scale(0.9)">
                        <path
                          d="M -12 6 C -12 14, 12 14, 12 6 C 9 4, 5 2, 0 2 C -5 2, -9 4, -12 6 Z"
                          fill="#F4D995"
                        />
                        <path
                          d="M 0 -8 C -4 -2, -5 2, 0 6 C 5 2, 4 -2, 0 -8 Z"
                          fill="#FFF5DE"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hint Badge beneath Envelope */}
              <div className="absolute -bottom-4 inset-x-0 flex justify-center pointer-events-none">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] text-[#10172D] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-[#10172D]" />
                  <span>{t.openLetterBtn}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Keepsake Collage Showcase Banner: "DOWNLOAD OFFICIAL DIWALI KEEPSAKE COLLAGE" */}
          <div className="w-full max-w-xl mx-auto mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#192747]/95 via-[#10172D]/95 to-[#192747]/95 border-2 border-[#D6AD60]/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[#FFB347] text-xs font-bold uppercase tracking-wider">
                <Download className="w-3.5 h-3.5 text-[#F4D995]" />
                <span>
                  {currentLanguage === 'hi'
                    ? 'अंतिम दीपोत्सव संस्मरण कोलाज'
                    : currentLanguage === 'bn'
                    ? 'চূড়ান্ত দীপাবলি স্মারক কোলাজ'
                    : 'Your Festival Souvenir ✨'}
                </span>
              </div>
              <h4 className="font-royal text-base sm:text-lg font-bold text-[#FFF5DE]">
                {currentLanguage === 'hi'
                  ? 'सजा हुआ घर, क्षेत्रीय पहचान व मेले की उपलब्धियों का कोलाज'
                  : currentLanguage === 'bn'
                  ? 'সজ্জিত গৃহ, আঞ্চলিক ঐতিহ্য ও মেলার স্মারক কোলাজ'
                  : 'Your Festive Journey, All in One Place'}
              </h4>
              <p className="text-xs text-[#FFF5DE]/75 font-light">
                {currentLanguage === 'hi'
                  ? 'अपनी क्षेत्रीय शुभकामना और स्मृति के साथ एक सुंदर HD चित्र डाउनलोड करें।'
                  : currentLanguage === 'bn'
                  ? 'আপনার আঞ্চলিক শুভেচ্ছা ও স্মৃতি সহ একটি অপরূপ HD চিত্র ডাউনলোড করুন।'
                  : 'Download your special Diwali memory!'}
              </p>
            </div>

            <button
              onClick={() => {
                audioManager.playSparkleSound();
                setActiveTab('keepsake');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-[#10172D]" />
              <span>
                {currentLanguage === 'hi'
                  ? 'कोलाज देखें व डाउनलोड करें'
                  : currentLanguage === 'bn'
                  ? 'কোলাজ দেখুন ও ডাউনলোড করুন'
                  : 'Get Keepsake Image'}
              </span>
              <ArrowRight className="w-4 h-4 text-[#10172D]" />
            </button>
          </div>

          {/* Feature Showcase Banner: "CREATE PERSONALIZED DIGITAL GREETING LETTERS" */}
          <div className="w-full max-w-xl mx-auto mt-8 sm:mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#192747]/95 via-[#16233E]/95 to-[#192747]/95 border border-[#D6AD60]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[#FFB347] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#F4D995]" />
                <span>
                  {currentLanguage === 'hi'
                    ? 'अपनों को भेजें खास दिवाली संदेश'
                    : currentLanguage === 'bn'
                    ? 'প্রিয়জনদের পাঠান বিশেষ দীপাবলি বার্তা'
                    : 'Create Your Diwali Greetings ✨'}
                </span>
              </div>
              <h4 className="font-royal text-base sm:text-lg font-bold text-[#FFF5DE]">
                {currentLanguage === 'hi'
                  ? 'माता-पिता, दादा-दादी, भाई-बहन, दोस्तों व गुरुजनों के लिए पत्र बनाएं'
                  : currentLanguage === 'bn'
                  ? 'বাবা-মা, দাদু-দিদা, ভাই-বোন, শিক্ষক ও বন্ধুদের জন্য চিঠি তৈরি করুন'
                  : 'Make Special Cards for Your Loved Ones'}
              </h4>
              <p className="text-xs text-[#FFF5DE]/75 font-light">
                {currentLanguage === 'hi'
                  ? 'पारंपरिक दीयों, गेंदा तोरण, हस्तलिखित फॉन्ट और डाउनलोड-शेयर सुविधा संग।'
                  : currentLanguage === 'bn'
                  ? 'ঐতিহ্যবাহী প্রদীপ, গাঁদা ফুল, হাতের লেখার শৈলী ও ডাউনলোড-শেয়ার সহ।'
                  : 'Add names, decorate and download your card!'}
              </p>
            </div>

            <button
              onClick={() => {
                audioManager.playSparkleSound();
                setActiveTab('create-greeting');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-[#10172D]" />
              <span>
                {currentLanguage === 'hi'
                  ? '✦ जेमिनी AI से पत्र बनाएं'
                  : currentLanguage === 'bn'
                  ? '✦ জেমিনি AI দিয়ে চিঠি লিখুন'
                  : '✦ Compose with Gemini AI'}
              </span>
              <ArrowRight className="w-4 h-4 text-[#10172D]" />
            </button>
          </div>

          {/* ============================================================== */}
          {/* SECTION: A Wish Across India - Six Wishes, One Celebration ❤️ */}
          {/* ============================================================== */}
          <WishAcrossIndiaSection
            currentLanguage={currentLanguage}
            defaultUserName={userName}
            defaultUserState={userState}
          />

          {/* Action Footer Buttons: Celebrate Again & Share */}
          <div className="w-full max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center gap-2.5 mt-6">
            <button
              onClick={onRestart}
              className="w-full sm:w-auto flex-1 min-h-[44px] px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-[#FFF5DE] bg-[#192747]/80 hover:bg-[#192747] border border-[#D6AD60]/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <RotateCcw className="w-4 h-4 text-[#F4D995]" />
              <span>{t.celebrateAgainBtn}</span>
            </button>

            <button
              onClick={onOpenShare}
              className="w-full sm:w-auto flex-1 min-h-[44px] px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 border border-[#FFF5DE]/40 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D6AD60]/20 active:scale-98"
            >
              <Share2 className="w-4 h-4 text-[#10172D]" />
              <span>{t.shareBtn}</span>
            </button>
          </div>

          {/* Audio & Community Licences link */}
          {onOpenAudioCredits && (
            <div className="text-center mt-6 pt-4 border-t border-[#D6AD60]/20">
              <button
                type="button"
                onClick={() => {
                  audioManager.playClickSound();
                  onOpenAudioCredits();
                }}
                className="text-xs text-[#F4D995]/75 hover:text-[#FFF5DE] transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>🎵</span>
                <span className="underline decoration-dotted">
                  {currentLanguage === 'hi'
                    ? 'ध्वनि आभार एवं लाइसेंस विवरण देखें'
                    : currentLanguage === 'bn'
                    ? 'অডিও ঋণস্বীকার ও লাইসেন্স বিবরণ দেখুন'
                    : 'View Audio Credits & Community Licences'}
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* -------------------- TAB 2: DOWNLOADABLE DIWALI KEEPSAKE COLLAGE -------------------- */}
      {activeTab === 'keepsake' && (
        <div className="relative z-10 w-full animate-fade-in my-auto flex flex-col items-center">
          {/* Full Celebration Journey Banner */}
          <div className="w-full max-w-4xl mb-3 px-2">
            <div className="p-3 rounded-2xl bg-[#192747]/80 border border-[#D6AD60]/40 flex flex-wrap items-center justify-between gap-2.5 shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪔</span>
                <span className="text-xs text-[#FFF5DE]/90">
                  {currentLanguage === 'hi'
                    ? 'हवेली का 6-चरणीय दीपोत्सव (मिट्टी के दीये, आतिशबाज़ी, मिठाई, उपहार) भी देखें!'
                    : currentLanguage === 'bn'
                    ? 'সম্পূর্ণ ৬-ধাপের দীপাবলি উৎসব (মাটির প্রদীপ, আতশবাজি, মিষ্টি, উপহার) উদযাপন করুন!'
                    : 'Experience the full 6-screen haveli celebration (diyas, fireworks, sweets & gifts)!'}
                </span>
              </div>
              <button
                onClick={() => {
                  audioManager.playClickSound();
                  if (onNavigateToScreen) {
                    onNavigateToScreen(2);
                  } else {
                    onRestart();
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#D6AD60]/25 hover:bg-[#D6AD60]/40 text-[#F4D995] border border-[#D6AD60]/60 transition-all flex items-center gap-1.5 cursor-pointer ml-auto hover:text-[#FFF5DE]"
              >
                <span>
                  {currentLanguage === 'hi'
                    ? 'उत्सव यात्रा शुरू करें'
                    : currentLanguage === 'bn'
                    ? 'উৎসব শুরু করুন'
                    : 'Start Celebration Journey'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F4D995]" />
              </button>
            </div>
          </div>

          <DiwaliKeepsakeCollage
            userName={userName}
            userState={userState}
            currentLanguage={currentLanguage}
            decoration={decoration}
            onCelebrateAgain={onRestart}
            onNavigateToScreen={onNavigateToScreen}
            onOpenEcoMela={onOpenEcoMela}
          />
        </div>
      )}

      {/* -------------------- TAB 3: CREATE PERSONALIZED DIGITAL GREETING LETTERS -------------------- */}
      {activeTab === 'create-greeting' && (
        <div className="relative z-10 w-full animate-fade-in my-auto flex flex-col items-center">
          {/* Full Celebration Journey Banner */}
          <div className="w-full max-w-3xl mb-3 px-2">
            <div className="p-3 rounded-2xl bg-[#192747]/80 border border-[#D6AD60]/40 flex flex-wrap items-center justify-between gap-2.5 shadow-md">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪔</span>
                <span className="text-xs text-[#FFF5DE]/90">
                  {currentLanguage === 'hi'
                    ? 'हवेली का 6-चरणीय दीपोत्सव (मिट्टी के दीये, आतिशबाज़ी, मिठाई, उपहार) भी देखें!'
                    : currentLanguage === 'bn'
                    ? 'সম্পূর্ণ ৬-ধাপের দীপাবলি উৎসব (মাটির প্রদীপ, আতশবাজি, মিষ্টি, উপহার) উদযাপন করুন!'
                    : 'Experience the full 6-screen haveli celebration (diyas, fireworks, sweets & gifts)!'}
                </span>
              </div>
              <button
                onClick={() => {
                  audioManager.playClickSound();
                  if (onNavigateToScreen) {
                    onNavigateToScreen(2);
                  } else {
                    onRestart();
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#D6AD60]/25 hover:bg-[#D6AD60]/40 text-[#F4D995] border border-[#D6AD60]/60 transition-all flex items-center gap-1.5 cursor-pointer ml-auto hover:text-[#FFF5DE]"
              >
                <span>
                  {currentLanguage === 'hi'
                    ? 'उत्सव यात्रा शुरू करें'
                    : currentLanguage === 'bn'
                    ? 'উৎসব শুরু করুন'
                    : 'Start Celebration Journey'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F4D995]" />
              </button>
            </div>
          </div>

          <DigitalGreetingCreator
            currentLanguage={currentLanguage}
            defaultUserName={userName}
            defaultUserState={userState}
            onDone={() => setActiveTab('read-letter')}
          />
        </div>
      )}

      {/* FULL-SCREEN UNFOLDED PARCHMENT LETTER MODAL */}
      {isLetterOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl bg-gradient-to-b from-[#FFFDF7] via-[#FAF3E5] to-[#F3E7D3] border-2 border-[#D6AD60] shadow-2xl text-left overflow-hidden">
            {/* Decorative Marigold Floral Border Header Strip */}
            <div className="h-3 w-full bg-gradient-to-r from-[#FFB347] via-[#D6AD60] to-[#E91E63]" />

            {/* Close Button */}
            <button
              onClick={() => setIsLetterOpen(false)}
              aria-label="Close letter"
              className="absolute top-4 right-4 z-20 min-w-[44px] min-h-[44px] rounded-full bg-[#10172D]/10 hover:bg-[#10172D]/20 text-[#3E2723] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8A6726]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Letter Parchment Content with faint ruled lines */}
            <div
              className="p-5 sm:p-8 overflow-y-auto font-handwriting text-[#2A1810] space-y-4 text-base sm:text-lg leading-relaxed"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(transparent, transparent 33px, rgba(138, 103, 38, 0.1) 33px, rgba(138, 103, 38, 0.1) 34px)',
                lineHeight: '34px',
              }}
            >
              {/* Header Letterhead */}
              <div className="flex items-center justify-between pb-3 border-b border-[#D6AD60]/40">
                <div className="flex items-center gap-2">
                  <span className="text-xl" aria-hidden="true">🪔</span>
                  <span
                    id="letter-modal-title"
                    className="font-royal text-xs sm:text-sm font-bold tracking-widest uppercase text-[#8A6726]"
                  >
                    SHUBH DEEPAVALI · FESTIVAL OF LIGHTS
                  </span>
                </div>
                <span className="text-xs font-editorial italic text-[#8A6726]/80 hidden sm:inline">
                  Deepavali 2026
                </span>
              </div>

              {/* Salutation: Personalized to recipient/user */}
              <h3 className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E120A] tracking-wide pt-1">
                {letter.salutation}
              </h3>

              {/* The Heartfelt Personalized Diwali Message */}
              <div className="relative pl-4 sm:pl-6 border-l-2 border-[#D6AD60]/70 py-1 space-y-3.5 my-3 bg-[#FAF3E3]/50 rounded-r-2xl p-4 sm:p-5 shadow-xs">
                <span className="font-editorial text-4xl sm:text-5xl text-[#D6AD60]/40 absolute -top-3 left-1 pointer-events-none select-none">
                  “
                </span>

                <p className="font-handwriting text-base sm:text-lg md:text-xl text-[#2B1810] font-medium leading-relaxed">
                  {letter.p1}
                </p>

                <p className="font-handwriting text-base sm:text-lg md:text-xl text-[#2B1810] font-medium leading-relaxed">
                  {letter.p2}
                </p>

                <p className="font-handwriting text-base sm:text-lg md:text-xl text-[#2B1810] font-bold leading-relaxed text-[#5A3816]">
                  {letter.p3}
                </p>
              </div>

              {/* Closing & Signature */}
              <div className="pt-3 border-t border-[#D6AD60]/35 space-y-1">
                <p className="font-editorial text-xs sm:text-sm italic text-[#5D4037]/85">
                  {letter.closing}
                </p>
                <p className="font-royal text-base sm:text-lg font-bold text-[#1E120A] tracking-wider">
                  {letter.signature}
                </p>
              </div>

              {/* Little Diya Stamp at Bottom */}
              <div className="flex flex-col items-center justify-center pt-2 select-none">
                <span className="text-3xl animate-pulse" role="img" aria-label="Glowing Diya">
                  🪔
                </span>
                <span className="text-[10px] text-[#8A6726] tracking-widest uppercase font-semibold mt-1">
                  तमसो मा ज्योतिर्गमय
                </span>
              </div>
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-3 bg-[#EFE2CB] border-t border-[#D6AD60]/40 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setIsLetterOpen(false);
                    setActiveTab('keepsake');
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#192747] text-[#F4D995] hover:bg-[#10172D] border border-[#D6AD60] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-[#FFB347]" />
                  <span>
                    {currentLanguage === 'hi'
                      ? '🎨 संस्मरण कोलाज (HD)'
                      : currentLanguage === 'bn'
                      ? '🎨 স্মারক কোলাজ (HD)'
                      : '🎨 Keepsake Collage (HD)'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setIsLetterOpen(false);
                    setActiveTab('create-greeting');
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#FAF3E5] text-[#3E2723] hover:bg-[#F3E7D3] border border-[#D6AD60]/60 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
                  <span>
                    {currentLanguage === 'hi'
                      ? '✦ जेमिनी AI पत्र'
                      : currentLanguage === 'bn'
                      ? '✦ জেমিনি AI শুভেচ্ছা'
                      : '✦ Gemini AI Letters'}
                  </span>
                </button>
              </div>

              <button
                onClick={() => setIsLetterOpen(false)}
                className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#10172D] text-[#F4D995] hover:bg-[#192747] transition-all cursor-pointer ml-auto"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
