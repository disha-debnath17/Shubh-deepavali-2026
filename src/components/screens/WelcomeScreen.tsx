/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Sparkles, MapPin, Building2, User, HeartHandshake, AlertCircle, Compass } from 'lucide-react';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import { StateSearchDropdown } from '../StateSearchDropdown';
import { PersonalizedWelcomeModal } from '../modals/PersonalizedWelcomeModal';
import { VisitorProfile } from '../../types';
import { validateCityForState, getPopularCitiesForState } from '../../data/indianCities';

interface WelcomeScreenProps {
  userName: string;
  userProfile?: VisitorProfile | null;
  onSetName: (name: string) => void;
  onSaveProfile: (profile: VisitorProfile) => void;
  onEnter: () => void;
  onOpenExplorer: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onOpenAudioCredits?: () => void;
  onDirectGreeting?: (profile: VisitorProfile) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  userName,
  userProfile,
  onSetName,
  onSaveProfile,
  onEnter,
  onOpenExplorer,
  currentLanguage,
  onSelectLanguage,
  onOpenAudioCredits,
  onDirectGreeting,
}) => {
  const t = TRANSLATIONS[currentLanguage].welcome;

  // Initialize name (clean person's name)
  const [inputVal, setInputVal] = useState(
    userName === 'Pyaara Parivaar' || userName === 'Family' || userName === 'Family & Friends'
      ? ''
      : userProfile?.name || userName || ''
  );
  const [selectedRelation, setSelectedRelation] = useState<string>(
    userProfile?.role || 'family'
  );
  const [selectedState, setSelectedState] = useState<string>(userProfile?.state || '');
  const [cityVal, setCityVal] = useState<string>(userProfile?.city || '');
  const [stateError, setStateError] = useState<boolean>(false);
  const [showPersonalizedModal, setShowPersonalizedModal] = useState<boolean>(false);

  // Determine if Pan-India is currently selected
  const isAllIndia = Boolean(
    selectedState &&
      (selectedState.toLowerCase().includes('all') ||
        selectedState.toLowerCase().includes('bharat') ||
        selectedState === 'सम्पूर्ण भारत' ||
        selectedState === 'সমগ্র ভারত' ||
        selectedState.toLowerCase() === 'all of india' ||
        selectedState.toLowerCase() === 'all-india')
  );

  // Validate the entered city against the selected state
  const cityValidation = React.useMemo(() => {
    return validateCityForState(cityVal, selectedState);
  }, [cityVal, selectedState]);

  // Suggested popular cities for the selected state
  const popularCities = React.useMemo(() => {
    if (isAllIndia || !selectedState) return [];
    return getPopularCitiesForState(selectedState);
  }, [selectedState, isAllIndia]);

  // Handle switching state: clear or revalidate previous city so there are no cross-state inconsistencies
  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    if (newState) setStateError(false);
    if (cityVal) {
      const check = validateCityForState(cityVal, newState);
      if (check.isMismatch) {
        // Clear mismatched city automatically to avoid carrying invalid cities over
        setCityVal('');
      }
    }
  };

  // Sync if userProfile changes from outside (e.g., loaded from storage or url)
  useEffect(() => {
    if (userProfile?.state && !selectedState) {
      setSelectedState(userProfile.state);
    }
    if (userProfile?.city && !cityVal) {
      setCityVal(userProfile.city);
    }
    if (userProfile?.role) {
      setSelectedRelation(userProfile.role);
    }
  }, [userProfile]);

  // Relation with the sender options
  const relationOptions = [
    { key: 'maa', label: { en: 'Maa (Mother)', hi: 'माँ (माताजी)', bn: 'মা (মাতা)' } },
    { key: 'papa', label: { en: 'Papa (Father)', hi: 'पापा (पिताजी)', bn: 'বাবা (পিতা)' } },
    { key: 'brother', label: { en: 'Brother (Bhaiya)', hi: 'भाई (भैया)', bn: 'ভাই (দাদা/ভাই)' } },
    { key: 'sister', label: { en: 'Sister (Didi)', hi: 'बहन (दीदी)', bn: 'বোন (দিদি/বোন)' } },
    { key: 'family', label: { en: 'Family / Loved One', hi: 'परिवार / प्रियजन', bn: 'পরিবার / প্রিয়জন' } },
    { key: 'dadu_dadi', label: { en: 'Dadu and Dadi (Grandparents)', hi: 'दादू और दादी (दादा-दादी)', bn: 'দাদু ও দিদিমা' } },
    { key: 'bestie', label: { en: 'Bestie (Best Friend)', hi: 'बेस्टी (पक्का यार)', bn: 'বেস্টি (প্রিয় বন্ধু)' } },
    { key: 'someoneSpecial', label: { en: 'Someone Special ❤️', hi: 'कोई खास ❤️', bn: 'মনের বিশেষ কেউ ❤️' } },
    { key: 'friend', label: { en: 'Friend (Dost)', hi: 'मित्र (दोस्त)', bn: 'বন্ধু' } },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalName = inputVal.trim();
    if (!finalName) {
      const matched = relationOptions.find((r) => r.key === selectedRelation);
      finalName = matched
        ? matched.label[currentLanguage].split(' ')[0]
        : currentLanguage === 'hi'
        ? 'परिवार व मित्र'
        : currentLanguage === 'bn'
        ? 'পরিবার ও বন্ধুরা'
        : 'Family & Friends';
    }

    // If state is not selected, nudge user politely or default to all-India
    if (!selectedState) {
      setStateError(true);
      return;
    }

    setStateError(false);

    // Save profile state with chosen relation
    const profile: VisitorProfile = {
      name: finalName,
      state: selectedState,
      city: cityVal.trim() || undefined,
      isGuest: false,
      role: selectedRelation,
    };

    onSetName(finalName);
    onSaveProfile(profile);

    // Trigger emotional personalized modal before entering celebration
    audioManager.playSparkleSound();
    setShowPersonalizedModal(true);
  };

  const handleGuestEntry = () => {
    const guestName =
      currentLanguage === 'hi'
        ? 'परिवार व मित्र'
        : currentLanguage === 'bn'
        ? 'পরিবার ও বন্ধুরা'
        : 'Family & Friends';

    const guestProfile: VisitorProfile = {
      name: guestName,
      state: currentLanguage === 'hi' ? 'सम्पूर्ण भारत' : currentLanguage === 'bn' ? 'সমগ্র ভারত' : 'All of India',
      isGuest: true,
      role: 'default',
    };

    onSetName(guestName);
    onSaveProfile(guestProfile);
    audioManager.playSparkleSound();
    audioManager.startAmbient();
    onEnter();
  };

  const handleDirectGreeting = () => {
    audioManager.playSparkleSound();
    audioManager.startAmbient();

    let finalName = inputVal.trim();
    if (!finalName) {
      const matched = relationOptions.find((r) => r.key === selectedRelation);
      finalName = matched
        ? matched.label[currentLanguage].split(' ')[0]
        : currentLanguage === 'hi'
        ? 'परिवार व मित्र'
        : currentLanguage === 'bn'
        ? 'পরিবার ও বন্ধুরা'
        : 'Family & Friends';
    }

    const finalState = selectedState || (currentLanguage === 'hi' ? 'सम्पूर्ण भारत' : currentLanguage === 'bn' ? 'সমগ্র ভারত' : 'All of India');

    const profile: VisitorProfile = {
      name: finalName,
      state: finalState,
      city: cityVal.trim(),
      isGuest: !inputVal.trim(),
      role: selectedRelation,
    };

    onSetName(finalName);
    onSaveProfile(profile);

    if (onDirectGreeting) {
      onDirectGreeting(profile);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-between px-3.5 sm:px-6 py-4 sm:py-6 text-center overflow-x-hidden max-w-xl mx-auto">
      {/* Main Content Area */}
      <div className="w-full flex flex-col items-center justify-center my-auto space-y-4 py-2">
        {/* Main Emotional Heading */}
        <div className="space-y-2 text-center max-w-lg mx-auto">
          <h1 className="font-royal text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#FFF5DE] leading-tight text-balance">
            {t.emotionalHeading}
          </h1>

          {/* Emotional Supporting text */}
          <p className="font-editorial text-sm sm:text-base text-[#F4D995] italic font-normal leading-relaxed">
            "{t.emotionalSupportingText}"
          </p>
        </div>

        {/* Personalisation Form Card */}
        <form
          onSubmit={handleFormSubmit}
          className="w-full rounded-2xl bg-gradient-to-b from-[#192747]/70 to-[#10172D]/90 border border-[#D6AD60]/40 p-4 sm:p-6 space-y-4 shadow-2xl backdrop-blur-md text-left"
        >
          {/* Section A: Your Name (person's actual name) */}
          <div className="space-y-1.5">
            <label
              htmlFor="welcomeNameInput"
              className="text-xs font-semibold text-[#F4D995] flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-[#D6AD60]" />
              <span>{t.nameLabel}</span>
            </label>

            <input
              id="welcomeNameInput"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t.nameInputPlaceholder}
              maxLength={40}
              className="w-full h-10 px-3.5 rounded-xl bg-[#10172D]/90 border border-[#D6AD60]/40 text-sm text-[#FFF5DE] placeholder-[#FFF5DE]/45 focus:outline-none focus:border-[#F4D995] focus:ring-1 focus:ring-[#F4D995] transition-all shadow-inner"
            />
          </div>

          {/* Section B: Relation with the sender */}
          <div className="space-y-1.5">
            <label
              htmlFor="welcomeRelationSelect"
              className="text-xs font-semibold text-[#F4D995] flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-[#D6AD60]" />
                <span>{t.relationLabel}</span>
              </span>
              <span className="text-[10px] text-[#FFF5DE]/60 font-normal">
                {t.relationHint}
              </span>
            </label>

            <div className="relative">
              <select
                id="welcomeRelationSelect"
                value={selectedRelation}
                onChange={(e) => {
                  setSelectedRelation(e.target.value);
                  audioManager.playClickSound();
                }}
                className="w-full h-10 px-3.5 pr-9 rounded-xl bg-[#10172D]/90 border border-[#D6AD60]/40 text-sm text-[#FFF5DE] appearance-none focus:outline-none focus:border-[#F4D995] focus:ring-1 focus:ring-[#F4D995] transition-all shadow-inner cursor-pointer"
              >
                {relationOptions.map((opt) => (
                  <option key={opt.key} value={opt.key} className="bg-[#10172D] text-[#FFF5DE]">
                    {opt.label[currentLanguage]}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#F4D995] text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Section B: Where are you celebrating from? (28 States & 8 UTs Searchable Dropdown) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#F4D995] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D6AD60]" />
                <span>{t.stateLabel}</span>
              </span>
              <span className="text-[10px] text-[#FFF5DE]/60 font-normal">
                {currentLanguage === 'hi'
                  ? '२८ राज्य • ८ केंद्र शासित प्रदेश'
                  : currentLanguage === 'bn'
                  ? '২৮ রাজ্য • ৮ কেন্দ্রশাসিত অঞ্চল'
                  : '28 States • 8 UTs'}
              </span>
            </label>

            <StateSearchDropdown
              selectedState={selectedState}
              onSelectState={handleStateChange}
              currentLanguage={currentLanguage}
              hasError={stateError}
            />

            {stateError && (
              <p className="text-[11px] text-amber-400 font-medium pt-0.5 animate-fade-in">
                ⚠️ {t.validationState}
              </p>
            )}

            {/* Distinct Pan-India Universal Banner */}
            {isAllIndia && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/15 via-[#D6AD60]/20 to-amber-500/15 border border-[#D6AD60]/50 text-left flex items-start gap-2.5 animate-fade-in shadow-xs">
                <span className="text-xl shrink-0">🇮🇳</span>
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-[#F4D995] flex items-center gap-1.5">
                    <span>{t.panIndiaCelebrationTitle}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      28 States + 8 UTs
                    </span>
                  </div>
                  <p className="text-[11px] text-[#FFF5DE]/85 leading-relaxed font-light">
                    {t.panIndiaCelebrationDesc}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section C: Your City (Optional) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="welcomeCityInput"
                className="text-xs font-semibold text-[#F4D995] flex items-center gap-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-[#D6AD60]" />
                <span>{t.cityLabel}</span>
              </label>
              <span className="text-[10px] text-[#FFF5DE]/50">
                {t.optionalLabel}
              </span>
            </div>

            <div className="relative">
              <input
                id="welcomeCityInput"
                type="text"
                list="welcome-popular-cities-list"
                value={cityVal}
                onChange={(e) => setCityVal(e.target.value)}
                placeholder={t.cityPlaceholder}
                maxLength={40}
                className={`w-full h-10 px-3.5 rounded-xl bg-[#10172D]/90 text-sm text-[#FFF5DE] placeholder-[#FFF5DE]/45 focus:outline-none transition-all shadow-inner border ${
                  cityValidation.isMismatch
                    ? 'border-amber-400/80 focus:border-amber-300 focus:ring-1 focus:ring-amber-300'
                    : 'border-[#D6AD60]/40 focus:border-[#F4D995] focus:ring-1 focus:ring-[#F4D995]'
                }`}
              />

              {popularCities.length > 0 && (
                <datalist id="welcome-popular-cities-list">
                  {popularCities.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              )}
            </div>

            {/* City Mismatch Warning & One-Click Remedy */}
            {cityValidation.isMismatch && cityValidation.detectedState && (
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-fade-in">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>"{cityVal.trim()}"</strong> {t.cityMismatchWarning}{' '}
                    <span className="text-white underline">{cityValidation.detectedState}</span>.
                  </span>
                </div>
                <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedState(cityValidation.detectedState!);
                      setStateError(false);
                    }}
                    className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[10px] hover:bg-amber-400 cursor-pointer transition-colors shadow"
                  >
                    {t.selectDetectedState} {cityValidation.detectedState}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCityVal('')}
                    className="px-2 py-0.5 rounded-md bg-[#192747] text-amber-200 text-[10px] hover:bg-[#192747]/80 cursor-pointer border border-amber-500/30"
                  >
                    {t.clearCity}
                  </button>
                </div>
              </div>
            )}

            {/* Popular City Suggestions Pills for selected state */}
            {popularCities.length > 0 && !cityVal && (
              <div className="pt-1 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-[#F4D995]/70 mr-0.5">{t.popularCitiesLabel}:</span>
                {popularCities.slice(0, 4).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      audioManager.playClickSound();
                      setCityVal(city);
                    }}
                    className="px-2 py-0.5 rounded-md bg-[#192747]/80 hover:bg-[#D6AD60]/20 text-[#FFF5DE]/85 hover:text-[#F4D995] text-[10px] border border-[#D6AD60]/25 transition-all cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons: Begin Full Journey OR Skip Directly to Greeting Creator */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full h-12 rounded-xl font-bold text-sm sm:text-base text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-[#D6AD60]/20 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF5DE]"
            >
              <span>{t.enterButton}</span>
              <ArrowRight className="w-4 h-4 text-[#10172D]" />
            </button>

            {/* Prominent Direct Greeting Creator Option */}
            <button
              type="button"
              onClick={handleDirectGreeting}
              className="w-full h-11 rounded-xl font-bold text-xs sm:text-sm text-[#F4D995] bg-[#192747]/90 hover:bg-[#192747] border border-[#D6AD60]/60 hover:border-[#F4D995] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:text-[#FFF5DE] active:scale-98 group"
            >
              <Sparkles className="w-4 h-4 text-[#FFB347] group-hover:scale-115 transition-transform" />
              <span>{t.directGreetingBtn}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Footer links: Guest entry & Audio Credits */}
      <div className="shrink-0 pt-2 pb-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleGuestEntry}
          className="min-h-[44px] px-3 py-2 text-xs text-[#F4D995] hover:text-[#FFF5DE] underline decoration-dotted transition-colors cursor-pointer rounded-xl focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none flex items-center"
        >
          {t.guestText}
        </button>
        {onOpenAudioCredits && (
          <>
            <span className="text-[#D6AD60]/40 text-xs hidden xs:inline" aria-hidden="true">•</span>
            <button
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                onOpenAudioCredits();
              }}
              className="min-h-[44px] px-3 py-2 text-xs text-[#F4D995] hover:text-[#FFF5DE] transition-colors cursor-pointer flex items-center gap-1.5 rounded-xl focus-visible:ring-2 focus-visible:ring-[#FFD54F] focus-visible:outline-none"
            >
              <span>🎵</span>
              <span className="underline decoration-dotted">
                {currentLanguage === 'hi'
                  ? 'ध्वनि आभार एवं लाइसेंस'
                  : currentLanguage === 'bn'
                  ? 'অডিও ঋণস্বীকার ও লাইসেন্স'
                  : 'Audio Credits & Licences'}
              </span>
            </button>
          </>
        )}
      </div>

      {/* Personalized Emotional Welcome Modal before entering celebration */}
      <PersonalizedWelcomeModal
        isOpen={showPersonalizedModal}
        name={inputVal.trim() || userName || 'Family'}
        state={selectedState}
        city={cityVal.trim()}
        currentLanguage={currentLanguage}
        onEnterCelebration={() => {
          setShowPersonalizedModal(false);
          onEnter();
        }}
        onOpenExplorer={() => {
          onOpenExplorer();
        }}
        onEditDetails={() => setShowPersonalizedModal(false)}
      />
    </div>
  );
};
