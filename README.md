# AI Carousel Studio Pro

Buat carousel profesional untuk Instagram, LinkedIn, TikTok Slides, Facebook,
Threads, X, dan Pinterest secara otomatis dari satu baris topik — offline,
tanpa API wajib, tanpa biaya bulanan.

## Menjalankan di komputer sendiri

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build untuk production

```bash
npm run build
```

Hasilnya ada di folder `dist/` — upload ke Vercel, Netlify, cPanel, atau
hosting statis apa pun.

## Struktur folder

```
src/
├── ai/
│   ├── engines/         # Local AI Engine (V1) — 100% offline
│   │   ├── categoryEngine.js      deteksi niche dari topik
│   │   ├── colorEngine.js         palet warna per kategori
│   │   ├── iconEngine.js          pemetaan nama ikon -> komponen Lucide
│   │   ├── frameworkEngine.js     deteksi struktur konten
│   │   ├── hookEngine.js          kalimat pembuka
│   │   ├── ctaEngine.js           ajakan bertindak
│   │   ├── contentEngine.js       susunan slide (hook/body/cta)
│   │   ├── hashtagEngine.js       hashtag otomatis
│   │   ├── captionEngine.js       4 gaya caption
│   │   ├── layoutEngine.js        8 layout terikat Content Framework
│   │   └── designDNAEngine.js     20 template + Design DNA
│   └── providers/        # AI Connector (V2) — opsional, pakai API sendiri
│       ├── registry.js            metadata provider
│       ├── localProvider.js       bungkus engine lokal jadi "provider"
│       ├── geminiProvider.js
│       ├── groqProvider.js
│       ├── openrouterProvider.js
│       ├── promptUtils.js         prompt builder + proxy caller bersama
│       └── index.js               Fallback System (AI gagal -> Local Engine)
├── templates/             # 20 komponen template (1 file per template)
├── components/            # Komponen UI (form, renderer, panel export, dst)
├── pages/
│   └── Home.jsx            state utama & orkestrasi semua komponen
├── lib/
│   ├── hash.js              hash deterministik
│   ├── textFit.js           auto-shrink font supaya teks tidak terpotong
│   ├── slideStyle.js        style dasar slide (SLIDE_W/SLIDE_H, dll)
│   ├── exportEngine.js      PNG/PDF/ZIP — dibangun manual, tanpa library
│   └── storage.js           persistensi localStorage (opsional)
├── App.jsx
└── main.jsx                 entry point + registrasi service worker
```

## Mode PWA (Install as App + Offline)

`public/manifest.json` dan `public/service-worker.js` sudah disiapkan dan
otomatis aktif begitu di-deploy ke hosting HTTPS (localhost juga jalan).
Yang masih perlu kamu lengkapi:

- Isi `public/icons/` dengan `icon-192.png`, `icon-512.png`,
  `icon-maskable-192.png`, `icon-maskable-512.png` (lihat
  `public/icons/README.txt`).

Service worker sengaja **tidak** meng-cache panggilan ke
Gemini/Groq/OpenRouter/proxy — supaya hasil AI Connector selalu fresh, bukan
cache basi. Local AI Engine sendiri tidak butuh service worker sama sekali
untuk berjalan offline, karena semua logic ada di JavaScript sisi klien.

## AI Connector (V2) — opsional

Aplikasi berjalan 100% tanpa API secara default (Local Engine). Kalau user
ingin hasil yang lebih variatif, mereka bisa memasukkan API key sendiri
(Gemini / Groq / OpenRouter) lewat tombol Settings — **key tidak pernah
disimpan oleh aplikasi ini**, kecuali user secara eksplisit mencentang
"Ingat API key di perangkat ini".

### Proxy server (opsional, disarankan untuk Groq & OpenRouter)

Groq dan OpenRouter kadang memblokir request langsung dari browser (CORS).
`proxy-server/worker.js` adalah Cloudflare Worker siap-pakai:

1. Buka [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages
   → Create → Create Worker.
2. Tempel isi `proxy-server/worker.js`, klik Deploy.
3. Salin URL worker (`https://xxx.workers.dev`), tempel di Settings app →
   centang "Gunakan Proxy Server".

Worker ini hanya meneruskan request — tidak menyimpan, mencatat, atau
memakai ulang API key siapa pun.

## Menjual sebagai produk digital

Project ini didesain untuk dijual sebagai source code sekali-beli (Lynk,
Gumroad, dsb):

- Tidak ada dependency berbayar (semua library di `package.json` gratis/OSS).
- Tidak ada server wajib — `npm run build` menghasilkan static site murni.
- Tidak ada database cloud wajib — persistensi pakai `localStorage`.
- AI Connector 100% opsional dan pakai API key milik pembeli sendiri —
  penjual tidak menanggung biaya API pembeli.
