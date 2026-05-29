import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/catalog", "/rooms", "/delivery", "/about", "/faq", "/contacts", "/privacy", "/manager"];
  const staticPages = routes.map((route) => ({ url: `${site.url}${route}`, lastModified: new Date() }));
  const productPages = products.map((product) => ({ url: `${site.url}/catalog/${product.slug}`, lastModified: new Date() }));
  return [...staticPages, ...productPages];
}
