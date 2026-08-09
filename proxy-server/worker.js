/**
 * AI CAROUSEL STUDIO PRO — AI Connector Proxy (Cloudflare Worker)
 * ------------------------------------------------------------------
 * Fungsi worker ini HANYA meneruskan request dari browser ke provider AI
 * (Gemini / Groq / OpenRouter) agar tidak diblokir CORS. Tidak ada API key
 * yang disimpan, dilog, atau dipakai ulang — key dikirim oleh user di setiap
 * request dan langsung diteruskan ke provider yang dipilih.
 *
 * CARA DEPLOY (gratis, ~3 menit):
 * 1. Buka https://dash.cloudflare.com -> Workers & Pages -> Create -> Create Worker.
 * 2. Beri nama bebas, misalnya "carousel-ai-proxy".
 * 3. Hapus kode default, tempel seluruh isi file ini, lalu klik Deploy.
 * 4. Salin URL worker yang muncul (bentuknya: https://carousel-ai-proxy.<akun>.workers.dev).
 * 5. Tempel URL itu ke kolom "Proxy URL" di Settings aplikasi AI Carousel Studio Pro.
 *
 * Worker ini berjalan di akun Cloudflare Anda sendiri — bukan milik atau
 * dikelola oleh aplikasi ini. Free tier Cloudflare Workers cukup untuk
 * pemakaian personal (100.000 request/hari).
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Hanya method POST yang didukung." }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Body request harus JSON valid." }, 400);
    }

    const { provider, apiKey, model, prompt } = body || {};
    if (!provider || !apiKey || !prompt) {
      return jsonResponse({ error: "Field 'provider', 'apiKey', dan 'prompt' wajib diisi." }, 400);
    }

    try {
      let text;
      if (provider === "gemini") text = await callGemini(apiKey, model, prompt);
      else if (provider === "groq") text = await callGroq(apiKey, model, prompt);
      else if (provider === "openrouter") text = await callOpenRouter(apiKey, model, prompt);
      else return jsonResponse({ error: `Provider '${provider}' tidak dikenal.` }, 400);

      return jsonResponse({ text }, 200);
    } catch (err) {
      return jsonResponse({ error: err.message || "Terjadi kesalahan pada provider." }, 502);
    }
  },
};

function jsonResponse(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

async function callGemini(apiKey, model, prompt) {
  const m = model || "gemini-2.5-flash";
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  if (!res.ok) throw new Error(`Gemini error ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini: respons kosong atau diblokir safety filter.");
  return text;
}

async function callGroq(apiKey, model, prompt) {
  const m = model || "openai/gpt-oss-20b";
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: m, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Groq error ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Groq: respons kosong.");
  return text;
}

async function callOpenRouter(apiKey, model, prompt) {
  const m = model || "openrouter/auto";
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: m, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`OpenRouter error ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenRouter: respons kosong.");
  return text;
}
