import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Solo en el servidor de pruebas: permite abrirlo desde el celular conectado al mismo WiFi (192.168.x.x).
  allowedDevOrigins: ["192.168.*.*"],
  // El sitio se queda solo con La Bitácora: las direcciones del antiguo Blog llevan allí.
  async redirects() {
    return [
      { source: "/blog", destination: "/bitacora", permanent: false },
      { source: "/blog/:slug*", destination: "/bitacora", permanent: false },
    ];
  },
};

export default nextConfig;
