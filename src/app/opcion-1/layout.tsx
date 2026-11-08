import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import PersonSchema from "@/components/PersonSchema";
import Loader from "@/components/Loader";
import s from "./o1.module.css";

const display = Fraunces({ subsets: ["latin"], variable: "--f-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--f-body", display: "swap" });

export const metadata: Metadata = {
  title: "Inicio · Hilo de comunidad",
  description: "Claudia Hernández, concejala de Floridablanca (2024–2027), abogada, mamá y líder social. Mujeres, emprendimiento y comunidad.",
};

export default function Layout({ children }: LayoutProps<"/opcion-1">) {
  return (
    <div className={`${display.variable} ${body.variable} ${s.root}`}>
      <Loader className={s.loader}>
        <svg viewBox="0 0 200 60" width="200" height="60" role="presentation">
          <path className={s.loaderLine} d="M5 40 C 40 5, 70 5, 100 30 S 160 55, 195 20" fill="none" stroke="#D9A21B" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span>Claudia Hernández</span>
      </Loader>
      <PersonSchema />
      {children}
    </div>
  );
}
