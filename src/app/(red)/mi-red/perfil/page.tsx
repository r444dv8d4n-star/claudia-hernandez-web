import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { usuarioActual } from "@/lib/supabase/server";
import { municipios } from "@/content/red";
import PerfilForm from "./PerfilForm";
import EliminarCuenta from "./EliminarCuenta";
import s from "../../red.module.css";

export const metadata: Metadata = { title: "Mi perfil" };

export default function Perfil() {
  return (
    <div className={s.panel}>
      <Suspense fallback={<section className={s.tarjeta}><p className={s.sub}>Cargando tus datos…</p></section>}>
        <Datos />
      </Suspense>
      <nav className={s.acciones}><Link className={s.botonSec} href="/mi-red">← Volver a mi red</Link></nav>
    </div>
  );
}

async function Datos() {
  const yo = await usuarioActual();
  if (!yo) redirect("/login");
  // La seguridad por filas solo deja leer los datos propios.
  const { data: p } = await yo.sb.from("personas")
    .select("nombre, tipo_documento, documento, acepta_mensajes, telefono, correo, direccion, municipio, barrio, fecha_nacimiento, autorizado_en, politica_version")
    .maybeSingle();
  if (!p) redirect("/login");

  const conocido = (municipios as readonly string[]).includes(p.municipio);
  const valores = {
    nombre: p.nombre, tipoDocumento: p.tipo_documento, documento: p.documento, aceptaMensajes: p.acepta_mensajes ? "on" : "", telefono: p.telefono, correo: p.correo, direccion: p.direccion,
    municipio: conocido ? p.municipio : "Otro", municipioOtro: conocido ? "" : p.municipio, barrio: p.barrio ?? "",
    fechaNacimiento: p.fecha_nacimiento,
  };
  const autorizo = new Date(p.autorizado_en).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <section className={s.tarjeta}>
        <p className={s.etiqueta}>Mi perfil</p>
        <h1>Tus datos</h1>
        <p className={s.sub}>Puedes corregirlos cuando quieras.</p>
        <PerfilForm valores={valores} />
        <p className={s.ayuda} style={{ marginTop: 14 }}>Autorizaste el tratamiento de tus datos el {autorizo} (política versión {p.politica_version}).</p>
      </section>
      <section className={s.tarjeta}>
        <h2 className={s.h2}>Eliminar mi cuenta</h2>
        <EliminarCuenta />
      </section>
    </>
  );
}
