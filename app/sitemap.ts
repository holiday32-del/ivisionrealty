import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/buy-with-us`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/list-with-us`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/appointment`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/resources`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/disclosures`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];
}
