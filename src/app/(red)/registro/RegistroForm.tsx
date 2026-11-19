"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { registrar, type EstadoRegistro } from "./actions";
import { Campo, CamposPersona } from "../Campos";
import Clave from "../Clave";
import { leerRegistro, validarRegistro, type Errores } from "@/lib/red/validar";
import { medir } from "@/lib/red/medir";
import s from "../red.module.css";

const inicial: EstadoRegistro = { n: 0 };
/** Campos del paso 1 (contacto); el resto va en el paso 2. */
const PASO1: (keyof Errores)[] = ["nombre", "telefono", "correo", "fechaNacimiento", "contrasena"];

/**
 * Registro en 2 pasos: 1) datos de contacto y contraseña, 2) dónde vive y autorización.
 * Todo se envía junto al final; los dos pasos están en el mismo formulario (lo oculto también se envía).
 */
export default function RegistroForm() {
  const ref = (useSearchParams().get("ref") ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  const [estado, accion, enviando] = useActionState(registrar, inicial);
  const v = { ...estado.valores, codigo: estado.valores?.codigo || ref };
  const [paso, setPaso] = useState<1 | 2>(1);
  const [errLocal, setErrLocal] = useState<Errores>({});
  const e = { ...(estado.errores ?? {}), ...errLocal };
  const [clave, setClave] = useState(""); // se conserva aunque haya un error en otro campo
  const [autoriza, setAutoriza] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => { medir("registro_visto"); }, []);
  useEffect(() => { if (estado.ok) medir("registro_completo"); }, [estado.ok]);

  // Cuando llega una respuesta nueva del servidor con errores: volver al paso donde está el primero.
  // (Se ajusta durante el render, el patrón que recomienda React para estado derivado.)
  const [respuesta, setRespuesta] = useState(0);
  if (estado.n !== respuesta) {
    setRespuesta(estado.n);
    setErrLocal({});
    if (estado.errores) setPaso(Object.keys(estado.errores).some((k) => PASO1.includes(k as keyof Errores)) ? 1 : 2);
  }
  // Llevar a la persona al primer campo que debe corregir.
  useEffect(() => {
    const primero = formRef.current?.querySelector<HTMLElement>(`[data-paso="${paso}"] [aria-invalid="true"]`);
    primero?.scrollIntoView({ behavior: "smooth", block: "center" });
    primero?.focus({ preventScroll: true });
  }, [paso, estado, errLocal]);

  const continuar = () => {
    if (!formRef.current) return;
    const todos = validarRegistro(leerRegistro(new FormData(formRef.current)));
    const delPaso1 = Object.fromEntries(Object.entries(todos).filter(([k]) => PASO1.includes(k as keyof Errores))) as Errores;
    setErrLocal(delPaso1);
    if (Object.keys(delPaso1).length === 0) {
      setPaso(2);
      medir("registro_paso2");
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      <div className={s.pasos} aria-label={`Paso ${paso} de 2`}>
        <span className={paso === 1 ? s.pasoActivo : s.pasoHecho}>1. Tus datos</span>
        <span className={paso === 2 ? s.pasoActivo : undefined}>2. Dónde vives</span>
      </div>
      <form key={estado.n} ref={formRef} action={accion} className={s.form} noValidate>
        {estado.error && <p className={s.alerta} role="alert">{estado.error}</p>}

        <div data-paso="1" className={s.form} hidden={paso !== 1}>
          <CamposPersona v={v} e={e} parte="contacto" />
          <div className={s.campo}>
            <label htmlFor="contrasena">Crea una contraseña</label>
            <Clave autoComplete="new-password" error={e.contrasena} ayuda="Mínimo 8 caracteres, con letras y números." valor={clave} alCambiar={setClave} />
          </div>
          <button type="button" className={s.boton} onClick={continuar}>Continuar</button>
        </div>

        <div data-paso="2" className={s.form} hidden={paso !== 2}>
          <CamposPersona v={v} e={e} parte="lugar" />
          <Campo v={v} e={e} name="codigo" label="Código de quien te invitó" placeholder="Pídeselo a quien te trajo" autoComplete="off" maxLength={6} opcional style={{ textTransform: "uppercase" }} />
          <div>
            <label className={s.check}>
              <input type="checkbox" name="autoriza" required checked={autoriza} onChange={(ev) => setAutoriza(ev.target.checked)} aria-invalid={e.autoriza ? true : undefined} aria-describedby={e.autoriza ? "autoriza-err" : undefined} />
              <span>Autorizo el tratamiento de mis datos personales conforme a la <Link href="/terminos" target="_blank">política de tratamiento de datos</Link>.</span>
            </label>
            {e.autoriza && <p id="autoriza-err" className={s.err} style={{ margin: "6px 0 0 34px" }}>{e.autoriza}</p>}
          </div>
          <button className={s.boton} disabled={enviando}>{enviando ? "Creando tu cuenta…" : "Crear cuenta"}</button>
          <button type="button" className={s.enlaceBoton} style={{ justifySelf: "center" }} onClick={() => setPaso(1)}>← Volver al paso 1</button>
        </div>

        <p className={s.bajo}>¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></p>
      </form>
    </>
  );
}
