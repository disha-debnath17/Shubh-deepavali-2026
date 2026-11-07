import React, { useEffect } from 'react';
import { ArrowRight, Sparkles, MapPin, Compass, Edit3, Paintbrush, BookOpen, Utensils, Check, ExternalLink, Calendar, Info, ShieldCheck } from 'lucide-react';
import { MittiDiya } from '../MittiDiya';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { getRegionByName, getDefaultRegion } from '../../data/regionalData';
import { hasDedicatedActivities } from '../../data/regionalActivities';
import { audioManager } from '../../utils/audio';

interface PersonalizedWelcomeModalProps {
  isOpen: boolean;
  name: string;
  state: string;
  city?: string;
  currentLanguage: Language;
  onEnterCelebration: () => void;
  onOpenExplorer: () => void;
  onEditDetails: () => void;
}

export const PersonalizedWelcomeModal: React.FC<PersonalizedWelcomeModalProps> = ({
  isOpen,
  name,
  state,
  city,
  currentLanguage,
  onEnterCelebration,
  onOpenExplorer,
  onEditDetails,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        audioManager.playSparkleSound();
        audioManager.startAmbient();
        onEnterCelebration();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onEnterCelebration]);

  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage].welcome;
  const regT = TRANSLATIONS[currentLanguage].regional;
  const region = getRegionByName(state) || getDefaultRegion();
  const isPanIndia = region.id === 'all-india';

  const localizedRegionName =
    currentLanguage === 'hi'
      ? region.hi
      : currentLanguage === 'bn'
      ? region.bn
      : region.shortName || region.name;

  const locationText = city?.trim()
    ? `${city.trim()}, ${localizedRegionName}`
    : localizedRegionName;

  const handleCelebrateRegional = () => {
    audioManager.playSparkleSound();
    audioManager.startAmbient();
    onEnterCelebration();
  };

  const handleExploreOther = () => {
    audioManager.playClickSound();
    onOpenExplorer();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="personalized-welcome-title"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60]/50 p-4 sm:p-6 md:p-7 text-center shadow-2xl shadow-[#D6AD60]/20 overflow-y-auto text-[#FFF5DE]">
        {/* Festive Marigold & Gold Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F5A623] via-[#F4D995] to-[#B5532A]" />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-56 h-56 bg-[#D6AD60]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Centerpiece Mitti Diya with Warm Glow */}
        <div className="relative flex justify-center mb-2.5">
          <div className="p-2.5 rounded-full bg-[#10172D]/90 border border-[#D6AD60]/40 shadow-inner">
            <MittiDiya size={54} lit={true} ariaLabel="Warm welcome flame" stand="brass" />
          </div>
        </div>

        {/* Dynamic Emotional Greeting Title */}
        <div className="space-y-1 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D6AD60]/15 border border-[#D6AD60]/30 text-[#F4D995] text-[11px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#F5A623] animate-pulse" />
            <span>
              {isPanIndia
                ? currentLanguage === 'hi'
                  ? '🇮🇳 अखिल भारतीय सर्वव्यापी उत्सव'
                  : currentLanguage === 'bn'
                  ? '🇮🇳 সর্বভারতীয় সার্বজনীন মহোৎসব'
                  : '🇮🇳 Pan-India · Universal Celebration (28 States & 8 UTs)'
                : `${region.isUT ? 'Union Territory' : 'Indian State'} · ${localizedRegionName}`}
            </span>
          </div>

          <h2
            id="personalized-welcome-title"
            className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFF5DE] leading-tight"
          >
            {isPanIndia
              ? currentLanguage === 'hi'
                ? `${name || 'परिवार'}, भारत के साझा प्रकाश पर्व में आपका स्वागत है! 🪔`
                : currentLanguage === 'bn'
                ? `${name || 'পরিবার'}, ভারতের সমন্বিত আলোকমহোৎসবে আপনাকে স্বাগতম! 🪔`
                : `${name || 'Family'}, celebrate the unified light of India! 🪔`
              : currentLanguage === 'hi'
              ? `${name || 'परिवार'}, आपकी पावन दिवाली यात्रा ${localizedRegionName} से प्रारंभ होती है! ❤️`
              : currentLanguage === 'bn'
              ? `${name || 'পরিবার'}, আপনার পবিত্র দীপাবলি উৎসব ${localizedRegionName}-এ শুরু হোক! ❤️`
              : `${name || 'Family'}, your Diwali story begins in ${localizedRegionName}! ❤️`}
          </h2>

          {/* Emotional Tagline dynamically drawn from region */}
          <p className="font-editorial text-xs sm:text-sm md:text-base text-[#F4D995] italic font-normal leading-relaxed max-w-lg mx-auto">
            "{region.introTagline[currentLanguage]}"
          </p>
        </div>

        {/* Regional Festival Banner Card */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#10172D]/80 border border-[#D6AD60]/35 text-left mb-3.5 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#D6AD60]/20 pb-2">
            <span className="font-royal text-base sm:text-lg font-bold text-[#F4D995] flex items-center gap-1.5">
              <span>🪔</span>
              <span>{region.festivalName[currentLanguage]}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#FFF5DE]/70 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#F5A623]" />
                <span>{locationText}</span>
              </span>
              {hasDedicatedActivities(region.id) ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium">
                  ✨ {currentLanguage === 'hi' ? 'संवादात्मक अनुष्ठान' : currentLanguage === 'bn' ? 'সরাসরি উৎসবীয় রীতি' : 'Interactive Rituals'}
                </span>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/30 font-medium">
                  📜 {currentLanguage === 'hi' ? 'सांस्कृतिक परंपरा' : currentLanguage === 'bn' ? 'সাংস্কৃতিক ঐতিহ্য' : 'Cultural Lore'}
                </span>
              )}
            </div>
          </div>

          {/* Traditional Decorations Showcase */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-[#192747]/60 border border-[#D6AD60]/20 space-y-0.5">
              <div className="font-semibold text-[#F4D995] flex items-center gap-1">
                <Paintbrush className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>{region.decorTradition.artName[currentLanguage]}</span>
              </div>
              <p className="text-[11px] text-[#FFF5DE]/80 leading-snug">
                {region.decorTradition.artDesc[currentLanguage]}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#192747]/60 border border-[#D6AD60]/20 space-y-0.5">
              <div className="font-semibold text-[#F4D995] flex items-center gap-1">
                <span>🪔</span>
                <span>{region.decorTradition.diyaName[currentLanguage]}</span>
              </div>
              <p className="text-[11px] text-[#FFF5DE]/80 leading-snug">
                {region.decorTradition.diyaDesc[currentLanguage]}
              </p>
            </div>
          </div>
        </div>

        {/* 3 to 5 Key Regional Traditions List */}
        <div className="space-y-2 mb-4 text-left">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D6AD60] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{regT.keyTraditionsLabel}</span>
            </span>
            <span className="text-[10px] text-[#FFF5DE]/50">
              {region.keyTraditions.length} traditions
            </span>
          </div>

          <div className="space-y-2">
            {region.keyTraditions.map((tradition, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-[#10172D]/60 border border-[#D6AD60]/20 text-xs space-y-1 hover:border-[#D6AD60]/40 transition-colors"
              >
                <div className="flex items-center gap-2 font-semibold text-[#F4D995]">
                  <span className="text-sm">{tradition.icon}</span>
                  <span>{tradition.title[currentLanguage]}</span>
                </div>
                <p className="text-[11px] text-[#FFF5DE]/85 leading-relaxed pl-5 border-l border-[#D6AD60]/30 ml-1.5">
                  <span className="text-[#D6AD60] font-medium mr-1">{regT.whyWeCelebrate}:</span>
                  {tradition.why[currentLanguage]}
                </p>
              </div>
            ))}
          </div>

          {/* Regional Food Specialty Highlight */}
          {region.foodSpecialty && (
            <div className="p-3 rounded-xl bg-[#192747]/40 border border-[#D6AD60]/25 text-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D6AD60]/20 flex items-center justify-center shrink-0 text-base">
                <Utensils className="w-4 h-4 text-[#F4D995]" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-[#F4D995] truncate">
                  {region.foodSpecialty.name[currentLanguage]}
                </div>
                <div className="text-[11px] text-[#FFF5DE]/75 truncate">
                  {region.foodSpecialty.desc[currentLanguage]}
                </div>
              </div>
            </div>
          )}

          {/* Verified Cultural Audit Details */}
          {region.meaning && (
            <div className="p-3 rounded-xl bg-[#141E36]/80 border border-[#D6AD60]/30 text-xs space-y-2 text-left">
              <div className="flex items-center justify-between border-b border-[#D6AD60]/20 pb-1.5">
                <span className="font-semibold text-[#F4D995] flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {currentLanguage === 'hi'
                      ? 'सांस्कृतिक अर्थ एवं पावन तिथि'
                      : currentLanguage === 'bn'
                      ? 'সাংস্কৃতিক তাৎপর্য ও শুভ তিথি'
                      : 'Cultural Meaning & Sacred Timing'}
                  </span>
                </span>
                {region.whenObserved && (
                  <span className="text-[10px] text-[#D6AD60] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{region.whenObserved[currentLanguage]}</span>
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#FFF5DE]/85 leading-relaxed">
                {region.meaning[currentLanguage]}
              </p>

              {region.variations && (
                <div className="text-[10px] text-[#FFF5DE]/70 pt-1 border-t border-[#D6AD60]/15 flex items-start gap-1.5">
                  <Info className="w-3 h-3 text-[#D6AD60] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#F4D995]">
                      {currentLanguage === 'hi'
                        ? 'सामुदायिक विविधता:'
                        : currentLanguage === 'bn'
                        ? 'সম্প্রদায়গত বৈচিত্র্য:'
                        : 'Community Variations:'}
                    </strong>{' '}
                    {region.variations[currentLanguage]}
                  </span>
                </div>
              )}

              {region.source && (
                <div className="pt-1 flex items-center justify-between text-[10px] text-[#D6AD60]/80">
                  <span className="truncate">
                    {currentLanguage === 'hi' ? 'स्रोत:' : currentLanguage === 'bn' ? 'উৎস:' : 'Source:'}{' '}
                    {region.source.institution}
                  </span>
                  <a
                    href={region.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#F4D995] hover:underline shrink-0 ml-2"
                  >
                    <span>{currentLanguage === 'hi' ? 'प्रमाणित संदर्भ' : currentLanguage === 'bn' ? 'তথ্যসূত্র' : 'Official Portal'}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* TWO CELEBRATION CHOICES (As requested in Requirement 3) */}
        <div className="pt-2 space-y-2.5">
          {/* CHOICE A: Celebrate My Regional Diwali */}
          <button
            type="button"
            onClick={handleCelebrateRegional}
            className="w-full min-h-[50px] px-5 py-3 rounded-2xl font-bold text-sm sm:text-base text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-xl shadow-[#D6AD60]/25 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF5DE]"
          >
            <span>
              {regT.celebrateMyRegional.replace(
                '{region}',
                localizedRegionName
              )}
            </span>
            <ArrowRight className="w-4 h-4 text-[#10172D]" />
          </button>

          {/* CHOICE B: Explore India's Other Diwali Traditions */}
          <button
            type="button"
            onClick={handleExploreOther}
            className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm text-[#F4D995] border border-[#D6AD60]/50 bg-[#10172D]/90 hover:bg-[#D6AD60]/20 hover:text-[#FFF5DE] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#F5A623]" />
            <span>{regT.exploreOtherTraditions}</span>
          </button>

          {/* Change / Edit Details option */}
          <button
            type="button"
            onClick={onEditDetails}
            className="text-[11px] text-[#F4D995]/70 hover:text-[#FFF5DE] flex items-center justify-center gap-1 mx-auto transition-colors cursor-pointer pt-1"
          >
            <Edit3 className="w-3 h-3" />
            <span>{t.changeDetails}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
