/**
 * La Bitácora de Claudia: así llama ella a su espacio en redes (#LaBitácoraDeClaudia, desde junio de 2025).
 * Cada entrada es una página propia en /bitacora/<slug>. Los textos resumen sus publicaciones de Instagram
 * (enlace en `ig`); las frases entre comillas son textuales.
 *
 * Para publicar una nueva: agrega un objeto arriba con la fecha AAAA-MM-DD y los párrafos en `body`.
 * Ritmo sugerido: una entrada por semana, a partir de sus publicaciones (sin inventar datos; las citas van textuales).
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
const fotoE = (slug: string, w: number, h: number, pos = "50% 50%") => ({ src: `/assets/emprendedores/${slug}.webp`, w, h, pos });

/** Sección de la Bitácora con las crónicas de emprendedores (antes era un bloque aparte en Proyectos). */
export const HECHO = "Hecho en Floridablanca";

export const bitacora = {
  name: "La Bitácora de Claudia",
  lema: "Escuchar también es gobernar.",
  intro: "«La Bitácora no es solo de Claudia. Es de todos. Es de Floridablanca.» Historias, voces y tradiciones que ella recoge en los barrios.",
};

export const posts: Post[] = [
  {
    slug: "luis-angel-torrado-festival-vallenato",
    title: "Luis Ángel Torrado, orgullo florideño en el vallenato",
    tag: "Cultura y tradiciones",
    date: "2026-11-18",
    excerpt: "El estudiante de Música de la UIS quedó entre los primeros lugares del Festival Vallenato en Nobsa, Boyacá.",
    body: [
      "Luis Ángel Torrado, estudiante de Licenciatura en Música de la UIS en Floridablanca, logró figurar entre los primeros lugares del Festival Vallenato en Nobsa, Boyacá.",
      "Claudia lo felicitó a él y a toda su familia: «Una vez más, Luis Ángel Torrado nos hace orgullosos de ser florideños.»",
    ],
    ig: "https://www.instagram.com/p/Df3JNMXzMKI/",
    foto: foto("luis-angel-torrado-festival-vallenato", 720, 405, "50% 30%"),
  },
  {
    slug: "consejo-municipal-de-juventudes",
    title: "Los jóvenes también construyen municipio",
    tag: "Voces de la gente",
    date: "2026-11-08",
    excerpt: "En el Consejo Municipal de Juventudes hubo propuestas para la convivencia, la calidad de vida y el medio ambiente.",
    body: [
      "En una nueva sesión del Consejo Municipal de Juventudes, Claudia escuchó propuestas de los jóvenes para la convivencia, la calidad de vida y el medio ambiente, y les agradeció sus aportes.",
      "«¡La participación juvenil es fundamental para construir municipio!»",
    ],
    ig: "https://www.instagram.com/p/DffaOSxG4-V/",
    foto: foto("consejo-municipal-de-juventudes", 640, 639, "65% 32%"),
  },
  {
    slug: "emprendedores-ferias-dulce-de-corazon",
    title: "209 años: los emprendedores en las Ferias Dulce de Corazón",
    tag: "Cultura y tradiciones",
    date: "2026-11-08",
    excerpt: "Para el cumpleaños de Floridablanca, Claudia invitó a recorrer el Parque Principal y conocer a sus emprendedores.",
    body: [
      "En las Ferias y Fiestas Dulce de Corazón, por los 209 años de Floridablanca, Claudia invitó a recorrer el Parque Principal, donde estaban el talento y el esfuerzo de los emprendedores del municipio.",
      "«¡Ven, siéntelos y llévate un pedacito de Floridablanca!»",
    ],
    ig: "https://www.instagram.com/p/Dff4Q1bDkR0/",
    foto: foto("emprendedores-ferias-dulce-de-corazon", 900, 1200, "50% 14%"),
  },
  {
    slug: "mujeres-imparables-jardin-de-limoncitos",
    title: "Una tarde con las Mujeres Imparables",
    tag: "Voces de la gente",
    date: "2026-10-30",
    excerpt: "El grupo de Jardín de Limoncitos con el que Claudia aprendió que el liderazgo nace en la calle.",
    body: [
      "Claudia volvió a encontrarse con el grupo de las Mujeres Imparables del barrio Jardín de Limoncitos: risas, buenas conversaciones y mucha energía positiva.",
      "«¡Qué grupo tan espectacular!»",
    ],
    ig: "https://www.instagram.com/p/DfI67MOjuc0/",
    foto: foto("mujeres-imparables-jardin-de-limoncitos", 640, 639, "55% 50%"),
  },
  {
    slug: "la-cumbre-tarde-de-matachines",
    title: "En La Cumbre, una tarde con traje de matachín",
    tag: "Cultura y tradiciones",
    date: "2026-10-23",
    excerpt: "Una tarde de disfraces con el grupo Ritmo y Sabor, dedicada a la memoria de Nubia.",
    body: [
      "En La Cumbre, Claudia compartió una tarde de disfraces con las chicas del grupo Ritmo y Sabor. Para rendirle homenaje a lo nuestro se vistió con el auténtico traje de matachín y bailó con ellas.",
      "La tarde tuvo una dedicatoria especial para Nubia: «Cada sonrisa, cada baile y cada momento fue un homenaje en su honor y a la huella hermosa que dejó en nosotros.»",
    ],
    ig: "https://www.instagram.com/p/De3DgJpOXGY/",
    foto: foto("la-cumbre-tarde-de-matachines", 720, 1280, "45% 28%"),
  },
  {
    slug: "pioneras-del-dulce-florideno",
    title: "Las pioneras del dulce florideño",
    tag: "Cultura y tradiciones",
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
    tag: "Cultura y tradiciones",
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
    tag: "Voces de la gente",
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
    tag: "Voces de la gente",
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
    tag: "Voces de la gente",
    date: "2025-06-24",
    excerpt: "Un espacio donde la voz de todos y todas encuentra un lugar y un sentido.",
    body: [
      "«La Bitácora de Claudia Hernández no es solo un cuaderno. Es un espacio donde la voz de todos y todas encuentra un lugar y un sentido. Porque escuchar también es gobernar.»",
      "Cada comentario, sugerencia o inquietud que nace del día a día merece ser escuchado con atención y respeto. «Porque La Bitácora no es solo de Claudia. Es de todos. Es de Floridablanca.»",
    ],
    ig: "https://www.instagram.com/p/DLSwJi-OrHm/",
    foto: foto("que-es-la-bitacora", 676, 1200, "45% 43%"),
  },

  // ===== Hecho en Floridablanca: crónicas de emprendedores (sin teléfonos ni direcciones de terceros) =====
  {
    slug: "personaliza-me-johanna-angarita",
    title: "personaliza.me: los detalles de Johanna Angarita",
    tag: HECHO,
    date: "2026-11-03",
    excerpt: "Tazas, termos, agendas y álbumes personalizados hechos por una joven florideña.",
    body: [
      "Johanna Angarita es una joven florideña que le dio vida a personaliza.me, un emprendimiento donde convierte las ideas y los momentos de la gente en detalles únicos: agendas, termos, vasos, álbumes y mucho más.",
      "«Con creatividad, empeño y amor por lo local, los sueños se construyen día a día.»",
    ],
    ig: "https://www.instagram.com/p/DfTNKnxOliq/",
    foto: fotoE("personaliza-me", 720, 405),
  },
  {
    slug: "fiore-bolsos-hechos-a-mano",
    title: "Fiore: bolsos y accesorios hechos a mano",
    tag: HECHO,
    date: "2026-10-14",
    excerpt: "Catalina teje y cose cada pieza de Fiore con la berraquera y la creatividad de Floridablanca.",
    body: [
      "Catalina es la creadora de Fiore, un emprendimiento de bolsos y accesorios hechos a mano. «Detrás de cada tejido, costura y detalle, hay sueños que toman forma con dedicación y amor.»",
      "Para Claudia, Fiore es el reflejo de la berraquera, la creatividad y la pasión artesanal de Floridablanca: «¡Apoyar lo local es transformar nuestra comunidad!»",
    ],
    ig: "https://www.instagram.com/p/Defl7TDNvZm/",
    foto: fotoE("fiore", 720, 405),
  },
  {
    slug: "impresion-3d-heider-y-su-novia",
    title: "Impresión 3D: emprender en pareja",
    tag: HECHO,
    date: "2026-10-02",
    excerpt: "Heider y su novia demuestran que emprender en equipo en Floridablanca se vive con más fuerza.",
    body: [
      "Heider y su novia le ponen pasión, disciplina y ganas al mundo de la impresión 3D. «Cuando el amor y los sueños van de la mano, los proyectos crecen el doble.»",
      "«Qué bonito es ver parejas jóvenes construyendo futuro y creyendo en lo propio.»",
    ],
    ig: "https://www.instagram.com/p/DeAvwH-upqc/",
    foto: fotoE("impresion-3d", 640, 360),
  },
  {
    slug: "alma-love-velas-artesanales",
    title: "Alma Love: velas artesanales con esencias",
    tag: HECHO,
    date: "2026-07-15",
    excerpt: "Una creadora florideña que moldea con sus manos velas llenas de magia, propósito y diseño.",
    body: [
      "Detrás de Alma Love está el sueño de una mujer que decidió transformar la cera y las esencias en momentos inolvidables. Moldea con sus propias manos velas artesanales llenas de propósito y diseño.",
      "«No es solo cera; es amor, dedicación y la calidez que tu hogar necesita.»",
    ],
    ig: "https://www.instagram.com/p/Da1LFD5O-xB/",
    foto: fotoE("alma-love", 720, 405),
  },
  {
    slug: "heladeria-pirineos",
    title: "Heladería Pirineos: un negocio familiar",
    tag: HECHO,
    date: "2026-03-26",
    excerpt: "Helados con la pujanza de Floridablanca: detrás del negocio hay una familia que sueña.",
    body: [
      "«Detrás de cada negocio en Floridablanca, hay una familia que sueña y un emprendedor que no se detiene.» Así presentó Claudia a la Heladería Pirineos, un ejemplo de la pujanza de la ciudad.",
      "«¡Lo nuestro es lo mejor! Apoyemos lo local.»",
    ],
    ig: "https://www.instagram.com/p/DWXg5rwjqlc/",
    foto: fotoE("heladeria-pirineos", 640, 1136, "50% 55%"),
  },
  {
    slug: "arepas-mega-queso-helechales",
    title: "Arepas Mega Queso, del barrio Helechales",
    tag: HECHO,
    date: "2026-03-16",
    excerpt: "Arepas recién hechas y con mucho queso: puro amor, esfuerzo y sabor de la tierra.",
    body: [
      "Siguiendo la ruta del emprendimiento, Claudia visitó Arepas Mega Queso, en el barrio Helechales: «un emprendimiento que es puro amor, esfuerzo y sabor de nuestra tierra».",
      "«Como concejala, mi meta es que todos conozcan la calidad de lo que producimos en nuestra Ciudad Dulce.»",
    ],
    ig: "https://www.instagram.com/p/DV9uO-VDomo/",
    foto: fotoE("arepas-mega-queso", 640, 568),
  },
];

export const published = posts
  .filter((p) => !p.draft && p.body.length > 0 && p.date)
  .sort((a, b) => b.date.localeCompare(a.date));

/** Temas de la Bitácora, en orden de aparición (para los filtros). */
export const temas = [...new Set(published.map((p) => p.tag))];
export const slugTema = (t: string) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
