// Provider gambar hero — pakai Cloudflare Workers AI (model FLUX Schnell)
// lewat Worker proxy milik user sendiri (proxy-server/worker.js, endpoint
// POST /image). GRATIS 10.000 neuron/hari, TANPA kartu, TANPA auto-debet —
// beda dari Gemini (butuh billing aktif) dan lebih relevan/berkualitas
// dibanding Pollinations anonim (rate-limit ketat, kurang taat prompt).
//
// WAJIB lewat proxy: Workers AI cuma bisa diakses dari dalam Worker
// (binding env.AI), bukan REST API langsung dari browser.
//
// Kegagalan gambar TETAP tidak boleh menggagalkan carousel — pemanggilnya
// (Home.jsx) sudah fallback ke slide tanpa gambar + notice heroImageError.

// Daftar gaya gambar — ditambahkan sebagai SUFFIX terpisah ke prompt
// internal (bukan dicampur ke kolom topik yang diketik user), supaya
// kolom topik tetap murni berisi apa yang diketik user.
export const IMAGE_STYLES = {
  realistic: { label: "Realistis", suffix: "" },
  ghibli: { label: "Studio Ghibli", suffix: ", Studio Ghibli anime style, soft watercolor textures, whimsical hand-drawn illustration" },
  pastel: { label: "Pastel", suffix: ", soft pastel color palette, dreamy minimalist illustration, gentle lighting" },
  minecraft: { label: "Minecraft", suffix: ", Minecraft blocky voxel art style, pixelated textures, game screenshot" },
  clay: { label: "Clay / Claymation", suffix: ", claymation stop-motion style, clay texture, soft studio lighting" },
  render3d: { label: "3D Render", suffix: ", 3D render, Pixar-style, vibrant colors, soft global illumination" },
  cyberpunk: { label: "Cyberpunk", suffix: ", cyberpunk neon-lit futuristic style, vibrant neon colors, high contrast, rain-slicked streets aesthetic" },
  anime: { label: "Anime", suffix: ", anime illustration style, vibrant cel-shaded coloring, detailed anime character design" },
  watercolor: { label: "Watercolor", suffix: ", watercolor painting style, soft flowing pigments, artistic paper texture, delicate color bleeding" },
  isometric: { label: "Isometric", suffix: ", isometric 3D illustration style, clean geometric shapes, flat vibrant colors, miniature diorama feel" },
  vintage: { label: "Vintage Film", suffix: ", vintage retro film photography style, grainy film texture, warm faded tones, 1970s aesthetic" },
  lineart: { label: "Line Art", suffix: ", minimalist line art style, single continuous line drawing, clean black outlines on plain background" },
  lowpoly: { label: "Low Poly", suffix: ", low poly 3D style, faceted geometric shapes, flat shading, angular polygon aesthetic" },
  vaporwave: { label: "Vaporwave", suffix: ", vaporwave aesthetic, retro-futuristic pastel neon colors, glitch elements, 80s synthwave vibe" },
};

export async function generateHeroImage({ proxyUrl, topic, badge, style }) {
  if (!proxyUrl || !proxyUrl.trim()) {
    throw new Error("Proxy URL (Cloudflare Worker) belum diisi — gambar hero butuh proxy karena Workers AI cuma bisa diakses dari server.");
  }

  const styleSuffix = IMAGE_STYLES[style]?.suffix || "";
  const prompt = `Professional editorial photograph closely related to this topic: "${topic}" (context: ${badge || "general"}). Cinematic lighting, high detail, vertical portrait composition, no text or watermark or logo anywhere in the image, no visible captions${styleSuffix}.`;

  const endpoint = `${proxyUrl.trim().replace(/\/$/, "")}/image`;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    throw new Error(`Workers AI Image error (${res.status}): ${detail}`);
  }

  const data = await res.json();
  if (!data.image) throw new Error("Workers AI: respons tidak berisi gambar.");
  return data.image; // sudah data URL base64 lengkap dari worker
}
