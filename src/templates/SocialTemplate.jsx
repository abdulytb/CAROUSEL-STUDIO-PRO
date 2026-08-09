import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Social
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function SocialTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#fff", padding: 60, display: "flex", flexDirection: "column", justifyContent: "center" }}>
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 18, background: `linear-gradient(90deg, ${dna.primaryColor}, ${dna.secondaryColor})` }} />
  <div style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 10, background: `linear-gradient(90deg, ${dna.primaryColor}, ${dna.secondaryColor})`, color: "#fff", borderRadius: 999, padding: "14px 28px", fontSize: 24, fontWeight: 800 }}>
    <Icon size={24} color="#fff" /> {dna.badge}
  </div>
  <TimelineMarker slide={slide} dna={dna} />
  <BigNumberMarker slide={slide} dna={dna} />
  <QuoteMarker slide={slide} dna={dna} />
  <MagazineMarker slide={slide} dna={dna} />
  <SidebarMarker slide={slide} dna={dna} />
  <BentoMarker slide={slide} dna={dna} />
  <CtaMarker slide={slide} dna={dna} />
  <div style={{ marginTop: 44, fontSize: slide.role === "hook" ? fitTitle(slide.title, 76) : fitTitle(slide.title, 58), fontWeight: 900, lineHeight: 1.1, color: "#111" }}>{slide.title}</div>
  <div style={{ marginTop: 26, fontSize: fitText(slide.body, 34), lineHeight: 1.5, color: "#3A3A3A", fontWeight: 500 }}>{slide.body}</div>
  <div style={{ marginTop: 50, height: 8, width: 120, borderRadius: 8, background: dna.accentColor }} />
</div>

  );
}
