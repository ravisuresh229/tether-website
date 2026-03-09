"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

// ─── Animation hook ───

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView] as const;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Floating network nodes (hero background) ───

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

function NetworkNodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const nodes: NetworkNode[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 18; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.5 + 1.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.offsetWidth) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.offsetHeight) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(45, 58, 78, ${0.06 * (1 - dist / 160)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45, 58, 78, 0.08)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ─── Tether Logo Mark SVG ───

function TetherMark({
  size = 32,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M10 12C10 12 18 18 24 24C28 28 30 32 31 38L31 56" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M14 10C14 10 20 16 26 22C29 25 31 30 32 36L32 56" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 8C18 8 23 14 28 20C30 22 32 28 33 34L33 56" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22 7C22 7 26 12 30 18C31 20 33 26 33.5 32L33.5 56" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M54 12C54 12 46 18 40 24C36 28 34 32 33 38L33 56" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M50 10C50 10 44 16 38 22C35 25 33 30 32 36L32 56" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M46 8C46 8 41 14 36 20C34 22 32 28 31 34L31 56" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M42 7C42 7 38 12 34 18C33 20 31 26 30.5 32L30.5 56" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Icons ───

const IconArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconSend = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);
const IconNetwork = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <line x1="12" y1="7.5" x2="5" y2="16.5" />
    <line x1="12" y1="7.5" x2="19" y2="16.5" />
    <line x1="7.5" y1="19" x2="16.5" y2="19" />
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
const IconClock = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconRefresh = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const IconPlay = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

// ─── Page ───

export default function TetherLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className="lp">
      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav-s" : ""}`}>
        <a href="#" className="nav-logo">
          <TetherMark size={30} color="#2D3A4E" />
          <span className="nav-logo-text">Tether</span>
        </a>
        <ul className="nav-links">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#product">Product</a></li>
          <li><a href="#specialists">For Specialists</a></li>
          <li><a href="#network">The Network</a></li>
          <li><a href="#demo" className="nav-cta">Request Demo</a></li>
        </ul>
        <button className="nav-mob" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <NetworkNodes />
        <div className="hero-inner">
          <div className="hero-content">
            <Reveal>
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                Now accepting pilot practices
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1>
                Every referral is a<br />
                <em>relationship.</em>
                <br />
                Stop losing them.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="hero-sub">
                Tether is the referral network that connects primary care and
                specialty practices with real-time tracking, loop closure, and a
                shared directory your staff actually wants to use.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="hero-actions">
                <a href="#demo" className="btn-p">
                  Request a Demo <IconArrowRight />
                </a>
                <a href="#how" className="btn-s">
                  See How It Works
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="hero-demo">
              <div className="hero-demo-bar">
                <div className="hero-demo-dot" />
                <div className="hero-demo-dot" />
                <div className="hero-demo-dot" />
              </div>
              <div className="hero-demo-body">
                <div className="hero-demo-play">
                  <IconPlay />
                </div>
                <span className="hero-demo-label">Watch the Product Demo</span>
                <span style={{ fontSize: 12, color: "#9A9A9A" }}>
                  Replit demo embed goes here
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem">
        <div className="problem-inner">
          <Reveal>
            <div className="plbl">The Problem</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Referrals disappear into a black hole. Your revenue disappears
              with them.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="problem-desc">
              Most referrals are still sent by fax. There is no confirmation, no
              tracking, and no follow-up. Patients fall through the cracks,
              specialists lose billable visits, and PCPs never know if their
              patient received care.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="pstats">
              <div className="pstat">
                <div className="pstat-n">50%</div>
                <div className="pstat-l">
                  of referrals never result in a completed specialist visit
                </div>
              </div>
              <div className="pstat">
                <div className="pstat-n">$971B</div>
                <div className="pstat-l">
                  in annual U.S. healthcare waste attributed to care
                  coordination failures
                </div>
              </div>
              <div className="pstat">
                <div className="pstat-n">81%</div>
                <div className="pstat-l">
                  of PCPs report dissatisfaction with the referral communication
                  process
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <div className="how-inner">
          <Reveal>
            <div className="slbl">How It Works</div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="stitle">Three steps. Zero fax machines.</div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="sdesc">
              Your front desk staff can be sending tracked referrals in under 10
              minutes. No IT integration required. No workflow disruption.
            </p>
          </Reveal>
          <div className="how-steps">
            <Reveal delay={0.1}>
              <div className="how-step">
                <div className="how-step-num">1</div>
                <h3>Send or Receive</h3>
                <p>
                  Upload a referral PDF or use the built-in form. Tether&apos;s
                  AI extracts patient details, insurance, and clinical context
                  automatically.
                </p>
                <div className="how-step-conn">
                  <IconArrowRight />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="how-step">
                <div className="how-step-num">2</div>
                <h3>Track in Real Time</h3>
                <p>
                  Both the sending and receiving practice see the referral
                  status live. No more calling to ask &ldquo;did you get
                  it?&rdquo; Every update is logged and visible.
                </p>
                <div className="how-step-conn">
                  <IconArrowRight />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="how-step">
                <div className="how-step-num">3</div>
                <h3>Close the Loop</h3>
                <p>
                  When the visit is complete, the referring provider gets
                  notified. The patient&apos;s care journey is documented,
                  connected, and never lost.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section className="product" id="product">
        <div className="product-inner">
          <div className="product-header">
            <Reveal>
              <div className="slbl">Product</div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="stitle">
                Built for the way
                <br />
                practices actually work
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="sdesc">
                Designed for medical assistants and front desk staff who manage
                referrals every day. Not physicians who review dashboards once a
                week.
              </p>
            </Reveal>
          </div>
          <div className="pgrid">
            <Reveal delay={0.1}>
              <div className="pcard pcard-full">
                <div className="pcard-img">
                  <div className="pcard-img-ph">
                    <IconSend />
                    Screenshot: Referral Dashboard
                  </div>
                </div>
                <div className="pcard-body">
                  <h3>Referral Dashboard</h3>
                  <p>
                    See every inbound and outbound referral in one place. Filter
                    by status, provider, date, or insurance. Know exactly where
                    every patient stands.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="pcard">
                <div className="pcard-img">
                  <div className="pcard-img-ph">
                    <IconNetwork />
                    Screenshot: Specialist Directory
                  </div>
                </div>
                <div className="pcard-body">
                  <h3>Specialist Directory</h3>
                  <p>
                    A curated, searchable map of specialists accepting
                    referrals. Filter by specialty, insurance, distance, and
                    availability.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="pcard">
                <div className="pcard-img">
                  <div className="pcard-img-ph">
                    <IconZap />
                    Screenshot: AI Document Parsing
                  </div>
                </div>
                <div className="pcard-body">
                  <h3>AI-Powered Intake</h3>
                  <p>
                    Drop in a referral PDF. Tether extracts patient
                    demographics, clinical notes, and insurance details in
                    seconds.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="audiences" id="specialists">
        <div className="audiences-inner">
          <Reveal>
            <div className="slbl">Who It&apos;s For</div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="stitle">Two sides. One network.</div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="sdesc">
              Specialists grow their referral volume. PCPs close the loop on
              patient care. Both win when the network works.
            </p>
          </Reveal>
          <div className="aud-grid">
            <Reveal delay={0.1}>
              <div className="aud-card aud-spec">
                <div className="aud-icon">
                  <IconZap />
                </div>
                <h3>For Specialists</h3>
                <p className="aud-card-sub">
                  Turn every referral into a scheduled visit. See who is sending
                  you patients, and make it effortless for them to send more.
                </p>
                <div className="aud-feats">
                  <div className="aud-feat">
                    <div className="aud-feat-icon"><IconCheck /></div>
                    Inbound referral management with auto-parsed intake
                  </div>
                  <div className="aud-feat">
                    <div className="aud-feat-icon"><IconCheck /></div>
                    Visibility into your referral network and top senders
                  </div>
                  <div className="aud-feat">
                    <div className="aud-feat-icon"><IconCheck /></div>
                    Automated status updates back to referring providers
                  </div>
                  <div className="aud-feat">
                    <div className="aud-feat-icon"><IconCheck /></div>
                    Presence in the Tether specialist directory for new referral
                    sources
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="aud-card aud-pcp">
                <div className="aud-icon">
                  <IconUsers />
                </div>
                <h3>For Primary Care</h3>
                <p className="aud-card-sub">
                  Know that your patient actually saw the specialist. Find the
                  right provider, send the referral, and track it without a
                  single phone call.
                </p>
                <div className="aud-feats">
                  <div className="aud-feat">
                    <div className="aud-feat-icon"><IconCheck /></div>
                    Searchable directory of specialists by location and insurance
                  </div>
                  <div className="aud-feat">
                    <div className="aud-feat-icon"><IconCheck /></div>
                    Real-time referral status tracking with zero follow-up calls
                  </div>
                  <div className="aud-feat">
                    <div className="aud-feat-icon"><IconCheck /></div>
                    Loop closure notifications when the visit is completed
                  </div>
                  <div className="aud-feat">
                    <div className="aud-feat-icon"><IconCheck /></div>
                    Always free. No contracts, no software fees.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section className="network" id="network">
        <div className="network-inner">
          <Reveal>
            <div className="slbl">The Network Effect</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2>
              Not just software.
              <br />A <em>network</em> that grows with you.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="network-desc">
              Every referral sent through Tether strengthens the connection
              between practices. As more providers join, every practice gets
              more value. This is how referral management should have always
              worked.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="nvis">
              <div className="nnode">
                <div className="nnode-icon"><IconSend /></div>
                <h4>Outbound Referral</h4>
                <p>
                  Every fax you send through Tether is a warm invite for the
                  specialist to join
                </p>
              </div>
              <div className="nnode">
                <div className="nnode-icon"><IconRefresh /></div>
                <h4>Loop Closure</h4>
                <p>
                  Both sides see the full referral journey from send to
                  completed visit
                </p>
              </div>
              <div className="nnode">
                <div className="nnode-icon"><IconNetwork /></div>
                <h4>Network Growth</h4>
                <p>
                  More connections create a richer directory and smarter routing
                  for everyone
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="trust-inner">
          <div className="trust-item">
            <div className="trust-icon"><IconShield /></div>
            HIPAA Compliant
          </div>
          <div className="trust-item">
            <div className="trust-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            End-to-End Encryption
          </div>
          <div className="trust-item">
            <div className="trust-icon"><IconClock /></div>
            5-Minute Onboarding
          </div>
          <div className="trust-item">
            <div className="trust-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            Works Alongside Your EMR
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="proof">
        <div className="proof-inner">
          <Reveal>
            <div className="slbl">Trusted By</div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="stitle">Practices across the DMV and beyond</div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="proof-logos">
              <div className="proof-logo-ph">Partner Logo</div>
              <div className="proof-logo-ph">Partner Logo</div>
              <div className="proof-logo-ph">Partner Logo</div>
              <div className="proof-logo-ph">Partner Logo</div>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="proof-quote">
              <p>
                The referral process has always been a black box. Tether finally
                makes it feel like we are actually connected to the specialists
                we send patients to.
              </p>
              <div className="proof-quote-attr">
                Pilot Practice, DMV Region
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="fcta" id="demo">
        <div className="fcta-inner">
          <Reveal>
            <h2>
              Ready to connect
              <br />
              your practice?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Join the network of practices building a better referral
              experience for their patients and their teams.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="mailto:support@tetherhealth.co" className="btn-p">
              Request a Demo <IconArrowRight />
            </a>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="fcta-note">
              Free for referring providers. No contracts required.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              <TetherMark size={24} color="white" />
              <span className="footer-logo-text">Tether Health</span>
            </div>
            <p className="footer-tagline">
              The referral network for modern medical practices. Built in
              Washington, D.C.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>Product</h5>
              <a href="#how">How It Works</a>
              <a href="#product">Features</a>
              <a href="#specialists">For Specialists</a>
              <a href="#specialists">For Primary Care</a>
            </div>
            <div className="footer-col">
              <h5>Company</h5>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="mailto:support@tetherhealth.co">Contact</a>
            </div>
            <div className="footer-col">
              <h5>Legal</h5>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">BAA</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Tether Health, Inc. All rights reserved.</span>
          <div>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
