"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandMark from "@/components/BrandMark";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`t-nav${scrolled ? " scrolled" : ""}`}>
      <Link className="brand" href="/" aria-label="Tether home">
        <BrandMark />
        Tether
      </Link>
      <div className="nav-links">
        <Link href="/#how">How it works</Link>
        <Link href="/#fits">The platform</Link>
        <Link href="/security">Security</Link>
        <Link href="/request-demo" className="nav-cta">
          Request demo
        </Link>
      </div>
    </nav>
  );
}
