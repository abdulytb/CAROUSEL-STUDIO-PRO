import React from "react";
import { Briefcase } from "lucide-react";
import { ICONS } from "../ai/engines/iconEngine.js";
import { fitText, fitTitle } from "../lib/textFit.js";
import { baseSlideStyle } from "../lib/slideStyle.js";
import { TimelineMarker, BigNumberMarker, QuoteMarker, MagazineMarker, SidebarMarker, BentoMarker, StandardMarker, CtaMarker } from "../components/LayoutMarkers.jsx";

/**
 * Template: Ecommerce
 * Auto-extracted dari versi monolitik — logika & style asli dipertahankan
 * persis, hanya dibungkus jadi komponen mandiri.
 */
export default function EcommerceTemplate({ slide, dna, index, total }) {
  const Icon = ICONS[dna.icon] || Briefcase;
  const base = baseSlideStyle(dna);

  return (
<div style={{ ...base, background: "#fff", padding: 56, display: "flex", flexDirection: "column", justifyContent: "space-between", border: "2px dashed #E5E7EB" }}>
  <div style={{ position: "absolute", top: 28, right: -6, background: dna.primaryColor, color: "#fff", padding: "8px 22px 8px 16px", fontSize: 18, fontWeight: 800, borderRadius: "6px 0 0 6px" }}>{dna.badge}</div>
  <div style={{ marginTop: 40 }}>
    <TimelineMarker slide={slide} dna={dna} />
    <BigNumberMarker slide={slide} dna={dna} />
    <QuoteMarker slide={slide} dna={dna} />
    <MagazineMarker slide={slide} dna={dna} />
    <SidebarMarker slide={slide} dna={dna} />
    <BentoMarker slide={slide} dna={dna} />
    <StandardMarker slide={slide} dna={dna} />
    <CtaMarker slide={slide} dna={dna} />
    <div style={{ fontSize: slide.role === "hook" ? fitTitle(slide.title, 58) : fitTitle(slide.title, 46), fontWeight: 800, color: "#111", lineHeight: 1.2 }}>{slide.title}</div>
    <div style={{ marginTop: 22, fontSize: fitText(slide.body, 28), lineHeight: 1.6, color: "#525252" }}>{slide.body}</div>
  </div>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px dashed #E5E7EB", paddingTop: 18 }}>
    <Icon size={26} color={dna.primaryColor} />
    <span style={{ fontSize: 20, color: "#9CA3AF", fontWeight: 700 }}>{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
  </div>
</div>

  );
}
