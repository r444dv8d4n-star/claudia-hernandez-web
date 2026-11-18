"use server";

import { redirect } from "next/navigation";
import { usuarioActual } from "@/lib/supabase/server";

export type EstadoClave = { n: number; error?: string };

export async function cambiarClave(prev: EstadoClave, fd: FormData): Promise<EstadoClave> {
  const n = prev.n + 1;
  const clave = String(fd.get("contrasena") ?? "");
  const repetir = String(fd.get("repetir") ?? "");
  if (clave.length < 8) return { n, error: "La contraseña debe tener al menos 8 caracteres." };
  if (!/[A-Za-zÀ-ÿ]/.test(clave) || !/\d/.test(clave)) return { n, error: "Usa letras y números en tu contraseña." };
  if (clave !== repetir) return { n, error: "Las dos contraseñas no coinciden." };

  const yo = await usuarioActual();
  if (!yo) return { n, error: "El enlace venció. Pide uno nuevo desde «¿Olvidaste tu contraseña?»." };
  const { error } = await yo.sb.auth.updateUser({ password: clave });
  if (error) return { n, error: "No pudimos cambiar la contraseña. Intenta de nuevo." };
  redirect("/mi-red");
}
