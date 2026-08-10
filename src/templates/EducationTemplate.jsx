import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Education
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function EducationTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#FFF9EE", padding: 64, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  <div>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: dna.primaryColor, color: "#fff", borderRadius: 14, padding: "10px 20px", fontSize: 20, fontWeight: 700 }}>
      <Icon size={18} color="#fff" /> {dna.badge}
    </div>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <StandardMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 34, fontSize: slide.role === "hook" ? fitTitle(slide.title, 58) : fitTitle(slide.title, 46), fontWeight: 800, color: "#2A2A2A", lineHeight: 1.25 }}>{slide.title}</div>
    <div style={{ marginTop: 22, fontSize: fitText(slide.body, 28), lineHeight: 1.6, color: "#5C5648", borderLeft: `3px dashed ${dna.secondaryColor}`, paddingLeft: 18 }}>{slide.body}</div>
  </div>
  <div style={{ display: "flex", gap: 6 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ width: i === index ? 22 : 10, height: 10, borderRadius: "50%", background: i === index ? dna.primaryColor : "#E8DFC8" }} />
    ))}
  </div>
</div>

  );
}
