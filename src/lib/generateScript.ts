import type { Lang } from '@/i18n/translations';

export type Tone = 'energetic' | 'educational' | 'emotional' | 'funny' | 'luxury' | 'inspirational';

export interface ReelScene {
  index: number;
  duration: string;
  visual: string;
  voiceover: string;
  onScreenText: string;
}

export interface ReelScript {
  hook: string;
  scenes: ReelScene[];
  cta: string;
  caption: string;
  hashtags: string[];
  totalDuration: string;
  tone: Tone;
  lang: Lang;
}

const toneKeywords: Record<Tone, { en: string; hi: string }> = {
  energetic: { en: 'high-energy, fast-paced, punchy', hi: 'ऊर्जावान, तेज़, पंची' },
  educational: { en: 'clear, informative, step-by-step', hi: 'स्पष्ट, जानकारी भरपूर, स्टेप-बाय-स्टेप' },
  emotional: { en: 'heartfelt, warm, story-driven', hi: 'दिल से, गर्मजोशी भरा, कहानी वाला' },
  funny: { en: 'funny, relatable, playful', hi: 'मज़ाकिया, रिलेटेबल, चंचल' },
  luxury: { en: 'luxurious, aesthetic, cinematic', hi: 'लग्ज़री, एस्थेटिक, सिनेमैटिक' },
  inspirational: { en: 'inspiring, motivational, uplifting', hi: 'प्रेरणादायक, मोटिवेशनल, उत्साहवर्धक' },
};

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function pseudoRandom(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (h << 5) - h + text.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const hookTemplates = {
  en: [
    (topic: string) => `Stop scrolling — this ${topic} will change your feed.`,
    (topic: string) => `Nobody talks about this ${topic}, but they should.`,
    (topic: string) => `POV: you just discovered the best ${topic}.`,
    (topic: string) => `I tried this ${topic} so you don't have to. Here's what happened.`,
    (topic: string) => `This ${topic} took me from 0 to viral. Here's the secret.`,
    (topic: string) => `Wait until the end — this ${topic} is unreal.`,
    (topic: string) => `3 things about ${topic} that actually matter.`,
    (topic: string) => `The ${topic} hack nobody told you about.`,
  ],
  hi: [
    (topic: string) => `स्क्रॉल मत करो — ये ${topic} आपकी फ़ीड बदल देगा।`,
    (topic: string) => `कोई इस ${topic} की बात नहीं करता, पर करनी चाहिए।`,
    (topic: string) => `POV: आपको अभी सबसे बेहतरीन ${topic} मिला।`,
    (topic: string) => `मैंने ये ${topic} आज़माया ताकि आपको न करना पड़े। देखें क्या हुआ।`,
    (topic: string) => `इस ${topic} ने मुझे ज़ीरो से वायरल बनाया। राज़ यहाँ है।`,
    (topic: string) => `आख़िर तक रुकें — ये ${topic} अविश्वसनीय है।`,
    (topic: string) => `${topic} के 3 काम जो सच में मायने रखते हैं।`,
    (topic: string) => `वो ${topic} हैक जो किसी ने नहीं बताया।`,
  ],
};

const ctaTemplates = {
  en: [
    'Follow for more reels like this!',
    'Save this for later and share with a friend who needs it.',
    'Drop a comment with your favorite part!',
    'Tag someone who needs to see this.',
    'Follow and turn on notifications so you never miss a reel.',
  ],
  hi: [
    'ऐसी और रील्स के लिए फ़ॉलो करें!',
    'बाद के लिए सेव करें और ज़रूरतमंद दोस्त के साथ शेयर करें।',
    'कमेंट में अपना पसंदीदा हिस्सा बताएं!',
    'जिसे ये देखना चाहिए उसे टैग करें।',
    'फ़ॉलो करें और नोटिफ़िकेशन ऑन करें ताकि कोई रील मिस न हो।',
  ],
};

const visualCues = {
  en: [
    'Quick montage of key moments with fast cuts',
    'Close-up shot with text overlay popping in',
    'Wide establishing shot, smooth zoom-in',
    'Split-screen comparison, left vs right',
    'Slow-motion hero shot, color-graded',
    'Behind-the-scenes b-roll, handheld',
    'Top-down flat-lay with animated arrows',
    'Direct-to-camera, energetic delivery',
  ],
  hi: [
    'मुख्य पलों का तेज़ कट्स के साथ मोंटाज',
    'क्लोज़-अप शॉट, टेक्स्ट ओवरले पॉप-इन के साथ',
    'वाइड एस्टैब्लिशिंग शॉट, स्मूद ज़ूम-इन',
    'स्प्लिट-स्क्रीन तुलना, बाएं बनाम दाएं',
    'स्लो-मोशन हीरो शॉट, कलर-ग्रेडेड',
    'बिहाइंड-द-सीन बी-रोल, हैंडहेल्ड',
    'टॉप-डाउन फ्लैट-ले, एनिमेटेड तीरों के साथ',
    'सीधे कैमरे की तरफ़, ऊर्जावान डिलिवरी',
  ],
};

const transitions = {
  en: ['whip-pan transition', 'match cut', 'glitch transition', 'zoom blur cut', 'speed ramp'],
  hi: ['व्हिप-पैन ट्रांज़िशन', 'मैच कट', 'ग्लिच ट्रांज़िशन', 'ज़ूम ब्लर कट', 'स्पीड रैम्प'],
};

const baseHashtags = {
  en: ['reels', 'reelitfeelit', 'trending', 'viral', 'explore', 'foryou', 'reelsinstagram', 'instadaily'],
  hi: ['reels', 'reelitfeelit', 'trending', 'viral', 'explore', 'foryou', 'reelsinstagram', 'instadaily'],
};

function estimateDuration(scenes: number, target: string): string {
  const seconds = target.includes('30') ? 30 : target.includes('60') || target.includes('1 min') ? 60 : target.includes('90') ? 90 : 45;
  const per = Math.max(3, Math.round(seconds / Math.max(scenes, 1)));
  return `${per}s`;
}

function buildTopic(text: string): string {
  const trimmed = text.trim().replace(/^(a|an|the|एक|इस|उस)\s+/i, '');
  return trimmed.length > 60 ? trimmed.slice(0, 60) + '…' : trimmed;
}

function extractDurationLabel(text: string, lang: Lang): string {
  const m = text.match(/(\d+)\s*(sec|second|सेकंड|s\b)/i);
  if (m) return `${m[1]}s`;
  const min = text.match(/(\d+)\s*(min|minute|मिनट)/i);
  if (min) return `${min[1]}min`;
  return lang === 'hi' ? '45सेकंड' : '45s';
}

function buildHashtags(text: string, lang: Lang, seed: number): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\u0900-\u097F\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['this', 'that', 'with', 'about', 'your', 'यह', 'वह', 'के', 'का', 'की', 'से', 'में'].includes(w))
    .slice(0, 5)
    .map((w) => w.replace(/[^a-z\u0900-\u097F]/g, ''));
  const topic = words.filter(Boolean);
  const base = baseHashtags[lang];
  const picked = base.filter((_, i) => (seed + i) % 2 === 0).slice(0, 5);
  const combined = [...topic, ...picked];
  return Array.from(new Set(combined)).slice(0, 10);
}

export function generateReelScript(idea: string, tone: Tone, lang: Lang): ReelScript {
  const seed = pseudoRandom(idea + tone + lang + Date.now().toString());
  const topic = buildTopic(idea);
  const durationLabel = extractDurationLabel(idea, lang);
  const sceneCount = durationLabel.includes('30') ? 4 : durationLabel.includes('60') || durationLabel.includes('90') ? 6 : 5;

  const hook = pick(hookTemplates[lang], seed)(topic);
  const cta = pick(ctaTemplates[lang], seed >> 2);

  const scenes: ReelScene[] = Array.from({ length: sceneCount }, (_, i) => {
    const s = seed + i * 7;
    return {
      index: i + 1,
      duration: estimateDuration(sceneCount, durationLabel),
      visual: pick(visualCues[lang], s),
      voiceover:
        lang === 'hi'
          ? pick(
              [
                `शुरुआत में ${topic} का आकर्षक हिस्सा दिखाएं।`,
                `अब मुख्य बात सरल भाषा में समझाएं।`,
                `एक आसान टिप या डिटेल पर ज़ूम करें।`,
                `नतीजा या फ़ायदा दिखाएं।`,
                `दर्शक से एक्शन मांगें।`,
                `एक और डिटेल जो कहानी आगे बढ़ाए।`,
              ],
              s,
            )
          : pick(
              [
                `Open with the most eye-catching part of ${topic}.`,
                `Now explain the main point in simple words.`,
                `Zoom in on one easy tip or detail.`,
                `Show the result or benefit clearly.`,
                `Ask the viewer to take action.`,
                `Add one more detail that moves the story forward.`,
              ],
              s,
            ),
      onScreenText:
        lang === 'hi'
          ? pick(
              [
                `${topic} 🎬`,
                `सिर्फ ${durationLabel} में`,
                `ये ज़रूर ट्राई करें`,
                `नतीजा देखें 👇`,
                `फ़ॉलो करें ❤️`,
                `आगे बढ़ते रहें`,
              ],
              s >> 1,
            )
          : pick(
              [
                `${topic} 🎬`,
                `In just ${durationLabel}`,
                `Try this now`,
                `See the result 👇`,
                `Follow for more ❤️`,
                `Keep going`,
              ],
              s >> 1,
            ),
    };
  });

  const hashtags = buildHashtags(idea, lang, seed);

  const caption =
    lang === 'hi'
      ? `${topic} ✨\n\n${pick(['क्या आपने ये पहले देखा है?', 'अपने दोस्तों के साथ शेयर करें!', 'कमेंट में बताएं आपको कैसा लगा।', 'सेव करें ताकि बाद में देख सकें।'], seed >> 3)}\n\n${hashtags.map((h) => `#${h}`).join(' ')}`
      : `${topic} ✨\n\n${pick(['Have you seen this before?', 'Share with your friends!', 'Tell me in the comments what you think.', 'Save this to try later.'], seed >> 3)}\n\n${hashtags.map((h) => `#${h}`).join(' ')}`;

  return {
    hook,
    scenes,
    cta,
    caption,
    hashtags,
    totalDuration: durationLabel,
    tone,
    lang,
  };
}

export function scriptToText(script: ReelScript, t: {
  output: { hookLabel: string; scriptLabel: string; ctaLabel: string; captionLabel: string; sceneOf: (i: number, total: number) => string };
}): string {
  const lines: string[] = [];
  lines.push(`🎬 ${t.output.hookLabel.toUpperCase()}`);
  lines.push(script.hook);
  lines.push('');
  lines.push(`🎞️ ${t.output.scriptLabel.toUpperCase()}`);
  script.scenes.forEach((s) => {
    lines.push(`${t.output.sceneOf(s.index, script.scenes.length)} (${s.duration})`);
    lines.push(`  Visual: ${s.visual}`);
    lines.push(`  Voiceover: ${s.voiceover}`);
    lines.push(`  On-screen: ${s.onScreenText}`);
    lines.push('');
  });
  lines.push(`📣 ${t.output.ctaLabel.toUpperCase()}`);
  lines.push(script.cta);
  lines.push('');
  lines.push(`📝 ${t.output.captionLabel.toUpperCase()}`);
  lines.push(script.caption);
  return lines.join('\n');
}

export const toneKeywordsForDisplay = toneKeywords;
