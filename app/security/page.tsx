import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Tether protects patient data: encryption everywhere, practice-level isolation, immutable audit logs, and BAAs before any PHI is processed.",
};

const CSS = `
.flow{display:grid;grid-template-columns:200px 1fr;gap:32px;padding:28px 0;border-bottom:1px solid var(--thread)}
.flow:last-child{border-bottom:none}
.flow .n{font-family:var(--mono);font-size:13px;color:var(--signal);letter-spacing:.06em}
.flow h3{font-weight:600;font-size:18px;letter-spacing:-.01em}
.flow p{font-size:14.5px;color:var(--slate);margin-top:7px;line-height:1.65;max-width:60ch}
@media(max-width:900px){.flow{grid-template-columns:1fr;gap:6px}}
`;

export default function SecurityPage() {
  return (
    <>
      <style>{CSS}</style>

      <header className="page-head wrap">
        <span className="eyebrow fade">Security</span>
        <h1 className="fade">
          Built for healthcare. <span className="em">Not retrofitted.</span>
        </h1>
        <p className="fade">
          Every decision, from database design to API structure, treats patient data protection as
          the first constraint, not an afterthought.
        </p>
        <div className="badges fade">
          <span className="badge">
            <i></i>HIPAA compliant
          </span>
          <span className="badge">
            <i></i>BAA available
          </span>
          <span className="badge">
            <i></i>SOC 2 planned
          </span>
        </div>
      </header>

      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head fade">
            <span className="eyebrow">Core safeguards</span>
            <h2>How we protect your data.</h2>
          </div>
          <div className="cardgrid c3 stagger">
            <div className="card hover">
              <h3>Encryption everywhere</h3>
              <p>
                PHI is encrypted at rest with AES-256 and in transit over TLS 1.2+. Encryption keys
                are managed through secure infrastructure.
              </p>
            </div>
            <div className="card hover">
              <h3>Practice-level isolation</h3>
              <p>
                Row-level security at the database layer means no practice can ever access, query,
                or view another practice&apos;s data.
              </p>
            </div>
            <div className="card hover">
              <h3>Minimum necessary access</h3>
              <p>
                Role-based controls at the application and database layers. People see only the
                data their role requires.
              </p>
            </div>
            <div className="card hover">
              <h3>Immutable audit logs</h3>
              <p>
                Every access to PHI is logged with user, action, timestamp, and records, retained
                at least six years for review.
              </p>
            </div>
            <div className="card hover">
              <h3>Authentication</h3>
              <p>
                MFA for administrative access, short-lived sessions with automatic expiry, and
                enforced password complexity.
              </p>
            </div>
            <div className="card hover">
              <h3>Incident response</h3>
              <p>
                A documented plan with defined escalation paths and breach-notification timelines
                compliant with HIPAA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head fade">
            <span className="eyebrow">Data flow</span>
            <h2>
              How a referral moves <span className="em">through</span> Tether.
            </h2>
          </div>
          <div className="fade">
            <div className="flow">
              <div className="n">01</div>
              <div>
                <h3>Created</h3>
                <p>
                  A user uploads a referral or fills the form. Data travels over TLS 1.2+ to
                  Tether&apos;s API, validated and sanitized server-side.
                </p>
              </div>
            </div>
            <div className="flow">
              <div className="n">02</div>
              <div>
                <h3>Processed</h3>
                <p>
                  AI extracts structured patient data in an isolated environment. The original
                  document is stored encrypted; extracted data is written to the practice&apos;s
                  isolated rows.
                </p>
              </div>
            </div>
            <div className="flow">
              <div className="n">03</div>
              <div>
                <h3>Transmitted</h3>
                <p>
                  If the receiving practice is on Tether, the referral appears instantly over
                  encrypted channels. If not, a HIPAA-compliant e-fax is sent with delivery
                  confirmation.
                </p>
              </div>
            </div>
            <div className="flow">
              <div className="n">04</div>
              <div>
                <h3>Tracked &amp; closed</h3>
                <p>
                  Both sides see status in real time, every change logged. When the visit
                  completes, the referring provider is notified and the record is closed.
                </p>
              </div>
            </div>
            <div className="flow">
              <div className="n">05</div>
              <div>
                <h3>Retained or deleted</h3>
                <p>
                  Data is retained to healthcare record requirements. Practices can request export
                  or deletion; deletion is verified and logged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="prose fade">
            <h2>Business Associate Agreements</h2>
            <p>
              Tether executes a BAA with every practice before any PHI is processed, at no
              additional cost. Our BAA covers referral data, patient communications, and document
              storage.
            </p>
            <ul>
              <li>Provided to all practices before onboarding begins, available for review in advance.</li>
              <li>BAAs are also executed with every infrastructure provider that handles PHI.</li>
              <li>A full subprocessor list is available on request.</li>
            </ul>
            <p className="muted">
              Questions about our security practices? Email{" "}
              <a href="mailto:support@tetherhealth.co" style={{ color: "var(--signal-deep)" }}>
                support@tetherhealth.co
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap">
          <h2 className="fade">
            Security you can <span className="em">put in front of</span> compliance.
          </h2>
          <p className="fade">
            We&apos;re happy to walk your team through the architecture and share our BAA before
            you commit to anything.
          </p>
          <Link href="/request-demo" className="btn btn-primary fade">
            Request a demo <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
