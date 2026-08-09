import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Mode PWA: daftarkan service worker supaya app-shell bisa di-cache dan
// aplikasi tetap terbuka + Local AI Engine tetap jalan tanpa internet.
// Lihat public/service-worker.js — panggilan ke provider AI sengaja TIDAK
// di-cache di sana supaya hasil generate AI Connector selalu fresh.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch((err) => {
      console.warn("Service worker gagal didaftarkan:", err);
    });
  });
}
