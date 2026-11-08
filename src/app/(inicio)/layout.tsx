import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import PersonSchema from "@/components/PersonSchema";
import Loader from "@/components/Loader";
import s from "./o2.module.css";

const display = Playfair_Display({ subsets: ["latin"], variable: "--f-display", display: "swap", style: ["normal", "italic"] });
const body = Inter({ subsets: ["latin"], variable: "--f-body", display: "swap" });

export const metadata: Metadata = {
  title: { absolute: "Claudia Hernández · Concejala de Floridablanca" },
  description: "Claudia Hernández, concejala de Floridablanca (2024–2027): una historia de familia, derecho y trabajo comunitario.",
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className={`${display.variable} ${body.variable} ${s.root}`}>
      <Loader className={s.loader}>
        <span className={s.loaderBar} />
        <span className={s.loaderName}>Claudia Hernández</span>
      </Loader>
      <PersonSchema />
      {children}
    </div>
  );
}
