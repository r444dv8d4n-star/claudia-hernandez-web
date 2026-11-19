import type { Metadata } from "next";
import Link from "next/link";
import { RED, RESPONSABLE, esBorrador } from "@/content/red";
import s from "../red.module.css";

export const metadata: Metadata = { title: "Política de tratamiento de datos" };

/**
 * Política de tratamiento de datos personales de la red (Ley 1581 de 2012 y Decreto 1074 de 2015).
 * Escrita para esta red; un abogado de la campaña debe revisarla antes de recibir datos reales.
 * Si cambia el contenido, cambiar también RED.politicaVersion para que quede registro de qué versión aceptó cada persona.
 */
export default function Terminos() {
  const R = RESPONSABLE;
  return (
    <article className={`${s.tarjeta} ${s.legal}`}>
      {esBorrador() && (
        <p className={s.alerta} role="note">
          Borrador en revisión. La red está en pruebas y todavía no recibe datos reales.
        </p>
      )}
      <p className={s.etiqueta}>Versión {RED.politicaVersion}</p>
      <h1>Política de tratamiento de datos personales</h1>
      <p className={s.sub}>{RED.nombre}, la red de apoyo de Claudia Hernández en Floridablanca.</p>

      <nav aria-label="Contenido" className={s.indice}>
        <ol>
          {["Quién es el responsable", "Qué datos pedimos", "Para qué los usamos", "Un dato sensible: tu afinidad política", "Quién ve tus datos",
            "Servicios externos y países", "Cuánto tiempo los guardamos", "Tus derechos", "Cómo ejercerlos", "Seguridad", "Cambios a esta política"]
            .map((t, i) => <li key={t}><a href={`#p${i + 1}`}>{t}</a></li>)}
        </ol>
      </nav>

      <section id="p1">
        <h2>1. Quién es el responsable</h2>
        <p>El responsable del tratamiento de tus datos es:</p>
        <dl className={s.ficha}>
          <dt>Nombre</dt><dd>{R.nombre}</dd>
          <dt>Identificación</dt><dd>{R.identificacion}</dd>
          <dt>Dirección</dt><dd>{R.direccion}</dd>
          <dt>Correo</dt><dd>{R.correo}</dd>
          <dt>Teléfono</dt><dd>{R.telefono}</dd>
        </dl>
        <p>A ese correo o teléfono puedes escribir para cualquier pregunta, consulta o reclamo sobre tus datos.</p>
      </section>

      <section id="p2">
        <h2>2. Qué datos pedimos</h2>
        <ul>
          <li><strong>Para registrarte:</strong> nombres y apellidos, número de documento, celular, municipio, barrio (opcional), dirección, fecha de nacimiento y correo.</li>
          <li><strong>Tu lugar en la red:</strong> el código de quien te invitó (si lo tienes), tu propio código para invitar y la fecha en que te registraste.</li>
          <li><strong>Tu autorización:</strong> la fecha y la versión de esta política que aceptaste.</li>
          <li><strong>Tu contraseña:</strong> se guarda cifrada; nadie, ni siquiera los administradores, puede verla.</li>
          <li><strong>Datos de seguridad:</strong> para frenar ataques guardamos durante un día la dirección de conexión (IP) de los intentos de iniciar sesión, y una huella cifrada (no el dato) del celular o correo usado.</li>
        </ul>
        <p><strong>No preguntamos ni guardamos por quién votas.</strong> Tampoco pedimos datos de salud, religión, origen étnico ni otros datos sensibles distintos al que se explica en el punto 4.</p>
      </section>

      <section id="p3">
        <h2>3. Para qué los usamos</h2>
        <ul>
          <li>Crear tu cuenta, dejarte entrar y mostrarte tu red.</li>
          <li>Saber quién invitó a quién, para contar tus invitados, tus puntos y tu nivel.</li>
          <li>Comunicarnos contigo por WhatsApp, llamada, mensaje de texto o correo sobre actividades, reuniones y noticias de Claudia Hernández.</li>
          <li>Hacer estadísticas por municipio y barrio para organizar el trabajo en el territorio.</li>
          <li>Comprobar que eres mayor de 18 años y evitar cuentas repetidas.</li>
          <li>Proteger la red contra fraudes y ataques.</li>
        </ul>
        <p>No vendemos, alquilamos ni regalamos tus datos a nadie.</p>
      </section>

      <section id="p4">
        <h2>4. Un dato sensible: tu afinidad política</h2>
        <p>Estar en esta red puede mostrar tu simpatía por Claudia Hernández. La ley considera la afinidad política un <strong>dato sensible</strong> (artículo 5 de la Ley 1581 de 2012). Por eso:</p>
        <ul>
          <li><strong>Registrarte es voluntario.</strong> No estás obligado a hacerlo ni a autorizar el tratamiento de este dato.</li>
          <li>Solo lo tratamos con tu autorización expresa, que das al marcar la casilla del registro.</li>
          <li>Puedes retirar esa autorización cuando quieras eliminando tu cuenta.</li>
          <li>Solo pueden registrarse personas mayores de 18 años.</li>
        </ul>
      </section>

      <section id="p5">
        <h2>5. Quién ve tus datos</h2>
        <ul>
          <li><strong>Tú</strong> ves y puedes corregir todos tus datos en <Link href="/mi-red/perfil">Mi perfil</Link>.</li>
          <li><strong>Quien te invitó, y la persona que invitó a esa persona,</strong> ven solo tu <strong>nombre</strong> y la fecha en que te uniste. Nunca tu documento, celular, correo ni dirección.</li>
          <li><strong>Los administradores de la red</strong>, que son personas del equipo de la campaña con acceso por invitación, ven tus datos completos para cumplir las finalidades del punto 3. Cada descarga del listado queda registrada con quién la hizo y cuándo.</li>
        </ul>
      </section>

      <section id="p6">
        <h2>6. Servicios externos y países</h2>
        <p>Para funcionar, la red usa estos proveedores, que guardan o procesan datos por encargo nuestro:</p>
        <ul>
          <li><strong>Supabase</strong> (base de datos y cuentas): tus datos se guardan en servidores ubicados en <strong>Canadá</strong>.</li>
          <li><strong>Vercel</strong> (alojamiento del sitio): procesa las visitas desde servidores en <strong>Estados Unidos</strong> y otros países.</li>
          <li><strong>WhatsApp</strong>: solo si tú decides compartir tu enlace por ese medio; lo haces desde tu propia cuenta.</li>
        </ul>
        <p>Al aceptar esta política autorizas esa transferencia internacional de tus datos, que se hace con proveedores que aplican medidas de seguridad y cifrado.</p>
      </section>

      <section id="p7">
        <h2>7. Cuánto tiempo los guardamos</h2>
        <p>Guardamos tus datos mientras tu cuenta esté activa y {R.conservacion}. Después se borran. Si eliminas tu cuenta antes, tus datos se borran en ese mismo momento: tu lugar en la red queda vacío y sin datos, y las personas que invitaste siguen en la red.</p>
      </section>

      <section id="p8">
        <h2>8. Tus derechos</h2>
        <p>Según el artículo 8 de la Ley 1581 de 2012 tienes derecho a:</p>
        <ul>
          <li>Conocer, actualizar y corregir tus datos.</li>
          <li>Pedir prueba de la autorización que nos diste.</li>
          <li>Saber cómo hemos usado tus datos.</li>
          <li>Revocar la autorización y pedir que borremos tus datos.</li>
          <li>Consultar gratis tus datos.</li>
          <li>Presentar quejas ante la <strong>Superintendencia de Industria y Comercio</strong> (www.sic.gov.co) después de haber hecho tu consulta o reclamo ante nosotros.</li>
        </ul>
      </section>

      <section id="p9">
        <h2>9. Cómo ejercerlos</h2>
        <ul>
          <li><strong>Al instante, tú mismo:</strong> en <Link href="/mi-red/perfil">Mi perfil</Link> puedes corregir tus datos o eliminar tu cuenta sin pedirle permiso a nadie.</li>
          <li><strong>Por escrito:</strong> al correo {R.correo}, con tu nombre, tu documento y lo que necesitas.</li>
          <li>Respondemos las <strong>consultas</strong> en máximo 10 días hábiles y los <strong>reclamos</strong> en máximo 15 días hábiles, como manda la ley (artículos 14 y 15 de la Ley 1581).</li>
        </ul>
      </section>

      <section id="p10">
        <h2>10. Seguridad</h2>
        <p>Toda la comunicación viaja cifrada (HTTPS). La base de datos aplica seguridad por filas: cada persona solo puede leer lo que le corresponde. Las contraseñas se guardan cifradas, las llaves secretas nunca están en el código público y limitamos los intentos de inicio de sesión.</p>
        <p>Para mejorar el sitio contamos, de forma anónima, algunas acciones (por ejemplo, cuántas veces se toca «Soy de aquí» o se comparte por WhatsApp). Ese conteo no usa cookies ni guarda tu IP ni nada que te identifique.</p>
      </section>

      <section id="p11">
        <h2>11. Cambios a esta política</h2>
        <p>Si cambiamos esta política te lo contaremos en este sitio. Cada versión tiene un número; guardamos cuál aceptaste tú. Esta es la versión <strong>{RED.politicaVersion}</strong>.</p>
      </section>

      <p className={s.bajo}><Link href="/registro">Volver al registro</Link></p>
    </article>
  );
}
