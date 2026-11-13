import type { Metadata } from "next";
import { Proyectos, HechoEnFloridablanca, Muro, Hablemos, PageHero, Pantallas } from "../sections";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Frentes de trabajo de Claudia Hernández: mujeres y emprendimiento, educación, salud, cultura y barrios de Floridablanca.",
};

export default function ProyectosPage() {
  return (
    <Pantallas>
      <PageHero
        eyebrow="Proyectos"
        title={<>Donde está el <em>trabajo</em>.</>}
        lead="Cinco frentes que guían su labor en el Concejo y en los barrios de Floridablanca."
      />
      <Proyectos />
      <HechoEnFloridablanca />
      <Muro />
      <Hablemos />
    </Pantallas>
  );
}
