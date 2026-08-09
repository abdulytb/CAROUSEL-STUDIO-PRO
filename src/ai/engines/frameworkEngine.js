// Framework Engine — deteksi struktur konten dari topik. Total 11 framework:
// Listicle (Problem/How-to), Checklist, Case Study, Storytelling, Roadmap,
// PAS, Educational, Reasons, Comparison, Statistics, dan AIDA (fallback).
// Urutan pengecekan dari yang paling spesifik ke paling umum — supaya topik
// yang cocok beberapa pola tetap jatuh ke framework yang paling tepat.
export function detectFramework(topic) {
  const lower = topic.toLowerCase();
  const leadingNum = topic.match(/^(\d+)\s+/);
  const n = leadingNum ? parseInt(leadingNum[1], 10) : null;

  if (n && /(kesalahan|salah kaprah|dihindari)/.test(lower)) {
    return { type: "listicle-problem", n };
  }
  if (/(checklist|yang harus disiapkan|persiapan sebelum|sebelum memulai)/.test(lower)) {
    return { type: "checklist", n: n || 5 };
  }
  if (n && /(cara|tips|langkah|strategi|trik|rahasia|kunci)/.test(lower)) {
    return { type: "listicle-howto", n };
  }
  if (/(studi kasus|kisah sukses|bagaimana .* berhasil|cara .* sukses|rahasia sukses)/.test(lower)) {
    return { type: "case-study", n: n || 4 };
  }
  if (/(kisah|cerita|perjalanan|journey|transformasi)/.test(lower)) {
    return { type: "storytelling", n: n || 4 };
  }
  if (/(roadmap|peta jalan|tahapan|fase|dari nol|dari pemula|jadi mahir)/.test(lower)) {
    return { type: "roadmap", n: n || 4 };
  }
  if (/(mengatasi|cara mengatasi|solusi untuk|menghadapi|hadapi)/.test(lower)) {
    return { type: "pas", n: n || 4 };
  }
  if (/(memahami|mengenal|pengantar|dasar-dasar|penjelasan|apa itu)/.test(lower)) {
    return { type: "educational", n: n || 3 };
  }
  if (/(kenapa|mengapa|alasan)/.test(lower)) {
    return { type: "reasons", n: n || 3 };
  }
  if (/(vs\.?|dibanding|perbandingan|banding)/.test(lower)) {
    return { type: "comparison", n: n || 3 };
  }
  if (/(statistik|data menunjukkan|persen|%)/.test(lower)) {
    return { type: "statistics", n: n || 3 };
  }
  return { type: "aida", n: n || 3 };
}

export function extractCoreTopic(topic) {
  let t = topic.replace(/^\d+\s+/, "");
  t = t.replace(/^(cara|kesalahan|strategi|tips|langkah|alasan|kenapa|mengapa|checklist|roadmap|memahami|mengenal)\s+/i, "");
  return t.trim() || topic;
}
