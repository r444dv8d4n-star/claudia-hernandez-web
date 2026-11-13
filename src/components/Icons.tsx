/** Iconos de línea simples (24×24, heredan el color del texto). Decorativos: el enlace lleva su propio nombre. */
type P = { className?: string };
const base = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;

export function InstagramIcon({ className }: P) {
  return (
    <svg {...base} className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className }: P) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M16.2 3c.4 2.3 1.9 3.9 4.3 4.2v3.2a8.3 8.3 0 0 1-4.3-1.3v6.1A6.2 6.2 0 1 1 10 9v3.3a2.9 2.9 0 1 0 2.9 2.9V3h3.3z" />
    </svg>
  );
}

export function FacebookIcon({ className }: P) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3.1h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3.1h2.5V21h3z" />
    </svg>
  );
}

export function SunIcon({ className }: P) {
  return (
    <svg {...base} className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
    </svg>
  );
}

export function MoonIcon({ className }: P) {
  return (
    <svg {...base} className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z" />
    </svg>
  );
}

export function MenuIcon({ className }: P) {
  return (
    <svg {...base} className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export const socialIcon = { Instagram: InstagramIcon, TikTok: TikTokIcon, Facebook: FacebookIcon } as const;
