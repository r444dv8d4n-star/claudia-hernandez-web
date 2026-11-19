import Link from "next/link";
import LinkMedido from "@/components/LinkMedido";
import { RED, redAbierta } from "@/content/red";
import s from "@/app/(inicio)/o2.module.css";
import u from "./UneteRed.module.css";

const pasos = [
  { t: "Crea tu cuenta", d: "Te toma un par de minutos desde el celular." },
  { t: "Comparte tu enlace", d: "Recibes tu propio enlace y lo mandas por WhatsApp." },
  { t: "Mira crecer tu red", d: "Cada persona que se une con tu enlace queda en tu red." },
];

/** Invitación a la red de referidos (inicio). Solo aparece cuando la red está abierta (RED_ABIERTA=si). */
export default function UneteRed() {
  if (!redAbierta) return null;
  return (
    <section id="unete" className={`${s.sec} ${u.unete}`} aria-labelledby="unete-title">
      <div className={u.texto}>
        <p className={u.eyebrow}>{RED.nombre}</p>
        <h2 id="unete-title">Súmate a la red. <em>Invita a los tuyos.</em></h2>
        <p className={u.lead}>De aquí, como tú: vecinas, vecinos y amigos que se organizan para que Floridablanca siga creciendo.</p>
        <div className={u.ctas}>
          <LinkMedido evento="clic_sumate_seccion" className={u.btn} href="/registro">Crear mi cuenta</LinkMedido>
          <Link className={u.btnGhost} href="/login">Ya tengo cuenta</Link>
        </div>
        <p className={u.nota}>Unirse es voluntario. Tus datos se cuidan según la <Link href="/terminos">política de tratamiento de datos</Link>.</p>
      </div>
      <ol className={u.pasos}>
        {pasos.map((p, i) => (
          <li key={p.t}>
            <span className={u.num} aria-hidden="true">{i + 1}</span>
            <div><h3>{p.t}</h3><p>{p.d}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
