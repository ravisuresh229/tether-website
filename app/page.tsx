"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// ─── Font loader (works in Next.js) ───
function useFonts() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("tether-fonts")) return;
    const link = document.createElement("link");
    link.id = "tether-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap";
    document.head.appendChild(link);
  }, []);
}

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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px", ...opts }
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

// ─── Animated Counter ───
function Counter({ end, suffix = "", prefix = "", duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [ref, inView] = useInView();
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const num = parseFloat(String(end).replace(/[^0-9.]/g, ""));
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setVal(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(tick);
      else setVal(num);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ─── Reveal ───
function Reveal({ children, delay = 0, className = "", translateY = 36, duration = 0.9 }: { children: React.ReactNode; delay?: number; className?: string; translateY?: number; duration?: number }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : `translateY(${translateY}px)`,
      transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}>{children}</div>
  );
}

// ─── Word rotator ───
function WordRotator({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % words.length); setShow(true); }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);
  return (
    <span style={{ display: "inline-block", position: "relative", overflow: "hidden", verticalAlign: "bottom" }}>
      <span style={{
        display: "inline-block",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: show ? "translateY(0)" : "translateY(110%)",
        opacity: show ? 1 : 0,
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        color: "#0D7377",
      }}>{words[idx]}</span>
    </span>
  );
}

// ─── 3D tilt card ───
function TiltCard({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.02,1.02,1.02)`);
  }, []);
  const handleLeave = useCallback(() => setTransform(""), []);
  return (
    <div ref={ref} className={className} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ ...style, transform: transform || undefined, transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease", willChange: "transform" }}>
      {children}
    </div>
  );
}

// ─── Network canvas ───
function NetworkNodes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let id: number;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const resize = () => {
      c.width = c.offsetWidth * 2;
      c.height = c.offsetHeight * 2;
      ctx.setTransform(2, 0, 0, 2, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 20; i++) {
      nodes.push({ x: Math.random() * c.offsetWidth, y: Math.random() * c.offsetHeight, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 2.5 + 1.5 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, c.offsetWidth, c.offsetHeight);
      nodes.forEach(n => { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > c.offsetWidth) n.vx *= -1; if (n.y < 0 || n.y > c.offsetHeight) n.vy *= -1; });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 150) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.strokeStyle = `rgba(45,58,78,${0.07 * (1 - d / 150)})`; ctx.lineWidth = 1; ctx.stroke(); }
        }
      }
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(45,58,78,0.1)"; ctx.fill(); });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

// ─── Logo mark ───
function TetherMark({ size = 32, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M10 12C10 12 18 18 24 24C28 28 30 32 31 38L31 56" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M14 10C14 10 20 16 26 22C29 25 31 30 32 36L32 56" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M18 8C18 8 23 14 28 20C30 22 32 28 33 34L33 56" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M22 7C22 7 26 12 30 18C31 20 33 26 33.5 32L33.5 56" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M54 12C54 12 46 18 40 24C36 28 34 32 33 38L33 56" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M50 10C50 10 44 16 38 22C35 25 33 30 32 36L32 56" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M46 8C46 8 41 14 36 20C34 22 32 28 31 34L31 56" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M42 7C42 7 38 12 34 18C33 20 31 26 30.5 32L30.5 56" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Icons ───
const IconArrowRight = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconCheck = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IconSend = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>;
const IconNetwork = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><line x1="12" y1="7.5" x2="5" y2="16.5"/><line x1="12" y1="7.5" x2="19" y2="16.5"/><line x1="7.5" y1="19" x2="16.5" y2="19"/></svg>;
const IconShield = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
const IconClock = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconUsers = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconZap = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IconRefresh = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
const IconLink = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
const IconSparkles = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/><path d="M19 12l.75 2.25L22 15l-2.25.75L19 18l-.75-2.25L16 15l2.25-.75L19 12z"/><path d="M5 12l.75 2.25L8 15l-2.25.75L5 18l-.75-2.25L2 15l2.25-.75L5 12z"/></svg>;
const IconCalendarCheck = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>;
const IconUpload = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconPulse = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
const IconCheckCircle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IconPlay = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>;

// ─── Styles (t- prefixed to avoid Tailwind collisions) ───
const CSS = `
:root {
  --navy: #2D3A4E; --navy-deep: #1E2A3A; --navy-darkest: #151F2B;
  --bg: #FAFAF7; --bg-warm: #F5F3EE; --surface: #EDEADF;
  --teal: #0D7377; --teal-dark: #095456; --teal-light: #E8F4F4;
  --coral: #D4613E; --coral-hover: #BF5535;
  --text: #2D2D2D; --text-secondary: #6B6B6B; --text-tertiary: #9A9A9A;
  --t-border: #E0DDD5;
  --serif: 'Instrument Serif', Georgia, serif;
  --sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
.tether-lp, .tether-lp * { margin: 0; padding: 0; box-sizing: border-box; }
.tether-lp { font-family: var(--sans); color: var(--text); background: var(--bg); -webkit-font-smoothing: antialiased; overflow-x: hidden; position: relative; }
.tether-lp ::selection { background: var(--navy); color: #fff; }

.t-scroll-prog { position: fixed; top: 72px; left: 0; height: 2px; background: linear-gradient(90deg, var(--teal), var(--coral)); z-index: 101; border-radius: 0 2px 2px 0; }
.t-gradient-orb { position: fixed; width: 600px; height: 600px; border-radius: 50%; pointer-events: none; z-index: 0; opacity: 0.04; background: radial-gradient(circle, var(--teal), transparent 70%); filter: blur(40px); }

.t-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 48px; height: 72px; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(16px) saturate(1.8); -webkit-backdrop-filter: blur(16px) saturate(1.8); background: rgba(250,250,247,0.85); border-bottom: 1px solid rgba(224,221,213,0.5); transition: all 0.3s; }
.t-nav-s { box-shadow: 0 1px 24px rgba(0,0,0,0.06); }
.t-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--navy-deep); transition: transform 0.2s; }
.t-nav-logo:hover { transform: scale(1.03); }
.t-nav-logo-text { font-family: var(--sans); font-weight: 600; font-size: 22px; letter-spacing: -0.5px; color: var(--navy-deep); }
.t-nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
.t-nav-links a { font-size: 14px; font-weight: 500; color: var(--text-secondary); text-decoration: none; transition: color 0.2s; letter-spacing: 0.01em; position: relative; }
.t-nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1.5px; background: var(--teal); transition: width 0.3s cubic-bezier(0.16,1,0.3,1); pointer-events: none; }
.t-nav-links a:hover { color: var(--navy-deep); }
.t-nav-links a:hover::after { width: 100%; }
.t-nav-cta { background: var(--navy) !important; color: #fff !important; padding: 10px 22px !important; border-radius: 8px !important; font-size: 14px !important; font-weight: 600 !important; transition: all 0.25s ease !important; }
.t-nav-cta::after { display: none !important; }
.t-nav-cta:hover { background: var(--navy-deep) !important; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(45,58,78,0.2) !important; }
.t-nav-mob { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--navy-deep); }

.t-hero { position: relative; display: flex; align-items: flex-start; padding: 160px 24px 80px; overflow: hidden; }
.t-hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; z-index: 1; min-height: 0; }
.t-hero-content { max-width: 560px; display: flex; flex-direction: column; align-items: center; }
.t-hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px 6px 8px; background: rgba(45,58,78,0.06); border: 1px solid rgba(45,58,78,0.1); border-radius: 100px; font-size: 13px; font-weight: 500; color: var(--navy); margin-bottom: 28px; letter-spacing: 0.01em; animation: t-badge-in 0.8s cubic-bezier(0.16,1,0.3,1) both; }
@keyframes t-badge-in { from { opacity: 0; transform: translateY(12px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
.t-hero-badge-dot { width: 8px; height: 8px; background: var(--teal); border-radius: 50%; animation: t-pd 2s ease infinite; }
@keyframes t-pd { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }

.t-hero-title { font-family: var(--serif); font-size: 60px; line-height: 1.06; font-weight: 400; color: var(--navy-darkest); letter-spacing: -1.5px; margin-bottom: 24px; }
.t-hero-title-line { display: block; overflow: hidden; }
.t-hero-title-line-inner { display: block; animation: t-title-up 0.9s cubic-bezier(0.16,1,0.3,1) both; }
.t-hero-title-line:nth-child(1) .t-hero-title-line-inner { animation-delay: 0.15s; }
.t-hero-title-line:nth-child(2) .t-hero-title-line-inner { animation-delay: 0.25s; }
.t-hero-title-line:nth-child(3) .t-hero-title-line-inner { animation-delay: 0.35s; }
@keyframes t-title-up { from { transform: translateY(110%); } to { transform: translateY(0); } }

.t-hero-sub { font-size: 18px; line-height: 1.65; color: var(--text-secondary); margin-bottom: 40px; max-width: 460px; margin-left: auto; margin-right: auto; font-weight: 400; animation: t-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
@keyframes t-fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
.t-hero-actions { display: flex; gap: 16px; align-items: center; justify-content: center; flex-wrap: wrap; animation: t-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both; }

.t-btn-p { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: var(--coral); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; font-family: var(--sans); cursor: pointer; transition: all 0.25s cubic-bezier(0.16,1,0.3,1); text-decoration: none; letter-spacing: 0.01em; position: relative; overflow: hidden; }
.t-btn-p::before { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; background: rgba(255,255,255,0.15); border-radius: 50%; transform: translate(-50%,-50%); transition: width 0.6s, height 0.6s; pointer-events: none; }
.t-btn-p:hover::before { width: 300px; height: 300px; }
.t-btn-p:hover { background: var(--coral-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,97,62,0.25); }
.t-btn-s { display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px; background: transparent; color: var(--text); border: 1.5px solid var(--t-border); border-radius: 10px; font-size: 15px; font-weight: 500; font-family: var(--sans); cursor: pointer; transition: all 0.25s; text-decoration: none; }
.t-btn-s:hover { border-color: var(--navy); color: var(--navy); background: rgba(45,58,78,0.04); }

.t-hero-demo-wrap { max-width: 1000px; margin: 40px auto 0; width: 100%; }
.t-hero-demo-video { border-radius: 12px; overflow: hidden; position: relative; min-height: 400px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.08); }
.t-hero-demo-video video { display: block; width: 100%; height: auto; max-height: 70vh; object-fit: contain; }
.t-hero-demo-caption { text-align: center; font-size: 13px; color: var(--text-tertiary); margin-top: 16px; font-weight: 400; }
.t-hero-demo-caption-expand { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 4px; font-size: 12px; color: var(--text-tertiary); }
.t-hero-demo-caption-expand svg { width: 12px; height: 12px; opacity: 0.8; }
.t-hero-demo-expand { position: absolute; top: 16px; right: 16px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #fff; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-radius: 50%; border: none; cursor: pointer; z-index: 10; opacity: 0; transition: opacity 0.2s, background 0.2s, transform 0.2s; }
.t-hero-demo-video:hover .t-hero-demo-expand { opacity: 1; }
.t-hero-demo-expand:hover { background: rgba(0,0,0,0.7); transform: scale(1.05); }
.t-hero-demo-progress { position: absolute; bottom: 0; left: 0; height: 3px; background: var(--teal); border-top-right-radius: 3px; border-bottom-right-radius: 3px; transition: width 0.1s linear; }
.t-video-modal { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 48px; background: rgba(0,0,0,0.8); }
.t-video-modal-inner { position: relative; max-width: 90vw; max-height: 90vh; }
.t-video-modal video { max-width: 90vw; max-height: 90vh; border-radius: 12px; }
.t-video-modal-close { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.5); border: none; color: #fff; cursor: pointer; padding: 8px 12px; font-size: 20px; line-height: 1; border-radius: 6px; z-index: 10; opacity: 0.9; }
.t-video-modal-close:hover { opacity: 1; }
.t-problem { padding: 120px 48px; background: var(--navy-deep); color: #fff; position: relative; overflow: hidden; }
.t-problem::before { content: ''; position: absolute; top: -200px; right: -200px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(13,115,119,0.12), transparent 70%); pointer-events: none; animation: t-orb-drift 20s ease-in-out infinite alternate; }
@keyframes t-orb-drift { from { transform: translate(0,0); } to { transform: translate(-60px,40px); } }
.t-problem::after { content: ''; position: absolute; bottom: -100px; left: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(212,97,62,0.06), transparent 70%); pointer-events: none; }
.t-problem-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
.t-plbl { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--coral); margin-bottom: 20px; }
.t-problem h2 { font-family: var(--serif); font-size: 46px; line-height: 1.1; font-weight: 400; letter-spacing: -1px; margin-bottom: 24px; max-width: 700px; }
.t-problem-desc { font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.6); max-width: 600px; margin-bottom: 64px; }
.t-pstats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; }
.t-pstat { padding: 48px 40px; background: var(--navy-deep); transition: background 0.3s; }
.t-pstat:hover { background: rgba(30,42,58,0.7); }
.t-pstat-n { font-family: var(--serif); font-size: 54px; font-weight: 400; color: var(--coral); line-height: 1; margin-bottom: 12px; }
.t-pstat-l { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.5; }

.t-slbl { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--teal); margin-bottom: 16px; }
.t-stitle { font-family: var(--serif); font-size: 44px; line-height: 1.15; font-weight: 400; color: var(--navy-darkest); letter-spacing: -0.8px; margin-bottom: 16px; }
.t-sdesc { font-size: 17px; line-height: 1.65; color: var(--text-secondary); max-width: 520px; margin-bottom: 64px; }

.t-how { padding: 120px 48px; background: var(--bg); }
.t-how-inner { max-width: 1200px; margin: 0 auto; }
.t-how-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; align-items: stretch; }
.t-how-steps > * { min-width: 0; }
.t-how-step { width: 100%; height: 100%; min-height: 280px; box-sizing: border-box; display: flex; flex-direction: column; background: #fff; border: 1px solid var(--t-border); border-radius: 16px; padding: 40px 32px; position: relative; }
.t-how-step-num { width: 36px; height: 36px; border-radius: 10px; background: rgba(45,58,78,0.06); color: var(--navy); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; margin-bottom: 24px; transition: all 0.3s; }
.t-how-step:hover .t-how-step-num { background: var(--teal); color: #fff; transform: scale(1.1); }
.t-how-step h3 { font-family: var(--serif); font-size: 24px; font-weight: 400; color: var(--navy-darkest); margin-bottom: 12px; }
.t-how-step p { flex: 1; font-size: 15px; line-height: 1.65; color: var(--text-secondary); }
.t-how-step-conn { position: absolute; top: 58px; right: -18px; color: var(--t-border); z-index: 2; }

.t-product { padding: 120px 48px; background: var(--bg-warm); }
.t-product-inner { max-width: 1200px; margin: 0 auto; }
.t-product-header { text-align: center; margin-bottom: 72px; }
.t-product-header .t-sdesc { margin-left: auto; margin-right: auto; margin-bottom: 0; }
.t-prows { display: flex; flex-direction: column; gap: 0; }
.t-prow { display: flex; align-items: center; gap: 48px; margin-bottom: 64px; }
.t-prow:last-child { margin-bottom: 0; }
.t-prow-video { flex: 0 0 60%; width: 60%; border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 24px rgba(0,0,0,0.06); aspect-ratio: 16/10; }
.t-prow-video video { display: block; width: 100%; height: 100%; object-fit: cover; }
.t-prow-text { flex: 0 0 40%; width: 40%; }
.t-prow-text h3 { font-family: var(--serif); font-size: 28px; font-weight: 400; color: var(--navy-darkest); margin-bottom: 12px; }
.t-prow-text p { font-size: 15px; line-height: 1.7; color: var(--text-secondary); margin-bottom: 16px; }
.t-prow-watch { font-size: 14px; font-weight: 500; color: var(--teal); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: color 0.2s; cursor: pointer; background: none; border: none; font-family: inherit; padding: 0; }
.t-prow-watch:hover { color: var(--teal-dark); }

.t-audiences { padding: 120px 48px; background: var(--bg); }
.t-audiences-inner { max-width: 1200px; margin: 0 auto; }
.t-aud-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 64px; }
.t-aud-card { border: 1px solid var(--t-border); border-radius: 20px; padding: 48px 40px; background: #fff; transition: all 0.35s cubic-bezier(0.16,1,0.3,1); }
.t-aud-card:hover { border-color: rgba(45,58,78,0.2); box-shadow: 0 8px 40px rgba(0,0,0,0.05); transform: translateY(-4px); }
.t-aud-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; transition: transform 0.3s; }
.t-aud-card:hover .t-aud-icon { transform: scale(1.1) rotate(-3deg); }
.t-aud-spec .t-aud-icon { background: rgba(212,97,62,0.1); color: var(--coral); }
.t-aud-pcp .t-aud-icon { background: var(--teal-light); color: var(--teal); }
.t-aud-card h3 { font-family: var(--serif); font-size: 28px; font-weight: 400; color: var(--navy-darkest); margin-bottom: 8px; }
.t-aud-card-sub { font-size: 15px; color: var(--text-secondary); margin-bottom: 28px; line-height: 1.6; }
.t-aud-feats { display: flex; flex-direction: column; gap: 14px; }
.t-aud-feat { display: flex; align-items: flex-start; gap: 12px; font-size: 14.5px; color: var(--text); line-height: 1.5; }
.t-aud-feat-icon { flex-shrink: 0; width: 22px; height: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-top: 1px; }
.t-aud-spec .t-aud-feat-icon { background: rgba(212,97,62,0.08); color: var(--coral); }
.t-aud-pcp .t-aud-feat-icon { background: var(--teal-light); color: var(--teal); }

.t-network { padding: 120px 48px; background: linear-gradient(180deg, var(--bg-warm), var(--bg)); }
.t-network-inner { max-width: 900px; margin: 0 auto; text-align: center; }
.t-network h2 { font-family: var(--serif); font-size: 44px; line-height: 1.15; font-weight: 400; color: var(--navy-darkest); letter-spacing: -0.8px; margin-bottom: 20px; }
.t-network h2 em { font-style: italic; color: var(--teal); }
.t-network-desc { font-size: 17px; line-height: 1.7; color: var(--text-secondary); max-width: 600px; margin: 0 auto 56px; }
.t-nvis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 48px; }
.t-nnode { background: #fff; border: 1px solid var(--t-border); border-radius: 14px; padding: 28px 20px; text-align: center; transition: all 0.3s; }
.t-nnode:hover { border-color: var(--navy); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(45,58,78,0.08); }
.t-nnode-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(45,58,78,0.06); color: var(--navy); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; transition: all 0.3s; }
.t-nnode:hover .t-nnode-icon { background: var(--navy); color: #fff; transform: rotate(-5deg) scale(1.05); }
.t-nnode h4 { font-size: 14px; font-weight: 600; color: var(--navy-darkest); margin-bottom: 6px; }
.t-nnode p { font-size: 13px; color: var(--text-tertiary); line-height: 1.5; }

.t-comingsoon { padding: 120px 48px; background: var(--bg-warm); }
.t-comingsoon-inner { max-width: 900px; margin: 0 auto; text-align: center; }
.t-comingsoon .t-slbl { color: var(--teal); }
.t-comingsoon h2 { font-family: var(--serif); font-size: 44px; line-height: 1.15; font-weight: 400; color: var(--navy-darkest); letter-spacing: -0.8px; margin-bottom: 20px; }
.t-comingsoon-desc { font-size: 17px; line-height: 1.7; color: var(--text-secondary); max-width: 600px; margin: 0 auto 56px; }
.t-csoon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px; }
.t-csoon-card { background: #fff; border: 1px solid var(--t-border); border-radius: 14px; padding: 32px 24px; text-align: center; transition: all 0.3s; }
.t-csoon-card:hover { border-color: var(--navy); transform: translateY(-3px); box-shadow: 0 8px 24px rgba(45,58,78,0.08); }
.t-csoon-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; transition: all 0.3s; }
.t-csoon-icon-navy { background: rgba(45,58,78,0.06); color: var(--navy); }
.t-csoon-icon-teal { background: rgba(13,115,119,0.08); color: var(--teal); }
.t-csoon-icon-coral { background: rgba(212,97,62,0.08); color: var(--coral); }
.t-csoon-card:hover .t-csoon-icon-navy { background: var(--navy); color: #fff; }
.t-csoon-card:hover .t-csoon-icon-teal { background: var(--teal); color: #fff; }
.t-csoon-card:hover .t-csoon-icon-coral { background: var(--coral); color: #fff; }
.t-csoon-card h4 { font-size: 16px; font-weight: 600; color: var(--navy-darkest); margin-bottom: 8px; }
.t-csoon-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin: 0; }
.t-csoon-footer { font-size: 13px; color: var(--text-tertiary); margin-top: 32px; }
.t-csoon-footer a { color: var(--teal); text-decoration: none; font-weight: 500; transition: color 0.2s; }
.t-csoon-footer a:hover { color: var(--teal-dark); }

.t-trust { padding: 96px 48px; background: var(--teal-light); }
.t-trust-inner { max-width: 1200px; margin: 0 auto; }
.t-trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.t-trust-card { background: #fff; border: 1px solid rgba(13,115,119,0.12); border-radius: 16px; padding: 32px 24px; transition: all 0.3s; }
.t-trust-card:hover { border-color: rgba(13,115,119,0.25); box-shadow: 0 8px 32px rgba(13,115,119,0.08); }
.t-trust-card-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--teal-light); color: var(--teal); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
.t-trust-card h4 { font-size: 16px; font-weight: 600; color: var(--navy-darkest); margin-bottom: 8px; }
.t-trust-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin: 0; }
.t-trust-link { display: inline-flex; align-items: center; gap: 8px; margin-top: 40px; font-size: 14px; font-weight: 500; color: var(--teal); text-decoration: none; transition: color 0.2s; }
.t-trust-link:hover { color: var(--teal-dark); }
.t-trust-link-wrap { text-align: center; }


.t-fcta { padding: 120px 48px; background: var(--navy-deep); color: #fff; text-align: center; position: relative; overflow: hidden; }
.t-fcta::before { content: ''; position: absolute; bottom: -100px; left: 50%; transform: translateX(-50%); width: 800px; height: 400px; background: radial-gradient(ellipse, rgba(13,115,119,0.15), transparent 70%); pointer-events: none; animation: t-orb-drift 15s ease-in-out infinite alternate; }
.t-fcta-inner { max-width: 700px; margin: 0 auto; position: relative; z-index: 1; }
.t-fcta h2 { font-family: var(--serif); font-size: 52px; line-height: 1.1; font-weight: 400; letter-spacing: -1px; margin-bottom: 20px; }
.t-fcta p { font-size: 17px; line-height: 1.65; color: rgba(255,255,255,0.55); margin-bottom: 40px; max-width: 480px; margin-left: auto; margin-right: auto; }
.t-fcta .t-btn-p { font-size: 16px; padding: 16px 32px; }
.t-fcta-note { margin-top: 20px; font-size: 13px; color: rgba(255,255,255,0.35); }

.t-footer { padding: 64px 48px 40px; background: var(--navy-darkest); border-top: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.4); }
.t-footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-start; }
.t-footer-brand { display: flex; flex-direction: column; gap: 16px; }
.t-footer-logo { display: flex; align-items: center; gap: 10px; color: #fff; }
.t-footer-logo-text { font-family: var(--sans); font-weight: 600; font-size: 18px; color: #fff; }
.t-footer-tagline { font-size: 13px; color: rgba(255,255,255,0.3); max-width: 280px; line-height: 1.5; }
.t-footer-links { display: flex; gap: 56px; }
.t-footer-col h5 { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.45); margin-bottom: 16px; }
.t-footer-col a { display: block; font-size: 14px; color: rgba(255,255,255,0.35); text-decoration: none; margin-bottom: 10px; transition: color 0.2s; }
.t-footer-col a:hover { color: #fff; }
.t-footer-bottom { max-width: 1200px; margin: 40px auto 0; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 13px; display: flex; justify-content: space-between; align-items: center; }
.t-footer-bottom a { color: rgba(255,255,255,0.35); text-decoration: none; margin-left: 24px; transition: color 0.2s; }
.t-footer-bottom a:hover { color: #fff; }

@media (max-width: 900px) {
  .t-nav { padding: 0 24px; } .t-nav-links { display: none; } .t-nav-mob { display: block; }
  .t-hero { padding: 100px 24px 60px; } .t-hero-title { font-size: 40px; } .t-hero-content { max-width: 100%; }
  .t-problem, .t-how, .t-product, .t-audiences, .t-network, .t-comingsoon, .t-fcta { padding: 80px 24px; }
  .t-problem h2, .t-stitle, .t-network h2, .t-comingsoon h2 { font-size: 32px; } .t-fcta h2 { font-size: 36px; }
  .t-pstats, .t-how-steps, .t-aud-grid, .t-nvis, .t-csoon-grid { grid-template-columns: 1fr; }
  .t-pstat-n { font-size: 42px; } .t-how-step-conn { display: none; }
  .t-footer-inner { flex-direction: column; gap: 40px; } .t-footer-links { gap: 32px; flex-wrap: wrap; }
  .t-trust-grid { grid-template-columns: 1fr; } .t-trust { padding: 64px 24px; }
  .t-footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
  .t-gradient-orb { display: none; }
}
@media (max-width: 768px) {
  .t-prow { flex-direction: column; gap: 24px; margin-bottom: 48px; }
  .t-prow-video, .t-prow-text { flex: none; width: 100%; }
  .t-prow-video { order: 1; }
  .t-prow-text { order: 2; }
  .t-hero-demo-wrap { margin-top: 28px; }
  .t-hero-demo-video { min-height: 280px; }
}
@media (max-width: 480px) {
  .t-hero-title { font-size: 34px; } .t-hero-actions { flex-direction: column; align-items: stretch; }
  .t-btn-p, .t-btn-s { justify-content: center; } .t-pstat { padding: 32px 24px; } .t-aud-card { padding: 32px 24px; }
  .t-nav { padding-left: 16px; padding-right: 16px; }
  .t-hero { padding-left: 16px; padding-right: 16px; }
  .t-hero-demo-wrap { margin-top: 24px; }
  .t-hero-demo-video { min-height: 220px; }
}
.t-demo-modal { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); }
.t-demo-modal-box { background: #fff; border-radius: 16px; border: 1px solid var(--t-border); box-shadow: 0 24px 64px rgba(0,0,0,0.15); max-width: 440px; width: 100%; padding: 32px; position: relative; }
.t-demo-modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; cursor: pointer; color: var(--text-tertiary); padding: 8px; line-height: 1; }
.t-demo-modal-close:hover { color: var(--navy); }
.t-demo-modal h3 { font-family: var(--serif); font-size: 24px; font-weight: 400; color: var(--navy-darkest); margin-bottom: 8px; }
.t-demo-modal p { font-size: 14px; color: var(--text-secondary); margin-bottom: 24px; }
.t-demo-form label { display: block; font-size: 13px; font-weight: 500; color: var(--navy); margin-bottom: 6px; }
.t-demo-form input, .t-demo-form textarea { width: 100%; padding: 12px 14px; border: 1px solid var(--t-border); border-radius: 8px; font-size: 15px; font-family: var(--sans); margin-bottom: 16px; }
.t-demo-form input:focus, .t-demo-form textarea:focus { outline: none; border-color: var(--teal); box-shadow: 0 0 0 2px rgba(13,115,119,0.15); }
.t-demo-form textarea { min-height: 80px; resize: vertical; }
.t-demo-form button[type="submit"] { width: 100%; padding: 14px; background: var(--coral); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: var(--sans); }
.t-demo-form button[type="submit"]:hover { background: var(--coral-hover); }
`;

// ─── Expand icon ───
const IconExpand = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>;

// ─── Product Feature Row (alternating staggered layout) ───
function ProductFeatureRow({ title, description, videoSrc, videoOnLeft }: { title: string; description: string; videoSrc: string; videoOnLeft: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);

  const handleWatchDemo = () => videoRef.current?.requestFullscreen?.();

  const videoBlock = (
    <div className="t-prow-video">
      <video ref={videoRef} muted loop playsInline onLoadedData={() => { if (videoRef.current) videoRef.current.playbackRate = 0.75; }}>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
  const textBlock = (
    <div className="t-prow-text">
      <h3>{title}</h3>
      <p>{description}</p>
      <button type="button" className="t-prow-watch" onClick={handleWatchDemo}>
        <IconExpand /> Watch full demo
      </button>
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="t-prow"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {videoOnLeft ? (
        <>
          {videoBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {videoBlock}
        </>
      )}
    </div>
  );
}

// ─── Hero Video ───
function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (document.fullscreenElement === video) return;
        if (e.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {});
          setProgress(0);
        } else {
          video.pause();
          video.currentTime = 0;
          setProgress(0);
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !(v.duration > 0)) return;
    setProgress((v.currentTime / v.duration) * 100);
  }, []);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <div className="t-hero-demo-wrap">
      <div ref={containerRef} className="t-hero-demo-video">
        <button type="button" className="t-hero-demo-expand" onClick={handleExpandClick} aria-label="Expand to fullscreen"><IconExpand /></button>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          style={{ width: "100%", display: "block", borderRadius: "12px" }}
        >
          <source src="/demo-video.mp4?v=2" type="video/mp4" />
        </video>
        <div className="t-hero-demo-progress" style={{ width: `${progress}%` }} />
      </div>
      <p className="t-hero-demo-caption">Georgetown Family Medicine sending a referral via Tether</p>
      <div className="t-hero-demo-caption-expand"><IconExpand />Click to expand</div>
    </div>
  );
}

// ─── Main Component ───
const DEMO_FORM_ACTION = "https://formspree.io/f/xpqrqkzw"; // Create at formspree.io and replace with your form ID

export default function TetherLanding() {
  useFonts();
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [videoModal, setVideoModal] = useState<string | null>(null);
  const scrollY = useScrollY();

  useEffect(() => {
    setScrolled(scrollY > 20);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    setScrollPct(h > 0 ? (scrollY / h) * 100 : 0);
  }, [scrollY]);

  return (
    <>
      <style>{CSS}</style>
      <div className="tether-lp">
        <div className="t-scroll-prog" style={{ width: `${scrollPct}%` }} />
        <div className="t-gradient-orb" style={{ top: `${200 + scrollY * 0.3}px`, left: "60%", transition: "top 0.8s cubic-bezier(0.16,1,0.3,1)" }} />

        {/* NAV */}
        <nav className={`t-nav ${scrolled ? "t-nav-s" : ""}`}>
          <a href="#" className="t-nav-logo">
            <Image src="/LOGO.jpeg" alt="Tether" width={30} height={30} style={{ objectFit: "contain" }} />
            <span className="t-nav-logo-text">Tether</span>
          </a>
          <ul className="t-nav-links">
            <li><a href="#how">How It Works</a></li>
            <li><a href="#product">Product</a></li>
            <li><a href="#specialists">For Specialists</a></li>
            <li><a href="#network">The Network</a></li>
            <li><a href="/security">Security</a></li>
            <li><a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer" className="t-nav-cta" style={{ textDecoration: "none", display: "inline-block" }}>Request Demo</a></li>
          </ul>
          <button className="t-nav-mob" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </nav>

        {/* HERO */}
        <section className="t-hero">
          <NetworkNodes />
          <div className="t-hero-inner">
            <div className="t-hero-content">
              <div className="t-hero-badge"><div className="t-hero-badge-dot" />Now accepting pilot practices</div>
              <h1 className="t-hero-title">
                <span className="t-hero-title-line"><span className="t-hero-title-line-inner">Every referral is a</span></span>
                <span className="t-hero-title-line"><span className="t-hero-title-line-inner"><WordRotator words={["relationship.", "connection.", "patient.", "partnership."]} /></span></span>
                <span className="t-hero-title-line"><span className="t-hero-title-line-inner">Stop losing them.</span></span>
              </h1>
              <p className="t-hero-sub">Tether is the referral network that connects primary care and specialty practices with real-time tracking, loop closure, and a shared directory your staff actually wants to use.</p>
              <div className="t-hero-actions">
                <a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer" className="t-btn-p" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>Request a Demo <IconArrowRight /></a>
                <a href="#how" className="t-btn-s">See How It Works</a>
              </div>
            </div>
            <HeroVideo />
          </div>
        </section>

        {/* PROBLEM */}
        <section className="t-problem">
          <div className="t-problem-inner">
            <Reveal><div className="t-plbl">The Problem</div></Reveal>
            <Reveal delay={0.1}><h2>Referrals disappear into a black hole. Your revenue disappears with them.</h2></Reveal>
            <Reveal delay={0.2}><p className="t-problem-desc">Most referrals are still sent by fax. There is no confirmation, no tracking, and no follow-up. Patients fall through the cracks, specialists lose billable visits, and PCPs never know if their patient received care.</p></Reveal>
            <Reveal delay={0.3}>
              <div className="t-pstats">
                <div className="t-pstat"><div className="t-pstat-n"><Counter end={50} suffix="%" /></div><div className="t-pstat-l">of referrals never result in a completed specialist visit</div></div>
                <div className="t-pstat"><div className="t-pstat-n"><Counter end={971} prefix="$" suffix="B" /></div><div className="t-pstat-l">in annual U.S. healthcare waste attributed to care coordination failures</div></div>
                <div className="t-pstat"><div className="t-pstat-n"><Counter end={81} suffix="%" /></div><div className="t-pstat-l">of PCPs report dissatisfaction with the referral communication process</div></div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="t-how" id="how">
          <div className="t-how-inner">
            <Reveal><div className="t-slbl">How It Works</div></Reveal>
            <Reveal delay={0.1}><div className="t-stitle">Three steps. Zero fax machines.</div></Reveal>
            <Reveal delay={0.15}><p className="t-sdesc">Your front desk staff can be sending tracked referrals in under 10 minutes. No IT integration required. No workflow disruption.</p></Reveal>
            <div className="t-how-steps">
              <Reveal delay={0} translateY={30} duration={0.8}><TiltCard className="t-how-step"><div className="t-how-step-num">1</div><h3>Send or Receive</h3><p>Upload a referral PDF or use the built-in form. Tether&apos;s AI extracts patient details, insurance, and clinical context automatically.</p><div className="t-how-step-conn"><IconArrowRight /></div></TiltCard></Reveal>
              <Reveal delay={0.1} translateY={30} duration={0.8}><TiltCard className="t-how-step"><div className="t-how-step-num">2</div><h3>Track in Real Time</h3><p>Both the sending and receiving practice see the referral status live. No more calling to ask &quot;did you get it?&quot; Every update is logged and visible.</p><div className="t-how-step-conn"><IconArrowRight /></div></TiltCard></Reveal>
              <Reveal delay={0.2} translateY={30} duration={0.8}><TiltCard className="t-how-step"><div className="t-how-step-num">3</div><h3>Close the Loop</h3><p>When the visit is complete, the referring provider gets notified. The patient&apos;s care journey is documented, connected, and never lost.</p></TiltCard></Reveal>
            </div>
          </div>
        </section>

        {/* PRODUCT */}
        <section className="t-product" id="product">
          <div className="t-product-inner">
            <div className="t-product-header">
              <Reveal><div className="t-slbl">Product</div></Reveal>
              <Reveal delay={0.1}><div className="t-stitle">Built for the way<br />practices actually work</div></Reveal>
              <Reveal delay={0.15}><p className="t-sdesc">Designed for medical assistants and front desk staff who manage referrals every day. Not physicians who review dashboards once a week.</p></Reveal>
            </div>
            <div className="t-prows">
              <ProductFeatureRow title="Referral Dashboard" description="See every inbound and outbound referral in one place. Filter by status, provider, date, or insurance. Know exactly where every patient stands." videoSrc="/dashboard-demo.mp4" videoOnLeft={true} />
              <ProductFeatureRow title="Specialist Directory" description="A curated, searchable map of specialists accepting referrals. Filter by specialty, insurance, distance, and availability." videoSrc="/directory-demo.mp4" videoOnLeft={false} />
              <ProductFeatureRow title="AI-Powered Intake" description="Drop in a referral PDF. Tether extracts patient demographics, clinical notes, and insurance details in seconds." videoSrc="/parser-demo.mp4" videoOnLeft={true} />
              <ProductFeatureRow title="Specialist Referral View" description="Receive referrals, contact patients, schedule visits, and update status. Close the loop without a single phone call." videoSrc="/specialist-demo.mp4" videoOnLeft={false} />
            </div>
          </div>
        </section>

        {/* AUDIENCES */}
        <section className="t-audiences" id="specialists">
          <div className="t-audiences-inner">
            <Reveal><div className="t-slbl">Who It&apos;s For</div></Reveal>
            <Reveal delay={0.1}><div className="t-stitle">Two sides. One network.</div></Reveal>
            <Reveal delay={0.15}><p className="t-sdesc">Specialists grow their referral volume. PCPs close the loop on patient care. Both win when the network works.</p></Reveal>
            <div className="t-aud-grid">
              <Reveal delay={0.1}>
                <div className="t-aud-card t-aud-spec">
                  <div className="t-aud-icon"><IconZap /></div>
                  <h3>For Specialists</h3>
                  <p className="t-aud-card-sub">Turn every referral into a scheduled visit. See who is sending you patients, and make it effortless for them to send more.</p>
                  <div className="t-aud-feats">
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Inbound referral management with auto-parsed intake</div>
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Visibility into your referral network and top senders</div>
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Automated status updates back to referring providers</div>
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Presence in the Tether specialist directory for new referral sources</div>
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Grow referral volume from new PCP relationships through the Tether network</div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="t-aud-card t-aud-pcp">
                  <div className="t-aud-icon"><IconUsers /></div>
                  <h3>For Primary Care</h3>
                  <p className="t-aud-card-sub">Know that your patient actually saw the specialist. Find the right provider, send the referral, and track it without a single phone call.</p>
                  <div className="t-aud-feats">
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Searchable directory of specialists by location and insurance</div>
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Real-time referral status tracking with zero follow-up calls</div>
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Loop closure notifications when the visit is completed</div>
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Always free. No contracts, no software fees.</div>
                    <div className="t-aud-feat"><div className="t-aud-feat-icon"><IconCheck /></div>Supports value-based care reporting with closed-loop referral documentation</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* NETWORK */}
        <section className="t-network" id="network">
          <div className="t-network-inner">
            <Reveal><div className="t-slbl">The Network Effect</div></Reveal>
            <Reveal delay={0.1}><h2>Not just software.<br />A <em>network</em> that grows with you.</h2></Reveal>
            <Reveal delay={0.15}><p className="t-network-desc">Every referral sent through Tether strengthens the connection between practices. As more providers join, every practice gets more value. This is how referral management should have always worked.</p></Reveal>
            <Reveal delay={0.2}>
              <div className="t-nvis">
                <TiltCard className="t-nnode"><div className="t-nnode-icon"><IconSend /></div><h4>Outbound Referral</h4><p>Every fax you send through Tether is a warm invite for the specialist to join</p></TiltCard>
                <TiltCard className="t-nnode"><div className="t-nnode-icon"><IconRefresh /></div><h4>Loop Closure</h4><p>Both sides see the full referral journey from send to completed visit</p></TiltCard>
                <TiltCard className="t-nnode"><div className="t-nnode-icon"><IconNetwork /></div><h4>Network Growth</h4><p>More connections create a richer directory and smarter routing for everyone</p></TiltCard>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COMING SOON */}
        <section className="t-comingsoon" id="coming-soon">
          <div className="t-comingsoon-inner">
            <Reveal><div className="t-slbl">Coming Soon</div></Reveal>
            <Reveal delay={0.1}><h2>Seamless integration with your existing systems.</h2></Reveal>
            <Reveal delay={0.15}><p className="t-comingsoon-desc">We are building intelligent automation that lives inside the EHRs you already use, so referrals, patient data, and loop closure happen without leaving your workflow.</p></Reveal>
            <Reveal delay={0.2}>
              <div className="t-csoon-grid">
                <TiltCard className="t-csoon-card">
                  <div className="t-csoon-icon t-csoon-icon-navy"><IconLink /></div>
                  <h4>EHR Workflow Integration</h4>
                  <p>Direct connections with Athenahealth, ModMed EMA, and Epic. Patient data flows in, status flows back. Zero duplicate entry.</p>
                </TiltCard>
                <TiltCard className="t-csoon-card">
                  <div className="t-csoon-icon t-csoon-icon-teal"><IconSparkles /></div>
                  <h4>Intelligent Agents</h4>
                  <p>AI-powered agents navigate your EHR securely to verify eligibility, route referrals, and close loops. Like an extra MA in your system.</p>
                </TiltCard>
                <TiltCard className="t-csoon-card">
                  <div className="t-csoon-icon t-csoon-icon-coral"><IconCalendarCheck /></div>
                  <h4>End-to-End Patient Experience</h4>
                  <p>From referral to appointment: automated scheduling, insurance checks, and notifications so visits happen faster and nothing falls through.</p>
                </TiltCard>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="t-csoon-footer">
                Actively in development. <a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer">Early integration partners welcome</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TRUST */}
        <section className="t-trust">
          <div className="t-trust-inner">
            <div className="t-trust-grid">
              <div className="t-trust-card">
                <div className="t-trust-card-icon"><IconShield /></div>
                <h4>HIPAA Compliant</h4>
                <p>All data encrypted at rest and in transit</p>
              </div>
              <div className="t-trust-card">
                <div className="t-trust-card-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
                <h4>End-to-End Encryption</h4>
                <p>Zero-knowledge architecture for all PHI</p>
              </div>
              <div className="t-trust-card">
                <div className="t-trust-card-icon"><IconClock /></div>
                <h4>5-Minute Onboarding</h4>
                <p>No IT integration or setup required</p>
              </div>
              <div className="t-trust-card">
                <div className="t-trust-card-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
                <h4>Works Alongside Your EMR</h4>
                <p>Runs parallel to Epic, Athena, and others</p>
              </div>
            </div>
            <div className="t-trust-link-wrap">
              <a href="/security" className="t-trust-link">Learn more about our security practices <IconArrowRight /></a>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="t-fcta" id="demo">
          <div className="t-fcta-inner">
            <Reveal><h2>Ready to connect<br />your practice?</h2></Reveal>
            <Reveal delay={0.1}><p>Join the network of practices building a better referral experience for their patients and their teams.</p></Reveal>
            <Reveal delay={0.2}><a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer" className="t-btn-p" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>Request a Demo <IconArrowRight /></a></Reveal>
            <Reveal delay={0.25}><p className="t-fcta-note">Free for referring providers. No contracts required.</p></Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="t-footer">
          <div className="t-footer-inner">
            <div className="t-footer-brand">
              <div className="t-footer-logo"><Image src="/LOGO.jpeg" alt="Tether" width={24} height={24} style={{ objectFit: "contain" }} /><span className="t-footer-logo-text">Tether Health</span></div>
              <p className="t-footer-tagline">The referral network for modern medical practices.</p>
            </div>
            <div className="t-footer-links">
              <div className="t-footer-col"><h5>Product</h5><a href="#how">How It Works</a><a href="#product">Features</a><a href="#specialists">For Specialists</a><a href="#specialists">For Primary Care</a></div>
              <div className="t-footer-col"><h5>Company</h5><a href="#">About</a><a href="#">Blog</a><a href="#">Careers</a><a href="mailto:sach@tetherhealth.com">Contact</a></div>
              <div className="t-footer-col"><h5>Legal</h5><a href="/legal#privacy">Privacy Policy</a><a href="/legal#terms">Terms of Service</a><a href="/legal#cookies">Cookie Policy</a><a href="/legal#hipaa">HIPAA Information</a></div>
            </div>
          </div>
          <div className="t-footer-bottom"><span>&copy; 2026 Tether Health, Inc. All rights reserved.</span><div><a href="#">Twitter</a><a href="https://www.linkedin.com/company/111649326/" target="_blank" rel="noopener noreferrer">LinkedIn</a></div></div>
        </footer>

        {/* Demo Request Modal */}
        {showDemoForm && (
          <div className="t-demo-modal" onClick={() => setShowDemoForm(false)}>
            <div className="t-demo-modal-box" onClick={e => e.stopPropagation()}>
              <button type="button" className="t-demo-modal-close" onClick={() => setShowDemoForm(false)} aria-label="Close">✕</button>
              <h3>Request a Demo</h3>
              <p>Fill out the form below and we&apos;ll reach out to schedule a personalized walkthrough.</p>
              <form className="t-demo-form" action={DEMO_FORM_ACTION} method="POST">
                <input type="hidden" name="_subject" value="Demo Request - Tether Health" />
                <label htmlFor="demo-email">Email</label>
                <input id="demo-email" type="email" name="email" required placeholder="you@practice.com" />
                <label htmlFor="demo-practice">Practice name</label>
                <input id="demo-practice" type="text" name="practice" placeholder="Your practice name" />
                <label htmlFor="demo-role">Role</label>
                <input id="demo-role" type="text" name="role" placeholder="e.g. Practice Manager" />
                <label htmlFor="demo-time">Best time to connect</label>
                <input id="demo-time" type="text" name="best_time" placeholder="e.g. Tuesday mornings" />
                <label htmlFor="demo-message">Message (optional)</label>
                <textarea id="demo-message" name="message" placeholder="Any specific questions or needs?" />
                <button type="submit">Submit Request</button>
              </form>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {videoModal && (
          <div className="t-video-modal" onClick={() => setVideoModal(null)}>
            <div className="t-video-modal-inner" onClick={e => e.stopPropagation()}>
              <button type="button" className="t-video-modal-close" onClick={() => setVideoModal(null)} aria-label="Close">✕</button>
              <video autoPlay muted loop playsInline style={{ display: "block" }}>
                <source src={videoModal === "dashboard" ? "/dashboard-demo.mp4" : videoModal === "directory" ? "/directory-demo.mp4" : videoModal === "parser" ? "/parser-demo.mp4" : "/specialist-demo.mp4"} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
