import React from "react";
import { TEMPLATE_COMPONENTS } from "../templates/index.js";
import ModernTemplate from "../templates/ModernTemplate.jsx";
import HeroSlide from "./HeroSlide.jsx";

// Titik pusat "Template Engine" di sisi rendering: terima Design DNA,
// pilih komponen template yang sesuai dari registry, lalu render.
// Kalau templateKey tidak dikenali (data korup / provider AI aneh-aneh),
// jatuh ke ModernTemplate sebagai default aman.
//
// Pengecualian: slide hook (pertama) dengan dna.heroImage terisi (hasil AI
// image generation) dirender lewat HeroSlide, bukan template biasa —
// lihat catatan di HeroSlide.jsx.
export default function SlideCanvas({ slide, dna, index, total }) {
  if (slide.role === "hook" && dna.heroImage) {
    return <HeroSlide slide={slide} dna={dna} />;
  }
  const Template = TEMPLATE_COMPONENTS[dna.templateKey] || ModernTemplate;
  return <Template slide={slide} dna={dna} index={index} total={total} />;
}
