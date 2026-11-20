"use client";

import { useState } from "react";
import { municipios, barriosFloridablanca } from "@/content/red";
import { TIPOS_DOCUMENTO } from "@/lib/red/validar";
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

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/**
 * Fecha de nacimiento con tres listas (día, mes y año). Más fácil que un calendario:
 * nadie tiene que retroceder decenas de años mes por mes. Envía «fechaNacimiento» como AAAA-MM-DD.
 */
function FechaNacimiento({ v, e }: { v: Valores; e: Errs }) {
  const [a0, m0, d0] = (v.fechaNacimiento ?? "").split("-");
  const [anio, setAnio] = useState(a0 ?? "");
  const [mes, setMes] = useState(m0 ?? "");
  const [dia, setDia] = useState(d0 ?? "");
  const hoy = new Date().getFullYear();
  const anios = Array.from({ length: 90 }, (_, i) => String(hoy - 18 - i));
  const valor = anio && mes && dia ? `${anio}-${mes}-${dia}` : "";
  const err = e.fechaNacimiento;
  return (
    <fieldset className={s.fecha} aria-describedby={err ? "fecha-err" : undefined}>
      <legend>Fecha de nacimiento</legend>
      <div className={s.fechaListas}>
        <select aria-label="Día" value={dia} onChange={(ev) => setDia(ev.target.value)} aria-invalid={err ? true : undefined}>
          <option value="">Día</option>
          {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map((d) => <option key={d} value={d}>{Number(d)}</option>)}
        </select>
        <select aria-label="Mes" value={mes} onChange={(ev) => setMes(ev.target.value)} aria-invalid={err ? true : undefined}>
          <option value="">Mes</option>
          {MESES.map((m, i) => <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>)}
        </select>
        <select aria-label="Año" value={anio} onChange={(ev) => setAnio(ev.target.value)} aria-invalid={err ? true : undefined}>
          <option value="">Año</option>
          {anios.map((a) => <option key={a}>{a}</option>)}
        </select>
      </div>
      <input type="hidden" name="fechaNacimiento" value={valor} />
      {err && <span id="fecha-err" className={s.err}>{err}</span>}
    </fieldset>
  );
}

/** Tipo y número de documento. El pasaporte acepta letras; los demás, solo números. */
function Documento({ v, e }: { v: Valores; e: Errs }) {
  const [tipo, setTipo] = useState(v.tipoDocumento || "CC");
  const pasaporte = tipo === "PA";
  return (
    <div className={s.fila}>
      <div className={s.campo}>
        <label htmlFor="tipoDocumento">Tipo de documento</label>
        <select id="tipoDocumento" name="tipoDocumento" value={tipo} onChange={(ev) => setTipo(ev.target.value)}>
          {TIPOS_DOCUMENTO.map((x) => <option key={x.v} value={x.v}>{x.t}</option>)}
        </select>
      </div>
      <Campo v={v} e={e} name="documento" label="Número de documento" placeholder={pasaporte ? "AB123456" : "1098765432"}
        inputMode={pasaporte ? "text" : "numeric"} autoComplete="off" maxLength={12} style={pasaporte ? { textTransform: "uppercase" } : undefined} />
    </div>
  );
}

/** Datos personales: los mismos en el registro y en «Mi perfil». */
export function CamposPersona({ v, e, parte = "todo" }: { v: Valores; e: Errs; parte?: "todo" | "contacto" | "lugar" }) {
  const [municipio, setMunicipio] = useState(v.municipio || "Floridablanca");
  const contacto = (
    <>
      <Campo v={v} e={e} name="nombre" label="Nombres y apellidos" placeholder="Como aparece en tu cédula" autoComplete="name" ayuda="Escríbelos completos, los dos nombres y los dos apellidos." />
      <div className={s.fila}>
        <Campo v={v} e={e} name="telefono" label="Celular" placeholder="3001234567" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={13} />
        <Campo v={v} e={e} name="correo" label="Correo" type="email" placeholder="tu@correo.com" autoComplete="email" inputMode="email" />
      </div>
      <FechaNacimiento v={v} e={e} />
    </>
  );
  const lugar = (
    <>
      <Documento v={v} e={e} />
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
    </>
  );
  if (parte === "contacto") return contacto;
  if (parte === "lugar") return lugar;
  return (
    <>
      <Campo v={v} e={e} name="nombre" label="Nombres y apellidos" placeholder="Como aparece en tu cédula" autoComplete="name" ayuda="Escríbelos completos, los dos nombres y los dos apellidos." />

      <Documento v={v} e={e} />
      <Campo v={v} e={e} name="telefono" label="Celular" placeholder="3001234567" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={13} />

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
        <FechaNacimiento v={v} e={e} />
        <Campo v={v} e={e} name="correo" label="Correo" type="email" placeholder="tu@correo.com" autoComplete="email" inputMode="email" />
      </div>
    </>
  );
}
