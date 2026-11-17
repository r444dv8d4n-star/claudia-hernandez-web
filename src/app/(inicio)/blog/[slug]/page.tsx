import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articulosPublicados, blog } from "@/content/articulos";
import { formatDate } from "@/content/blog";
import { galeria } from "@/content/galeria";
import { Hablemos } from "../../sections";
import s from "../../o2.module.css";

// Con Cache Components hay que devolver al menos un parámetro. Si no hubiera artículos se usa uno que responde 404.
export function generateStaticParams() {
  return articulosPublicados.length > 0 ? articulosPublicados.map((a) => ({ slug: a.slug })) : [{ slug: "__sin-articulos__" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articulosPublicados.find((x) => x.slug === slug);
  return a ? { title: `${a.title} · ${blog.name}`, description: a.excerpt } : {};
}

export default async function Articulo({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = articulosPublicados.find((x) => x.slug === slug);
  if (!a) notFound();
  const foto = galeria[a.portada];

  return (
    <>
      <section className={`${s.sec} ${s.post}`}>
        <Link className={s.back} href="/blog"><span aria-hidden="true">←</span> Volver al blog</Link>
        <header className={s.postHead}>
          <span className={s.bTag}>{a.tag}</span>
          <h1>{a.title}</h1>
          <p className={s.postLead}>{a.excerpt}</p>
          <span className={s.bMeta}>
            {a.fuente && <span className={s.bAvatar} aria-hidden="true">{a.fuente.medio.charAt(0)}</span>}
            <span>{a.fuente ? `${a.fuente.medio} · ${formatDate(a.date)}` : formatDate(a.date)}</span>
          </span>
        </header>
        <figure className={s.postCover}>
          <span className={s.postImg}>
            <Image src={foto.src} alt={foto.alt} fill priority sizes="(max-width:960px) 92vw, 880px" style={{ objectFit: "cover", objectPosition: a.portadaPos ?? "50% 35%" }} />
          </span>
          <figcaption>Foto de archivo.</figcaption>
        </figure>
        <div className={s.article}>
          {a.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className={s.ctas}>
          {a.fuente && (
            <a className={s.more} href={a.fuente.url} target="_blank" rel="noopener noreferrer">
              Leer la nota original en {a.fuente.medio} <span aria-hidden="true">↗</span>
              <span className="sr"> (se abre en una pestaña nueva)</span>
            </a>
          )}
          <Link className={s.more} href="/blog">Volver al blog</Link>
        </div>
        {a.fuente && (
          <p className={s.postSrc}>
            Nota original: «{a.fuente.titulo}»{a.fuente.autor ? `, de ${a.fuente.autor}` : ""}, en {a.fuente.medio}.
          </p>
        )}
      </section>
      <Hablemos />
    </>
  );
}
