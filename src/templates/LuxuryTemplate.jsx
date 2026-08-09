import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Luxury
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function LuxuryTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#0A0A0A", color: "#F5EFE0", padding: 70, display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid #C9A96633" }}>
  <div>
    <div style={{ fontSize: 18, letterSpacing: 5, color: "#C9A966", textTransform: "uppercase" }}>{dna.badge}</div>
    <div style={{ marginTop: 44, width: 48, height: 1, background: "#C9A966" }} />
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 40, fontSize: slide.role === "hook" ? fitTitle(slide.title, 58) : fitTitle(slide.title, 46), fontWeight: 400, lineHeight: 1.3, fontStyle: "italic" }}>{slide.title}</div>
    <div style={{ marginTop: 26, fontSize: fitText(slide.body, 27), lineHeight: 1.6, color: "#D9D2C4", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>{slide.body}</div>
  </div>
  <div style={{ textAlign: "center", fontSize: 18, letterSpacing: 3, color: "#8A8072" }}>{String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}</div>
</div>

  );
}
