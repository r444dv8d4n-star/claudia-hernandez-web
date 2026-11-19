"use client";

import { medir } from "@/lib/red/medir";
import s from "../red.module.css";

/** Mensajes listos para compartir, según a quién se invita. */
const MENSAJES = [
  { a: "A mi familia", t: "Familia, me uní a Amigos de Claudia, la red de Claudia Hernández por Floridablanca. Súmense con mi enlace:" },
  { a: "A mis amigos", t: "¡Hola! Estoy en Amigos de Claudia, vecinos que nos organizamos por Floridablanca. Te invito, es fácil:" },
  { a: "A mis vecinos", t: "Vecinos, los invito a sumarse a Amigos de Claudia para trabajar juntos por nuestro barrio y por Floridablanca:" },
];

/** «Tu primera misión»: invitar a 3 personas, con mensajes de WhatsApp listos. */
export default function Mision({ directos, enlace }: { directos: number; enlace: string }) {
  const meta = 3;
  const hechos = Math.min(directos, meta);
  return (
    <section className={`${s.tarjeta} ${s.mision}`} aria-labelledby="mision-titulo">
      <p className={s.etiqueta}>Tu primera misión</p>
      <h2 id="mision-titulo" className={s.h2}>Invita a {meta} personas</h2>
      <div className={s.misionPuntos} role="img" aria-label={`Llevas ${hechos} de ${meta}`}>
        {Array.from({ length: meta }, (_, i) => <span key={i} className={i < hechos ? s.misionHecho : undefined}>{i < hechos ? "✓" : i + 1}</span>)}
      </div>
      <p className={s.ayuda}>Llevas {hechos} de {meta}. Elige a quién le escribes y el mensaje ya va listo con tu enlace:</p>
      <div className={s.misionBotones}>
        {MENSAJES.map((m) => (
          <a key={m.a} className={s.botonSec} href={`https://wa.me/?text=${encodeURIComponent(`${m.t} ${enlace}`)}`} target="_blank" rel="noopener noreferrer" onClick={() => medir("mision_whatsapp")}>
            {m.a}
          </a>
        ))}
      </div>
    </section>
  );
}
