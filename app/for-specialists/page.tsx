"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const APP_LOGIN_URL = "https://app.tetherhealth.co/login";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleVideoFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <div className="fs-page">
      <style>{FS_CSS}</style>

      <nav className="fs-nav">
        <Link href="/" className="fs-nav-logo">
          <Image src="/LOGO.jpeg" alt="Tether" width={30} height={30} style={{ objectFit: "contain" }} />
          <span className="fs-nav-logo-text">Tether</span>
        </Link>
        <div className="fs-nav-links">
          <Link href="/#product">Product</Link>
          <Link href="/#platform">Platform</Link>
          <Link href="/for-specialists">For Specialists</Link>
          <Link href="/security">Security</Link>
          <Link href="/blog">Blog</Link>
          <a href={APP_LOGIN_URL} className="fs-nav-login">Log In</a>
          <Link href="/request-demo" className="fs-nav-cta">Request Demo</Link>
        </div>
        <button type="button" className="fs-nav-mob" aria-label="Menu" onClick={() => setMobileOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>
      {mobileOpen && (
        <div className="fs-nav-overlay">
          <button type="button" className="fs-nav-overlay-close" aria-label="Close" onClick={() => setMobileOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <Link href="/#product" onClick={() => setMobileOpen(false)}>Product</Link>
          <Link href="/#platform" onClick={() => setMobileOpen(false)}>Platform</Link>
          <Link href="/for-specialists" onClick={() => setMobileOpen(false)}>For Specialists</Link>
          <Link href="/security" onClick={() => setMobileOpen(false)}>Security</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)}>Blog</Link>
          <a href={APP_LOGIN_URL} onClick={() => setMobileOpen(false)}>Log In</a>
          <Link href="/request-demo" className="fs-nav-overlay-cta" onClick={() => setMobileOpen(false)}>Request Demo</Link>
        </div>
      )}

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
            <p className="fs-cta-sub">Free during pilot. No contracts, no setup fees, no IT integration required.</p>
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
                <h4>End-to-End Encryption</h4>
                <p>Zero-knowledge architecture for all PHI</p>
              </div>
              <div className="fs-trust-card">
                <div className="fs-trust-icon"><IconClock /></div>
                <h4>5-Minute Onboarding</h4>
                <p>No IT integration or setup required</p>
              </div>
              <div className="fs-trust-card">
                <div className="fs-trust-icon"><IconGlobe /></div>
                <h4>Works Alongside Your EMR</h4>
                <p>Runs parallel to Epic, Athena, and others</p>
              </div>
            </div>
            <div className="fs-trust-link-wrap">
              <Link href="/security" className="fs-trust-link">Learn more about our security practices <IconArrowRight /></Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="fs-footer">
        <p>&copy; 2026 Tether Health, Inc. All rights reserved. <Link href="/">Home</Link> <Link href="/blog">Blog</Link> <Link href="/legal">Legal</Link></p>
      </footer>
    </div>
  );
}

const FS_CSS = `
:root {
  --fs-navy: #2D3A4E; --fs-navy-deep: #1E2A3A; --fs-navy-darkest: #151F2B;
  --fs-bg: #FAFAF7; --fs-bg-warm: #F5F3EE;
  --fs-teal: #0D7377; --fs-teal-dark: #095456; --fs-teal-light: #E8F4F4;
  --fs-coral: #D4613E;
  --fs-text: #2D2D2D; --fs-text-secondary: #6B6B6B; --fs-text-tertiary: #9A9A9A;
  --fs-border: #E0DDD5;
}
.fs-page { font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif; color: var(--fs-text); background: var(--fs-bg); min-height: 100vh; -webkit-font-smoothing: antialiased; }
.fs-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 48px; height: 72px; display: flex; align-items: center; justify-content: space-between; background: rgba(250,250,247,0.95); border-bottom: 1px solid var(--fs-border); }
.fs-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--fs-navy-deep); font-weight: 600; font-size: 22px; letter-spacing: -0.5px; }
.fs-nav-links { display: flex; align-items: center; gap: 28px; }
.fs-nav-links a { font-size: 14px; font-weight: 500; color: var(--fs-text-secondary); text-decoration: none; transition: color 0.2s; }
.fs-nav-links a:hover { color: var(--fs-navy-deep); }
.fs-nav-login { color: var(--fs-text-secondary) !important; }
.fs-nav-cta { background: var(--fs-teal) !important; color: #fff !important; padding: 10px 22px !important; border-radius: 8px !important; font-size: 14px !important; font-weight: 600 !important; text-decoration: none !important; transition: background 0.2s; }
.fs-nav-cta:hover { background: var(--fs-teal-dark) !important; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(13,115,119,0.25); }
.fs-nav-mob { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--fs-navy-deep); }
.fs-nav-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(250,250,247,0.98); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; padding: 80px 24px; }
.fs-nav-overlay a { font-size: 20px; font-weight: 500; color: var(--fs-navy-deep); text-decoration: none; }
.fs-nav-overlay-cta { background: var(--fs-teal); color: #fff !important; padding: 12px 24px; border-radius: 8px; font-weight: 600; }
.fs-nav-overlay-close { position: absolute; top: 24px; right: 24px; background: none; border: none; cursor: pointer; padding: 8px; color: var(--fs-navy-deep); }
.fs-slbl { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--fs-teal); margin-bottom: 16px; }
.fs-hero { padding: 160px 48px 80px; text-align: center; max-width: 720px; margin: 0 auto; }
.fs-hero-title { font-family: var(--font-serif), Georgia, serif; font-size: 48px; line-height: 1.1; font-weight: 400; color: var(--fs-navy-darkest); letter-spacing: -1px; margin-bottom: 20px; }
.fs-hero-sub { font-size: 18px; line-height: 1.65; color: var(--fs-text-secondary); margin-bottom: 32px; }
.fs-btn-teal { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: var(--fs-teal); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: inherit; cursor: pointer; text-decoration: none; transition: all 0.25s; }
.fs-btn-teal:hover { background: var(--fs-teal-dark); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(13,115,119,0.25); }
.fs-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: transparent; color: var(--fs-text); border: 1.5px solid var(--fs-border); border-radius: 10px; font-size: 15px; font-weight: 500; font-family: inherit; cursor: pointer; text-decoration: none; transition: all 0.25s; }
.fs-btn-outline:hover { border-color: var(--fs-navy); color: var(--fs-navy); background: rgba(45,58,78,0.04); }
.fs-hero-video-wrap { position: relative; max-width: 900px; margin: 40px auto 0; border-radius: 14px; overflow: hidden; border: 1px solid #E5E7EB; box-shadow: 0 4px 24px rgba(0,0,0,0.08); background: #fff; cursor: pointer; }
.fs-hero-video-wrap video { display: block; width: 100%; height: auto; }
.fs-hero-video-expand { position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #fff; background: rgba(0,0,0,0.5); border-radius: 50%; border: none; cursor: pointer; z-index: 5; opacity: 0; transition: opacity 0.2s; }
.fs-hero-video-wrap:hover .fs-hero-video-expand { opacity: 1; }
.fs-stats { padding: 80px 48px; background: var(--fs-navy-deep); color: #fff; }
.fs-stats-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; }
.fs-stat { padding: 48px 40px; background: var(--fs-navy-deep); transition: background 0.3s; }
.fs-stat:hover { background: rgba(30,42,58,0.7); }
.fs-stat-n { font-family: var(--font-serif), Georgia, serif; font-size: 54px; font-weight: 400; color: var(--fs-coral); line-height: 1; margin-bottom: 12px; }
.fs-stat-l { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.5; }
.fs-features { padding: 120px 48px; background: var(--fs-bg-warm); }
.fs-features-inner { max-width: 1200px; margin: 0 auto; }
.fs-features-inner .fs-slbl { margin-bottom: 24px; }
.fs-features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.fs-feature-card { background: #fff; border: 1px solid var(--fs-border); border-radius: 16px; padding: 32px 28px; transition: all 0.3s; }
.fs-feature-card:hover { border-color: var(--fs-navy); box-shadow: 0 8px 24px rgba(45,58,78,0.08); transform: translateY(-2px); }
.fs-feature-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--fs-teal-light); color: var(--fs-teal); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.fs-feature-card h3 { font-family: var(--font-serif), Georgia, serif; font-size: 22px; font-weight: 400; color: var(--fs-navy-darkest); margin-bottom: 10px; }
.fs-feature-card p { font-size: 15px; line-height: 1.6; color: var(--fs-text-secondary); margin: 0; }
.fs-steps { padding: 120px 48px; background: var(--fs-bg); }
.fs-steps-inner { max-width: 1000px; margin: 0 auto; }
.fs-steps-inner .fs-slbl { margin-bottom: 24px; }
.fs-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.fs-step { background: #fff; border: 1px solid var(--fs-border); border-radius: 14px; padding: 32px 24px; text-align: center; transition: all 0.3s; }
.fs-step:hover { border-color: var(--fs-navy); box-shadow: 0 8px 24px rgba(45,58,78,0.08); transform: translateY(-2px); }
.fs-step-num { width: 40px; height: 40px; border-radius: 50%; background: var(--fs-teal-light); color: var(--fs-teal); font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.fs-step h4 { font-size: 18px; font-weight: 600; color: var(--fs-navy-darkest); margin-bottom: 8px; }
.fs-step p { font-size: 15px; line-height: 1.6; color: var(--fs-text-secondary); margin: 0; }
.fs-cta { padding: 120px 48px; background: var(--fs-navy-deep); color: #fff; text-align: center; }
.fs-cta-inner { max-width: 600px; margin: 0 auto; }
.fs-cta-title { font-family: var(--font-serif), Georgia, serif; font-size: 44px; line-height: 1.15; font-weight: 400; letter-spacing: -0.8px; margin-bottom: 16px; }
.fs-cta-sub { font-size: 17px; line-height: 1.6; color: rgba(255,255,255,0.6); margin-bottom: 32px; }
.fs-cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.fs-cta .fs-btn-teal { background: var(--fs-teal); color: #fff; }
.fs-cta .fs-btn-teal:hover { background: var(--fs-teal-dark); }
.fs-cta .fs-btn-outline { border-color: rgba(255,255,255,0.4); color: #fff; }
.fs-cta .fs-btn-outline:hover { border-color: #fff; color: #fff; background: rgba(255,255,255,0.1); }
.fs-trust { padding: 96px 48px; background: var(--fs-teal-light); }
.fs-trust-inner { max-width: 1200px; margin: 0 auto; }
.fs-trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.fs-trust-card { background: #fff; border: 1px solid rgba(13,115,119,0.12); border-radius: 16px; padding: 32px 24px; transition: all 0.3s; }
.fs-trust-card:hover { border-color: rgba(13,115,119,0.25); box-shadow: 0 8px 32px rgba(13,115,119,0.08); }
.fs-trust-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--fs-teal-light); color: var(--fs-teal); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.fs-trust-card h4 { font-size: 16px; font-weight: 600; color: var(--fs-navy-darkest); margin-bottom: 8px; }
.fs-trust-card p { font-size: 14px; color: var(--fs-text-secondary); line-height: 1.5; margin: 0; }
.fs-trust-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 40px; font-size: 14px; font-weight: 500; color: var(--fs-teal); text-decoration: none; transition: color 0.2s; }
.fs-trust-link:hover { color: var(--fs-teal-dark); }
.fs-trust-link-wrap { text-align: center; }
.fs-footer { padding: 32px 48px; border-top: 1px solid var(--fs-border); font-size: 13px; color: var(--fs-text-tertiary); text-align: center; }
.fs-footer a { color: var(--fs-teal); text-decoration: none; margin-left: 16px; }
.fs-footer a:hover { text-decoration: underline; }
@media (max-width: 900px) {
  .fs-nav { padding: 0 24px; }
  .fs-nav-links { display: none; }
  .fs-nav-mob { display: block; }
  .fs-hero { padding: 120px 24px 60px; }
  .fs-hero-title { font-size: 36px; }
  .fs-stats-inner { grid-template-columns: 1fr; }
  .fs-stat { padding: 32px 24px; }
  .fs-stat-n { font-size: 42px; }
  .fs-features, .fs-steps { padding: 80px 24px; }
  .fs-features-grid { grid-template-columns: 1fr; }
  .fs-steps-grid { grid-template-columns: 1fr; }
  .fs-cta { padding: 80px 24px; }
  .fs-cta-title { font-size: 32px; }
  .fs-cta-buttons { flex-direction: column; align-items: center; }
  .fs-trust { padding: 64px 24px; }
  .fs-trust-grid { grid-template-columns: 1fr; }
  .fs-hero-video-wrap { margin-top: 24px; }
}
`;
