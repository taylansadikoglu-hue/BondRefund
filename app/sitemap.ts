import type { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators";
import { guides } from "@/lib/guides";
import { isIndexableGuide } from "@/lib/index-policy";
import { legalLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/guides", "/tools/bond-deduction-evidence-checker", ...legalLinks.map((link) => link.href)];
  const calculatorPages = calculators.map((calculator) => `/calculators/${calculator.slug}`);
  const guidePages = guides.filter((guide) => isIndexableGuide(guide.slug)).map((guide) => `/guides/${guide.slug}`);

  return [...staticPages, ...calculatorPages, ...guidePages].map((path) => ({
    url: `${site.url}${path}`,
    // Guides and the evidence checker were updated on 26 November 2026.
    lastModified: new Date(path.startsWith("/guides/") || path.startsWith("/tools/") ? "2026-11-26" : "2026-09-15"),
    changeFrequency: path.includes("/guides/") ? "monthly" : "weekly",
    priority: path === "" ? 1 : path.includes("/calculators/") ? 0.9 : 0.7,
  }));
}
