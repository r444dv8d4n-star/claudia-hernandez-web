import { NextResponse, type NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { EVENTOS } from "@/lib/red/medir";

/** Recibe un conteo anónimo (tipo de acción y página). No guarda IP ni nada que identifique a la persona. */
export async function POST(request: NextRequest) {
  try {
    const texto = await request.text();
    if (texto.length > 300) return new NextResponse(null, { status: 204 });
    const { tipo, ruta } = JSON.parse(texto) as { tipo?: string; ruta?: string };
    if (!tipo || !(EVENTOS as readonly string[]).includes(tipo)) return new NextResponse(null, { status: 204 });
    const r = typeof ruta === "string" && ruta.startsWith("/") ? ruta.split("?")[0].slice(0, 80) : null;
    if (process.env.SUPABASE_SECRET_KEY) await supabaseAdmin().from("eventos").insert({ tipo, ruta: r });
  } catch {
    // Un conteo que falla no importa.
  }
  return new NextResponse(null, { status: 204 });
}
