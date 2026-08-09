import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Minimal
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function MinimalTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#FCFCFA", padding: 72, display: "flex", flexDirection: "column", justifyContent: "center", border: `1px solid #EAEAE5` }}>
  <div style={{ fontSize: 20, letterSpacing: 3, color: dna.primaryColor, fontWeight: 600, textTransform: "uppercase" }}>{slide.eyebrow}</div>
  <div style={{ marginTop: 30, width: 60, height: 2, background: "#111" }} />
  <TimelineMarker slide={slide} dna={dna} />
  <BigNumberMarker slide={slide} dna={dna} />
  <QuoteMarker slide={slide} dna={dna} />
  <MagazineMarker slide={slide} dna={dna} />
  <SidebarMarker slide={slide} dna={dna} />
  <BentoMarker slide={slide} dna={dna} />
  <CtaMarker slide={slide} dna={dna} />
  <div style={{ marginTop: 34, fontSize: slide.role === "hook" ? fitTitle(slide.title, 58) : fitTitle(slide.title, 46), fontWeight: 400, lineHeight: 1.25, color: "#111" }}>{slide.title}</div>
  <div style={{ marginTop: 30, fontSize: fitText(slide.body, 28), lineHeight: 1.6, color: "#555", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>{slide.body}</div>
  <div style={{ position: "absolute", bottom: 48, right: 64, fontSize: 20, color: "#999" }}>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
</div>

  );
}
