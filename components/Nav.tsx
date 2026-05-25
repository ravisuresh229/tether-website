"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const APP_LOGIN_URL = "https://app.tetherhealth.co/login";

function TetherMark() {
  return (
    <span className="t-gnav-brand" aria-label="Tether">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M3 6 H11 V16 H19"
          stroke="#00A882"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="t-gnav-brand-text">Tether</span>
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const homeNavClass = isHome
    ? scrolled
      ? "t-gnav t-gnav-home t-gnav-scrolled"
      : "t-gnav t-gnav-home"
    : "t-gnav t-gnav-solid";

  const howItWorksHref = isHome ? "#how" : "/#how";

  return (
    <>
      <nav className={homeNavClass}>
        <Link href="/" aria-label="Tether — home" className="t-gnav-logo">
          <TetherMark />
        </Link>
        <ul className="t-gnav-links">
          <li>
            <Link href={howItWorksHref}>How It Works</Link>
          </li>
          <li>
            <Link href="/security">Security</Link>
          </li>
          <li>
            <a href={APP_LOGIN_URL}>Log In</a>
          </li>
          <li>
            <Link href="/request-demo" className="t-gnav-cta">
              Request Demo
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="t-gnav-mob"
          aria-label="Menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="t-gnav-overlay">
          <button
            type="button"
            className="t-gnav-overlay-close"
            aria-label="Close"
            onClick={() => setMobileOpen(false)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <Link href={howItWorksHref} onClick={() => setMobileOpen(false)}>
            How It Works
          </Link>
          <Link href="/security" onClick={() => setMobileOpen(false)}>
            Security
          </Link>
          <a href={APP_LOGIN_URL} onClick={() => setMobileOpen(false)}>
            Log In
          </a>
          <Link
            href="/request-demo"
            className="t-gnav-overlay-cta"
            onClick={() => setMobileOpen(false)}
          >
            Request Demo
          </Link>
        </div>
      )}
    </>
  );
}
