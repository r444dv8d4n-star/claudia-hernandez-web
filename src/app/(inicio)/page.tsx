import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Spotlight from "@/components/Spotlight";
import HeroName from "@/components/HeroName";
import HeroCollage from "@/components/HeroCollage";
import ExtraSection from "@/components/ExtraSection";
import ActivarPantallas from "@/components/ActivarPantallas";
import UneteRed from "@/components/UneteRed";
import { RED, redAbierta } from "@/content/red";
import LinkMedido from "@/components/LinkMedido";
import SocialIcons from "@/components/SocialIcons";
import { person, img } from "@/content/site";
import { HistoriaCards, Cifras, Franja, Reconocimientos, BitacoraTeaser, Proyectos, Hablemos } from "./sections";
import s from "./o2.module.css";

export const metadata: Metadata = {
  title: { absolute: "Claudia Hernández · Concejala de Floridablanca" },
  description: "Claudia Hernández, concejala de Floridablanca (2024–2027) y primera mujer en presidir su Concejo. ExpoMujer, Mujeres Imparables, emprendedores y barrios de Floridablanca, Santander.",
  alternates: { canonical: "/" },
  openGraph: { title: "Claudia Hernández · Concejala de Floridablanca", description: "Claudia Hernández, concejala de Floridablanca (2024–2027) y primera mujer en presidir su Concejo. ExpoMujer, Mujeres Imparables, emprendedores y barrios de Floridablanca, Santander.", url: "/" },
};

// Miniaturas del collage de entrada (fotos nuevas subidas a main por el equipo).
const collageExtra = ["futsal-equipos", "payaso-ninos", "carnaval-con-musica", "encuentro-familias-barrio", "feria-noche-ninas", "foto-grupal-parque", "carpa-banderines", "entrega-diplomas", "escucha-comunidad", "carnaval-mascara"].map((n) => `/assets/img/thumbs/${n}.webp`);
const collage = [img.sesion, img.mujeres, img.basilica, img.visita, img.feria, img.ninos, img.familia, img.retrato, img.blazer].map((i) => i.src.replace("/img/", "/img/thumbs/")).concat(collageExtra);

export default function Inicio() {
  return (
    <>

      {/* Inicio por pantallas: cada sección ocupa una pantalla y el scroll pasa de una a otra */}
      <div className={`${s.snap} ${s.snapOn}`}>
        <ActivarPantallas />
      {/* PORTADA: panel mostaza + foto */}
      <Spotlight className={s.hero}>
        <div className={s.heroImg}>
          <Image src={img.consejo.src} alt={img.consejo.alt} width={img.consejo.w} height={img.consejo.h} priority sizes="(max-width:960px) 100vw, 50vw" style={{ objectPosition: img.consejo.pos }} />
        </div>
        <HeroCollage cls={s} thumbs={collage} />
        <div className={s.heroCopy} id="prologo">
          <p className={s.kicker}>{person.role.replace(/ (\S+)$/, " $1")}{" · "}{person.period}</p>
          <HeroName />
          <p className={s.tagline}>De aquí, como tú.</p>
          <p className={s.traits}>{["Florideña", "Mamá", "Abogada", "Líder social"].map((t, i) => (<span key={t} className={s.trait}>{i > 0 && <i aria-hidden="true"> · </i>}{t}</span>))}</p>
          <p className={s.lead}>Primera mujer en presidir el Concejo de Floridablanca.</p>
          <div className={s.ctas}>
            {/* Con la red abierta, la acción principal es sumarse; la historia pasa a segundo botón. */}
            {redAbierta ? (
              <>
                <LinkMedido evento="clic_sumate_portada" className={s.btn} href="/registro">{RED.boton} <span aria-hidden="true">→</span></LinkMedido>
                <Link className={s.btnGhost} href="/historia#video"><span aria-hidden="true">▶</span> Conoce su historia</Link>
              </>
            ) : (
              <>
                <Link className={s.btn} href="/historia#video"><span aria-hidden="true">▶</span> Conoce su historia</Link>
                <Link className={s.btnGhost} href="/logros">Mira su trabajo <span aria-hidden="true">→</span></Link>
              </>
            )}
          </div>
          <div className={s.heroSoc}><span>También en</span><SocialIcons /></div>
        </div>
      </Spotlight>

      <HistoriaCards more />
      <Cifras />
      <Franja quote="La fuerza de Floridablanca está en su gente y en nuestra unión." />
      <Reconocimientos more />
      <BitacoraTeaser />
      <Proyectos more />
      <ExtraSection className={s.extra} />
      <UneteRed />
      <Hablemos frase={false} />
      </div>
    </>
  );
}
