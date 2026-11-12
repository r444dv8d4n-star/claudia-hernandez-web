import { ImageResponse } from "next/og";

// Imagen que aparece al compartir el enlace en WhatsApp, Facebook o X.
export const alt = "Claudia Hernández · Concejala de Floridablanca 2024–2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#E3A92B", color: "#2A1240", fontFamily: "serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "70px 80px", width: "100%" }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: 700 }}>
            Concejala de Floridablanca · 2024–2027
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 112, fontWeight: 800, lineHeight: 1 }}>Claudia</div>
            <div style={{ display: "flex", fontSize: 112, fontWeight: 800, lineHeight: 1, fontStyle: "italic", color: "#5B2A8C" }}>Hernández</div>
          </div>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#2A1240", color: "#E3A92B", fontFamily: "sans-serif", fontSize: 30, fontWeight: 700, padding: "16px 34px", borderRadius: 999 }}>
            De aquí, como tú.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
