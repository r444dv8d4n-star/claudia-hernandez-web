import type { Metadata } from "next";
import Link from "next/link";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Cuenta eliminada" };

export default function CuentaEliminada() {
  return (
    <section className={`${s.tarjeta} ${s.exito}`}>
      <h1>Tu cuenta fue eliminada</h1>
      <p className={s.sub}>Borramos tus datos personales. Gracias por haber sido parte de la red.</p>
      <Link className={s.botonSec} href="/">Ir al sitio de Claudia</Link>
    </section>
  );
}
