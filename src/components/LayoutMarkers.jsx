import React from "react";
import { ArrowRight } from "lucide-react";

// Marker ini murni ADITIF — cuma nambah elemen kecil sebelum judul,
// tidak mengubah struktur/warna/dekorasi template sama sekali. Dipanggil
// dari tiap file template.

export function TimelineMarker({ slide, dna }) {
  if (slide.role !== "body" || dna.layoutKey !== "timeline") return null;
  const num = (slide.eyebrow.match(/\d+/) || [])[0] || "";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <div style={{ width: 30, height: 30, borderRadius: "50%", background: dna.primaryColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, flexShrink: 0 }}>
        {num}
      </div>
      <div style={{ flex: 1, height: 2, background: `${dna.primaryColor}33` }} />
    </div>
  );
}

export function BigNumberMarker({ slide, dna }) {
  if (slide.role !== "body" || dna.layoutKey !== "bignumber") return null;
  const num = (slide.eyebrow.match(/\d+/) || [])[0] || "";
  if (!num) return null;
  return (
    <div style={{ fontSize: 90, fontWeight: 900, color: dna.primaryColor, opacity: 0.18, lineHeight: 1, marginBottom: -18 }}>
      {num}
    </div>
  );
}

export function QuoteMarker({ slide, dna }) {
  if (slide.role !== "body" || dna.layoutKey !== "quote") return null;
  return (
    <div style={{ fontSize: 64, fontWeight: 900, color: dna.accentColor, opacity: 0.5, lineHeight: 1, marginBottom: -6 }}>
      “
    </div>
  );
}

export function MagazineMarker({ slide, dna }) {
  if (slide.role !== "body" || dna.layoutKey !== "magazine") return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 24, height: 2, background: dna.accentColor, flexShrink: 0 }} />
      <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, color: dna.accentColor, textTransform: "uppercase" }}>
        {slide.eyebrow}
      </span>
    </div>
  );
}

export function SidebarMarker({ slide, dna }) {
  if (slide.role !== "body" || dna.layoutKey !== "sidebar") return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div style={{ width: 4, height: 28, borderRadius: 2, background: dna.accentColor, flexShrink: 0 }} />
      <span style={{ fontSize: 13, fontWeight: 700, color: dna.accentColor, textTransform: "uppercase", letterSpacing: 1 }}>
        {slide.eyebrow}
      </span>
    </div>
  );
}

export function BentoMarker({ slide, dna }) {
  if (slide.role !== "body" || dna.layoutKey !== "bento") return null;
  const num = (slide.eyebrow.match(/\d+/) || [])[0] || "";
  return (
    <div style={{ display: "inline-flex", width: 34, height: 34, borderRadius: 10, background: `${dna.primaryColor}22`, border: `1.5px solid ${dna.primaryColor}55`, color: dna.primaryColor, alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, marginBottom: 8 }}>
      {num}
    </div>
  );
}

// CTA style — beda dari 6 marker di atas: ini render untuk slide.role
// === "cta" (bukan "body"), jadi selalu tampil di slide penutup carousel
// APAPUN framework/layout-nya. Bikin slide CTA kerasa beda dari slide isi
// biasa: pill "tombol" dengan ikon panah, warna ikut Design DNA (jadi
// otomatis beda tiap kategori/template, bukan satu warna hardcoded).
export function CtaMarker({ slide, dna }) {
  if (slide.role !== "cta") return null;
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: dna.accentColor, color: "#fff", borderRadius: 999,
        padding: "9px 20px", fontSize: 13, fontWeight: 800,
        textTransform: "uppercase", letterSpacing: 1, marginBottom: 14,
        boxShadow: `0 8px 20px ${dna.accentColor}55`,
      }}
    >
      Aksi Selanjutnya <ArrowRight size={15} />
    </div>
  );
}
