import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Business
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function BusinessTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#F4F5F7", padding: "60px 60px 60px 84px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 16, background: dna.primaryColor }} />
  <div>
    <div style={{ fontSize: 20, fontWeight: 700, color: dna.primaryColor, letterSpacing: 2 }}>{dna.badge}</div>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 26, fontSize: slide.role === "hook" ? fitTitle(slide.title, 60) : fitTitle(slide.title, 48), fontWeight: 800, color: "#111827", lineHeight: 1.2 }}>{slide.title}</div>
    <div style={{ marginTop: 22, fontSize: fitText(slide.body, 29), lineHeight: 1.55, color: "#4B5563" }}>{slide.body}</div>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #D8DAE0", paddingTop: 20 }}>
    <Icon size={26} color={dna.primaryColor} />
    <span style={{ fontSize: 20, color: "#8A8F99", fontWeight: 600 }}>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
  </div>
</div>

  );
}
