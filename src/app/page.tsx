import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Propuestas de diseño", robots: { index: false, follow: false } };

const items = [
  { href: "/opcion-1", t: "Opción 1 · Hilo de comunidad", d: "Editorial cálida: papel crema, serifa, hilo mostaza." },
  { href: "/opcion-2", t: "Opción 2 · Capítulos", d: "Relato inmersivo: noche morada, dorado, capítulos que se apilan." },
  { href: "/opcion-3", t: "Opción 3 · Mosaico vivo", d: "Bento moderno: bloques, formas que cambian, mucho color." },
];

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "56px 16px", fontFamily: "system-ui, sans-serif", color: "#1E1324" }}>
      <h1 style={{ color: "#4B1F78", fontSize: "clamp(1.8rem,5vw,2.6rem)" }}>Claudia Hernández · propuestas de diseño</h1>
      <p>Prototipos navegables de la página de inicio. Elige una para verla completa.</p>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 14 }}>
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} style={{ display: "block", padding: 18, border: "2px solid #4B1F78", borderRadius: 16, textDecoration: "none" }}>
              <strong style={{ fontSize: "1.15rem" }}>{i.t}</strong>
              <span style={{ display: "block", marginTop: 4 }}>{i.d}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
