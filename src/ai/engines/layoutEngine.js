// Layout Engine — bagian dari Design Engine lokal (V1), TIDAK bergantung ke
// AI Connector. Framework dideteksi dari topik mentah (frameworkEngine.js),
// jadi layout ini otomatis berlaku sama persis baik hasil dari Local Engine
// maupun dari provider AI manapun.
//
// Pendekatan: layout tidak dipilih manual/acak lepas dari konten (beda dari
// rencana awal di brief). Layout ditentukan LANGSUNG dari Content Framework
// yang sudah terdeteksi — supaya susunan visual selalu match dengan bentuk
// kontennya, bukan kombinasi acak yang kebetulan cocok.
//
// STATUS: 8 dari 13 layout di brief awal sudah diimplementasi (di bawah).
// Belum ada: Comparison/Split Screen (butuh restrukturisasi data jadi
// pasangan before/after di contentEngine.js, bukan cuma marker tambahan),
// Infographic, dan Sidebar Right sebagai varian terpisah dari Sidebar.
// Tidak ada kode/stub setengah-jadi untuk ini — kalau mau dilanjutkan,
// mulai dari nol mengikuti pola TimelineMarker/BigNumberMarker dkk di
// components/LayoutMarkers.jsx.
export const LAYOUTS = {
  standard: "Hero Center",
  timeline: "Timeline",
  bignumber: "Statistics",
  checklist: "Checklist",
  quote: "Quote",
  magazine: "Magazine",
  sidebar: "Sidebar",
  bento: "Bento Grid",
};

const FRAMEWORK_TO_LAYOUT = {
  roadmap: "timeline",
  statistics: "bignumber",
  checklist: "checklist",
  storytelling: "quote",
  "case-study": "magazine",
  pas: "sidebar",
  reasons: "bento",
};

export function detectLayoutKey(frameworkType) {
  return FRAMEWORK_TO_LAYOUT[frameworkType] || "standard";
}

export function layoutLabel(layoutKey) {
  return LAYOUTS[layoutKey] || LAYOUTS.standard;
}
