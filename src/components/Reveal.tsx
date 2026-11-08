"use client";
import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  variant?: "up" | "clip" | "pop" | "left";
  className?: string;
};

export default function Reveal({ children, as: Tag = "div", delay = 0, variant = "up", className = "" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { el.classList.add("in"); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style = { "--d": `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref} className={`rv rv-${variant} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
