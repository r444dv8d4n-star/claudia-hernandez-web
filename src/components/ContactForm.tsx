"use client";
import { useState } from "react";

type Props = { cls: Record<string, string>; accent?: string };

export default function ContactForm({ cls }: Props) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className={cls.form}
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      aria-describedby="form-note"
    >
      <label className={cls.field}>
        <span>Nombre</span>
        <input name="nombre" autoComplete="name" required />
      </label>
      <label className={cls.field}>
        <span>Barrio o municipio</span>
        <input name="barrio" autoComplete="address-level2" required />
      </label>
      <label className={cls.field}>
        <span>Celular</span>
        <input name="celular" type="tel" inputMode="tel" autoComplete="tel" required />
      </label>
      <label className={cls.field}>
        <span>¿En qué te puedo ayudar? (opcional)</span>
        <textarea name="mensaje" rows={3} />
      </label>
      <label className={cls.check}>
        <input type="checkbox" required />
        <span>Autorizo el tratamiento de mis datos personales según la política de privacidad [POR CONFIRMAR].</span>
      </label>
      <button type="submit" className={cls.btn}>Quiero sumarme</button>
      <p id="form-note" role="status" className={cls.note}>
        {sent
          ? "¡Gracias! Tu mensaje quedó listo para enviarse. [POR CONFIRMAR: conexión del formulario con el correo o WhatsApp oficial]"
          : "Te escribiremos pronto."}
      </p>
    </form>
  );
}
