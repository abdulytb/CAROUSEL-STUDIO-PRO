import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Glass
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function GlassTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: `linear-gradient(135deg, ${dna.primaryColor}, ${dna.secondaryColor}, ${dna.accentColor})`, padding: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
  <div style={{ position: "absolute", top: -100, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.25)", filter: "blur(10px)" }} />
  <div style={{ position: "relative", width: "100%", background: "rgba(255,255,255,0.16)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 32, padding: 48, color: "#fff" }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.25)", borderRadius: 999, padding: "8px 18px", fontSize: 20, fontWeight: 700 }}>
      <Icon size={20} color="#fff" /> {dna.badge}
    </div>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <StandardMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: 30, fontSize: slide.role === "hook" ? fitTitle(slide.title, 58) : fitTitle(slide.title, 46), fontWeight: 800, lineHeight: 1.2 }}>{slide.title}</div>
    <div style={{ marginTop: 22, fontSize: fitText(slide.body, 28), lineHeight: 1.55, color: "rgba(255,255,255,0.9)" }}>{slide.body}</div>
    <div style={{ marginTop: 30, fontSize: 20, opacity: 0.85 }}>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
  </div>
</div>

  );
}
