import type { Metadata } from "next";
import { galeria } from "@/content/galeria";
import { Proyectos, Franja, HechoEnFloridablanca, Muro, Hablemos, PageHero, Pantallas } from "../sections";

export const metadata: Metadata = {
  title: "Proyectos: mujeres, emprendimiento y barrios",
  description: "Frentes de trabajo de Claudia Hernández en Floridablanca: mujeres y emprendimiento, educación, salud, cultura y barrios. Emprendedores de «Hecho en Floridablanca».",
  alternates: { canonical: "/proyectos" },
  openGraph: { title: "Proyectos: mujeres, emprendimiento y barrios", description: "Frentes de trabajo de Claudia Hernández en Floridablanca: mujeres y emprendimiento, educación, salud, cultura y barrios. Emprendedores de «Hecho en Floridablanca».", url: "/proyectos" },
};

export default function ProyectosPage() {
  return (
    <Pantallas>
      <PageHero
        foto={galeria["reunion-comunitaria-escucha"]}
        eyebrow="Proyectos"
        title={<>Donde está el <em>trabajo</em>.</>}
        lead={"Cinco frentes que guían su labor en el Concejo y en los barrios de Floridablanca."}
      />
      <Proyectos />
      <HechoEnFloridablanca />
      <Franja tone="must" quote="Contar estas historias… también es endulzar el alma." />
      <Muro />
      <Hablemos />
    </Pantallas>
  );
}
