import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { socialIcon } from "@/components/Icons";
import { SHOW_CONTACT_FORM } from "@/config/features";
import Counter from "@/components/Counter";
import { chapters, slidesReconocimientos, comisiones, reconocimientos, medios, frentes, wall, redes, acuerdosListos, video, cifras, timeline } from "@/content/site";
import AwardSlides from "@/components/AwardSlides";
import VideoYoutube from "@/components/VideoYoutube";
import { published, formatDate, bitacora, HECHO, slugTema, type Post } from "@/content/blog";
import s from "./o2.module.css";

type Head = { eyebrow: string; title: string; lead?: string; id?: string; href?: string };

function SecHead({ eyebrow, title, lead, id, href }: Head) {
  return (
    <div className={s.secHead}>
      <Reveal><p className={s.eyebrow}>{eyebrow}</p></Reveal>
      <Reveal delay={80}><h2 id={id}>{href ? <Link href={href} className={s.titleLink}>{title}</Link> : title}</h2></Reveal>
      {lead && <Reveal delay={140}><p>{lead}</p></Reveal>}
    </div>
  );
}

const More = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link className={s.more} href={href}>{children} <span aria-hidden="true">→</span></Link>
);

/** Los cuatro capítulos como tarjetas (inicio). */
export function HistoriaCards({ more = false }: { more?: boolean }) {
  return (
    <section className={`${s.sec} ${s.histHome}`} aria-labelledby="historia-title">
      <SecHead eyebrow="Historia" title="Su historia, en cuatro capítulos." id="historia-title" />
      <div className={s.chGrid}>
        {chapters.map((c, i) => (
          <Reveal as="article" key={c.n} className={s.chapter} delay={i * 90}>
            <div className={s.chPic}>
              <Image src={c.p.src} alt={c.p.alt} width={c.p.w} height={c.p.h} sizes="(max-width:960px) 92vw, 24vw" loading="lazy" style={{ objectPosition: c.p.pos }} />
              <span className={s.chNum} aria-hidden="true">{c.n}</span>
            </div>
            <div className={s.chBody}>
              <p className={s.chLabel}>Capítulo {c.n}</p>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {more && <More href="/historia">Leer su historia completa</More>}
    </section>
  );
}

/** Los cuatro capítulos, cada uno en su propia pantalla con foto y texto alternos (página Historia). */
export function HistoriaCompleta() {
  return (
    <>
      {chapters.map((c, i) => (
        <section key={c.n} className={`${s.sec} ${s.storyRow}`} aria-label={`Capítulo ${c.n}: ${c.t}`}>
          <Reveal className={s.chPic} variant="clip">
            <Image src={c.pFull.src} alt={c.pFull.alt} width={c.pFull.w} height={c.pFull.h} sizes="(max-width:960px) 92vw, 44vw" loading={i === 0 ? "eager" : "lazy"} style={{ objectPosition: c.pFull.pos }} />
          </Reveal>
          <div className={s.storyTxt}>
            <Reveal><p className={s.chLabel}>Capítulo {c.n}</p></Reveal>
            <Reveal delay={80}><h2>{c.t}</h2></Reveal>
            {c.largo.map((parr, k) => <Reveal key={k} delay={160 + k * 60}><p>{parr}</p></Reveal>)}
          </div>
        </section>
      ))}
    </>
  );
}

/** Su historia en video: episodio de Detrás del Poder (página Historia). */
export function Video() {
  return (
    <section id="video" className={`${s.sec} ${s.videoSec}`} aria-labelledby="video-title">
      <SecHead eyebrow="En video" title="La puerta que abrió, 200 años después." id="video-title"
        lead="Fue guardiana de una cárcel, ayudante de construcción y trabajadora de aseo antes de presidir el Concejo. Ella misma lo cuenta en Detrás del Poder." />
      <div className={s.videoWrap}>
        <VideoYoutube id={video.id} titulo={video.title} href={video.href} portada="/assets/video/detras-del-poder.webp"
          cls={{ frame: s.videoFrame, play: s.videoPlay, link: s.videoLink }} />
      </div>
    </section>
  );
}

/** Comisiones del Concejo donde trabaja (página Logros). */
export function Comisiones() {
  return (
    <section className={s.sec} aria-labelledby="comisiones-title">
      <div className={s.secHead}>
        <Reveal><p className={s.eyebrow}>En el Concejo</p></Reveal>
        <Reveal delay={80}><h2 id="comisiones-title">Las comisiones donde trabaja.</h2></Reveal>
      </div>
      <ul className={s.comisiones}>
        {comisiones.map((c) => (
          <li key={c.name}><strong>{c.name}</strong><span>{c.scope}</span></li>
        ))}
      </ul>
    </section>
  );
}

/** Notas de prensa verificadas. */
export function Medios() {
  return (
    <section className={`${s.sec} ${s.press}`} aria-labelledby="medios-title">
      <SecHead eyebrow="En los medios" title="Lo que se ha contado de su trabajo." id="medios-title" />
      <ul className={s.pressList}>
        {medios.map((m, i) => (
          <Reveal as="li" key={m.href} delay={i * 100}>
            <a className={s.pressItem} href={m.href} target="_blank" rel="noopener noreferrer">
              <span className={s.pressOutlet}>{m.outlet}</span>
              <span className={s.pressDate}>{m.date}</span>
              <strong>{m.t}</strong>
              <span className={s.pressD}>{m.d}</span>
              <span className={s.pressGo} aria-hidden="true">Leer nota ↗</span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Reconocimientos({ more = false }: { more?: boolean }) {
  return (
    <section id="reconocimientos" className={`${s.sec} ${s.awards}`} aria-labelledby="logros-title">
      <SecHead eyebrow="Reconocimientos" title="Hechos, no solo palabras." id="logros-title" href={more ? "/logros" : undefined} />
      <Reveal variant="clip" className={s.slidesWrap}>
        <AwardSlides
          title="El mérito es de Floridablanca."
          
          slides={slidesReconocimientos}
        />
      </Reveal>
      <ol className={s.awardList}>
        {reconocimientos.map((r, i) => (
          <Reveal as="li" key={r.t} className={s.award} delay={i * 120}>
            <span className={s.awardYear}>{r.year.split(" · ").map((y) => <b key={y}>{y}</b>)}</span>
            <div className={s.awardBody}>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
              {r.src && <Link className={s.awardSrc} href={r.src.href}>{r.src.label} <span aria-hidden="true">→</span></Link>}
            </div>
          </Reveal>
        ))}
      </ol>
      {more && <More href="/logros">Ver todos sus logros</More>}
    </section>
  );
}

/** Acuerdos municipales de su autoría. */
export function Acuerdos() {
  if (acuerdosListos.length === 0) return null;
  return (
    <section id="acuerdos" className={`${s.sec} ${s.laws}`} aria-labelledby="acuerdos-title">
      <SecHead eyebrow="Acuerdos municipales" title="Ideas que se volvieron norma." id="acuerdos-title"
        lead="Un acuerdo municipal es una ley para Floridablanca. Estos llevan su firma." />
      <ol className={s.lawGrid}>
        {acuerdosListos.map((a, i) => (
          <Reveal as="li" key={a.t} className={s.law} delay={i * 110}>
            <span className={s.lawYear}>{a.year}</span>
            <p className={s.lawN}>{a.n} · {a.rol}</p>
            <h3>{a.t}</h3>
            <p>{a.d}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/** Cifras de su trabajo (inicio). */
export function Cifras() {
  return (
    <section className={`${s.sec} ${s.numbers}`} aria-labelledby="cifras-title">
      <div className={s.secHead}>
        <Reveal><p className={s.eyebrow}>En cifras</p></Reveal>
        <Reveal delay={80}><h2 id="cifras-title">Su trabajo, contado en números.</h2></Reveal>
      </div>
      <div className={s.numGrid}>
        {cifras.map((c, i) => (
          <Reveal key={c.l} className={s.n} delay={i * 100}>
            {c.n > 999 ? <span className={s.big}>{c.n.toLocaleString("es-CO", { useGrouping: "always" })}</span> : <span className={s.big}><Counter to={c.n} /></span>}
            <strong>{c.l}</strong>
            <span className={s.nNote}>{c.note}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Línea de tiempo 2016–2026 (página Historia). */
export function LineaDeTiempo() {
  return (
    <section className={`${s.sec} ${s.timeline}`} aria-labelledby="tiempo-title">
      <SecHead eyebrow="Trayectoria" title="Diez años abriendo camino." id="tiempo-title" />
      <ol className={s.tGrid}>
        {timeline.map((h, i) => (
          <Reveal as="li" key={h.t} className={s.tItem} delay={i * 60}>
            <span className={s.tYear}>{h.y}</span>
            <h3>{h.t}</h3>
            <p>{h.d}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/** Tarjeta de una entrada de la Bitácora, con la portada de su publicación. */
export function EntryCard({ p }: { p: Post }) {
  return (
    <Link className={s.entry} href={`/bitacora/${p.slug}`}>
      {p.foto && (
        <span className={s.entryPic}>
          <Image src={p.foto.src} alt="" width={p.foto.w} height={p.foto.h} sizes="(max-width:960px) 92vw, 30vw" loading="lazy" style={{ objectPosition: p.foto.pos }} />
        </span>
      )}
      <span className={s.eM}>{p.tag} · {formatDate(p.date)}</span>
      <h3>{p.title}</h3>
      <p>{p.excerpt}</p>
    </Link>
  );
}

/** Franja de color con una frase suya en grande: rompe la secuencia de tarjetas. */
export function Franja({ quote, by = "Claudia Hernández", tone = "purple" }: { quote: string; by?: string; tone?: "purple" | "must" }) {
  return (
    <section className={`${s.sec} ${s.franja} ${tone === "must" ? s.franjaMust : ""}`} aria-label="Frase de Claudia Hernández">
      <Reveal as="figure" className={s.franjaFig}>
        <blockquote>“{quote}”</blockquote>
        <figcaption>{by}</figcaption>
      </Reveal>
    </section>
  );
}

/** Adelanto de La Bitácora de Claudia (inicio). */
export function BitacoraTeaser() {
  if (published.length === 0) return null;
  return (
    <section className={`${s.sec} ${s.bitHome}`} aria-labelledby="bitacora-title">
      <SecHead eyebrow={bitacora.name} title={bitacora.lema} id="bitacora-title" lead={bitacora.intro} />
      <ul className={s.bitList}>
        {published.slice(0, 3).map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 100}>
            <EntryCard p={p} />
          </Reveal>
        ))}
      </ul>
      <More href="/bitacora">Leer la Bitácora</More>
    </section>
  );
}

/** Hecho en Floridablanca (página Proyectos): adelanto de las 3 crónicas más recientes; todas están en la Bitácora. */
export function HechoEnFloridablanca() {
  const ultimas = published.filter((p) => p.tag === HECHO).slice(0, 3);
  if (!ultimas.length) return null;
  return (
    <section className={`${s.sec} ${s.makers}`} aria-labelledby="hecho-title">
      <SecHead eyebrow={HECHO} title="Emprendedores con nombre propio." id="hecho-title"
        lead="Desde 2024 presenta en sus redes a quienes sacan adelante a Floridablanca con sus manos. Cada crónica tiene su página en la Bitácora." />
      <ul className={s.hechoGrid}>
        {ultimas.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 90}>
            <EntryCard p={p} />
          </Reveal>
        ))}
      </ul>
      <More href={`/bitacora?tema=${slugTema(HECHO)}`}>Ver todos los emprendedores en la Bitácora</More>
    </section>
  );
}

export function Proyectos({ more = false }: { more?: boolean }) {
  return (
    <section id="proyectos" className={`${s.sec} ${s.projects2}`} aria-labelledby="proyectos-title">
      <SecHead eyebrow="Proyectos" title="Frentes de trabajo." id="proyectos-title" />
      <div className={s.pGrid}>
        {frentes.map((f, i) => (
          <Reveal as="article" key={f.t} className={s.pcard} delay={i * 80}>
            <span className={s.pIdx} aria-hidden="true">0{i + 1}</span>
            <h3>{f.t}</h3>
            <p>{f.d}</p>
          </Reveal>
        ))}
      </div>
      {more && <More href="/proyectos">Ver proyectos y fotos</More>}
    </section>
  );
}

export function Muro() {
  return (
    <section className={`${s.sec} ${s.wall}`} aria-labelledby="comunidad-title">
      <Reveal><h2 id="comunidad-title">Mi Floridablanca, de cerca.</h2></Reveal>
      <div className={s.wallGrid}>
        {wall.map((p, i) => (
          <figure key={p.src} className={s.shot}>
            <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes={i === 0 ? "(max-width:960px) 92vw, 50vw" : "(max-width:960px) 92vw, 25vw"} loading="lazy" style={{ objectPosition: p.pos }} />
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Hablemos({ frase = true }: { frase?: boolean }) {
  return (
    <section id="hablemos" className={`${s.sec} ${s.contact}`}>
      <div className={s.cText}>
        <Reveal><p className={s.eyebrow}>Hablemos</p></Reveal>
        <Reveal delay={80}><h2>Tu voz también cuenta en esta historia.</h2></Reveal>
        <Reveal delay={160}><p>Escríbele sobre tu barrio, tu emprendimiento o una idea para{" "}Floridablanca.</p></Reveal>
        {frase && (
          <Reveal delay={240} as="figure" className={s.quote}>
            <blockquote>“La fuerza de Floridablanca está en su gente y en nuestra unión.”</blockquote>
            <figcaption>Claudia Hernández</figcaption>
          </Reveal>
        )}
      </div>
      {SHOW_CONTACT_FORM ? (
        <Reveal className={s.formWrap}><ContactForm cls={s} /></Reveal>
      ) : (
        <Reveal className={s.socBtns}>
          {redes.map((r) => {
            const Icon = socialIcon[r.name];
            return (
              <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer">
                <Icon />
                <span>Escríbele por</span>
                <strong>{r.name}</strong>
                <i aria-hidden="true">↗</i>
              </a>
            );
          })}
        </Reveal>
      )}
    </section>
  );
}

/** Envoltura de "inicio por pantallas": cada hijo directo ocupa una pantalla en computador. */
export function Pantallas({ children, saltar = true }: { children: React.ReactNode; saltar?: boolean }) {
  // snapOn: en las páginas del menú el scroll salta de una sección completa a la siguiente.
  // saltar=false: mismo diseño por pantallas, pero con scroll libre (páginas largas de leer).
  return <div className={saltar ? `${s.snap} ${s.snapOn}` : s.snap}>{children}</div>;
}

type Foto = { src: string; w: number; h: number; alt: string; pos?: string };

/** Portada de cada página. Con `foto`, el texto va en el panel mostaza y la foto a la derecha (arriba en celular). */
export function PageHero({ eyebrow, title, lead, foto, fotoPos }: { eyebrow: string; title: React.ReactNode; lead: string; foto?: Foto; fotoPos?: string }) {
  return (
    <section className={`${s.pageHero} ${foto ? s.pageHeroFoto : ""}`}>
      {foto && (
        <div className={s.phImg}>
          <Image src={foto.src} alt={foto.alt} width={foto.w} height={foto.h} priority sizes="(max-width:960px) 100vw, 50vw" style={{ objectPosition: fotoPos ?? foto.pos ?? "50% 30%" }} />
        </div>
      )}
      <div className={s.phCopy}>
        <p className={s.eyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  );
}
