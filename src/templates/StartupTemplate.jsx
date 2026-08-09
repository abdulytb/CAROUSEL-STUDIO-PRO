import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Startup
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function StartupTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#0E1030", color: "#fff", padding: 60, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  <div style={{ position: "absolute", bottom: -60, left: -60, width: 260, height: 260, background: `linear-gradient(135deg, ${dna.primaryColor}, transparent)`, borderRadius: "50%", opacity: 0.5 }} />
  <div>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${dna.primaryColor}33`, borderRadius: 10, padding: "9px 18px", fontSize: 20, fontWeight: 700, color: dna.accentColor }}>
      <Icon size={18} color={dna.accentColor} /> {dna.badge}
    </div>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 34, fontSize: slide.role === "hook" ? fitTitle(slide.title, 62) : fitTitle(slide.title, 48), fontWeight: 800, lineHeight: 1.15 }}>{slide.title}</div>
    <div style={{ marginTop: 24, fontSize: fitText(slide.body, 29), lineHeight: 1.55, color: "#B7BBDD" }}>{slide.body}</div>
  </div>
  <span style={{ fontSize: 20, color: dna.accentColor, fontWeight: 700 }}>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
</div>

  );
}
