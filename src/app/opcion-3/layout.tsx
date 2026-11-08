import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import PersonSchema from "@/components/PersonSchema";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import s from "./o3.module.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], variable: "--f-body", display: "swap" });

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Inicio · Mosaico vivo",
  description: "Claudia Hernández: concejala de Floridablanca (2024–2027), abogada, mamá y líder social. Conoce sus frentes de trabajo, acuerdos y cómo sumarte.",
};

export default function Layout({ children }: LayoutProps<"/opcion-3">) {
  return (
    <div className={`${display.variable} ${body.variable} ${s.root}`}>
      <Loader className={s.loader}>
        <span className={s.blobs}><i /><i /><i /></span>
        <b>Claudia Hernández</b>
      </Loader>
      <Cursor className={s.cursor} />
      <PersonSchema />
      {children}
    </div>
  );
}
