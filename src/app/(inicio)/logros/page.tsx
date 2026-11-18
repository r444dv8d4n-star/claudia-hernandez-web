import type { Metadata } from "next";
import { galeria } from "@/content/galeria";
import { Reconocimientos, Medios, Comisiones, Acuerdos, Franja, PageHero, Pantallas } from "../sections";

export const metadata: Metadata = {
  title: "Logros",
  description: "Reconocimientos, prensa y comisiones de Claudia Hernández en el Concejo de Floridablanca.",
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
      <Reconocimientos />
      <Franja quote="Las mujeres lideran, transforman y dejan huella." />
      <Medios />
      <Comisiones />
      <Acuerdos />
    </Pantallas>
  );
}
