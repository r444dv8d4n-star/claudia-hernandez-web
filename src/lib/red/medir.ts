/** Acciones que se cuentan (sin datos personales). Agregar aquí las nuevas. */
export const EVENTOS = [
  "clic_sumate_encabezado", "clic_sumate_portada", "clic_sumate_seccion", "clic_sumate_pie",
  "registro_visto", "registro_paso2", "registro_completo",
  "compartir_whatsapp", "copiar_enlace", "mision_whatsapp", "video_play", "bitacora_ver_publicacion",
] as const;
export type Evento = (typeof EVENTOS)[number];

/**
 * Cuenta una acción de forma anónima: solo el tipo y la página. Sin cookies, sin IP, sin saber quién es.
 * Usa sendBeacon para no frenar la navegación (funciona aunque la persona cambie de página).
 */
export function medir(tipo: Evento) {
  try {
    const cuerpo = JSON.stringify({ tipo, ruta: location.pathname });
    if (!navigator.sendBeacon?.("/api/evento", new Blob([cuerpo], { type: "application/json" }))) {
      fetch("/api/evento", { method: "POST", body: cuerpo, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
    }
  } catch {
    // Medir nunca debe romper la página.
  }
}
