"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { MenuIcon } from "@/components/Icons";
import SocialIcons, { navLinks } from "@/components/SocialIcons";
import s from "@/app/(inicio)/o2.module.css";

export default function SiteHeader() {
  const path = usePathname();
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);

  // Encabezado: sin fondo arriba del todo y con fondo sólido al bajar.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    const id = requestAnimationFrame(update); // setState fuera del cuerpo del efecto (regla de React)
    window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(id); window.removeEventListener("scroll", update); };
  }, []);

  // Menú del celular: queda abierto solo en la página donde se abrió, así se cierra solo al navegar.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === path;
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenAt(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`${s.header} ${scrolled ? s.headerSolid : ""}`}>
        <Link href="/" className={s.logo}>Claudia <span>Hernández</span></Link>
        <nav aria-label="Principal" className={s.nav}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href)}>{l.label}</Link>
          ))}
        </nav>
        <div className={s.tools}>
          <span className={s.hideM}><SocialIcons /></span>
          <Link className={`${s.pill} ${s.hideM}`} href="/#hablemos">Hablemos</Link>
          <ThemeToggle className={s.toggle} />
        </div>
      </header>

      {/* Celular: barra flotante abajo con el menú y el botón de contacto */}
      <div className={s.dock}>
        {open && (
          <nav id="menu-movil" aria-label="Menú móvil" className={s.dockPanel}>
            <Link href="/">Inicio</Link>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} aria-current={current(l.href)}>{l.label}</Link>
            ))}
            <SocialIcons />
          </nav>
        )}
        <div className={s.dockBar}>
          <button
            type="button"
            className={s.dockMenu}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpenAt(open ? null : path)}
          >
            <MenuIcon />
            <span>{open ? "Cerrar" : "Menú"}</span>
          </button>
          <Link className={s.dockCta} href="/#hablemos" onClick={() => setOpenAt(null)}>Hablemos</Link>
        </div>
      </div>
    </>
  );
}
