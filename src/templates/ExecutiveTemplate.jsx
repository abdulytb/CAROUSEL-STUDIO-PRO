import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Executive
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function ExecutiveTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#F9F8F5", padding: 64, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  <div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", border: `2px solid ${dna.primaryColor}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={dna.primaryColor} />
      </div>
      <span style={{ fontSize: 18, letterSpacing: 2, color: dna.primaryColor, fontWeight: 700, textTransform: "uppercase" }}>{dna.badge}</span>
    </div>
    <div style={{ marginTop: 34, width: 70, height: 2, background: "#C9A24B" }} />
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 28, fontSize: slide.role === "hook" ? fitTitle(slide.title, 54) : fitTitle(slide.title, 44), fontWeight: 400, lineHeight: 1.3, color: "#1B2430" }}>{slide.title}</div>
    <div style={{ marginTop: 22, fontSize: fitText(slide.body, 27), lineHeight: 1.6, color: "#4B5563", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>{slide.body}</div>
  </div>
  <div style={{ fontSize: 18, color: "#8A8F99" }}>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
</div>

  );
}
