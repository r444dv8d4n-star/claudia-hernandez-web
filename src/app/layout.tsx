import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://claudia-hernandez-web.vercel.app"),
  title: { default: "Claudia Hernández · Concejala de Floridablanca", template: "%s · Claudia Hernández" },
  description:
    "Claudia Hernández: concejala de Floridablanca (2024–2027), abogada, mamá y líder social. Conoce su trabajo con mujeres, emprendedoras y comunidades.",
  // La imagen para compartir la genera app/opengraph-image.tsx
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Claudia Hernández",
    title: "Claudia Hernández · Concejala de Floridablanca",
    description: "Concejala, abogada, mamá y líder social. Creciendo con mujeres soñadoras y emprendedoras.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7CD1E" },
    { media: "(prefers-color-scheme: dark)", color: "#1A0B29" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Aplica el tema guardado antes de pintar para que no parpadee. Por defecto: claro.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <noscript><style>{`.rv{opacity:1!important;transform:none!important;clip-path:none!important}[data-collage]{display:none!important}`}</style></noscript>
        {children}
      </body>
    </html>
  );
}
