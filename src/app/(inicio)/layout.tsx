import { Playfair_Display, Inter } from "next/font/google";
import PersonSchema from "@/components/PersonSchema";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import s from "./o2.module.css";

const display = Playfair_Display({ subsets: ["latin"], variable: "--f-display", display: "swap", style: ["normal", "italic"] });
const body = Inter({ subsets: ["latin"], variable: "--f-body", display: "swap" });

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className={`${display.variable} ${body.variable} ${s.root}`}>
      <a className={s.skip} href="#main">Saltar al contenido</a>
      <PersonSchema />
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
