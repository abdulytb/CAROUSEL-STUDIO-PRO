import { buildAIPrompt, parseAIResponse, callViaProxy } from "./promptUtils.js";

async function callGemini(apiKey, model, prompt) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });
  if (!res.ok) throw new Error(`Gemini API error (${res.status})`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini: respons kosong");
  return text;
}

async function generateContent(settings, topic) {
  const { apiKey, model, useProxy, proxyUrl, slideCount } = settings;
  if (!apiKey || !apiKey.trim()) throw new Error("API key belum diisi");
  const prompt = buildAIPrompt(topic, slideCount);
  const raw = useProxy
    ? await callViaProxy(proxyUrl, "gemini", apiKey, model, prompt)
    : await callGemini(apiKey, model, prompt);
  return parseAIResponse(raw);
}

export const geminiProvider = {
  generateContent,
  generateSlides: async (settings, topic) => (await generateContent(settings, topic)).slides,
  generateCaption: async (settings, topic) => (await generateContent(settings, topic)).captions,
  generateHashtags: async (settings, topic) => (await generateContent(settings, topic)).hashtags,
  generateCTA: async (settings, topic) => {
    const data = await generateContent(settings, topic);
    return data.slides[data.slides.length - 1];
  },
};
