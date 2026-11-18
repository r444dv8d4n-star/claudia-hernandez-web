import type { Metadata } from "next";
import { galeria } from "@/content/galeria";
import { HistoriaCompleta, LineaDeTiempo, PageHero, Pantallas, Video } from "../sections";

export const metadata: Metadata = {
  title: "Su historia",
  description: "La historia de Claudia Hernández en cuatro capítulos: raíces, derecho, comunidad y Concejo de Floridablanca.",
};

export default function Historia() {
  return (
    <Pantallas>
      <PageHero
        foto={galeria["basilica-noche-horizontal"]}
        eyebrow="Historia"
        title={<>Una historia que empieza en <em>casa</em>.</>}
        lead="Cuatro capítulos que explican cómo llegó al Concejo de Floridablanca y por qué trabaja como trabaja."
      />
      <Video />
      <LineaDeTiempo />
      <HistoriaCompleta />
    </Pantallas>
  );
}
