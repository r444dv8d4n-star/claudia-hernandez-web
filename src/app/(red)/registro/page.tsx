import type { Metadata } from "next";
import { Suspense } from "react";
import RegistroForm from "./RegistroForm";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function Registro() {
  return (
    <section className={s.tarjeta}>
      {/* El formulario lee el código de invitación del enlace (?ref=), que llega con cada visita. */}
      <Suspense fallback={<><h1>Crear cuenta</h1><p className={s.sub}>Crea tu cuenta y empieza a invitar.</p></>}>
        <RegistroForm />
      </Suspense>
    </section>
  );
}
