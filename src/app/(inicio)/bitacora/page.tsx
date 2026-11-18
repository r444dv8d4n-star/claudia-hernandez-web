import type { Metadata } from "next";
import { published, bitacora } from "@/content/blog";
import { person } from "@/content/site";
import { EntryCard, PageHero, Pantallas } from "../sections";
import s from "../o2.module.css";

export const metadata: Metadata = {
  title: "La Bitácora de Claudia",
  description: "Escuchar también es gobernar: historias, voces y tradiciones de Floridablanca contadas por Claudia Hernández.",
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
          <ul className={s.entries}>
            {published.map((p) => (
              <li key={p.slug}>
                <EntryCard p={p} />
              </li>
            ))}
          </ul>
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
