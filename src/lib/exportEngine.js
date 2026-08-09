import { SLIDE_W, SLIDE_H } from "./slideStyle.js";

/* ============================== EXPORT ENGINE (Canvas, no external libs) ==============================
   Semua export (PNG/PDF/ZIP) dibangun manual di sini — tanpa html2canvas,
   jsPDF, atau JSZip — supaya aplikasi tetap "tanpa dependency wajib" sesuai
   visi produk. Triknya: DOM slide di-serialize ke SVG <foreignObject>, lalu
   di-drawImage ke <canvas> asli browser.
   ========================================================================== */

export async function nodeToCanvas(node) {
  // node selalu di-render pada resolusi native SLIDE_W x SLIDE_H (lihat
  // CarouselRenderer.jsx — wrapper preview men-scale tampilan lewat CSS
  // transform, tapi node aslinya tetap full resolusi berapa pun ukuran
  // layar, supaya hasil export selalu tajam).
  const width = SLIDE_W;
  const height = SLIDE_H;

  const clone = node.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  clone.style.margin = "0";
  clone.style.transform = "none";

  const serialized = new XMLSerializer().serializeToString(clone);
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%">${serialized}</foreignObject></svg>`;

  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function exportNodeAsPng(node, filename) {
  const canvas = await nodeToCanvas(node);
  downloadBlob(await new Promise((res) => canvas.toBlob(res, "image/png")), filename);
}

export async function exportNodeAsJpg(node, filename, quality = 0.92) {
  const canvas = await nodeToCanvas(node);
  downloadBlob(await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality)), filename);
}

/* ---- PDF builder (no library): embeds JPEG frames directly via DCTDecode ---- */

export function dataUrlToUint8(dataUrl) {
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function buildPdfFromJpegs(jpegDataUrls, pxWidth, pxHeight) {
  const ptW = Math.round(pxWidth * 0.75);
  const ptH = Math.round(pxHeight * 0.75);
  const n = jpegDataUrls.length;
  const encoder = new TextEncoder();

  const parts = [];
  const offsets = {};
  let pos = 0;
  const add = (bytesOrStr) => {
    const bytes = typeof bytesOrStr === "string" ? encoder.encode(bytesOrStr) : bytesOrStr;
    parts.push(bytes);
    pos += bytes.length;
  };

  add("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n");

  const pageIds = [], imgIds = [], contentIds = [];
  let nextId = 3;
  for (let i = 0; i < n; i++) { pageIds.push(nextId++); imgIds.push(nextId++); contentIds.push(nextId++); }

  offsets[1] = pos;
  add(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`);

  offsets[2] = pos;
  add(`2 0 obj\n<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${n} >>\nendobj\n`);

  for (let i = 0; i < n; i++) {
    const imgBytes = dataUrlToUint8(jpegDataUrls[i]);

    offsets[pageIds[i]] = pos;
    add(`${pageIds[i]} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${ptW} ${ptH}] /Resources << /XObject << /Im0 ${imgIds[i]} 0 R >> >> /Contents ${contentIds[i]} 0 R >>\nendobj\n`);

    offsets[imgIds[i]] = pos;
    add(`${imgIds[i]} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pxWidth} /Height ${pxHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes.length} >>\nstream\n`);
    add(imgBytes);
    add(`\nendstream\nendobj\n`);

    const contentStream = `q ${ptW} 0 0 ${ptH} 0 0 cm /Im0 Do Q`;
    offsets[contentIds[i]] = pos;
    add(`${contentIds[i]} 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`);
  }

  const xrefStart = pos;
  const totalObjs = 2 + n * 3;
  add(`xref\n0 ${totalObjs + 1}\n0000000000 65535 f \n`);
  for (let id = 1; id <= totalObjs; id++) {
    add(`${String(offsets[id] || 0).padStart(10, "0")} 00000 n \n`);
  }
  add(`trailer\n<< /Size ${totalObjs + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);

  return new Blob(parts, { type: "application/pdf" });
}

/* ---- ZIP builder (no library): STORE method (no compression) ---- */

let crc32Table = null;
function crc32(data) {
  if (!crc32Table) {
    crc32Table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crc32Table[n] = c >>> 0;
    }
  }
  let crc = 0 ^ -1;
  for (let i = 0; i < data.length; i++) crc = (crc >>> 8) ^ crc32Table[(crc ^ data[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function u16(n) { return new Uint8Array([n & 0xff, (n >> 8) & 0xff]); }
function u32(n) { return new Uint8Array([n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff]); }
function concatUint8(arrays) {
  const total = arrays.reduce((n, a) => n + a.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const a of arrays) { out.set(a, off); off += a.length; }
  return out;
}

export function buildZip(files) {
  const now = new Date();
  const dosTime = ((now.getHours() & 0x1f) << 11) | ((now.getMinutes() & 0x3f) << 5) | ((Math.floor(now.getSeconds() / 2)) & 0x1f);
  const dosDate = (((now.getFullYear() - 1980) & 0x7f) << 9) | (((now.getMonth() + 1) & 0xf) << 5) | (now.getDate() & 0x1f);
  const encoder = new TextEncoder();

  const localParts = [], centralParts = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name);
    const crc = crc32(file.data);
    const size = file.data.length;

    const localHeader = concatUint8([
      u32(0x04034b50), u16(20), u16(0), u16(0), u16(dosTime), u16(dosDate),
      u32(crc), u32(size), u32(size), u16(nameBytes.length), u16(0), nameBytes,
    ]);
    localParts.push(localHeader, file.data);

    const centralHeader = concatUint8([
      u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(dosTime), u16(dosDate),
      u32(crc), u32(size), u32(size), u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0),
      u32(0), u32(offset), nameBytes,
    ]);
    centralParts.push(centralHeader);

    offset += localHeader.length + file.data.length;
  }

  const centralStart = offset;
  const centralSize = centralParts.reduce((n, p) => n + p.length, 0);
  const end = concatUint8([
    u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length),
    u32(centralSize), u32(centralStart), u16(0),
  ]);

  return new Blob([...localParts, ...centralParts, end], { type: "application/zip" });
}
