import { RED } from "@/content/red";

/** Datos del formulario de registro, ya limpios. */
export type DatosRegistro = {
  nombre: string;
  documento: string;
  telefono: string;
  direccion: string;
  municipio: string;
  barrio: string;
  fechaNacimiento: string; // AAAA-MM-DD
  correo: string;
  codigo: string;
  contrasena: string;
  autoriza: boolean;
};

export type Errores = Partial<Record<keyof DatosRegistro, string>>;

const soloDigitos = (v: string) => v.replace(/\D/g, "");

export function leerRegistro(fd: FormData): DatosRegistro {
  const t = (k: string) => String(fd.get(k) ?? "").trim();
  const municipio = t("municipio") === "Otro" ? t("municipioOtro") : t("municipio");
  return {
    nombre: t("nombre").replace(/\s+/g, " "),
    documento: soloDigitos(t("documento")),
    telefono: soloDigitos(t("telefono")).replace(/^57(?=3\d{9}$)/, ""),
    direccion: t("direccion").replace(/\s+/g, " "),
    municipio,
    barrio: t("barrio").replace(/\s+/g, " "),
    fechaNacimiento: t("fechaNacimiento"),
    correo: t("correo").toLowerCase(),
    codigo: t("codigo").toUpperCase().replace(/[^A-Z0-9]/g, ""),
    contrasena: String(fd.get("contrasena") ?? ""),
    autoriza: fd.get("autoriza") === "on",
  };
}

/** Años cumplidos a hoy para una fecha AAAA-MM-DD. */
export function edad(fecha: string, hoy = new Date()) {
  const [a, m, d] = fecha.split("-").map(Number);
  let e = hoy.getFullYear() - a;
  if (hoy.getMonth() + 1 < m || (hoy.getMonth() + 1 === m && hoy.getDate() < d)) e--;
  return e;
}

/** Valida los datos personales (registro y «Mi perfil»). */
export function validarDatos(d: DatosRegistro): Errores {
  const e: Errores = {};
  const palabras = d.nombre.split(" ").filter((p) => p.length > 1);
  if (palabras.length < 2) e.nombre = "Escribe tu nombre y tu apellido.";
  else if (d.nombre.length > 120) e.nombre = "El nombre es demasiado largo.";

  if (!/^\d{5,12}$/.test(d.documento)) e.documento = "Escribe tu número de documento, solo números.";
  if (!/^3\d{9}$/.test(d.telefono)) e.telefono = "Escribe un celular de 10 dígitos que empiece por 3.";
  if (d.direccion.length < 4) e.direccion = "Escribe tu dirección.";
  if (d.municipio.length < 3) e.municipio = "Elige tu municipio.";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.fechaNacimiento)) e.fechaNacimiento = "Elige el día, el mes y el año en que naciste.";
  else {
    const anios = edad(d.fechaNacimiento);
    const [a, m, dd] = d.fechaNacimiento.split("-").map(Number);
    const existe = new Date(Date.UTC(a, m - 1, dd)).getUTCDate() === dd;
    if (!existe) e.fechaNacimiento = "Esa fecha no existe. Revisa el día y el mes.";
    else if (Number.isNaN(anios) || anios > 110) e.fechaNacimiento = "Revisa la fecha de nacimiento.";
    else if (anios < RED.edadMinima) e.fechaNacimiento = `Debes ser mayor de ${RED.edadMinima} años para registrarte.`;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.correo)) e.correo = "Escribe un correo válido, por ejemplo tu@correo.com.";
  return e;
}

export function validarRegistro(d: DatosRegistro): Errores {
  const e = validarDatos(d);
  if (d.codigo && !/^[A-Z2-9]{6}$/.test(d.codigo)) e.codigo = "El código tiene 6 letras y números. Revísalo.";

  if (d.contrasena.length < 8) e.contrasena = "La contraseña debe tener al menos 8 caracteres.";
  else if (!/[A-Za-zÀ-ÿ]/.test(d.contrasena) || !/\d/.test(d.contrasena)) e.contrasena = "Usa letras y números en tu contraseña.";

  if (!d.autoriza) e.autoriza = "Debes autorizar el tratamiento de datos para registrarte.";
  return e;
}
