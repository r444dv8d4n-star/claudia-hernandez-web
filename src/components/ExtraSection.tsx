import { SHOW_EXTRA_SECTION } from "@/config/features";

/**
 * Bloque reservado para un mensaje adicional. Hoy no se muestra.
 * Para activarlo: SHOW_EXTRA_SECTION = true en src/config/features.ts
 * y completar el contenido de abajo.
 */
export default function ExtraSection({ className }: { className?: string }) {
  if (!SHOW_EXTRA_SECTION) return null;
  return (
    <section className={className} id="mensaje-adicional" aria-labelledby="extra-title">
      <h2 id="extra-title">[POR CONFIRMAR] Título del mensaje adicional</h2>
      <p>[POR CONFIRMAR] Texto del mensaje adicional.</p>
    </section>
  );
}
