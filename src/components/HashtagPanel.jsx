import React from "react";
import { Hash, Check, Copy } from "lucide-react";
import { Section, linkBtnStyle } from "./common.jsx";

export default function HashtagPanel({ hashtags, copied, onCopy }) {
  return (
    <Section title="Hashtag" icon={<Hash size={14} />}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {hashtags.map((h) => (
          <span key={h} style={{ background: "#1A1D24", border: "1px solid #262A34", borderRadius: 999, padding: "6px 12px", fontSize: 12, color: "#C7CAD1" }}>{h}</span>
        ))}
      </div>
      <button onClick={() => onCopy(hashtags.join(" "), "tags")} style={{ ...linkBtnStyle, marginTop: 10 }}>
        {copied === "tags" ? <Check size={13} /> : <Copy size={13} />} {copied === "tags" ? "Tersalin" : "Salin semua hashtag"}
      </button>
    </Section>
  );
}
