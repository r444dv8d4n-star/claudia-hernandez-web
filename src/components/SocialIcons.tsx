import { socialIcon } from "@/components/Icons";
import { redes } from "@/content/site";
import { published } from "@/content/blog";
import s from "@/app/(inicio)/o2.module.css";

/** Páginas del menú. La Bitácora aparece solo cuando hay al menos una entrada publicada. */
export const navLinks = [
  { href: "/historia", label: "Historia" },
  { href: "/logros", label: "Logros" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
  ...(published.length > 0 ? [{ href: "/bitacora", label: "Bitácora" }] : []),
];

export default function SocialIcons() {
  return (
    <span className={s.icons}>
      {redes.map((r) => {
        const Icon = socialIcon[r.name];
        return (
          <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer" aria-label={`${r.name} de Claudia Hernández`}>
            <Icon />
          </a>
        );
      })}
    </span>
  );
}
