/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from '../utils/translations';

export type RelationshipCategory =
  | 'parents'
  | 'grandparents'
  | 'siblings'
  | 'friends'
  | 'partner'
  | 'teachers'
  | 'other';

export interface GreetingMessage {
  salutation: string;
  p1: string;
  p2: string;
  p3: string;
  closing: string;
}

export interface GreetingTemplateOption {
  id: 'royal-marigold' | 'midnight-diya' | 'terracotta-chandan' | 'festive-rangoli';
  name: { en: string; hi: string; bn: string };
  description: { en: string; hi: string; bn: string };
  bgGradient: string;
  cardBg: string;
  borderClass: string;
  accentColor: string;
  textColor: string;
  secondaryTextColor: string;
  fontClass: string;
}

export const GREETING_TEMPLATES: GreetingTemplateOption[] = [
  {
    id: 'royal-marigold',
    name: {
      en: 'Royal Marigold & Toran',
      hi: 'शाही गेंदा तोरण',
      bn: 'রাজকীয় গাঁদা তোরণ',
    },
    description: {
      en: 'Warm ivory parchment framed with vibrant marigold garlands and golden lamps.',
      hi: 'गेंदे की मालाओं और सुनहरे दीपों से सजी पावन श्वेत-स्वर्ण शैली।',
      bn: 'গাঁদা ফুলের মালা ও সোনালী প্রদীপে সজ্জিত শুভ্র-স্বর্ণ থিম।',
    },
    bgGradient: 'from-[#FFFDF7] via-[#FAF3E5] to-[#F5EAD4]',
    cardBg: '#FFFDF7',
    borderClass: 'border-[#D6AD60]',
    accentColor: '#D6AD60',
    textColor: '#2A1810',
    secondaryTextColor: '#5D4037',
    fontClass: 'font-handwriting',
  },
  {
    id: 'midnight-diya',
    name: {
      en: 'Midnight Velvet & Gold',
      hi: 'मध्यरात्रि स्वर्ण आभा',
      bn: 'মধ্যরাতের নীল ও সোনালী শিখা',
    },
    description: {
      en: 'Deep royal indigo background with radiant glowing brass diyas and golden dust.',
      hi: 'शाही गहरे नीले रंग पर सोने जैसे जगमगाते पीतल के दीप और सुनहरी चमक।',
      bn: 'গাঢ় নীল ভেলভেটের ওপর উজ্জ্বল পিতলের প্রদীপ ও সোনালী আলোর ছোঁয়া।',
    },
    bgGradient: 'from-[#192747] via-[#10172D] to-[#0B0F1C]',
    cardBg: '#121A30',
    borderClass: 'border-[#F4D995]',
    accentColor: '#F4D995',
    textColor: '#FFF5DE',
    secondaryTextColor: '#F4D995',
    fontClass: 'font-royal',
  },
  {
    id: 'terracotta-chandan',
    name: {
      en: 'Sacred Terracotta & Chandan',
      hi: 'पावन माटी व चन्दन',
      bn: 'পবিত্র মাটির প্রদীপ ও চন্দন',
    },
    description: {
      en: 'Earthen terracotta warmth with authentic mitti diyas and sandalwood motifs.',
      hi: 'मिट्टी के पारंपरिक दीयों और चन्दन की महक से सराबोर सात्विक परिवेश।',
      bn: 'মাটির প্রদীপের স্নিগ্ধ আলো ও চন্দনের সুবাসে মোড়া চিরায়ত রূপ।',
    },
    bgGradient: 'from-[#2C1810] via-[#3E2415] to-[#1E0D06]',
    cardBg: '#2C1810',
    borderClass: 'border-[#B5532A]',
    accentColor: '#FFB347',
    textColor: '#FFF5DE',
    secondaryTextColor: '#F5A623',
    fontClass: 'font-editorial',
  },
  {
    id: 'festive-rangoli',
    name: {
      en: 'Festive Rangoli Blossom',
      hi: 'उत्सव रंगोली पुष्प',
      bn: 'উৎসবের রঙ্গোলি ও কুসুম',
    },
    description: {
      en: 'Soft celebratory amber hues framed by symmetrical floral rangolis and floating petals.',
      hi: 'रंग-बिरंगी पुष्प रंगोली और गुलाब की पंखुड़ियों से सजी उल्लासपूर्ण शैली।',
      bn: 'রঙিন পুষ্প রঙ্গোলি ও গোলাপের পাপড়িতে ঘেরা উৎসবের আমেজ।',
    },
    bgGradient: 'from-[#2A1525] via-[#1D1226] to-[#0E0914]',
    cardBg: '#211226',
    borderClass: 'border-[#FF80AB]',
    accentColor: '#FFD54F',
    textColor: '#FFF5DE',
    secondaryTextColor: '#FF80AB',
    fontClass: 'font-script',
  },
];

export const RELATIONSHIP_CONFIG: Record<
  RelationshipCategory,
  {
    label: { en: string; hi: string; bn: string };
    icon: string;
    defaultRecipient: { en: string; hi: string; bn: string };
    messages: Record<Language, GreetingMessage>;
  }
> = {
  parents: {
    label: { en: 'Parents', hi: 'माता-पिता', bn: 'বাবা-মা' },
    icon: '🙏',
    defaultRecipient: { en: 'Maa & Papa', hi: 'प्यारी माँ और आदरणीय पापा', bn: 'শ্রদ্ধেয় মা ও বাবা' },
    messages: {
      en: {
        salutation: 'Dearest Maa & Papa,',
        p1: 'Tonight as rows of glowing earthen diyas illuminate our home, every warm corner echoes with your selfless sacrifices, endless love, and comforting presence.',
        p2: 'You are the true soul of our family. Thank you for teaching us to walk with honesty, for blessing every dream, and for making our home a sanctuary of pure affection.',
        p3: 'May this holy festival of Deepavali bless you with vigorous health, serene peace of mind, and abundant joy. Happy Diwali!',
        closing: 'With all my love and reverence,',
      },
      hi: {
        salutation: 'मेरी प्यारी माँ और आदरणीय पापा,',
        p1: 'आज रात जब घर का हर कोना दीपों की सुनहरी रोशनी से जगमगा रहा है, मेरे मन में आपके अनमोल त्याग, स्नेह और आशीर्वाद की पावन स्मृति गूंज रही है।',
        p2: 'आप ही हमारे परिवार की असली नींव और संबल हैं। हमें सदा सच और सेवा के मार्ग पर चलना सिखाने के लिए आपका कोटि-कोटि धन्यवाद।',
        p3: 'माता लक्ष्मी और भगवान गणेश से प्रार्थना है कि वे आपको उत्तम स्वास्थ्य, दीर्घायु और अपार खुशियां प्रदान करें। दीपावली की हार्दिक शुभकामनाएं!',
        closing: 'सदा आपका कृतज्ञ व आज्ञाकारी,',
      },
      bn: {
        salutation: 'আমার শ্রদ্ধেয় মা ও বাবা,',
        p1: 'আজকের এই শুভ দীপাবলিতে যখন হাজারো প্রদীপের আলোয় ঘর উদ্ভাসিত, আমার মন আপনাদের নিঃস্বার্থ ভালোবাসা ও নীরব ত্যাগের প্রতি কৃতজ্ঞতায় ভরে উঠেছে।',
        p2: 'আপনারাই আমাদের জীবনের শ্রেষ্ঠ আলোকবর্তিকা। প্রতিটি পদক্ষেপে আমাদের সৎ পথে পরিচালিত করার জন্য ও অপার স্নেহ দেওয়ার জন্য অসংখ্য ধন্যবাদ।',
        p3: 'মা লক্ষ্মী আপনাদের জীবনকে অটুট স্বাস্থ্য, মানসিক শান্তি এবং অনাবিল আনন্দে ভরিয়ে রাখুন। শুভ দীপাবলি!',
        closing: 'অনেক ভক্তি ও প্রণতি সহ,',
      },
    },
  },

  grandparents: {
    label: { en: 'Grandparents', hi: 'दादा-दादी / नाना-नानी', bn: 'দাদু-দিদা / ঠাকুরদা-ঠাকুরমা' },
    icon: '👵👴',
    defaultRecipient: { en: 'Dadi & Dadu', hi: 'प्यारे दादाजी एवं दादीजी', bn: 'স্নেহময় দাদু ও দিদা' },
    messages: {
      en: {
        salutation: 'Dearest Grandparents,',
        p1: 'No festival in the world shines brighter than your tender smiles and the bedtime folklore that shaped our childhood.',
        p2: 'Your prayers have shielded our home across generations, and your warm hugs are the sweetest sweetness of our celebrations. We are blessed to have your guidance.',
        p3: 'Wishing you longevity, radiant good health, and joyful laughter every single day. Happy Shubh Deepavali!',
        closing: 'With deepest respect and hugs,',
      },
      hi: {
        salutation: 'आदरणीय दादाजी एवं दादीजी,',
        p1: 'दीपों का यह त्योहार आपके वात्सल्य और बचपन की उन प्यारी कहानियों के बिना अधूरा है जिन्होंने हमारे संस्कारों को संवारा है।',
        p2: 'आपकी दुआएं हमारे घर की सबसे मजबूत ढाल हैं। आपके चेहरे की मुस्कान और आपके हाथों का आशीर्वाद ही हमारे लिए सबसे बड़ा उपहार है।',
        p3: 'ईश्वर आपको दीर्घायु, निरोगी काया और सदा प्रसन्न रखें। दीपावली की कोटिशः मंगलकामनाएं!',
        closing: 'चरण स्पर्श सहित,',
      },
      bn: {
        salutation: 'আমার পরম শ্রদ্ধেয় দাদু ও দিদা,',
        p1: 'আপনাদের স্নেহের পরশ আর ছোটবেলার রূপকথার গল্পের স্মৃতি ছাড়া আমাদের কোনো উৎসবই সম্পূর্ণ হতে পারে না।',
        p2: 'আপনাদের আশিস আমাদের পরিবারের সবচেয়ে বড় রক্ষা কবচ। আপনাদের আশীর্বাদে আমাদের গৃহ সর্বদা ভালোবাসায় ভরে থাকুক।',
        p3: 'ঈশ্বর আপনাদের দীর্ঘায়ু, নীরোগ শরীর ও অপার মানসিক শান্তি প্রদান করুন। শুভ দীপাবলি!',
        closing: 'ভক্তিপূর্ণ প্রণাম সহ,',
      },
    },
  },

  siblings: {
    label: { en: 'Siblings', hi: 'भाई-बहन', bn: 'ভাই-বোন' },
    icon: '👫',
    defaultRecipient: { en: 'Bhaiya / Didi', hi: 'मेरे प्यारे भाई / प्यारी बहना', bn: 'স্নেহের ভাই / দিদি' },
    messages: {
      en: {
        salutation: 'Hey Partner-in-Crime,',
        p1: 'Happy Diwali! From stealing laddoos before the evening puja to sharing laughter on the terrace under fireworks, Diwali has always been magical because of you.',
        p2: 'Thank you for having my back through every thick and thin, for the silly banter, and for keeping my secrets safe. Life is infinitely brighter with you around.',
        p3: 'May your future be packed with extraordinary achievements, limitless laughter, and sweet surprises. Keep shining like a superstar!',
        closing: 'With endless love & high-fives,',
      },
      hi: {
        salutation: 'मेरे प्यारे भाई / प्यारी बहना,',
        p1: 'शुभ दीपावली! पूजा से पहले चुपके से मिठाइयां खाने से लेकर आतिशबाजी के मजे लेने तक—तुम्हारे बिना मेरा कोई भी त्योहार पूरा नहीं होता।',
        p2: 'हर शरारत में साथी बनने, हर मुश्किल में ढाल की तरह साथ खड़े रहने और हर दिन को खास बनाने के लिए शुक्रिया।',
        p3: 'यह नया वर्ष तुम्हारे सारे सपनों को पूरा करे और तुम्हारी ज़िंदगी में ढेर सारी खुशियां और सफलता लाए। मस्त रहो!',
        closing: 'ढेर सारे प्यार और मस्ती के साथ,',
      },
      bn: {
        salutation: 'আমার প্রিয় ভাই / বোন,',
        p1: 'শুভ দীপাবলি! পুজোর আগে চুপিচুপি লাড্ডু খাওয়া থেকে শুরু করে ছাদজুড়ে আলোর রোশনাই—তোকে ছাড়া উৎসবের কোনো মজাই নেই।',
        p2: 'সব সময় পাশে থাকার জন্য, খুনসুটি করার জন্য এবং জীবনের প্রতিটি মুহূর্তে আনন্দ ছড়িয়ে দেওয়ার জন্য তোকে অনেক ভালোবাসা।',
        p3: 'সামনের দিনগুলো তোর জন্য অপার সাফল্য, নতুন দিগন্ত আর অফুরন্ত খুশি বয়ে আনুক। খুব ভালো থাকিস!',
        closing: 'অনেক স্নেহ ও ভালোবাসা সহ,',
      },
    },
  },

  friends: {
    label: { en: 'Friends', hi: 'मित्र', bn: 'বন্ধু' },
    icon: '✨',
    defaultRecipient: { en: 'Dearest Friend', hi: 'मेरे प्रिय मित्र', bn: 'প্রিয় বন্ধু' },
    messages: {
      en: {
        salutation: 'Dearest Friend,',
        p1: 'Wishing you and your family a dazzling and blessed Diwali! On this festival of lights, I want to celebrate the priceless bond of friendship we share.',
        p2: 'True friends are like the quiet wicks in an oil lamp—illuminating dark times with laughter, honest advice, and warm presence. Thank you for being such an anchor in my journey.',
        p3: 'May Goddess Lakshmi bestow boundless prosperity, vibrant wellness, and immense professional triumph on your doorstep. Have an unforgettable celebration!',
        closing: 'With warmest festive cheers,',
      },
      hi: {
        salutation: 'मेरे प्यारे दोस्त,',
        p1: 'तुम्हें और तुम्हारे पूरे परिवार को दीपावली की अनंत हार्दिक शुभकामनाएं! यह दीपपर्व तुम्हारे जीवन में नई उमंग, नई आशा और अपार खुशियां लेकर आए।',
        p2: 'सच्चे दोस्त जीवन की सबसे बड़ी पूंजी होते हैं। हर सुख-दुख में साथ देने, बिना शर्त समझने और जिंदगी को खुशनुमा बनाने के लिए बहुत-बहुत शुक्रिया।',
        p3: 'ईश्वर तुम्हें हर कदम पर सफलता, अच्छा स्वास्थ्य और सुख-समृद्धि प्रदान करें। यूं ही सदा खिलखिलाते रहो!',
        closing: 'सच्ची दोस्ती और स्नेह सहित,',
      },
      bn: {
        salutation: 'আমার প্রিয় বন্ধু,',
        p1: 'তোমাকে ও তোমার পুরো পরিবারকে জানাই শুভ দীপাবলির প্রীতি ও আন্তরিক শুভেচ্ছা! আলোর এই মহা উৎসব তোমার জীবনকে উদ্ভাসিত করুক।',
        p2: 'জীবনের প্রতিটি মুহূর্তে একজন ভালো বন্ধু পাশে থাকা পরম সৌভাগ্যের। তোর বন্ধুত্ব, আন্তরিকতা আর নিখাদ ভালোবাসার জন্য অনেক ধন্যবাদ।',
        p3: 'মা লক্ষ্মী তোর গৃহে সুখ, সমৃদ্ধি ও সৌভাগ্য বর্ষণ করুন। দিনগুলো আলো আর সাফল্যে ভরে উঠুক!',
        closing: 'আন্তরিক ভালোবাসা ও শুভেচ্ছা সহ,',
      },
    },
  },

  partner: {
    label: { en: 'Partner', hi: 'जीवनसाथी', bn: 'জীবনসঙ্গী / প্রিয়জন' },
    icon: '❤️',
    defaultRecipient: { en: 'My Love', hi: 'मेरी हमसफ़र / मेरे हमदम', bn: 'আমার প্রিয়তম / প্রিয়তমা' },
    messages: {
      en: {
        salutation: 'My Dearest Love,',
        p1: 'Happy Diwali to the radiant light of my life. Among all the golden lamps illuminating the city tonight, none shines as brightly or gently as your beautiful soul.',
        p2: 'Every celebration is sweeter because I get to hold your hand, share silent smiles, and build our home together. Thank you for filling my everyday world with warmth and wonder.',
        p3: 'May our bond grow deeper with every passing year, and may our lives forever glow with laughter, trust, and timeless devotion.',
        closing: 'Forever and always yours,',
      },
      hi: {
        salutation: 'मेरे हमदम, मेरी जान,',
        p1: 'तुम्हें दीपावली की अनमोल शुभकामनाएं। आज जब पूरा संसार दीपों से जगमगा रहा है, मेरी दुनिया का सबसे खूबसूरत और पावन उजाला सिर्फ तुम हो।',
        p2: 'तुम्हारा साथ होना ही मेरे हर त्योहार की सबसे बड़ी मिठास है। हर दिन को प्रेम, विश्वास और खुशियों से भरने के लिए तुम्हारा शुक्रिया।',
        p3: 'ईश्वर करे हमारा यह प्रेम सदा दीपों की पावन ज्योति की तरह अखंड, पवित्र और प्रकाशित रहे। शुभ दीपावली!',
        closing: 'सिर्फ और सिर्फ तुम्हारा,',
      },
      bn: {
        salutation: 'আমার প্রিয়তম / প্রিয়তমা,',
        p1: 'শুভ দীপাবলি আমার জীবনের সবচেয়ে স্নিগ্ধ আলো। আকাশের সমস্ত তারার আলো আর পৃথিবীর সব প্রদীপের রোশনাইও তোমার ভালোবাসার চেয়ে বেশি উজ্জ্বল নয়।',
        p2: 'তোমার হাত ধরে জীবনের পথ চলাটাই আমার জীবনের শ্রেষ্ঠ উপহার। আমাদের ঘরটাকে ভালোবাসা আর শান্তিতে ভরিয়ে রাখার জন্য অনেক ধন্যবাদ।',
        p3: 'আমাদের এই ভালোবাসার প্রদীপ আজীবন অবিচল থাকুক। অফুরন্ত সুখ আর ভালোবাসায় ভরে উঠুক আমাদের আগামী দিনগুলো।',
        closing: 'চিরদিনের ভালোবাসায়,',
      },
    },
  },

  teachers: {
    label: { en: 'Teachers / Gurus', hi: 'गुरुजन / शिक्षक', bn: 'শিক্ষক-শিক্ষিকা / গুরুজন' },
    icon: '📖',
    defaultRecipient: { en: 'Respected Teacher / Guruji', hi: 'आदरणीय गुरुवर', bn: 'শ্রদ্ধেয় শিক্ষক মহাশয় / গুরুজী' },
    messages: {
      en: {
        salutation: 'Respected Guruji / Teacher,',
        p1: 'On this auspicious Deepavali, I offer my humble pranaam to you. True education is the greatest lamp of all—the light that dissolves ignorance and awakens wisdom.',
        p2: 'Thank you for your tireless patience, for seeing potential when we doubted ourselves, and for planting values that guide my actions every single day.',
        p3: 'May Goddess Saraswati and Goddess Lakshmi bless you and your family with boundless peace, reverence, robust health, and fulfillment.',
        closing: 'With deepest gratitude and respect,',
      },
      hi: {
        salutation: 'आदरणीय गुरुवर,',
        p1: 'दीपावली के इस पावन पर्व पर आपके चरणों में मेरा सादर प्रणाम। अज्ञान के अंधकार को मिटाकर ज्ञान की अखंड ज्योति जलाने वाले आप ही हमारे सच्चे मार्गदर्शक हैं।',
        p2: 'आपके दिए संस्कारों और प्रेरणा ने ही मुझे जीवन की सही दिशा दिखाई है। आपके धैर्य, ज्ञान और वात्सल्य के लिए मैं सदैव आपका आभारी रहूंगा।',
        p3: 'माता सरस्वती और मां लक्ष्मी का पावन आशीर्वाद आप पर सदा बना रहे। आपको उत्तम स्वास्थ्य और परम शांति प्राप्त हो।',
        closing: 'चरण वंदना सहित,',
      },
      bn: {
        salutation: 'শ্রদ্ধেয় শিক্ষক মহাশয় / গুরুজী,',
        p1: 'দীপাবলির এই পুণ্যলগ্নে আপনার চরণে আমার সশ্রদ্ধ প্রণাম জানাই। অজ্ঞতার অন্ধকার দূর করে বিদ্যার যে আলোকবর্তিকা আপনি প্রজ্বলিত করেছেন, তা আমার জীবনের সবচেয়ে বড় সম্পদ।',
        p2: 'আপনার অসীম ধৈর্য, গভীর জ্ঞান এবং আশীর্বাদ আমাকে সৎ পথে চলার শক্তি যুগিয়েছে। আপনার এই অবদান চিরস্মরণীয়।',
        p3: 'মা সরস্বতী ও মা লক্ষ্মীর কৃপায় আপনার জীবন সুখ, শান্তি ও সুস্থতায় ভরে উঠুক। শুভ দীপাবলি!',
        closing: 'বিনম্র শ্রদ্ধা ও প্রণাম সহ,',
      },
    },
  },

  other: {
    label: { en: 'Other Loved Ones', hi: 'अन्य प्रियजन', bn: 'অন্যান্য আপনজন' },
    icon: '🌸',
    defaultRecipient: { en: 'Dear Loved One', hi: 'आत्मीय जन', bn: 'স্নেহের পরিজন' },
    messages: {
      en: {
        salutation: 'Dearest Loved One,',
        p1: 'Warmest festive greetings on this radiant festival of Deepavali! May the divine glow of sacred oil lamps illuminate every path of your life with harmony.',
        p2: 'In this festive season of togetherness, we remember and celebrate the special bond we share with you. Thank you for your kindness and warm presence.',
        p3: 'Wishing you and your household abundance of wealth, sparkling health, and unshakeable contentment today and throughout the coming year!',
        closing: 'With warm regards and festive love,',
      },
      hi: {
        salutation: 'प्रिय आत्मीय जन,',
        p1: 'दीपोत्सव के इस पावन अवसर पर आपको और आपके समस्त परिवार को हार्दिक शुभकामनाएं। दीपों का यह दिव्य प्रकाश आपके जीवन के हर अंधेरे को मिटा दे।',
        p2: 'रिश्तों की मिठास और आपसी सौहार्द ही इस त्योहार का सच्चा आनंद है। हमारे जीवन में आपकी स्नेहिल उपस्थिति के लिए हृदय से आभार।',
        p3: 'माता लक्ष्मी आपके घर को धन-धान्य, शांति और आरोग्य से परिपूर्ण रखें। मंगलमय दीपावली!',
        closing: 'सस्नेह शुभकामनाओं सहित,',
      },
      bn: {
        salutation: 'আমার স্নেহের পরিজন,',
        p1: 'আলোর উৎসব দীপাবলিতে আপনাকে ও আপনার পরিবারের সকলকে জানাই আন্তরিক শুভকামনা। মাটির প্রদীপের পুণ্য আলোয় দূর হোক সব গ্লানি।',
        p2: 'উৎসবের এই আনন্দের দিনে আপনার সঙ্গে আমাদের আন্তরিক সম্পর্কের কথা পরম শ্রদ্ধার সাথে স্মরণ করছি। আপনার শুভাকাঙ্ক্ষার জন্য অশেষ ধন্যবাদ।',
        p3: 'সুখ, সমৃদ্ধি, সৌভাগ্য ও চিরন্তন শান্তিতে আপনার সংসার ভরে উঠুক। শুভ দীপাবলি!',
        closing: 'আন্তরিক প্রীতি ও শুভেচ্ছা সহ,',
      },
    },
  },
};
