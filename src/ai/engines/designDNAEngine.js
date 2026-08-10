import { CATEGORIES, detectCategory } from "./categoryEngine.js";
import { getColorPalette } from "./colorEngine.js";
import { detectLayoutKey, layoutLabel } from "./layoutEngine.js";

export const TEMPLATES = {
  modern: { name: "Modern", font: "'Segoe UI', system-ui, sans-serif", radius: 28, shadow: true },
  minimal: { name: "Minimal", font: "Georgia, 'Times New Roman', serif", radius: 4, shadow: false },
  dark: { name: "Dark", font: "'Segoe UI', system-ui, sans-serif", radius: 20, shadow: true },
  corporate: { name: "Corporate", font: "'Segoe UI', system-ui, sans-serif", radius: 8, shadow: false },
  gradient: { name: "Gradient", font: "'Segoe UI', system-ui, sans-serif", radius: 32, shadow: true },
  social: { name: "Social Media", font: "'Segoe UI', system-ui, sans-serif", radius: 40, shadow: true },
  business: { name: "Business", font: "'Segoe UI', system-ui, sans-serif", radius: 6, shadow: false },
  glass: { name: "Glass", font: "'Segoe UI', system-ui, sans-serif", radius: 28, shadow: true },
  luxury: { name: "Luxury", font: "Georgia, 'Times New Roman', serif", radius: 0, shadow: false },
  education: { name: "Education", font: "'Segoe UI', system-ui, sans-serif", radius: 24, shadow: false },
  technology: { name: "Technology", font: "'Consolas', 'Courier New', monospace", radius: 12, shadow: true },
  finance: { name: "Finance", font: "'Segoe UI', system-ui, sans-serif", radius: 6, shadow: false },
  health: { name: "Health", font: "'Segoe UI', system-ui, sans-serif", radius: 36, shadow: false },
  marketing: { name: "Marketing", font: "'Segoe UI', system-ui, sans-serif", radius: 0, shadow: true },
  startup: { name: "Startup", font: "'Segoe UI', system-ui, sans-serif", radius: 14, shadow: true },
  ecommerce: { name: "Ecommerce", font: "'Segoe UI', system-ui, sans-serif", radius: 16, shadow: true },
  personalBranding: { name: "Personal Branding", font: "Georgia, 'Times New Roman', serif", radius: 999, shadow: false },
  news: { name: "News", font: "Georgia, 'Times New Roman', serif", radius: 0, shadow: false },
  infographic: { name: "Infographic", font: "'Segoe UI', system-ui, sans-serif", radius: 10, shadow: false },
  executive: { name: "Executive", font: "Georgia, 'Times New Roman', serif", radius: 4, shadow: false },
  neonPrompt: { name: "Neon Prompt Card", font: "'Segoe UI', system-ui, sans-serif", radius: 32, shadow: false },
};

// Pilihan font manual — kalau user pilih selain "auto", ini menimpa font
// bawaan template. Sengaja dibatasi ke font sistem/web-safe (bukan Google
// Fonts via <link>) supaya render export (html-to-canvas) tetap konsisten
// tanpa risiko font belum ter-load pas rasterisasi.
export const FONT_OPTIONS = {
  auto: { label: "Otomatis (ikut template)", value: null },
  sans: { label: "Modern (Sans)", value: "'Segoe UI', system-ui, sans-serif" },
  serif: { label: "Klasik (Serif)", value: "Georgia, 'Times New Roman', serif" },
  mono: { label: "Kode (Mono)", value: "'Consolas', 'Courier New', monospace" },
  rounded: { label: "Santai (Rounded)", value: "'Trebuchet MS', Verdana, sans-serif" },
};

// Skala ukuran teks — dikalikan ke SEMUA ukuran font dasar di 21 template
// sekaligus lewat fitTitle/fitText (lihat textFit.js), bukan diedit per file.
export const SIZE_OPTIONS = {
  s: { label: "Kecil", scale: 0.85 },
  m: { label: "Normal", scale: 1 },
  l: { label: "Besar", scale: 1.15 },
  xl: { label: "Ekstra Besar", scale: 1.3 },
};

// Template default per kategori (dipakai kalau mode Auto/AI aktif).
export const CATEGORY_TEMPLATE_DEFAULT = {
  technology: "technology", marketing: "marketing", finance: "finance", health: "health",
  education: "education", creator: "personalBranding", startup: "startup", career: "executive", business: "business",
};

export function buildDesignDNA(topic, templateKey, frameworkType) {
  const category = detectCategory(topic);
  const meta = CATEGORIES[category];
  const palette = getColorPalette(category);
  const tpl = templateKey || CATEGORY_TEMPLATE_DEFAULT[category];
  const layoutKey = detectLayoutKey(frameworkType);
  return {
    category,
    badge: meta.label,
    template: TEMPLATES[tpl].name,
    templateKey: tpl,
    layout: layoutLabel(layoutKey),
    layoutKey,
    primaryColor: palette.primary,
    secondaryColor: palette.secondary,
    accentColor: palette.accent,
    fontFamily: TEMPLATES[tpl].font,
    radius: TEMPLATES[tpl].radius,
    shadow: TEMPLATES[tpl].shadow,
    icon: meta.icon,
  };
}
