"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { usuarioActual } from "@/lib/supabase/server";
import { leerRegistro, validarDatos, type Errores } from "@/lib/red/validar";

export type EstadoPerfil = { n: number; ok?: boolean; error?: string; errores?: Errores; valores?: Record<string, string> };

export async function actualizarPerfil(prev: EstadoPerfil, fd: FormData): Promise<EstadoPerfil> {
  const n = prev.n + 1;
  const d = leerRegistro(fd);
  const valores = {
    nombre: d.nombre, documento: d.documento, telefono: d.telefono, direccion: d.direccion,
    municipio: String(fd.get("municipio") ?? ""), municipioOtro: String(fd.get("municipioOtro") ?? ""),
    barrio: d.barrio, fechaNacimiento: d.fechaNacimiento, correo: d.correo,
  };
  const fallo = (e: Partial<EstadoPerfil>): EstadoPerfil => ({ n, valores, ...e });

  const errores = validarDatos(d);
  if (Object.keys(errores).length) return fallo({ errores, error: "Revisa los campos marcados." });

  const yo = await usuarioActual();
  if (!yo) redirect("/login");
  const sb = supabaseAdmin();
  const { data: nodo } = await sb.from("nodos").select("id").eq("user_id", yo.id).maybeSingle();
  if (!nodo) redirect("/login");
  const { data: actual } = await sb.from("personas").select("correo").eq("nodo_id", nodo.id).maybeSingle();

  // Documento, celular y correo no pueden ser de otra persona.
  const deOtro = async (campo: "documento" | "telefono" | "correo", valor: string) => {
    const { count } = await sb.from("personas").select("nodo_id", { count: "exact", head: true }).eq(campo, valor).neq("nodo_id", nodo.id);
    return (count ?? 0) > 0;
  };
  const rep: Errores = {};
  const [doc, tel, mail] = await Promise.all([deOtro("documento", d.documento), deOtro("telefono", d.telefono), deOtro("correo", d.correo)]);
  if (doc) rep.documento = "Este documento ya está en otra cuenta.";
  if (tel) rep.telefono = "Este celular ya está en otra cuenta.";
  if (mail) rep.correo = "Este correo ya está en otra cuenta.";
  if (Object.keys(rep).length) return fallo({ errores: rep, error: "Revisa los campos marcados." });

  if (actual && actual.correo !== d.correo) {
    const { error } = await sb.auth.admin.updateUserById(yo.id, { email: d.correo, email_confirm: true });
    if (error) return fallo({ errores: { correo: "No pudimos cambiar el correo. Prueba con otro." }, error: "Revisa los campos marcados." });
  }

  const { error } = await sb.from("personas").update({
    nombre: d.nombre, documento: d.documento, telefono: d.telefono, correo: d.correo, direccion: d.direccion,
    municipio: d.municipio, barrio: d.barrio || null, fecha_nacimiento: d.fechaNacimiento, actualizado_en: new Date().toISOString(),
  }).eq("nodo_id", nodo.id);
  if (error) return fallo({ error: "No pudimos guardar los cambios. Intenta de nuevo." });

  return { n, ok: true, valores };
}

/** Elimina la cuenta sin pedir permiso a nadie: borra los datos y deja su lugar vacío en la red. */
export async function eliminarCuenta(_: unknown, fd: FormData): Promise<{ error?: string }> {
  if (fd.get("confirmo") !== "on") return { error: "Marca la casilla para confirmar." };
  const yo = await usuarioActual({ escribir: true });
  if (!yo) redirect("/login");

  const sb = supabaseAdmin();
  const { error } = await sb.rpc("vaciar_nodo", { p_user_id: yo.id });
  if (error) return { error: "No pudimos eliminar la cuenta. Intenta de nuevo." };
  await sb.auth.admin.deleteUser(yo.id);
  await yo.sb.auth.signOut();
  redirect("/cuenta-eliminada");
}
