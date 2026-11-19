# Red de referidos «De aquí, como tú»

Cada persona se registra, recibe su propio enlace para invitar a otras y así crece la red.
Está construida con **Supabase** (base de datos, cuentas y seguridad) y las páginas del sitio en **Vercel**.

## Páginas

| Página | Para qué |
|---|---|
| `/registro` | Crear cuenta. Con `?ref=CODIGO` el código de quien invita se llena solo. |
| `/login` | Entrar con celular + contraseña (o con correo). Bloquea 15 min tras 5 intentos fallidos. |
| `/recuperar` → `/nueva-clave` | Recuperar la contraseña por correo. |
| `/mi-red` | Panel personal: enlace, código, conteos, puntos, nivel y lista de invitados (solo nombres). |
| `/mi-red/perfil` | Corregir datos y eliminar la cuenta sin pedir permiso. |
| `/admin` | Panel de administradores: totales, crecimiento, mapa por municipio, barrios, ranking y buscador. |
| `/admin/arbol` | Quién invitó a quién. |
| `/admin/equipo` | Agregar o quitar administradores y registro de movimientos. |
| `/admin/exportar` | Descarga del listado en CSV (queda registrada). |
| `/terminos` | Política de tratamiento de datos (Ley 1581 de 2012). |

## Cómo está protegida

- Todas las tablas tienen **seguridad por filas**: nadie anónimo lee nada; cada persona solo lee lo suyo.
- Lo que una persona ve de su red sale de funciones que devuelven **solo nombres** (directos y un nivel más abajo).
- Las funciones de administración fallan si quien llama no es administrador; para los demás `/admin` "no existe".
- No se pueden crear cuentas por fuera del formulario (registro abierto apagado en Supabase).
- Contraseñas cifradas por Supabase. La llave secreta solo vive en el servidor (`.env.local` / Vercel), nunca en el código.
- No se pregunta ni se guarda por quién vota nadie.
- Prueba automática: `npm run probar:red` (crea cuentas temporales, revisa 26 reglas y las borra).

## Dónde se cambian las cosas

Todo lo que el equipo puede querer ajustar está en `src/content/red.ts`:
nombre de la red, mensaje de WhatsApp, **puntos y niveles**, municipios, barrios sugeridos y **datos del responsable**.
La estructura de la base de datos está en `supabase/migrations/`.

## 🔒 Interruptor

Mientras la variable `RED_ABIERTA` no valga `si`, todas las páginas de la red responden «Página no encontrada».
Así el código puede estar publicado sin recibir datos reales antes de cumplir lo de abajo.
Para abrirla: en Vercel → Settings → Environment Variables, agregar `RED_ABIERTA` = `si` y volver a publicar.

## ✅ Antes de abrir la red al público

1. **Responsable de los datos**: nombre, cédula/NIT, dirección, correo y teléfono → `RESPONSABLE` en `src/content/red.ts`.
   Mientras diga «POR CONFIRMAR», `/terminos` muestra el aviso de borrador.
2. **Revisión legal** de `/terminos` por un abogado de la campaña. Al cambiarla, subir `RED.politicaVersion`.
3. **Tiempo de conservación** de los datos (hoy: 6 meses después del proceso electoral, por confirmar).
4. **Correos**: conectar un servicio de envío (por ejemplo Resend) en Supabase → Authentication → SMTP.
   Sin esto, «¿Olvidaste tu contraseña?» no llega a nadie (el correo gratis de Supabase solo envía al equipo).
5. **Protección contra robots** en el registro (por ejemplo Cloudflare Turnstile).
6. **Llaves en Vercel** (lo hace María, dueña del proyecto en Vercel): Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://uyzicrhaogsfwwsirzte.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = la llave pública (empieza por `sb_publishable_`)
   - `SUPABASE_SECRET_KEY` = la llave secreta (empieza por `sb_secret_`) — **marcarla como Sensitive**
   - `NEXT_PUBLIC_SITE_URL` = `https://claudia-hernandez-web.vercel.app` (o el dominio final)
   - `RED_ABIERTA` = `si` — **solo cuando todo lo demás esté listo** (es lo que abre la red)
7. **Dominio final**: agregarlo también en Supabase → Authentication → URL Configuration → Redirect URLs.
8. **Primer administrador real**: registrarse con su correo y pedir que lo promuevan (hoy el único es una cuenta de prueba).
9. **Borrar los datos de prueba**: `npm run limpiar:pruebas -- --confirmar`
   (si encuentra una sola cuenta real, no borra nada).
10. Confirmar con el equipo: nombre de la red, **puntos y niveles**, lista de barrios y logo.
