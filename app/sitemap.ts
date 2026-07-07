import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators";
import { guides } from "@/lib/guides";
import { legalLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/guides", ...legalLinks.map((link) => link.href)];
  const calculatorPages = calculators.map((calculator) => `/calculators/${calculator.slug}`);
  const guidePages = guides.map((guide) => `/guides/${guide.slug}`);

  return [...staticPages, ...calculatorPages, ...guidePages].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path.includes("/guides/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path.includes("/calculators/") ? 0.9 : 0.7,
  }));
}
