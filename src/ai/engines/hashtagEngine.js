const CATEGORY_TAGS = {
  technology: ["#AITips", "#Teknologi", "#Digital", "#Produktivitas"],
  marketing: ["#DigitalMarketing", "#KontenViral", "#SocialMediaTips", "#Branding"],
  finance: ["#KeuanganPribadi", "#UMKM", "#FinancialTips", "#Investasi"],
  health: ["#HidupSehat", "#Wellness", "#TipsKesehatan"],
  education: ["#BelajarOnline", "#EdukasiDigital", "#SkillUp"],
  creator: ["#ContentCreator", "#PersonalBranding", "#KreatorDigital"],
  startup: ["#StartupIndonesia", "#Founder", "#BisnisDigital"],
  career: ["#KarirTips", "#DuniaKerja", "#ProduktivitasKerja"],
  business: ["#BisnisTips", "#Entrepreneur", "#StrategiBisnis"],
};

const STOPWORDS = new Set(["dan", "yang", "untuk", "dalam", "dari", "ke", "pada", "para", "di", "ini", "itu", "atau", "dengan", "cara", "kesalahan", "strategi"]);

export function generateHashtags(topic, category) {
  const words = topic
    .replace(/^\d+\s+/, "")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w.toLowerCase()));
  const topicTags = words.slice(0, 3).map((w) => "#" + w.replace(/[^a-zA-Z0-9]/g, ""));
  const catTags = CATEGORY_TAGS[category] || CATEGORY_TAGS.business;
  return Array.from(new Set([...catTags, ...topicTags])).slice(0, 8);
}
