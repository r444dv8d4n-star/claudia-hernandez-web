/**
 * Configuración de la red de referidos.
 * Los valores marcados POR CONFIRMAR los debe aprobar el equipo de Claudia antes de publicar.
 */
export const RED = {
  /** Nombre de la red (POR CONFIRMAR). */
  nombre: "Amigos de Claudia",
  /** Versión de la política de datos que acepta quien se registra. Cambiarla cuando cambie /terminos. */
  politicaVersion: "2026-11-borrador",
  /** Edad mínima para registrarse. */
  edadMinima: 18,
};

/** Municipios del área metropolitana. "Otro" deja escribirlo a mano. */
export const municipios = ["Floridablanca", "Bucaramanga", "Girón", "Piedecuesta", "Otro"] as const;

/**
 * Sugerencias de barrios de Floridablanca (lista inicial POR REVISAR con el equipo).
 * Son solo sugerencias: la persona puede escribir el suyo si no aparece.
 */
export const barriosFloridablanca = [
  "Altamira", "Bellavista", "Bucarica", "Caldas", "Cañaveral", "Casco Antiguo", "Ciudad Valencia",
  "El Carmen", "Helechales", "Jardín de Limoncitos", "La Cumbre", "Lagos I", "Lagos II", "Lagos III",
  "Lagos IV", "Lagos V", "Santa Ana", "Villabel", "Zapamanga",
];
