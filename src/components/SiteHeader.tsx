"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { MenuIcon } from "@/components/Icons";
import SocialIcons, { navLinks } from "@/components/SocialIcons";
import s from "@/app/(inicio)/o2.module.css";

export default function SiteHeader() {
  const path = usePathname();
  const current = (href: string) => (path === href || path.startsWith(`${href}/`) ? "page" : undefined);
  const closeMenu = (e: React.MouseEvent<HTMLElement>) => e.currentTarget.closest("details")?.removeAttribute("open");

  return (
    <header className={s.header}>
      <Link href="/" className={s.logo}>Claudia <span>Hernández</span></Link>
      <nav aria-label="Principal" className={s.nav}>
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} aria-current={current(l.href)}>{l.label}</Link>
        ))}
      </nav>
      <div className={s.tools}>
        <span className={s.hideM}><SocialIcons /></span>
        <ThemeToggle className={s.toggle} />
        <Link className={`${s.pill} ${s.hideM}`} href="/#hablemos">Hablemos</Link>
        <details className={s.mMenu}>
          <summary aria-label="Abrir menú"><MenuIcon /></summary>
          <nav aria-label="Menú móvil" className={s.mPanel} onClick={closeMenu}>
            <Link href="/">Inicio</Link>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} aria-current={current(l.href)}>{l.label}</Link>
            ))}
            <Link href="/#hablemos">Hablemos</Link>
            <SocialIcons />
          </nav>
        </details>
      </div>
    </header>
  );
}
