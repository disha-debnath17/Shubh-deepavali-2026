/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, Sparkles, MapPin, Check, ChevronRight, BookOpen, Utensils, Paintbrush, ArrowRight, ExternalLink, Calendar, Users, Info } from 'lucide-react';
import { INDIAN_REGIONS, RegionalEntity, getRegionByName, ALL_INDIA_REGION } from '../../data/regionalData';
import { getRegionalActivities, hasDedicatedActivities, FEATURED_INTERACTIVE_REGION_IDS } from '../../data/regionalActivities';
import { RegionalActivity } from '../../types';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';

interface RegionalExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeState: string;
  onSelectState: (stateName: string) => void;
  onOpenActivity?: (activity: RegionalActivity) => void;
  currentLanguage: Language;
}

export const RegionalExplorerModal: React.FC<RegionalExplorerModalProps> = ({
  isOpen,
  onClose,
  activeState,
  onSelectState,
  onOpenActivity,
  currentLanguage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'interactive' | 'heritage'>('all');
  const [selectedRegionId, setSelectedRegionId] = useState<string>(() => {
    const reg = getRegionByName(activeState);
    return reg ? reg.id : 'all-india';
  });

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

  const t = TRANSLATIONS[currentLanguage].regional;

  // Total counts calculated directly from the database of 28 States + 8 UTs (36 total)
  const totalStatesCount = useMemo(() => INDIAN_REGIONS.filter((r) => !r.isUT).length, []);
  const totalUtCount = useMemo(() => INDIAN_REGIONS.filter((r) => r.isUT).length, []);
  const totalInteractiveCount = useMemo(
    () => INDIAN_REGIONS.filter((r) => FEATURED_INTERACTIVE_REGION_IDS.includes(r.id)).length,
    []
  );
  const totalHeritageCount = useMemo(
    () => INDIAN_REGIONS.filter((r) => !FEATURED_INTERACTIVE_REGION_IDS.includes(r.id)).length,
    []
  );

  // Search filter across the 36 states and union territories
  const searchFilteredRegions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return INDIAN_REGIONS;
    return INDIAN_REGIONS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.shortName.toLowerCase().includes(q) ||
        r.hi.toLowerCase().includes(q) ||
        r.bn.toLowerCase().includes(q) ||
        r.festivalName.en.toLowerCase().includes(q) ||
        r.festivalName.hi.toLowerCase().includes(q) ||
        r.festivalName.bn.toLowerCase().includes(q) ||
        r.decorTradition.artName.en.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Tab filter counts based on current search query
  const dynamicAllCount = searchFilteredRegions.length;
  const dynamicInteractiveCount = searchFilteredRegions.filter((r) =>
    FEATURED_INTERACTIVE_REGION_IDS.includes(r.id)
  ).length;
  const dynamicHeritageCount = searchFilteredRegions.filter(
    (r) => !FEATURED_INTERACTIVE_REGION_IDS.includes(r.id)
  ).length;

  // Final filtered list of states & UTs displayed in the list
  const displayedRegions = useMemo(() => {
    if (filterTab === 'interactive') {
      return searchFilteredRegions.filter((r) => FEATURED_INTERACTIVE_REGION_IDS.includes(r.id));
    }
    if (filterTab === 'heritage') {
      return searchFilteredRegions.filter((r) => !FEATURED_INTERACTIVE_REGION_IDS.includes(r.id));
    }
    return searchFilteredRegions;
  }, [searchFilteredRegions, filterTab]);

  // Check if All-India matches current search
  const isAllIndiaMatch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      'all of india'.includes(q) ||
      'pan-india'.includes(q) ||
      'india'.includes(q) ||
      'bharat'.includes(q) ||
      ALL_INDIA_REGION.name.toLowerCase().includes(q) ||
      ALL_INDIA_REGION.hi.toLowerCase().includes(q) ||
      ALL_INDIA_REGION.bn.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const activeRegion = useMemo(() => {
    if (selectedRegionId === 'all-india') {
      return ALL_INDIA_REGION;
    }
    return (
      INDIAN_REGIONS.find((r) => r.id === selectedRegionId) ||
      ALL_INDIA_REGION
    );
  }, [selectedRegionId]);

  if (!isOpen) return null;

  const handleSelectRegion = (region: RegionalEntity) => {
    setSelectedRegionId(region.id);
    audioManager.playClickSound();
  };

  const handleApplyAndCelebrate = (region: RegionalEntity) => {
    audioManager.playSparkleSound();
    onSelectState(region.name);
    onClose();
  };

  const getLocalizedName = (region: RegionalEntity) => {
    if (currentLanguage === 'hi') return region.hi;
    if (currentLanguage === 'bn') return region.bn;
    return region.name;
  };

  const isCurrentActive =
    activeRegion.name.toLowerCase() === activeState.toLowerCase() ||
    activeRegion.id.toLowerCase() === activeState.toLowerCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="regional-explorer-title"
    >
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[820px] rounded-3xl bg-gradient-to-b from-[#192747] to-[#0E1528] border-2 border-[#D6AD60]/50 shadow-2xl shadow-[#D6AD60]/20 flex flex-col overflow-hidden text-[#FFF5DE]">
        {/* Festive Marigold Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F5A623] via-[#F4D995] to-[#B5532A] z-10" />

        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-[#D6AD60]/20 flex items-center justify-between gap-3 bg-[#10172D]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-xl sm:text-2xl" aria-hidden="true">🇮🇳</span>
            <div className="min-w-0">
              <h2
                id="regional-explorer-title"
                className="font-royal text-base sm:text-lg md:text-xl font-bold text-[#F4D995] truncate"
              >
                {t.exploreIndiaTitle}
              </h2>
              <p className="text-[11px] text-[#FFF5DE]/70 truncate">
                {currentLanguage === 'hi'
                  ? `सभी ${totalStatesCount} राज्य व ${totalUtCount} केंद्र शासित प्रदेश · ${totalInteractiveCount} विशेष इंटरएक्टिव अनुष्ठान अनुभव`
                  : currentLanguage === 'bn'
                  ? `সমস্ত ${totalStatesCount}টি রাজ্য ও ${totalUtCount}টি কেন্দ্রশাসিত অঞ্চল · ${totalInteractiveCount}টি বিশেষ ইন্টারেক্টিভ রিচুয়াল`
                  : `All ${totalStatesCount} States & ${totalUtCount} UTs with Cultural Heritage · ${totalInteractiveCount} Featured Interactive Ritual Experiences`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-[#192747]/70 hover:bg-[#192747] border border-[#D6AD60]/30 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
            aria-label="Close Regional Explorer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* One India Quote Banner */}
        <div className="px-4 py-2 bg-[#D6AD60]/10 border-b border-[#D6AD60]/20 text-center text-xs sm:text-sm font-editorial text-[#F4D995] italic shrink-0">
          "{t.oneIndiaBanner}"
        </div>

        {/* Main Content Layout: Left sidebar list & Right tradition preview */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* LEFT COLUMN: State Search & Selector List */}
          <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-[#D6AD60]/20 flex flex-col bg-[#10172D]/60 shrink-0">
            {/* Search Input & Category Filter Tabs */}
            <div className="p-3 border-b border-[#D6AD60]/15 shrink-0 space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#D6AD60]/70" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full h-9 pl-9 pr-8 rounded-xl bg-[#0B1020] border border-[#D6AD60]/30 text-xs text-[#FFF5DE] placeholder-[#FFF5DE]/45 focus:outline-none focus:border-[#F4D995]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Dynamic Filter Tabs: All Regions vs Interactive Experiences vs Cultural Heritage */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#0B1020] border border-[#D6AD60]/20 text-[10px]">
                <button
                  type="button"
                  onClick={() => setFilterTab('all')}
                  className={`flex-1 py-1 px-1 rounded-md font-semibold transition-all truncate text-center ${
                    filterTab === 'all'
                      ? 'bg-[#D6AD60] text-[#10172D] shadow'
                      : 'text-[#FFF5DE]/70 hover:text-[#FFF5DE]'
                  }`}
                >
                  {t.allRegionsTab} ({dynamicAllCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab('interactive')}
                  className={`flex-1 py-1 px-1 rounded-md font-semibold transition-all truncate text-center ${
                    filterTab === 'interactive'
                      ? 'bg-[#D6AD60] text-[#10172D] shadow'
                      : 'text-[#F4D995] hover:text-[#FFF5DE]'
                  }`}
                >
                  {t.interactiveTab} ({dynamicInteractiveCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab('heritage')}
                  className={`flex-1 py-1 px-1 rounded-md font-semibold transition-all truncate text-center ${
                    filterTab === 'heritage'
                      ? 'bg-[#D6AD60] text-[#10172D] shadow'
                      : 'text-[#FFF5DE]/70 hover:text-[#FFF5DE]'
                  }`}
                >
                  {t.heritageTab} ({dynamicHeritageCount})
                </button>
              </div>
            </div>

            {/* Scrollable State List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#D6AD60]/10 p-2 space-y-1">
              {/* SEPARATE PAN-INDIA UNIVERSAL OPTION (Not counted in the 36 states/UTs) */}
              {isAllIndiaMatch && (
                <div className="pb-1.5">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FFB347] flex items-center justify-between">
                    <span>✨ {t.panIndiaIdentity}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40">
                      Universal
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectRegion(ALL_INDIA_REGION)}
                    className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer border ${
                      selectedRegionId === 'all-india'
                        ? 'bg-[#D6AD60]/25 border-[#D6AD60] text-[#F4D995] shadow-md shadow-[#D6AD60]/10'
                        : 'bg-[#192747]/60 hover:bg-[#192747] border-[#D6AD60]/30 text-[#FFF5DE]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#D6AD60] to-[#F4D995] text-[#10172D] flex items-center justify-center shrink-0 text-sm font-bold shadow-sm">
                        🪔
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-xs font-bold text-[#FFF5DE] truncate">
                            {getLocalizedName(ALL_INDIA_REGION)}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#F4D995]/85 truncate font-light">
                          {ALL_INDIA_REGION.festivalName[currentLanguage]}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D6AD60]/70 shrink-0" />
                  </button>
                </div>
              )}

              {/* 36 STATES AND UNION TERRITORIES */}
              {displayedRegions.length === 0 && !isAllIndiaMatch && (
                <div className="py-8 px-4 text-center text-xs text-[#FFF5DE]/60 space-y-1">
                  <p>
                    {currentLanguage === 'hi'
                      ? 'कोई राज्य या क्षेत्र नहीं मिला।'
                      : currentLanguage === 'bn'
                      ? 'কোনও রাজ্য বা অঞ্চল পাওয়া যায়নি।'
                      : 'No matching regions found.'}
                  </p>
                  <p className="text-[11px] text-[#D6AD60]/80">
                    Try searching by state name or cultural festival!
                  </p>
                </div>
              )}

              {displayedRegions.map((region) => {
                const isSelected = selectedRegionId === region.id;
                const isDedicatedState = FEATURED_INTERACTIVE_REGION_IDS.includes(region.id);

                return (
                  <button
                    type="button"
                    key={region.id}
                    onClick={() => handleSelectRegion(region)}
                    className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#D6AD60]/25 border border-[#D6AD60]/60 text-[#F4D995] shadow-md shadow-[#D6AD60]/10'
                        : 'hover:bg-[#192747]/70 text-[#FFF5DE]/85 hover:text-[#FFF5DE]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                          isSelected
                            ? 'bg-[#D6AD60] text-[#10172D] font-bold'
                            : 'bg-[#192747] text-[#D6AD60] border border-[#D6AD60]/30'
                        }`}
                      >
                        {region.isUT ? '🏛️' : '🇮🇳'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-xs font-semibold truncate">
                            {getLocalizedName(region)}
                          </span>
                          {isDedicatedState ? (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0 font-medium">
                              ✨ Interactive
                            </span>
                          ) : (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/40 shrink-0 font-medium">
                              {region.isUT ? 'UT' : 'State'}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#FFF5DE]/60 truncate font-light">
                          {region.festivalName[currentLanguage]}
                        </div>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        isSelected ? 'translate-x-0.5 text-[#F4D995]' : 'text-slate-500'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Active State Regional Traditions Showcase */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Header Badge & Title */}
            <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#192747] via-[#10172D] to-[#192747] border border-[#D6AD60]/40 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/20 border border-[#D6AD60]/40 text-[#F4D995] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>
                    {activeRegion.id === 'all-india'
                      ? 'Pan-India Universal'
                      : activeRegion.isUT
                      ? 'Union Territory'
                      : 'Indian State'}{' '}
                    · {getLocalizedName(activeRegion)}
                  </span>
                </div>

                {isCurrentActive ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                    <Check className="w-3 h-3" />
                    <span>{t.currentlyCelebrating}</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleApplyAndCelebrate(activeRegion)}
                    className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D] hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>{t.switchToThisState}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              <h3 className="font-royal text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFF5DE] leading-snug">
                {activeRegion.festivalName[currentLanguage]}
              </h3>

              <p className="font-editorial text-xs sm:text-sm text-[#F4D995] italic font-normal leading-relaxed mt-1">
                "{activeRegion.introTagline[currentLanguage]}"
              </p>
            </div>

            {/* Cultural Meaning & Significance */}
            {activeRegion.meaning && (
              <div className="p-3.5 rounded-2xl bg-[#10172D]/90 border border-[#D6AD60]/35 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-royal font-bold text-[#FFB347]">
                  <Info className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Cultural Meaning & Spiritual Significance</span>
                </div>
                <p className="text-xs sm:text-sm text-[#FFF5DE]/90 leading-relaxed font-light">
                  {activeRegion.meaning[currentLanguage] || activeRegion.meaning.en}
                </p>
              </div>
            )}

            {/* How & When Observed Two-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* How Traditionally Observed */}
              {activeRegion.howObserved && (
                <div className="p-3.5 rounded-2xl bg-[#10172D]/80 border border-[#D6AD60]/30 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-royal font-bold text-[#F4D995]">
                    <BookOpen className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span>How Traditionally Observed</span>
                  </div>
                  <p className="text-xs text-[#FFF5DE]/85 leading-relaxed font-light">
                    {activeRegion.howObserved[currentLanguage] || activeRegion.howObserved.en}
                  </p>
                </div>
              )}

              {/* When Observed / Calendar Timing */}
              {activeRegion.whenObserved && (
                <div className="p-3.5 rounded-2xl bg-[#10172D]/80 border border-[#D6AD60]/30 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-royal font-bold text-[#F4D995]">
                    <Calendar className="w-3.5 h-3.5 text-[#F5A623]" />
                    <span>Traditional Calendar Timing</span>
                  </div>
                  <p className="text-xs text-[#FFF5DE]/85 leading-relaxed font-light">
                    {activeRegion.whenObserved[currentLanguage] || activeRegion.whenObserved.en}
                  </p>
                </div>
              )}
            </div>

            {/* Regional & Community Variations */}
            {activeRegion.variations && (
              <div className="p-3.5 rounded-2xl bg-[#10172D]/80 border border-[#D6AD60]/30 space-y-1">
                <div className="flex items-center gap-2 text-xs font-royal font-bold text-[#F4D995]">
                  <Users className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Regional & Community Diversity</span>
                </div>
                <p className="text-xs text-[#FFF5DE]/85 leading-relaxed font-light">
                  {activeRegion.variations[currentLanguage] || activeRegion.variations.en}
                </p>
              </div>
            )}

            {/* Verified Cultural Source Citation */}
            {activeRegion.source && (
              <div className="p-3 rounded-2xl bg-[#141f38]/90 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🏛️</span>
                  <div>
                    <span className="text-emerald-300 font-semibold mr-1.5">Verified Cultural Source:</span>
                    <span className="text-[#FFF5DE]/90">{activeRegion.source.institution} ({activeRegion.source.title})</span>
                  </div>
                </div>
                <a
                  href={activeRegion.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Distinction Banner: Dedicated Interactive vs Cultural Lore */}
            {hasDedicatedActivities(activeRegion.id) ? (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2.5">
                <span className="text-base shrink-0">✨</span>
                <div>
                  <div className="font-bold text-amber-300">
                    {currentLanguage === 'hi'
                      ? 'विशिष्ट इंटरएक्टिव राज्य:'
                      : currentLanguage === 'bn'
                      ? 'বিশেষ ইন্টারেক্টিভ রাজ্য:'
                      : 'Featured Interactive State:'}
                  </div>
                  <div className="text-[11px] text-amber-100/90 leading-relaxed mt-0.5">
                    {currentLanguage === 'hi'
                      ? 'इस राज्य के लिए विशेष इंटरएक्टिव अनुष्ठान सिमुलेटर निर्मित हैं (जैसे दीप प्रज्वलन, अल्पना कला, या पावन पूजा)।'
                      : currentLanguage === 'bn'
                      ? 'এই রাজ্যের জন্য বিশেষ ইন্টারেক্টিভ রিচুয়াল সিমুলেটর উপলব্ধ (যেমন প্রদীপ প্রজ্বালন, আলপনা আঁকা বা বিশেষ পূজা)।'
                      : 'Includes bespoke interactive ritual simulations (such as sacred lamp lighting, folk threshold art, or festive pujas).'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-800/80 via-slate-800/40 to-transparent border border-[#D6AD60]/30 text-xs text-[#FFF5DE]/85 flex items-start gap-2.5">
                <span className="text-base shrink-0">📜</span>
                <div>
                  <div className="font-bold text-[#F4D995]">
                    {currentLanguage === 'hi'
                      ? 'सांस्कृतिक धरोहर व परंपराएं:'
                      : currentLanguage === 'bn'
                      ? 'সাংস্কৃতিক ঐতিহ্য ও লোকরীতি:'
                      : 'Regional Cultural Heritage & Traditions:'}
                  </div>
                  <div className="text-[11px] text-[#FFF5DE]/75 leading-relaxed mt-0.5">
                    {currentLanguage === 'hi'
                      ? 'इस राज्य के प्रामाणिक लोक रिवाज, तोरण-सजावट और प्रसिद्ध मिष्ठान का विवरण।'
                      : currentLanguage === 'bn'
                      ? 'এই অঞ্চলের প্রামাণ্য লোকসংস্কৃতি, অলংকরণ ও ঐতিহ্যবাহী মিষ্টির বিবরণ।'
                      : 'Includes authentic regional festival customs, traditional decor lore, and signature sweets.'}
                  </div>
                </div>
              </div>
            )}

            {/* Traditional Decorations Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Art Form */}
              <div className="p-3.5 rounded-2xl bg-[#10172D]/80 border border-[#D6AD60]/30 space-y-1">
                <div className="flex items-center gap-2 text-xs font-royal font-bold text-[#F4D995]">
                  <Paintbrush className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>{t.traditionalDecor}: {activeRegion.decorTradition.artName[currentLanguage]}</span>
                </div>
                <p className="text-xs text-[#FFF5DE]/85 leading-relaxed font-light">
                  {activeRegion.decorTradition.artDesc[currentLanguage]}
                </p>
              </div>

              {/* Diya Form */}
              <div className="p-3.5 rounded-2xl bg-[#10172D]/80 border border-[#D6AD60]/30 space-y-1">
                <div className="flex items-center gap-2 text-xs font-royal font-bold text-[#F4D995]">
                  <span>🪔</span>
                  <span>{t.traditionalDiyas}: {activeRegion.decorTradition.diyaName[currentLanguage]}</span>
                </div>
                <p className="text-xs text-[#FFF5DE]/85 leading-relaxed font-light">
                  {activeRegion.decorTradition.diyaDesc[currentLanguage]}
                </p>
              </div>
            </div>

            {/* Key Traditions (3 to 5 Traditions with "Why It's Celebrated") */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D6AD60] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.keyTraditionsLabel} & {t.whyWeCelebrate}</span>
              </h4>

              <div className="space-y-2.5">
                {activeRegion.keyTraditions.map((tradition, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#10172D]/70 border border-[#D6AD60]/25 text-left space-y-1.5 transition-all hover:border-[#D6AD60]/50"
                  >
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#F4D995]">
                      <span className="text-base">{tradition.icon}</span>
                      <span>{tradition.title[currentLanguage]}</span>
                    </div>
                    <div className="text-xs text-[#FFF5DE]/90 leading-relaxed font-light pl-6 border-l border-[#D6AD60]/30 ml-2">
                      <span className="text-[#D6AD60] font-medium mr-1.5">{t.whyWeCelebrate}:</span>
                      {tradition.why[currentLanguage]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Festive Food Specialty */}
            {activeRegion.foodSpecialty && (
              <div className="p-3.5 rounded-2xl bg-[#10172D]/80 border border-[#D6AD60]/30 space-y-1">
                <div className="flex items-center gap-2 text-xs font-royal font-bold text-[#F4D995]">
                  <Utensils className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>{t.festiveTreats}: {activeRegion.foodSpecialty.name[currentLanguage]}</span>
                </div>
                <p className="text-xs text-[#FFF5DE]/85 leading-relaxed font-light">
                  {activeRegion.foodSpecialty.desc[currentLanguage]}
                </p>
              </div>
            )}

            {/* Bottom Apply Action */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              {onOpenActivity && (
                <button
                  type="button"
                  onClick={() => {
                    audioManager.playSparkleSound();
                    onSelectState(activeRegion.name);
                    const acts = getRegionalActivities(activeRegion.name);
                    if (acts && acts.length > 0) {
                      onOpenActivity(acts[0]);
                    }
                    onClose();
                  }}
                  className="flex-1 h-12 rounded-xl font-bold text-xs sm:text-sm text-[#F4D995] bg-[#192747] border border-[#D6AD60] hover:bg-[#D6AD60]/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#FFB347]" />
                  <span>
                    {hasDedicatedActivities(activeRegion.id)
                      ? currentLanguage === 'hi'
                        ? `${getLocalizedName(activeRegion)} इंटरएक्टिव अनुष्ठान खेलें ✨`
                        : currentLanguage === 'bn'
                        ? `${getLocalizedName(activeRegion)} ইন্টারেক্টিভ রিচুয়াল শুরু করুন ✨`
                        : `Experience ${activeRegion.name} Interactive Rituals ✨`
                      : currentLanguage === 'hi'
                      ? `${getLocalizedName(activeRegion)} सांस्कृतिक परंपराएं जानें 📜`
                      : currentLanguage === 'bn'
                      ? `${getLocalizedName(activeRegion)} ঐতিহ্য ও সংস্কৃতি জানুন 📜`
                      : `Explore ${activeRegion.name} Cultural Highlights 📜`}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => handleApplyAndCelebrate(activeRegion)}
                className="flex-1 h-12 rounded-xl font-bold text-xs sm:text-sm text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {t.celebrateNow.replace(
                    '{region}',
                    getLocalizedName(activeRegion)
                  )}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
