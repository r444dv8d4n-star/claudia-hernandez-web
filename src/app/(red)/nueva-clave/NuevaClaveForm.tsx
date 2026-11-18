"use client";

import { useActionState } from "react";
import { cambiarClave, type EstadoClave } from "./actions";
import Clave from "../Clave";
import s from "../red.module.css";

export default function NuevaClaveForm() {
  const [estado, accion, enviando] = useActionState(cambiarClave, { n: 0 } as EstadoClave);
  return (
    <form key={estado.n} action={accion} className={s.form} noValidate>
      {estado.error && <p className={s.alerta} role="alert">{estado.error}</p>}
      <div className={s.campo}>
        <label htmlFor="contrasena">Contraseña nueva</label>
        <Clave autoComplete="new-password" ayuda="Mínimo 8 caracteres, con letras y números." />
      </div>
      <div className={s.campo}>
        <label htmlFor="repetir">Repítela</label>
        <Clave id="repetir" autoComplete="new-password" />
      </div>
      <button className={s.boton} disabled={enviando}>{enviando ? "Guardando…" : "Guardar contraseña"}</button>
    </form>
  );
}
