"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { registrar, type EstadoRegistro } from "./actions";
import { Campo, CamposPersona } from "../Campos";
import Clave from "../Clave";
import s from "../red.module.css";

const inicial: EstadoRegistro = { n: 0 };

export default function RegistroForm() {
  const ref = (useSearchParams().get("ref") ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  const [estado, accion, enviando] = useActionState(registrar, inicial);
  const v = { ...estado.valores, codigo: estado.valores?.codigo || ref };
  const e = estado.errores ?? {};

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

  return (
    <>
      <h1>Crear cuenta</h1>
      <p className={s.sub}>Crea tu cuenta y empieza a invitar.</p>
      <form key={estado.n} action={accion} className={s.form} noValidate>
        {estado.error && <p className={s.alerta} role="alert">{estado.error}</p>}

        <CamposPersona v={v} e={e} />

        <Campo v={v} e={e} name="codigo" label="Código de quien te invitó" placeholder="Pídeselo a quien te trajo" autoComplete="off" maxLength={6} opcional style={{ textTransform: "uppercase" }} />

        <div className={s.campo}>
          <label htmlFor="contrasena">Contraseña</label>
          <Clave autoComplete="new-password" error={e.contrasena} ayuda="Mínimo 8 caracteres, con letras y números." />
        </div>

        <div>
          <label className={s.check}>
            <input type="checkbox" name="autoriza" required aria-invalid={e.autoriza ? true : undefined} aria-describedby={e.autoriza ? "autoriza-err" : undefined} />
            <span>Autorizo el tratamiento de mis datos personales conforme a la <Link href="/terminos" target="_blank">política de tratamiento de datos</Link>.</span>
          </label>
          {e.autoriza && <p id="autoriza-err" className={s.err} style={{ margin: "6px 0 0 34px" }}>{e.autoriza}</p>}
        </div>

        <button className={s.boton} disabled={enviando}>{enviando ? "Creando tu cuenta…" : "Crear cuenta"}</button>
        <p className={s.bajo}>¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></p>
      </form>
    </>
  );
}
