import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { published, formatDate, bitacora } from "@/content/blog";
import { PageHero } from "../../sections";
import s from "../../o2.module.css";

// Con Cache Components hay que devolver al menos un parámetro. Si no hubiera entradas se usa uno que responde 404.
export function generateStaticParams() {
  return published.length > 0 ? published.map((p) => ({ slug: p.slug })) : [{ slug: "__sin-entradas__" }];
}

export async function generateMetadata({ params }: PageProps<"/bitacora/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = published.find((p) => p.slug === slug);
  return post ? { title: `${post.title} · ${bitacora.name}`, description: post.excerpt } : {};
}

export default async function Entrada({ params }: PageProps<"/bitacora/[slug]">) {
  const { slug } = await params;
  const post = published.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <>
      <PageHero eyebrow={`${bitacora.name} · ${post.tag} · ${formatDate(post.date)}`} title={post.title} lead={post.excerpt} />
      <section className={s.sec}>
        <article className={s.article}>
          {post.body.map((p, i) => <p key={i}>{p}</p>)}
        </article>
        <div className={s.ctas}>
          {post.ig && <a className={s.more} href={post.ig} target="_blank" rel="noopener noreferrer">Ver la publicación original en Instagram <span aria-hidden="true">↗</span></a>}
          <Link className={s.more} href="/bitacora">Volver a la Bitácora</Link>
        </div>
      </section>
    </>
  );
}
