// Persistensi lokal sederhana (localStorage) — tidak butuh database cloud
// sama sekali, sesuai visi produk "one-time purchase, bukan SaaS".
//
// PENTING soal API key: secara default API key AI Connector TIDAK disimpan
// permanen (hilang saat tab ditutup) demi keamanan. User bisa mengaktifkan
// "Ingat API key di perangkat ini" secara eksplisit di Settings kalau mereka
// memang menganggap perangkatnya aman (dipakai sendiri) — baru saat itu key
// ikut ditulis ke localStorage.

const KEYS = {
  SETTINGS: "acsp:settings",
  TEMPLATE_OVERRIDE: "acsp:templateOverride",
};

function safeGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage bisa gagal (mode private/incognito, kuota penuh, dst) —
    // aplikasi tetap harus jalan normal tanpa persistensi kalau ini terjadi.
  }
}

export function loadSettings() {
  const saved = safeGet(KEYS.SETTINGS);
  if (!saved) return null;
  // Kalau user tidak mengaktifkan "ingat API key", jangan pernah kembalikan
  // apiKey dari storage walau somehow tersimpan dari versi lama.
  if (!saved.rememberApiKey) return { ...saved, apiKey: "" };
  return saved;
}

export function saveSettings(settings) {
  const toSave = settings.rememberApiKey
    ? settings
    : { ...settings, apiKey: "" }; // jangan tulis apiKey ke disk kalau user tidak minta
  safeSet(KEYS.SETTINGS, toSave);
}

export function loadTemplateOverride() {
  return safeGet(KEYS.TEMPLATE_OVERRIDE) || "auto";
}

export function saveTemplateOverride(value) {
  safeSet(KEYS.TEMPLATE_OVERRIDE, value);
}
