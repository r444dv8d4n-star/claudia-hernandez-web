"use client";

import { useActionState, useState } from "react";
import { buscar, verDatos, type Completo, type EstadoBusqueda, type Fila } from "./actions";
import s from "../red.module.css";

const fecha = (iso: string) => new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
const TIPO: Record<string, string> = { CC: "CC", CE: "CE", PPT: "PPT", PA: "Pasaporte" };

/** Celular, documento y correo se ven ocultos. «Ver datos» los muestra completos y queda anotado en la auditoría. */
function FilaPersona({ f }: { f: Fila }) {
  const [completo, setCompleto] = useState<Completo | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const ver = async () => {
    setCargando(true); setError(false);
    const d = await verDatos(f.codigo);
    setCargando(false);
    if (d) setCompleto(d); else setError(true);
  };
  const c = completo;
  return (
    <tr>
      <td><strong>{f.nombre}</strong><br /><small className={s.ayuda}>{f.codigo}</small></td>
      <td>{TIPO[f.tipo_documento] ?? f.tipo_documento} {c ? c.documento : f.documento}</td>
      <td>{c ? c.telefono : f.telefono}</td>
      <td>{c ? c.correo : f.correo}{c && <><br /><small className={s.ayuda}>{c.direccion}</small></>}</td>
      <td>{f.municipio}{f.barrio ? ` · ${f.barrio}` : ""}</td>
      <td>{f.invitado_por ?? "—"}</td>
      <td className={s.num}>{f.directos}</td>
      <td>{f.acepta_mensajes ? "Sí" : "No"}</td>
      <td>{fecha(f.registrado)}</td>
      <td>
        {c ? <button type="button" className={s.enlaceBoton} onClick={() => setCompleto(null)}>Ocultar</button>
          : <button type="button" className={s.enlaceBoton} onClick={ver} disabled={cargando}>{cargando ? "…" : "Ver datos"}</button>}
        {error && <small className={s.err}> No se pudo.</small>}
      </td>
    </tr>
  );
}

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
              <thead><tr><th>Nombre</th><th>Documento</th><th>Celular</th><th>Correo</th><th>Municipio · barrio</th><th>Invitado por</th><th className={s.num}>Invitó</th><th>WhatsApp</th><th>Desde</th><th><span className="sr-only" style={{ position: "absolute", left: -9999 }}>Acciones</span></th></tr></thead>
              <tbody>{estado.filas.map((f) => <FilaPersona key={f.codigo} f={f} />)}</tbody>
            </table>
          </div>
        )
      )}
      <p className={s.ayuda}>Por privacidad, los datos de contacto se ven ocultos. «Ver datos» los muestra completos y queda anotado quién los vio.</p>
    </div>
  );
}
