"use client";

import Link from "next/link";
import { useRef } from "react";

const APP_SIGNUP_URL = "https://app.tetherhealth.co/signup";

function IconArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconInbox() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function IconUserCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  );
}

function IconFileText() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconRefreshCw() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconExpand() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export default function ForSpecialistsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <div className="fs-page">
      <style>{FS_CSS}</style>

      <main>
        <section className="fs-hero">
          <div className="fs-hero-inner">
            <div className="fs-slbl">FOR SPECIALISTS</div>
            <h1 className="fs-hero-title">Turn every referral into a scheduled visit.</h1>
            <p className="fs-hero-sub">
              Tether gives your practice a single place to receive referrals, manage intake, and close the loop with referring providers. No fax machines. No phone tag.
            </p>
            <Link href="/request-demo" className="fs-btn-teal">Request Demo</Link>
            <div className="fs-hero-video-wrap" onClick={handleVideoFullscreen}>
              <video ref={videoRef} autoPlay muted loop playsInline>
                <source src="/specialist-demo.mp4" type="video/mp4" />
              </video>
              <button type="button" className="fs-hero-video-expand" aria-label="Expand to fullscreen">
                <IconExpand />
              </button>
            </div>
          </div>
        </section>

        <section className="fs-stats">
          <div className="fs-stats-inner">
            <div className="fs-stat">
              <div className="fs-stat-n">50%</div>
              <div className="fs-stat-l">of referrals arrive with incomplete or missing clinical information</div>
            </div>
            <div className="fs-stat">
              <div className="fs-stat-n">22 min</div>
              <div className="fs-stat-l">average staff time to manually process one inbound referral</div>
            </div>
            <div className="fs-stat">
              <div className="fs-stat-n">54%</div>
              <div className="fs-stat-l">of faxed referrals ever get scheduled into an appointment</div>
            </div>
          </div>
        </section>

        <section className="fs-features">
          <div className="fs-features-inner">
            <div className="fs-slbl">What you get with Tether</div>
            <div className="fs-features-grid">
              <div className="fs-feature-card">
                <div className="fs-feature-icon"><IconInbox /></div>
                <h3>Centralized Referral Inbox</h3>
                <p>Every inbound referral in one dashboard. No more digging through faxes, portals, or voicemails.</p>
              </div>
              <div className="fs-feature-card">
                <div className="fs-feature-icon"><IconUserCheck /></div>
                <h3>Provider Assignment</h3>
                <p>Assign referrals to the right provider in your practice with one click. Track who is handling what.</p>
              </div>
              <div className="fs-feature-card">
                <div className="fs-feature-icon"><IconFileText /></div>
                <h3>AI-Parsed Intake</h3>
                <p>Tether reads referral PDFs and auto-extracts patient demographics, insurance, and clinical details.</p>
              </div>
              <div className="fs-feature-card">
                <div className="fs-feature-icon"><IconRefreshCw /></div>
                <h3>Automated Loop Closure</h3>
                <p>Update a referral status once. The referring provider is notified automatically. No callbacks needed.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="fs-steps">
          <div className="fs-steps-inner">
            <div className="fs-slbl">How Specialists Use Tether</div>
            <div className="fs-steps-grid">
              <div className="fs-step">
                <div className="fs-step-num">1</div>
                <h4>Receive</h4>
                <p>Referrals arrive in your Tether inbox with full patient context, parsed and ready.</p>
              </div>
              <div className="fs-step">
                <div className="fs-step-num">2</div>
                <h4>Manage</h4>
                <p>Assign to a provider, schedule the visit, add notes. Everything stays in one place.</p>
              </div>
              <div className="fs-step">
                <div className="fs-step-num">3</div>
                <h4>Close the Loop</h4>
                <p>Mark the referral complete. The referring PCP gets an instant update with your visit summary.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="fs-cta">
          <div className="fs-cta-inner">
            <h2 className="fs-cta-title">Join the Tether network.</h2>
            <p className="fs-cta-sub">Free during pilot. No contracts, no setup fees.</p>
            <div className="fs-cta-buttons">
              <Link href="/request-demo" className="fs-btn-teal">Request Demo</Link>
              <a href={APP_SIGNUP_URL} className="fs-btn-outline">Set Up Your Practice</a>
            </div>
          </div>
        </section>

        <section className="fs-trust">
          <div className="fs-trust-inner">
            <div className="fs-trust-grid">
              <div className="fs-trust-card">
                <div className="fs-trust-icon"><IconShield /></div>
                <h4>HIPAA Compliant</h4>
                <p>All data encrypted at rest and in transit</p>
              </div>
              <div className="fs-trust-card">
                <div className="fs-trust-icon"><IconLock /></div>
                <h4>Enterprise-Grade Encryption</h4>
                <p>All PHI encrypted at rest (AES-256) and in transit (TLS 1.2+)</p>
              </div>
              <div className="fs-trust-card">
                <div className="fs-trust-icon"><IconClock /></div>
                <h4>Quick Onboarding</h4>
                <p>Minimal setup, works alongside your existing EHR</p>
              </div>
              <div className="fs-trust-card">
                <div className="fs-trust-icon"><IconGlobe /></div>
                <h4>Works Alongside Your EMR</h4>
                <p>Runs alongside your existing EHR</p>
              </div>
            </div>
            <div className="fs-trust-link-wrap">
              <Link href="/security" className="fs-trust-link">Learn more about our security practices <IconArrowRight /></Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const FS_CSS = `
.fs-page { font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif; color: #0C0D0F; background: #F7F5F0; min-height: 100vh; -webkit-font-smoothing: antialiased; }
.fs-slbl { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #00A882; margin-bottom: 16px; }
.fs-hero { padding: 152px 48px 64px; text-align: center; max-width: 760px; margin: 0 auto; }
.fs-hero-title { font-family: var(--font-serif), Georgia, serif; font-size: clamp(34px, 5vw, 48px); line-height: 1.08; font-weight: 400; color: #0C0D0F; letter-spacing: -1px; margin-bottom: 20px; }
.fs-hero-sub { font-size: 18px; line-height: 1.65; color: #3D3B38; margin-bottom: 32px; }
.fs-btn-teal { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; background: #E8501A; color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; font-family: inherit; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.15s ease; }
.fs-btn-teal:hover { background: #CC4615; transform: translateY(-1px); }
.fs-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 13px 26px; background: transparent; color: #0C0D0F; border: 1.5px solid rgba(0,0,0,0.12); border-radius: 8px; font-size: 15px; font-weight: 500; font-family: inherit; cursor: pointer; text-decoration: none; transition: all 0.25s; }
.fs-btn-outline:hover { border-color: #00A882; color: #00A882; background: rgba(0,168,130,0.05); }
.fs-hero-video-wrap { position: relative; max-width: 900px; margin: 40px auto 0; border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 12px 32px rgba(10,11,15,0.08); background: #fff; cursor: pointer; }
.fs-hero-video-wrap video { display: block; width: 100%; height: auto; }
.fs-hero-video-expand { position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #fff; background: rgba(0,0,0,0.5); border-radius: 50%; border: none; cursor: pointer; z-index: 5; opacity: 0; transition: opacity 0.2s; }
.fs-hero-video-wrap:hover .fs-hero-video-expand { opacity: 1; }

/* Stats — dark island on light page */
.fs-stats { padding: 96px 48px; background: #0C0D0F; color: #fff; }
.fs-stats-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.06); border-radius: 16px; overflow: hidden; }
.fs-stat { padding: 48px 40px; background: #0C0D0F; transition: background 0.3s; }
.fs-stat:hover { background: rgba(255,255,255,0.03); }
.fs-stat-n { font-family: var(--font-serif), Georgia, serif; font-size: clamp(36px, 5vw, 54px); font-weight: 400; color: #00D4B4; line-height: 1; margin-bottom: 12px; }
.fs-stat-l { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.5; }

.fs-features { padding: 120px 48px; background: #F7F5F0; }
.fs-features-inner { max-width: 1100px; margin: 0 auto; }
.fs-features-inner .fs-slbl { margin-bottom: 24px; }
.fs-features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.fs-feature-card { background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 32px 28px; transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s; }
.fs-feature-card:hover { border-color: rgba(0,168,130,0.2); box-shadow: 0 8px 24px rgba(10,11,15,0.06); transform: translateY(-2px); }
.fs-feature-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(0,168,130,0.10); color: #00A882; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.fs-feature-card h3 { font-family: var(--font-serif), Georgia, serif; font-size: 22px; font-weight: 400; color: #0C0D0F; margin-bottom: 10px; letter-spacing: -0.01em; }
.fs-feature-card p { font-size: 15px; line-height: 1.6; color: #3D3B38; margin: 0; }

.fs-steps { padding: 120px 48px; background: #EFEDE8; }
.fs-steps-inner { max-width: 1000px; margin: 0 auto; }
.fs-steps-inner .fs-slbl { margin-bottom: 24px; }
.fs-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.fs-step { background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); border-radius: 14px; padding: 32px 24px; text-align: center; transition: all 0.3s; }
.fs-step:hover { border-color: rgba(0,168,130,0.2); box-shadow: 0 8px 24px rgba(10,11,15,0.06); transform: translateY(-2px); }
.fs-step-num { width: 40px; height: 40px; border-radius: 50%; background: rgba(0,168,130,0.10); color: #00A882; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.fs-step h4 { font-size: 18px; font-weight: 600; color: #0C0D0F; margin-bottom: 8px; }
.fs-step p { font-size: 15px; line-height: 1.6; color: #3D3B38; margin: 0; }

/* CTA — dark island on light page */
.fs-cta { padding: 120px 48px; background: #EFEDE8; text-align: center; }
.fs-cta-inner { max-width: 720px; margin: 0 auto; padding: 64px 48px; background: #0C0D0F; color: #fff; border-radius: 24px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 24px 64px rgba(0,0,0,0.18); }
.fs-cta-title { font-family: var(--font-serif), Georgia, serif; font-size: clamp(28px, 4vw, 40px); line-height: 1.15; font-weight: 400; letter-spacing: -0.8px; margin-bottom: 16px; color: #fff; }
.fs-cta-sub { font-size: 17px; line-height: 1.6; color: rgba(255,255,255,0.65); margin-bottom: 32px; }
.fs-cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.fs-cta .fs-btn-outline { border-color: rgba(255,255,255,0.25); color: #fff; }
.fs-cta .fs-btn-outline:hover { border-color: #fff; color: #fff; background: rgba(255,255,255,0.1); }

.fs-trust { padding: 96px 48px; background: #F7F5F0; }
.fs-trust-inner { max-width: 1100px; margin: 0 auto; }
.fs-trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.fs-trust-card { background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 28px 22px; transition: all 0.3s; }
.fs-trust-card:hover { border-color: rgba(0,168,130,0.22); box-shadow: 0 8px 24px rgba(10,11,15,0.05); }
.fs-trust-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(0,168,130,0.10); color: #00A882; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.fs-trust-card h4 { font-size: 16px; font-weight: 600; color: #0C0D0F; margin-bottom: 8px; }
.fs-trust-card p { font-size: 14px; color: #3D3B38; line-height: 1.5; margin: 0; }
.fs-trust-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 40px; font-size: 14px; font-weight: 600; color: #00A882; text-decoration: none; transition: color 0.2s, gap 0.2s; }
.fs-trust-link:hover { color: #007A5E; gap: 12px; }
.fs-trust-link-wrap { text-align: center; }

@media (max-width: 900px) {
  .fs-hero { padding: 120px 24px 56px; }
  .fs-hero-title { font-size: 32px; }
  .fs-stats-inner { grid-template-columns: 1fr; }
  .fs-stat { padding: 32px 24px; }
  .fs-stat-n { font-size: 40px; }
  .fs-features, .fs-steps { padding: 80px 24px; }
  .fs-features-grid { grid-template-columns: 1fr; }
  .fs-steps-grid { grid-template-columns: 1fr; }
  .fs-cta { padding: 80px 24px; }
  .fs-cta-inner { padding: 48px 28px; }
  .fs-cta-title { font-size: 28px; }
  .fs-cta-buttons { flex-direction: column; align-items: stretch; }
  .fs-trust { padding: 64px 24px; }
  .fs-trust-grid { grid-template-columns: 1fr; }
  .fs-hero-video-wrap { margin-top: 24px; }
}
`;
