/**
 * Configuración de la red de referidos.
 * Los valores marcados POR CONFIRMAR los debe aprobar el equipo de Claudia antes de publicar.
 */
/** ¿La red está abierta al público? (variable RED_ABIERTA=si en Vercel). Cerrada, el sitio no la muestra. */
export const redAbierta = process.env.RED_ABIERTA === "si";

export const RED = {
  /** Nombre de la red: su frase de campaña. */
  nombre: "De aquí, como tú",
  /** Texto del botón para unirse (encabezado y portada). */
  boton: "Soy de aquí",
  /** Versión de la política de datos que acepta quien se registra. Cambiarla cuando cambie /terminos. */
  politicaVersion: "2026-11-borrador",
  /** Edad mínima para registrarse. */
  edadMinima: 18,
  /** Mensaje que se comparte por WhatsApp junto al enlace. */
  mensajeInvitacion: "Soy de aquí, como tú. Te invito a unirte a la red de Claudia Hernández en Floridablanca. Regístrate con mi enlace:",
};

/**
 * Responsable del tratamiento de los datos (Ley 1581 de 2012). TODO POR CONFIRMAR con el equipo de Claudia.
 * Mientras algún dato diga POR CONFIRMAR, /terminos muestra el aviso de borrador.
 */
export const RESPONSABLE = {
  nombre: "[POR CONFIRMAR: nombre de la persona o de la campaña]",
  identificacion: "[POR CONFIRMAR: cédula o NIT]",
  direccion: "[POR CONFIRMAR: dirección física]",
  correo: "[POR CONFIRMAR: correo para datos personales]",
  telefono: "[POR CONFIRMAR: teléfono]",
  /** Hasta cuándo se guardan los datos (aprobado por el equipo: un año o más). */
  conservacion: "hasta un (1) año después de terminado el proceso electoral para el que se creó la red",
};
export const esBorrador = () => Object.values(RESPONSABLE).some((v) => v.includes("POR CONFIRMAR"));

/** Puntos (aprobados por el equipo): por cada invitado directo y por cada invitado de ellos. */
export const PUNTOS = { directo: 10, segundoNivel: 2 };

/** Niveles por puntos (aprobados por el equipo), de menor a mayor. */
export const NIVELES = [
  { nombre: "Semilla", desde: 0 },
  { nombre: "Vecina/o", desde: 50 },
  { nombre: "Líder de barrio", desde: 150 },
  { nombre: "Embajador/a", desde: 400 },
] as const;

export function calcularNivel(directos: number, segundo: number) {
  const puntos = directos * PUNTOS.directo + segundo * PUNTOS.segundoNivel;
  const i = NIVELES.findLastIndex((n) => puntos >= n.desde);
  const siguiente = NIVELES[i + 1];
  return { puntos, nivel: NIVELES[i].nombre, siguiente: siguiente?.nombre, faltan: siguiente ? siguiente.desde - puntos : 0,
    avance: siguiente ? (puntos - NIVELES[i].desde) / (siguiente.desde - NIVELES[i].desde) : 1 };
}

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
