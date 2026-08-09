// Color Engine — dipisah dari Category Engine supaya skema warna bisa
// diubah/di-custom independen dari logika deteksi kategori (misal ganti
// satu palet warna tanpa menyentuh keyword deteksi sama sekali).
export const COLOR_PALETTES = {
  technology: { primary: "#2563EB", secondary: "#06B6D4", accent: "#38BDF8" },
  marketing: { primary: "#EA580C", secondary: "#F59E0B", accent: "#FB923C" },
  finance: { primary: "#047857", secondary: "#10B981", accent: "#34D399" },
  health: { primary: "#0F766E", secondary: "#14B8A6", accent: "#2DD4BF" },
  education: { primary: "#4338CA", secondary: "#7C3AED", accent: "#A78BFA" },
  creator: { primary: "#BE185D", secondary: "#9333EA", accent: "#E879F9" },
  startup: { primary: "#4F46E5", secondary: "#6366F1", accent: "#818CF8" },
  career: { primary: "#1D4ED8", secondary: "#3B82F6", accent: "#60A5FA" },
  business: { primary: "#1E293B", secondary: "#334155", accent: "#F59E0B" },
};

export function getColorPalette(category) {
  return COLOR_PALETTES[category] || COLOR_PALETTES.business;
}
