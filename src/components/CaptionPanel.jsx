import React from "react";
import { LayoutGrid, Check, Copy } from "lucide-react";
import { Section, captionLabel, linkBtnStyle } from "./common.jsx";

export default function CaptionPanel({ captions, copied, onCopy }) {
  return (
    <Section title="Caption" icon={<LayoutGrid size={14} />}>
      {Object.entries(captions).map(([key, text]) => (
        <div key={key} style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#9BA0AC", textTransform: "uppercase" }}>{captionLabel(key)}</span>
            <button onClick={() => onCopy(text, key)} style={linkBtnStyle}>
              {copied === key ? <Check size={12} /> : <Copy size={12} />}
            </button>
          </div>
          <div style={{ marginTop: 4, fontSize: 13, color: "#C7CAD1", whiteSpace: "pre-wrap", background: "#12151C", border: "1px solid #1E222B", borderRadius: 10, padding: 10, lineHeight: 1.5 }}>{text}</div>
        </div>
      ))}
    </Section>
  );
}
