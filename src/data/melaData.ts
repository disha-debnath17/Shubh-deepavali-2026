/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../utils/translations';

export interface MelaRewardState {
  stars: number;
  badges: string[]; // IDs of unlocked badges
  completedGames: string[];
}

export interface BadgeInfo {
  id: string;
  name: { en: string; hi: string; bn: string };
  desc: { en: string; hi: string; bn: string };
  icon: string;
}

export const MELA_BADGES: BadgeInfo[] = [
  {
    id: 'diya_master',
    name: { en: 'Diya Master', hi: 'दीया गुरु', bn: 'প্রদীপ মাস্টার' },
    desc: {
      en: 'Found all hidden festive treasures',
      hi: 'सभी छिपे उत्सव खजाने खोज निकाले',
      bn: 'সমস্ত লুকানো উৎসবের সম্পদ খুঁজে বের করেছেন',
    },
    icon: '🪔',
  },
  {
    id: 'rangoli_artist',
    name: { en: 'Rangoli Artist', hi: 'रंगोली कलाकार', bn: 'আলপনা শিল্পী' },
    desc: {
      en: 'Created and saved a sacred festive Rangoli',
      hi: 'एक सुंदर पवित्र रंगोली बनाई और सहेजी',
      bn: 'একটি সুন্দর আলপনা তৈরি ও সংরক্ষণ করেছেন',
    },
    icon: '🌸',
  },
  {
    id: 'memory_champion',
    name: { en: 'Mithai Champion', hi: 'मिठाई चैंपियन', bn: 'স্মৃতি চ্যাম্পিয়ন' },
    desc: {
      en: 'Mastered the festive memory recall rounds',
      hi: 'उत्सव याददाश्त के सभी राउंड पूरे किए',
      bn: 'উৎসবের স্মৃতি খেলায় দক্ষতা অর্জন করেছেন',
    },
    icon: '🍬',
  },
  {
    id: 'diwali_explorer',
    name: { en: 'Diwali Explorer', hi: 'दिवाली अन्वेषक', bn: 'দীপাবলি অভিযাত্রী' },
    desc: {
      en: 'Answered Diwali tradition & regional questions',
      hi: 'दिवाली परंपराओं और क्षेत्रीय प्रश्नों का सही उत्तर दिया',
      bn: 'দীপাবলির ঐতিহ্য ও আঞ্চলিক প্রশ্নের সঠিক উত্তর দিয়েছেন',
    },
    icon: '🧭',
  },
  {
    id: 'eco_sparkler',
    name: { en: 'Eco Sparkler', hi: 'पर्यावरण दीप ज्योति', bn: 'সবুজ আতশবাজি' },
    desc: {
      en: 'Completed the smoke-free digital firework sequences',
      hi: 'धुआं-मुक्त डिजिटल आतिशबाजी पैटर्न पूरा किया',
      bn: 'ধোঁয়াহীন ডিজিটাল আতশবাজির ধারা সফলভাবে সম্পন্ন করেছেন',
    },
    icon: '🎆',
  },
  {
    id: 'mela_champion',
    name: { en: 'Mela Grand Champion', hi: 'मेला शिरोमणि', bn: 'মেলা গ্র্যান্ড চ্যাম্পিয়ন' },
    desc: {
      en: 'Earned 100+ Diwali Stars across the Mela',
      hi: 'मेले में १००+ दिवाली सितारे अर्जित किए',
      bn: 'মেলায় ১০০+ দীপাবলি তারা অর্জন করেছেন',
    },
    icon: '👑',
  },
];

const MELA_STORAGE_KEY = 'shubh_diwali_mela_rewards_v2';

export function getStoredMelaRewards(): MelaRewardState {
  try {
    const saved = localStorage.getItem(MELA_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.stars === 'number') {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }
  return { stars: 0, badges: [], completedGames: [] };
}

export function saveStoredMelaRewards(state: MelaRewardState) {
  try {
    localStorage.setItem(MELA_STORAGE_KEY, JSON.stringify(state));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('melaRewardsUpdated', { detail: state }));
    }
  } catch (e) {
    // ignore
  }
}

export function awardMelaReward(gameId: string, starsToAdd: number, badgeId?: string): MelaRewardState {
  const current = getStoredMelaRewards();
  const alreadyCompleted = current.completedGames.includes(gameId);

  // Prevent awarding the same game points repeatedly
  const actualStarsToAdd = alreadyCompleted ? 0 : Math.max(0, starsToAdd);
  const nextStars = current.stars + actualStarsToAdd;

  const nextBadges = [...current.badges];
  if (badgeId && !nextBadges.includes(badgeId)) {
    nextBadges.push(badgeId);
  }
  if (nextStars >= 100 && !nextBadges.includes('mela_champion')) {
    nextBadges.push('mela_champion');
  }
  const nextCompleted = alreadyCompleted
    ? current.completedGames
    : [...current.completedGames, gameId];

  const updated: MelaRewardState = {
    stars: nextStars,
    badges: nextBadges,
    completedGames: nextCompleted,
  };
  saveStoredMelaRewards(updated);
  return updated;
}

// ----------------- QUIZ QUESTIONS DATA -----------------
export interface QuizQuestion {
  id: string;
  question: { en: string; hi: string; bn: string };
  options: { en: string[]; hi: string[]; bn: string[] };
  correctIndex: number;
  explanation: { en: string; hi: string; bn: string };
  stateSpecific?: string; // region name e.g. 'West Bengal', 'Maharashtra'
}

export const GENERAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'gen_1',
    question: {
      en: 'What does the word "Deepavali" literally translate to in Sanskrit?',
      hi: '"दीपावली" शब्द का संस्कृत में शाब्दिक अर्थ क्या है?',
      bn: 'সংস্কৃত ভাষায় "দীপাবলি" শব্দের আক্ষরিক অর্থ কী?',
    },
    options: {
      en: ['Row of Glowing Lamps', 'Festival of Sweets', 'Dance of Fire', 'New Moon Night'],
      hi: ['दीपों की पंक्ति', 'मिठाइयों का त्योहार', 'अग्नि का नृत्य', 'अमावस्या की रात'],
      bn: ['প্রদীপের সারি', 'মিষ্টির উৎসব', 'আগুনের নৃত্য', 'অমাবস্যার রাত'],
    },
    correctIndex: 0,
    explanation: {
      en: '"Deepa" means earthen lamp and "Avali" means a continuous row or line.',
      hi: '"दीप" का अर्थ दीपक और "आवली" का अर्थ कतार या पंक्ति होता है।',
      bn: '"দীপ" মানে প্রদীপ এবং "আবলি" মানে সারি বা মালা।',
    },
  },
  {
    id: 'gen_2',
    question: {
      en: 'Why are eco-friendly earthen clay (mitti) diyas traditionally preferred during Diwali?',
      hi: 'पारंपरिक रूप से दिवाली पर मिट्टी के दीयों को सबसे शुभ और श्रेष्ठ क्यों माना जाता है?',
      bn: 'ঐতিহ্যগতভাবে দীপাবলিতে মাটির প্রদীপকে কেন সবচেয়ে শুভ বিবেচনা করা হয়?',
    },
    options: {
      en: [
        'They connect with Mother Earth and sustain local potters (Kumhars)',
        'They run without oil',
        'They only glow in blue',
        'They are made of synthetic plastic',
      ],
      hi: [
        'वे पंचतत्व से जुड़ते हैं और स्थानीय कुम्हारों की आजीविका का संबल हैं',
        'वे बिना तेल के जलते हैं',
        'वे केवल नीली रोशनी देते हैं',
        'वे प्लास्टिक के बने होते हैं',
      ],
      bn: [
        'তারা মাটির সাথে যুক্ত ও গ্রামীণ কুমোরদের জীবনযাত্রাকে সমর্থন করে',
        'তারা তেল ছাড়া জ্বলে',
        'তারা কেবল নীল আলো দেয়',
        'তারা প্লাস্টিকের তৈরি',
      ],
    },
    correctIndex: 0,
    explanation: {
      en: 'Clay diyas represent the Panchatattva (earth, water, fire, air, space) and sustain the traditional pottery artisans of India.',
      hi: 'मिट्टी के दीये पंचतत्वों का प्रतीक हैं और भारतीय लोककला व कुम्हारों को आत्मनिर्भर बनाते हैं।',
      bn: 'মাটির প্রদীপ পঞ্চভূতের প্রতীক এবং আমাদের গ্রামীণ মৃৎশিল্পীদের জীবিকার অবলম্বন।',
    },
  },
  {
    id: 'gen_3',
    question: {
      en: 'Which deity is revered alongside Goddess Lakshmi on Diwali night for wisdom and new beginnings?',
      hi: 'दिवाली की रात धन की देवी लक्ष्मी के साथ सद्बुद्धि और शुभ आरंभ हेतु किस देवता की पूजा की जाती है?',
      bn: 'দীপাবলির রাতে দেবী লক্ষ্মীর সাথে বুদ্ধি ও সিদ্ধির জন্য কোন দেবতার পূজা করা হয়?',
    },
    options: {
      en: ['Lord Ganesha', 'Lord Indra', 'Lord Varuna', 'Lord Agni'],
      hi: ['भगवान श्री गणेश', 'इंद्र देव', 'वरुण देव', 'अग्नि देव'],
      bn: ['ভগবান শ্রী গণেশ', 'ইন্দ্র দেব', 'বরুণ দেব', 'অগ্নি দেব'],
    },
    correctIndex: 0,
    explanation: {
      en: 'Wealth without wisdom is perilous; thus Lord Ganesha (Wisdom) and Goddess Lakshmi (Prosperity) are worshipped together.',
      hi: 'सद्बुद्धि के बिना धन का सदुपयोग संभव नहीं, इसलिए गणेश जी और लक्ष्मी जी की साथ में पूजा होती है।',
      bn: 'বুদ্ধি ছাড়া সমৃদ্ধি অর্থহীন, তাই গণেশ ও লক্ষ্মীর আরাধনা একসাথে করা হয়।',
    },
  },
  {
    id: 'gen_4',
    question: {
      en: 'What is the auspicious significance of hanging a fresh Marigold (Genda) and Mango leaf Toran on the main doorway?',
      hi: 'दिवाली पर मुख्य द्वार पर गेंदे के फूल और आम के पत्तों का तोरण लगाने का क्या महत्व है?',
      bn: 'ঘরের মূল দরজায় গাঁদা ফুল ও আম পাতার তোরণ লাগানোর আধ্যাত্মিক গুরুত্ব কী?',
    },
    options: {
      en: [
        'It welcomes positive energy, purifies the air, and signifies auspicious entry',
        'It works as a doorbell',
        'It prevents wind from entering',
        'It is only for color matching',
      ],
      hi: [
        'यह सकारात्मक ऊर्जा को आमंत्रित करता है, वातावरण शुद्ध करता है और मंगल प्रवेश का प्रतीक है',
        'यह घंटी का काम करता है',
        'यह हवा को रोकता है',
        'यह सिर्फ रंग मिलाने के लिए है',
      ],
      bn: [
        'এটি ইতিবাচক শক্তি আকর্ষণ করে, বাতাস বিশুদ্ধ করে এবং মঙ্গল সূচনা করে',
        'এটি ঘণ্টার কাজ করে',
        'এটি বাতাস প্রতিরোধ করে',
        'এটি কেবল সাজসজ্জার জন্য',
      ],
    },
    correctIndex: 0,
    explanation: {
      en: 'Mango leaves absorb carbon and purify incoming breeze, while marigold colors symbolise solar energy and spiritual radiance.',
      hi: 'आम के पत्ते शुद्ध वायु का संचार करते हैं और गेंदे के स्वर्णिम रंग सूर्य व समृद्धि के प्रतीक हैं।',
      bn: 'আমের পাতা বাতাস নির্মল করে এবং গাঁদা ফুলের হলুদ-কমলা রঙ সূর্যের শুভ তেজ বহন করে।',
    },
  },
];

export const REGIONAL_QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  'West Bengal': [
    {
      id: 'wb_1',
      question: {
        en: 'In Bengal, on Bhoot Chaturdashi (the eve of Diwali), how many earthen diyas are traditionally lit to honor ancestors?',
        hi: 'बंगाल में भूत चतुर्दशी की रात पितरों के सम्मान में कितने मिट्टी के दीये (प्रदीप) जलाए जाते हैं?',
        bn: 'ভূত চতুর্দশীর সন্ধ্যায় পূর্বপুরুষদের স্মরণে কতগুলি মাটির প্রদীপ প্রজ্বলন করা হয়?',
      },
      options: {
        en: ['14 Diyas (Choddo Prodip)', '7 Diyas', '21 Diyas', '108 Diyas'],
        hi: ['१४ दीये (चौदह प्रदीप)', '७ दीये', '२१ दीये', '१०८ दीये'],
        bn: ['১৪টি প্রদীপ (চোদ্দ প্রদীপ)', '৭টি প্রদীপ', '২১টি প্রদীপ', '১০৮টি প্রদীপ'],
      },
      correctIndex: 0,
      explanation: {
        en: 'According to traditional belief, Choddo Prodip (14 lamps) are lit to reverently remember ancestors and dispel gloom, alongside cooking Choddo Shak (14 seasonal leafy greens) to welcome the autumn harvest transition.',
        hi: 'पारंपरिक लोक विश्वास के अनुसार, पूर्वजों की पावन स्मृति में १४ मिट्टी के दीये जलाए जाते हैं और ऋतु परिवर्तन के स्वागत में १४ मौसमी शाक ग्रहण किए जाते हैं।',
        bn: 'চিরায়ত বিশ্বাস অনুসারে, চৌদ্দ পুরুষের স্মরণে ১৪টি মাটির প্রদীপ জ্বালিয়ে অন্ধকার দূর করা হয় এবং হেমন্তের মরশুমি রূপকে বরণ করতে ১৪ রকমের শাক রান্না হয়।',
      },
    },
    {
      id: 'wb_2',
      question: {
        en: 'During Diwali night, which divine mother is celebrated with grand night-long pujas across West Bengal?',
        hi: 'दिवाली की रात बंगाल में किस देवी की भव्य और पावन पूजा निशा काल में की जाती है?',
        bn: 'দীপাবলির অমাবস্যার নিশীথ রাতে বাংলায় কার মহা আরাধনা করা হয়?',
      },
      options: {
        en: ['Maa Shyama Kali', 'Maa Saraswati', 'Maa Annapurna', 'Maa Jagaddhatri'],
        hi: ['मां श्यामा काली', 'मां सरस्वती', 'मां अन्नपूर्णा', 'मां जगद्धात्री'],
        bn: ['মা শ্যামা কালী', 'মা সরস্বতী', 'মা অন্নপূর্ণা', 'মা জগদ্ধাত্রী'],
      },
      correctIndex: 0,
      explanation: {
        en: 'Kali Puja (Shyama Pujo) takes place on the Amavasya night to conquer darkness and ignorance.',
        hi: 'दिवाली की पावन रात मां काली की उपासना कर अज्ञान और असत्य के संहार का संकल्प लिया जाता है।',
        bn: 'অজ্ঞানতা ও অন্ধকারের বিনাশ ঘটিয়ে আলো আনতে মা কালীর আরাধনা করা হয়।',
      },
    },
  ],
  Maharashtra: [
    {
      id: 'mh_1',
      question: {
        en: 'What is "Diwali Pahat" in Maharashtra?',
        hi: 'महाराष्ट्र में "दिवाली पहाट" का क्या सांस्कृतिक महत्व है?',
        bn: 'মহারাষ্ট্রে "দীপাবলি পাহাত"-এর সাংস্কৃতিক গুরুত্ব কী?',
      },
      options: {
        en: [
          'Pre-dawn classical music concerts and communal celebrations',
          'A sweet eating contest',
          'Midnight fireworks show',
          'Shopping sale',
        ],
        hi: [
          'ब्रह्ममुहूर्त में शास्त्रीय संगीत सभाएं और पारिवारिक मिलन',
          'मिठाई खाने की प्रतियोगिता',
          'आधी रात की आतिशबाजी',
          'बाजार की खरीदारी',
        ],
        bn: [
          'ভোরবেলার মার্গসঙ্গীত ও শাস্ত্রীয় গানের উৎসব',
          'মিষ্টি খাওয়ার প্রতিযোগিতা',
          'মধ্যরাতের আতশবাজি',
          'কেনাকাটার মেলা',
        ],
      },
      correctIndex: 0,
      explanation: {
        en: 'Diwali Pahat welcomes the auspicious dawn of Narak Chaturdashi with soulful ragas, abhyanga snan, and crisp hot Faral.',
        hi: 'पहाट यानी भोर की वह सुहानी बेला जब अभ्यंग स्नान के बाद शास्त्रीय संगीत से नए दिन का स्वागत होता है।',
        bn: 'ভোরে স্নানের পর মার্গসঙ্গীত শুনে ও সুস্বাদু ফারাল খেয়ে পাহাত উদ্‌যাপন করা হয়।',
      },
    },
  ],
  Gujarat: [
    {
      id: 'gj_1',
      question: {
        en: 'What is the sacred ritual of "Chopda Pujan" celebrated on Diwali evening in Gujarat?',
        hi: 'गुजरात में दिवाली की शाम को "चोपड़ा पूजन" किस रूप में मनाया जाता है?',
        bn: 'গুজরাটে দীপাবলির সন্ধ্যায় "চোপড়া পূজন"-এ কীসের পূজা হয়?',
      },
      options: {
        en: [
          'Worship of new financial account books & ink with auspicious Swastik and Shubh-Labh',
          'Worship of cooking vessels',
          'Worship of traditional clothes',
          'Worship of vehicles',
        ],
        hi: [
          'नए बही-खातों और कलम पर कुमकुम से स्वास्तिक व शुभ-लाभ लिखकर पूजन',
          'रसोई के बर्तनों की पूजा',
          'वस्त्रों की पूजा',
          'वाहनों की पूजा',
        ],
        bn: [
          'নতুন হিসাবের খাতা এবং কলমে স্বস্তিক এঁকে পুজো করা',
          'রান্নার বাসনের পুজো',
          'পোশাকের পুজো',
          'গাড়ির পুজো',
        ],
      },
      correctIndex: 0,
      explanation: {
        en: 'Chopda Pujan closes the past year books with gratitude and invokes Goddess Lakshmi and Saraswati for ethical, flourishing enterprise.',
        hi: 'चोपड़ा पूजन में व्यापारी और गृहस्थ बही-खातों पर स्वास्तिक बनाकर सच्चे और समृद्ध व्यापार की प्रार्थना करते हैं।',
        bn: 'চোপড়া পূজনের মাধ্যমে সততা ও সফল ব্যবসার শুভকামনা করা হয়।',
      },
    },
  ],
  'Tamil Nadu': [
    {
      id: 'tn_1',
      question: {
        en: 'In Tamil Nadu, why do families wake up before sunrise on Deepavali for "Ganga Snanam"?',
        hi: 'तमिलनाडु में दीपावली की भोर में सूर्योदय से पूर्व "गंगा स्नानम्" क्यों किया जाता है?',
        bn: 'তামিলনাড়ুতে দীপাবলির ভোরে "গঙ্গা স্নানম"-এর ঐতিহ্য কী?',
      },
      options: {
        en: [
          'A sacred warm sesame oil bath believed to purify the soul with the purity of river Ganga',
          'Swimming competition',
          'Cold ice water plunge',
          'Sprinkling ocean water',
        ],
        hi: [
          'तिल के तेल से औषधीय अभ्यंग स्नान, जिसे गंगा के समान पावन माना जाता है',
          'तैराकी प्रतियोगिता',
          'बर्फीले पानी का स्नान',
          'समुद्री जल का छिड़काव',
        ],
        bn: [
          'তিলের তেল মেখে পবিত্র সূর্যোদয়ের স্নান যা গঙ্গার মতো পবিত্র বিবেচিত হয়',
          'সাঁতার প্রতিযোগিতা',
          'বরফ জলে স্নান',
          'সমুদ্রের জল ছিটানো',
        ],
      },
      correctIndex: 0,
      explanation: {
        en: 'On Deepavali dawn, sesame oil represents Lakshmi and the warm water is believed to hold the sacred essence of river Ganga.',
        hi: 'दीपावली की सुबह तिल के तेल में लक्ष्मी और जल में गंगा जी का वास माना जाता है, जिससे तन और मन निर्मल होते हैं।',
        bn: 'এই দিনে জলে গঙ্গা এবং তেলে লক্ষ্মীর অধিষ্ঠান বিশ্বাস করে গঙ্গাস্নান করা হয়।',
      },
    },
  ],
  Punjab: [
    {
      id: 'pb_1',
      question: {
        en: 'In Punjab and Sikh tradition, Diwali coincides with the distinct festival of "Bandi Chhor Divas". Which momentous event does it celebrate?',
        hi: 'पंजाब व सिख परंपरा में दिवाली के समकाल "बंदी छोड़ दिवस" का विशिष्ट पर्व मनाया जाता है। यह किस ऐतिहासिक घटना का प्रतीक है?',
        bn: 'পাঞ্জাব ও শিখ ঐতিহ্যে দীপাবলির সমকালে "বন্দী ছোড় দিবস"-এর অনন্য উৎসব পালিত হয়। এটি কোন ঐতিহাসিক ঘটনার স্মারক?',
      },
      options: {
        en: [
          'Release of Sixth Guru, Guru Hargobind Ji, and 52 innocent captive rajas from Gwalior Fort',
          'Construction of the first Gurdwara',
          'Harvest of mustard fields',
          'The coronation of Maharaja Ranjit Singh',
        ],
        hi: [
          'ग्वालियर किले से छठे गुरु श्री हरगोबिंद जी और ५२ निर्दोष राजाओं की मुक्ति',
          'प्रथम गुरुद्वारे की स्थापना',
          'सरसों की फसल की कटाई',
          'महाराजा रणजीत सिंह का राज्याभिषेक',
        ],
        bn: [
          'গোয়ালিয়র দুর্গ থেকে ষষ্ঠ গুরু হরগোবিন্দ জী ও ৫২ জন নির্দোষ রাজার মুক্তি',
          'প্রথম গুরুদ্বার নির্মাণ',
          'সর্ষে ফসল তোলা',
          'মহারাজা রণজিৎ সিংয়ের অভিষেক',
        ],
      },
      correctIndex: 0,
      explanation: {
        en: 'Bandi Chhor Divas is a distinct Sikh celebration of liberty and righteous compassion that historically coincides with Diwali. Guru Hargobind Sahib Ji was offered personal release from Gwalior Fort but compassionately refused until all 52 innocent captive rajas were freed with him.',
        hi: 'बंदी छोड़ दिवस सिख परंपरा का एक विशिष्ट मुक्ति पर्व है जो कालक्रम से दिवाली संग पड़ता है। गुरु हरगोबिंद साहिब जी ने स्वयं अकेले रिहा होने से इनकार कर ५२ बेकसूर राजाओं को भी रिहा करवाकर सच्ची धार्मिक स्वतंत्रता स्थापित की थी।',
        bn: 'বন্দী ছোড় দিবস শিখ ঐতিহ্যের এক স্বতন্ত্র ও মহান মুক্তি উৎসব যা ঐতিহাসিকভাবে দীপাবলির সমকালে উদযাপিত হয়। গুরু হরগোবিন্দ জী নিঃস্বার্থ মানবিকতায় ৫২ জন নির্দোষ রাজাকে অন্যায় বন্দিদশা থেকে মুক্ত করে আলোয় ফিরেছিলেন।',
      },
    },
  ],
};

export function getQuizQuestionsForState(stateName?: string, count: number = 5): QuizQuestion[] {
  const result: QuizQuestion[] = [];
  
  // If state has specific questions, take up to 2 of them
  if (stateName && REGIONAL_QUIZ_QUESTIONS[stateName]) {
    const regional = REGIONAL_QUIZ_QUESTIONS[stateName];
    result.push(...regional.slice(0, 2));
  }
  
  // Fill the rest with general questions
  const remainingNeeded = count - result.length;
  const generalShuffled = [...GENERAL_QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
  result.push(...generalShuffled.slice(0, remainingNeeded));
  
  return result;
}

// ----------------- TREASURE HUNT ITEMS -----------------
export interface TreasureObject {
  id: string;
  name: { en: string; hi: string; bn: string };
  emoji: string;
  clue: { en: string; hi: string; bn: string };
  locationDesc: { en: string; hi: string; bn: string };
  // Visual anchor within the 800x500 courtyard room viewBox
  x: number;
  y: number;
  size: number;
}

export const TREASURE_HUNT_OBJECTS: TreasureObject[] = [
  {
    id: 'diya',
    name: { en: 'Golden Mitti Diya', hi: 'मिट्टी का दीया', bn: 'মাটির প্রদীপ' },
    emoji: '🪔',
    clue: {
      en: 'Flickering peacefully on the middle courtyard step.',
      hi: 'आंगन की सीढ़ी पर चुपचाप टिमटिमा रहा है।',
      bn: 'উঠোনের পাথুরে সিঁড়ির ওপর স্নিগ্ধ আলো ছড়াচ্ছে।',
    },
    locationDesc: {
      en: 'Step landing right beside the rangoli',
      hi: 'रंगोली के पास सीढ़ियों पर',
      bn: 'আলপনার পাশে সিঁড়ির ধাপে',
    },
    x: 460,
    y: 395,
    size: 42,
  },
  {
    id: 'gift',
    name: { en: 'Royal Gift Box', hi: 'उपहार का डिब्बा', bn: 'উপহারের বাক্স' },
    emoji: '🎁',
    clue: {
      en: 'Wrapped in gold ribbons, tucked near the teak doorway.',
      hi: 'सागवान के दरवाजे के पास सुनहरे रिबन से सजा रखा है।',
      bn: 'কাঠের দরজার পাশে সোনার ফিতেয় মোড়ানো।',
    },
    locationDesc: {
      en: 'Left doorway threshold',
      hi: 'दरवाजे की चौखट के पास',
      bn: 'দরজার চৌকাঠের কোণে',
    },
    x: 235,
    y: 320,
    size: 44,
  },
  {
    id: 'sweet',
    name: { en: 'Kaju Katli Mithai', hi: 'काजू कतली', bn: 'কাজু বরফি' },
    emoji: '🍬',
    clue: {
      en: 'Diamond-shaped silver sweet resting on the brass platter.',
      hi: 'पीतल की थाली में चांदी के वर्क से चमक रही मिठाई।',
      bn: 'পিতলের থালায় রুপোলি তবকে মোড়া মিষ্টি।',
    },
    locationDesc: {
      en: 'Brass tray on verandah low table',
      hi: 'बरामदे की चौकी पर सजी थाली में',
      bn: 'বারান্দার গোল টেবিলের থালায়',
    },
    x: 620,
    y: 331,
    size: 38,
  },
  {
    id: 'marigold',
    name: { en: 'Sacred Marigold', hi: 'गेंदे का पुष्प', bn: 'গাঁদা ফুল' },
    emoji: '🌼',
    clue: {
      en: 'Golden orange bloom fallen near the entrance arch garland.',
      hi: 'तोरण की माला से छूटा सुनहरा संतरी फूल।',
      bn: 'তোরণের মালা থেকে খসে পড়া উজ্জ্বল গাঁদা ফুল।',
    },
    locationDesc: {
      en: 'Below the main door lintel',
      hi: 'तोरण के ठीक नीचे',
      bn: 'মূল তোরণের ঠিক নিচে',
    },
    x: 345,
    y: 152,
    size: 36,
  },
  {
    id: 'coin',
    name: { en: 'Lakshmi Gold Coin', hi: 'सोने का सिक्का', bn: 'সোনার মুদ্রা' },
    emoji: '🪙',
    clue: {
      en: 'Gleaming auspicious coin near the Kalash altar.',
      hi: 'कलश के पास चमकता मंगलकारी सिक्का।',
      bn: 'মঙ্গল কলসের কাছে উজ্জ্বল শুভ মুদ্রা।',
    },
    locationDesc: {
      en: 'Beside the brass temple bell',
      hi: 'पूजा वेदी के पास',
      bn: 'পূজা বেদীর পাশে',
    },
    x: 182,
    y: 312,
    size: 34,
  },
  {
    id: 'bell',
    name: { en: 'Temple Brass Bell', hi: 'पीतल की घंटी', bn: 'পিতলের ঘণ্টা' },
    emoji: '🔔',
    clue: {
      en: 'Hanging near the carved window jharokha.',
      hi: 'नक्काशीदार झरोखे के पास लटकती घंटी।',
      bn: 'অলংকৃত ঝরোখার কোণে ঝুলছে।',
    },
    locationDesc: {
      en: 'Upper verandah pillar',
      hi: 'खंभे के ऊपरी हिस्से में',
      bn: 'বারান্দার ওপরের স্তম্ভে',
    },
    x: 680,
    y: 180,
    size: 38,
  },
];

export type TreasureItem = TreasureObject;
export const TREASURE_ITEMS = TREASURE_HUNT_OBJECTS;
