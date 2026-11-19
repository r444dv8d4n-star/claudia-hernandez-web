import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Tarjeta que aparece al compartir un enlace de invitación (/registro?ref=…) por WhatsApp.
export const alt = "Soy de aquí, como tú · Te invito a la red de Claudia Hernández en Floridablanca";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const foto = await readFile(join(process.cwd(), "public/assets/og/claudia-invita.jpg"));
  const src = `data:image/jpeg;base64,${foto.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F7CD1E", color: "#2B2118", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 26, padding: "60px 70px", width: 680 }}>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 5, textTransform: "uppercase", fontWeight: 700, color: "#5B2A8C" }}>Te invito a la red de Claudia</div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "serif", fontWeight: 800, lineHeight: 1.02 }}>
            <div style={{ display: "flex", fontSize: 96 }}>De aquí,</div>
            <div style={{ display: "flex", fontSize: 96, fontStyle: "italic", color: "#5B2A8C" }}>como tú.</div>
          </div>
          <div style={{ display: "flex", fontSize: 32, lineHeight: 1.3, maxWidth: 560 }}>Vecinas, vecinos y amigos que se organizan por Floridablanca.</div>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#2B2118", color: "#F7CD1E", fontSize: 30, fontWeight: 800, padding: "16px 34px", borderRadius: 999 }}>
            Soy de aquí →
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={520} height={630} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    size,
  );
}
