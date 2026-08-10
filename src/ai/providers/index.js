import { localProvider } from "./localProvider.js";
import { geminiProvider } from "./geminiProvider.js";
import { groqProvider } from "./groqProvider.js";
import { openrouterProvider } from "./openrouterProvider.js";
import { generateHashtags } from "../engines/hashtagEngine.js";
import { generateCaptions } from "../engines/captionEngine.js";

export { PROVIDERS } from "./registry.js";

// Semua provider mengimplementasikan interface yang sama:
//   generateContent(settings, topic) -> { badge, slides, hashtags, captions }
//   generateSlides / generateCaption / generateHashtags / generateCTA
// supaya App.jsx tidak perlu tahu detail masing-masing provider.
const PROVIDER_IMPL = {
  local: localProvider,
  gemini: geminiProvider,
  groq: groqProvider,
  openrouter: openrouterProvider,
};

export function getProvider(key) {
  return PROVIDER_IMPL[key] || localProvider;
}

// FALLBACK SYSTEM
// AI Provider -> Error -> Fallback -> Local AI Engine
// Dipanggil dari pages/Home.jsx setiap kali user menekan "Generate Carousel".
// Kalau provider AI gagal (API key salah, network/CORS error, kuota habis,
// format respons tidak valid), otomatis fallback ke Local Engine supaya
// carousel tetap ter-generate — aplikasi tidak pernah gagal total.
export async function generateWithFallback(settings, topic) {
  if (settings.provider === "local") {
    const data = await localProvider.generateContent(settings, topic);
    return { data, usedFallback: false };
  }

  try {
    const provider = getProvider(settings.provider);
    const data = await provider.generateContent(settings, topic);
    return { data, usedFallback: false };
  } catch (err) {
    const data = await localProvider.generateContent(settings, topic);
    return { data, usedFallback: true, error: err };
  }
}

// Konversi hasil mentah provider (AI atau local) jadi bentuk siap-render
// yang dipakai seluruh UI (slides dengan role hook/body/cta, dna final, dst).
export function toGeneratedCarousel(topic, data, dna) {
  const ALLOWED_CARD_STYLES = new Set(["quote", "checklist"]);
  const slides = data.slides.map((s, i) => ({
    role: i === 0 ? "hook" : i === data.slides.length - 1 ? "cta" : "body",
    eyebrow: s.eyebrow || (i === 0 ? dna.badge : `Poin ${i}`),
    title: s.title || "",
    body: s.body || "",
    // cardStyle opsional dari AI — dipakai NeonPromptTemplate buat render
    // quote-box/checklist. Divalidasi ketat: nilai di luar whitelist
    // (misal AI ngarang string aneh) di-drop diam-diam, bukan bikin error.
    cardStyle: ALLOWED_CARD_STYLES.has(s.cardStyle) ? s.cardStyle : null,
  }));
  const hashtags = Array.isArray(data.hashtags) && data.hashtags.length
    ? data.hashtags.slice(0, 8)
    : generateHashtags(topic, dna.category);
  const captions = data.captions && data.captions.short
    ? data.captions
    : generateCaptions(topic, slides, hashtags);
  const finalDna = data.badge ? { ...dna, badge: data.badge } : dna;
  return { topic, dna: finalDna, slides, hashtags, captions };
}
