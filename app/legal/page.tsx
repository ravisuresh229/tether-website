"use client";

import { useEffect, useState } from "react";

const CSS = `
.legal-layout{display:grid;grid-template-columns:200px 1fr;gap:50px;align-items:start}
.legal-nav{position:sticky;top:120px}
.legal-nav a{display:block;font-family:var(--mono);font-size:12.5px;color:var(--slate);padding:8px 0 8px 16px;border-left:1.5px solid var(--thread);transition:color .2s,border-color .2s}
.legal-nav a:hover,.legal-nav a.active{color:var(--ink);border-color:var(--signal)}
.legal-section{scroll-margin-top:110px;padding-bottom:50px;border-bottom:1px solid var(--thread);margin-bottom:50px}
.legal-section:last-child{border-bottom:none}
.legal-section .muted{font-family:var(--mono);font-size:11.5px;color:var(--slate);letter-spacing:.04em;margin-bottom:10px}
@media(max-width:900px){.legal-layout{grid-template-columns:1fr;gap:24px}.legal-nav{position:static;display:flex;gap:0;flex-wrap:wrap}.legal-nav a{border-left:none;border-bottom:1.5px solid var(--thread);padding:8px 14px}}
`;

const SECTIONS = [
  { id: "privacy", label: "Privacy" },
  { id: "terms", label: "Terms of Service" },
  { id: "hipaa", label: "HIPAA Notice" },
];

export default function LegalPage() {
  const [active, setActive] = useState("privacy");

  useEffect(() => {
    const onScroll = () => {
      let cur = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 140) cur = s.id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <header className="page-head wrap">
        <span className="eyebrow fade">Legal</span>
        <h1 className="fade">
          The fine print, <span className="em">in plain terms.</span>
        </h1>
        <p className="fade">
          How we handle your data, the terms of using Tether, and your rights under HIPAA. Last
          updated June 2026.
        </p>
      </header>

      <section style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="legal-layout">
            <div className="legal-nav fade">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`} className={active === s.id ? "active" : ""}>
                  {s.label}
                </a>
              ))}
            </div>
            <div className="prose fade">
              <div className="legal-section" id="privacy">
                <div className="muted">PRIVACY POLICY</div>
                <h2>What we collect and why</h2>
                <p>
                  Tether processes protected health information solely to provide referral
                  coordination on behalf of the practices we serve. We act as a business associate
                  under HIPAA, not as a data broker. We do not sell personal or health information,
                  and we do not use it for advertising.
                </p>
                <h3>Information we handle</h3>
                <ul>
                  <li>
                    Patient demographics, insurance, and clinical detail contained in referrals,
                    processed only to route and track those referrals.
                  </li>
                  <li>Practice and user account information needed to operate the service.</li>
                  <li>Usage and audit data, logged to keep the platform secure and accountable.</li>
                </ul>
                <h3>How long we keep it</h3>
                <p>
                  Referral data is retained to meet healthcare record requirements. Practices may
                  request export or deletion at any time, subject to those requirements; deletion
                  is verified and logged.
                </p>
                <p className="muted">Questions: support@tetherhealth.co</p>
              </div>

              <div className="legal-section" id="terms">
                <div className="muted">TERMS OF SERVICE</div>
                <h2>Using Tether</h2>
                <p>
                  By using Tether, a practice agrees to these terms and to the Business Associate
                  Agreement executed before any PHI is processed. The service is provided to
                  licensed healthcare practices and their authorized staff.
                </p>
                <h3>Your responsibilities</h3>
                <ul>
                  <li>Keep account credentials secure and limit access to authorized staff.</li>
                  <li>Use the platform in compliance with applicable healthcare and privacy law.</li>
                  <li>
                    Ensure the clinical accuracy of referrals before they are sent; Tether assists
                    with drafting and coordination but does not practice medicine.
                  </li>
                </ul>
                <h3>Availability and changes</h3>
                <p>
                  We work to keep Tether available and secure, and will give reasonable notice of
                  material changes to these terms. Continued use after an update constitutes
                  acceptance.
                </p>
              </div>

              <div className="legal-section" id="hipaa">
                <div className="muted">HIPAA NOTICE</div>
                <h2>Your rights and our role</h2>
                <p>
                  Tether operates as a business associate to the covered entities (practices) that
                  use the platform. We process PHI only as permitted by our Business Associate
                  Agreement and by law.
                </p>
                <h3>How we safeguard PHI</h3>
                <ul>
                  <li>
                    Encryption at rest (AES-256) and in transit (TLS 1.2+), with practice-level
                    data isolation.
                  </li>
                  <li>
                    Minimum-necessary, role-based access, and immutable audit logging retained at
                    least six years.
                  </li>
                  <li>
                    A documented incident-response plan with breach-notification timelines
                    compliant with HIPAA.
                  </li>
                </ul>
                <p>
                  Patients should direct requests about their records to their practice, which is
                  the covered entity. Practices can reach our team for any compliance matter,
                  including BAA review and subprocessor lists.
                </p>
                <p className="muted">Compliance contact: support@tetherhealth.co</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
