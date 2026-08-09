import { hashStr } from "../../lib/hash.js";

const CTA_POOL = [
  { title: "Simpan Postingan Ini", body: "Biar tidak lupa saat Anda membutuhkannya nanti." },
  { title: "Bagikan ke Teman Anda", body: "Mungkin ada yang sedang membutuhkan info ini." },
  { title: "Follow untuk Tips Berikutnya", body: "Konten seperti ini akan terus dibahas di sini." },
  { title: "Komentar Jika Setuju", body: "Ceritakan pengalaman Anda di kolom komentar." },
  { title: "Coba Terapkan Hari Ini", body: "Mulai dari langkah paling kecil dulu." },
];

export function generateCTA(topic) {
  const idx = hashStr(topic + "cta") % CTA_POOL.length;
  return CTA_POOL[idx];
}
