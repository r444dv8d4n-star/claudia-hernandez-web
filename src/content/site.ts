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
  retrato: { src: "/assets/img/retrato-camisa-morada.webp", w: 1200, h: 800, alt: "Claudia Hernández sonriendo, con camisa morada, sentada en el recinto del Concejo" },
  blazer: { src: "/assets/img/retrato-blazer-concejo.webp", w: 828, h: 828, alt: "Claudia Hernández con blazer blanco y blusa naranja, en su puesto del Concejo de Floridablanca" },
  sesion: { src: "/assets/img/concejo-sesion.webp", w: 1079, h: 721, alt: "Claudia Hernández durante una sesión del Concejo de Floridablanca" },
  consejo: { src: "/assets/img/consejo-juventudes-concejo.webp", w: 1600, h: 1069, alt: "Claudia Hernández con integrantes del Consejo Municipal de Juventudes en el recinto del Concejo de Floridablanca" },
  mujeres: { src: "/assets/img/mujeres-imparables-jardin.webp", w: 1600, h: 1068, alt: "Grupo de mujeres del barrio Jardín posando junto a Claudia Hernández" },
  basilica: { src: "/assets/img/floridablanca-basilica-evento.webp", w: 1600, h: 1068, alt: "Claudia Hernández en un evento frente a la basílica de Floridablanca" },
  visita: { src: "/assets/img/visita-comunidad-religiosa.webp", w: 1600, h: 1068, alt: "Claudia Hernández conversando con una hermana de una comunidad religiosa" },
  feria: { src: "/assets/img/equipo-feria-emprendedores.webp", w: 1079, h: 721, alt: "Claudia Hernández con un grupo de emprendedores en una feria" },
  olla: { src: "/assets/img/olla-comunitaria.webp", w: 1079, h: 721, alt: "Claudia Hernández sirviendo comida en una olla comunitaria" },
  familia: { src: "/assets/img/familia-mascotas.webp", w: 1200, h: 1600, alt: "Claudia Hernández con su hija y sus mascotas, con diademas de flores" },
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
