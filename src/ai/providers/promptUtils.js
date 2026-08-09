export function buildAIPrompt(topic, slideCount) {
  const n = slideCount || null;
  const bodyN = n ? Math.max(1, n - 2) : null;
  const countLine = n
    ? `Buat carousel PERSIS ${n} slide dalam Bahasa Indonesia yang natural dan enak dibaca, terdiri dari:
- 1 slide hook/pembuka yang menarik perhatian
- ${bodyN} slide isi (poin/langkah/kesalahan/alasan sesuai konteks topik)
- 1 slide CTA (call to action) penutup`
    : `Buat carousel 5 sampai 7 slide dalam Bahasa Indonesia yang natural dan enak dibaca, terdiri dari:
- 1 slide hook/pembuka yang menarik perhatian
- 3 sampai 5 slide isi (poin/langkah/kesalahan/alasan sesuai konteks topik)
- 1 slide CTA (call to action) penutup`;

  return `Anda adalah Content Engine untuk aplikasi pembuat carousel media sosial berbahasa Indonesia.
Topik: "${topic}"

${countLine}

Balas HANYA dengan JSON valid, tanpa markdown, tanpa penjelasan tambahan, persis struktur ini:
{
  "badge": "label kategori singkat huruf kapital, maksimal 3 kata",
  "slides": [
    {"eyebrow": "label kecil slide", "title": "judul singkat slide", "body": "isi/penjelasan slide, 1-2 kalimat"}
  ],
  "hashtags": ["#tag1", "#tag2"],
  "captions": {
    "short": "caption pendek 1-2 kalimat",
    "long": "caption panjang berisi ringkasan tiap poin",
    "professional": "caption bernada profesional",
    "social": "caption santai dengan emoji"
  }
}`;
}

export function parseAIResponse(text) {
  const cleaned = text.replace(/```json\s*/gi, "").replace(/```/g, "").trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  const data = JSON.parse(match ? match[0] : cleaned);
  if (!Array.isArray(data.slides) || data.slides.length < 3) throw new Error("Format respons AI tidak sesuai");
  return data;
}

// Dipanggil provider*.js kalau settings.useProxy aktif — meneruskan request
// lewat proxy server milik user sendiri (lihat /proxy-server/worker.js)
// supaya tidak diblokir CORS oleh Groq/OpenRouter.
export async function callViaProxy(proxyUrl, provider, apiKey, model, prompt) {
  const res = await fetch(proxyUrl.replace(/\/$/, ""), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, apiKey, model, prompt }),
  });
  let data;
  try { data = await res.json(); } catch { throw new Error("Proxy: respons bukan JSON valid"); }
  if (!res.ok || data.error) throw new Error(data.error || `Proxy error (${res.status})`);
  if (!data.text) throw new Error("Proxy: respons kosong");
  return data.text;
}
