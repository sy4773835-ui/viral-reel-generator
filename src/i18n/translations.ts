export type Lang = 'hi' | 'en';

export interface Translation {
  nav: {
    brand: string;
    tagline: string;
    features: string;
    howItWorks: string;
    faq: string;
    cta: string;
  };
  langSwitch: {
    hi: string;
    en: string;
    label: string;
  };
  hero: {
    badge: string;
    titleLead: string;
    titleHighlight: string;
    titleTrail: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: { value: string; label: string }[];
  };
  generator: {
    badge: string;
    title: string;
    subtitle: string;
    ideaLabel: string;
    ideaPlaceholder: string;
    ideaHint: string;
    durationLabel: string;
    toneLabel: string;
    toneOptions: { value: string; label: string }[];
    generateBtn: string;
    generating: string;
    generatingHint: string;
    examplesLabel: string;
    examples: string[];
    charCount: (n: number, max: number) => string;
    errors: {
      empty: string;
      tooShort: string;
    };
  };
  output: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    copy: string;
    copied: string;
    regenerate: string;
    download: string;
    duration: string;
    tone: string;
    scenes: string;
    hookLabel: string;
    scriptLabel: string;
    ctaLabel: string;
    hashtagsLabel: string;
    captionLabel: string;
    sceneOf: (i: number, total: number) => string;
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    items: { icon: string; title: string; desc: string }[];
  };
  how: {
    badge: string;
    title: string;
    subtitle: string;
    steps: { title: string; desc: string }[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  footer: {
    brand: string;
    desc: string;
    rights: string;
    madeWith: string;
    links: { label: string }[];
  };
  dir: 'ltr' | 'rtl';
}

const en: Translation = {
  nav: {
    brand: 'ReelGenie',
    tagline: 'AI Reel Generator',
    features: 'Features',
    howItWorks: 'How it works',
    faq: 'FAQ',
    cta: 'Start creating',
  },
  langSwitch: { hi: 'हिंदी', en: 'English', label: 'Language' },
  hero: {
    badge: 'Powered by AI',
    titleLead: 'Create viral reels',
    titleHighlight: 'in seconds',
    titleTrail: 'not hours',
    subtitle:
      'Turn a one-line idea into a ready-to-shoot reel script — hook, scenes, caption, and hashtags included. Built for creators who move fast.',
    primaryCta: 'Generate a reel script',
    secondaryCta: 'See how it works',
    stats: [
      { value: '30s', label: 'Average draft time' },
      { value: '4.9★', label: 'Creator rating' },
      { value: '50k+', label: 'Scripts generated' },
    ],
  },
  generator: {
    badge: 'The generator',
    title: 'Describe your reel idea',
    subtitle: 'Type what your reel is about. Pick a vibe. Get a full script.',
    ideaLabel: 'Your reel idea',
    ideaPlaceholder: 'e.g. A 30-second reel showing a 5-minute morning skincare routine for glowing skin',
    ideaHint: 'Tip: include the topic, length, and who it’s for.',
    durationLabel: 'Reel length',
    toneLabel: 'Vibe',
    toneOptions: [
      { value: 'energetic', label: 'Energetic & trendy' },
      { value: 'educational', label: 'Educational & clear' },
      { value: 'emotional', label: 'Emotional & heartfelt' },
      { value: 'funny', label: 'Funny & relatable' },
      { value: 'luxury', label: 'Luxury & aesthetic' },
      { value: 'inspirational', label: 'Inspirational' },
    ],
    generateBtn: 'Generate AI script',
    generating: 'Writing your script',
    generatingHint: 'Crafting hooks, scenes, and hashtags…',
    examplesLabel: 'Need inspiration? Try one:',
    examples: [
      'A 30-second reel about a quick morning workout at home',
      'A street food review of a spicy paneer tikka stall',
      'A day in the life of a college student in Delhi',
      'A travel reel of hidden cafes in Manali',
      'A productivity hack to finish homework in 1 hour',
    ],
    charCount: (n, max) => `${n} / ${max}`,
    errors: {
      empty: 'Please describe your reel idea first.',
      tooShort: 'Add a little more detail so the script is on point (min 10 characters).',
    },
  },
  output: {
    title: 'Your reel script',
    emptyTitle: 'Your script will appear here',
    emptyDesc: 'Describe your idea above and hit generate to see a complete reel script with hook, scenes, caption, and hashtags.',
    copy: 'Copy script',
    copied: 'Copied!',
    regenerate: 'Regenerate',
    download: 'Download',
    duration: 'Length',
    tone: 'Vibe',
    scenes: 'Scenes',
    hookLabel: 'Hook',
    scriptLabel: 'Scene-by-scene script',
    ctaLabel: 'Call to action',
    hashtagsLabel: 'Hashtags',
    captionLabel: 'Caption',
    sceneOf: (i, total) => `Scene ${i} of ${total}`,
  },
  features: {
    badge: 'Why creators love it',
    title: 'Everything you need for a scroll-stopping reel',
    subtitle: 'No more staring at a blank screen. ReelGenie gives you a structured script in seconds.',
    items: [
      { icon: 'Sparkles', title: 'AI-generated hooks', desc: 'A scroll-stopping opening line tuned to your topic and vibe.' },
      { icon: 'Clapperboard', title: 'Scene-by-scene script', desc: 'Visual cues, dialogue, and on-screen text broken down scene by scene.' },
      { icon: 'Hash', title: 'Smart hashtags', desc: 'Trending, relevant hashtags to boost your reach automatically.' },
      { icon: 'Languages', title: 'Hindi & English', desc: 'Switch the entire app — and your script — between Hindi and English.' },
      { icon: 'Clock', title: 'Built for speed', desc: 'From idea to ready-to-shoot script in under a minute.' },
      { icon: 'Download', title: 'Copy & download', desc: 'One click to copy the whole script or download it as a file.' },
    ],
  },
  how: {
    badge: 'How it works',
    title: 'From idea to script in three steps',
    subtitle: 'No sign-up, no learning curve. Just type and generate.',
    steps: [
      { title: 'Describe your idea', desc: 'Write a one-line description of the reel you want to create.' },
      { title: 'Pick your vibe', desc: 'Choose the tone — energetic, educational, emotional, or more.' },
      { title: 'Get your script', desc: 'Instantly receive a full script with hook, scenes, caption, and hashtags.' },
    ],
  },
  faq: {
    badge: 'FAQ',
    title: 'Questions, answered',
    subtitle: 'Everything you might want to know before you start.',
    items: [
      { q: 'Do I need to sign up?', a: 'No. You can generate scripts instantly without any account or login.' },
      { q: 'Is it really free?', a: 'Yes. ReelGenie is completely free to use for generating reel scripts.' },
      { q: 'Can I get scripts in Hindi?', a: 'Absolutely. Switch the language toggle and your script will be generated in Hindi.' },
      { q: 'How long should my idea be?', a: 'One or two sentences are plenty. Include the topic, length, and audience for best results.' },
      { q: 'Can I reuse the scripts?', a: 'Yes. Copy or download any generated script and use it however you like.' },
    ],
  },
  footer: {
    brand: 'ReelGenie',
    desc: 'AI-powered reel scripts for creators who move fast.',
    rights: 'All rights reserved.',
    madeWith: 'Made with love for creators',
    links: [
      { label: 'Features' },
      { label: 'How it works' },
      { label: 'FAQ' },
    ],
  },
  dir: 'ltr',
};

const hi: Translation = {
  nav: {
    brand: 'रीलजीनी',
    tagline: 'एआई रील जनरेटर',
    features: 'फ़ीचर्स',
    howItWorks: 'कैसे काम करता है',
    faq: 'सवाल-जवाब',
    cta: 'बनाना शुरू करें',
  },
  langSwitch: { hi: 'हिंदी', en: 'English', label: 'भाषा' },
  hero: {
    badge: 'एआई से संचालित',
    titleLead: 'वायरल रील बनाएं',
    titleHighlight: 'सेकंडों में',
    titleTrail: 'घंटों में नहीं',
    subtitle:
      'एक लाइन के आईडिया को तैयार-टू-शूट रील स्क्रिप्ट में बदलें — हुक, सीन, कैप्शन और हैशटैग सब कुछ। तेज़ चलने वाले क्रिएटर्स के लिए बना।',
    primaryCta: 'रील स्क्रिप्ट बनाएं',
    secondaryCta: 'देखें कैसे काम करता है',
    stats: [
      { value: '30 सेकंड', label: 'औसत ड्राफ्ट समय' },
      { value: '4.9★', label: 'क्रिएटर रेटिंग' },
      { value: '50 हज़ार+', label: 'स्क्रिप्ट बनीं' },
    ],
  },
  generator: {
    badge: 'जनरेटर',
    title: 'अपना रील आईडिया बताएं',
    subtitle: 'लिखें आपकी रील किस बारे में है। वाइब चुनें। पूरी स्क्रिप्ट पाएं।',
    ideaLabel: 'आपका रील आईडिया',
    ideaPlaceholder: 'जैसे — चमकती त्वचा के लिए 5 मिनट की सुबह की स्किनकेयर रूटीन दिखाने वाली 30 सेकंड की रील',
    ideaHint: 'सुझाव: विषय, लंबाई और दर्शक शामिल करें।',
    durationLabel: 'रील की लंबाई',
    toneLabel: 'वाइब',
    toneOptions: [
      { value: 'energetic', label: 'ऊर्जावान और ट्रेंडी' },
      { value: 'educational', label: 'शिक्षाप्रद और स्पष्ट' },
      { value: 'emotional', label: 'भावुक और दिल से' },
      { value: 'funny', label: 'मज़ाकिया और रिलेटेबल' },
      { value: 'luxury', label: 'लग्ज़री और एस्थेटिक' },
      { value: 'inspirational', label: 'प्रेरणादायक' },
    ],
    generateBtn: 'एआई स्क्रिप्ट बनाएं',
    generating: 'आपकी स्क्रिप्ट लिखी जा रही है',
    generatingHint: 'हुक, सीन और हैशटैग तैयार हो रहे हैं…',
    examplesLabel: 'आईडिया चाहिए? एक आज़माएं:',
    examples: [
      'घर पर तुरंत सुबह की वर्कआउट वाली 30 सेकंड की रील',
      'तीखे पनीर टिक्का स्टॉल की स्ट्रीट फूड रिव्यू',
      'दिल्ली के एक कॉलेज स्टूडेंट की एक दिन की ज़िंदगी',
      'मनाली के छिपे हुए कैफ़े की ट्रैवल रील',
      '1 घंटे में होमवर्क खत्म करने का प्रोडक्टिविटी हैक',
    ],
    charCount: (n, max) => `${n} / ${max}`,
    errors: {
      empty: 'कृपया पहले अपना रील आईडिया लिखें।',
      tooShort: 'थोड़ा और विस्तार दें ताकि स्क्रिप्ट सटीक बने (न्यूनतम 10 अक्षर)।',
    },
  },
  output: {
    title: 'आपकी रील स्क्रिप्ट',
    emptyTitle: 'आपकी स्क्रिप्ट यहां दिखेगी',
    emptyDesc: 'ऊपर अपना आईडिया लिखें और बनाएं दबाएं — हुक, सीन, कैप्शन और हैशटैग के साथ पूरी रील स्क्रिप्ट पाएं।',
    copy: 'स्क्रिप्ट कॉपी करें',
    copied: 'कॉपी हो गया!',
    regenerate: 'फिर से बनाएं',
    download: 'डाउनलोड',
    duration: 'लंबाई',
    tone: 'वाइब',
    scenes: 'सीन',
    hookLabel: 'हुक',
    scriptLabel: 'सीन-दर-सीन स्क्रिप्ट',
    ctaLabel: 'कॉल टू एक्शन',
    hashtagsLabel: 'हैशटैग',
    captionLabel: 'कैप्शन',
    sceneOf: (i, total) => `सीन ${i} / ${total}`,
  },
  features: {
    badge: 'क्रिएटर्स क्यों पसंद करते हैं',
    title: 'स्क्रॉल रोकने वाली रील के लिए सब कुछ',
    subtitle: 'अब खाली स्क्रीन को नहीं घूटेंगे। रीलजीनी सेकंडों में तैयार स्क्रिप्ट देता है।',
    items: [
      { icon: 'Sparkles', title: 'एआई हुक', desc: 'आपके विषय और वाइब के अनुसार स्क्रॉल रोकने वाली पहली लाइन।' },
      { icon: 'Clapperboard', title: 'सीन-दर-सीन स्क्रिप्ट', desc: 'हर सीन के लिए विज़ुअल, डायलॉग और ऑन-स्क्रीन टेक्स्ट।' },
      { icon: 'Hash', title: 'स्मार्ट हैशटैग', desc: 'रीच बढ़ाने वाले ट्रेंडिंग और प्रासंगिक हैशटैग।' },
      { icon: 'Languages', title: 'हिंदी और अंग्रेज़ी', desc: 'पूरी ऐप — और आपकी स्क्रिप्ट — हिंदी और अंग्रेज़ी में बदलें।' },
      { icon: 'Clock', title: 'गति के लिए बना', desc: 'आईडिया से तैयार स्क्रिप्ट एक मिनट से भी कम में।' },
      { icon: 'Download', title: 'कॉपी और डाउनलोड', desc: 'एक क्लिक में पूरी स्क्रिप्ट कॉपी या फ़ाइल में डाउनलोड।' },
    ],
  },
  how: {
    badge: 'कैसे काम करता है',
    title: 'आईडिया से स्क्रिप्ट तीन स्टेप में',
    subtitle: 'न लॉगिन, न सीखना। बस लिखें और बनाएं।',
    steps: [
      { title: 'आईडिया लिखें', desc: 'जो रील बनानी है उसका एक लाइन विवरण लिखें।' },
      { title: 'वाइब चुनें', desc: 'टोन चुनें — ऊर्जावान, शिक्षाप्रद, भावुक, या और भी।' },
      { title: 'स्क्रिप्ट पाएं', desc: 'तुरंत हुक, सीन, कैप्शन और हैशटैग के साथ पूरी स्क्रिप्ट।' },
    ],
  },
  faq: {
    badge: 'सवाल-जवाब',
    title: 'सवालों के जवाब',
    subtitle: 'शुरू करने से पहले जो जानना चाहें।',
    items: [
      { q: 'क्या साइन अप करना होगा?', a: 'नहीं। बिना किसी अकाउंट या लॉगिन के तुरंत स्क्रिप्ट बनाएं।' },
      { q: 'क्या यह सच में मुफ़्त है?', a: 'हां। रील स्क्रिप्ट बनाने के लिए रीलजीनी पूरी तरह मुफ़्त है।' },
      { q: 'क्या हिंदी में स्क्रिप्ट मिलेगी?', a: 'बिल्कुल। भाषा टॉगल बदलें और आपकी स्क्रिप्ट हिंदी में बनेगी।' },
      { q: 'आईडिया कितना लंबा होना चाहिए?', a: 'एक-दो वाक्य काफ़ी हैं। बेहतर नतीजे के लिए विषय, लंबाई और दर्शक शामिल करें।' },
      { q: 'क्या स्क्रिप्ट दोबारा इस्तेमाल कर सकते हैं?', a: 'हां। कोई भी स्क्रिप्ट कॉपी या डाउनलोड करें और जैसे चाहें इस्तेमाल करें।' },
    ],
  },
  footer: {
    brand: 'रीलजीनी',
    desc: 'तेज़ चलने वाले क्रिएटर्स के लिए एआई से बनी रील स्क्रिप्ट।',
    rights: 'सर्वाधिकार सुरक्षित।',
    madeWith: 'क्रिएटर्स के लिए प्यार से बनाया गया',
    links: [
      { label: 'फ़ीचर्स' },
      { label: 'कैसे काम करता है' },
      { label: 'सवाल-जवाब' },
    ],
  },
  dir: 'ltr',
};

export const translations: Record<Lang, Translation> = { en, hi };
