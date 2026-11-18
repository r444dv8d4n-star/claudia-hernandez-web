import type { Metadata } from "next";
import { Suspense } from "react";
import { exigirAdmin } from "@/lib/red/admin";
import AdminNav from "../Nav";
import Equipo from "./Equipo";
import s from "../../red.module.css";

export const metadata: Metadata = { title: "Administradores" };

type Admin = { correo: string; nombre: string | null; desde: string; soy_yo: boolean };
type Mov = { accion: string; detalle: string | null; creado_en: string; admin: string | null };

const ACCION: Record<string, string> = { descargar_csv: "Descargó el listado", agregar_admin: "Agregó administrador", quitar_admin: "Quitó administrador" };

export default function EquipoPage() {
  return (
    <div className={s.ancho}>
      <Suspense fallback={<section className={s.tarjeta}><p className={s.sub}>Cargando…</p></section>}>
        <Contenido />
      </Suspense>
    </div>
  );
}

async function Contenido() {
  const yo = await exigirAdmin();
  const [{ data: admins }, { data: movs }] = await Promise.all([yo.sb.rpc("admin_lista_admins"), yo.sb.rpc("admin_auditoria")]);

  return (
    <>
      <section className={s.tarjeta}>
        <p className={s.etiqueta}>Administración</p>
        <h1>Administradores</h1>
        <p className={s.sub}>Solo se entra por invitación: la persona crea su cuenta en la red y un administrador la agrega aquí con su correo.</p>
        <AdminNav actual="/admin/equipo" />
      </section>

      <div className={s.dos}>
        <section className={s.tarjeta} aria-labelledby="t-admins">
          <h2 id="t-admins" className={s.h2}>Quiénes son</h2>
          <table className={s.tabla}>
            <thead><tr><th>Nombre</th><th>Correo</th><th>Desde</th></tr></thead>
            <tbody>{((admins ?? []) as Admin[]).map((a) => (
              <tr key={a.correo}><td>{a.nombre ?? "—"}{a.soy_yo && <small className={s.ayuda}> (tú)</small>}</td><td>{a.correo}</td><td>{a.desde}</td></tr>
            ))}</tbody>
          </table>
        </section>
        <section className={s.tarjeta} aria-labelledby="t-cambiar">
          <h2 id="t-cambiar" className={s.h2}>Agregar o quitar</h2>
          <Equipo />
        </section>
      </div>

      <section className={s.tarjeta} aria-labelledby="t-aud">
        <h2 id="t-aud" className={s.h2}>Registro de movimientos</h2>
        <p className={s.ayuda} style={{ marginBottom: 10 }}>Queda constancia de cada descarga del listado y de cada cambio de administradores.</p>
        {((movs ?? []) as Mov[]).length === 0 ? <p className={s.sub}>Sin movimientos todavía.</p> : (
          <div className={s.tablaWrap}>
            <table className={s.tabla}>
              <thead><tr><th>Cuándo</th><th>Quién</th><th>Qué</th><th>Detalle</th></tr></thead>
              <tbody>{((movs ?? []) as Mov[]).map((m, i) => (
                <tr key={i}>
                  <td>{new Date(m.creado_en).toLocaleString("es-CO", { timeZone: "America/Bogota", dateStyle: "medium", timeStyle: "short" })}</td>
                  <td>{m.admin ?? "—"}</td><td>{ACCION[m.accion] ?? m.accion}</td><td>{m.detalle ?? ""}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
