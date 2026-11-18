import type { Metadata } from "next";
import RecuperarForm from "./RecuperarForm";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Recuperar contraseña" };

export default function Recuperar() {
  return (
    <section className={s.tarjeta}>
      <h1>Recuperar contraseña</h1>
      <p className={s.sub}>Escribe tu correo y te enviamos un enlace para crear una nueva.</p>
      <RecuperarForm />
    </section>
  );
}
