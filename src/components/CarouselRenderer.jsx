import React from "react";
import { SLIDE_W, SLIDE_H } from "../lib/slideStyle.js";
import SlideCanvas from "./SlideCanvas.jsx";

// Slide selalu di-render pada resolusi native SLIDE_W x SLIDE_H (1080x1350)
// supaya hasil export selalu tajam — wrapper ini yang men-scale TAMPILANNYA
// saja lewat CSS transform, mengikuti lebar layar yang tersedia.
export default function CarouselRenderer({
  slide, dna, index, total, previewScale, previewWrapRef, slideRef,
}) {
  return (
    <div
      ref={previewWrapRef}
      style={{
        borderRadius: dna.radius,
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        aspectRatio: `${SLIDE_W}/${SLIDE_H}`,
        maxWidth: 360,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: `scale(${previewScale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <div ref={slideRef} style={{ width: SLIDE_W, height: SLIDE_H }}>
          <SlideCanvas slide={slide} dna={dna} index={index} total={total} />
        </div>
      </div>
    </div>
  );
}
