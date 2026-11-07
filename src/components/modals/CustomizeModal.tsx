import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, RotateCcw, Save, Check, Sparkles, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { FamilyGiftConfig, CustomLetterConfig } from '../../types';
import { DEFAULT_FAMILY_GIFTS, DEFAULT_LETTER } from '../../data/defaultConfig';
import { audioManager } from '../../utils/audio';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { verifyCreatorSecret } from '../../config/recipients';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyGifts: FamilyGiftConfig[];
  onSaveGifts: (gifts: FamilyGiftConfig[]) => void;
  letterConfig: CustomLetterConfig;
  onSaveLetter: (letter: CustomLetterConfig) => void;
  currentLanguage?: Language;
  creatorSessionToken?: string | null;
  onCreatorAuthenticated?: (token: string) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  familyGifts,
  onSaveGifts,
  letterConfig,
  onSaveLetter,
  currentLanguage = 'en',
  creatorSessionToken,
  onCreatorAuthenticated,
}) => {
  const tSec = TRANSLATIONS[currentLanguage].security;
  const [activeTab, setActiveTab] = useState<'gifts' | 'letter'>('gifts');
  const [giftsState, setGiftsState] = useState<FamilyGiftConfig[]>([...familyGifts]);
  const [letterState, setLetterState] = useState<CustomLetterConfig>({ ...letterConfig });
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

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

  // Authentication gate state
  const [inputSecret, setInputSecret] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifyingAuth, setIsVerifyingAuth] = useState(false);

  const isAuthenticated = Boolean(creatorSessionToken);

  const handleVerifyCreator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSecret.trim()) return;
    setIsVerifyingAuth(true);
    setAuthError(null);
    try {
      const res = await verifyCreatorSecret(inputSecret.trim());
      if (res.success && res.creatorToken) {
        audioManager.playSparkleSound();
        if (onCreatorAuthenticated) {
          onCreatorAuthenticated(res.creatorToken);
        }
      } else {
        setAuthError(tSec.invalidSecret || 'Invalid creator credentials');
      }
    } catch (err) {
      setAuthError('Verification service error');
    } finally {
      setIsVerifyingAuth(false);
    }
  };

  const handleGenerateWithAi = async () => {
    setIsAiGenerating(true);
    audioManager.playSparkleSound();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api/gemini/greeting';
      let greetingData: any = null;

      if (apiUrl) {
        try {
          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              relationship: 'family',
              recipientName: currentLanguage === 'hi' ? 'प्रिय परिवार' : currentLanguage === 'bn' ? 'প্রিয় পরিবার' : 'Beloved Family',
              senderName: currentLanguage === 'hi' ? 'आपका प्रियजन' : currentLanguage === 'bn' ? 'আপনার প্রিয়জন' : 'Your Loved One',
              tone: 'heartfelt',
              language: currentLanguage,
              state: 'All of India',
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.greeting) {
              greetingData = data.greeting;
            }
          }
        } catch (fetchErr) {
          console.warn('AI letter generation endpoint unreachable, using built-in sample:', fetchErr);
        }
      }

      // If API not configured or call failed, use built-in sample text
      if (!greetingData) {
        greetingData = {
          salutation: currentLanguage === 'hi' ? 'प्रिय परिवार,' : currentLanguage === 'bn' ? 'প্রিয় পরিবার,' : 'Dearest Family,',
          p1: DEFAULT_LETTER.p1,
          p2: DEFAULT_LETTER.p2,
          p3: DEFAULT_LETTER.p3,
          closing: DEFAULT_LETTER.closing,
        };
      }

      setLetterState((prev) => ({
        ...prev,
        salutation: greetingData.salutation || prev.salutation,
        p1: greetingData.p1 || prev.p1,
        p2: greetingData.p2 || prev.p2,
        p3: greetingData.p3 || prev.p3,
        closing: greetingData.closing || prev.closing,
      }));
      audioManager.playSparkleSound();
    } catch (e) {
      console.warn('AI generation error:', e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  if (!isOpen) return null;

  const handleUpdateGiftField = (index: number, field: keyof FamilyGiftConfig, value: string) => {
    const updated = [...giftsState];
    updated[index] = { ...updated[index], [field]: value };
    setGiftsState(updated);
  };

  const handleAddMember = () => {
    const newId = `member_${Date.now()}`;
    const newMember: FamilyGiftConfig = {
      id: newId,
      name: 'New Family Member',
      relationship: 'Relative / Friend',
      giftTitle: 'Special Festive Hamper',
      giftImage: '/images/family.webp',
      message: 'Wishing you a radiant and joyous Deepavali filled with sweet memories!',
    };
    setGiftsState([...giftsState, newMember]);
    audioManager.playClickSound();
  };

  const handleDeleteMember = (index: number) => {
    if (giftsState.length <= 1) {
      alert('You must have at least one family gift configured.');
      return;
    }
    const updated = giftsState.filter((_, idx) => idx !== index);
    setGiftsState(updated);
    audioManager.playClickSound();
  };

  const handleSaveAll = () => {
    onSaveGifts(giftsState);
    onSaveLetter(letterState);
    audioManager.playSparkleSound();
    setSavedMessage('All customizations saved successfully! ✨');
    setTimeout(() => {
      setSavedMessage(null);
      onClose();
    }, 1200);
  };

  const handleResetDefaults = () => {
    if (confirm('Reset gifts and letter back to default Diwali celebrations?')) {
      setGiftsState([...DEFAULT_FAMILY_GIFTS]);
      setLetterState({ ...DEFAULT_LETTER });
      onSaveGifts(DEFAULT_FAMILY_GIFTS);
      onSaveLetter(DEFAULT_LETTER);
      audioManager.playSparkleSound();
      setSavedMessage('Reset to defaults! 🪔');
      setTimeout(() => setSavedMessage(null), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customize-studio-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#192747] border-2 border-[#D6AD60] shadow-2xl text-[#FFF5DE] overflow-hidden gold-border-glow">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#D6AD60]/20 bg-[#10172D]/90">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">⚙️</span>
            <div>
              <h3
                id="customize-studio-title"
                className="font-royal text-base sm:text-lg font-bold text-[#F4D995]"
              >
                Creator Customisation Studio
              </h3>
              <p className="text-[11px] text-[#FFF5DE]/60">
                Personalise family gifts, relationships, and letter wording
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-[#10172D] border border-[#D6AD60]/30 hover:border-[#D6AD60] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD54F]"
            aria-label="Close Customisation Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Content */}
        {!isAuthenticated ? (
          <div className="flex-1 p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h4 className="font-royal text-lg font-bold text-[#FFF5DE]">
                {tSec.secretVerificationTitle}
              </h4>
              <p className="text-xs text-[#FFF5DE]/70">
                {tSec.creatorModeSubtitle}
              </p>
            </div>
            <form onSubmit={handleVerifyCreator} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                placeholder={tSec.secretPlaceholder}
                value={inputSecret}
                onChange={(e) => setInputSecret(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172D] border border-[#D6AD60]/40 text-sm text-[#FFF5DE] focus:outline-none focus:border-[#F4D995]"
              />
              {authError && <p className="text-xs text-rose-400 font-medium">{authError}</p>}
              <button
                type="submit"
                disabled={isVerifyingAuth}
                className="w-full py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D] hover:brightness-110 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isVerifyingAuth ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                <span>{isVerifyingAuth ? tSec.verifying : tSec.verifyBtn}</span>
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="flex items-center px-6 pt-3 border-b border-[#D6AD60]/20 gap-2 bg-[#10172D]/40">
              <button
                onClick={() => setActiveTab('gifts')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl transition-colors border-b-2 ${
                  activeTab === 'gifts'
                    ? 'border-[#D6AD60] text-[#F4D995] bg-[#192747]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Family Gifts ({giftsState.length})
              </button>
              <button
                onClick={() => setActiveTab('letter')}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-xl transition-colors border-b-2 ${
                  activeTab === 'letter'
                    ? 'border-[#D6AD60] text-[#F4D995] bg-[#192747]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Heartfelt Letter Text
              </button>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {activeTab === 'gifts' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#FFF5DE]/70">
                      Configure personalised gifts for each family member:
                    </p>
                    <button
                      onClick={handleAddMember}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#D6AD60] text-[#10172D] hover:bg-[#F4D995] transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Member</span>
                    </button>
                  </div>

              {giftsState.map((member, idx) => (
                <div
                  key={member.id || idx}
                  className="p-4 rounded-2xl bg-[#10172D]/70 border border-[#D6AD60]/30 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F4D995] uppercase tracking-wider">
                      Member #{idx + 1}: {member.name}
                    </span>
                    <button
                      onClick={() => handleDeleteMember(idx)}
                      className="text-xs text-rose-400 hover:text-rose-300 p-1 flex items-center gap-1"
                      title="Remove member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleUpdateGiftField(idx, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#192747] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Relationship</label>
                      <input
                        type="text"
                        value={member.relationship}
                        onChange={(e) => handleUpdateGiftField(idx, 'relationship', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#192747] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Gift Title</label>
                      <input
                        type="text"
                        value={member.giftTitle}
                        onChange={(e) => handleUpdateGiftField(idx, 'giftTitle', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#192747] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Image Path / URL</label>
                      <input
                        type="text"
                        value={member.giftImage}
                        onChange={(e) => handleUpdateGiftField(idx, 'giftImage', e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#192747] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Personalised Message</label>
                    <textarea
                      rows={2}
                      value={member.message}
                      onChange={(e) => handleUpdateGiftField(idx, 'message', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#192747] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-gradient-to-r from-[#D6AD60]/15 via-[#192747] to-[#D6AD60]/15 border border-[#D6AD60]/40 shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#F4D995]">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
                    <span>Google Gemini AI Composer</span>
                  </div>
                  <p className="text-[11px] text-[#FFF5DE]/70 mt-0.5">
                    Generate an authentic, touching Diwali letter for family automatically.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isAiGenerating}
                  onClick={handleGenerateWithAi}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] text-[#10172D] hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50 shrink-0"
                >
                  {isAiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#10172D]" /> : <Sparkles className="w-3.5 h-3.5 text-[#10172D]" />}
                  <span>{isAiGenerating ? 'Composing...' : '✦ Auto-Generate with Gemini AI'}</span>
                </button>
              </div>

              <p className="text-xs text-[#FFF5DE]/70">
                Customise the special letter displayed on the final celebration screen:
              </p>

              <div>
                <label className="block text-xs text-[#F4D995] font-semibold mb-1">Salutation</label>
                <input
                  type="text"
                  value={letterState.salutation}
                  onChange={(e) => setLetterState({ ...letterState, salutation: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#10172D] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F4D995] font-semibold mb-1">Paragraph 1</label>
                <textarea
                  rows={2}
                  value={letterState.p1}
                  onChange={(e) => setLetterState({ ...letterState, p1: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#10172D] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F4D995] font-semibold mb-1">Paragraph 2</label>
                <textarea
                  rows={2}
                  value={letterState.p2}
                  onChange={(e) => setLetterState({ ...letterState, p2: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#10172D] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F4D995] font-semibold mb-1">Paragraph 3</label>
                <textarea
                  rows={2}
                  value={letterState.p3}
                  onChange={(e) => setLetterState({ ...letterState, p3: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#10172D] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F4D995] font-semibold mb-1">Paragraph 4</label>
                <textarea
                  rows={2}
                  value={letterState.p4}
                  onChange={(e) => setLetterState({ ...letterState, p4: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#10172D] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#F4D995] font-semibold mb-1">Paragraph 5</label>
                <textarea
                  rows={2}
                  value={letterState.p5}
                  onChange={(e) => setLetterState({ ...letterState, p5: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#10172D] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#F4D995] font-semibold mb-1">Closing</label>
                  <input
                    type="text"
                    value={letterState.closing}
                    onChange={(e) => setLetterState({ ...letterState, closing: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#10172D] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#F4D995] font-semibold mb-1">Signature</label>
                  <input
                    type="text"
                    value={letterState.signature}
                    onChange={(e) => setLetterState({ ...letterState, signature: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#10172D] border border-[#D6AD60]/30 text-xs text-white focus:outline-none focus:border-[#F4D995]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

          {/* Saved Feedback */}
          {savedMessage && (
            <div className="px-6 py-2 bg-emerald-950/80 border-t border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>{savedMessage}</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between p-4 border-t border-[#D6AD60]/20 bg-[#10172D]">
            <button
              onClick={handleResetDefaults}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-[#192747] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-xs px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-[#192747] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAll}
                className="text-xs sm:text-sm px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#F4D995] to-[#D6AD60] text-[#10172D] hover:brightness-110 flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);
};
