/**
 * Pruebas de seguridad de la red de referidos.  Uso:  npm run probar:red
 * Crea 3 cuentas temporales de PRUEBA (datos inventados), revisa qué puede ver y hacer cada tipo de persona
 * y al final las borra. No toca a nadie más.
 */
import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL, PUB = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SEC = process.env.SUPABASE_SECRET_KEY;
if (!URL || !PUB || !SEC) { console.error("Faltan las llaves en .env.local"); process.exit(1); }
const nuevo = (k) => createClient(URL, k, { auth: { persistSession: false, autoRefreshToken: false } });
const adm = nuevo(SEC);
const marca = Date.now().toString().slice(-6);
const CLAVE = "Prueba" + marca + "x";
let fallas = 0;
const ok = (cond, texto) => { console.log(`${cond ? "✅" : "❌"} ${texto}`); if (!cond) fallas++; };
const negado = (r) => !!r.error || r.data === null || (Array.isArray(r.data) && r.data.length === 0);

const creados = [];
const codigos = []; // nodos de prueba, para borrarlos al final
async function crear(nombre, ref) {
  const correo = `test.${nombre}.${marca}@example.com`;
  const { data, error } = await adm.auth.admin.createUser({ email: correo, password: CLAVE, email_confirm: true });
  if (error) throw error;
  creados.push(data.user.id);
  const n = creados.length;
  const r = await adm.rpc("registrar_persona", {
    p_user_id: data.user.id, p_nombre: `Test ${nombre} Automatico`, p_documento: `9${marca}${n}`, p_telefono: `39${marca}0${n}`.slice(0, 10),
    p_correo: correo, p_direccion: "Calle de prueba", p_municipio: "Floridablanca", p_barrio: "", p_fecha_nacimiento: "1990-01-01",
    p_codigo_invitacion: ref ?? "", p_politica_version: "prueba",
  });
  if (r.error) throw r.error;
  codigos.push(r.data);
  const c = nuevo(PUB);
  await c.auth.signInWithPassword({ email: correo, password: CLAVE });
  return { id: data.user.id, correo, codigo: r.data, c };
}

try {
  const a = await crear("a");            // invita a B
  const b = await crear("b", a.codigo);  // invitado por A
  const z = await crear("z");            // otra persona, sin relación
  const anon = nuevo(PUB);

  console.log("\n— Visitante sin cuenta");
  for (const t of ["personas", "nodos", "administradores", "intentos", "auditoria"]) ok(negado(await anon.from(t).select("*").limit(1)), `no puede leer la tabla ${t}`);
  ok(negado(await anon.rpc("mi_red")), "no puede ver ninguna red");
  ok(negado(await anon.rpc("admin_resumen")), "no puede usar el panel de administración");
  ok(!!(await nuevo(PUB).auth.signUp({ email: `test.intruso.${marca}@example.com`, password: CLAVE })).error, "no puede crear cuentas por fuera del formulario");

  console.log("\n— Persona registrada (A)");
  const pa = await a.c.from("personas").select("nombre, documento");
  ok(pa.data?.length === 1 && pa.data[0].nombre.includes("Test a"), "solo ve sus propios datos");
  const red = (await a.c.rpc("mi_red")).data ?? [];
  ok(red.length === 1 && red[0].nombre === "Test b Automatico", "ve a su invitado B");
  ok(Object.keys(red[0] ?? {}).every((k) => ["nombre", "desde", "invitados"].includes(k)), "de su invitado solo recibe nombre y fecha");
  ok(negado(await a.c.from("personas").update({ nombre: "Cambiado" }).neq("nodo_id", "00000000-0000-0000-0000-000000000000").select()), "no puede editar datos directamente");
  ok(negado(await a.c.rpc("registrar_persona", { p_user_id: z.id, p_nombre: "x", p_documento: "1", p_telefono: "1", p_correo: "x", p_direccion: "x", p_municipio: "x", p_barrio: "x", p_fecha_nacimiento: "1990-01-01", p_codigo_invitacion: "", p_politica_version: "x" })), "no puede registrar personas por su cuenta");
  ok(negado(await a.c.rpc("vaciar_nodo", { p_user_id: z.id })), "no puede borrar la cuenta de otra persona");
  for (const f of ["admin_resumen", "admin_arbol", "admin_exportar", "admin_lista_admins"]) ok(negado(await a.c.rpc(f)), `no puede usar ${f}`);
  ok(negado(await a.c.rpc("admin_agregar", { p_correo: a.correo })), "no puede hacerse administradora");

  console.log("\n— Persona sin relación (Z)");
  ok(((await z.c.rpc("mi_red")).data ?? []).length === 0, "no ve la red de A");
  ok((await z.c.from("personas").select("nombre")).data?.length === 1, "solo ve sus propios datos");

  console.log("\n— Administrador (A, por un momento)");
  await adm.from("administradores").insert({ user_id: a.id });
  const res = await a.c.rpc("admin_resumen");
  ok(!res.error && res.data?.total >= 3, "ve el resumen de la red");
  await adm.from("administradores").delete().eq("user_id", a.id);
  ok(negado(await a.c.rpc("admin_resumen")), "al quitarle el permiso deja de verlo");

  console.log("\n— Eliminar cuenta (A)");
  await adm.rpc("vaciar_nodo", { p_user_id: a.id });
  await adm.auth.admin.deleteUser(a.id);
  creados.splice(creados.indexOf(a.id), 1);
  const nodoA = await adm.from("nodos").select("user_id, eliminado_en, personas(nombre)").eq("codigo", a.codigo).single();
  ok(nodoA.data && nodoA.data.user_id === null && nodoA.data.eliminado_en && !nodoA.data.personas, "sus datos se borran y su lugar queda vacío");
  const nodoB = await adm.from("nodos").select("invitado_por").eq("codigo", b.codigo).single();
  ok(!!nodoB.data?.invitado_por, "su invitado B sigue en la red");
  const r2 = await adm.rpc("registrar_persona", { p_user_id: z.id, p_nombre: "x x", p_documento: "1", p_telefono: "1", p_correo: "x", p_direccion: "x", p_municipio: "x", p_barrio: "x", p_fecha_nacimiento: "1990-01-01", p_codigo_invitacion: a.codigo, p_politica_version: "x" });
  ok(!!r2.error, "su código ya no sirve para invitar");
} finally {
  for (const id of creados) { await adm.rpc("vaciar_nodo", { p_user_id: id }); await adm.auth.admin.deleteUser(id); }
  // Borra solo los nodos de esta prueba (de abajo hacia arriba).
  for (const c of codigos.reverse()) await adm.from("nodos").delete().eq("codigo", c);
  console.log(`\n${fallas === 0 ? "Todo bien ✅" : `${fallas} prueba(s) fallaron ❌`} · cuentas temporales borradas`);
  process.exitCode = fallas ? 1 : 0;
}
