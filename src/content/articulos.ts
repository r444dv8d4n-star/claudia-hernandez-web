/**
 * Blog de Claudia: artículos y opiniones (aparte de La Bitácora, que recoge historias de los barrios).
 * Para publicar uno: agrega un objeto arriba con la fecha AAAA-MM-DD.
 * Hoy la lista está vacía; la página /blog muestra un aviso "muy pronto" mientras no haya artículos.
 */
export type Articulo = {
  slug: string;
  title: string;
  tag: string;
  date: string; // AAAA-MM-DD
  excerpt: string;
  body: string[];
  draft?: boolean;
};

export const blog = {
  name: "Blog",
  intro: "Artículos y opiniones sobre Floridablanca, sus barrios y su gente.",
};

export const articulos: Articulo[] = [];

export const articulosPublicados = articulos.filter((a) => !a.draft);
