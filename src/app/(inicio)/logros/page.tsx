import type { Metadata } from "next";
import { galeria } from "@/content/galeria";
import { Reconocimientos, Medios, Comisiones, Acuerdos, Franja, PageHero, Pantallas } from "../sections";

export const metadata: Metadata = {
  title: "Logros en el Concejo de Floridablanca",
  description: "Acuerdos municipales de Claudia Hernández (ExpoMujer, la sesión de los niños en el Concejo, Festival de Arte Urbano), reconocimientos, comisiones y notas de prensa.",
  alternates: { canonical: "/logros" },
  openGraph: { title: "Logros en el Concejo de Floridablanca", description: "Acuerdos municipales de Claudia Hernández (ExpoMujer, la sesión de los niños en el Concejo, Festival de Arte Urbano), reconocimientos, comisiones y notas de prensa.", url: "/logros" },
};

export default function Logros() {
  return (
    <Pantallas>
      <PageHero
        foto={galeria["retrato-concejal-placa"]}
        eyebrow="Logros"
        title={<>Hechos que se pueden <em>contar</em>.</>}
        lead="Lo que ha impulsado desde el Concejo de Floridablanca, con sus fuentes. Esta página crece a medida que se confirman nuevos resultados."
      />
      <Medios />
      <Comisiones />
      <Acuerdos />
      <Franja quote="Las mujeres lideran, transforman y dejan huella." />
      <Reconocimientos />
    </Pantallas>
  );
}
