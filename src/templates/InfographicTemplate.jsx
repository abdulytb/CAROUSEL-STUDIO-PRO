import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Infographic
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function InfographicTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#0F172A", color: "#fff", padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  <div>
    <div style={{ fontSize: 130, fontWeight: 900, color: dna.accentColor, lineHeight: 1, opacity: 0.9 }}>{String(index + 1).padStart(2, "0")}</div>
    <div style={{ marginTop: 4, fontSize: 20, fontWeight: 700, letterSpacing: 2, color: dna.accentColor }}>{dna.badge}</div>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 24, fontSize: slide.role === "hook" ? fitTitle(slide.title, 54) : fitTitle(slide.title, 44), fontWeight: 800, lineHeight: 1.2 }}>{slide.title}</div>
    <div style={{ marginTop: 20, fontSize: fitText(slide.body, 27), lineHeight: 1.55, color: "#B8C2D9" }}>{slide.body}</div>
  </div>
  <div style={{ display: "flex", gap: 4 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ flex: 1, height: 8, borderRadius: 4, background: i <= index ? dna.accentColor : "#233047" }} />
    ))}
  </div>
</div>

  );
}
