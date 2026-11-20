import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { redirect } from "next/navigation";
import { usuarioActual } from "@/lib/supabase/server";
import { origen } from "@/lib/red/origen";
import { calcularNivel, NIVELES, PUNTOS } from "@/content/red";
import { salir } from "../login/actions";
import Compartir from "./Compartir";
import Mision from "./Mision";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Mi red" };

type Invitado = { nombre: string | null; desde: string; invitados?: Invitado[] };

export default function MiRed() {
  return (
    <Suspense fallback={<section className={s.tarjeta}><p className={s.sub}>Cargando tu red…</p></section>}>
      <Panel />
    </Suspense>
  );
}

const fecha = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

async function Panel() {
  const yo = await usuarioActual();
  if (!yo) redirect("/login");

  // Todo sale de funciones que solo devuelven lo de esta persona (nombres y conteos).
  const [{ data: resumen }, { data: lista }, { data: datos }, { data: esAdmin }] = await Promise.all([
    yo.sb.rpc("mi_resumen"),
    yo.sb.rpc("mi_red"),
    yo.sb.from("personas").select("nombre").maybeSingle(),
    yo.sb.rpc("es_admin"),
  ]);
  if (!resumen) redirect("/login");

  const r = resumen as { codigo: string; directos: number; segundo: number; rama: number; invito: string | null; invitada: boolean };
  const red = (lista ?? []) as Invitado[];
  const nivel = calcularNivel(r.directos, r.segundo);
  const enlace = `${await origen()}/registro?ref=${r.codigo}`;
  const nombre = (datos?.nombre ?? "").split(" ")[0];
  // Código QR de su enlace: en persona, la otra persona lo escanea con la cámara y queda invitada.
  const qr = await QRCode.toDataURL(enlace, { width: 480, margin: 2, errorCorrectionLevel: "M", color: { dark: "#2A1240", light: "#FFFFFF" } });

  return (
    <div className={s.panel}>
      <section className={s.tarjeta}>
        <p className={s.etiqueta}>Mi red</p>
        <h1>Hola{nombre ? `, ${nombre}` : ""}</h1>
        {r.invitada && (
          <p className={s.invito}>{r.invito ? <>Te invitó <strong>{r.invito}</strong> 🤝</> : "Llegaste invitada o invitado por alguien que ya no está en la red."}</p>
        )}
        <p className={s.sub}>Comparte tu enlace: cada persona que se registre con él suma a tu red.</p>
        <Compartir enlace={enlace} codigo={r.codigo} />
      </section>

      <section className={s.tarjeta} aria-labelledby="qr-red">
        <h2 id="qr-red" className={s.h2}>Invita en persona con tu código QR</h2>
        <div className={s.qr}>
          {/* eslint-disable-next-line @next/next/no-img-element -- imagen generada aquí mismo, sin archivo */}
          <img src={qr} width={240} height={240} alt={`Código QR para registrarse con el código ${r.codigo}`} />
          <div className={s.qrTexto}>
            <p>Muéstralo en tu celular: la otra persona lo escanea con la cámara y se registra en tu red, sin escribir nada.</p>
            <a className={s.botonSec} href={qr} download={`mi-codigo-qr-${r.codigo}.png`}>Descargar mi código QR</a>
            <p className={s.ayuda}>También puedes imprimirlo o ponerlo en tu negocio.</p>
          </div>
        </div>
      </section>

      {r.directos < 3 && <Mision directos={r.directos} enlace={enlace} />}

      <section className={s.tarjeta} aria-labelledby="cifras-red">
        <h2 id="cifras-red" className={s.h2}>Tu red en números</h2>
        <dl className={s.cifras}>
          <div><dt>Invitaste</dt><dd>{r.directos}</dd><span>{r.directos === 1 ? "persona directa" : "personas directas"}</span></div>
          <div><dt>Ellos invitaron</dt><dd>{r.segundo}</dd><span>{r.segundo === 1 ? "persona" : "personas"}</span></div>
          <div><dt>Toda tu rama</dt><dd>{r.rama}</dd><span>en todos los niveles</span></div>
        </dl>

        <div className={s.nivel}>
          <div className={s.nivelCab}>
            <span>Nivel <strong>{nivel.nivel}</strong></span>
            <span><strong>{nivel.puntos}</strong> puntos</span>
          </div>
          <div className={s.barra} role="progressbar" aria-label="Avance al siguiente nivel" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(nivel.avance * 100)}>
            <span style={{ width: `${Math.max(4, nivel.avance * 100)}%` }} />
          </div>
          <p className={s.ayuda}>
            {nivel.siguiente ? `Te faltan ${nivel.faltan} puntos para ser ${nivel.siguiente}.` : "¡Llegaste al nivel más alto!"}{" "}
            Ganas {PUNTOS.directo} puntos por cada persona que invitas y {PUNTOS.segundoNivel} por cada persona que ellos invitan.
          </p>
          <details className={s.niveles}>
            <summary>Ver todos los niveles</summary>
            <ul>{NIVELES.map((n) => <li key={n.nombre}><strong>{n.nombre}</strong> desde {n.desde} puntos</li>)}</ul>
          </details>
        </div>
      </section>

      <section className={s.tarjeta} aria-labelledby="lista-red">
        <h2 id="lista-red" className={s.h2}>Tus invitados</h2>
        {red.length === 0 ? (
          <p className={s.sub}>Todavía no has invitado a nadie. Comparte tu enlace por WhatsApp para empezar.</p>
        ) : (
          <ul className={s.lista}>
            {red.map((p, i) => (
              <li key={i}>
                <div className={s.persona}>
                  <span className={s.inicial} aria-hidden="true">{p.nombre ? p.nombre[0] : "·"}</span>
                  <span>
                    <strong className={p.nombre ? undefined : s.vacio}>{p.nombre ?? "Cuenta eliminada"}</strong>
                    <small>Desde el {fecha(p.desde)}{p.invitados?.length ? ` · invitó a ${plural(p.invitados.length, "persona", "personas")}` : ""}</small>
                  </span>
                </div>
                {!!p.invitados?.length && (
                  <ul className={s.subLista} aria-label={`Invitados de ${p.nombre ?? "una cuenta eliminada"}`}>
                    {p.invitados.map((q, j) => (
                      <li key={j}><strong className={q.nombre ? undefined : s.vacio}>{q.nombre ?? "Cuenta eliminada"}</strong> <small>· {fecha(q.desde)}</small></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
        <p className={s.ayuda}>Por privacidad, solo ves los nombres de tu red, nunca sus datos de contacto.</p>
      </section>

      <nav className={s.acciones} aria-label="Mi cuenta">
        {esAdmin === true && <Link className={s.boton} href="/admin">Panel de administración</Link>}
        <Link className={s.botonSec} href="/mi-red/perfil">Mi perfil</Link>
        <form action={salir}><button className={s.botonSec}>Cerrar sesión</button></form>
      </nav>
    </div>
  );
}
