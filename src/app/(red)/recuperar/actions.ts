"use server";

import { headers } from "next/headers";
import { supabaseSesion } from "@/lib/supabase/server";
import { bloqueado, anotarIntento } from "@/lib/red/intentos";

export type EstadoRecuperar = { n: number; enviado?: boolean; error?: string; correo?: string };

/** Dirección pública del sitio (para el enlace del correo). */
async function origen() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function pedirEnlace(prev: EstadoRecuperar, fd: FormData): Promise<EstadoRecuperar> {
  const correo = String(fd.get("correo") ?? "").trim().toLowerCase();
  const n = prev.n + 1;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) return { n, error: "Escribe el correo con el que te registraste.", correo };

  // Siempre se responde lo mismo, exista o no la cuenta, para no revelar quién está en la red.
  if (!(await bloqueado("recuperar", correo))) {
    await anotarIntento("recuperar", correo);
    const sb = await supabaseSesion();
    await sb.auth.resetPasswordForEmail(correo, { redirectTo: `${await origen()}/auth/confirmar?siguiente=/nueva-clave` });
  }
  return { n, enviado: true, correo };
}
