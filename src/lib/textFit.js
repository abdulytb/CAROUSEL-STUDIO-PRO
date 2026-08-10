// Ukuran font dasar di tiap template dirancang untuk teks pendek. Kalau AI
// Connector atau variasi lokal menghasilkan kalimat lebih panjang dari
// perkiraan, dua fungsi ini mengecilkan font secara proporsional supaya
// teks tidak terpotong di luar batas slide (fixed 1080x1350px, overflow
// hidden — lihat SLIDE_W/SLIDE_H di designDNAEngine.js).
//
// currentScale: faktor skala GLOBAL dari pilihan "Ukuran Teks" user (lihat
// SIZE_OPTIONS di designDNAEngine.js). Disetel SEKALI per slide oleh
// SlideCanvas.jsx sebelum render — bukan diedit manual di 21 file template,
// supaya fitur ukuran custom otomatis berlaku ke semua template tanpa
// risiko regresi dari nyentuh banyak file sekaligus.
let currentScale = 1;

export function setFontScale(scale) {
  currentScale = typeof scale === "number" && scale > 0 ? scale : 1;
}

export function fitText(text, base) {
  const b = base * currentScale;
  const len = (text || "").length;
  if (len <= 70) return Math.round(b);
  const scale = Math.max(0.6, 70 / len);
  return Math.round(b * scale);
}

export function fitTitle(text, base) {
  const b = base * currentScale;
  const len = (text || "").length;
  if (len <= 24) return Math.round(b);
  const scale = Math.max(0.55, 24 / len);
  return Math.round(b * scale);
}
