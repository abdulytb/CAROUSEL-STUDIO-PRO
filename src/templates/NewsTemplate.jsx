import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: News
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function NewsTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#FCFCFC", color: "#111", padding: 56, display: "flex", flexDirection: "column" }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "3px solid #111", paddingBottom: 14 }}>
    <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>{dna.badge}</span>
    <span style={{ fontSize: 16, color: "#B91C1C", fontWeight: 700 }}>EDISI HARI INI</span>
  </div>
  <TimelineMarker slide={slide} dna={dna} />
  <BigNumberMarker slide={slide} dna={dna} />
  <QuoteMarker slide={slide} dna={dna} />
  <MagazineMarker slide={slide} dna={dna} />
  <SidebarMarker slide={slide} dna={dna} />
  <BentoMarker slide={slide} dna={dna} />
  <CtaMarker slide={slide} dna={dna} />
  <div style={{ marginTop: 30, fontSize: slide.role === "hook" ? fitTitle(slide.title, 56) : fitTitle(slide.title, 44), fontWeight: 800, lineHeight: 1.2 }}>{slide.title}</div>
  <div style={{ marginTop: 6, width: 60, height: 4, background: "#B91C1C" }} />
  <div style={{ marginTop: 22, fontSize: fitText(slide.body, 27), lineHeight: 1.65, color: "#2E2E2E", borderTop: "1px solid #DDD", paddingTop: 20 }}>{slide.body}</div>
  <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid #DDD", fontSize: 16, color: "#777" }}>Hal. {String(index + 1).padStart(2, "0")} dari {String(total).padStart(2, "0")}</div>
</div>

  );
}
