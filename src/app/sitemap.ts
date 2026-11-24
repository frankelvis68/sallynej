import { MetadataRoute } from "next";
import { PROPERTIES } from "@/data/properties";
import { SAMPLE_PROPERTIES } from "@/data/sample";
import { SITE } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.contact.siteUrl || "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Include property slugs
  const allProperties = [...PROPERTIES, ...SAMPLE_PROPERTIES];
  const propertyPages: MetadataRoute.Sitemap = allProperties.map((p) => ({
    url: `${baseUrl}/properties/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...propertyPages];
}
