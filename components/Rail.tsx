"use client";

import { useEffect, useRef } from "react";

/**
 * The side-rail thread: a thin vertical line in the left page margin that
 * fills with --signal as the user scrolls, with a glowing bead riding the
 * leading edge. Hidden below 560px and under prefers-reduced-motion (CSS).
 */
export default function Rail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fill = rail.querySelector<HTMLElement>(".fill");
    const bead = rail.querySelector<HTMLElement>(".bead");
    if (!fill || !bead) return;

    const upd = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const prog = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      const vh = rail.offsetHeight;
      fill.style.height = `${prog * vh}px`;
      bead.style.top = `${prog * vh}px`;
      bead.style.opacity = prog > 0.005 && prog < 0.995 ? "1" : "0";
    };
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();
    return () => {
      window.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
    };
  }, []);

  return (
    <div className="rail" ref={ref} aria-hidden="true">
      <div className="base" />
      <div className="fill" />
      <div className="bead" />
    </div>
  );
}
