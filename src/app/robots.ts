import type { MetadataRoute } from "next";

/** Reglas para buscadores: todo el sitio público sí; la red de referidos y la API no. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/registro", "/login", "/recuperar", "/nueva-clave", "/mi-red", "/admin", "/cuenta-eliminada", "/auth/", "/api/"] },
    sitemap: "https://claudia-hernandez-web.vercel.app/sitemap.xml",
  };
}
