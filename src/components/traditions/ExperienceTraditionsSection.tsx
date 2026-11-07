/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Compass, ChevronRight, Flame, Heart, ArrowRight } from 'lucide-react';
import { RegionalActivity } from '../../types';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { getRegionalActivities, hasDedicatedActivities } from '../../data/regionalActivities';
import { getRegionByName } from '../../data/regionalData';
import { audioManager } from '../../utils/audio';

interface ExperienceTraditionsSectionProps {
  userState?: string;
  currentLanguage: Language;
  onOpenActivity: (activity: RegionalActivity) => void;
  onOpenExplorer?: () => void;
}

export const ExperienceTraditionsSection: React.FC<ExperienceTraditionsSectionProps> = ({
  userState,
  currentLanguage,
  onOpenActivity,
  onOpenExplorer,
}) => {
  const t = TRANSLATIONS[currentLanguage].regional;
  const region = getRegionByName(userState || '');
  const activities = getRegionalActivities(userState || '');
  const isDedicated = hasDedicatedActivities(userState);

  const regionDisplayName = region
    ? currentLanguage === 'hi'
      ? region.hi
      : currentLanguage === 'bn'
      ? region.bn
      : region.name
    : currentLanguage === 'hi'
    ? 'अखिल भारतीय'
    : currentLanguage === 'bn'
    ? 'সর্বভারতীয়'
    : 'All-India';

  return (
    <section className="w-full my-6 sm:my-8 relative select-none">
      {/* Outer Glow & Decorative Frame */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#192747]/90 via-[#10172D] to-[#192747]/90 border-2 border-[#D6AD60]/40 shadow-2xl p-4 sm:p-7 overflow-hidden text-[#FFF5DE]">
        {/* Subtle Decorative Golden Border Pattern */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D6AD60] to-transparent" />

        {/* Header: Dedicated Section Quote & Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6AD60]/15 border border-[#D6AD60]/30 text-[#F4D995] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FFB347]" />
            <span>
              {isDedicated
                ? currentLanguage === 'hi'
                  ? '✨ विशिष्ट इंटरएक्टिव परंपराएं'
                  : currentLanguage === 'bn'
                  ? '✨ বিশেষ ইন্টারেক্টিভ ঐতিহ্য'
                  : '✨ Featured Interactive Traditions'
                : currentLanguage === 'hi'
                ? '📜 सांस्कृतिक धरोहर व लोक परंपराएं'
                : currentLanguage === 'bn'
                ? '📜 সাংস্কৃতিক ঐতিহ্য ও লোকগাথা'
                : '📜 Regional Heritage & Cultural Lore'}
            </span>
            <span className="text-[#FFF5DE]/50">·</span>
            <span>{regionDisplayName}</span>
          </div>

          <h3 className="font-editorial text-lg sm:text-2xl md:text-3xl text-[#F4D995] italic font-normal leading-relaxed text-balance">
            "{t.experienceTraditionsQuote}"
          </h3>

          <p className="text-xs sm:text-sm text-[#FFF5DE]/80 max-w-xl mx-auto">
            {isDedicated
              ? t.experienceTraditionsSub
              : currentLanguage === 'hi'
              ? `${regionDisplayName} की प्रामाणिक त्योहार परंपराओं, लोक कला व मिष्ठान का परिचय। इंटरएक्टिव सिमुलेटर के लिए हमारे १० विशेष राज्यों को देखें।`
              : currentLanguage === 'bn'
              ? `${regionDisplayName}-এর খাঁটি উৎসবের রীতি, লোকশিল্প ও মিষ্টির গৌরবময় ধারা। পূর্ণাঙ্গ সিমুলেটরের জন্য আমাদের ১০টি বিশেষ রাজ্য দেখুন।`
              : `Explore the authentic festive customs, sacred decor, and culinary heritage of ${regionDisplayName}. Step into our 10 featured states for bespoke interactive ritual simulators.`}
          </p>

          {!isDedicated && onOpenExplorer && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  audioManager.playClickSound();
                  onOpenExplorer();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D6AD60]/20 hover:bg-[#D6AD60]/30 border border-[#D6AD60]/50 text-xs font-semibold text-[#F4D995] transition-all cursor-pointer shadow-sm"
              >
                <span>✨</span>
                <span>
                  {currentLanguage === 'hi'
                    ? '१० विशेष इंटरएक्टिव राज्य देखें (बंगाल, महाराष्ट्र, गुजरात, आदि)'
                    : currentLanguage === 'bn'
                    ? '১০টি বিশেষ ইন্টারেক্টিভ রাজ্য ঘুরে দেখুন (বাংলা, মহারাষ্ট্র, গুজরাট ইত্যাদি)'
                    : 'Explore 10 Featured Interactive States (Bengal, Maharashtra, Gujarat, etc.)'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 2 to 4 Interactive Regional Activity Cards */}
        <div className={`grid grid-cols-1 ${activities.length === 2 ? 'md:grid-cols-2 max-w-4xl' : activities.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-4 mx-auto`}>
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group relative rounded-2xl bg-[#141E36]/90 border border-[#D6AD60]/30 hover:border-[#D6AD60] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl hover:shadow-[#D6AD60]/10 hover:-translate-y-1"
            >
              {/* Card Header Accent */}
              <div className="h-1 bg-gradient-to-r from-[#D6AD60]/40 via-[#F4D995] to-[#D6AD60]/40 opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="p-4 sm:p-5 flex-1 flex flex-col">
                {/* Visual Icon & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#192747] border border-[#D6AD60]/40 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {activity.icon}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-[#D6AD60]/10 border border-[#D6AD60]/25 text-[10px] font-semibold text-[#F4D995] truncate">
                    {activity.badge[currentLanguage]}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-royal text-base sm:text-lg font-bold text-[#FFF5DE] group-hover:text-[#F4D995] transition-colors leading-snug mb-1.5">
                  {activity.title[currentLanguage]}
                </h4>

                {/* Significance Explanation */}
                <p className="text-xs text-[#FFF5DE]/80 leading-relaxed mb-3 line-clamp-3 flex-1">
                  {activity.significance[currentLanguage]}
                </p>

                {/* Cultural Meaning Teaser Pill */}
                <div className="p-2 rounded-xl bg-[#10172D]/60 border border-[#D6AD60]/20 text-[11px] text-[#F4D995]/90 mb-4 flex items-center gap-1.5">
                  <span className="text-xs">📜</span>
                  <span className="truncate">{activity.whyWeCelebrate.what[currentLanguage]}</span>
                </div>
              </div>

              {/* Action Button: Experience This Tradition */}
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    audioManager.playSparkleSound();
                    onOpenActivity(activity);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF5DE]"
                >
                  <span>
                    {isDedicated
                      ? t.experienceTraditionBtn
                      : currentLanguage === 'hi'
                      ? 'परंपरा व महत्व जानें 📜'
                      : currentLanguage === 'bn'
                      ? 'ঐতিহ্য ও তাৎপর্য জানুন 📜'
                      : 'Explore Tradition Lore 📜'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#10172D] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Explorer Switcher */}
        {onOpenExplorer && (
          <div className="mt-6 pt-4 border-t border-[#D6AD60]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FFF5DE]/75">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span>🇮🇳</span>
              <span>
                {currentLanguage === 'hi'
                  ? `वर्तमान में ${regionDisplayName} की परंपराएं देख रहे हैं।`
                  : currentLanguage === 'bn'
                  ? `বর্তমানে ${regionDisplayName}-এর ঐতিহ্য দেখছেন।`
                  : `Currently experiencing traditions of ${regionDisplayName}.`}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                audioManager.playClickSound();
                onOpenExplorer();
              }}
              className="text-[#F4D995] hover:text-[#FFF5DE] underline decoration-[#D6AD60]/50 underline-offset-4 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.exploreMoreActivities}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
