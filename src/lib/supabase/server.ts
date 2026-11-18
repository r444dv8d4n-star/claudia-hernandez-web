import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Cliente de Supabase que actúa COMO la persona con sesión (llave pública + su cookie).
 * La seguridad por filas aplica: solo ve lo que a esa persona le toca.
 */
export async function supabaseSesion() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (lista) => {
        try {
          lista.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Desde una página (no una acción) no se pueden escribir cookies; el proxy ya las renueva.
        }
      },
    },
  });
}

/** Id de la persona con sesión, verificado, o null si no hay sesión. */
export async function usuarioActual() {
  const sb = await supabaseSesion();
  const { data } = await sb.auth.getClaims();
  return data?.claims?.sub ? { id: data.claims.sub as string, sb } : null;
}
