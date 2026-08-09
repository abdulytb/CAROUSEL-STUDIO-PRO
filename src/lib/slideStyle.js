export const SLIDE_W = 1080;
export const SLIDE_H = 1350;

// Style pembungkus yang identik di semua template — posisi, ukuran penuh,
// dan font family dari Design DNA. Tiap template menimpa background/padding
// sendiri di atas ini.
export function baseSlideStyle(dna) {
  return {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    fontFamily: dna.fontFamily,
    boxSizing: "border-box",
  };
}

// Template dengan background gelap — dipakai untuk menyesuaikan warna
// placeholder di ThumbnailNavigator supaya tidak "putih polos" saat preview.
export const DARK_TEMPLATES = new Set([
  "dark", "luxury", "technology", "marketing", "startup", "infographic",
]);
