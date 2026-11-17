"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { MenuIcon } from "@/components/Icons";
import SocialIcons, { navLinks } from "@/components/SocialIcons";
import s from "@/app/(inicio)/o2.module.css";

/** Enlace del panel: abre en una pestaña nueva y lo avisa a lectores de pantalla. */
function NewTabLink({ href, className, current, children }: { href: string; className?: string; current?: "page"; children: React.ReactNode }) {
  return (
    <Link href={href} className={className} aria-current={current} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr"> (se abre en una pestaña nueva)</span>
    </Link>
  );
}

export default function SiteHeader() {
  const path = usePathname();
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);
  const closeMenu = (e: React.MouseEvent<HTMLElement>) => e.currentTarget.closest("details")?.removeAttribute("open");

  return (
    <header className={s.header}>
      <Link href="/" className={s.logo}>Claudia <span>Hernández</span></Link>
      <nav aria-label="Principal" className={s.nav}>
        {navLinks.map((l) => (
          <NewTabLink key={l.href} href={l.href} current={current(l.href)}>{l.label}</NewTabLink>
        ))}
      </nav>
      <div className={s.tools}>
        <span className={s.hideM}><SocialIcons /></span>
        <ThemeToggle className={s.toggle} />
        <NewTabLink className={`${s.pill} ${s.hideM}`} href="/#hablemos">Hablemos</NewTabLink>
        <details className={s.mMenu}>
          <summary aria-label="Abrir menú"><MenuIcon /></summary>
          <nav aria-label="Menú móvil" className={s.mPanel} onClick={closeMenu}>
            <NewTabLink href="/">Inicio</NewTabLink>
            {navLinks.map((l) => (
              <NewTabLink key={l.href} href={l.href} current={current(l.href)}>{l.label}</NewTabLink>
            ))}
            <NewTabLink href="/#hablemos">Hablemos</NewTabLink>
            <SocialIcons />
          </nav>
        </details>
      </div>
    </header>
  );
}
