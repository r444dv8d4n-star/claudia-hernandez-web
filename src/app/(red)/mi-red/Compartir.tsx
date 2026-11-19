"use client";

import { useState } from "react";
import { RED } from "@/content/red";
import { medir } from "@/lib/red/medir";
import s from "../red.module.css";

/** Enlace para invitar: copiar y compartir por WhatsApp. */
export default function Compartir({ enlace, codigo }: { enlace: string; codigo: string }) {
  const [copiado, setCopiado] = useState<"" | "enlace" | "codigo">("");
  const copiar = async (texto: string, que: "enlace" | "codigo") => {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      // Navegadores sin permiso de portapapeles: se selecciona el texto para copiarlo a mano.
      const el = document.getElementById(`compartir-${que}`) as HTMLInputElement | null;
      el?.select();
    }
    setCopiado(que);
    medir("copiar_enlace");
    setTimeout(() => setCopiado(""), 2500);
  };
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${RED.mensajeInvitacion} ${enlace}`)}`;

  return (
    <div className={s.compartir}>
      <label className={s.etiqueta} htmlFor="compartir-enlace">Tu enlace para invitar</label>
      <div className={s.copiable}>
        <input id="compartir-enlace" readOnly value={enlace} onFocus={(e) => e.currentTarget.select()} />
        <button type="button" className={s.botonSec} onClick={() => copiar(enlace, "enlace")}>{copiado === "enlace" ? "¡Copiado!" : "Copiar"}</button>
      </div>
      <a className={`${s.boton} ${s.botonWa}`} href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => medir("compartir_whatsapp")}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.2-.2-.4-.3z" /></svg>
        Compartir por WhatsApp
      </a>
      <div className={s.codigoFila}>
        <span>Tu código: <strong id="compartir-codigo">{codigo}</strong></span>
        <button type="button" className={s.enlaceBoton} onClick={() => copiar(codigo, "codigo")}>{copiado === "codigo" ? "¡Copiado!" : "Copiar código"}</button>
      </div>
      <p className={s.ayuda} aria-live="polite">{copiado ? "Listo, ya lo puedes pegar donde quieras." : "Quien se registre con tu enlace queda en tu red."}</p>
    </div>
  );
}
