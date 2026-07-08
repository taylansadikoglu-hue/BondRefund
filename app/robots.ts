import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/calculators/", "/guides/", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"],
        disallow: ["/api/", "/admin/", "/preview/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
