/**
 * AI CAROUSEL STUDIO PRO — Service Worker
 * ------------------------------------------------------------------
 * Strategi: cache-first untuk app shell (HTML/CSS/JS) supaya aplikasi
 * tetap terbuka dan Local AI Engine tetap berfungsi 100% tanpa internet.
 * Panggilan ke provider AI (Gemini/Groq/OpenRouter) SENGAJA tidak di-cache
 * — request itu harus selalu live ke jaringan agar hasilnya tidak basi.
 */

const CACHE_NAME = "carousel-studio-pro-v1";

// Sesuaikan daftar ini dengan nama file build production Anda
// (contoh untuk Vite: /assets/index-xxxx.js, /assets/index-xxxx.css).
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

function isAIProviderRequest(url) {
  return (
    url.includes("generativelanguage.googleapis.com") ||
    url.includes("api.groq.com") ||
    url.includes("openrouter.ai") ||
    url.includes("workers.dev") // proxy server milik user
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (isAIProviderRequest(request.url)) return; // selalu network, jangan di-cache

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});
