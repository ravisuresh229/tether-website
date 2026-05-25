"use client";
import { useState, useEffect, useRef } from "react";
import { JsonLd } from "@/components/JsonLd";

// ─── IntersectionObserver hook (SSR-safe) ───
function useInView(opts: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setV(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px", ...opts }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, v] as const;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

// ─── Reveal (scroll-up fade) ───
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, v] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Stat counter (counts up on scroll into view) ───
function easeOutExpo(t: number) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

function StatCounter({ target, prefix = "", suffix = "", durationMs = 1800, triggered }: { target: number; prefix?: string; suffix?: string; durationMs?: number; triggered: boolean }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!triggered || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setVal(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [triggered, target, durationMs]);
  return <span>{prefix}{val}{suffix}</span>;
}

function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="t-stats">
      <div className="t-stat">
        <div className="t-stat-n"><StatCounter target={50} suffix="%" triggered={triggered} /></div>
        <div className="t-stat-l">of referrals never reach a completed visit</div>
      </div>
      <div className="t-stat">
        <div className="t-stat-n"><StatCounter target={971} prefix="$" suffix="B" triggered={triggered} /></div>
        <div className="t-stat-l">in annual care coordination waste</div>
      </div>
      <div className="t-stat">
        <div className="t-stat-n"><StatCounter target={81} suffix="%" triggered={triggered} /></div>
        <div className="t-stat-l">of PCPs frustrated with referral communication</div>
      </div>
    </div>
  );
}

// ─── Wordmark (inline SVG) ───
function TetherWordmark({ size = 22 }: { size?: number }) {
  return (
    <span className="t-wordmark" aria-label="Tether">
      <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 6 H11 V16 H19" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="t-wordmark-text">Tether</span>
    </span>
  );
}

// ─── Icons ───
const IconArrowRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconCheck = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconLinkedIn = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.5 9.5H6V18h2.5V9.5zM7.25 8.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM18 13.5c0-2.04-1.31-3.25-3-3.25a2.6 2.6 0 0 0-2.36 1.27V10H10v8h2.64v-4.32c0-1.06.69-1.6 1.51-1.6.79 0 1.35.52 1.35 1.6V18H18v-4.5z"/></svg>;
const IconBolt = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IconSend = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>;
const IconSpark = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 14l.9 2.6L22 17l-2.1.4L19 20l-.9-2.6L16 17l2.1-.4L19 14z"/></svg>;

// ─── Hero illustration (static designed UI mockup — no images, no video) ───
// ─── Hero headline: rotating teal word ───
const HEADLINE_WORDS = ["relationship", "coordination", "outcome", "relationship"];

function RotatingWord() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setVisible(false);
      setTimeout(() => {
        if (cancelled) return;
        setI((x) => (x + 1) % HEADLINE_WORDS.length);
        setVisible(true);
      }, 400);
    };
    const id = setInterval(tick, 2500);
    return () => { cancelled = true; clearInterval(id); };
  }, []);
  return (
    <em
      className="t-headline-word"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
      aria-live="polite"
    >
      {HEADLINE_WORDS[i]}
    </em>
  );
}

// ─── Hero typewriter (Ask Tether strip) ───
const TYPEWRITER: { text: string; action: string }[] = [
  { text: "A.K.\u2019s specialist is not accepting new patients.", action: "Find alternative" },
  { text: "3 referrals sent this week. 1 needs follow-up.", action: "Send follow-up" },
  { text: "R.T. \u2014 Orthopedics awaiting visit summary.", action: "Send reminder" },
  { text: "J.M. loop closed. Summary pushed to EHR.", action: "View summary" },
];

function HeroTypewriter({ onAction }: { onAction?: (action: string) => void }) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [actionVisible, setActionVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let chars = 0;
    let phase: "type" | "hold" | "delete" | "gap" = "type";
    let local = 0;

    const tick = () => {
      if (cancelled) return;
      const cur = TYPEWRITER[local];
      if (phase === "type") {
        chars++;
        setDisplay(cur.text.slice(0, chars));
        if (chars >= cur.text.length) {
          phase = "hold";
          setActionVisible(true);
          timer = setTimeout(tick, 2800);
        } else {
          timer = setTimeout(tick, 38);
        }
      } else if (phase === "hold") {
        setActionVisible(false);
        phase = "delete";
        timer = setTimeout(tick, 200);
      } else if (phase === "delete") {
        chars--;
        setDisplay(cur.text.slice(0, Math.max(chars, 0)));
        if (chars <= 0) {
          phase = "gap";
          timer = setTimeout(tick, 300);
        } else {
          timer = setTimeout(tick, 18);
        }
      } else {
        local = (local + 1) % TYPEWRITER.length;
        setIdx(local);
        phase = "type";
        chars = 0;
        timer = setTimeout(tick, 60);
      }
    };

    timer = setTimeout(tick, 700);
    return () => { cancelled = true; if (timer) clearTimeout(timer); };
  }, []);

  const action = TYPEWRITER[idx].action;
  const handleClick = () => { onAction?.(action); };
  return (
    <div className="t-illus-ai">
      <div className="t-illus-ai-icon" aria-hidden="true">
        <div className="t-illus-ai-spinner">
          <span className="t-illus-ai-ring" />
          <span className="t-illus-ai-spinner-dot" />
        </div>
      </div>
      <div className="t-illus-ai-main">
        <span className="t-illus-ai-eyebrow">Ask Tether</span>
        <div className="t-illus-ai-line">
          <span className="t-illus-ai-text">{display}</span>
          <span className="t-illus-ai-caret" aria-hidden="true" />
        </div>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="t-illus-ai-action"
        aria-label={`Run action: ${action}`}
        style={{ opacity: actionVisible ? 1 : 0.55, transition: "opacity 250ms ease" }}
      >
        {action}
      </button>
    </div>
  );
}

function HeroIllustration() {
  const [rerouted, setRerouted] = useState(false);
  const [summaryShown, setSummaryShown] = useState(false);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAction = (action: string) => {
    const a = action.toLowerCase();
    if (resetRef.current) clearTimeout(resetRef.current);
    if (a.includes("alternative")) {
      setRerouted(true);
    } else if (a.includes("summary")) {
      setSummaryShown(true);
    } else {
      return;
    }
    resetRef.current = setTimeout(() => {
      setRerouted(false);
      setSummaryShown(false);
    }, 7000);
  };

  useEffect(() => () => { if (resetRef.current) clearTimeout(resetRef.current); }, []);

  return (
    <div
      className="t-illus"
      role="img"
      aria-label="Tether referral dashboard, pulling live from athenaOne. A.K. is flagged for action with an AI agent rerouting to an alternate specialist, and a Sent, Received, Completed timeline tracks the loop closure."
    >
      <span className="t-illus-glow t-illus-glow-teal" aria-hidden="true" />
      <span className="t-illus-glow t-illus-glow-amber" aria-hidden="true" />

      {/* EHR context strip */}
      <div className="t-illus-ehr" aria-hidden="true">
        <div className="t-illus-ehr-left">
          <span className="t-illus-ehr-mark">a</span>
          <span className="t-illus-ehr-live-dot" />
          <span className="t-illus-ehr-text">athenaOne &middot; Georgetown Family Medicine</span>
        </div>
        <div className="t-illus-ehr-right">
          <span className="t-illus-ehr-conn-dot" />
          <span>EHR Connected</span>
        </div>
      </div>

      <div className="t-illus-inner">
        <div className="t-illus-grid">
          {/* Left panel: outbound referrals */}
          <section className="t-illus-pane" aria-labelledby="t-illus-label-out">
            <header className="t-illus-pane-head">
              <span id="t-illus-label-out" className="t-illus-eyebrow">Outbound Referrals</span>
              <span className="t-illus-count">3 active</span>
            </header>

            <div className="t-illus-colhead" aria-hidden="true">
              <span>Patient</span>
              <span>Status</span>
            </div>

            <div className="t-illus-rows">
              <div
                className={`t-illus-ref t-illus-ref-active${rerouted ? " t-illus-ref-rerouting" : ""}`}
                style={{ animationDelay: "0.1s" }}
              >
                <span className="t-illus-init">AK</span>
                <div className="t-illus-ref-body">
                  <div className="t-illus-ref-name">A.K. · 67F</div>
                  <div className="t-illus-ref-meta">Neurology · Dr. Nguyen</div>
                </div>
                {rerouted ? (
                  <span className="t-illus-pill t-illus-pill-rerouting">
                    <span className="t-illus-pill-dot" />Rerouting
                  </span>
                ) : (
                  <span className="t-illus-pill t-illus-pill-action">Action</span>
                )}
              </div>

              <div className={`t-illus-expand${rerouted ? " t-illus-expand-open" : ""}`} aria-hidden={!rerouted}>
                <div className="t-illus-expand-inner">
                  <div className="t-illus-alt">
                    <span className="t-illus-alt-dot" aria-hidden="true" />
                    <div className="t-illus-alt-body">
                      <div className="t-illus-alt-name">Dr. Chen &middot; Georgetown Neurology</div>
                      <div className="t-illus-alt-meta">Accepting new patients &middot; 2.1 mi &middot; Verified today</div>
                    </div>
                    <button type="button" className="t-illus-alt-btn" tabIndex={-1}>Send Referral</button>
                  </div>
                </div>
              </div>

              <div className="t-illus-ref" style={{ animationDelay: "0.25s" }}>
                <span className="t-illus-init t-illus-init-muted">RT</span>
                <div className="t-illus-ref-body">
                  <div className="t-illus-ref-name">R.T. · 41M</div>
                  <div className="t-illus-ref-meta">Orthopedics · Dr. Reyes</div>
                </div>
                <span className="t-illus-pill t-illus-pill-pending">Pending</span>
              </div>

              <div className="t-illus-ref" style={{ animationDelay: "0.4s" }}>
                <span className="t-illus-init t-illus-init-muted">JM</span>
                <div className="t-illus-ref-body">
                  <div className="t-illus-ref-name">J.M. · 58F</div>
                  <div className="t-illus-ref-meta">Cardiology · Dr. Patel</div>
                </div>
                <span className="t-illus-pill t-illus-pill-closed">
                  <span className="t-illus-pill-dot" />Loop Closed
                </span>
              </div>
            </div>
          </section>

          {/* Right panel: loop closure timeline */}
          <section className="t-illus-pane t-illus-pane-timeline" aria-labelledby="t-illus-label-loop">
            <header className="t-illus-pane-head">
              <span id="t-illus-label-loop" className="t-illus-eyebrow">Loop Closure</span>
              <span className="t-illus-count">J.M. · Cardiology</span>
            </header>

            <div className="t-illus-timeline-wrap">
              <span className="t-illus-rail" aria-hidden="true" />
              <span className="t-illus-rail-fill" aria-hidden="true" />

              <ol className="t-illus-timeline">
                <li className="t-illus-step" style={{ animationDelay: "0.3s" }}>
                  <span className="t-illus-step-node t-illus-step-done" aria-hidden="true">
                    <span className="t-illus-step-core" />
                  </span>
                  <div className="t-illus-step-body">
                    <div className="t-illus-step-title">
                      <strong>Sent</strong>
                      <span className="t-illus-step-time">9:42 AM</span>
                    </div>
                    <span className="t-illus-step-sub">Referral transmitted to Cardiology</span>
                  </div>
                </li>
                <li className="t-illus-step" style={{ animationDelay: "0.6s" }}>
                  <span className="t-illus-step-node t-illus-step-done" aria-hidden="true">
                    <span className="t-illus-step-core" />
                  </span>
                  <div className="t-illus-step-body">
                    <div className="t-illus-step-title">
                      <strong>Received</strong>
                      <span className="t-illus-step-time">10:18 AM</span>
                    </div>
                    <span className="t-illus-step-sub">Specialty acknowledged</span>
                  </div>
                </li>
                <li className="t-illus-step" style={{ animationDelay: "0.9s" }}>
                  <span className="t-illus-step-node t-illus-step-active" aria-hidden="true" />
                  <div className="t-illus-step-body">
                    <div className="t-illus-step-title">
                      <strong>Completed</strong>
                      <span className="t-illus-step-time">{summaryShown ? "Just now" : "In progress"}</span>
                    </div>
                    <span className={`t-illus-step-sub${summaryShown ? " t-illus-step-sub-hidden" : ""}`}>
                      Awaiting visit summary
                    </span>
                    <div className={`t-illus-step-summary${summaryShown ? " t-illus-step-summary-open" : ""}`} aria-hidden={!summaryShown}>
                      <div className="t-illus-step-summary-inner">
                        <div className="t-illus-step-summary-line"><span>Diagnosis</span>Peripheral neuropathy</div>
                        <div className="t-illus-step-summary-line"><span>Treatment</span>Gabapentin 300mg</div>
                        <div className="t-illus-step-summary-line"><span>Follow-up</span>8 weeks</div>
                        <div className="t-illus-step-summary-conf"><IconCheck />Pushed to EHR</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <footer className="t-illus-pane-foot" aria-hidden="true">
              <span className="t-illus-live-dot" />
              <span>Last updated 2 min ago</span>
            </footer>
          </section>
        </div>

        <HeroTypewriter onAction={handleAction} />
      </div>
    </div>
  );
}

// ─── Ask Tether — animated chat panel ───
type ChatStep =
  | { type: "user"; text: string }
  | { type: "agent-list"; header: string; items: { text: string; tone: "warn" | "danger"; action?: string }[] }
  | { type: "agent-confirm"; text: string; time: string };

const ASK_TETHER_SCRIPT: ChatStep[] = [
  { type: "user", text: "Which referrals need follow-up today?" },
  {
    type: "agent-list",
    header: "3 referrals need attention",
    items: [
      { text: "J.M. — Cardiology · sent 6 days ago, no response", tone: "warn" },
      { text: "R.T. — Orthopedics · awaiting visit summary", tone: "warn" },
      { text: "A.K. — Neurology · specialist not accepting new patients", tone: "danger", action: "Find Alternative" },
    ],
  },
  { type: "user", text: "Send follow-up to Cardiology for J.M." },
  { type: "agent-confirm", text: "Follow-up sent to Dr. Patel\u2019s office", time: "Just now" },
];

function AskTetherChatDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) { setVisible(0); return; }
    let cancelled = false;
    const ids: ReturnType<typeof setTimeout>[] = [];
    const playOnce = () => {
      setVisible(0);
      ASK_TETHER_SCRIPT.forEach((_, i) => {
        ids.push(setTimeout(() => { if (!cancelled) setVisible((v) => Math.max(v, i + 1)); }, 350 + i * 900));
      });
    };
    playOnce();
    const loop = setInterval(() => { if (!cancelled) playOnce(); }, 8000);
    return () => { cancelled = true; ids.forEach(clearTimeout); clearInterval(loop); };
  }, [inView]);

  return (
    <div ref={ref} className="t-chat" aria-label="Ask Tether — example conversation">
      <div className="t-chat-panel">
        <div className="t-chat-head">
          <span className="t-chat-lights" aria-hidden>
            <span style={{ background: "#FF5F57" }} />
            <span style={{ background: "#FFBD2E" }} />
            <span style={{ background: "#28C840" }} />
          </span>
          <span className="t-chat-title">Ask Tether</span>
          <span className="t-chat-status" aria-hidden>
            <span className="t-chat-status-dot" />Active
          </span>
        </div>
        <div className="t-chat-body">
          {ASK_TETHER_SCRIPT.map((m, i) => {
            const show = i < visible;
            const style: React.CSSProperties = {
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            };
            if (m.type === "user") {
              return <div key={i} className="t-msg t-msg-user" style={style}><p>{m.text}</p></div>;
            }
            if (m.type === "agent-list") {
              return (
                <div key={i} className="t-msg t-msg-agent" style={style}>
                  <div className="t-msg-card">
                    <div className="t-msg-card-head">{m.header}</div>
                    <ul>
                      {m.items.map((it, idx) => (
                        <li key={idx}>
                          <span className={`t-msg-dot t-msg-dot-${it.tone}`} aria-hidden />
                          <span className="t-msg-item-text">{it.text}</span>
                          {it.action && <button type="button" className="t-msg-action" tabIndex={-1}>{it.action}</button>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            return (
              <div key={i} className="t-msg t-msg-agent" style={style}>
                <div className="t-msg-confirm">
                  <span className="t-msg-check" aria-hidden><IconCheck /></span>
                  <span className="t-msg-confirm-text">{m.text}</span>
                  <span className="t-msg-time">{m.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── EHR Hub-and-spoke diagram ───
type HubBadge = "live" | "soon" | "none";
const HUB_NODES: { name: string; pos: "tl" | "tr" | "bl" | "br"; badge: HubBadge; muted?: boolean }[] = [
  { name: "Athena",          pos: "tl", badge: "live" },
  { name: "eClinicalWorks",  pos: "tr", badge: "soon" },
  { name: "ModMed",          pos: "bl", badge: "soon" },
  { name: "+ More in 2026",  pos: "br", badge: "none", muted: true },
];

function EHRHubDiagram() {
  return (
    <div
      className="t-hub"
      aria-label="Tether integrates bi-directionally with Athena today, with eClinicalWorks and ModMed planned for 2026"
    >
      <svg className="t-hub-lines" viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="t-hub-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,196,160,0.08)" />
            <stop offset="50%" stopColor="rgba(0,196,160,0.4)" />
            <stop offset="100%" stopColor="rgba(0,196,160,0.08)" />
          </linearGradient>
        </defs>
        <line x1="80"  y1="60"  x2="300" y2="180" stroke="url(#t-hub-grad)" strokeWidth="1.5" />
        <line x1="520" y1="60"  x2="300" y2="180" stroke="url(#t-hub-grad)" strokeWidth="1.5" />
        <line x1="80"  y1="300" x2="300" y2="180" stroke="url(#t-hub-grad)" strokeWidth="1.5" />
        <line x1="520" y1="300" x2="300" y2="180" stroke="url(#t-hub-grad)" strokeWidth="1.5" />

        <circle r="3" fill="#00C4A0" className="t-hub-dot t-hub-dot-in-tl" />
        <circle r="3" fill="#00C4A0" className="t-hub-dot t-hub-dot-in-tr" />
        <circle r="3" fill="#00C4A0" className="t-hub-dot t-hub-dot-in-bl" />
        <circle r="3" fill="#00C4A0" className="t-hub-dot t-hub-dot-in-br" />

        <circle r="3" fill="#4CE7CC" opacity="0.85" className="t-hub-dot t-hub-dot-out-tl" />
        <circle r="3" fill="#4CE7CC" opacity="0.85" className="t-hub-dot t-hub-dot-out-tr" />
        <circle r="3" fill="#4CE7CC" opacity="0.85" className="t-hub-dot t-hub-dot-out-bl" />
        <circle r="3" fill="#4CE7CC" opacity="0.85" className="t-hub-dot t-hub-dot-out-br" />
      </svg>

      <div className="t-hub-center" aria-hidden>
        <TetherWordmark size={26} />
      </div>

      {HUB_NODES.map((n) => (
        <div
          key={n.pos}
          className={`t-hub-tile t-hub-tile-${n.pos}${n.muted ? " t-hub-tile-muted" : ""}`}
        >
          <span className="t-hub-name">{n.name}</span>
          {n.badge === "live" && <span className="t-hub-pill t-hub-pill-live">Live</span>}
          {n.badge === "soon" && <span className="t-hub-pill t-hub-pill-soon">2026</span>}
        </div>
      ))}
    </div>
  );
}

// ─── Before / After comparison ───
const COMPARE_BEFORE = [
  "Referral faxed · no confirmation sent",
  "3 days pass · no response",
  "MA calls specialist office · put on hold",
  "Patient calls PCP confused",
  "Referral resent · original lost",
];
const COMPARE_AFTER = [
  "Referral sent with patient data from EHR",
  "Specialist notified automatically",
  "Status confirmed · loop opened",
  "Visit completed · summary returned",
  "Note pushed back to PCP chart",
];

function BeforeAfter() {
  const [afterRef, afterIn] = useInView({ threshold: 0.25 });
  return (
    <section className="t-compare t-section" aria-labelledby="t-compare-title">
      <div className="t-section-inner">
        <Reveal>
          <h2 id="t-compare-title" className="t-h2 t-compare-headline">
            What a referral looks like today.
          </h2>
        </Reveal>
        <div className="t-compare-grid">
          <Reveal delay={0.1}>
            <article className="t-compare-card t-compare-card-before">
              <header className="t-compare-head">
                <span className="t-compare-eyebrow t-compare-eyebrow-before">Without Tether</span>
              </header>
              <ol className="t-compare-steps">
                {COMPARE_BEFORE.map((s, i) => (
                  <li key={i} className="t-compare-step t-compare-step-before">
                    <span className="t-compare-dot t-compare-dot-before" aria-hidden="true" />
                    <span className="t-compare-text">{s}</span>
                  </li>
                ))}
              </ol>
              <footer className="t-compare-foot t-compare-foot-before">
                Average: 8&ndash;12 days. 30% never completed.
              </footer>
            </article>
          </Reveal>

          <article
            ref={afterRef}
            className="t-compare-card t-compare-card-after"
            style={{
              opacity: afterIn ? 1 : 0,
              transform: afterIn ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
            }}
          >
            <header className="t-compare-head">
              <span className="t-compare-eyebrow t-compare-eyebrow-after">With Tether</span>
            </header>
            <ol className="t-compare-steps">
              {COMPARE_AFTER.map((s, i) => {
                const delay = 0.35 + i * 0.15;
                return (
                  <li
                    key={i}
                    className="t-compare-step t-compare-step-after"
                    style={{
                      opacity: afterIn ? 1 : 0,
                      transform: afterIn ? "translateX(0)" : "translateX(-6px)",
                      transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
                    }}
                  >
                    <span className="t-compare-dot t-compare-dot-after" aria-hidden="true" />
                    <span className="t-compare-text">{s}</span>
                  </li>
                );
              })}
            </ol>
            <footer className="t-compare-foot t-compare-foot-after">
              Average: same-day coordination. Loop closed automatically.
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}

// ─── Platform 2x2 grid ───
type PlatformItem = { num: string; title: string; body: string; badge: string; tone: "live" | "soon" | "later" };
const PLATFORM: PlatformItem[] = [
  { num: "01", title: "Referral Coordination", body: "Complete referral lifecycle from send to loop closure.", badge: "Live", tone: "live" },
  { num: "02", title: "Specialist Verification", body: "AI agents call specialist offices to confirm availability before you send.", badge: "Q3 2026", tone: "soon" },
  { num: "03", title: "Insurance Verification", body: "Eligibility confirmed before the referral leaves your desk.", badge: "Q3 2026", tone: "soon" },
  { num: "04", title: "Appointment Coordination", body: "Agents book the specialist appointment on behalf of your patient.", badge: "2027", tone: "later" },
];

function PlatformGrid() {
  return (
    <div className="t-platform-grid">
      {PLATFORM.map((p, i) => (
        <Reveal key={p.num} delay={i * 0.1}>
          <article className={`t-platform-card t-platform-card-${p.tone}`}>
            <span className="t-platform-num">{p.num}</span>
            <h3 className="t-platform-title">{p.title}</h3>
            <p className="t-platform-body">{p.body}</p>
            <span className={`t-platform-badge t-platform-badge-${p.tone}`}>{p.badge}</span>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

// ─── Styles ───
const CSS = `
:root {
  --bg: #0A0A0F;
  --surface: #14141A;
  --surface-2: #1C1C24;
  --navy-darkest: #07070A;
  --teal: #00D4B4;
  --teal-dark: #00B398;
  --teal-light: #4CE7CC;
  --coral: #E05A3A;
  --coral-hover: #C84E30;
  --text: #E8E6E0;
  --secondary: #A0A096;
  --tertiary: #888880;
  --t-border: rgba(255,255,255,0.07);
  --t-border-strong: rgba(255,255,255,0.12);
  --text-secondary: var(--secondary);
  --text-tertiary: var(--tertiary);
  --serif: var(--font-serif), Georgia, serif;
  --sans: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif;
}

html { scroll-behavior: smooth; background: var(--bg); color-scheme: dark; }
.tether-lp, .tether-lp * { margin: 0; padding: 0; box-sizing: border-box; }
.tether-lp { font-family: var(--sans); color: var(--text); background: var(--bg); -webkit-font-smoothing: antialiased; overflow-x: hidden; position: relative; min-height: 100vh; font-size: 16px; line-height: 1.7; }
.tether-lp ::selection { background: var(--teal); color: var(--bg); }
.tether-lp a { color: inherit; text-decoration: none; }
.tether-lp button { font-family: inherit; cursor: pointer; }
.tether-lp p { line-height: 1.7; }

.t-scroll-prog { position: fixed; top: 0; left: 0; height: 2px; background: var(--teal); z-index: 101; transition: width 0.1s linear; }

/* ─── Wordmark ─── */
.t-wordmark { display: inline-flex; align-items: center; gap: 10px; color: var(--text); }
.t-wordmark svg { flex-shrink: 0; }
.t-wordmark-text { font-family: var(--sans); font-weight: 600; font-size: 1.125rem; letter-spacing: -0.02em; color: var(--text); }

/* ─── NAV ─── */
.t-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; background: transparent; border-bottom: 1px solid transparent; transition: background-color 250ms ease, border-color 250ms ease, backdrop-filter 250ms ease; }
.t-nav-s { background: rgba(10,10,15,0.85); backdrop-filter: blur(16px) saturate(1.6); -webkit-backdrop-filter: blur(16px) saturate(1.6); border-bottom-color: var(--t-border); }
.t-nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
.t-nav-links a { font-size: 0.875rem; color: var(--secondary); transition: color 150ms ease; }
.t-nav-links a:hover { color: var(--text); }
.t-nav-cta { background: var(--coral); color: #fff !important; padding: 9px 18px; border-radius: 999px; font-weight: 600; font-size: 0.875rem; transition: background-color 150ms ease; }
.t-nav-cta:hover { background: var(--coral-hover); }
.t-nav-mob { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--text); }

.t-nav-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(10,10,15,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; padding: 80px 24px; }
.t-nav-overlay a { font-size: 1.25rem; color: var(--text); }
.t-nav-overlay-close { position: absolute; top: 20px; right: 20px; background: none; border: none; padding: 8px; color: var(--text); }
.t-nav-overlay-cta { display: inline-flex; padding: 12px 28px; background: var(--coral); color: #fff; font-weight: 600; border-radius: 999px; margin-top: 8px; }

/* ─── HERO ─── */
.t-hero { position: relative; padding: 132px 32px 88px; overflow: hidden; min-height: 100vh; display: flex; align-items: center; }
.t-hero::before { content: ""; position: absolute; inset: -200px 0 auto 0; height: 800px; pointer-events: none; background: radial-gradient(ellipse 70% 50% at 30% 30%, rgba(0,212,180,0.10) 0%, transparent 70%); }
.t-hero-inner { position: relative; width: 100%; max-width: 1320px; margin: 0 auto; }
.t-hero-cols { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: 56px; align-items: center; }
.t-hero-copy { text-align: left; max-width: 560px; }
.t-hero-visual { min-width: 0; }
.t-hero-visual .t-illus { margin: 0; max-width: none; }

@keyframes t-hero-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
.t-hero-title { font-family: var(--serif); font-weight: 400; font-size: clamp(2.4rem, 4.4vw, 4.25rem); line-height: 1.04; letter-spacing: -0.035em; color: var(--text); margin: 0 0 24px; text-wrap: balance; opacity: 0; animation: t-hero-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards; }
.t-hero-title em { font-style: italic; color: var(--teal); font-weight: 400; }
.t-headline-word { display: inline-block; min-width: 0; will-change: opacity; }
.t-headline-nowrap { white-space: nowrap; }

.t-hero-sub { font-size: 1.0625rem; line-height: 1.65; color: var(--secondary); margin: 0 0 32px; opacity: 0; animation: t-hero-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; }

.t-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-start; opacity: 0; animation: t-hero-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards; }
.t-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 24px; font-size: 0.9375rem; font-weight: 600; border-radius: 999px; border: 1px solid transparent; transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease; }
.t-btn-coral { background: var(--coral); color: #fff; border-color: var(--coral); }
.t-btn-coral:hover { background: var(--coral-hover); border-color: var(--coral-hover); }
.t-btn-ghost { background: transparent; color: var(--teal); border-color: rgba(0,212,180,0.45); }
.t-btn-ghost:hover { border-color: var(--teal); background: rgba(0,212,180,0.06); }

.t-trust-strip { display: flex; align-items: center; justify-content: flex-start; gap: 20px 24px; flex-wrap: wrap; margin-top: 32px; opacity: 0; animation: t-hero-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; }
.t-trust-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 0.75rem; letter-spacing: 0.04em; color: var(--secondary); font-weight: 500; }
.t-trust-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); display: inline-block; box-shadow: 0 0 8px rgba(0,212,180,0.5); }

/* ─── Hero illustration ─── */
.t-illus { max-width: 920px; width: 100%; margin: 64px auto 0; background: #0A0B0F; border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; overflow: hidden; position: relative; box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04); opacity: 0; animation: t-hero-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards; }
.t-illus-glow { position: absolute; width: 320px; height: 320px; pointer-events: none; z-index: 0; }
.t-illus-glow-teal { top: -80px; left: -60px; background: radial-gradient(circle, rgba(0,196,160,0.08) 0%, transparent 70%); }
.t-illus-glow-amber { bottom: -60px; right: -40px; background: radial-gradient(circle, rgba(220,90,40,0.06) 0%, transparent 70%); }
.t-illus-inner { position: relative; z-index: 2; padding: 32px 24px; }

.t-illus-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.t-illus-pane { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(7,7,10,0.45)); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 18px 18px 14px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.03); display: flex; flex-direction: column; }
.t-illus-pane-head { display: flex; align-items: center; justify-content: space-between; padding-bottom: 12px; }
.t-illus-eyebrow { font-size: 0.625rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(0,196,160,0.7); font-weight: 700; }
.t-illus-count { font-size: 0.6875rem; color: rgba(255,255,255,0.35); font-variant-numeric: tabular-nums; padding: 3px 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 999px; letter-spacing: 0.02em; }
.t-illus-colhead { display: flex; align-items: center; justify-content: space-between; padding: 8px 4px; font-size: 0.625rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.2); font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; }

.t-illus-rows { display: flex; flex-direction: column; gap: 6px; }
.t-illus-ref { display: flex; align-items: center; gap: 12px; padding: 10px 10px; border-radius: 8px; border: 1px solid transparent; background: transparent; opacity: 0; transform: translateY(6px); animation: t-illus-row-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.t-illus-ref-active { background: rgba(0,196,160,0.05); border-color: rgba(0,196,160,0.12); }
@keyframes t-illus-row-in { to { opacity: 1; transform: translateY(0); } }

.t-illus-init { width: 30px; height: 30px; flex-shrink: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(0,196,160,0.15); color: rgba(0,196,160,0.95); font-weight: 600; font-size: 0.6875rem; letter-spacing: 0.02em; border: 1px solid rgba(0,196,160,0.25); }
.t-illus-init-muted { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.07); }
.t-illus-ref-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.t-illus-ref-name { font-size: 0.75rem; font-weight: 500; color: rgba(255,255,255,0.85); line-height: 1.3; }
.t-illus-ref-meta { font-size: 0.625rem; color: rgba(255,255,255,0.3); line-height: 1.3; letter-spacing: 0.01em; }

.t-illus-pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border-radius: 4px; font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; flex-shrink: 0; border: 1px solid; }
.t-illus-pill-closed { background: rgba(0,196,160,0.12); color: rgba(0,196,160,0.9); border-color: rgba(0,196,160,0.2); }
.t-illus-pill-pending { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.4); border-color: rgba(255,255,255,0.08); }
.t-illus-pill-action { background: rgba(220,90,40,0.12); color: rgba(220,130,80,0.9); border-color: rgba(220,90,40,0.25); }
.t-illus-pill-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(0,196,160,0.95); }

/* Timeline */
.t-illus-pane-timeline { gap: 0; }
.t-illus-timeline-wrap { position: relative; padding: 8px 0 4px; }
.t-illus-rail { position: absolute; left: 24px; top: 12px; bottom: 12px; width: 1px; background: rgba(255,255,255,0.08); }
.t-illus-rail-fill { position: absolute; left: 24px; top: 12px; width: 1px; background: linear-gradient(to bottom, rgba(0,196,160,0.8), rgba(0,196,160,0.2)); height: 0; animation: t-rail-grow 2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards; box-shadow: 0 0 6px rgba(0,196,160,0.4); }
@keyframes t-rail-grow { from { height: 0; } to { height: 68%; } }

.t-illus-timeline { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; position: relative; }
.t-illus-step { display: flex; gap: 14px; align-items: flex-start; opacity: 0; transform: translateX(-4px); animation: t-step-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes t-step-in { to { opacity: 1; transform: translateX(0); } }
.t-illus-step-node { width: 18px; height: 18px; flex-shrink: 0; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.15); background: transparent; position: relative; display: flex; align-items: center; justify-content: center; margin-left: 0; z-index: 1; }
.t-illus-step-done { border-color: rgba(0,196,160,0.7); background: #0A0B0F; }
.t-illus-step-done .t-illus-step-core { width: 7px; height: 7px; border-radius: 50%; background: rgba(0,196,160,0.95); }
.t-illus-step-active { border-color: rgba(0,196,160,0.7); background: #0A0B0F; animation: t-pulse-ring 2s ease-out infinite; }
@keyframes t-pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(0,196,160,0.4); } 50% { box-shadow: 0 0 0 6px rgba(0,196,160,0); } 100% { box-shadow: 0 0 0 0 rgba(0,196,160,0); } }

.t-illus-step-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; padding-top: 1px; }
.t-illus-step-title { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
.t-illus-step-title strong { font-size: 0.75rem; font-weight: 500; color: rgba(255,255,255,0.75); line-height: 1.3; letter-spacing: -0.005em; }
.t-illus-step-time { font-size: 0.625rem; color: rgba(255,255,255,0.2); font-variant-numeric: tabular-nums; letter-spacing: 0.01em; }
.t-illus-step-sub { font-size: 0.625rem; color: rgba(255,255,255,0.3); line-height: 1.45; }

.t-illus-pane-foot { display: flex; align-items: center; gap: 8px; margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.625rem; color: rgba(255,255,255,0.2); letter-spacing: 0.04em; }
.t-illus-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #2ED573; box-shadow: 0 0 6px rgba(46,213,115,0.6); animation: t-blink 1.6s ease-in-out infinite; }

/* AI strip */
.t-illus-ai { margin-top: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 12px; opacity: 0; transform: translateY(6px); animation: t-illus-row-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards; }
.t-illus-ai-icon { width: 32px; height: 32px; flex-shrink: 0; border-radius: 8px; background: rgba(0,196,160,0.12); border: 1px solid rgba(0,196,160,0.18); display: flex; align-items: center; justify-content: center; }
.t-illus-ai-spinner { position: relative; width: 14px; height: 14px; animation: t-spin 3s linear infinite; }
@keyframes t-spin { to { transform: rotate(360deg); } }
.t-illus-ai-ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid rgba(0,196,160,0.5); }
.t-illus-ai-spinner-dot { position: absolute; top: -2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: rgba(0,196,160,0.95); box-shadow: 0 0 4px rgba(0,196,160,0.6); }
.t-illus-ai-main { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
.t-illus-ai-eyebrow { font-size: 0.625rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(0,196,160,0.6); font-weight: 700; }
.t-illus-ai-line { display: flex; align-items: center; min-height: 16px; }
.t-illus-ai-text { font-size: 0.8125rem; color: rgba(255,255,255,0.78); line-height: 1.3; font-variant-numeric: tabular-nums; }
.t-illus-ai-caret { display: inline-block; width: 1px; height: 11px; background: rgba(0,196,160,0.85); margin-left: 2px; animation: t-caret 1s steps(2, end) infinite; }
@keyframes t-caret { 50% { opacity: 0; } }
.t-illus-ai-action { padding: 5px 12px; background: rgba(0,196,160,0.1); border: 1px solid rgba(0,196,160,0.3); color: rgba(0,196,160,0.95); border-radius: 6px; font-size: 0.6875rem; font-weight: 600; font-family: var(--sans); letter-spacing: 0.02em; cursor: pointer; flex-shrink: 0; white-space: nowrap; transition: background-color 180ms ease, border-color 180ms ease, transform 80ms ease; }
.t-illus-ai-action:hover { background: rgba(0,196,160,0.18); border-color: rgba(0,196,160,0.5); }
.t-illus-ai-action:active { transform: scale(0.96); }
.t-illus-ai-action:focus-visible { outline: 2px solid rgba(0,196,160,0.6); outline-offset: 2px; }

/* EHR context header strip */
.t-illus-ehr { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 16px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.06); }
.t-illus-ehr-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
.t-illus-ehr-mark { width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgba(0,196,160,0.9), rgba(0,196,160,0.55)); color: #0A0B0F; font-family: var(--sans); font-size: 0.625rem; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; letter-spacing: -0.02em; flex-shrink: 0; box-shadow: 0 0 0 1px rgba(0,196,160,0.35); }
.t-illus-ehr-live-dot { width: 6px; height: 6px; border-radius: 50%; background: #2ED573; box-shadow: 0 0 6px rgba(46,213,115,0.7); animation: t-blink 1.6s ease-in-out infinite; flex-shrink: 0; }
.t-illus-ehr-text { font-size: 0.6875rem; color: rgba(255,255,255,0.4); letter-spacing: 0.01em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.t-illus-ehr-right { display: inline-flex; align-items: center; gap: 6px; font-size: 0.625rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,196,160,0.6); font-weight: 600; flex-shrink: 0; }
.t-illus-ehr-conn-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(0,196,160,0.9); box-shadow: 0 0 6px rgba(0,196,160,0.5); }

/* REROUTING pill (replaces ACTION on click) */
.t-illus-pill-rerouting { background: rgba(0,196,160,0.15); color: rgba(0,196,160,0.95); border-color: rgba(0,196,160,0.35); animation: t-pill-pulse 1.4s ease-in-out infinite; }
.t-illus-pill-rerouting .t-illus-pill-dot { background: rgba(0,196,160,0.95); box-shadow: 0 0 6px rgba(0,196,160,0.7); }
@keyframes t-pill-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(0,196,160,0.35); } 50% { box-shadow: 0 0 0 4px rgba(0,196,160,0); } }
.t-illus-ref-rerouting { transition: background-color 250ms ease, border-color 250ms ease; background: rgba(0,196,160,0.08); border-color: rgba(0,196,160,0.16); }

/* Slide-down expand wrapper (grid-rows trick) */
.t-illus-expand { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 300ms ease, margin 300ms ease, opacity 200ms ease; opacity: 0; margin-top: 0; }
.t-illus-expand-open { grid-template-rows: 1fr; opacity: 1; margin-top: 6px; }
.t-illus-expand-inner { overflow: hidden; min-height: 0; }

/* Alternative specialist card */
.t-illus-alt { display: flex; align-items: center; gap: 12px; padding: 12px 12px; border-radius: 8px; background: rgba(0,196,160,0.06); border: 1px solid rgba(0,196,160,0.18); margin-left: 42px; }
.t-illus-alt-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(0,196,160,0.95); box-shadow: 0 0 6px rgba(0,196,160,0.5); flex-shrink: 0; }
.t-illus-alt-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.t-illus-alt-name { font-size: 0.75rem; font-weight: 500; color: rgba(255,255,255,0.88); line-height: 1.3; }
.t-illus-alt-meta { font-size: 0.625rem; color: rgba(0,196,160,0.7); line-height: 1.3; letter-spacing: 0.01em; }
.t-illus-alt-btn { padding: 5px 10px; background: rgba(0,196,160,0.95); color: #0A0B0F; border: none; border-radius: 5px; font-size: 0.625rem; font-weight: 700; font-family: var(--sans); letter-spacing: 0.04em; text-transform: uppercase; cursor: default; flex-shrink: 0; }

/* Visit summary card inside Completed step */
.t-illus-step-sub { transition: opacity 200ms ease, max-height 200ms ease; max-height: 40px; overflow: hidden; }
.t-illus-step-sub-hidden { opacity: 0; max-height: 0; }
.t-illus-step-summary { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 300ms ease, opacity 240ms ease, margin 300ms ease; opacity: 0; margin-top: 0; }
.t-illus-step-summary-open { grid-template-rows: 1fr; opacity: 1; margin-top: 6px; }
.t-illus-step-summary-inner { overflow: hidden; min-height: 0; display: flex; flex-direction: column; gap: 3px; padding: 10px 12px; background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; }
.t-illus-step-summary-line { display: flex; align-items: baseline; gap: 8px; font-size: 0.6875rem; color: rgba(255,255,255,0.72); line-height: 1.5; }
.t-illus-step-summary-line span { font-size: 0.5625rem; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.32); font-weight: 600; min-width: 60px; flex-shrink: 0; }
.t-illus-step-summary-conf { display: inline-flex; align-items: center; gap: 6px; font-size: 0.625rem; color: rgba(0,196,160,0.9); letter-spacing: 0.04em; padding-top: 6px; margin-top: 4px; border-top: 1px solid rgba(0,196,160,0.12); font-weight: 600; }
.t-illus-step-summary-conf svg { width: 10px; height: 10px; color: rgba(0,196,160,0.95); flex-shrink: 0; }

/* ─── STATS ─── */
.t-stats-section { padding: 96px 24px; border-top: 1px solid var(--t-border); }
.t-stats { display: grid; grid-template-columns: repeat(3, 1fr); max-width: 1080px; margin: 0 auto; }
.t-stat { padding: 24px 32px; text-align: center; position: relative; }
.t-stat + .t-stat::before { content: ""; position: absolute; left: 0; top: 12%; bottom: 12%; width: 1px; background: var(--t-border); }
.t-stat-n { font-family: var(--serif); font-size: clamp(3.25rem, 6vw, 4.5rem); font-weight: 400; line-height: 1; letter-spacing: -0.04em; color: var(--teal); margin-bottom: 16px; font-variant-numeric: tabular-nums; }
.t-stat-l { font-size: 0.9375rem; color: var(--secondary); line-height: 1.55; max-width: 280px; margin: 0 auto; }

/* ─── SECTION DEFAULTS ─── */
.t-section { padding: 112px 24px; }
.t-section-inner { max-width: 1080px; margin: 0 auto; }
.t-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--teal); margin-bottom: 16px; opacity: 0.85; }
.t-h2 { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.035em; color: var(--text); text-wrap: balance; }
.t-section-head { text-align: center; max-width: 720px; margin: 0 auto 72px; }
.t-section-head p { color: var(--secondary); font-size: 1.0625rem; margin-top: 16px; }

/* ─── HOW IT WORKS ─── */
.t-how { background: var(--bg); border-top: 1px solid var(--t-border); }
.t-how-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.t-how-card { background: var(--surface); border: 1px solid var(--t-border); border-left: 3px solid rgba(0,212,180,0.2); border-radius: 16px; padding: 36px 32px; transition: background-color 200ms ease, border-color 200ms ease, border-left-color 200ms ease; }
.t-how-card-2 { border-left-color: rgba(0,212,180,0.5); }
.t-how-card-3 { border-left-color: rgba(0,212,180,0.8); }
.t-how-card:hover { background: rgba(0,196,160,0.04); border-color: rgba(0,196,160,0.15); }
.t-how-card-1:hover { border-left-color: rgba(0,212,180,0.4); }
.t-how-card-2:hover { border-left-color: rgba(0,212,180,0.7); }
.t-how-card-3:hover { border-left-color: rgba(0,212,180,1); }
.t-how-card:hover .t-how-num { color: rgba(0,196,160,0.4); }
.t-how-num { font-family: var(--serif); font-size: 2.5rem; font-weight: 400; color: var(--tertiary); letter-spacing: -0.03em; line-height: 1; margin-bottom: 28px; transition: color 200ms ease; }
.t-how-card h3 { font-family: var(--serif); font-size: 1.5rem; font-weight: 400; letter-spacing: -0.025em; color: var(--text); margin-bottom: 12px; }
.t-how-card p { font-size: 0.9375rem; color: var(--secondary); line-height: 1.65; }

/* ─── SOCIAL PROOF / PROOF POINTS ─── */
.t-social { padding: 112px 24px; background: var(--bg); border-top: 1px solid var(--t-border); }
.t-social-inner { max-width: 1080px; margin: 0 auto; text-align: center; }
.t-social-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--teal); opacity: 0.8; margin-bottom: 18px; }
.t-social-headline { font-family: var(--serif); font-size: clamp(1.875rem, 4vw, 2.75rem); font-weight: 400; line-height: 1.12; letter-spacing: -0.035em; color: var(--text); margin: 0 auto 56px; max-width: 820px; text-wrap: balance; }

.t-proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 980px; margin: 0 auto; text-align: left; }
.t-proof-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 10px; transition: border-color 200ms ease, background-color 200ms ease; }
.t-proof-card:hover { border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.035); }
.t-proof-icon { width: 28px; height: 28px; border-radius: 8px; background: rgba(0,212,180,0.15); color: var(--teal); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.t-proof-title { font-size: 1rem; font-weight: 600; color: var(--text); letter-spacing: -0.01em; }
.t-proof-body { font-size: 0.875rem; color: var(--secondary); line-height: 1.6; }

.t-social-closer { font-family: var(--serif); font-style: italic; font-size: 1.25rem; color: var(--text); line-height: 1.5; max-width: 640px; margin: 56px auto 0; letter-spacing: -0.01em; }

/* ─── FINAL CTA ─── */
.t-cta { padding: 96px 24px 128px; }
.t-cta-inner { max-width: 880px; margin: 0 auto; }
.t-cta-card { position: relative; padding: 72px 48px; border-radius: 24px; text-align: center; background: linear-gradient(180deg, var(--surface), var(--navy-darkest)); border: 1px solid var(--t-border-strong); overflow: hidden; isolation: isolate; }
.t-cta-card::before { content: ""; position: absolute; inset: -1px; border-radius: 24px; padding: 1px; background: linear-gradient(135deg, rgba(0,212,180,0.55) 0%, rgba(0,212,180,0) 35%, rgba(224,90,58,0.35) 100%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask-composite: exclude; pointer-events: none; z-index: 0; }
.t-cta-card::after { content: ""; position: absolute; left: 50%; top: -180px; width: 600px; height: 360px; transform: translateX(-50%); background: radial-gradient(ellipse, rgba(0,212,180,0.18), transparent 60%); pointer-events: none; z-index: 0; }
.t-cta-card > * { position: relative; z-index: 1; }
.t-cta-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.035em; color: var(--text); margin-bottom: 16px; text-wrap: balance; }
.t-cta-sub { font-size: 1.0625rem; color: var(--secondary); max-width: 560px; margin: 0 auto 36px; line-height: 1.65; }

/* ─── FOOTER ─── */
.t-footer { padding: 64px 24px 32px; background: var(--navy-darkest); border-top: 1px solid var(--t-border); }
.t-footer-inner { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: 1fr 2fr; gap: 56px; align-items: start; }
.t-footer-brand { display: flex; flex-direction: column; gap: 12px; }
.t-footer-tagline { font-size: 0.875rem; color: var(--tertiary); max-width: 280px; line-height: 1.55; }
.t-footer-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
.t-footer-col h5 { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--secondary); margin-bottom: 14px; }
.t-footer-col a { display: block; font-size: 0.875rem; color: var(--tertiary); margin-bottom: 10px; transition: color 150ms ease; }
.t-footer-col a:hover { color: var(--text); }
.t-footer-bottom { max-width: 1080px; margin: 56px auto 0; padding-top: 24px; border-top: 1px solid var(--t-border); display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 0.8125rem; color: var(--secondary); }
.t-footer-social { color: var(--secondary); transition: color 150ms ease; }
.t-footer-social:hover { color: var(--teal); }

/* ─── RESPONSIVE ─── */
@media (max-width: 900px) {
  .t-nav { padding: 0 20px; }
  .t-nav-links { display: none; }
  .t-nav-mob { display: block; }
  .t-section, .t-social, .t-stats-section, .t-cta { padding-left: 20px; padding-right: 20px; }
  .t-how-grid { grid-template-columns: 1fr; gap: 16px; }
  .t-stats { grid-template-columns: 1fr; }
  .t-stat { padding: 32px 24px; }
  .t-stat + .t-stat::before { left: 12%; right: 12%; top: 0; bottom: auto; width: auto; height: 1px; }
  .t-footer-inner { grid-template-columns: 1fr; gap: 40px; }
  .t-footer-links { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .t-proof-grid { grid-template-columns: 1fr; }
}
@media (max-width: 1100px) {
  .t-hero { min-height: 0; padding: 132px 24px 72px; display: block; }
  .t-hero-cols { grid-template-columns: 1fr; gap: 40px; }
  .t-hero-copy { text-align: center; max-width: 720px; margin: 0 auto; }
  .t-hero-actions { justify-content: center; }
  .t-trust-strip { justify-content: center; }
  .t-hero-visual .t-illus { max-width: 920px; margin: 0 auto; }
}
@media (max-width: 768px) {
  .t-hero { padding: 124px 20px 64px; }
  .t-illus { margin-top: 0; }
  .t-illus-inner { padding: 22px 16px; }
  .t-illus-grid { grid-template-columns: 1fr; gap: 10px; }
  .t-illus-pane { padding: 16px; }
  .t-illus-ehr { padding: 7px 14px; gap: 8px; }
  .t-illus-ehr-text { font-size: 0.625rem; }
  .t-illus-ehr-right span:last-child { display: none; }
  .t-illus-alt { margin-left: 0; }
  .t-illus-ai { padding: 12px 14px; gap: 10px; }
  .t-illus-ai-action { font-size: 0.625rem; padding: 4px 10px; }
  .t-illus-ai-text { font-size: 0.75rem; }
  .t-cta-card { padding: 56px 28px; }
  .t-footer-links { grid-template-columns: 1fr; gap: 28px; }
  .t-trust-strip { gap: 14px 22px; }
  .t-social-closer { font-size: 1.0625rem; margin-top: 40px; }
}
@media (max-width: 480px) {
  .t-hero-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 320px; margin: 0 auto; }
  .t-btn { justify-content: center; }
  .t-section { padding-top: 80px; padding-bottom: 80px; }
  .t-stats-section, .t-social, .t-cta { padding-top: 72px; padding-bottom: 72px; }
}

@keyframes t-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

/* ─── ASK TETHER ─── */
.t-ask { background: var(--bg); border-top: 1px solid var(--t-border); }
.t-chat { max-width: 700px; margin: 0 auto; }
.t-chat-panel { background: linear-gradient(180deg, rgba(0,212,180,0.03), transparent 30%), linear-gradient(180deg, var(--surface), var(--navy-darkest)); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05); }
.t-chat-head { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: rgba(7,7,10,0.6); border-bottom: 1px solid var(--t-border); }
.t-chat-lights { display: inline-flex; gap: 6px; }
.t-chat-lights span { width: 10px; height: 10px; border-radius: 50%; opacity: 0.85; }
.t-chat-title { flex: 1; text-align: center; font-size: 0.8125rem; color: var(--secondary); font-weight: 500; letter-spacing: 0.01em; }
.t-chat-status { display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; color: var(--secondary); letter-spacing: 0.04em; }
.t-chat-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #2ED573; box-shadow: 0 0 8px rgba(46,213,115,0.7); animation: t-blink 1.8s ease-in-out infinite; }
.t-chat-body { padding: 20px 18px; display: flex; flex-direction: column; gap: 12px; min-height: 360px; }
.t-msg { max-width: 88%; }
.t-msg-user { align-self: flex-end; max-width: 80%; padding: 10px 14px; background: rgba(255,255,255,0.06); color: var(--text); font-size: 0.9375rem; border-radius: 14px 14px 4px 14px; border: 1px solid var(--t-border); }
.t-msg-user p { margin: 0; line-height: 1.45; }
.t-msg-agent { align-self: flex-start; }
.t-msg-card { background: rgba(7,7,10,0.55); border: 1px solid var(--t-border); border-left: 2px solid var(--teal); border-radius: 4px 12px 12px 12px; padding: 14px 16px; min-width: 340px; }
.t-msg-card-head { font-size: 0.875rem; font-weight: 600; color: var(--text); margin-bottom: 12px; letter-spacing: -0.005em; }
.t-msg-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
.t-msg-card li { display: flex; align-items: center; gap: 10px; font-size: 0.8125rem; color: var(--secondary); line-height: 1.45; flex-wrap: wrap; }
.t-msg-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.t-msg-dot-warn { background: #F0B100; box-shadow: 0 0 6px rgba(240,177,0,0.4); }
.t-msg-dot-danger { background: #E05A3A; box-shadow: 0 0 6px rgba(224,90,58,0.5); }
.t-msg-item-text { flex: 1; min-width: 0; }
.t-msg-action { padding: 4px 10px; background: transparent; border: 1px solid var(--teal); color: var(--teal-light); border-radius: 4px; font-size: 0.75rem; font-weight: 600; font-family: var(--sans); letter-spacing: 0.02em; cursor: default; }
.t-msg-confirm { display: inline-flex; align-items: center; gap: 10px; background: rgba(0,212,180,0.08); border: 1px solid rgba(0,212,180,0.25); border-radius: 14px 14px 14px 4px; padding: 10px 14px; max-width: 100%; }
.t-msg-check { width: 22px; height: 22px; flex-shrink: 0; border-radius: 50%; background: var(--teal); color: var(--navy-darkest); display: inline-flex; align-items: center; justify-content: center; }
.t-msg-check svg { width: 11px; height: 11px; }
.t-msg-confirm-text { font-size: 0.875rem; color: var(--text); font-weight: 500; }
.t-msg-time { font-size: 0.75rem; color: var(--tertiary); margin-left: auto; padding-left: 12px; }

.t-ask-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 980px; margin: 56px auto 0; text-align: left; }
.t-ask-tile { background: rgba(255,255,255,0.02); border: 1px solid var(--t-border); border-radius: 12px; padding: 24px; display: flex; flex-direction: column; gap: 10px; transition: border-color 200ms ease, background-color 200ms ease; }
.t-ask-tile:hover { border-color: var(--t-border-strong); background: rgba(255,255,255,0.035); }
.t-ask-tile-icon { width: 28px; height: 28px; border-radius: 8px; background: rgba(0,212,180,0.15); color: var(--teal); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.t-ask-tile h4 { font-size: 1rem; font-weight: 600; color: var(--text); letter-spacing: -0.01em; }
.t-ask-tile p { font-size: 0.875rem; color: var(--secondary); line-height: 1.6; }

/* ─── EHR HUB ─── */
.t-ehr { background: var(--bg); border-top: 1px solid var(--t-border); }
.t-hub { position: relative; max-width: 760px; margin: 0 auto; aspect-ratio: 5 / 3; min-height: 320px; }
.t-hub-lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.t-hub-center { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 132px; height: 132px; border-radius: 50%; background: radial-gradient(circle, rgba(0,212,180,0.18), rgba(7,7,10,0.9) 70%), var(--surface); border: 1.5px solid var(--teal); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 40px rgba(0,212,180,0.25), inset 0 0 0 4px rgba(0,212,180,0.06); z-index: 2; }
.t-hub-tile { position: absolute; padding: 10px 16px; background: rgba(0,196,160,0.08); border: 1px solid rgba(0,196,160,0.15); border-radius: 8px; min-width: 152px; display: flex; align-items: center; justify-content: center; gap: 8px; z-index: 1; }
.t-hub-tile-muted { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); }
.t-hub-tile-tl { left: 0; top: 0; }
.t-hub-tile-tr { right: 0; top: 0; }
.t-hub-tile-bl { left: 0; bottom: 0; }
.t-hub-tile-br { right: 0; bottom: 0; }
.t-hub-name { font-size: 0.8125rem; font-weight: 500; color: rgba(255,255,255,0.8); letter-spacing: -0.005em; }
.t-hub-tile-muted .t-hub-name { font-size: 0.75rem; color: rgba(255,255,255,0.4); }
.t-hub-pill { font-size: 0.5625rem; padding: 2px 6px; border-radius: 3px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; border: 1px solid; }
.t-hub-pill-live { background: rgba(0,196,160,0.15); color: rgba(0,196,160,0.85); border-color: rgba(0,196,160,0.3); }
.t-hub-pill-soon { background: rgba(220,90,40,0.12); color: rgba(220,130,80,0.95); border-color: rgba(220,90,40,0.25); }

@keyframes t-hub-in-tl { 0% { transform: translate(80px, 60px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(300px, 180px); opacity: 0; } }
@keyframes t-hub-in-tr { 0% { transform: translate(520px, 60px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(300px, 180px); opacity: 0; } }
@keyframes t-hub-in-bl { 0% { transform: translate(80px, 300px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(300px, 180px); opacity: 0; } }
@keyframes t-hub-in-br { 0% { transform: translate(520px, 300px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(300px, 180px); opacity: 0; } }
@keyframes t-hub-out-tl { 0% { transform: translate(300px, 180px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(80px, 60px); opacity: 0; } }
@keyframes t-hub-out-tr { 0% { transform: translate(300px, 180px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(520px, 60px); opacity: 0; } }
@keyframes t-hub-out-bl { 0% { transform: translate(300px, 180px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(80px, 300px); opacity: 0; } }
@keyframes t-hub-out-br { 0% { transform: translate(300px, 180px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translate(520px, 300px); opacity: 0; } }

.t-hub-dot { transform-box: fill-box; transform-origin: center; }
.t-hub-dot-in-tl { animation: t-hub-in-tl 3.4s linear infinite; }
.t-hub-dot-in-tr { animation: t-hub-in-tr 3.4s linear infinite 0.6s; }
.t-hub-dot-in-bl { animation: t-hub-in-bl 3.4s linear infinite 1.2s; }
.t-hub-dot-in-br { animation: t-hub-in-br 3.4s linear infinite 1.8s; }
.t-hub-dot-out-tl { animation: t-hub-out-tl 3.4s linear infinite 1.7s; }
.t-hub-dot-out-tr { animation: t-hub-out-tr 3.4s linear infinite 2.3s; }
.t-hub-dot-out-bl { animation: t-hub-out-bl 3.4s linear infinite 2.9s; }
.t-hub-dot-out-br { animation: t-hub-out-br 3.4s linear infinite 0.5s; }

.t-ehr-callout { margin: 40px auto 0; max-width: 620px; text-align: center; display: inline-flex; align-items: center; gap: 10px; padding: 10px 18px; background: rgba(255,255,255,0.02); border: 1px solid var(--t-border); border-radius: 999px; font-size: 0.875rem; color: var(--secondary); }
.t-ehr-callout em { font-style: italic; color: var(--text); font-weight: 400; }
.t-ehr-callout-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); box-shadow: 0 0 8px rgba(0,212,180,0.6); flex-shrink: 0; }
.t-ehr .t-section-head { margin-bottom: 64px; }
.t-ehr .t-section-inner { text-align: center; }

/* ─── BEFORE / AFTER COMPARE ─── */
.t-compare { background: linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%); border-top: 1px solid var(--t-border); }
.t-compare-headline { text-align: center; max-width: 720px; margin: 0 auto 56px; }
.t-compare-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; max-width: 980px; margin: 0 auto; align-items: stretch; }
.t-compare-grid > div { display: flex; }
.t-compare-card { flex: 1; height: 100%; position: relative; background: linear-gradient(180deg, rgba(255,255,255,0.025), rgba(7,7,10,0.4)); border: 1px solid var(--t-border); border-radius: 14px; padding: 28px 28px 24px; display: flex; flex-direction: column; min-height: 380px; }
.t-compare-card::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 2px; border-radius: 14px 14px 0 0; }
.t-compare-card-before::before { background: rgba(220,90,40,0.4); }
.t-compare-card-after::before { background: rgba(0,196,160,0.4); }
.t-compare-head { margin-bottom: 18px; }
.t-compare-eyebrow { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
.t-compare-eyebrow-before { color: rgba(220,130,80,0.95); }
.t-compare-eyebrow-after { color: rgba(0,196,160,0.95); }
.t-compare-steps { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 12px; }
.t-compare-step { display: flex; align-items: flex-start; gap: 12px; font-size: 0.875rem; line-height: 1.5; color: var(--secondary); }
.t-compare-step-before { color: rgba(255,255,255,0.55); }
.t-compare-step-after { color: rgba(255,255,255,0.85); }
.t-compare-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 7px; }
.t-compare-dot-before { background: rgba(220,90,40,0.85); box-shadow: 0 0 4px rgba(220,90,40,0.25); }
.t-compare-dot-after { background: rgba(0,196,160,0.95); box-shadow: 0 0 6px rgba(0,196,160,0.45); }
.t-compare-text { flex: 1; min-width: 0; }
.t-compare-foot { font-size: 0.8125rem; padding-top: 16px; margin-top: auto; border-top: 1px solid var(--t-border); letter-spacing: 0.01em; }
.t-compare-foot-before { color: rgba(220,130,80,0.85); }
.t-compare-foot-after { color: rgba(0,196,160,0.9); }

/* ─── PLATFORM 2x2 ─── */
.t-platform { background: var(--bg); border-top: 1px solid var(--t-border); }
.t-platform-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 960px; margin: 0 auto; align-items: stretch; }
.t-platform-grid > div { display: flex; }
.t-platform-card { background: rgba(255,255,255,0.02); border: 1px solid var(--t-border); border-radius: 14px; padding: 28px; display: flex; flex-direction: column; gap: 12px; flex: 1; transition: border-color 200ms ease, background-color 200ms ease; }
.t-platform-card-live { border-color: rgba(0,196,160,0.22); background: linear-gradient(180deg, rgba(0,196,160,0.04), rgba(255,255,255,0.02)); box-shadow: inset 0 0 0 1px rgba(0,196,160,0.06); }
.t-platform-card:hover { border-color: var(--t-border-strong); background: rgba(255,255,255,0.035); }
.t-platform-card-live:hover { border-color: rgba(0,196,160,0.35); }
.t-platform-num { font-family: var(--serif); font-size: 1.5rem; font-weight: 400; color: var(--tertiary); letter-spacing: -0.03em; line-height: 1; }
.t-platform-badge { display: inline-flex; align-self: flex-start; margin-top: auto; font-size: 0.75rem; font-weight: 600; padding: 3px 10px; border-radius: 999px; letter-spacing: 0.04em; text-transform: uppercase; border: 1px solid; }
.t-platform-badge-live { background: rgba(0,212,180,0.12); color: var(--teal-light); border-color: rgba(0,212,180,0.35); }
.t-platform-badge-soon { background: rgba(224,90,58,0.1); color: #F0846A; border-color: rgba(224,90,58,0.35); }
.t-platform-badge-later { background: rgba(255,255,255,0.04); color: var(--tertiary); border-color: var(--t-border); }
.t-platform-title { font-family: var(--serif); font-size: 1.375rem; font-weight: 400; letter-spacing: -0.025em; color: var(--text); }
.t-platform-body { font-size: 0.9375rem; color: var(--secondary); line-height: 1.6; }

/* ─── Responsive: new sections ─── */
@media (max-width: 900px) {
  .t-ask-tiles, .t-platform-grid, .t-compare-grid { grid-template-columns: 1fr; }
  .t-compare-card { min-height: 0; }
  .t-msg-card { min-width: 0; }
  .t-hub { aspect-ratio: auto; min-height: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .t-hub-lines, .t-hub-center { display: none; }
  .t-hub-tile { position: static; min-width: 0; padding: 18px; }
}
@media (max-width: 768px) {
  .t-chat-body { padding: 16px 14px; min-height: 320px; }
  .t-msg-card { padding: 12px 14px; }
  .t-msg-time { display: none; }
  .t-ehr-callout { flex-direction: column; gap: 6px; padding: 14px 18px; border-radius: 14px; text-align: center; }
}
`;

// ─── Main Component ───
export default function TetherLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useScrollY();

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setScrolled(scrollY > 24);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    setScrollPct(h > 0 ? (scrollY / h) * 100 : 0);
  }, [scrollY]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tether Health",
          url: "https://tetherhealth.co",
          logo: "https://tetherhealth.co/logo.png",
          description:
            "AI agents that connect PCPs and specialists, close the referral loop, and integrate directly with your EHR.",
          sameAs: ["https://www.linkedin.com/company/tetherhealth"],
          contactPoint: { "@type": "ContactPoint", contactType: "sales", email: "hello@tetherhealth.co" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Tether",
          applicationCategory: "HealthApplication",
          operatingSystem: "Web",
          description:
            "Intelligent referral coordination for medical practices. AI agents that pull from your EHR, coordinate with specialists, and close the loop.",
          url: "https://tetherhealth.co",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Contact us for pricing" },
          featureList: [
            "EHR-integrated referrals",
            "Closed-loop referral tracking",
            "AI referral coordination agents",
            "Specialist directory",
          ],
        }}
      />
      <style>{CSS}</style>
      <div className="tether-lp">
        <div className="t-scroll-prog" style={{ width: `${scrollPct}%` }} />

        {/* NAV */}
        <nav className={`t-nav ${scrolled ? "t-nav-s" : ""}`}>
          <a href="#" aria-label="Tether — home"><TetherWordmark /></a>
          <ul className="t-nav-links">
            <li><a href="#how">How It Works</a></li>
            <li><a href="/security">Security</a></li>
            <li><a href="https://app.tetherhealth.co/login">Log In</a></li>
            <li><a href="/request-demo" className="t-nav-cta">Request Demo</a></li>
          </ul>
          <button className="t-nav-mob" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </nav>
        {mobileMenuOpen && (
          <div className="t-nav-overlay">
            <button className="t-nav-overlay-close" aria-label="Close" onClick={() => setMobileMenuOpen(false)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <a href="#how" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="/security" onClick={() => setMobileMenuOpen(false)}>Security</a>
            <a href="https://app.tetherhealth.co/login" onClick={() => setMobileMenuOpen(false)}>Log In</a>
            <a href="/request-demo" className="t-nav-overlay-cta" onClick={() => setMobileMenuOpen(false)}>Request Demo</a>
          </div>
        )}

        {/* HERO */}
        <section className="t-hero">
          <div className="t-hero-inner">
            <div className="t-hero-cols">
              <div className="t-hero-copy">
                <h1 className="t-hero-title">
                  Every referral is a{" "}
                  <span className="t-headline-nowrap"><RotatingWord />.</span>
                  {" "}Stop losing them.
                </h1>
                <p className="t-hero-sub">
                  Tether&apos;s AI agents live inside your EHR. They coordinate referrals, verify specialists, close the loop, and push visit summaries back to your chart. Automatically.
                </p>
                <div className="t-hero-actions">
                  <a href="/request-demo" className="t-btn t-btn-coral">Request Demo</a>
                  <a href="#how" className="t-btn t-btn-ghost">See How It Works <IconArrowRight /></a>
                </div>
                <div className="t-trust-strip" role="list">
                  <span className="t-trust-badge" role="listitem"><span className="t-trust-badge-dot" />Athena EHR Integrated</span>
                  <span className="t-trust-badge" role="listitem"><span className="t-trust-badge-dot" />HIPAA Compliant</span>
                  <span className="t-trust-badge" role="listitem"><span className="t-trust-badge-dot" />MDVIP-Affiliated</span>
                </div>
              </div>
              <div className="t-hero-visual">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="t-stats-section" aria-label="Industry statistics">
          <StatsRow />
        </section>

        {/* HOW IT WORKS */}
        <section className="t-how t-section" id="how">
          <div className="t-section-inner">
            <div className="t-section-head">
              <Reveal><div className="t-eyebrow">How It Works</div></Reveal>
              <Reveal delay={0.05}><h2 className="t-h2">Three steps. Zero phone calls.</h2></Reveal>
            </div>
            <div className="t-how-grid">
              <Reveal delay={0}>
                <div className="t-how-card t-how-card-1">
                  <div className="t-how-num">01</div>
                  <h3>Send</h3>
                  <p>Pull patient data from your chart and send a structured referral in one click. No fax hunting, no manual entry.</p>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="t-how-card t-how-card-2">
                  <div className="t-how-num">02</div>
                  <h3>Coordinate</h3>
                  <p>AI agents monitor the referral, follow up with the specialist, and flag anything that needs your attention.</p>
                </div>
              </Reveal>
              <Reveal delay={0.30}>
                <div className="t-how-card t-how-card-3">
                  <div className="t-how-num">03</div>
                  <h3>Close the Loop</h3>
                  <p>When the visit happens, the summary lands back in your chart. You see every outcome, not just the ones that follow up.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER — the referral problem, visually */}
        <BeforeAfter />

        {/* ASK TETHER — AI intelligence layer */}
        <section className="t-ask t-section" id="ask-tether" aria-labelledby="t-ask-title">
          <div className="t-section-inner">
            <div className="t-section-head">
              <Reveal><div className="t-eyebrow">AI Intelligence Layer</div></Reveal>
              <Reveal delay={0.05}>
                <h2 id="t-ask-title" className="t-h2">Your referral coordinator that never sleeps.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p>Type a question, get an action. Ask Tether watches your referrals around the clock and answers from live EHR data &mdash; not from a generic model.</p>
              </Reveal>
            </div>
            <Reveal delay={0.15}><AskTetherChatDemo /></Reveal>
            <div className="t-ask-tiles">
              <Reveal delay={0.05}>
                <div className="t-ask-tile">
                  <span className="t-ask-tile-icon" aria-hidden><IconBolt /></span>
                  <h4>Answers from your data</h4>
                  <p>Ask which referrals need follow-up, what a specialist requires, or why a patient hasn&rsquo;t been seen. Real answers from your actual data.</p>
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="t-ask-tile">
                  <span className="t-ask-tile-icon" aria-hidden><IconSend /></span>
                  <h4>Acts, doesn&rsquo;t just suggest</h4>
                  <p>Sends the follow-up. Finds the alternate specialist. Flags the stuck loop. All inside the same conversation.</p>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="t-ask-tile">
                  <span className="t-ask-tile-icon" aria-hidden><IconSpark /></span>
                  <h4>Learns your network</h4>
                  <p>After 100 referrals, Tether knows which specialists actually pick up the phone, which close the loop, and which to route around.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* EHR INTEGRATIONS — hub and spoke */}
        <section className="t-ehr t-section" id="integrations" aria-labelledby="t-ehr-title">
          <div className="t-section-inner">
            <div className="t-section-head">
              <Reveal><div className="t-eyebrow">Integrations</div></Reveal>
              <Reveal delay={0.05}>
                <h2 id="t-ehr-title" className="t-h2">Lives inside the tools you already use.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p>Tether sits inside Athena today and the EHRs you&rsquo;ll add next. Your team learns nothing new.</p>
              </Reveal>
            </div>
            <Reveal delay={0.15}><EHRHubDiagram /></Reveal>
            <Reveal delay={0.25}>
              <p className="t-ehr-callout">
                <span className="t-ehr-callout-dot" aria-hidden />
                <em>Athena integration live in production. Visit summaries push back to your chart automatically.</em>
              </p>
            </Reveal>
          </div>
        </section>

        {/* PLATFORM VISION */}
        <section className="t-platform t-section" id="platform" aria-labelledby="t-platform-title">
          <div className="t-section-inner">
            <div className="t-section-head">
              <Reveal><div className="t-eyebrow">The Platform</div></Reveal>
              <Reveal delay={0.05}>
                <h2 id="t-platform-title" className="t-h2">Referrals are just the beginning.</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p>Your MA shouldn&rsquo;t spend 40 minutes chasing a fax confirmation. From sending the referral to booking the appointment, every step belongs to an agent &mdash; not your staff.</p>
              </Reveal>
            </div>
            <PlatformGrid />
          </div>
        </section>

        {/* SOCIAL PROOF — proof points + inline testimonial */}
        <section className="t-social" aria-labelledby="t-social-title">
          <div className="t-social-inner">
            <Reveal><div className="t-social-eyebrow">Built on real clinical workflows</div></Reveal>
            <Reveal delay={0.05}>
              <h2 id="t-social-title" className="t-social-headline">
                The first referral tool that talks to your EHR. Both ways.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="t-proof-grid">
                <article className="t-proof-card">
                  <span className="t-proof-icon" aria-hidden="true"><IconCheck /></span>
                  <h3 className="t-proof-title">Live Athena Integration</h3>
                  <p className="t-proof-body">Patient data in. Visit summaries out. Same chart your team already uses.</p>
                </article>
                <article className="t-proof-card">
                  <span className="t-proof-icon" aria-hidden="true"><IconCheck /></span>
                  <h3 className="t-proof-title">HIPAA-Compliant AI</h3>
                  <p className="t-proof-body">Agents operate inside your existing EHR. No PHI leaves your perimeter.</p>
                </article>
                <article className="t-proof-card">
                  <span className="t-proof-icon" aria-hidden="true"><IconCheck /></span>
                  <h3 className="t-proof-title">MDVIP Network</h3>
                  <p className="t-proof-body">Trusted by MDVIP-affiliated practices across the DC metro.</p>
                </article>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="t-social-closer">
                Every referral, tracked end to end. Every outcome, pushed back to your chart.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="t-cta">
          <div className="t-cta-inner">
            <Reveal>
              <div className="t-cta-card">
                <h2 className="t-cta-title">Built for the way practices actually work.</h2>
                <p className="t-cta-sub">No rip-and-replace. No months of onboarding. Tether works alongside Athena and the EHRs you already run.</p>
                <a href="/request-demo" className="t-btn t-btn-coral">Request Early Access <IconArrowRight /></a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="t-footer">
          <div className="t-footer-inner">
            <div className="t-footer-brand">
              <TetherWordmark />
              <p className="t-footer-tagline">The referral network for modern medical practices.</p>
            </div>
            <div className="t-footer-links">
              <div className="t-footer-col">
                <h5>Product</h5>
                <a href="#how">How It Works</a>
                <a href="/security">Security</a>
                <a href="/for-specialists">For Specialists</a>
              </div>
              <div className="t-footer-col">
                <h5>Company</h5>
                <a href="#">About</a>
                <a href="/blog">Blog</a>
                <a href="/request-demo">Contact</a>
              </div>
              <div className="t-footer-col">
                <h5>Legal</h5>
                <a href="/legal#privacy">Privacy</a>
                <a href="/legal#terms">Terms</a>
                <a href="/legal#hipaa">HIPAA</a>
              </div>
            </div>
          </div>
          <div className="t-footer-bottom">
            <span>&copy; 2026 Tether Health, Inc.</span>
            <a href="https://www.linkedin.com/company/111649326/" target="_blank" rel="noopener noreferrer" className="t-footer-social" aria-label="Tether on LinkedIn">
              <IconLinkedIn />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
