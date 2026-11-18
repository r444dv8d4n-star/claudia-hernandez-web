import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Cliente de Supabase con la llave secreta. SOLO para el servidor: salta la seguridad por filas,
 * así que nunca se importa en un componente del navegador ("server-only" lo impide).
 */
export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Faltan las llaves de Supabase en el servidor.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
