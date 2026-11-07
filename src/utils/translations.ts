/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'hi' | 'bn';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
];

export interface TranslationDictionary {
  appTitle: string;
  share: string;
  copied: string;
  musicOn: string;
  musicOff: string;
  editGifts: string;
  audioCreditsBtn: string;

  nav: {
    welcome: string;
    decorate: string;
    diya: string;
    fireworks: string;
    mithai: string;
    gift: string;
    letter: string;
  };

  regional: {
    celebrateMyRegional: string;
    exploreOtherTraditions: string;
    whyWeCelebrate: string;
    traditionalDecor: string;
    traditionalDiyas: string;
    festiveTreats: string;
    keyTraditionsLabel: string;
    switchToThisState: string;
    currentlyCelebrating: string;
    exploreIndiaTitle: string;
    exploreIndiaSubtitle: string;
    searchPlaceholder: string;
    closeExplorer: string;
    oneIndiaBanner: string;
    celebrateNow: string;
    experienceTraditionsTitle: string;
    experienceTraditionsQuote: string;
    experienceTraditionsSub: string;
    experienceTraditionBtn: string;
    whyWeCelebrateSection: string;
    whatIsTradition: string;
    whyFollowed: string;
    culturalSignificance: string;
    regionalAssociation: string;
    traditionCompleted: string;
    exploreMoreActivities: string;
    shankhSoundBtn: string;
    dhakSoundBtn: string;
    templeBellBtn: string;
    interactiveBadge: string;
    culturalLoreBadge: string;
    traditionsCount: string;
    culturalMeaningTitle: string;
    howObservedTitle: string;
    calendarTimingTitle: string;
    communityDiversityTitle: string;
    verifiedSourceLabel: string;
    officialPortalBtn: string;
    allRegionsTab: string;
    interactiveTab: string;
    heritageTab: string;
    panIndiaIdentity: string;
    noRegionsFound: string;
    searchTip: string;
    sourceLabel: string;
    verifiedReference: string;
  };

  welcome: {
    badge: string;
    heading: string;
    subheading: string;
    oneLineText: string;
    supportingText: string;
    emotionalHeading: string;
    emotionalSupportingText: string;
    question: string;
    nameLabel: string;
    namePlaceholder: string;
    quickPickLabel: string;
    stateLabel: string;
    statePlaceholder: string;
    stateSearchPlaceholder: string;
    stateSearchEmpty: string;
    cityLabel: string;
    cityPlaceholder: string;
    statesCategory: string;
    utCategory: string;
    welcomeModalTitle: string;
    welcomeModalStory: string;
    welcomeModalBlessing: string;
    stepInsideButton: string;
    changeDetails: string;
    validationName: string;
    validationState: string;
    allIndiaCelebration: string;
    chips: {
      family: string;
      friends: string;
      maa: string;
      papa: string;
      brother: string;
      sister: string;
      someoneSpecial: string;
      bestie: string;
    };
    preview: {
      decorate: string;
      diya: string;
      fireworks: string;
      surprise: string;
    };
    enterButton: string;
    guestText: string;
    welcomeFeedback: string;
    touchHint: string;
    panIndiaCelebrationTitle: string;
    panIndiaCelebrationDesc: string;
    relationLabel: string;
    relationHint: string;
    nameInputPlaceholder: string;
    cityMismatchWarning: string;
    selectDetectedState: string;
    clearCity: string;
    popularCitiesLabel: string;
    directGreetingBtn: string;
    stateCategoryBadge: string;
    stateSearchEmptyTip: string;
    interactiveBadge: string;
    utBadge: string;
    stateBadge: string;
    optionalLabel: string;
  };

  decorate: {
    stageBadge: string;
    heading: string;
    hintInitial: string;
    hintProgress: string;
    hintComplete: string;
    lights: string;
    lightsDesc: string;
    toran: string;
    toranDesc: string;
    rangoli: string;
    rangoliDesc: string;
    diyas: string;
    diyasDesc: string;
    decorateAll: string;
    reset: string;
    skip: string;
    lightDiyaButton: string;
    decorBoxTitle: string;
    decorBoxSubtitle: string;
    placed: string;
    lit: string;
    pick: string;
    calibrate: string;
    exitCalibrate: string;
    funGamesBtn: string;
    nextSkyFireworks: string;
  };

  diya: {
    badge: string;
    introQuote: string;
    tapInstruction: string;
    tapHereBadge: string;
    greetingGreeting: string;
    lightingDiyaText: string;
    blessingText: string;
    celebrateButton: string;
    nextHint: string;
    tapToLightAria: string;
    litDiyaAria: string;
  };

  fireworks: {
    bannerBadge: string;
    heading: string;
    subheading: string;
    instruction: string;
    oneMoreBtn: string;
    continueMithaiBtn: string;
  };

  mithai: {
    badge: string;
    heading: string;
    subheading: string;
    kajuTitle: string;
    kajuBadge: string;
    kajuDesc: string;
    kajuPickBtn: string;
    soanTitle: string;
    soanBadge: string;
    soanDesc: string;
    soanPickBtn: string;
    prankTitle: string;
    prankSubtitle: string;
    prankPunchline: string;
    prankMemeText: string;
    soanChoiceTitle: string;
    soanChoiceText: string;
    tryOtherBox: string;
    realGiftNotice: string;
    showRealGiftBtn: string;
    mysteryBoxBadge: string;
    mysteryBoxTitle: string;
    mysteryBoxDesc: string;
    scratchInstruction: string;
    openedBoxBadge: string;
    boxRevealed: string;
    canvasDarkBox: string;
    canvasScratchPrompt: string;
    kajuTwistLabel: string;
    soanTwistLabel: string;
    soanPrankTitle: string;
    soanPrankSubtitle: string;
    soanPrankPunchline: string;
    soanPrankMemeText: string;
  };

  gift: {
    badge: string;
    heading: string;
    subheading: string;
    tapToUnbox: string;
    giftFor: string;
    continueToLetter: string;
    closeBox: string;
    editGiftsBtn: string;
    genericGiftTitle: string;
    genericGiftMessage: string;
    dodgeHints: string[];
    dodgeHintLast: string;
    dodgeHintDefault: string;
    unboxingCelebration: string;
    genericHamperName: string;
    genericHamperDesc: string;
  };

  letter: {
    badge: string;
    heading: string;
    subheading: string;
    envelopeTitle: string;
    toLabel: string;
    openLetterBtn: string;
    celebrateAgainBtn: string;
    shareBtn: string;
    modalTitle: string;
    diwaliSandesh: string;
    salutationDefault: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    closing: string;
    signature: string;
    closeBtn: string;
    tabSealedLetter: string;
    tabKeepsake: string;
    tabAiLetters: string;
    envelopeTapAria: string;
    keepsakeTitle: string;
  };

  shareModal: {
    title: string;
    desc: string;
    nameLabel: string;
    linkLabel: string;
    shareAppBtn: string;
    copyLinkBtn: string;
    copiedNotice: string;
  };

  security: {
    creatorModeTitle: string;
    creatorModeSubtitle: string;
    creatorModeBadge: string;
    secretVerificationTitle: string;
    secretPlaceholder: string;
    verifyBtn: string;
    verifying: string;
    invalidSecret: string;
    tokenRevoked: string;
    tokenExpired: string;
    tokenCopied: string;
    generateTokenBtn: string;
    revokeTokenBtn: string;
    expiresInLabel: string;
    recipientDesc: string;
    customizeGiftsBtn: string;
    activeTokensLabel: string;
    statusActive: string;
    statusRevoked: string;
    statusExpired: string;
  };

  mela: {
    melaTitle: string;
    melaSubtitle: string;
    backToDecor: string;
    starsLabel: string;
    badgesLabel: string;
    activitiesProgress: string;
    starsPerGame: string;
    allBadgesTitle: string;
    earnedBadges: string;
    noBadgesYet: string;
    playMelaBtn: string;
  };

  audioCredits: {
    title: string;
    subtitle: string;
    verified: string;
    optimizationTitle: string;
    optimizationDesc: string;
    copyCitations: string;
    copiedCitations: string;
    stopBtn: string;
    previewBtn: string;
    closeBtn: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appTitle: 'SHUBH DEEPAVALI',
    share: 'Share 🪔',
    copied: 'Link Copied!',
    musicOn: 'Play Festive Music',
    musicOff: 'Mute Music',
    editGifts: 'Customise Gifts & Letter',
    audioCreditsBtn: 'Audio Credits & Licences',

    nav: {
      welcome: 'Welcome',
      decorate: 'Decorate',
      diya: 'Light Diya',
      fireworks: 'Sky Fireworks',
      mithai: 'Mithai',
      gift: 'Family Gift',
      letter: 'Heartfelt Letter',
    },

    regional: {
      celebrateMyRegional: 'Celebrate My {region} Diwali 🪔',
      exploreOtherTraditions: "Explore India's Other Diwali Traditions 🇮🇳",
      whyWeCelebrate: 'Why It Is Celebrated',
      traditionalDecor: 'Traditional Decorations',
      traditionalDiyas: 'Sacred Lamps & Diyas',
      festiveTreats: 'Regional Festive Delicacy',
      keyTraditionsLabel: 'Important Regional Traditions',
      switchToThisState: "Celebrate this State's Traditions",
      currentlyCelebrating: 'Currently Selected',
      exploreIndiaTitle: "India's Diverse Diwali Traditions",
      exploreIndiaSubtitle: '28 States & 8 Union Territories · One Festival of Lights',
      searchPlaceholder: 'Search state, festival, or custom...',
      closeExplorer: 'Back to Celebration',
      oneIndiaBanner: 'Different traditions, different stories, but one India celebrating the festival of lights together.',
      celebrateNow: 'Celebrate with these Traditions 🪔',
      experienceTraditionsTitle: 'Experience My Traditions',
      experienceTraditionsQuote: 'Some traditions are not just celebrated. They are felt, remembered and passed down.',
      experienceTraditionsSub: 'Step into the rituals, sounds, and sacred moments that make your celebration feel like home.',
      experienceTraditionBtn: 'Experience This Tradition',
      whyWeCelebrateSection: 'Why We Celebrate This',
      whatIsTradition: 'What This Tradition Is',
      whyFollowed: 'Why It Is Followed',
      culturalSignificance: 'Cultural & Spiritual Significance',
      regionalAssociation: 'Regional Heritage Connection',
      traditionCompleted: 'Experienced with Love & Reverence ✨',
      exploreMoreActivities: 'Explore other regional traditions of India',
      shankhSoundBtn: 'Blow Sacred Shankh (শাঁখ) 🐚',
      dhakSoundBtn: 'Play Festive Dhak (ঢাক) 🥁',
      templeBellBtn: 'Ring Temple Bell (घंटी) 🔔',
      interactiveBadge: 'Interactive Rituals',
      culturalLoreBadge: 'Cultural Lore',
      traditionsCount: '{count} traditions',
      culturalMeaningTitle: 'Cultural Meaning & Spiritual Significance',
      howObservedTitle: 'How Traditionally Observed',
      calendarTimingTitle: 'Traditional Calendar Timing',
      communityDiversityTitle: 'Regional & Community Diversity',
      verifiedSourceLabel: 'Verified Cultural Source:',
      officialPortalBtn: 'Official Portal',
      allRegionsTab: 'All Regions',
      interactiveTab: 'Interactive Experiences',
      heritageTab: 'Cultural Heritage',
      panIndiaIdentity: 'Pan-India Identity',
      noRegionsFound: 'No matching regions found.',
      searchTip: 'Try searching by state name or cultural festival!',
      sourceLabel: 'Source:',
      verifiedReference: 'Official Reference',
    },

    welcome: {
      badge: 'Shubh Deepavali 2026 🪔',
      heading: 'One India. Many Diwalis. One Beautiful Celebration.',
      emotionalHeading: 'One India. Many Diwalis. One Beautiful Celebration.',
      subheading: 'A little light, a little laughter, and lots of love.',
      oneLineText: 'Light a diya. Share a smile. Feel the love.',
      supportingText: "Celebrate the traditions that make your Diwali uniquely yours. ❤️",
      emotionalSupportingText: "Celebrate the traditions that make your Diwali uniquely yours. ❤️",
      question: 'Where does your Diwali story begin?',
      nameLabel: 'Your Name',
      namePlaceholder: 'Enter your name (e.g. Lakshmi, Rohan, Priya...)',
      quickPickLabel: 'Or select who you are celebrating with:',
      stateLabel: 'Where are you celebrating from?',
      statePlaceholder: 'Select your Indian State or UT',
      stateSearchPlaceholder: 'Search 28 states & 8 UTs...',
      stateSearchEmpty: 'No matching state or union territory found',
      cityLabel: 'Your City (Optional)',
      cityPlaceholder: 'e.g. Kolkata, Bengaluru, Mumbai, Chennai, Guwahati',
      statesCategory: '28 Indian States',
      utCategory: '8 Union Territories',
      welcomeModalTitle: 'Welcome home, {name}! ❤️',
      welcomeModalStory: 'Your Diwali story begins in {location}.',
      welcomeModalBlessing: "Let's celebrate the beautiful traditions that make your home unique.",
      stepInsideButton: 'Step into Your Home Celebration 🪔',
      changeDetails: 'Change details',
      validationName: 'Please enter your name or choose a chip',
      validationState: 'Please select where you are celebrating from',
      allIndiaCelebration: 'All-India Celebration',
      chips: {
        family: 'Family',
        friends: 'Friends',
        maa: 'Maa',
        papa: 'Papa',
        brother: 'Brother',
        sister: 'Sister',
        bestie: 'Bestie',
        someoneSpecial: 'Someone Special',
      },
      preview: {
        decorate: 'Decorate Your Home',
        diya: 'Light a Diya',
        fireworks: 'Watch Fireworks',
        surprise: 'Discover Surprises',
      },
      enterButton: 'Begin Your Diwali Story 🪔',
      guestText: 'Or step inside as a guest without personalizing ✨',
      welcomeFeedback: 'Swagatam! Welcome to your Diwali celebration ✨',
      touchHint: 'Tap to glow',
      panIndiaCelebrationTitle: 'Pan-India Universal Celebration',
      panIndiaCelebrationDesc: 'Uniting the luminous customs, sacred decor, and joyous traditions of all 28 states and 8 union territories in one harmonious celebration.',
      relationLabel: 'Relation with the Sender',
      relationHint: 'Gifts & letters adapt to this',
      nameInputPlaceholder: 'Enter your name (e.g. Lakshmi, Rohan, Priya...)',
      cityMismatchWarning: '"{city}" is in {state}.',
      selectDetectedState: 'Select {state}',
      clearCity: 'Clear City',
      popularCitiesLabel: 'Popular:',
      directGreetingBtn: 'Create & Share Your Diwali Greeting ✨',
      stateCategoryBadge: '28 States • 8 UTs',
      stateSearchEmptyTip: 'Tip: Cities like Kolkata, Bengaluru, Mumbai can be typed here or in the City box!',
      interactiveBadge: 'Interactive',
      utBadge: 'UT',
      stateBadge: 'State',
      optionalLabel: 'Optional',
    },

    decorate: {
      stageBadge: 'Home Decoration',
      heading: "Let's Decorate Our Home!",
      hintInitial: 'Tap the roof, doorway, and floor to light up your home.',
      hintProgress: 'Your home is getting prettier! ✨ Keep adding more warmth.',
      hintComplete: "Ohooo!! Look who's ready for Diwali!! 🪔✨",
      lights: 'Fairy Lights',
      lightsDesc: 'Roofline & Arch',
      toran: 'Marigold Toran',
      toranDesc: 'Doorway Blessing',
      rangoli: 'Color Rangoli',
      rangoliDesc: 'Courtyard Art',
      diyas: 'Brass Diyas',
      diyasDesc: 'placed on steps',
      decorateAll: 'Decorate All',
      reset: 'Reset',
      skip: 'Skip to Diya ⏭️',
      lightDiyaButton: 'Light the Diya 🪔',
      decorBoxTitle: 'Decor Box',
      decorBoxSubtitle: 'Click and decorate your haveli',
      placed: 'Placed',
      lit: 'Lit',
      pick: 'Use',
      calibrate: 'Calibrate',
      exitCalibrate: 'Exit',
      funGamesBtn: 'Fun Games >',
      nextSkyFireworks: 'Sky Fireworks',
    },

    diya: {
      badge: 'Diwali Jyoti Pradeep',
      introQuote: '"Every celebration begins with a little light..."',
      tapInstruction: 'Tap the diya to light it 🪔',
      tapHereBadge: '👉 Tap Here to Light',
      greetingGreeting: 'HEYYYY',
      lightingDiyaText: "You're lighting the Diyaaa!! 🪔",
      blessingText: 'May this little light fill your home with happiness, peace, love and endless beautiful memories.',
      celebrateButton: "Let's Celebrate! 🎉",
      nextHint: 'Next: Watch the digital midnight sky illuminate!',
      tapToLightAria: 'Mitti ka diya (tap to light)',
      litDiyaAria: 'Mitti ka diya (lit)',
    },

    fireworks: {
      bannerBadge: 'click anywhere to enjoy sky fireworks',
      heading: 'LOOK AT THE SKY',
      subheading: '"The whole sky is celebrating with you!"',
      instruction: 'click anywhere to enjoy sky fireworks',
      oneMoreBtn: 'One More Celebration! 🎆',
      continueMithaiBtn: 'Continue to Mithai 🍬',
    },

    mithai: {
      badge: 'Activity 4 of 6 · Festive Sweet Time',
      heading: 'Okayyyy, enough celebrations... MITHAI TIME!! 🍬',
      subheading: '"Choose your favourite sweet!"',
      kajuTitle: 'Kaju Katli Box 🪙',
      kajuBadge: '✨ Royal Silver Varak',
      kajuDesc: 'Diamond-cut royal cashew goodness with pure silver varak.',
      kajuPickBtn: 'Pick Kaju Katli 😋',
      soanTitle: 'Soan Papdi Box 📦',
      soanBadge: '🎁 The Diwali Legend',
      soanDesc: 'The undisputed king of Diwali gifting. Crispy, sweet & immortal.',
      soanPickBtn: 'Pick Soan Papdi 🤤',
      prankTitle: 'HAHAHAHA!! SURPRISEEEE!! 😭',
      prankSubtitle: 'Dreamt of Royal Kaju Katli, did you?',
      prankPunchline: 'YEH LO SOAN PAPDIIII!! 😂',
      prankMemeText: 'Because what is Diwali without a surprise Soan Papdi box traveling through the universe?',
      soanChoiceTitle: 'Already knew your taste! 😂',
      soanChoiceText: "A true connoisseur who doesn't fight destiny. Respect! 🫡",
      tryOtherBox: 'Want to open the other box too? Try it! 🔄',
      realGiftNotice: "Okay okay... jokes apart. Here's your REAL gift!",
      showRealGiftBtn: 'Show Me My Gift 🎁',
      mysteryBoxBadge: '🎁 Mystery Box',
      mysteryBoxTitle: '✨ Mystery Sweet Box ✨',
      mysteryBoxDesc: 'Scratch the dark packaging above to reveal!',
      scratchInstruction: 'Drag finger or mouse over dark box to scratch',
      openedBoxBadge: 'Opened Box 🎁',
      boxRevealed: 'Box Revealed!',
      canvasDarkBox: 'DARK MYSTERY BOX',
      canvasScratchPrompt: '✨ Scratch here to uncover ✨',
      kajuTwistLabel: "⚠️ It's Actually Soan Papdi!! 😂",
      soanTwistLabel: '👑 Miracle Upgrade: Kaju Katli!! ✨',
      soanPrankTitle: 'A DIWALI MIRACLE!! 👑✨',
      soanPrankSubtitle: 'Thought you were getting Soan Papdi?',
      soanPrankPunchline: 'SURPRISE! ROYAL KAJU KATLI!! 😋',
      soanPrankMemeText: 'The festive gods have smiled upon you! Pure silver-varak cashew delight!',
    },

    gift: {
      badge: 'Activity 5 of 6 · Personalised Family Gift',
      heading: 'Your Real Diwali Gift! 🎁',
      subheading: '"Handpicked with love, blessings, and warm festive wishes."',
      tapToUnbox: 'Tap to Unbox 🎁',
      giftFor: 'Special Diwali Gift For',
      continueToLetter: 'A Little Letter for You ❤️',
      closeBox: 'Close and reopen box 📦',
      editGiftsBtn: 'Edit Gifts',
      genericGiftTitle: 'A Grand Royal Diwali Celebration Hamper',
      genericGiftMessage: 'May this festival of lights fill your life with warmth, success, joyous laughs, and endless blessings!',
      dodgeHints: [
        'Almost got it! Catch it! 🏃',
        'Too quick! Keep chasing! ✨',
        'Whoosh! Just missed it! 🎁',
        'One more attempt! Getting closer! 🌟',
      ],
      dodgeHintLast: 'catch up!! 😆',
      dodgeHintDefault: 'Hover or tap to catch your gift box...',
      unboxingCelebration: 'Unboxed with love!',
      genericHamperName: 'A Grand Royal Diwali Celebration Hamper',
      genericHamperDesc: 'A lavish collection of artisanal festive sweets, dry fruits, hand-crafted earthen diyas, and warm family blessings.',
    },

    letter: {
      badge: 'Final Celebration Note',
      heading: 'A Little Note for You ❤️',
      subheading: '"From the bottom of our hearts, for this festive season."',
      envelopeTitle: 'Personal Diwali Greeting',
      toLabel: 'To Dearest',
      openLetterBtn: 'Open Your Special Letter ✉️',
      celebrateAgainBtn: 'Celebrate Again 🔄',
      shareBtn: 'Share With Loved Ones 🪔',
      modalTitle: 'Diwali Sandesh',
      diwaliSandesh: 'शुभ दीपावली ✨',
      salutationDefault: 'Dear',
      p1: 'Another Diwali is here, bringing with it lights, laughter, sweets and beautiful memories.',
      p2: 'I hope this festival fills your life with happiness, brings peace to your heart and makes your home brighter than ever.',
      p3: 'No matter how busy life gets, family and loved ones will always be one of the most beautiful gifts we have.',
      p4: 'Thank you for being a part of my world.',
      p5: 'Wishing you endless happiness, good health, prosperity and countless reasons to smile.',
      closing: 'With lots of love,',
      signature: 'Happy Diwali! 🪔❤️',
      closeBtn: 'Close',
      tabSealedLetter: 'Sealed Letter',
      tabKeepsake: '🎨 Diwali Keepsake (HD)',
      tabAiLetters: '✦ Gemini AI Letters',
      envelopeTapAria: 'Tap to open the sealed handwritten Diwali letter',
      keepsakeTitle: 'Diwali Keepsake Collage',
    },

    shareModal: {
      title: 'Share Diwali Celebration',
      desc: 'Send this magical Diwali celebration to friends and family across India!',
      nameLabel: 'Personalised Name in Link',
      linkLabel: 'Personalised Celebration Link:',
      shareAppBtn: 'Share App 🪔',
      copyLinkBtn: 'Copy Link',
      copiedNotice: 'Link Copied to Clipboard!',
    },

    security: {
      creatorModeTitle: 'Creator Customisation Studio',
      creatorModeSubtitle: 'Manage private recipient links, tokens, and custom letters',
      creatorModeBadge: 'Creator Mode · Private Link Generator',
      secretVerificationTitle: 'Creator Authentication',
      secretPlaceholder: 'Enter creator password...',
      verifyBtn: 'Verify on Server',
      verifying: 'Verifying...',
      invalidSecret: 'Invalid creator credentials. Access denied.',
      tokenRevoked: 'This recipient link has been revoked.',
      tokenExpired: 'This recipient link has expired.',
      tokenCopied: 'Private Link Copied!',
      generateTokenBtn: 'Generate Secure Token',
      revokeTokenBtn: 'Revoke Link',
      expiresInLabel: 'Link Validity',
      recipientDesc: 'Share these private secret links with family members. Each link unlocks only their specific gift and heartfelt letter:',
      customizeGiftsBtn: 'Customize',
      activeTokensLabel: 'Active Private Tokens',
      statusActive: 'Active',
      statusRevoked: 'Revoked',
      statusExpired: 'Expired',
    },

    mela: {
      melaTitle: 'Shubh Diwali Fun & Games Mela!',
      melaSubtitle: 'Playful challenges, joyful games & sparkly Diwali stars! 🎯⭐',
      backToDecor: 'Back to Decor',
      starsLabel: 'Diwali Stars',
      badgesLabel: 'Badges',
      activitiesProgress: 'Mela Activities',
      starsPerGame: '+25 stars earned per festive challenge',
      allBadgesTitle: 'Your Earned Mela Badges',
      earnedBadges: 'Earned Badges',
      noBadgesYet: 'No Mela badges earned yet. Play games to unlock honours!',
      playMelaBtn: 'Play Eco-Diwali Mela',
    },

    audioCredits: {
      title: 'Audio Credits & Community Licences',
      subtitle: 'Honoring the folk artists, ritual recordists, and community creators who lent their authentic Indian soundscapes to this celebration.',
      verified: 'Verified',
      optimizationTitle: 'High-Performance Lazy Loading & Audio Compression',
      optimizationDesc: 'All community audio recordings are compressed to pristine 128kbps stereo and strictly loaded on-demand when ritual activities or fireworks are triggered. Initial app download payload is reduced from ~44 MB down to ~5.3 MB.',
      copyCitations: 'Copy Citations',
      copiedCitations: 'Copied All Attributions!',
      stopBtn: 'Stop',
      previewBtn: 'Preview Audio',
      closeBtn: 'Close',
    },
  },

  hi: {
    appTitle: 'शुभ दीपावली',
    share: 'शेयर करें 🪔',
    copied: 'लिंक कॉपी हो गया!',
    musicOn: 'संगीत बजाएं',
    musicOff: 'म्यूट करें',
    editGifts: 'उपहार व पत्र अनुकूलित करें',
    audioCreditsBtn: 'ध्वनि आभार एवं लाइसेंस',

    regional: {
      celebrateMyRegional: 'मेरी {region} की दिवाली मनाएं 🪔',
      exploreOtherTraditions: 'भारत की अन्य पावन परंपराएं देखें 🇮🇳',
      whyWeCelebrate: 'यह क्यों मनाया जाता है',
      traditionalDecor: 'पारंपरिक गृह सज्जा',
      traditionalDiyas: 'पावन दीपक व ज्योति',
      festiveTreats: 'क्षेत्रीय उत्सव मिष्ठान',
      keyTraditionsLabel: 'प्रमुख क्षेत्रीय परंपराएं',
      switchToThisState: 'इस राज्य की परंपराओं से मनाएं',
      currentlyCelebrating: 'वर्तमान में चयनित',
      exploreIndiaTitle: 'भारत के विविध दीपोत्सव रंग',
      exploreIndiaSubtitle: '२८ राज्य व ८ केंद्र शासित प्रदेश · एक पावन दीपोत्सव',
      searchPlaceholder: 'राज्य, उत्सव या परंपरा खोजें...',
      closeExplorer: 'उत्सव पर वापस जाएं',
      oneIndiaBanner: 'अलग परंपराएं, अलग कहानियां, पर रोशनी का यह पावन पर्व मिलकर मनाता एक भारत।',
      celebrateNow: 'इन पावन परंपराओं संग मनाएं 🪔',
      experienceTraditionsTitle: 'मेरी पावन परंपराओं का साक्षात अनुभव',
      experienceTraditionsQuote: 'कुछ परंपराएं सिर्फ मनाई नहीं जातीं। वे महसूस की जाती हैं, याद रखी जाती हैं और पीढ़ियों को सौंपी जाती हैं।',
      experienceTraditionsSub: 'अपने बचपन और घर की पावन रीतियों, ध्वनियों और संस्कारों में डूब जाएं।',
      experienceTraditionBtn: 'इस परंपरा का अनुभव करें',
      whyWeCelebrateSection: 'हम इसे क्यों मनाते हैं',
      whatIsTradition: 'यह परंपरा क्या है',
      whyFollowed: 'यह क्यों मनाई जाती है',
      culturalSignificance: 'सांस्कृतिक व आध्यात्मिक महत्व',
      regionalAssociation: 'प्रांतीय विशिष्ट पहचान',
      traditionCompleted: 'श्रद्धा व आनंद संग संपन्न ✨',
      exploreMoreActivities: 'भारत के अन्य राज्यों की परंपराएं भी देखें',
      shankhSoundBtn: 'पवित्र शंख ध्वनि 🐚',
      dhakSoundBtn: 'उत्सव का ढाक वादन 🥁',
      templeBellBtn: 'मंदिर की पावन घंटी 🔔',
      interactiveBadge: 'विशेष इंटरएक्टिव अनुष्ठान',
      culturalLoreBadge: 'सांस्कृतिक धरोहर',
      traditionsCount: '{count} परंपराएं',
      culturalMeaningTitle: 'सांस्कृतिक अर्थ एवं आध्यात्मिक महत्व',
      howObservedTitle: 'यह परंपरा कैसे मनाई जाती है',
      calendarTimingTitle: 'पावन तिथि एवं पंचांग',
      communityDiversityTitle: 'प्रांतीय एवं सामुदायिक विविधता',
      verifiedSourceLabel: 'प्रमाणित सांस्कृतिक स्रोत:',
      officialPortalBtn: 'प्रमाणित पोर्टल',
      allRegionsTab: 'सभी क्षेत्र',
      interactiveTab: 'अनुष्ठान अनुभव',
      heritageTab: 'सांस्कृतिक धरोहर',
      panIndiaIdentity: 'अखिल भारतीय पहचान',
      noRegionsFound: 'कोई राज्य या क्षेत्र नहीं मिला।',
      searchTip: 'राज्य के नाम या उत्सव से खोजें!',
      sourceLabel: 'स्रोत:',
      verifiedReference: 'प्रमाणित संदर्भ',
    },

    nav: {
      welcome: 'स्वागत',
      decorate: 'घर सजावट',
      diya: 'दीया जलाएं',
      fireworks: 'आतिशबाजी',
      mithai: 'मिठाई',
      gift: 'दिवाली उपहार',
      letter: 'हार्दिक पत्र',
    },

    welcome: {
      badge: 'शुभ दीपावली २०२६ 🪔',
      heading: 'एक भारत। अनेक दिवाली। एक सुंदर उत्सव।',
      emotionalHeading: 'एक भारत। अनेक दिवाली। एक सुंदर उत्सव।',
      subheading: 'थोड़ी रोशनी, थोड़ी हंसी और ढेर सारा प्यार।',
      oneLineText: 'दीया जलाएं। मुस्कान बांटें। प्यार महसूस करें।',
      supportingText: 'हर घर की अपनी एक दिवाली की कहानी है। बताइए आपकी कहानी कहाँ से शुरू होती है, और आइए उन परंपराओं को मनाएं जो आपके घर को सबसे खास बनाती हैं।',
      emotionalSupportingText: 'हर घर की अपनी एक दिवाली की कहानी है। बताइए आपकी कहानी कहाँ से शुरू होती है, और आइए उन परंपराओं को मनाएं जो आपके घर को सबसे खास बनाती हैं।',
      question: 'आपकी दिवाली की कहानी कहाँ से शुरू होती है?',
      nameLabel: 'आपका नाम',
      namePlaceholder: 'अपना नाम दर्ज करें (उदा. लक्ष्मी, रोहन, प्रिया...)',
      quickPickLabel: 'या चुनिए कि आप किसके साथ मना रहे हैं:',
      stateLabel: 'आप कहाँ से दिवाली मना रहे हैं?',
      statePlaceholder: 'अपना भारतीय राज्य या केंद्र शासित प्रदेश चुनें',
      stateSearchPlaceholder: '२८ राज्य व ८ केंद्र शासित प्रदेश खोजें...',
      stateSearchEmpty: 'कोई राज्य या केंद्र शासित प्रदेश नहीं मिला',
      cityLabel: 'आपका शहर (वैकल्पिक)',
      cityPlaceholder: 'उदा. कोलकाता, बेंगलुरु, मुंबई, चेन्नई, गुवाहाटी',
      statesCategory: '२८ भारतीय राज्य',
      utCategory: '८ केंद्र शासित प्रदेश',
      welcomeModalTitle: 'घर में स्वागत है, {name}! ❤️',
      welcomeModalStory: 'आपकी दिवाली की कहानी {location} से शुरू होती है।',
      welcomeModalBlessing: 'आइए उन पावन परंपराओं को मनाएं जो आपके घर को सबसे खास बनाती हैं।',
      stepInsideButton: 'अपने घर के उत्सव में कदम रखें 🪔',
      changeDetails: 'विवरण बदलें',
      validationName: 'कृपया अपना नाम दर्ज करें या एक विकल्प चुनें',
      validationState: 'कृपया चुनें कि आप कहाँ से दिवाली मना रहे हैं',
      allIndiaCelebration: 'अखिल भारतीय उत्सव',
      chips: {
        family: 'परिवार',
        friends: 'दोस्त',
        maa: 'माँ',
        papa: 'पापा',
        brother: 'भाई',
        sister: 'बहन',
        bestie: 'बेस्टी',
        someoneSpecial: 'कोई ख़ास',
      },
      preview: {
        decorate: 'घर सजाएं',
        diya: 'दीया जलाएं',
        fireworks: 'आतिशबाजी देखें',
        surprise: 'तोहफे पाएं',
      },
      enterButton: 'अपनी दिवाली की कहानी शुरू करें 🪔',
      guestText: 'या बिना नाम व राज्य के सीधे आगे बढ़ें ✨',
      welcomeFeedback: 'स्वागतम्! दिवाली उत्सव में आपका हार्दिक स्वागत है ✨',
      touchHint: 'रोशनी के लिए छुएं',
      panIndiaCelebrationTitle: 'अखिल भारतीय सर्वव्यापी उत्सव',
      panIndiaCelebrationDesc: 'भारत के सभी २८ राज्यों एवं ८ केंद्र शासित प्रदेशों की पावन परंपराओं, दीपों व मिष्ठानों का एक साझा, सौहार्दपूर्ण उत्सव।',
      relationLabel: 'प्रेषक के साथ आपका संबंध',
      relationHint: 'गिफ्ट व पत्र इसके अनुसार मिलेंगे',
      nameInputPlaceholder: 'अपना नाम दर्ज करें (जैसे लक्ष्मी, रोहन, प्रिया...)',
      cityMismatchWarning: '"{city}" {state} में स्थित है।',
      selectDetectedState: '{state} चुनें',
      clearCity: 'शहर हटाएं',
      popularCitiesLabel: 'प्रमुख शहर:',
      directGreetingBtn: 'सीधे दिवाली शुभकामना पत्र बनाएं एवं शेयर करें ✨',
      stateCategoryBadge: '२८ राज्य • ८ केंद्र शासित प्रदेश',
      stateSearchEmptyTip: 'संकेत: कोलकाता, बेंगलुरु, मुंबई जैसे शहर यहाँ या शहर के डिब्बे में खोजे जा सकते हैं!',
      interactiveBadge: 'इंटरएक्टिव',
      utBadge: 'के.शा.प्र.',
      stateBadge: 'राज्य',
      optionalLabel: 'वैकल्पिक',
    },

    decorate: {
      stageBadge: 'गृह सज्जा',
      heading: 'आइए अपना घर सजाएं!',
      hintInitial: 'घर को रोशन करने के लिए छत, दरवाज़े और आँगन को छुएं।',
      hintProgress: 'आपका घर और सुंदर होता जा रहा है! ✨ और रोशनी जोड़ें।',
      hintComplete: 'ओहो!! देखिए दिवाली के लिए कौन तैयार है!! 🪔✨',
      lights: 'झिलमिलाती लाइटें',
      lightsDesc: 'छत और बालकनी पर',
      toran: 'गेंदे का तोरण',
      toranDesc: 'द्वार पर मंगल कामना',
      rangoli: 'रंग-बिरंगी रंगोली',
      rangoliDesc: 'आँगन में कलाकृति',
      diyas: 'पीतल के दीये',
      diyasDesc: 'सीढ़ियों पर जगमगाते',
      decorateAll: 'सब सजाएं',
      reset: 'रीसेट',
      skip: 'सीधे दीया जलाएं ⏭️',
      lightDiyaButton: 'दीया जलाएं 🪔',
      decorBoxTitle: 'सजावट पिटारा',
      decorBoxSubtitle: 'अपनी हवेली सजाने के लिए वस्तु चुनें',
      placed: 'सज गया',
      lit: 'प्रज्वलित',
      pick: 'सजाएं',
      calibrate: 'स्थान सेट करें',
      exitCalibrate: 'कैलिब्रेशन बंद',
      funGamesBtn: 'मजेदार खेल >',
      nextSkyFireworks: 'आतिशबाज़ी देखें',
    },

    diya: {
      badge: 'दीपावली पावन ज्योति',
      introQuote: '"हर उत्सव की शुरुआत एक छोटी सी रोशनी से होती है..."',
      tapInstruction: 'दीया जलाने के लिए छुएं 🪔',
      tapHereBadge: '👉 जलाने के लिए यहाँ छुएं',
      greetingGreeting: 'अरे वाह',
      lightingDiyaText: 'आपने दीया जला दिया!! 🪔',
      blessingText: 'यह पावन रोशनी आपके जीवन और घर को सुख, शांति, समृद्धि, प्रेम और अनगिनत खुशियों से भर दे।',
      celebrateButton: 'आइए जश्न मनाएं! 🎉',
      nextHint: 'आगे: आसमान में डिजिटल आतिशबाजी का अद्भुत नज़ारा!',
      tapToLightAria: 'मिट्टी का दीया (जलाने के लिए छुएं)',
      litDiyaAria: 'मिट्टी का दीया (प्रज्वलित)',
    },

    fireworks: {
      bannerBadge: 'click anywhere to enjoy sky fireworks',
      heading: 'आसमान देखिए',
      subheading: '"पूरा आसमान आपके साथ दिवाली मना रहा है!"',
      instruction: 'click anywhere to enjoy sky fireworks',
      oneMoreBtn: 'एक और धमाका! 🎆',
      continueMithaiBtn: 'मिठाई की तरफ चलें 🍬',
    },

    mithai: {
      badge: 'चरण ४ / ६ · दिवाली मिष्ठान',
      heading: 'बस बहुत हुआ... अब मिठाई का समय!! 🍬',
      subheading: '"अपनी मनपसंद मिठाई चुनिए!"',
      kajuTitle: 'काजू कतली का डब्बा 🪙',
      kajuBadge: '✨ शुद्ध चांदी का वर्क',
      kajuDesc: 'शाही काजू की स्वादिष्ट बर्फी, असली चांदी के वर्क के साथ।',
      kajuPickBtn: 'काजू कतली चुनें 😋',
      soanTitle: 'सोन पापड़ी का डब्बा 📦',
      soanBadge: '🎁 दिवाली का अमर सम्राट',
      soanDesc: 'दिवाली का सबसे प्रसिद्ध और कभी न खत्म होने वाला तोहफा!',
      soanPickBtn: 'सोन पापड़ी चुनें 🤤',
      prankTitle: 'हाहाहाहा!! सरप्राइज!! 😭',
      prankSubtitle: 'काजू कतली का सपना देखा था ना?',
      prankPunchline: 'ये लो सोन पापड़ी!! 😂',
      prankMemeText: 'क्योंकि बिना सोन पापड़ी के चक्कर के भारत में दिवाली कैसी?',
      soanChoiceTitle: 'पहले से ही आपकी पसंद पता थी! 😂',
      soanChoiceText: 'सच्चा पारखी जो अपनी किस्मत से नहीं लड़ता! नमन! 🫡',
      tryOtherBox: 'दूसरा डब्बा भी खोलकर देखना है? कोशिश कीजिए! 🔄',
      realGiftNotice: 'मज़ाक अपनी जगह... अब देखिए अपना असली तोहफा!',
      showRealGiftBtn: 'मेरा असली तोहफा दिखाएं 🎁',
      mysteryBoxBadge: '🎁 रहस्यमयी डिब्बा',
      mysteryBoxTitle: '✨ रहस्यमयी मिठाई का डिब्बा ✨',
      mysteryBoxDesc: 'रहस्यमयी मिठाई देखने के लिए ऊपर का आवरण खुरचें!',
      scratchInstruction: 'डिब्बा खोलने के लिए उंगली या माउस से खुरचें',
      openedBoxBadge: 'खोला गया डिब्बा 🎁',
      boxRevealed: 'डिब्बा खुल गया!',
      canvasDarkBox: 'पावन रहस्यमयी मिठाई',
      canvasScratchPrompt: '✨ खोलने के लिए यहाँ खुरचें ✨',
      kajuTwistLabel: '⚠️ अरे ये तो सोन पापड़ी निकली!! 😂',
      soanTwistLabel: '👑 चमत्कार! ये तो काजू कतली निकली!! ✨',
      soanPrankTitle: 'दिवाली का पावन चमत्कार!! 👑✨',
      soanPrankSubtitle: 'सोचा था सोन पापड़ी मिलेगी?',
      soanPrankPunchline: 'सरप्राइज! असली काजू कतली!! 😋',
      soanPrankMemeText: 'उत्सव के देवताओं की कृपा हुई! असली चांदी के वर्क वाली काजू कतली आपके नाम!',
    },

    gift: {
      badge: 'चरण ५ / ६ · व्यक्तिगत पारिवारिक उपहार',
      heading: 'आपका असली दिवाली तोहफा! 🎁',
      subheading: '"ढेर सारे प्यार, दुआओं और शुभकामनाओं के साथ चुना गया।"',
      tapToUnbox: 'खोलने के लिए छुएं 🎁',
      giftFor: 'दिवाली का खास तोहफा समर्पित',
      continueToLetter: 'आपके लिए एक प्यार भरा पत्र ❤️',
      closeBox: 'डब्बा बंद करें और फिर खोलें 📦',
      editGiftsBtn: 'तोहफा बदलें',
      genericGiftTitle: 'भव्य शाही दिवाली उपहार हैंपर',
      genericGiftMessage: 'यह दीपोत्सव आपके जीवन में सुख, स्वास्थ्य, समृद्धि और मुस्कान लेकर आए!',
      dodgeHints: [
        'अरे थोड़ा चूके! पकड़ें... 🏃',
        'बहुत तेज़! कोशिश जारी रखें! ✨',
        'वाह! हाथ नहीं आ रहा! 🎁',
        'बस एक बार और! पास आ गए! 🌟',
      ],
      dodgeHintLast: 'catch up!! 😆',
      dodgeHintDefault: 'उपहार छूने का प्रयास करें...',
      unboxingCelebration: 'प्यार से खोला गया!',
      genericHamperName: 'शाही दिवाली उत्सव हैंपर',
      genericHamperDesc: 'पारंपरिक दिवाली मिठाइयों, मेवों, हस्तनिर्मित माटी के दीयों और परिवार की दुआओं का भव्य उपहार संग्रह।',
    },

    letter: {
      badge: 'उत्सव का अंतिम संदेश',
      heading: 'आपके लिए एक प्यार भरा पत्र ❤️',
      subheading: '"दिल की गहराइयों से, इस पावन दीपोत्सव पर।"',
      envelopeTitle: 'दिवाली शुभकामना पत्र',
      toLabel: 'सादर प्रिय',
      openLetterBtn: 'अपना खास पत्र खोलें ✉️',
      celebrateAgainBtn: 'फिर से उत्सव मनाएं 🔄',
      shareBtn: 'अपनों के साथ शेयर करें 🪔',
      modalTitle: 'दिवाली संदेश',
      diwaliSandesh: 'शुभ दीपावली ✨',
      salutationDefault: 'प्रिय',
      p1: 'एक और दिवाली आ गई है, रोशनी, हंसी, मिठाइयों और खूबसूरत यादों की सौगात लेकर।',
      p2: 'मेरी दिल से कामना है कि यह पावन पर्व आपके जीवन को खुशियों से भर दे, मन को शांति दे और घर को पहले से भी अधिक रोशन करे।',
      p3: 'ज़िंदगी चाहे कितनी भी व्यस्त हो जाए, अपनों का साथ हमेशा ईश्वर का सबसे अनमोल और खूबसूरत तोहफा होता है।',
      p4: 'मेरी दुनिया का एक अनमोल हिस्सा बनने के लिए आपका हृदय से धन्यवाद।',
      p5: 'आपको अपार खुशियां, उत्तम स्वास्थ्य, सुख-समृद्धि और मुस्कुराने की अनगिनत वजहें मिलें।',
      closing: 'ढेर सारे प्यार और स्नेह के साथ,',
      signature: 'शुभ दीपावली! 🪔❤️',
      closeBtn: 'बंद करें',
      tabSealedLetter: 'प्राप्त स्नेह-पत्र',
      tabKeepsake: '🎨 संस्मरण कोलाज (HD)',
      tabAiLetters: '✦ जेमिनी AI पत्र रचना',
      envelopeTapAria: 'हाथ से लिखा सील किया हुआ दिवाली पत्र खोलने के लिए छुएं',
      keepsakeTitle: 'दिवाली संस्मरण कोलाज',
    },

    shareModal: {
      title: 'दिवाली उत्सव शेयर करें',
      desc: 'पूरे भारत में अपने दोस्तों और परिवार को यह डिजिटल उत्सव भेजें!',
      nameLabel: 'लिंक में नाम',
      linkLabel: 'व्यक्तिगत उत्सव लिंक:',
      shareAppBtn: 'ऐप शेयर करें 🪔',
      copyLinkBtn: 'लिंक कॉपी करें',
      copiedNotice: 'लिंक क्लिपबोर्ड पर कॉपी हो गया!',
    },

    security: {
      creatorModeTitle: 'रचनाकार अनुकूलन स्टूडियो',
      creatorModeSubtitle: 'व्यक्तिगत लिंक, टोकन और उपहार पत्र प्रबंधित करें',
      creatorModeBadge: 'रचनाकार मोड · निजी लिंक जनरेटर',
      secretVerificationTitle: 'रचनाकार सत्यापन',
      secretPlaceholder: 'रचनाकार पासवर्ड दर्ज करें...',
      verifyBtn: 'सर्वर पर सत्यापित करें',
      verifying: 'सत्यापित हो रहा है...',
      invalidSecret: 'अमान्य क्रेडेंशियल्स। पहुंच अस्वीकृत।',
      tokenRevoked: 'यह प्राप्तकर्ता लिंक रद्द कर दिया गया है।',
      tokenExpired: 'यह प्राप्तकर्ता लिंक समाप्त हो चुका है।',
      tokenCopied: 'प्राइवेट लिंक कॉपी हो गया!',
      generateTokenBtn: 'सुरक्षित टोकन बनाएं',
      revokeTokenBtn: 'लिंक रद्द करें',
      expiresInLabel: 'वैधता अवधि',
      recipientDesc: 'परिवार के सदस्यों के साथ ये गुप्त लिंक साझा करें। प्रत्येक लिंक केवल उनके विशिष्ट उपहार और पत्र को खोलता है:',
      customizeGiftsBtn: 'अनुकूलित करें',
      activeTokensLabel: 'सक्रिय निजी टोकन',
      statusActive: 'सक्रिय',
      statusRevoked: 'रद्द',
      statusExpired: 'समाप्त',
    },

    mela: {
      melaTitle: 'शुभ दिवाली मेला: खेल और आनंद!',
      melaSubtitle: 'खेलें, पहेलियां सुलझाएं और ढेर सारे दिवाली सितारे जीतें! 🎯⭐',
      backToDecor: 'सजावट पर लौटें',
      starsLabel: 'दिवाली सितारे',
      badgesLabel: 'बैज',
      activitiesProgress: 'मेला प्रगति',
      starsPerGame: 'प्रत्येक खेल पूरा करने पर +२५ सितारे',
      allBadgesTitle: 'अर्जित मेला बैज',
      earnedBadges: 'प्राप्त बैज',
      noBadgesYet: 'अभी तक कोई मेला बैज अर्जित नहीं हुआ है। खेल खेलकर बैज अनलॉक करें!',
      playMelaBtn: 'इको-दिवाली मेला खेलें',
    },

    audioCredits: {
      title: 'ध्वनि आभार एवं लाइसेंस',
      subtitle: 'भारतीय लोक संगीतकारों, अनुष्ठान रिकॉर्डिस्ट और ओपन-ऑडियो रचनाकारों का ससम्मान आभार जिन्होंने इस उत्सव को जीवंत बनाया।',
      verified: 'प्रमाणित',
      optimizationTitle: 'गति एवं बैंडविड्थ अनुकूलन (88% आकार में कमी)',
      optimizationDesc: 'सभी सामुदायिक ऑडियो रिकॉर्डिंग्स को आधुनिक 128kbps स्टीरियो प्रारूप में संकुचित किया गया है और केवल आवश्यकता पड़ने पर ही लोड किया जाता है (ऑन-डिमांड लेज़ी लोडिंग), जिससे प्रारंभिक डेटा उपयोग 44 MB से घटकर केवल 5.3 MB रह गया है।',
      copyCitations: 'प्रशंसा उद्धरण कॉपी करें',
      copiedCitations: 'सभी आभार कॉपी हो गए!',
      stopBtn: 'रोकें',
      previewBtn: 'ध्वनि सुनें',
      closeBtn: 'बंद करें',
    },
  },

  bn: {
    appTitle: 'শুভ দীপাবলি',
    share: 'শেয়ার করুন 🪔',
    copied: 'লিঙ্ক কপি হয়েছে!',
    musicOn: 'উৎসবের গান বাজান',
    musicOff: 'মিউট করুন',
    editGifts: 'উপহার ও চিঠি সম্পাদনা',
    audioCreditsBtn: 'অডিও ঋণস্বীকার ও লাইসেন্স',

    regional: {
      celebrateMyRegional: 'আমার {region}-এর দীপাবলি উদযাপন করুন 🪔',
      exploreOtherTraditions: 'ভারতের অন্যান্য দীপাবলি ঐতিহ্য দেখুন 🇮🇳',
      whyWeCelebrate: 'কেন এটি পালিত হয়',
      traditionalDecor: 'ঐতিহ্যবাহী গৃহসজ্জা',
      traditionalDiyas: 'পবিত্র প্রদীপ ও জ্যোতি',
      festiveTreats: 'আঞ্চলিক উৎসবের মিষ্টান্ন',
      keyTraditionsLabel: 'গুরুত্বপূর্ণ আঞ্চলিক ঐতিহ্যসমূহ',
      switchToThisState: 'এই রাজ্যের ঐতিহ্যে উদযাপন করুন',
      currentlyCelebrating: 'বর্তমানে উদযাপিত',
      exploreIndiaTitle: 'ভারতের বৈচিত্র্যময় দীপাবলি ঐতিহ্য',
      exploreIndiaSubtitle: '২৮টি রাজ্য ও ৮টি কেন্দ্রশাসিত অঞ্চল · আলোর এক মহাউৎসব',
      searchPlaceholder: 'রাজ্য, উৎসব বা ঐতিহ্য খুঁজুন...',
      closeExplorer: 'মূল উৎসবে ফিরুন',
      oneIndiaBanner: 'ভিন্ন ঐতিহ্য, ভিন্ন গল্প—কিন্তু আলোর উৎসব একসঙ্গেই উদযাপন করে অখণ্ড ভারত।',
      celebrateNow: 'এই ঐতিহ্য নিয়ে উদযাপন করুন 🪔',
      experienceTraditionsTitle: 'আমার ঐতিহ্যের জীবন্ত অনুভব',
      experienceTraditionsQuote: 'কিছু ঐতিহ্য শুধু পালন করা হয় না। তা হৃদয়ে অনুভূত হয়, স্মৃতিতে চিরভাস্বর থাকে এবং প্রজন্ম থেকে প্রজন্মে ছড়িয়ে যায়।',
      experienceTraditionsSub: 'নিজের ঘরের চেনা অনুভূতি, সুর আর পবিত্র রীতিতে একাত্ম হয়ে উঠুন।',
      experienceTraditionBtn: 'এই ঐতিহ্যের অনুভব নিন',
      whyWeCelebrateSection: 'কেন আমরা এটি পালন করি',
      whatIsTradition: 'এই ঐতিহ্যটি ঠিক কী',
      whyFollowed: 'কেন এটি পালন করা হয়',
      culturalSignificance: 'সাংস্কৃতিক ও আত্মিক তাৎপর্য',
      regionalAssociation: 'আঞ্চলিক বৈশিষ্ট্যের মেলবন্ধন',
      traditionCompleted: 'শ্রদ্ধা ও ভালোবাসার সাথে উদযাপিত ✨',
      exploreMoreActivities: 'ভারতের অন্যান্য রাজ্যের ঐতিহ্যও দেখুন',
      shankhSoundBtn: 'পবিত্র শাঁখের ধ্বনি 🐚',
      dhakSoundBtn: 'পূজোর আনন্দময় ঢাক 🥁',
      templeBellBtn: 'মন্দিরের কাঁসর-ঘণ্টা 🔔',
      interactiveBadge: 'ইন্টারেক্টিভ রিচুয়াল',
      culturalLoreBadge: 'সাংস্কৃতিক ঐতিহ্য',
      traditionsCount: '{count}টি ঐতিহ্য',
      culturalMeaningTitle: 'সাংস্কৃতিক তাৎপর্য ও আত্মিক মহিমা',
      howObservedTitle: 'ঐতিহ্যগতভাবে কীভাবে পালিত হয়',
      calendarTimingTitle: 'পবিত্র তিথি ও দিনক্ষণ',
      communityDiversityTitle: 'আঞ্চলিক ও সম্প্রদায়গত বৈচিত্র্য',
      verifiedSourceLabel: 'প্রমাণিত সাংস্কৃতিক তথ্যসূত্র:',
      officialPortalBtn: 'অফিসিয়াল পোর্টাল',
      allRegionsTab: 'সমস্ত অঞ্চল',
      interactiveTab: 'ইন্টারেক্টিভ অভিজ্ঞতা',
      heritageTab: 'সাংস্কৃতিক ঐতিহ্য',
      panIndiaIdentity: 'সর্বভারতীয় সার্বজনীন রূপ',
      noRegionsFound: 'কোনও রাজ্য বা অঞ্চল পাওয়া যায়নি।',
      searchTip: 'রাজ্যের নাম বা উৎসব দিয়ে সন্ধান করুন!',
      sourceLabel: 'উৎস:',
      verifiedReference: 'তথ্যসূত্র',
    },

    nav: {
      welcome: 'স্বাগত',
      decorate: 'ঘর সাজানো',
      diya: 'প্রদীপ জ্বালানো',
      fireworks: 'আতশবাজি',
      mithai: 'মিষ্টি মুখ',
      gift: 'দীপাবলি উপহার',
      letter: 'হৃদয়ছোঁয়া চিঠি',
    },

    welcome: {
      badge: 'শুভ দীপাবলি ২০২৬ 🪔',
      heading: 'এক ভারত। বহু দীপাবলি। এক সুন্দর উদযাপন।',
      emotionalHeading: 'এক ভারত। বহু দীপাবলি। এক সুন্দর উদযাপন।',
      subheading: 'একটু আলো, একটু হাসি আর অনেক ভালোবাসা।',
      oneLineText: 'একটি প্রদীপ জ্বালান। হাসি ভাগ করে নিন। ভালোবাসা অনুভব করুন।',
      supportingText: 'প্রতিটি ঘরেরই নিজস্ব একটি দীপাবলির গল্প থাকে। বলুন আপনারটি কোথা থেকে শুরু, এবং আসুন উদযাপন করি সেই ঐতিহ্য যা আপনার বাড়িকে বিশেষ করে তুলেছে।',
      emotionalSupportingText: 'প্রতিটি ঘরেরই নিজস্ব একটি দীপাবলির গল্প থাকে। বলুন আপনারটি কোথা থেকে শুরু, এবং আসুন উদযাপন করি সেই ঐতিহ্য যা আপনার বাড়িকে বিশেষ করে তুলেছে।',
      question: 'আপনার দীপাবলির গল্প কোথা থেকে শুরু হচ্ছে?',
      nameLabel: 'আপনার নাম',
      namePlaceholder: 'আপনার নাম লিখুন (যেমন লক্ষ্মী, রোহন, প্রিয়া...)',
      quickPickLabel: 'অথবা বেছে নিন কার সাথে উদযাপন করছেন:',
      stateLabel: 'আপনি কোথা থেকে দীপাবলি উদযাপন করছেন?',
      statePlaceholder: 'আপনার ভারতীয় রাজ্য বা কেন্দ্রশাসিত অঞ্চল নির্বাচন করুন',
      stateSearchPlaceholder: '২৮টি রাজ্য ও ৮টি কেন্দ্রশাসিত অঞ্চল খুঁজুন...',
      stateSearchEmpty: 'কোনো রাজ্য বা কেন্দ্রশাসিত অঞ্চল পাওয়া যায়নি',
      cityLabel: 'আপনার শহর (ঐচ্ছিক)',
      cityPlaceholder: 'যেমন কলকাতা, বেঙ্গালুরু, মুম্বাই, চেন্নাই, গুয়াহাটি',
      statesCategory: '২৮টি ভারতীয় রাজ্য',
      utCategory: '৮টি কেন্দ্রশাসিত অঞ্চল',
      welcomeModalTitle: 'ঘরে স্বাগতম, {name}! ❤️',
      welcomeModalStory: 'আপনার দীপাবলির গল্প শুরু হচ্ছে {location} থেকে।',
      welcomeModalBlessing: 'আসুন উদযাপন করি সেই সুন্দর ঐতিহ্য যা আপনার বাড়িকে অনন্য করে তুলেছে।',
      stepInsideButton: 'আপনার ঘরের উৎসবে প্রবেশ করুন 🪔',
      changeDetails: 'বিবরণ পরিবর্তন করুন',
      validationName: 'অনুগ্রহ করে আপনার নাম লিখুন বা একটি বিকল্প বাছুন',
      validationState: 'অনুগ্রহ করে বেছে নিন আপনি কোথা থেকে উদযাপন করছেন',
      allIndiaCelebration: 'সর্বভারতীয় উদযাপন',
      chips: {
        family: 'পরিবার',
        friends: 'বন্ধুরা',
        maa: 'মা',
        papa: 'বাবা',
        brother: 'ভাই',
        sister: 'বোন',
        bestie: 'বেস্টি',
        someoneSpecial: 'বিশেষ কেউ',
      },
      preview: {
        decorate: 'ঘর সাজান',
        diya: 'প্রদীপ জ্বালান',
        fireworks: 'আতশবাজি দেখুন',
        surprise: 'উপহার আবিষ্কার করুন',
      },
      enterButton: 'আপনার দীপাবলির গল্প শুরু করুন 🪔',
      guestText: 'অথবা নাম ও রাজ্য না লিখে সরাসরি এগিয়ে যান ✨',
      welcomeFeedback: 'স্বাগতম! দীপাবলি উদযাপনে আপনাকে আন্তরিক স্বাগত ✨',
      touchHint: 'আলো ছড়াতে স্পর্শ করুন',
      panIndiaCelebrationTitle: 'সর্বভারতীয় সার্বজনীন মহোৎসব',
      panIndiaCelebrationDesc: 'ভারতের ২৮টি রাজ্য ও ৮টি কেন্দ্রশাসিত অঞ্চলের আলোকোজ্জ্বল সংস্কৃতি ও মধুর ঐতিহ্যের এক মহা মিলনমেলা।',
      relationLabel: 'প্রেরকের সাথে আপনার সম্পর্ক',
      relationHint: 'উপহার ও চিঠি এর অনুযায়ী তৈরি হবে',
      nameInputPlaceholder: 'আপনার নাম লিখুন (যেমন লক্ষ্মী, রোহন, প্রিয়া...)',
      cityMismatchWarning: '"{city}" {state}-এ অবস্থিত।',
      selectDetectedState: '{state} নির্বাচন করুন',
      clearCity: 'শহর মুছুন',
      popularCitiesLabel: 'জনপ্রিয় শহর:',
      directGreetingBtn: 'সরাসরি দীপাবলি শুভেচ্ছা কার্ড তৈরি ও শেয়ার করুন ✨',
      stateCategoryBadge: '২৮ রাজ্য • ৮ কেন্দ্রশাসিত অঞ্চল',
      stateSearchEmptyTip: 'পরামর্শ: কলকাতা, বেঙ্গালুরু, মুম্বাইয়ের মতো শহর এখানে বা শহরের ঘরে লিখতে পারেন!',
      interactiveBadge: 'ইন্টারেক্টিভ',
      utBadge: 'কেন্দ্রশাসিত অঞ্চল',
      stateBadge: 'রাজ্য',
      optionalLabel: 'ঐচ্ছিক',
    },

    decorate: {
      stageBadge: 'গৃহ সাজসজ্জা',
      heading: 'আসুন আমাদের ঘর সাজাই!',
      hintInitial: 'ঘর আলোকিত করতে ছাদ, দরজা এবং মেঝেতে স্পর্শ করুন।',
      hintProgress: 'আপনার ঘর আরও সুন্দর হয়ে উঠছে! ✨ আরও আলো যোগ করুন।',
      hintComplete: 'ওহো!! দেখুন দীপাবলীর জন্য কে তৈরি!! 🪔✨',
      lights: 'টুনটুনি আলো',
      lightsDesc: 'ছাদ ও ঝুলবারান্দায়',
      toran: 'গাঁদা ফুলের তোরণ',
      toranDesc: 'দরজার শুভ মঙ্গল সূচনা',
      rangoli: 'রঙিন আলপনা',
      rangoliDesc: 'উঠোনে রঙিন শিল্প',
      diyas: 'পিতলের প্রদীপ',
      diyasDesc: 'সিঁড়িতে সাজানো',
      decorateAll: 'সব সাজান',
      reset: 'রিসেট',
      skip: 'সরাসরি প্রদীপ জ্বালান ⏭️',
      lightDiyaButton: 'প্রদীপ জ্বালান 🪔',
      decorBoxTitle: 'সাজসজ্জা বাক্স',
      decorBoxSubtitle: 'আপনার বাড়ি সাজাতে সামগ্রী নির্বাচন করুন',
      placed: 'সাজানো',
      lit: 'জ্বলছে',
      pick: 'সাজান',
      calibrate: 'স্থান সমন্বয়',
      exitCalibrate: 'বন্ধ করুন',
      funGamesBtn: 'মজার খেলা >',
      nextSkyFireworks: 'আকাশে আতশবাজি',
    },

    diya: {
      badge: 'পবিত্র দীপাবলি জ্যোতি',
      introQuote: '"প্রতিটি উদযাপনের সূচনা হয় একটি ছোট্ট আলো দিয়ে..."',
      tapInstruction: 'প্রদীপ জ্বালাতে স্পর্শ করুন 🪔',
      tapHereBadge: '👉 জ্বালাতে এখানে স্পর্শ করুন',
      greetingGreeting: 'আরে বাহ',
      lightingDiyaText: 'আপনি প্রদীপ জ্বালিয়েছেন!! 🪔',
      blessingText: 'এই পবিত্র আলো আপনার জীবন ও ঘরকে সুখ, শান্তি, ভালোবাসা আর অজস্র সুন্দর স্মৃতিতে ভরিয়ে তুলুক।',
      celebrateButton: 'আসুন উদযাপন করি! 🎉',
      nextHint: 'পরবর্তী: রাতের আকাশে জমকালো ডিজিটাল আতশবাজি!',
      tapToLightAria: 'মাটির প্রদীপ (জ্বালাতে স্পর্শ করুন)',
      litDiyaAria: 'মাটির প্রদীপ (প্রজ্বলিত)',
    },

    fireworks: {
      bannerBadge: 'click anywhere to enjoy sky fireworks',
      heading: 'আকাশের দিকে তাকান',
      subheading: '"পুরো আকাশ আপনার সাথে উৎসব করছে!"',
      instruction: 'click anywhere to enjoy sky fireworks',
      oneMoreBtn: 'আরও একটি বাজি! 🎆',
      continueMithaiBtn: 'মিষ্টির দিকে যাই 🍬',
    },

    mithai: {
      badge: 'পর্ব ৪ / ৬ · উৎসবের মিষ্টি মুখ',
      heading: 'অনেক হলো... এবার মিষ্টির পালা!! 🍬',
      subheading: '"আপনার প্রিয় মিষ্টি বেছে নিন!"',
      kajuTitle: 'কাজু বরফির বাক্স 🪙',
      kajuBadge: '✨ খাঁটি রূপার তবক',
      kajuDesc: 'খাঁটি কাজুর রাজকীয় মিষ্টি, খাঁটি রূপার তবকে মোড়া।',
      kajuPickBtn: 'কাজু বরফি নিন 😋',
      soanTitle: 'সোন পাপড়ির বাক্স 📦',
      soanBadge: '🎁 দীপাবলির অমর কিংবদন্তি',
      soanDesc: 'দীপাবলির উপহারের অবিসংবাদিত রাজা। মুচমুচে ও চিরন্তন মিষ্টি!',
      soanPickBtn: 'সোন পাপড়ি নিন 🤤',
      prankTitle: 'হাহাহা!! সারপ্রাইজ!! 😭',
      prankSubtitle: 'কাজু বরফির স্বপ্ন দেখেছিলেন তো?',
      prankPunchline: 'এই নিন সোন পাপড়ি!! 😂',
      prankMemeText: 'কারণ সোন পাপড়ির আবর্তন ছাড়া ভারতে দীপাবলি অসম্পূর্ণ!',
      soanChoiceTitle: 'আগেই জানতাম আপনার পছন্দ! 😂',
      soanChoiceText: 'একজন প্রকৃত রসিক যিনি নিজের ভাগ্যকে হাসিমুখে মেনে নেন! 🫡',
      tryOtherBox: 'অন্য বাক্সটিও খুলতে চান? চেষ্টা করে দেখুন! 🔄',
      realGiftNotice: 'মজার কথা বাদ দিয়ে... এই নিন আপনার আসল উপহার!',
      showRealGiftBtn: 'আমার উপহার দেখান 🎁',
      mysteryBoxBadge: '🎁 রহস্য বাক্স',
      mysteryBoxTitle: '✨ রহস্যময় মিষ্টির বাক্স ✨',
      mysteryBoxDesc: 'ভেতরের মিষ্টি দেখতে ওপরের আবরণটি ঘষুন!',
      scratchInstruction: 'বাক্স উন্মোচন করতে আঙুল বা মাউস দিয়ে ঘষুন',
      openedBoxBadge: 'খোলা বাক্স 🎁',
      boxRevealed: 'বাক্স উন্মোচিত!',
      canvasDarkBox: 'রহস্যময় মিষ্টির বাক্স',
      canvasScratchPrompt: '✨ উন্মোচনের জন্য ঘষুন ✨',
      kajuTwistLabel: '⚠️ আরে এটা তো সোন পাপড়ি!! 😂',
      soanTwistLabel: '👑 চমৎকার! এটা তো কাজু বরফি!! ✨',
      soanPrankTitle: 'দীপাবলির মধুর অলৌকিক আনন্দ!! 👑✨',
      soanPrankSubtitle: 'ভেবেছিলেন সোন পাপড়ি পাবেন?',
      soanPrankPunchline: 'সারপ্রাইজ! খাঁটি কাজু বরফি!! 😋',
      soanPrankMemeText: 'উৎসবের আশীর্বাদ বর্ষিত হয়েছে! খাঁটি রূপার তবকে সাজানো রাজকীয় কাজু বরফি!',
    },

    gift: {
      badge: 'পর্ব ৫ / ৬ · ব্যক্তিগত পারিবারিক উপহার',
      heading: 'আপনার আসল দীপাবলি উপহার! 🎁',
      subheading: '"ভালোবাসা, আশীর্বাদ ও শুভেচ্ছায় সাজানো।"',
      tapToUnbox: 'উপহার খুলতে স্পর্শ করুন 🎁',
      giftFor: 'বিশেষ দীপাবলি উপহার নিবেদন',
      continueToLetter: 'আপনার জন্য একটি চিঠি ❤️',
      closeBox: 'বাক্স বন্ধ করে আবার খুলুন 📦',
      editGiftsBtn: 'উপহার পরিবর্তন',
      genericGiftTitle: 'রাজকীয় দীপাবলি উপহার হ্যাম্পার',
      genericGiftMessage: 'এই আলোর উৎসব আপনার জীবনে শান্তি, সমৃদ্ধি ও অনাবিল আনন্দ বয়ে আনুক!',
      dodgeHints: [
        'একটুর জন্য মিস! 🏃',
        'দারুণ দ্রুত! চেষ্টা চালিয়ে যান! ✨',
        'ছুঁতে পারলেন না! 🎁',
        'আর একটা চেষ্টা! প্রায় ছুঁয়ে ফেলেছেন! 🌟',
      ],
      dodgeHintLast: 'catch up!! 😆',
      dodgeHintDefault: 'উপহারটি স্পর্শ করার চেষ্টা করুন...',
      unboxingCelebration: 'ভালোবাসায় উন্মোচিত!',
      genericHamperName: 'রাজকীয় দীপাবলি উপহার হ্যাম্পার',
      genericHamperDesc: 'ঐতিহ্যবাহী মিষ্টান্ন, কাজু-কিশমিশ, হস্তনির্মিত মাটির প্রদীপ ও পারিবারিক শুভাশিসের রাজকীয় সম্ভার।',
    },

    letter: {
      badge: 'উদযাপনের অন্তিম বার্তা',
      heading: 'আপনার জন্য একটি বিশেষ চিঠি ❤️',
      subheading: '"হৃদয়ের গভীর থেকে, এই দীপাবলির শুভেচ্ছা।"',
      envelopeTitle: 'দীপাবলি শুভেচ্ছাপত্র',
      toLabel: 'স্নেহের / শ্রদ্ধার',
      openLetterBtn: 'আপনার বিশেষ চিঠিটি খুলুন ✉️',
      celebrateAgainBtn: 'আবার উদযাপন করুন 🔄',
      shareBtn: 'সবার সাথে শেয়ার করুন 🪔',
      modalTitle: 'দীপাবলি বার্তা',
      diwaliSandesh: 'শুভ দীপাবলি ✨',
      salutationDefault: 'প্রিয়',
      p1: 'আলো, হাসি, মিষ্টি আর সুন্দর স্মৃতির ডালি নিয়ে আবার এলো দীপাবলি।',
      p2: 'কামনা করি এই উৎসব আপনার জীবনকে আনন্দে ভরিয়ে তুলুক, মনে শান্তি এনে দিক এবং ঘরকে আগের চেয়েও বেশি আলোকিত করুক।',
      p3: 'জীবন যতই ব্যস্ত হোক না কেন, প্রিয়জনদের সান্নিধ্য সবসময়ই আমাদের জীবনের সবচেয়ে সুন্দর উপহার।',
      p4: 'আমার জীবনের একটি মূল্যবান অংশ হওয়ার জন্য আপনাকে ধন্যবাদ।',
      p5: 'আপনার জীবনে অনাবিল সুখ, সুস্বাস্থ্য, সমৃদ্ধি এবং হাসির অগণিত উপলক্ষ আসুক।',
      closing: 'অনেক ভালোবাসা ও শুভেচ্ছার সাথে,',
      signature: 'শুভ দীপাবলি! 🪔❤️',
      closeBtn: 'বন্ধ করুন',
      tabSealedLetter: 'পাওয়া স্নেহপত্র',
      tabKeepsake: '🎨 দীপাবলি স্মারক (HD)',
      tabAiLetters: '✦ জেমিনি AI শুভেচ্ছা',
      envelopeTapAria: 'হাতে লেখা সিল করা দীপাবলি চিঠি খুলতে স্পর্শ করুন',
      keepsakeTitle: 'দীপাবলি স্মারক কোলাজ',
    },

    shareModal: {
      title: 'দীপাবলি উদযাপন শেয়ার করুন',
      desc: 'সারা ভারতের বন্ধু এবং পরিবারের কাছে এই ডিজিটাল আনন্দ পৌঁছে দিন!',
      nameLabel: 'লিঙ্কে নাম',
      linkLabel: 'ব্যক্তিগত উৎসব লিঙ্ক:',
      shareAppBtn: 'শেয়ার করুন 🪔',
      copyLinkBtn: 'লিঙ্ক কপি করুন',
      copiedNotice: 'লিঙ্ক ক্লিপবোর্ডে কপি হয়েছে!',
    },

    security: {
      creatorModeTitle: 'ক্রিয়েটর কাস্টমাইজেশন স্টুডিও',
      creatorModeSubtitle: 'ব্যক্তিগত লিঙ্ক, টোকেন ও চিঠিপত্র পরিচালনা করুন',
      creatorModeBadge: 'ক্রিয়েটর মোড · প্রাইভেট লিঙ্ক জেনারেটর',
      secretVerificationTitle: 'ক্রিয়েটর যাচাইকরণ',
      secretPlaceholder: 'ক্রিয়েটরের পাসওয়ার্ড লিখুন...',
      verifyBtn: 'সার্ভারে যাচাই করুন',
      verifying: 'যাচাই হচ্ছে...',
      invalidSecret: 'ভুল পাসওয়ার্ড। প্রবেশাধিকার প্রত্যাখ্যাত।',
      tokenRevoked: 'এই প্রাপক লিঙ্কটি বাতিল করা হয়েছে।',
      tokenExpired: 'এই প্রাপক লিঙ্কটির মেয়াদ শেষ হয়েছে।',
      tokenCopied: 'প্রাইভেট লিঙ্ক কপি হয়েছে!',
      generateTokenBtn: 'নতুন সুরক্ষিত টোকেন তৈরি করুন',
      revokeTokenBtn: 'লিঙ্ক বাতিল করুন',
      expiresInLabel: 'মেয়াদকাল',
      recipientDesc: 'পরিবারের সদস্যদের জন্য এই গোপন সুরক্ষিত লিঙ্কটি কপি করুন। প্রতিটি লিঙ্ক কেবল তাঁদের নিজস্ব উপহার ও চিঠি উন্মুক্ত করবে:',
      customizeGiftsBtn: 'কাস্টমাইজ',
      activeTokensLabel: 'সক্রিয় ব্যক্তিগত টোকেন',
      statusActive: 'সক্রিয়',
      statusRevoked: 'বাতিল',
      statusExpired: 'মেয়াদোত্তীর্ণ',
    },

    mela: {
      melaTitle: 'শুভ দীপাবলি মেলা: আনন্দ ও খেলাধূলা!',
      melaSubtitle: 'স্বাগতম! আনন্দময় খেলা খেলুন ও দীপাবলি তারা জিতে নিন! 🎯⭐',
      backToDecor: 'ফিরে যান',
      starsLabel: 'দীপাবলি তারা',
      badgesLabel: 'ব্যাজ',
      activitiesProgress: 'মেলা অগ্রগতি',
      starsPerGame: 'প্রতিটি খেলা সম্পন্ন করলে +২৫ তারা',
      allBadgesTitle: 'আপনার অর্জিত মেলা ব্যাজ',
      earnedBadges: 'প্রাপ্ত ব্যাজ',
      noBadgesYet: 'এখনও কোনও মেলা ব্যাজ অর্জিত হয়নি। খেলায় অংশ নিয়ে ব্যাজ জয় করুন!',
      playMelaBtn: 'মেলায় অংশ নিন',
    },

    audioCredits: {
      title: 'অডিও ঋণস্বীকার ও লাইসেন্স',
      subtitle: 'আমাদের আন্তরিক কৃতজ্ঞতা সেই সকল লোকসংগীত শিল্পী, ভক্তিমূলক বাদক ও মুক্ত-অডিও নির্মাতাদের প্রতি যাঁদের সুরে এই উৎসব প্রাণবন্ত।',
      verified: 'যাচাইকৃত',
      optimizationTitle: 'দ্রুত লোডিং ও ব্যান্ডউইথ অপটিমাইজেশন (৮৮% সাইজ হ্রাস)',
      optimizationDesc: 'সকল অডিও ফাইল ১২৮ kbps হাই-কোয়ালিটিতে কম্প্রেস করা হয়েছে এবং ব্যবহারকারীর অনুরোধ অনুযায়ী অন-ডিমান্ড লেজি-লোড করা হয়। প্রাথমিক লোড সাইজ ৪৪ MB থেকে কমে মাত্র ৫.৩ MB হয়েছে।',
      copyCitations: 'তথ্যসূত্র কপি করুন',
      copiedCitations: 'সব তথ্যসূত্র কপি হয়েছে!',
      stopBtn: 'থামান',
      previewBtn: 'অডিও শুনুন',
      closeBtn: 'বন্ধ করুন',
    },
  },
};
