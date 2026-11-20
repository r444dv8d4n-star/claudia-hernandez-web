"use server";

import { exigirAdmin } from "@/lib/red/admin";

export type Fila = {
  nombre: string; tipo_documento: string; documento: string; telefono: string; correo: string; municipio: string; barrio: string | null;
  codigo: string; registrado: string; invitado_por: string | null; directos: number; acepta_mensajes: boolean;
};
export type Completo = { nombre: string; tipo_documento: string; documento: string; telefono: string; correo: string; direccion: string };

/** Datos completos de una persona (el buscador los muestra ocultos). Cada consulta queda en la auditoría. */
export async function verDatos(codigo: string): Promise<Completo | null> {
  if (!/^[A-Z2-9]{6}$/.test(codigo)) return null;
  const yo = await exigirAdmin();
  const { data, error } = await yo.sb.rpc("admin_ver_persona", { p_codigo: codigo });
  if (error || !data) return null;
  return data as Completo;
}
export type EstadoBusqueda = { q: string; filas?: Fila[]; error?: string };

export async function buscar(_: EstadoBusqueda, fd: FormData): Promise<EstadoBusqueda> {
  const q = String(fd.get("q") ?? "").trim().slice(0, 80);
  if (q.length < 2) return { q, error: "Escribe al menos 2 letras o números." };
  const yo = await exigirAdmin();
  const { data, error } = await yo.sb.rpc("admin_buscar", { p_texto: q });
  if (error) return { q, error: "No se pudo buscar. Intenta de nuevo." };
  return { q, filas: (data ?? []) as Fila[] };
}

export type EstadoEquipo = { n: number; ok?: string; error?: string };

const MENSAJE: Record<string, string> = {
  OK: "Listo.",
  NO_REGISTRADO: "Ese correo no está registrado. La persona primero debe crear su cuenta en /registro.",
  YA_ES_ADMIN: "Esa persona ya es administradora.",
  NO_ES_ADMIN: "Esa persona no es administradora.",
  NO_A_SI_MISMO: "No puedes quitarte a ti mismo. Pídele a otro administrador que lo haga.",
};

export async function cambiarAdmin(prev: EstadoEquipo, fd: FormData): Promise<EstadoEquipo> {
  const n = prev.n + 1;
  const correo = String(fd.get("correo") ?? "").trim().toLowerCase();
  const accion = fd.get("accion") === "quitar" ? "admin_quitar" : "admin_agregar";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) return { n, error: "Escribe un correo válido." };
  const yo = await exigirAdmin();
  const { data, error } = await yo.sb.rpc(accion, { p_correo: correo });
  if (error) return { n, error: "No se pudo hacer el cambio. Intenta de nuevo." };
  const codigo = String(data);
  return codigo === "OK"
    ? { n, ok: accion === "admin_agregar" ? `${correo} ahora es administrador.` : `${correo} ya no es administrador.` }
    : { n, error: MENSAJE[codigo] ?? "No se pudo hacer el cambio." };
}
