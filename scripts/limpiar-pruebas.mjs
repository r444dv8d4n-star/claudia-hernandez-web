/**
 * Borra TODOS los datos de prueba antes de abrir la red al público.  Uso:  npm run limpiar:pruebas -- --confirmar
 *
 * Seguro: si encuentra UNA sola persona con un correo que no sea de prueba (@example.com), no borra nada.
 * Sin --confirmar solo muestra lo que borraría.
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
const reales = usuarios.filter((u) => !esPrueba(u.email));
const { count: nodos } = await adm.from("nodos").select("id", { count: "exact", head: true });

if (reales.length) {
  console.log(`🛑 Hay ${reales.length} cuenta(s) que NO son de prueba. Por seguridad no se borra nada.`);
  process.exit(1);
}
console.log(`Cuentas de prueba: ${usuarios.length} · lugares en la red: ${nodos}`);
if (!confirmar) { console.log("Nada se borró. Para borrar de verdad: npm run limpiar:pruebas -- --confirmar"); process.exit(0); }

for (const u of usuarios) await adm.auth.admin.deleteUser(u.id);
await adm.from("personas").delete().not("nodo_id", "is", null);
await adm.from("administradores").delete().not("user_id", "is", null);
await adm.from("intentos").delete().gte("id", 0);
await adm.from("auditoria").delete().gte("id", 0);
await adm.from("nodos").delete().not("id", "is", null);
const { count: quedan } = await adm.from("nodos").select("id", { count: "exact", head: true });
console.log(`Listo: ${usuarios.length} cuentas borradas · quedan ${quedan} lugares en la red.`);
