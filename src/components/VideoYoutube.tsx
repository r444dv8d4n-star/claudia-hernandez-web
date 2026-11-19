"use client";

import { useState } from "react";
import Image from "next/image";

type Props = { id: string; titulo: string; href: string; portada: string; cls: { frame: string; play: string; link: string } };

/**
 * Video a prueba de fallos: primero se ve la portada con un botón ▶ (carga al instante y no depende de YouTube);
 * al tocarla se abre el reproductor. Debajo siempre queda el enlace a YouTube por si el navegador bloquea el reproductor.
 */
export default function VideoYoutube({ id, titulo, href, portada, cls }: Props) {
  const [jugando, setJugando] = useState(false);
  return (
    <>
      <div className={cls.frame}>
        {jugando ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
            title={titulo}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className={cls.play} onClick={() => setJugando(true)} aria-label={`Ver el video: ${titulo}`}>
            <Image src={portada} alt="" fill sizes="(max-width:960px) 92vw, 60vw" style={{ objectFit: "cover" }} />
            <span aria-hidden="true">▶</span>
          </button>
        )}
      </div>
      <a className={cls.link} href={href} target="_blank" rel="noopener noreferrer">¿No se reproduce? Verlo en YouTube ↗</a>
    </>
  );
}
