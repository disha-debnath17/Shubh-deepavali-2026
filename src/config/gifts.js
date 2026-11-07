/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Personalised Family Gifts Configuration for Shubh Deepavali
// Real photos from public/gifts/: saree.webp, watch.webp, kurta.webp, polaroid.webp, ps5.webp, family.webp

export const GIFTS = {
  dad: {
    id: 'dad',
    name: {
      en: 'Papa',
      hi: 'पापा',
      bn: 'বাবা',
    },
    relationship: {
      en: 'Father',
      hi: 'पिताजी',
      bn: 'বাবা',
    },
    giftTitle: {
      en: 'Watch and Kurta',
      hi: 'घड़ी और कुर्ता',
      bn: 'ঘড়ি ও কুর্তা',
    },
    // Papa receives a pair: Watch + Kurta
    items: [
      {
        id: 'dad-watch',
        title: {
          en: 'Watch',
          hi: 'घड़ी',
          bn: 'ঘড়ি',
        },
        type: 'watch',
        image: '/gifts/watch.webp',
      },
      {
        id: 'dad-kurta',
        title: {
          en: 'Kurta',
          hi: 'कुर्ता',
          bn: 'কুর্তা',
        },
        type: 'kurta',
        image: '/gifts/kurta.webp',
      },
    ],
    message: {
      en: 'Thank you for always being our strength. Wishing you a wonderful Diwali, Papa!',
      hi: 'हमेशा हमारा संबल और प्रेरणा बनने के लिए धन्यवाद। आपको दिवाली की ढेरों शुभकामनाएं, पापा!',
      bn: 'সর্বদা আমাদের শক্তি ও সাহস হওয়ার জন্য ধন্যবাদ। আপনাকে দীপাবলির অনেক শুভেচ্ছা, বাবা!',
    },
  },

  mom: {
    id: 'mom',
    name: {
      en: 'Maa',
      hi: 'माँ',
      bn: 'মা',
    },
    relationship: {
      en: 'Mother',
      hi: 'माताजी',
      bn: 'মা',
    },
    giftTitle: {
      en: 'Saree',
      hi: 'साड़ी',
      bn: 'শাড়ি',
    },
    items: [
      {
        id: 'mom-saree',
        title: {
          en: 'Saree',
          hi: 'साड़ी',
          bn: 'শাড়ি',
        },
        type: 'saree',
        image: '/gifts/saree.webp',
      },
    ],
    message: {
      en: 'For the person who makes every festival feel like home. Happy Diwali, Maa!',
      hi: 'उस शख्स के लिए जो हर त्योहार को खुशियों और घर जैसा बना देती हैं। शुभ दीपावली, माँ!',
      bn: 'যার উপস্থিতিতে প্রতিটি উৎসব ঘরের মতো মধুর হয়ে ওঠে। শুভ দীপাবলি, মা!',
    },
  },

  sister: {
    id: 'sister',
    name: {
      en: 'Sister',
      hi: 'दीदी',
      bn: 'দিদি',
    },
    relationship: {
      en: 'Sister',
      hi: 'बहन',
      bn: 'বোন',
    },
    giftTitle: {
      en: 'Camera and kit',
      hi: 'कैमरा और किट',
      bn: 'ক্যামেরা ও কিট',
    },
    items: [
      {
        id: 'sister-camera-kit',
        title: {
          en: 'Camera and kit',
          hi: 'कैमरा और किट',
          bn: 'ক্যামেরা ও কিট',
        },
        type: 'camera',
        image: '/gifts/polaroid.webp',
      },
    ],
    message: {
      en: 'For all the memories we have made and the ones still to come. Happy Diwali, Didi!',
      hi: 'उन सभी खूबसूरत यादों के नाम जो हमने बनाई हैं, और जो आगे बनानी हैं। शुभ दीपावली, दीदी!',
      bn: 'আমাদের কাটানো সব মিষ্টি স্মৃতি এবং আগামী দিনের আনন্দের জন্য। শুভ দীপাবলি, দিদি!',
    },
  },

  brother: {
    id: 'brother',
    name: {
      en: 'Brother',
      hi: 'भाई',
      bn: 'ভাই',
    },
    relationship: {
      en: 'Brother',
      hi: 'भाई',
      bn: 'ভাই',
    },
    giftTitle: {
      en: 'PS5',
      hi: 'पीएस५',
      bn: 'পিএস৫',
    },
    items: [
      {
        id: 'brother-ps5',
        title: {
          en: 'PS5',
          hi: 'पीएस५',
          bn: 'পিএস৫',
        },
        type: 'console',
        image: '/gifts/ps5.webp',
      },
    ],
    message: {
      en: 'Another Diwali, another year of tolerating you. Game on, bhai! Happy Diwali!',
      hi: 'एक और दिवाली, तुम्हें झेलने का एक और साल। गेम ऑन, भाई! शुभ दीपावली!',
      bn: 'আবারও দীপাবলি, তোকে সহ্য করার আরেকটা বছর। গেম অন, ভাই! শুভ দীপাবলি!',
    },
  },

  grandparents: {
    id: 'grandparents',
    name: {
      en: 'Dadu and Dadi',
      hi: 'दादू और दादी',
      bn: 'দাদু ও দিদিমা',
    },
    relationship: {
      en: 'Grandparents',
      hi: 'दादू-दादी',
      bn: 'দাদু-দিদিমা',
    },
    giftTitle: {
      en: 'Hamper',
      hi: 'हैंपर',
      bn: 'হ্যাম্পার',
    },
    items: [
      {
        id: 'grandparents-hamper',
        title: {
          en: 'Hamper',
          hi: 'दिवाली हैंपर',
          bn: 'দীপাবলি হ্যাম্পার',
        },
        type: 'package',
        image: '/gifts/family.webp',
      },
    ],
    message: {
      en: 'Wishing you boundless health, peace, smiles, and warmth. Happy Diwali, Dadu and Dadi!',
      hi: 'आपके उत्तम स्वास्थ्य, दीर्घायु, खुशियों और सुख-शांति की प्रार्थना के साथ। शुभ दीपावली, दादू और दादी!',
      bn: 'সুস্বাস্থ্য, অফুরন্ত ভালোবাসা ও শান্তির প্রার্থনা সহ। শুভ দীপাবলি, দাদু ও দিদিমা!',
    },
  },

  someoneSpecial: {
    id: 'someoneSpecial',
    name: {
      en: 'Someone Special ❤️',
      hi: 'कोई खास ❤️',
      bn: 'মনের বিশেষ কেউ ❤️',
    },
    relationship: {
      en: 'Special Bond',
      hi: 'अनमोल रिश्ता',
      bn: 'বিশেষ সম্পর্ক',
    },
    giftTitle: {
      en: 'Hamper',
      hi: 'हैंपर',
      bn: 'হ্যাম্পার',
    },
    items: [
      {
        id: 'special-hamper',
        title: {
          en: 'Hamper',
          hi: 'विशेष हैंपर',
          bn: 'বিশেষ হ্যাম্পার',
        },
        type: 'package',
        image: '/gifts/family.webp',
      },
    ],
    message: {
      en: 'To the one who illuminates my world with boundless happiness and love. Happy Diwali, with all my love ❤️',
      hi: 'उस शख्स के लिए जो मेरी जिंदगी को खुशियों और रोशनी से भर देते हैं। पूरे दिल से शुभ दीपावली ❤️',
      bn: 'যে মানুষটি আমার জীবনকে আলো আর অফুরন্ত ভালোবাসায় ভরিয়ে তুলেছেন। হৃদয়ের অন্তস্থল থেকে শুভ দীপাবলি ❤️',
    },
  },

  family: {
    id: 'family',
    name: {
      en: 'Family',
      hi: 'परिवार',
      bn: 'পরিবার',
    },
    relationship: {
      en: 'Family',
      hi: 'परिवार',
      bn: 'পরিবার',
    },
    giftTitle: {
      en: 'Hamper',
      hi: 'हैंपर',
      bn: 'হ্যাম্পার',
    },
    items: [
      {
        id: 'family-hamper',
        title: {
          en: 'Hamper',
          hi: 'दिवाली हैंपर',
          bn: 'দীপাবলি হ্যাম্পার',
        },
        type: 'package',
        image: '/gifts/family.webp',
      },
    ],
    message: {
      en: 'May this festival of lights fill your life with warmth, success, joyous laughs, and endless blessings!',
      hi: 'यह दीपोत्सव आपके जीवन में सुख, स्वास्थ्य, समृद्धि, प्रेम और अनगिनत खुशियां लेकर आए!',
      bn: 'এই আলোর উৎসব আপনার জীবনে শান্তি, সমৃদ্ধি, সুস্বাস্থ্য ও অফুরন্ত আনন্দ বয়ে আনুক!',
    },
  },

  default: {
    id: 'default',
    name: {
      en: 'Family',
      hi: 'परिवार',
      bn: 'পরিবার',
    },
    relationship: {
      en: 'Family',
      hi: 'परिवार',
      bn: 'পরিবার',
    },
    giftTitle: {
      en: 'Hamper',
      hi: 'हैंपर',
      bn: 'হ্যাম্পার',
    },
    items: [
      {
        id: 'default-hamper',
        title: {
          en: 'Hamper',
          hi: 'दिवाली हैंपर',
          bn: 'দীপাবলি হ্যাম্পার',
        },
        type: 'package',
        image: '/gifts/family.webp',
      },
    ],
    message: {
      en: 'May this festival of lights fill your life with warmth, success, joyous laughs, and endless blessings!',
      hi: 'यह दीपोत्सव आपके जीवन में सुख, स्वास्थ्य, समृद्धि, प्रेम और अनगिनत खुशियां लेकर आए!',
      bn: 'এই আলোর উৎসব আপনার জীবনে শান্তি, সমৃদ্ধি, সুস্বাস্থ্য ও অফুরন্ত আনন্দ বয়ে আনুক!',
    },
  },

  friend: {
    id: 'friend',
    name: {
      en: 'Friend',
      hi: 'दोस्त',
      bn: 'বন্ধু',
    },
    relationship: {
      en: 'Dear Friend',
      hi: 'प्रिय मित्र',
      bn: 'প্রিয় বন্ধু',
    },
    giftTitle: {
      en: 'Hamper',
      hi: 'हैंपर',
      bn: 'হ্যাম্পার',
    },
    items: [
      {
        id: 'friend-package',
        title: {
          en: 'Hamper',
          hi: 'उपहार हैंपर',
          bn: 'উপহার হ্যাম্পার',
        },
        type: 'package',
        image: '/gifts/family.webp',
      },
    ],
    message: {
      en: 'Friends like you make every Diwali brighter. Happy Diwali!',
      hi: 'आप जैसे दोस्तों की वजह से हर दिवाली और भी रोशन हो जाती है। शुभ दीपावली!',
      bn: 'তোমার মতো বন্ধুদের কারণেই প্রতিটি দীপাবলি আরও উজ্জ্বল হয়ে ওঠে। शुभ দীপাবলি!',
    },
  },

  bestie: {
    id: 'bestie',
    name: {
      en: 'Bestie',
      hi: 'खास दोस्त',
      bn: 'বেস্টি',
    },
    relationship: {
      en: 'Partner in Crime',
      hi: 'सबसे खास दोस्त',
      bn: 'সেরা বন্ধু',
    },
    giftTitle: {
      en: 'Hamper',
      hi: 'हैंपर',
      bn: 'হ্যাম্পার',
    },
    items: [
      {
        id: 'bestie-surprise',
        title: {
          en: 'Hamper',
          hi: 'दिवाली हैंपर',
          bn: 'দীপাবলি হ্যাম্পার',
        },
        type: 'package',
        image: '/gifts/family.webp',
      },
    ],
    message: {
      en: 'To my partner in crime, happy Diwali, bestie!',
      hi: 'मेरे हर राज़ के राज़दार और सबसे प्यारे दोस्त को, शुभ दीपावली, बेस्टी!',
      bn: 'আমার সব দুষ্টুমির সঙ্গীকে, শুভ দীপাবলি, প্রিয় বেস্টি!',
    },
  },
};

// List of gifts
export const ALL_GIFTS_LIST = [
  GIFTS.dad,
  GIFTS.mom,
  GIFTS.sister,
  GIFTS.brother,
  GIFTS.grandparents,
  GIFTS.someoneSpecial,
  GIFTS.family,
  GIFTS.bestie,
  GIFTS.friend,
  GIFTS.default,
];

/**
 * Resolves the real Diwali gift based on recipient role or user name:
 * - Maa: Saree (/gifts/saree.webp)
 * - Papa: Watch (/gifts/watch.webp) & Kurta (/gifts/kurta.webp)
 * - Brother: PS5 (/gifts/ps5.webp)
 * - Sister: Camera and kit (/gifts/polaroid.webp)
 * - Family: Hamper (/gifts/family.webp)
 * - Dadu and dadi: Hamper (/gifts/family.webp)
 * - Someone special: Hamper (/gifts/family.webp)
 */
export function resolveGiftConfig(queryKey = 'default', userName = '') {
  const cleanKey = String(queryKey || '').trim().toLowerCase();
  if (cleanKey === 'mom' || cleanKey === 'maa') return GIFTS.mom;
  if (cleanKey === 'dad' || cleanKey === 'papa') return GIFTS.dad;
  if (cleanKey === 'brother' || cleanKey === 'bhai') return GIFTS.brother;
  if (cleanKey === 'sister' || cleanKey === 'didi') return GIFTS.sister;
  if (
    cleanKey === 'dadu_dadi' ||
    cleanKey === 'grandparents' ||
    cleanKey === 'dada_dadi' ||
    cleanKey === 'dadu' ||
    cleanKey === 'dadi'
  ) {
    return GIFTS.grandparents;
  }
  if (cleanKey === 'someonespecial' || cleanKey === 'special') return GIFTS.someoneSpecial;
  if (cleanKey === 'family' || cleanKey === 'default') return GIFTS.family;
  if (cleanKey === 'bestie') return GIFTS.bestie;
  if (cleanKey === 'friend' || cleanKey === 'friends') return GIFTS.friend;

  const checkStr = `${queryKey || ''} ${userName || ''}`.toLowerCase();

  if (/\b(maa|mom|mother|माताजी|মা)\b/i.test(checkStr)) {
    return GIFTS.mom;
  }
  if (/\b(papa|dad|father|पिताजी|বাবা)\b/i.test(checkStr)) {
    return GIFTS.dad;
  }
  if (/\b(sister|didi|di|behen|बहन|দিদি|বোন)\b/i.test(checkStr)) {
    return GIFTS.sister;
  }
  if (/\b(brother|bhai|bhaiya|भाई|ভায়া|ভাই|দাদা)\b/i.test(checkStr)) {
    return GIFTS.brother;
  }
  if (/\b(dadu|dadi|dada|nana|nani|grandparents|दादू|दादी)\b/i.test(checkStr)) {
    return GIFTS.grandparents;
  }
  if (/\b(special|sweetheart|hum-safar)\b/i.test(checkStr)) {
    return GIFTS.someoneSpecial;
  }
  if (/\b(bestie|bestfriend)\b/i.test(checkStr)) {
    return GIFTS.bestie;
  }
  if (/\b(friend|dost|mitra|bondhu)\b/i.test(checkStr)) {
    return GIFTS.friend;
  }

  // Everyone else receives Hamper
  return GIFTS.family;
}
