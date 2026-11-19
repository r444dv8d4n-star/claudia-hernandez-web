"use client";

import { useState } from "react";
import s from "./red.module.css";

/** Campo de contraseña con el botón del ojo para verla. */
export default function Clave({ id = "contrasena", autoComplete, error, ayuda, valor, alCambiar }: { id?: string; autoComplete: string; error?: string; ayuda?: string; valor?: string; alCambiar?: (v: string) => void }) {
  const [ver, setVer] = useState(false);
  const desc = [error && `${id}-err`, ayuda && `${id}-ayuda`].filter(Boolean).join(" ") || undefined;
  return (
    <>
      <div className={s.clave}>
        <input id={id} name={id} type={ver ? "text" : "password"} autoComplete={autoComplete} required
          aria-invalid={error ? true : undefined} aria-describedby={desc}
          {...(alCambiar ? { value: valor ?? "", onChange: (ev: React.ChangeEvent<HTMLInputElement>) => alCambiar(ev.target.value) } : {})} />
        <button type="button" className={s.ojo} onClick={() => setVer((x) => !x)} aria-label={ver ? "Ocultar contraseña" : "Ver contraseña"} aria-pressed={ver}>
          {ver ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 3l18 18" /><path d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6A17.4 17.4 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {error && <span id={`${id}-err`} className={s.err}>{error}</span>}
      {ayuda && <span id={`${id}-ayuda`} className={s.ayuda}>{ayuda}</span>}
    </>
  );
}
