"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const APP_LOGIN_URL = "https://app.tetherhealth.co/login";

const ROLE_OPTIONS = [
  "Practice Manager",
  "Medical Assistant",
  "Office Administrator",
  "Physician",
  "Other",
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function RequestDemoPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    practiceName: "",
    role: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const { firstName, lastName, email, practiceName, role, message } = formData;
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      setErrorMsg("First name, last name, and email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          practiceName: practiceName?.trim() || undefined,
          role: role || undefined,
          message: message?.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="rd-page">
      <style>{RD_CSS}</style>

      <nav className="rd-nav">
        <Link href="/" className="rd-nav-logo">
          <Image src="/LOGO.jpeg" alt="Tether" width={30} height={30} style={{ objectFit: "contain" }} />
          <span className="rd-nav-logo-text">Tether</span>
        </Link>
        <div className="rd-nav-links">
          <Link href="/#product">Product</Link>
          <Link href="/#platform">Platform</Link>
          <Link href="/#specialists">For Specialists</Link>
          <Link href="/security">Security</Link>
          <Link href="/blog">Blog</Link>
          <a href={APP_LOGIN_URL} className="rd-nav-login">Log In</a>
          <Link href="/request-demo" className="rd-nav-cta">Request Demo</Link>
        </div>
        <button type="button" className="rd-nav-mob" aria-label="Menu" onClick={() => setMobileOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </nav>
      {mobileOpen && (
        <div className="rd-nav-overlay">
          <button type="button" className="rd-nav-overlay-close" aria-label="Close" onClick={() => setMobileOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <Link href="/#product" onClick={() => setMobileOpen(false)}>Product</Link>
          <Link href="/#platform" onClick={() => setMobileOpen(false)}>Platform</Link>
          <Link href="/#specialists" onClick={() => setMobileOpen(false)}>For Specialists</Link>
          <Link href="/security" onClick={() => setMobileOpen(false)}>Security</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)}>Blog</Link>
          <a href={APP_LOGIN_URL} onClick={() => setMobileOpen(false)}>Log In</a>
          <Link href="/request-demo" className="rd-nav-overlay-cta" onClick={() => setMobileOpen(false)}>Request Demo</Link>
        </div>
      )}

      <main className="rd-main">
        <div className="rd-grid">
          <div className="rd-left">
            <div className="rd-label">REQUEST A DEMO</div>
            <h1 className="rd-headline">See Tether in action.</h1>
            <p className="rd-subtitle">
              Learn how Tether can streamline referral management for your practice. We&apos;ll walk you through the platform and answer your questions.
            </p>
            <ul className="rd-value-list">
              <li><span className="rd-value-icon"><CheckIcon /></span>Live product walkthrough</li>
              <li><span className="rd-value-icon"><CheckIcon /></span>Personalized to your practice type</li>
              <li><span className="rd-value-icon"><CheckIcon /></span>15-20 minutes, no commitment</li>
            </ul>
          </div>

          <div className="rd-right">
            <div className="rd-card">
              {status === "success" ? (
                <div className="rd-success">
                  <span className="rd-success-icon"><CheckCircleIcon /></span>
                  <p className="rd-success-text">Thanks! We&apos;ll be in touch within 24 hours to schedule your demo.</p>
                </div>
              ) : (
                <>
                  <form className="rd-form" onSubmit={handleSubmit}>
                    <label htmlFor="rd-first">First Name *</label>
                    <input id="rd-first" type="text" required value={formData.firstName} onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))} placeholder="First name" />
                    <label htmlFor="rd-last">Last Name *</label>
                    <input id="rd-last" type="text" required value={formData.lastName} onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))} placeholder="Last name" />
                    <label htmlFor="rd-email">Work Email *</label>
                    <input id="rd-email" type="email" required value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} placeholder="you@practice.com" />
                    <label htmlFor="rd-practice">Practice Name</label>
                    <input id="rd-practice" type="text" value={formData.practiceName} onChange={(e) => setFormData((p) => ({ ...p, practiceName: e.target.value }))} placeholder="Your practice name" />
                    <label htmlFor="rd-role">Your Role</label>
                    <select id="rd-role" value={formData.role} onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}>
                      <option value="">Select role</option>
                      {ROLE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <label htmlFor="rd-message">Message</label>
                    <textarea id="rd-message" rows={3} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} placeholder="Anything specific you'd like to see in the demo?" />
                    {errorMsg && <p className="rd-form-error">{errorMsg}</p>}
                    <button type="submit" className="rd-submit" disabled={status === "loading"}>
                      {status === "loading" ? "Sending…" : "Request Demo →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="rd-footer">
        <p>&copy; 2026 Tether Health, Inc. All rights reserved. <Link href="/">Home</Link> <Link href="/blog">Blog</Link> <Link href="/legal">Legal</Link></p>
      </footer>
    </div>
  );
}

const RD_CSS = `
.rd-page { font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif; color: #2D2D2D; background: #FAFAF7; min-height: 100vh; -webkit-font-smoothing: antialiased; }
.rd-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 72px; border-bottom: 1px solid #E0DDD5; background: rgba(250,250,247,0.95); }
.rd-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #1E2A3A; font-weight: 600; font-size: 22px; letter-spacing: -0.5px; }
.rd-nav-links { display: flex; align-items: center; gap: 28px; }
.rd-nav-links a { font-size: 14px; font-weight: 500; color: #6B6B6B; text-decoration: none; transition: color 0.2s; }
.rd-nav-links a:hover { color: #1E2A3A; }
.rd-nav-login { color: #6B6B6B !important; }
.rd-nav-cta { background: #0D7377 !important; color: #fff !important; padding: 10px 20px !important; border-radius: 8px !important; font-size: 14px !important; font-weight: 600 !important; text-decoration: none !important; transition: background 0.2s; }
.rd-nav-cta:hover { background: #095456 !important; }
.rd-nav-mob { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: #1E2A3A; }
.rd-nav-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(250,250,247,0.98); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; padding: 80px 24px; }
.rd-nav-overlay a { font-size: 20px; font-weight: 500; color: #1E2A3A; text-decoration: none; }
.rd-nav-overlay-cta { background: #0D7377; color: #fff !important; padding: 12px 24px; border-radius: 8px; font-weight: 600; }
.rd-nav-overlay-close { position: absolute; top: 24px; right: 24px; background: none; border: none; cursor: pointer; padding: 8px; color: #1E2A3A; }

.rd-main { max-width: 1100px; margin: 0 auto; padding: 80px 48px 120px; }
.rd-grid { display: grid; grid-template-columns: 40% 1fr; gap: 64px; align-items: start; }
.rd-left { position: sticky; top: 96px; }
.rd-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #0D7377; margin-bottom: 16px; }
.rd-headline { font-family: var(--font-serif), Georgia, serif; font-size: 40px; line-height: 1.15; font-weight: 400; color: #151F2B; letter-spacing: -0.8px; margin-bottom: 20px; }
.rd-subtitle { font-size: 17px; line-height: 1.65; color: #6B6B6B; margin-bottom: 32px; }
.rd-value-list { list-style: none; margin: 0; padding: 0; }
.rd-value-list li { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #2D2D2D; margin-bottom: 14px; }
.rd-value-icon { width: 22px; height: 22px; border-radius: 6px; background: #E8F4F4; color: #0D7377; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.rd-right { min-width: 0; }
.rd-card { background: #fff; border: 1px solid #E0DDD5; border-radius: 16px; padding: 40px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
.rd-form label { display: block; font-size: 13px; font-weight: 600; color: #1E2A3A; margin-bottom: 6px; margin-top: 16px; }
.rd-form label:first-of-type { margin-top: 0; }
.rd-form input, .rd-form select, .rd-form textarea { width: 100%; padding: 12px 14px; border: 1px solid #E0DDD5; border-radius: 8px; font-size: 15px; font-family: inherit; margin-bottom: 4px; }
.rd-form input:focus, .rd-form select:focus, .rd-form textarea:focus { outline: none; border-color: #0D7377; box-shadow: 0 0 0 2px rgba(13,115,119,0.15); }
.rd-form textarea { resize: vertical; min-height: 88px; }
.rd-form-error { font-size: 14px; color: #D4613E; margin-top: 12px; margin-bottom: 0; }
.rd-submit { width: 100%; margin-top: 24px; padding: 14px 24px; background: #0D7377; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: inherit; cursor: pointer; transition: background 0.2s; }
.rd-submit:hover:not(:disabled) { background: #095456; }
.rd-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.rd-success { text-align: center; padding: 24px 0; }
.rd-success-icon { display: inline-flex; color: #0D7377; margin-bottom: 20px; }
.rd-success-text { font-size: 18px; line-height: 1.5; color: #1E2A3A; margin: 0; }

.rd-footer { padding: 32px 48px; border-top: 1px solid #E0DDD5; font-size: 13px; color: #9A9A9A; text-align: center; }
.rd-footer a { color: #0D7377; text-decoration: none; margin-left: 16px; }
.rd-footer a:hover { text-decoration: underline; }

@media (max-width: 900px) {
  .rd-nav { padding: 0 24px; }
  .rd-nav-links { display: none; }
  .rd-nav-mob { display: block; }
  .rd-main { padding: 48px 24px 80px; }
  .rd-grid { grid-template-columns: 1fr; gap: 48px; }
  .rd-left { position: static; }
  .rd-headline { font-size: 32px; }
  .rd-card { padding: 28px 24px; }
}
`;
