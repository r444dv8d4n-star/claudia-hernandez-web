"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cambiarAdmin, type EstadoEquipo } from "../actions";
import s from "../../red.module.css";

export default function Equipo() {
  const [estado, accion, enviando] = useActionState(cambiarAdmin, { n: 0 } as EstadoEquipo);
  const router = useRouter();
  useEffect(() => { if (estado.ok) router.refresh(); }, [estado, router]);
  return (
    <form key={estado.n} action={accion} className={s.form}>
      {estado.ok && <p className={s.aviso} role="status">{estado.ok}</p>}
      {estado.error && <p className={s.alerta} role="alert">{estado.error}</p>}
      <div className={s.campo}>
        <label htmlFor="correo-admin">Correo de la persona</label>
        <input id="correo-admin" name="correo" type="email" placeholder="persona@correo.com" required autoComplete="off" />
        <span className={s.ayuda}>Debe tener cuenta en la red con ese correo.</span>
      </div>
      <div className={s.acciones} style={{ justifyContent: "flex-start" }}>
        <button className={s.botonSec} name="accion" value="agregar" disabled={enviando}>Hacer administrador</button>
        <button className={s.botonPeligro} name="accion" value="quitar" disabled={enviando}>Quitar administrador</button>
      </div>
    </form>
  );
}
