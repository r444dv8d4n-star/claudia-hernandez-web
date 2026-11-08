import Image from "next/image";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import ContactForm from "@/components/ContactForm";
import ExtraSection from "@/components/ExtraSection";
import { person, img, comisiones, frentes, acuerdos, blog, agenda, TBC } from "@/content/site";
import s from "./o3.module.css";

export default function Opcion3() {
  return (
    <>
      <a className={s.skip} href="#main">Saltar al contenido</a>
      <header className={s.header}>
        <a href="#inicio" className={s.logo}><span>C</span>laudia H.</a>
        <nav aria-label="Principal" className={s.nav}>
          <a href="#quien">Quién soy</a>
          <a href="#frentes">Frentes</a>
          <a href="#acuerdos">Acuerdos</a>
          <a href="#agenda">Agenda</a>
          <a href="#blog">Blog</a>
        </nav>
        <a className={s.cta} href="#sumate">Súmate</a>
      </header>

      <main id="main">
        {/* HERO BENTO */}
        <section id="inicio" className={s.hero}>
          <Reveal variant="pop" className={`${s.tile} ${s.tTitle}`}>
            <p className={s.kicker}>{person.role}</p>
            <h1>Hola, soy <span>Claudia.</span></h1>
            <p>Abogada, mamá y líder social. Trabajo para que más mujeres de Floridablanca sueñen, emprendan y lleguen lejos.</p>
          </Reveal>

          <Reveal variant="pop" delay={120} className={`${s.tile} ${s.tPhoto}`}>
            <div className={s.blob}>
              <Image src={img.blazer.src} alt={img.blazer.alt} width={img.blazer.w} height={img.blazer.h} priority sizes="(max-width:900px) 92vw, 36vw" />
            </div>
          </Reveal>

          <Reveal variant="pop" delay={200} className={`${s.tile} ${s.tChips}`}>
            <ul aria-label="Quién es">
              {person.roles.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </Reveal>

          <Reveal variant="pop" delay={280} className={`${s.tile} ${s.tStat}`}>
            <Counter to={2} className={s.big} />
            <span>comisiones en el Concejo</span>
          </Reveal>

          <Reveal variant="pop" delay={360} className={`${s.tile} ${s.tYears}`}>
            <span className={s.big}>{person.period}</span>
            <span>periodo como concejala</span>
          </Reveal>

          <Reveal variant="pop" delay={440} className={`${s.tile} ${s.tCta}`}>
            <p>¿Tienes una idea para tu barrio?</p>
            <a href="#sumate">Cuéntamela →</a>
          </Reveal>
        </section>

        {/* QUIÉN SOY */}
        <section id="quien" className={s.who}>
          <Reveal><h2>Quién soy, en tres líneas.</h2></Reveal>
          <div className={s.whoGrid}>
            {[
              ["Mamá", `La familia es mi primer equipo. ${TBC}`],
              ["Abogada", `Uso el derecho para abrir puertas. ${TBC}`],
              ["Líder social", `Creciendo con mujeres soñadoras y emprendedoras. ${TBC}`],
            ].map(([t, d], i) => (
              <Reveal key={t} variant="pop" delay={i * 120} className={`${s.who1} ${s[`c${i}`]}`}>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FRENTES */}
        <section id="frentes" className={s.fronts}>
          <Reveal><h2>Mis frentes de trabajo.</h2></Reveal>
          <p className={s.sub}>Toca cada uno para ver el detalle.</p>
          <div className={s.fGrid}>
            {frentes.map((f, i) => (
              <Reveal key={f.t} delay={i * 80} variant="pop">
                <details className={`${s.f} ${s[`f${i % 3}`]}`}>
                  <summary><span className={s.fIdx}>0{i + 1}</span>{f.t}<i aria-hidden="true">+</i></summary>
                  <p>{f.d}</p>
                  <small>{TBC} Resultados concretos.</small>
                </details>
              </Reveal>
            ))}
          </div>
          <ul className={s.comis}>
            {comisiones.map((c) => (
              <li key={c.name}><strong>{c.name}</strong> · {c.scope}</li>
            ))}
          </ul>
        </section>

        {/* ACUERDOS */}
        <section id="acuerdos" className={s.agreements}>
          <Reveal><h2>Acuerdos que he sacado adelante.</h2></Reveal>
          <div className={s.aGrid}>
            {acuerdos.map((a, i) => (
              <Reveal key={i} variant="pop" delay={i * 120} className={s.aCard}>
                <span className={s.check} aria-hidden="true">✓</span>
                <p className={s.aN}>{a.n}</p>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
                <small>Año {a.year}</small>
              </Reveal>
            ))}
          </div>
        </section>

        {/* GALERÍA BENTO */}
        <section className={s.gallery} aria-label="Galería">
          <Reveal><h2>Mi día a día.</h2></Reveal>
          <div className={s.gBento}>
            {[
              [img.mujeres, s.gA], [img.familia, s.gB], [img.olla, s.gC], [img.basilica, s.gD], [img.feria, s.gE],
            ].map(([p, c], i) => {
              const ph = p as typeof img.mujeres;
              return (
                <Reveal key={ph.src} variant="clip" delay={i * 80} className={`${s.shot} ${c as string}`}>
                  <Image src={ph.src} alt={ph.alt} width={ph.w} height={ph.h} sizes="(max-width:900px) 92vw, 40vw" loading="lazy" />
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* AGENDA */}
        <section id="agenda" className={s.agenda}>
          <Reveal><h2>Agenda.</h2></Reveal>
          <ul>
            {agenda.map((a, i) => (
              <Reveal as="li" key={i} delay={i * 100}>
                <span className={s.date}>{a.d}</span>
                <div><strong>{a.t}</strong><span>{a.p}</span></div>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* BLOG */}
        <section id="blog" className={s.blog}>
          <Reveal><h2>Blog.</h2></Reveal>
          <div className={s.bGrid}>
            {blog.map((b, i) => (
              <Reveal as="article" key={b.t} variant="pop" delay={i * 100} className={`${s.post} ${s[`p${i}`]}`}>
                <span className={s.tag}>{b.tag}</span>
                <h3>{b.t}</h3>
                <a href="#blog" aria-label={`Leer: ${b.t}`}>Leer →</a>
              </Reveal>
            ))}
          </div>
        </section>

        <ExtraSection className={s.extra} />

        {/* SÚMATE */}
        <section id="sumate" className={s.join}>
          <div className={s.jText}>
            <Reveal><h2>Súmate. Esto es de todas y todos.</h2></Reveal>
            <Reveal delay={100}><p>Déjame tus datos y mi equipo te escribe. También me encuentras en redes.</p></Reveal>
            <Reveal delay={200}>
              <p className={s.soc}>
                <a href={person.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href={person.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
                <a href={person.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              </p>
            </Reveal>
          </div>
          <Reveal variant="pop" className={s.formWrap}><ContactForm cls={s} /></Reveal>
        </section>
      </main>

      <footer className={s.footer}>
        <p><strong>Claudia Hernández</strong> · {person.role} · {person.city}</p>
        <p className={s.small}>Prototipo de diseño · Opción 3</p>
      </footer>

      <a className={s.bar} href="#sumate">Quiero sumarme</a>
    </>
  );
}
