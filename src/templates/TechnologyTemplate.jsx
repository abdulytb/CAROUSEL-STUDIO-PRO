import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Technology
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function TechnologyTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#070B14", backgroundImage: "linear-gradient(rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px", color: "#E4F4FF", padding: 60, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  <div>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${dna.accentColor}`, color: dna.accentColor, padding: "8px 16px", fontSize: 18, fontWeight: 700 }}>
      <Icon size={16} color={dna.accentColor} /> &gt; {dna.badge}
    </div>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <StandardMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 36, fontSize: slide.role === "hook" ? fitTitle(slide.title, 58) : fitTitle(slide.title, 46), fontWeight: 700, lineHeight: 1.2, color: "#fff" }}>{slide.title}</div>
    <div style={{ marginTop: 22, fontSize: fitText(slide.body, 26), lineHeight: 1.6, color: "#8FB4CE" }}>{slide.body}</div>
  </div>
  <div style={{ fontSize: 18, color: dna.accentColor }}>[{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}]</div>
</div>

  );
}
