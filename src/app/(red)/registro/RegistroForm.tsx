"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { registrar, type EstadoRegistro } from "./actions";
import { municipios, barriosFloridablanca } from "@/content/red";
import s from "../red.module.css";

const inicial: EstadoRegistro = { n: 0 };

export default function RegistroForm() {
  const ref = (useSearchParams().get("ref") ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  const [estado, accion, enviando] = useActionState(registrar, inicial);
  const v = estado.valores ?? {};
  const e = estado.errores ?? {};
  const [municipio, setMunicipio] = useState(v.municipio || "Floridablanca");
  const [verClave, setVerClave] = useState(false);

  if (estado.ok) {
    return (
      <div className={s.exito} role="status">
        <h1>¡Listo, {estado.nombre}!</h1>
        <p className={s.sub}>Tu cuenta quedó creada. Este es tu código para invitar:</p>
        <p className={s.codigoGrande}>{estado.codigo}</p>
        <Link className={s.boton} style={{ display: "grid", placeItems: "center", textDecoration: "none" }} href="/login">Iniciar sesión</Link>
      </div>
    );
  }

  // Cada campo con su etiqueta, su error y su ayuda conectados para lectores de pantalla.
  const campo = (
    name: string, label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> & { ayuda?: string; opcional?: boolean } = {},
  ) => {
    const { ayuda, opcional, ...input } = props;
    const err = e[name as keyof typeof e];
    const desc = [err && `${name}-err`, ayuda && `${name}-ayuda`].filter(Boolean).join(" ") || undefined;
    return (
      <div className={s.campo}>
        <label htmlFor={name}>{label}{opcional && <span className={s.opcional}> (opcional)</span>}</label>
        <input id={name} name={name} defaultValue={v[name] ?? ""} aria-invalid={err ? true : undefined} aria-describedby={desc} required={!opcional} {...input} />
        {err && <span id={`${name}-err`} className={s.err}>{err}</span>}
        {ayuda && <span id={`${name}-ayuda`} className={s.ayuda}>{ayuda}</span>}
      </div>
    );
  };

  return (
    <>
    <h1>Crear cuenta</h1>
    <p className={s.sub}>Crea tu cuenta y empieza a invitar.</p>
    <form key={estado.n} action={accion} className={s.form} noValidate>
      {estado.error && <p className={s.alerta} role="alert">{estado.error}</p>}

      {campo("nombre", "Nombres y apellidos", { placeholder: "Como aparece en tu cédula", autoComplete: "name", ayuda: "Escríbelos completos, los dos nombres y los dos apellidos." })}

      <div className={s.fila}>
        {campo("documento", "Documento", { placeholder: "1098765432", inputMode: "numeric", autoComplete: "off", maxLength: 12 })}
        {campo("telefono", "Teléfono", { placeholder: "3001234567", type: "tel", inputMode: "numeric", autoComplete: "tel-national", maxLength: 13 })}
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
          ? campo("municipioOtro", "¿Cuál municipio?", { placeholder: "Escribe tu municipio" })
          : campo("barrio", "Barrio", { placeholder: "Empieza a escribir", list: municipio === "Floridablanca" ? "barrios" : undefined, autoComplete: "off", opcional: true })}
      </div>
      <datalist id="barrios">{barriosFloridablanca.map((b) => <option key={b} value={b} />)}</datalist>

      {campo("direccion", "Dirección", { placeholder: "Ej.: Calle 5 # 8-20", autoComplete: "street-address", ayuda: "Escríbela como la conoces." })}

      <div className={s.fila}>
        {campo("fechaNacimiento", "Fecha de nacimiento", { type: "date", autoComplete: "bday", min: "1915-01-01" })}
        {campo("correo", "Correo", { type: "email", placeholder: "tu@correo.com", autoComplete: "email", inputMode: "email" })}
      </div>

      {campo("codigo", "Código de quien te invitó", { placeholder: "Pídeselo a quien te trajo", defaultValue: v.codigo || ref, autoComplete: "off", maxLength: 6, opcional: true, style: { textTransform: "uppercase" } })}

      <div className={s.campo}>
        <label htmlFor="contrasena">Contraseña</label>
        <div className={s.clave}>
          <input id="contrasena" name="contrasena" type={verClave ? "text" : "password"} autoComplete="new-password" required minLength={8}
            aria-invalid={e.contrasena ? true : undefined} aria-describedby={e.contrasena ? "contrasena-err contrasena-ayuda" : "contrasena-ayuda"} />
          <button type="button" className={s.ojo} onClick={() => setVerClave((x) => !x)} aria-label={verClave ? "Ocultar contraseña" : "Ver contraseña"} aria-pressed={verClave}>
            {verClave ? <OjoCerrado /> : <Ojo />}
          </button>
        </div>
        {e.contrasena && <span id="contrasena-err" className={s.err}>{e.contrasena}</span>}
        <span id="contrasena-ayuda" className={s.ayuda}>Mínimo 8 caracteres, con letras y números.</span>
      </div>

      <div>
        <label className={s.check}>
          <input type="checkbox" name="autoriza" required aria-invalid={e.autoriza ? true : undefined} />
          <span>Autorizo el tratamiento de mis datos personales conforme a la <Link href="/terminos" target="_blank">política de tratamiento de datos</Link>.</span>
        </label>
        {e.autoriza && <p className={s.err} style={{ margin: "6px 0 0 34px" }}>{e.autoriza}</p>}
      </div>

      <button className={s.boton} disabled={enviando}>{enviando ? "Creando tu cuenta…" : "Crear cuenta"}</button>
      <p className={s.bajo}>¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></p>
    </form>
    </>
  );
}

const Ojo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const OjoCerrado = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3l18 18" /><path d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6A17.4 17.4 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
);
