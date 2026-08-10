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

ATURAN BAHASA (WAJIB, PALING PENTING): SEMUA teks di SEMUA field JSON — termasuk "badge", "eyebrow", "title", "body", "hashtags" (kecuali tanda "#"), dan "captions" — HARUS 100% Bahasa Indonesia. JANGAN pernah pakai kata bahasa Inggris untuk "badge" (contoh SALAH: "AI PRODUCTIVITY" — contoh BENAR: "PRODUKTIVITAS AI" atau "TIPS AI KERJA"). Ini aturan paling sering dilanggar, jadi cek ulang sebelum menjawab.

${countLine}

ATURAN PENTING SOAL KUALITAS ISI (WAJIB DIIKUTI):
- Setiap slide isi (body) HARUS berisi penjelasan yang benar-benar substantif — bukan cuma nama teknik/tips tanpa isi. Jelaskan KENAPA poin ini penting DAN BAGAIMANA cara menerapkannya secara konkret.
- Sertakan detail spesifik kalau relevan: contoh nyata, angka/persentase perkiraan, langkah praktis, atau skenario konkret — bukan saran generik seperti "lakukan secara konsisten" tanpa penjelasan lanjutan.
- Body tiap slide isi idealnya 2-4 kalimat yang padat informasi (bukan 1 kalimat template pendek), tapi tetap ringkas dan jangan bertele-tele — setiap kalimat harus menambah insight baru, bukan mengulang kalimat sebelumnya dengan kata lain.
- HINDARI gaya generik ala artikel SEO/listicle internet yang dangkal ("tips-tips umum yang semua orang sudah tahu"). Tulis seolah orang yang benar-benar ahli di topik ini yang menjelaskan, dengan sudut pandang atau detail yang jarang dibahas.
- Title tiap slide tetap singkat (headline), tapi body-nya yang membawa "daging"/substansi.

ATURAN KHUSUS SLIDE CTA (SLIDE TERAKHIR):
- JANGAN cantumkan link atau URL apa pun — di Instagram, link di dalam gambar/carousel tidak bisa diklik langsung, jadi itu percuma.
- Gunakan gaya "umpan komentar": ajak pembaca komentar SATU KATA KUNCI singkat (huruf kapital, relevan sama topik, contoh: "MAU", "CUAN", "TIPS") untuk dapat info lanjutan/panduan/detail — ini terbukti menaikkan engagement karena orang harus komentar dulu.
- Title slide CTA formatnya: Komentar "[KATA KUNCI]" di Bawah — body-nya janji singkat apa yang mereka dapat kalau komentar (boleh juga singgung cek bio kalau relevan, tapi jangan tulis URL).

Balas HANYA dengan JSON valid, tanpa markdown, tanpa penjelasan tambahan, persis struktur ini:
{
  "badge": "label kategori singkat huruf kapital BAHASA INDONESIA, maksimal 3 kata (JANGAN bahasa Inggris)",
  "slides": [
    {"eyebrow": "label kecil slide", "title": "judul singkat slide (headline)", "body": "isi slide yang substantif, 2-4 kalimat, jelaskan kenapa dan bagaimana secara konkret — bukan cuma judul tips tanpa penjelasan"}
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
