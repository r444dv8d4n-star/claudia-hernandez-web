import { NextResponse } from "next/server";
import { usuarioActual } from "@/lib/supabase/server";

/** Descarga del listado completo en CSV (abre en Excel). Solo administradores; queda en la auditoría. */
export async function GET() {
  const yo = await usuarioActual();
  if (!yo) return new NextResponse("No encontrado", { status: 404 });
  const { data, error } = await yo.sb.rpc("admin_exportar");
  if (error) return new NextResponse("No encontrado", { status: 404 });

  const columnas: [string, string][] = [
    ["nombre", "Nombre"], ["tipo_documento", "Tipo de documento"], ["documento", "Documento"], ["telefono", "Celular"], ["correo", "Correo"], ["direccion", "Dirección"],
    ["municipio", "Municipio"], ["barrio", "Barrio"], ["fecha_nacimiento", "Fecha de nacimiento"], ["codigo", "Código"],
    ["codigo_invitador", "Código de quien lo invitó"], ["registrado", "Fecha de registro"], ["politica_version", "Versión de la política"],
    ["autorizado_en", "Autorizó el"], ["acepta_mensajes", "Acepta mensajes por WhatsApp"], ["acepta_mensajes_en", "Aceptó mensajes el"],
  ];
  // Comillas en todo y sin fórmulas: evita que Excel ejecute algo escrito en un campo.
  const celda = (v: unknown) => {
    let t = v == null ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(t)) t = `'${t}`;
    return `"${t.replace(/"/g, '""')}"`;
  };
  const filas = (data as Record<string, unknown>[]).map((f) => columnas.map(([k]) => celda(f[k])).join(";"));
  const csv = "﻿" + [columnas.map(([, t]) => celda(t)).join(";"), ...filas].join("\r\n");
  const hoy = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="red-claudia-${hoy}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
