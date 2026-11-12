import type { Metadata } from "next";
import { Reconocimientos, Medios, Comisiones, Acuerdos, Hablemos, PageHero, Pantallas } from "../sections";

export const metadata: Metadata = {
  title: "Logros",
  description: "Reconocimientos, prensa y comisiones de Claudia Hernández en el Concejo de Floridablanca.",
};

export default function Logros() {
  return (
    <Pantallas>
      <PageHero
        eyebrow="Logros"
        title={<>Hechos que se pueden <em>contar</em>.</>}
        lead="Lo que ha impulsado desde el Concejo de Floridablanca, con sus fuentes. Esta página crece a medida que se confirman nuevos resultados."
      />
      <Reconocimientos />
      <Medios />
      <Comisiones />
      <Acuerdos />
      <Hablemos />
    </Pantallas>
  );
}
