import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Corporate
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function CorporateTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#F7F8FA", padding: 0, display: "flex", flexDirection: "column" }}>
  <div style={{ background: dna.primaryColor, color: "#fff", padding: "40px 56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, fontWeight: 700, letterSpacing: 1 }}>
      <Icon size={26} color={dna.accentColor} /> {dna.badge}
    </div>
    <span style={{ fontSize: 22, opacity: 0.8 }}>{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
  </div>
  <div style={{ padding: "56px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <StandardMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ fontSize: slide.role === "hook" ? fitTitle(slide.title, 64) : fitTitle(slide.title, 50), fontWeight: 800, color: "#111827", lineHeight: 1.15 }}>{slide.title}</div>
    <div style={{ marginTop: 26, fontSize: fitText(slide.body, 30), lineHeight: 1.55, color: "#4B5563" }}>{slide.body}</div>
    <div style={{ marginTop: 40, height: 6, width: 90, background: dna.accentColor }} />
  </div>
</div>

  );
}
