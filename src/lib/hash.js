// Hash string sederhana & deterministik. Dipakai beberapa engine (hook, cta,
// content) supaya topik yang sama selalu menghasilkan variasi yang sama,
// tapi topik berbeda cenderung dapat variasi berbeda — tanpa perlu random
// state atau seed eksternal.
export function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
