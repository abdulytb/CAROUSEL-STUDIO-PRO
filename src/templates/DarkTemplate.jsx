import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Dark
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function DarkTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#0B0D12", color: "#F5F5F7", padding: 64, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  <div style={{ position: "absolute", top: -120, right: -120, width: 340, height: 340, borderRadius: "50%", background: `radial-gradient(circle, ${dna.accentColor}55, transparent 70%)` }} />
  <div>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#181B22", border: `1px solid ${dna.accentColor}55`, borderRadius: 999, padding: "10px 20px", color: dna.accentColor, fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>
      <Icon size={22} color={dna.accentColor} /> {slide.eyebrow}
    </div>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <StandardMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 48, fontSize: slide.role === "hook" ? fitTitle(slide.title, 72) : fitTitle(slide.title, 56), fontWeight: 800, lineHeight: 1.1, color: "#fff" }}>{slide.title}</div>
    <div style={{ marginTop: 28, fontSize: fitText(slide.body, 32), lineHeight: 1.5, color: "#B8BCC6" }}>{slide.body}</div>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#6B7280" }}>
    <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
    <span style={{ color: dna.accentColor, fontWeight: 700 }}>{dna.badge}</span>
  </div>
</div>

  );
}
