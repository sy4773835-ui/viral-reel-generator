import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MODEL = "gemini-1.5-flash-latest";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const TONE_WORDS: Record<string, { en: string; hi: string }> = {
  energetic: { en: "high-energy, fast-paced, punchy", hi: "ऊर्जावान, तेज़, पंची" },
  educational: { en: "clear, informative, step-by-step", hi: "स्पष्ट, जानकारी भरपूर, स्टेप-बाय-स्टेप" },
  emotional: { en: "heartfelt, warm, story-driven", hi: "दिल से, गर्मजोशी भरा, कहानी वाला" },
  funny: { en: "funny, relatable, playful", hi: "मज़ाकिया, रिलेटेबल, चंचल" },
  luxury: { en: "luxurious, aesthetic, cinematic", hi: "लग्ज़री, एस्थेटिक, सिनेमैटिक" },
  inspirational: { en: "inspiring, motivational, uplifting", hi: "प्रेरणादायक, मोटिवेशनल, उत्साहवर्धक" },
};

function buildPrompt(idea: string, tone: string, lang: "en" | "hi"): string {
  const toneWord = TONE_WORDS[tone]?.[lang] ?? TONE_WORDS.energetic[lang];
  const langName = lang === "hi" ? "Hindi (Devanagari script)" : "English";

  const responseSchema = `{
  "hook": "string — scroll-stopping opening line",
  "scenes": [
    {
      "index": number,
      "duration": "string like '8s'",
      "visual": "string — what the camera shows",
      "voiceover": "string — narration / dialogue",
      "onScreenText": "string — short text overlay"
    }
  ],
  "cta": "string — call to action",
  "caption": "string — full Instagram caption with line breaks (\\\\n) and without hashtags",
  "hashtags": ["array of 8-12 relevant hashtags without the # symbol"],
  "totalDuration": "string like '30s' or '60s'"
}`;

  const instruction = lang === "hi"
    ? `आप एक पेशेवर रील स्क्रिप्ट राइटर हैं। ${idea} विषय पर ${toneWord} अंदाज़ में एक वायरल इंस्टाग्राम रील स्क्रिप्ट बनाएं। पूरी स्क्रिप्ट ${langName} में लिखें। 4 से 6 सीन बनाएं। हर सीन का duration, visual, voiceover और on-screen text दें।`
    : `You are a professional reel script writer. Create a viral Instagram reel script about "${idea}" in a ${toneWord} style. Write the entire script in ${langName}. Create 4 to 6 scenes. For each scene provide duration, visual, voiceover, and on-screen text.`;

  return `${instruction}

Respond ONLY with valid JSON (no markdown, no code fences) in this exact shape:
${responseSchema}

The hook must be punchy and stop the scroll. The caption should NOT contain hashtags (put those in the hashtags array without #). Hashtags must be a mix of trending and topic-specific.`;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: { message?: string };
}

interface ReelScene {
  index: number;
  duration: string;
  visual: string;
  voiceover: string;
  onScreenText: string;
}

interface ReelScript {
  hook: string;
  scenes: ReelScene[];
  cta: string;
  caption: string;
  hashtags: string[];
  totalDuration: string;
}

function extractJson(raw: string): string {
  let text = raw.trim();
  // Strip markdown code fences if present
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fence) text = fence[1].trim();
  // If surrounded by stray braces, find the first { to last }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    text = text.slice(start, end + 1);
  }
  return text;
}

function validateScript(data: unknown): ReelScript {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid script shape");
  }
  const obj = data as Record<string, unknown>;
  const hook = typeof obj.hook === "string" ? obj.hook : "";
  const cta = typeof obj.cta === "string" ? obj.cta : "";
  const caption = typeof obj.caption === "string" ? obj.caption : "";
  const totalDuration = typeof obj.totalDuration === "string" ? obj.totalDuration : "45s";
  const hashtags = Array.isArray(obj.hashtags)
    ? (obj.hashtags as unknown[]).filter((h): h is string => typeof h === "string").map((h) => h.replace(/^#/, ""))
    : [];

  const rawScenes = Array.isArray(obj.scenes) ? (obj.scenes as unknown[]) : [];
  const scenes: ReelScene[] = rawScenes.map((s, i) => {
    const sc = (s && typeof s === "object" ? s : {}) as Record<string, unknown>;
    return {
      index: typeof sc.index === "number" ? sc.index : i + 1,
      duration: typeof sc.duration === "string" ? sc.duration : "8s",
      visual: typeof sc.visual === "string" ? sc.visual : "",
      voiceover: typeof sc.voiceover === "string" ? sc.voiceover : "",
      onScreenText: typeof sc.onScreenText === "string" ? sc.onScreenText : "",
    };
  });

  if (!hook || scenes.length === 0) {
    throw new Error("Missing hook or scenes");
  }

  return { hook, scenes, cta, caption, hashtags, totalDuration };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Gemini API key is not configured on the server." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let body: { idea?: string; tone?: string; lang?: string };
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request body." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const idea = typeof body.idea === "string" ? body.idea.trim() : "";
    const tone = typeof body.tone === "string" ? body.tone : "energetic";
    const lang: "en" | "hi" = body.lang === "hi" ? "hi" : "en";

    if (!idea) {
      return new Response(
        JSON.stringify({ error: "Reel idea is required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const prompt = buildPrompt(idea, tone, lang);

    const geminiRes = await fetch(`${API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text().catch(() => "");
      console.error("Gemini API error:", geminiRes.status, errText);
      return new Response(
        JSON.stringify({ error: "The AI service is unavailable. Please try again shortly." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const geminiData: GeminiResponse = await geminiRes.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return new Response(
        JSON.stringify({ error: "The AI returned an empty response. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(extractJson(rawText));
    } catch {
      return new Response(
        JSON.stringify({ error: "The AI response could not be parsed. Please try again." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const script = validateScript(parsed);

    return new Response(
      JSON.stringify(script),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong while generating your script." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
