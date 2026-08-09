import React from "react";
import { Download, Loader2 } from "lucide-react";
import { primaryBtnStyle, secondaryBtnStyle } from "./common.jsx";

export default function ExportPanel({
  onExportCurrent, onExportCurrentJpg, onExportAll, onExportZip, onExportPdf,
  exporting, exportError,
}) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
        <button onClick={onExportCurrent} disabled={exporting} style={secondaryBtnStyle}>
          <Download size={14} /> Slide Ini (PNG)
        </button>
        <button onClick={onExportCurrentJpg} disabled={exporting} style={secondaryBtnStyle}>
          <Download size={14} /> Slide Ini (JPG)
        </button>
        <button onClick={onExportAll} disabled={exporting} style={secondaryBtnStyle}>
          <Download size={14} /> Semua (PNG)
        </button>
        <button onClick={onExportZip} disabled={exporting} style={secondaryBtnStyle}>
          <Download size={14} /> Semua (ZIP)
        </button>
        <button onClick={onExportPdf} disabled={exporting} style={{ ...primaryBtnStyle, gridColumn: "1 / -1" }}>
          <Download size={14} /> Export PDF
        </button>
      </div>
      {exporting && (
        <div style={{ marginTop: 8, fontSize: 12, color: "#9BA0AC", display: "flex", alignItems: "center", gap: 6 }}>
          <Loader2 size={13} className="spin" /> Memproses slide...
        </div>
      )}
      {exportError && <div style={{ marginTop: 8, fontSize: 12, color: "#F87171" }}>{exportError}</div>}
    </>
  );
}
