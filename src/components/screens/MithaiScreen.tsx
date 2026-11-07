/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, ChevronRight, RefreshCw, Sparkles } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import { ScratchMithaiBox } from '../mithai/ScratchMithaiBox';

interface MithaiScreenProps {
  userName: string;
  userState?: string;
  onContinue: () => void;
  currentLanguage: Language;
}

export const MithaiScreen: React.FC<MithaiScreenProps> = ({
  userName,
  userState,
  onContinue,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage].mithai;
  const [selectedBox, setSelectedBox] = useState<'kaju' | 'soan' | null>(null);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [scratchedState, setScratchedState] = useState<{ kaju: boolean; soan: boolean }>({
    kaju: false,
    soan: false,
  });

  const handleScratchComplete = (box: 'kaju' | 'soan') => {
    setScratchedState((prev) => ({ ...prev, [box]: true }));
  };

  const handleSelectBox = (box: 'kaju' | 'soan') => {
    // If not scratched yet, automatically mark as scratched on pick
    setScratchedState((prev) => ({ ...prev, [box]: true }));
    setSelectedBox(box);
    setIsOpened(true);
    audioManager.playMithaiRevealSound();

    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#FFB347', '#D6AD60', '#FFF5DE', '#E91E63', '#4CAF50'],
    });
  };

  const resetSelection = () => {
    audioManager.playClickSound();
    setSelectedBox(null);
    setIsOpened(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col items-center justify-start px-3.5 sm:px-4 py-4 md:py-8 max-w-4xl mx-auto">
      {/* Title & Introduction */}
      <div className="text-center w-full max-w-xl mb-3 md:mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/15 border border-[#D6AD60]/30 text-[#F4D995] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
          <span>{t.badge}</span>
        </div>
        <h2 className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFF5DE] leading-tight">
          {t.heading}
        </h2>
        <p className="font-editorial text-sm sm:text-base md:text-lg text-[#F4D995] italic mt-1 font-light">
          {t.subheading}
        </p>
      </div>

      {/* Two Sweet Boxes with Scratch-to-Reveal Effect */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-7 my-2">
        {/* BOX 1: KAJU KATLI */}
        <ScratchMithaiBox
          id="kaju"
          title={t.kajuTitle}
          badge={t.kajuBadge}
          desc={t.kajuDesc}
          boxImage="/images/kaju_katli_box.webp"
          // THE TWIST: Kaju Katli box contains the original existing Soan Papdi picture!
          insideImage="/images/mithai_soan_papdi.webp"
          twistLabel={t.kajuTwistLabel}
          isOpened={isOpened}
          isScratched={scratchedState.kaju}
          isSelected={selectedBox === 'kaju'}
          onScratchComplete={() => handleScratchComplete('kaju')}
          onSelect={() => handleSelectBox('kaju')}
          pickBtnText={t.kajuPickBtn}
          currentLanguage={currentLanguage}
        />

        {/* BOX 2: SOAN PAPDI */}
        <ScratchMithaiBox
          id="soan"
          title={t.soanTitle}
          badge={t.soanBadge}
          desc={t.soanDesc}
          boxImage="/images/soan_papdi_box.webp"
          // THE TWIST (OPPOSITE): Soan Papdi box contains the original existing Kaju Katli picture!
          insideImage="/images/mithai_kaju_katli.webp"
          twistLabel={t.soanTwistLabel}
          isOpened={isOpened}
          isScratched={scratchedState.soan}
          isSelected={selectedBox === 'soan'}
          onScratchComplete={() => handleScratchComplete('soan')}
          onSelect={() => handleSelectBox('soan')}
          pickBtnText={t.soanPickBtn}
          currentLanguage={currentLanguage}
        />
      </div>

      {/* REVEAL & FUNNY SURPRISE MESSAGE */}
      {isOpened && (
        <div className="w-full max-w-xl mx-auto my-4 sm:my-5 p-5 sm:p-6 rounded-2xl border-2 border-[#D6AD60] bg-gradient-to-b from-[#192747] via-[#10172D] to-[#0a0e1c] text-center shadow-2xl animate-fade-in gold-border-glow">
          {selectedBox === 'kaju' ? (
            // KAJU KATLI TWIST MESSAGE
            <div className="space-y-3">
              <div className="text-3xl sm:text-4xl animate-bounce">😭 📦 😂</div>
              <h4 className="font-royal text-xl sm:text-2xl md:text-3xl font-black text-[#FFB347] tracking-wide">
                {t.prankTitle}
              </h4>
              <p className="font-editorial text-lg sm:text-xl text-[#FFF5DE] italic font-semibold">
                {t.prankSubtitle}
              </p>
              <div className="p-3 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-amber-200 font-extrabold text-base sm:text-lg tracking-wider animate-pulse">
                {t.prankPunchline}
              </div>
              <p className="text-xs sm:text-sm text-[#F4D995] font-medium leading-relaxed max-w-md mx-auto">
                {t.prankMemeText}
              </p>
            </div>
          ) : (
            // SOAN PAPDI TWIST MESSAGE (OPPOSITE MIRACLE SURPRISE)
            <div className="space-y-3">
              <div className="text-3xl sm:text-4xl animate-bounce">👑 ✨ 😋</div>
              <h4 className="font-royal text-xl sm:text-2xl md:text-3xl font-black text-[#FFB347] tracking-wide">
                {t.soanPrankTitle}
              </h4>
              <p className="font-editorial text-lg sm:text-xl text-[#FFF5DE] italic font-semibold">
                {t.soanPrankSubtitle}
              </p>
              <div className="p-3 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-amber-200 font-extrabold text-base sm:text-lg tracking-wider animate-pulse">
                {t.soanPrankPunchline}
              </div>
              <p className="text-xs sm:text-sm text-[#F4D995] font-medium leading-relaxed max-w-md mx-auto">
                {t.soanPrankMemeText}
              </p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-[#D6AD60]/25 flex justify-center">
            <button
              onClick={resetSelection}
              className="text-xs sm:text-sm text-[#F4D995] hover:text-white flex items-center gap-1.5 underline underline-offset-4 cursor-pointer font-semibold py-1 px-3 rounded-lg hover:bg-white/5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.tryOtherBox}</span>
            </button>
          </div>
        </div>
      )}

      {/* POST-REVEAL "REAL GIFT" TRANSITION */}
      {isOpened && (
        <div className="text-center mt-2 mb-4 animate-fade-in space-y-2.5">
          <p className="font-royal text-sm sm:text-base font-semibold text-[#FFF5DE]">
            {t.realGiftNotice}
          </p>
          <button
            onClick={() => {
              audioManager.playSparkleSound();
              onContinue();
            }}
            className="min-h-[50px] px-8 py-3 rounded-xl font-extrabold text-sm sm:text-base text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-xl shadow-[#D6AD60]/25 flex items-center justify-center gap-2 mx-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF5DE]"
          >
            <Gift className="w-4 h-4 text-[#10172D]" />
            <span>{t.showRealGiftBtn}</span>
            <ChevronRight className="w-4 h-4 text-[#10172D]" />
          </button>
        </div>
      )}
    </div>
  );
};
