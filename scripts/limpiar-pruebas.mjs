/**
 * Borra las cuentas DE PRUEBA (correo @example.com) y todo lo suyo. Las cuentas reales no se tocan.
 * Uso:  npm run limpiar:pruebas              → solo muestra lo que borraría
 *       npm run limpiar:pruebas -- --confirmar → borra de verdad (no se puede deshacer)
 *
 * Qué borra: sus datos personales, su lugar en la red, si eran administradoras, sus movimientos en la
 * auditoría, los lugares vacíos que dejaron cuentas de prueba eliminadas y los intentos de entrada.
 * Si una persona real fue invitada por una de prueba, sigue en la red, solo que sin «invitado por».
 */
import { createClient } from "@supabase/supabase-js";

const adm = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });
const confirmar = process.argv.includes("--confirmar");
const esPrueba = (correo) => /@example\.com$/i.test(correo ?? "");

const usuarios = [];
for (let page = 1; ; page++) {
  const { data, error } = await adm.auth.admin.listUsers({ page, perPage: 1000 });
  if (error) throw error;
  usuarios.push(...data.users);
  if (data.users.length < 1000) break;
}
const pruebas = usuarios.filter((u) => esPrueba(u.email));
const reales = usuarios.length - pruebas.length;
const ids = pruebas.map((u) => u.id);

const { data: nodosPrueba, error: e1 } = await adm.from("nodos").select("id").in("user_id", ids.length ? ids : ["00000000-0000-0000-0000-000000000000"]);
if (e1) throw e1;
const { data: vacios, error: e2 } = await adm.from("nodos").select("id").is("user_id", null);
if (e2) throw e2;
const { data: hijosReales, error: e3 } = await adm.from("nodos").select("id, invitado_por").not("user_id", "is", null);
if (e3) throw e3;
const borrarNodos = new Set([...(nodosPrueba ?? []), ...(vacios ?? [])].map((n) => n.id));
const realesAfectados = (hijosReales ?? []).filter((n) => borrarNodos.has(n.invitado_por) && !borrarNodos.has(n.id)).length;

console.log(`Cuentas de prueba: ${pruebas.length} · cuentas reales (no se tocan): ${reales}`);
console.log(`Lugares en la red que se borran: ${borrarNodos.size} (incluye ${vacios?.length ?? 0} vacíos de cuentas de prueba eliminadas)`);
if (realesAfectados) console.log(`Ojo: ${realesAfectados} persona(s) real(es) fueron invitadas por una cuenta de prueba; siguen en la red sin «invitado por».`);
if (!confirmar) { console.log("Nada se borró. Para borrar de verdad: npm run limpiar:pruebas -- --confirmar"); process.exit(0); }

const lista = [...borrarNodos];
for (let i = 0; i < lista.length; i += 200) {
  const parte = lista.slice(i, i + 200);
  const { error: a } = await adm.from("personas").delete().in("nodo_id", parte);
  if (a) throw a;
}
if (ids.length) {
  const { error: b } = await adm.from("auditoria").delete().in("admin_id", ids);
  if (b) throw b;
  const { error: c } = await adm.from("administradores").delete().in("user_id", ids);
  if (c) throw c;
}
// Primero se sueltan los invitados (de prueba o reales) de los lugares que se borran, para no chocar con las referencias.
for (let i = 0; i < lista.length; i += 200) {
  const parte = lista.slice(i, i + 200);
  const { error: d } = await adm.from("nodos").update({ invitado_por: null }).in("invitado_por", parte);
  if (d) throw d;
}
for (let i = 0; i < lista.length; i += 200) {
  const { error: f } = await adm.from("nodos").delete().in("id", lista.slice(i, i + 200));
  if (f) throw f;
}
for (const u of pruebas) {
  const { error: g } = await adm.auth.admin.deleteUser(u.id);
  if (g) throw g;
}
await adm.from("intentos").delete().gte("id", 0);

const { count: quedanNodos } = await adm.from("nodos").select("id", { count: "exact", head: true });
const { count: quedanPersonas } = await adm.from("personas").select("nodo_id", { count: "exact", head: true });
console.log(`Listo: ${pruebas.length} cuentas de prueba borradas. Quedan ${quedanPersonas} persona(s) y ${quedanNodos} lugar(es) en la red.`);
