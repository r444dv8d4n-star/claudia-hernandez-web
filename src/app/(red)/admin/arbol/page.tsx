import type { Metadata } from "next";
import { Suspense } from "react";
import { exigirAdmin } from "@/lib/red/admin";
import AdminNav from "../Nav";
import s from "../../red.module.css";

export const metadata: Metadata = { title: "Árbol de la red" };

type Nodo = { id: string; padre: string | null; nombre: string | null; municipio: string | null; desde: string };

export default function Arbol() {
  return (
    <div className={s.ancho}>
      <Suspense fallback={<section className={s.tarjeta}><p className={s.sub}>Cargando el árbol…</p></section>}>
        <Contenido />
      </Suspense>
    </div>
  );
}

async function Contenido() {
  const yo = await exigirAdmin();
  const { data } = await yo.sb.rpc("admin_arbol");
  const nodos = (data ?? []) as Nodo[];

  // Hijos de cada nodo y tamaño de cada rama.
  const hijos = new Map<string | null, Nodo[]>();
  for (const n of nodos) hijos.set(n.padre, [...(hijos.get(n.padre) ?? []), n]);
  const tam = new Map<string, number>();
  const rama = (id: string): number => {
    if (tam.has(id)) return tam.get(id)!;
    const t = (hijos.get(id) ?? []).reduce((a, h) => a + 1 + rama(h.id), 0);
    tam.set(id, t);
    return t;
  };
  const raices = (hijos.get(null) ?? []).sort((a, b) => rama(b.id) - rama(a.id));

  return (
    <>
      <section className={s.tarjeta}>
        <p className={s.etiqueta}>Administración</p>
        <h1>Árbol de la red</h1>
        <p className={s.sub}>Quién invitó a quién. Arriba quedan las personas que llegaron sin código; abre cada una para ver su rama.</p>
        <AdminNav actual="/admin/arbol" />
      </section>
      <section className={s.tarjeta}>
        <ul className={s.arbol}>{raices.map((n) => <Rama key={n.id} n={n} hijos={hijos} rama={rama} nivel={0} />)}</ul>
      </section>
    </>
  );
}

function Rama({ n, hijos, rama, nivel }: { n: Nodo; hijos: Map<string | null, Nodo[]>; rama: (id: string) => number; nivel: number }) {
  const suyos = hijos.get(n.id) ?? [];
  const etiqueta = (
    <span className={s.nodo}>
      <strong className={n.nombre ? undefined : s.vacio}>{n.nombre ?? "Cuenta eliminada"}</strong>
      {n.municipio && <small>{n.municipio}</small>}
      {suyos.length > 0 && <span className={s.cuenta} title="Personas en su rama">{rama(n.id)}</span>}
    </span>
  );
  if (!suyos.length) return <li>{etiqueta}</li>;
  return (
    <li>
      <details open={nivel === 0 && rama(n.id) <= 30}>
        <summary>{etiqueta}</summary>
        <ul>{suyos.map((h) => <Rama key={h.id} n={h} hijos={hijos} rama={rama} nivel={nivel + 1} />)}</ul>
      </details>
    </li>
  );
}
