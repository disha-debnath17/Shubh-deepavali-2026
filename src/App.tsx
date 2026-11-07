/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, DecorationState, FamilyGiftConfig, CustomLetterConfig, VisitorProfile, RegionalActivity } from './types';
import { Language } from './utils/translations';
import {
  getStoredFamilyGifts,
  saveStoredFamilyGifts,
  getStoredLetter,
  saveStoredLetter,
  getStoredUserProfile,
  saveStoredUserProfile,
} from './data/defaultConfig';
import { audioManager } from './utils/audio';
import { GoldenParticles } from './components/GoldenParticles';
import { TopBar } from './components/TopBar';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { DecorateScreen } from './components/screens/DecorateScreen';
import { FireworksScreen } from './components/screens/FireworksScreen';
import { MithaiScreen } from './components/screens/MithaiScreen';
import { FamilyGiftScreen } from './components/screens/FamilyGiftScreen';
import { LetterScreen } from './components/screens/LetterScreen';
import { ShareModal } from './components/modals/ShareModal';
import { CustomizeModal } from './components/modals/CustomizeModal';
import { RegionalExplorerModal } from './components/modals/RegionalExplorerModal';
import { AudioCreditsModal } from './components/modals/AudioCreditsModal';
import { TraditionExperienceModal } from './components/traditions/TraditionExperienceModal';
import { EcoDiwaliMelaModal } from './components/mela/EcoDiwaliMelaModal';
import { AudioSettingsModal } from './components/modals/AudioSettingsModal';
import {
  verifyRecipientToken,
  verifyCreatorSecret,
  normalizeRecipientRole,
} from './config/recipients';
import { TRANSLATIONS } from './utils/translations';
import { validateCityForState } from './data/indianCities';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(1);
  const [maxUnlockedScreen, setMaxUnlockedScreen] = useState<ScreenId>(1);
  const [userProfile, setUserProfile] = useState<VisitorProfile | null>(() => {
    return getStoredUserProfile();
  });
  const [userName, setUserName] = useState<string>(() => {
    const profile = getStoredUserProfile();
    return profile?.name || '';
  });
  const [recipientKey, setRecipientKey] = useState<string | null>(null);
  const [isCreatorMode, setIsCreatorMode] = useState<boolean>(false);
  const [creatorSessionToken, setCreatorSessionToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem('shubh_diwali_creator_token');
    } catch (e) {
      return null;
    }
  });
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  // Multilingual State: English ('en') by default, or loaded from URL / localStorage
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || urlLang === 'hi' || urlLang === 'bn') {
        return urlLang;
      }
      const stored = localStorage.getItem('shubh_diwali_lang');
      if (stored === 'en' || stored === 'hi' || stored === 'bn') {
        return stored;
      }
    } catch (e) {
      // ignore
    }
    return 'en';
  });

  const [decoration, setDecoration] = useState<DecorationState>({
    fairyLights: false,
    marigoldToran: false,
    rangoli: false,
    diyasCount: 0,
  });

  const [familyGifts, setFamilyGifts] = useState<FamilyGiftConfig[]>(getStoredFamilyGifts);
  const [letterConfig, setLetterConfig] = useState<CustomLetterConfig>(getStoredLetter);

  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState<boolean>(false);
  const [isRegionalExplorerOpen, setIsRegionalExplorerOpen] = useState<boolean>(false);
  const [isAudioCreditsOpen, setIsAudioCreditsOpen] = useState<boolean>(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState<boolean>(false);
  const [audioNotification, setAudioNotification] = useState<string | null>(null);
  const [initialLetterTab, setInitialLetterTab] = useState<'read-letter' | 'create-greeting'>('read-letter');
  const [selectedTraditionActivity, setSelectedTraditionActivity] = useState<RegionalActivity | null>(null);
  const [isEcoMelaOpen, setIsEcoMelaOpen] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => audioManager.getState().isMasterMuted);

  // Subscribe to audio error events to provide gentle user feedback
  useEffect(() => {
    const unsub = audioManager.onError((msg) => {
      setAudioNotification(msg);
      setTimeout(() => setAudioNotification(null), 6000);
    });
    return () => unsub();
  }, []);

  // Lock body scroll when any modal is open to prevent background bouncing on mobile touch devices
  useEffect(() => {
    const isAnyModalOpen =
      isShareModalOpen ||
      isCustomizeModalOpen ||
      isRegionalExplorerOpen ||
      isAudioCreditsOpen ||
      isAudioSettingsOpen ||
      Boolean(selectedTraditionActivity) ||
      isEcoMelaOpen;

    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [
    isShareModalOpen,
    isCustomizeModalOpen,
    isRegionalExplorerOpen,
    isAudioCreditsOpen,
    isAudioSettingsOpen,
    selectedTraditionActivity,
    isEcoMelaOpen,
  ]);

  // Parse URL parameters on initial load
  // Private recipient tokens (?k=... or ?token=...) are verified strictly against the server backend.
  // Creator credentials (?creator=...) are verified securely via timing-safe HMAC on the server.
  // Arbitrary URL parameters (e.g. ?to=mom or ?name=...) do NOT grant access to private recipient gifts.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const secretToken = params.get('k') || params.get('token');
      const creatorParam = params.get('creator');
      const urlName = params.get('name');
      const urlScreen = params.get('screen');

      // Verify recipient token securely via backend
      if (secretToken) {
        verifyRecipientToken(secretToken).then((res) => {
          if (res.valid && res.role) {
            setRecipientKey(res.role);
            if (res.recipientName) {
              setUserName(res.recipientName);
            }
          } else {
            // Invalid, revoked, or expired token: fall back to universal family view
            setRecipientKey(null);
            const tSec = TRANSLATIONS[currentLanguage].security;
            if (res.revoked) {
              setSecurityNotice(tSec.tokenRevoked);
            } else if (res.expired) {
              setSecurityNotice(tSec.tokenExpired);
            }
          }
        });
      }

      // Verify creator credentials securely via backend
      if (creatorParam) {
        verifyCreatorSecret(creatorParam).then((res) => {
          if (res.success && res.creatorToken) {
            setIsCreatorMode(true);
            setCreatorSessionToken(res.creatorToken);
            try {
              sessionStorage.setItem('shubh_diwali_creator_token', res.creatorToken);
            } catch (e) {
              // ignore
            }
          } else {
            setIsCreatorMode(false);
          }
        });
      } else {
        try {
          const savedToken = sessionStorage.getItem('shubh_diwali_creator_token');
          if (savedToken) {
            setIsCreatorMode(true);
            setCreatorSessionToken(savedToken);
          }
        } catch (e) {
          // ignore
        }
      }

      const urlState = params.get('state');
      const urlCity = params.get('city');

      if (urlName && urlName.trim()) {
        const cleanedName = urlName.trim();
        setUserName(cleanedName);
      }

      if (urlState || urlName || urlCity) {
        setUserProfile((prev) => {
          const updated: VisitorProfile = {
            name: (urlName && urlName.trim()) || prev?.name || '',
            state: (urlState && urlState.trim()) || prev?.state || '',
            city: (urlCity && urlCity.trim()) || prev?.city || '',
            isGuest: false,
          };
          saveStoredUserProfile(updated);
          return updated;
        });
      }

      if (urlScreen) {
        const s = parseInt(urlScreen, 10);
        if (!isNaN(s) && s >= 1 && s <= 6) {
          setCurrentScreen(s as ScreenId);
          setMaxUnlockedScreen((prev) => Math.max(prev, s) as ScreenId);
        } else {
          // Strictly reject screens outside 1-6 (such as ?screen=7). Default safely to Screen 1.
          setCurrentScreen(1);
          setMaxUnlockedScreen(1);
        }
      }
    } catch (e) {
      console.warn('URL parsing failed:', e);
    }
  }, [currentLanguage]);

  const handleSelectLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('shubh_diwali_lang', lang);
    } catch (e) {
      // ignore
    }
  };

  const handleSaveProfile = (profile: VisitorProfile) => {
    setUserProfile(profile);
    setUserName(profile.name);
    saveStoredUserProfile(profile);
  };

  const handleDirectGreeting = (profile: VisitorProfile) => {
    setUserProfile(profile);
    setUserName(profile.name);
    saveStoredUserProfile(profile);
    setInitialLetterTab('create-greeting');
    setMaxUnlockedScreen(6);
    setCurrentScreen(6);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchStateFromExplorer = (newState: string) => {
    setUserProfile((prev) => {
      const currentCity = prev?.city || '';
      let verifiedCity = currentCity;
      if (currentCity) {
        const check = validateCityForState(currentCity, newState);
        if (check.isMismatch) {
          verifiedCity = '';
        }
      }

      const updated: VisitorProfile = {
        name: prev?.name || userName || 'Family & Friends',
        state: newState,
        city: verifiedCity || undefined,
        isGuest: prev?.isGuest ?? false,
        role: prev?.role || 'family',
      };
      saveStoredUserProfile(updated);
      return updated;
    });
  };

  const navigateTo = (screen: ScreenId) => {
    const validScreen = (Math.min(Math.max(screen, 1), 6)) as ScreenId;
    setCurrentScreen(validScreen);
    setMaxUnlockedScreen((prev) => Math.max(prev, validScreen) as ScreenId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateDecoration = (update: Partial<DecorationState>) => {
    setDecoration((prev) => ({ ...prev, ...update }));
  };

  const handleSaveGifts = (updatedGifts: FamilyGiftConfig[]) => {
    setFamilyGifts(updatedGifts);
    saveStoredFamilyGifts(updatedGifts);
  };

  const handleSaveLetter = (updatedLetter: CustomLetterConfig) => {
    setLetterConfig(updatedLetter);
    saveStoredLetter(updatedLetter);
  };

  const handleToggleAudio = () => {
    const muted = audioManager.toggleMute();
    setIsAudioMuted(muted);
  };

  const handleRestart = () => {
    setDecoration({
      fairyLights: false,
      marigoldToran: false,
      rangoli: false,
      diyasCount: 0,
    });
    setInitialLetterTab('read-letter');
    navigateTo(1);
  };

  return (
    <div className="min-h-screen bg-[#10172D] text-[#FFF5DE] flex flex-col relative selection:bg-[#D6AD60]/30 selection:text-[#F4D995] font-sans">
      {/* Background Floating Golden Particles with Cursor/Touch Responsiveness */}
      <GoldenParticles intensity={currentScreen === 4 ? 'intense' : currentScreen === 3 ? 'festive' : 'subtle'} />

      {/* Global Top App Bar */}
      <TopBar
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        maxUnlockedScreen={maxUnlockedScreen}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenCustomize={() => setIsCustomizeModalOpen(true)}
        isCreatorMode={isCreatorMode}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onOpenAudioSettings={() => setIsAudioSettingsOpen(true)}
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
        activeState={userProfile?.state}
        onOpenRegionalExplorer={() => setIsRegionalExplorerOpen(true)}
        onOpenAudioCredits={() => setIsAudioCreditsOpen(true)}
      />

      {/* Audio Error / Fallback Notification Banner */}
      {audioNotification && (
        <div
          role="status"
          aria-live="polite"
          className="w-full bg-[#192747] border-b border-[#D6AD60]/40 text-[#F4D995] px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between z-50 animate-fade-in"
        >
          <div className="flex items-center gap-2">
            <span>🎵</span>
            <span>{audioNotification}</span>
          </div>
          <button
            onClick={() => setAudioNotification(null)}
            className="min-h-[36px] min-w-[36px] rounded-lg text-slate-400 hover:text-white flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      )}

      {/* Security Notification Banner if a link is revoked or expired */}
      {securityNotice && (
        <div className="w-full bg-amber-500/20 border-b border-amber-500/40 text-amber-200 px-4 py-2 text-xs sm:text-sm flex items-center justify-between z-50">
          <span>{securityNotice}</span>
          <button
            onClick={() => setSecurityNotice(null)}
            className="text-amber-300 font-bold hover:text-white px-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Screen Transition Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto relative z-10">
        {(![1, 2, 3, 4, 5, 6].includes(currentScreen) || currentScreen === 1) && (
          <WelcomeScreen
            userName={userName}
            userProfile={userProfile}
            onSetName={(name) => setUserName(name)}
            onSaveProfile={handleSaveProfile}
            onEnter={() => {
              setInitialLetterTab('read-letter');
              navigateTo(2);
            }}
            onDirectGreeting={handleDirectGreeting}
            onOpenExplorer={() => setIsRegionalExplorerOpen(true)}
            currentLanguage={currentLanguage}
            onSelectLanguage={handleSelectLanguage}
            onOpenAudioCredits={() => setIsAudioCreditsOpen(true)}
          />
        )}

        {currentScreen === 2 && (
          <DecorateScreen
            userName={userName || (currentLanguage === 'hi' ? 'परिवार' : currentLanguage === 'bn' ? 'পরিবার' : 'Family')}
            userState={userProfile?.state}
            onOpenExplorer={() => setIsRegionalExplorerOpen(true)}
            onOpenActivity={(act) => setSelectedTraditionActivity(act)}
            onOpenEcoMela={() => setIsEcoMelaOpen(true)}
            decoration={decoration}
            onUpdateDecoration={handleUpdateDecoration}
            onContinue={() => navigateTo(3)}
            currentLanguage={currentLanguage}
          />
        )}

        {currentScreen === 3 && (
          <FireworksScreen
            userName={userName}
            onContinue={() => navigateTo(4)}
            currentLanguage={currentLanguage}
          />
        )}

        {currentScreen === 4 && (
          <MithaiScreen
            userName={userName}
            userState={userProfile?.state}
            onContinue={() => navigateTo(5)}
            currentLanguage={currentLanguage}
          />
        )}

        {currentScreen === 5 && (
          <FamilyGiftScreen
            userName={userName}
            recipientKey={recipientKey || userProfile?.role || null}
            isCreatorMode={isCreatorMode}
            creatorSessionToken={creatorSessionToken}
            onOpenCustomize={() => setIsCustomizeModalOpen(true)}
            onContinue={() => navigateTo(6)}
            currentLanguage={currentLanguage}
          />
        )}

        {currentScreen === 6 && (
          <LetterScreen
            userName={userName}
            userState={userProfile?.state}
            recipientKey={recipientKey || userProfile?.role || null}
            onRestart={handleRestart}
            onOpenShare={() => setIsShareModalOpen(true)}
            currentLanguage={currentLanguage}
            onOpenAudioCredits={() => setIsAudioCreditsOpen(true)}
            initialTab={initialLetterTab}
            onNavigateToScreen={(screen) => navigateTo(screen as ScreenId)}
            decoration={decoration}
            onOpenEcoMela={() => setIsEcoMelaOpen(true)}
          />
        )}
      </main>

      {/* Share Celebration Modal */}
      <ShareModal
        userName={userName}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentLanguage={currentLanguage}
      />

      {/* Creator Customisation Modal */}
      <CustomizeModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
        familyGifts={familyGifts}
        onSaveGifts={handleSaveGifts}
        letterConfig={letterConfig}
        onSaveLetter={handleSaveLetter}
        currentLanguage={currentLanguage}
        creatorSessionToken={creatorSessionToken}
        onCreatorAuthenticated={(token) => {
          setIsCreatorMode(true);
          setCreatorSessionToken(token);
          try {
            sessionStorage.setItem('shubh_diwali_creator_token', token);
          } catch (e) {
            // ignore
          }
        }}
      />

      {/* Pan-India Regional Traditions Explorer Modal */}
      <RegionalExplorerModal
        isOpen={isRegionalExplorerOpen}
        onClose={() => setIsRegionalExplorerOpen(false)}
        activeState={userProfile?.state || ''}
        onSelectState={handleSwitchStateFromExplorer}
        onOpenActivity={(act) => setSelectedTraditionActivity(act)}
        currentLanguage={currentLanguage}
      />

      {/* Interactive Regional Tradition Experience Modal */}
      <TraditionExperienceModal
        isOpen={Boolean(selectedTraditionActivity)}
        onClose={() => setSelectedTraditionActivity(null)}
        activity={selectedTraditionActivity}
        currentLanguage={currentLanguage}
      />

      {/* Eco-Friendly Diwali Mela Modal */}
      <EcoDiwaliMelaModal
        isOpen={isEcoMelaOpen}
        onClose={() => setIsEcoMelaOpen(false)}
        language={currentLanguage}
        selectedState={userProfile?.state || 'All of India'}
        userName={userName || (currentLanguage === 'hi' ? 'मित्र' : currentLanguage === 'bn' ? 'বন্ধু' : 'Friend')}
      />

      {/* Audio & Community Attribution Licences Modal */}
      <AudioCreditsModal
        isOpen={isAudioCreditsOpen}
        onClose={() => setIsAudioCreditsOpen(false)}
        currentLanguage={currentLanguage}
      />

      {/* Audio & Volume Controls Modal */}
      <AudioSettingsModal
        isOpen={isAudioSettingsOpen}
        onClose={() => setIsAudioSettingsOpen(false)}
        currentLanguage={currentLanguage}
        onOpenCredits={() => {
          setIsAudioSettingsOpen(false);
          setIsAudioCreditsOpen(true);
        }}
      />
    </div>
  );
}
