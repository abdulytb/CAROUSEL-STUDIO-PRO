import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: PersonalBranding
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function PersonalBrandingTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#FBF3E9", padding: 60, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
  <div style={{ width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${dna.primaryColor}, ${dna.secondaryColor})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Icon size={36} color="#fff" />
  </div>
  <div style={{ marginTop: 24, fontSize: 18, letterSpacing: 3, color: dna.primaryColor, textTransform: "uppercase", fontFamily: "'Segoe UI', system-ui, sans-serif", fontWeight: 700 }}>{dna.badge}</div>
  <TimelineMarker slide={slide} dna={dna} />
  <BigNumberMarker slide={slide} dna={dna} />
  <QuoteMarker slide={slide} dna={dna} />
  <MagazineMarker slide={slide} dna={dna} />
  <SidebarMarker slide={slide} dna={dna} />
  <BentoMarker slide={slide} dna={dna} />
  <StandardMarker slide={slide} dna={dna} />
  <CtaMarker slide={slide} dna={dna} />
  <div style={{ marginTop: 26, fontSize: slide.role === "hook" ? fitTitle(slide.title, 52) : fitTitle(slide.title, 42), fontWeight: 400, lineHeight: 1.3, color: "#241C12" }}>{slide.title}</div>
  <div style={{ marginTop: 22, fontSize: fitText(slide.body, 26), lineHeight: 1.6, color: "#6B5D4C", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>{slide.body}</div>
  <div style={{ marginTop: 30, fontSize: 18, color: "#A3927A" }}>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
</div>

  );
}
