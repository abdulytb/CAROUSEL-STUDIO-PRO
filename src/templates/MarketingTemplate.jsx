import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Marketing
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function MarketingTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#111", color: "#fff", display: "flex", flexDirection: "column" }}>
  <div style={{ background: `linear-gradient(90deg, ${dna.primaryColor}, ${dna.secondaryColor})`, padding: "36px 56px" }}>
    <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 1 }}>{dna.badge}</span>
  </div>
  <div style={{ flex: 1, padding: 56, display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <StandardMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ fontSize: slide.role === "hook" ? fitTitle(slide.title, 70) : fitTitle(slide.title, 54), fontWeight: 900, lineHeight: 1.1 }}>{slide.title}</div>
    <div style={{ marginTop: 24, fontSize: fitText(slide.body, 30), lineHeight: 1.5, color: "#C9C9C9" }}>{slide.body}</div>
  </div>
  <div style={{ height: 14, background: `linear-gradient(90deg, ${dna.secondaryColor}, ${dna.accentColor})` }} />
</div>

  );
}
