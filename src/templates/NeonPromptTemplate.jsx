import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Neon Prompt Card
 * Terinspirasi gaya carousel "prompt AI" yang lagi ramai (bingkai neon
 * rounded + badge kotak angka). Struktur render 100% ngikutin pola 20
 * template lain (baseSlideStyle, fitTitle/fitText, LayoutMarkers) supaya
 * export PNG/JPG/PDF/ZIP otomatis kompatibel tanpa kerjaan tambahan.
 *
 * Warna neon-nya IKUT Design DNA (dna.primaryColor) — bukan hardcode hijau
 * — supaya tetap konsisten kalau kategori topik beda-beda warnanya.
 */
export default function NeonPromptTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);
  const neon = dna.primaryColor;
  // Badge kotak angka: ambil digit dari eyebrow kalau ada (mis. slide
  // listicle "Poin 3"), fallback ke ikon kategori kalau bukan angka.
  const num = (slide.eyebrow && slide.eyebrow.match(/\d+/) || [])[0];

  return (
    <div style={{ ...base, background: "#0A0A0A", color: "#fff", padding: 44, display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", bottom: 40, right: 48, fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.55)" }}>
        {String(index + 1)}/{String(total)}
      </div>

      <div
        style={{
          flex: 1, border: `2.5px solid ${neon}`, borderRadius: 32,
          boxShadow: `0 0 22px ${neon}80, inset 0 0 18px ${neon}26`,
          padding: 52, display: "flex", flexDirection: "column", justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex", alignSelf: "flex-start", alignItems: "center", justifyContent: "center",
            width: 48, height: 48, borderRadius: 12, background: neon, color: "#0A0A0A",
            fontSize: 24, fontWeight: 900, marginBottom: 22, flexShrink: 0,
          }}
        >
          {num || <Icon size={22} color="#0A0A0A" />}
        </div>

        <TimelineMarker slide={slide} dna={dna} />
        <BigNumberMarker slide={slide} dna={dna} />
        <QuoteMarker slide={slide} dna={dna} />
        <MagazineMarker slide={slide} dna={dna} />
        <SidebarMarker slide={slide} dna={dna} />
        <BentoMarker slide={slide} dna={dna} />
        <StandardMarker slide={slide} dna={dna} />
        <CtaMarker slide={slide} dna={dna} />

        <div style={{ fontSize: slide.role === "hook" ? fitTitle(slide.title, 62) : fitTitle(slide.title, 50), fontWeight: 900, lineHeight: 1.12 }}>
          {slide.title}
        </div>
        <div style={{ marginTop: 20, fontSize: fitText(slide.body, 26), lineHeight: 1.55, color: "rgba(255,255,255,0.82)" }}>
          {slide.body}
        </div>
      </div>
    </div>
  );
}
