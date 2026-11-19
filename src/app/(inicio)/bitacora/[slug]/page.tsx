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
  if (!post) return {};
  return {
    title: `${post.title} · ${bitacora.name}`,
    description: post.excerpt,
    alternates: { canonical: `/bitacora/${post.slug}` },
    openGraph: {
      type: "article", title: post.title, description: post.excerpt, url: `/bitacora/${post.slug}`, publishedTime: post.date,
      ...(post.foto ? { images: [{ url: post.foto.src, width: post.foto.w, height: post.foto.h, alt: post.title }] } : {}),
    },
  };
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
  // Ficha para Google (artículo con autora, fecha y foto).
  const ficha = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.excerpt,
    datePublished: post.date, inLanguage: "es-CO", articleSection: post.tag,
    author: { "@type": "Person", name: "Claudia Hernández", jobTitle: "Concejala de Floridablanca" },
    ...(post.foto ? { image: `https://claudia-hernandez-web.vercel.app${post.foto.src}` } : {}),
    mainEntityOfPage: `https://claudia-hernandez-web.vercel.app/bitacora/${post.slug}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ficha).replace(/</g, "\\u003c") }} />
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
