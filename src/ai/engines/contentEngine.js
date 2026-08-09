import { hashStr } from "../../lib/hash.js";
import { CATEGORIES } from "./categoryEngine.js";
import { extractCoreTopic } from "./frameworkEngine.js";
import { generateHook } from "./hookEngine.js";
import { generateCTA } from "./ctaEngine.js";

/* ------------------------------ Item pools ------------------------------ */

const TIP_ITEMS = [
  { title: "Mulai dari Langkah Kecil", body: "Mulai dari langkah kecil yang bisa dilakukan konsisten setiap hari." },
  { title: "Fokus Satu Perubahan Dulu", body: "Fokus pada satu perubahan dulu sebelum menambah yang lain." },
  { title: "Ukur Progresnya", body: "Ukur hasilnya secara berkala agar tahu progresnya." },
  { title: "Libatkan Orang Terdekat", body: "Libatkan tim atau orang terdekat supaya lebih konsisten." },
  { title: "Pakai Tools yang Tepat", body: "Gunakan tools yang tepat untuk mempercepat prosesnya." },
  { title: "Evaluasi Secara Rutin", body: "Evaluasi ulang setiap minggu untuk melihat apa yang berhasil." },
  { title: "Catat Setiap Prosesnya", body: "Catat prosesnya supaya bisa dievaluasi di kemudian hari." },
];

const MISTAKE_ITEMS = [
  { title: "Tidak Punya Rencana", body: "Tidak punya rencana yang jelas sejak awal." },
  { title: "Mengabaikan Data", body: "Mengabaikan data dan hanya mengandalkan insting." },
  { title: "Lupa Gambaran Besar", body: "Terlalu fokus pada hal kecil, lupa gambaran besar." },
  { title: "Tidak Konsisten", body: "Tidak konsisten dalam menjalankan strategi." },
  { title: "Enggan Belajar dari Kegagalan", body: "Enggan belajar dari kegagalan sebelumnya." },
  { title: "Tidak Melibatkan Orang Lain", body: "Tidak melibatkan orang lain untuk masukan." },
  { title: "Menunda Eksekusi", body: "Menunda eksekusi karena menunggu kondisi sempurna." },
];

const REASON_ITEMS = [
  { title: "Hasilnya Lebih Cepat", body: "Karena hasilnya terasa lebih cepat dibanding cara lama." },
  { title: "Lebih Mudah Diukur", body: "Karena lebih mudah diukur dan dievaluasi." },
  { title: "Bisa Disesuaikan", body: "Karena bisa disesuaikan dengan kebutuhan masing-masing." },
  { title: "Risikonya Lebih Kecil", body: "Karena risikonya lebih kecil jika dijalankan bertahap." },
  { title: "Didukung Kebiasaan Terbukti", body: "Karena didukung kebiasaan yang sudah terbukti berhasil." },
];

const COMPARISON_ITEMS = [
  { title: "Cara Lama Lebih Lambat", body: "Cara lama butuh waktu lebih lama untuk hasil yang sama." },
  { title: "Cara Baru Lebih Fleksibel", body: "Cara baru lebih fleksibel untuk kebutuhan yang berubah-ubah." },
  { title: "Biaya Lebih Efisien", body: "Biaya yang dikeluarkan bisa jauh lebih efisien." },
  { title: "Lebih Mudah Dipantau", body: "Hasilnya lebih mudah dipantau secara berkala." },
];

const STAT_ITEMS = [
  { title: "Pola yang Sering Terlewat", body: "Banyak yang mengalami hal ini tapi jarang menyadarinya." },
  { title: "Muncul Berulang Kali", body: "Pola ini sering muncul berulang di berbagai kondisi." },
  { title: "Dampaknya Menumpuk", body: "Semakin sering dibiarkan, dampaknya semakin terasa." },
  { title: "Perubahan Kecil, Dampak Besar", body: "Perubahan kecil di sini biasanya berdampak cukup besar." },
];

const CHECKLIST_ITEMS = [
  { title: "Tujuan yang Jelas", body: "Pastikan sudah tahu target akhirnya sebelum mulai." },
  { title: "Sumber Daya Siap", body: "Cek semua yang dibutuhkan sudah tersedia dari awal." },
  { title: "Rencana Cadangan", body: "Siapkan opsi B kalau rencana utama tidak berjalan mulus." },
  { title: "Waktu yang Realistis", body: "Alokasikan waktu yang masuk akal, jangan terlalu mepet." },
  { title: "Cara Mengukur Berhasil", body: "Tentukan dari awal, tolok ukur keberhasilannya apa." },
];

const ROADMAP_STAGE_ITEMS = [
  { title: "Fondasi Dasar", body: "Mulai dari memahami dasar-dasarnya dulu sebelum lanjut ke tahap berikutnya." },
  { title: "Latihan Konsisten", body: "Latih secara rutin supaya dasarnya benar-benar kuat." },
  { title: "Eksekusi Nyata", body: "Mulai terapkan langsung ke situasi yang sesungguhnya." },
  { title: "Evaluasi & Perbaikan", body: "Tinjau ulang hasilnya, perbaiki bagian yang belum optimal." },
  { title: "Scaling Lebih Jauh", body: "Setelah stabil, mulai perbesar skala atau tingkatkan levelnya." },
];

const PAS_PROBLEM_ITEMS = [
  { title: "Masalah yang Sering Diabaikan", body: "Banyak yang menyadari masalah ini terlambat, setelah dampaknya membesar." },
  { title: "Titik Masalah Utama", body: "Ini akar masalah yang paling sering bikin progres jalan di tempat." },
  { title: "Yang Bikin Stuck", body: "Kalau dibiarkan, ini yang paling sering menahan kemajuan." },
];

const PAS_AGITATE_ITEMS = [
  { title: "Kalau Dibiarkan", body: "Masalah kecil ini bisa membesar dan lebih sulit diperbaiki nanti." },
  { title: "Dampaknya Menumpuk", body: "Semakin lama ditunda, semakin besar juga biaya untuk memperbaikinya." },
  { title: "Risiko yang Mengintai", body: "Tanpa penanganan, ini bisa memengaruhi hal lain yang lebih besar." },
];

const STORY_STAGES = [
  { label: "Awal Cerita", items: [
    { title: "Titik Berangkat", body: "Semua dimulai dari kondisi yang biasa-biasa saja, belum ada yang istimewa." },
    { title: "Kondisi Sebelumnya", body: "Di titik ini, semuanya masih terasa berat dan belum menemukan caranya." },
  ]},
  { label: "Tantangan Muncul", items: [
    { title: "Ujian Pertama", body: "Sampai akhirnya muncul tantangan yang memaksa untuk berubah." },
    { title: "Masa Paling Sulit", body: "Ini bagian paling berat — banyak yang menyerah di titik ini." },
  ]},
  { label: "Titik Balik", items: [
    { title: "Keputusan Penting", body: "Ada satu keputusan kecil yang akhirnya mengubah arah segalanya." },
    { title: "Mulai Terlihat Hasil", body: "Perlahan, usaha yang konsisten mulai menunjukkan hasil." },
  ]},
  { label: "Hasil Akhir", items: [
    { title: "Sampai di Titik Ini", body: "Prosesnya panjang, tapi hasilnya jauh lebih baik dari titik awal." },
    { title: "Pelajaran yang Didapat", body: "Yang terpenting bukan hasil akhirnya saja, tapi proses untuk sampai ke sana." },
  ]},
];

const CASE_STUDY_STAGES = [
  { label: "Latar Belakang", items: [
    { title: "Kondisi Awal", body: "Sebelum menerapkan strategi ini, kondisinya masih jauh dari ideal." },
    { title: "Titik Berangkat", body: "Semua bermula dari masalah yang cukup umum dialami banyak orang." },
  ]},
  { label: "Tantangan", items: [
    { title: "Hambatan Utama", body: "Tantangan terbesarnya bukan soal teori, tapi konsistensi menjalankannya." },
    { title: "Yang Paling Sulit", body: "Bagian tersulit adalah bertahan di fase belum terlihat hasil." },
  ]},
  { label: "Strategi", items: [
    { title: "Langkah yang Diambil", body: "Strateginya sederhana: fokus pada satu hal dulu sebelum menambah yang lain." },
    { title: "Pendekatan yang Dipakai", body: "Pendekatannya lebih ke eksekusi bertahap, bukan perubahan drastis sekaligus." },
  ]},
  { label: "Hasil", items: [
    { title: "Hasil yang Dicapai", body: "Hasilnya baru terlihat signifikan setelah dijalankan secara konsisten." },
    { title: "Yang Berubah", body: "Perubahan paling besar justru terasa di kebiasaan, bukan cuma angka." },
  ]},
];

const EDUCATIONAL_STAGES = [
  { label: "Definisi", items: [
    { title: "Apa Itu Sebenarnya", body: "Sebelum masuk lebih jauh, penting memahami definisi dasarnya dulu." },
  ]},
  { label: "Konsep Kunci", items: [
    { title: "Konsep yang Wajib Dipahami", body: "Ini bagian inti yang jadi dasar dari semua penerapannya." },
  ]},
  { label: "Contoh Penerapan", items: [
    { title: "Contoh di Kehidupan Nyata", body: "Biar lebih mudah dipahami, begini gambaran penerapannya sehari-hari." },
  ]},
];

function pick(pool, seed, i) {
  // Hash ulang gabungan seed+index (bukan seed + i*step) supaya index yang
  // dipilih tidak kebetulan collision dengan panjang pool tertentu — rumus
  // lama (hash(seed) + i*7) % pool.length menghasilkan index yang SAMA
  // terus kalau pool.length kebetulan 7 (i*7 selalu habis dibagi 7).
  return pool[hashStr(`${seed}::${i}`) % pool.length];
}

/* --------------------------- Body slide builders --------------------------- */

// Framework "numbered": listicle-problem, listicle-howto, checklist, reasons,
// comparison, statistics, roadmap, dan aida (fallback) — semuanya berbentuk
// N slide dari satu pool, dengan prefix eyebrow yang beda-beda.
//
// desiredBody: kalau user pilih jumlah slide manual (bukan "Auto"), angka
// ini menang mutlak dibanding hasil deteksi otomatis dari teks topik (n).
function buildNumberedBody(topic, n, pool, prefix, coreTopic, { checklistStyle = false, desiredBody = null } = {}) {
  const bodyCount = desiredBody || Math.min(Math.max(n || 3, 3), 5);
  const overflow = !desiredBody && n && n > 5 ? n - (bodyCount - 1) : 0;
  const slides = [];
  for (let i = 1; i <= bodyCount; i++) {
    const isLast = i === bodyCount;
    const item = pick(pool, topic, i);
    let body = item.body;
    if (isLast && overflow > 0) {
      body += ` Masih ada ${overflow} poin lain seputar ${coreTopic.toLowerCase()} yang tak kalah penting.`;
    }
    slides.push({
      role: "body",
      eyebrow: `${prefix} ${i}`,
      title: checklistStyle ? `☑ ${item.title}` : item.title,
      body,
    });
  }
  return slides;
}

// Framework PAS (Problem-Agitate-Solution): 1 slide masalah, 1 slide dampak,
// lalu sisanya solusi (jumlah menyesuaikan n, atau desiredBody kalau diisi).
function buildPasBody(topic, n, coreTopic, desiredBody) {
  const solutionCount = desiredBody
    ? Math.max(1, desiredBody - 2)
    : Math.min(Math.max((n || 4) - 2, 1), 3);
  const problem = pick(PAS_PROBLEM_ITEMS, topic, 1);
  const agitate = pick(PAS_AGITATE_ITEMS, topic, 1);
  const slides = [
    { role: "body", eyebrow: "Masalah", title: problem.title, body: problem.body },
    { role: "body", eyebrow: "Dampaknya", title: agitate.title, body: agitate.body },
  ];
  for (let i = 1; i <= solutionCount; i++) {
    const item = pick(TIP_ITEMS, topic, i + 10);
    slides.push({ role: "body", eyebrow: `Solusi ${i}`, title: item.title, body: item.body });
  }
  return slides;
}

// Framework berbasis tahap tetap (Storytelling, Case Study, Educational) —
// jumlah tahap sudah punya struktur cerita sendiri (nggak bisa dikarang
// nambah tahap baru begitu saja), jadi desiredBody di sini hanya memotong
// (cap), bukan menambah tahap.
function buildStageBody(topic, stages, desiredBody) {
  const useStages = desiredBody ? stages.slice(0, Math.max(1, desiredBody)) : stages;
  return useStages.map((stage, idx) => {
    const item = pick(stage.items, topic, idx);
    return { role: "body", eyebrow: stage.label, title: item.title, body: item.body };
  });
}

function buildBodySlides(framework, topic, coreTopic, desiredBody) {
  switch (framework.type) {
    case "listicle-problem":
      return buildNumberedBody(topic, framework.n, MISTAKE_ITEMS, "Kesalahan", coreTopic, { desiredBody });
    case "listicle-howto":
      return buildNumberedBody(topic, framework.n, TIP_ITEMS, "Langkah", coreTopic, { desiredBody });
    case "checklist":
      return buildNumberedBody(topic, framework.n, CHECKLIST_ITEMS, "Checklist", coreTopic, { checklistStyle: true, desiredBody });
    case "reasons":
      return buildNumberedBody(topic, framework.n, REASON_ITEMS, "Alasan", coreTopic, { desiredBody });
    case "comparison":
      return buildNumberedBody(topic, framework.n, COMPARISON_ITEMS, "Poin", coreTopic, { desiredBody });
    case "statistics":
      return buildNumberedBody(topic, framework.n, STAT_ITEMS, "Fakta", coreTopic, { desiredBody });
    case "roadmap":
      return buildNumberedBody(topic, framework.n, ROADMAP_STAGE_ITEMS, "Tahap", coreTopic, { desiredBody });
    case "pas":
      return buildPasBody(topic, framework.n, coreTopic, desiredBody);
    case "storytelling":
      return buildStageBody(topic, STORY_STAGES, desiredBody);
    case "case-study":
      return buildStageBody(topic, CASE_STUDY_STAGES, desiredBody);
    case "educational":
      return buildStageBody(topic, EDUCATIONAL_STAGES, desiredBody);
    default: // aida
      return buildNumberedBody(topic, framework.n, TIP_ITEMS, "Poin", coreTopic, { desiredBody });
  }
}

// totalSlides: opsional. Kalau diisi (user pilih jumlah slide manual, bukan
// "Auto"), ini TOTAL slide termasuk hook+CTA — menang mutlak dibanding
// deteksi otomatis dari angka di teks topik ("7 Cara...", dst).
export function buildSlides(topic, framework, category, totalSlides) {
  const coreTopic = extractCoreTopic(topic);
  const catLabel = CATEGORIES[category].label;
  const desiredBody = totalSlides ? Math.max(1, totalSlides - 2) : null;

  const slides = [];
  slides.push({
    role: "hook",
    eyebrow: catLabel,
    title: coreTopic,
    body: generateHook(topic, coreTopic),
  });

  slides.push(...buildBodySlides(framework, topic, coreTopic, desiredBody));

  const cta = generateCTA(topic);
  slides.push({ role: "cta", eyebrow: "CTA", title: cta.title, body: cta.body });

  return slides;
}
