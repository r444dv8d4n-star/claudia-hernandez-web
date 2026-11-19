"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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
  const [clave, setClave] = useState(""); // se conserva aunque haya un error en otro campo
  const [autoriza, setAutoriza] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Si hay errores, llevar a la persona al primer campo que debe corregir.
  useEffect(() => {
    if (!estado.errores) return;
    const primero = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    primero?.scrollIntoView({ behavior: "smooth", block: "center" });
    primero?.focus({ preventScroll: true });
  }, [estado]);

  if (estado.ok) {
    return (
      <div className={s.exito} role="status">
        <h1>¡Listo, {estado.nombre}!</h1>
        <p className={s.sub}>Tu cuenta quedó creada. Este es tu código para invitar:</p>
        <p className={s.codigoGrande}>{estado.codigo}</p>
        <Link className={s.boton} style={{ display: "grid", placeItems: "center", textDecoration: "none" }} href={estado.entro ? "/mi-red" : "/login"}>
          {estado.entro ? "Ir a mi red e invitar" : "Iniciar sesión"}
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1>Crear cuenta</h1>
      <p className={s.sub}>Crea tu cuenta y empieza a invitar.</p>
      <form key={estado.n} ref={formRef} action={accion} className={s.form} noValidate>
        {estado.error && <p className={s.alerta} role="alert">{estado.error}</p>}

        <CamposPersona v={v} e={e} />

        <Campo v={v} e={e} name="codigo" label="Código de quien te invitó" placeholder="Pídeselo a quien te trajo" autoComplete="off" maxLength={6} opcional style={{ textTransform: "uppercase" }} />

        <div className={s.campo}>
          <label htmlFor="contrasena">Contraseña</label>
          <Clave autoComplete="new-password" error={e.contrasena} ayuda="Mínimo 8 caracteres, con letras y números." valor={clave} alCambiar={setClave} />
        </div>

        <div>
          <label className={s.check}>
            <input type="checkbox" name="autoriza" required checked={autoriza} onChange={(ev) => setAutoriza(ev.target.checked)} aria-invalid={e.autoriza ? true : undefined} aria-describedby={e.autoriza ? "autoriza-err" : undefined} />
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
