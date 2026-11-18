"use client";

import { useActionState } from "react";
import { buscar, type EstadoBusqueda } from "./actions";
import s from "../red.module.css";

const fecha = (iso: string) => new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });

export default function Buscador() {
  const [estado, accion, buscando] = useActionState(buscar, { q: "" } as EstadoBusqueda);
  return (
    <div className={s.form}>
      <form action={accion} className={s.buscador} role="search">
        <label htmlFor="q" className="sr-only" style={{ position: "absolute", left: -9999 }}>Buscar personas</label>
        <input id="q" name="q" defaultValue={estado.q} placeholder="Nombre, documento, celular, correo o código" autoComplete="off" />
        <button className={s.botonSec} disabled={buscando}>{buscando ? "Buscando…" : "Buscar"}</button>
      </form>
      {estado.error && <p className={s.err} role="alert">{estado.error}</p>}
      {estado.filas && (
        estado.filas.length === 0 ? <p className={s.ayuda} role="status">No encontramos a nadie con «{estado.q}».</p> : (
          <div className={s.tablaWrap}>
            <table className={s.tabla}>
              <caption className={s.ayuda} style={{ textAlign: "left", paddingBottom: 6 }}>{estado.filas.length} resultado{estado.filas.length === 1 ? "" : "s"}{estado.filas.length === 50 ? " (se muestran los 50 más recientes)" : ""}</caption>
              <thead><tr><th>Nombre</th><th>Documento</th><th>Celular</th><th>Correo</th><th>Municipio · barrio</th><th>Invitado por</th><th className={s.num}>Invitó</th><th>Desde</th></tr></thead>
              <tbody>
                {estado.filas.map((f) => (
                  <tr key={f.codigo}>
                    <td><strong>{f.nombre}</strong><br /><small className={s.ayuda}>{f.codigo}</small></td>
                    <td>{f.documento}</td><td>{f.telefono}</td><td>{f.correo}</td>
                    <td>{f.municipio}{f.barrio ? ` · ${f.barrio}` : ""}</td>
                    <td>{f.invitado_por ?? "—"}</td>
                    <td className={s.num}>{f.directos}</td>
                    <td>{fecha(f.registrado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
