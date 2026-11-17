import type { Metadata } from "next";
import { articulosPublicados, blog } from "@/content/articulos";
import { formatDate } from "@/content/blog";
import { person } from "@/content/site";
import { Hablemos, PageHero, Pantallas } from "../sections";
import s from "../o2.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos y opiniones de Claudia Hernández, concejala de Floridablanca: lo que piensa, lo que ve y lo que propone.",
};

export default function Blog() {
  return (
    <Pantallas>
      <PageHero
        eyebrow={blog.name}
        title={<>Lo que pienso, lo que veo, lo que <em>propongo</em>.</>}
        lead={blog.intro}
      />
      <section className={s.sec} aria-label="Artículos del Blog">
        {articulosPublicados.length > 0 ? (
          <ul className={s.entries}>
            {articulosPublicados.map((a) => (
              <li key={a.slug}>
                <article className={`${s.entry} ${s.entryStatic}`}>
                  <span className={s.eM}>{a.tag} · {formatDate(a.date)}</span>
                  <h3>{a.title}</h3>
                  {a.body.map((p, i) => <p key={i}>{p}</p>)}
                  {a.fuente && (
                    <a className={s.more} href={a.fuente.url} target="_blank" rel="noopener noreferrer">
                      Leer la nota original en {a.fuente.medio} <span aria-hidden="true">↗</span>
                      <span className="sr"> (se abre en una pestaña nueva)</span>
                    </a>
                  )}
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.empty}>
            <h2>Muy pronto, los primeros artículos.</h2>
            <a className={s.more} href={person.social.instagram} target="_blank" rel="noopener noreferrer">Mientras tanto, Instagram <span aria-hidden="true">↗</span></a>
          </div>
        )}
      </section>
      <Hablemos />
    </Pantallas>
  );
}
