import React from "react";
import { TEMPLATE_COMPONENTS } from "../templates/index.js";
import ModernTemplate from "../templates/ModernTemplate.jsx";
import HeroSlide from "./HeroSlide.jsx";
import { setFontScale } from "../lib/textFit.js";

// Titik pusat "Template Engine" di sisi rendering: terima Design DNA,
// pilih komponen template yang sesuai dari registry, lalu render.
// Kalau templateKey tidak dikenali (data korup / provider AI aneh-aneh),
// jatuh ke ModernTemplate sebagai default aman.
//
// Pengecualian: slide dengan gambar AI dirender lewat HeroSlide, bukan
// template biasa — dua sumber gambar yang dicek:
// 1. slide.image — mode "Gambar AI di Semua Slide" (tiap slide beda gambar)
// 2. dna.heroImage pada slide hook — mode lama "Gambar AI di Slide Cover"
// (lihat catatan lengkap di HeroSlide.jsx).
//
// setFontScale(dna.fontScale) dipanggil di sini — SATU titik pusat —
// supaya fitur "Ukuran Teks" custom (lihat SIZE_OPTIONS di
// designDNAEngine.js) otomatis berlaku ke semua 21 template lewat
// fitTitle/fitText, tanpa perlu edit tiap file template satu-satu.
export default function SlideCanvas({ slide, dna, index, total }) {
  setFontScale(dna.fontScale);

    if (slide.image || (slide.role === "hook" && dna.heroImage)) {
        return <HeroSlide slide={slide} dna={dna} />;
          }
            const Template = TEMPLATE_COMPONENTS[dna.templateKey] || ModernTemplate;
              return <Template slide={slide} dna={dna} index={index} total={total} />;
              }
              