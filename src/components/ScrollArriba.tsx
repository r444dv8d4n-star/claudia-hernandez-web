"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Al abrir una página nueva, empieza arriba. Next 16 a veces conserva la posición de la página anterior
 * (la deja oculta en memoria), y la persona caía al final de la Bitácora o de una entrada.
 * Con «atrás» y «adelante» del navegador no se toca: ahí sí debe volver a donde estaba.
 * Si el enlace lleva a una sección (#hablemos), tampoco: el navegador baja hasta ella.
 */
export default function ScrollArriba() {
  const ruta = usePathname();
  const primera = useRef(true);
  const historial = useRef(false);

  useEffect(() => {
    const marcar = () => { historial.current = true; };
    window.addEventListener("popstate", marcar);
    return () => window.removeEventListener("popstate", marcar);
  }, []);

  useEffect(() => {
    if (primera.current) { primera.current = false; return; }
    if (historial.current) { historial.current = false; return; }
    if (location.hash) return;
    // Un cuadro después: para entonces la página anterior ya apagó su portview (si no, el navegador
    // «encaja» el scroll en el pie de página y la persona queda al final).
    const subir = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    subir();
    const id = requestAnimationFrame(() => requestAnimationFrame(subir));
    return () => cancelAnimationFrame(id);
  }, [ruta]);

  return null;
}
