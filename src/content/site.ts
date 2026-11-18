import { galeria } from "@/content/galeria";
export const TBC = "[POR CONFIRMAR]";

export const person = {
  name: "Claudia Hernández",
  fullName: "Claudia Cecilia Hernández Villamizar",
  role: "Concejala de Floridablanca",
  period: "2024–2027",
  roles: ["Concejala", "Abogada", "Mamá", "Líder social"],
  bio: "Mamá, abogada y líder social. Creciendo con mujeres soñadoras y emprendedoras.",
  city: "Floridablanca, Santander",
  whatsapp: TBC, // número oficial por confirmar
  social: {
    instagram: "https://www.instagram.com/claudiahernandez.fblanca/",
    tiktok: "https://www.tiktok.com/@claudiaconcejalav",
    facebook: "https://www.facebook.com/profile.php?id=100090595269312",
  },
};

/**
 * Fotos del sitio. Las que también están en la galería se toman de allí (antes había copias duplicadas).
 * `pos` = dónde está la cara (x% y%): los recortes se centran en ese punto.
 */
export const img = {
  retrato: galeria["retrato-concejal-placa"],
  blazer: galeria["retrato-camisa-institucional-jardin"],
  consejo: galeria["evento-comunitario-tarima"],
  mujeres: galeria["encuentro-mujeres-noche"],
  basilica: galeria["basilica-noche-horizontal"],
  familia: galeria["retrato-camiseta-celeste-montana"],
  sesion: { src: "/assets/img/despacho-concejo-visita.webp", w: 1600, h: 1069, alt: "Claudia Hernández con tres personas en su despacho del Concejo de Floridablanca", pos: "40% 25%" },
  visita: { src: "/assets/img/visita-hermana-religiosa.webp", w: 1600, h: 1068, alt: "Claudia Hernández compartiendo con una hermana religiosa de edad avanzada", pos: "42% 22%" },
  feria: { src: "/assets/img/equipo-feria-jovenes.webp", w: 1600, h: 1070, alt: "Claudia Hernández con un grupo de jóvenes frente a una carpa en una feria", pos: "42% 25%" },
  ninos: { src: "/assets/img/abrazo-nina-globo.webp", w: 1600, h: 1066, alt: "Claudia Hernández abrazando a una niña con un globo largo en un evento para niños", pos: "55% 32%" },
};

/** true cuando el texto ya no tiene marcas [POR CONFIRMAR]: solo eso se muestra en el sitio. */
export const ready = (...s: string[]) => s.every((x) => !x.includes(TBC));

/** Publicación de Instagram de Claudia (fuente de varios datos del sitio). */
export const ig = (code: string) => `https://www.instagram.com/p/${code}/`;

// Fuente: su publicación del 11-ene-2024 (C1-UurTpNFv).
export const comisiones = [
  { name: "Comisión de Equidad de la Mujer", scope: "Presidenta desde enero de 2024" },
  { name: "Comisión Primera · Plan y Bienes", scope: "Primera vicepresidenta en 2024. Presupuesto, plan de desarrollo y ordenamiento" },
];

/** Cifras de su trabajo. Cada una sale de una fuente verificada (ver comentarios). */
export const cifras = [
  { n: 2, l: "veces presidenta del Concejo", note: "La primera mujer en lograrlo" },
  { n: 3, l: "acuerdos municipales de su autoría", note: "Niñez, ExpoMujer y arte urbano" },
  { n: 2016, l: "año de su primer acuerdo", note: "La sesión de los niños en el Concejo" },
  { n: 12, l: "emprendimientos contados en sus crónicas", note: "Hecho en Floridablanca", plus: true },
];

/** Logros verificados en fuentes públicas. Agregar aquí los nuevos, del más reciente al más antiguo. */
export const reconocimientos: { year: string; t: string; d: string; src?: { label: string; href: string } }[] = [
  {
    // Fuentes: episodio "La puerta que abrió 200 años después" (Detrás del Poder, 2026) y publicación conjunta en
    // Instagram ("la primera mujer en presidir el Concejo de Floridablanca. Y lo hizo dos veces"); Vanguardia la
    // nombra presidenta del Concejo en marzo de 2019; Plan de Desarrollo 2024–2027: presidenta en 2026.
    year: "2019 · 2026",
    t: "Primera mujer en presidir el Concejo",
    d: "En casi 200 años de historia ninguna mujer había llegado a esa silla. Ella lo hizo dos veces.",
    src: { label: "Ver su historia", href: "https://www.youtube.com/watch?v=KMQU6dFsE7s" },
  },
  {
    // Fuente: su publicación del 10-jun-2025 (DKs83GPNESu).
    year: "2025",
    t: "ExpoMujer, referente nacional",
    d: "La feria que impulsó desde 2022 y volvió acuerdo municipal puso a Floridablanca como ejemplo en el país.",
    src: { label: "Ver publicación", href: "https://www.instagram.com/p/DKs83GPNESu/" },
  },
  {
    // Fuentes: su publicación del 11-ene-2024 (C1-UurTpNFv) y el informe de gestión 2024 de Jhonatan Pinzón.
    year: "2024",
    t: "Presidenta de la Comisión de Equidad de la Mujer",
    d: "Reconoció a 18 mujeres rurales de las veredas del municipio. Ese año también fue ponente del Plan de Desarrollo 2024–2027.",
    src: { label: "Ver publicación", href: "https://www.instagram.com/p/C1-UurTpNFv/" },
  },
];

/** Notas de prensa verificadas (se leyeron completas). Agregar las nuevas arriba. */
export const medios: { outlet: string; date: string; t: string; d: string; href: string }[] = [
  {
    outlet: "Detrás del Poder",
    date: "Septiembre de 2026",
    t: "Claudia Hernández: la puerta que abrió 200 años después",
    d: "Podcast en video: su vida antes de la política y cómo llegó a presidir el Concejo.",
    href: "https://www.youtube.com/watch?v=KMQU6dFsE7s",
  },
  {
    outlet: "El Frente",
    date: "Octubre de 2026",
    t: "Concejo de Floridablanca elegirá nueva Junta Directiva este viernes",
    d: "Sobre el cierre de su presidencia del Concejo de Floridablanca en 2026.",
    href: "https://elfrente.com.co/concejo-de-floridablanca-elegira-nueva-junta-directiva-este-viernes/",
  },
  {
    outlet: "Ciudad Florida",
    date: "2026",
    t: "Claudia Hernández, presidenta del Concejo de Floridablanca",
    d: "Su mensaje a las madres florideñas como presidenta del Concejo de Floridablanca.",
    href: "https://ciudadflorida.com/claudia-hernandez-presidente-concejo-floridablanca/",
  },
  {
    outlet: "Vanguardia",
    date: "Noviembre de 2024",
    t: "Carmen Cecilia Pérez Gómez: la mujer que transformó a Floridablanca",
    d: "Cuenta cómo Claudia impulsó el homenaje a una de las dos únicas mujeres que han dirigido el municipio.",
    href: "https://www.vanguardia.com/entretenimiento/las-santandereanas/2024/11/25/carmen-cecilia-perez-gomez-la-mujer-que-transformo-floridablanca-con-pasion-y-compromiso/",
  },
];

export const frentes: { t: string; d: string }[] = [
  { t: "Mujeres y emprendimiento", d: "ExpoMujer, la Comisión de la Mujer y la serie «Hecho en Floridablanca», donde presenta emprendedoras con nombre propio." },
  { t: "Educación y alimentación escolar", d: "Seguimiento a la educación y a la alimentación escolar en el municipio." },
  { t: "Cuidado y salud", d: "Pedagogía y prevención para que cada familia cuide de sí misma." },
  { t: "Cultura y territorio", d: "Orgullo por la Ciudad Dulce de Santander, sus tradiciones y su gente." },
  { t: "Barrios y comunidad", d: "Presencia en barrios, ollas comunitarias y encuentros con vecinos." },
];

/** Acuerdos de su autoría. Fuentes: sus publicaciones de Instagram (código en `src`). */
export const acuerdos = [
  {
    year: "2016",
    n: "Acuerdo Municipal 038 de 2016",
    rol: "Autora",
    t: "Los niños sesionan en el Concejo",
    d: "Cada último jueves de abril, niñas, niños y adolescentes tienen su propia sesión en el Concejo, y los concejales hacen seguimiento a sus peticiones.",
    src: ig("CwDsWsqJb_L"),
  },
  {
    year: "2024",
    n: "Acuerdo Municipal 005 de 2024",
    rol: "Coautora",
    t: "ExpoMujer queda institucionalizada",
    d: "Convierte en norma la feria que impulsa a las emprendedoras del municipio. La aprobaron todos los concejales y en 2025 fue referente nacional.",
    src: ig("DKs83GPNESu"),
  },
  {
    year: "2024",
    n: "Acuerdo municipal de 2024",
    rol: "Autora",
    t: "Festival de Arte Urbano Gráfico",
    d: "Institucionaliza el festival y su comité para reconocer y promover a los artistas florideños, y darle un lugar permanente al arte urbano gráfico.",
    src: ig("C8f68OHNHo3"),
  },
];

export const acuerdosListos = acuerdos.filter((a) => ready(a.n, a.t, a.d, a.year));

/** Línea de tiempo. Fuentes: sus publicaciones, el podcast Detrás del Poder y Vanguardia (2019). */
export const timeline = [
  { y: "2016", t: "Autora del Acuerdo 038", d: "Los niños, niñas y adolescentes tienen su propia sesión en el Concejo." },
  { y: "2016–2019", t: "Primera mujer presidenta del Concejo", d: "Su foto llegó a la pared de presidentes, donde nunca había estado una mujer." },
  { y: "2022", t: "Nace la idea de ExpoMujer", d: "La empieza a trabajar desde el Consejo Consultivo de Mujeres." },
  { y: "2023", t: "Regresa al Concejo", d: "Con el voto de 1.134 florideños." },
  { y: "2024", t: "Tres frentes a la vez", d: "Preside la Comisión de la Mujer, ExpoMujer se vuelve el Acuerdo 005 y nace el Festival de Arte Urbano." },
  { y: "2024", t: "Hecho en Floridablanca", d: "Cada martes, un emprendimiento local contado en sus redes." },
  { y: "2025", t: "La Bitácora de Claudia", d: "Un espacio para escuchar: «escuchar también es gobernar»." },
  { y: "Dic. 2025", t: "Segunda presidencia del Concejo", d: "«Las mujeres lideran, transforman y dejan huella.»" },
  { y: "2026", t: "Su historia, contada", d: "Presidenta del Concejo, crónicas de emprendedores y el podcast Detrás del Poder." },
];

/** Emprendimientos que ha presentado en sus crónicas. Solo nombre y enlace a su publicación (sin datos de contacto). */
export const emprendedores = [
  { n: "Fiore", who: "Catalina", d: "Bolsos y accesorios hechos a mano.", year: "2026", src: ig("Defl7TDNvZm") },
  { n: "Alma Love", who: "Una creadora florideña", d: "Velas artesanales con esencias.", year: "2026", src: ig("Da1LFD5O-xB") },
  { n: "personaliza.me", who: "Johanna Angarita", d: "Tazas, termos, agendas y álbumes personalizados.", year: "2026", src: ig("DfTNKnxOliq") },
  { n: "Impresión 3D", who: "Heider y su novia", d: "Una pareja joven que emprende en equipo.", year: "2026", src: ig("DeAvwH-upqc") },
  { n: "Heladería Pirineos", who: "Un negocio familiar", d: "Helados con la pujanza de Floridablanca.", year: "2026", src: ig("DWXg5rwjqlc") },
  { n: "Arepas Mega Queso", who: "Barrio Helechales", d: "Arepas recién hechas y con mucho queso.", year: "2026", src: ig("DV9uO-VDomo") },
];

export const chapters = [
  { n: "I", t: "Raíces", d: "Mamá de un abogado y una pediatra. Antes fue guardiana de una cárcel, ayudante de construcción y de aseo.", p: img.familia, pFull: img.ninos },
  { n: "II", t: "Derecho", d: "Estudiar derecho fue elegir una herramienta para que las personas sean escuchadas y sus voces cuenten.", p: img.blazer, pFull: img.visita },
  { n: "III", t: "Comunidad", d: "Con las Mujeres Imparables de Jardín de Limoncitos aprendió que el liderazgo nace en la calle, con la gente.", p: img.mujeres, pFull: galeria["evento-comunitario-parque"] },
  { n: "IV", t: "Concejo", d: `Desde el Concejo (${person.period}) lleva esas voces a las decisiones locales. Primera mujer en presidirlo, dos veces.`, p: img.sesion, pFull: galeria["retrato-camisa-institucional-escritorio"] },
];

/** Carrusel de Reconocimientos (inicio y Logros). Ninguna se repite en otra sección. */
export const slidesReconocimientos = [
  galeria["abrazo-encuentro-mujeres"],
  galeria["retrato-camisa-institucional-despacho"],
  galeria["feria-calle-madre-e-hija"],
  galeria["equipo-futsal-femenino"],
  galeria["basilica-verde-familias"],
  img.feria,
];

export const wall = [
  { ...galeria["carnaval-recorrido-horizontal"], caption: "En el recorrido del carnaval" },
  { ...galeria["carnaval-microfono"], caption: "Con micrófono y traje de matachín" },
  { ...galeria["personajes-carnaval"], caption: "Matachines en la calle" },
  { ...galeria["halloween-globos"], caption: "Tarde de disfraces" },
];

/** Episodio de Detrás del Poder con su historia (YouTube). */
export const video = {
  id: "KMQU6dFsE7s",
  title: "Claudia Hernández: la puerta que abrió 200 años después · Detrás del Poder",
  href: "https://www.youtube.com/watch?v=KMQU6dFsE7s",
};

export const redes = [
  { name: "Instagram", href: person.social.instagram },
  { name: "TikTok", href: person.social.tiktok },
  { name: "Facebook", href: person.social.facebook },
] as const;

export const agenda = [
  { d: TBC, t: "Sesión del Concejo", p: "Concejo de Floridablanca" },
  { d: TBC, t: "Encuentro con mujeres emprendedoras", p: TBC },
  { d: TBC, t: "Recorrido por barrios", p: TBC },
];
