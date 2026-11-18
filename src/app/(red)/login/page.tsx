import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default function Login() {
  return (
    <section className={s.tarjeta}>
      <h1>Iniciar sesión</h1>
      <p className={s.sub}>Entra para ver tu red de referidos.</p>
      <LoginForm />
    </section>
  );
}
