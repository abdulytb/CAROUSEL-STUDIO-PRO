import { extractCoreTopic } from "./frameworkEngine.js";

export function generateCaptions(topic, slides, hashtags) {
  const hook = slides[0].body;
  const cta = slides[slides.length - 1];
  const bulletLines = slides
    .filter((s) => s.role === "body")
    .map((s) => `• ${s.title}: ${s.body}`)
    .join("\n");

  const short = `${hook} Swipe untuk selengkapnya →`;
  const long = `${hook}\n\n${bulletLines}\n\n${cta.title}. ${cta.body}\n\n${hashtags.join(" ")}`;
  const professional = `Insight tentang ${extractCoreTopic(topic).toLowerCase()}: ${hook} Simak ringkasannya pada slide berikut untuk penerapan yang lebih terarah.\n\n${hashtags.slice(0, 5).join(" ")}`;
  const social = `${hook} 🔥\n\nSwipe ➡️ dan jangan lupa ${cta.title.toLowerCase()} ✨\n\n${hashtags.join(" ")}`;

  return { short, long, professional, social };
}
