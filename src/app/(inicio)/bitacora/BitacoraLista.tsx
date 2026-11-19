"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import s from "../o2.module.css";

type Item = { id: string; tema: string; node: React.ReactNode };

/** Lista de la Bitácora con filtros por tema (?tema=…), para enlazar directo a una sección. */
export default function BitacoraLista({ temas, items }: { temas: { slug: string; nombre: string; n: number }[]; items: Item[] }) {
  const tema = useSearchParams().get("tema") ?? "";
  const router = useRouter();
  const ruta = usePathname();
  const activo = temas.some((t) => t.slug === tema) ? tema : "";
  const elegir = (t: string) => router.replace(t ? `${ruta}?tema=${t}` : ruta, { scroll: false });
  const visibles = items.filter((i) => !activo || i.tema === activo);

  return (
    <>
      <div className={s.filtros} role="group" aria-label="Filtrar por tema">
        <button type="button" aria-pressed={!activo} onClick={() => elegir("")}>Todas <span>{items.length}</span></button>
        {temas.map((t) => (
          <button key={t.slug} type="button" aria-pressed={activo === t.slug} onClick={() => elegir(t.slug)}>
            {t.nombre} <span>{t.n}</span>
          </button>
        ))}
      </div>
      <ul className={s.entries} aria-live="polite">
        {visibles.map((i) => <li key={i.id}>{i.node}</li>)}
      </ul>
    </>
  );
}
