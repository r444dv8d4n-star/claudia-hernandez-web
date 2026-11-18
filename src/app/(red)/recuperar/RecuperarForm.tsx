"use client";

import { useActionState } from "react";
import Link from "next/link";
import { pedirEnlace, type EstadoRecuperar } from "./actions";
import s from "../red.module.css";

export default function RecuperarForm() {
  const [estado, accion, enviando] = useActionState(pedirEnlace, { n: 0 } as EstadoRecuperar);

  if (estado.enviado) {
    return (
      <div className={s.form}>
        <p className={s.aviso} role="status">
          Si <strong>{estado.correo}</strong> está registrado, te enviamos un enlace para crear una contraseña nueva. Revisa tu correo, también la carpeta de spam.
        </p>
        <p className={s.bajo}><Link href="/login">Volver a iniciar sesión</Link></p>
      </div>
    );
  }

  return (
    <form key={estado.n} action={accion} className={s.form} noValidate>
      {estado.error && <p className={s.alerta} role="alert">{estado.error}</p>}
      <div className={s.campo}>
        <label htmlFor="correo">Correo</label>
        <input id="correo" name="correo" type="email" inputMode="email" autoComplete="email" placeholder="tu@correo.com" required defaultValue={estado.correo ?? ""} />
      </div>
      <button className={s.boton} disabled={enviando}>{enviando ? "Enviando…" : "Enviarme el enlace"}</button>
      <p className={s.bajo}><Link href="/login">Volver a iniciar sesión</Link></p>
    </form>
  );
}
