import { hashStr } from "../../lib/hash.js";

const HOOK_TEMPLATES = [
  (t) => `Tahukah Anda? ${t} bisa mengubah hasil kerja Anda mulai hari ini.`,
  (t) => `90% orang melewatkan hal penting soal ${t}.`,
  (t) => `Kesalahan terbesar soal ${t} adalah tidak memulainya dari sini.`,
  (t) => `Berhenti scroll. Ini yang perlu Anda tahu tentang ${t}.`,
  (t) => `Strategi yang jarang dibahas soal ${t}, tapi terbukti efektif.`,
  (t) => `Banyak orang gagal karena mengabaikan hal ini soal ${t}.`,
];

export function generateHook(topic, coreTopic) {
  const idx = hashStr(topic) % HOOK_TEMPLATES.length;
  return HOOK_TEMPLATES[idx](coreTopic.toLowerCase());
}
