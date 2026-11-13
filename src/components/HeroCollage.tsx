"use client";
import { useEffect, useRef, useState } from "react";

type Props = { thumbs: string[]; cls: Record<string, string> };

/**
 * Collage de fotos que vuelan y se acomodan (GSAP). Al terminar, cada pieza se
 * desvanece y deja ver la foto final de Claudia que está debajo.
 * Decorativo: aria-hidden. Con prefers-reduced-motion no se anima nada.
 */
export default function HeroCollage({ thumbs, cls }: Props) {
  const root = useRef<HTMLDivElement | null>(null);
  const [grid, setGrid] = useState<{ cols: number; rows: number } | null>(null);
  const [done, setDone] = useState(false);

  // 1) Calcula la malla según el tamaño del hero y descarta si hay movimiento reducido.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // setState dentro de requestAnimationFrame (no directo en el efecto) para cumplir la regla de React.
    const id = requestAnimationFrame(() => {
      if (reduce) { setDone(true); return; }
      const { width, height } = el.getBoundingClientRect();
      // Si el contenedor aún no tiene tamaño, no hay malla que calcular (evita Infinity/NaN).
      if (!(width > 0) || !(height > 0)) { setDone(true); return; }
      const cols = width < 600 ? 4 : width < 1100 ? 6 : 8;
      const rows = Math.min(12, Math.max(3, Math.round(height / (width / cols))));
      setGrid({ cols, rows });
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // 2) Anima cuando las piezas ya existen en el DOM.
  useEffect(() => {
    const el = root.current;
    if (!grid || !el) return;
    let tl: { kill: () => void } | null = null;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      if (cancelled) return;
      const tiles = gsap.utils.toArray<HTMLElement>(`.${cls.tile}`, el);
      const faces = tiles.map((t) => t.querySelector<HTMLElement>(`.${cls.face}`)!);
      const base = el.querySelector<HTMLElement>(`.${cls.base}`)!;
      const hero = el.parentElement as HTMLElement;
      const scrim = el.querySelector<HTMLElement>(`.${cls.scrim}`)!;
      const picked = Math.floor(grid.cols * 0.55) + Math.floor(grid.rows * 0.3) * grid.cols; // pieza donde está su rostro
      const t = gsap.timeline({ delay: 1.2, onComplete: () => setDone(true) });
      tl = t;
      t.fromTo(
        tiles,
        {
          x: () => gsap.utils.random(-el.clientWidth * 0.5, el.clientWidth * 0.5),
          y: () => gsap.utils.random(-el.clientHeight * 0.5, el.clientHeight * 0.5),
          rotation: () => gsap.utils.random(-35, 35),
          scale: () => gsap.utils.random(0.2, 1.8),
          autoAlpha: 0,
        },
        { x: 0, y: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 1.1, ease: "power3.out", stagger: { amount: 0.9, from: "random" } },
      )
        // las piezas se encienden y se desvanecen desde el rostro hacia afuera
        .to(base, { autoAlpha: 0, duration: 0.8, ease: "power1.inOut" }, "+=0.15")
        .to(
          faces,
          { autoAlpha: 0, duration: 0.7, ease: "power2.inOut", stagger: { amount: 0.9, from: picked } },
          "<0.1",
        )
        .fromTo(hero.querySelector(`.${cls.heroImg}`), { filter: "brightness(1.35)" }, { filter: "brightness(1)", duration: 1.2, ease: "power2.out" }, "<")
        .to(scrim, { autoAlpha: 0, duration: 0.8, ease: "power1.inOut" }, "<");
    })();
    return () => {
      cancelled = true;
      tl?.kill();
    };
  }, [grid, cls]);

  if (done) return null;
  return (
    <div ref={root} className={cls.collage} data-collage aria-hidden="true">
      <div className={cls.base} />
      {grid && (
        <div className={cls.tiles} style={{ gridTemplateColumns: `repeat(${grid.cols},1fr)`, gridTemplateRows: `repeat(${grid.rows},1fr)` }}>
          {Array.from({ length: grid.cols * grid.rows }, (_, i) => (
            <div key={i} className={cls.tile}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={cls.face} src={thumbs[(i + Math.floor(i / grid.cols) * 4) % thumbs.length]} alt="" width={420} height={280} decoding="async" />
            </div>
          ))}
        </div>
      )}
      <div className={cls.scrim} />
    </div>
  );
}
