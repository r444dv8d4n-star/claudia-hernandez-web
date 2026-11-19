"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseSesion } from "@/lib/supabase/server";
import { leerRegistro, validarRegistro, type Errores } from "@/lib/red/validar";
import { RED } from "@/content/red";

export type EstadoRegistro = {
  /** Cambia en cada envío para volver a pintar el formulario con los valores. */
  n: number;
  ok?: boolean;
  /** Quedó con la sesión abierta (entra directo a su red). */
  entro?: boolean;
  codigo?: string;
  nombre?: string;
  error?: string;
  errores?: Errores;
  valores?: Record<string, string>;
};

const MENSAJES: Record<string, { campo?: keyof Errores; texto: string }> = {
  MENOR_DE_EDAD: { campo: "fechaNacimiento", texto: `Debes ser mayor de ${RED.edadMinima} años para registrarte.` },
  FECHA_INVALIDA: { campo: "fechaNacimiento", texto: "Revisa la fecha de nacimiento." },
  CODIGO_NO_EXISTE: { campo: "codigo", texto: "Ese código de invitación no existe. Revísalo o déjalo vacío." },
};

export async function registrar(prev: EstadoRegistro, fd: FormData): Promise<EstadoRegistro> {
  const d = leerRegistro(fd);
  const valores = {
    nombre: d.nombre, documento: d.documento, telefono: d.telefono, direccion: d.direccion,
    municipio: String(fd.get("municipio") ?? ""), municipioOtro: String(fd.get("municipioOtro") ?? ""),
    barrio: d.barrio, fechaNacimiento: d.fechaNacimiento, correo: d.correo, codigo: d.codigo,
  };
  const n = prev.n + 1;
  const fallo = (e: Partial<EstadoRegistro>): EstadoRegistro => ({ n, valores, ...e });

  const errores = validarRegistro(d);
  if (Object.keys(errores).length) return fallo({ errores, error: "Revisa los campos marcados." });

  const sb = supabaseAdmin();

  // No repetir documento, teléfono ni correo.
  // (Tres consultas con .eq: los valores nunca se pegan dentro de un filtro de texto.)
  const existe = async (campo: "documento" | "telefono" | "correo", valor: string) => {
    const { count, error } = await sb.from("personas").select("nodo_id", { count: "exact", head: true }).eq(campo, valor);
    if (error) throw error;
    return (count ?? 0) > 0;
  };
  const rep: Errores = {};
  try {
    const [doc, tel, mail] = await Promise.all([existe("documento", d.documento), existe("telefono", d.telefono), existe("correo", d.correo)]);
    if (doc) rep.documento = "Ya hay una cuenta con este documento. Inicia sesión.";
    if (tel) rep.telefono = "Ya hay una cuenta con este celular. Inicia sesión.";
    if (mail) rep.correo = "Ya hay una cuenta con este correo. Inicia sesión.";
  } catch {
    return fallo({ error: "No pudimos crear tu cuenta. Intenta de nuevo en unos minutos." });
  }
  if (Object.keys(rep).length) return fallo({ errores: rep, error: "Ya estás registrado con alguno de estos datos." });

  // Crear la cuenta (la contraseña la guarda Supabase cifrada, nunca en texto).
  const { data: creado, error: errCuenta } = await sb.auth.admin.createUser({
    email: d.correo,
    password: d.contrasena,
    email_confirm: true,
  });
  if (errCuenta || !creado.user) {
    const yaExiste = /already|registered|exists/i.test(errCuenta?.message ?? "");
    return fallo(yaExiste
      ? { errores: { correo: "Ya hay una cuenta con este correo. Inicia sesión." }, error: "Ya estás registrado." }
      : { error: "No pudimos crear tu cuenta. Intenta de nuevo en unos minutos." });
  }

  // Guardar su lugar en la red y sus datos, con la versión de la política que aceptó.
  const { data: codigo, error: errRed } = await sb.rpc("registrar_persona", {
    p_user_id: creado.user.id,
    p_nombre: d.nombre,
    p_documento: d.documento,
    p_telefono: d.telefono,
    p_correo: d.correo,
    p_direccion: d.direccion,
    p_municipio: d.municipio,
    p_barrio: d.barrio,
    p_fecha_nacimiento: d.fechaNacimiento,
    p_codigo_invitacion: d.codigo,
    p_politica_version: RED.politicaVersion,
  });
  if (errRed || !codigo) {
    await sb.auth.admin.deleteUser(creado.user.id); // no dejar cuentas a medias
    const m = Object.entries(MENSAJES).find(([k]) => errRed?.message?.includes(k))?.[1];
    if (m?.campo) return fallo({ errores: { [m.campo]: m.texto }, error: "Revisa los campos marcados." });
    if (/duplicate|unique/i.test(errRed?.message ?? "")) return fallo({ error: "Ya hay una cuenta con alguno de estos datos. Inicia sesión." });
    return fallo({ error: "No pudimos crear tu cuenta. Intenta de nuevo en unos minutos." });
  }

  // Entra de una vez: no tiene que volver a escribir su celular y su contraseña.
  const sesion = await supabaseSesion({ escribir: true });
  const { error: errEntrar } = await sesion.auth.signInWithPassword({ email: d.correo, password: d.contrasena });

  return { n, ok: true, entro: !errEntrar, codigo: String(codigo), nombre: d.nombre.split(" ")[0] };
}
