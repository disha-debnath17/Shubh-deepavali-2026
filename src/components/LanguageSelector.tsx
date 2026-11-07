/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Languages } from 'lucide-react';
import { Language, SUPPORTED_LANGUAGES } from '../utils/translations';
import { audioManager } from '../utils/audio';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  variant?: 'welcome' | 'header';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
  variant = 'welcome',
}) => {
  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center gap-1 rounded-xl border border-[#D6AD60]/40 p-1 backdrop-blur-md transition-all ${
        variant === 'welcome'
          ? 'bg-[#192747]/80 shadow-lg shadow-black/40'
          : 'bg-[#10172D]/90'
      }`}
    >
      <div className="flex items-center gap-1 px-2 text-[#F4D995] text-xs font-semibold select-none">
        <Languages className="w-3.5 h-3.5 text-[#FFB347]" />
        <span className="hidden sm:inline">Language:</span>
      </div>

      <div className="flex items-center gap-1">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                if (lang.code !== currentLanguage) {
                  audioManager.playClickSound();
                  onSelectLanguage(lang.code);
                }
              }}
              aria-pressed={isActive}
              className={`min-h-[32px] px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D995] ${
                isActive
                  ? 'bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] text-[#10172D] font-bold shadow-sm'
                  : 'text-[#FFF5DE]/80 hover:text-[#FFF5DE] hover:bg-[#10172D]/60'
              }`}
            >
              <span>{lang.nativeLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
