import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Finance
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function FinanceTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: `linear-gradient(135deg, ${dna.primaryColor}, ${dna.secondaryColor})`, color: "#fff", padding: 64, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
  <div>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)", borderRadius: 999, padding: "10px 22px", fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>
      <Icon size={22} color="#fff" /> {dna.badge}
    </div>
    <div style={{ marginTop: 40, fontSize: slide.role === "body" ? 160 : 0, fontWeight: 800, opacity: 0.35, lineHeight: 1 }}>
      {slide.role === "body" ? slide.eyebrow.replace(/\D/g, "") : ""}
    </div>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ marginTop: slide.role === "body" ? 8 : 48, fontSize: slide.role === "hook" ? fitTitle(slide.title, 68) : fitTitle(slide.title, 52), fontWeight: 800, lineHeight: 1.15 }}>{slide.title}</div>
    <div style={{ marginTop: 24, fontSize: fitText(slide.body, 32), lineHeight: 1.5, color: "rgba(255,255,255,0.92)" }}>{slide.body}</div>
  </div>
  <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.85 }}>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
</div>

  );
}
