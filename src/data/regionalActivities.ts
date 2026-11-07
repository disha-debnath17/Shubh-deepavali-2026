/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RegionalActivity } from '../types';
import { getRegionByName, INDIAN_REGIONS } from './regionalData';

export const REGIONAL_ACTIVITIES_MAP: Record<string, RegionalActivity[]> = {
  'west-bengal': [
    {
      id: 'wb-choddo-prodip',
      regionId: 'west-bengal',
      type: 'choddo-prodip',
      icon: '🪔',
      illustrationType: 'choddo-prodip',
      badge: {
        en: 'Bhoot Chaturdashi Tradition',
        hi: 'भूत चतुर्दशी पावन परंपरा',
        bn: 'ভূত চতুর্দশীর চিরায়ত প্রথা',
      },
      title: {
        en: 'Choddo Prodip (চোদ্দ প্রদীপ)',
        hi: 'चौदह दीप (१४ माटी के दीये)',
        bn: 'চোদ্দ প্রদীপ প্রজ্বালন',
      },
      subtitle: {
        en: 'Light 14 sacred lamps according to traditional belief to illuminate home corners and honor ancestors.',
        hi: 'पारंपरिक विश्वास के अनुसार घर के चौदह कोनों को रोशन कर पूर्वजों के प्रति सम्मान प्रकट करें और अंधकार दूर भगाएं।',
        bn: 'চিরায়ত বিশ্বাস অনুসারে বাড়ির চোদ্দ কোণে চৌদ্দ প্রদীপ জ্বেলে পূর্বপুরুষদের প্রতি শ্রদ্ধা ও আঁধার দূর করুন।',
      },
      significance: {
        en: 'According to traditional Bengali belief, fourteen small earthen lamps are lit with mustard oil on the eve of Kali Puja (Bhoot Chaturdashi) across doorsteps and darkest corners, honoring the memory of ancestors and dispelling negativity.',
        hi: 'पारंपरिक विश्वास के अनुसार काली पूजा की पूर्व संध्या (भूत चतुर्दशी) पर घर की चौखट व कोनों में सरसों के तेल से चौदह मिट्टी के दीये जलाए जाते हैं।',
        bn: 'চিরায়ত বিশ্বাস অনুসারে কালীপূজার আগের সন্ধ্যায় (ভূত চতুর্দশী) বাড়ির প্রতিটি কোণে চোদ্দটি মাটির প্রদীপ জ্বেলে পূর্বপুরুষদের স্মরণে আলোকপ্রার্থনা করা হয়।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Lighting exactly 14 clay diyas with mustard oil after sunset on the 14th lunar day of Kartik.',
          hi: 'कार्तिक कृष्ण चतुर्दशी की संध्या पर सरसों के तेल से चौदह मिट्टी के दीये जलाना।',
          bn: 'কার্তিক মাসের কৃষ্ণপক্ষের চতুর্দশীর সন্ধ্যায় সর্ষের তেল দিয়ে ঠিক চৌদ্দটি মাটির প্রদীপ জ্বালানো।',
        },
        why: {
          en: 'According to traditional belief, on this night the memory of fourteen generations of ancestors is reverently honored. Lighting the glowing wicks is believed to illuminate their path and protect the household from negative forces and fear.',
          hi: 'पारंपरिक मान्यता के अनुसार इस रात चौदह पीढ़ियों के पूर्वजों का स्मरण किया जाता है। माना जाता है कि यह ज्योति उनके मार्ग को आलोकित करती है और घर को नकारात्मकता से बचाती है।',
          bn: 'চিরায়ত বিশ্বাস অনুসারে এই মহানিশায় চৌদ্দ পুরুষের স্মৃতির উদ্দেশে শ্রদ্ধা নিবেদন করা হয়। এই আলো তাঁদের পথ দেখায় এবং পরিবারকে সমস্ত অশুভ প্রভাব ও ভয় থেকে মুক্ত রাখে বলে বিশ্বাস করা হয়।',
        },
        significance: {
          en: 'A profound blend of reverence for forebears and environmental awareness during the seasonal autumn-to-winter transition.',
          hi: 'ऋतु परिवर्तन के समय पूर्वजों के प्रति अगाध श्रद्धा और घर की शुद्धि का अनुपम वैदिक संस्कार।',
          bn: 'পূর্বপুরুষদের প্রতি গভীর শ্রদ্ধা এবং হেমন্তের সন্ধিক্ষণে গৃহের পবিত্রতা রক্ষার অনন্য ঐতিহ্য।',
        },
        connection: {
          en: 'Unique to Bengal and parts of Eastern India as the sacred gateway to midnight Shyama Pujo.',
          hi: 'बंगाल और पूर्वी भारत की अनूठी परंपरा जो मध्यरात्रि महाकाली पूजा का पावन द्वार है।',
          bn: 'বাংলা ও পূর্ব ভারতের নিজস্ব ঐতিহ্য, যা শ্যামাপূজার ঠিক আগের রাতের প্রাণস্পন্দন।',
        },
      },
    },
    {
      id: 'wb-alpona',
      regionId: 'west-bengal',
      type: 'alpona-creator',
      icon: '🎨',
      illustrationType: 'alpona-creator',
      badge: {
        en: 'Sacred Rice-Paste Art',
        hi: 'पवित्र अल्पना कला',
        bn: 'শুভ চালের গুঁড়োর আলপনা',
      },
      title: {
        en: 'Sacred Alpona (আলপনা আঁকা)',
        hi: 'पारंपरिक अल्पना (चावल की कला)',
        bn: 'হস্তশিল্পের অপরূপ আলপনা',
      },
      subtitle: {
        en: 'Draw traditional Bengali rice-paste motifs of lotus, conch vine, and divine footprints.',
        hi: 'चावल के श्वेत लेप से कमल, शंखलता और मां लक्ष्मी के शुभ चरण उकेरें।',
        bn: 'আতপ চালের সাদা লেই দিয়ে পদ্ম, শঙ্খলতা আর মা লক্ষ্মীর শ্রীচরণ আঁকুন।',
      },
      significance: {
        en: 'Alpona is not mere decoration—it is a spiritual prayer woven in flowing white rice paste (pituli). Women paint the courtyard and doorstep with lotus blossoms and circular mandalas to welcome the Divine Mother.',
        hi: 'अल्पना सिर्फ सजावट नहीं, बल्कि चावल के श्वेत लेप से रची गई एक पावन प्रार्थना है जो गृहलक्ष्मी का स्वागत करती है।',
        bn: 'আলপনা শুধু সজ্জা নয়, আঙুলের ডগায় আঁকা এক পুণ্য অঞ্জলি। ভিজে আতপ চালের শুভ্রতায় মায়ের চরণের আগমন বার্তা।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Painting flowing geometric and floral patterns on thresholds using natural soaked rice paste.',
          hi: 'भीगे हुए चावल के लेप से घर की चौखट व आँगन पर सुंदर मांगलिक आकृतियां बनाना।',
          bn: 'ভিজে আতপ চাল বেটে আঙুলের নিখুঁত ছোঁয়ায় গৃহের প্রবেশদ্বারে শুভ প্রতীকসমূহ অঙ্কন।',
        },
        why: {
          en: 'The natural rice flour feeds tiny birds and insects, signifying that every celebration must share abundance with the smallest creatures of nature while invoking divine blessings.',
          hi: 'चावल का आटा चींटियों व पक्षियों का पोषण करता है, जो सिखाता है कि हर उत्सव में प्रकृति के हर जीव संग खुशियां बांटनी चाहिए।',
          bn: 'চালের গুঁড়ো ক্ষুদ্র কীটপতঙ্গ ও পাখিদের আহার জোগায়—প্রকৃতি ও ক্ষুদ্রতম প্রাণীর প্রতি ভালোবাসা জানিয়ে ঈশ্বরের আশীর্বাদ গ্রহণ।',
        },
        significance: {
          en: 'A timeless visual language of Bengali domestic sanctity and maternal artistry passed down mother to daughter.',
          hi: 'बंगाल की माताओं और बहनों द्वारा पीढ़ियों से संजोई गई गृह पवित्रता और कलात्मक विरासत।',
          bn: 'বাংলার মায়েদের স্নেহের ছোঁয়ায় শতাব্দী ধরে বয়ে চলা এক অনুপম পারিবারিক নান্দনিক সাধনা।',
        },
        connection: {
          en: 'Integral to every Bengali festive threshold on Kojagari Lakshmi Puja and Kali Puja.',
          hi: 'कोजागरी लक्ष्मी पूजा व काली पूजा की हर बंगाली चौखट की अमिट पहचान।',
          bn: 'কোজাগরী লক্ষ্মীপূজা থেকে দীপান্বিতা শ্যামাপূজায় প্রতি গৃহের আবশ্যিক মাঙ্গলিক সাজ।',
        },
      },
    },
    {
      id: 'wb-kali-pujo',
      regionId: 'west-bengal',
      type: 'kali-pujo',
      icon: '🌺',
      illustrationType: 'kali-pujo',
      badge: {
        en: 'Midnight Amavasya Reverence',
        hi: 'मध्यरात्रि महाकाली वंदन',
        bn: 'অমাবস্যার মহানিশার শ্যামাপূজা',
      },
      title: {
        en: 'Midnight Kali Puja & Shyama Sangeet (শ্যামাপূজা)',
        hi: 'महाकाली पूजन व श्यामा संगीत',
        bn: 'নিশিরাতে শ্যামাপূজা ও শাঁখ-ঢাকের ধ্বনি',
      },
      subtitle: {
        en: 'Offer red hibiscus, light incense, and hear the divine resonance of Shankh and joyous Dhak (some rituals include 108 hibiscus flowers; practices vary by household and temple).',
        hi: 'लाल गुड़हल के फूल अर्पित करें, धूप जलाएं और शंख व ढाक की पावन ध्वनि सुनें (कुछ विशेष पूजा पद्धतियों में १०८ गुड़हल का अर्पण होता है, जबकि घरों व मंदिरों में प्रथाएं भिन्न होती हैं)।',
        bn: 'রক্তজবা নিবেদন করুন, সুগন্ধি ধূপ জ্বালান আর শুনুন শাঁখ ও ঢাকের বোল (কিছু বিশেষ পূজাবিধিতে ১০৮টি জবা নিবেদনের প্রথা রয়েছে, তবে পরিবার ও মন্দিরভেদে প্রথা ভিন্ন হয়)।',
      },
      significance: {
        en: 'On the new moon night of Kartik, Bengal observes Kali Puja—worshipping the divine Mother who slays fear, ignorance, and ego. Many Bengali households observe Kali Puja on this Amavasya night, while Kojagori Lakshmi Puja is traditionally observed separately on the preceding Ashwin Purnima.',
        hi: 'कार्तिक अमावस्या की रात मां काली की पूजा होती है जो अज्ञान, अहंकार और भय का नाश कर अभय प्रदान करती हैं। बंगाल में कई परिवारों में अमावस्या की रात काली पूजा होती है, जबकि कोजागरी लक्ष्मी पूजा आश्विन पूर्णिमा पर पहले ही संपन्न हो जाती है।',
        bn: 'কার্তিক অমাবস্যার অন্ধকারে অসুরবিনাশিনী স্নেহময়ী মা শ্যামার আরাধনা। বাংলায় অমাবস্যার রাতে মহাসমারোহে শ্যামাপূজা হয়, আর কোজাগরী লক্ষ্মীপূজা ঐতিহ্যগতভাবে পূর্ববর্তী পূর্ণিমায় পৃথকভাবে উদযাপিত হয়।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Midnight puja offering sacred red hibiscus flowers (some rituals include 108 hibiscus flowers; practices differ by household and temple), prasad sweets, and devotional Shyama Sangeet hymns.',
          hi: 'लाल गुड़हल के पुष्प (कुछ पूजा विधियों में १०८ गुड़हल का अर्पण शामिल होता है; घरों व मंदिरों में परंपराएं भिन्न होती हैं), नैवेद्य और रामप्रसादी भजनों संग मध्यरात्रि की आराधना।',
          bn: 'রক্তজবা নিবেদন (কিছু বিশেষ পূজাবিধিতে ১০৮টি রক্তজবা নিবেদনের প্রথা রয়েছে, তবে বিভিন্ন গৃহ ও মন্দিরে রীতি ভিন্ন হয়), ভোগের মিষ্টি ও ভক্তিমূলক শ্যামাসঙ্গীত সহযোগে অমাবস্যার রাতে মায়ের পূজা।',
        },
        why: {
          en: 'To confront and dissolve inner darkness. Mother Kali represents the transformative power of time (Kaal) that protects righteousness when all other lights have faded.',
          hi: 'भीतरी अंधकार और डर पर विजय पाने के लिए। मां काली समय की वह शक्ति हैं जो अधर्म का संहार कर सत्य की रक्षा करती हैं।',
          bn: 'মনের ভিতরের সমস্ত ভয় ও অহংকার চূর্ণ করে সত্য ও প্রেমের আলোয় অন্তরকে ভরিয়ে তোলার পুণ্য সংকল্প।',
        },
        significance: {
          en: 'The spiritual core of Bengal’s Diwali, merging profound philosophy with intimate maternal devotion.',
          hi: 'बंगाल के दीपोत्सव का आध्यात्मिक केंद्र जो दर्शन और भक्ति का पवित्र संगम है।',
          bn: 'বাংলার দীপাবলির প্রধান আধ্যাত্মিক প্রাণকেন্দ্র, যেখানে ঈশ্বরকে মা হিসেবে বরণ করা হয়।',
        },
        connection: {
          en: 'While across much of North and West India Diwali night is primarily dedicated to Goddess Lakshmi, in Bengal many households observe Kali Puja on the Amavasya night, while Kojagori Lakshmi Puja is traditionally observed separately on Ashwin Purnima.',
          hi: 'जहां अधिकांश भारत में दिवाली की रात मुख्य रूप से लक्ष्मी पूजा होती है, वहीं बंगाल में कई घरों में अमावस्या की रात काली पूजा होती है, जबकि कोजागरी लक्ष्मी पूजा आश्विन पूर्णिमा पर पहले ही संपन्न हो जाती है।',
          bn: 'গোটা ভারতে দীপাবলির রাতে প্রধানত লক্ষ্মীপূজা হলেও, বাংলায় অমাবস্যার রাতে মহাসমারোহে শ্যামাপূজা অনুষ্ঠিত হয় এবং কোজাগরী লক্ষ্মীপূজা ঐতিহ্যগতভাবে পূর্ববর্তী পূর্ণিমায় পৃথকভাবে উদযাপিত হয়।',
        },
      },
    },
  ],

  'karnataka': [
    {
      id: 'ka-enne-mejjana',
      regionId: 'karnataka',
      type: 'enne-mejjana',
      icon: '🧴',
      illustrationType: 'enne-mejjana',
      badge: {
        en: 'Naraka Chaturdashi Ritual',
        hi: 'नरक चतुर्दशी पावन स्नान',
        bn: 'নরক চতুর্দশীর ভেষজ স্নান',
      },
      title: {
        en: 'Enne Mejjana (ಎಣ್ಣೆ ಮಜ್ಜನ - Dawn Oil Bath)',
        hi: 'एण्णे मेज्जन (प्रभात औषधीय तेल स्नान)',
        bn: 'এন্নে মেজ্জনা (ভোরের ভেষজ তৈল স্নান)',
      },
      subtitle: {
        en: 'Perform the sacred pre-dawn herbal oil bath ritual to purify mind and body.',
        hi: 'सूर्योदय से पूर्व औषधीय तिल के तेल व उबटन से पवित्र स्नान कर नई ऊर्जा पाएं।',
        bn: 'ভোরে সূর্য ওঠার আগে ভেষজ তিলের তেল ও চন্দন মেখে শরীর ও মনকে পবিত্র করুন।',
      },
      significance: {
        en: 'Before the sun rises on Naraka Chaturdashi, families in Karnataka apply warm sesame oil infused with ginger and fragrant sandalwood paste. The bath symbolizes the washing away of fatigue, pride, and sin.',
        hi: 'सूर्योदय से पहले तिल के गुनगुने तेल और चंदन के लेप से स्नान करने की पावन परंपरा जो अहंकार और आलस्य का नाश करती है।',
        bn: 'সূর্যোদয়ের আগে ভেষজ তেল মেখে স্নান করার প্রাচীন প্রথা, যা ক্লান্তি ও অহংকার দূর করে নবজীবনের সূচনা ঘটায়।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Bathing before sunrise with sesame oil, herbal Shikakai, and fragrant warm water, then donning fresh clothes.',
          hi: 'सूर्योदय पूर्व तिल के तेल, शिकाकाई व सुगंधित जल से स्नान कर नए रेशमी वस्त्र पहनना।',
          bn: 'সূর্য ওঠার আগে তিলের তেল ও শিকাকাই দিয়ে স্নান সেরে নতুন উৎসবের পোশাক পরা।',
        },
        why: {
          en: 'Legend commemorates the victory over the tyrant Narakasura. Lord Krishna returned victorious and was lovingly bathed by his mother to cleanse the dust of battle and restore peace.',
          hi: 'भगवान श्रीकृष्ण द्वारा नरकासुर के वध की स्मृति में, जब विजय के बाद उन्हें स्नेह से औषधीय स्नान कराया गया था।',
          bn: 'নরকাসুর বধের পর শ্রীকৃষ্ণকে রণক্লান্তি দূর করতে ভেষজ স্নান করিয়ে শান্ত করার স্মৃতিবাহী পবিত্র আচার।',
        },
        significance: {
          en: 'Physical rejuvenation and emotional renewal before welcoming the festive dawn.',
          hi: 'शारीरिक स्फूर्ति, उत्तम स्वास्थ्य और मन की शुद्धि का वैज्ञानिक व धार्मिक विधान।',
          bn: 'শারীরিক সুস্বাস্থ্য ও মনের প্রশান্তি লাভ করে উৎসবের আলোয় নিজেকে সমর্পণের সুন্দর রীতি।',
        },
        connection: {
          en: 'The cherished opening morning ritual of Karnataka’s Deepavali.',
          hi: 'कर्नाटक के दीपोत्सव की सबसे पहली और अनिवार्य प्रभात परंपरा।',
          bn: 'কর্ণাটকের দীপাবলির শুভ সূচনালগ্নের পরম শ্রদ্ধার পারিবারিক রীতি।',
        },
      },
    },
    {
      id: 'ka-bali-padyami',
      regionId: 'karnataka',
      type: 'bali-padyami',
      icon: '👑',
      illustrationType: 'bali-padyami',
      badge: {
        en: 'Welcoming King Mahabali',
        hi: 'राजा बलि का स्वागत',
        bn: 'রাজা বলির মর্তে আগমন',
      },
      title: {
        en: 'Bali Padyami (ಬಲಿ ಪಾಡ್ಯಮಿ)',
        hi: 'बलि पाड्यमी एवं राजा बलि पूजन',
        bn: 'বলি পাদ্যমী ও রাজা বলির অর্চনা',
      },
      subtitle: {
        en: 'Build the miniature clay fort and light tall brass lamps to honor the righteous King Bali.',
        hi: 'मिट्टी के छोटे किले बनाएं और न्यायप्रिय राजा बलि के स्वागत में दीप प्रज्वलित करें।',
        bn: 'মাটির সুন্দর কেল্লা তৈরি করে রাজা বলির স্বাগতার্থে পিতলের প্রদীপ প্রজ্জ্বলন করুন।',
      },
      significance: {
        en: 'On Bali Padyami (the day following Amavasya), Karnataka celebrates King Mahabali, the generous ruler granted a boon by Vamana to visit his earthly subjects once every year.',
        hi: 'अमावस्या के अगले दिन राजा बलि के धरती पर आगमन का स्वागत करने के लिए मिट्टी और आटे से किले बनाए जाते हैं।',
        bn: 'ধার্মিক ও প্রজাবৎসল রাজা বলির বছরে একবার প্রজাদের কাছে ফিরে আসার আনন্দময় অভ্যর্থনা।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Molding miniature clay forts (Kote) decorated with flowers and offering fresh Obbattu flatbreads.',
          hi: 'मिट्टी के छोटे किले बनाकर गेंदे के फूलों से सजाना और मीठी होलीगे का भोग लगाना।',
          bn: 'মাটির কেল্লা বানিয়ে গাঁদা ফুলে সাজানো এবং সুস্বাদু মিষ্টি হোলিগের নৈবেদ্য দান।',
        },
        why: {
          en: 'To honor selfless generosity and keep the memory of an egalitarian, golden era alive where no person lacked food, shelter, or dignity.',
          hi: 'त्याग, दानशीलता और उस स्वर्ण युग की स्मृति को नमन करना जहां हर नागरिक सुखी व समृद्ध था।',
          bn: 'নিঃস্বার্থ দানশীলতা এবং সেই সত্যযুগের স্মৃতিকে সম্মান জানানো যখন সমাজে কোনো বৈষম্য ছিল না।',
        },
        significance: {
          en: 'Celebrates kingly benevolence and humble gratitude alongside agriculture and cattle reverence.',
          hi: 'प्रजापालक राजा के प्रति कृतज्ञता और गो-माता के पूजन का लोक-उत्सव।',
          bn: 'প্রজাদরদি রাজার প্রতি কৃতজ্ঞতা ও কৃষিসভ্যতার গো-পূজার অপূর্ব মেলবন্ধন।',
        },
        connection: {
          en: 'One of the most defining cultural pillars of South Indian and Karnataka Deepavali.',
          hi: 'दक्षिण भारत और विशेष रूप से कर्नाटक की पहचान का पावन दीपोत्सव पर्व।',
          bn: 'দক্ষিণ ভারত ও কর্ণাটকের দীপাবলির ঐতিহ্যের সবচেয়ে গর্বের অধ্যায়।',
        },
      },
    },
  ],

  'gujarat': [
    {
      id: 'gj-chopda-pujan',
      regionId: 'gujarat',
      type: 'chopda-pujan',
      icon: '📖',
      illustrationType: 'chopda-pujan',
      badge: {
        en: 'Diwali Night Account Blessing',
        hi: 'बही-खाता पूजन संस्कार',
        bn: 'খাতাপূজন ও শুভ-লাভ',
      },
      title: {
        en: 'Chopda Pujan (ચોપડા પૂજન)',
        hi: 'चोपड़ा पूजन (शुभ बही-खाता)',
        bn: 'চোপড়া পূজন (পবিত্র খাতা আশীর্বাদ)',
      },
      subtitle: {
        en: 'Bless the traditional red account ledger with kumkum Sathiya (Swastik) and prayers for Shubh-Laabh.',
        hi: 'लाल बही-खाते पर कुमकुम से स्वास्तिक बनाएं और शुभ-लाभ व समृद्धि की प्रार्थना करें।',
        bn: 'লাল বাঁধাই খাতার ওপর সিঁদুরের স্বস্তিক এঁকে শুভ-লাভ ও সততার প্রার্থনা করুন।',
      },
      significance: {
        en: 'On Diwali night, Gujarati merchants, business owners, and families open their red cloth-bound account ledgers (Chopda) to worship Goddess Lakshmi and Goddess Saraswati, consecrating the new fiscal year with integrity and wisdom.',
        hi: 'दिवाली की रात व्यापारी और परिवार नए बही-खाते खोलकर मां लक्ष्मी और सरस्वती की पूजा करते हैं ताकि सत्य और न्याय से व्यापार में बरकत हो।',
        bn: 'দীপাবলির রাতে গুজরাটের ব্যবসায়ী ও গৃহস্থরা নতুন লাল খাতায় সিঁদুর ও চন্দনে স্বস্তিক এঁকে লক্ষ্মী ও সরস্বতীর আশীর্বাদ নেন।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Drawing the auspicious Swastik with kumkum paste, writing "Shubh" and "Labh", sprinkling unbroken rice (akshat), and placing a silver coin on fresh pages.',
          hi: 'कुमकुम से पावन स्वास्तिक बनाना, "शुभ" और "लाभ" लिखना, अक्षत व पुष्प चढ़ाना और चांदी का सिक्का रखना।',
          bn: 'সিঁদুর দিয়ে স্বস্তিক আঁকা, "শুভ" ও "লাভ" লেখা, আতপ চাল ও গোলাপের পাপড়ি ছড়িয়ে রূপার মুদ্রা রাখা।',
        },
        why: {
          en: 'Wealth without wisdom is hollow. Chopda Pujan ensures that Goddess Saraswati guides the intellect so that wealth bestowed by Goddess Lakshmi is earned through ethical, honest labor.',
          hi: 'सरस्वती के बिना लक्ष्मी अधूरी हैं। यह पूजा प्रार्थना है कि धन का उपार्जन सदा सत्य, नीति और ईमानदारी के मार्ग पर हो।',
          bn: 'জ্ঞানহীন ধন ক্ষণস্থায়ী। এই পূজা স্মরণ করিয়ে দেয় যে মা সরস্বতীর শুভবুদ্ধি দিয়েই মা লক্ষ্মীর ধনকে সৎপথে পরিচালিত করতে হয়।',
        },
        significance: {
          en: 'A beautiful sanctification of commerce, accounting, and family livelihood through gratitude.',
          hi: 'व्यापार और पारिवारिक आजीविका को पवित्रता और कृतज्ञता प्रदान करने वाला सुंदर संस्कार।',
          bn: 'ব্যবসা ও পরিবারের জীবিকাকে সততা ও শ্রদ্ধার আলোয় আলোকিত করার অনুপম ঐতিহ্য।',
        },
        connection: {
          en: 'The crown jewel of Gujarati Diwali night leading into Bestu Varas (New Year).',
          hi: 'गुजरात के दीपोत्सव का हृदय जो नववर्ष (बेस्तू वरस) के आगमन की पावन नींव रखता है।',
          bn: 'গুজরাটি দীপাবলির প্রধান রত্ন, যা পরের দিনের শুভ নববর্ষের সূচনা করে।',
        },
      },
    },
    {
      id: 'gj-rangoli',
      regionId: 'gujarat',
      type: 'gujarati-rangoli',
      icon: '✨',
      illustrationType: 'gujarati-rangoli',
      badge: {
        en: 'Threshold Auspiciousness',
        hi: 'चौखट की मंगल सज्जा',
        bn: 'দ্বারদেশের শুভ রঙ্গোলি',
      },
      title: {
        en: 'Auspicious Sathiya & Rangoli (સાથિયા)',
        hi: 'साथिया (स्वास्तिक) एवं रंगोली',
        bn: 'সাথিয়া ও রঙিন রঙ্গোলি',
      },
      subtitle: {
        en: 'Adorn the home doorway with vibrant turmeric, vermilion, mirror-work torans, and clay Kodiyun diyas.',
        hi: 'हल्दी, कुमकुम, कच्छी कशीदाकारी तोरण और माटी के कोडिया दीपों से चौखट सजाएं।',
        bn: 'হলুদ, সিঁদুর, কাঁচবসানো রাজকীয় তোরণ আর মাটির ছোট প্রদীপে প্রবেশদ্বার সাজান।',
      },
      significance: {
        en: 'Gujarati homes welcome prosperity by drawing sacred Sathiya (Swastik) at the threshold accompanied by colorful geometric rangolis and warm earthen Kodiyun.',
        hi: 'घर के मुख्य द्वार पर शुभ स्वास्तिक और आंगन में रंग-बिरंगी रंगोली बनाकर मां लक्ष्मी का सत्कार किया जाता है।',
        bn: 'বাড়ির দরজায় সিঁদুরের সাথিয়া (স্বস্তিক) এবং উঠোনে রঙিন রঙ্গোলি এঁকে পরম ভক্তিভরে মা লক্ষ্মীকে আমন্ত্রণ।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Creating symmetrical threshold motifs filled with rich powder colors and glowing ghee lamps.',
          hi: 'रंग-बिरंगे रंगों से आंगन सजाकर शुद्ध घी के दीये जलाना।',
          bn: 'উজ্জ্বল রঙে জ্যামিতিক নকশা সাজিয়ে ঘিয়ে ভেজানো মাটির প্রদীপ প্রজ্জ্বলন।',
        },
        why: {
          en: 'The entrance of the home represents the boundary between the outer world and the sanctuary of the family. Adorning it invites positive energy and peace.',
          hi: 'घर का प्रवेश द्वार सकारात्मक ऊर्जा का स्रोत है। इसे सुंदर सजाकर खुशहाली का स्वागत किया जाता है।',
          bn: 'গৃহের প্রবেশদ্বার হলো পবিত্র আশ্রয় ও বহির্বিশ্বের সংযোগস্থল। সেখানে শুভ চিহ্ন আঁকা শান্তির প্রতীক।',
        },
        significance: {
          en: 'Celebrates hospitality, artistic pride, and joyous welcome for neighbors and guests.',
          hi: 'अतिथि सत्कार, पारिवारिक उल्लास और सौंदर्य का प्रतीक।',
          bn: 'আতিথেয়তা ও নান্দনিক রুচির অপূর্ব প্রকাশ।',
        },
        connection: {
          en: 'Essential to every Gujarati home celebrating Diwali and Saal Mubarak.',
          hi: 'हर गुजराती घर में दिवाली और साल मुबारक पर सजी रहने वाली जीवंत परंपरा।',
          bn: 'গুজরাটি উৎসবের প্রতিটি গৃহকোণের চিরায়ত আনন্দময় রূপ।',
        },
      },
    },
  ],

  'maharashtra': [
    {
      id: 'mh-faral',
      regionId: 'maharashtra',
      type: 'faral-platter',
      icon: '🍪',
      illustrationType: 'faral-platter',
      badge: {
        en: 'Culinary Heritage Platter',
        hi: 'पारंपरिक दीपोत्सवी फराळ',
        bn: 'ঐতিহ্যবাহী ফারাল মিষ্টান্ন থালি',
      },
      title: {
        en: 'Diwali Faral Platter (दिवाळी फराळ थाळी)',
        hi: 'स्वादिष्ट दीपोत्सवी फराळ थाली',
        bn: 'দিওয়ালি ফারাল থালি সাজানো',
      },
      subtitle: {
        en: 'Assemble the iconic homemade festive platter of Chakli, Karanji, Shankarpali, and Besan Laddoo.',
        hi: 'कुरकुरी चकली, मीठी करंजी, शंकरपाळी और बेसन के लड्डू से सजी थाली तैयार करें।',
        bn: 'মুচমুচে চাকলি, মিষ্টি করঞ্জি, শঙ্করপালি ও সুস্বাদু বেসন লাড্ডুর ঐতিহ্যবাহী থালি সাজান।',
      },
      significance: {
        en: 'Diwali Faral is the emotional heart of Maharashtrian Diwali. Weeks before the festival, women gather in kitchens to roll, fry, and pack savory and sweet delicacies shared warmly with visiting neighbors.',
        hi: 'दिवाली फराळ महाराष्ट्र के दीपोत्सव की आत्मा है। घर-घर में चकली, करंजी और चिवड़ा बनाकर पड़ोसियों में स्नेह से बांटा जाता है।',
        bn: 'ফারাল হলো মহারাষ্ট্রের দীপাবলির প্রাণের টান। কয়েক সপ্তাহ আগে থেকেই ঘরে তৈরি হয় খাস্তা চাকলি আর মিষ্টি করঞ্জি, যা পাড়া-প্রতিবেশীদের ভালোবাসায় উপহার দেওয়া হয়।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Preparing an array of crisp snacks: spiraled Chakli, coconut Karanji, flaky Shankarpali, roasted Poha Chivda, and golden Besan Laddoos.',
          hi: 'हाथ से बनी कुरकुरी चकली, मीठी करंजी, शंकरपाळी, पोहा चिवड़ा और शुद्ध घी के बेसन के लड्डू।',
          bn: 'হাতে গড়া মুচমুচে চাকলি, নারকেলের মিষ্টি করঞ্জি, খাস্তা শঙ্করপালি ও ঘিয়ে ভাজা বেসন লাড্ডু।',
        },
        why: {
          en: 'Faral embodies the spirit of unconditional hospitality and community bonding. No visitor leaves a Maharashtrian home without enjoying a generous plate of Faral.',
          hi: 'फराळ सामाजिक सौहार्द और स्नेह का प्रतीक है। घर आने वाला हर मेहमान फराळ खाए बिना नहीं जा सकता।',
          bn: 'ফারাল হলো আত্মীয়তা ও আন্তরিকতার প্রতীক। দীপাবলিতে যার ঘরেই যান না কেন, ফারালের থালি থাকবেই।',
        },
        significance: {
          en: 'Preserves traditional culinary craftsmanship and generations of familial memories.',
          hi: 'पारंपरिक स्वाद और पीढ़ियों से चली आ रही गृह-संस्कृति का सुंदर उदाहरण।',
          bn: 'ঠাকুমা-দিদিমাদের হাতে তৈরি রান্নার স্বাদ ও পারিবারিক ভালোবাসার চিরন্তন দলিল।',
        },
        connection: {
          en: 'A quintessential Maharashtrian ritual shared on Naraka Chaturdashi and Diwali Padwa.',
          hi: 'नरक चतुर्दशी और दिवाली पाडवा पर हर मराठी घर की शान।',
          bn: 'মহারাষ্ট্রের প্রতিটি ঘরে দীপাবলির দিনগুলোর পরম আনন্দ।',
        },
      },
    },
    {
      id: 'mh-pahat',
      regionId: 'maharashtra',
      type: 'diwali-pahat',
      icon: '🎶',
      illustrationType: 'diwali-pahat',
      badge: {
        en: 'Dawn Classical Music Tradition',
        hi: 'भोर की संगीतमयी दिवाली पहाट',
        bn: 'ভোরের শাস্ত্রীয় সংগীতের আসর',
      },
      title: {
        en: 'Diwali Pahat (दिवाळी पहाट - Dawn Melodies)',
        hi: 'दिवाळी पहाट (भोर के शास्त्रीय राग)',
        bn: 'দিওয়ালি পাহত (ভোরের রাগ ও সামাই প্রদীপ)',
      },
      subtitle: {
        en: 'Light the tall brass Samai lamp and immerse in soul-stirring morning ragas before sunrise.',
        hi: 'पीतल की ऊंची समाई जलाएं और सूर्योदय पूर्व पावन शास्त्रीय संगीत के सुरों में खो जाएं।',
        bn: 'পিতলের লম্বা সামাই প্রদীপ জ্বেলে সূর্যোদয়ের স্নিগ্ধ শাস্ত্রীয় সঙ্গীতের সুরে শান্তি অনুভব করুন।',
      },
      significance: {
        en: 'Diwali Pahat is a beloved cultural phenomenon in Maharashtra where families wake up before dawn, dress in festive silks, and attend open-air morning Indian classical concerts in parks and auditoriums.',
        hi: 'भोर में उठकर नए वस्त्र पहनकर शास्त्रीय संगीत के जलसों में जाना महाराष्ट्र की अनूठी सांस्कृतिक पहचान है।',
        bn: 'ভোরে উঠে নতুন পোশাকে ভারতীয় শাস্ত্রীয় সঙ্গীতের স্নিগ্ধ রাগে উৎসবের দিন শুরু করা মহারাষ্ট্রের গভীর ঐতিহ্য।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Listening to classical morning ragas like Bhairav, Todi, and Kalyan in community gatherings at daybreak while lighting oil lamps.',
          hi: 'सूर्योदय से पूर्व राग भैरव और तोड़ी के दिव्य सुरों संग समाई के दीप जलाकर पर्व का स्वागत।',
          bn: 'ভোরবেলায় রাগ ভৈরব বা কল্যাণ শুনে পিতলের সামাই প্রদীপের আলোয় উৎসবের সূচনা।',
        },
        why: {
          en: 'To begin the festival of lights with inner serenity, divine harmony, and cultural elevation rather than mere noise.',
          hi: 'शोर-शराबे के बजाय आत्मिक शांति, मधुर संगीत और सकारात्मक ऊर्जा संग पर्व की शुरुआत करना।',
          bn: 'কোলাহলের বদলে মনের গভীরে শান্তি ও সঙ্গীতের পবিত্র সুরে আলোর উৎসবকে স্বাগত জানানো।',
        },
        significance: {
          en: 'Celebrates Maharashtra’s immense classical musical heritage and refined artistic soul.',
          hi: 'महाराष्ट्र की समृद्ध शास्त्रीय संगीत धरोहर और कलात्मक चेतना का प्रतीक।',
          bn: 'মহারাষ্ট্রের সমৃদ্ধ মার্গসঙ্গীত ঐতিহ্য ও নান্দনিক রুচির অমূল্য নিদর্শন।',
        },
        connection: {
          en: 'Celebrated across Mumbai, Pune, Nagpur, Nashik, and towns across the state.',
          hi: 'मुंबई, पुणे, नागपुर व पूरे महाराष्ट्र के शहरों और कस्बों की प्राणवान परंपरा।',
          bn: 'মুম্বাই, পুণে থেকে সমগ্র মহারাষ্ট্রে পালিত এক অসাধারণ ভোরের আসর।',
        },
      },
    },
  ],

  'tamil-nadu': [
    {
      id: 'tn-ganga-snanam',
      regionId: 'tamil-nadu',
      type: 'ganga-snanam',
      icon: '🌊',
      illustrationType: 'ganga-snanam',
      badge: {
        en: 'Holy Daybreak Bath',
        hi: 'पावन गंगा स्नानम्',
        bn: 'পবিত্র ভোরের গঙ্গা স্নানম',
      },
      title: {
        en: 'Pre-Dawn Ganga Snanam & Marundhu (கங்கா ஸ்நானம்)',
        hi: 'गंगा स्नानम् एवं औषधीय मरुंधु',
        bn: 'ভোরে পবিত্র গঙ্গা স্নানম ও মারুন্ধু',
      },
      subtitle: {
        en: 'Perform the sesame oil bath where all domestic water holds the purity of Ganga, followed by healing Marundhu.',
        hi: 'औषधीय तिल के तेल से भोर में स्नान करें और स्वास्थ्यवर्धक दीपावली मरुंधु का सेवन करें।',
        bn: 'ভোরে ভেষজ তিলের তেল মেখে পবিত্র স্নান ও হজমকারক ঔষধি মারুন্ধু গ্রহণ করুন।',
      },
      significance: {
        en: 'Before sunrise on Deepavali, elders apply warm sesame oil with omam and pepper to all family members. It is believed that Goddess Lakshmi resides in sesame oil and the sacred Ganga resides in all water that morning.',
        hi: 'सूर्योदय से पूर्व औषधीय तिल के तेल से स्नान किया जाता है। माना जाता है कि इस प्रभात हर जल में मां गंगा का वास होता है।',
        bn: 'সূর্যোদয়ের আগে ভেষজ তিলের তেল মেখে স্নান। বিশ্বাস করা হয় এই ভোরে প্রতিটি জলের ধারায় মা গঙ্গার পবিত্রতা থাকে।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Bathing before dawn, greeting with "Ganga Snanam Aacha?", and tasting spicy-sweet Deepavali Marundhu lehyam.',
          hi: 'सूर्योदय पूर्व स्नान कर "गंगा स्नानम् आचा?" पूछना और औषधीय मरुंधु लेह्यम् खाना।',
          bn: 'ভোরে স্নান সেরে একে অপরকে গঙ্গা স্নানের শুভেচ্ছা জানানো ও স্বাস্থ্যকর মারুন্ধু খাওয়া।',
        },
        why: {
          en: 'Cleanses impurities, restores physical vitality, and prepares the digestive system for the day’s rich feasts through Ayurvedic wisdom.',
          hi: 'शरीर को निरोगी रखना और भारी पकवानों को पचाने हेतु प्राकृतिक औषधि का सेवन।',
          bn: 'শরীরকে সতেজ ও রোগমুক্ত রাখা এবং আয়ুর্বেদিক মিষ্টির মাধ্যমে পাচনশক্তি বৃদ্ধি।',
        },
        significance: {
          en: 'A timeless testament to Tamil family care and holistic wellness traditions.',
          hi: 'तमिल परिवारों के वात्सल्य, स्वास्थ्य और अध्यात्म का अद्भुत संगम।',
          bn: 'তামিল পরিবারের স্নেহ, ভালোবাসা ও সুস্থ জীবনের চিরায়ত প্রকাশ।',
        },
        connection: {
          en: 'The very foundation of Tamil Deepavali celebrations.',
          hi: 'तमिलनाडु के दीपोत्सव का सबसे पावन और मुख्य स्तंभ।',
          bn: 'তামিলনাড়ুর দীপাবলির সবচেয়ে পবিত্র ও অবিচ্ছেদ্য প্রথা।',
        },
      },
    },
  ],

  'uttar-pradesh': [
    {
      id: 'up-ayodhya-deepotsav',
      regionId: 'uttar-pradesh',
      type: 'ayodhya-deepotsav',
      icon: '🪔',
      illustrationType: 'ayodhya-deepotsav',
      badge: {
        en: 'Sacred Saryu Ghat Deepotsav',
        hi: 'अयोध्या पावन दीपोत्सव',
        bn: 'অযোধ্যা সরযূ তটের মহাদীপোৎসব',
      },
      title: {
        en: 'Ayodhya Saryu Deepotsav (अयोध्या दीपोत्सव)',
        hi: 'अयोध्या सरयू दीपोत्सव',
        bn: 'অযোধ্যা সরযূ ঘাটের আলোকমালা',
      },
      subtitle: {
        en: 'Light rows of sacred earthen lamps on the river ghats to welcome Shri Ram, Sita, and Lakshman.',
        hi: 'सरयू के पावन घाटों पर मिट्टी के दीये जलाकर भगवान श्री राम का स्वागत करें।',
        bn: 'সরযূ নদীর পবিত্র ঘাটে প্রদীপের সারি জ্বেলে শ্রীরামের ঘরে ফেরা উদযাপন করুন।',
      },
      significance: {
        en: 'Diwali commemorates the joyous return of Shri Ram, Sita Mata, and Lakshman to Ayodhya after 14 years of exile. The citizens illuminated every street and riverbank with millions of glowing diyas.',
        hi: '१४ वर्षों के वनवास के पश्चात प्रभु श्री राम के अयोध्या लौटने पर नगरवासियों ने दीप जलाकर स्वागत किया था।',
        bn: '১৪ বছর বনবাস শেষে শ্রীরামচন্দ্র ও সীতা মায়ের অযোধ্যায় ফেরার আনন্দে সমগ্র নগরী আলোকমালায় সাজানো হয়েছিল।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Lighting clay lamps with mustard oil and offering marigold flowers with conch resonance.',
          hi: 'सरसों के तेल से मिट्टी के दीप जलाना और शंख ध्वनि संग मंगल प्रार्थना।',
          bn: 'মাটির প্রদীপে তেল দিয়ে আলোর মালা সাজানো ও শাঁখের ধ্বনিতে শুভ সূচনা।',
        },
        why: {
          en: 'To celebrate the return of righteousness (Dharma), honor the triumph of truth, and welcome the divine light into the heart.',
          hi: 'सत्य, धर्म और मर्यादा की विजय का उत्सव मनाना और हृदय में ज्ञान का प्रकाश जगाना।',
          bn: 'সত্য ও ধর্মের জয় উদযাপন এবং অন্তরে জ্ঞান ও ভালোবাসার প্রদীপ প্রজ্বলন।',
        },
        significance: {
          en: 'The foundational epic narrative that unites North India in radiant festival joy.',
          hi: 'समस्त उत्तर भारत को जोड़ने वाली पावन और ऐतिहासिक रामकथा का दीपोत्सव।',
          bn: 'উত্তর ভারতের দীপাবলির প্রধান ও ঐতিহাসিক পৌরাণিক ভিত্তি।',
        },
        connection: {
          en: 'Celebrated on a grand scale across Ayodhya, Varanasi, Prayagraj, and Lucknow.',
          hi: 'अयोध्या, काशी, प्रयागराज और पूरे प्रदेश का गौरवशाली पर्व।',
          bn: 'অযোধ্যা ও বারাণসীর ঘাটে লক্ষ লক্ষ প্রদীপের নয়নাভিরাম দৃশ্য।',
        },
      },
    },
  ],

  'odisha': [
    {
      id: 'od-badabadua',
      regionId: 'odisha',
      type: 'badabadua-daka',
      icon: '✨',
      illustrationType: 'badabadua-daka',
      badge: {
        en: 'Guiding Ancestors to Light',
        hi: 'बड़बड़ुआ डाका पावन परंपरा',
        bn: 'বড়বড়ুয়া ডকা ও পূর্বপুরুষ শ্রদ্ধা',
      },
      title: {
        en: 'Badabadua Daka (ବଡ଼ବଡୁଆ ଡାକ - Ancestor Call)',
        hi: 'बड़बड़ुआ डाका (पूर्वज वंदन)',
        bn: 'বড়বড়ুয়া ডকা (আলোর দিশারী)',
      },
      subtitle: {
        en: 'Hold glowing jute sticks towards the twilight sky with the sacred chant to guide forefathers.',
        hi: 'कौणरिया काठी जलाकर आकाश की ओर दिखाते हुए पूर्वजों के कल्याण की प्रार्थना करें।',
        bn: 'কাউনরিয়া কাঠি জ্বেলে আকাশের দিকে তুলে পূর্বপুরুষদের পথ আলোকিত করার মধুর প্রার্থনা।',
      },
      significance: {
        en: 'On Diwali evening in Odisha, families gather in courtyards holding bundles of burning Kaunriya Kathi (jute sticks) pointed heavenward, chanting: "Badabadua ho, andhaare aasa, aaluare jaao" (O ancestors, come in peace, return in celestial light).',
        hi: 'ओडिशा में पूर्वजों को मार्ग दिखाने के लिए कौणरिया काठी जलाकर आकाश में दिखाते हुए शांति की कामना की जाती है।',
        bn: 'ওড়িশায় পরিবারের সকলে মিলে পাটকাঠি জ্বেলে আকাশের দিকে তুলে ধরেন এবং পূর্বপুরুষদের আলোয় ফিরে যাওয়ার আশীর্বাদ প্রার্থনা করেন।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Lighting jute sticks and creating circular rangoli with rice paste and terracotta lamps.',
          hi: 'कौणरिया काठी जलाना और चावल के लेप से झोटी चिता रंगोली बनाना।',
          bn: 'কাউনরিয়া কাঠি প্রজ্বলন এবং চালের লেই দিয়ে সুন্দর ঝোটি চিতা আঁকা।',
        },
        why: {
          en: 'To express eternal gratitude to forefathers and pray that they find perpetual peace in the divine realm of Lord Jagannath.',
          hi: 'अपने पूर्वजों के प्रति शाश्वत कृतज्ञता व्यक्त करना और उनकी आत्मा की शांति के लिए प्रार्थना करना।',
          bn: 'পূর্বপুরুষদের প্রতি চিরন্তন কৃতজ্ঞতা প্রকাশ এবং মহাপ্রভু জগন্নাথের চরণে তাঁদের মুক্তির প্রার্থনা।',
        },
        significance: {
          en: 'A deeply moving ritual connecting generations across time with love and remembrance.',
          hi: 'पीढ़ियों को प्रेम और स्मृति के अटूट बंधन में बांधने वाला भावुक लोक-संस्कार।',
          bn: 'ভালোবাসা ও স্মৃতির মাধ্যমে অতীতের সাথে বর্তমানকে মিলিয়ে দেওয়ার এক অনন্য প্রথা।',
        },
        connection: {
          en: 'Held with immense devotion outside the sacred Jagannath Temple in Puri and across Odisha.',
          hi: 'पुरी के श्री जगन्नाथ मंदिर के सिंहद्वार व हर उड़िया घर की पावन परंपरा।',
          bn: 'পুরীর জগন্নাথ মন্দিরের সিংহদুয়ার থেকে শুরু করে ওড়িশার প্রতিটি গৃহকোণের প্রাণ।',
        },
      },
    },
  ],

  'punjab': [
    {
      id: 'pb-bandi-chhor',
      regionId: 'punjab',
      type: 'bandi-chhor',
      icon: '🪔',
      illustrationType: 'bandi-chhor',
      badge: {
        en: 'Distinct Sikh Festival of Liberation',
        hi: 'सिख परंपरा का पावन मुक्ति पर्व',
        bn: 'শিখ ঐতিহ্যের অনন্য মুক্তি উৎসব',
      },
      title: {
        en: 'Bandi Chhor Divas (ਬੰਦੀ ਛੋੜ ਦਿਵਸ - Day of Liberation)',
        hi: 'बंदी छोड़ दिवस एवं अमृत सरोवर दीपमाला',
        bn: 'বন্দী ছোড় দিবস ও অমৃত সরোবরের দীপমালা',
      },
      subtitle: {
        en: 'Light floating golden lamps on the sacred Amrit Sarovar to celebrate Bandi Chhor Divas—a distinct Sikh celebration of liberation coinciding with Diwali.',
        hi: 'अमृत सरोवर के पावन जल में दीप तैराएं और दिवाली संग समकालिक बंदी छोड़ दिवस (सिख मुक्ति पर्व) का आनंद लें।',
        bn: 'অমৃত সরোবরের পবিত্র জলে প্রদীপ ভাসিয়ে দীপাবলির সমকালীন অনন্য শিখ মুক্তি উৎসব বন্দী ছোড় দিবস উদযাপন করুন।',
      },
      significance: {
        en: 'In Punjab and Sikh tradition, Bandi Chhor Divas is a distinct and momentous celebration of freedom and righteousness that historically coincides with Diwali. It marks the release of the Sixth Sikh Guru, Guru Hargobind Sahib Ji, from Gwalior Fort alongside 52 innocent captive rajas. Sri Harmandir Sahib in Amritsar is bathed in millions of glowing earthen diyas and spectacular fireworks.',
        hi: 'पंजाब और सिख परंपरा में बंदी छोड़ दिवस स्वतंत्रता और न्याय का एक विशिष्ट पावन पर्व है जो ऐतिहासिक रूप से दिवाली के साथ पड़ता है। यह छठे सिख गुरु, गुरु हरगोबिन्द साहिब जी द्वारा ५२ निर्दोष राजाओं संग ग्वालियर किले से रिहा होने का पावन प्रतीक है।',
        bn: 'পাঞ্জাব ও শিখ ঐতিহ্যে বন্দী ছোড় দিবস ন্যায় ও মুক্তির এক স্বতন্ত্র ও গভীর তাৎপর্যপূর্ণ উৎসব যা ঐতিহাসিকভাবে দীপাবলির সমকালে উদযাপিত হয়। ষষ্ঠ শিখ গুরু হরগোবিন্দ জী কর্তৃক গোয়ালিয়র দুর্গ থেকে ৫২ জন নির্দোষ রাজাকে অন্যায় বন্দিদশা থেকে মুক্ত করার ঐতিহাসিক দিন।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Illuminating Sri Harmandir Sahib, floating lamps on Amrit Sarovar, and sharing sacred Karah Parshad celebrating righteous liberation.',
          hi: 'अमृत सरोवर में दीप प्रज्वलित करना, परिक्रमा मार्ग रोशन करना और कड़ाह प्रसाद बांटना।',
          bn: 'শ্রী হরিমন্দির সাহিবে প্রদীপের মালা সাজানো, সরোবরে প্রদীপ ভাসানো এবং কড়াহ প্রসাদ বিতরণ।',
        },
        why: {
          en: 'To honor supreme compassion and selfless leadership that prioritized liberating fellow human beings before one’s own freedom.',
          hi: 'निःस्वार्थ परोपकार और मानवता की रक्षा के उस अमर आदर्श को नमन जिसने स्वयं से पहले दूसरों की मुक्ति को चुना।',
          bn: 'নিঃস্বার্থ আত্মত্যাগ ও মানবকল্যাণের আদর্শকে শ্রদ্ধা জানানো, যা নিজের আগে অন্যের মুক্তির কথা ভেবেছিল।',
        },
        significance: {
          en: 'A radiant testament to justice, equality, and unshakeable spiritual dignity.',
          hi: 'न्याय, समानता और मानवीय स्वाभिमान का अमर प्रतीक।',
          bn: 'ন্যায়পরায়ণতা, সমতা ও মানবিক আত্মমর্যাদার শাশ্বত প্রেরণা।',
        },
        connection: {
          en: 'Celebrated with historic majesty at Sri Harmandir Sahib (Golden Temple) in Amritsar and Gurdwaras worldwide as a distinct Sikh celebration of liberty that coincides with Diwali.',
          hi: 'अमृतसर के पावन स्वर्ण मंदिर व विश्वभर के गुरुद्वारों में दीपमाला संग मनाया जाने वाला सिख मुक्ति पर्व, जो दिवाली के समकाल पड़ता है।',
          bn: 'অমৃতসরের পবিত্র স্বর্ণমন্দির সহ বিশ্বের সকল গুরুদ্বারে মহাসমারোহে পালিত শিখ ঐতিহ্যের স্বতন্ত্র উৎসব, যা দীপাবলির সমকালে উদযাপিত হয়।',
        },
      },
    },
  ],

  'rajasthan': [
    {
      id: 'rj-mandana',
      regionId: 'rajasthan',
      type: 'rajasthani-mandana',
      icon: '🦚',
      illustrationType: 'rajasthani-mandana',
      badge: {
        en: 'Royal Haveli Folk Heritage',
        hi: 'शाही हवेली मांडणा कला',
        bn: 'রাজকীয় হাভেলি মাণ্ডনা শিল্প',
      },
      title: {
        en: 'Rajasthani Mandana & Deepam (मांडणा कला)',
        hi: 'राजस्थानी मांडणा लोककला एवं हवेली दीप',
        bn: 'রাজস্থানী মাণ্ডনা লোকশিল্প ও হাভেলি প্রদীপ',
      },
      subtitle: {
        en: 'Paint sacred geometric Mandana motifs with white lime paste on terracotta Geru and place royal brass deepams.',
        hi: 'गेरू के फर्श पर चूने से पवित्र चौक, मोर और पगलिया बनाएं और शाही पीतल के दीप जलाएं।',
        bn: 'গেরু মাটির ওপর চুন দিয়ে মাণ্ডনার পবিত্র জ্যামিতিক নকশা আঁকুন ও রাজকীয় প্রদীপ জ্বালান।',
      },
      significance: {
        en: 'Rajasthani women prepare courtyards and threshold steps with a wash of sacred red Geru (clay) and paint intricate Mandana geometric mandalas, dancing peacocks, and Lakshmi footsteps using soaked white lime and rice flour.',
        hi: 'राजस्थान के घरों में गेरू से लीपे आंगनों पर चूने व चावल के लेप से मां लक्ष्मी के शुभ पगलिया, मोर और मांगलिक चौक उकेरे जाते हैं।',
        bn: 'রাজস্থানের গৃহিণীরা গেরু মাটির ওপর শুভ্র চুন দিয়ে মা লক্ষ্মীর শ্রীচরণ, ময়ূর ও মঙ্গলময় জ্যামিতিক মাণ্ডনা আঁকেন।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Drawing geometrical Mandana mandalas on thresholds and offering sweet royal Ghevar on silver platters.',
          hi: 'हवेली की चौखट पर ज्यामितीय मांडणा बनाना और चांदी के थाल में शाही घेवर का भोग लगाना।',
          bn: 'প্রবেশদ্বারে জ্যামিতিক মাণ্ডনা অঙ্কন এবং রূপার থালায় সুস্বাদু ঘেবরের ভোগ নিবেদন।',
        },
        why: {
          en: 'Mandana literally means "to adorn and consecrate". The sacred patterns safeguard the sanctuary of the family against adversity while inviting royal abundance.',
          hi: 'मांडणा का अर्थ है सजाना व पवित्र करना। यह आकृतियां घर को नकारात्मकता से बचाकर सुख-समृद्धि लाती हैं।',
          bn: 'মাণ্ডনা শব্দের অর্থ অলঙ্করণ ও পবিত্রতা। এই শুভ নকশা পরিবারকে অমঙ্গল থেকে রক্ষা করে ঐশ্বর্য এনে দেয়।',
        },
        significance: {
          en: 'A timeless visual identity of Marwar, Mewar, and Shekhawati architectural festivity.',
          hi: 'मारवाड़, मेवाड़ और शेखावाटी की अद्वितीय सांस्कृतिक व स्थापत्य कला धरोहर।',
          bn: 'মারওয়াড়, মেওয়াড় ও শেখাবতীর শতাব্দী প্রাচীন অনুপম লোকশিল্প ঐতিহ্য।',
        },
        connection: {
          en: 'Adorns every heritage haveli and domestic doorstep across Jaipur, Jodhpur, Udaipur, and Kota.',
          hi: 'जयपुर, जोधपुर, उदयपुर और पूरे राजस्थान की हवेलियों की अमिट पहचान।',
          bn: 'জয়পুর, যোধপুর, উদয়পুর সহ সমগ্র রাজস্থানের ঐতিহ্যবাহী হাবেলির প্রাণ।',
        },
      },
    },
  ],

  'goa': [
    {
      id: 'ga-narakasura',
      regionId: 'goa',
      type: 'narakasura-dahan',
      icon: '🔥',
      illustrationType: 'narakasura-dahan',
      badge: {
        en: 'Dawn Effigy & Fov Feast',
        hi: 'प्रभात नरकासुर दहन एवं फोव',
        bn: 'ভোরের নরকাসুর বধ ও ফোভ ভোজ',
      },
      title: {
        en: 'Narakasura Dahan & Goan Fov (नरकासुर दहन)',
        hi: 'नरकासुर दहन एवं ५ प्रकार के पारंपरिक फोव',
        bn: 'নরকাসুর বধ ও ঐতিহ্যবাহী ৫ প্রকার ফোভ',
      },
      subtitle: {
        en: 'Torch the towering colorful Narakasura effigy with dawn sparklers and savor festive beaten-rice Fov.',
        hi: 'भोर में नरकासुर के पुतले को आतिशबाजी संग जलाएं और नारियल-गुड़ के ५ प्रकार के फोव का आनंद लें।',
        bn: 'ভোরে আতশবাজির ঝলকানিতে নরকাসুর পুড়িয়ে অশুভ নাশ করুন ও নারকেল-গুড়ের ফোভ আস্বাদন করুন।',
      },
      significance: {
        en: 'In Goa, the biggest excitement of Diwali revolves around handcrafted towering effigies of the demon Narakasura. At pre-dawn, effigies are burned with magnificent fireworks, celebrating Lord Krishna’s victory, followed by a warm aromatic oil bath and a festive feast of five types of Fov.',
        hi: 'गोवा में दिवाली की सबसे प्रसिद्ध परंपरा नरकासुर के विशाल पुतलों का निर्माण व भोर में दहन है, जिसके पश्चात ५ प्रकार के स्वादिष्ट फोव खाए जाते हैं।',
        bn: 'গোয়ায় দীপাবলির সবচেয়ে বড় আকর্ষণ হলো বিশাল আকারের নরকাসুরের পুতুল তৈরি ও ভোরে তা পোড়ানো। এরপর পরিবার সকলে মিলে ৫ রকমের সুস্বাদু ফোভ খায়।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Burning the paper-and-hay effigy at daybreak with sparklers and sharing coconut-milk beaten rice dishes.',
          hi: 'सूर्योदय से पहले नरकासुर के पुतले का दहन और नारियल के दूध व गुड़ से बने फोव का भोग।',
          bn: 'ভোরে আতশবাজির আলোয় পুতুল দহন এবং নারকেলের দুধ ও গুড় দিয়ে তৈরি ঐতিহ্যবাহী ফোভের মিষ্টিমুখ।',
        },
        why: {
          en: 'To mark the destruction of evil and arrogance. Crushing the bitter Karit fruit underfoot symbolizes purging all malice before welcoming the auspicious morning.',
          hi: 'अहंकार और बुराई के अंत का उत्सव। कड़वे फल को पैर से कुचलकर बुराई को सदा के लिए समाप्त करने की सीख।',
          bn: 'অহংকার ও অশুভ শক্তির বিনাশ। তিক্ত কারিত ফল চূর্ণ করে মনের সমস্ত বিদ্বেষ মুছে ফেলে নব সূচনার শপথ।',
        },
        significance: {
          en: 'A vibrant community celebration bringing every village, youth club, and family together.',
          hi: 'गोवा के हर गांव, नगर और युवा मंडल को उल्लास के सूत्र में पिरोने वाला लोक-उत्सव।',
          bn: 'গোয়ার প্রতিটি গ্রাম ও পরিবারের মিলনমেলা এবং আনন্দময় সামাজিক ঐতিহ্য।',
        },
        connection: {
          en: 'The signature defining spectacle of Diwali across Panaji, Margao, Vasco, and Mapusa.',
          hi: 'पणजी, मडगांव, वास्को और पूरे गोवा का सबसे लोकप्रिय दीपोत्सव दृश्य।',
          bn: 'পানাজি, মারগাঁও সহ সমগ্র গোয়ার সবচেয়ে বিখ্যাত ও আনন্দমুখর সাংস্কৃতিক উৎসব।',
        },
      },
    },
  ],
  'all-india': [
    {
      id: 'all-india-deepotsav',
      regionId: 'all-india',
      type: 'ayodhya-deepotsav',
      icon: '🪔',
      illustrationType: 'ayodhya-deepotsav',
      badge: {
        en: 'Pan-India Grand Deepotsav',
        hi: 'अखिल भारतीय महापर्व दीपोत्सव',
        bn: 'সমগ্র ভারতের আলোর মহোৎসব',
      },
      title: {
        en: 'Deepotsav: The Flame of Unity (दीपोत्सव)',
        hi: 'पावन दीपोत्सव: एकता की पावन ज्योति',
        bn: 'মহিমান্বিত দীপাবলি: একতার শুভ প্রদীপ',
      },
      subtitle: {
        en: 'Light traditional clay lamps that unite every household and community across India in joyous warmth.',
        hi: 'मिट्टी के पावन दीये जलाकर भारत के हर घर और आँगन को प्रेम व प्रकाश के सूत्र में जोड़ें।',
        bn: 'মাটির স্নিগ্ধ প্রদীপ জ্বেলে সারা ভারতবর্ষের প্রতিটি হৃদয়কে সম্প্রীতির আলোয় উদ্ভাসিত করুন।',
      },
      significance: {
        en: 'From the foothills of the Himalayas to the coast of Kanyakumari, Diwali is celebrated by millions lighting earthen oil lamps to welcome wisdom, abundance, and the triumph of truth.',
        hi: 'हिमालय की वादियों से लेकर कन्याकुमारी के तटों तक, भारतवासी मिट्टी के दीये जलाकर उजाले और सत्य की विजय का उत्सव मनाते हैं।',
        bn: 'হিমালয় থেকে কন্যাকুমারিকা—ভারতজুড়ে কোটি কোটি ঘরে মাটির প্রদীপ জ্বেলে অন্ধকার ও অজ্ঞানতাকে বিদায় জানানো হয়।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Illuminating homes, courtyards, and riverbanks with natural clay lamps fueled with mustard or sesame oil.',
          hi: 'घर की चौखट, छत और घाटों पर सरसों या तिल के तेल से मिट्टी के दीये जलाना।',
          bn: 'গৃহের দ্বারে, বারান্দায় ও নদীঘাটে সর্ষে বা তিলের তেলে তৈরি মাটির প্রদীপ সাজানো।',
        },
        why: {
          en: 'A single earthen lamp can banish shadows that lingered for centuries. Together, a billion lamps celebrate shared human dignity, family love, and new beginnings.',
          hi: 'एक नन्हा दीपक सदियों के अंधकार को मिटा सकता है। एक अरब दीपक मिलकर भारत के साझा प्रेम और आशा का जयघोष करते हैं।',
          bn: 'একটি ছোট্ট মাটির প্রদীপ যেমন ঘোর অন্ধকার দূর করে, তেমনই কোটি কোটি প্রদীপের মেলা মানুষের সৌহার্দ্য ও ভালোবাসার বার্তা দেয়।',
        },
        significance: {
          en: 'The universal centerpiece of Diwali uniting every Indian state, language, and culture.',
          hi: 'भारत के हर राज्य, भाषा और संस्कृति को जोड़ने वाला दीपोत्सव का सार्वभौमिक अमर प्रतीक।',
          bn: 'ভাষা ও সংস্কৃতির বৈচিত্র্য পেরিয়ে সমগ্র ভারতের এক পরম মিলনোৎসব।',
        },
        connection: {
          en: 'Celebrated with heartfelt reverence in every village, town, and metropolis of India.',
          hi: 'भारत के हर गांव, कस्बे और महानगर में अपार आस्था और उल्लास से मनाया जाने वाला महापर्व।',
          bn: 'গ্রাম থেকে শহর—সারা ভারতবর্ষের প্রতিটি কোণে অন্তরের শ্রদ্ধা ও ভালোবাসার উৎসব।',
        },
      },
    },
    {
      id: 'all-india-rangoli',
      regionId: 'all-india',
      type: 'gujarati-rangoli',
      icon: '🌸',
      illustrationType: 'gujarati-rangoli',
      badge: {
        en: 'Universal Threshold Art',
        hi: 'मांगलिक रंगोली व पुष्प कला',
        bn: 'শুভ রঙিন রঙ্গোলি ও ফুলের সজ্জা',
      },
      title: {
        en: 'Sacred Rangoli & Floral Kolam (रंगोली)',
        hi: 'मांगलिक रंगोली व पुष्प सज्जा',
        bn: 'ঐতিহ্যবাহী রঙ্গোলি ও ফুলের আলপনা',
      },
      subtitle: {
        en: 'Create symmetrical festive patterns using vibrant colored powders and golden marigold petals.',
        hi: 'प्राकृतिक रंगों, गुलाल और गेंदे के फूलों से घर के द्वार पर शुभ मांगलिक रंगोली बनाएं।',
        bn: 'রঙিন আবির ও গাঁদা ফুলের পাপড়ি দিয়ে গৃহদ্বারে মনোহর শুভ রঙ্গোলি রচনা করুন।',
      },
      significance: {
        en: 'Known as Rangoli in the North & West, Kolam in the South, Mandana in Rajasthan, and Alpona in the East, threshold art is India’s timeless canvas welcoming auspicious prosperity.',
        hi: 'उत्तर में रंगोली, दक्षिण में कोलम, राजस्थान में मांडणा और पूर्व में अल्पना—यह कला चौखट पर सुख-समृद्धि का आमंत्रण है।',
        bn: 'উত্তরে রঙ্গোলি, দক্ষিণে কোলম, রাজস্থানে মাণ্ডনা এবং পূর্বে আলপনা—সারা ভারতে গৃহের প্রবেশদ্বারে শুভ আবাহনের প্রতীক।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Decorating home thresholds with symmetrical geometric, floral, and sacred diya motifs.',
          hi: 'घर के मुख्य द्वार पर ज्यामितीय, पुष्प और दीप आकृतियों की मनोहारी रंगोली सजाना।',
          bn: 'প্রধান প্রবেশদ্বারে নিখুঁত জ্যামিতিক নকশা, পদ্ম ও প্রদীপের আকৃতিতে রঙিন সজ্জা।',
        },
        why: {
          en: 'Drawing art at the doorstep honors guests as embodiments of the divine and invites Goddess Lakshmi’s blessings of peace and health into the home.',
          hi: 'अतिथि देवो भव: की भावना और मां लक्ष्मी के चरण कमलों के स्वागत का अनुपम संस्कार।',
          bn: 'অতিথি ও মা লক্ষ্মীকে শুভ্র ও পবিত্র চিত্তে গৃহে বরণ করে নেওয়ার আনন্দময় শিল্প।',
        },
        significance: {
          en: 'Brings families together with creative cheer and natural festive color.',
          hi: 'परिवार के बच्चों और बड़ों को एक साथ रंग भरने और खुशियां बांटने का अवसर।',
          bn: 'পারিবারিক আনন্দ এবং রঙিন সৃষ্টিশীলতার অপূর্ব প্রকাশ।',
        },
        connection: {
          en: 'Adorns homes across every state of India on Diwali morning and evening.',
          hi: 'दिवाली की सुबह और शाम भारत के हर घर के आंगन को सुशोभित करती है।',
          bn: 'দীপাবলির দিনে সমগ্র ভারতের প্রতিটি গৃহদ্বারের চিরায়ত শোভা।',
        },
      },
    },
    {
      id: 'all-india-mithai-sharing',
      regionId: 'all-india',
      type: 'faral-platter',
      icon: '🍬',
      illustrationType: 'faral-platter',
      badge: {
        en: 'The Sweetness of Sharing',
        hi: 'दिवाली मिष्ठान व सौहार्द',
        bn: 'মিষ্টিমুখ ও সম্প্রীতির বিনিময়',
      },
      title: {
        en: 'Diwali Mithai & Faral Platter (मिष्ठान थाली)',
        hi: 'दिवाली मिष्ठान व फराल थाली',
        bn: 'উৎসবের মিষ্টান্ন ও সুস্বাদু থালি',
      },
      subtitle: {
        en: 'Assemble a golden platter of handcrafted laddus, kaju barfi, and savory treats to share.',
        hi: 'स्वादिष्ट लड्डू, काजू कतली और कुरकुरे पकवानों की थाली सजाकर अपनों में मिठास बांटें।',
        bn: 'লাড্ডু, কাজু বরফি আর ঘরোয়া মচমচে নিমকি সাজিয়ে প্রিয়জনদের মিষ্টিমুখ করান।',
      },
      significance: {
        en: 'Diwali across India is incomplete without exchanging homemade sweets. Boxes of mithai travel between relatives, neighbors, and friends as tokens of enduring love and respect.',
        hi: 'मिठास बांटने से दूरियां मिटती हैं और रिश्ते प्रगाढ़ होते हैं—यही दिवाली का सच्चा संदेश है।',
        bn: 'মিষ্টির আদান-প্রদান ভালোবাসাকে গভীর করে এবং প্রতিটি পরিবারে আনন্দের বাঁধন মজবুত করে।',
      },
      whyWeCelebrate: {
        what: {
          en: 'Sharing traditional sweets and savories with every visiting guest and neighbor.',
          hi: 'घर आए हर मेहमान और पड़ोसी को प्रेम से मिष्ठान खिलाना।',
          bn: 'প্রতিটি অতিথি ও প্রতিবেশীর সাথে উৎসবের মিষ্টান্ন ভাগ করে নেওয়া।',
        },
        why: {
          en: 'Sweetening the tongue sweetens speech, resolving past grievances and nurturing harmony for the new year.',
          hi: 'मीठा खाने से वाणी में मिठास आती है और नए साल में आपसी प्रेम बढ़ता है।',
          bn: 'মিষ্টান্নের স্পর্শে পুরোনো তিক্ততা ভুলে নতুন বছরকে শুভ ও মধুর করে তোলা।',
        },
        significance: {
          en: 'A culinary celebration of autumn harvest, golden ghee, and family recipes.',
          hi: 'ऋतु की फसल, शुद्ध घी और पीढ़ियों के वात्सल्य का अनुपम स्वाद।',
          bn: 'ঘরোয়া শুদ্ধ ঘি ও ভালোবাসায় তৈরি চিরায়ত স্বাদের মেলবন্ধন।',
        },
        connection: {
          en: 'The universal signature taste of celebration in every household across Bharat.',
          hi: 'भारत के हर घर में दीपोत्सव का जाना-पहचाना और मनभावन स्वाद।',
          bn: 'ভারতবর্ষের প্রতিটি ঘরে ঘরে দীপাবলির চিরপরিচিত মধুর ঐতিহ্য।',
        },
      },
    },
  ],
};

/**
 * Fallback activities generated for any Indian State or Union Territory
 * using their verified regional profile in regionalData.ts!
 */
export function getRegionalActivities(stateOrRegionName?: string): RegionalActivity[] {
  if (!stateOrRegionName || !stateOrRegionName.trim()) {
    return REGIONAL_ACTIVITIES_MAP['all-india'];
  }

  const region = getRegionByName(stateOrRegionName);
  const regionId = region ? region.id : 'all-india';

  // If user is guest or selected All-India, strictly return universal All-India activities
  if (regionId === 'all-india') {
    return REGIONAL_ACTIVITIES_MAP['all-india'];
  }

  // Check if dedicated interactive activity set exists for this state
  if (REGIONAL_ACTIVITIES_MAP[regionId]) {
    return REGIONAL_ACTIVITIES_MAP[regionId];
  }

  // Gracefully construct authentic activities dynamically from regionalData.ts for ANY state
  if (region && region.id !== 'all-india') {
    const dynamicActivities: RegionalActivity[] = [
      {
        id: `${region.id}-sacred-diya`,
        regionId: region.id,
        type: 'universal-tradition',
        icon: '🪔',
        illustrationType: 'universal-diya',
        badge: {
          en: `${region.name} Traditional Lighting`,
          hi: `${region.hi} पावन दीपोत्सव`,
          bn: `${region.bn} পবিত্র প্রদীপ প্রথা`,
        },
        title: {
          en: `${region.decorTradition.diyaName.en} Illumination`,
          hi: `${region.decorTradition.diyaName.hi} प्रज्वलन`,
          bn: `${region.decorTradition.diyaName.bn} প্রজ্বালন`,
        },
        subtitle: {
          en: `Experience the sacred glow of traditional ${region.decorTradition.diyaName.en} from ${region.name}.`,
          hi: `${region.hi} की पावन परंपरा अनुसार पारंपरिक दीप जलाकर घर को आलोकित करें।`,
          bn: `${region.bn}-এর চিরায়ত ঐতিহ্য মেনে শুভ প্রদীপের আলোয় ঘর ভরিয়ে তুলুন।`,
        },
        significance: {
          en: region.decorTradition.diyaDesc.en,
          hi: region.decorTradition.diyaDesc.hi,
          bn: region.decorTradition.diyaDesc.bn,
        },
        whyWeCelebrate: {
          what: {
            en: `Lighting traditional ${region.decorTradition.diyaName.en} across the threshold.`,
            hi: `चौखट और आँगन में ${region.decorTradition.diyaName.hi} प्रज्वलित करना।`,
            bn: `দ্বারে ও অঙ্গনে ${region.decorTradition.diyaName.bn} প্রজ্জ্বলন।`,
          },
          why: {
            en: region.introTagline.en,
            hi: region.introTagline.hi,
            bn: region.introTagline.bn,
          },
          significance: {
            en: region.highlight.en,
            hi: region.highlight.hi,
            bn: region.highlight.bn,
          },
          connection: {
            en: `Cherished by generations celebrating Diwali in ${region.name}.`,
            hi: `${region.hi} के परिवारों में पीढ़ियों से चली आ रही गौरवशाली परंपरा।`,
            bn: `${region.bn}-এর ঘরে ঘরে বয়ে চলা পারিবারিক ঐতিহ্যের ধারা।`,
          },
        },
      },
      {
        id: `${region.id}-sacred-art`,
        regionId: region.id,
        type: 'universal-tradition',
        icon: '🌸',
        illustrationType: 'universal-rangoli',
        badge: {
          en: `${region.name} Folk Art`,
          hi: `${region.hi} पारंपरिक लोक कला`,
          bn: `${region.bn} লোকশিল্পের মাধুর্য`,
        },
        title: {
          en: region.decorTradition.artName.en,
          hi: region.decorTradition.artName.hi,
          bn: region.decorTradition.artName.bn,
        },
        subtitle: {
          en: `Create authentic ${region.decorTradition.artName.en} threshold patterns with vibrant colors.`,
          hi: `${region.decorTradition.artName.hi} से आँगन और चौखट को पवित्र और सुंदर बनाएं।`,
          bn: `${region.decorTradition.artName.bn} দিয়ে গৃহের প্রবেশদ্বার মাঙ্গলিক করে তুলুন।`,
        },
        significance: {
          en: region.decorTradition.artDesc.en,
          hi: region.decorTradition.artDesc.hi,
          bn: region.decorTradition.artDesc.bn,
        },
        whyWeCelebrate: {
          what: {
            en: `Drawing authentic motifs of ${region.decorTradition.artName.en} at the main doorway.`,
            hi: `घर के मुख्य द्वार पर ${region.decorTradition.artName.hi} उकेरना।`,
            bn: `প্রধান প্রবেশদ্বারে ${region.decorTradition.artName.bn} অঙ্কন।`,
          },
          why: {
            en: 'To sanctify the household entrance and invite health, abundance, and divine blessings.',
            hi: 'घर के आंगन को पावन कर सुख, स्वास्थ्य और समृद्धि का स्वागत करना।',
            bn: 'গৃহদ্বারের পবিত্রতা রক্ষা করে শুভ শক্তির আবাহন জানানো।',
          },
          significance: {
            en: region.decorTradition.toranDesc.en,
            hi: region.decorTradition.toranDesc.hi,
            bn: region.decorTradition.toranDesc.bn,
          },
          connection: {
            en: `Distinctive cultural aesthetic of ${region.name}.`,
            hi: `${region.hi} की प्रांतीय लोककला और सांस्कृतिक पहचान।`,
            bn: `${region.bn}-এর বিশিষ্ট লোকসংস্কৃতির গৌরব।`,
          },
        },
      },
      {
        id: `${region.id}-festive-treat`,
        regionId: region.id,
        type: 'universal-tradition',
        icon: '🍯',
        illustrationType: 'universal-food',
        badge: {
          en: `${region.name} Festive Delicacy`,
          hi: `${region.hi} उत्सव मिष्ठान`,
          bn: `${region.bn} উৎসবের মিষ্টান্ন`,
        },
        title: {
          en: region.foodSpecialty.name.en,
          hi: region.foodSpecialty.name.hi,
          bn: region.foodSpecialty.name.bn,
        },
        subtitle: {
          en: `Experience the authentic flavor of ${region.foodSpecialty.name.en} prepared for festive guests.`,
          hi: `दिवाली के पावन अवसर पर बनाए जाने वाले ${region.foodSpecialty.name.hi} का आनंद लें।`,
          bn: `দীপাবলিতে পরিবেশিত ${region.foodSpecialty.name.bn}-এর অতুলনীয় আস্বাদন।`,
        },
        significance: {
          en: region.foodSpecialty.desc.en,
          hi: region.foodSpecialty.desc.hi,
          bn: region.foodSpecialty.desc.bn,
        },
        whyWeCelebrate: {
          what: {
            en: `Sharing ${region.foodSpecialty.name.en} with family, neighbors, and visiting loved ones.`,
            hi: `अपनों और पड़ोसियों में ${region.foodSpecialty.name.hi} बांटना।`,
            bn: `স্বজন ও প্রতিবেশীদের সাথে ${region.foodSpecialty.name.bn} ভাগ করে নেওয়া।`,
          },
          why: {
            en: 'Festivals are sweetest when shared. Offering homemade specialties sweetens relationships and celebrates seasonal harvests.',
            hi: 'मिठास बांटने से रिश्तों में प्रेम और मिठास बढ़ती है।',
            bn: 'মিষ্টিমুখ করিয়ে সম্পর্কের মাধুর্য বৃদ্ধি ও সৌহার্দ্য বিনিময়।',
          },
          significance: {
            en: 'Preserves cherished traditional recipes perfected across centuries.',
            hi: 'पारंपरिक पाक कला और पीढ़ियों के वात्सल्य का जीवंत प्रमाण।',
            bn: 'শতাব্দী প্রাচীন রন্ধনশিল্প ও পারিবারিক স্নেহের মেলবন্ধন।',
          },
          connection: {
            en: `The signature sweet taste of Diwali in ${region.name}.`,
            hi: `${region.hi} के दीपोत्सव का जाना-माना स्वाद।`,
            bn: `${region.bn}-এর দীপাবলির ঐতিহ্যবাহী পরিচিত মিষ্টি।`,
          },
        },
      },
    ];
    return dynamicActivities;
  }

  // Strict fallback to All-India universal Diwali experience (never silently fallback to West Bengal!)
  return REGIONAL_ACTIVITIES_MAP['all-india'];
}

export const FEATURED_INTERACTIVE_REGION_IDS = [
  'all-india',
  'west-bengal',
  'karnataka',
  'gujarat',
  'maharashtra',
  'tamil-nadu',
  'uttar-pradesh',
  'odisha',
  'punjab',
  'rajasthan',
  'goa',
];

export function hasDedicatedActivities(stateNameOrId?: string): boolean {
  if (!stateNameOrId) return false;
  const region = getRegionByName(stateNameOrId);
  const id = region ? region.id : stateNameOrId.toLowerCase().trim().replace(/\s+/g, '-');
  return FEATURED_INTERACTIVE_REGION_IDS.includes(id);
}
