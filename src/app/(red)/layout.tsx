import type { Metadata } from "next";
import Link from "next/link";
import { Barlow } from "next/font/google";
import { RED } from "@/content/red";
import s from "./red.module.css";

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--f-red" });

export const metadata: Metadata = {
  // Las páginas de la red no se muestran en buscadores.
  robots: { index: false, follow: false },
};

/** Marco de la red de referidos: fondo morado oscuro, tarjeta centrada y la marca de Claudia arriba. */
export default function RedLayout({ children }: LayoutProps<"/">) {
  return (
    <div className={`${barlow.variable} ${s.fondo}`}>
      <header className={s.marca}>
        <Link href="/" className={s.logo} aria-label="Ir al sitio de Claudia Hernández">
          <span className={s.monograma} aria-hidden="true">CH</span>
          <span>
            <strong>Claudia <em>Hernández</em></strong>
            <small>{RED.nombre}</small>
          </span>
        </Link>
      </header>
      <main className={s.centro}>{children}</main>
      <footer className={s.pie}>
        <Link href="/terminos">Política de tratamiento de datos</Link>
      </footer>
    </div>
  );
}
