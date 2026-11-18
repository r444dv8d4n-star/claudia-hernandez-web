import Link from "next/link";
import s from "../red.module.css";

const items = [
  ["/admin", "Resumen"],
  ["/admin/arbol", "Árbol de la red"],
  ["/admin/equipo", "Administradores"],
] as const;

export default function AdminNav({ actual }: { actual: string }) {
  return (
    <nav className={s.adminNav} aria-label="Panel de administradores">
      {items.map(([href, t]) => (
        <Link key={href} className={s.botonSec} href={href} aria-current={actual === href ? "page" : undefined}>{t}</Link>
      ))}
      <a className={s.botonSec} href="/admin/exportar" download>Descargar listado (CSV)</a>
      <Link className={s.botonSec} href="/mi-red">Mi red</Link>
    </nav>
  );
}
