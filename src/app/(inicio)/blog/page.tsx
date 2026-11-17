import type { Metadata } from "next";
import BlogIndex, { type Tarjeta } from "@/components/BlogIndex";
import { articulosPublicados, blog } from "@/content/articulos";
import { formatDate } from "@/content/blog";
import { galeria } from "@/content/galeria";
import { person } from "@/content/site";
import { Hablemos, PageHero, Pantallas } from "../sections";
import s from "../o2.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos y noticias sobre Claudia Hernández, concejala de Floridablanca: lo que se dice de su trabajo y lo que propone.",
};

export default function Blog() {
  const tarjetas: Tarjeta[] = articulosPublicados.map((a) => ({
    slug: a.slug,
    title: a.title,
    tag: a.tag,
    excerpt: a.excerpt,
    fecha: formatDate(a.date),
    medio: a.fuente?.medio,
    portada: galeria[a.portada],
    pos: a.portadaPos,
  }));

  return (
    <>
      {tarjetas.length > 0 ? (
        <BlogIndex tarjetas={tarjetas} intro={blog.intro} />
      ) : (
        <Pantallas>
          <PageHero eyebrow={blog.name} title={<>Blog de <em>Claudia</em>.</>} lead={blog.intro} />
          <section className={s.sec} aria-label="Artículos del Blog">
            <div className={s.empty}>
              <h2>Muy pronto, los primeros artículos.</h2>
              <a className={s.more} href={person.social.instagram} target="_blank" rel="noopener noreferrer">Mientras tanto, Instagram <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </Pantallas>
      )}
      <Hablemos />
    </>
  );
}
