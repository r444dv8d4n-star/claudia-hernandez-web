/**
 * La Bitácora de Claudia: así llama ella a su espacio en redes (#LaBitácoraDeClaudia, desde junio de 2025).
 * Cada entrada es una página propia en /bitacora/<slug>. Los textos resumen sus publicaciones de Instagram
 * (enlace en `ig`); las frases entre comillas son textuales.
 *
 * Para publicar una nueva: agrega un objeto arriba con la fecha AAAA-MM-DD y los párrafos en `body`.
 */
export type Post = {
  slug: string;
  title: string;
  tag: string;
  date: string; // AAAA-MM-DD
  excerpt: string;
  body: string[];
  ig?: string;
  /** Portada tomada de su publicación. `pos` = el punto exacto de la cara (x% y%): así el recorte nunca la corta. */
  foto?: { src: string; w: number; h: number; pos: string };
  draft?: boolean;
};

const foto = (slug: string, w: number, h: number, pos: string) => ({ src: `/assets/bitacora/${slug}.webp`, w, h, pos });

export const bitacora = {
  name: "La Bitácora de Claudia",
  lema: "Escuchar también es gobernar.",
  intro: "«La Bitácora no es solo de Claudia. Es de todos. Es de Floridablanca.» Historias, voces y tradiciones que ella recoge en los barrios.",
};

export const posts: Post[] = [
  {
    slug: "pioneras-del-dulce-florideno",
    title: "Las pioneras del dulce florideño",
    tag: "Ciudad Dulce",
    date: "2025-11-18",
    excerpt: "Teresa Delgado de Jiménez, Sandra Padilla y María Estella Celis: tres mujeres que mantienen vivo el sabor de la Ciudad Dulce.",
    body: [
      "Floridablanca es la Ciudad Dulce de Colombia, y detrás de esa fama hay mujeres que llevan décadas en la cocina. En esta serie de La Bitácora, Claudia visitó a tres pioneras del dulce florideño: Teresa Delgado de Jiménez, Sandra Padilla y María Estella Celis.",
      "María Estella Celis continúa la tradición familiar de Dulces Celis y le abrió las puertas de su hogar y su empresa. Doña Teresa Delgado de Jiménez, fundadora de Arequipe Puro Santandereano, Pasiones Florideñas y Obleas del Amor, compartió las experiencias y la tradición que han marcado a tantas familias.",
      "«Porque contar estas historias… también es endulzar el alma.»",
    ],
    ig: "https://www.instagram.com/p/DRNxVKIDpED/",
    foto: foto("pioneras-del-dulce-florideno", 640, 1136, "50% 44%"),
  },
  {
    slug: "tropi-carranga-fusion",
    title: "Tropi Carranga Fusión: la carranga que se reinventa",
    tag: "Cultura",
    date: "2025-08-26",
    excerpt: "Niños y jóvenes que mezclan la carranga con ritmos modernos y mantienen viva la música tradicional.",
    body: [
      "Tropi Carranga Fusión es un grupo de niños y jóvenes florideños que lleva la música tradicional a otro nivel: mezcla la esencia de la carranga con ritmos modernos.",
      "Para Claudia, son un ejemplo de cómo las nuevas generaciones mantienen viva la cultura, la reinventan y la comparten con amor por nuestras raíces.",
    ],
    ig: "https://www.instagram.com/p/DN1b8Xq3Dt-/",
    foto: foto("tropi-carranga-fusion", 675, 1200, "27% 27%"),
  },
  {
    slug: "turismo-en-floridablanca",
    title: "¿Cómo podemos fomentar el turismo en Floridablanca?",
    tag: "Voces de la calle",
    date: "2025-07-10",
    excerpt: "La Bitácora salió a las calles a preguntarle a la gente cómo hacer de Floridablanca un destino turístico más fuerte.",
    body: [
      "La Bitácora salió a las calles a escuchar la voz de los florideños con una pregunta: ¿cómo podemos hacer de nuestra ciudad un destino turístico más fuerte, más atractivo y más nuestro?",
      "«Las respuestas nos inspiran, nos retan y nos recuerdan que el turismo también es identidad, historia y comunidad.»",
    ],
    ig: "https://www.instagram.com/p/DL8FRzhOrRg/",
    foto: foto("turismo-en-floridablanca", 675, 1200, "52% 37%"),
  },
  {
    slug: "que-significa-ser-concejal",
    title: "Primera página: ¿qué significa ser concejal?",
    tag: "Concejo",
    date: "2025-07-01",
    excerpt: "La primera pregunta de la Bitácora fue para sus compañeros del Concejo.",
    body: [
      "La primera página de la Bitácora fue una pregunta a sus compañeros concejales: ¿qué significa para ellos ser concejal?",
      "«La bitácora de Claudia también es de todos los que quieren dejar una historia, una idea, una leyenda o un sueño. Porque a veces, lo que se escribe no se borra… se transforma.»",
    ],
    ig: "https://www.instagram.com/p/DLk6xBUuABl/",
    foto: foto("que-significa-ser-concejal", 675, 1200, "52% 42%"),
  },
  {
    slug: "que-es-la-bitacora",
    title: "¿Qué es La Bitácora de Claudia?",
    tag: "Bitácora",
    date: "2025-06-24",
    excerpt: "Un espacio donde la voz de todos y todas encuentra un lugar y un sentido.",
    body: [
      "«La Bitácora de Claudia Hernández no es solo un cuaderno. Es un espacio donde la voz de todos y todas encuentra un lugar y un sentido. Porque escuchar también es gobernar.»",
      "Cada comentario, sugerencia o inquietud que nace del día a día merece ser escuchado con atención y respeto. «Porque La Bitácora no es solo de Claudia. Es de todos. Es de Floridablanca.»",
    ],
    ig: "https://www.instagram.com/p/DLSwJi-OrHm/",
    foto: foto("que-es-la-bitacora", 676, 1200, "45% 43%"),
  },
];

export const published = posts
  .filter((p) => !p.draft && p.body.length > 0 && p.date)
  .sort((a, b) => b.date.localeCompare(a.date));

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
