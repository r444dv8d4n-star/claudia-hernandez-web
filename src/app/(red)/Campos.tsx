"use client";

import { useState } from "react";
import { municipios, barriosFloridablanca } from "@/content/red";
import s from "./red.module.css";

type Valores = Record<string, string | undefined>;
type Errs = Record<string, string | undefined>;
type Props = React.InputHTMLAttributes<HTMLInputElement> & { ayuda?: string; opcional?: boolean };

/** Campo con etiqueta, error y ayuda conectados para lectores de pantalla. */
export function Campo({ name, label, v, e, ayuda, opcional, ...input }: Props & { name: string; label: string; v: Valores; e: Errs }) {
  const err = e[name];
  const desc = [err && `${name}-err`, ayuda && `${name}-ayuda`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={s.campo}>
      <label htmlFor={name}>{label}{opcional && <span className={s.opcional}> (opcional)</span>}</label>
      <input id={name} name={name} defaultValue={v[name] ?? ""} aria-invalid={err ? true : undefined} aria-describedby={desc} required={!opcional} {...input} />
      {err && <span id={`${name}-err`} className={s.err}>{err}</span>}
      {ayuda && <span id={`${name}-ayuda`} className={s.ayuda}>{ayuda}</span>}
    </div>
  );
}

/** Datos personales: los mismos en el registro y en «Mi perfil». */
export function CamposPersona({ v, e }: { v: Valores; e: Errs }) {
  const [municipio, setMunicipio] = useState(v.municipio || "Floridablanca");
  return (
    <>
      <Campo v={v} e={e} name="nombre" label="Nombres y apellidos" placeholder="Como aparece en tu cédula" autoComplete="name" ayuda="Escríbelos completos, los dos nombres y los dos apellidos." />

      <div className={s.fila}>
        <Campo v={v} e={e} name="documento" label="Documento" placeholder="1098765432" inputMode="numeric" autoComplete="off" maxLength={12} />
        <Campo v={v} e={e} name="telefono" label="Teléfono" placeholder="3001234567" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={13} />
      </div>

      <div className={s.fila}>
        <div className={s.campo}>
          <label htmlFor="municipio">Municipio</label>
          <select id="municipio" name="municipio" value={municipio} onChange={(ev) => setMunicipio(ev.target.value)} aria-invalid={e.municipio ? true : undefined}>
            {municipios.map((m) => <option key={m}>{m}</option>)}
          </select>
          {e.municipio && <span className={s.err}>{e.municipio}</span>}
        </div>
        {municipio === "Otro"
          ? <Campo v={v} e={e} name="municipioOtro" label="¿Cuál municipio?" placeholder="Escribe tu municipio" />
          : <Campo v={v} e={e} name="barrio" label="Barrio" placeholder="Empieza a escribir" list={municipio === "Floridablanca" ? "barrios" : undefined} autoComplete="off" opcional />}
      </div>
      <datalist id="barrios">{barriosFloridablanca.map((b) => <option key={b} value={b} />)}</datalist>

      <Campo v={v} e={e} name="direccion" label="Dirección" placeholder="Ej.: Calle 5 # 8-20" autoComplete="street-address" ayuda="Escríbela como la conoces." />

      <div className={s.fila}>
        <Campo v={v} e={e} name="fechaNacimiento" label="Fecha de nacimiento" type="date" autoComplete="bday" min="1915-01-01" />
        <Campo v={v} e={e} name="correo" label="Correo" type="email" placeholder="tu@correo.com" autoComplete="email" inputMode="email" />
      </div>
    </>
  );
}
