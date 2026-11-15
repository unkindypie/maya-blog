import type { MetadataRoute } from "next";
import { getSeoPages } from "@/lib/page-catalog";
import { buildSitemap } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemap(await getSeoPages());
}
