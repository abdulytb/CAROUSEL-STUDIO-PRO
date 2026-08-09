import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Modern
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function ModernTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: `linear-gradient(160deg, #fff 0%, #fff 60%, ${dna.primaryColor}11 100%)`, padding: 60, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
<div>
  <div style={{ width: 84, height: 84, borderRadius: 24, background: `linear-gradient(135deg, ${dna.primaryColor}, ${dna.secondaryColor})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 28px ${dna.primaryColor}44` }}>
    <Icon size={38} color="#fff" />
  </div>
  <div style={{ marginTop: 32, display: "inline-block", background: `${dna.primaryColor}14`, color: dna.primaryColor, borderRadius: 999, padding: "8px 20px", fontSize: 22, fontWeight: 700 }}>{dna.badge}</div>
  <TimelineMarker slide={slide} dna={dna} />
  <BigNumberMarker slide={slide} dna={dna} />
  <QuoteMarker slide={slide} dna={dna} />
  <MagazineMarker slide={slide} dna={dna} />
  <SidebarMarker slide={slide} dna={dna} />
  <BentoMarker slide={slide} dna={dna} />
  <CtaMarker slide={slide} dna={dna} />
  <div style={{ marginTop: 30, fontSize: slide.role === "hook" ? fitTitle(slide.title, 66) : fitTitle(slide.title, 52), fontWeight: 800, color: "#15181F", lineHeight: 1.15 }}>{slide.title}</div>
  <div style={{ marginTop: 24, fontSize: fitText(slide.body, 31), lineHeight: 1.55, color: "#565C6B" }}>{slide.body}</div>
</div>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <div style={{ display: "flex", gap: 6 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ width: i === index ? 24 : 8, height: 8, borderRadius: 4, background: i === index ? dna.primaryColor : "#E2E4EA", transition: "all .2s" }} />
    ))}
  </div>
  <span style={{ fontSize: 22, color: "#9AA0AC", fontWeight: 600 }}>{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
</div>
</div>
  
  );
}
