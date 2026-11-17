/**
 * Galería de fotos disponibles para usar en las secciones del sitio.
 * Aún no se muestran en la página: se van asignando a cada sección.
 * Uso: import { galeria } from "@/content/galeria"; galeria["retrato-concejal-placa"]
 */
const g = (slug: string, w: number, h: number, alt: string) => ({ src: `/assets/galeria/${slug}.webp`, w, h, alt });

export const galeria = {
  "evento-comunitario-parque": g("evento-comunitario-parque", 1600, 1069, "Claudia Hernández con una vecina y un joven en un evento comunitario al aire libre"),
  "evento-comunitario-tarima": g("evento-comunitario-tarima", 1600, 1069, "Claudia Hernández con una mujer y una niña frente a una tarima de música campesina"),
  "encuentro-mujeres-noche": g("encuentro-mujeres-noche", 1600, 1069, "Claudia Hernández con un grupo de mujeres con collares de flores en un encuentro nocturno"),
  "abrazo-encuentro-mujeres": g("abrazo-encuentro-mujeres", 1600, 1069, "Claudia Hernández abrazando a una mujer mayor en un encuentro comunitario"),
  "basilica-noche-horizontal": g("basilica-noche-horizontal", 1600, 1069, "Claudia Hernández con cuatro personas frente a la basílica de Floridablanca, de noche"),
  "basilica-noche-vertical": g("basilica-noche-vertical", 1069, 1600, "Claudia Hernández con cuatro personas frente a la basílica iluminada de Floridablanca"),
  "basilica-verde-familias": g("basilica-verde-familias", 1069, 1600, "Claudia Hernández con varias familias frente a la basílica iluminada de verde"),
  "carnaval-recorrido-horizontal": g("carnaval-recorrido-horizontal", 1600, 1066, "Claudia Hernández con un joven y una máscara de carnaval en un recorrido cultural"),
  "feria-calle-madre-e-hija": g("feria-calle-madre-e-hija", 1600, 1069, "Claudia Hernández con una mujer y una niña en una feria de la calle"),
  "carnaval-recorrido-vertical": g("carnaval-recorrido-vertical", 1066, 1600, "Claudia Hernández con un joven y una máscara de carnaval junto a una estación del metrocable"),
  "personajes-carnaval": g("personajes-carnaval", 1099, 1600, "Dos personajes del carnaval con trajes de colores y máscaras en la calle"),
  "carnaval-microfono": g("carnaval-microfono", 1600, 1066, "Claudia Hernández con micrófono y un joven, ambos con trajes de carnaval"),
  "halloween-globos": g("halloween-globos", 1600, 1066, "Joven con traje de carnaval frente a un arco de globos de Halloween"),
  "retrato-camisa-institucional-jardin": g("retrato-camisa-institucional-jardin", 853, 1280, "Retrato de Claudia Hernández con camisa blanca institucional en un jardín"),
  "retrato-camiseta-celeste-montana": g("retrato-camiseta-celeste-montana", 855, 1280, "Claudia Hernández con camiseta celeste y un paisaje de montañas al fondo"),
  "retrato-concejal-placa": g("retrato-concejal-placa", 853, 1280, "Claudia Hernández sentada en su puesto del Concejo, con la placa de concejal"),
  "retrato-camisa-institucional-despacho": g("retrato-camisa-institucional-despacho", 1066, 1600, "Retrato de Claudia Hernández sonriendo con camisa blanca del Concejo en su despacho"),
  "retrato-camisa-institucional-escritorio": g("retrato-camisa-institucional-escritorio", 854, 1280, "Claudia Hernández sentada en su escritorio con camisa blanca del Concejo"),
  "reunion-comunitaria-escucha": g("reunion-comunitaria-escucha", 1600, 1069, "Claudia Hernández tomando apuntes en una reunión comunitaria con mujeres"),
  "equipo-futsal-femenino": g("equipo-futsal-femenino", 1280, 854, "Claudia Hernández con equipos de futsal femenino y su cuerpo técnico en una cancha de barrio"),
} as const;

export type GaleriaId = keyof typeof galeria;
