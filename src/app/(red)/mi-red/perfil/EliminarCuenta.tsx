"use client";

import { useActionState, useState } from "react";
import { eliminarCuenta } from "./actions";
import s from "../../red.module.css";

export default function EliminarCuenta() {
  const [abierto, setAbierto] = useState(false);
  const [estado, accion, enviando] = useActionState(eliminarCuenta, {} as { error?: string });

  if (!abierto) {
    return (
      <>
        <p className={s.sub}>Puedes irte cuando quieras, sin pedirle permiso a nadie. Se borran tus datos y tu lugar en la red queda vacío; tus invitados siguen en la red.</p>
        <button type="button" className={s.botonPeligro} onClick={() => setAbierto(true)}>Eliminar mi cuenta</button>
      </>
    );
  }

  return (
    <form action={accion} className={s.form}>
      <p className={s.alerta}>Esto no se puede deshacer. Se borrarán tu nombre, documento, celular, correo, dirección y fecha de nacimiento.</p>
      {estado.error && <p className={s.err} role="alert">{estado.error}</p>}
      <label className={s.check}>
        <input type="checkbox" name="confirmo" required />
        <span>Entiendo y quiero eliminar mi cuenta.</span>
      </label>
      <div className={s.acciones} style={{ justifyContent: "flex-start" }}>
        <button className={s.botonPeligro} disabled={enviando}>{enviando ? "Eliminando…" : "Sí, eliminar mi cuenta"}</button>
        <button type="button" className={s.botonSec} onClick={() => setAbierto(false)}>Cancelar</button>
      </div>
    </form>
  );
}
