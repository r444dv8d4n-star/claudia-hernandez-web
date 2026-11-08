import Image from "next/image";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import ContactForm from "@/components/ContactForm";
import ExtraSection from "@/components/ExtraSection";
import { person, img, comisiones, frentes, acuerdos, blog, TBC } from "@/content/site";
import s from "./o1.module.css";

const links = [
  ["#sobre", "Sobre mí"],
  ["#concejo", "Concejo"],
  ["#mujeres", "Mujeres"],
  ["#acuerdos", "Acuerdos"],
  ["#blog", "Blog"],
  ["#contacto", "Contacto"],
];

export default function Opcion1() {
  return (
    <>
      <a className={s.skip} href="#main">Saltar al contenido</a>
      <header className={s.header}>
        <a href="#inicio" className={s.logo}>
          <span className={s.mono}>CH</span> Claudia Hernández
        </a>
        <nav aria-label="Principal" className={s.nav}>
          {links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
        </nav>
        <details className={s.burger}>
          <summary aria-label="Abrir menú"><span /><span /><span /></summary>
          <nav aria-label="Menú móvil">
            {links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
          </nav>
        </details>
      </header>

      <main id="main">
        {/* HERO */}
        <section id="inicio" className={s.hero}>
          <div className={s.heroText}>
            <p className={s.kicker}>{person.role} · {person.period}</p>
            <h1>Floridablanca crece cuando <em>las mujeres</em> crecen.</h1>
            <p className={s.lead}>Abogada, mamá y líder social. Camino los barrios con una convicción: cuidar es sembrar futuro.</p>
            <div className={s.cta}>
              <a className={s.btn} href="#contacto">Hablemos</a>
              <a className={s.ghost} href="#sobre">Conoce mi historia</a>
            </div>
          </div>
          <div className={s.heroPhoto}>
            <div className={s.frame}>
              <Image src={img.retrato.src} alt={img.retrato.alt} width={img.retrato.w} height={img.retrato.h} priority sizes="(max-width:900px) 92vw, 46vw" />
            </div>
            <div className={s.badge} aria-hidden="true"><b>2024</b><i>—</i><b>2027</b></div>
          </div>
          <svg className={s.thread} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 80 C 200 10, 380 110, 600 60 S 1000 10, 1200 70" fill="none" stroke="#D9A21B" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </section>

        {/* CIFRAS */}
        <section className={s.stats} aria-label="Datos clave">
          <Reveal className={s.stat}><Counter to={2} className={s.num} /><span>comisiones en las que participa</span></Reveal>
          <Reveal className={s.stat} delay={100}><Counter to={209} className={s.num} /><span>años celebró Floridablanca</span></Reveal>
          <Reveal className={s.stat} delay={200}><span className={s.num}>{person.period}</span><span>periodo como concejala</span></Reveal>
          <Reveal className={s.stat} delay={300}><span className={`${s.num} ${s.tbc}`}>{TBC}</span><span>mujeres acompañadas en sus proyectos</span></Reveal>
        </section>

        {/* SOBRE MÍ */}
        <section id="sobre" className={s.about}>
          <Reveal className={s.aboutPhoto} variant="clip">
            <Image src={img.blazer.src} alt={img.blazer.alt} width={img.blazer.w} height={img.blazer.h} sizes="(max-width:900px) 92vw, 40vw" />
          </Reveal>
          <div className={s.aboutText}>
            <Reveal><p className={s.eyebrow}>Sobre mí</p></Reveal>
            <Reveal delay={80}><h2>Tres maneras de cuidar de Floridablanca.</h2></Reveal>
            <ol className={s.timeline}>
              {[
                ["Mamá", `Mi familia es mi primer territorio y mi razón de ser. ${TBC} Historia personal.`],
                ["Abogada", `Defiendo el derecho de las personas a ser escuchadas y atendidas. ${TBC} Formación y trayectoria.`],
                ["Líder social", `Trabajo hombro a hombro con mujeres soñadoras y emprendedoras. ${TBC} Organizaciones y alianzas.`],
              ].map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 120}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* CONCEJO */}
        <section id="concejo" className={s.council}>
          <Reveal><p className={s.eyebrow}>Concejo en acción</p></Reveal>
          <Reveal delay={80}><h2>Desde el Concejo, con los pies en el barrio.</h2></Reveal>
          <div className={s.cards}>
            {comisiones.map((c, i) => (
              <Reveal key={c.name} delay={i * 120} className={s.card}>
                <h3>{c.name}</h3>
                <p>{c.scope}</p>
              </Reveal>
            ))}
          </div>
          <ul className={s.frentes}>
            {frentes.map((f, i) => (
              <Reveal as="li" key={f.t} delay={i * 70}>
                <span className={s.dot} aria-hidden="true" />
                <div><h3>{f.t}</h3><p>{f.d}</p></div>
              </Reveal>
            ))}
          </ul>
          <Reveal className={s.sessionPic} variant="clip">
            <Image src={img.sesion.src} alt={img.sesion.alt} width={img.sesion.w} height={img.sesion.h} sizes="(max-width:900px) 92vw, 80vw" />
          </Reveal>
        </section>

        {/* MUJERES */}
        <section id="mujeres" className={s.women}>
          <div className={s.womenIntro}>
            <Reveal><p className={`${s.eyebrow} ${s.light}`}>Mujeres y emprendimiento</p></Reveal>
            <Reveal delay={80}><h2>Sueños que se vuelven oficio, oficios que se vuelven futuro.</h2></Reveal>
            <Reveal delay={160}><p>Ferias, talleres y encuentros para que cada emprendedora tenga vitrina, voz y respaldo. {TBC} Programas y cifras.</p></Reveal>
          </div>
          <div className={s.mosaic}>
            {[img.mujeres, img.feria, img.olla, img.visita].map((p, i) => (
              <Reveal key={p.src} variant="clip" delay={i * 100} className={s.tile}>
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(max-width:900px) 92vw, 44vw" loading="lazy" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ACUERDOS */}
        <section id="acuerdos" className={s.agreements}>
          <Reveal><p className={s.eyebrow}>Acuerdos que he impulsado</p></Reveal>
          <Reveal delay={80}><h2>Lo que se vuelve ley municipal, se vuelve vida cotidiana.</h2></Reveal>
          <div className={s.acc}>
            {acuerdos.map((a, i) => (
              <Reveal key={i} delay={i * 100}>
                <details className={s.item} open={i === 0}>
                  <summary><span>{a.n}</span><strong>{a.t}</strong></summary>
                  <p>{a.d}</p>
                  <small>Año: {a.year} · Fuente: Concejo Municipal de Floridablanca</small>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* GALERÍA */}
        <section className={s.gallery} aria-label="Galería">
          <Reveal><h2>En la calle, con la gente.</h2></Reveal>
          <div className={s.gGrid}>
            {[img.basilica, img.familia, img.feria, img.mujeres].map((p, i) => (
              <Reveal key={p.src + i} variant="clip" delay={i * 90} className={`${s.g} ${i === 1 ? s.tall : ""}`}>
                <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(max-width:900px) 46vw, 30vw" loading="lazy" />
              </Reveal>
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className={s.blog}>
          <Reveal><p className={s.eyebrow}>Blog</p></Reveal>
          <Reveal delay={80}><h2>Ideas, noticias y pedagogía ciudadana.</h2></Reveal>
          <div className={s.posts}>
            {blog.map((b, i) => (
              <Reveal as="article" key={b.t} delay={i * 110} className={s.post}>
                <span className={s.tag}>{b.tag}</span>
                <h3>{b.t}</h3>
                <p>{TBC} Resumen de la entrada.</p>
                <a href="#blog" aria-label={`Leer más: ${b.t}`}>Leer más →</a>
              </Reveal>
            ))}
          </div>
        </section>

        <ExtraSection className={s.extra} />

        {/* CONTACTO */}
        <section id="contacto" className={s.join}>
          <div>
            <Reveal><p className={`${s.eyebrow} ${s.light}`}>Únete o contáctame</p></Reveal>
            <Reveal delay={80}><h2>Esto se teje entre todas y todos.</h2></Reveal>
            <Reveal delay={160}><p>Cuéntame qué necesita tu barrio, tu emprendimiento o tu familia. Te escribo yo o mi equipo.</p></Reveal>
          </div>
          <Reveal className={s.formWrap}><ContactForm cls={s} /></Reveal>
        </section>
      </main>

      <footer className={s.footer}>
        <p><strong>Claudia Hernández</strong> · {person.role} · {person.city}</p>
        <p className={s.soc}>
          <a href={person.social.instagram} rel="noopener noreferrer" target="_blank">Instagram</a>
          <a href={person.social.tiktok} rel="noopener noreferrer" target="_blank">TikTok</a>
          <a href={person.social.facebook} rel="noopener noreferrer" target="_blank">Facebook</a>
        </p>
        <p className={s.small}>Prototipo de diseño · Opción 1</p>
      </footer>
    </>
  );
}
