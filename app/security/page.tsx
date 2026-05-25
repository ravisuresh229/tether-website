"use client";
import React, { useState, useEffect, useRef } from "react";

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
  --sec-bg: #F7F5F0;
  --sec-bg-warm: #EFEDE8;
  --sec-surface: #FFFFFF;
  --sec-text: #0C0D0F;
  --sec-text-secondary: #3D3B38;
  --sec-text-tertiary: #8C8A85;
  --sec-teal: #00A882;
  --sec-teal-dark: #007A5E;
  --sec-teal-tint: rgba(0,168,130,0.08);
  --sec-teal-border: rgba(0,168,130,0.15);
  --sec-coral: #E8501A;
  --sec-coral-hover: #CC4615;
  --sec-orange-muted: #A03A10;
  --sec-border: rgba(0,0,0,0.08);
  --sec-border-soft: rgba(0,0,0,0.06);
  --sec-serif: var(--font-serif), Georgia, serif;
  --sec-sans: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
}
.sec-page, .sec-page * { box-sizing: border-box; }
.sec-page {
  font-family: var(--sec-sans);
  color: var(--sec-text);
  background: var(--sec-bg);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
.sec-page ::selection { background: var(--sec-teal); color: #fff; }

/* Hero */
.sec-hero { padding: 152px 48px 80px; text-align: center; position: relative; overflow: hidden; }
.sec-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 380px; background: radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,168,130,0.08) 0%, transparent 70%); pointer-events: none; }
.sec-hero-inner { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }
.sec-hero-icon { width: 72px; height: 72px; border-radius: 12px; background: var(--sec-teal-tint); border: 1px solid var(--sec-teal-border); color: var(--sec-teal); display: flex; align-items: center; justify-content: center; margin: 0 auto 32px; }
.sec-hero-icon svg { width: 36px; height: 36px; }
.sec-hero h1 { font-family: var(--sec-serif); font-size: clamp(36px, 5vw, 52px); line-height: 1.08; font-weight: 400; color: var(--sec-text); letter-spacing: -1.2px; margin-bottom: 20px; }
.sec-hero-sub { font-size: 18px; line-height: 1.65; color: var(--sec-text-secondary); max-width: 600px; margin: 0 auto 40px; }
.sec-hero-badges { display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
.sec-hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: var(--sec-surface); border: 1px solid var(--sec-border); border-radius: 100px; font-size: 13px; font-weight: 500; color: var(--sec-text); }
.sec-hero-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--sec-teal); }
.sec-hero-badge-dot-planned { background: var(--sec-coral); opacity: 0.7; }

/* Principles */
.sec-principles { padding: 96px 48px; background: var(--sec-bg); }
.sec-principles-inner { max-width: 1100px; margin: 0 auto; }
.sec-slbl { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: var(--sec-teal); margin-bottom: 16px; }
.sec-stitle { font-family: var(--sec-serif); font-size: clamp(28px, 4vw, 40px); line-height: 1.12; font-weight: 400; color: var(--sec-text); letter-spacing: -0.8px; margin-bottom: 56px; }
.sec-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; align-items: stretch; }
.sec-grid > * { min-width: 0; }
.sec-card { height: 100%; min-height: 280px; display: flex; flex-direction: column; background: var(--sec-surface); border: 1px solid rgba(0,0,0,0.07); border-radius: 16px; padding: 32px 28px; transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease; }
.sec-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(10,11,15,0.06); border-color: rgba(0,168,130,0.2); }
.sec-card-icon { width: 44px; height: 44px; border-radius: 12px; background: var(--sec-teal-tint); color: var(--sec-teal); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.sec-card h3 { font-family: var(--sec-serif); font-size: 22px; font-weight: 400; color: var(--sec-text); margin-bottom: 10px; letter-spacing: -0.01em; }
.sec-card p { flex: 1; font-size: 14.5px; line-height: 1.6; color: var(--sec-text-secondary); }

/* Details — dark island on light page */
.sec-details { padding: 96px 48px; background: #0C0D0F; color: #fff; }
.sec-details-inner { max-width: 1100px; margin: 0 auto; }
.sec-details .sec-slbl { color: #4CE7CC; }
.sec-details .sec-stitle { color: #fff; }
.sec-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.sec-detail-item { padding: 28px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; transition: all 0.3s; }
.sec-detail-item:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); }
.sec-detail-item h4 { font-family: var(--sec-sans); font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
.sec-detail-item h4 .sec-check { width: 22px; height: 22px; border-radius: 6px; background: rgba(0,168,130,0.2); color: #4CE7CC; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sec-detail-item p { font-size: 14px; line-height: 1.6; color: rgba(255,255,255,0.65); padding-left: 32px; margin: 0; }

/* BAA */
.sec-baa { padding: 96px 48px; background: var(--sec-bg-warm); }
.sec-baa-inner { max-width: 900px; margin: 0 auto; text-align: center; }
.sec-baa h2 { font-family: var(--sec-serif); font-size: clamp(28px, 4vw, 38px); font-weight: 400; color: var(--sec-text); letter-spacing: -0.6px; margin-bottom: 16px; }
.sec-baa-desc { font-size: 17px; line-height: 1.65; color: var(--sec-text-secondary); max-width: 600px; margin: 0 auto 40px; }
.sec-baa-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 700px; margin: 0 auto 40px; text-align: left; }
.sec-baa-item { display: flex; align-items: flex-start; gap: 12px; font-size: 14.5px; color: var(--sec-text); line-height: 1.5; padding: 16px 20px; background: var(--sec-surface); border: 1px solid var(--sec-border); border-radius: 12px; }
.sec-baa-item-icon { flex-shrink: 0; width: 22px; height: 22px; border-radius: 6px; background: var(--sec-teal-tint); color: var(--sec-teal); display: flex; align-items: center; justify-content: center; margin-top: 1px; }
.sec-baa-cta { display: inline-flex; align-items: center; gap: 10px; padding: 13px 26px; background: var(--sec-coral); color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; font-family: var(--sec-sans); cursor: pointer; text-decoration: none; transition: all 0.25s; }
.sec-baa-cta:hover { background: var(--sec-coral-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,80,26,0.25); }

/* Architecture */
.sec-arch { padding: 96px 48px; background: var(--sec-bg); }
.sec-arch-inner { max-width: 900px; margin: 0 auto; }
.sec-arch-flow { display: flex; flex-direction: column; gap: 0; margin-top: 48px; }
.sec-arch-step { display: flex; align-items: flex-start; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--sec-border-soft); }
.sec-arch-step:last-child { border-bottom: none; }
.sec-arch-num { width: 36px; height: 36px; border-radius: 10px; background: var(--sec-teal-tint); color: var(--sec-teal); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0; margin-top: 2px; }
.sec-arch-step h4 { font-size: 16px; font-weight: 600; color: var(--sec-text); margin-bottom: 6px; }
.sec-arch-step p { font-size: 14.5px; line-height: 1.6; color: var(--sec-text-secondary); }

/* Responsive */
@media (max-width: 900px) {
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
  return (
    <><style>{CSS}</style>
    <div className="sec-page">

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
              <div className="sec-hero-badge"><div className="sec-hero-badge-dot sec-hero-badge-dot-planned" />SOC 2 Planned</div>
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
                <p>All protected health information (PHI) is encrypted at rest using AES-256 and in transit using TLS 1.2+. Row-level security (RLS) policies ensure complete practice-level data isolation at the database layer.</p>
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
                <p>HIPAA training required for all team members with access to PHI. Training is supplemented with ongoing security awareness education.</p>
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
                <p>AES-256 encryption at rest. TLS 1.2+ for all data in transit. Row-level security (RLS) policies ensure practice-level data isolation in PostgreSQL. Encryption keys managed through secure infrastructure.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="sec-detail-item">
                <h4><span className="sec-check"><IconCheck /></span>Authentication</h4>
                <p>Multi-factor authentication for administrative access. Session tokens are short-lived with automatic expiration. Password policies enforce complexity requirements.</p>
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
                <p>Automated daily backups with point-in-time recovery capability. Backups are encrypted and stored in geographically separate regions.</p>
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
                  <p>Practice user uploads a referral PDF or fills the form. Data is transmitted over TLS 1.2+ to Tether&apos;s API. Input is validated and sanitized server-side before processing.</p>
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
              <div className="sec-baa-item"><div className="sec-baa-item-icon"><IconCheck /></div>BAAs executed with infrastructure providers handling PHI. Full subprocessor list available upon request</div>
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

    </div></>
  );
}
