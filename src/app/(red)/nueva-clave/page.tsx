import type { Metadata } from "next";
import NuevaClaveForm from "./NuevaClaveForm";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Contraseña nueva" };

export default function NuevaClave() {
  return (
    <section className={s.tarjeta}>
      <h1>Crea tu contraseña nueva</h1>
      <p className={s.sub}>Escríbela dos veces para confirmar.</p>
      <NuevaClaveForm />
    </section>
  );
}
