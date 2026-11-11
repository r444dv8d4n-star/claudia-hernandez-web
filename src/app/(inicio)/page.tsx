import Image from "next/image";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Spotlight from "@/components/Spotlight";
import ContactForm from "@/components/ContactForm";
import HeroCollage from "@/components/HeroCollage";
import ExtraSection from "@/components/ExtraSection";
import { person, img, comisiones, frentes, acuerdos, blog, TBC } from "@/content/site";
import s from "./o2.module.css";

const collage = [img.sesion, img.mujeres, img.basilica, img.visita, img.feria, img.olla, img.familia, img.retrato, img.blazer].map((i) => i.src.replace("/img/", "/img/thumbs/"));

const chapters = [
  { n: "I", t: "Raíces", d: `Antes de las sesiones y los expedientes, hubo una familia y un barrio que enseñaron a cuidar. ${TBC} Historia personal.`, p: img.familia },
  { n: "II", t: "Derecho", d: `Estudiar derecho fue elegir una herramienta para que las personas sean escuchadas. ${TBC} Formación y trayectoria.`, p: img.blazer },
  { n: "III", t: "Comunidad", d: `Con mujeres soñadoras y emprendedoras aprendió que el liderazgo se construye en la calle. ${TBC} Organizaciones y alianzas.`, p: img.mujeres },
  { n: "IV", t: "Concejo", d: `Hoy trabaja desde el Concejo de Floridablanca (${person.period}) llevando esas voces a las decisiones del municipio. En 2026 sus colegas la eligieron presidenta de la corporación.`, p: img.sesion },
];

export default function Opcion2() {
  return (
    <>
      <a className={s.skip} href="#main">Saltar al contenido</a>
      <header className={s.header}>
        <a href="#prologo" className={s.logo}>Claudia <span>Hernández</span></a>
        <nav aria-label="Principal" className={s.nav}>
          <a href="#capitulos">Historia</a>
          <a href="#acuerdos">Acuerdos</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#diario">Blog</a>
          <a className={s.pill} href="#hablemos">Hablemos</a>
        </nav>
        <a className={`${s.pill} ${s.mobilePill}`} href="#hablemos">Hablemos</a>
      </header>

      <main id="main">
        {/* PRÓLOGO */}
        <Spotlight className={s.hero}>
          <div className={s.heroImg}>
            <Image src={img.consejo.src} alt={img.consejo.alt} width={img.consejo.w} height={img.consejo.h} priority sizes="100vw" />
          </div>
          <HeroCollage cls={s} thumbs={collage} />
          <div className={s.heroCopy} id="prologo" data-hero-copy>
            <p className={s.kicker}>{person.role} · {person.period}</p>
            <h1>Decisiones con <em>corazón</em> de barrio.</h1>
            <p className={s.lead}>Mamá, abogada y líder social. Una historia que empieza en casa y se escribe junto a las mujeres de Floridablanca.</p>
            <a className={s.btn} href="#capitulos">Leer su historia <span aria-hidden="true">↓</span></a>
          </div>
          <div className={s.scrollHint} aria-hidden="true"><i /></div>
        </Spotlight>

        {/* CAPÍTULOS (apilados en vertical) */}
        <section id="capitulos" className={s.chapters} aria-label="Historia en cuatro capítulos">
          {chapters.map((c, i) => (
            <article key={c.n} className={s.chapter} style={{ ["--i" as string]: i }}>
              <div className={s.chNum} aria-hidden="true">{c.n}</div>
              <div className={s.chBody}>
                <Reveal><p className={s.eyebrow}>Capítulo {c.n}</p></Reveal>
                <Reveal delay={80}><h2>{c.t}</h2></Reveal>
                <Reveal delay={160}><p>{c.d}</p></Reveal>
              </div>
              <Reveal className={s.chPic} variant="clip">
                <Image src={c.p.src} alt={c.p.alt} width={c.p.w} height={c.p.h} sizes="(max-width:900px) 92vw, 44vw" loading={i === 0 ? "eager" : "lazy"} />
              </Reveal>
            </article>
          ))}
        </section>

        {/* EN NÚMEROS */}
        <section className={s.numbers} aria-label="En cifras">
          <Reveal><h2>En el Concejo, en cifras.</h2></Reveal>
          <div className={s.numGrid}>
            <Reveal className={s.n}><Counter to={2} className={s.big} /><span>comisiones del Concejo</span></Reveal>
            <Reveal className={s.n} delay={120}><Counter to={209} className={s.big} /><span>años de Floridablanca celebrados</span></Reveal>
            <Reveal className={s.n} delay={240}><span className={`${s.big} ${s.tbc}`}>{TBC}</span><span>habitantes beneficiados</span></Reveal>
          </div>
          <ul className={s.comisiones}>
            {comisiones.map((c) => (
              <li key={c.name}><strong>{c.name}</strong><span>{c.scope}</span></li>
            ))}
          </ul>
        </section>

        {/* ACUERDOS — línea de tiempo vertical */}
        <section id="acuerdos" className={s.agreements}>
          <Reveal><p className={s.eyebrow}>Acuerdos</p></Reveal>
          <Reveal delay={80}><h2>Lo que se aprobó y lo que cambió.</h2></Reveal>
          <ol className={s.tl}>
            {acuerdos.map((a, i) => (
              <Reveal as="li" key={i} delay={i * 120}>
                <span className={s.tlYear}>{a.year}</span>
                <h3>{a.t}</h3>
                <p className={s.tlN}>{a.n}</p>
                <p>{a.d}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* PROYECTOS — tarjetas apiladas */}
        <section id="proyectos" className={s.projects}>
          <Reveal><p className={s.eyebrow}>Proyectos y frentes de trabajo</p></Reveal>
          <div className={s.stack}>
            {frentes.map((f, i) => (
              <article key={f.t} className={s.pcard} style={{ ["--k" as string]: i }}>
                <span className={s.pIdx} aria-hidden="true">0{i + 1}</span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
                <small>{f.logro ?? `${TBC} Resultados y fotos.`}</small>
              </article>
            ))}
          </div>
        </section>

        {/* COMUNIDAD — muro de fotos con paralaje suave */}
        <section className={s.wall} aria-label="Comunidad">
          <Reveal><h2>Floridablanca, de cerca.</h2></Reveal>
          <div className={s.wallGrid}>
            {[img.basilica, img.olla, img.feria, img.visita].map((p, i) => (
              <figure key={p.src} className={s.shot} style={{ ["--k" as string]: i }}>
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(max-width:900px) 92vw, 46vw" loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section id="diario" className={s.blog}>
          <Reveal><p className={s.eyebrow}>Blog</p></Reveal>
          <Reveal delay={80}><h2>Lo que pienso, lo que veo, lo que propongo.</h2></Reveal>
          <ul className={s.entries}>
            {blog.map((b, i) => (
              <Reveal as="li" key={b.t} delay={i * 100}>
                <a href="#diario">
                  <span className={s.eN}>0{i + 1}</span>
                  <span className={s.eT}>{b.t}</span>
                  <span className={s.eM}>{b.tag} · {b.date}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </section>

        <ExtraSection className={s.extra} />

        {/* CONTACTO */}
        <section id="hablemos" className={s.contact}>
          <div className={s.cText}>
            <Reveal><p className={s.eyebrow}>Hablemos</p></Reveal>
            <Reveal delay={80}><h2>Tu voz también cuenta en esta historia.</h2></Reveal>
            <Reveal delay={160}><p>Escríbeme sobre tu barrio, tu emprendimiento o una idea para Floridablanca.</p></Reveal>
          </div>
          <Reveal className={s.formWrap}><ContactForm cls={s} /></Reveal>
        </section>
      </main>

      <footer className={s.footer}>
        <p><strong>Claudia Hernández</strong> · {person.role} · {person.city}</p>
        <p className={s.soc}>
          <a href={person.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={person.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href={person.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        </p>
      </footer>
    </>
  );
}
