import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Gradient
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function GradientTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: `linear-gradient(135deg, ${dna.primaryColor} 0%, ${dna.secondaryColor} 55%, ${dna.accentColor} 100%)`, color: "#fff", padding: 60, display: "flex", flexDirection: "column", justifyContent: "center" }}>
  <div style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.2)", borderRadius: 999, padding: "10px 20px", fontSize: 20, fontWeight: 700 }}>
    <Icon size={18} color="#fff" /> {dna.badge}
  </div>
  <TimelineMarker slide={slide} dna={dna} />
  <BigNumberMarker slide={slide} dna={dna} />
  <QuoteMarker slide={slide} dna={dna} />
  <MagazineMarker slide={slide} dna={dna} />
  <SidebarMarker slide={slide} dna={dna} />
  <BentoMarker slide={slide} dna={dna} />
  <CtaMarker slide={slide} dna={dna} />
  <div style={{ marginTop: 36, fontSize: slide.role === "hook" ? fitTitle(slide.title, 74) : fitTitle(slide.title, 56), fontWeight: 900, lineHeight: 1.08, textShadow: "0 6px 24px rgba(0,0,0,0.2)" }}>{slide.title}</div>
  <div style={{ marginTop: 24, fontSize: fitText(slide.body, 30), lineHeight: 1.5, color: "rgba(255,255,255,0.94)" }}>{slide.body}</div>
  <div style={{ position: "absolute", bottom: 40, right: 48, fontSize: 20, fontWeight: 700, opacity: 0.85 }}>{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</div>
</div>

  );
}
