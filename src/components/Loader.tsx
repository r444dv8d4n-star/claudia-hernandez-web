"use client";
import { useEffect, useState } from "react";

export default function Loader({ className, children }: { className: string; children: React.ReactNode }) {
  const [gone, setGone] = useState(false);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = setTimeout(() => setHide(true), reduce ? 0 : 1300);
    const t2 = setTimeout(() => setGone(true), reduce ? 50 : 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (gone) return null;
  return (
    <div className={`${className} ${hide ? "is-hidden" : ""}`} aria-hidden="true">
      {children}
    </div>
  );
}
