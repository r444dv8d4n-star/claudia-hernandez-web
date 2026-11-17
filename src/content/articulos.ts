/**
 * Blog de Claudia: artículos y noticias (aparte de La Bitácora, que recoge historias de los barrios).
 * Para publicar uno: agrega un objeto arriba (del más reciente al más antiguo) con la fecha AAAA-MM-DD.
 * Si el artículo resume una nota de prensa, llena `fuente` para enlazar la nota original.
 * Mientras la lista esté vacía, la página /blog muestra un aviso "muy pronto".
 */
export type Fuente = {
  medio: string;
  titulo: string; // título exacto de la nota original
  autor?: string;
  url: string;
};

export type Articulo = {
  slug: string;
  title: string;
  tag: string;
  date: string; // AAAA-MM-DD
  excerpt: string;
  body: string[];
  fuente?: Fuente;
  draft?: boolean;
};

export const blog = {
  name: "Blog",
  intro: "Artículos y noticias sobre Claudia, Floridablanca, sus barrios y su gente.",
};

/**
 * Las publicaciones "En las noticias" resumen, con palabras propias, notas de prensa que se leyeron
 * completas en su fuente. Los datos (fechas, nombres, cargos) salen de esas notas.
 */
export const articulos: Articulo[] = [
  {
    slug: "el-frente-claudia-deja-la-presidencia-del-concejo",
    title: "El Frente: Claudia deja la presidencia del Concejo y sigue como concejal",
    tag: "En las noticias",
    date: "2026-10-28",
    excerpt:
      "El diario de Bucaramanga informó que Claudia presentó su renuncia a la presidencia de la corporación y continúa en su curul. El Concejo elegiría nueva presidencia el viernes 30 de octubre.",
    body: [
      "El 28 de octubre de 2026, el diario El Frente, de Bucaramanga, informó que el Concejo de Floridablanca elegiría una nueva presidencia en sesión plenaria el viernes 30 de octubre, a las 8:00 a. m. La elección busca completar el periodo 2026 y dejar encaminada la mesa directiva de 2027.",
      "Según la nota, Claudia presentó su carta de renuncia a la presidencia de la corporación, pero seguirá como concejal. Mientras se elige a su reemplazo, la presidencia está a cargo de Wilson Ardila Parra, presidente encargado desde la semana anterior.",
      "La nota también anuncia una segunda elección, antes de que termine la vigencia actual, para designar la mesa directiva de 2027.",
    ],
    fuente: {
      medio: "El Frente",
      titulo: "Concejo de Floridablanca elegirá nueva Junta Directiva este viernes",
      autor: "Danilo Pérez",
      url: "https://elfrente.com.co/concejo-de-floridablanca-elegira-nueva-junta-directiva-este-viernes/",
    },
  },
  {
    slug: "vanguardia-homenaje-a-carmen-cecilia-perez-gomez",
    title: "Vanguardia cuenta cómo Claudia impulsó el homenaje a una alcaldesa pionera",
    tag: "En las noticias",
    date: "2024-11-25",
    excerpt:
      "La sección Las Santandereanas recogió la iniciativa de Claudia para que el Concejo reconociera a Carmen Cecilia Pérez Gómez, una de las dos únicas mujeres que han dirigido Floridablanca.",
    body: [
      "En noviembre de 2024, Vanguardia dedicó una nota de su sección Las Santandereanas a Carmen Cecilia Pérez Gómez, una de las dos únicas mujeres que han sido alcaldesas de Floridablanca. La periodista Paola Esteban cuenta también cómo llegó ese reconocimiento a su nombre.",
      "Según la nota, Claudia, concejala del municipio, descubrió el trabajo pionero de Carmen y de otras mujeres mientras investigaba sobre las alcaldesas anteriores. Entonces le pidió al Concejo que le concediera la Orden Carlos Gutiérrez Gómez, y la corporación lo aprobó.",
      "Carmen Cecilia fue nombrada alcaldesa de Floridablanca en 1977 por el gobernador Alberto Montoya Puyana. Durante su alcaldía trabajó con la Academia de Historia en la bandera y el escudo del municipio.",
      "La nota recoge además que Claudia considera «un avance significativo» que se hayan considerado los nombres de dos mujeres para la alcaldía.",
    ],
    fuente: {
      medio: "Vanguardia",
      titulo: "Carmen Cecilia Pérez Gómez: la mujer que transformó a Floridablanca con pasión y compromiso",
      autor: "Paola Esteban",
      url: "https://www.vanguardia.com/entretenimiento/las-santandereanas/2024/11/25/carmen-cecilia-perez-gomez-la-mujer-que-transformo-floridablanca-con-pasion-y-compromiso/",
    },
  },
];

export const articulosPublicados = articulos.filter((a) => !a.draft);
