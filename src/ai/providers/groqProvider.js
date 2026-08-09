import { buildAIPrompt, parseAIResponse, callViaProxy } from "./promptUtils.js";

async function callGroq(apiKey, model, prompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Groq API error (${res.status})`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Groq: respons kosong");
  return text;
}

async function generateContent(settings, topic) {
  const { apiKey, model, useProxy, proxyUrl, slideCount } = settings;
  if (!apiKey || !apiKey.trim()) throw new Error("API key belum diisi");
  const prompt = buildAIPrompt(topic, slideCount);
  // Groq sering memblokir CORS untuk request langsung dari browser —
  // proxy sangat disarankan untuk provider ini (lihat SettingsPanel).
  const raw = useProxy
    ? await callViaProxy(proxyUrl, "groq", apiKey, model, prompt)
    : await callGroq(apiKey, model, prompt);
  return parseAIResponse(raw);
}

export const groqProvider = {
  generateContent,
  generateSlides: async (settings, topic) => (await generateContent(settings, topic)).slides,
  generateCaption: async (settings, topic) => (await generateContent(settings, topic)).captions,
  generateHashtags: async (settings, topic) => (await generateContent(settings, topic)).hashtags,
  generateCTA: async (settings, topic) => {
    const data = await generateContent(settings, topic);
    return data.slides[data.slides.length - 1];
  },
};
