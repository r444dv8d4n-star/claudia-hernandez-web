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
    // Se repite durante el primer cuarto de segundo: la página anterior apaga su portview un instante
    // después y, mientras tanto, el navegador puede «encajar» el scroll en el pie de página.
    // Si la persona ya empezó a moverse, no se le toca el scroll.
    let movio = false;
    const parar = () => { movio = true; };
    const eventos = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    eventos.forEach((e) => window.addEventListener(e, parar, { passive: true }));
    const subir = () => { if (!movio) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
    subir();
    const id = requestAnimationFrame(() => requestAnimationFrame(subir));
    const t1 = setTimeout(subir, 80);
    const t2 = setTimeout(subir, 250);
    return () => {
      cancelAnimationFrame(id); clearTimeout(t1); clearTimeout(t2);
      eventos.forEach((e) => window.removeEventListener(e, parar));
    };
  }, [ruta]);

  return null;
}
