// Provider terpisah dari geminiProvider.js karena beda model & beda bentuk
// respons: teks pakai gemini-2.5-flash / gemini-flash-latest (JSON di
// response.text), gambar pakai gemini-2.5-flash-image dengan
// responseModalities ["TEXT","IMAGE"] — hasilnya base64 di
// candidates[0].content.parts[].inlineData, bukan teks biasa.
//
// Model ini SELALU berbayar per-panggilan di luar kuota gratis harian akun
// (beda dari kuota teks) — lihat catatan di CarouselForm/Header UI. Kalau
// kuota habis atau key tidak didukung, lempar error yang jelas supaya
// pemanggilnya (Home.jsx) bisa fallback dengan tenang (slide tetap jadi,
// cuma tanpa gambar cover).

const IMAGE_MODEL = "gemini-2.5-flash-image";

export async function generateHeroImage(apiKey, topic, badge) {
  if (!apiKey || !apiKey.trim()) throw new Error("API key belum diisi");

  const prompt = `Professional editorial photograph closely related to this topic: "${topic}" (context: ${badge || "general"}). Cinematic lighting, photorealistic, high detail, vertical portrait composition, no text or watermark or logo anywhere in the image, no visible captions.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
      }),
    }
  );

  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    throw new Error(`Gemini Image API error (${res.status}): ${detail}`);
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData);
  if (!imagePart) {
    throw new Error("Gemini Image: tidak ada gambar di respons (kemungkinan diblokir safety filter Google).");
  }
  return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
}
