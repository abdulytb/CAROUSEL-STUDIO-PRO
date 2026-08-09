import React from "react";
import { Palette } from "lucide-react";
import { Section, DnaRow } from "./common.jsx";

export default function DesignDnaPanel({ dna }) {
  return (
    <Section title="Design DNA" icon={<Palette size={14} />}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
        <DnaRow label="Badge" value={dna.badge} />
        <DnaRow label="Template" value={dna.template} />
        <DnaRow label="Layout" value={dna.layout} />
        <DnaRow label="Kategori" value={dna.category} />
        <DnaRow label="Primary" value={dna.primaryColor} swatch={dna.primaryColor} />
        <DnaRow label="Secondary" value={dna.secondaryColor} swatch={dna.secondaryColor} />
      </div>
    </Section>
  );
}
