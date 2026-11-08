import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://claudia-hernandez-web.vercel.app"),
  title: { default: "Claudia Hernández · Concejala de Floridablanca", template: "%s · Claudia Hernández" },
  description:
    "Claudia Hernández: concejala de Floridablanca (2024–2027), abogada, mamá y líder social. Conoce su trabajo con mujeres, emprendedoras y comunidades.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Claudia Hernández",
    title: "Claudia Hernández · Concejala de Floridablanca",
    description: "Concejala, abogada, mamá y líder social. Creciendo con mujeres soñadoras y emprendedoras.",
    images: [{ url: "/assets/img/retrato-camisa-morada.webp", width: 1200, height: 800, alt: "Claudia Hernández, concejala de Floridablanca" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#4B1F78", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>
        <noscript><style>{`.rv{opacity:1!important;transform:none!important;clip-path:none!important}[data-collage]{display:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
