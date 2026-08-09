import React from "react";

export function Section({ title, icon, children }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#E8E9ED", marginBottom: 10 }}>
        {icon} {title}
      </div>
      <div style={{ background: "#12151C", border: "1px solid #1E222B", borderRadius: 14, padding: 14 }}>{children}</div>
    </div>
  );
}

export function DnaRow({ label, value, swatch }) {
  return (
    <div style={{ background: "#0B0D12", border: "1px solid #1E222B", borderRadius: 8, padding: "8px 10px" }}>
      <div style={{ color: "#7A7F8C", fontSize: 10, textTransform: "uppercase" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2, color: "#E8E9ED", fontWeight: 600 }}>
        {swatch && <span style={{ width: 12, height: 12, borderRadius: 4, background: swatch, display: "inline-block" }} />}
        {value}
      </div>
    </div>
  );
}

export function captionLabel(key) {
  return { short: "Pendek", long: "Panjang", professional: "Profesional", social: "Sosial Media" }[key] || key;
}

export function chipStyle(active) {
  return {
    flex: "0 0 auto", padding: "8px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer",
    border: active ? "1px solid transparent" : "1px solid #262A34",
    background: active ? "linear-gradient(90deg,#8B5CF6,#EC4899)" : "#0B0D12",
    color: active ? "#fff" : "#9BA0AC", display: "flex", alignItems: "center", whiteSpace: "nowrap",
  };
}

export function navBtnStyle(disabled) {
  return {
    width: 36, height: 36, borderRadius: "50%", border: "1px solid #262A34", background: "#12151C",
    color: disabled ? "#4B5058" : "#E8E9ED", display: "flex", alignItems: "center", justifyContent: "center",
    cursor: disabled ? "default" : "pointer",
  };
}

export const primaryBtnStyle = {
  padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(90deg,#8B5CF6,#EC4899)",
  color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer",
};

export const secondaryBtnStyle = {
  padding: "12px", borderRadius: 10, border: "1px solid #262A34", background: "#12151C",
  color: "#E8E9ED", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer",
};

export const linkBtnStyle = {
  border: "none", background: "transparent", color: "#A78BFA", fontSize: 12, fontWeight: 600,
  display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer", padding: 0,
};
