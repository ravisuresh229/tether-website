"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

function useInView(opts: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setV(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px", ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v] as const;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}>{children}</div>
  );
}

const IconShield = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
const IconLock = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconServer = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>;
const IconEye = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconFile = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IconUsers = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconCheck = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconArrowRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

const CSS = `
:root {
  --navy: #2D3A4E;
  --navy-deep: #1E2A3A;
  --navy-darkest: #151F2B;
  --bg: #FAFAF7;
  --bg-warm: #F5F3EE;
  --surface: #EDEADF;
  --teal: #0D7377;
  --teal-dark: #095456;
  --teal-light: #E8F4F4;
  --coral: #D4613E;
  --text: #2D2D2D;
  --text-secondary: #6B6B6B;
  --text-tertiary: #9A9A9A;
  --border: #E0DDD5;
  --serif: 'Instrument Serif', Georgia, serif;
  --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
.sec-page, .sec-page * { margin: 0; padding: 0; box-sizing: border-box; }
.sec-page {
  font-family: var(--sans);
  color: var(--text);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
.sec-page ::selection { background: var(--navy); color: #fff; }

/* Nav */
.sec-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 48px; height: 72px; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(16px) saturate(1.8); background: rgba(250,250,247,0.85); border-bottom: 1px solid rgba(224,221,213,0.5); }
.sec-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--navy-deep); }
.sec-nav-logo-text { font-family: var(--sans); font-weight: 600; font-size: 22px; letter-spacing: -0.5px; }
.sec-nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
.sec-nav-links a { font-size: 14px; font-weight: 500; color: var(--text-secondary); text-decoration: none; transition: color 0.2s; }
.sec-nav-links a:hover { color: var(--navy-deep); }
.sec-nav-cta { background: var(--navy); color: #fff !important; padding: 10px 22px; border-radius: 8px; font-weight: 600 !important; transition: all 0.25s; }
.sec-nav-cta:hover { background: var(--navy-deep); }
.sec-nav-mob { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--navy-deep); }
.sec-nav-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 200; background: rgba(250,250,247,0.98); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; padding: 80px 24px; opacity: 0; animation: sec-mob-in 0.3s ease forwards; }
@keyframes sec-mob-in { to { opacity: 1; } }
.sec-nav-overlay a { font-size: 24px; font-weight: 500; color: var(--navy-deep); text-decoration: none; }
.sec-nav-overlay-close { position: absolute; top: 24px; right: 24px; background: none; border: none; cursor: pointer; padding: 8px; color: var(--navy-deep); }
.sec-nav-overlay-cta { display: inline-flex; padding: 14px 28px; background: var(--coral); color: #fff; border-radius: 10px; font-size: 15px; font-weight: 600; text-decoration: none; margin-top: 16px; }
.sec-nav-overlay-cta:hover { background: #BF5535; }

/* Hero */
.sec-hero { padding: 160px 48px 80px; text-align: center; position: relative; overflow: hidden; }
.sec-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 400px; background: linear-gradient(180deg, var(--teal-light) 0%, transparent 100%); opacity: 0.4; pointer-events: none; }
.sec-hero-inner { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }
.sec-hero-icon { width: 72px; height: 72px; border-radius: 20px; background: var(--teal-light); border: 1px solid rgba(13,115,119,0.15); color: var(--teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px; }
.sec-hero-icon svg { width: 36px; height: 36px; }
.sec-hero h1 { font-family: var(--serif); font-size: 52px; line-height: 1.1; font-weight: 400; color: var(--navy-darkest); letter-spacing: -1.2px; margin-bottom: 20px; }
.sec-hero-sub { font-size: 18px; line-height: 1.65; color: var(--text-secondary); max-width: 600px; margin: 0 auto 40px; }
.sec-hero-badges { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
.sec-hero-badge { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: white; border: 1px solid var(--border); border-radius: 100px; font-size: 13px; font-weight: 500; color: var(--navy); }
.sec-hero-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal); }

/* Principles */
.sec-principles { padding: 96px 48px; background: var(--bg); }
.sec-principles-inner { max-width: 1100px; margin: 0 auto; }
.sec-slbl { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--teal); margin-bottom: 16px; }
.sec-stitle { font-family: var(--serif); font-size: 40px; line-height: 1.15; font-weight: 400; color: var(--navy-darkest); letter-spacing: -0.8px; margin-bottom: 56px; }
.sec-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; align-items: stretch; }
.sec-grid > * { min-width: 0; }
.sec-card { height: 100%; min-height: 280px; display: flex; flex-direction: column; background: white; border: 1px solid var(--border); border-radius: 16px; padding: 36px 32px; transition: all 0.35s cubic-bezier(0.16,1,0.3,1); }
.sec-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.06); border-color: rgba(13,115,119,0.2); }
.sec-card-icon { width: 52px; height: 52px; border-radius: 14px; background: var(--teal-light); color: var(--teal); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.sec-card h3 { font-family: var(--serif); font-size: 22px; font-weight: 400; color: var(--navy-darkest); margin-bottom: 10px; }
.sec-card p { flex: 1; font-size: 14.5px; line-height: 1.6; color: var(--text-secondary); }

/* Details */
.sec-details { padding: 96px 48px; background: var(--navy-deep); color: white; }
.sec-details-inner { max-width: 1100px; margin: 0 auto; }
.sec-details .sec-slbl { color: var(--coral); }
.sec-details .sec-stitle { color: white; }
.sec-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.sec-detail-item { padding: 32px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; transition: all 0.3s; }
.sec-detail-item:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); }
.sec-detail-item h4 { font-family: var(--sans); font-size: 16px; font-weight: 600; color: white; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
.sec-detail-item h4 .sec-check { width: 22px; height: 22px; border-radius: 6px; background: rgba(13,115,119,0.2); color: var(--teal); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sec-detail-item p { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.55); padding-left: 32px; }

/* BAA */
.sec-baa { padding: 96px 48px; background: var(--bg-warm); }
.sec-baa-inner { max-width: 900px; margin: 0 auto; text-align: center; }
.sec-baa h2 { font-family: var(--serif); font-size: 38px; font-weight: 400; color: var(--navy-darkest); letter-spacing: -0.6px; margin-bottom: 16px; }
.sec-baa-desc { font-size: 17px; line-height: 1.65; color: var(--text-secondary); max-width: 600px; margin: 0 auto 40px; }
.sec-baa-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 700px; margin: 0 auto 40px; text-align: left; }
.sec-baa-item { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; color: var(--text); line-height: 1.5; padding: 16px 20px; background: white; border: 1px solid var(--border); border-radius: 12px; }
.sec-baa-item-icon { flex-shrink: 0; width: 22px; height: 22px; border-radius: 6px; background: var(--teal-light); color: var(--teal); display: flex; align-items: center; justify-content: center; margin-top: 1px; }
.sec-baa-cta { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: var(--coral); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: var(--sans); cursor: pointer; text-decoration: none; transition: all 0.25s; }
.sec-baa-cta:hover { background: #BF5535; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,97,62,0.25); }

/* Architecture */
.sec-arch { padding: 96px 48px; background: var(--bg); }
.sec-arch-inner { max-width: 900px; margin: 0 auto; }
.sec-arch-flow { display: flex; flex-direction: column; gap: 0; margin-top: 48px; }
.sec-arch-step { display: flex; align-items: flex-start; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--border); }
.sec-arch-step:last-child { border-bottom: none; }
.sec-arch-num { width: 36px; height: 36px; border-radius: 10px; background: rgba(45,58,78,0.06); color: var(--navy); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; margin-top: 2px; }
.sec-arch-step h4 { font-size: 16px; font-weight: 600; color: var(--navy-darkest); margin-bottom: 6px; }
.sec-arch-step p { font-size: 14.5px; line-height: 1.6; color: var(--text-secondary); }

/* Footer */
.sec-footer { padding: 48px; background: var(--navy-darkest); text-align: center; }
.sec-footer-inner { max-width: 600px; margin: 0 auto; }
.sec-footer p { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-bottom: 16px; }
.sec-footer a { color: rgba(255,255,255,0.6); text-decoration: none; transition: color 0.2s; }
.sec-footer a:hover { color: white; }

/* Responsive */
@media (max-width: 900px) {
  .sec-nav { padding: 0 24px; }
  .sec-nav-links { display: none; }
  .sec-nav-mob { display: block; }
  .sec-hero { padding: 120px 24px 60px; }
  .sec-hero h1 { font-size: 36px; }
  .sec-principles, .sec-details, .sec-baa, .sec-arch { padding: 72px 24px; }
  .sec-grid { grid-template-columns: 1fr; }
  .sec-detail-grid { grid-template-columns: 1fr; }
  .sec-baa-items { grid-template-columns: 1fr; }
  .sec-stitle { font-size: 32px; }
}
`;

export default function SecurityPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("tether-fonts")) return;
    const link = document.createElement("link");
    link.id = "tether-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <><style>{CSS}</style>
    <div className="sec-page">

      {/* NAV */}
      <nav className="sec-nav">
        <a href="/" className="sec-nav-logo">
          <Image src="/LOGO.jpeg" alt="Tether" width={30} height={30} style={{ objectFit: "contain" }} />
          <span className="sec-nav-logo-text">Tether</span>
        </a>
        <ul className="sec-nav-links">
          <li><a href="/#product">Product</a></li>
          <li><a href="/#platform">Platform</a></li>
          <li><a href="/#specialists">For Specialists</a></li>
          <li><a href="/#network">The Network</a></li>
          <li><a href="/security" style={{ color: "var(--navy-deep)", fontWeight: 600 }}>Security</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer" className="sec-nav-cta">Request Demo</a></li>
        </ul>
        <button className="sec-nav-mob" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </nav>
      {mobileMenuOpen && (
        <div className="sec-nav-overlay">
          <button className="sec-nav-overlay-close" aria-label="Close" onClick={() => setMobileMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <a href="/#product" onClick={() => setMobileMenuOpen(false)}>Product</a>
          <a href="/#platform" onClick={() => setMobileMenuOpen(false)}>Platform</a>
          <a href="/#specialists" onClick={() => setMobileMenuOpen(false)}>For Specialists</a>
          <a href="/#network" onClick={() => setMobileMenuOpen(false)}>The Network</a>
          <a href="/security" onClick={() => setMobileMenuOpen(false)}>Security</a>
          <a href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</a>
          <a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer" className="sec-nav-overlay-cta" onClick={() => setMobileMenuOpen(false)}>Request Demo</a>
        </div>
      )}

      {/* HERO */}
      <section className="sec-hero">
        <div className="sec-hero-inner">
          <Reveal>
            <div className="sec-hero-icon"><IconShield /></div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1>Security at Tether Health</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="sec-hero-sub">
              Tether is built for healthcare from the ground up. Every architectural decision, from database design to API structure, is made with patient data protection as the primary constraint.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="sec-hero-badges">
              <div className="sec-hero-badge"><div className="sec-hero-badge-dot" />HIPAA Compliant</div>
              <div className="sec-hero-badge"><div className="sec-hero-badge-dot" />BAA Available</div>
              <div className="sec-hero-badge"><div className="sec-hero-badge-dot" />SOC 2 In Progress</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECURITY PRINCIPLES */}
      <section className="sec-principles">
        <div className="sec-principles-inner">
          <Reveal><div className="sec-slbl">Our Approach</div></Reveal>
          <Reveal delay={0.1}><div className="sec-stitle">Built for healthcare. Not retrofitted.</div></Reveal>
          <div className="sec-grid">
            <Reveal delay={0.1}>
              <div className="sec-card">
                <div className="sec-card-icon"><IconLock /></div>
                <h3>Encryption Everywhere</h3>
                <p>All protected health information (PHI) is encrypted at rest using AES-256 and in transit using TLS 1.3. Database fields containing patient data use column-level encryption with keys managed through a dedicated key management service.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="sec-card">
                <div className="sec-card-icon"><IconServer /></div>
                <h3>Isolated Infrastructure</h3>
                <p>Each practice&apos;s data is logically isolated using row-level security (RLS) policies enforced at the database level. No practice can access, query, or view another practice&apos;s patient data under any circumstance.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="sec-card">
                <div className="sec-card-icon"><IconEye /></div>
                <h3>Minimum Necessary Access</h3>
                <p>Tether follows the HIPAA minimum necessary standard. Users only see the data required for their role. Role-based access controls (RBAC) are enforced at the application and database layers.</p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="sec-card">
                <div className="sec-card-icon"><IconFile /></div>
                <h3>Audit Logging</h3>
                <p>Every access to PHI is logged with timestamp, user identity, action type, and affected records. Audit logs are immutable, retained for a minimum of 6 years, and available for compliance review on request.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="sec-card">
                <div className="sec-card-icon"><IconUsers /></div>
                <h3>Workforce Training</h3>
                <p>All Tether team members complete HIPAA training before accessing any system that handles PHI. Training is refreshed annually and supplemented with ongoing security awareness education.</p>
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="sec-card">
                <div className="sec-card-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3>Incident Response</h3>
                <p>Tether maintains a documented incident response plan with defined escalation paths, notification timelines compliant with the HIPAA Breach Notification Rule, and post-incident review procedures.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TECHNICAL DETAILS */}
      <section className="sec-details">
        <div className="sec-details-inner">
          <Reveal><div className="sec-slbl">Technical Safeguards</div></Reveal>
          <Reveal delay={0.1}><div className="sec-stitle">How we protect your data</div></Reveal>
          <div className="sec-detail-grid">
            <Reveal delay={0.1}>
              <div className="sec-detail-item">
                <h4><span className="sec-check"><IconCheck /></span>Data Encryption</h4>
                <p>AES-256 encryption at rest. TLS 1.3 for all data in transit. Column-level encryption for PHI fields in PostgreSQL. Encryption keys rotated on a scheduled basis.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="sec-detail-item">
                <h4><span className="sec-check"><IconCheck /></span>Authentication</h4>
                <p>Multi-factor authentication available for all accounts. Session tokens are short-lived with automatic expiration. Password policies enforce complexity and rotation requirements.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="sec-detail-item">
                <h4><span className="sec-check"><IconCheck /></span>Network Security</h4>
                <p>All traffic routed through HTTPS. API endpoints are rate-limited and protected against common attack vectors including SQL injection, XSS, and CSRF. Infrastructure monitored 24/7.</p>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="sec-detail-item">
                <h4><span className="sec-check"><IconCheck /></span>Data Backup &amp; Recovery</h4>
                <p>Automated daily backups with point-in-time recovery capability. Backups are encrypted and stored in geographically separate regions. Recovery procedures tested quarterly.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="sec-detail-item">
                <h4><span className="sec-check"><IconCheck /></span>Referral Document Handling</h4>
                <p>Uploaded referral PDFs are processed in memory, parsed by AI, and stored in encrypted object storage. Documents are never cached in plaintext. Access is scoped to the sending and receiving practice only.</p>
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="sec-detail-item">
                <h4><span className="sec-check"><IconCheck /></span>Fax Transmission Security</h4>
                <p>E-fax transmissions are sent via a HIPAA-compliant fax provider with a signed BAA. Fax documents are encrypted during transmission and at rest. Delivery confirmations are logged and auditable.</p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="sec-detail-item">
                <h4><span className="sec-check"><IconCheck /></span>SMS &amp; Patient Communication</h4>
                <p>Patient notifications sent via HIPAA-compliant messaging provider with a signed BAA. Messages contain minimum necessary information. TCPA consent is obtained and recorded before any outreach.</p>
              </div>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="sec-detail-item">
                <h4><span className="sec-check"><IconCheck /></span>Vendor Management</h4>
                <p>All third-party vendors that process, store, or transmit PHI are evaluated for HIPAA compliance and required to execute Business Associate Agreements before integration.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DATA FLOW */}
      <section className="sec-arch">
        <div className="sec-arch-inner">
          <Reveal><div className="sec-slbl">Data Architecture</div></Reveal>
          <Reveal delay={0.1}><div className="sec-stitle">How a referral flows through Tether</div></Reveal>
          <div className="sec-arch-flow">
            <Reveal delay={0.1}>
              <div className="sec-arch-step">
                <div className="sec-arch-num">1</div>
                <div>
                  <h4>Referral Created</h4>
                  <p>Practice user uploads a referral PDF or fills the form. Data is transmitted over TLS 1.3 to Tether&apos;s API. Input is validated and sanitized server-side before processing.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="sec-arch-step">
                <div className="sec-arch-num">2</div>
                <div>
                  <h4>AI Document Processing</h4>
                  <p>The PDF is parsed using AI models to extract structured patient data. Processing occurs in an isolated compute environment. The original PDF is stored encrypted. Extracted data is written to the practice&apos;s RLS-scoped database rows.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="sec-arch-step">
                <div className="sec-arch-num">3</div>
                <div>
                  <h4>Referral Transmitted</h4>
                  <p>If the receiving practice is on Tether, the referral appears in their dashboard instantly via encrypted real-time channels. If not, an e-fax is generated and transmitted via HIPAA-compliant fax infrastructure with delivery confirmation.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="sec-arch-step">
                <div className="sec-arch-num">4</div>
                <div>
                  <h4>Status Tracking &amp; Loop Closure</h4>
                  <p>Both practices see referral status updates in real time. All status changes are logged in the audit trail. When the visit is completed, the referring provider is notified and the referral record is marked complete.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="sec-arch-step">
                <div className="sec-arch-num">5</div>
                <div>
                  <h4>Data Retention &amp; Deletion</h4>
                  <p>Referral data is retained according to healthcare record retention requirements (minimum 7 years). Practices can request data export or deletion in compliance with applicable regulations. Deletion is verified and logged.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BAA SECTION */}
      <section className="sec-baa">
        <div className="sec-baa-inner">
          <Reveal>
            <h2>Business Associate Agreements</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="sec-baa-desc">
              Tether executes a Business Associate Agreement (BAA) with every practice before any PHI is processed. Our BAA covers all aspects of the Tether platform.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="sec-baa-items">
              <div className="sec-baa-item"><div className="sec-baa-item-icon"><IconCheck /></div>BAA provided to all practices at no additional cost</div>
              <div className="sec-baa-item"><div className="sec-baa-item-icon"><IconCheck /></div>Covers referral data, patient communications, and document storage</div>
              <div className="sec-baa-item"><div className="sec-baa-item-icon"><IconCheck /></div>Signed BAAs in place with all subprocessors (database, fax, SMS)</div>
              <div className="sec-baa-item"><div className="sec-baa-item-icon"><IconCheck /></div>Available for review before onboarding begins</div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="mailto:support@tetherhealth.co?subject=BAA%20Request%20-%20Tether%20Health&body=Hi%2C%0A%0AI%E2%80%99d%20like%20to%20request%20a%20copy%20of%20Tether%E2%80%99s%20BAA%20for%20review.%0A%0APractice%20name%3A%0AContact%20name%3A%0A%0AThank%20you" className="sec-baa-cta">
              Request a BAA <IconArrowRight />
            </a>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sec-footer">
        <div className="sec-footer-inner">
          <p>
            Have questions about Tether&apos;s security practices? Contact our team at{" "}
            <a href="mailto:support@tetherhealth.co">support@tetherhealth.co</a>
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            &copy; 2026 Tether Health, Inc. All rights reserved.{" "}
            <a href="/" style={{ marginLeft: 16 }}>Back to Home</a>
            <a href="/blog" style={{ marginLeft: 16 }}>Blog</a>
          </p>
        </div>
      </footer>

    </div></>
  );
}
