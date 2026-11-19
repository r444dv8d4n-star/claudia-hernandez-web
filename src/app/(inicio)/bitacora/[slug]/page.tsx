import type { Metadata } from "next";
import { Suspense } from "react";
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

export default function Entrada({ params }: PageProps<"/bitacora/[slug]">) {
  // Los datos de la URL se leen dentro de <Suspense> (requisito de Next 16 para navegar al instante).
  return (
    <Suspense fallback={<section className={s.sec} aria-busy="true" />}>
      <Contenido params={params} />
    </Suspense>
  );
}

async function Contenido({ params }: { params: PageProps<"/bitacora/[slug]">["params"] }) {
  const { slug } = await params;
  const post = published.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <>
      <PageHero eyebrow={`${bitacora.name} · ${post.tag} · ${formatDate(post.date)}`} title={post.title} lead={post.excerpt}
        foto={post.foto ? { ...post.foto, alt: post.title } : undefined} />
      <section className={s.sec}>
        <article className={s.article}>
          {post.body.map((p, i) => <p key={i}>{p}</p>)}
        </article>
        <div className={s.ctas}>
          <Link className={s.more} href="/bitacora">Volver a la Bitácora</Link>
        </div>
      </section>
    </>
  );
}
