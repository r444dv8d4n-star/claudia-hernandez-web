import { NextResponse, type NextRequest } from "next/server";
import { supabaseSesion } from "@/lib/supabase/server";

/**
 * Llegada desde el enlace del correo (recuperar contraseña).
 * Canjea el código por una sesión y lleva a la página siguiente, solo dentro del sitio.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const sig = url.searchParams.get("siguiente") ?? "/mi-red";
  const destino = sig.startsWith("/") && !sig.startsWith("//") ? sig : "/mi-red";

  if (code) {
    const sb = await supabaseSesion({ escribir: true });
    const { error } = await sb.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(destino, url.origin));
  }
  return NextResponse.redirect(new URL("/recuperar?vencido=1", url.origin));
}
