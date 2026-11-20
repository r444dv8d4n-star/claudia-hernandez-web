"use client";

import { useActionState } from "react";
import { actualizarPerfil, type EstadoPerfil } from "./actions";
import { CamposPersona } from "../../Campos";
import s from "../../red.module.css";

export default function PerfilForm({ valores }: { valores: Record<string, string> }) {
  const [estado, accion, enviando] = useActionState(actualizarPerfil, { n: 0, valores } as EstadoPerfil);
  return (
    <form key={estado.n} action={accion} className={s.form} noValidate>
      {estado.ok && <p className={s.aviso} role="status">Listo, tus datos quedaron guardados.</p>}
      {estado.error && <p className={s.alerta} role="alert">{estado.error}</p>}
      <CamposPersona v={estado.valores ?? valores} e={estado.errores ?? {}} />
      <label className={s.check}>
        <input type="checkbox" name="aceptaMensajes" defaultChecked={(estado.valores ?? valores).aceptaMensajes === "on"} />
        <span>Quiero recibir noticias de Claudia por WhatsApp. <span className={s.opcional}>(Opcional. Puedes quitarlo cuando quieras.)</span></span>
      </label>
      <button className={s.boton} disabled={enviando}>{enviando ? "Guardando…" : "Guardar cambios"}</button>
    </form>
  );
}
