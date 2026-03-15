"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ClaimData = {
  referringPracticeName: string | null;
  receivingPractice: {
    name: string;
    address: string;
    specialty: string;
    providerCount?: number;
  };
};

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function ClaimPage() {
  const params = useParams();
  const token = typeof params?.token === "string" ? params.token : "";
  const [data, setData] = useState<ClaimData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError(true);
      return;
    }
    fetch(`/api/claim/${encodeURIComponent(token)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((d: ClaimData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [token]);

  const headline = data?.referringPracticeName
    ? `${data.referringPracticeName} sent you a referral via Tether.`
    : "A referring provider sent you a patient referral via Tether.";
  const sub = "A patient has been referred to your practice and is waiting to be scheduled.";
  const practice = data?.receivingPractice;

  if (loading) {
    return (
      <div className="claim-page">
        <style>{CLAIM_CSS}</style>
        <div className="claim-bg">
          <div className="claim-inner">
            <div className="claim-loading">Loading…</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="claim-page">
        <style>{CLAIM_CSS}</style>
        <div className="claim-bg">
          <div className="claim-inner">
            <p className="claim-error">This link may be invalid or expired. Please contact the referring practice or Tether support.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="claim-page">
      <style>{CLAIM_CSS}</style>
      <div className="claim-bg">
        <div className="claim-inner">
          {/* 1. Tether logo */}
          <Link href="/" className="claim-logo">
            <Image src="/LOGO.jpeg" alt="Tether" width={36} height={36} style={{ objectFit: "contain" }} />
            <span className="claim-logo-text">Tether</span>
          </Link>

          {/* 2. Headline */}
          <h1 className="claim-headline">{headline}</h1>

          {/* 3. Patient context subtitle */}
          <p className="claim-subtitle">{sub}</p>

          {/* 4. Practice info card */}
          <div className="claim-card">
            <h2 className="claim-card-title">Your practice</h2>
            {practice?.name && <div className="claim-card-name">{practice.name}</div>}
            {practice?.address && <div className="claim-card-address">{practice.address}</div>}
            {practice?.specialty && <div className="claim-card-specialty">{practice.specialty}</div>}
            {typeof practice?.providerCount === "number" && (
              <div className="claim-card-providers">{practice.providerCount} provider{practice.providerCount !== 1 ? "s" : ""} listed</div>
            )}
          </div>

          {/* 5. Value props */}
          <ul className="claim-value-list">
            <li>
              <span className="claim-value-icon"><CheckIcon /></span>
              <span><strong>See the full referral now</strong> — including patient details, clinical context, and insurance information</span>
            </li>
            <li>
              <span className="claim-value-icon"><CheckIcon /></span>
              <span><strong>Schedule the patient directly</strong> — and update the referring provider with one click</span>
            </li>
            <li>
              <span className="claim-value-icon"><CheckIcon /></span>
              <span><strong>Get found by more PCPs</strong> — through the Tether specialist directory with 940+ providers</span>
            </li>
          </ul>

          {/* 6. CTA */}
          <Link href={`/signup?claim=${encodeURIComponent(token)}`} className="claim-cta">
            View Referral — Free
          </Link>

          {/* 7. Trust badges */}
          <div className="claim-trust">
            <span className="claim-trust-item"><span className="claim-trust-icon"><ShieldIcon /></span> HIPAA Compliant</span>
            <span className="claim-trust-item"><span className="claim-trust-icon"><LockIcon /></span> BAA Protected</span>
            <span className="claim-trust-item"><span className="claim-trust-icon"><GlobeIcon /></span> 256-bit Encryption</span>
          </div>

          {/* 8. Social proof */}
          <p className="claim-social">Join 940+ providers already on the Tether network.</p>

          {/* 9. Not your practice? */}
          <p className="claim-disclaimer">Not your practice? You can ignore this message or contact support@tetherhealth.co if you believe you received this in error.</p>
        </div>
      </div>
    </div>
  );
}

const CLAIM_CSS = `
.claim-page { font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif; color: #2D2D2D; -webkit-font-smoothing: antialiased; }
.claim-bg { min-height: 100vh; background: #FAFAF9; padding: 48px 24px 80px; }
.claim-inner { max-width: 480px; margin: 0 auto; background: #fff; border-radius: 16px; border: 1px solid #E8E6E3; padding: 40px 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.claim-logo { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; color: #1E2A3A; margin-bottom: 32px; }
.claim-logo-text { font-weight: 600; font-size: 22px; letter-spacing: -0.5px; }
.claim-headline { font-size: 22px; font-weight: 700; line-height: 1.3; color: #151F2B; margin: 0 0 12px; letter-spacing: -0.02em; }
.claim-subtitle { font-size: 15px; color: #6B6B6B; line-height: 1.5; margin: 0 0 28px; }
.claim-card { background: #FAFAF9; border: 1px solid #E8E6E3; border-radius: 12px; padding: 20px 20px; margin-bottom: 28px; }
.claim-card-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #9A9A9A; margin: 0 0 10px; }
.claim-card-name { font-size: 16px; font-weight: 600; color: #151F2B; margin-bottom: 6px; }
.claim-card-address, .claim-card-specialty, .claim-card-providers { font-size: 14px; color: #6B6B6B; line-height: 1.45; }
.claim-card-address { margin-bottom: 4px; }
.claim-card-providers { margin-top: 8px; font-size: 13px; color: #9A9A9A; }
.claim-value-list { list-style: none; margin: 0 0 28px; padding: 0; }
.claim-value-list li { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; font-size: 14px; line-height: 1.5; color: #2D2D2D; }
.claim-value-icon { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: #E8F4F4; color: #0D7377; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
.claim-cta { display: block; width: 100%; text-align: center; padding: 16px 24px; background: #2D3A4E; color: #fff; font-size: 16px; font-weight: 600; border-radius: 10px; text-decoration: none; transition: background 0.2s, transform 0.15s; }
.claim-cta:hover { background: #1E2A3A; transform: translateY(-1px); }
.claim-trust { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px 32px; margin-top: 28px; padding-top: 24px; border-top: 1px solid #E8E6E3; }
.claim-trust-item { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #6B6B6B; }
.claim-trust-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(45,58,78,0.06); color: #2D3A4E; display: inline-flex; align-items: center; justify-content: center; }
.claim-social { text-align: center; font-size: 13px; color: #9A9A9A; margin: 16px 0 0; }
.claim-disclaimer { text-align: center; font-size: 12px; color: #9A9A9A; margin: 24px 0 0; line-height: 1.5; }
.claim-loading, .claim-error { text-align: center; color: #6B6B6B; padding: 48px 24px; }
.claim-error { font-size: 14px; }
@media (max-width: 520px) {
  .claim-bg { padding: 24px 16px 64px; }
  .claim-inner { padding: 28px 20px; }
  .claim-headline { font-size: 20px; }
  .claim-trust { gap: 16px; }
}
`;
