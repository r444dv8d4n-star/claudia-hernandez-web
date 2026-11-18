"use server";

import { supabaseSesion } from "@/lib/supabase/server";
import { bloqueado, anotarIntento } from "@/lib/red/intentos";
import { origen } from "@/lib/red/origen";

export type EstadoRecuperar = { n: number; enviado?: boolean; error?: string; correo?: string };

export async function pedirEnlace(prev: EstadoRecuperar, fd: FormData): Promise<EstadoRecuperar> {
  const correo = String(fd.get("correo") ?? "").trim().toLowerCase();
  const n = prev.n + 1;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) return { n, error: "Escribe el correo con el que te registraste.", correo };

  // Siempre se responde lo mismo, exista o no la cuenta, para no revelar quién está en la red.
  if (!(await bloqueado("recuperar", correo))) {
    await anotarIntento("recuperar", correo);
    const sb = await supabaseSesion({ escribir: true });
    await sb.auth.resetPasswordForEmail(correo, { redirectTo: `${await origen()}/auth/confirmar?siguiente=/nueva-clave` });
  }
  return { n, enviado: true, correo };
}
