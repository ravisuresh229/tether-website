"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-reveal observer for .fade / .stagger / .proc elements.
 * Re-runs on route change so client-side navigations get fresh reveals.
 * Reduced-motion users see everything immediately via the CSS override.
 */
export default function TetherFX() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.16 }
    );
    document.querySelectorAll(".fade,.stagger,.proc").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
