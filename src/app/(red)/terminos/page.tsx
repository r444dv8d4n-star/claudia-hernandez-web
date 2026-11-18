import type { Metadata } from "next";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Política de tratamiento de datos" };

// BORRADOR: la política completa (Ley 1581 de 2012) se escribe en el último paso, con los datos del responsable.
export default function Terminos() {
  return (
    <section className={s.tarjeta}>
      <h1>Política de tratamiento de datos</h1>
      <p className={s.sub}>Estamos terminando de escribir esta política. Mientras tanto, la red está en pruebas y no recibe datos reales.</p>
    </section>
  );
}
