export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { idea, tone, lang } = JSON.parse(event.body);

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Gemini API Key missing" }),
      };
    }

    const prompt = `
Create a viral ${lang} Instagram Reel script.

Topic: ${idea}
Tone: ${tone}

Return ONLY valid JSON in this format:

{
  "hook":"",
  "scenes":[
    {
      "index":1,
      "duration":"0-5s",
      "visual":"",
      "voiceover":"",
      "onScreenText":""
    }
  ],
  "cta":"",
  "caption":"",
  "hashtags":[]
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const result = await response.json();

    const text =
      result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: cleaned,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
