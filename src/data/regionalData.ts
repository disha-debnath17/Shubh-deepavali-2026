/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TraditionItem {
  icon: string;
  title: {
    en: string;
    hi: string;
    bn: string;
  };
  why: {
    en: string;
    hi: string;
    bn: string;
  };
}

export interface CulturalSource {
  title: string;
  url: string;
  institution: string;
}

export interface RegionalEntity {
  meaning: {
    en: string;
    hi: string;
    bn: string;
  };
  howObserved: {
    en: string;
    hi: string;
    bn: string;
  };
  whenObserved: {
    en: string;
    hi: string;
    bn: string;
  };
  variations: {
    en: string;
    hi: string;
    bn: string;
  };
  source: CulturalSource;
  id: string;
  name: string;
  hi: string;
  bn: string;
  shortName: string;
  isUT: boolean;
  festivalName: {
    en: string;
    hi: string;
    bn: string;
  };
  introTagline: {
    en: string;
    hi: string;
    bn: string;
  };
  decorTradition: {
    artName: {
      en: string;
      hi: string;
      bn: string;
    };
    artDesc: {
      en: string;
      hi: string;
      bn: string;
    };
    diyaName: {
      en: string;
      hi: string;
      bn: string;
    };
    diyaDesc: {
      en: string;
      hi: string;
      bn: string;
    };
    toranDesc: {
      en: string;
      hi: string;
      bn: string;
    };
  };
  keyTraditions: TraditionItem[];
  foodSpecialty: {
    name: {
      en: string;
      hi: string;
      bn: string;
    };
    desc: {
      en: string;
      hi: string;
      bn: string;
    };
  };
  highlight: {
    en: string;
    hi: string;
    bn: string;
  };
}

// Exactly 28 States and 8 Union Territories of India
export const INDIAN_REGIONS: RegionalEntity[] = [
  // --- 28 STATES ---
  {
    id: 'west-bengal',
    name: 'West Bengal',
    shortName: 'Bengal',
    hi: 'पश्चिम बंगाल',
    bn: 'পশ্চিমবঙ্গ',
    isUT: false,
    festivalName: {
      en: 'Shubho Kali Pujo & Deepaboli',
      hi: 'शुभ काली पूजा एवं दीपावली',
      bn: 'শুভ শ্যামাপূজা ও দীপাবলি',
    },
    introTagline: {
      en: 'From the beautiful lights of Kali Pujo to the artistic beauty of Alpona, discover the traditions that make your celebration special.',
      hi: 'काली पूजा के दिव्य आलोक से लेकर अल्पना के कलात्मक सौंदर्य तक, जानिए वे पावन परंपराएं जो आपके उत्सव को सबसे अनूठा बनाती हैं।',
      bn: 'শ্যামাপূজার আলোর রোশনাই থেকে আলপনার শিল্পময় মাধুর্য—খুঁজে নিন সেই ঐতিহ্য যা আপনার উৎসবকে অনন্য করে তোলে।',
    },
    meaning: {
      "en": "Triumph of divine righteousness and conquering spiritual darkness and ego through Mother Kali, alongside honoring 14 generations of ancestors on Bhoot Chaturdashi.",
      "hi": "मां काली की दिव्य शक्ति द्वारा अधर्म और अज्ञान के अंधकार के नाश, और भूत चतुर्दशी पर १४ पीढ़ियों के पूर्वजों के पावन स्मरण का महापर्व।",
      "bn": "মা কালীর আরাধনায় অজ্ঞানের বিনাশ, অশুভ শক্তির দমন এবং ভূত চতুর্দশীতে চৌদ্দ পুরুষের আত্মিক শান্তি কামনার ঐতিহ্য।"
},
    howObserved: {
      "en": "14 earthen lamps (Choddo Prodip) are lit on Bhoot Chaturdashi and 14 seasonal greens (Choddo Shaak) are prepared. On Amavasya night, Shyama Puja (Kali Puja) is observed at midnight with hibiscus flowers, khichuri bhog, and Shyama Sangeet hymns. Rice-paste Alpona decorates thresholds.",
      "hi": "भूत चतुर्दशी पर १४ मिट्टी के दीये जलाए जाते हैं और १४ मौसमी शाक बनाए जाते हैं। अमावस्या की रात मध्यरात्रि में मां काली की पूजा होती है और आंगन में चावल की अल्पना सजाई जाती है।",
      "bn": "ভূত চতুর্দশীর সন্ধ্যায় ১৪টি মাটির প্রদীপ প্রজ্বলন ও ১৪ শাক রান্না হয়। অমাবস্যার নিশীথে জবা ফুল ও শ্যামাসঙ্গীতে মা কালীর পূজা অনুষ্ঠিত হয় এবং গৃহদ্বারে আঁকা হয় চালের গুঁড়োর আলপনা।"
},
    whenObserved: {
      "en": "Bhoot Chaturdashi on Kartik Krishna Chaturdashi; Kali Puja on Kartik Amavasya midnight. (Note: Kojagori Lakshmi Puja is observed earlier on Ashwin Purnima; Bhai Phonta is observed two days after Diwali on Kartik Shukla Dwitiya).",
      "hi": "कार्तिक कृष्ण चतुर्दशी (भूत चतुर्दशी) एवं कार्तिक अमावस्या की मध्यरात्रि (काली पूजा)। कोजागरी लक्ष्मी पूजा आश्विन पूर्णिमा पर पहले ही हो जाती है, और भाई फोटा बाद में शुक्ल द्वितीया पर आता है।",
      "bn": "কার্তিক কৃষ্ণ চতুর্দশীতে ভূত চতুর্দশী এবং কার্তিক অমাবস্যার নিশীথে শ্যামাপূজা। (কোজাগরী লক্ষ্মীপূজা পূর্ববর্তী আশ্বিন পূর্ণিমায় এবং ভাইফোঁটা দীপাবলি-পরবর্তী শুক্ল দ্বিতীয়া তিথিতে পালিত হয়)।"
},
    variations: {
      "en": "Community pandals and Kali temples celebrate across Kolkata and urban centers; Vaishnava families light Deepaboli lamps for Radha-Krishna; rural Bengal features locally sculpted clay Shyama murtis adorned with traditional sholapith craft.",
      "hi": "शहरी क्षेत्रों में भव्य काली पूजा पंडाल और निशा पूजा होती है, जबकि वैष्णव परिवार राधा-कृष्ण हेतु दीप जलाते हैं। ग्रामीण अंचलों में स्थानीय कुम्हारों द्वारा मिट्टी की प्रतिमाओं की पूजा होती है।",
      "bn": "কলকাতা ও শহরাঞ্চলে বর্ণাঢ্য শ্যামাপূজা মণ্ডপ হয়, বৈষ্ণব পরিবারে রাধা-কৃষ্ণের প্রদীপ জ্বলে, আর গ্রামীণ বাংলায় নিজস্ব লোকরীতিতে মৃন্ময়ী প্রতিমার পূজা হয়।"
},
    source: {
      "title": "West Bengal Tourism Official Portal",
      "url": "https://wbtourism.gov.in",
      "institution": "Department of Tourism, Government of West Bengal"
},
    decorTradition: {
      artName: { en: 'Alpona (আলপনা)', hi: 'अल्पना (चावल की कला)', bn: 'পবিত্র আলপনা' },
      artDesc: {
        en: 'Sacred white rice-paste patterns of lotus and feet welcoming Goddess Lakshmi & Kali.',
        hi: 'चावल के घोल से बनी सुंदर अल्पना जो मां लक्ष्मी व काली के चरणों का स्वागत करती है।',
        bn: 'চালগুঁড়োর নিখুঁত আলপনায় মা লক্ষ্মী ও মায়ের শ্রীচরণের আগমন বার্তা।',
      },
      diyaName: { en: 'Choddo Prodip (চোদ্দ প্রদীপ)', hi: 'चौदह दीप (१४ दीये)', bn: 'চোদ্দ প্রদীপ' },
      diyaDesc: {
        en: 'According to traditional belief, 14 earthen diyas are lit on Bhoot Chaturdashi to remember ancestors and banish shadows.',
        hi: 'पारंपरिक लोक विश्वास के अनुसार, भूत चतुर्दशी पर पूर्वजों के स्मरण और अंधकार दूर करने हेतु १४ माटी के दीये जलाए जाते हैं।',
        bn: 'চিরায়ত বিশ্বাস অনুসারে, ভূত চতুর্দশীর সন্ধ্যায় চৌদ্দ পুরুষের স্মরণে ও আঁধার দূর করতে ১৪টি মাটির প্রদীপ প্রজ্বলন করা হয়।',
      },
      toranDesc: {
        en: 'Mango leaves & marigold garlands blessed with conch shells.',
        hi: 'आम के पल्लव और गेंदे के फूलों का मंगल तोरण, शंख ध्वनि के साथ।',
        bn: 'আমপাতা ও গাঁদা ফুলের শুভ তোরণ, সঙ্গে শাঁখের পবিত্র ধ্বনি।',
      },
    },
    keyTraditions: [
      {
        icon: '🪔',
        title: {
          en: 'Bhoot Chaturdashi & 14 Lamps',
          hi: 'भूत चतुर्दशी और १४ दीपक',
          bn: 'ভূত চতুর্দশী ও চোদ্দ প্রদীপ',
        },
        why: {
          en: 'Celebrated on the 14th day of the dark fortnight. According to traditional belief, fourteen lamps are lit around the home to dispel negativity and reverently honor fourteen generations of ancestors.',
          hi: 'कार्तिक कृष्ण चतुर्दशी की रात घर के १४ कोनों में पारंपरिक विश्वास के अनुसार दीपक जलाए जाते हैं ताकि नकारात्मकता दूर हो और पूर्वजों की स्मृति का वंदन हो।',
          bn: 'চিরায়ত বিশ্বাস অনুসারে, কার্তিক কৃষ্ণ চতুর্দশীর রাতে বাড়ির চতুর্দিকে ১৪টি মাটির প্রদীপ জ্বালিয়ে অশুভ শক্তি দূর করা হয় এবং চৌদ্দ পুরুষের স্মৃতির উদ্দেশে আলোকপ্রার্থনা করা হয়।',
        },
      },
      {
        icon: '🌿',
        title: {
          en: 'Choddo Shaak (14 Greens)',
          hi: 'चौदह शाक का सेवन',
          bn: 'চৌদ্দ শাক ভক্ষণ',
        },
        why: {
          en: 'Cooking and eating fourteen seasonal leafy greens to mark the late-autumn (Hemanta) agrarian transition, honoring regional nature’s seasonal bounty and culinary heritage as winter approaches.',
          hi: 'ऋतु परिवर्तन के समय प्रकृति के उपहारों के प्रति सम्मान और मौसमी बदलाव के सांस्कृतिक स्वागत हेतु १४ प्रकार के पारंपरिक शाक का सेवन किया जाता है।',
          bn: 'হেমন্তের সন্ধিক্ষণে ঋতু পরিবর্তনের আগমন বার্তা ও প্রকৃতির মরশুমি উপহারকে সম্মান জানাতে চৌদ্দ রকমের শাক রান্না করে খাওয়ার চিরায়ত লোকঐতিহ্য।',
        },
      },
      {
        icon: '🌺',
        title: {
          en: 'Midnight Kali Puja & Shyama Sangeet',
          hi: 'मध्यरात्रि महाकाली पूजन व श्यामा संगीत',
          bn: 'নিশিরাতে শ্যামাপূজা ও শ্যামাসঙ্গীত',
        },
        why: {
          en: 'Worshipping Mother Kali on Amavasya midnight to triumph over ego, injustice, and fears with devotion and soulful hymns. Many Bengali households observe Kali Puja on this new moon night, while Kojagori Lakshmi Puja is traditionally observed separately on the preceding Ashwin Purnima.',
          hi: 'अमावस्या की पावन निशा में मां काली की उपासना अहंकार और भय पर विजय प्राप्त करने के लिए की जाती है। बंगाल में कई घरों में अमावस्या पर मां काली की पूजा होती है, जबकि कोजागरी लक्ष्मी पूजा आश्विन पूर्णिमा पर पहले ही संपन्न हो जाती है।',
          bn: 'অমাবস্যার মহানিশায় অসুরবিনাশিনী মা শ্যামার আরাধনা এবং ভক্তিমূলক শ্যামাসঙ্গীত। বাংলায় অমাবস্যায় শ্যামাপূজা অনুষ্ঠিত হয়, আর কোজাগরী লক্ষ্মীপূজা ঐতিহ্যগতভাবে পূর্ববর্তী পূর্ণিমায় পৃথকভাবে উদযাপিত হয়।',
        },
      },
      {
        icon: '🎨',
        title: {
          en: 'Traditional Alpona Art',
          hi: 'पारंपरिक अल्पना कला',
          bn: 'হস্তশিল্পের অপরূপ আলপনা',
        },
        why: {
          en: 'Hand-drawn motifs with natural rice paste to sanctify the threshold and invite Lakshmi-Narayan blessings.',
          hi: 'घर के मुख्य द्वार और आंगन को पवित्र करने और माता लक्ष्मी के आगमन के लिए चावल के लेप से अल्पना बनाई जाती है।',
          bn: 'ভিজে আতপ চাল বেটে আঙুল দিয়ে গৃহদ্বারে নান্দনিক আলপনা আঁকা গৃহের শ্রী ও মাঙ্গলিকতার প্রতীক।',
        },
      },
      {
        icon: '❤️',
        title: {
          en: 'Bhai Phonta (Related Post-Diwali Celebration)',
          hi: 'भाई फोटा (दिवाली उपरांत पावन पर्व)',
          bn: 'ভাইফোঁটা (দীপাবলি-পরবর্তী আত্মীয় উৎসব)',
        },
        why: {
          en: 'A related post-Diwali celebration observed on Shukla Dwitiya, where sisters apply a sacred sandalwood and kajal tilak to brothers’ foreheads wishing them immortality, health, and protection.',
          hi: 'दिवाली के उपरांत (शुक्ल द्वितीया पर) मनाया जाने वाला एक संबंधित पारिवारिक उत्सव, जिसमें बहनें भाइयों के माथे पर चंदन व काजल का तिलक लगाकर उनकी दीर्घायु और रक्षा की प्रार्थना करती हैं।',
          bn: 'দীপাবলি-পরবর্তী (শুক্ল দ্বিতীয়া তিথিতে) উদযাপিত এক আত্মীয় উৎসব, যেখানে বোনেরা ভাইদের কপালে চন্দন ও কাজলের ফোঁটা দিয়ে দীর্ঘায়ু ও সর্বাঙ্গীণ কল্যাণের প্রার্থনা করেন।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Mishti Mukh: Sandesh, Rosogolla & Kacha Golla',
        hi: 'मिष्टी मुख: संदेश, रसगुल्ला व कच्चा गोल्ला',
        bn: 'মিষ্টি মুখ: নলেন গুড়ের সন্দেশ ও রসগোল্লা',
      },
      desc: {
        en: 'Fresh soft chhena sweets crafted with fragrant cardamom and nolen gur.',
        hi: 'ताजे छेने और इलायची की खुशबू से बनी पारंपरिक बंगाली मिठाइयां।',
        bn: 'টাটকা ছানার সুস্বাদু সন্দেশ এবং রসে টইটম্বুর মিষ্টিতে উৎসবের আনন্দ।',
      },
    },
    highlight: {
      en: 'Fourteen earthen diyas on Bhoot Chaturdashi, midnight Kali Puja on Amavasya (Kojagori Lakshmi Puja observed separately), and Bhai Phonta.',
      hi: 'भूत चतुर्दशी के चौदह दीप, अमावस्या पर काली पूजा (कोजागरी लक्ष्मी पूजा अलग पूर्णिमा पर) और स्नेहिल भाई फोटा।',
      bn: 'ভূত চতুর্দশীর চোদ্দ প্রদীপ, অমাবস্যার শ্যামাপূজা (কোজাগরী লক্ষ্মীপূজা পৃথক পূর্ণিমায়) ও ভাইফোঁটা।',
    },
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    shortName: 'Karnataka',
    hi: 'कर्नाटक',
    bn: 'কর্ণাটক',
    isUT: false,
    festivalName: {
      en: 'Deepavali & Bali Padyami',
      hi: 'दीपावली एवं बलि पाड्यमी',
      bn: 'দীপাবলি ও বলি পাদ্যমী',
    },
    introTagline: {
      en: 'From the fragrant morning oil baths to the sacred reverence of King Bali, discover the traditions that illuminate Karnataka homes.',
      hi: 'सुगंधित प्रभात तेल स्नान से लेकर राजा बलि के आदर सत्कार तक, जानिए कर्नाटक के घरों को महकाने वाली पावन परंपराएं।',
      bn: 'ভোরের সুগন্ধি তৈল স্নান থেকে রাজা বলির পুণ্য স্মৃতি—আলোকিত কর্ণাটকের চিরায়ত উৎসবের রূপ।',
    },
    meaning: {
      "en": "Celebrates the victory of Dharma on Naraka Chaturdashi and honors the annual return of the benevolent King Bali on Bali Padyami with gratitude for harvest and cattle.",
      "hi": "नरक चतुर्दशी पर धर्म की विजय और बलि पाड्यमी पर दानवीर राजा बलि के वार्षिक आगमन का सत्कार।",
      "bn": "নরক চতুর্দশীতে অধর্মের বিনাশ এবং বলি পাদ্যমীতে দানশীল রাজা বলির আগমণী স্মরণে কৃতজ্ঞতা নিবেদন।"
},
    howObserved: {
      "en": "Pre-dawn sesame oil bath (Enne Mejjana) and lighting lamps around the Tulsi Katte on Naraka Chaturdashi. On Bali Padyami, families build cow dung Bali Peethas decorated with marigolds, perform Gow Puja, and enjoy Holige/Obbattu.",
      "hi": "नरक चतुर्दशी की भोर में तिल के तेल से अभ्यंग स्नान (एन्ने मेज्जन) और तुलसी कट्टे पर दीप प्रज्वलन। बलि पाड्यमी पर गाय के गोबर से बलि पीठ सजाकर गो-पूजा की जाती है और होलिगे का भोग लगता है।",
      "bn": "নরক চতুর্দশীর ভোরে তিলের তেলের স্নান এবং তুলসীতলায় প্রদীপ প্রজ্বলন। বলি পাদ্যমীতে গো-মাতা ও বলি রাজার পুজো করে সুস্বাদু হোলিগে পরিবেশন করা হয়।"
},
    whenObserved: {
      "en": "Observed over three days from Ashwija Krishna Chaturdashi through Amavasya to Kartika Shukla Pratipada (Bali Padyami).",
      "hi": "आश्विन कृष्ण चतुर्दशी से कार्तिक शुक्ल प्रतिपदा (बलि पाड्यमी) तक तीन दिवसीय उत्सव।",
      "bn": "আশ্বিন কৃষ্ণ চতুর্দশী থেকে কার্তিক শুক্ল প্রতিপদা (বলি পাদ্যমী) পর্যন্ত তিন দিনব্যাপী উদযাপিত।"
},
    variations: {
      "en": "Coastal Karnataka (Tulunadu) celebrates King Bali with tender coconut offerings; North Karnataka farmers decorate cattle with vibrant paints and bells (Hatti Habba); Bangalore urban families observe both Deepavali and Bali Padyami.",
      "hi": "तटीय कर्नाटक (तुलुनाडु) में राजा बलि का विशेष सत्कार होता है; उत्तरी कर्नाटक में गाय-बैलों को सजाकर हट्टी हब्बा मनाया जाता है।",
      "bn": "উপকূলীয় তুলুনাডুতে ডাব ও ফল দিয়ে বলি রাজার অর্চনা হয়, উত্তর কর্ণাটকে হুট্টি হাব্বায় গবাদি পশুদের অলংকৃত করা হয়।"
},
    source: {
      "title": "Department of Tourism, Government of Karnataka",
      "url": "https://karnatakatourism.org",
      "institution": "Karnataka Tourism Board"
},
    decorTradition: {
      artName: { en: 'Rangoli & Floral Kolam', hi: 'रंगोली एवं पुष्प कोलम', bn: 'রঙ্গোলি ও ফুলের আলপনা' },
      artDesc: {
        en: 'Vibrant geometric patterns framed with fresh marigold and mango leaves.',
        hi: 'गेंदे के फूलों और आम के पत्तों से सजी रंग-बिरंगी ज्यामितीय रंगोली।',
        bn: 'গাঁদা ফুল ও আমপাতায় সাজানো রঙিন জ্যামিতিক নকশা।',
      },
      diyaName: { en: 'Aagal & Brass Kuthuvilakku', hi: 'पीतल के कुथुविलक्कु व मिट्टी के दीप', bn: 'পিতলের প্রদীপ ও মাটির দ্বীপ' },
      diyaDesc: {
        en: 'Tall brass oil lamps burning with sesame oil and fragrant camphor.',
        hi: 'तिल के तेल और कपूर की खुशबू से जगमगाते पारंपरिक पीतल के दीप।',
        bn: 'তিলের তেল আর কর্পূরের স্নিগ্ধ সুবাসে প্রজ্জ্বলিত পিতলের দীপ।',
      },
      toranDesc: {
        en: 'Fresh mango leaf toran (Mavina Ele Thorana) hung on the threshold.',
        hi: 'चौखट पर सजा आम के पत्तों का पारंपरिक तोरण (माविना एले तोरण)।',
        bn: 'দরজার মাথায় ঝোলানো ঐতিহ্যবাহী আমপাতার তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '🧴',
        title: {
          en: 'Enne Mejjana (Dawn Herbal Oil Bath)',
          hi: 'एण्णे मेज्जन (प्रभात औषधीय तेल स्नान)',
          bn: 'এন্নে মেজ্জনা (ভোরের ভেষজ স্নান)',
        },
        why: {
          en: 'Observed on Naraka Chaturdashi before sunrise. Applying sesame oil infused with herbs cleanses the body and purifies the mind from ego.',
          hi: 'सूर्योदय पूर्व औषधीय तिल के तेल से स्नान किया जाता है जो अहंकार के नाश और नई ऊर्जा का संचार करता है।',
          bn: 'নরক চতুর্দশীর ভোরে সূর্য ওঠার আগে ভেষজ তিলের তেল মেখে স্নান—অহংকার মুক্তি ও নবচেতনার প্রতীক।',
        },
      },
      {
        icon: '👑',
        title: {
          en: 'Bali Padyami & King Mahabali Puja',
          hi: 'बलि पाड्यमी एवं राजा बलि पूजन',
          bn: 'বলি পাদ্যমী ও রাজা বলির পূজা',
        },
        why: {
          en: 'Honoring the righteous King Mahabali who visits Earth on this day. Families build miniature clay/dough forts and light lamps in welcome.',
          hi: 'न्यायप्रिय राजा बलि के धरती पर आगमन का स्वागत करने के लिए मिट्टी के छोटे किले और दीप प्रज्वलित किए जाते हैं।',
          bn: 'ধার্মিক রাজা বলির মর্তে আগমন উপলক্ষে গৃহে ছোট কেল্লা বানিয়ে প্রদীপ জ্বেলে স্বাগত জানানো হয়।',
        },
      },
      {
        icon: '🐄',
        title: {
          en: 'Gau Puja (Cattle Reverence)',
          hi: 'गो पूजा (गौ माता का वंदन)',
          bn: 'গো পূজা (গোমাতার অর্চনা)',
        },
        why: {
          en: 'Cows are bathed, adorned with kumkum and floral garlands, and fed sweet rice to express gratitude to farm cattle.',
          hi: 'गायों को नहलाकर कुमकुम और फूलों से सजाया जाता है और मीठे चावल खिलाकर कृतज्ञता व्यक्त की जाती है।',
          bn: 'গরুদের স্নান করিয়ে চন্দন-সিঁদুরে সাজিয়ে পায়েস খাইয়ে কৃতজ্ঞতা জানানোর মধুর প্রথা।',
        },
      },
      {
        icon: '🥮',
        title: {
          en: 'Holige & Mysore Pak Feasting',
          hi: 'होलीगे एवं मैसूर पाक का भोग',
          bn: 'হোলিগে ও মহীশূর পাক মিষ্টান্ন',
        },
        why: {
          en: 'Sharing traditional sweet lentil-stuffed flatbreads (Obbattu/Holige) and rich melt-in-the-mouth gram flour Mysore Pak.',
          hi: 'दाल और गुड़ से भरी स्वादिष्ट होलीगे (ओब्बट्टू) और शुद्ध घी के मैसूर पाक से उत्सव का आनंद लिया जाता है।',
          bn: 'ডাল ও গুড়ের পুরভরা গরম হোলিগে এবং খাঁটি ঘিয়ে তৈরি জিভে জল আনা মহীশূর পাক।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Sweet Holige (Obbattu) & Mysore Pak',
        hi: 'स्वादिष्ट होलीगे व मैसूर पाक',
        bn: 'সুস্বাদু হোলিগে ও মহীশূর পাক',
      },
      desc: {
        en: 'Thin handmade lentil-jaggery flatbread with pure cow ghee and fragrant cardamom.',
        hi: 'चने की दाल, इलायची और गुड़ से भरी पतली रोटियां, शुद्ध देसी घी के साथ।',
        bn: 'ঘিয়ে ভাজা নরম মিষ্টি হোলিগে এবং মুখরোচক কর্ণাটকী পদ।',
      },
    },
    highlight: {
      en: 'Enne Mejjana (herbal oil bath), cow worship, and Holige sweets.',
      hi: 'औषधीय तेल स्नान, बलि पूजा और स्वादिष्ट होलीगे की मिठास।',
      bn: 'ভেষজ তেল স্নান, বলি পূজা এবং সুস্বাদু হোলিগের মিষ্টতা।',
    },
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    shortName: 'Maharashtra',
    hi: 'महाराष्ट्र',
    bn: 'মহারাষ্ট্র',
    isUT: false,
    festivalName: {
      en: 'Diwali Pahat, Faral & Diwali Padwa',
      hi: 'दिवाळी पहाट, फराळ आणि पाडवा',
      bn: 'দিওয়ালি পাহত, ফারাল ও পাডওয়া',
    },
    introTagline: {
      en: 'From early morning musical Diwali Pahats to the crisp delights of Faral and children building clay forts, feel the pulse of Maharashtra.',
      hi: 'भोर की संगीतमयी दिवाळी पहाट से लेकर कुरकुरे फराळ और मिट्टी के किलों तक, महसूस कीजिए महाराष्ट्र का दीपोत्सव।',
      bn: 'ভোরের শাস্ত্রীয় সংগীতের সুর, খাস্তা ফারালের স্বাদ আর শিশুদের মাটির কেল্লা—মহারাষ্ট্রের প্রাণের উৎসব।',
    },
    meaning: {
      "en": "Welcoming the auspicious dawn of the festival with classical music (Diwali Pahat), family togetherness, cattle reverence on Vasubaras, and spouse affection on Padwa.",
      "hi": "शास्त्रीय संगीत की सुरमयी भोर से नए दिन का स्वागत, पारिवारिक स्नेह, गोवत्स द्वादशी पर गो-सेवा और पाडवा पर दांपत्य प्रेम का वंदन।",
      "bn": "ভোরের শাস্ত্রীয় সুরে নবপ্রভাতের বন্দনা, পারিবারিক সংহতি, গো-মাতার শ্রদ্ধা এবং দাম্পত্য প্রেমের মঙ্গল উদযাপন।"
},
    howObserved: {
      "en": "Starts with Vasubaras (worshipping cow and calf). On Naraka Chaturdashi, families wake before dawn for Abhyanga Snan with fragrant Utane, attend dawn musical concerts (Diwali Pahat), and enjoy Faral. Children build mud Shivaji forts (Kille). Lakshmi Pujan and Padwa follow.",
      "hi": "वसुबारस से आरंभ होकर नरक चतुर्दशी पर भोर में सुगंधित उटणे से अभ्यंग स्नान, पहाट संगीत सभाएं और स्वादिष्ट फराळ का आनंद। बच्चे छत्रपति शिवाजी महाराज के मिट्टी के किले बनाते हैं।",
      "bn": "বসুবারস দিয়ে শুরু। নরক চতুর্দশীর ভোরে সুগন্ধি উটনে দিয়ে স্নান, পাহাত সঙ্গীত সম্মেলন এবং ফরাল খাওয়া। শিশুরা মাটির ঐতিহাসিক দুর্গ গড়ে তোলে।"
},
    whenObserved: {
      "en": "Five-day festive cycle from Govatsa Dwadashi (Vasubaras) through Dhanatrayodashi, Naraka Chaturdashi, Lakshmi Pujan (Amavasya) to Balipratipada and Bhau Beej.",
      "hi": "गोवत्स द्वादशी (वसुबारस), धनतेरस, नरक चतुर्दशी, लक्ष्मी पूजन (अमावस्या) से लेकर बलिप्रतिपदा (पाडवा) और भाऊबीज तक।",
      "bn": "গোবৎস দ্বাদশী থেকে শুরু করে ধনতেরাস, নরক চতুর্দশী, লক্ষ্মীপূজন (অমাবস্যা) ও ভাইফোঁটা পর্যন্ত পাঁচদিন ব্যাপী।"
},
    variations: {
      "en": "Pune and Mumbai host open-air dawn classical music concerts (Diwali Pahat); the Konkan belt emphasizes coconut and rice flours in sweets; Vidarbha and Marathwada agrarian households hold grand cattle worship on Vasubaras.",
      "hi": "पुणे व मुंबई में भव्य प्रातःकालीन संगीत सभाएं आयोजित होती हैं; कोंकण में नारियल व पोहे के व्यंजन बनते हैं; विदर्भ में गो-पूजन को विशेष महत्व दिया जाता है।",
      "bn": "পুনে ও মুম্বাইয়ে উন্মুক্ত প্রাঙ্গণে ভোরের মার্গসঙ্গীতের মেলা বসে; কোঙ্কণ অঞ্চলে নারকেলের তৈরি বিশেষ পদ হয়; বিদর্ভে কৃষিভিত্তিক ঐতিহ্য প্রধান।"
},
    source: {
      "title": "Maharashtra Tourism Development Corporation (MTDC)",
      "url": "https://maharashtratourism.gov.in",
      "institution": "Directorate of Tourism, Government of Maharashtra"
},
    decorTradition: {
      artName: { en: 'Sanskhar Bharati Rangoli', hi: 'संस्कार भारती रंगोली', bn: 'সংস্কার ভারতী আলপনা' },
      artDesc: {
        en: 'Grand circular patterns filled with vibrant powders and glowing terracotta diyas.',
        hi: 'उंगलियों से उकेरी गई विशाल गोलाकार रंगोली और जगमगाते मिट्टी के दीप।',
        bn: 'হাতের নিপুণ ছোঁয়ায় আঁকা বিশাল বৃত্তাকার রঙিন নকশা ও প্রদীপ।',
      },
      diyaName: { en: 'Samai & Terracotta Panati', hi: 'समाई एवं मिट्टी की पणती', bn: 'পিতলের সামাই ও মাটির পনতি' },
      diyaDesc: {
        en: 'Tall multi-wick brass Samai standing by the door with rows of clay Panatis.',
        hi: 'मुख्य द्वार पर रखी पीतल की लंबी समाई और सीढ़ियों पर सजी पणतियां।',
        bn: 'দ্বারে রাখা ঐতিহ্যবাহী পিতলের সামাই ও মাটির পনতির স্নিগ্ধ আলো।',
      },
      toranDesc: {
        en: 'Bright yellow marigold torans with fragrant mango leaves.',
        hi: 'पीले और नारंगी गेंदे के फूलों और आम के पत्तों का सुंदर तोरण।',
        bn: 'সোনালী গাঁদা ফুল আর আমপাতার মনোরম তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '🎶',
        title: {
          en: 'Diwali Pahat (Dawn Music Concerts)',
          hi: 'दिवाळी पहाट (भोर के शास्त्रीय संगीत जलसे)',
          bn: 'দিওয়ালি পাহত (ভোরের সংগীত আসর)',
        },
        why: {
          en: 'Communities gather before dawn dressed in traditional attire to listen to Indian classical ragas, welcoming the festive dawn with divine melody.',
          hi: 'लोग नए वस्त्र पहनकर सूर्योदय पूर्व खुले मैदानों और सभागारों में शास्त्रीय संगीत सुनकर पर्व का स्वागत करते हैं।',
          bn: 'ভোরে উঠে নতুন পোশাকে ভারতীয় শাস্ত্রীয় সঙ্গীতের স্নিগ্ধ রাগে উৎসবের দিন শুরু করা।',
        },
      },
      {
        icon: '🛁',
        title: {
          en: 'Abhyanga Snan with Utane Paste',
          hi: 'अभ्यंग स्नान एवं उटणे',
          bn: 'অভ্যঙ্গ স্নান ও উটনে লেপন',
        },
        why: {
          en: 'Bathing before sunrise after applying fragrant sandalwood and herbal ubtan paste, crushing a small bitter karit fruit underfoot to crush ego.',
          hi: 'सुगंधित उटणे का लेप लगाकर भोर में स्नान किया जाता है और कड़वे कारिट फल को पैर से कुचलकर बुराई का अंत माना जाता है।',
          bn: 'সুগন্ধি ভেষজ উটনে মেখে ভোরে স্নান এবং কারিট ফল ভেঙে অশুভ শক্তির বিনাশের প্রতীকী প্রকাশ।',
        },
      },
      {
        icon: '🏰',
        title: {
          en: 'Clay Forts (Kille) by Children',
          hi: 'बच्चों द्वारा मिट्टी के किलों का निर्माण',
          bn: 'শিশুদের মাটির কেল্লা নির্মাণ',
        },
        why: {
          en: 'Children across Maharashtra proudly build miniature mud replicas of Chhatrapati Shivaji Maharaj’s historic hill forts decorated with mustard sprouts.',
          hi: 'बच्चे छत्रपति शिवाजी महाराज की वीरता के सम्मान में घर के बाहर मिट्टी के सुंदर किले बनाकर सरसों उगाते हैं।',
          bn: 'ছত্রপতি শিবাজী মহারাজের বীরত্বগাথা স্মরণে শিশুরা বাড়ির সামনে সুন্দর মাটির কেল্লা বানায়।',
        },
      },
      {
        icon: '🍪',
        title: {
          en: 'Festive Faral Platter',
          hi: 'स्वादिष्ट दीपोत्सवी फराळ',
          bn: 'ঐতিহ্যবাহী ফারাল মিষ্টান্ন',
        },
        why: {
          en: 'Sharing home-cooked savory and sweet assortments of Chakli, Karanji, Shankarpali, Poha Chivda, and Besan Laddoo with visiting neighbors.',
          hi: 'चकली, करंजी, शंकरपाळी, पोहा चिवड़ा और बेसन के लड्डू से सजी थाली पड़ोसियों और मित्रों में बांटी जाती है।',
          bn: 'খাস্তা চাকলি, মিষ্টি করঞ্জি, শঙ্করপালি ও লাড্ডু ভর্তি সুস্বাদু ফারালের আতিথেয়তা।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Maharashtrian Faral: Chakli & Karanji',
        hi: 'महाराष्ट्रीयन फराळ: चकली व करंजी',
        bn: 'মহারাষ্ট্রের ফারাল: চাকলি ও করঞ্জি',
      },
      desc: {
        en: 'Crispy spiced rice spirals (Chakli) and sweet coconut-poppy seed stuffed pastries (Karanji).',
        hi: 'कुरकुरी चकली और सूखे मेवे व नारियल से भरी मीठी करंजी।',
        bn: 'মুচমুচে চাকলি ও মিষ্টি নারকেলের পুরভরা করঞ্জির অতুলনীয় স্বাদ।',
      },
    },
    highlight: {
      en: 'Dawn musical concerts, crispy chakli faral, and clay Shivaji forts.',
      hi: 'सुबह की दिवाळी पहाट, स्वादिष्ट फराळ और बच्चों के मिट्टी के किले।',
      bn: 'ভোরের শাস্ত্রীয় সংগীত, সুস্বাদু ফারাল ও শিশুদের মাটির কেল্লা।',
    },
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    shortName: 'Gujarat',
    hi: 'गुजरात',
    bn: 'গুজরাট',
    isUT: false,
    festivalName: {
      en: 'Chopda Pujan & Bestu Varas (New Year)',
      hi: 'चोपड़ा पूजन एवं बेस्तू वरस (नूतन वर्ष)',
      bn: 'চোপড়া পূজন ও বেস্তু বরস (নতুন বছর)',
    },
    introTagline: {
      en: 'From the sacred ink of Chopda Pujan to the joy of Saal Mubarak on Bestu Varas, celebrate the sweetness of Gujarati traditions.',
      hi: 'चोपड़ा पूजन की पावन स्याही से लेकर बेस्तू वरस पर साल मुबारक के स्नेह तक, अनुभव करें गुजरात की उल्लासमय परंपराएं।',
      bn: 'চোপড়া পূজনের পবিত্র খাতা থেকে বেস্তু বরসে সাল মুবারক শুভেচ্ছা—গুজরাটের সমৃদ্ধ ঐতিহ্যের আনন্দ।',
    },
    meaning: {
      "en": "Expressing gratitude for past prosperity, consecrating financial and moral ledgers with truth, and welcoming the Gujarati New Year (Bestu Varas) with mutual forgiveness and good wishes.",
      "hi": "बीते वर्ष की समृद्धि के प्रति कृतज्ञता, बही-खातों का शुभ आरंभ और नए साल (बेस्तु वरस) पर स्नेह और क्षमा के साथ मंगलकामना।",
      "bn": "ব্যবসায় সততা ও কৃতজ্ঞতা প্রকাশ, হিসাবের খাতার পবিত্র সূচনা এবং নববর্ষে (বেস্তু বরস) প্রীতি ও সৌহার্দ্যের বিস্তার।"
},
    howObserved: {
      "en": "On Diwali evening (Aso Vad Amas), merchants and families conduct Chopda Pujan, drawing auspicious Swastik and writing Shubh-Labh on ledger books. The next day is Bestu Varas (New Year), marked by touching elders’ feet, greeting \"Saal Mubarak\", drawing vibrant floor Rangolis, and enjoying Ghari and Mathiya.",
      "hi": "दिवाली की शाम बही-खातों पर कुमकुम से स्वास्तिक बनाकर चोपड़ा पूजन किया जाता है। अगले दिन नूतन वर्ष (बेस्तु वरस) पर बड़ों के चरण छूकर \"साल मुबारक\" कहा जाता है।",
      "bn": "দীপাবলির সন্ধ্যায় খাতার ওপর স্বস্তিক ও শুভ-লাভ লিখে চোপড়া পূজন হয়। পরদিন বেস্তু বরসে বড়দের প্রণাম জানিয়ে \"সাল মুবারক\" শুভেচ্ছা বিনিময় হয়।"
},
    whenObserved: {
      "en": "Diwali on Aso Vad Amas (Kartik Amavasya); Gujarati New Year (Bestu Varas / Saal Mubarak) on the following day (Kartik Sud Ekam).",
      "hi": "आश्विन अमावस्या (दिवाली) और अगले दिन कार्तिक शुक्ल एकम (नूतन वर्ष / बेस्तु वरस)।",
      "bn": "আশ্বিন অমাবস্যায় দীপাবলি এবং পরের দিন কার্তিক শুক্ল প্রতিপদায় গুজরাটি নববর্ষ (বেস্তু বরস)।"
},
    variations: {
      "en": "Commercial and trading centers in Ahmedabad and Surat host elaborate community Chopda Pujan; Saurashtra temples (Somnath, Dwarka) observe grand Annakut offering 56 delicacies to the Lord; rural tribal districts in Dangs celebrate with harvest songs.",
      "hi": "अहमदाबाद व सूरत के व्यापारी भव्य चोपड़ा पूजन करते हैं; सौराष्ट्र के मंदिरों में ५६ भोग का अन्नकूट सजता है; डांग जिले में पारंपरिक लोक नृत्य होते हैं।",
      "bn": "আহমেদাবাদ ও সুরাটের বাণিজ্যকেন্দ্রে মহা ধুমধামে চোপড়া পূজা হয়; সৌরাষ্ট্রের মন্দিরে ছাপ্পান্ন ভোগের অন্নকূট অনুষ্ঠিত হয়।"
},
    source: {
      "title": "Gujarat Tourism Official Portal",
      "url": "https://www.gujarattourism.com",
      "institution": "Tourism Corporation of Gujarat Limited"
},
    decorTradition: {
      artName: { en: 'Sathiya & Colorful Rangoli', hi: 'साथिया (स्वास्तिक) व रंगोली', bn: 'সাথিয়া ও রঙিন রঙ্গোলি' },
      artDesc: {
        en: 'Bright vermilion Swastikas (Sathiya) and auspicious floral threshold patterns.',
        hi: 'कुमकुम से बने शुभ स्वास्तिक और आंगन में सजी रंग-बिरंगी रंगोली।',
        bn: 'দরজায় লাল সিঁদুরের সাথিয়া (স্বস্তিক) ও উঠোনে উজ্জ্বল রঙের আলপনা।',
      },
      diyaName: { en: 'Kodialo Clay Diyas', hi: 'कोडिया दीये', bn: 'মাটির কোদিয়া প্রদীপ' },
      diyaDesc: {
        en: 'Traditional raw clay Kodiyun filled with pure ghee and glowing cotton wicks.',
        hi: 'शुद्ध घी और रुई की बत्ती से जगमगाते पारंपरिक माटी के कोडिया दीप।',
        bn: 'ঘিয়ে ভরা মাটির ছোট প্রদীপে প্রজ্বলিত স্নিগ্ধ আলোর মালা।',
      },
      toranDesc: {
        en: 'Embroidered Gujarati beadwork torans with mirror work & mango leaves.',
        hi: 'कच्छी कढ़ाई, शीशों और आम के पत्तों से सुसज्जित शाही तोरण।',
        bn: 'গুজরাটি এমব্রয়ডারি, আয়না আর আমপাতার রাজকীয় তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '📖',
        title: {
          en: 'Chopda Pujan (Account Book Blessing)',
          hi: 'चोपड़ा पूजन (बही-खाता पूजन)',
          bn: 'চোপড়া পূজন (খাতাপূজা)',
        },
        why: {
          en: 'Merchants and households bless their red account ledgers with kumkum swastikas, turmeric, and prayers to Goddess Lakshmi and Saraswati for righteous prosperity.',
          hi: 'व्यापारी और परिवार अपने बही-खातों पर स्वास्तिक बनाकर मां लक्ष्मी व सरस्वती की पूजा करते हैं ताकि व्यापार व जीवन में शुभ-लाभ बना रहे।',
          bn: 'ব্যবসা ও গৃহে শ্রী এবং শুভ-লাভ কামনায় লাল বাঁধাই খাতার ওপর স্বস্তিক এঁকে লক্ষ্মী-সরস্বতী পূজা।',
        },
      },
      {
        icon: '🤝',
        title: {
          en: 'Bestu Varas & Saal Mubarak',
          hi: 'बेस्तू वरस एवं साल मुबारक',
          bn: 'বেস্তু বরস ও সাল মুবারক',
        },
        why: {
          en: 'The day following Diwali marks the Gujarati New Year (Vikram Samvat). People dress in new clothes, seek elder blessings, and exchange warm "Saal Mubarak" hugs.',
          hi: 'दिवाली के अगले दिन गुजराती नूतन वर्ष मनाया जाता है। लोग बड़ों के चरण छूकर आशीर्वाद लेते हैं और साल मुबारक कहते हैं।',
          bn: 'দীপাবলির পরের দিন গুজরাটি নববর্ষ। নতুন পোশাকে গুরুজনদের প্রণাম ও পরস্পরের সাথে "সাল মুবারক" শুভেচ্ছা বিনিময়।',
        },
      },
      {
        icon: '🧂',
        title: {
          en: 'Sabras (Salt of Life) Gift',
          hi: 'सब्रस (नमक) का शगुन',
          bn: 'সবরস (লবণের শুভেচ্ছা)',
        },
        why: {
          en: 'On New Year morning, buying a pinch of salt from local vendors is considered an auspicious omen symbolizing taste, abundance, and loyal bonds.',
          hi: 'नववर्ष की पहली सुबह नमक (सब्रस) खरीदना अति शुभ माना जाता है, जो जीवन में स्वाद, समृद्धि और प्रेम का प्रतीक है।',
          bn: 'নববর্ষের সকালে লবণ কেনা শুভ লক্ষণ হিসেবে গণ্য হয়, যা জীবনে মাধুর্য ও বিশ্বস্ততার প্রতীক।',
        },
      },
      {
        icon: '🍬',
        title: {
          en: 'Mohanthal & Ghari Treats',
          hi: 'मोहनथाल एवं घारी की मिठास',
          bn: 'মোহনথাল ও ঘারি মিষ্টি',
        },
        why: {
          en: 'Baking decadent gram flour and mawa fudge (Mohanthal) and Surati Ghari soaked in pure ghee for guests.',
          hi: 'भुने बेसन, मावा और मेवों से बना मोहनथाल और सूरत की प्रसिद्ध घारी से मुंह मीठा कराया जाता है।',
          bn: 'বেসন ও ক্ষীরের মোহনথাল আর সুরতের বিখ্যাত ঘি-ভেজা ঘারি মিষ্টির স্বাদ।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Traditional Mohanthal & Surati Ghari',
        hi: 'शाही मोहनथाल व सुरती घारी',
        bn: 'ঐতিহ্যবাহী মোহনথাল ও সুরতি ঘারি',
      },
      desc: {
        en: 'Aromatic roasted gram flour fudge loaded with saffron, cardamom and silver leaf.',
        hi: 'केसर, इलायची और चांदी के वर्क से सजा भुना हुआ शाही मोहनथाल।',
        bn: 'জাফরান আর এলাচের সুবাসে তৈরি রাজকীয় মোহনথাল ও ঘারি।',
      },
    },
    highlight: {
      en: 'Saal Mubarak greetings, Rangoli at entrance, and account blessings.',
      hi: 'साल मुबारक की शुभकामनाएं, भव्य रंगोली और नए वर्ष का स्वागत।',
      bn: 'সাল মুবারক শুভেচ্ছা, দরজার সুন্দর আলপনা ও নতুন বছরের সূচনা।',
    },
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    shortName: 'Tamil Nadu',
    hi: 'तमिलनाडु',
    bn: 'তামিলনাড়ু',
    isUT: false,
    festivalName: {
      en: 'Deepavali & Ganga Snanam',
      hi: 'दीपावली एवं गंगा स्नानम्',
      bn: 'দীপাবলি ও গঙ্গা স্নানম',
    },
    introTagline: {
      en: 'From pre-dawn Ganga Snanam to the healing warmth of Deepavali Marundhu and vibrant Kolams, celebrate the grace of Tamil traditions.',
      hi: 'भोर के पावन गंगा स्नानम् से लेकर औषधीय मरुंधु और कोलम की सुंदरता तक, अनुभव करें तमिल परंपरा की दिव्यता।',
      bn: 'ভোরের পবিত্র গঙ্গা স্নানম থেকে ঔষধি মারুন্ধু আর নয়নাভিরাম কোলাম—তামিল উৎসবের অপরূপ প্রকাশ।',
    },
    meaning: {
      "en": "Celebrates the liberation of the world from darkness and tyranny following Lord Krishna and Satyabhama vanquishing demon Narakasura at dawn.",
      "hi": "भगवान श्री कृष्ण और सत्यभामा द्वारा नरकासुर के संहार और संसार को अधर्म से मुक्ति दिलाने का पावन स्मरण।",
      "bn": "শ্রীকৃষ্ণ ও সত্যভামার হাতে নরকাসুরের বিনাশের পর জগতে আলো ও ন্যায়ের পুনঃপ্রতিষ্ঠার স্মারক।"
},
    howObserved: {
      "en": "The celebration peaks before dawn. Elders apply warm sesame oil with omam to family members for the sacred Ganga Snanam bath. People wear new clothes (Puthu Aadaigal), consume a spoonful of therapeutic digestive Deepavali Marundu (herbal lehyam with dry ginger, cumin, pepper, and honey), light earthen agal vilakku, and burst sparklers before sunrise.",
      "hi": "सूर्योदय से पूर्व घर के बड़े सदस्य तिल का तेल लगाकर गंगा स्नानम् कराते हैं। नए वस्त्र पहनकर सौंठ, कालीमिर्च और शहद से बना पाचक दीपोत्सवी मरुन्दु ग्रहण किया जाता है और सुबह-सुबह पटाखे जलाए जाते हैं।",
      "bn": "সূর্য ওঠার আগে পরিবারের সকলে গঙ্গাস্নান সমতুল্য তৈলস্নান সম্পন্ন করেন। নতুন পোশাক পরে আদা-মরিচ-মধুর পাচক মাকরুন্দু খান এবং প্রদীপ জ্বেলে ফুলঝুরি ফোটান।"
},
    whenObserved: {
      "en": "Observed on Aippasi Amavasya at pre-dawn (Brahmamuhurtham).",
      "hi": "आईप्पासी माह की अमावस्या के ब्रह्ममुहूर्त में।",
      "bn": "আইপ্পাসি মাসের অমাবস্যার ভোরে (ব্রাহ্মমুহূর্তে)।"
},
    variations: {
      "en": "Unlike North India where festivities peak on Diwali evening, Tamil Deepavali peaks before sunrise. Chettinad families prepare rich vegetarian spreads; Thanjavur families offer special prayers to ancestral deities; rural farming belts perform cattle worship.",
      "hi": "उत्तर भारत के विपरीत तमिलनाडु में मुख्य उत्सव शाम के बजाय भोर में मनाया जाता है। चेट्टीनाड में विशेष भोज बनते हैं और तंजावुर में कुलदेवता की विशेष पूजा होती है।",
      "bn": "উত্তর ভারতের মতো সন্ধ্যায় নয়, তামিলনাড়ুতে মূল উৎসব ভোরবেলায় অনুষ্ঠিত হয়। চেরট্টিনাডে সুস্বাদু নিরামিষ পদ রান্না হয়।"
},
    source: {
      "title": "Tamil Nadu Tourism Official Portal",
      "url": "https://www.tamilnadutourism.tn.gov.in",
      "institution": "Department of Tourism, Government of Tamil Nadu"
},
    decorTradition: {
      artName: { en: 'Sikku Kolam (Rice Flour Art)', hi: 'सिक्कु कोलम', bn: 'সিক্কু কোলাম আলপনা' },
      artDesc: {
        en: 'Intricate geometric knot patterns drawn using white rice powder on dampened floors.',
        hi: 'चावल के आटे से बनाई जाने वाली पारंपरिक ज्यामितीय गांठों वाली कोलम कला।',
        bn: 'ভিজে মেঝেতে চালের গুঁড়ো দিয়ে নিখুঁত জ্যামিতিক বুনটের কোলাম।',
      },
      diyaName: { en: 'Agal Vilakku & Kuthuvilakku', hi: 'अगल विळक्कु एवं कुथुविळक्कु', bn: 'অগল বিড়াক্কু প্রদীপ' },
      diyaDesc: {
        en: 'Tiny terracotta Agal cups and tall five-wick brass Kuthuvilakku oil lamps.',
        hi: 'छोटे मिट्टी के अगल दीप और पांच मुखी पीतल के ऊंचे कुथुविळक्कु।',
        bn: 'ছোট মাটির অগল প্রদীপ এবং পঞ্চমুখী উঁচু পিতলের প্রদীপ।',
      },
      toranDesc: {
        en: 'Strings of crisp green mango leaves (Mavilai) tied at the main doorway.',
        hi: 'मुख्य द्वार पर बंधी ताजे आम के पत्तों (माविळै) की पवित्र लड़ी।',
        bn: 'প্রধান প্রবেশদ্বারে বাঁধা সবুজ সতেজ আমপাতার পবিত্র মালা।',
      },
    },
    keyTraditions: [
      {
        icon: '🌊',
        title: {
          en: 'Pre-Dawn Ganga Snanam',
          hi: 'सूर्योदय पूर्व गंगा स्नानम्',
          bn: 'ভোরে পবিত্র গঙ্গা স্নানম',
        },
        why: {
          en: 'Bathing before sunrise with sesame oil infused with ginger, peppercorns, and herbs. On this sacred dawn, all domestic waters are believed to hold the holy purity of River Ganga.',
          hi: 'सूर्योदय से पूर्व औषधीय तिल के तेल से स्नान किया जाता है। माना जाता है कि इस प्रभात हर जल में मां गंगा का वास होता है।',
          bn: 'সূর্যোদয়ের আগে ভেষজ তিলের তেল মেখে স্নান। বিশ্বাস করা হয় এই ভোরে প্রতিটি জলের ধারায় মা গঙ্গার পবিত্রতা থাকে।',
        },
      },
      {
        icon: '🍯',
        title: {
          en: 'Deepavali Marundhu (Healing Legiyam)',
          hi: 'दीपावली मरुंधु (पाचक लेह्यम्)',
          bn: 'দীপাবলি মারুন্ধু (ঔষধি মিষ্টি)',
        },
        why: {
          en: 'Consuming a unique Ayurvedic digestive preserve made with ginger, black pepper, omam, honey, and jaggery immediately after the bath to aid digestion during rich festive feasts.',
          hi: 'स्नान के तुरंत बाद अदरक, काली मिर्च, शहद और गुड़ से बना औषधीय लेह्यम खाया जाता है ताकि भारी पकवान आसानी से पच सकें।',
          bn: 'স্নানের পর আদা, গোলমরিচ, জোয়ান ও মধু দিয়ে তৈরি আয়ুর্বেদিক মিষ্টি লেহ্যম গ্রহণ স্বাস্থ্যরক্ষার জন্য।',
        },
      },
      {
        icon: '👗',
        title: {
          en: 'Pudhu Thuni (Auspicious New Silks)',
          hi: 'पुदु तुणि (नए रेशमी वस्त्र)',
          bn: 'পুধু থুনি (নতুন রেশমি বস্ত্র)',
        },
        why: {
          en: 'Donning new Kanchipuram silk sarees and dhotis, having first offered them with turmeric and kumkum before the household deity.',
          hi: 'भगवान के सम्मुख पूजा कर नए रेशमी वस्त्र धारण किए जाते हैं जो नए जीवन व उत्साह के प्रतीक हैं।',
          bn: 'পূজোর পর ঠাকুরের আশীর্বাদী নতুন কাঞ্চিপুরম রেশমি পোশাক ও ধুতি পরিধান।',
        },
      },
      {
        icon: '✨',
        title: {
          en: 'Pattasu (Daybreak Firecrackers)',
          hi: 'पट्टासु (प्रभात में पटाखे)',
          bn: 'ভোরের আলোর বাজি পটকা',
        },
        why: {
          en: 'Unlike other parts of India where fireworks burst at night, in Tamil Nadu families celebrate joyously at daybreak right after their Ganga Snanam.',
          hi: 'तमिलनाडु में रात के बजाय सुबह गंगा स्नानम् के तुरंत बाद पटाखे जलाकर नरकासुर पर विजय का जश्न मनाया जाता है।',
          bn: 'অন্য জায়গার মতো রাতে নয়, তামিলনাড়ুতে ভোরের স্নানের পরই বাজি পুড়িয়ে অশুভ শক্তির পতনের উল্লাস করা হয়।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Mysore Pak, Adhirasam & Murukku',
        hi: 'मैसूर पाक, अधिरसम् एवं मुरुक्कू',
        bn: 'মহীশূর পাক, অধিরসম ও মুরুক্কু',
      },
      desc: {
        en: 'Sweet rice-jaggery donuts (Adhirasam) and crunchy spiral ribbon murukku.',
        hi: 'चावल और गुड़ से बनी पारंपरिक अधिरसम और खस्ता मुरुक्कू।',
        bn: 'গুড়ের পুরভরা মিষ্টি অধিরসম ও মুচমুচে মুরুক্কুর স্বাদ।',
      },
    },
    highlight: {
      en: 'Dawn oil bath before sunrise, fresh silk veshtis, and sweet marundhu.',
      hi: 'सूर्योदय से पूर्व गंगा स्नानम्, नए रेशमी वस्त्र और औषधीय मरुंधु।',
      bn: 'ভোরে গঙ্গা স্নানম, রেশমি পোশাক ও সুস্বাদু ঔষধি মারুন্ধু।',
    },
  },
  {
    id: 'odisha',
    name: 'Odisha',
    shortName: 'Odisha',
    hi: 'ओडिशा',
    bn: 'ওড়িশা',
    isUT: false,
    festivalName: {
      en: 'Deepabali & Badabadua Daka',
      hi: 'दीपावली एवं बड़बड़ुआ डाका',
      bn: 'দীপাবলি ও বড়বড়ুয়া ডকা',
    },
    introTagline: {
      en: 'From lighting the sacred Kaunriya Kathi guiding ancestors toward the heavens to the sweet aroma of Chhena Poda, discover Odisha’s soul.',
      hi: 'पूर्वजों को राह दिखाने वाली कौणरिया काठी की पवित्र लौ से लेकर छेना पोड़ा की सुगंध तक, अनुभव करें ओडिशा की आत्मीयता।',
      bn: 'কাউনরিয়া কাঠির স্নিগ্ধ শিখায় পূর্বপুরুষদের আবাহন থেকে পোড়া ছানার মিষ্টি সুবাস—ওড়িশার হৃদয়ের রূপ।',
    },
    meaning: {
      "en": "Reverently illuminating the spiritual path of ancestors with sacred jute torches chanting \"Badabadua Daka\", seeking their blessings and worshipping Mahaprabhu Jagannath and Goddess Lakshmi.",
      "hi": "कौंरिया काठी जलाकर पितरों के पावन मार्ग को आलोकित करना, उनका आशीर्वाद पाना और महाप्रभु जगन्नाथ व माता लक्ष्मी का वंदन।",
      "bn": "কাউনরিয়া কাঠি জ্বেলে পূর্বপুরুষদের আত্মিক পথ আলোকিত করা এবং মহাপ্রভু জগন্নাথ ও দেবী লক্ষ্মীর আশীর্বাদ প্রার্থনা।"
},
    howObserved: {
      "en": "On Deepavali evening, families gather in courtyards or at the Grand Road (Bada Danda) in Puri. They hold bundles of dry jute stems (Kaunriya Kathi), light them into bright torches, and offer them skyward while singing the traditional Odia invocation: \"Badabadua ho, andhaare aasa, aalua re jaa...\" (O revered ancestors, come in darkness, return in light). Earthen lamps are lit in homes, and Chhena Poda is shared.",
      "hi": "दिवाली की शाम परिवार आंगन या पुरी के बड़दांड पर एकत्र होकर कौंरिया काठी (पटसन की सूखी लकड़ियों) की मशालें जलाते हैं और पूर्वजों का आह्वान करते हैं। घर-घर दीये जलाकर छेना पोड़ का भोग लगाया जाता है।",
      "bn": "দীপাবলির সন্ধ্যায় উঠোনে বা পুরীর বড়দণ্ডে পরিবারের সকলে পাটকাঠি (কাউনরিয়া কাঠি) জ্বালিয়ে মশাল তৈরি করেন এবং মন্ত্রোচ্চারণে পূর্বপুরুষদের আলোক পথ দেখান। ঘরে ঘরে ছেনাপোড়া মিষ্টির ভোগ নিবেদন হয়।"
},
    whenObserved: {
      "en": "Observed on Kartik Amavasya evening.",
      "hi": "कार्तिक अमावस्या की संध्या।",
      "bn": "কার্তিক অমাবস্যার সন্ধ্যায়।"
},
    variations: {
      "en": "Thousands gather before Puri Jagannath Temple to light torches together; Cuttack and coastal towns host grand Kali Puja with Chandi Medhas (intricate silver filigree backdrops); Western Odisha observes agrarian gratitude alongside local customs.",
      "hi": "पुरी जगन्नाथ मंदिर के सामने हजारों भक्त एक साथ कौंरिया काठी जलाते हैं; कटक में चांदी की मेढ़ा के साथ काली पूजा होती है; पश्चिमी ओडिशा में लोक परंपराओं संग उत्सव मनता है।",
      "bn": "পুরী জগন্নাথ মন্দিরের সামনে হাজারো ভক্ত কাউনরিয়া কাঠি জ্বালান; কটকে রুপোর তারাকাসির সাজে শ্যামাপূজা হয়।"
},
    source: {
      "title": "Odisha Tourism Official Portal",
      "url": "https://odishatourism.gov.in",
      "institution": "Department of Tourism, Government of Odisha"
},
    decorTradition: {
      artName: { en: 'Jhoti Chita Art', hi: 'झोटी चिता लोक कला', bn: 'ঝোটি চিতা শিল্প' },
      artDesc: {
        en: 'Traditional white semi-liquid rice paste murals of lotus and footsteps drawn on courtyards.',
        hi: 'चावल के घोल और कपड़े की पोटली से बनाई जाने वाली पावन झोटी चिता कला।',
        bn: 'ভিজে চালের লেই দিয়ে নিপুণ হাতে আঁকা ঝোটি চিতা ও লক্ষ্মীর পা।',
      },
      diyaName: { en: 'Mati Dipa (Earthen Lamps)', hi: 'माटी दीप', bn: 'মাটির প্রদীপ' },
      diyaDesc: {
        en: 'Handmade clay diyas lit with mustard oil placed in rows along doorsteps and tulsi altars.',
        hi: 'सरसों के तेल से जलते माटी के दीपक, तुलसी चौरे और दहलीज पर सजे हुए।',
        bn: 'তুলসী মঞ্চ ও ঘরের চৌকাঠে সাজানো সরষের তেলের মাটির প্রদীপ।',
      },
      toranDesc: {
        en: 'Fresh mango leaves and marigold flowers woven on jute twine.',
        hi: 'पटसन की डोरी में पिरोए गए आम के पत्ते और गेंदे के फूल।',
        bn: 'পাটের দড়িতে গাঁথা আমপাতা ও তাজা গাঁদা ফুলের তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '🔥',
        title: {
          en: 'Badabadua Daka & Kaunriya Kathi',
          hi: 'बड़बड़ुआ डाका एवं कौणरिया काठी',
          bn: 'বড়বড়ুয়া ডকা ও কাউনরিয়া কাঠি',
        },
        why: {
          en: 'Families gather at sunset holding bundles of lit dried jute sticks (Kaunriya Kathi), chanting "Bada Badua Ho, Andhaare Aasa, Aaluare Jaa", guiding ancestral spirits to heaven with light.',
          hi: 'शाम को पटसन की डंडियां (कौणरिया काठी) जलाकर आकाश की ओर दिखाते हुए पूर्वजों को अंधकार से प्रकाश की ओर जाने की प्रार्थना की जाती है।',
          bn: '"বড়বড়ুয়া হো, অন্ধকারে আস, আলোয় যাও"—কাউনরিয়া কাঠি জ্বালিয়ে পূর্বপুরুষদের স্বর্গের আলোয় পথ দেখানোর প্রাচীন প্রথা।',
        },
      },
      {
        icon: '🛕',
        title: {
          en: 'Puri Jagannath Temple Deepotsav',
          hi: 'पुरी श्री जगन्नाथ मंदिर दीपोत्सव',
          bn: 'পুরী জগন্নাথ মন্দিরে দীপোৎসব',
        },
        why: {
          en: 'Lighting thousands of ghee diyas on the Bada Danda (Grand Road) of Puri facing the sacred Singhadwara of Lord Jagannath.',
          hi: 'पुरी में श्री जगन्नाथ मंदिर के सिंहद्वार के समक्ष हजारों श्रद्धालु घी के दीपक प्रज्वलित कर मोक्ष की कामना करते हैं।',
          bn: 'শ্রীক্ষেত্রে সিংহদ্বারের সামনে ভক্তবৃন্দের হাজার হাজার ঘিয়ের প্রদীপ প্রজ্বলন।',
        },
      },
      {
        icon: '🥧',
        title: {
          en: 'Baking Authentic Chhena Poda',
          hi: 'पारंपरिक छेना पोड़ा का भोग',
          bn: 'সুস্বাদু ছেনাপোড়ার মিষ্টিমুখ',
        },
        why: {
          en: 'Slow-caramelized roasted cottage cheese cake baked in sal leaves, offered to deities and shared with loved ones.',
          hi: 'साल के पत्तों में धीमी आंच पर पकाई गई छेना पोड़ा मिठाई जो ओडिशा की अनूठी पहचान है।',
          bn: 'শালপাতায় মুড়ে ধিমে আঁচে পোড়ানো ছেনাপোড়ার রাজকীয় স্বাদ।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Authentic Chhena Poda & Rasabali',
        hi: 'प्रसिद्ध छेना पोड़ा व रसबली',
        bn: 'ওড়িশার ছেনাপোড়া ও রসবলি',
      },
      desc: {
        en: 'Caramelized cottage cheese cake baked to golden perfection with cardamom and raisins.',
        hi: 'गुड़, इलायची और काजू के साथ भुना हुआ स्वादिष्ट छेना पोड़ा।',
        bn: 'শালপাতায় সেঁকা পোড়া ছানা এবং ঘন দুধে ডোবানো রসবলি।',
      },
    },
    highlight: {
      en: 'Lighting jute sticks (Kaunria kathi) to guide ancestors with light.',
      hi: 'कौणरिया काठी जलाकर पूर्वजों को नमन और जगमगाते मिट्टी के दीप।',
      bn: 'কাউনরিয়া কাঠি জ্বালিয়ে পূর্বপুরুষদের স্মরণ ও মাটির প্রদীপ।',
    },
  },
  {
    id: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    shortName: 'Uttar Pradesh',
    hi: 'उत्तर प्रदेश',
    bn: 'উত্তর প্রদেশ',
    isUT: false,
    festivalName: {
      en: 'Ayodhya Deepotsav & Dev Deepawali',
      hi: 'अयोध्या दीपोत्सव एवं काशी देव दीपावली',
      bn: 'অযোধ্যা দীপোৎসব ও কাশী দেব দীপাবলি',
    },
    introTagline: {
      en: 'From the millions of glowing lamps on the banks of Saryu celebrating Shri Ram’s return to the holy ghats of Kashi, feel the epic grandeur of UP.',
      hi: 'श्री राम के अयोध्या आगमन पर सरयू तट के लाखों दीपकों से लेकर काशी के पावन घाटों तक, अनुभव करें उत्तर प्रदेश का भव्य दीपोत्सव।',
      bn: 'শ্রীরামচন্দ্রের প্রত্যাবর্তনে সরযূ তীরে লক্ষ লক্ষ প্রদীপের আলো থেকে কাশীর ঘাট—উত্তরপ্রদেশের মহিমান্বিত উৎসব।',
    },
    meaning: {
      "en": "Celebrates the triumphant return of Bhagwan Sri Ram, Mata Sita, and Lakshman to Ayodhya after 14 years of exile and the victory of Dharma over adharma.",
      "hi": "१४ वर्ष के वनवास के पश्चात मर्यादा पुरुषोत्तम भगवान श्री राम, माता सीता और लक्ष्मण के अयोध्या आगमन पर प्रेम और आनंद की ज्योति जलाना।",
      "bn": "১৪ বছরের বনবাস শেষে ভগবান শ্রী রামের অযোধ্যায় প্রত্যাবর্তন ও অন্ধকারের ওপর আলোর পরম বিজয়।"
},
    howObserved: {
      "en": "Homes are thoroughly cleaned and decorated with vibrant marigold torans and clay diyas. On Choti Diwali and Diwali, record-breaking millions of earthen diyas are lit along the ghats of Saryu in Ayodhya. Families conduct evening Lakshmi-Ganesh Puja with Kheel, Batashe, and sugar toys (Khilona), and bursting eco-sparklers.",
      "hi": "घर की सफाई और गेंदे के तोरण से सजावट। अयोध्या में सरयू तट पर लाखों मिट्टी के दीये जलाकर भव्य दीपोत्सव होता है। शाम को लक्ष्मी-गणेश जी की पूजा कर खील-बताशे और शक्कर के खिलौने बांटे जाते हैं।",
      "bn": "অযোধ্যায় সরযূ নদীর তীরে লক্ষ লক্ষ মাটির প্রদীপ জ্বেলে মহাদীপ্তির সূচনা হয়। সন্ধ্যায় প্রতিটি ঘরে লক্ষ্মী-গণেশ পূজা, খই-বাতাসা ও চিনির খেলনা প্রসাদ বিতরণ হয়।"
},
    whenObserved: {
      "en": "Deepotsav on Choti Diwali (Chaturdashi); main Diwali on Kartik Amavasya. (Dev Deepawali is celebrated later on Kartik Purnima in Varanasi).",
      "hi": "छोटी दिवाली पर अयोध्या दीपोत्सव, मुख्य दिवाली कार्तिक अमावस्या पर। (वाराणसी में देव दीपावली १५ दिन बाद कार्तिक पूर्णिमा पर मनाई जाती है)।",
      "bn": "ছোটি দিওয়ালিতে অযোধ্যা দীপোৎসব এবং অমাবস্যায় মূল দীপাবলি। (বারাণসীতে কার্তিক পূর্ণিমায় পৃথকভাবে দেব দীপাবলি অনুষ্ঠিত হয়)।"
},
    variations: {
      "en": "Ayodhya celebrates Ram’s return; Braj region (Mathura, Vrindavan) celebrates Govardhan Puja and Annakut parikrama the day after Diwali; Varanasi observes Dev Deepawali on Kartik Purnima 15 days later.",
      "hi": "अयोध्या में राम आगमन का उल्लास है; ब्रज क्षेत्र में दिवाली के अगले दिन गोवर्धन पूजा व परिक्रमा का विशेष महत्व है; काशी में १५ दिन बाद देव दीपावली मनती है।",
      "bn": "অযোধ্যায় রামের প্রত্যাবর্তনের উল্লাস, ব্রজ অঞ্চলে গোবর্ধন পূজা ও পরিক্রমা এবং কাশী-বারাণসীতে দেব দীপাবলি উদযাপিত হয়।"
},
    source: {
      "title": "Uttar Pradesh Tourism Official Portal",
      "url": "https://uptourism.gov.in",
      "institution": "Department of Tourism, Government of Uttar Pradesh"
},
    decorTradition: {
      artName: { en: 'Chowk Poorana & Floral Rangoli', hi: 'चौक पूरना व रंगोली', bn: 'চক পুরনা ও রঙ্গোলি' },
      artDesc: {
        en: 'Auspicious flour and turmeric Chowk motifs drawn for Lakshmi-Ganesh Puja.',
        hi: 'आटे और हल्दी से लक्ष्मी-गणेश पूजा हेतु बनाया जाने वाला पारंपरिक चौक।',
        bn: 'আটা ও হলুদ দিয়ে লক্ষ্মী-গণেশ পূজার জন্য আঁকা মাঙ্গলিক চক নকশা।',
      },
      diyaName: { en: 'Ayodhya Mitti Diyas', hi: 'माटी के दीये', bn: 'মাটির প্রদীপ' },
      diyaDesc: {
        en: 'Traditional mustard oil terracotta diyas placed on parapets, courtyards and temples.',
        hi: 'छतों, मुंडेरों और देहरी पर कतारबद्ध जलते सरसों के तेल के दीये।',
        bn: 'ছাদ ও আলসের কোণে কোণে সারিবদ্ধভাবে জ্বালানো সরষের তেলের প্রদীপ।',
      },
      toranDesc: {
        en: 'Fresh marigold garlands with ashoka & mango leaves.',
        hi: 'अशोक व आम के पत्तों और गेंदे के फूलों से सजी द्वार-माला।',
        bn: 'অশোক ও আমপাতায় গাঁথা উজ্জ্বল গাঁদা ফুলের তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '🪔',
        title: {
          en: 'Ayodhya Deepotsav Grandeur',
          hi: 'अयोध्या का भव्य दीपोत्सव',
          bn: 'অযোধ্যার মহিমান্বিত দীপোৎসব',
        },
        why: {
          en: 'Commemorating the return of Lord Rama, Sita, and Lakshmana to Ayodhya after 14 years of exile, when the entire kingdom was lit with oil lamps.',
          hi: '१४ वर्षों के वनवास के बाद भगवान श्री राम के अयोध्या लौटने पर नगरवासियों द्वारा घी के दीये जलाकर किए गए स्वागत की पावन स्मृति।',
          bn: '১৪ বছর বনবাস শেষে ভগবান শ্রীরামচন্দ্রের অযোধ্যায় প্রত্যাবর্তনে সমগ্র নগরী আলোর মালায় সাজানোর ইতিহাস।',
        },
      },
      {
        icon: '🙏',
        title: {
          en: 'Lakshmi-Ganesh & Kuber Pujan',
          hi: 'लक्ष्मी-गणेश एवं कुबेर पूजन',
          bn: 'লক্ষ্মী-গণেশ ও কুবের পূজা',
        },
        why: {
          en: 'Evening worship with silver coins, lotus flowers, sugarcane, and sweet Kheel-Batasha inviting wisdom, righteousness, and abundance.',
          hi: 'शाम को कमल के फूल, गन्ने, खील-बताशे और नए बर्तनों के साथ मां लक्ष्मी व विघ्नहर्ता गणेश की पूजा की जाती है।',
          bn: 'সন্ধ্যায় পদ্মফুল, রুপোর মুদ্রা ও খিল-বাতাসা দিয়ে সিদ্ধিদাতা গণেশ ও মা লক্ষ্মীর আরাধনা।',
        },
      },
      {
        icon: '⛰️',
        title: {
          en: 'Govardhan Puja & Annakoot',
          hi: 'गोवर्धन पूजा एवं अन्नकूट',
          bn: 'গোবর্ধন পূজা ও অন্নকূট',
        },
        why: {
          en: 'The morning after Diwali, shaping Govardhan Hill with cowdung to celebrate nature and offering a 56-dish Annakoot feast.',
          hi: 'प्रकृति और गौ-वंश के प्रति सम्मान व्यक्त करते हुए गोवर्धन पर्वत की पूजा और ५६ भोग (अन्नकूट) का अर्पण किया जाता है।',
          bn: 'প্রকৃতির প্রতি কৃতজ্ঞতা জানিয়ে গোবর্ধন পূজা এবং ৫৬ রকমের ভোগ (অন্নকূট) নিবেদন।',
        },
      },
      {
        icon: '✨',
        title: {
          en: 'Kashi Dev Deepawali (Kartik Purnima)',
          hi: 'काशी की देव दीपावली',
          bn: 'কাশীর দেব দীপাবলি',
        },
        why: {
          en: 'Celebrated 15 days after Diwali on Kartik Purnima across all 84 ghats of Varanasi when gods are believed to descend to bathe in the Ganga.',
          hi: 'दिवाली के १५ दिन बाद कार्तिक पूर्णिमा पर बनारस के सभी ८४ घाटों पर लाखों दीप जलते हैं जब देवता गंगा स्नान के लिए उतरते हैं।',
          bn: 'দীপাবলির ১৫ দিন পর কাশীর ৮৪টি ঘাটে লক্ষ প্রদীপ জ্বালিয়ে দেবতাদের গঙ্গা স্নানের মহা উৎসব।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Kheel Batashe, Mawa Gujiya & Kaju Katli',
        hi: 'खील-बताशे, मावा गुजिया व काजू कतली',
        bn: 'খিল-বাতাসা, মাওয়া গুজিয়া ও কাজু কাটলি',
      },
      desc: {
        en: 'Crisp puffed rice with cane sugar batashas and rich golden khoya-filled gujiyas.',
        hi: 'ताजे खील-बताशे और मावे, मेवों व इलायची से भरी पारंपरिक गुजिया।',
        bn: 'মিষ্টি খিল-বাতাসা এবং ক্ষীর ও খোয়া ভরা মুচমুচে গুজিয়ার স্বাদ।',
      },
    },
    highlight: {
      en: 'Millions of earthen lamps lining the holy ghats of Saryu and Ganga.',
      hi: 'सरयू और गंगा के पावन घाटों पर लाखों मिट्टी के दीपकों का महाकुंभ।',
      bn: 'সরযূ ও গঙ্গার পবিত্র ঘাটে লক্ষ লক্ষ মাটির প্রদীপের অপূর্ব শোভা।',
    },
  },
  {
    id: 'assam',
    name: 'Assam',
    shortName: 'Assam',
    hi: 'असम',
    bn: 'অসম',
    isUT: false,
    festivalName: {
      en: 'Kati Bihu & Deepawali',
      hi: 'काति बिहू एवं दीपावली',
      bn: 'কাতি বিহু ও দীপাবলি',
    },
    introTagline: {
      en: 'From Akash Banti lamps swaying high over lush golden paddy fields to midnight Kali Puja bells, celebrate the pristine light of Assam.',
      hi: 'लहलहाते धान के खेतों में ऊंचे आकाश बत्ती दीपों से लेकर मां काली के मंदिर की घंटियों तक, अनुभव करें असम का पावन दीपोत्सव।',
      bn: 'সোনালী ধানক্ষেতে উঁচু বাঁশের মাথায় আকাশবাতির দ্যুতি আর মন্দিরে মায়ের বন্দনা—অসমের অনুপম দীপাবলি।',
    },
    meaning: {
      "en": "Illuminating home thresholds and agricultural fields, honoring ancestors, dispelling pests and negativity, and invoking divine strength through Mother Kali.",
      "hi": "घर की देहरी और धान के खेतों को आलोकित करना, नकारात्मकता का संहार और मां काली की शक्ति का वंदन।",
      "bn": "গৃহদ্বারে আলো জ্বালিয়ে অন্ধকার দূরীকরণ, পিতৃপুরুষদের কল্যাণ ও কামাখ্যায় দেবী কালীর বন্দনা।"
},
    howObserved: {
      "en": "Families clean wooden courtyards and light small earthen lamps called saki. In rural paddy fields, tall bamboo poles raise oil lamps called Akash Banti high into the evening sky. Kali Puja is performed at Kamakhya Temple and community pandals. Neighbors exchange Narikol Laru (coconut sweets) and Pitha.",
      "hi": "मिट्टी के सकोरों में साकी (दीपक) जलाए जाते हैं। खेतों में ऊंचे बांस पर आकाश बंती (आकाश दीप) जलाए जाते हैं। कामाख्या शक्तिपीठ में मां काली की विशेष पूजा होती है और नारियल के लाडू बांटे जाते हैं।",
      "bn": "ঘরে ঘরে মাটির চাকি প্রদীপ জ্বলে। ধানের খেতে লম্বা বাঁশের আগায় \"আকাশ বাতি\" ঝুলিয়ে দেওয়া হয়। কামাখ্যায় বিশেষ পূজা এবং নারকেল ও তিলের নাড়ু বিতরণ।"
},
    whenObserved: {
      "en": "Kartik Amavasya (coinciding with the agricultural season following Kati Bihu).",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা (কাতি বিহুর সমকালীন)।"
},
    variations: {
      "en": "Kamakhya Temple and Guwahati observe grand Tantric and Vedic Kali Puja rituals; tea garden communities celebrate with traditional folk songs and lamps; Barak Valley observes traditional Bengali-style Shyama Pujo and Bhai Phonta.",
      "hi": "कामाख्या मंदिर में भव्य काली पूजा होती है; चाय बागान अंचलों में लोकगीतों संग दीप जलते हैं; बराक घाटी में श्यामा पूजा व भाई फोटा मनाया जाता है।",
      "bn": "কামাখ্যায় তান্ত্রিক ও বৈদিক বিধিতে শ্যামাপূজা হয়, চা বাগানে নিজস্ব লোকউৎসব এবং বরাক উপত্যকায় ভাইফোঁটা পালিত হয়।"
},
    source: {
      "title": "Assam Tourism Official Portal",
      "url": "https://assamtourism.gov.in",
      "institution": "Assam Tourism Development Corporation"
},
    decorTradition: {
      artName: { en: 'Bamboo & Floral Motifs', hi: 'बांस व पुष्प सज्जा', bn: 'বাঁশ ও ফুলের সাজসজ্জা' },
      artDesc: {
        en: 'Handcrafted bamboo courtyard lamps and fresh marigold strings.',
        hi: 'बांस के खंभों पर सजे सुंदर दीपक और गेंदे के फूलों की लड़ियां।',
        bn: 'বাঁশের নিপুণ কাজ আর গাঁদা ফুলের মালায় আঙিনা সাজানো।',
      },
      diyaName: { en: 'Saki Earthen Lamps', hi: 'साकी (माटी के दीये)', bn: 'সাকি মাটির প্রদীপ' },
      diyaDesc: {
        en: 'Mustard oil Saki lamps lit near the sacred Tulsi plant (Tulsi Bheti) and granaries.',
        hi: 'तुलसी चौरे (तुलसी भेटी) और अन्न के भंडार पर जलने वाले साकी दीप।',
        bn: 'তুলসী তলা ও ধানের ভাণ্ডারে রাখা সরষের তেলের সাকি প্রদীপ।',
      },
      toranDesc: {
        en: 'Mango leaves and betel leaves tied with woven bamboo strips.',
        hi: 'पान और आम के पत्तों का पारंपरिक तोरण।',
        bn: 'আমপাতা ও পানের পাতার শুভ মাঙ্গলিক তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '🎋',
        title: {
          en: 'Akash Banti (Sky Lamps of Paddy Fields)',
          hi: 'आकाश बत्ती (खेतों के आकाश दीप)',
          bn: 'আকাশবাতি (ক্ষেতের আকাশ প্রদীপ)',
        },
        why: {
          en: 'Tall bamboo poles hoisting earthen lamps high above golden rice fields to ward off crop pests and invite divine blessings for abundant harvest.',
          hi: 'धान के खेतों में लंबे बांस के ऊपर दीपक जलाया जाता है ताकि फसल की रक्षा हो और लक्ष्मी का वास रहे।',
          bn: 'ধানক্ষেতের মাঝে লম্বা বাঁশের মাথায় প্রদীপ জ্বালিয়ে শস্যরক্ষার প্রার্থনা ও স্বর্গের আশীর্বাদ কামনা।',
        },
      },
      {
        icon: '🪔',
        title: {
          en: 'Tulsi Bheti Saki Lighting',
          hi: 'तुलसी भेटी पर साकी प्रज्वलन',
          bn: 'তুলসীতলায় সাকি প্রদীপ',
        },
        why: {
          en: 'Lighting oil lamps in earthen holders (Saki) at the family Tulsi altar with evening prayers for household health and peace.',
          hi: 'घर के आंगन में स्थापित तुलसी के चबूतरे पर परिवार संग दीपक जलाकर सुख-शांति की प्रार्थना।',
          bn: 'গৃহের তুলসীতলায় পরিবারের সকলে মিলে সাকি জ্বালিয়ে কল্যাণ প্রার্থনা।',
        },
      },
      {
        icon: '🥥',
        title: {
          en: 'Narikol Laru & Til Pitha',
          hi: 'नारिकोल लारू व तिल पीठा',
          bn: 'নারকোল লাড়ু ও তিল পিঠা',
        },
        why: {
          en: 'Making handcrafted sesame rolls (Til Pitha) and freshly grated coconut jaggery sweets (Narikol Laru) for visiting guests.',
          hi: 'ताजे कसा हुआ नारियल, गुड़ और तिल से बने पारंपरिक असमी पीठा और लड्डू।',
          bn: 'নতুন চাল, তিল ও গুড়ের পিঠা এবং নারকোলের লাড়ু দিয়ে অতিথি আপ্যায়ন।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Narikol Laru & Til Pitha',
        hi: 'नारिकोल लारू व तिल पीठा',
        bn: 'নারকেলের নাড়ু ও তিল পিঠা',
      },
      desc: {
        en: 'Crisp rolled rice pancakes with roasted black sesame and sweet coconut-cardamom laddus.',
        hi: 'भुने तिल और गुड़ भरा पीठा और नारियल के स्वादिष्ट लड्डू।',
        bn: 'কালো তিলের সুস্বাদু পিঠা এবং নারকেল-গুড়ের মিষ্টি নাড়ু।',
      },
    },
    highlight: {
      en: 'Akash Banti sky-lamps lit in lush paddy fields and courtyard diyas.',
      hi: 'धान के खेतों में आकाश बत्ती और आंगन में जगमगाते दीये।',
      bn: 'ধানখেতে আকাশবাতি ও আঙিনায় মাটির প্রদীপের আলো।',
    },
  },
  {
    id: 'punjab',
    name: 'Punjab',
    shortName: 'Punjab',
    hi: 'पंजाब',
    bn: 'পাঞ্জাব',
    isUT: false,
    festivalName: {
      en: 'Bandi Chhor Divas & Diwali (Coinciding Celebrations)',
      hi: 'बंदी छोड़ दिवस एवं दिवाली (समकालिक पावन पर्व)',
      bn: 'বন্দী ছোড় দিবস ও দীপাবলি (সমকালীন উৎসব)',
    },
    introTagline: {
      en: 'From the illuminated golden reflection of Sri Harmandir Sahib during Bandi Chhor Divas—celebrating distinct Sikh significance that coincides with Diwali—to selfless Langar seva, feel the joy of Punjab.',
      hi: 'श्री हरिमंदिर साहिब की स्वर्णिम दीपमाला, बंदी छोड़ दिवस के विशिष्ट सिख मुक्ति पर्व (जो ऐतिहासिक रूप से दिवाली संग पड़ता है) और लंगर सेवा तक, अनुभव करें पंजाब का उत्साह।',
      bn: 'স্বর্ণমন্দিরের আলোকোজ্জ্বল শোভা, শিখ ঐতিহ্যের অনন্য বন্দী ছোড় দিবস (যা ঐতিহাসিকভাবে দীপাবলির সমকালে উদযাপিত হয়) ও নিঃস্বার্থ লঙ্গর সেবা—পাঞ্জাবের উদ্দীপনা।',
    },
    meaning: {
      "en": "Dual monumental celebration: Bandi Chhor Divas commemorates the release of Sixth Sikh Guru, Guru Hargobind Sahib Ji, along with 52 innocent captive rajas from Gwalior Fort in 1619; coincided historically with Diwali, celebrating universal liberty, human dignity, and the triumph of truth.",
      "hi": "बंदी छोड़ दिवस सिख इतिहास का गौरवशाली पर्व है जब १६१९ में छठे गुरु श्री हरगोबिंद साहिब जी ने ग्वालियर किले से ५२ निर्दोष राजाओं को मुक्त करवाया था; इसके साथ ही दिवाली पर मर्यादा पुरुषोत्तम राम का वंदन व दीपमाला की जाती है।",
      "bn": "ঐতিহাসিক বন্দী ছোড় দিবসে ১৬১৯ সালে ষষ্ঠ শিখ গুরু হরগোবিন্দ জী গোয়ালিয়র দুর্গ থেকে ৫২ জন নির্দোষ রাজাকে মুক্ত করে এনেছিলেন; এর সাথে মিলিয়ে সমগ্র পাঞ্জাবে সত্য ও স্বাধীনতার মহা আলোক উৎসব পালিত হয়।"
},
    howObserved: {
      "en": "Sri Harmandir Sahib (Golden Temple) in Amritsar is radiantly illuminated with thousands of earthen lamps (Deepmala) reflecting across the Amrit Sarovar, accompanied by Gurbani Kirtan, Nagar Kirtans, and community Langar. In Punjabi homes, families light clay diyas, perform evening prayers, and exchange pure ghee Pinni and Jalebi.",
      "hi": "अमृतसर के श्री हरिमंदिर साहिब (स्वर्ण मंदिर) में अमृत सरोवर के चारों ओर हजारों दीयों की दीपमाला सजाई जाती है, गुरबाणी कीर्तन होता है और अटूट लंगर बंटता है। घरों में मिट्टी के दीये जलाकर देसी घी की पिन्नी बांटी जाती है।",
      "bn": "অমৃতসরের স্বর্ণমন্দিরে সরোবরের চারধারে হাজার হাজার প্রদীপের দীপমালা জ্বলে, গুরুবাণী কীর্তন হয় ও লঙ্গর পরিবেশিত হয়। ঘরে ঘরে প্রদীপ জ্বেলে দেশি ঘিয়ের পিন্নি মিষ্টি উপহার দেওয়া হয়।"
},
    whenObserved: {
      "en": "Observed on Kartik Amavasya (historically coinciding with Diwali).",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "Sikhs across the globe commemorate Bandi Chhor Divas through Ardas, Kirtan, and Deepmala; Hindu Punjabi families perform evening Lakshmi-Ganesh Pujan; rural farming communities observe Vishwakarma Day the following morning worshipping tools and machinery.",
      "hi": "सिख संगत बंदी छोड़ दिवस पर अरदास व दीपमाला करती है; हिंदू परिवार शाम को लक्ष्मी-गणेश पूजन करते हैं; ग्रामीण इलाकों में अगले दिन विश्वकर्मा दिवस पर औजारों की पूजा होती है।",
      "bn": "শিখ সমাজ শ্রদ্ধার সাথে বন্দী ছোড় দিবস পালন করে, হিন্দু পরিবারে লক্ষ্মীপূজা হয় এবং পরদিন সকালে বিশ্বকর্মা পূজায় যন্ত্রপাতির পূজা করা হয়।"
},
    source: {
      "title": "Punjab Tourism Official Portal",
      "url": "https://punjabtourism.punjab.gov.in",
      "institution": "Department of Tourism and Cultural Affairs, Government of Punjab"
},
    decorTradition: {
      artName: { en: 'Chowk & Bright Rangoli', hi: 'चौक व रंग-बिरंगी रंगोली', bn: 'রঙিন চক ও রঙ্গোলি' },
      artDesc: {
        en: 'Bold floral and peacock rangolis greeting family and friends.',
        hi: 'मुख्य द्वार पर मोर और फूलों के सुंदर रंगों से सजी रंगोली।',
        bn: 'ময়ূর ও ফুলের নকশায় সাজানো মনকাড়া রঙিন রঙ্গোলি।',
      },
      diyaName: { en: 'Desi Ghee Diye', hi: 'देसी घी के दीये', bn: 'ঘিয়ের প্রদীপ' },
      diyaDesc: {
        en: 'Earthen diyas burning brightly with pure desi ghee on parapets and verandahs.',
        hi: 'छतों और देहरी पर शुद्ध देसी घी से जलते माटी के दीये।',
        bn: 'খাঁটি ঘিয়ে প্রজ্বলিত মাটির প্রদীপের উজ্জ্বল দীপ্তি।',
      },
      toranDesc: {
        en: 'Lush marigold and golden tassel door hangings.',
        hi: 'गेंदे के फूलों और सुनहरे गोटे की सुंदर द्वार तोरण।',
        bn: 'গাঁদা ফুল আর সোনালী জরির জমকালো তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '🕊️',
        title: {
          en: 'Bandi Chhor Divas (Distinct Sikh Celebration of Liberation)',
          hi: 'बंदी छोड़ दिवस (सिख परंपरा का पावन मुक्ति पर्व)',
          bn: 'বন্দী ছোড় দিবস (শিখ ঐতিহ্যের অনন্য মুক্তি উৎসব)',
        },
        why: {
          en: 'A distinct Sikh festival of liberation that historically coincides with Diwali. It commemorates the 1619 release of the Sixth Sikh Guru, Guru Hargobind Ji, from Gwalior Fort alongside 52 innocent rajas, upholding justice, compassion, and religious liberty.',
          hi: 'सिख परंपरा का यह विशिष्ट मुक्ति पर्व कालक्रम से दिवाली के साथ पड़ता है। यह छठे सिख गुरु, गुरु हरगोबिंद साहिब जी द्वारा ५२ निर्दोष राजाओं को ग्वालियर किले से मुक्त कराने और धार्मिक स्वतंत्रता के पावन इतिहास की स्मृति है।',
          bn: 'শিখ ঐতিহ্যের এক স্বতন্ত্র ও গভীর তাৎপর্যপূর্ণ মুক্তি উৎসব যা দীপাবলির সমকালে উদযাপিত হয়। ১৬১৯ সালে ষষ্ঠ শিখ গুরু হরগোবিন্দ জী কর্তৃক গোয়ালিয়র দুর্গ থেকে ৫২ জন নির্দোষ রাজাকে মুক্ত করার পুণ্য স্মারক।',
        },
      },
      {
        icon: '✨',
        title: {
          en: 'Golden Temple Deepmala (Amritsar)',
          hi: 'श्री हरिमंदिर साहिब की भव्य दीपमाला',
          bn: 'স্বর্ণমন্দিরে অপূর্ব দীপমালা',
        },
        why: {
          en: 'Illuminating the entire holy sarovar and sanctum of Sri Harmandir Sahib with tens of thousands of earthen diyas and fireworks.',
          hi: 'अमृतसर के पावन सरोवर के चारों ओर हजारों घी के दीपक जलाए जाते हैं जो पानी में स्वर्णिम आभा बिखेरते हैं।',
          bn: 'পবিত্র সরোবরের চারিপাশে হাজার হাজার প্রদীপ জ্বেলে স্বর্ণমন্দিরকে মায়াবী রূপ দেওয়া হয়।',
        },
      },
      {
        icon: '🍲',
        title: {
          en: 'Langar Seva & Warm Hospitality',
          hi: 'लंगर सेवा व आत्मीय सत्कार',
          bn: 'লঙ্গর সেবা ও আন্তরিক আতিথেয়তা',
        },
        why: {
          en: 'Community kitchens (Langar) serve warm meals, sweet jalebis, and kheer to everyone without distinction of caste, religion, or background.',
          hi: 'गुरुद्वारों और घरों में बिना किसी भेद-भाव के सभी को प्रेमपूर्वक भोजन व मिठाइयां खिलाई जाती हैं।',
          bn: 'জাতি-ধর্ম নির্বিশেষে সকলকে একসাথে বসিয়ে লঙ্গরের অমৃতসম আহার ও মিষ্টিমুখ করানো।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Pinni, Besan Ladoo & Hot Jalebi',
        hi: 'देसी घी की पिन्नी, बेसन लड्डू व जलेबी',
        bn: 'খাঁটি ঘিয়ের পিন্নি, বেসন লাড্ডু ও জিলিপি',
      },
      desc: {
        en: 'Hearty wheat-flour and dry fruit pinnis made with pure desi ghee and gond.',
        hi: 'शुद्ध देसी घी, गोंद, बादाम और मेवों से बनी पौष्टिक व स्वादिष्ट पिन्नी।',
        bn: 'খাঁটি ঘি, গম ও ড্রাই ফ্রুটসে তৈরি ঐতিহ্যবাহী পুষ্টিকর পিন্নি।',
      },
    },
    highlight: {
      en: 'Golden Temple illuminated with thousands of diyas celebrating Bandi Chhor Divas coinciding with Diwali, and warm langar seva.',
      hi: 'स्वर्ण मंदिर में अनगिनत दीपकों की आभा संग बंदी छोड़ दिवस (जो दिवाली संग पड़ता है) और गुरु का लंगर।',
      bn: 'স্বর্ণমন্দিরে অজস্র প্রদীপের আলোয় বন্দী ছোড় দিবস (যা দীপাবলির সমকালীন) ও লঙ্গরের পুণ্য সেবা।',
    },
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    shortName: 'Rajasthan',
    hi: 'राजस्थान',
    bn: 'রাজস্থান',
    isUT: false,
    festivalName: {
      en: 'Deepawali Ram Ram Sa & Haveli Roshni',
      hi: 'दीपावली राम राम सा एवं हवेलियों की रोशनी',
      bn: 'দীপাবলি রাম রাম সা ও হাভেলির আলো',
    },
    introTagline: {
      en: 'From the royal golden glow of Jaipur’s illuminated bazaars to the rustic beauty of Mandana folk art, experience royal Rajasthani Diwali.',
      hi: 'जयपुर के जगमगाते बाजारों की भव्यता से लेकर देहाती मांडना लोक कला तक, अनुभव करें राजस्थान की राजसी दिवाली।',
      bn: 'জয়পুরের আলোর মেলা থেকে মাটির ঘরের মাণ্ডনা শিল্প—রাজস্থানের রাজকীয় দীপাবলির মহিমা।',
    },
    meaning: {
      "en": "Welcoming the return of Lord Ram, seeking divine blessings of Goddess Lakshmi and Ganesha, and consecrating courtyard thresholds with sacred Mandana geometry.",
      "hi": "भगवान श्री राम के अयोध्या आगमन का स्वागत, माता लक्ष्मी व गणेश जी का आशीर्वाद और मांडणा कला से गृह की शुद्धि।",
      "bn": "শ্রী রামের শুভাগমন, লক্ষ্মী-গণেশের আরাধনা এবং পবিত্র মাণ্ডনা নকশার মাধ্যমে গৃহকোণে মাঙ্গলিকতার আবাহন।"
},
    howObserved: {
      "en": "Women clean courtyards with cow-dung plaster and paint intricate geometric Mandana motifs using red ochre (Geru) and white chalk paste (Khadya). On Diwali night, four-wick clay diyas (Chau-mukha Diya) are lit with mustard oil. Lakshmi Puja is conducted in homes and mercantile havelis, and Govardhan Puja follows the next morning.",
      "hi": "महिलाएं गेरू के लाल धरातल पर खड़िया से सुंदर मांडणा बनाती हैं। दिवाली की रात चार बत्ती वाले चौमुखा मिट्टी के दीये जलाए जाते हैं और लक्ष्मी पूजन के बाद मावा कचौरी व घेवर का भोग लगता है।",
      "bn": "গেরুয়া ও সাদা রঙে ঘরের মেঝে ও দেওয়ালে মাণ্ডনা নকশা আঁকা হয়। চার মুখের মাটির চৌমুখা প্রদীপ জ্বেলে লক্ষ্মীপূজা করা হয় এবং সুস্বাদু ঘেভার ও মাওয়া কচুরি খাওয়া হয়।"
},
    whenObserved: {
      "en": "Five-day festival from Dhanteras to Bhai Dooj, peaking on Kartik Amavasya.",
      "hi": "धनतेरस से भाई दूज तक, मुख्य उत्सव कार्तिक अमावस्या पर।",
      "bn": "ধনতেরাস থেকে ভাইদুজ পর্যন্ত পাঁচদিন ব্যাপী, অমাবস্যায় মূল উৎসব।"
},
    variations: {
      "en": "Marwar and Shekhawati mercantile communities conduct elaborate Chopda Pujan; Mewar (Udaipur) havelis celebrate with floating palace lamps; Pushkar begins its spiritual Brahma Temple Kartik festival around this season.",
      "hi": "मारवाड़ व शेखावाटी के व्यापारी बही-खाता पूजन करते हैं; मेवाड़ के महलों में दीपदान होता है; पुष्कर में कार्तिक मेले का आरंभ होता है।",
      "bn": "মারোয়াড়ি সমাজে চোপড়া পূজন অনুষ্ঠিত হয়, উদয়পুরের রাজপ্রাসাদে প্রদীপের মেলা বসে এবং পুষ্করে শুরু হয় কার্তিক মেলা।"
},
    source: {
      "title": "Rajasthan Tourism Development Corporation (RTDC)",
      "url": "https://www.rajasthantourism.gov.in",
      "institution": "Department of Tourism, Government of Rajasthan"
},
    decorTradition: {
      artName: { en: 'Mandana Folk Art', hi: 'मांडना लोक कला', bn: 'মাণ্ডনা লোকশিল্প' },
      artDesc: {
        en: 'Sacred red clay (Geru) and white rice flour patterns drawn on courtyards and hearths.',
        hi: 'गेरू की लाल पृष्ठभूमि पर खड़िया (सफेद घोल) से बनाई गई ज्यामितीय कला।',
        bn: 'গেরুয়া মাটির ওপর সাদা চালের গুঁড়োর আলপনা।',
      },
      diyaName: { en: 'Mitti Ka Diya & Brass Deepaks', hi: 'माटी के दीये व पीतल के दीपक', bn: 'মাটির ও পিতলের প্রদীপ' },
      diyaDesc: {
        en: 'Rows of terracotta diyas lining haveli jharokhas and carved sandstone parapets.',
        hi: 'हवेलियों के झरोखों और छतों पर कतारों में जलते सुंदर मिट्टी के दीप।',
        bn: 'হাভেলির অলিন্দে সাজানো মাটির প্রদীপের আলোর রোশনাই।',
      },
      toranDesc: {
        en: 'Bandhej fabric torans adorned with brass bells and marigolds.',
        hi: 'बंधेज के कपड़े, पीतल की घंटियों और गेंदे के फूलों से सजा तोरण।',
        bn: 'বান্ধনী কাপড় ও পিতলের ঘণ্টি দিয়ে তৈরি রাজস্থানী তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '🏰',
        title: {
          en: 'Jaipur Walled City Illumination',
          hi: 'जयपुर परकोटे की विश्वप्रसिद्ध रोशनी',
          bn: 'জয়পুরের রাজকীয় আলোকসজ্জা',
        },
        why: {
          en: 'Jaipur’s historic pink city markets compete for best heritage lighting, transforming the ancient bazaars into golden fairy palaces.',
          hi: 'गुलाबी नगर के जौहरी बाजार, बापू बाजार और हवेलियां स्वर्णिम रोशनी से नहा उठती हैं।',
          bn: 'গোলাপি শহরের প্রাচীন বাজারগুলো যেন আলোর প্রাসাদে পরিণত হয়।',
        },
      },
      {
        icon: '🎨',
        title: {
          en: 'Sacred Mandana Painting',
          hi: 'शुभ मांडना आलेखन',
          bn: 'পবিত্র মাণ্ডনা নকশা',
        },
        why: {
          en: 'Women draw symbolic figures of peacocks, lotus, and water pots using red ochre and white chalk to protect the household and attract auspiciousness.',
          hi: 'महिलाएं घर की चौखट और आंगन में सुख-समृद्धि के लिए मोर, जलकलश और स्वास्तिक बनाती हैं।',
          bn: 'গৃহস্থের মঙ্গলে মাটির উঠোনে ময়ূর, কলস ও স্বস্তিকের মাঙ্গলিক নকশা।',
        },
      },
      {
        icon: '🙏',
        title: {
          en: 'Ram Ram Sa Greetings',
          hi: 'राम राम सा अभिवादन व स्नेह मिलन',
          bn: 'রাম রাম সা শুভেচ্ছা বিনিময়',
        },
        why: {
          en: 'Visiting elders and neighbors offering folded hands and royal greetings of "Ram Ram Sa" accompanied by dry fruit thalis and mawa sweets.',
          hi: 'हाथ जोड़कर "राम राम सा" कहते हुए बड़ों का आदर और परिजनों का आत्मीय सत्कार।',
          bn: 'হাতজোড় করে "রাম রাম সা" বলে প্রবীণদের প্রণাম ও শুভেচ্ছা বিনিময়।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Mawa Kachori & Ghevar',
        hi: 'मावा कचौरी, घेवर व गोंद के लड्डू',
        bn: 'মাওয়া কচুরি ও রাজস্থানী ঘেভর',
      },
      desc: {
        en: 'Sweet khoya-stuffed puffed kachoris dipped in saffron syrup and honeycomb ghee ghevars.',
        hi: 'केसर की चाशनी में डूबी कुरकुरी मावा कचौरी और पारंपरिक जालीदार घेवर।',
        bn: 'জাফরানের রসে ডোবানো মিষ্টি মাওয়া কচুরি ও বিখ্যাত রাজস্থানী ঘেভর।',
      },
    },
    highlight: {
      en: 'Jaipur bazaar lightings, Mawa Kachori, and majestic brass thalis.',
      hi: 'गुलाबी नगर के जगमगाते बाजार, मावा कचौरी और शाही ठाठ-बाट।',
      bn: 'হাভেলির রাজকীয় আলোর ঝলকানি, মাওয়া কচুরি ও উজ্জ্বল প্রদীপ।',
    },
  },
  {
    id: 'bihar',
    name: 'Bihar',
    shortName: 'Bihar',
    hi: 'बिहार',
    bn: 'বিহার',
    isUT: false,
    festivalName: {
      en: 'Diwali & Mahaparv Chhath Preparation',
      hi: 'दीपावली एवं महापर्व छठ की तैयारी',
      bn: 'দীপাবলি ও মহাপর্ব ছট প্রস্তুতি',
    },
    introTagline: {
      en: 'From daughters painting little clay Gharonda houses to Lakshmi-Ganesh blessings and the sacred sanctity of Chhath, feel the devotion of Bihar.',
      hi: 'बेटियों द्वारा सजाए गए मिट्टी के घरौंदों से लेकर लक्ष्मी-गणेश पूजन और छठ पर्व की पवित्रता तक, अनुभव करें बिहार का पावन दीपोत्सव।',
      bn: 'কন্যাদের হাতে গড়া মাটির ঘরৌন্দা, লক্ষ্মী-গণেশ পূজা আর ছট পূজার মহতী প্রস্তুতি—বিহারের ভক্তিঘন রূপ।',
    },
    meaning: {
      "en": "Celebrating the victory of light, welcoming Goddess Lakshmi, and immediately transitioning into preparing the sacred banks for the great folk festival of Chhath Puja.",
      "hi": "प्रकाश की विजय, माता लक्ष्मी का स्वागत और इसके तुरंत बाद लोक आस्था के महापर्व छठ पूजा की तैयारियों का पावन आरंभ।",
      "bn": "আলোর বিজয় ও দেবী লক্ষ্মীর আহ্বান, যার পরপরই শুরু হয় বিহারের মহা লোকউৎসব ছট পূজার পুণ্য প্রস্তুতি।"
},
    howObserved: {
      "en": "Homes are illuminated with mustard oil clay lamps. Evening Lakshmi-Ganesh Puja is performed with sugarcane and sugar toy treats (Khilona Batashe). Families share Anarsa and Pirkiya. Cleaning of river and village pond ghats begins immediately for the ensuing Chhath Puja.",
      "hi": "सरसों के तेल के दीये जलाए जाते हैं। शाम को लक्ष्मी-गणेश पूजन में गन्ने और शक्कर के खिलौने चढ़ाए जाते हैं। अनरसा और पिरुकिया बांटी जाती है और इसके बाद छठ घाटों की सफाई शुरू होती है।",
      "bn": "মাটির প্রদীপে আলো জ্বালিয়ে লক্ষ্মী-গণেশ পূজা হয়। চিনি ও গুড়ের অনরসা মিষ্টি তৈরি হয় এবং ছট পূজার জন্য নদী ও পুকুরের ঘাট পরিচ্ছন্ন করার কাজ শুরু হয়।"
},
    whenObserved: {
      "en": "Diwali on Kartik Amavasya; leads directly into Nahay-Khay of Chhath Puja on Kartik Shukla Chaturthi.",
      "hi": "कार्तिक अमावस्या पर दिवाली, जिसके तीन दिन बाद कार्तिक शुक्ल चतुर्थी से छठ का नहाय-खाय शुरू होता है।",
      "bn": "কার্তিক অমাবস্যায় দিওয়ালি, যার পরেই কার্তিক শুক্ল চতুর্থীতে ছট পূজার স্নান ও সংকল্প শুরু হয়।"
},
    variations: {
      "en": "Mithila region adorns courtyards with traditional Aripan floor paintings; northern districts celebrate Kali Puja with public pandals; rural areas observe Govardhan and Godhan brother-blessing ceremonies.",
      "hi": "मिथिलांचल में अरिपन कला बनाई जाती है; उत्तर बिहार में काली पूजा के भव्य पंडाल सजते हैं; ग्रामीण क्षेत्रों में गोधन कूटने की अनूठी परंपरा है।",
      "bn": "মিথিলা অঞ্চলে ঐতিহ্যবাহী অরিপন আঁকা হয়; উত্তর বিহারে শ্যামাপূজা হয় এবং লোকসংস্কৃতিতে গোধন উৎসব পালিত হয়।"
},
    source: {
      "title": "Bihar Tourism Official Portal",
      "url": "https://tourism.bihar.gov.in",
      "institution": "Department of Tourism, Government of Bihar"
},
    decorTradition: {
      artName: { en: 'Madhubani & Aripan Art', hi: 'मधुबनी व अरिपन कला', bn: 'মধুবনী ও অরপন শিল্প' },
      artDesc: {
        en: 'Intricate folk art patterns drawn with rice paste depicting fish, lotus, and holy sun.',
        hi: 'चावल के पीसे घोल से आंगन में बनाई जाने वाली पारंपरिक अरिपन और मधुबनी कला।',
        bn: 'চালের গুঁড়ো দিয়ে উঠোনে আঁকা মাঙ্গলিক পদ্ম ও সূর্যের মধুবনী অরপন।',
      },
      diyaName: { en: 'Mitti Ke Diye (Clay Lamps)', hi: 'माटी के दीये', bn: 'মাটির প্রদীপ' },
      diyaDesc: {
        en: 'Earthen diyas lit in every room, storehouse, and cattle barn.',
        hi: 'घर के हर कमरे, भंडार और गौशाला में जलने वाले मिट्टी के दीप।',
        bn: 'ঘরের প্রতি কোণে, শস্যভাণ্ডারে ও গোয়ালঘরে রাখা মাটির প্রদীপ।',
      },
      toranDesc: {
        en: 'Fresh mango leaves strung with marigold blooms.',
        hi: 'आम के पत्तों और गेंदे के फूलों से सजी द्वार-माला।',
        bn: 'আমপাতা ও গাঁদা ফুলের পবিত্র মঙ্গল তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '🏠',
        title: {
          en: 'Gharonda (Miniature Clay Houses)',
          hi: 'घरौंदा (माटी के नन्हें घर)',
          bn: 'ঘরৌন্দা (মাটির ছোট্ট ঘর)',
        },
        why: {
          en: 'Unmarried girls and children build and paint miniature multi-tiered clay houses, decorating them with toy kitchenware and filling them with sweets to welcome Goddess Lakshmi.',
          hi: 'बच्चे मिट्टी के दो-मंजिला सुंदर घरौंदे बनाते हैं और उनमें खील-बताशे भरकर मां लक्ष्मी के स्थायी वास की प्रार्थना करते हैं।',
          bn: 'শিশুরা পরম যত্নে মাটির ছোট ঘর বানিয়ে রং করে এবং তাতে খিল-বাতাসা রেখে মা লক্ষ্মীর আগমন কামনা করে।',
        },
      },
      {
        icon: '☀️',
        title: {
          en: 'Chhath Mahaparv Preparations',
          hi: 'महापर्व छठ की पावन तैयारी',
          bn: 'মহাপর্ব ছট পূজার সূচনা',
        },
        why: {
          en: 'Immediately after Diwali night, homes transition into ultimate purity and devout penance preparing for the 4-day Sun worship festival of Chhath Puja.',
          hi: 'दिवाली समाप्त होते ही घर की पूरी शुद्धि कर सूर्य देव और छठी मइया की उपासना की तैयारी शुरू हो जाती है।',
          bn: 'দীপাবলি শেষ হতেই সমগ্র গৃহ পবিত্র করে সূর্যদেব ও ষষ্ঠী মাতার মহাব্রত ছট পূজার প্রস্তুতি শুরু হয়।',
        },
      },
      {
        icon: '🍬',
        title: {
          en: 'Kheel, Batasha & Pirhiya',
          hi: 'खील-बताशे एवं पिरहिया का नेह',
          bn: 'খিল-বাতাসা ও ঐতিহ্যবাহী মিষ্টি',
        },
        why: {
          en: 'Neighbors visit each home exchanging earthen plates loaded with puffed rice, animal-shaped sugar candies (hathighoda), and homemade laddoos.',
          hi: 'आस-पड़ोस में मिट्टी की कुल्हड़ों में खील, बताशे, हाथी-घोड़े वाली चीनी की मिठाइयां बांटी जाती हैं।',
          bn: 'মাটির পাত্রে খিল, বাতাসার মিষ্টি খেলনা ও লাড্ডু দিয়ে আত্মীয় ও প্রতিবেশীদের অভিনন্দন।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Thekua, Khaja & Pirukiya',
        hi: 'ठेकुआ, सिलव का खाजा व पिड़किया',
        bn: 'ঠেকুয়া, খাজা ও পিড়ুকিয়া',
      },
      desc: {
        en: 'Crisp layered Silao Khaja and sweet deep-fried whole wheat jaggery thekuas.',
        hi: 'परतदार सिलाव का खाजा और गुड़ व सौंफ से बना स्वादिष्ट खस्ता ठेकुआ।',
        bn: 'মুচমুচে স্তরে তৈরি খাজা এবং গম ও গুড়ের তৈরি সুস্বাদু ঠেকুয়া।',
      },
    },
    highlight: {
      en: 'Gharonda clay houses, Lakshmi-Ganesh puja, and Pirhiya blessings.',
      hi: 'घरौंदा, लक्ष्मी-गणेश पूजन और परिवारों का आत्मीय मिलन।',
      bn: 'ঘরৌন্দা মাটির বাড়ি, লক্ষ্মী-গণেশ পূজা ও পারিবারিক মিলন।',
    },
  },
  {
    id: 'kerala',
    name: 'Kerala',
    shortName: 'Kerala',
    hi: 'केरल',
    bn: 'কেরল',
    isUT: false,
    festivalName: {
      en: 'Deepavali & Nilavilakku Glow',
      hi: 'दीपावली एवं निलाविलाक्कु की आभा',
      bn: 'দীপাবলি ও নিলাভিলাক্কু প্রদীপ',
    },
    introTagline: {
      en: 'From the golden glow of the tall bronze Nilavilakku in the courtyard to herbal dawn baths and sweet Neyyappams, experience Kerala’s serene celebration.',
      hi: 'आंगन में खड़े पीतल के निलाविलाक्कु की सुनहरी आभा से लेकर भोर के औषधीय स्नान और नैय्यप्पम तक, अनुभव करें केरल की शांत दिव्यता।',
      bn: 'উঠোনে রাখা পিতলের নিলাভিলাক্কুর সোনার আলো, ভেষজ স্নান আর মিষ্টি নেয়াপ্পম—কেরলের প্রশান্ত উৎসব।',
    },
    meaning: {
      "en": "Symbolizes the destruction of demon Narakasura by Lord Krishna; primarily observed as a peaceful festival of light by traditional communities and urban centers.",
      "hi": "भगवान श्री कृष्ण द्वारा नरकासुर के संहार का प्रतीक; पारंपरिक समुदायों और नगरों में शांति और प्रकाश का पर्व।",
      "bn": "শ্রীকৃষ্ণের হাতে নরকাসুরের বিনাশের স্মারক; শান্ত ও স্নিগ্ধ পারিবারিক আলোক উৎসব।"
},
    howObserved: {
      "en": "A quiet dawn celebration beginning with an oil bath, wearing traditional Kasavu mundu/saree, lighting brass Nilavilakku and clay lamps on verandas, and sharing homemade sweets like Unniyappam and Nei Appam.",
      "hi": "भोर में तेल स्नान, पारंपरिक कसावु वस्त्र पहनना, पूजा घर में निलविळक्कु और बरामदे में दीये जलाना, तथा उन्नीअप्पम का भोग लगाना।",
      "bn": "ভোরে তৈলস্নান ও ঐতিহ্যবাহী কাসাভু পোশাক পরিধান, নিলাভিলক্কু প্রদীপের আলো এবং সুস্বাদু উন্নিআপ্পাম মিষ্টি বিতরণ।"
},
    whenObserved: {
      "en": "Observed on Aippasi Amavasya at dawn.",
      "hi": "आईप्पासी अमावस्या की भोर।",
      "bn": "আইপ্পাসি অমাবস্যার ভোরে।"
},
    variations: {
      "en": "Unlike Onam and Vishu which are celebrated statewide, Deepavali in Kerala is celebrated predominantly in Palakkad (Tamil agraharams), Thiruvananthapuram, Kochi, and North Kerala coastal merchant communities.",
      "hi": "ओणम और विशु के विपरीत केरल में दीपावली मुख्य रूप से पालक्काड़, तिरुवनंतपुरम, कोच्चि और व्यापारी क्षेत्रों में विशेष रूप से मनती है।",
      "bn": "ওণম ও বিষুর তুলনায় দীপাবলি মূলত পালক্কাড়, তিরুবনন্তপুরম ও কোচির মতো শহরাঞ্চলে বেশি উদযাপিত হয়।"
},
    source: {
      "title": "Kerala Tourism Official Portal",
      "url": "https://www.keralatourism.org",
      "institution": "Department of Tourism, Government of Kerala"
},
    decorTradition: {
      artName: { en: 'Floral Pookkalam & Kolam', hi: 'पुष्प पूक्कलम व कोलम', bn: 'ফুলের পুকলম ও কোলাম' },
      artDesc: {
        en: 'Petals of marigold, jasmine and hibiscus arranged in sacred concentric circles.',
        hi: 'गेंदा, चमेली और गुड़हल की पंखुड़ियों से सजा फूलों का सुंदर पूक्कलम।',
        bn: 'গাঁদা, জুঁই ও জবার পাপড়ি দিয়ে সাজানো অপূর্ব পুষ্পবৃত্ত।',
      },
      diyaName: { en: 'Bronze Nilavilakku & Chirath', hi: 'निलाविलाक्कु व चिराथु दीप', bn: 'পিতলের নিলাভিলাক্কু' },
      diyaDesc: {
        en: 'Multi-wick tall bell-metal Nilavilakku glowing with pure coconut oil.',
        hi: 'नारियल के तेल से जलता कांस्य का ऊंचा निलाविलाक्कु और छोटे चिराथु दीप।',
        bn: 'নারকেল তেলে প্রজ্বলিত উঁচু ঐতিহ্যবাহী কাঁসার প্রদীপ।',
      },
      toranDesc: {
        en: 'Tender coconut fronds (Kuruthola) woven on the entrance arch.',
        hi: 'नारियल के कोमल पत्तों (कुरुतोला) से बना प्राकृतिक तोरण।',
        bn: 'কচি নারকেল পাতার বোনা প্রাকৃতিক তোরণ।',
      },
    },
    keyTraditions: [
      {
        icon: '🪔',
        title: {
          en: 'Lighting the Central Nilavilakku',
          hi: 'केंद्रीय निलाविलाक्कु का प्रज्वलन',
          bn: 'নিলাভিলাক্কু প্রদীপ প্রজ্বলন',
        },
        why: {
          en: 'The eldest woman lights the central multi-wick bell-metal lamp at dusk with coconut oil, chanting prayers for auspicious light.',
          hi: 'घर की वरिष्ठ महिला शाम को आंगन में निलाविलाक्कु प्रज्वलित कर परिवार के कल्याण की प्रार्थना करती हैं।',
          bn: 'গৃহকর্ত্রী সন্ধ্যায় উঠোনে নিলাভিলাক্কুর পাঁচটি মুখ জ্বালিয়ে পরিবারের শান্তি কামনা করেন।',
        },
      },
      {
        icon: '🌿',
        title: {
          en: 'Dawn Herbal Oil Bath & Lehyam',
          hi: 'भोर का तेल स्नान एवं लेह्यम सेवन',
          bn: 'ভেষজ তেল স্নান ও লেহ্যম',
        },
        why: {
          en: 'Waking before dawn for an Ayurvedic coconut-herb bath followed by taking a spoonful of warming digestive lehyam.',
          hi: 'सूर्योदय से पहले औषधीय तेल से स्नान और शरीर की शक्ति बढ़ाने वाले लेह्यम का सेवन।',
          bn: 'ভোরে ভেষজ তেলে স্নান এবং পেটের সুস্থতায় পাচক মিষ্টি লেহ্যম গ্রহণ।',
        },
      },
      {
        icon: '🥞',
        title: {
          en: 'Neyyappam & Unniyappam Feast',
          hi: 'नैय्यप्पम व उन्नियप्पम का स्वाद',
          bn: 'নেয়াপ্পম ও উনিয়াপ্পমের স্বাদ',
        },
        why: {
          en: 'Frying sweet golden rice cakes prepared with dark jaggery, mashed bananas, roasted coconut bits, and cardamom in pure ghee.',
          hi: 'चावल, गुड़, केले और नारियल के टुकड़ों से बने स्वादिष्ट मीठे अप्पम।',
          bn: 'গুড়, কলা আর নারকেল কুচি দিয়ে ঘিয়ে ভাজা নরম তুলতুলে নেয়াপ্পম।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Warm Neyyappam & Unniyappam',
        hi: 'स्वादिष्ट नैय्यप्पम व उन्नियप्पम',
        bn: 'গরম নেয়াপ্পম ও উনিয়াপ্পম',
      },
      desc: {
        en: 'Crispy outer shell with melt-in-mouth core made of rice, jaggery, banana and toasted coconut.',
        hi: 'घी में तले गए चावल, गुड़ और पके केले के पारंपरिक स्वादिष्ट अप्पम।',
        bn: 'ঘিয়ে ভাজা মিষ্টি ও খাস্তা ঐতিহ্যবাহী কেরল মিষ্টান্ন।',
      },
    },
    highlight: {
      en: 'Traditional brass Nilavilakku lamps, warm oil bath, and sweet lehyam.',
      hi: 'पीतल के निलाविलाक्कु दीप, स्नेह भरा स्नान और पारंपरिक मिष्ठान।',
      bn: 'পিতলের প্রদীপ, ভোরের তেল স্নান ও ঐতিহ্যবাহী মিষ্টি।',
    },
  },
  {
    id: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    shortName: 'Andhra',
    hi: 'आंध्र प्रदेश',
    bn: 'অন্ধ্রপ্রদেশ',
    isUT: false,
    festivalName: {
      en: 'Deepavali & Kedareswara Vratham',
      hi: 'दीपावली एवं केदारेश्वर व्रतम',
      bn: 'দীপাবলি ও কেদারেশ্বর ব্রত',
    },
    introTagline: {
      en: 'From festive Muggu threshold art to Harathi blessings and sweet Ariselu, celebrate Andhra Pradesh’s rich Deepavali heritage.',
      hi: 'आंगन में सजे मुग्गू से लेकर आरती की थाल और अरिसलू की मिठास तक, अनुभव करें आंध्र प्रदेश का दीपोत्सव।',
      bn: 'উঠোনে আঁকা মুগ্গুর নকশা, আরতির থালা আর অরি সেলুর মিষ্টতা—অন্ধ্রপ্রদেশের দীপাবলি উৎসব।',
    },
    meaning: {
      "en": "Celebrating the triumph of righteousness through Queen Satyabhama and Lord Krishna defeating Narakasura, and inviting prosperity into clean homes.",
      "hi": "सत्यभामा और भगवान श्री कृष्ण द्वारा नरकासुर के वध और धर्म की पुनर्स्थापना का विजय पर्व।",
      "bn": "রাণী সত্যভামা ও শ্রীকৃষ্ণের হাতে নরকাসুরের বিনাশ এবং ধর্ম ও ন্যায়ের বিজয়ের স্মারক।"
},
    howObserved: {
      "en": "Early morning oil bath on Naraka Chaturdashi, drawing intricate rice-powder Muggulu at entranceways, lighting brass and clay deepalu, offering special prayers to Satyabhama and Sri Krishna, and enjoying sweet Pootharekulu and Boorelu.",
      "hi": "नरक चतुर्दशी की सुबह तेल स्नान, द्वार पर सुंदर मुग्गुलु (रंगोली) बनाना, मिट्टी और पीतल के दीप जलाना और सत्यभामा-कृष्ण पूजन।",
      "bn": "ভোরের স্নান, দরজায় চালের গুঁড়োর মুগ্গুলু নকশা, প্রদীপ প্রজ্বলন এবং সত্যভামা-শ্রীকৃষ্ণের বিশেষ পূজা নিবেদন।"
},
    whenObserved: {
      "en": "Aaswayuja Amavasya.",
      "hi": "आश्विन अमावस्या।",
      "bn": "আশ্বিন অমাবস্যা।"
},
    variations: {
      "en": "Coastal Andhra districts celebrate pre-dawn with vibrant sparklers; Rayalaseema villages focus on cattle worship and courtyard lamps; business communities conduct Lakshmi Puja.",
      "hi": "तटीय आंध्र में भोर में आतिशबाजी का उल्लास होता है; रायलसीमा में गो-पूजा होती है; व्यापारी लक्ष्मी पूजन करते हैं।",
      "bn": "উপকূলীয় অন্ধ্রে ভোরে আতশবাজি হয়, রায়ালসীমায় গ্রামীণ পূজা অনুষ্ঠিত হয়।"
},
    source: {
      "title": "Andhra Pradesh Tourism Official Portal",
      "url": "https://tourism.ap.gov.in",
      "institution": "Andhra Pradesh Tourism Development Corporation"
},
    decorTradition: {
      artName: { en: 'Muggu with Rangavalli', hi: 'मुग्गू रंगोली', bn: 'মুগ্গুর নকশা' },
      artDesc: {
        en: 'White lime powder and rice flour line drawings adorned with kumkum and turmeric.',
        hi: 'सफेद चूने व चावल के आटे से बनाई गई सुंदर मुग्गू रेखाएं, हल्दी-कुमकुम से सजी।',
        bn: 'চালের গুঁড়ো ও হলুদ-সিঁদুরে আঁকা মাঙ্গলিক মুগ্গুর নকশা।',
      },
      diyaName: { en: 'Pramida Clay Diyas', hi: 'प्रमिद मिट्टी के दीये', bn: 'প্রমিদ মাটির প্রদীপ' },
      diyaDesc: {
        en: 'Hand-pressed clay cups called Pramadalu glowing with sesame oil.',
        hi: 'हाथ से बने मिट्टी के प्रमिद दीप जो तिल के तेल से जगमगाते हैं।',
        bn: 'মাটির তৈরি প্রমিদ পাত্রে তিলের তেলের প্রদীপ।',
      },
      toranDesc: {
        en: 'Mango leaves and marigold strings (Toranalu) hung over door frames.',
        hi: 'द्वार पर बंधी आम के पत्तों की सुंदर तोरणालु।',
        bn: 'দরজার শীর্ষে আমপাতা ও গাঁদা ফুলের তোরণালু।',
      },
    },
    keyTraditions: [
      {
        icon: '🌺',
        title: {
          en: 'Kedareswara Vratham Prayers',
          hi: 'केदारेश्वर व्रतम पूजा',
          bn: 'কেদারেশ্বর ব্রত পূজা',
        },
        why: {
          en: 'Performed on Amavasya evening by couples and families invoking Lord Shiva for marital harmony, health, and uninterrupted wealth.',
          hi: 'अमावस्या की शाम भगवान शिव के केदारेश्वर रूप की पूजा दांपत्य सुख व समृद्धि के लिए की जाती है।',
          bn: 'সুখ-শান্তি ও দীর্ঘ দাম্পত্য জীবনের আশীর্বাদে শিবের কেদারেশ্বর ব্রত পালন।',
        },
      },
      {
        icon: '🪔',
        title: {
          en: 'Mangala Harathi to Family',
          hi: 'मंगल आरती का आशीर्वाद',
          bn: 'মাঙ্গলিক আরতি',
        },
        why: {
          en: 'Mothers and sisters wave brass lamps in circular motion blessing family members before dawn oil baths.',
          hi: 'घर की महिलाएं परिजनों को मंगल आरती देकर भोर के स्नान से पूर्व आशीर्वाद देती हैं।',
          bn: 'পরিবারের সকলের মঙ্গল কামনায় ভোরের আরতি ও স্নেহের আশীর্বাদ।',
        },
      },
      {
        icon: '🥮',
        title: {
          en: 'Ariselu & Boorelu Sweets',
          hi: 'अरिसलू एवं बुरेल्लू की मिठास',
          bn: 'অরি সেলু ও বুরেল্লু মিষ্টি',
        },
        why: {
          en: 'Preparing golden jaggery-rice pancakes crusted with sesame seeds (Ariselu) and sweet stuffed lentil dumplings (Boorelu).',
          hi: 'नए चावल, गुड़ और तिल से बना पारंपरिक अरिसलू जो आंध्र का मुख्य दिवाली व्यंजन है।',
          bn: 'নতুন চাল, গুড় ও তিলের তৈরি বিখ্যাত মিষ্টি অরি সেলু ও বুরেল্লু।',
        },
      },
    ],
    foodSpecialty: {
      name: {
        en: 'Sweet Ariselu & Pootharekulu',
        hi: 'पारंपरिक अरिसलू व पूथारेकुलु',
        bn: 'মিষ্টি অরি সেলু ও পুথারেকুলু',
      },
      desc: {
        en: 'Paper-thin rice starch sweet rolls filled with powdered sugar and ghee alongside golden sesame ariselu.',
        hi: 'कागज जैसी महीन परतदार पूथारेकुलु और तिल व गुड़ से बनी अरिसलू।',
        bn: 'পাতার মতো পাতলা চালের কাগজের রোলে তৈরি পুথারেকুলু ও অরি সেলু।',
      },
    },
    highlight: {
      en: 'Clay diyas, Harathi rituals, and fragrant jasmine garlands.',
      hi: 'मिट्टी के दीये, आरती अनुष्ठान और चमेली के फूलों की सुगंध।',
      bn: 'মাটির প্রদীপ, আরতি ও জুঁই ফুলের সুবাসে উৎসবমুখর ঘর।',
    },
  },
  {
    id: 'telangana',
    name: 'Telangana',
    shortName: 'Telangana',
    hi: 'तेलंगाना',
    bn: 'তেলেঙ্গানা',
    isUT: false,
    festivalName: {
      en: 'Deepavali Subhakankshalu & Lakshmi Pooja',
      hi: 'दीपावली शुभकांक्षलु एवं लक्ष्मी पूजा',
      bn: 'দীপাবলি শুভাকাঙ্ক্ষলু ও লক্ষ্মী পূজা',
    },
    introTagline: {
      en: 'From clay diyas shining on verandahs to vibrant Muggu designs and sharing crunchy Murukulu, celebrate Telangana’s festive light.',
      hi: 'आंगन में जगमगाते दीयों से लेकर रंग-बिरंगी मुग्गू और खस्ता मुरुगुलु तक, अनुभव करें तेलंगाना का दीपोत्सव।',
      bn: 'বারান্দায় সাজানো প্রদীপের মালা আর মুচমুচে মুরুগুলু মিষ্টি—তেলেঙ্গানার আলোকময় উৎসব।',
    },
    meaning: {
      "en": "Celebration of light and victory, culminating the festive autumn season following Bathukamma and Dasara, honoring Kedara Gauri.",
      "hi": "बथुकम्मा और दशहरे के बाद दीपोत्सव का उल्लास और केदार गौरी की पावन कृपा का वंदन।",
      "bn": "বাথুকাম্মা ও দশেরার পর অন্ধকারের ওপর আলোর বিজয় এবং কেদার গৌরীর কৃপা প্রার্থনা।"
},
    howObserved: {
      "en": "Lighting clay lamps on verandas, decorating thresholds with floral and lime-powder Muggulu, Lakshmi Puja in homes and commercial centers, observing Kedareshwara Vratham, and sharing Sunnundalu and Ariselu.",
      "hi": "दहलीज पर मिट्टी के दीये जलाना, मुग्गुलु बनाना, शाम को महालक्ष्मी पूजन और केदारेश्वर व्रत का अनुष्ठान।",
      "bn": "বারান্দায় মাটির প্রদীপ প্রজ্বলন, মুগ্গুলু অলংকরণ, সন্ধ্যায় লক্ষ্মীপূজা ও কেদারেশ্বর ব্রতের নিষ্ঠা।"
},
    whenObserved: {
      "en": "Aaswayuja Amavasya and Kartika Shukla Pratipada.",
      "hi": "आश्विन अमावस्या और कार्तिक शुक्ल प्रतिपदा।",
      "bn": "আশ্বিন অমাবস্যা ও কার্তিক শুক্ল প্রতিপদা।"
},
    variations: {
      "en": "Hyderabad observes grand commercial illumination and sweet exchanges; rural Telangana celebrates Kedareshwara Vratam with 21 knots of thread; farming communities perform Gow Puja.",
      "hi": "हैदराबाद में भव्य दीप सज्जा होती है; ग्रामीण तेलंगाना में २१ गांठों वाले धागे से केदारेश्वर व्रत मनाया जाता है।",
      "bn": "হায়দ্রাবাদে বর্ণাঢ্য আলোকসজ্জা হয় এবং গ্রামীণ তেলেঙ্গানায় কেদারেশ্বর ব্রত ও গো-পূজা পালিত হয়।"
},
    source: {
      "title": "Telangana Tourism Official Portal",
      "url": "https://tourism.telangana.gov.in",
      "institution": "Telangana State Tourism Development Corporation"
},
    decorTradition: {
      artName: { en: 'Muggu with Rangavalli', hi: 'मुग्गू रंगोली', bn: 'মুগ্গুর নকশা' },
      artDesc: { en: 'Symmetric lime and chalk floor art.', hi: 'आंगन में सजी सुंदर मुग्गू रंगोली।', bn: 'উঠোনে আঁকা সুন্দর মুগ্গুর আলপনা।' },
      diyaName: { en: 'Mitti Pramadalu', hi: 'मिट्टी के प्रमिद', bn: 'মাটির প্রমিদ প্রদীপ' },
      diyaDesc: { en: 'Terracotta lamps burning with castor or sesame oil.', hi: 'तिल के तेल से जलते मिट्टी के दीपक।', bn: 'তিলের তেলে প্রজ্বলিত মাটির প্রদীপ।' },
      toranDesc: { en: 'Mango leaves and marigold Toranalu.', hi: 'आम व गेंदे के पत्तों का तोरण।', bn: 'আমপাতা ও গাঁদা ফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🪔',
        title: { en: 'Laxmi Pooja with Silver Coins', hi: 'चांदी के सिक्कों से लक्ष्मी पूजा', bn: 'রুপোর মুদ্রায় লক্ষ্মী পূজা' },
        why: {
          en: 'Families place silver coins in bowls of raw milk and honey, chanting prayers for abundance.',
          hi: 'दूध और शहद में चांदी के सिक्के रखकर मां लक्ष्मी की पूजा की जाती है।',
          bn: 'দুধ ও মধুর পাত্রে রুপোর মুদ্রা রেখে সমৃদ্ধির প্রার্থনা।',
        },
      },
      {
        icon: '🍪',
        title: { en: 'Sakinalu & Murukulu Savories', hi: 'सकिनालू व मुरुगुलु', bn: 'সাকিনালু ও মুরুগুলু' },
        why: {
          en: 'Making spiral rice flour crispies seasoned with carom and sesame seeds.',
          hi: 'चावल के आटे, अजवाइन और तिल से बने कुरकुरे पारंपरिक सकिनालू।',
          bn: 'চালের গুঁড়ো ও তিলে তৈরি কুড়মুড়ে ঐতিহ্যবাহী সাকিনালু।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Sakinalu & Ariselu', hi: 'सकिनालू व अरिसलू', bn: 'সাকিনালু ও অরি সেলু' },
      desc: { en: 'Crispy sesame-studded rice swirls and sweet jaggery pancakes.', hi: 'तिल वाले कुरकुरे सकिनालू और मीठे अरिसलू।', bn: 'তিল দেওয়া মুচমুচে সাকিনালু ও মিষ্টি অরি সেলু।' },
    },
    highlight: {
      en: 'Glow of terracotta diyas, floral rangolis, and festive sweet ariselu.',
      hi: 'मिट्टी के दीपकों की कतारें, फूलों की रंगोली और स्वादिष्ट अरिसलू।',
      bn: 'মাটির প্রদীপের মালা, ফুলের আলপনা ও সুস্বাদু অরি সেলু মিষ্টি।',
    },
  },
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    shortName: 'Madhya Pradesh',
    hi: 'मध्य प्रदेश',
    bn: 'মধ্যপ্রদেশ',
    isUT: false,
    festivalName: {
      en: 'Dhanteras to Bhai Dooj Mahotsav',
      hi: 'धनतेरस से भाई दूज तक का पंचमहोत्सव',
      bn: 'ধনতেরাস থেকে ভাইফোঁটা পঞ্চমহোৎসব',
    },
    introTagline: {
      en: 'From the Malwa Mandana floor art to Govardhan hill sculptures and rich Mawa Bati, discover the heart of India’s Diwali.',
      hi: 'मालवा की मांडना कला से लेकर गोवर्धन पूजन और मावा बाटी तक, अनुभव करें भारत के हृदय स्थल की पावन दिवाली।',
      bn: 'মালবার মাণ্ডনা শিল্প থেকে গোবর্ধন পূজা আর সুস্বাদু মাওয়া বাটি—ভারতের প্রাণকেন্দ্রের উৎসব।',
    },
    meaning: {
      "en": "Illuminating homes with joy, worshipping Goddess Lakshmi, and rural cattle reverence during Govardhan Puja.",
      "hi": "दीपों से गृह-सज्जा, महालक्ष्मी पूजन और गोवर्धन पूजा पर ग्रामीण पशु-धन के प्रति कृतज्ञता।",
      "bn": "ঘরে ঘরে আলোকসজ্জা, মহালক্ষ্মী পূজা এবং গোবর্ধন পূজায় গবাদি পশুর প্রতি কৃতজ্ঞতা প্রকাশ।"
},
    howObserved: {
      "en": "Earthen diyas line house roofs and verandas. On Diwali evening, families perform Lakshmi-Ganesh Puja. The next morning, Govardhan Puja is celebrated with cow-dung hillocks, and the Gaida festival sees decorated cattle and folk songs.",
      "hi": "छतों और आंगनों में मिट्टी के दीये जगमगाते हैं। शाम को लक्ष्मी-गणेश पूजन और अगले दिन गोवर्धन पूजा पर गायों को सजाकर गैड़ा उत्सव मनाया जाता है।",
      "bn": "ছাদে ও উঠোনে মাটির প্রদীপ জ্বলে। সন্ধ্যায় লক্ষ্মীপূজা এবং পরদিন গোবর্ধন পূজায় গরুদের সাজিয়ে লোকনৃত্য অনুষ্ঠিত হয়।"
},
    whenObserved: {
      "en": "Kartik Krishna Trayodashi to Shukla Dwitiya.",
      "hi": "कार्तिक कृष्ण त्रयोदशी से शुक्ल द्वितीया।",
      "bn": "কার্তিক কৃষ্ণ ত্রয়োদশী থেকে শুক্ল দ্বিতীয়া।"
},
    variations: {
      "en": "Malwa and Nimar celebrate with traditional Annakut and Govardhan Puja; Bundelkhand observes lively Diwari folk dances with peacock feathers; Ujjain Mahakal Temple holds sacred pre-dawn aartis.",
      "hi": "मालवा में अन्नकूट सजता है; बुंदेलखंड में मोरपंख लेकर दिवारी लोकनृत्य होता है; उज्जैन में विशेष भस्म आरती होती है।",
      "bn": "মালব অঞ্চলে অন্নকূট হয়, বুন্দেলখণ্ডে ময়ূরের পালক নিয়ে দিওয়ারি নৃত্য হয় এবং উজ্জয়িনীর মহাকাল মন্দিরে বিশেষ আরতি হয়।"
},
    source: {
      "title": "Madhya Pradesh Tourism Official Portal",
      "url": "https://www.mptourism.com",
      "institution": "Madhya Pradesh Tourism Board"
},
    decorTradition: {
      artName: { en: 'Mandana & Chauka Folk Art', hi: 'मांडना व चौका कला', bn: 'মাণ্ডনা ও চৌকা লোকশিল্প' },
      artDesc: { en: 'Red clay and white chalk floor patterns.', hi: 'गेरू और खड़िया से आंगन में बनी मांडना।', bn: 'গেরু মাটি ও খড়ির সাদা আলপনা।' },
      diyaName: { en: 'Terracotta Diyas', hi: 'माटी के दीपक', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Mustard oil lamps arranged across terraces.', hi: 'मुंडेरों पर कतार में जलते मिट्टी के दीये।', bn: 'ছাদের আলসে সাজানো সরষের তেলের প্রদীপ।' },
      toranDesc: { en: 'Fresh marigolds and mango leaves.', hi: 'गेंदे और आम के पत्तों का तोरण।', bn: 'গাঁদা ফুল ও আমপাতার তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '⛰️',
        title: { en: 'Govardhan Hill Art', hi: 'गोवर्धन पूजन', bn: 'গোবর্ধন পূজা' },
        why: {
          en: 'Sculpting cowdung models of Lord Krishna lifting Mount Govardhan to celebrate ecological balance.',
          hi: 'प्रकृति और गौ-वंश के सम्मान में गोवर्धन पर्वत की सुंदर आकृति बनाकर पूजा की जाती है।',
          bn: 'প্রকৃতির রক্ষক শ্রীকৃষ্ণের গোবর্ধন ধারণের স্মরণে গোবর্ধন পূজা।',
        },
      },
      {
        icon: '🍬',
        title: { en: 'Sharing Mawa Bati', hi: 'मावा बाटी का भोग', bn: 'মাওয়া বাটি মিষ্টি' },
        why: {
          en: 'Fried condensed milk spheres stuffed with dry fruits and soaked in saffron syrup.',
          hi: 'मेवों से भरी और चाशनी में डूबी मावा बाटी जो मध्य प्रदेश की पहचान है।',
          bn: 'খোয়া ক্ষীর ও ড্রাই ফ্রুটসের পুরভরা রসে ডোবানো মাওয়া বাটি।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Mawa Bati & Gulab Jamun', hi: 'शाही मावा बाटी', bn: 'মাওয়া বাটি' },
      desc: { en: 'Rich khoya dumpling stuffed with pistachios and soaked in saffron.', hi: 'पिस्ता और इलायची से भरी मावा बाटी।', bn: 'পেস্তা ও জাফরানে ভরা সুস্বাদু মিষ্টি।' },
    },
    highlight: {
      en: 'Mandana floor paintings, glowing clay lamps, and Mawa Bati sweets.',
      hi: 'पारंपरिक मांडना कला, आंगन में मिट्टी के दीये और मावा बाटी।',
      bn: 'ঐতিহ্যবাহী মাণ্ডনা আলপনা, মাটির প্রদীপ ও সুস্বাদু মিষ্টি।',
    },
  },
  {
    id: 'haryana',
    name: 'Haryana',
    shortName: 'Haryana',
    hi: 'हरियाणा',
    bn: 'হরিয়ানা',
    isUT: false,
    festivalName: {
      en: 'Govardhan & Kheel-Batasha Festivities',
      hi: 'गोवर्धन एवं खील-बताशे की मिठास',
      bn: 'গোবর্ধন ও খিল-বাতাসার মিষ্টি উৎসব',
    },
    introTagline: {
      en: 'From pure desi ghee sweets to Govardhan cattle reverence and rooftop diyas, celebrate Haryana’s warm festive cheer.',
      hi: 'शुद्ध देसी घी की मिठाइयों से लेकर गोवर्धन पूजा और छतों पर जलते दीयों तक, अनुभव करें हरियाणा का उल्लास।',
      bn: 'ঘিয়ের মিষ্টি, গোবর্ধন পূজা আর ছাদের প্রদীপের আলো—হরিয়ানার আন্তরিক উৎসব।',
    },
    meaning: {
      "en": "Celebrating agricultural harvest blessings, Ram’s return, and deep reverence for livestock on Govardhan day.",
      "hi": "कृषि उपज की संपन्नता, प्रभु राम के आगमन की खुशी और गोवर्धन पर पशु-धन के प्रति श्रद्धा।",
      "bn": "কৃষিজ ফসলের প্রাচুর্য, শ্রী রামের আগমন এবং গোবর্ধন পূজায় গো-মাতার প্রতি গভীর শ্রদ্ধা।"
},
    howObserved: {
      "en": "Lighting mustard oil diyas across mud-plastered courtyards and roof parapets. Evening Lakshmi-Ganesh Puja with sugar batashe, followed next day by building cow-dung Govardhan hillocks and sharing fresh makhan and pinnis.",
      "hi": "सरसों के तेल के दीये जलाना, लक्ष्मी-गणेश पूजन, और अगले दिन आंगन में गोवर्धन बाबा बनाकर ताजे मक्खन-रोटी का भोग लगाना।",
      "bn": "মাটির প্রদীপে আলো জ্বালানো, লক্ষ্মী-গণেশ পূজা এবং পরদিন গোবর্ধন তৈরি করে মাখন ও পিন্নি নিবেদন।"
},
    whenObserved: {
      "en": "Kartik Amavasya and the following Shukla Pratipada.",
      "hi": "कार्तिक अमावस्या एवं अगले दिन शुक्ल प्रतिपदा।",
      "bn": "কার্তিক অমাবস্যা ও পরদিন শুক্ল প্রতিপদা।"
},
    variations: {
      "en": "Agrarian villages place tremendous emphasis on Govardhan day cattle adoration; urban centers like Gurugram observe modern communal light fairs; Kurukshetra hosts spiritual Deepdan at sacred tanks.",
      "hi": "ग्रामीण अंचलों में गोवर्धन पर गो-सेवा को सर्वोच्च स्थान मिलता है; कुरुक्षेत्र के ब्रह्मसरोवर पर पवित्र दीपदान होता है।",
      "bn": "গ্রামাঞ্চলে গোবর্ধন পূজায় গবাদি পশুর বিশেষ যত্ন নেওয়া হয় এবং কুরুক্ষেত্রে পবিত্র সরোবরে প্রদীপ ভাসানো হয়।"
},
    source: {
      "title": "Haryana Tourism Official Portal",
      "url": "https://haryanatourism.gov.in",
      "institution": "Haryana Tourism Corporation"
},
    decorTradition: {
      artName: { en: 'Chowk & Floral Rangoli', hi: 'चौक व रंगोली', bn: 'চক ও রঙ্গোলি' },
      artDesc: { en: 'Rice flour and dry color patterns.', hi: 'चावल के आटे से सजी रंगोली।', bn: 'চালের গুঁড়ো দিয়ে তৈরি নকশা।' },
      diyaName: { en: 'Mitti Ke Diye', hi: 'माटी के दीये', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Mustard oil clay lamps on roof edges.', hi: 'छत की मुंडेरों पर जलते दीपक।', bn: 'ছাদের আলসে সাজানো প্রদীপ।' },
      toranDesc: { en: 'Marigold and mango leaf garlands.', hi: 'गेंदे और आम का तोरण।', bn: 'গাঁদা ফুল ও আমপাতার তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🐄',
        title: { en: 'Gau Vandana & Annakoot', hi: 'गौ वंदना एवं अन्नकूट', bn: 'গো পূজা ও অন্নকূট' },
        why: {
          en: 'Bathing and decorating cows with natural colors, expressing agrarian gratitude.',
          hi: 'गायों को सजाकर अन्नकूट का भोग लगाया जाता है।',
          bn: 'গরুদের সাজিয়ে শস্যের নৈবেদ্য নিবেদন।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Ghee Pinni & Gond Ke Laddoo', hi: 'देसी घी की पिन्नी', bn: 'ঘিয়ের পিন্নি' },
      desc: { en: 'Nutritious wheat, jaggery and dry fruit pinnis.', hi: 'शुद्ध देसी घी और मेवों से बनी पिन्नी।', bn: 'খাঁটি ঘি ও বাদামে তৈরি পিন্নি।' },
    },
    highlight: {
      en: 'Earthen diyas, courtyard rangolis, and sharing sweet kheel-batashe.',
      hi: 'मिट्टी के दीये, घर-आंगन में रंगोली और शुद्ध देसी घी की मिठास।',
      bn: 'মাটির প্রদীপ, রঙিন আলপনা এবং আত্মীয়স্বজনদের মিষ্টি মুখ।',
    },
  },
  {
    id: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    shortName: 'Himachal',
    hi: 'हिमाचल प्रदेश',
    bn: 'হিমাচল প্রদেশ',
    isUT: false,
    festivalName: {
      en: 'Pahari Diwali & Budhi Diwali Traditions',
      hi: 'पहाड़ी दिवाली एवं बूढ़ी दिवाली की परंपरा',
      bn: 'পাহাড়ি দীপাবলি ও বুঢ়ী দীপাবলি',
    },
    introTagline: {
      en: 'From pine wood torches (mashals) illuminating misty trails to Budhi Diwali bonfires and walnut blessings, discover the hills.',
      hi: 'मशालों की सुनहरी रोशनी से लेकर बूढ़ी दिवाली के अलाव और अखरोट के शगुन तक, अनुभव करें हिमाचल का पर्व।',
      bn: 'পাইন কাঠের মশালের আলো আর বুঢ়ী দীপাবলির মেলা—পাহাড়ের বুকে স্নিগ্ধ দীপাবলি।',
    },
    meaning: {
      "en": "Himalayan mountain festival of lights and the ancient trans-Himalayan folk tradition of Budhi Diwali.",
      "hi": "पहाड़ी दीपोत्सव और हिमालय की प्राचीन लोक परंपरा \"बूढ़ी दिवाली\" का उल्लास।",
      "bn": "পাহাড়ের বুকে আলোর উৎসব এবং প্রাচীন লোকঐতিহ্য \"বুঢ়ী দীপাবলি\"।"
},
    howObserved: {
      "en": "Lighting clay lamps and resinous pine wood torches (Mashals). In several trans-Himalayan valleys (Sirmaur, Kullu), \"Budhi Diwali\" is celebrated one month later with bonfires, walnut throwing, traditional folk tales, and Nati dances.",
      "hi": "मिट्टी के दीये और पाइन की मशालें जलाई जाती हैं। सिरमौर और कुल्लू के कई क्षेत्रों में एक महीने बाद \"बूढ़ी दिवाली\" अलाव, अखरोट बांटने और नाटी नृत्य संग मनती है।",
      "bn": "মাটির প্রদীপ ও পাইন কাঠের মশাল প্রজ্বলন। সিরমৌর ও কুল্লু অঞ্চলে এক মাস পরে \"বুঢ়ী দীপাবলি\"তে আগুন জ্বালিয়ে ও নাটি নৃত্যে উৎসব হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya for traditional Diwali; Margashirsha Amavasya (one month later) for Budhi Diwali in select valleys.",
      "hi": "कार्तिक अमावस्या पर मुख्य दिवाली; कुछ घाटियों में एक माह बाद मार्गशीर्ष अमावस्या पर बूढ़ी दिवाली।",
      "bn": "কার্তিক অমাবস্যায় মূল দীপাবলি এবং নির্বাচিত উপত্যকায় এক মাস পর মার্গশীর্ষ অমাবস্যায় বুঢ়ী দীপাবলি।"
},
    variations: {
      "en": "Pahari valley villages carry torchlight processions (Mashodi); Kangra and Mandi follow traditional Lakshmi pujan; Gaddi pastoralists offer prayers for their herds before winter descent.",
      "hi": "पहाड़ी गांवों में मशालों का जुलूस निकलता है; कांगड़ा व मंडी में लक्ष्मी पूजन होता है; गद्दी चरवाहे पशुओं की सुरक्षा की प्रार्थना करते हैं।",
      "bn": "পাহাড়ি গ্রামে মশালের শোভাযাত্রা হয় এবং কাংড়ায় ঘরোয়া লক্ষ্মীপূজা অনুষ্ঠিত হয়।"
},
    source: {
      "title": "Himachal Tourism Official Portal",
      "url": "https://himachaltourism.gov.in",
      "institution": "Himachal Pradesh Tourism Development Corporation"
},
    decorTradition: {
      artName: { en: 'Pahari Floor Art', hi: 'पहाड़ी देहरी कला', bn: 'পাহাড়ি আলপনা' },
      artDesc: { en: 'White flour patterns on wooden thresholds.', hi: 'लकड़ी की चौखट पर सजी सफेद रंगोली।', bn: 'কাঠের চৌকাঠে চালের গুঁড়োর নকশা।' },
      diyaName: { en: 'Clay Diyas & Pine Mashals', hi: 'माटी के दीये व मशाल', bn: 'মাটির প্রদীপ ও মশাল' },
      diyaDesc: { en: 'Mustard oil lamps and resinous torches.', hi: 'पाइन की लकड़ी की मशालें व दीये।', bn: 'পাইন কাঠের মশাল ও প্রদীপ।' },
      toranDesc: { en: 'Pine twigs and yellow wildflowers.', hi: 'पाइन और पहाड़ी फूलों का तोरण।', bn: 'পাইন ও পাহাড়ি বুনোফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🪵',
        title: { en: 'Lighting Pine Wood Mashals', hi: 'पाइन मशाल प्रज्वलन', bn: 'পাইন কাঠের মশাল' },
        why: {
          en: 'Carrying fragrant burning pine torches through mountain villages to light dark paths.',
          hi: 'पहाड़ों के रास्तों को रोशन करने के लिए पाइन की मशालें जलाई जाती हैं।',
          bn: 'পাহাড়ের আঁধার পথ আলোকিত করতে রজনযুক্ত পাইন কাঠের মশাল জ্বালানো।',
        },
      },
      {
        icon: '🌰',
        title: { en: 'Exchanging Wild Walnuts', hi: 'अखरोट का शगुन', bn: 'আখরোটের উপহার' },
        why: {
          en: 'Offering locally gathered walnuts and sweet babru as symbols of health and endurance.',
          hi: 'अखरोट और मीठे बबरू बांटकर स्वास्थ्य की मंगलकामना की जाती है।',
          bn: 'সুস্বাস্থ্য ও দীর্ঘায়ুর প্রতীক হিসেবে আখরোট বিনিময়।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Babru & Sweet Siddu', hi: 'मीठे बबरू व सिड्डू', bn: 'মিষ্টি ববরু ও সিড্ডু' },
      desc: { en: 'Traditional yeast-leavened sweet wheat cakes.', hi: 'पारंपरिक हिमाचली मीठे बबरू।', bn: 'ঐতিহ্যবাহী পাহাড়ি মিষ্টি ববরু।' },
    },
    highlight: {
      en: 'Pine wood torches (mashals), walnut blessings, and cedar warmth.',
      hi: 'मशालों की सुनहरी रोशनी, अखरोट के शगुन और पहाड़ों की ठंड में गरमाहट।',
      bn: 'কাঠের মশালের দীপ্তি, আখরোটের আশীর্বাদ ও পাহাড়ি উষ্ণতা।',
    },
  },
  {
    id: 'uttarakhand',
    name: 'Uttarakhand',
    shortName: 'Uttarakhand',
    hi: 'उत्तराखंड',
    bn: 'উত্তরাখণ্ড',
    isUT: false,
    festivalName: {
      en: 'Devbhoomi Diwali & Aipan Folk Art',
      hi: 'देवभूमि दिवाली एवं ऐपण लोक कला',
      bn: 'দেবভূমি দীপাবলি ও অয়পন লোকশিল্প',
    },
    introTagline: {
      en: 'From the sacred red ochre and white rice Aipan patterns to temple bells echoing in the valleys, celebrate Devbhoomi.',
      hi: 'गेरू और चावल के घोल से सजी ऐपण कला से लेकर घाटियों में गूंजती मंदिर की घंटियों तक, अनुभव करें देवभूमि का पावन पर्व।',
      bn: 'গেরুয়া মাটি আর চালের লেইয়ে আঁকা অয়পন আলপনা—দেবভূমির পূতপবিত্র দীপাবলি।',
    },
    meaning: {
      "en": "Sanctifying mountain hearths with red ochre and rice Aipan art, honoring ancestors, and celebrating regional Bagwal.",
      "hi": "गेरू और बिस्वार की ऐपण कला से देहरी की शुद्धि, कुलदेवता की अर्चना और लोक पर्व बग्वाल।",
      "bn": "গেরুয়া মাটি ও চালের লেইয়ের অয়পন শিল্পে গৃহের পবিত্রতা এবং ঐতিহ্যবাহী বগোয়াল উৎসব।"
},
    howObserved: {
      "en": "Women create sacred Aipan patterns on doorsteps using red clay (Geru) and rice paste (Biswar). Mustard oil clay diyas illuminate hillsides. Singori and Bal Mithai are offered. Select valleys also celebrate \"Igaas Bagwal\" 11 days after Diwali.",
      "hi": "गेरू और चावल के बिस्वार से ऐपण बनाई जाती है। सरसों के तेल के दीये जलते हैं और बाल मिठाई बांटी जाती है। कई घाटियों में ११ दिन बाद ईगास बग्वाल भी मनती है।",
      "bn": "গেরুয়া ও চালের লেইয়ে অয়পন নকশা আঁকা হয়। মাটির প্রদীপ জ্বলে এবং বাল মিঠাই খাওয়া হয়। ১১ দিন পর ঈগাস বগোয়াল উদযাপিত হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya (Diwali); select valleys observe Igaas Bagwal on Kartik Shukla Ekadashi.",
      "hi": "कार्तिक अमावस्या; कुछ क्षेत्रों में कार्तिक शुक्ल एकादशी पर ईगास बग्वाल।",
      "bn": "কার্তিক অমাবস্যা; কিছু অঞ্চলে কার্তিক শুক্ল একাদশীতে ঈগাস বগোয়াল।"
},
    variations: {
      "en": "Kumaon is famous for geometric Chowki and Aipan patterns; Garhwal celebrates Igaas Bagwal with Bhelo (pine torch dancing); Jaunsar-Bawar features distinctive folk songs.",
      "hi": "कुमाऊं में ऐपण और चौकियों का विशेष महत्व है; गढ़वाल में भैलो (पाइन की मशाल) घुमाकर ईगास मनती है।",
      "bn": "কুমাউনে অয়পন নকশা প্রধান এবং গাড়োয়ালে পাইনের মশাল নাচিয়ে ঈগাস পালিত হয়।"
},
    source: {
      "title": "Uttarakhand Tourism Development Board",
      "url": "https://uttarakhandtourism.gov.in",
      "institution": "Department of Tourism, Government of Uttarakhand"
},
    decorTradition: {
      artName: { en: 'Aipan Folk Art (ऐपण)', hi: 'ऐपण लोक कला', bn: 'ঐতিহ্যবাহী অয়পন' },
      artDesc: {
        en: 'Sacred red ochre (Geru) washed base with pure white rice-flour (Biswar) linear motifs.',
        hi: 'गेरू के लाल धरातल पर चावल के बिस्वार से उकेरी गई सुंदर ऐपण कला।',
        bn: 'গেরুয়া মাটির ওপরে চালের গুঁড়োর সাদা রেখায় আঁকা পবিত্র অয়পন নকশা।',
      },
      diyaName: { en: 'Mitti Ke Diye', hi: 'माटी के दीपक', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Clay lamps burning along thresholds and cowsheds.', hi: 'देहरी और गौशाला में सजे माटी के दीप।', bn: 'চৌকাঠ ও গোয়ালঘরে রাখা মাটির প্রদীপ।' },
      toranDesc: { en: 'Pine sprigs and yellow marigolds.', hi: 'पाइन और गेंदे का तोरण।', bn: 'পাইন ও গাঁদা ফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🎨',
        title: { en: 'Drawing Sacred Aipan Chowki', hi: 'पवित्र ऐपण चौकी आलेखन', bn: 'পবিত্র অয়পন চৌকি' },
        why: {
          en: 'Painting Lakshmi Chowki with geometric lines to invite peace and ward off evil.',
          hi: 'लक्ष्मी चौकी की पवित्र रेखाएं खींचकर सुख-समृद्धि का आह्वान किया जाता है।',
          bn: 'মা লক্ষ্মীর পাদপদ্ম ও চৌকি এঁকে গৃহকে পবিত্র করা।',
        },
      },
      {
        icon: '🍬',
        title: { en: 'Singhori & Bal Mithai Sharing', hi: 'बाल मिठाई व सिंघोड़ी', bn: 'বাল মিঠাই ও সিংঘোরি' },
        why: {
          en: 'Exchanging Kumaon’s famous roasted khoya Bal Mithai coated in sugar pearls.',
          hi: 'चीनी के दानों से लिपटी प्रसिद्ध बाल मिठाई और मालू के पत्तों में लिपटी सिंघोड़ी।',
          bn: 'চিনির দানায় মোড়া বিখ্যাত বাল মিঠাইয়ের মিষ্টি মুখ।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Bal Mithai & Singhori', hi: 'अल्मोड़ा की बाल मिठाई', bn: 'আলমোড়ার বাল মিঠাই' },
      desc: { en: 'Caramelized khoya fudge wrapped in sugar beads.', hi: 'केरेमल मावे की बाल मिठाई।', bn: 'ক্যারামেল ক্ষীর ও চিনির দানার বাল মিঠাই।' },
    },
    highlight: {
      en: 'Red and white rice-paste Aipan drawings and temple bell chimes.',
      hi: 'गेरू और बिस्वार से सजी सुंदर ऐपण कला और मंदिरों के घंटे।',
      bn: 'গেরুয়া ও চালের গুঁড়ির অয়পন নকশা এবং মন্দিরের ঘণ্টার ধ্বনি।',
    },
  },
  {
    id: 'goa',
    name: 'Goa',
    shortName: 'Goa',
    hi: 'गोवा',
    bn: 'গোয়া',
    isUT: false,
    festivalName: {
      en: 'Narkasur Vadh & Diwali Dawn',
      hi: 'नरकासुर वध एवं दिवाली प्रभात',
      bn: 'নরকাসুর বধ ও দীপাবলি প্রভাত',
    },
    introTagline: {
      en: 'From vibrant dawn effigies of Narkasur to fragrant Ubtan baths and five sweet styles of beaten rice (Fov), celebrate vibrant Goa.',
      hi: 'भोर में नरकासुर के पुतलों के दहन से लेकर उबटन स्नान और पांच प्रकार के फोव (पोहा) तक, अनुभव करें गोवा की अनोखी दिवाली।',
      bn: 'ভোরে নরকাসুর দহন থেকে সুগন্ধি স্নান আর পাঁচ রকমের সুস্বাদু পোহার পদ—গোয়ার অনন্য উৎসব।',
    },
    meaning: {
      "en": "Commemorating Lord Krishna’s destruction of the tyrannical demon Narakasura at the break of dawn, welcoming liberation and purity.",
      "hi": "भगवान श्री कृष्ण द्वारा भोर के समय नरकासुर के वध और संसार को अत्याचार से मुक्ति दिलाने की स्मृति।",
      "bn": "ভোরবেলায় শ্রীকৃষ্ণের হাতে অত্যাচারী নরকাসুরের বিনাশ ও মুক্তির আনন্দবার্তা।"
},
    howObserved: {
      "en": "Pre-dawn burning of giant crafted effigies of Narakasura (Narakasur Dahan) accompanied by cheers. Families then take an aromatic herbal bath (Utane snan), visit temples, and enjoy a feast of five varieties of beaten rice (Fov / Poha) prepared sweet and savory.",
      "hi": "भोर से पूर्व नरकासुर के विशाल पुतलों का दहन। इसके बाद सुगंधित उबटन से स्नान, मंदिर दर्शन और पांच प्रकार के पोहे (फोव) का पारंपरिक स्वाद।",
      "bn": "ভোরের আগে নরকাসুরের বিশাল কুশপুত্তলিকা দাহ। এরপর সুগন্ধি স্নান এবং মিষ্টি ও ঝাল পাঁচ রকমের ঐতিহ্যবাহী চিঁড়ে (ফোভ) খাওয়া।"
},
    whenObserved: {
      "en": "Naraka Chaturdashi (Kartik Krishna Chaturdashi) pre-dawn.",
      "hi": "नरक चतुर्दशी की भोर।",
      "bn": "নরক চতুর্দশীর ভোর।"
},
    variations: {
      "en": "Village youth compete in crafting massive animated Narakasura effigies; Saraswat Brahmin households observe five specific Fov preparations; Hindu and Christian neighbors share traditional festive sweets.",
      "hi": "युवा नरकासुर के विशाल पुतले बनाने की प्रतियोगिता करते हैं; सारस्वत ब्राह्मण घरों में पांच प्रकार के फोव बनते हैं; पड़ोसी आपस में मिठाइयां बांटते हैं।",
      "bn": "গ্রামের যুবকরা নরকাসুরের বিশাল পুতুল তৈরি করে প্রতিযোগিতায় নামে এবং ঘরে ঘরে হরেক রকমের ফোভ তৈরি হয়।"
},
    source: {
      "title": "Goa Tourism Development Corporation",
      "url": "https://goatourism.gov.in",
      "institution": "Department of Tourism, Government of Goa"
},
    decorTradition: {
      artName: { en: 'Rangoli & Akash Kandil', hi: 'रंगोली व आकाश कंदील', bn: 'রঙ্গোলি ও আকাশ লণ্ঠন' },
      artDesc: { en: 'Colorful rangoli and floating paper lanterns.', hi: 'रंग-बिरंगी रंगोली और सुंदर आकाश कंदील।', bn: 'রঙিন রঙ্গোলি ও ঝোলানো কাগজের আকাশ লণ্ঠন।' },
      diyaName: { en: 'Mitti Panatis', hi: 'माटी की पणतियां', bn: 'মাটির পনতি' },
      diyaDesc: { en: 'Earthen cups along balcaos and verandahs.', hi: 'बालकनी और दहलीज पर सजी पणतियां।', bn: 'বারান্দায় সাজানো মাটির প্রদীপ।' },
      toranDesc: { en: 'Mango leaves and coastal marigolds.', hi: 'आम और गेंदे का तोरण।', bn: 'আমপাতা ও গাঁদা ফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '👹',
        title: { en: 'Narkasur Effigy Burning at Dawn', hi: 'भोर में नरकासुर पुतला दहन', bn: 'ভোরে নরকাসুর দহন' },
        why: {
          en: 'Communities build creative effigies of demon Narkasur, burning them before sunrise on Naraka Chaturdashi.',
          hi: 'बुराई पर अच्छाई की विजय के प्रतीक रूप में नरकासुर के विशाल पुतलों का दहन किया जाता है।',
          bn: 'অশুভ শক্তির বিনাশ স্মরণে সূর্যোদয়ের আগে নরকাসুরের কুশপুতুল দহন।',
        },
      },
      {
        icon: '🥣',
        title: { en: 'Five Styles of Festive Fov (Poha)', hi: 'पांच प्रकार के फोव (पोहा)', bn: 'পাঁচ রকম পোহার ভোগ' },
        why: {
          en: 'Families prepare beaten rice in 5 unique styles: sweet coconut jaggery, milk, curds, spicy, and ginger-infused.',
          hi: 'दूध, गुड़, नारियल और मसालों से पांच अलग-अलग स्वाद में पोहा तैयार किया जाता है।',
          bn: 'দুধ, গুড়, নারকেল ও ঝাল দিয়ে পাঁচ রকমের ঐতিহ্যবাহী পোহার পদ।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Goan Festive Fov (Poha) & Nevreo', hi: 'गोवन फोव व नेवरेयो (करंजी)', bn: 'গোয়ান পোহার পদ ও নেভরেও' },
      desc: { en: 'Sweet beaten rice soaked in coconut milk and crisp sweet dumplings.', hi: 'नारियल के दूध में भीगा मीठा फोव।', bn: 'নারকেলের দুধে মিষ্টি পোহা ও খাস্তা নেভরেও।' },
    },
    highlight: {
      en: 'Grand Narkasur effigies at dawn, sweet poha treats, and oil baths.',
      hi: 'प्रभात में नरकासुर दहन, पोहे के स्वादिष्ट व्यंजन और स्नेह।',
      bn: 'ভোরে নরকাসুর দহন, পোহার মিষ্টি পদ ও প্রদীপের মেলা।',
    },
  },
  {
    id: 'jharkhand',
    name: 'Jharkhand',
    shortName: 'Jharkhand',
    hi: 'झारखंड',
    bn: 'ঝাড়খণ্ড',
    isUT: false,
    festivalName: {
      en: 'Sohrai Art & Diwali Festivities',
      hi: 'सोहराय कला एवं दीपोत्सव',
      bn: 'সোহরায় শিল্প ও দীপাবলি',
    },
    introTagline: {
      en: 'From indigenous Sohrai earth murals painted with natural clays to honoring cattle and lighting earthen lamps, feel Jharkhand’s warmth.',
      hi: 'प्राकृतिक माटी से बनी सोहराय भित्ति कला से लेकर पशु धन के पूजन तक, अनुभव करें झारखंड का प्राकृतिक उत्सव।',
      bn: 'দেওয়ালে মাটির তৈরি সোহরায় চিত্রকলা আর গবাদি পশুর পূজা—ঝাড়খণ্ডের অনন্য মাটির উৎসব।',
    },
    meaning: {
      "en": "Celebrating light and indigenous agrarian heritage during the festive autumn season, closely associated with the cattle reverence festival of Sohrai.",
      "hi": "प्रकाश का उत्सव और सोहराय पर्व के माध्यम से पशु-धन और प्रकृति के प्रति आभार।",
      "bn": "আলোর উৎসব এবং সোহারাই লোকসংস্কৃতির মাধ্যমে গবাদি পশু ও প্রকৃতির বন্দনা।"
},
    howObserved: {
      "en": "Homes are illuminated with earthen diyas. While urban areas observe Lakshmi Puja, indigenous communities (Santhal, Munda, Oraon) celebrate Sohrai, decorating cattle, washing bullocks’ hooves with rice beer/water, and painting mud walls with natural Sohrai animal murals.",
      "hi": "घरों में मिट्टी के दीये जलाए जाते हैं। आदिवासी समुदाय सोहराय पर्व मनाते हैं, मवेशियों को सजाते हैं और घरों की कच्ची दीवारों पर सोहराय भित्तिचित्र बनाते हैं।",
      "bn": "ঘরে ঘরে মাটির প্রদীপ জ্বলে। আদিবাসী সমাজে সোহারাই পর্বে গবাদি পশুদের স্নান করিয়ে সাজানো হয় এবং মাটির দেওয়ালে সোহারাই চিত্র আঁকা হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya (Diwali) and Kartik Shukla Pratipada (Sohrai).",
      "hi": "कार्तिक अमावस्या एवं कार्तिक शुक्ल प्रतिपदा।",
      "bn": "কার্তিক অমাবস্যা ও কার্তিক শুক্ল প্রতিপদা।"
},
    variations: {
      "en": "Tribal villages in Hazaribagh paint breathtaking natural ochre, black, and white Sohrai murals; industrial cities like Ranchi and Jamshedpur celebrate Pan-Indian Lakshmi Puja and Kali Puja.",
      "hi": "हजारीबाग के गांवों में प्राकृतिक रंगों से सोहराय कला उकेरी जाती है; रांची व जमशेदपुर में भव्य लक्ष्मी व काली पूजा होती है।",
      "bn": "হাজারিবাগের গ্রামে প্রাকৃতিক রঙে মাটির দেওয়ালে সোহারাই আঁকা হয়; রাঁচিতে শ্যামাপূজা ও লক্ষ্মীপূজা হয়।"
},
    source: {
      "title": "Jharkhand Tourism Official Portal",
      "url": "https://tourism.jharkhand.gov.in",
      "institution": "Jharkhand Tourism Development Corporation"
},
    decorTradition: {
      artName: { en: 'Sohrai Wall Murals', hi: 'सोहराय भित्ति चित्रकला', bn: 'সোহরায় দেয়ালচিত্র' },
      artDesc: { en: 'Natural earth ochre patterns of cows, birds and lotuses.', hi: 'लाल, काले और सफेद मिट्टी के रंगों से सजी दीवारें।', bn: 'প্রাকৃতিক মাটির রঙে আঁকা পাখি ও পদ্মের দেয়ালচিত্র।' },
      diyaName: { en: 'Mati Ke Diye', hi: 'माटी के दीये', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Earthen lamps placed in village courtyards.', hi: 'आंगन में कतार में जलते मिट्टी के दीप।', bn: 'উঠোনে রাখা মাটির প্রদীপের মালা।' },
      toranDesc: { en: 'Sal leaves and wild forest flowers.', hi: 'साल के पत्तों और वनों के फूलों का तोरण।', bn: 'শালপাতা ও বুনোফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🎨',
        title: { en: 'Sohrai Harvest Mural Painting', hi: 'सोहराय भित्ति चित्रण', bn: 'সোহরায় মাটির ছবি' },
        why: {
          en: 'Tribal women paint mud walls using natural clays and twigs to celebrate the winter harvest.',
          hi: 'फसल की कटाई के समय प्रकृति और पशुओं के प्रति आभार प्रकट करने के लिए दीवारें सजाई जाती हैं।',
          bn: 'ফসল তোলার আনন্দের প্রতীক হিসেবে মাটির ঘর রঙীন সোহরায় ছবিতে সাজানো।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Dhuska & Arsa Roti', hi: 'धुस्का व अनरसा', bn: 'ধুসকা ও অনরসা' },
      desc: { en: 'Fried rice-lentil savory dumplings and sweet jaggery cakes.', hi: 'चावल और दाल का कुरकुरा धुस्का।', bn: 'চাল ও ডালের সুস্বাদু ধুসকা।' },
    },
    highlight: {
      en: 'Natural earth mural paintings, oil diyas, and cattle blessings.',
      hi: 'दीवारों पर सुंदर सोहराय चित्रकला और माटी के दीपकों की कतारें।',
      bn: 'দেওয়ালে সোহরায় লোকশিল্প ও মাটির প্রদীপের মায়াবী শোভা।',
    },
  },
  {
    id: 'chhattisgarh',
    name: 'Chhattisgarh',
    shortName: 'Chhattisgarh',
    hi: 'छत्तीसगढ़',
    bn: 'ছত্তিশগড়',
    isUT: false,
    festivalName: {
      en: 'Suhai & Govardhan Tihar',
      hi: 'सुहाई एवं गोवर्धन तिहार',
      bn: 'সুহাই ও গোবর্ধন তিহার',
    },
    introTagline: {
      en: 'From the colorful Gaura-Gauri clay worship to tying peacock-feathered Suhai bracelets on farm cattle, celebrate Chhattisgarh’s folk spirit.',
      hi: 'गौरा-गौरी पूजन से लेकर पशुओं को सुहाई बांधने और गोवर्धन तिहार तक, अनुभव करें छत्तीसगढ़ का लोकपर्व।',
      bn: 'গৌরা-গৌরী পূজা আর গবাদি পশুকে সুহাই বাঁধার আনন্দ—ছত্তিশগড়ের প্রাণের উৎসব।',
    },
    meaning: {
      "en": "Welcoming prosperity, harvest abundance, and the joyous rural folk celebration of Raut Nacha cowherd traditions.",
      "hi": "समृद्धि का स्वागत, फसल की खुशहाली और राउत नाचा की जीवंत लोक परंपरा।",
      "bn": "সমৃদ্ধি ও নতুন ফসলের আগমন এবং ঐতিহ্যবাহী রাউত নাচা লোকসংস্কৃতির আনন্দ।"
},
    howObserved: {
      "en": "Lighting clay lamps on verandas, performing Lakshmi Puja with newly harvested paddy sheaves. On Govardhan day, the cowherd community (Yaduvanshis) dresses in colorful attire with bells and mirrors to perform the rhythmic Raut Nacha stick dance.",
      "hi": "धान की नई बालियों से लक्ष्मी पूजन, मिट्टी के दीये जलाना और गोवर्धन पूजा पर राउत (यादव) समुदाय द्वारा लाठी और घुंघरुओं संग पारंपरिक राउत नाचा करना।",
      "bn": "নতুন ধানের শীষে লক্ষ্মীপূজা, মাটির প্রদীপ প্রজ্বলন এবং গোবর্ধন পূজায় লাঠি ও ঘুঙুর নিয়ে বর্ণাঢ্য রাউত নাচা পরিবেশন।"
},
    whenObserved: {
      "en": "Kartik Amavasya and the following Shukla Pratipada.",
      "hi": "कार्तिक अमावस्या और शुक्ल प्रतिपदा।",
      "bn": "কার্তিক অমাবস্যা ও শুক্ল প্রতিপদা।"
},
    variations: {
      "en": "Bilaspur and Raipur host statewide Raut Nacha festivals; Bastar tribal regions celebrate with local harvest deities and forest produce offerings; courtyard floors feature rice-flour chowk.",
      "hi": "बिलासपुर में राज्यस्तरीय राउत नाचा महोत्सव सजता है; बस्तर में जनजातीय रीतियों संग उत्सव मनता है।",
      "bn": "বিলাসপুরে রাউত নাচা মহোৎসব হয় এবং বস্তারে নিজস্ব উপজাতীয় রীতিতে পূজা হয়।"
},
    source: {
      "title": "Chhattisgarh Tourism Board",
      "url": "https://chhattisgarhtourism.cg.gov.in",
      "institution": "Tourism Department, Government of Chhattisgarh"
},
    decorTradition: {
      artName: { en: 'Rice Flour Chauk', hi: 'चावल के आटे का चौक', bn: 'চালের গুঁড়োর চক' },
      artDesc: { en: 'Geometric white rice flour patterns.', hi: 'आंगन में सजा सुंदर चौक।', bn: 'উঠোনে আঁকা চালের গুঁড়োর নকশা।' },
      diyaName: { en: 'Mitti Diyas', hi: 'माटी के दीपक', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Terracotta lamps in homes and cattle sheds.', hi: 'घरों और गोठानों में सजे दीये।', bn: 'ঘরে ও গোয়ালঘরে রাখা প্রদীপ।' },
      toranDesc: { en: 'Mango leaves and marigolds.', hi: 'आम और गेंदे का तोरण।', bn: 'আমপাতা ও গাঁদা ফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🦚',
        title: { en: 'Suhai Cattle Blessing', hi: 'पशुओं को सुहाई बांधना', bn: 'পশুদের সুহাই পরানো' },
        why: {
          en: 'Weaving blessed grass and peacock feather collars (Suhai) around cows and bullocks.',
          hi: 'पशु धन को मोरपंख वाली पवित्र सुहाई पहनाकर कृतज्ञता जताई जाती है।',
          bn: 'ময়ূরের পালকযুক্ত পবিত্র ঘাসের মালা গরুদের পরিয়ে ভালোবাসা জানানো।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Dehori & Bafauri', hi: 'देहरोरी व बफौरी', bn: 'দেহরোরি মিষ্টি' },
      desc: { en: 'Crispy rice and curd dumplings soaked in sugar syrup.', hi: 'चावल और दही से बनी रसीली देहरोरी।', bn: 'চালের তৈরি রসে ভরা সুস্বাদু দেহরোরি।' },
    },
    highlight: {
      en: 'Clay lamps, traditional folk songs, and harvest blessings.',
      hi: 'माटी के दीये, पारंपरिक लोकगीत और लोक संस्कृति का उल्लास।',
      bn: 'মাটির প্রদীপ, লোকসংগীত এবং ফসল কাটার আনন্দ।',
    },
  },
  {
    id: 'sikkim',
    name: 'Sikkim',
    shortName: 'Sikkim',
    hi: 'सिक्किम',
    bn: 'সিকিম',
    isUT: false,
    festivalName: {
      en: 'Tihar & Deepavali Celebrations',
      hi: 'तिहार एवं दीपावली महोत्सव',
      bn: 'তিহার ও দীপাবলি উৎসব',
    },
    introTagline: {
      en: 'From the warm songs of Bhailo and Deusi echoing in the mountains to Sel Roti and honoring dogs and cows, celebrate Sikkim’s Tihar.',
      hi: 'पहाड़ों में गूंजते भाइलो और देउसी के मधुर गीतों से लेकर सेल रोटी और तिहार तक, अनुभव करें सिक्किम का पावन पर्व।',
      bn: 'পাহাড়ে ভেসে আসা ভাইলো ও দেউসি গানের সুর আর মিষ্টি সেল রুটি—সিকিমের তিহার উৎসব।',
    },
    meaning: {
      "en": "Celebrating the Himalayan festival of lights alongside the 5-day cultural festival of Tihar, honoring crows, dogs, cows, oxen, and siblings.",
      "hi": "हिमालयी दीपोत्सव और पांच दिवसीय तिहार पर्व, जिसमें कौवे, श्वान, गाय, बैल और भाई-बहन का सत्कार होता है।",
      "bn": "হিমালয়ের কোলে আলোর উৎসব এবং কাক, কুকুর, গরু ও ভাই-বোনের ভালোবাসার তিহার উৎসব।"
},
    howObserved: {
      "en": "Homes are adorned with marigold garlands, colorful floor rangolis, and clay/butter lamps. Groups of youth visit neighborhood homes singing traditional \"Deusi\" and \"Bhailo\" carols bringing musical blessings. On Laxmi Puja day, Goddess Lakshmi is invited with glowing footprints.",
      "hi": "गेंदे के फूलों, रंगोली और दीयों से घर सजाए जाते हैं। युवा टोली बनाकर घर-घर जाकर द्यौसी और भैलो लोकगीत गाते हैं और लक्ष्मी पूजन होता है।",
      "bn": "গাঁদা ফুল ও রঙিন রঙ্গোলিতে ঘর সাজিয়ে দিউসি ও ভৈলো গান গেয়ে ঘরে ঘরে শুভেচ্ছা জানানো হয়।"
},
    whenObserved: {
      "en": "Five-day Tihar festival cycle from Kartik Krishna Trayodashi to Shukla Dwitiya (Bhai Tika).",
      "hi": "कार्तिक कृष्ण त्रयोदशी से शुक्ल द्वितीया (भाई टीका) तक पांच दिवसीय तिहार चक्र।",
      "bn": "কার্তিক কৃষ্ণ ত্রয়োদশী থেকে শুক্ল দ্বিতীয়া (ভাই টিকা) পর্যন্ত পাঁচ দিনের তিহার পর্ব।"
},
    variations: {
      "en": "Nepali-speaking communities observe full 5-day Tihar traditions; Buddhist monasteries illuminate hundreds of butter lamps (Chome) wishing peace for all sentient beings; Gangtok displays festive lights.",
      "hi": "नेपाली समुदाय पूर्ण पांच दिवसीय तिहार मनाता है; बौद्ध मठों में विश्व शांति हेतु सैकड़ों मक्खन के दीप (छोमे) जलाए जाते हैं।",
      "bn": "নেপালি সমাজ পাঁচ দিনের তিহার নিষ্ঠার সাথে পালন করে এবং বৌদ্ধ গুম্ফায় মাখনের প্রদীপ জ্বালানো হয়।"
},
    source: {
      "title": "Sikkim Tourism Official Portal",
      "url": "https://sikkimtourism.gov.in",
      "institution": "Tourism and Civil Aviation Department, Government of Sikkim"
},
    decorTradition: {
      artName: { en: 'Marigold Rangoli & Mandalas', hi: 'गेंदे की रंगोली व मंडला', bn: 'গাঁদা ফুলের রঙ্গোলি' },
      artDesc: { en: 'Golden marigold garlands draped around doors.', hi: 'गेंदे के फूलों से सजे दरवाजे और मंडला।', bn: 'গাঁদা ফুলে সাজানো সুন্দর দরজার চৌকাঠ।' },
      diyaName: { en: 'Clay Diye & Butter Lamps', hi: 'दीपक व मक्खन दीप', bn: 'মাটির ও মাখনের প্রদীপ' },
      diyaDesc: { en: 'Ghee diyas on window sills overlooking misty valleys.', hi: 'खिड़कियों पर जलते दीपक।', bn: 'জানলার ধারে রাখা স্নিগ্ধ প্রদীপ।' },
      toranDesc: { en: 'Yellow marigold Sayapatri garlands.', hi: 'गेंदे के फूलों की सायापत्री मालाएं।', bn: 'গাঁদা ফুলের সুন্দর মালা।' },
    },
    keyTraditions: [
      {
        icon: '🎶',
        title: { en: 'Bhailo & Deusi Musical Blessings', hi: 'भाइलो व देउसी गायन', bn: 'ভাইলো ও দেউসি গান' },
        why: {
          en: 'Youth visit homes singing harmonious folk ballads of blessing, receiving sweets and coins.',
          hi: 'युवा घर-घर जाकर मंगल गीत गाते हैं और शुभकामनाएं देते हैं।',
          bn: 'দলে দলে গান গেয়ে বাড়ি বাড়ি আশীর্বাদ ও শুভেচ্ছা পৌঁছে দেওয়া।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Sel Roti & Anrasa', hi: 'पारंपरिक सेल रोटी', bn: 'ঐতিহ্যবাহী সেল রুটি' },
      desc: { en: 'Ring-shaped crispy sweet rice bread fried to golden perfection.', hi: 'चावल के आटे से बनी गोल सुनहरी सेल रोटी।', bn: 'চালের গুঁড়ো দিয়ে তৈরি গোল মুচমুচে মিষ্টি সেল রুটি।' },
    },
    highlight: {
      en: 'Laxmi Puja, marigold garlands, and joyful Bhailo singing.',
      hi: 'लक्ष्मी पूजा, गेंदे के फूलों की मालाएं और भाइलो गीतों की गूंज।',
      bn: 'লক্ষ্মী পূজা, গাঁদা ফুলের মালা ও ভাইলো গানের সুর।',
    },
  },
  {
    id: 'tripura',
    name: 'Tripura',
    shortName: 'Tripura',
    hi: 'त्रिपुरा',
    bn: 'ত্রিপুরা',
    isUT: false,
    festivalName: {
      en: 'Matabari Diwali Mela & Kali Puja',
      hi: 'माताबाड़ी दिवाली मेला एवं काली पूजा',
      bn: 'মাতারবাড়ি দীপাবলি মেলা ও কালীপূজা',
    },
    introTagline: {
      en: 'From the thousand glowing lamps reflected in Kalyan Sagar lake to the sacred bells of Tripura Sundari, celebrate Tripura’s divine light.',
      hi: 'कल्याण सागर सरोवर में प्रतिबिंबित हजारों दीपों से लेकर त्रिपुरा सुंदरी मंदिर की दिव्यता तक, अनुभव करें त्रिपुरा का दीपोत्सव।',
      bn: 'কল্যাণ সাগরের জলে হাজার প্রদীপের প্রতিচ্ছবি আর ত্রিপুরা সুন্দরীর পবিত্র ঘণ্টা—ত্রিপুরার আলোর উৎসব।',
    },
    meaning: {
      "en": "Reverence of Goddess Kali at the historic Tripura Sundari (Matabari) temple in Udaipur and home Deepavali illuminations.",
      "hi": "उदयपुर स्थित ऐतिहासिक त्रिपुर सुंदरी (माताबाड़ी) मंदिर में मां काली की उपासना और दीपोत्सव।",
      "bn": "উদয়পুরের ৫০০ বছরের প্রাচীন ত্রিপুরসুন্দরী (মাতাবাড়ী) শক্তিপীঠে শ্যামাপূজা ও আলোর উৎসব।"
},
    howObserved: {
      "en": "Thousands of pilgrims gather for the historic Diwali Mela at Tripura Sundari Temple. Earthen lamps are lit around the sacred Kalyan Sagar lake. Households illuminate thresholds and verandas with clay diyas and share Peda and sweet rice treats.",
      "hi": "त्रिपुर सुंदरी मंदिर में ऐतिहासिक दिवाली मेला भरता है और कल्याण सागर सरोवर के चारों ओर हजारों दीपक जलाए जाते हैं। घरों में दीये जलाकर पेड़ा बांटा जाता है।",
      "bn": "মাতাবাড়ী মন্দিরে ঐতিহ্যবাহী দিওয়ালি মেলা বসে এবং কল্যাণ সাগর দিঘির পাড়ে হাজার হাজার প্রদীপ জ্বলে। ঘরে ঘরে প্রদীপ জ্বালিয়ে মিষ্টি পেঁড়া বিতরণ হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya.",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "The Matabari Diwali Mela is one of the largest cultural gatherings in the Northeast; indigenous Tripuri communities integrate sacred lamp-lighting with traditional respect for home and land.",
      "hi": "माताबाड़ी का दीपोत्सव पूर्वोत्तर के सबसे बड़े आयोजनों में से है; जनजातीय समाज अपने पारंपरिक रीति-रिवाजों संग दीप जलाता है।",
      "bn": "মাতাবাড়ীর মেলা উত্তর-পূর্ব ভারতের অন্যতম প্রধান উৎসব; স্থানীয় জনজাতিরাও পরম শ্রদ্ধায় এই আলোকোৎসবে অংশ নেন।"
},
    source: {
      "title": "Tripura Tourism Official Portal",
      "url": "https://tripuratourism.gov.in",
      "institution": "Tripura Tourism Development Corporation"
},
    decorTradition: {
      artName: { en: 'Alpona Art', hi: 'अल्पना कला', bn: 'পবিত্র আলপনা' },
      artDesc: { en: 'Rice flour motifs drawn at thresholds.', hi: 'देहरी पर चावल से बनी अल्पना।', bn: 'চৌকাঠে আঁকা চালের গুঁড়োর আলপনা।' },
      diyaName: { en: 'Mitti Prodip', hi: 'माटी के दीपक', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Earthen diyas along courtyard borders.', hi: 'आंगन में सजे दीपक।', bn: 'উঠোনে সাজানো মাটির প্রদীপ।' },
      toranDesc: { en: 'Mango leaves and marigolds.', hi: 'आम और गेंदे का तोरण।', bn: 'আমপাতা ও গাঁদা ফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🛕',
        title: { en: 'Matabari Lake Lighting', hi: 'माताबाड़ी सरोवर दीपदान', bn: 'মাতারবাড়ি সরোবরে দীপদান' },
        why: {
          en: 'Lighting earthen diyas on the sacred banks of Kalyan Sagar lake near the 500-year-old Matabari temple.',
          hi: 'कल्याण सागर सरोवर के किनारे श्रद्धालु दीप जलाकर मनोकामना मांगते हैं।',
          bn: 'ঐতিহাসিক কল্যাণ সাগরের পাড়ে প্রদীপ জ্বেলে পুণ্য কামনা।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Peda & Khaja', hi: 'माताबाड़ी का पेड़ा', bn: 'মাতারবাড়ির মিষ্টি প্যারা' },
      desc: { en: 'Rich milk pedas and crisp layered khaja.', hi: 'दूध के स्वादिष्ट पेड़े।', bn: 'খাঁটি ক্ষীরের নরম সুস্বাদু প্যারা।' },
    },
    highlight: {
      en: 'Tripura Sundari temple illumination and sacred lake reflection.',
      hi: 'त्रिपुरा सुंदरी मंदिर में दीपों की जगमगाहट और पावन उत्सव।',
      bn: 'ত্রিপুরেশ্বরী মন্দিরের হাজারো প্রদীপ ও কল্যাণ সাগরে আলোর প্রতিফলন।',
    },
  },
  {
    id: 'meghalaya',
    name: 'Meghalaya',
    shortName: 'Meghalaya',
    hi: 'मेघालय',
    bn: 'মেঘালয়',
    isUT: false,
    festivalName: {
      en: 'Lights Across the Abode of Clouds',
      hi: 'मेघों के आंचल में दीपोत्सव',
      bn: 'মেঘের দেশে আলোর দীপাবলি',
    },
    introTagline: {
      en: 'From candlelit verandahs overlooking pine hills to warm hearthside gatherings in Shillong, celebrate Meghalaya’s festive warmth.',
      hi: 'पाइन के पेड़ों के बीच सजी मोमबत्तियों से लेकर शिलांग की शामों की गरमाहट तक, अनुभव करें मेघालय का पर्व।',
      bn: 'পাইন বনের কুয়াশায় মোমবাতির স্নিগ্ধ আলো আর ঘরের উষ্ণ আতিথেয়তা—মেঘালয়ের দীপাবলি।',
    },
    meaning: {
      "en": "Illuminating the misty pine hills with candles and lanterns, celebrating unity, fellowship, and seasonal warmth.",
      "hi": "पाइन की पहाड़ियों पर मोमबत्तियों की रोशनी, आपसी भाईचारा और सौहार्द का उत्सव।",
      "bn": "পাইন বনের স্নিগ্ধ পাহাড়ে মোমবাতি ও লণ্ঠনের আলোয় সম্প্রীতি ও ভালোবাসার উৎসব।"
},
    howObserved: {
      "en": "Candles and earthen lamps are lit along verandas and windows in Shillong and Tura. Families observe Lakshmi Puja, while neighbors of diverse tribal and cosmopolitan backgrounds exchange festive sweets like Pukhlein and warm tea.",
      "hi": "शिलांग और तुरा में बालकनी और खिड़कियों पर मोमबत्तियां व दीये जलाए जाते हैं। लक्ष्मी पूजन के साथ पुखलेइन और मिठाइयों का आदान-प्रदान होता है।",
      "bn": "শিলং ও তুরার বারান্দায় মোমবাতি ও প্রদীপ জ্বলে। লক্ষ্মীপূজার পাশাপাশি স্থানীয় খাসি ও গারো বন্ধুদের মিষ্টি পুখলেইন উপহার দেওয়া হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya.",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "Shillong features cosmopolitan neighborhood light displays and sweet exchanges; rural Khasi and Garo hills celebrate indigenous harvest festivals (such as Wangala in Garo Hills) during the same autumn period.",
      "hi": "शिलांग में सुंदर रोशनी और मिठाइयां बंटती हैं; गारो पहाड़ियों में इसी ऋतु में वांगला का पारंपरिक फसल उत्सव मनता है।",
      "bn": "শিলংয়ে বর্ণিল আলোকসজ্জা হয়; গারো পাহাড়ে এই সময়েই ঐতিহ্যবাহী ওয়াঙ্গালা ফসল উৎসব উদযাপিত হয়।"
},
    source: {
      "title": "Meghalaya Tourism Official Portal",
      "url": "https://meghalayatourism.in",
      "institution": "Department of Tourism, Government of Meghalaya"
},
    decorTradition: {
      artName: { en: 'Floral & Candle Accents', hi: 'पुष्प व मोमबत्ती सज्जा', bn: 'ফুল ও মোমবাতির সাজ' },
      artDesc: { en: 'Pine cones and candles.', hi: 'पाइन और मोमबत्तियों की सजावट।', bn: 'পাইন কোণ ও মোমবাতির সাজ।' },
      diyaName: { en: 'Earthen Diyas & Lanterns', hi: 'दीपक व लालटेन', bn: 'মাটির প্রদীপ ও লণ্ঠন' },
      diyaDesc: { en: 'Mustard oil lamps on wooden balconies.', hi: 'लकड़ी की बालकनी पर जलते दीये।', bn: 'কাঠের বারান্দায় রাখা প্রদীপ।' },
      toranDesc: { en: 'Wild mountain flowers and pine.', hi: 'पहाड़ी फूलों का तोरण।', bn: 'পাহাড়ি বুনোফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🕯️',
        title: { en: 'Balcony Illumination', hi: 'बालकनी में दीपमाला', bn: 'বারান্দায় আলোর মালা' },
        why: {
          en: 'Lighting candles and lamps welcoming peace across mountain valleys.',
          hi: 'पहाड़ों की ठंड में शांति और प्रेम का प्रकाश फैलाया जाता है।',
          bn: 'পাহাড়ের শান্ত পরিবেশে ভালোবাসা ও আলোর বিস্তার।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Pukhlein & Rice Cakes', hi: 'पुखलेन (मीठी रोटी)', bn: 'পুখলেইন মিষ্টি পিঠা' },
      desc: { en: 'Crisp golden rice and jaggery fried bread.', hi: 'चावल और गुड़ से बनी मीठी रोटी।', bn: 'চাল ও গুড়ের মুচমুচে মিষ্টি পিঠা।' },
    },
    highlight: {
      en: 'Misty evening pine scents, warm hearths, and glowing doorways.',
      hi: 'पाइन के पेड़ों के बीच शाम की ठंडक और सुनहरी दीपमाला।',
      bn: 'পাইন বনের স্নিগ্ধ কুয়াশায় আলোকিত ঘরের আঙিনা।',
    },
  },
  {
    id: 'manipur',
    name: 'Manipur',
    shortName: 'Manipur',
    hi: 'मणिपुर',
    bn: 'মণিপুর',
    isUT: false,
    festivalName: {
      en: 'Deepavali in Manipur & Govindajee Temple Lights',
      hi: 'मणिपुर दीपोत्सव एवं श्री गोविंदजी दीपमाला',
      bn: 'মণিপুর দীপাবলি ও শ্রী গোবিন্দজী মন্দিরের আলো',
    },
    introTagline: {
      en: 'From historic temple lamps at Sri Govindajee in Imphal to floating diyas in sacred lakes, celebrate the serene spirit of Deepavali in Manipur (with Mera Houchongba observed as a distinct solidarity festival on Mera Purnima).',
      hi: 'मंदिरों के पवित्र दीपों से लेकर लोकतक झील के तैरते दीयों तक, अनुभव करें मणिपुर का दीपोत्सव।',
      bn: 'লোকতক হ্রদের শান্ত জলে প্রদীপের আভা আর মন্দিরের ঘণ্টা—মণিপুরের সম্প্রীতির উৎসব।',
    },
    meaning: {
      "en": "Festival of Lights (Deepavali) observed by Hindu communities in Manipur, celebrating the triumph of righteousness and divine illumination. (Note: Mera Houchongba is an independent solidarity festival celebrated on Mera Purnima, distinct from Kartik Amavasya Deepavali).",
      "hi": "मणिपुर में दीपोत्सव धर्म की विजय और प्रकाश का पावन उत्सव है। (विशेष ध्यान: \"मेरा हौचोंगबा\" मणिपुर का एक स्वतंत्र सांस्कृतिक सद्भाव पर्व है जो आश्विन/मेरा पूर्णिमा पर आता है, यह दिवाली का हिस्सा नहीं है)।",
      "bn": "মণিপুরে সনাতন সমাজের দীপাবলি সত্যের জয় ও আলোর উৎসব। (বিশেষ দ্রষ্টব্য: \"মেরা হৌচংবা\" মণিপুরের একটি স্বতন্ত্র ভ্রাতৃত্বের উৎসব যা মেরা পূর্ণিমায় অনুষ্ঠিত হয়, এটি দীপাবলির অনুষ্ঠান নয়)।"
},
    howObserved: {
      "en": "Earthen lamps (Meira) are lit along doorways and verandahs. Devotees gather at the historic Sri Sri Govindajee Temple in Imphal for special evening aartis and temple illuminations. Devotees float oil lamps on sacred ponds and lakes, and share traditional Kabok and Pitha.",
      "hi": "दहलीज और मंदिर परिसरों में मिट्टी के दीये (मेइरा) जलाए जाते हैं। इंफाल के श्री गोविंदजी मंदिर में विशेष दीपमाला व आरती होती है। सरोवरों में दीपदान किया जाता है और काबोक बांटा जाता है।",
      "bn": "গৃহদ্বারে মাটির প্রদীপ (মেইরা) প্রজ্বলন হয়। ইম্ফলের শ্রী গোবিন্দজী মন্দিরে বিশেষ আরতি ও আলোকসজ্জা হয়। সরোবরে প্রদীপ ভাসিয়ে মিষ্টি কাবোক প্রসাদ বিতরণ হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya for Deepavali. (Mera Houchongba is celebrated separately earlier on Mera Purnima).",
      "hi": "कार्तिक अमावस्या पर दीपोत्सव। (मेरा हौचोंगबा पहले मेरा पूर्णिमा पर अलग से मनाया जाता है)।",
      "bn": "কার্তিক অমাবস্যায় দীপাবলি। (মেরা হৌচংবা আশ্বিন/মেরা পূর্ণিমায় সম্পূর্ণ পৃথকভাবে উদযাপিত হয়)।"
},
    variations: {
      "en": "Valley Meitei Hindu households observe Deepavali with temple aartis at Govindajee and ISKCON temples; floating lamps are offered on Loktak lake; hill and valley communities share greetings in the spirit of inter-community harmony.",
      "hi": "इंफाल घाटी में गोविंदजी मंदिर और घरों में दीप जलते हैं; लोकतक झील में दीपदान होता है; सभी समुदाय आपसी सद्भाव से खुशियां बांटते हैं।",
      "bn": "ইম্ফল উপত্যকায় গোবিন্দজী মন্দিরে বিশেষ পুজো হয়, লোকতক হ্রদে প্রদীপ ভাসানো হয় এবং সম্প্রীতির শুভেচ্ছা বিনিময় হয়।"
},
    source: {
      "title": "Manipur Tourism Official Portal",
      "url": "https://manipurtourism.gov.in",
      "institution": "Department of Tourism, Government of Manipur"
},
    decorTradition: {
      artName: { en: 'Floral Lotus Rangoli', hi: 'कमल पुष्प रंगोली', bn: 'পদ্মফুলের রঙ্গোলি' },
      artDesc: { en: 'Fresh lotus blooms and geometric lines.', hi: 'कमल के फूलों से सजी रंगोली।', bn: 'পদ্মফুলের পাপড়িতে তৈরি আলপনা।' },
      diyaName: { en: 'Meitei Meira Diyas', hi: 'मिट्टी के दीपक', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Clay cups along verandah rails.', hi: 'दहलीज पर सजे दीप।', bn: 'বারান্দার ধারে সাজানো প্রদীপ।' },
      toranDesc: { en: 'Banana leaves and marigolds.', hi: 'केले व गेंदे के पत्तों का तोरण।', bn: 'কলা ও গাঁদা পাতার তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🪷',
        title: { en: 'Lotus Water Offerings', hi: 'सरोवर में दीपदान', bn: 'জলে প্রদীপ ভাসানো' },
        why: {
          en: 'Placing oil lamps on leaf boats onto water bodies praying for peace.',
          hi: 'जल में दीपक तैराकर शांति और सद्भाव की कामना।',
          bn: 'জলের বুকে প্রদীপ ভাসিয়ে শান্তির শুভকামনা।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Kabok & Sweet Pitha', hi: 'काबोक व मीठा पीठा', bn: 'কাবোক ও মিষ্টি পিঠা' },
      desc: { en: 'Puffed rice and molasses cakes seasoned with sesame.', hi: 'गुड़ और खील से बना काबोक।', bn: 'মুড়ি ও গুড়ের ঐতিহ্যবাহী কাবোক।' },
    },
    highlight: {
      en: 'Lotus ponds reflecting rows of lamps and community warmth.',
      hi: 'सरोवर तट पर दीपकों की पंक्ति और आपसी प्रेम का उत्सव।',
      bn: 'সরোবরের তীরে প্রদীপের সারি ও সৌহার্দ্যের মধুর উৎসব।',
    },
  },
  {
    id: 'mizoram',
    name: 'Mizoram',
    shortName: 'Mizoram',
    hi: 'मिजोरम',
    bn: 'মিজোরাম',
    isUT: false,
    festivalName: {
      en: 'Glow Across the Lush Hills',
      hi: 'हरी-भरी पहाड़ियों पर दीपों की चमक',
      bn: 'সবুজ পাহাড়ের কোলে প্রদীপের আলো',
    },
    introTagline: {
      en: 'From lantern-lit hillsides in Aizawl to cozy family teas and fellowship, experience Mizoram’s warm light.',
      hi: 'आइजोल की पहाड़ियों पर टिमटिमाती लालटेन से लेकर पारिवारिक चाय तक, अनुभव करें मिजोरम की सौहार्दपूर्ण दिवाली।',
      bn: 'আইজলের পাহাড়ে ঝুলন্ত লণ্ঠন আর চায়ের আসর—মিজোরামের ভালোবাসার উৎসব।',
    },
    meaning: {
      "en": "Bringing warmth, hope, and friendship across the lush hills during the autumn twilight.",
      "hi": "पहाड़ियों पर रोशनी, आशा और सौहार्द की ज्योति जगाना।",
      "bn": "পাহাড়ের বুকে আলো, আশা ও বন্ধুত্বের স্নিগ্ধ প্রদীপ প্রজ্বলন।"
},
    howObserved: {
      "en": "Lanterns and candles are lit on verandahs and hill terraces in Aizawl. Hindu residents and personnel observe evening prayers, while neighbors share tea, banana fritters (Koat Pitha), and festive greetings in the spirit of community fellowship.",
      "hi": "आइजोल में बालकनी पर लालटेन और मोमबत्तियां जलाई जाती हैं। शाम की प्रार्थना के बाद केले के कोट पीठा और चाय संग सौहार्द बांटा जाता है।",
      "bn": "আইজলের বারান্দায় লণ্ঠন ও মোমবাতি জ্বালানো হয়। কলার তৈরি কোট পিঠা ও চা খেয়ে সকলে মিলে সম্প্রীতি প্রকাশ করেন।"
},
    whenObserved: {
      "en": "Kartik Amavasya.",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "Celebrated primarily by resident trading and administrative communities in Aizawl and Lunglei, with warm participation, peaceful candlelit hillsides, and exchange of baked goods.",
      "hi": "आइजोल और लुंगलेई में शांतिपूर्ण दीपमाला और पड़ोसियों संग मिठाइयों का आदान-प्रदान होता है।",
      "bn": "আইজল ও লুংলেইতে শান্ত মোমবাতির আলোয় উৎসব হয় ও মিষ্টি বিনিময় চলে।"
},
    source: {
      "title": "Mizoram Tourism Official Portal",
      "url": "https://tourism.mizoram.gov.in",
      "institution": "Department of Tourism, Government of Mizoram"
},
    decorTradition: {
      artName: { en: 'Bamboo & Floral Art', hi: 'बांस व पुष्प सज्जा', bn: 'বাঁশ ও বুনোফুলের সাজ' },
      artDesc: { en: 'Handcrafted bamboo decor.', hi: 'बांस से सजी सुंदर कला।', bn: 'বাঁশের কারুকার্য ও ফুল।' },
      diyaName: { en: 'Lanterns & Diyas', hi: 'लालटेन व दीये', bn: 'লণ্ঠন ও প্রদীপ' },
      diyaDesc: { en: 'Lamps on wooden railings.', hi: 'रेलिंग पर सजे दीये।', bn: 'বারান্দার রেলিংয়ে রাখা প্রদীপ।' },
      toranDesc: { en: 'Woven bamboo strips.', hi: 'बांस की पट्टियों का तोरण।', bn: 'বাঁশের বোনা তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🏮',
        title: { en: 'Community Fellowship', hi: 'सामुदायिक सौहार्द', bn: 'সৌহার্দ্যের মিলনমেলা' },
        why: {
          en: 'Sharing treats and lantern walks across hill slopes.',
          hi: 'पहाड़ों पर रोशनी और प्रेम बांटना।',
          bn: 'পাহাড়ের বাঁকে আলো জ্বালিয়ে শুভেচ্ছা বিনিময়।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Koat Pitha & Tea', hi: 'कोट पीठा', bn: 'কোট পিঠা' },
      desc: { en: 'Crispy fried banana and rice fritters.', hi: 'केले और चावल का मीठा पीठा।', bn: 'কলা ও চালের মিষ্টি পিঠা।' },
    },
    highlight: {
      en: 'Warm community fellowship and lanterns lighting misty verandahs.',
      hi: 'पहाड़ी बस्तियों में जगमगाती लालटेन और आत्मीय मिलन।',
      bn: 'পাহাড়ের বারান্দায় লণ্ঠনের স্নিগ্ধ আভা ও মিষ্টি শুভেচ্ছা।',
    },
  },
  {
    id: 'nagaland',
    name: 'Nagaland',
    shortName: 'Nagaland',
    hi: 'नागालैंड',
    bn: 'নাগাল্যান্ড',
    isUT: false,
    festivalName: {
      en: 'Illumination Across the Blue Hills',
      hi: 'नीली पहाड़ियों पर जगमगाता दीपोत्सव',
      bn: 'নীল পাহাড়ের বুকে আলোর উৎসব',
    },
    introTagline: {
      en: 'From candlelit mountain terraces in Kohima to bonfire warmth and sweet delicacies, experience Nagaland’s vibrant spirit.',
      hi: 'कोहिमा की पहाड़ियों पर मोमबत्तियों की जगमगाहट से लेकर अलाव की गरमाहट तक, अनुभव करें नागालैंड की दीपोत्सवी आभा।',
      bn: 'কোহিমার পাহাড়ে মোমবাতির আলো আর উৎসবের উষ্ণতা—নাগাল্যান্ডের আনন্দময় মিলন।',
    },
    meaning: {
      "en": "Spreading the radiance of joy, mutual respect, and community warmth across the Naga hills.",
      "hi": "पहाड़ियों पर खुशियों की रोशनी और आपसी आदर का विस्तार।",
      "bn": "নীল পাহাড়ের কোলে সৌহার্দ্য ও আনন্দের আলোকবর্তিকা।"
},
    howObserved: {
      "en": "Lighting candles and earthen lamps along terraces and verandas in commercial centers like Dimapur and Kohima. Families hold evening prayers, share homemade sticky rice cakes and halwa, and gather around warm evening hearths.",
      "hi": "दीमापुर और कोहिमा में मोमबत्तियां व दीये जलाए जाते हैं। मीठे चावल के केक और हलवा बांटकर अलाव की गरमाहट में उत्सव मनता है।",
      "bn": "ডিমাপুর ও কোহিমার বারান্দায় মোমবাতি ও প্রদীপ জ্বালানো হয় এবং মিষ্টি চালের কেক ভাগ করে নেওয়া হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya.",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "Festivities are centered in commercial and cosmopolitan towns with lively inter-community participation; local bakeries prepare special festive confectioneries.",
      "hi": "दीमापुर के बाजारों में दीपोत्सव की सुंदर रौनक होती है और विभिन्न समुदाय मिलकर खुशियां मनाते हैं।",
      "bn": "ডিমাপুরে বিভিন্ন সম্প্রদায়ের মানুষ একত্রে আনন্দ ভাগ করেন।"
},
    source: {
      "title": "Nagaland Tourism Official Portal",
      "url": "https://tourism.nagaland.gov.in",
      "institution": "Department of Tourism, Government of Nagaland"
},
    decorTradition: {
      artName: { en: 'Pine & Candle Decor', hi: 'पाइन व मोमबत्ती सज्जा', bn: 'পাইন ও মোমবাতির সাজ' },
      artDesc: { en: 'Warm candle patterns.', hi: 'मोमबत्तियों से सजी बालकनी।', bn: 'মোমবাতিতে সাজানো বারান্দা।' },
      diyaName: { en: 'Terracotta Diyas', hi: 'मिट्टी के दीपक', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Diyas along stone steps.', hi: 'पत्थरों की सीढ़ियों पर दीये।', bn: 'পাথরের সিঁড়িতে প্রদীপ।' },
      toranDesc: { en: 'Pine twigs and beads.', hi: 'पाइन व मोतियों का तोरण।', bn: 'পাইন ও পুতির তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '✨',
        title: { en: 'Hilltop Bonfires & Lights', hi: 'पहाड़ी अलाव व रोशनी', bn: 'পাহাড়ে আলোর মেলা' },
        why: {
          en: 'Gathering around community warmth sharing festive cakes.',
          hi: 'अलाव के चारों ओर एकत्र होकर प्रेम बांटना।',
          bn: 'একসাথে বসে ভালোবাসার আলো ছড়ানো।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Sticky Rice Cakes & Halwa', hi: 'मीठा स्टिकी राइस केक', bn: 'স্টিকি রাইস কেক' },
      desc: { en: 'Steamed local sticky rice prepared with honey.', hi: 'शहद और चावल से बना पारंपरिक केक।', bn: 'মধু দিয়ে তৈরি পাহাড়ি চালের কেক।' },
    },
    highlight: {
      en: 'Candlelit hilltops, bonfire laughter, and warm sweet treats.',
      hi: 'मोमबत्तियों से सजे घर, अलाव की गरमाहट और मीठी यादें।',
      bn: 'মোমবাতির আলোয় সাজানো ঘর ও আন্তরিক শুভেচ্ছা বিনিময়।',
    },
  },
  {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    shortName: 'Arunachal',
    hi: 'अरुणाचल प्रदेश',
    bn: 'অরুণাচল প্রদেশ',
    isUT: false,
    festivalName: {
      en: 'Festival of Lights in the Dawn-Lit Hills',
      hi: 'उषा की वादियों में दीपोत्सव',
      bn: 'সূর্যোদয়ের পাহাড়ে আলোর উৎসব',
    },
    introTagline: {
      en: 'From early dawn diyas reflecting misty peaks to hearthside butter tea and warm cakes, celebrate Arunachal Pradesh.',
      hi: 'सूरज की पहली किरण संग जगमगाते दीयों से लेकर मक्खन वाली चाय तक, अनुभव करें अरुणाचल का पावन दीपोत्सव।',
      bn: 'সূর্যের প্রথম কিরণে আলোকিত পাহাড়ের প্রদীপ—অরুণাচল প্রদেশের রূপময় উৎসব।',
    },
    meaning: {
      "en": "Welcoming spiritual light in India’s easternmost dawn-lit mountains, celebrating righteousness and peaceful co-existence.",
      "hi": "भारत के सूर्योदय के प्रथम प्रदेश में पावन प्रकाश का स्वागत और शांति की प्रार्थना।",
      "bn": "ভারতের প্রথম সূর্যোদয়ের দেশে আলোর আগমন ও পরম শান্তির প্রার্থনা।"
},
    howObserved: {
      "en": "Lighting brass butter lamps and terracotta diyas in homes in Itanagar and Pasighat. Monasteries illuminate butter lamps wishing peace for all, while families share Khapse pastries and festive treats.",
      "hi": "ईटानगर और पासीघाट में पीतल व मिट्टी के दीप जलाए जाते हैं। मठों में मक्खन के दीये जलते हैं और खापसे बांटी जाती है।",
      "bn": "ইটানগরে পিতল ও মাটির প্রদীপ জ্বলে, গুম্ফায় মাখনের প্রদীপ জ্বলে এবং খাপসে মিষ্টি বিতরণ হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya.",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "In administrative hubs, diverse residents celebrate together; Tawang and West Kameng illuminate Buddhist monasteries with butter lamps; Hindu residents perform Lakshmi Puja.",
      "hi": "तवांग के बौद्ध मठों में विश्व शांति के लिए दीप जलते हैं; अन्य क्षेत्रों में लक्ष्मी पूजन होता है।",
      "bn": "তাওয়াং-এর বৌদ্ধ গুম্ফায় বিশ্বশান্তির প্রার্থনা হয় এবং অন্যান্য অঞ্চলে লক্ষ্মীপূজা পালিত হয়।"
},
    source: {
      "title": "Arunachal Pradesh Tourism Official Portal",
      "url": "https://www.arunachaltourism.com",
      "institution": "Department of Tourism, Government of Arunachal Pradesh"
},
    decorTradition: {
      artName: { en: 'Bamboo & Pine Accents', hi: 'बांस व पाइन सज्जा', bn: 'বাঁশ ও পাইনের সাজ' },
      artDesc: { en: 'Natural mountain decor.', hi: 'पहाड़ी प्राकृतिक सजावट।', bn: 'প্রাকৃতিক পাহাড়ি সাজসজ্জা।' },
      diyaName: { en: 'Clay Cups & Butter Lamps', hi: 'माटी व मक्खन के दीप', bn: 'মাটির ও মাখনের প্রদীপ' },
      diyaDesc: { en: 'Warm lights on timber verandahs.', hi: 'लकड़ी की बालकनी पर दीये।', bn: 'কাঠের বারান্দায় প্রদীপ।' },
      toranDesc: { en: 'Wild orchids and pine leaves.', hi: 'पहाड़ी आर्किड का तोरण।', bn: 'বুনো অর্কিডের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🌄',
        title: { en: 'Dawn Diya Welcome', hi: 'प्रभात दीप वंदन', bn: 'ভোরের প্রদীপ বন্দনা' },
        why: {
          en: 'Lighting lamps at dawn in the land where India’s first sunlight breaks.',
          hi: 'देश की पहली किरण का स्वागत दीप जलाकर किया जाता है।',
          bn: 'দেশের প্রথম সূর্যালোকে প্রদীপ জ্বেলে অভিবাদন।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Khapse & Butter Tea', hi: 'खापसे व बटर टी', bn: 'খাপসে ও বাটার চা' },
      desc: { en: 'Crispy twisted sweet biscuits and salty butter tea.', hi: 'कुरकुरे मीठे खापसे बिस्कुट।', bn: 'মুচমুচে মিষ্টি খাপসে বিস্কুট ও চা।' },
    },
    highlight: {
      en: 'Warm hearths, mountain hospitality, and glowing earthen lamps.',
      hi: 'पहाड़ी अपनापन, घर का स्नेह और टिमटिमाते दीये।',
      bn: 'পাহাড়ের উষ্ণ আতিথেয়তা ও প্রদীপের স্নিগ্ধ আলো।',
    },
  },

  // --- 8 UNION TERRITORIES ---
  {
    id: 'delhi',
    name: 'Delhi (National Capital Territory)',
    shortName: 'Delhi',
    hi: 'दिल्ली (राष्ट्रीय राजधानी क्षेत्र)',
    bn: 'দিল্লি (জাতীয় রাজধানী অঞ্চল)',
    isUT: true,
    festivalName: {
      en: 'Dilwalon Ki Dilli Diwali Mela',
      hi: 'दिलवालों की दिल्ली का भव्य दीपोत्सव',
      bn: 'দিলওয়ালে দিল্লির দীপাবলি মেলা',
    },
    introTagline: {
      en: 'From glittering Diwali melas and historic bazaars in Chandni Chowk to grand family feasts, celebrate the majestic capital’s Diwali.',
      hi: 'चांदनी चौक के जगमगाते बाजारों से लेकर भव्य दिवाली मेलों और पारिवारिक भोज तक, अनुभव करें देश की राजधानी का दीपोत्सव।',
      bn: 'চাঁদনি চকের আলোর বাজার থেকে বিখ্যাত দীপাবলি মেলা—দিল্লির জমকালো উৎসবের আনন্দ।',
    },
    meaning: {
      "en": "Pan-Indian capital confluence of Diwali, welcoming Lord Ram home and invoking Goddess Lakshmi and Lord Ganesha for wisdom and prosperity.",
      "hi": "भारत की राजधानी में हर प्रांत की संस्कृतियों का महासंगम, राम आगमन का स्वागत और श्री लक्ष्मी-गणेश का वंदन।",
      "bn": "ভারতের রাজধানীতে সর্বভারতীয় সংস্কৃতির মিলনমেলা, রামের শুভাগমন ও লক্ষ্মী-গণেশ অর্চনা।"
},
    howObserved: {
      "en": "Elaborate home illuminations with diyas and fairy lights, Lakshmi-Ganesh Puja, exchanging dry fruits and Kaju Katli, and vibrant cultural melas across Dilli Haat and city markets.",
      "hi": "घरों में दीयों व लड़ियों की सजावट, लक्ष्मी-गणेश पूजन, काजू कतली बांटना और दिल्ली हाट में दीपोत्सव मेले।",
      "bn": "ঘরে ঘরে চোখধাঁধানো আলোকসজ্জা, লক্ষ্মী-গণেশ পূজা, কাজু বরফি উপহার দেওয়া এবং দিল্লি হাটের উৎসব।"
},
    whenObserved: {
      "en": "Kartik Amavasya.",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "CR Park celebrates Bengali Kali Puja; Chandni Chowk hosts traditional Chopda Pujan; Gurdwara Bangla Sahib observes Bandi Chhor Divas Deepmala; South Indian enclaves observe dawn Ganga Snanam.",
      "hi": "सीआर पार्क में काली पूजा, चांदनी चौक में चोपड़ा पूजन, और बंगला साहिब गुरुद्वारे में बंदी छोड़ दीपमाला सजती है।",
      "bn": "সিআর পার্কে শ্যামাপূজা, চাঁদনি চকে চোপড়া পূজন এবং বাংলা সাহিব গুরুদ্বারে বন্দী ছোড় দীপমালা জ্বলে।"
},
    source: {
      "title": "Delhi Tourism Official Portal",
      "url": "https://delhitourism.gov.in",
      "institution": "Delhi Tourism and Transportation Development Corporation (DTTDC)"
},
    decorTradition: {
      artName: { en: 'Grand Floral Rangoli', hi: 'भव्य पुष्प रंगोली', bn: 'ফুলের রাজকীয় রঙ্গোলি' },
      artDesc: { en: 'Elaborate marigold and rose petal designs.', hi: 'गुलाब और गेंदे के फूलों से सजी रंगोली।', bn: 'গোলাপ ও গাঁদা ফুলের অপরূপ আলপনা।' },
      diyaName: { en: 'Terracotta Diyas & Fairy Lights', hi: 'मिट्टी के दीपक व फेरी लाइट्स', bn: 'মাটির প্রদীপ ও টুনি লাইট' },
      diyaDesc: { en: 'Golden mustard oil diyas and glittering balconies.', hi: 'बालकनियों पर सजे माटी के दीप।', bn: 'বারান্দায় সাজানো মাটির প্রদীপ।' },
      toranDesc: { en: 'Heavy marigold & brass bell torans.', hi: 'गेंदे और पीतल की घंटियों का तोरण।', bn: 'গাঁদা ফুল ও ঘণ্টার তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🎪',
        title: { en: 'Historic Diwali Melas', hi: 'प्रसिद्ध दिवाली मेले', bn: 'ঐতিহাসিক দীপাবলি মেলা' },
        why: {
          en: 'Shopping for handmade diyas, handicrafts, and artisanal gifts across Blind Relief, Dilli Haat, and local colonies.',
          hi: 'हाथ से बने दीये और मिठाइयां खरीदने के लिए लगने वाले भव्य मेले।',
          bn: 'হাতের তৈরি প্রদীপ ও কারুশিল্পের বিখ্যাত মেলা।',
        },
      },
      {
        icon: '🎁',
        title: { en: 'Grand Gifting & Lakshmi Pujan', hi: 'पारिवारिक लक्ष्मी पूजन व उपहार', bn: 'পারিবারিক লক্ষ্মী পূজা ও উপহার' },
        why: {
          en: 'Exchanging dry fruit hampers, sweets, and performing evening Lakshmi-Ganesh puja.',
          hi: 'अपनों को मेवे और मिठाइयों के उपहार देना और शाम को लक्ष्मी पूजन।',
          bn: 'মিষ্টি ও ড্রাই ফ্রুটসের উপহার বিনিময় এবং সন্ধ্যায় পূজার্চনা।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Kaju Katli, Moti Choor & Peda', hi: 'काजू कतली व मोतीचूर लड्डू', bn: 'কাজু কাটলি ও মতিচুর লাড্ডু' },
      desc: { en: 'Diamond cashew slices and melt-in-mouth saffron motichoor laddoos.', hi: 'शुद्ध काजू कतली और केसरिया मोतीचूर के लड्डू।', bn: 'খাঁটি কাজু কাটলি ও মতিচুরের নরম লাড্ডু।' },
    },
    highlight: {
      en: 'Grand Diwali melas, glittering markets, and warm family feasts.',
      hi: 'जगमगाते बाजार, लजीज पकवान और दोस्तों-परिजनों का गर्मजोशी भरा मिलन।',
      bn: 'বিখ্যাত দীপাবলি মেলা, আলোর বাজার ও সুস্বাদু খানাপিনা।',
    },
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    shortName: 'Chandigarh',
    hi: 'चंडीगढ़',
    bn: 'চণ্ডীগড়',
    isUT: true,
    festivalName: {
      en: 'City Beautiful Diwali Glow',
      hi: 'द सिटी ब्यूटीफुल का दीपोत्सव',
      bn: 'সিটি বিউটিফুলের দীপাবলি',
    },
    introTagline: {
      en: 'From broad tree-lined avenues draped in golden lights to sweet pinni and community harmony, celebrate Chandigarh.',
      hi: 'चौड़ी खूबसूरत सड़कों पर जगमगाती लाइटों से लेकर मीठी पिन्नी और सौहार्द तक, अनुभव करें चंडीगढ़ का पर्व।',
      bn: 'গাছপালা ঘেরা রাজপথে সোনালী আলোর মালা আর মিষ্টিমুখ—চণ্ডীগড়ের অপূর্ব উৎসব।',
    },
    meaning: {
      "en": "Celebration of light, architectural harmony, and the shared heritage of Punjab and Haryana, honoring Bandi Chhor Divas and Diwali.",
      "hi": "पंजाब व हरियाणा की साझी विरासत, बंदी छोड़ दिवस और दिवाली का भव्य उत्सव।",
      "bn": "পাঞ্জাব ও হরিয়ানার যৌথ সংস্কৃতি, বন্দী ছোড় দিবস এবং দীপাবলির আনন্দময় উৎসব।"
},
    howObserved: {
      "en": "Terraces and boulevards are lit with earthen diyas. Gurdwaras illuminate with Deepmala for Bandi Chhor Divas, homes perform Lakshmi Puja, and neighbors share Panjiri and Pinnis.",
      "hi": "घरों और सेक्टरों में दीपमाला, गुरुद्वारों में बंदी छोड़ दिवस का कीर्तन व दीप, तथा पिन्नी और पंजीरी का स्वाद।",
      "bn": "সেক্টরে সেক্টরে প্রদীপের আলো, গুরুদ্বারে বন্দী ছোড় দিবসের কীর্তন ও দীপমালা এবং সুস্বাদু পিন্নি বিতরণ।"
},
    whenObserved: {
      "en": "Kartik Amavasya.",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "Residents participate in both historical Gurdwara Deepmala and residential Lakshmi-Ganesh worship, blending Punjabi and Haryanvi traditions.",
      "hi": "निवासी गुरुद्वारों में दीपमाला और घरों में लक्ष्मी पूजन दोनों श्रद्धा से करते हैं।",
      "bn": "গুরুদ্বারে দীপমালা এবং ঘরে ঘরে লক্ষ্মীপূজা উভয় ঐতিহ্য সমান শ্রদ্ধায় পালিত হয়।"
},
    source: {
      "title": "Chandigarh Tourism Official Portal",
      "url": "https://chandigarhtourism.gov.in",
      "institution": "Department of Tourism, Chandigarh Administration"
},
    decorTradition: {
      artName: { en: 'Modern Geometric Rangoli', hi: 'ज्यामितीय रंगोली', bn: 'জ্যামিতিক রঙ্গোলি' },
      artDesc: { en: 'Clean symmetric floor art.', hi: 'सुंदर ज्यामितीय आकृतियां।', bn: 'সুষম জ্যামিতিক নকশার আলপনা।' },
      diyaName: { en: 'Brass & Clay Diyas', hi: 'पीतल व मिट्टी के दीप', bn: 'পিতল ও মাটির প্রদীপ' },
      diyaDesc: { en: 'Glowing lanterns on terraces.', hi: 'छतों पर कतारबद्ध जलते दीये।', bn: 'ছাদের আলসে সাজানো প্রদীপ।' },
      toranDesc: { en: 'Marigold and green mango leaves.', hi: 'गेंदे और आम का तोरण।', bn: 'গাঁদা ফুল ও আমপাতার তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🌟',
        title: { en: 'Sector Market Lightings', hi: 'बाजारों की रोशनी', bn: 'বাজারের আলোকসজ্জা' },
        why: {
          en: 'Bustling markets decorated with warm fairy lights and community sweet stalls.',
          hi: 'बाजारों में जगमगाती रोशनी और मिठाइयों की महक।',
          bn: 'আলোয় সাজানো বাজার আর মিষ্টির সমাহার।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Desi Ghee Pinni & Kaju Katli', hi: 'देसी घी की पिन्नी', bn: 'ঘিয়ের পিন্নি' },
      desc: { en: 'Wheat and dry fruit fudge with pure ghee.', hi: 'मेवों और घी से बनी पिन्नी।', bn: 'খাঁটি ঘিয়ে তৈরি পুষ্টিকর পিন্নি।' },
    },
    highlight: {
      en: 'Tree-lined avenues aglow with golden lights and community sweets.',
      hi: 'सजी-धजी चौड़ी सड़कें, जगमगाते घर और मिष्ठानों की मिठास।',
      bn: 'সুন্দর সাজানো রাস্তা, আলোর রোশনাই ও মিষ্টিমুখ।',
    },
  },
  {
    id: 'jammu-and-kashmir',
    name: 'Jammu and Kashmir',
    shortName: 'Kashmir',
    hi: 'जम्मू और कश्मीर',
    bn: 'জম্মু ও কাশ্মীর',
    isUT: true,
    festivalName: {
      en: 'Chinar Glow & Valley Festivities',
      hi: 'चिनार की छांव में दीपोत्सव',
      bn: 'চিনারের ছায়ায় উপত্যকার দীপাবলি',
    },
    introTagline: {
      en: 'From steaming cups of saffron Kahwa alongside earthen lamps to golden Chinar leaves, celebrate Kashmir’s serene beauty.',
      hi: 'जाफरानी कहवा की चुस्कियों संग टिमटिमाते मिट्टी के दीयों और चिनार के पत्तों तक, अनुभव करें कश्मीर की शांत दिव्यता।',
      bn: 'জাফরানি কাওয়ার উষ্ণ কাপ আর চিনার পাতার ছায়ায় মাটির প্রদীপ—কাশ্মীরের মনোমুগ্ধকর উৎসব।',
    },
    meaning: {
      "en": "Ancient Kashmiri Pandit observance of Sukhsuptika and Diwali, lighting lamps along riverbanks and temples, welcoming peace and light.",
      "hi": "कश्मीरी पंडितों की प्राचीन \"सुखसुप्तिका\" परंपरा और जम्मू में भव्य दीपोत्सव, शांति और उजाले की कामना।",
      "bn": "কাশ্মীরি পণ্ডিতদের প্রাচীন \"সুখসুপ্তিকা\" ঐতিহ্য এবং জম্মুর ঐতিহাসিক মন্দিরে আলোকসজ্জা।"
},
    howObserved: {
      "en": "Lighting clay diyas along house courtyards and riverbanks. Kashmiri Pandits traditionally observe Sukhsuptika worshipping Goddess Lakshmi; Jammu temples (Raghunath Temple) hold grand Deepotsav and aartis; families share Shufta and Patisa.",
      "hi": "रघुनाथ मंदिर में भव्य दीपमाला, सुखसुप्तिका पूजन, नदी तटों पर दीपदान और स्वादिष्ट शुफ्ता व पतीसा का भोग।",
      "bn": "রঘুনাথ মন্দিরে মহাদীপমালা, নদীতীরে প্রদীপ ভাসানো এবং ঐতিহ্যবাহী শুফতা ও পতিসা মিষ্টি বিতরণ।"
},
    whenObserved: {
      "en": "Kartik Krishna Chaturdashi and Amavasya.",
      "hi": "कार्तिक कृष्ण चतुर्दशी एवं अमावस्या।",
      "bn": "কার্তিক কৃষ্ণ চতুর্দশী ও অমাবস্যা।"
},
    variations: {
      "en": "Jammu plains celebrate with Dogra folk festivities and sweets; Kashmir valley observes sacred home prayers and lamp lighting along Jhelum riverbanks.",
      "hi": "जम्मू में डोगरा संस्कृति संग उत्सव मनता है; कश्मीर घाटी में झेलम के तट पर शांत दीप जलते हैं।",
      "bn": "জম্মুতে ডোগরা লোকসংস্কৃতিতে উৎসব হয় এবং কাশ্মীরে ঝিলম নদীর তীরে স্নিগ্ধ প্রদীপ জ্বলে।"
},
    source: {
      "title": "Jammu and Kashmir Tourism Official Portal",
      "url": "https://jktourism.jk.gov.in",
      "institution": "Directorate of Tourism, Jammu and Kashmir"
},
    decorTradition: {
      artName: { en: 'Peshwari & Walnut Motifs', hi: 'कश्मीरी रंगोली', bn: 'কাশ্মীরি আলপনা' },
      artDesc: { en: 'Chinar leaf and paisley floor patterns.', hi: 'चिनार के पत्तों की सुंदर रंगोली।', bn: 'চিনার পাতার নকশায় সাজানো আলপনা।' },
      diyaName: { en: 'Terracotta Diyas', hi: 'मिट्टी के दीपक', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Lamps on wooden carved window sills.', hi: 'नक्काशीदार खिड़कियों पर दीये।', bn: 'খোদাই করা কাঠের জানলায় প্রদীপ।' },
      toranDesc: { en: 'Golden marigold and chinar foliage.', hi: 'गेंदे व चिनार का तोरण।', bn: 'গাঁদা ফুল ও চিনার পাতার তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '☕',
        title: { en: 'Saffron Kahwa & Walnut Treats', hi: 'जाफरानी कहवा व अखरोट', bn: 'জাফরানি কাওয়া ও আখরোট' },
        why: {
          en: 'Gathering around warm hearths sharing fragrant saffron kahwa brewed with green cardamom and crushed almonds.',
          hi: 'कड़ाके की ठंड में बादाम और केसर वाले गर्म कहवा की चुस्कियों के साथ पर्व मनाना।',
          bn: 'কাঠবাদাম আর জাফরান দেওয়া গরম কাওয়া পান করে উৎসবের আনন্দ উপভোগ।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Shufta & Saffron Halwa', hi: 'शुफ्ता व जाफरानी हलवा', bn: 'শুফতা ও জাফরানি হালুয়া' },
      desc: { en: 'Dry fruits and paneer tossed in saffron-cardamom honey syrup.', hi: 'सूखे मेवों, पनीर और शहद से बना पारंपरिक शुफ्ता।', bn: 'ড্রাই ফ্রুটস, পনির আর মধুর ঐতিহ্যবাহী শুফতা।' },
    },
    highlight: {
      en: 'Earthen diyas against mountain chill, saffron kahwa, and walnut sweets.',
      hi: 'पहाड़ी ठंडक में जाफरानी कहवा, अखरोट की मिठास और जगमगाते दीये।',
      bn: 'জাফরানি কাওয়া, আখরোটের মিষ্টি এবং ঘরের কোণে মাটির প্রদীপ।',
    },
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    shortName: 'Ladakh',
    hi: 'लद्दाख',
    bn: 'লাদাখ',
    isUT: true,
    festivalName: {
      en: 'High Altitude Hearth & Lights',
      hi: 'बर्फ़ीली चोटियों पर पावन ज्योति',
      bn: 'তুহিন শৃঙ্গে আলোর পরশ',
    },
    introTagline: {
      en: 'From flickering yak-butter lamps lighting stone verandahs under starlit Himalayan skies to cozy hearthside warmth, feel Ladakh.',
      hi: 'तारों भरे आसमान के नीचे टिमटिमाते मक्खन के दीपकों से लेकर अंगीठी की गरमाहट तक, अनुभव करें लद्दाख का शांत प्रकाश।',
      bn: 'হিমালয়ের তারার আকাশের নিচে মাখনের প্রদীপের মায়াবী দীপ্তি আর ঘরের উষ্ণতা—লাদাখের স্নিগ্ধ উৎসব।',
    },
    meaning: {
      "en": "Lighting sacred butter lamps (Chome) in high-altitude monasteries and homes, praying for universal peace, wisdom, and compassion.",
      "hi": "हिमालय की ऊंचाइयों पर बौद्ध मठों और घरों में मक्खन के दीप (छोमे) जलाकर विश्व शांति की प्रार्थना।",
      "bn": "উচ্চ হিমালয়ের গুম্ফায় মাখনের প্রদীপ জ্বেলে সর্বজনীন শান্তি ও করুণার প্রার্থনা।"
},
    howObserved: {
      "en": "Brass butter lamps and candles illuminate prayer altars in Leh and Kargil. Hindu and Sikh personnel/residents observe Deepavali and Bandi Chhor Divas, sharing Ladakhi butter tea and sweet Khambir.",
      "hi": "लेह में प्रार्थना वेदियों पर मक्खन के दीये जलाए जाते हैं। दिवाली और बंदी छोड़ दिवस मनाते हुए नमकीन चाय व खंबीर बांटी जाती है।",
      "bn": "লেহ ও কার্গিলে মাখনের প্রদীপ জ্বলে। দিওয়ালি ও বন্দী ছোড় দিবসে বাটার টি ও খাম্বির খাওয়া হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya. (Also connects spiritually with Galdan Namchot festival of lights celebrated later in winter).",
      "hi": "कार्तिक अमावस्या। (सर्दियों में आने वाले गाल्दन नामचोत दीप पर्व से भी आत्मिक संबंध)।",
      "bn": "কার্তিক অমাবস্যা। (শীতের গালদান নামচোত আলোক উৎসবের সাথেও আত্মিক যোগ রয়েছে)।"
},
    variations: {
      "en": "Leh town features interfaith harmony where Buddhist, Muslim, Hindu, and Sikh community members exchange warm festive felicitations.",
      "hi": "लेह में सभी धर्मों के लोग मिलकर एक-दूसरे को प्रकाश पर्व की बधाई देते हैं।",
      "bn": "লেহ শহরে বৌদ্ধ, মুসলিম, হিন্দু ও শিখ সমাজের মানুষ মিলেমিশে শুভেচ্ছা বিনিময় করেন।"
},
    source: {
      "title": "Ladakh Tourism Official Portal",
      "url": "https://ladakhtourism.in",
      "institution": "Department of Tourism, UT of Ladakh"
},
    decorTradition: {
      artName: { en: 'Ashtamangala Motifs', hi: 'अष्टमंगल प्रतीक', bn: 'অষ্টমঙ্গল প্রতীক' },
      artDesc: { en: 'Sacred symbols drawn on wooden lintels.', hi: 'लकड़ी की चौखट पर अष्टमंगल प्रतीक।', bn: 'কাঠের চৌকাঠে মাঙ্গলিক প্রতীক।' },
      diyaName: { en: 'Chhoks (Butter Lamps)', hi: 'छोक्स (मक्खन के दीप)', bn: 'মাখনের স্নিগ্ধ প্রদীপ' },
      diyaDesc: { en: 'Brass cups glowing with pure butter.', hi: 'पीतल के पात्रों में शुद्ध मक्खन के दीप।', bn: 'পিতলের পাত্রে মাখনের পবিত্র প্রদীপ।' },
      toranDesc: { en: 'Woolen festive streamers.', hi: 'ऊन के रंग-बिरंगे तोरण।', bn: 'উলের রঙিন মাঙ্গলিক তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🕯️',
        title: { en: 'Lighting Himalayan Chhoks', hi: 'हिमालयी मक्खन दीप प्रज्वलन', bn: 'পাহাড়ি মাখনের প্রদীপ' },
        why: {
          en: 'Lighting sacred butter lamps praying for universal peace and protection through harsh winter.',
          hi: 'कड़ाके की ठंड में विश्व शांति और प्रकाश के लिए मक्खन के दीप जलाए जाते हैं।',
          bn: 'শীতের রাতে সার্বিক শান্তি কামনায় মাখনের প্রদীপ জ্বালানো।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Ladakhi Khambir & Sweet Rice', hi: 'खाम्बीर व मीठे चावल', bn: 'খাম্বির রুটি ও মিষ্টি ভাত' },
      desc: { en: 'Thick sourdough hearth bread and sweet dried apricot jam.', hi: 'मोटी पारंपरिक खाम्बीर रोटी और खुबानी की मिठास।', bn: 'ঐতিহ্যবাহী খাম্বির রুটি ও খুবানির জ্যাম।' },
    },
    highlight: {
      en: 'Butter lamps flickering under starry Himalayan skies.',
      hi: 'तारों भरे हिमालयी आसमान के नीचे टिमटिमाते पावन मक्खन दीप।',
      bn: 'হিমালয়ের তারার আকাশের নিচে মাখনের প্রদীপের মায়াবী দীপ্তি।',
    },
  },
  {
    id: 'puducherry',
    name: 'Puducherry',
    shortName: 'Puducherry',
    hi: 'पुडुचेरी',
    bn: 'পুদুচেরি',
    isUT: true,
    festivalName: {
      en: 'Bougainvillea & Seaside Diyas',
      hi: 'बोगनवेलिया और समुद्र तट के दीये',
      bn: 'বোগানভিলিয়া ও সমুদ্রের তীরের প্রদীপ',
    },
    introTagline: {
      en: 'From Kolams adorning pastel French Quarter thresholds to seaside diya walks on the Promenade, celebrate Puducherry’s charm.',
      hi: 'फ्रेंच क्वार्टर की देहरियों पर सजे कोलम से लेकर प्रोमेनेड तट पर जलते दीपकों तक, अनुभव करें पुडुचेरी का अनूठा दीपोत्सव।',
      bn: 'ফরাসি পাড়ার বারান্দায় কোলাম আর সমুদ্রতীরে প্রদীপের স্নিগ্ধ আলো—পুদুচেরির অনিন্দ্য সুন্দর রূপ।',
    },
    meaning: {
      "en": "Fusion of classical Tamil Deepavali traditions with Franco-Tamil coastal tranquility, welcoming dawn light.",
      "hi": "पारंपरिक तमिल दीपोत्सव और फ्रेंच-तमिल तटीय संस्कृति का सुंदर संगम।",
      "bn": "চিরায়ত তামিল দীপাবলি ও ফরাসি-তামিল উপকূলীয় সংস্কৃতির মধুর মেলবন্ধন।"
},
    howObserved: {
      "en": "Pre-dawn Ganga Snanam oil bath, bursting flower sparklers along the Promenade, visiting the famous Sri Manakula Vinayagar Temple, and preparing traditional Adhirasam alongside bakery delicacies.",
      "hi": "भोर में गंगा स्नानम्, प्रोमेनेड बीच पर फुलझड़ियां, मनाकुला विनायक मंदिर में दर्शन और अधिरसम का स्वाद।",
      "bn": "ভোরে তৈলস্নান, সমুদ্রের পাড়ে ফুলঝুরি, শ্রী মনকুলা বিনায়গর মন্দিরে পূজা ও অধরসম খাওয়া।"
},
    whenObserved: {
      "en": "Aippasi Amavasya at dawn.",
      "hi": "आईप्पासी अमावस्या की भोर।",
      "bn": "আইপ্পাসি অমাবস্যার ভোরে।"
},
    variations: {
      "en": "White Town features subtle lantern displays and French confectionery; Tamil Quarter observes traditional kolams and temple processions.",
      "hi": "व्हाइट टाउन में फ्रेंच शैली की लालटेन सजती हैं; तमिल क्वार्टर में सुंदर कोलम और मंदिर उत्सव होते हैं।",
      "bn": "হোয়াইট টাউনে ফরাসি ধাঁচের আলো আর তামিল পল্লীতে কোলম ও শোভাযাত্রা দেখা যায়।"
},
    source: {
      "title": "Puducherry Tourism Official Portal",
      "url": "https://pondytourism.in",
      "institution": "Department of Tourism, Government of Puducherry"
},
    decorTradition: {
      artName: { en: 'French-Tamil Kolam', hi: 'कोलम कला', bn: 'কোলাম আলপনা' },
      artDesc: { en: 'White rice flour patterns on colonial thresholds.', hi: 'कोलोनियल चौखट पर सजा कोलम।', bn: 'ফরাসি ধাঁচের দরজায় চালের গুঁড়োর কোলাম।' },
      diyaName: { en: 'Agal Vilakku', hi: 'अगल दीप', bn: 'মাটির অগল প্রদীপ' },
      diyaDesc: { en: 'Clay cups along coastal parapets.', hi: 'तटों पर जलते मिट्टी के दीप।', bn: 'বারান্দায় সাজানো মাটির প্রদীপ।' },
      toranDesc: { en: 'Bougainvillea sprigs & mango leaves.', hi: 'बोगनवेलिया और आम का तोरण।', bn: 'বোগানভিলিয়া ও আমপাতার তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🌊',
        title: { en: 'Promenade Seaside Walk', hi: 'समुद्र तट पर दीपमाला', bn: 'সমুদ্রের ধারে প্রদীপ' },
        why: {
          en: 'Families walk along the Bay of Bengal evening breeze sharing sweet halwa.',
          hi: 'समुद्र की ठंडी हवाओं में परिवार संग दीपोत्सव की खुशियां बांटना।',
          bn: 'সাগরের হাওয়ায় পরিবারের সাথে প্রদীপ জ্বেলে মিষ্টিমুখ।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Tirunelveli Halwa & Mysore Pak', hi: 'तिरुनेलवेली हलवा', bn: 'তিরুনেলভেলি হালুয়া' },
      desc: { en: 'Silky wheat halwa dripping with pure ghee and cashews.', hi: 'घी और काजू से बना रेशमी हलवा।', bn: 'খাঁটি ঘিয়ে তৈরি নরম সুস্বাদু গমের হালুয়া।' },
    },
    highlight: {
      en: 'Pastel French quarter verandahs adorned with kolams and clay lamps.',
      hi: 'सुंदर बालकनियों पर कोलम रंगोली और शाम के शांत दीप।',
      bn: 'বারান্দায় সুন্দর কোলাম এবং সন্ধ্যার স্নিগ্ধ প্রদীপ।',
    },
  },
  {
    id: 'dadra-and-nagar-haveli-and-daman-and-diu',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    shortName: 'Daman & Diu',
    hi: 'दादरा और नगर हवेली और दमन और दीव',
    bn: 'দাদরা ও নগর হাভেলি এবং দমন ও দিউ',
    isUT: true,
    festivalName: {
      en: 'Coastal Lanterns & Warm Festivities',
      hi: 'तटीय लालटेन एवं दीपोत्सव',
      bn: 'উপকূলীয় প্রদীপ ও দীপাবলি',
    },
    introTagline: {
      en: 'From sea breezes carrying festive songs to clay diyas lining historic ramparts, celebrate the union territories.',
      hi: 'समुद्र की लहरों के संग गूंजते भजनों से लेकर प्राचीन किलों पर जलते दीयों तक, अनुभव करें तटीय दीपोत्सव।',
      bn: 'সাগরের হাওয়ায় প্রদীপের স্নিগ্ধ আলো আর উপকূলের উৎসবের আনন্দ।',
    },
    meaning: {
      "en": "Coastal and tribal synthesis celebrating light, trade prosperity, and sea-facing historic ramparts.",
      "hi": "तटीय व जनजातीय संस्कृति का संगम, बही-खाता पूजन और समुद्र तट पर दीपमाला।",
      "bn": "উপকূল ও উপজাতীয় সংস্কৃতির মিলন, চোপড়া পূজা ও সমুদ্রের ধারে দীপমালা।"
},
    howObserved: {
      "en": "Merchants perform Chopda Pujan, earthen diyas illuminate sea-facing ramparts of historic Moti Daman and Diu Forts, Warli tribal communities paint rice-paste murals, and sweet Ghari is shared.",
      "hi": "दमन और दीव के किलों पर दीये जलाए जाते हैं; वारली आदिवासी घरों में चावल के आटे से कला बनती है; घारी बांटी जाती है।",
      "bn": "দমনের পর্তুগিজ দুর্গের প্রাচীরে প্রদীপ জ্বলে, ওয়ারলি চিত্রকলায় ঘর সাজে এবং মিষ্টি ঘারি বিতরণ হয়।"
},
    whenObserved: {
      "en": "Aso Vad Amas and New Year.",
      "hi": "आश्विन अमावस्या एवं नूतन वर्ष।",
      "bn": "আশ্বিন অমাবস্যা ও নববর্ষ।"
},
    variations: {
      "en": "Diu and Daman observe Gujarati Chopda Pujan and coastal light fairs; Dadra & Nagar Haveli features traditional Warli geometric folklore.",
      "hi": "दीव व दमन में गुजराती चोपड़ा पूजन होता है; दादरा और नगर हवेली में वारली लोककला सजती है।",
      "bn": "দীউ ও দমণে চোপড়া পূজন হয় এবং দাদরা ও নগর হাভেলিতে ওয়ারলি চিত্র আঁকা হয়।"
},
    source: {
      "title": "Daman & Diu Tourism Portal",
      "url": "https://daman.nic.in",
      "institution": "Administration of Dadra & Nagar Haveli and Daman & Diu"
},
    decorTradition: {
      artName: { en: 'Coastal Floral Rangoli', hi: 'तटीय रंगोली', bn: 'উপকূলীয় রঙ্গোলি' },
      artDesc: { en: 'Bright patterns framed with marigolds.', hi: 'गेंदे के फूलों से सजी रंगोली।', bn: 'গাঁদা ফুলে সাজানো রঙিন আলপনা।' },
      diyaName: { en: 'Terracotta Diyas', hi: 'माटी के दीपक', bn: 'মাটির প্রদীপ' },
      diyaDesc: { en: 'Earthen cups along seaside verandahs.', hi: 'दहलीज पर सजे दीप।', bn: 'বারান্দায় রাখা প্রদীপ।' },
      toranDesc: { en: 'Mango leaves and marigolds.', hi: 'आम और गेंदे का तोरण।', bn: 'আমপাতা ও গাঁদা ফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🌊',
        title: { en: 'Seafront Lamp Lighting', hi: 'तटों पर दीप प्रज्वलन', bn: 'সৈকতে প্রদীপ জ্বালানো' },
        why: {
          en: 'Lighting oil lamps along coastal promenades welcoming prosperity from the seas.',
          hi: 'समुद्र तट पर दीप जलाकर खुशहाली की कामना।',
          bn: 'সাগরতীরে প্রদীপ জ্বেলে সমৃদ্ধির আবাহন।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Ghari & Sweet Pitha', hi: 'घारी व मीठे पकवान', bn: 'ঘারি ও মিষ্টি পিঠা' },
      desc: { en: 'Ghee-soaked sweet cakes and crunchy namkeens.', hi: 'घी में डूबी स्वादिष्ट घारी।', bn: 'ঘিয়ে তৈরি সুস্বাদু ঘারি মিষ্টি।' },
    },
    highlight: {
      en: 'Coastal breeze, seaside diyas, and multicultural festive warmth.',
      hi: 'समुद्र की ठंडी हवाएं, तटों पर जलते दीप और आत्मीयता।',
      bn: 'সাগরের মৃদুমন্দ বাতাস ও সমুদ্রতীরে প্রদীপের সাজ।',
    },
  },
  {
    id: 'andaman-and-nicobar-islands',
    name: 'Andaman and Nicobar Islands',
    shortName: 'Andaman',
    hi: 'अंडमान और निकोबार द्वीप समूह',
    bn: 'আন্দামান ও নিকোবর দ্বীপপুঞ্জ',
    isUT: true,
    festivalName: {
      en: 'Island Lights Along the Bay',
      hi: 'समुद्र तट पर जगमगाता दीपोत्सव',
      bn: 'সাগরকূলে প্রদীপের আলো',
    },
    introTagline: {
      en: 'Where communities from Bengal, Tamil Nadu, and Punjab celebrate as one big island family along turquoise waters.',
      hi: 'जहां बंगाल, तमिलनाडु और पंजाब की संस्कृतियां मिलकर एक बड़े परिवार की तरह सागर तट पर दीपोत्सव मनाती हैं।',
      bn: 'যেখানে বাংলা, তামিল ও পাঞ্জাবের সংস্কৃতি মিলেমিশে সাগরের তীরে এক মহাউৎসবে রূপ নেয়।',
    },
    meaning: {
      "en": "Mini-India island celebration where descendants of settlers from Bengal, Tamil Nadu, Andhra, and Kerala unite on the Bay of Bengal.",
      "hi": "बंगाल की खाड़ी में लघु भारत का महापर्व, जहां हर प्रांत के लोग मिलकर दीप जलाते हैं।",
      "bn": "বঙ্গোপসাগরের বুকে ক্ষুদ্র ভারত—বাঙালি, তামিল, তেলুগু ও মালয়ালি সংস্কৃতির অপূর্ব মিলন।"
},
    howObserved: {
      "en": "Diyas line the beaches and verandas of Port Blair. Kali Puja, Tamil Ganga Snanam, and North Indian Lakshmi Puja are observed side by side. Neighbors exchange fresh coconut laddoos and seafood feasts.",
      "hi": "पोर्ट ब्लेयर के समुद्र तटों पर दीये जलते हैं। काली पूजा, गंगा स्नानम् और लक्ष्मी पूजन एक साथ मनाए जाते हैं।",
      "bn": "পোর্ট ব্লেয়ারের সৈকতে প্রদীপ জ্বলে। শ্যামাপূজা, গঙ্গাস্নান ও লক্ষ্মীপূজা একসাথে উদযাপিত হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya.",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "Port Blair hosts vibrant multicultural island melas where diverse regional festive customs merge into a harmonious whole.",
      "hi": "पोर्ट ब्लेयर में बहुसांस्कृतिक मेले लगते हैं जहां सभी राज्यों के रीति-रिवाज एक साथ झलकते हैं।",
      "bn": "পোর্ট ব্লেয়ারে বহুভাষিক দ্বীপমেলা বসে যেখানে সকল ভারতীয় সংস্কৃতির ঐক্য দেখা যায়।"
},
    source: {
      "title": "Andaman & Nicobar Tourism Official Portal",
      "url": "https://www.andamantourism.gov.in",
      "institution": "Directorate of Tourism, Andaman & Nicobar Administration"
},
    decorTradition: {
      artName: { en: 'Multi-Cultural Rangoli', hi: 'सद्भाव रंगोली', bn: 'সম্প্রীতির আলপনা' },
      artDesc: { en: 'Vibrant colors blending Indian traditions.', hi: 'अनेकता में एकता दर्शाती रंगोली।', bn: 'নানা সংস্কৃতির মেলবন্ধনে তৈরি আলপনা।' },
      diyaName: { en: 'Shell & Clay Diyas', hi: 'शंख व माटी के दीप', bn: 'শাঁখ ও মাটির প্রদীপ' },
      diyaDesc: { en: 'Earthen cups shining on island verandahs.', hi: 'बालकनियों पर जगमगाते दीये।', bn: 'বারান্দায় সাজানো প্রদীপ।' },
      toranDesc: { en: 'Coconut fronds & marigolds.', hi: 'नारियल के पत्तों का तोरण।', bn: 'নারকেল পাতা ও গাঁদা ফুলের তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🌴',
        title: { en: 'Pan-Indian Island Unity', hi: 'द्वीप का सर्वभारतीय मिलन', bn: 'দ্বীপের সর্বভারতীয় মিলন' },
        why: {
          en: 'Neighbors of diverse backgrounds share sweets from every state in a mini-India celebration.',
          hi: 'सभी राज्यों के लोग मिलकर एक साथ दीपोत्सव मनाते हैं।',
          bn: 'সব প্রদেশের মানুষ একত্রিত হয়ে দীপাবলির আনন্দ ভাগ করে নেওয়া।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Island Sweet Platter', hi: 'मिष्ठान थाली', bn: 'মিষ্টি থালি' },
      desc: { en: 'Fresh coconut laddus, payasam and sandesh.', hi: 'नारियल के लड्डू और पायसम।', bn: 'নারকেলের নাড়ু ও পায়েসের অপূর্ব স্বাদ।' },
    },
    highlight: {
      en: 'Sea breezes carrying festive cheer, beach diyas, and warm togetherness.',
      hi: 'समुद्र की लहरों के बीच मिट्टी के दीये और एकजुटता का उत्सव।',
      bn: 'সাগরের হাওয়ায় প্রদীপের স্নিগ্ধ আলো ও উৎসবের আনন্দ।',
    },
  },
  {
    id: 'lakshadweep',
    name: 'Lakshadweep',
    shortName: 'Lakshadweep',
    hi: 'लक्षद्वीप',
    bn: 'লক্ষদ্বীপ',
    isUT: true,
    festivalName: {
      en: 'Coral Lagoon Light Glow',
      hi: 'मूंगा लैगून पर दीपों की आभा',
      bn: 'প্রবাল দ্বীপে আলোর প্রতিচ্ছবি',
    },
    introTagline: {
      en: 'Where quiet evening lanterns reflect across tranquil turquoise lagoons and gentle ocean breezes carry peace.',
      hi: 'जहां शांत नीले लैगून पर दीपकों की रोशनी तैरती है और सागर की हवाएं शांति का संदेश लाती हैं।',
      bn: 'নীল সাগরের শান্ত জলে প্রদীপের স্নিগ্ধ প্রতিফলন আর দ্বীপের অনাবিল শান্তি।',
    },
    meaning: {
      "en": "Peaceful coral atoll greetings, goodwill, and solidarity during the national festival of lights.",
      "hi": "मूंगा द्वीपों पर शांति, सद्भाव और राष्ट्रीय दीपोत्सव का स्नेहिल संदेश।",
      "bn": "প্রবাল দ্বীপে শান্তি, সম্প্রীতি এবং জাতীয় আলোক উৎসবের শুভবার্তা।"
},
    howObserved: {
      "en": "Decorative lanterns and diyas glow along verandahs in Kavaratti and Agatti. Administrative staff, defense personnel, and teachers celebrate with local islanders, sharing coconut halwa and sweet Kadalakka.",
      "hi": "कवरत्ती और अगत्ती में बालकनी पर लालटेन और दीये जलते हैं। नारियल का हलवा और कदलक्का बांटकर खुशियां साझा की जाती हैं।",
      "bn": "কাভারাত্তি ও অগাত্তিতে বারান্দায় লণ্ঠন ও প্রদীপ জ্বলে। নারকেলের হালুয়া ও মিষ্টি খেয়ে শুভেচ্ছা বিনিময় হয়।"
},
    whenObserved: {
      "en": "Kartik Amavasya.",
      "hi": "कार्तिक अमावस्या।",
      "bn": "কার্তিক অমাবস্যা।"
},
    variations: {
      "en": "Celebrated with warm cross-cultural camaraderie among mainland residents and local islanders in an atmosphere of tranquility.",
      "hi": "मुख्य भूमि से आए कर्मचारियों और स्थानीय द्वीपवासियों के बीच सुंदर आत्मीयता से पर्व मनता है।",
      "bn": "দ্বীপবাসী ও সরকারি কর্মচারীদের মাঝে সম্প্রীতির সাথে উৎসব উদযাপিত হয়।"
},
    source: {
      "title": "Lakshadweep Tourism Official Portal",
      "url": "https://lakshadweeptourism.gov.in",
      "institution": "Society for Promotion of Nature Tourism and Sports (SPORTS), Lakshadweep"
},
    decorTradition: {
      artName: { en: 'Island Floral Decor', hi: 'पुष्प सज्जा', bn: 'ফুলের সাজ' },
      artDesc: { en: 'Tropical flowers and palm fronds.', hi: 'नारियल के पत्तों की सजावट।', bn: 'নারকেল পাতা ও বুনোফুলের সাজ।' },
      diyaName: { en: 'Lagoon Lanterns', hi: 'लैगून लालटेन व दीप', bn: 'দ্বীপের স্নিগ্ধ প্রদীপ' },
      diyaDesc: { en: 'Protected lamps glowing softly.', hi: 'हवा से सुरक्षित जलते दीपक।', bn: 'বাতাস থেকে সুরক্ষিত প্রদীপের শিখা।' },
      toranDesc: { en: 'Coconut palm fronds.', hi: 'नारियल के पत्तों का तोरण।', bn: 'নারকেল পাতার তোরণ।' },
    },
    keyTraditions: [
      {
        icon: '🏝️',
        title: { en: 'Lagoon Harmony & Lights', hi: 'लैगून का सौहार्द', bn: 'দ্বীপে আলোর শুভেচ্ছা' },
        why: {
          en: 'Lighting lanterns and sharing sweet coconut dishes with friends and travelers.',
          hi: 'शांति और प्रेम के प्रतीक रूप में दीप जलाना।',
          bn: 'সকলের সাথে প্রদীপ জ্বেলে মিষ্টি বিনিময়।',
        },
      },
    ],
    foodSpecialty: {
      name: { en: 'Sweet Coconut Halwa', hi: 'नारियल का हलवा', bn: 'নারকেলের হালুয়া' },
      desc: { en: 'Fresh tender coconut milk slow-cooked with jaggery and cardamom.', hi: 'नारियल और गुड़ का स्वादिष्ट हलवा।', bn: 'নারকেলের দুধ ও গুড়ে তৈরি সুস্বাদু হালুয়া।' },
    },
    highlight: {
      en: 'Turquoise lagoons reflecting glowing island lanterns and peace.',
      hi: 'नीले समुद्र के आंचल में शांत दीपकों की रोशनी और सौहार्द।',
      bn: 'শান্ত নীল সাগরের বুকে দ্বীপের প্রদীপের স্নিগ্ধ প্রতিফলন।',
    },
  },
];

export const ALL_INDIA_REGION: RegionalEntity = {
  id: 'all-india',
  name: 'All of India',
  shortName: 'Pan-India',
  hi: 'सम्पूर्ण भारत',
  bn: 'সমগ্র ভারত',
  isUT: false,
  festivalName: {
    en: 'Deepavali – The Festival of Lights Across India',
    hi: 'दीपावली – भारतवर्ष का पावन महापर्व',
    bn: 'দীপাবলি – সমগ্র ভারতের আলোর মহোৎসব',
  },
  introTagline: {
    en: 'One billion glowing lamps uniting every heart, culture, and corner of Bharat in joy and light.',
    hi: 'एक अरब पावन दीयों की रोशनी जो भारत के हर हृदय और कोने को प्रेम के सूत्र में पिरोती है।',
    bn: 'কোটি কোটি প্রদীপের আলোয় এক সূত্রে বাঁধা ভারতবর্ষের অপার স্নেহ, সম্প্রীতি ও আনন্দ।',
  },
    meaning: {
      "en": "\"Tamaso Ma Jyotirgamaya\" – From darkness lead us unto eternal light. The shared civilizational soul of Bharat celebrating unity in diversity, righteousness, and boundless love.",
      "hi": "\"तमसो मा ज्योतिर्गमय\" – अंधकार से हमें प्रकाश की ओर ले चलें। भारत की विविधता में एकता, धर्म की विजय और असीम प्रेम का महापर्व।",
      "bn": "\"তমসো মা জ্যোতির্গময়\" – অন্ধকার থেকে পরম আলোর পথে যাত্রা। ভারতের বৈচিত্র্যের মাঝে ঐক্যের অমর মহোৎসব।"
},
    howObserved: {
      "en": "Uniting 1.4 billion people across 28 states and 8 union territories: lighting earthen clay diyas on doorsteps, sweet-sharing, family homecoming, and lighting hearts.",
      "hi": "२८ राज्यों और ८ केंद्र शासित प्रदेशों में हर देहरी पर मिट्टी के दीये, आतिशबाजी, मिठाइयां और पारिवारिक मिलन।",
      "bn": "২৮টি রাজ্য ও ৮টি কেন্দ্রশাসিত অঞ্চলে ঘরে ঘরে মাটির প্রদীপ প্রজ্বলন, মিষ্টিমুখ ও আত্মীয় মিলন।"
},
    whenObserved: {
      "en": "Kartik Amavasya (pan-Indian festive season spanning Dhanteras to Bhai Dooj).",
      "hi": "कार्तिक अमावस्या (धनतेरस से भाई दूज तक)।",
      "bn": "কার্তিক অমাবস্যা (ধনতেরাস থেকে ভাইদুজ পর্যন্ত)।"
},
    variations: {
      "en": "Every state, language, and community weaves its own unique fragrance into the shared garland of Bharat’s Deepavali.",
      "hi": "हर राज्य और समुदाय अपनी अनूठी परंपरा संग भारत के साझा दीपोत्सव को समृद्ध करता है।",
      "bn": "প্রতিটি রাজ্য ও ভাষা নিজস্ব অনন্য রীতিতে ভারতের এই মহোৎসবকে সমৃদ্ধ করে।"
},
    source: {
      "title": "Incredible India & Ministry of Culture",
      "url": "https://www.incredibleindia.org",
      "institution": "Ministry of Tourism & Ministry of Culture, Government of India"
},
  decorTradition: {
    artName: {
      en: 'Universal Rangoli & Floral Kolam',
      hi: 'मांगलिक रंगोली व पुष्प सज्जा',
      bn: 'শুভ রঙিন রঙ্গোলি ও ফুলের আলপনা',
    },
    artDesc: {
      en: 'Sacred symmetrical colored powder motifs and fragrant flower petals welcoming Lakshmi and prosperity.',
      hi: 'रंग-बिरंगे रंगों, गुलाल और ताजे फूलों से चौखट पर सुख-समृद्धि का पावन स्वागत।',
      bn: 'রঙিন আবির ও তাজা ফুলের পাপড়িতে সজ্জিত শুভ শক্তির পুণ্য আবাহন।',
    },
    diyaName: {
      en: 'Panch Pradeep & Clay Diyas',
      hi: 'मिट्टी के पावन दीये व पंचप्रदीप',
      bn: 'মাটির প্রদীপ ও পঞ্চপ্রদীপ',
    },
    diyaDesc: {
      en: 'Handcrafted natural earthen clay lamps lit with pure mustard oil and cotton wicks.',
      hi: 'हाथ से गढ़े मिट्टी के दीये जो घर के हर कोने से अंधकार मिटाकर उजाला भरते हैं।',
      bn: 'হাতে গড়া মাটির প্রদীপের স্নিগ্ধ শিখা যা সকল আঁধার দূর করে গৃহ আলোকিত করে।',
    },
    toranDesc: {
      en: 'Golden marigold garlands and sacred green mango leaves over the doorway.',
      hi: 'गेंदे के सुनहरे फूल और आम के पत्तों का मांगलिक तोरण।',
      bn: 'সোনালী গাঁদা ফুল ও সতেজ আমপাতার তৈরি শুভ তোরণ।',
    },
  },
  keyTraditions: [
    {
      icon: '🪔',
      title: {
        en: 'Deepotsav: Lighting Traditional Clay Diyas',
        hi: 'दीपोत्सव: मिट्टी के दीये प्रज्वलन',
        bn: 'দীপাবলি: চিরায়ত মাটির প্রদীপ প্রজ্বালন',
      },
      why: {
        en: 'Lighting earthen oil lamps to celebrate the eternal triumph of light over darkness and wisdom over ignorance.',
        hi: 'अंधकार पर प्रकाश और अज्ञान पर ज्ञान की विजय का पावन उत्सव मनाना।',
        bn: 'অন্ধকারের ওপর আলোর মহাবিজয় ও আত্মিক শুচিতার প্রকাশ।',
      },
    },
    {
      icon: '✨',
      title: {
        en: 'Lakshmi-Ganesh Pujan & Family Gathering',
        hi: 'श्री लक्ष्मी-गणेश पूजन व पारिवारिक मिलन',
        bn: 'লক্ষ্মী-গণেশ অর্চনা ও আত্মীয় মিলন',
      },
      why: {
        en: 'Families gathering across generations to offer prayers, exchange blessings, and share abundance.',
        hi: 'परिवार के सभी सदस्यों का एक साथ मिलकर सुख, शांति व आरोग्य की प्रार्थना करना।',
        bn: 'পরিবারের সকলের একসাথে হয়ে কল্যাণ ও সমৃদ্ধির প্রার্থনা জানানো।',
      },
    },
  ],
  foodSpecialty: {
    name: {
      en: 'Festive Mithai & Faral Delicacies',
      hi: 'दिवाली मिष्ठान व पारंपरिक पकवान',
      bn: 'দীপাবলির হরেক মিষ্টি ও সুস্বাদু পদ',
    },
    desc: {
      en: 'Handcrafted motichoor laddus, kaju barfi, crunchy savories, and sweets shared across neighborhoods.',
      hi: 'मोतीचूर के लड्डू, काजू कतली और प्रेम से बनाए गए पारंपरिक व्यंजन जो हर घर में बांटे जाते हैं।',
      bn: 'লাড্ডু, কাজু বরফি আর ঘরোয়া মচমচে নিমকি-মিষ্টান্ন যা প্রতিটি পরিবারে পৌঁছে দেওয়া হয়।',
    },
  },
  highlight: {
    en: 'The shared soul of Diwali: celebrating unity in diversity, warm kinship, and heartfelt love across Bharat.',
    hi: 'भारत की विविधता में एकता और हर घर में प्रेम, उल्लास और उजाले का अमर महापर्व।',
    bn: 'ভারতের বৈচিত্র্যের মাঝে ঐক্যের অমলিন সুর এবং প্রতিটি ঘরে অনাবিল ভালোবাসার দীপ।',
  },
};

export function getRegionByName(name?: string): RegionalEntity {
  if (!name || !name.trim()) return ALL_INDIA_REGION;
  const clean = name.trim().toLowerCase();

  // Explicit check for All-India / Pan-India / Guest identifiers
  if (
    clean === 'all of india' ||
    clean === 'all india' ||
    clean === 'pan-india' ||
    clean === 'all-india' ||
    clean === 'india' ||
    clean === 'bharat' ||
    clean === 'guest' ||
    clean === 'family & friends' ||
    clean === 'परिवार व मित्र' ||
    clean === 'পরিবার ও বন্ধুরা' ||
    clean === 'सम्पूर्ण भारत' ||
    clean === 'সমগ্র ভারত' ||
    clean === 'all'
  ) {
    return ALL_INDIA_REGION;
  }

  const found = INDIAN_REGIONS.find(
    (r) =>
      r.name.toLowerCase() === clean ||
      r.shortName.toLowerCase() === clean ||
      r.id.toLowerCase() === clean ||
      r.hi.toLowerCase() === clean ||
      r.bn.toLowerCase() === clean
  );

  return found || ALL_INDIA_REGION;
}

export function getDefaultRegion(): RegionalEntity {
  return ALL_INDIA_REGION; // Return All-India universal profile as default for guests and general visitors
}
