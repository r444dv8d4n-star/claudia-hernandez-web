"use client";
import { MoonIcon, SunIcon } from "@/components/Icons";

/**
 * Cambia entre modo claro (por defecto) y oscuro. El tema se guarda en este
 * navegador y lo aplica antes de pintar el script de <head> en app/layout.tsx.
 * Los dos iconos se pintan siempre y el CSS muestra el que corresponde, así no
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
      <span data-when="light"><MoonIcon /></span>
      <span data-when="dark"><SunIcon /></span>
    </button>
  );
}
