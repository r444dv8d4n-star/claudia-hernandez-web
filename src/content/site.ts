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

export const img = {
  retrato: { src: "/assets/img/retrato-concejal-placa.webp", w: 854, h: 569, alt: "Claudia Hernández, concejala, sonriendo en su puesto del Concejo de Floridablanca" },
  blazer: { src: "/assets/img/retrato-camisa-blanca-jardin.webp", w: 854, h: 854, alt: "Claudia Hernández con camisa blanca institucional, de pie en un jardín" },
  sesion: { src: "/assets/img/despacho-concejo-visita.webp", w: 1600, h: 1069, alt: "Claudia Hernández con tres personas en su despacho del Concejo de Floridablanca" },
  consejo: { src: "/assets/img/hero-evento-comunidad.webp", w: 1600, h: 1069, alt: "Claudia Hernández, con blusa celeste, posando junto a una mujer y una niña en un evento comunitario al aire libre" },
  mujeres: { src: "/assets/img/mujeres-encuentro-nocturno.webp", w: 1600, h: 1069, alt: "Grupo de mujeres y familias reunidas en un encuentro comunitario al aire libre, de noche" },
  basilica: { src: "/assets/img/basilica-floridablanca-noche.webp", w: 1600, h: 1069, alt: "Claudia Hernández con un grupo de personas frente a la basílica de Floridablanca, de noche" },
  visita: { src: "/assets/img/visita-hermana-religiosa.webp", w: 1600, h: 1068, alt: "Claudia Hernández compartiendo con una hermana religiosa de edad avanzada" },
  feria: { src: "/assets/img/equipo-feria-jovenes.webp", w: 1600, h: 1070, alt: "Claudia Hernández con un grupo de jóvenes frente a una carpa en una feria" },
  ninos: { src: "/assets/img/abrazo-nina-globo.webp", w: 1600, h: 1066, alt: "Claudia Hernández abrazando a una niña con un globo largo en un evento para niños" },
  familia: { src: "/assets/img/paisaje-montanas.webp", w: 855, h: 1280, alt: "Claudia Hernández de pie, con un paisaje de montañas al fondo" },
};

export const comisiones = [
  { name: "Presidencia del Concejo", scope: "Presidenta de la corporación en 2026" },
  { name: "Comisión Segunda Permanente", scope: "Deporte, cultura, ambiente, salud y educación" },
  { name: "Comisión de Equidad de la Mujer", scope: "Comisión especial del Concejo" },
];

export const frentes: { t: string; d: string; logro?: string }[] = [
  {
    t: "Mujeres y emprendimiento",
    d: "Encuentros con grupos de mujeres y apoyo a emprendedoras y artesanas de Floridablanca.",
    logro: "Por su iniciativa, en 2024 el Concejo otorgó la Orden Carlos Gutiérrez Gómez a Carmen Cecilia Pérez Gómez, una de las dos únicas mujeres que han sido alcaldesas de Floridablanca.",
  },
  { t: "Educación y alimentación escolar", d: "Seguimiento a la educación y a la alimentación escolar en el municipio." },
  { t: "Cuidado y salud", d: "Pedagogía y prevención para que cada familia cuide de sí misma." },
  { t: "Cultura y territorio", d: "Orgullo por la Ciudad Dulce de Santander, sus tradiciones y su gente." },
  { t: "Barrios y comunidad", d: "Presencia en barrios, ollas comunitarias y encuentros con vecinos." },
];

export const acuerdos = [
  { n: `Acuerdo Municipal N.° ${TBC}`, t: `${TBC} Título del acuerdo`, d: `${TBC} Qué resuelve y a quién beneficia.`, year: TBC },
  { n: `Acuerdo Municipal N.° ${TBC}`, t: `${TBC} Título del acuerdo`, d: `${TBC} Qué resuelve y a quién beneficia.`, year: TBC },
  { n: `Acuerdo Municipal N.° ${TBC}`, t: `${TBC} Título del acuerdo`, d: `${TBC} Qué resuelve y a quién beneficia.`, year: TBC },
];

export const blog = [
  { t: "Educación y alimentación escolar: temas de seguimiento en Floridablanca", tag: "Concejo", date: TBC },
  { t: "Cuida de ti con la misma dedicación con la que cuidas a los tuyos", tag: "Salud", date: TBC },
  { t: "Detrás de cada tejido, un sueño: emprendedoras de Floridablanca", tag: "Emprendimiento", date: TBC },
];

export const agenda = [
  { d: TBC, t: "Sesión del Concejo", p: "Concejo de Floridablanca" },
  { d: TBC, t: "Encuentro con mujeres emprendedoras", p: TBC },
  { d: TBC, t: "Recorrido por barrios", p: TBC },
];
