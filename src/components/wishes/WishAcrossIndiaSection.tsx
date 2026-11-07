/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Heart, Sparkles, ChevronDown, ChevronUp, Send, CheckCircle2, MapPin, User, Flame, Flag, Trash2, ShieldCheck } from 'lucide-react';
import { Language } from '../../utils/translations';
import { audioManager } from '../../utils/audio';
import { INDIAN_REGIONS } from '../../data/regionalData';
import {
  subscribeToSharedWishes,
  submitFirestoreWish,
  reportFirestoreWish,
  deleteFirestoreWish,
  FirestoreWish,
} from '../../utils/firebase';

export interface CommunityWish {
  id: string;
  name?: string;
  recipientName?: string;
  state?: string;
  wish: string;
  timestamp: number;
  userId?: string;
  moderationStatus?: 'pending' | 'approved' | 'flagged';
  isSample?: boolean;
  isVerified?: boolean;
  reports?: number;
}

const STORAGE_KEY = 'shubh_diwali_wishes_v1';
const MAX_WISHES = 6;

// Seeded initial 6 diverse wishes representing different regions of India
const INITIAL_SEED_WISHES: CommunityWish[] = [
  {
    id: 'seed-wb',
    name: 'Ananya',
    state: 'West Bengal',
    wish: 'May Maa Kali’s divine light remove all darkness and bring peaceful joy to every family across India! ✨',
    timestamp: Date.now() - 1000 * 60 * 180,
    isSample: true,
  },
  {
    id: 'seed-mh',
    name: 'Siddharth',
    state: 'Maharashtra',
    wish: 'Crisp faral, sweet laddoos, and golden moments of laughter. Shubh Deepavali to all our brothers and sisters!',
    timestamp: Date.now() - 1000 * 60 * 150,
    isSample: true,
  },
  {
    id: 'seed-gj',
    name: 'Bhavna',
    state: 'Gujarat',
    wish: 'Saal Mubarak! May this festival of lights spark prosperous new ventures and health in every Indian home. 🪔',
    timestamp: Date.now() - 1000 * 60 * 120,
    isSample: true,
  },
  {
    id: 'seed-ka',
    name: 'Raghav',
    state: 'Karnataka',
    wish: 'From Namma Bengaluru, wishing every home deep serenity, sweet treats, and glowing earthen lamps.',
    timestamp: Date.now() - 1000 * 60 * 90,
    isSample: true,
  },
  {
    id: 'seed-pb',
    name: 'Harpreet',
    state: 'Punjab',
    wish: 'Bandi Chhor Divas & Diwali greetings! May light, liberty, and righteousness illuminate every family’s path.',
    timestamp: Date.now() - 1000 * 60 * 60,
    isSample: true,
  },
  {
    id: 'seed-up',
    name: 'Aditi',
    state: 'Uttar Pradesh',
    wish: 'From the sacred ghats of Varanasi and Ayodhya, praying for divine health, unity, and endless love! ❤️',
    timestamp: Date.now() - 1000 * 60 * 25,
    isSample: true,
  },
];

export function getStoredCommunityWishes(): CommunityWish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_WISHES));
      return INITIAL_SEED_WISHES.slice(0, MAX_WISHES);
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Enforce strict limit of 6
      return parsed.slice(-MAX_WISHES);
    }
  } catch (e) {
    console.warn('Failed to load community wishes:', e);
  }
  return INITIAL_SEED_WISHES.slice(0, MAX_WISHES);
}

export function saveCommunityWish(
  newWishData: Omit<CommunityWish, 'id' | 'timestamp'>
): { wishes: CommunityWish[]; replacedOldest: boolean } {
  const current = getStoredCommunityWishes();
  const replacedOldest = current.length >= MAX_WISHES;

  const newWish: CommunityWish = {
    id: `wish_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name: newWishData.name?.trim() || undefined,
    state: newWishData.state?.trim() || undefined,
    wish: newWishData.wish.trim().slice(0, 120),
    timestamp: Date.now(),
  };

  // Strict maximum of 6 active wishes in storage: FIFO queue
  let updatedList: CommunityWish[];
  if (current.length >= MAX_WISHES) {
    updatedList = [...current.slice(1), newWish];
  } else {
    updatedList = [...current, newWish];
  }

  // Ensure it never exceeds MAX_WISHES
  updatedList = updatedList.slice(-MAX_WISHES);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.warn('Failed to save wish to localStorage:', e);
  }

  return { wishes: updatedList, replacedOldest };
}

interface WishAcrossIndiaProps {
  currentLanguage: Language;
  defaultUserName?: string;
  defaultUserState?: string;
}

export const WishAcrossIndiaSection: React.FC<WishAcrossIndiaProps> = ({
  currentLanguage,
  defaultUserName,
  defaultUserState,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [wishes, setWishes] = useState<CommunityWish[]>([]);
  // Every wish starts fully dark at first: litWishIds is initially empty
  const [litWishIds, setLitWishIds] = useState<Set<string>>(new Set());
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; active: boolean }>({
    x: -500,
    y: -500,
    active: false,
  });

  // Form states
  const [formName, setFormName] = useState<string>(defaultUserName || '');
  const [formRecipient, setFormRecipient] = useState<string>('');
  const [formState, setFormState] = useState<string>(defaultUserState || '');
  const [formWish, setFormWish] = useState<string>('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [consentChecked, setConsentChecked] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Track locally created wish IDs in this client for deletion
  const [myWishIds, setMyWishIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('shubh_diwali_my_wish_ids');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [wishFilter, setWishFilter] = useState<'all' | 'real' | 'samples'>('all');
  const [isServerLive, setIsServerLive] = useState<boolean>(true);

  // Function to fetch active wishes from backend store as backup
  const fetchSharedWishes = useCallback(async () => {
    try {
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.wishes) && data.wishes.length > 0) {
          setWishes(data.wishes);
          setIsServerLive(true);
          return;
        }
      }
    } catch (err) {
      console.warn('Could not fetch shared wishes, using local cache:', err);
      setIsServerLive(false);
    }
    const fallbackList = getStoredCommunityWishes();
    setWishes(fallbackList);
  }, []);

  // Real-time Firestore synchronization using onSnapshot listener (no 10s polling)
  useEffect(() => {
    // Initial fallback load
    fetchSharedWishes();

    let unsubscribe: (() => void) | null = null;
    try {
      unsubscribe = subscribeToSharedWishes(
        (firestoreWishes) => {
          if (firestoreWishes && firestoreWishes.length > 0) {
            // Map firestore documents to community wishes
            const mapped: CommunityWish[] = firestoreWishes.map((fw) => ({
              id: fw.id,
              name: fw.name,
              recipientName: fw.recipientName,
              state: fw.state,
              wish: fw.wish,
              timestamp: fw.timestamp,
              userId: fw.userId,
              moderationStatus: fw.moderationStatus,
              isSample: fw.isSample || false,
              isVerified: fw.isVerified || false,
              reports: fw.reports || 0,
            }));
            setWishes(mapped);
            setIsServerLive(true);
          }
        },
        (error) => {
          console.warn('Firestore real-time subscription fell back to HTTP store:', error);
          fetchSharedWishes();
        }
      );
    } catch (err) {
      console.warn('Failed to attach Firestore real-time listener:', err);
      fetchSharedWishes();
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchSharedWishes]);

  // Update default form inputs if props arrive
  useEffect(() => {
    if (defaultUserName && !formName) setFormName(defaultUserName);
    if (defaultUserState && !formState) setFormState(defaultUserState);
  }, [defaultUserName, defaultUserState]);

  // Handle cursor moving over Wish Wall
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setCursorPos((prev) => ({ ...prev, active: false }));
  };

  // Toggle persistent lighting state of a diya
  const handleToggleDiya = (wishId: string) => {
    audioManager.playSparkleSound();
    setLitWishIds((prev) => {
      const next = new Set(prev);
      if (next.has(wishId)) {
        next.delete(wishId);
      } else {
        next.add(wishId);
      }
      return next;
    });
  };

  // Report inappropriate wish with Firestore and anti-duplicate check
  const handleReportWish = async (wishId: string) => {
    audioManager.playClickSound();
    try {
      // 1. Report to Firestore
      const fsResult = await reportFirestoreWish(wishId);
      if (fsResult.alreadyReported) {
        setNotification(
          currentLanguage === 'hi'
            ? 'आप पहले ही इस शुभकामना की समीक्षा हेतु रिपोर्ट कर चुके हैं।'
            : currentLanguage === 'bn'
            ? 'আপনি ইতিমধ্যে এই বার্তাটি পর্যালোচনার জন্য রিপোর্ট করেছেন।'
            : 'You have already reported this wish for review.'
        );
        setTimeout(() => setNotification(null), 5000);
        return;
      }

      // 2. Also report to server proxy
      const res = await fetch(`/api/wishes/${wishId}/report`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.hidden) {
          setWishes((prev) => prev.filter((w) => w.id !== wishId));
        }
      }

      setNotification(
        currentLanguage === 'hi'
          ? 'समीक्षा के लिए धन्यवाद। इस शुभकामना को फ्लैग कर दिया गया है।'
          : currentLanguage === 'bn'
          ? 'ধন্যবাদ। শুভেচ্ছাটি পর্যালোচনার জন্য চিহ্নিত করা হয়েছে।'
          : 'Thank you. The wish has been reported for moderation review.'
      );
      setTimeout(() => setNotification(null), 5000);
    } catch (e) {
      console.warn('Report failed:', e);
    }
  };

  // Delete user's own submitted wish (Firestore + Server)
  const handleDeleteWish = async (wishId: string) => {
    audioManager.playClickSound();
    try {
      await deleteFirestoreWish(wishId);
      await fetch(`/api/wishes/${wishId}`, { method: 'DELETE' });
      setWishes((prev) => prev.filter((w) => w.id !== wishId));
      setMyWishIds((prev) => {
        const updated = prev.filter((id) => id !== wishId);
        try {
          localStorage.setItem('shubh_diwali_my_wish_ids', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      setNotification(
        currentLanguage === 'hi'
          ? 'आपकी शुभकामना हटा दी गई है।'
          : currentLanguage === 'bn'
          ? 'আপনার বার্তাটি সফলভাবে মুছে ফেলা হয়েছে।'
          : 'Your wish has been removed from the celebration wall.'
      );
      setTimeout(() => setNotification(null), 4000);
    } catch (e) {
      console.warn('Delete failed:', e);
    }
  };

  // Form Submission via shared backend
  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Client rate limiting cooldown (10 seconds)
    if (Date.now() - lastSubmitTime < 10000) {
      const waitSec = Math.ceil((10000 - (Date.now() - lastSubmitTime)) / 1000);
      setFormError(
        currentLanguage === 'hi'
          ? `कृपया ${waitSec} सेकंड प्रतीक्षा करें।`
          : currentLanguage === 'bn'
          ? `অনুগ্রহ করে ${waitSec} সেকেন্ড অপেক্ষা করুন।`
          : `Please wait ${waitSec}s before sending another wish.`
      );
      return;
    }

    const cleanWish = formWish.trim();
    if (!cleanWish || cleanWish.length < 3) {
      setFormError(
        currentLanguage === 'hi'
          ? 'कृपया अपना दिवाली संदेश लिखें (कम से कम ३ अक्षर)।'
          : currentLanguage === 'bn'
          ? 'অনুগ্রহ করে বার্তা লিখুন (অন্তত ৩টি অক্ষর)।'
          : 'Please enter your heartfelt Diwali wish (at least 3 characters).'
      );
      return;
    }

    if (cleanWish.length > 160) {
      setFormError(
        currentLanguage === 'hi'
          ? 'शुभकामना अधिकतम १६० अक्षरों में होनी चाहिए।'
          : currentLanguage === 'bn'
          ? 'বার্তাটি সর্বাধিক ১৬০ অক্ষরের মধ্যে হতে হবে।'
          : 'Wish must be 160 characters or fewer.'
      );
      return;
    }

    // Reject links or script tags
    if (/<[^>]*>|https?:\/\/|www\./i.test(cleanWish)) {
      setFormError(
        currentLanguage === 'hi'
          ? 'संदेश में लिंक या कोड की अनुमति नहीं है।'
          : currentLanguage === 'bn'
          ? 'বার্তায় কোনো লিঙ্ক বা কোড দেওয়া যাবে না।'
          : 'Please enter plain festive greetings without links.'
      );
      return;
    }

    if (!consentChecked) {
      setFormError(
        currentLanguage === 'hi'
          ? 'कृपया शुभकामना साझा करने की सहमति दें।'
          : currentLanguage === 'bn'
          ? 'অনুগ্রহ করে বার্তা প্রকাশের সম্মতি দিন।'
          : 'Please confirm consent to share your wish publicly on the wall.'
      );
      return;
    }

    setIsSubmitting(true);
    audioManager.playDiyaLightSound();

    try {
      setLastSubmitTime(Date.now());
      let createdId = '';

      // 1. Submit directly to Firestore for real-time multi-device sync
      try {
        const fsDoc = await submitFirestoreWish({
          name: formName.trim() || undefined,
          recipientName: formRecipient.trim() || undefined,
          state: formState.trim() || undefined,
          wish: cleanWish,
        });
        createdId = fsDoc.id;
      } catch (fsErr) {
        console.warn('Firestore direct write error, syncing via server:', fsErr);
      }

      // 2. Also notify server backend
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName.trim() || undefined,
          recipientName: formRecipient.trim() || undefined,
          state: formState.trim() || undefined,
          wish: cleanWish,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.wish) {
          createdId = createdId || data.wish.id;
          if (Array.isArray(data.wishes)) {
            setWishes(data.wishes);
          }
        }
      }

      if (createdId) {
        setMyWishIds((prev) => {
          const next = [...prev, createdId];
          try {
            localStorage.setItem('shubh_diwali_my_wish_ids', JSON.stringify(next));
          } catch (e) {}
          return next;
        });
        setLitWishIds((prev) => new Set(prev).add(createdId));
      }

      setFormWish('');
      setFormRecipient('');
      setIsSubmitting(false);

      setNotification(
        currentLanguage === 'hi'
          ? 'आपकी पावन शुभकामना फायरस्टोर द्वारा पूरे भारत के साथ जगमगा उठी है! ❤️'
          : currentLanguage === 'bn'
          ? 'আপনার সুন্দর শুভেচ্ছা ফায়ারস্টোর দিয়ে সমগ্র ভারতের জন্য প্রজ্বলিত হয়েছে! ❤️'
          : 'Your little wish has joined the real-time Pan-India Diya Wall! ❤️'
      );

      setTimeout(() => setNotification(null), 8000);
    } catch (err) {
      console.warn('Wish save error:', err);
      setIsSubmitting(false);
      setNotification('Your wish has been lit on your wall! ❤️');
      setTimeout(() => setNotification(null), 6000);
    }
  };

  // Text helpers based on language
  const labels = {
    heading: 'A Wish Across India ❤️',
    headingHi: 'अखिल भारतीय शुभकामनाएँ ❤️',
    headingBn: 'সমগ্র ভারতের শুভেচ্ছা ❤️',
    supporting:
      'Leave a wish and spread Diwali joy across India!',
    supportingHi:
      'विभिन्न घर, विविध परंपराएँ, पर रोशनी का एक ही पावन पर्व। भारत के किसी कोने में रहने वाले के लिए एक शुभकामना दीया जलाएं।',
    supportingBn:
      'বিভিন্ন ঘর, বিভিন্ন সংস্কৃতি, কিন্তু আলোর এক সুন্দর উৎসব। ভারতের দূর প্রান্তের কোনো মানুষের জন্য একটি ভালোবাসার প্রদীপ জ্বালান।',
    clickToExpand: 'Click to explore & light wishes from across India 🪔',
    clickToExpandHi: 'देश भर की शुभकामनाएँ देखने व नया दीया जलाने के लिए क्लिक करें 🪔',
    clickToExpandBn: 'ভারতবর্ষের শুভেচ্ছা দেখতে ও নতুন প্রদীপ জ্বালাতে ক্লিক করুন 🪔',
    collapse: 'Collapse Wish Wall',
    collapseHi: 'संक्षिप्त करें',
    collapseBn: 'সংক্ষেপ করুন',
    wallStatus6: 'Six little wishes are already shining. Share yours to bring a new light to the celebration.',
    wallStatusEmpty: 'Every beautiful celebration begins with a little hope. Be the first to light a wish.',
    cursorHint: '✨ Wishes rest in darkness. Hover cursor near a diya or tap it to reveal the wish!',
    cursorHintHi: '✨ शुभकामनाएँ अंधकार में हैं। पढ़ने के लिए कर्सर लाएँ या दीया जलाएँ!',
    cursorHintBn: '✨ শুভেচ্ছাগুলি অন্ধকারে রয়েছে। দেখতে কার্সার নিয়ে যান বা প্রদীপ জ্বালান!',
    cursorHintTouch: '🪔 Tap any diya to turn its light on and reveal the wish!',
    formTitle: 'Light Your Diwali Wish',
    formTitleHi: 'अपनी दिवाली शुभकामना प्रज्वलित करें',
    formTitleBn: 'আপনার দীপাবলি শুভেচ্ছা প্রজ্বলিত করুন',
    nameLabel: 'Your Name (Optional)',
    stateLabel: 'State / UT (Optional)',
    wishLabel: 'Your Diwali Wish',
    wishPlaceholder: 'May every home shine with happiness, love and endless blessings...',
    consentText: 'I agree to share this wish publicly on the Diwali celebration wall.',
    submitBtn: 'Light My Wish ✨',
    submittingBtn: 'Lighting Diya...',
    previewBadge: 'Live Preview',
    tapToToggleDiya: 'Click diya to toggle flame',
  };

  const getLocalizedTime = (ts: number) => {
    const minutesAgo = Math.max(1, Math.floor((Date.now() - ts) / (1000 * 60)));
    if (minutesAgo < 60) {
      return currentLanguage === 'hi'
        ? `${minutesAgo} मि. पहले`
        : currentLanguage === 'bn'
        ? `${minutesAgo} মি. আগে`
        : `${minutesAgo}m ago`;
    }
    const hoursAgo = Math.floor(minutesAgo / 60);
    return currentLanguage === 'hi'
      ? `${hoursAgo} घंटे पहले`
      : currentLanguage === 'bn'
      ? `${hoursAgo} ঘণ্টা আগে`
      : `${hoursAgo}h ago`;
  };

  const realWishes = useMemo(() => wishes.filter((w) => !w.isSample), [wishes]);
  const sampleWishes = useMemo(() => wishes.filter((w) => w.isSample), [wishes]);

  const displayedWishes = useMemo(() => {
    if (wishFilter === 'real') return realWishes;
    if (wishFilter === 'samples') return sampleWishes;
    return wishes;
  }, [wishes, realWishes, sampleWishes, wishFilter]);

  return (
    <div className="w-full max-w-3xl mx-auto my-6 text-left transition-all">
      {/* ============================================================== */}
      {/* EXPANDABLE HEADER CARD                                         */}
      {/* ============================================================== */}
      <button
        type="button"
        onClick={() => {
          audioManager.playClickSound();
          setIsExpanded((prev) => !prev);
        }}
        aria-expanded={isExpanded}
        className="w-full rounded-2xl bg-gradient-to-r from-[#192747]/95 via-[#141F3A]/95 to-[#192747]/95 border-2 border-[#D6AD60]/50 hover:border-[#D6AD60] p-4 sm:p-5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 cursor-pointer group transition-all duration-300 hover:shadow-[#D6AD60]/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#FFB347] via-[#D6AD60] to-[#E91E63] p-0.5 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#10172D] rounded-[10px] flex items-center justify-center">
              <span className="text-xl sm:text-2xl animate-pulse">🪔</span>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D6AD60]/20 text-[#F4D995] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">
              <Heart className="w-3 h-3 text-[#FFB347] fill-[#FFB347]" />
              <span>
                {currentLanguage === 'hi'
                  ? 'अखिल भारतीय दीप-दीवार'
                  : currentLanguage === 'bn'
                  ? 'সর্বভারতীয় দীপ-প্রাচীর'
                  : 'Pan-India Diya Wall'}
              </span>
            </div>
            <h3 className="font-royal text-lg sm:text-2xl font-bold text-[#FFF5DE] group-hover:text-[#F4D995] transition-colors flex items-center gap-2">
              <span>
                {currentLanguage === 'hi'
                  ? labels.headingHi
                  : currentLanguage === 'bn'
                  ? labels.headingBn
                  : labels.heading}
              </span>
              <span className="text-xs font-normal text-amber-300/80 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
                {wishes.length}/6 Diyas
              </span>
            </h3>
            <p className="text-xs text-[#FFF5DE]/75 font-light line-clamp-1 hidden sm:block">
              {currentLanguage === 'hi'
                ? labels.supportingHi
                : currentLanguage === 'bn'
                ? labels.supportingBn
                : labels.supporting}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-[#F4D995] font-semibold hidden md:inline">
            {isExpanded
              ? currentLanguage === 'hi'
                ? labels.collapseHi
                : currentLanguage === 'bn'
                ? labels.collapseBn
                : labels.collapse
              : currentLanguage === 'hi'
              ? 'खोलें'
              : currentLanguage === 'bn'
              ? 'খুলুন'
              : 'Explore & Light'}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#D6AD60]/20 flex items-center justify-center text-[#F4D995] group-hover:bg-[#D6AD60]/30 transition-colors">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* ============================================================== */}
      {/* EXPANDED INTERACTIVE SIX-DIYA WISH WALL                         */}
      {/* ============================================================== */}
      {isExpanded && (
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mt-3 rounded-3xl bg-gradient-to-b from-[#0B1224] via-[#0E172F] to-[#0A0F1E] border-2 border-[#D6AD60]/60 p-4 sm:p-7 shadow-2xl overflow-hidden animate-fade-in"
        >
          {/* Subtle cursor-following glowing diya light aura (Desktop/Tablet) */}
          {cursorPos.active && (
            <div
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-200 z-0"
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                width: '260px',
                height: '260px',
                background: 'radial-gradient(circle, rgba(255, 186, 73, 0.28) 0%, rgba(214, 173, 96, 0.12) 50%, transparent 80%)',
              }}
            />
          )}

          {/* Golden starry sky backdrop particles */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <div className="absolute top-6 left-12 w-1.5 h-1.5 bg-[#FFE082] rounded-full animate-ping" />
            <div className="absolute top-20 right-24 w-2 h-2 bg-[#FFB347] rounded-full animate-pulse" />
            <div className="absolute bottom-16 left-1/3 w-1 h-1 bg-[#FFE082] rounded-full animate-ping" />
            <div className="absolute top-1/2 right-12 w-1.5 h-1.5 bg-[#F4D995] rounded-full animate-pulse" />
          </div>

          {/* Section Subheader */}
          <div className="relative z-10 text-center max-w-xl mx-auto mb-6">
            <p className="font-editorial text-sm sm:text-base text-[#F4D995] italic leading-relaxed">
              "{currentLanguage === 'hi'
                ? labels.supportingHi
                : currentLanguage === 'bn'
                ? labels.supportingBn
                : labels.supporting}"
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#192747]/90 border border-[#D6AD60]/30 text-[11px] text-[#FFF5DE]/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {typeof window !== 'undefined' && 'ontouchstart' in window
                  ? labels.cursorHintTouch
                  : currentLanguage === 'hi'
                  ? labels.cursorHintHi
                  : currentLanguage === 'bn'
                  ? labels.cursorHintBn
                  : labels.cursorHint}
              </span>
            </div>
          </div>

          {/* Success Notification Banner */}
          {notification && (
            <div className="relative z-20 mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-[#10172D]/95 to-emerald-950/90 border border-emerald-400/50 text-emerald-200 text-xs sm:text-sm font-medium flex items-center gap-2.5 shadow-lg animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* Live Shared Wall Connection Status and Filter Tabs */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 px-1">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {isServerLive
                    ? currentLanguage === 'hi'
                      ? 'अखिल भारतीय साझा दीपोत्सव दीवार (लाइव)'
                      : currentLanguage === 'bn'
                      ? 'সর্বভারতীয় শেয়ার্ড দেওয়াল (লাইভ)'
                      : 'Pan-India Shared Wall · Cloud Firestore Live'
                    : 'Local Cache Mode'}
                </span>
              </div>
              <span className="text-xs text-[#FFF5DE]/65 font-medium">
                ({realWishes.length} {currentLanguage === 'hi' ? 'आगंतुक संदेश' : currentLanguage === 'bn' ? 'দর্শক বার্তা' : 'live visitor wishes'})
              </span>
            </div>

            {/* Filter Tabs: All, Real Visitor Submissions, Traditional Samples */}
            <div className="flex items-center gap-1 bg-[#10172D]/90 p-1 rounded-xl border border-[#D6AD60]/30 text-xs shadow-md">
              <button
                type="button"
                onClick={() => setWishFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  wishFilter === 'all'
                    ? 'bg-[#D6AD60] text-[#10172D] font-bold shadow-xs'
                    : 'text-[#FFF5DE]/70 hover:text-[#FFF5DE]'
                }`}
              >
                {currentLanguage === 'hi' ? 'सभी संदेश' : currentLanguage === 'bn' ? 'সকল বার্তা' : 'All'} ({wishes.length})
              </button>
              <button
                type="button"
                onClick={() => setWishFilter('real')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  wishFilter === 'real'
                    ? 'bg-emerald-500 text-black font-bold shadow-xs'
                    : 'text-[#FFF5DE]/70 hover:text-[#FFF5DE]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                {currentLanguage === 'hi' ? 'आगंतुक संदेश' : currentLanguage === 'bn' ? 'দর্শকদের বার্তা' : 'Visitor Wishes'} ({realWishes.length})
              </button>
              <button
                type="button"
                onClick={() => setWishFilter('samples')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  wishFilter === 'samples'
                    ? 'bg-[#D6AD60] text-[#10172D] font-bold shadow-xs'
                    : 'text-[#FFF5DE]/70 hover:text-[#FFF5DE]'
                }`}
              >
                {currentLanguage === 'hi' ? 'पारंपरिक नमूने' : currentLanguage === 'bn' ? 'ঐতিহ্যবাহী নমুনা' : 'Samples'} ({sampleWishes.length})
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* THE COMMUNITY DIYA WISH GRID                                   */}
          {/* ============================================================== */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4.5 mb-8">
            {displayedWishes.length === 0 && (
              <div className="col-span-full py-10 px-4 text-center rounded-2xl bg-[#070D1C]/60 border border-[#D6AD60]/30 text-[#FFF5DE]/70 space-y-2">
                <div className="text-3xl">🪔</div>
                <p className="text-sm font-semibold text-[#F4D995]">
                  {wishFilter === 'real'
                    ? currentLanguage === 'hi'
                      ? 'अभी तक कोई आगंतुक संदेश नहीं है। नीचे दिए फॉर्म से पहला दीप आप जलाएं!'
                      : currentLanguage === 'bn'
                      ? 'এখনও কোনো লাইভ বার্তা আসেনি। নিচের ফর্ম পূরণ করে প্রথম প্রদীপটি আপনিই জ্বালান!'
                      : 'No visitor submissions yet in this filter. Light the first community lamp below!'
                    : currentLanguage === 'hi'
                    ? 'कोई संदेश उपलब्ध नहीं है।'
                    : 'No wishes found in this category.'}
                </p>
              </div>
            )}

            {displayedWishes.map((wish: CommunityWish, idx: number) => {
              const isLit = wish ? litWishIds.has(wish.id) : false;
              const isCardHovered = hoveredCardIdx === idx;

              // Calculate proximity factor for hover glow effect
              let proximityGlow = 0;
              if (cursorPos.active && cardRefs.current[idx] && containerRef.current) {
                const cardEl = cardRefs.current[idx];
                if (cardEl) {
                  const cardRect = cardEl.getBoundingClientRect();
                  const contRect = containerRef.current.getBoundingClientRect();
                  const cardCenterX = cardRect.left - contRect.left + cardRect.width / 2;
                  const cardCenterY = cardRect.top - contRect.top + cardRect.height / 2;
                  const dist = Math.hypot(cursorPos.x - cardCenterX, cursorPos.y - cardCenterY);
                  if (dist < 220) {
                    proximityGlow = Math.max(0, 1 - dist / 220);
                  }
                }
              }

              // Card is revealed ONLY if light is on, or cursor hovers around/directly over it
              const isRevealed = isLit || isCardHovered || proximityGlow > 0.08;
              const effectiveIllumination = isLit
                ? 1
                : isCardHovered
                ? 1
                : Math.min(1, Math.max(0, (proximityGlow - 0.05) * 1.4));

              return (
                <div
                  key={wish.id}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onPointerEnter={() => setHoveredCardIdx(idx)}
                  onPointerLeave={() => setHoveredCardIdx(null)}
                  style={{
                    boxShadow: isLit
                      ? '0 0 25px rgba(244, 217, 149, 0.35), inset 0 0 15px rgba(214, 173, 96, 0.15)'
                      : isCardHovered
                      ? '0 0 20px rgba(244, 217, 149, 0.28)'
                      : proximityGlow > 0.08
                      ? `0 0 ${Math.round(proximityGlow * 18)}px rgba(244, 217, 149, ${proximityGlow * 0.25})`
                      : 'none',
                    borderColor: isLit
                      ? '#F4D995'
                      : isCardHovered
                      ? '#D6AD60'
                      : proximityGlow > 0.08
                      ? `rgba(214, 173, 96, ${0.3 + proximityGlow * 0.6})`
                      : 'rgba(26, 38, 64, 0.8)',
                  }}
                  className={`relative rounded-2xl border-2 transition-all duration-300 p-4 sm:p-4.5 flex flex-col justify-between select-none min-h-[175px] overflow-hidden ${
                    isLit
                      ? 'bg-gradient-to-b from-[#1C2C54] to-[#121B35]'
                      : isCardHovered || proximityGlow > 0.2
                      ? 'bg-[#152140]/90'
                      : 'bg-[#060A14]'
                  }`}
                >
                  {/* Top Bar: Contributor Name, State Badge (revealed only on hover or when lit) & Diya Interactive Switch */}
                  <div className="flex items-start justify-between gap-2 mb-2 relative z-10">
                    <div
                      style={{
                        opacity: isRevealed ? effectiveIllumination : 0,
                        transition: 'opacity 0.25s ease-out',
                      }}
                      className="truncate flex-1"
                    >
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#F4D995]/80 shrink-0" />
                          <span className="font-royal font-bold text-xs sm:text-sm text-[#FFF5DE] truncate">
                            {wish.name || (currentLanguage === 'hi' ? 'अनाम स्नेही' : currentLanguage === 'bn' ? 'শুভাকাঙ্ক্ষী' : 'A Kind Heart')}
                          </span>
                        </div>
                        {wish.recipientName && (
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30 truncate">
                            🌸 {currentLanguage === 'hi' ? 'प्रति:' : currentLanguage === 'bn' ? 'প্রতি:' : 'For:'} {wish.recipientName}
                          </span>
                        )}
                      </div>
                      {wish.state && (
                        <div className="flex items-center gap-1 text-[11px] text-[#F4D995] font-medium mt-0.5">
                          <MapPin className="w-3 h-3 text-[#FFB347] shrink-0" />
                          <span className="truncate">{wish.state}</span>
                        </div>
                      )}
                      {/* Community Badge: Real Live Visitor Wish vs Sample Wish */}
                      <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                        {wish.isSample ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-medium border border-amber-500/35">
                            📜 {currentLanguage === 'hi' ? 'नमूना पारंपरिक शुभकामना' : currentLanguage === 'bn' ? 'ঐতিহ্যবাহী নমুনা শুভেচ্ছা' : 'Sample Heritage Wish'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 text-[10px] font-semibold border border-emerald-500/40 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                            ✨ {currentLanguage === 'hi' ? 'वास्तविक आगंतुक शुभकामना' : currentLanguage === 'bn' ? 'লাইভ দর্শক বার্তা' : 'Live Visitor Submission'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* INTERACTIVE MITTI DIYA TOGGLE - Always accessible to turn light ON */}
                    <button
                      type="button"
                      onClick={() => handleToggleDiya(wish.id)}
                      title={labels.tapToToggleDiya}
                      aria-label={labels.tapToToggleDiya}
                      className="group/diya relative flex flex-col items-center cursor-pointer shrink-0 p-1 -mr-1 -mt-1 rounded-xl hover:bg-[#D6AD60]/15 transition-colors focus-visible:outline-none z-20"
                    >
                      {/* Diya SVG illustration */}
                      <div className="relative w-9 h-8 flex items-center justify-center">
                        {/* Dynamic Flame */}
                        <div
                          className={`absolute -top-1 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none ${
                            isLit
                              ? 'opacity-100 scale-100'
                              : isRevealed
                              ? 'opacity-85 scale-90'
                              : 'opacity-0 scale-50'
                          }`}
                        >
                          <Flame
                            className={`w-4 h-4 transition-colors ${
                              isLit
                                ? 'text-amber-300 fill-amber-300 filter drop-shadow(0 0 6px #F59E0B)'
                                : 'text-amber-400/80 fill-amber-400/60'
                            }`}
                          />
                        </div>

                        {/* Clay Base Bowl SVG */}
                        <svg viewBox="0 0 40 25" className="w-9 h-6 filter drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
                          <path
                            d="M 4 8 C 8 20, 32 20, 36 8 C 30 12, 10 12, 4 8 Z"
                            fill={isLit || effectiveIllumination > 0.3 ? '#A85A2A' : '#2C180B'}
                            stroke={isLit ? '#F4D995' : isRevealed ? '#D6AD60' : '#452613'}
                            strokeWidth="1.5"
                          />
                          <ellipse
                            cx="20"
                            cy="8"
                            rx="16"
                            ry="4"
                            fill={isLit || effectiveIllumination > 0.3 ? '#D6AD60' : '#3E2210'}
                          />
                          <ellipse
                            cx="20"
                            cy="8"
                            rx="12"
                            ry="2.5"
                            fill={isLit ? '#FFF0AA' : isRevealed ? '#A85A2A' : '#1A0B04'}
                          />
                        </svg>
                      </div>

                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 transition-colors ${
                          isLit
                            ? 'text-amber-300'
                            : isRevealed
                            ? 'text-[#F4D995]'
                            : 'text-[#FFF5DE]/40 group-hover/diya:text-[#F4D995]'
                        }`}
                      >
                        {isLit ? 'Lit ✨' : 'Light 🪔'}
                      </span>
                    </button>
                  </div>

                  {/* Middle Area: Shrouded Darkness Placeholder vs Revealed Wish */}
                  <div className="relative my-1.5 flex-1 min-h-[64px] flex items-center justify-center">
                    {/* Dark mystery placeholder when wish is shrouded in darkness */}
                    {!isRevealed && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none transition-opacity duration-300">
                        <div className="w-7 h-7 rounded-full bg-[#0D1527] border border-[#D6AD60]/20 flex items-center justify-center mb-1 text-sm opacity-50">
                          🪔
                        </div>
                        <span className="text-[11px] text-[#F4D995]/45 italic">
                          {currentLanguage === 'hi'
                            ? 'अंधकार में गुप्त... कर्सर लाएं या दीया जलाएं ✨'
                            : currentLanguage === 'bn'
                            ? 'অন্ধকারে ঢাকা... কার্সার আনুন বা প্রদীপ জ্বালান ✨'
                            : 'Veiled in darkness... hover or light diya ✨'}
                        </span>
                      </div>
                    )}

                    {/* Actual Wish Text: Seen ONLY when cursor hovers around or light is on */}
                    <div
                      style={{
                        opacity: isRevealed ? effectiveIllumination : 0,
                        filter: isRevealed && effectiveIllumination < 0.6 ? 'blur(0.8px)' : 'none',
                        transition: 'opacity 0.25s ease-out, filter 0.25s ease-out',
                      }}
                      className={`w-full text-center ${
                        isRevealed ? 'pointer-events-auto' : 'pointer-events-none'
                      }`}
                    >
                      <p
                        className={`font-handwriting leading-relaxed ${
                          isLit
                            ? 'text-base sm:text-lg text-[#FFF5DE] font-semibold'
                            : 'text-base sm:text-lg text-[#FFF5DE]/95 font-medium'
                        }`}
                      >
                        "{wish.wish}"
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Timestamp, glow status, report & delete actions */}
                  <div
                    style={{
                      opacity: isRevealed ? 1 : 0.75,
                      transition: 'opacity 0.25s ease-out',
                    }}
                    className="flex items-center justify-between pt-2 border-t border-[#D6AD60]/20 text-[10px] text-[#F4D995]/70"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span>{getLocalizedTime(wish.timestamp)}</span>
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${isLit ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400/50'}`} />
                        <span className="truncate">{isLit ? 'Lit ✨' : 'Glowing'}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {myWishIds.includes(wish.id) ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteWish(wish.id);
                          }}
                          title="Delete my wish"
                          aria-label="Delete my wish"
                          className="p-1 rounded-md text-red-300/70 hover:text-red-300 hover:bg-red-500/20 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReportWish(wish.id);
                          }}
                          title="Report wish"
                          aria-label="Report wish"
                          className="p-1 rounded-md text-[#FFF5DE]/40 hover:text-amber-300 hover:bg-[#D6AD60]/20 transition-colors cursor-pointer"
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================== */}
          {/* WISH SUBMISSION FORM                                           */}
          {/* ============================================================== */}
          <div className="relative z-10 rounded-2xl bg-gradient-to-b from-[#16233E]/90 to-[#10172D]/95 border border-[#D6AD60]/40 p-4 sm:p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✍️</span>
              <h4 className="font-royal text-base sm:text-lg font-bold text-[#FFF5DE]">
                {currentLanguage === 'hi'
                  ? labels.formTitleHi
                  : currentLanguage === 'bn'
                  ? labels.formTitleBn
                  : labels.formTitle}
              </h4>
            </div>

            <form onSubmit={handleSubmitWish} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Contributor Name */}
                <div>
                  <label className="text-xs font-semibold text-[#F4D995] block mb-1">
                    {labels.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Lakshmi"
                    maxLength={35}
                    className="w-full h-9.5 px-3 rounded-xl bg-[#0B1224]/90 border border-[#D6AD60]/40 text-xs sm:text-sm text-[#FFF5DE] placeholder-[#FFF5DE]/40 focus:outline-none focus:border-[#F4D995] transition-all"
                  />
                </div>

                {/* Recipient Name (Optional) */}
                <div>
                  <label className="text-xs font-semibold text-[#F4D995] block mb-1">
                    {currentLanguage === 'hi' ? 'प्राप्तकर्ता का नाम (वैकल्पिक)' : currentLanguage === 'bn' ? 'প্রাপকের নাম (ঐচ্ছিক)' : 'Recipient Name (Optional)'}
                  </label>
                  <input
                    type="text"
                    value={formRecipient}
                    onChange={(e) => setFormRecipient(e.target.value)}
                    placeholder={currentLanguage === 'hi' ? 'जैसे: नानी, राहुल...' : currentLanguage === 'bn' ? 'যেমন: দিদি, রাহুল...' : 'e.g. Grandma, Rohit...'}
                    maxLength={35}
                    className="w-full h-9.5 px-3 rounded-xl bg-[#0B1224]/90 border border-[#D6AD60]/40 text-xs sm:text-sm text-[#FFF5DE] placeholder-[#FFF5DE]/40 focus:outline-none focus:border-[#F4D995] transition-all"
                  />
                </div>

                {/* Contributor State */}
                <div>
                  <label className="text-xs font-semibold text-[#F4D995] block mb-1">
                    {labels.stateLabel}
                  </label>
                  <select
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    className="w-full h-9.5 px-3 rounded-xl bg-[#0B1224]/90 border border-[#D6AD60]/40 text-xs sm:text-sm text-[#FFF5DE] focus:outline-none focus:border-[#F4D995] transition-all"
                  >
                    <option value="">Select Indian State or UT (Optional)</option>
                    {INDIAN_REGIONS.map((st) => (
                      <option key={st.id} value={st.name}>
                        {st.name} {st.festivalName ? `(${st.festivalName.en})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Wish Text Input */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#F4D995] mb-1">
                  <span>{labels.wishLabel} *</span>
                  <span className={`text-[11px] ${formWish.length > 145 ? 'text-amber-400 font-bold' : 'text-[#FFF5DE]/60'}`}>
                    {formWish.length}/160
                  </span>
                </div>
                <textarea
                  value={formWish}
                  onChange={(e) => setFormWish(e.target.value)}
                  placeholder={labels.wishPlaceholder}
                  maxLength={160}
                  rows={2}
                  className="w-full p-3 rounded-xl bg-[#0B1224]/90 border border-[#D6AD60]/40 text-xs sm:text-sm text-[#FFF5DE] placeholder-[#FFF5DE]/40 focus:outline-none focus:border-[#F4D995] transition-all resize-none shadow-inner"
                />
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-[#FFF5DE]/85">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 rounded border-[#D6AD60] text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
                <span>
                  {currentLanguage === 'hi'
                    ? 'मैं इस शुभकामना को सार्वजनिक रूप से उत्सव की दीप-दीवार पर साझा करने की सहमति देता/देती हूँ।'
                    : currentLanguage === 'bn'
                    ? 'আমি এই শুভেচ্ছাটি সর্বজনীনভাবে দীপাবলি দেওয়ালে প্রকাশের সম্মতি জানাচ্ছি।'
                    : labels.consentText}
                </span>
              </label>

              {/* Error Alert */}
              {formError && (
                <p className="text-xs text-amber-400 font-semibold animate-fade-in">
                  ⚠️ {formError}
                </p>
              )}

              {/* Action Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <span className="text-[11px] text-[#FFF5DE]/60 italic hidden sm:inline">
                  {currentLanguage === 'hi'
                    ? 'अधिकतम ६ पावन दीप सक्रिय रहते हैं — नई शुभकामना पुराने स्थान को रोशन करती है।'
                    : currentLanguage === 'bn'
                    ? 'সর্বাধিক ৬টি প্রদীপ সক্রিয় থাকে — নতুন শুভেচ্ছা সুন্দর আলো নিয়ে আসে।'
                    : 'A strict maximum of 6 wishes shine at any time. When full, a new wish gently replaces the oldest light.'}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#10172D] bg-gradient-to-r from-[#F4D995] via-[#D6AD60] to-[#F4D995] hover:brightness-110 active:scale-98 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isSubmitting
                      ? labels.submittingBtn
                      : currentLanguage === 'hi'
                      ? 'मेरी शुभकामना प्रज्वलित करें ✨'
                      : currentLanguage === 'bn'
                      ? 'আমার শুভেচ্ছা প্রজ্বলিত করুন ✨'
                      : labels.submitBtn}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
