/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, Search, ChevronDown, Check, X, Sparkles } from 'lucide-react';
import { INDIAN_REGIONS, RegionalEntity, ALL_INDIA_REGION, getRegionByName } from '../data/regionalData';
import { FEATURED_INTERACTIVE_REGION_IDS } from '../data/regionalActivities';
import { findStateForCity } from '../data/indianCities';
import { Language, TRANSLATIONS } from '../utils/translations';

interface StateSearchDropdownProps {
  selectedState: string;
  onSelectState: (stateName: string) => void;
  currentLanguage: Language;
  hasError?: boolean;
}

export const StateSearchDropdown: React.FC<StateSearchDropdownProps> = ({
  selectedState,
  onSelectState,
  currentLanguage,
  hasError = false,
}) => {
  const t = TRANSLATIONS[currentLanguage].welcome;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Find the selected region object if any
  const selectedRegion = useMemo(() => {
    if (!selectedState) return null;
    return getRegionByName(selectedState);
  }, [selectedState]);

  // Filtered lists
  const filteredRegions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return INDIAN_REGIONS;
    return INDIAN_REGIONS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.hi.toLowerCase().includes(q) ||
        r.bn.toLowerCase().includes(q) ||
        r.festivalName.en.toLowerCase().includes(q) ||
        r.festivalName.hi.toLowerCase().includes(q) ||
        r.festivalName.bn.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const totalStatesCount = useMemo(() => INDIAN_REGIONS.filter((r) => !r.isUT).length, []);
  const totalUtCount = useMemo(() => INDIAN_REGIONS.filter((r) => r.isUT).length, []);

  // Detect if user typed a known city instead of a state
  const detectedCityState = useMemo(() => {
    return findStateForCity(searchQuery);
  }, [searchQuery]);

  const statesList = useMemo(() => filteredRegions.filter((r) => !r.isUT), [filteredRegions]);
  const utList = useMemo(() => filteredRegions.filter((r) => r.isUT), [filteredRegions]);

  const getLocalizedName = (region: RegionalEntity) => {
    if (currentLanguage === 'hi') return region.hi;
    if (currentLanguage === 'bn') return region.bn;
    return region.name;
  };

  const getSecondaryName = (region: RegionalEntity) => {
    if (currentLanguage === 'en') {
      return region.hi;
    }
    return region.name;
  };

  const handleSelect = (region: RegionalEntity) => {
    onSelectState(region.name);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full text-left" ref={dropdownRef}>
      {/* Trigger Combobox */}
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        className={`w-full min-h-[46px] px-3.5 py-2 rounded-xl flex items-center justify-between gap-2.5 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F4D995] ${
          isOpen
            ? 'bg-[#192747] border-[#F4D995] ring-1 ring-[#F4D995]/50 shadow-md shadow-[#D6AD60]/10'
            : hasError
            ? 'bg-[#192747]/90 border-amber-500/80 ring-1 ring-amber-500/40'
            : selectedRegion
            ? 'bg-[#192747]/95 border-[#D6AD60]/60 hover:border-[#D6AD60]'
            : 'bg-[#192747]/80 border-[#D6AD60]/35 hover:border-[#D6AD60]/60 hover:bg-[#192747]'
        } border`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              selectedRegion
                ? 'bg-[#D6AD60]/20 text-[#F4D995] border border-[#D6AD60]/40'
                : 'bg-[#10172D]/60 text-[#D6AD60]/70 border border-[#D6AD60]/20'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
          </div>

          <div className="flex flex-col min-w-0 text-left">
            {selectedRegion ? (
              <>
                <div className="flex items-center gap-2 truncate">
                  <span className="font-semibold text-sm text-[#FFF5DE] truncate">
                    {getLocalizedName(selectedRegion)}
                  </span>
                  {currentLanguage !== 'en' && (
                    <span className="text-[11px] text-[#F4D995]/70 truncate">
                      ({selectedRegion.name})
                    </span>
                  )}
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#D6AD60]/15 text-[#F4D995] border border-[#D6AD60]/30 shrink-0 font-medium">
                    {selectedRegion.isUT ? t.utBadge : t.stateBadge}
                  </span>
                </div>
                <span className="text-[11px] text-[#F4D995]/80 truncate font-light">
                  ✨ {selectedRegion.festivalName[currentLanguage]}
                </span>
              </>
            ) : (
              <span className="text-sm text-[#FFF5DE]/50 font-normal truncate">
                {t.statePlaceholder}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0 text-[#D6AD60]/80">
          {selectedRegion && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectState('');
              }}
              className="p-1 hover:text-[#FFF5DE] rounded transition-colors"
              title={t.clearCity}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#F4D995]' : ''}`}
          />
        </div>
      </div>

      {/* Dropdown Menu Overlay / Popover */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl bg-[#0e162a] border border-[#D6AD60]/45 shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden flex flex-col max-h-[340px] sm:max-h-[380px] animate-fade-in"
        >
          {/* Search Header */}
          <div className="p-2.5 border-b border-[#D6AD60]/20 bg-[#141f38] shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#D6AD60]/70" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.stateSearchPlaceholder}
                className="w-full h-9 pl-9 pr-8 rounded-lg bg-[#0e162a] border border-[#D6AD60]/30 text-xs text-[#FFF5DE] placeholder-[#FFF5DE]/45 focus:outline-none focus:border-[#F4D995] focus:ring-1 focus:ring-[#F4D995]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#FFF5DE]/60 hover:text-[#FFF5DE]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Quick summary strip with dynamic counts */}
            <div className="flex items-center justify-between px-1 pt-1.5 text-[10px] text-[#F4D995]/70">
              <span>{t.statesCategory} ({totalStatesCount})</span>
              <span>{t.utCategory} ({totalUtCount})</span>
            </div>
          </div>

          {/* Scrollable list */}
          <div className="overflow-y-auto flex-1 divide-y divide-[#D6AD60]/10 p-1.5 space-y-2">
            {/* If user typed a city instead of a state, offer a direct one-click selection of its state! */}
            {detectedCityState && (
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-500/10 border border-amber-500/40 text-xs text-amber-200 mb-2 flex items-center justify-between gap-2 shadow-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base">📍</span>
                  <div className="truncate">
                    <span className="font-semibold text-amber-300">"{searchQuery.trim()}"</span> {t.cityMismatchWarning}{' '}
                    <strong className="text-white underline">{detectedCityState}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const target = INDIAN_REGIONS.find(
                      (r) => r.name.toLowerCase() === detectedCityState.toLowerCase()
                    );
                    if (target) handleSelect(target);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] shrink-0 hover:bg-amber-400 cursor-pointer transition-colors shadow"
                >
                  {t.selectDetectedState} {detectedCityState}
                </button>
              </div>
            )}

            {/* If no match */}
            {filteredRegions.length === 0 && !detectedCityState && (
              <div className="py-8 px-4 text-center text-xs text-[#FFF5DE]/60 space-y-1">
                <p>{t.stateSearchEmpty}</p>
                <p className="text-[11px] text-[#D6AD60]/80">
                  {t.stateSearchEmptyTip}
                </p>
              </div>
            )}

            {/* ALL-INDIA / PAN-INDIA OPTION */}
            {(!searchQuery || 'all of india'.includes(searchQuery.toLowerCase()) || 'bharat'.includes(searchQuery.toLowerCase()) || 'pan-india'.includes(searchQuery.toLowerCase())) && (
              <div className="pb-1">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FFB347] flex items-center justify-between sticky top-0 bg-[#0e162a]/95 backdrop-blur-sm z-10">
                  <span>✨ {t.panIndiaCelebrationTitle}</span>
                  <span className="text-[9px] font-semibold text-emerald-400">Universal</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelect(ALL_INDIA_REGION)}
                  className={`w-full px-2.5 py-2 rounded-xl text-left transition-all flex items-center justify-between cursor-pointer border ${
                    selectedRegion?.id === 'all-india'
                      ? 'bg-gradient-to-r from-[#D6AD60]/25 to-[#F4D995]/15 border-[#D6AD60] text-[#F4D995] font-semibold'
                      : 'hover:bg-[#141f38] border-transparent text-[#FFF5DE]/90'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-base">🪔</span>
                    <div className="truncate">
                      <div className="text-xs font-medium text-[#FFF5DE]">
                        {getLocalizedName(ALL_INDIA_REGION)}
                      </div>
                      <div className="text-[10px] text-[#D6AD60]/80 truncate">
                        {ALL_INDIA_REGION.festivalName[currentLanguage] || ALL_INDIA_REGION.festivalName.en}
                      </div>
                    </div>
                  </div>
                  {selectedRegion?.id === 'all-india' && (
                    <Check className="w-4 h-4 text-[#F4D995] shrink-0" />
                  )}
                </button>
              </div>
            )}

            {/* 28 STATES GROUP */}
            {statesList.length > 0 && (
              <div>
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D6AD60] flex items-center justify-between sticky top-0 bg-[#0e162a]/95 backdrop-blur-sm z-10">
                  <span>🇮🇳 {t.statesCategory}</span>
                  <span className="text-[9px] font-mono opacity-70">({statesList.length})</span>
                </div>
                <div className="space-y-0.5 mt-0.5">
                  {statesList.map((region) => {
                    const isSelected =
                      selectedState.toLowerCase() === region.name.toLowerCase();
                    return (
                      <button
                        type="button"
                        key={region.id}
                        onClick={() => handleSelect(region)}
                        role="option"
                        aria-selected={isSelected}
                        className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between gap-2 text-left transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-[#D6AD60]/25 text-[#F4D995] border border-[#D6AD60]/50'
                            : 'hover:bg-[#192747] text-[#FFF5DE]/90 hover:text-[#FFF5DE]'
                        }`}
                      >
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold group-hover:text-[#F4D995] transition-colors">
                              {getLocalizedName(region)}
                            </span>
                            <span className="text-[10px] text-[#FFF5DE]/45">
                              {getSecondaryName(region)}
                            </span>
                            {FEATURED_INTERACTIVE_REGION_IDS.includes(region.id) && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                ✨ {t.interactiveBadge}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#D6AD60]/80 truncate">
                            {region.festivalName[currentLanguage]}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#D6AD60] text-[#10172D] flex items-center justify-center shrink-0 shadow-sm">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 8 UNION TERRITORIES GROUP */}
            {utList.length > 0 && (
              <div className="pt-1">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#D6AD60] flex items-center justify-between sticky top-0 bg-[#0e162a]/95 backdrop-blur-sm z-10">
                  <span>🏛️ {t.utCategory}</span>
                  <span className="text-[9px] font-mono opacity-70">({utList.length})</span>
                </div>
                <div className="space-y-0.5 mt-0.5">
                  {utList.map((region) => {
                    const isSelected =
                      selectedState.toLowerCase() === region.name.toLowerCase();
                    return (
                      <button
                        type="button"
                        key={region.id}
                        onClick={() => handleSelect(region)}
                        role="option"
                        aria-selected={isSelected}
                        className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between gap-2 text-left transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-[#D6AD60]/25 text-[#F4D995] border border-[#D6AD60]/50'
                            : 'hover:bg-[#192747] text-[#FFF5DE]/90 hover:text-[#FFF5DE]'
                        }`}
                      >
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold group-hover:text-[#F4D995] transition-colors">
                              {getLocalizedName(region)}
                            </span>
                            <span className="text-[10px] text-[#FFF5DE]/45">
                              {getSecondaryName(region)}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#D6AD60]/80 truncate">
                            {region.festivalName[currentLanguage]}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#D6AD60] text-[#10172D] flex items-center justify-center shrink-0 shadow-sm">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
