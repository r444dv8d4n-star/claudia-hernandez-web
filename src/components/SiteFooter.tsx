import Link from "next/link";
import SocialIcons, { navLinks } from "@/components/SocialIcons";
import { person } from "@/content/site";
import s from "@/app/(inicio)/o2.module.css";

export default function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.fBrand}>
        <Link href="/" className={s.logo}>Claudia <span>Hernández</span></Link>
        <p>{person.role} ({person.period}). Mamá, abogada y líder social. Creciendo con mujeres soñadoras y emprendedoras.</p>
        <SocialIcons />
      </div>
      <div className={s.fCols}>
        <div className={s.fCol}>
          <h3>Sitio</h3>
          <Link href="/">Inicio</Link>
          {navLinks.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
          <Link href="/#hablemos">Hablemos</Link>
        </div>
        <div className={s.fCol}>
          <h3>Redes</h3>
          <a href={person.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={person.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href={person.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
      <div className={s.fBottom}>
        <span>© Claudia Hernández · {person.city}</span>
        <span>Sitio oficial</span>
      </div>
    </footer>
  );
}
