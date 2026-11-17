"use client";
import { MoonIcon, SunIcon } from "@/components/Icons";

/**
 * Interruptor claro / oscuro con sol y luna. El tema se guarda en este navegador
 * y lo aplica antes de pintar el script de <head> en app/layout.tsx.
 * Ambos iconos se pintan siempre y el CSS mueve la perilla según el tema, así no
 * hay diferencias entre el servidor y el navegador.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };
  return (
    <button type="button" className={className} onClick={toggle} aria-label="Cambiar entre modo claro y oscuro" title="Modo claro / oscuro">
      <span data-thumb aria-hidden="true" />
      <span data-ico="light"><SunIcon /></span>
      <span data-ico="dark"><MoonIcon /></span>
    </button>
  );
}
