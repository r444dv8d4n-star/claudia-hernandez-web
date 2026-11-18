import "server-only";
import { notFound } from "next/navigation";
import { usuarioActual } from "@/lib/supabase/server";

/**
 * Exige una sesión de administrador. Si no hay sesión, o la persona no es administradora,
 * la página responde "no existe" (no se revela que el panel está ahí).
 */
export async function exigirAdmin() {
  const yo = await usuarioActual();
  if (!yo) notFound();
  const { data: es } = await yo.sb.rpc("es_admin");
  if (es !== true) notFound();
  return yo;
}
