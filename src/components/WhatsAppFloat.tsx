import { person, TBC } from "@/content/site";
import { WhatsAppIcon } from "@/components/Icons";

/**
 * Botón flotante de WhatsApp en todas las páginas.
 * Se muestra solo cuando `person.whatsapp` tiene el número oficial (solo dígitos con indicativo, ej. "573001234567").
 */
export default function WhatsAppFloat({ className }: { className?: string }) {
  const n = person.whatsapp.replace(/\D/g, "");
  if (person.whatsapp === TBC || n.length < 10) return null;
  const msg = encodeURIComponent("Hola Claudia, te escribo desde tu página web.");
  return (
    <a className={className} href={`https://wa.me/${n}?text=${msg}`} target="_blank" rel="noopener noreferrer" aria-label="Escribirle a Claudia por WhatsApp">
      <WhatsAppIcon />
      <span>Escríbele</span>
    </a>
  );
}
