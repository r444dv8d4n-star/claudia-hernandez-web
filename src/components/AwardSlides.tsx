"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import s from "@/app/(inicio)/o2.module.css";

type Slide = { src: string; w: number; h: number; alt: string; pos?: string };

/** Fotos que se relevan solas con un deslizamiento vertical suave. Sin movimiento si el usuario lo pidió. */
export default function AwardSlides({ slides, title, sub }: { slides: Slide[]; title: string; sub: string }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(-1);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((c) => { setPrev(c); return (c + 1) % slides.length; }), 3600);
    return () => clearInterval(t);
  }, [slides.length]);
  return (
    <figure className={s.slides}>
      <div className={s.frame}>
      {slides.map((sl, n) => (
        <div key={sl.src} className={`${s.slide} ${n === i ? s.slideOn : n === prev ? s.slideOut : ""}`} aria-hidden={n !== i}>
          <Image src={sl.src} alt={sl.alt} width={sl.w} height={sl.h} sizes="(max-width:960px) 92vw, 40vw" loading={n === 0 ? "eager" : "lazy"} style={{ objectPosition: sl.pos ?? "50% 30%" }} />
        </div>
      ))}
      <div className={s.dots} aria-hidden="true">{slides.map((_, n) => <i key={n} className={n === i ? s.on : ""} />)}</div>
      </div>
      <figcaption className={s.slidesCap}>
        <strong>{title}</strong>
        <span>{sub}</span>
      </figcaption>
    </figure>
  );
}
