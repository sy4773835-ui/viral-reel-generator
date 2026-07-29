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

export const toneKeywordsForDisplay = toneKeywords;

/** 
 * Calls the server-side edge function that proxies Gemini.
 * The API key never touches the frontend.
 */
export async function generateReelScript(idea: string, tone: Tone, lang: Lang): Promise<ReelScript> {
  const url = "/.netlify/functions/generate-reel";
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idea, tone, lang }),
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const errBody = await res.json();
      if (errBody?.error) message = errBody.error;
    } catch {
      /* keep default message */
    }
    throw new Error(message);
  }

  const data = await res.json();
  if (!data || typeof data.hook !== 'string' || !Array.isArray(data.scenes)) {
    throw new Error('INVALID_RESPONSE');
  }

  return { ...data, tone, lang } as ReelScript;
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
