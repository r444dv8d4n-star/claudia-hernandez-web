"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseSesion } from "@/lib/supabase/server";
import { bloqueado, anotarIntento, limpiarIntentos } from "@/lib/red/intentos";

export type EstadoLogin = { n: number; error?: string; modo?: "celular" | "correo"; usuario?: string };

const MAL = { celular: "El celular o la contraseña no coinciden.", correo: "El correo o la contraseña no coinciden." };

export async function entrar(prev: EstadoLogin, fd: FormData): Promise<EstadoLogin> {
  const modo = fd.get("modo") === "correo" ? "correo" : "celular";
  const crudo = String(fd.get("usuario") ?? "").trim();
  const usuario = modo === "celular" ? crudo.replace(/\D/g, "").replace(/^57(?=3\d{9}$)/, "") : crudo.toLowerCase();
  const contrasena = String(fd.get("contrasena") ?? "");
  const n = prev.n + 1;
  const fallo = (error: string): EstadoLogin => ({ n, error, modo, usuario: crudo });

  if (modo === "celular" && !/^3\d{9}$/.test(usuario)) return fallo("Escribe tu celular de 10 dígitos, el mismo con el que te registraste.");
  if (modo === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(usuario)) return fallo("Escribe el correo con el que te registraste.");
  if (!contrasena) return fallo("Escribe tu contraseña.");

  if (await bloqueado("login", usuario)) {
    return fallo("Hiciste demasiados intentos. Por seguridad, espera 15 minutos y vuelve a intentar.");
  }

  // Con celular: se busca en el servidor el correo de esa cuenta (nunca se muestra).
  let correo = usuario;
  if (modo === "celular") {
    const { data } = await supabaseAdmin().from("personas").select("correo").eq("telefono", usuario).maybeSingle();
    if (!data) {
      await anotarIntento("login", usuario);
      return fallo(MAL.celular);
    }
    correo = data.correo;
  }

  const sb = await supabaseSesion();
  const { error } = await sb.auth.signInWithPassword({ email: correo, password: contrasena });
  if (error) {
    await anotarIntento("login", usuario);
    return fallo(/rate|too many/i.test(error.message) ? "Hiciste demasiados intentos. Espera unos minutos." : MAL[modo]);
  }

  await limpiarIntentos("login", usuario);
  redirect("/mi-red");
}

export async function salir() {
  const sb = await supabaseSesion();
  await sb.auth.signOut();
  redirect("/login");
}
