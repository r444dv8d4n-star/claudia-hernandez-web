import type { Metadata } from "next";
import Link from "next/link";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Iniciar sesión" };

// Se construye en el siguiente paso.
export default function Login() {
  return (
    <section className={s.tarjeta}>
      <h1>Iniciar sesión</h1>
      <p className={s.sub}>Entra para ver tu red de referidos. (En construcción.)</p>
      <p className={s.bajo}>¿No tienes cuenta? <Link href="/registro">Regístrate</Link></p>
    </section>
  );
}
