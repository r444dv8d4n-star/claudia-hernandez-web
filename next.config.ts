import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // El sitio se queda solo con La Bitácora: las direcciones del antiguo Blog llevan allí.
  async redirects() {
    return [
      { source: "/blog", destination: "/bitacora", permanent: false },
      { source: "/blog/:slug*", destination: "/bitacora", permanent: false },
    ];
  },
};

export default nextConfig;
