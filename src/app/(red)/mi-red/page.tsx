import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { usuarioActual } from "@/lib/supabase/server";
import { salir } from "../login/actions";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Mi red" };

export default function MiRed() {
  return (
    <section className={s.tarjeta}>
      {/* Leer la sesión ocurre en cada visita, por eso va dentro de Suspense. */}
      <Suspense fallback={<p className={s.sub}>Cargando tu red…</p>}>
        <Panel />
      </Suspense>
    </section>
  );
}

async function Panel() {
  const yo = await usuarioActual();
  if (!yo) redirect("/login");

  // Con la seguridad por filas, esta consulta solo puede devolver SU nodo y SUS datos.
  const { data: nodo } = await yo.sb.from("nodos").select("codigo, personas(nombre)").eq("user_id", yo.id).maybeSingle();
  const persona = Array.isArray(nodo?.personas) ? nodo?.personas[0] : nodo?.personas;
  const nombre = persona?.nombre?.split(" ")[0] ?? "";

  return (
    <>
      <h1>Hola{nombre ? `, ${nombre}` : ""}</h1>
      <p className={s.sub}>Tu panel completo (enlace para invitar, tu red, puntos y perfil) llega en el siguiente paso.</p>
      {nodo?.codigo && <p className={s.codigoGrande} style={{ textAlign: "center" }}>{nodo.codigo}</p>}
      <form action={salir} style={{ marginTop: 18 }}>
        <button className={s.botonSec}>Cerrar sesión</button>
      </form>
    </>
  );
}
