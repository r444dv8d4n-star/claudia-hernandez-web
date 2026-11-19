import type { Metadata } from "next";
import { Suspense } from "react";
import { exigirAdmin } from "@/lib/red/admin";
import AdminNav from "./Nav";
import Buscador from "./Buscador";
import { Crecimiento, Mapa } from "./Graficas";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Administración" };

type Resumen = {
  total: number; eliminados: number; hoy: number; semana: number; invitados: number;
  por_dia: { dia: string; n: number }[];
  municipios: { municipio: string; n: number }[];
  barrios: { municipio: string; barrio: string; n: number }[];
  ranking: { nombre: string; municipio: string; directos: number }[];
};

export default function Admin() {
  return (
    <div className={s.ancho}>
      <Suspense fallback={<section className={s.tarjeta}><p className={s.sub}>Cargando el panel…</p></section>}>
        <Panel />
      </Suspense>
    </div>
  );
}

async function Panel() {
  const yo = await exigirAdmin();
  const [{ data }, { data: emb }] = await Promise.all([yo.sb.rpc("admin_resumen"), yo.sb.rpc("admin_embudo")]);
  const r = data as Resumen;
  const ev = (emb ?? {}) as Record<string, number>;
  const n = (...k: string[]) => k.reduce((a, x) => a + (ev[x] ?? 0), 0);
  const embudo = [
    { t: "Tocaron «Súmate»", v: n("clic_sumate_encabezado", "clic_sumate_portada", "clic_sumate_seccion", "clic_sumate_pie") },
    { t: "Abrieron el registro", v: n("registro_visto") },
    { t: "Pasaron al paso 2", v: n("registro_paso2") },
    { t: "Terminaron el registro", v: n("registro_completo") },
    { t: "Compartieron por WhatsApp", v: n("compartir_whatsapp", "mision_whatsapp") },
    { t: "Copiaron su enlace", v: n("copiar_enlace") },
    { t: "Vieron el video de su historia", v: n("video_play") },
  ];
  const tope = Math.max(1, ...embudo.map((x) => x.v));
  const conInvitacion = r.total ? Math.round((r.invitados / r.total) * 100) : 0;

  return (
    <>
      <section className={s.tarjeta}>
        <p className={s.etiqueta}>Administración</p>
        <h1>La red completa</h1>
        <p className={s.sub}>Solo los administradores ven esta página.</p>
        <AdminNav actual="/admin" />
      </section>

      <section className={s.tarjeta} aria-labelledby="t-kpis">
        <h2 id="t-kpis" className={s.h2}>En números</h2>
        <dl className={s.kpis}>
          <div><dt>Personas en la red</dt><dd>{r.total}</dd><span>cuentas activas</span></div>
          <div><dt>Hoy</dt><dd>{r.hoy}</dd><span>registros nuevos</span></div>
          <div><dt>Últimos 7 días</dt><dd>{r.semana}</dd><span>registros nuevos</span></div>
          <div><dt>Llegaron invitados</dt><dd>{conInvitacion}%</dd><span>{r.eliminados} cuenta{r.eliminados === 1 ? "" : "s"} eliminada{r.eliminados === 1 ? "" : "s"}</span></div>
        </dl>
      </section>

      <section className={s.tarjeta} aria-labelledby="t-embudo">
        <h2 id="t-embudo" className={s.h2}>Cómo llega la gente · últimos 30 días</h2>
        <ul className={s.embudo}>
          {embudo.map((x) => (
            <li key={x.t}>
              <span>{x.t}</span>
              <span className={s.embudoBarra} aria-hidden="true"><i style={{ width: `${Math.max(x.v ? 3 : 0, (x.v / tope) * 100)}%` }} /></span>
              <strong>{x.v}</strong>
            </li>
          ))}
        </ul>
        <p className={s.ayuda}>Conteo anónimo: sin cookies, sin IP y sin saber quién es cada persona.</p>
      </section>

      <section className={s.tarjeta} aria-labelledby="t-crec">
        <h2 id="t-crec" className={s.h2}>Personas nuevas por día · últimos 30 días</h2>
        <Crecimiento datos={r.por_dia} />
        <details className={s.niveles}>
          <summary>Ver como tabla</summary>
          <table className={s.tabla}><thead><tr><th>Día</th><th className={s.num}>Nuevas</th></tr></thead>
            <tbody>{r.por_dia.filter((d) => d.n > 0).map((d) => <tr key={d.dia}><td>{d.dia}</td><td className={s.num}>{d.n}</td></tr>)}</tbody>
          </table>
        </details>
      </section>

      <div className={s.dos}>
        <section className={s.tarjeta} aria-labelledby="t-mapa">
          <h2 id="t-mapa" className={s.h2}>Por municipio · mapa aproximado</h2>
          <Mapa datos={r.municipios} />
          <p className={s.ayuda}>Cada círculo está en el centro del municipio; su tamaño es el número de personas.</p>
        </section>
        <section className={s.tarjeta} aria-labelledby="t-barrios">
          <h2 id="t-barrios" className={s.h2}>Por barrio</h2>
          <div className={s.tablaWrap}>
            <table className={s.tabla}>
              <thead><tr><th>Barrio</th><th>Municipio</th><th className={s.num}>Personas</th></tr></thead>
              <tbody>{r.barrios.map((b) => <tr key={`${b.municipio}-${b.barrio}`}><td>{b.barrio}</td><td>{b.municipio}</td><td className={s.num}>{b.n}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
      </div>

      <section className={s.tarjeta} aria-labelledby="t-rank">
          <h2 id="t-rank" className={s.h2}>Quienes más invitan</h2>
          {r.ranking.length === 0 ? <p className={s.sub}>Todavía nadie ha invitado.</p> : (
            <table className={s.tabla}>
              <thead><tr><th className={s.num}>#</th><th>Nombre</th><th>Municipio</th><th className={s.num}>Invitados</th></tr></thead>
              <tbody>{r.ranking.map((p, i) => <tr key={i}><td className={s.num}>{i + 1}</td><td>{p.nombre}</td><td>{p.municipio}</td><td className={s.num}><strong>{p.directos}</strong></td></tr>)}</tbody>
            </table>
          )}
      </section>
      <section className={s.tarjeta} aria-labelledby="t-buscar">
        <h2 id="t-buscar" className={s.h2}>Buscar personas</h2>
        <Buscador />
      </section>
    </>
  );
}
