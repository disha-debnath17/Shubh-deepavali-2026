/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Personalised Letters Configuration for Shubh Deepavali
// Only the recipient corresponding to ?k=<code> receives their letter.
// If no code or invalid, the generic 'default' letter is loaded.

export interface LetterContent {
  salutation: string;
  p1: string;
  p2: string;
  p3: string;
  closing: string;
  signature: string;
}

export interface MultilingualLetter {
  en: LetterContent;
  hi: LetterContent;
  bn: LetterContent;
}

export const LETTERS: Record<string, MultilingualLetter> = {
  mom: {
    en: {
      salutation: 'Dearest Maa,',
      p1: 'Tonight as thousands of golden diyas light up our home, every warm corner reminds me of you. You are the heartbeat of every festival, the love behind every delicacy, and the gentle light that guides our family through every season.',
      p2: 'Thank you for your tireless love, your warm embraces, and for making home the most comforting place in the world. No matter where life takes me, your blessings are my greatest strength.',
      p3: 'May this Diwali wrap you in supreme health, serene peace, and endless smiles. Happy Diwali, Maa!',
      closing: 'With all my love & respect,',
      signature: 'Forever your child',
    },
    hi: {
      salutation: 'मेरी प्यारी माँ,',
      p1: 'आज रात जब घर का कोना-कोना दीपों की सुनहरी रोशनी से जगमगा रहा है, हर एक दीया आपकी ममता और त्याग की याद दिलाता है। आप ही हमारे हर त्योहार की असली रौनक और आत्मा हैं।',
      p2: 'आपके अनमोल स्नेह, स्वादिष्ट पकवानों और बिना कहे सब समझ जाने वाली ममता के लिए हृदय से धन्यवाद। आपकी दुआएं ही मेरी सबसे बड़ी ताकत हैं।',
      p3: 'ईश्वर आपको उत्तम स्वास्थ्य, दीर्घायु और अपार खुशियां प्रदान करें। दीपावली की हार्दिक शुभकामनाएं, माँ!',
      closing: 'सदा आपका लाड़ला,',
      signature: 'सस्नेह प्रणाम',
    },
    bn: {
      salutation: 'আমার প্রিয়তম মা,',
      p1: 'আজ রাতে যখন ঘরের প্রতিটি কোণ প্রদীপের আলোয় উজ্জ্বল হয়ে উঠেছে, প্রতিটি আলো তোমার ভালোবাসার কথা মনে করিয়ে দেয়। তুমিই আমাদের প্রতিটি উৎসবের আসল আনন্দ।',
      p2: 'তোমার নিঃস্বার্থ স্নেহ, সুস্বাদু রান্না এবং গভীর ভালোবাসার জন্য অনেক ধন্যবাদ। তোমার আশীর্বাদই আমার জীবনের সবচেয়ে বড় আশ্রয়।',
      p3: 'মা লক্ষ্মী তোমার জীবনকে সুস্বাস্থ্য, শান্তি এবং অফুরন্ত আনন্দে ভরিয়ে তুলুন। শুভ দীপাবলি, মা!',
      closing: 'অনেক শ্রদ্ধা ও ভালোবাসা সহ,',
      signature: 'তোমার স্নেহের সন্তান',
    },
  },

  dad: {
    en: {
      salutation: 'Dearest Papa,',
      p1: 'On this auspicious Diwali night, amidst the laughter and glowing lanterns, I find myself thinking about everything you do so quietly for all of us. You are our pillar of strength and our guiding compass.',
      p2: 'Thank you for every unspoken sacrifice, your endless wisdom, and for teaching us to walk with courage and humility. Seeing you smile is our greatest joy this festive season.',
      p3: 'Wishing you robust health, deep peace of mind, and immense prosperity today and always. Happy Diwali, Papa!',
      closing: 'With endless admiration & love,',
      signature: 'With gratitude and pride',
    },
    hi: {
      salutation: 'आदरणीय पापा,',
      p1: 'दिवाली की इस पावन रात पर जब पूरा आंगन दीपों से मुस्कुरा रहा है, मुझे आपकी वह खामोश मेहनत और त्याग याद आता है जो आपने हम सबके सपनों के लिए किया है।',
      p2: 'हर कठिन मोड़ पर हमारा संबल बनने और ईमानदारी का पाठ पढ़ाने के लिए आपका कोटि-कोटि धन्यवाद। आपके चेहरे की एक मुस्कान ही हमारे त्योहार की सबसे बड़ी खुशी है।',
      p3: 'भगवान से प्रार्थना है कि आपका जीवन सदैव उत्तम स्वास्थ्य, शांति और सम्मान से जगमगाता रहे। शुभ दीपावली, पापा!',
      closing: 'चरण स्पर्श सहित,',
      signature: 'सदा आपका आज्ञाकारी',
    },
    bn: {
      salutation: 'শ্রদ্ধেয় বাবা,',
      p1: 'দীপাবলির এই শুভ লগ্নে, যখন আলোর মালায় পৃথিবী সেজে উঠেছে, আপনার নীরব ত্যাগ আর অসীম স্নেহের কথা মনে পড়ে। আপনি আমাদের জীবনের সবচেয়ে মজবুত স্তম্ভ।',
      p2: 'আমাদের সমস্ত স্বপ্ন পূরণ করতে আপনি যে কষ্ট করেছেন, তার তুলনা নেই। আপনার সততা ও আদর্শ আমাদের পথপ্রদর্শক।',
      p3: 'ঈশ্বর আপনাকে দীর্ঘায়ু, সুস্বাস্থ্য ও চিরন্তন শান্তি দান করুন। শুভ দীপাবলি, বাবা!',
      closing: 'প্রণাম ও শ্রদ্ধা সহ,',
      signature: 'আপনার সন্তান',
    },
  },

  sister: {
    en: {
      salutation: 'Dearest Sister (and official Drama Queen) ✨,',
      p1: 'Diwali without your outfit emergencies, 50 photo retakes for one decent candid, and fighting over the last piece of kaju katli would be completely peaceful... which is exactly why we need you to make it wonderfully chaotic!',
      p2: 'Jokes aside, you bring pure spark, colors, and rhythm to our home. Thank you for being my lifelong secret keeper, my partner-in-crime, and the person who laughs at my worst jokes (even when you pretend to cringe).',
      p3: 'May your year ahead be as luminous, glamorous, and magical as tonight. Keep shining, stealing my sweets, and spreading happiness! Happy Diwali, Didi!',
      closing: 'With lots of love, jokes & high-fives (and save some sweets for me!),',
      signature: 'Your favorite partner-in-crime',
    },
    hi: {
      salutation: 'मेरी प्यारी बहना (और घर की सबसे बड़ी नौटंकी) ✨,',
      p1: 'दिवाली पर तुम्हारे 50 बार कपड़े बदलने, एक अच्छी फोटो के लिए 100 सेल्फी लेने और काजू कतली के आखिरी टुकड़े के लिए लड़ने के बिना हमारा घर बिल्कुल शांत रहेगा... और सच कहूं तो तुम्हारे ड्रामे के बिना कोई त्योहार पूरा हो ही नहीं सकता!',
      p2: 'मजाक से हटकर, तुम ही हमारे घर की असली चमक, रौनक और सबसे प्यारी हंसी हो। मेरे सारे सीक्रेट्स छुपाने के लिए और हर मुश्किल में साथ खड़े रहने के लिए शुक्रिया।',
      p3: 'माता लक्ष्मी तुम्हें हमेशा मुस्कुराती रखें, तुम्हारी जिंदगी में ढेर सारी खुशियां, नई शॉपिंग और सफलता लाएं। शुभ दीपावली, बहना!',
      closing: 'ढेर सारे प्यार, मस्ती और हंसी के साथ (मिठाई मेरे लिए भी बचाना!),',
      signature: 'तुम्हारा प्यारा भाई/बहन',
    },
    bn: {
      salutation: 'আমার মিষ্টি বোন/দিদি (আর ঘরের সেরা ড্রামা কুইন) ✨,',
      p1: 'দীপাবলিতে তোর নতুন জামার ফ্যাশন শো, একটা ভালো ছবির জন্য ৫০টা সেলফি তোলা, আর শেষ মিষ্টিটার জন্য কাড়াকাড়ি ছাড়া উৎসবটা কিন্তু বড্ড শান্ত হয়ে যেত... আর সত্যি বলতে তোর এই পাগলামি ছাড়া কোনো উৎসব জমেই না!',
      p2: 'ঠাট্টা বাদ দিলে, তুই-ই আমাদের বাড়ির আসল আলো আর আনন্দ। সব গোপন কথার সাথী হওয়ার জন্য আর সব পরিস্থিতিতে পাশে থাকার জন্য তোকে অনেক অনেক ভালোবাসা।',
      p3: 'এই দীপাবলি তোর জীবনে অফুরন্ত সাফল্য, নতুন জামাকাপড় আর অপার আনন্দ নিয়ে আসুক। সবসময় এমন প্রাণবন্ত আর হাসিখুশি থাকিস! শুভ দীপাবলি!',
      closing: 'অনেক খুনসুটি, ভালোবাসা ও হাসির সাথে (আর আমার ভাগের মিষ্টিটা রেখে দিস!),',
      signature: 'তোর পার্টনার-ইন-ক্রাইম',
    },
  },

  brother: {
    en: {
      salutation: 'Hey Champ / Bhaiya,',
      p1: 'Happy Diwali to the official sweet thief and rocket specialist! Remember when we tried lighting fireworks in a bucket? Good times.',
      p2: 'Thanks for having my back through thick and thin, for the playful roasts, the late night gaming sessions, and being someone I can always count on.',
      p3: 'May your future level up with massive victories, great health, and limitless good fortune. Enjoy every bit of this celebration!',
      closing: 'Cheers and high-fives,',
      signature: 'Your sibling',
    },
    hi: {
      salutation: 'मेरे प्यारे भाई (और दिवाली के रॉकेट मास्टर),',
      p1: 'शुभ दीपावली! पूजा से पहले छुपकर मिठाई खाने से लेकर छत पर पटाखे फोड़ने तक—तुम्हारे बिना कोई भी त्योहार अधूरा है।',
      p2: 'हर मुश्किल में ढाल बनकर खड़े रहने के लिए, वो हंसी-मजाक और जिंदगी का हर पल मजेदार बनाने के लिए शुक्रिया।',
      p3: 'माता लक्ष्मी की कृपा से तुम्हारे सारे सपने सच हों और तुम्हारा हर दिन नई जीत लेकर आए। मस्त रहो, खुश रहो!',
      closing: 'यारी और प्यार के साथ,',
      signature: 'तुम्हारा भाई/बहन',
    },
    bn: {
      salutation: 'প্রিয় ভাই (আর আতশবাজির ওস্তাদ),',
      p1: 'শুভ দীপাবলি! উৎসবের আনন্দ আর মিষ্টি খাওয়ার প্রতিযোগিতা তোমার সঙ্গে না থাকলে দীপাবলি জমেই না।',
      p2: 'সব সময় পাশে থাকার জন্য আর জীবনটাকে সবসময় আনন্দের রাখার জন্য তোকে অনেক ধন্যবাদ।',
      p3: 'তোমার সব স্বপ্ন সফল হোক, সামনের দিনগুলো আলো আর সাফল্যে ভরে উঠুক। অনেক শুভকামনা!',
      closing: 'ভালোবাসা ও শুভেচ্ছা সহ,',
      signature: 'তোর ভাই/বোন',
    },
  },

  bestie: {
    en: {
      salutation: 'Dearest Bestie,',
      p1: 'Happy Diwali to the one who makes everyday life feel like a festival! From endless 2 AM chats to laughing until our stomachs hurt, our bond is my favorite blessing.',
      p2: 'Thank you for listening without judgment, cheering me on in every storm, and matching my wildest energy. You truly are family chosen by heart.',
      p3: 'May your path be paved with golden opportunities, true friendships, immense peace, and radiant success. Shine on, superstar!',
      closing: 'With all my heart,',
      signature: 'Your best friend forever',
    },
    hi: {
      salutation: 'मेरी जान, मेरी प्यारी बेस्टी,',
      p1: 'शुभ दीपावली! तुम्हारे जैसा सच्चा दोस्त मिलना किसी वरदान से कम नहीं है। देर रात की बातें, बिना वजह हंसना और हर सुख-दुख में साथ होना—सब अनमोल है।',
      p2: 'हमेशा मेरी ताकत बनने के लिए, मुझे बिना किसी शर्त के समझने के लिए शुक्रिया। हमारी यह दोस्ती हमेशा ऐसी ही महकती रहे।',
      p3: 'यह रोशनी का त्योहार तुम्हारी जिंदगी में ढेर सारी खुशियां, नई उड़ान और अपार सफलता लाए। चमकते रहो!',
      closing: 'सच्ची दोस्ती के साथ,',
      signature: 'तेरा हमेशा का यार',
    },
    bn: {
      salutation: 'আমার প্রিয় বেস্টি,',
      p1: 'শুভ দীপাবলি! তোর মতো একজন খাঁটি বন্ধু পাওয়া জীবনের অন্যতম সেরা উপহার। কত রাত জাগা গল্প, হাসি আর স্মৃতি যে আমাদের ঝুলিতে আছে!',
      p2: 'সব সময় আমার পাশে থাকার জন্য আর যেকোনো পরিস্থিতিতে আমাকে ভরসা দেওয়ার জন্য ধন্যবাদ।',
      p3: 'এই দীপাবলি তোর জীবনে নতুন আলো, আনন্দ ও অপরিসীম সাফল্য বয়ে আনুক। শুভ দীপাবলি, দোস্ত!',
      closing: 'আন্তরিক ভালোবাসা সহ,',
      signature: 'তোর প্রিয় বন্ধু',
    },
  },

  someoneSpecial: {
    en: {
      salutation: 'Dearest Someone Special ❤️,',
      p1: 'Tonight as hundreds of golden diyas light up the autumn sky, every flickering flame reminds me of the warmth, sweetness, and happiness you bring into my world.',
      p2: 'You make every ordinary moment feel like a festival. Thank you for your gentle smile, your understanding heart, and for making my life feel so wonderfully complete.',
      p3: 'May this Diwali bring boundless peace, radiant laughter, and sweet prosperity to your days. May our bond continue to grow stronger and brighter with every passing year. Happy Diwali, with all my love.',
      closing: 'With all my heart & deepest affection,',
      signature: 'Forever Yours ❤️',
    },
    hi: {
      salutation: 'मेरे सबसे खास और प्यारे हमसफ़र ❤️,',
      p1: 'आज रात जब अनगिनत दीपों की रोशनी से जहां जगमगा रहा है, हर एक दीये की लौ मुझे आपकी उस प्यारी मुस्कान और अपनत्व की याद दिलाती है जो मेरी दुनिया को महकाती है।',
      p2: 'आपकी मौजूदगी मेरे हर दिन को त्योहार बना देती है। मेरे जीवन में इतनी खुशियां, सुकून और प्यार भरने के लिए दिल से शुक्रिया।',
      p3: 'भगवान करे यह दीपावली आपके जीवन में सुख, शांति, अपार सफलता और अनंत खुशियां लेकर आए। हमारी यह डोर हर दिन और मजबूत हो। शुभ दीपावली!',
      closing: 'पूरे दिल और बेपनाह मोहब्बत के साथ,',
      signature: 'सदा आपका/आपकी ❤️',
    },
    bn: {
      salutation: 'আমার মনের সবচেয়ে বিশেষ মানুষটি ❤️,',
      p1: 'আজ রাতে যখন হাজারো মাটির প্রদীপের আলোয় আকাশ সেজে উঠেছে, প্রতিটি প্রদীপের শিখা তোমার মধুর হাসির কথা মনে করিয়ে দেয়।',
      p2: 'তুমি আমার সাধারণ জীবনটাকে উৎসবের মতো সুন্দর করে তুলেছো। তোমার ভালোবাসা ও আন্তরিকতার জন্য কৃতজ্ঞতার শেষ নেই।',
      p3: 'এই দীপাবলি তোমার জীবনে অপার শান্তি, আনন্দ ও সাফল্য নিয়ে আসুক। আমাদের এই ভালোবাসার বন্ধন যেন আজীবন অটুট থাকে। শুভ দীপাবলি!',
      closing: 'হৃদয়ের সমস্ত ভালোবাসা সহ,',
      signature: 'চিরকাল তোমার ❤️',
    },
  },

  friend: {
    en: {
      salutation: 'Dearest Friend,',
      p1: 'Wishing you and your loved ones a very Happy and Prosperous Diwali! On this festival of lights, I want to celebrate the warm connection and camaraderie we share.',
      p2: 'Good friends make ordinary moments extraordinary. Thank you for your warmth, good cheer, and steadfast presence in my journey.',
      p3: 'May the divine light of Deepavali dispel all doubts and bring health, abundance, and bright achievements to your doorstep. Have a glorious celebration!',
      closing: 'Warmest festive regards,',
      signature: 'Your dear friend',
    },
    hi: {
      salutation: 'प्रिय मित्र,',
      p1: 'आपको और आपके पूरे परिवार को दीपावली की अनंत मंगलकामनाएं! यह दीपपर्व आपके जीवन में नई रोशनी, नया उत्साह और अपार खुशियां लेकर आए।',
      p2: 'सच्चे मित्रों का साथ जीवन की सबसे बड़ी दौलत है। आपकी मित्रता, अपनत्व और विश्वास के लिए बहुत-बहुत धन्यवाद।',
      p3: 'ईश्वर आपको सुख, समृद्धि और आरोग्य से परिपूर्ण रखें। हर दिन दीपों की भांति मंगलमय हो। शुभ दीपावली!',
      closing: 'हार्दिक शुभकामनाओं सहित,',
      signature: 'आपका मित्र',
    },
    bn: {
      salutation: 'প্রিয় বন্ধু,',
      p1: 'তোমাকে ও তোমার পরিবারকে শুভ দীপাবলির আন্তরিক শুভেচ্ছা ও অভিনন্দন! আলোর এই উৎসব তোমার জীবনকে আলোকিত করুক।',
      p2: 'তোমার বন্ধুত্ব ও আন্তরিকতা আমার জীবনে অত্যন্ত মূল্যবান। পাশে থাকার জন্য অনেক ধন্যবাদ।',
      p3: 'মা লক্ষ্মী তোমার ঘরে সুখ, সমৃদ্ধি ও শান্তি বজায় রাখুন। সুন্দর ও আনন্দময় দীপাবলি কাটুক!',
      closing: 'শুভকামনা সহ,',
      signature: 'তোমার বন্ধু',
    },
  },

  grandparents: {
    en: {
      salutation: 'Dearest Dadu and Dadi,',
      p1: 'On this glowing Diwali night, our deepest prayers and love turn to you. Your gentle smiles, warm blessings, and timeless stories are the golden thread that holds our entire family together.',
      p2: 'Thank you for every prayer you whisper for us, for your unconditional love, and for filling our lives with grace and roots. Having your blessings is our greatest fortune.',
      p3: 'May this holy Deepavali bring you vibrant health, serene peace of mind, long life, and continuous happiness. Happy Diwali, Dadu and Dadi!',
      closing: 'With deepest reverence, love & heartfelt pranam,',
      signature: 'Your loving grandchildren',
    },
    hi: {
      salutation: 'आदरणीय दादू और दादी,',
      p1: 'दिवाली की इस पावन रात पर हम सभी का हृदय आपके प्रति अपार आदर और प्रेम से भर जाता है। आपकी छत्रछाया, आशीर्वाद और संस्कार ही हमारे परिवार की सबसे अमूल्य पूंजी हैं।',
      p2: 'हमारे लिए आपकी हर प्रार्थना, अनमोल सीख और असीम स्नेह के लिए कोटि-कोटि धन्यवाद। आपका हाथ हमारे सिर पर होना ही हमारा सबसे बड़ा संबल है।',
      p3: 'ईश्वर आपको दीर्घायु, उत्तम स्वास्थ्य और चिर शांति प्रदान करें। शुभ दीपावली, दादू और दादी!',
      closing: 'सादर चरण स्पर्श एवं अनंत प्रणाम,',
      signature: 'आपके प्यारे पोता-पोती/नाती-नातिन',
    },
    bn: {
      salutation: 'শ্রদ্ধেয় দাদু ও দিদিমা,',
      p1: 'দীপাবলির এই পুণ্য লগ্নে আপনাদের চরণস্পর্শ করে জানাই আন্তরিক প্রণাম ও শ্রদ্ধা। আপনাদের স্নেহ, আশীর্বাদ আর ভালোবাসাই আমাদের পরিবারের মূল ভিত্তি।',
      p2: 'আমাদের জন্য আপনাদের প্রতিটি প্রার্থনা ও স্নেহের স্পর্শ আমাদের জীবনের সবচেয়ে বড় সম্পদ। আপনাদের ভালোবাসা আমাদের প্রতিটি দিনকে সুন্দর করে তোলে।',
      p3: 'মা লক্ষ্মী আপনাদের সুস্বাস্থ্য, দীর্ঘায়ু ও অফুরন্ত শান্তিতে রাখুন। শুভ দীপাবলি, দাদু ও দিদিমা!',
      closing: 'শ্রদ্ধা ও প্রণাম সহ,',
      signature: 'আপনাদের স্নেহের নাতি-নাতনিরা',
    },
  },

  default: {
    en: {
      salutation: 'Dearest Family & Friends,',
      p1: 'As the warm golden glow of earthen diyas fills the night, we send you our warmest greetings on this festival of lights. May your home be blessed with harmony and warmth.',
      p2: 'Diwali is a gentle reminder that love, togetherness, and goodness conquer all shadows. We cherish having you in our lives and celebrate the joy of sharing this special journey together.',
      p3: 'May Goddess Lakshmi bestow prosperity, health, and radiant joy upon you and your loved ones. Wishing you a truly magnificent and blessed Deepavali!',
      closing: 'With lots of love and warm wishes,',
      signature: 'The Family',
    },
    hi: {
      salutation: 'प्रिय परिवार एवं आत्मीय जन,',
      p1: 'दीपों की पावन जगमगाहट और सुखद वातावरण के बीच आप सभी को दीपावली की हार्दिक शुभकामनाएं। ईश्वर करे कि यह पावन पर्व आपके आंगन को खुशियों से महका दे।',
      p2: 'यह रोशनी का त्योहार हमें सिखाता है कि प्रेम, सद्भाव और अपनत्व से हर अंधकार को मिटाया जा सकता है। आप सभी का हमारे जीवन में होना हमारी सबसे बड़ी पूंजी है।',
      p3: 'माता लक्ष्मी और भगवान गणेश का आशीर्वाद आप पर सदैव बना रहे। सुख, शांति और समृद्धि से भरी दीपावली!',
      closing: 'ढेर सारे प्यार और मंगलकामनाओं सहित,',
      signature: 'समस्त परिवार',
    },
    bn: {
      salutation: 'প্রিয় পরিবার ও শ্রদ্ধেয় পরিজনবর্গ,',
      p1: 'মাটির প্রদীপের স্নিগ্ধ আলোয় আজ সারা ভুবন উদ্ভাসিত। এই পুণ্য লগ্নে আপনাদের সকলকে জানাই শুভ দীপাবলির প্রীতি ও আন্তরিক শুভেচ্ছা।',
      p2: 'দীপাবলি আমাদের শেখায় ভালোবাসা আর ঐক্যের শক্তি যেকোনো অন্ধকারকে দূর করতে পারে। আমাদের জীবনের প্রতিটি পদক্ষেপে আপনাদের উপস্থিতি অত্যন্ত মূল্যবান।',
      p3: 'সুখ, সমৃদ্ধি, সুস্বাস্থ্য ও অফুরন্ত আনন্দে আপনার জীবন আলোকিত হোক। শুভ দীপাবলি!',
      closing: 'অনেক ভালোবাসা ও শ্রদ্ধা সহ,',
      signature: 'আমাদের পরিবার',
    },
  },
};

export function getLetterForRecipient(recipientKey?: string | null, userName?: string): MultilingualLetter {
  const cleanKey = (recipientKey || '').trim().toLowerCase();
  if (cleanKey === 'mom' || cleanKey === 'maa') return LETTERS.mom;
  if (cleanKey === 'dad' || cleanKey === 'papa') return LETTERS.dad;
  if (cleanKey === 'brother' || cleanKey === 'bhai') return LETTERS.brother;
  if (cleanKey === 'sister' || cleanKey === 'didi') return LETTERS.sister;
  if (cleanKey === 'dadu_dadi' || cleanKey === 'grandparents' || cleanKey === 'dadu' || cleanKey === 'dadi') return LETTERS.grandparents;
  if (cleanKey === 'bestie') return LETTERS.bestie;
  if (cleanKey === 'someonespecial') return LETTERS.someoneSpecial;
  if (cleanKey === 'friend' || cleanKey === 'friends') return LETTERS.friend;
  if (cleanKey === 'family' || cleanKey === 'default') return LETTERS.default;

  // If recipientKey matches a recognized role
  if (recipientKey && LETTERS[recipientKey]) {
    return LETTERS[recipientKey];
  }

  // If no recognized key, check if userName matches standard roles
  if (userName) {
    const clean = userName.trim().toLowerCase();
    if (['maa', 'mom', 'mother', 'mataji', 'माँ', 'মা'].some(k => clean.includes(k))) return LETTERS.mom;
    if (['papa', 'dad', 'father', 'pitaji', 'पापा', 'বাবা'].some(k => clean.includes(k))) return LETTERS.dad;
    if (['sister', 'didi', 'di', 'behen', 'bon', 'दीदी', 'বোন'].some(k => clean.includes(k))) return LETTERS.sister;
    if (['brother', 'bhai', 'bhaiya', 'dada', 'भाई', 'ভাই'].some(k => clean.includes(k))) return LETTERS.brother;
    if (['bestie', 'bestfriend', 'बेस्टी', 'বেস্টি'].some(k => clean.includes(k))) return LETTERS.bestie;
    if (['someone special', 'special', 'partner', 'love', 'खास'].some(k => clean.includes(k))) return LETTERS.someoneSpecial;
    if (['friend', 'friends', 'dost', 'yaar', 'मित्र', 'বন্ধু'].some(k => clean.includes(k))) return LETTERS.friend;
    if (['family', 'parivaar', 'परिवार'].some(k => clean.includes(k))) return LETTERS.default;
  }

  // For any other person whom we cannot specifically recognise (e.g. Lakshmi, Rohan, Ananya, etc.):
  // Provide a heartwarming, deeply touching letter radiating pure love and warmth personalized with their name!
  const nameEn = userName?.trim() || 'Friend';
  const nameHi = userName?.trim() || 'मित्र';
  const nameBn = userName?.trim() || 'বন্ধু';

  return {
    en: {
      salutation: `Dearest ${nameEn},`,
      p1: 'Tonight, as thousands of warm golden diyas light up every corner of the house and the festive night sparkles with hope, I wanted to send this letter straight from the heart to you.',
      p2: 'In the rush of everyday life, festivals like Diwali are a gentle reminder of the wonderful people who bring light, kindness, and warmth into our journey. Having you in our story is a blessing we cherish deeply.',
      p3: 'May this auspicious Deepavali wrap you and your family in lasting health, joyful laughter, and sweet peace of mind. May every dream of yours be blessed with prosperity and radiant light. Happy Diwali!',
      closing: 'With all my love, warmth & brightest festive wishes,',
      signature: '✨ From Our Little Celebration to Your Home ✨',
    },
    hi: {
      salutation: `प्रिय ${nameHi},`,
      p1: 'दीपों की सुनहरी जगमगाहट और त्योहार की इस पावन रात में, मैं यह पत्र पूरे दिल और अपनत्व के साथ आपको भेज रहा हूँ।',
      p2: 'जीवन की इस तेज रफ्तार में दिवाली जैसे पर्व हमें याद दिलाते हैं कि दिल के करीब रहने वाले लोग कितने अनमोल होते हैं। आपकी मुस्कान, अच्छाई और आत्मीयता हमारे जीवन को रोशन करती है।',
      p3: 'ईश्वर से प्रार्थना है कि यह पावन दीपोत्सव आपके जीवन में उत्तम स्वास्थ्य, अपार सफलता, सुख और मानसिक शांति लेकर आए। आपका हर दिन दीपों की भांति मंगलमय रहे। शुभ दीपावली!',
      closing: 'असीम स्नेह, सम्मान और मंगलकामनाओं के साथ,',
      signature: '✨ हमारी इस छोटी सी दिवाली उत्सव से आपके घर तक ✨',
    },
    bn: {
      salutation: `স্নেহের ${nameBn},`,
      p1: 'মাটির প্রদীপের সোনালী আলোয় যখন চারপাশ উদ্ভাসিত হয়ে উঠেছে, তখন অন্তরের গভীর ভালোবাসা ও শ্রদ্ধা নিয়ে এই চিঠিটি তোমাকে পাঠাচ্ছি।',
      p2: 'জীবনের নানা ব্যস্ততার মাঝে দীপাবলির মতো উৎসব আমাদের মনে করিয়ে দেয় ভালোবাসার মানুষের কথা, যাঁরা আমাদের দিনগুলোকে সুন্দর ও অর্থবহ করে তোলেন। আমাদের এই উৎসবে তোমার উপস্থিতি অত্যন্ত আনন্দের।',
      p3: 'মা লক্ষ্মীর আশীর্বাদে তোমার ও তোমার পরিবারের জীবন সুস্বাস্থ্য, অফুরন্ত আনন্দ ও নতুন সাফল্যে ভরে উঠুক। প্রতিটি দিন কাটুক অনাবিল শান্তিতে। শুভ দীপাবলি!',
      closing: 'অনেক ভালোবাসা, প্রীতি ও আন্তরিক শুভকামনা সহ,',
      signature: '✨ আমাদের এই ছোট্ট দীপাবলি উৎসব থেকে আপনাদের গৃহকোণে ✨',
    },
  };
}
