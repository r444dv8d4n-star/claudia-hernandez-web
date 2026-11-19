"use client";

import Link from "next/link";
import { medir, type Evento } from "@/lib/red/medir";

/** Enlace que cuenta (de forma anónima) cuántas veces lo tocan. */
export default function LinkMedido({ evento, ...props }: React.ComponentProps<typeof Link> & { evento: Evento }) {
  return <Link {...props} onClick={(e) => { medir(evento); props.onClick?.(e); }} />;
}
