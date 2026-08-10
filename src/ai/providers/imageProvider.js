// Provider gambar hero — pakai Pollinations.ai (image.pollinations.ai).
// GRATIS TOTAL, TANPA API KEY, TANPA KARTU, TANPA BILLING.
//
// Sebelumnya pakai Gemini 2.5 Flash Image ("Nano Banana"), tapi model itu
// punya kuota 0 di free tier (butuh billing aktif + auto-debet pay-as-you-go)
// — lihat diskusi di chat, ini keputusan sadar buat hindari risiko billing.
//
// Signature function SENGAJA dipertahankan mirip versi lama (apiKey masih
// jadi parameter pertama) supaya pemanggil (Home.jsx / SettingsPanel.jsx)
// gak perlu dibongkar total — apiKey sekarang diabaikan (opsional).
//
// Kegagalan gambar TETAP tidak boleh menggagalkan carousel — pemanggilnya
// (Home.jsx) sudah fallback ke slide tanpa gambar + notice heroImageError.

export async function generateHeroImage(apiKey, topic, badge) {
  const prompt = `Professional editorial photograph closely related to this topic: "${topic}" (context: ${badge || "general"}). Cinematic lighting, photorealistic, high detail, vertical portrait composition, no text or watermark or logo anywhere in the image, no visible captions.`;

  const encodedPrompt = encodeURIComponent(prompt);
  // width/height 1080x1350 = rasio vertikal umum buat slide carousel IG.
  // nologo=true buang watermark kecil Pollinations. seed acak biar tiap
  // generate beda meski topik sama.
  const seed = Math.floor(Math.random() * 1_000_000);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1080&height=1350&nologo=true&seed=${seed}`;

  const res = await fetch(url);

  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    throw new Error(`Pollinations Image error (${res.status}): ${detail}`);
  }

  const blob = await res.blob();
  if (!blob || blob.size === 0) {
    throw new Error("Pollinations Image: respons kosong (kemungkinan server sedang sibuk, coba lagi).");
  }

  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Gagal konversi gambar ke base64"));
    reader.readAsDataURL(blob);
  });

  // reader.result sudah dalam format "data:image/...;base64,..." lengkap
  return base64;
}
