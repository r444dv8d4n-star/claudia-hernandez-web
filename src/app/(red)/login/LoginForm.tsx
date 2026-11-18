"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { entrar, type EstadoLogin } from "./actions";
import Clave from "../Clave";
import s from "../red.module.css";

export default function LoginForm() {
  const [estado, accion, enviando] = useActionState(entrar, { n: 0 } as EstadoLogin);
  const [modo, setModo] = useState<"celular" | "correo">(estado.modo ?? "celular");

  return (
    <form key={estado.n} action={accion} className={s.form} noValidate>
      {estado.error && <p className={s.alerta} role="alert">{estado.error}</p>}
      <input type="hidden" name="modo" value={modo} />

      <div className={s.campo}>
        <label htmlFor="usuario">{modo === "celular" ? "Celular" : "Correo"}</label>
        {modo === "celular" ? (
          <input id="usuario" name="usuario" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="3001234567" maxLength={13} required defaultValue={estado.modo === "celular" ? estado.usuario : ""} />
        ) : (
          <input id="usuario" name="usuario" type="email" inputMode="email" autoComplete="email" placeholder="tu@correo.com" required defaultValue={estado.modo === "correo" ? estado.usuario : ""} />
        )}
        <button type="button" className={s.enlaceBoton} onClick={() => setModo(modo === "celular" ? "correo" : "celular")}>
          {modo === "celular" ? "Entrar con mi correo" : "Entrar con mi celular"}
        </button>
      </div>

      <div className={s.campo}>
        <label htmlFor="contrasena">Contraseña</label>
        <Clave autoComplete="current-password" />
        <Link className={s.enlaceDer} href="/recuperar">¿Olvidaste tu contraseña?</Link>
      </div>

      <button className={s.boton} disabled={enviando}>{enviando ? "Entrando…" : "Iniciar sesión"}</button>
      <p className={s.bajo}>¿No tienes cuenta? <Link href="/registro">Regístrate</Link></p>
    </form>
  );
}
