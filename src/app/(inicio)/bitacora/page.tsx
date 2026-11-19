import type { Metadata } from "next";
import { Suspense } from "react";
import BitacoraLista from "./BitacoraLista";
import { published, bitacora, temas, slugTema } from "@/content/blog";
import { person } from "@/content/site";
import { EntryCard, PageHero, Pantallas } from "../sections";
import s from "../o2.module.css";

export const metadata: Metadata = {
  title: "La Bitácora de Claudia: historias de Floridablanca",
  description: "Historias, voces, tradiciones y emprendedores de Floridablanca contados por Claudia Hernández: Hecho en Floridablanca, Ciudad Dulce, cultura y voces de la gente.",
  alternates: { canonical: "/bitacora" },
  openGraph: { title: "La Bitácora de Claudia: historias de Floridablanca", description: "Historias, voces, tradiciones y emprendedores de Floridablanca contados por Claudia Hernández: Hecho en Floridablanca, Ciudad Dulce, cultura y voces de la gente.", url: "/bitacora" },
};

export default function Bitacora() {
  return (
    <Pantallas saltar={false}>
      <PageHero
        eyebrow={bitacora.name}
        title={<>Escuchar también es <em>gobernar</em>.</>}
        lead={bitacora.intro}
      />
      <section className={s.sec} aria-label="Entradas de la Bitácora">
        {published.length > 0 ? (
          // Los filtros leen la URL (?tema=), por eso van dentro de Suspense; mientras tanto se ven todas.
          <Suspense fallback={<ul className={s.entries}>{published.map((p) => <li key={p.slug}><EntryCard p={p} /></li>)}</ul>}>
            <BitacoraLista
              temas={temas.map((t) => ({ slug: slugTema(t), nombre: t, n: published.filter((p) => p.tag === t).length }))}
              items={published.map((p) => ({ id: p.slug, tema: slugTema(p.tag), node: <EntryCard p={p} /> }))}
            />
          </Suspense>
        ) : (
          <div className={s.empty}>
            <h2>Muy pronto, las primeras páginas.</h2>
            <a className={s.more} href={person.social.instagram} target="_blank" rel="noopener noreferrer">Ir a Instagram <span aria-hidden="true">↗</span></a>
          </div>
        )}
      </section>
    </Pantallas>
  );
}
