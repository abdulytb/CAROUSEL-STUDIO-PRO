import { detectCategory } from "../engines/categoryEngine.js";
import { detectFramework } from "../engines/frameworkEngine.js";
import { buildSlides } from "../engines/contentEngine.js";
import { generateHashtags } from "../engines/hashtagEngine.js";
import { generateCaptions } from "../engines/captionEngine.js";
import { generateCTA } from "../engines/ctaEngine.js";

// Local Provider — 100% offline, tanpa network call sama sekali. Ini yang
// dipakai kalau settings.provider === "local" (default aplikasi).
async function generateContent(settings, topic) {
  const category = detectCategory(topic);
  const framework = detectFramework(topic);
  const slides = buildSlides(topic, framework, category, settings?.slideCount);
  const hashtags = generateHashtags(topic, category);
  const captions = generateCaptions(topic, slides, hashtags);
  return { badge: null, slides, hashtags, captions };
}

export const localProvider = {
  generateContent,
  generateSlides: async (settings, topic) => (await generateContent(settings, topic)).slides,
  generateCaption: async (settings, topic) => (await generateContent(settings, topic)).captions,
  generateHashtags: async (settings, topic) => (await generateContent(settings, topic)).hashtags,
  generateCTA: (_settings, topic) => generateCTA(topic),
};
