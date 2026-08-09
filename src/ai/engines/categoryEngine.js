// Category Engine — deteksi niche/kategori dari topik. Data warna sudah
// dipisah ke colorEngine.js (lihat getColorPalette) sesuai struktur brief.
export const CATEGORIES = {
  technology: {
    label: "AI PRODUCTIVITY",
    icon: "Cpu",
    keywords: ["ai", "teknologi", "digital", "aplikasi", "software", "otomatisasi", "excel", "coding", "cyber", "algoritma", "app"],
  },
  marketing: {
    label: "MARKETING GROWTH",
    icon: "TrendingUp",
    keywords: ["marketing", "promosi", "iklan", "konten", "branding", "viral", "tiktok", "instagram", "engagement", "audiens", "jualan"],
  },
  finance: {
    label: "FINANCE",
    icon: "DollarSign",
    keywords: ["keuangan", "uang", "investasi", "saham", "umkm", "cuan", "budget", "gaji", "hutang", "cashflow", "modal", "profit"],
  },
  health: {
    label: "HEALTH & WELLNESS",
    icon: "HeartPulse",
    keywords: ["kesehatan", "diet", "olahraga", "mental", "tidur", "gizi", "fitness", "sehat"],
  },
  education: {
    label: "EDUCATION",
    icon: "BookOpen",
    keywords: ["belajar", "pendidikan", "edukasi", "skill", "kursus", "mahasiswa", "sekolah", "kuliah"],
  },
  creator: {
    label: "CREATOR SERIES",
    icon: "Megaphone",
    keywords: ["content creator", "konten kreator", "youtube", "personal branding", "follower", "kreator", "influencer"],
  },
  startup: {
    label: "STARTUP",
    icon: "Rocket",
    keywords: ["startup", "founder", "investor", "funding", "produk baru", "scale up"],
  },
  career: {
    label: "CAREER GROWTH",
    icon: "Briefcase",
    keywords: ["karir", "kerja", "karyawan", "interview", "cv", "produktivitas kerja", "resign", "gaji naik"],
  },
  business: {
    label: "BUSINESS",
    icon: "Briefcase",
    keywords: [],
  },
};

// Word-boundary match, bukan substring match — supaya kata pendek seperti
// "ai" tidak ke-trigger cuma karena nempel di dalam kata lain yang nggak
// berhubungan (contoh nyata: "5 cara menjadi karyawan yang baik" kena
// deteksi kategori "technology" karena "ai" nyangkut di dalam kata "baik").
function matchesKeyword(text, keyword) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

export function detectCategory(topic) {
  const lower = topic.toLowerCase();
  for (const [key, meta] of Object.entries(CATEGORIES)) {
    if (key === "business") continue;
    if (meta.keywords.some((k) => matchesKeyword(lower, k))) return key;
  }
  return "business";
}
