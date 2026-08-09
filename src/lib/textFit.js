// Ukuran font dasar di tiap template dirancang untuk teks pendek. Kalau AI
// Connector atau variasi lokal menghasilkan kalimat lebih panjang dari
// perkiraan, dua fungsi ini mengecilkan font secara proporsional supaya
// teks tidak terpotong di luar batas slide (fixed 1080x1350px, overflow
// hidden — lihat SLIDE_W/SLIDE_H di designDNAEngine.js).
export function fitText(text, base) {
  const len = (text || "").length;
  if (len <= 70) return base;
  const scale = Math.max(0.6, 70 / len);
  return Math.round(base * scale);
}

export function fitTitle(text, base) {
  const len = (text || "").length;
  if (len <= 24) return base;
  const scale = Math.max(0.55, 24 / len);
  return Math.round(base * scale);
}
