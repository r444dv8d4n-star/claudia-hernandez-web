import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * 1. Interruptor: mientras RED_ABIERTA no sea "si", las páginas de la red no existen (404).
 *    Así el código puede estar publicado sin recibir datos reales antes de tiempo.
 * 2. Renueva la sesión de la red antes de mostrar sus páginas.
 * Solo corre en las rutas de la red: el resto del sitio sigue siendo estático.
 */
export async function proxy(request: NextRequest) {
  if (process.env.RED_ABIERTA !== "si") {
    return new NextResponse("Página no encontrada", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return response;

  const sb = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (lista, headers) => {
        lista.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        lista.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers ?? {}).forEach(([k, v]) => response.headers.set(k, v));
      },
    },
  });
  await sb.auth.getClaims();
  return response;
}

export const config = {
  matcher: [
    "/registro", "/login", "/recuperar", "/nueva-clave", "/terminos", "/cuenta-eliminada",
    "/mi-red/:path*", "/admin/:path*", "/auth/:path*",
  ],
};
