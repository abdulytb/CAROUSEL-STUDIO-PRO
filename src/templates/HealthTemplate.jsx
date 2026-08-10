import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Health
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function HealthTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#F3FBF9", padding: 64, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  <div style={{ position: "absolute", top: 40, right: 40, width: 70, height: 70, borderRadius: "50%", background: `${dna.primaryColor}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Icon size={30} color={dna.primaryColor} />
  </div>
  <div>
    <div style={{ display: "inline-block", background: `${dna.primaryColor}1A`, color: dna.primaryColor, borderRadius: 999, padding: "8px 18px", fontSize: 20, fontWeight: 700 }}>{dna.badge}</div>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <StandardMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 32, fontSize: slide.role === "hook" ? fitTitle(slide.title, 56) : fitTitle(slide.title, 46), fontWeight: 700, color: "#173A34", lineHeight: 1.25 }}>{slide.title}</div>
    <div style={{ marginTop: 22, fontSize: fitText(slide.body, 28), lineHeight: 1.6, color: "#4E6B65" }}>{slide.body}</div>
  </div>
  <span style={{ fontSize: 20, color: "#8FA8A2", fontWeight: 600 }}>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
</div>

  );
}
