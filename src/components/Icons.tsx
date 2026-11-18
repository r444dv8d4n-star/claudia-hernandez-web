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

export function WhatsAppIcon({ className }: P) {
  return (
    <svg {...base} className={className} fill="currentColor">
      <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.2-.2-.4-.3z" />
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
