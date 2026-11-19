import type { Metadata } from "next";
import { galeria } from "@/content/galeria";
import { Franja, HistoriaCompleta, LineaDeTiempo, PageHero, Pantallas, Video } from "../sections";

export const metadata: Metadata = {
  title: "Su historia: de los barrios al Concejo",
  description: "La historia de Claudia Hernández, concejala de Floridablanca: mamá, abogada y líder social, primera mujer en presidir el Concejo. Su vida contada en el podcast Detrás del Poder.",
  alternates: { canonical: "/historia" },
  openGraph: { title: "Su historia: de los barrios al Concejo", description: "La historia de Claudia Hernández, concejala de Floridablanca: mamá, abogada y líder social, primera mujer en presidir el Concejo. Su vida contada en el podcast Detrás del Poder.", url: "/historia" },
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
      <Franja tone="must" quote="Lo que se escribe no se borra… se transforma." />
      <HistoriaCompleta />
    </Pantallas>
  );
}
