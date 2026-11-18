"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { MenuIcon } from "@/components/Icons";
import SocialIcons, { navLinks } from "@/components/SocialIcons";
import s from "@/app/(inicio)/o2.module.css";
import u from "@/components/UneteRed.module.css";

/** Enlace del menú: las páginas del sitio se abren en la misma pestaña. */
function NavLink({ href, className, current, children }: { href: string; className?: string; current?: "page"; children: React.ReactNode }) {
  return (
    <Link href={href} className={className} aria-current={current}>
      {children}
    </Link>
  );
}

/** `red`: muestra el botón de la red de referidos (solo cuando está abierta). */
export default function SiteHeader({ red = false }: { red?: boolean }) {
  const path = usePathname();
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);
  const closeMenu = (e: React.MouseEvent<HTMLElement>) => e.currentTarget.closest("details")?.removeAttribute("open");

  return (
    <header className={s.header}>
      <Link href="/" className={s.logo}>Claudia <span>Hernández</span></Link>
      <nav aria-label="Principal" className={s.nav}>
        {navLinks.map((l) => (
          <NavLink key={l.href} href={l.href} current={current(l.href)}>{l.label}</NavLink>
        ))}
      </nav>
      <div className={s.tools}>
        <span className={s.hideM}><SocialIcons /></span>
        <ThemeToggle className={s.toggle} />
        {red && <NavLink className={`${u.pillRed} ${s.hideM}`} href="/registro">Únete a la red</NavLink>}
        <NavLink className={`${s.pill} ${s.hideM}`} href="/#hablemos">Hablemos</NavLink>
        <details className={s.mMenu}>
          <summary aria-label="Abrir menú"><MenuIcon /></summary>
          <nav aria-label="Menú móvil" className={s.mPanel} onClick={closeMenu}>
            <NavLink href="/">Inicio</NavLink>
            {navLinks.map((l) => (
              <NavLink key={l.href} href={l.href} current={current(l.href)}>{l.label}</NavLink>
            ))}
            <NavLink href="/#hablemos">Hablemos</NavLink>
            {red && <NavLink href="/registro">Únete a la red</NavLink>}
            <SocialIcons />
          </nav>
        </details>
      </div>
    </header>
  );
}
