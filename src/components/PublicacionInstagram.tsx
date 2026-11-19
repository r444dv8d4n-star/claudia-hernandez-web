"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { medir } from "@/lib/red/medir";

type Props = {
  url: string;
  titulo: string;
  portada?: { src: string; w: number; h: number; pos: string };
  cls: { caja: string; boton: string; frame: string; link: string };
};

/**
 * La publicación original de Claudia (fotos, video y su texto completo) dentro de la misma página.
 * Primero se ve la portada con ▶: Instagram solo se carga si la persona toca (más rápido y sin rastreo de entrada).
 * Debajo siempre queda el enlace por si el navegador bloquea Instagram.
 */
export default function PublicacionInstagram({ url, titulo, portada, cls }: Props) {
  const [abierta, setAbierta] = useState(false);
  const [ancho, setAncho] = useState(0);
  const [medido, setMedido] = useState(0);
  const [embed, setEmbed] = useState("");
  const caja = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  // Con estos datos (ancho y página) Instagram avisa cuánto mide su contenido.
  const abrir = () => {
    const w = Math.round(caja.current?.clientWidth ?? 540);
    setAncho(w);
    const q = new URLSearchParams({ cr: "1", v: "14", wp: String(w), rd: location.origin, rp: location.pathname });
    setEmbed(`${url.replace(/\/?$/, "/")}embed/captioned/?${q}#${encodeURIComponent(JSON.stringify({ ci: 0, os: 0 }))}`);
    setAbierta(true);
    medir("bitacora_ver_publicacion");
  };

  // Instagram avisa la altura de su contenido; así se ve completo, sin barra ni texto cortado.
  useEffect(() => {
    if (!abierta) return;
    const oir = (e: MessageEvent) => {
      if (!/^https:\/\/(www\.)?instagram\.com$/.test(e.origin) || e.source !== frame.current?.contentWindow) return;
      try {
        const d = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (d?.type === "MEASURE" && d.details?.height > 100) setMedido(Math.ceil(d.details.height));
      } catch {}
    };
    window.addEventListener("message", oir);
    return () => window.removeEventListener("message", oir);
  }, [abierta]);

  // Alto: lo que mide Instagram, pero nunca menos que la foto con su encabezado; si no avisa, foto + espacio para su texto.
  const minimo = Math.round(ancho * 1.25 + 200);
  const alto = medido ? Math.max(medido, minimo) : Math.round(ancho * 1.25 + 420);

  return (
    <div className={cls.caja} ref={caja}>
      {abierta ? (
        <iframe
          ref={frame}
          className={cls.frame}
          src={embed}
          title={`Publicación de Claudia en Instagram: ${titulo}`}
          style={{ height: alto }}
          allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
          allowFullScreen
        />
      ) : (
        <button type="button" className={cls.boton} onClick={abrir}
          aria-label={`Ver aquí las fotos, el video y el texto completo: ${titulo}`}>
          {portada && <Image src={portada.src} alt="" fill sizes="(max-width:700px) 92vw, 540px" style={{ objectFit: "cover", objectPosition: portada.pos }} />}
          <span aria-hidden="true">▶</span>
          <strong>Ver fotos, video y el texto completo</strong>
        </button>
      )}
      <a className={cls.link} href={url} target="_blank" rel="noopener noreferrer">¿No carga? Verla en Instagram ↗</a>
    </div>
  );
}
