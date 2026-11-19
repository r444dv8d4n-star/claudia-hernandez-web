import type { MetadataRoute } from "next";
import { published } from "@/content/blog";

const SITIO = "https://claudia-hernandez-web.vercel.app";

/** Mapa del sitio para Google: páginas públicas y cada entrada de la Bitácora (la red no aparece). */
export default function sitemap(): MetadataRoute.Sitemap {
  const ultima = published[0]?.date ?? "2026-11-01";
  const fijas: MetadataRoute.Sitemap = [
    { url: SITIO, lastModified: ultima, changeFrequency: "weekly", priority: 1 },
    { url: `${SITIO}/historia`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITIO}/logros`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITIO}/proyectos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITIO}/bitacora`, lastModified: ultima, changeFrequency: "weekly", priority: 0.9 },
  ];
  return fijas.concat(published.map((p) => ({ url: `${SITIO}/bitacora/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })));
}
