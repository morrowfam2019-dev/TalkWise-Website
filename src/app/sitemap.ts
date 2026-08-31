import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Public, indexable routes only. Auth + dashboard are excluded by design. */
const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/how-talkwise-helps", priority: 0.9, changeFrequency: "monthly" },
  { path: "/speech-academy", priority: 0.9, changeFrequency: "monthly" },
  { path: "/talkwise-play", priority: 0.9, changeFrequency: "monthly" },
  { path: "/esl-academy", priority: 0.9, changeFrequency: "monthly" },
  { path: "/parent-training", priority: 0.9, changeFrequency: "monthly" },
  { path: "/interactive-speech-adventures", priority: 0.8, changeFrequency: "monthly" },
  { path: "/membership", priority: 0.9, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.8, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/partner", priority: 0.6, changeFrequency: "monthly" },
  { path: "/affiliates", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/updates", priority: 0.5, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
