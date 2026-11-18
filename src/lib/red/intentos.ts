import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Tipo = "login" | "recuperar";

/** Límites: por celular/correo y por conexión, en una ventana de 15 minutos. */
const LIMITE = { login: { clave: 5, ip: 30 }, recuperar: { clave: 3, ip: 10 } };
const VENTANA_MIN = 15;

const huella = (v: string) => createHash("sha256").update(`red-claudia:${v.toLowerCase()}`).digest("hex");

async function ipActual() {
  const h = await headers();
  return (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "desconocida";
}

/** ¿Se pasó del límite? (Si la base de datos falla, no bloquea a nadie.) */
export async function bloqueado(tipo: Tipo, valor: string) {
  const sb = supabaseAdmin();
  const desde = new Date(Date.now() - VENTANA_MIN * 60_000).toISOString();
  const ip = await ipActual();
  const contar = async (col: "clave" | "ip", v: string) => {
    const { count } = await sb.from("intentos").select("id", { count: "exact", head: true }).eq("tipo", tipo).eq(col, v).gte("creado_en", desde);
    return count ?? 0;
  };
  const [porClave, porIp] = await Promise.all([contar("clave", huella(valor)), contar("ip", ip)]);
  return porClave >= LIMITE[tipo].clave || porIp >= LIMITE[tipo].ip;
}

export async function anotarIntento(tipo: Tipo, valor: string) {
  await supabaseAdmin().from("intentos").insert({ tipo, clave: huella(valor), ip: await ipActual() });
}

export async function limpiarIntentos(tipo: Tipo, valor: string) {
  await supabaseAdmin().from("intentos").delete().eq("tipo", tipo).eq("clave", huella(valor));
}
