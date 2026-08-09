import React from "react";
import { TEMPLATE_COMPONENTS } from "../templates/index.js";
import ModernTemplate from "../templates/ModernTemplate.jsx";

// Titik pusat "Template Engine" di sisi rendering: terima Design DNA,
// pilih komponen template yang sesuai dari registry, lalu render.
// Kalau templateKey tidak dikenali (data korup / provider AI aneh-aneh),
// jatuh ke ModernTemplate sebagai default aman.
export default function SlideCanvas({ slide, dna, index, total }) {
  const Template = TEMPLATE_COMPONENTS[dna.templateKey] || ModernTemplate;
  return <Template slide={slide} dna={dna} index={index} total={total} />;
}
