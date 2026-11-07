/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Sparkles, BookOpen, ChevronRight, CheckCircle2, Volume2, Info } from 'lucide-react';
import { RegionalActivity } from '../../types';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import { ChoddoProdipActivity } from './ChoddoProdipActivity';
import { AlponaCreatorActivity } from './AlponaCreatorActivity';
import { KaliPujoActivity } from './KaliPujoActivity';
import { FaralPlatterActivity } from './FaralPlatterActivity';
import { ChopdaPujanActivity } from './ChopdaPujanActivity';
import { EnneMejjanaActivity } from './EnneMejjanaActivity';
import { DiwaliPahatActivity } from './DiwaliPahatActivity';
import { AyodhyaDeepotsavActivity } from './AyodhyaDeepotsavActivity';
import { GangaSnanamActivity } from './GangaSnanamActivity';
import { BaliPadyamiActivity } from './BaliPadyamiActivity';
import { BandiChhorActivity } from './BandiChhorActivity';
import { RajasthaniMandanaActivity } from './RajasthaniMandanaActivity';
import { BadabaduaDakaActivity } from './BadabaduaDakaActivity';
import { GujaratiRangoliActivity } from './GujaratiRangoliActivity';
import { NarakasuraDahanActivity } from './NarakasuraDahanActivity';
import { UniversalTraditionActivity } from './UniversalTraditionActivity';

interface TraditionExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: RegionalActivity | null;
  currentLanguage: Language;
}

export const TraditionExperienceModal: React.FC<TraditionExperienceModalProps> = ({
  isOpen,
  onClose,
  activity,
  currentLanguage,
}) => {
  const [showCulturalMeaning, setShowCulturalMeaning] = useState<boolean>(true);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        audioManager.playClickSound();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !activity) return null;

  const t = TRANSLATIONS[currentLanguage].regional;

  const handleClose = () => {
    audioManager.playClickSound();
    onClose();
  };

  const renderActivityComponent = () => {
    switch (activity.type) {
      case 'choddo-prodip':
        return <ChoddoProdipActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'alpona-creator':
        return <AlponaCreatorActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'kali-pujo':
        return <KaliPujoActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'faral-platter':
        return <FaralPlatterActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'diwali-pahat':
        return <DiwaliPahatActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'chopda-pujan':
        return <ChopdaPujanActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'gujarati-rangoli':
        return <GujaratiRangoliActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'enne-mejjana':
        return <EnneMejjanaActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'bali-padyami':
        return <BaliPadyamiActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'ayodhya-deepotsav':
        return <AyodhyaDeepotsavActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'ganga-snanam':
        return <GangaSnanamActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'bandi-chhor':
        return <BandiChhorActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'rajasthani-mandana':
        return <RajasthaniMandanaActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'badabadua-daka':
        return <BadabaduaDakaActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      case 'narakasura-dahan':
        return <NarakasuraDahanActivity currentLanguage={currentLanguage} onComplete={() => setHasCompleted(true)} />;
      default:
        return (
          <UniversalTraditionActivity
            activity={activity}
            currentLanguage={currentLanguage}
            onComplete={() => setHasCompleted(true)}
          />
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tradition-experience-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60]/50 shadow-2xl flex flex-col overflow-hidden text-[#FFF5DE]">
        {/* Festive Golden Marigold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F5A623] via-[#F4D995] to-[#B5532A] z-10" />

        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#D6AD60]/20 flex items-center justify-between gap-3 bg-[#10172D]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl shrink-0" aria-hidden="true">{activity.icon}</span>
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D6AD60]/15 border border-[#D6AD60]/30 text-[10px] sm:text-xs font-semibold text-[#F4D995]">
                <span>{activity.badge[currentLanguage]}</span>
              </div>
              <h2
                id="tradition-experience-modal-title"
                className="font-royal text-base sm:text-lg md:text-xl font-bold text-[#FFF5DE] truncate"
              >
                {activity.title[currentLanguage]}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowCulturalMeaning((prev) => !prev)}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F] ${
                showCulturalMeaning
                  ? 'bg-[#D6AD60]/20 border-[#D6AD60] text-[#F4D995]'
                  : 'bg-[#192747] border-slate-700 text-slate-300 hover:text-white'
              }`}
              aria-expanded={showCulturalMeaning}
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">{t.whyWeCelebrateSection}</span>
            </button>

            <button
              onClick={handleClose}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-xl border border-[#D6AD60]/30 bg-[#192747] text-[#FFF5DE]/70 hover:text-white hover:bg-[#D6AD60]/20 transition-all cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
              aria-label="Close tradition explorer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-5">
          {/* Active Interactive Experience Component */}
          <div className="w-full">
            {renderActivityComponent()}
          </div>

          {/* Cultural Meaning: "Why We Celebrate This" Section */}
          {showCulturalMeaning && (
            <div className="w-full rounded-2xl bg-[#141F38]/90 border border-[#D6AD60]/40 p-4 sm:p-5 space-y-3.5 shadow-md">
              <div className="flex items-center justify-between border-b border-[#D6AD60]/20 pb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FFB347]" />
                  <h4 className="font-royal text-sm sm:text-base font-bold text-[#F4D995]">
                    {t.whyWeCelebrateSection} · {activity.title[currentLanguage]}
                  </h4>
                </div>
                <span className="text-[11px] text-[#FFF5DE]/60 italic">
                  Cultural Heritage & History
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-[13px] leading-relaxed">
                {/* 1. What This Tradition Is */}
                <div className="p-3 rounded-xl bg-[#10172D]/70 border border-[#D6AD60]/20 space-y-1">
                  <div className="font-semibold text-[#F4D995] flex items-center gap-1.5">
                    <span className="text-sm">🪔</span>
                    <span>{t.whatIsTradition}</span>
                  </div>
                  <p className="text-[#FFF5DE]/85">
                    {activity.whyWeCelebrate.what[currentLanguage]}
                  </p>
                </div>

                {/* 2. Why It Is Followed */}
                <div className="p-3 rounded-xl bg-[#10172D]/70 border border-[#D6AD60]/20 space-y-1">
                  <div className="font-semibold text-[#F4D995] flex items-center gap-1.5">
                    <span className="text-sm">❤️</span>
                    <span>{t.whyFollowed}</span>
                  </div>
                  <p className="text-[#FFF5DE]/85">
                    {activity.whyWeCelebrate.why[currentLanguage]}
                  </p>
                </div>

                {/* 3. Cultural & Spiritual Significance */}
                <div className="p-3 rounded-xl bg-[#10172D]/70 border border-[#D6AD60]/20 space-y-1">
                  <div className="font-semibold text-[#F4D995] flex items-center gap-1.5">
                    <span className="text-sm">✨</span>
                    <span>{t.culturalSignificance}</span>
                  </div>
                  <p className="text-[#FFF5DE]/85">
                    {activity.whyWeCelebrate.significance[currentLanguage]}
                  </p>
                </div>

                {/* 4. Regional Association */}
                <div className="p-3 rounded-xl bg-[#10172D]/70 border border-[#D6AD60]/20 space-y-1">
                  <div className="font-semibold text-[#F4D995] flex items-center gap-1.5">
                    <span className="text-sm">🇮🇳</span>
                    <span>{t.regionalAssociation}</span>
                  </div>
                  <p className="text-[#FFF5DE]/85">
                    {activity.whyWeCelebrate.connection[currentLanguage]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#D6AD60]/20 flex items-center justify-between gap-3 bg-[#10172D]/90 backdrop-blur-md shrink-0">
          <div className="text-xs text-[#FFF5DE]/70 truncate">
            {hasCompleted ? (
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 inline" />
                <span>{t.traditionCompleted}</span>
              </span>
            ) : (
              <span>✨ {activity.subtitle[currentLanguage]}</span>
            )}
          </div>

          <button
            onClick={handleClose}
            className="min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#10172D] bg-gradient-to-r from-[#F4D995] to-[#D6AD60] hover:brightness-110 active:scale-98 shadow-md cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
          >
            {TRANSLATIONS[currentLanguage].regional.closeExplorer}
          </button>
        </div>
      </div>
    </div>
  );
};
