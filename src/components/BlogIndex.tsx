"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import s from "@/app/(inicio)/o2.module.css";

export type Tarjeta = {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  fecha: string; // ya formateada
  medio?: string;
  portada: { src: string; alt: string };
  pos?: string;
};

/** Índice del blog al estilo de una revista: barra lateral con categorías y cuadrícula de tarjetas con portada. */
export default function BlogIndex({ tarjetas, intro }: { tarjetas: Tarjeta[]; intro: string }) {
  const categorias = ["Todo", ...Array.from(new Set(tarjetas.map((t) => t.tag)))];
  const [sel, setSel] = useState("Todo");
  const lista = sel === "Todo" ? tarjetas : tarjetas.filter((t) => t.tag === sel);

  return (
    <div className={s.blogWrap}>
      <aside className={s.blogSide}>
        <h1 className={s.blogTitle}>Blog <em>de Claudia</em></h1>
        <p className={s.blogLead}>{intro}</p>
        <nav aria-label="Categorías del blog">
          <ul className={s.blogTabs}>
            {categorias.map((c) => (
              <li key={c}>
                <button type="button" aria-pressed={sel === c} onClick={() => setSel(c)}>{c}</button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <ul className={s.blogGrid} aria-live="polite">
        {lista.map((t, i) => (
          <li key={t.slug}>
            <Link href={`/blog/${t.slug}`} className={s.bCard}>
              <span className={s.bCover}>
                <Image
                  src={t.portada.src}
                  alt={t.portada.alt}
                  fill
                  sizes="(max-width:700px) 92vw, (max-width:960px) 46vw, 38vw"
                  style={{ objectFit: "cover", objectPosition: t.pos ?? "50% 35%" }}
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </span>
              <span className={s.bTag}>{t.tag}</span>
              <h2 className={s.bTitle}>{t.title}</h2>
              <p className={s.bExcerpt}>{t.excerpt}</p>
              <span className={s.bMeta}>
                {t.medio && <span className={s.bAvatar} aria-hidden="true">{t.medio.charAt(0)}</span>}
                <span>{t.medio ? `${t.medio} · ${t.fecha}` : t.fecha}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
