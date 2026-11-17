"use client";
import { useEffect, useRef } from "react";

// cada palabra va en un bloque sin cortes para que "Hernández" nunca se parta en dos líneas
const Letters = ({ text }: { text: string }) => (
  <span className="nm-word" aria-hidden="true">
    {[...text].map((c, i) => (
      <span key={i} className="nm-mask"><span className="nm-ch">{c}</span></span>
    ))}
  </span>
);

/**
 * Nombre de la portada: las letras suben desde una máscara (GSAP). Se repite una vez
 * cuando termina el collage de entrada. Las letras son spans de React (sin tocar el DOM a mano).
 * Sin movimiento si el usuario lo pidió.
 */
export default function HeroName({ className }: { className?: string }) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      const chars = gsap.utils.toArray<HTMLElement>(".nm-ch", el);
      const intro = gsap.from(chars, { yPercent: 135, rotate: 16, scale: 0.8, duration: 1.15, ease: "expo.out", stagger: 0.07, delay: 0.25 });
      let n = 0;
      const poll = setInterval(() => {
        n++;
        if (!document.querySelector("[data-collage]") || n > 160) {
          clearInterval(poll);
          if (n <= 160) gsap.to(chars, { keyframes: [{ yPercent: -22, scale: 1.1, duration: 0.3 }, { yPercent: 0, scale: 1, duration: 0.6, ease: "bounce.out" }], stagger: 0.06 });
        }
      }, 100);
      cleanup = () => { clearInterval(poll); intro.kill(); gsap.killTweensOf(chars); };
    })();
    return () => { cancelled = true; cleanup(); };
  }, []);
  return (
    <h1 ref={ref} className={className} aria-label="Claudia Hernández">
      <Letters text="Claudia" /> <em><Letters text="Hernández" /></em>
    </h1>
  );
}
