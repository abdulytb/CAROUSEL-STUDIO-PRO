import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DARK_TEMPLATES } from "../lib/slideStyle.js";
import { navBtnStyle } from "./common.jsx";

export default function ThumbnailNavigator({ slides, activeIndex, setActiveIndex, dna }) {
  return (
    <>
      {/* Prev/Next */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 12 }}>
        <button onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} style={navBtnStyle(activeIndex === 0)}>
          <ChevronLeft size={18} />
        </button>
        <span style={{ fontSize: 13, color: "#9BA0AC" }}>{activeIndex + 1} / {slides.length}</span>
        <button onClick={() => setActiveIndex(Math.min(slides.length - 1, activeIndex + 1))} disabled={activeIndex === slides.length - 1} style={navBtnStyle(activeIndex === slides.length - 1)}>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: "flex", gap: 8, marginTop: 14, overflowX: "auto", padding: "4px 2px" }}>
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              flex: "0 0 auto", width: 46, height: 58, borderRadius: 8, cursor: "pointer",
              border: i === activeIndex ? `2px solid ${dna.primaryColor}` : "2px solid #262A34",
              background: DARK_TEMPLATES.has(dna.templateKey) ? "#0B0D12" : "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: i === activeIndex ? dna.primaryColor : "#6B7280",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
