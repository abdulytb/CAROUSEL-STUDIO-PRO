import React from "react";
import { SLIDE_W, SLIDE_H } from "../lib/slideStyle.js";

// Dipakai HANYA untuk slide hook (slide pertama) ketika dna.heroImage
// terisi (hasil AI image generation). Sengaja dibuat komponen TERPISAH
// dari 20 template di src/templates/ — supaya tidak perlu mengubah 20
// file itu satu-satu untuk mendukung background gambar. Kalau
// dna.heroImage kosong, SlideCanvas tetap pakai template biasa seperti
// sebelumnya (lihat SlideCanvas.jsx).
export default function HeroSlide({ slide, dna }) {
  return (
    <div
      style={{
        width: SLIDE_W, height: SLIDE_H, position: "relative", overflow: "hidden",
        fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff",
      }}
    >
      <img
        src={dna.heroImage}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      {/* Gradient gelap dari bawah supaya teks tetap kebaca di atas foto apa pun */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 32%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.25) 100%)",
        }}
      />
      <div style={{ position: "absolute", top: 56, left: 56 }}>
        <div
          style={{
            display: "inline-block", background: dna.accentColor, color: "#fff",
            borderRadius: 999, padding: "10px 22px", fontSize: 20, fontWeight: 800,
            letterSpacing: 1, boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
          }}
        >
          {dna.badge}
        </div>
      </div>
      <div style={{ position: "absolute", left: 56, right: 56, bottom: 64 }}>
        {slide.eyebrow && (
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1, opacity: 0.85, marginBottom: 10, textTransform: "uppercase" }}>
            {slide.eyebrow}
          </div>
        )}
        <div style={{ fontSize: 62, fontWeight: 900, lineHeight: 1.12, textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}>
          {slide.title}
        </div>
        {slide.body && (
          <div style={{ fontSize: 26, marginTop: 18, opacity: 0.92, lineHeight: 1.4, textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>
            {slide.body}
          </div>
        )}
      </div>
    </div>
  );
}
