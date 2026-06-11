"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { JsonLd } from "@/components/JsonLd";

const CSS = `
/* page-specific */
.hero{min-height:100vh;display:grid;grid-template-columns:1.02fr .98fr;align-items:center;gap:44px;padding:130px 0 70px}
@media(max-width:980px){.hero{grid-template-columns:1fr;gap:48px;padding:120px 0 60px}}
.hero-copy h1{font-weight:500;font-size:clamp(40px,5.4vw,70px);line-height:1.02;letter-spacing:-.035em;max-width:13ch}
.hero-copy h1 .em{font-family:var(--serif);font-weight:400;font-style:italic}
.word{display:inline-block;opacity:0;transform:translateY(24px);filter:blur(6px)}
.hero-sub{font-size:clamp(16px,1.6vw,18.5px);color:var(--ink-soft);max-width:46ch;margin-top:26px;line-height:1.56;opacity:0;transform:translateY(16px)}
.hero-actions{display:flex;gap:13px;margin-top:32px;flex-wrap:wrap;opacity:0;transform:translateY(16px)}
.hero-meta{display:flex;gap:22px;margin-top:42px;flex-wrap:wrap;opacity:0}
.hero-meta .item{font-family:var(--mono);font-size:12px;color:var(--slate);display:flex;align-items:center;gap:8px}
.hero-meta .item b{width:6px;height:6px;border-radius:50%;background:var(--signal)}
@keyframes wordIn{to{opacity:1;transform:none;filter:blur(0)}}
@keyframes softIn{to{opacity:1;transform:none}}

/* demo */
.demo{position:relative;opacity:0;transform:translateY(28px)}
.demo-frame{background:var(--paper-2);border:1px solid var(--thread);border-radius:20px;box-shadow:0 50px 90px -46px rgba(12,26,35,.36),0 10px 24px -14px rgba(12,26,35,.1);overflow:hidden}

/* guided tour */
.btn-tour .play-ic{width:18px;height:18px;flex-shrink:0}
.btn-tour:hover .play-ic circle{stroke:var(--signal)}
.btn-tour:hover .play-ic path{fill:var(--signal)}
.tour-pill{position:fixed;bottom:26px;left:50%;transform:translate(-50%,16px);z-index:70;font-family:var(--mono);font-size:11.5px;letter-spacing:.04em;color:var(--paper);background:var(--ink);border-radius:30px;padding:10px 18px;display:flex;align-items:center;gap:9px;box-shadow:0 14px 34px -12px rgba(12,26,35,.45);opacity:0;pointer-events:none;transition:opacity .4s var(--e1),transform .4s var(--e1)}
.tour-pill.on{opacity:1;transform:translate(-50%,0)}
.tour-pill i{width:6px;height:6px;border-radius:50%;background:var(--signal);animation:blink 1.4s infinite;flex-shrink:0}
.demo-bar{display:flex;align-items:center;gap:9px;padding:14px 20px;border-bottom:1px solid var(--thread-2);background:linear-gradient(var(--paper-2),var(--paper))}
.demo-bar .dots{display:flex;gap:6px}.demo-bar .dots i{width:9px;height:9px;border-radius:50%;background:var(--thread)}
.demo-bar .addr{flex:1;text-align:center;font-family:var(--mono);font-size:11px;color:var(--slate)}
.demo-bar .addr b{color:var(--signal);font-weight:500}

/* persistent patient + loop-ring header */
.demo-head{display:flex;align-items:center;gap:14px;padding:20px 24px 18px;border-bottom:1px solid var(--thread-2)}
.demo-ring{width:46px;height:46px;flex-shrink:0;position:relative}
.demo-ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.demo-ring .ring-track{fill:none;stroke:var(--thread-2);stroke-width:3}
.demo-ring .ring-fill{fill:none;stroke:var(--signal);stroke-width:3;stroke-linecap:round;transition:stroke-dashoffset .7s var(--e1)}
.demo-ring .ring-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:11px;color:var(--signal-deep);font-weight:500}
.demo-head .pt{flex:1;min-width:0}
.demo-head .pt b{font-size:15px;font-weight:600;letter-spacing:-.01em;display:block}
.demo-head .pt span{font-family:var(--mono);font-size:11.5px;color:var(--slate);display:block;margin-top:2px}
.demo-head .badge-live{font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--signal-deep);background:var(--signal-soft);border-radius:30px;padding:6px 11px;display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.demo-head .badge-live i{width:6px;height:6px;border-radius:50%;background:var(--signal);animation:blink 1.5s infinite}

.demo-body{padding:22px 24px 24px;position:relative}
.demo-stagelabel{font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--slate);display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.demo-stagelabel .step{color:var(--signal)}
.stage{display:none}
.stage.on{display:block;animation:stageIn .5s var(--e1)}
@keyframes stageIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

.chart-card{background:var(--paper);border:1px solid var(--thread-2);border-radius:12px;padding:16px 18px}
.chart-row{display:flex;justify-content:space-between;gap:16px;font-family:var(--mono);font-size:12.5px;padding:7px 0;color:var(--ink-soft)}
.chart-row .k{color:var(--slate)}.chart-row.hl span:last-child{color:var(--signal)}
.gen-line{height:9px;border-radius:5px;background:var(--thread-2);margin:10px 0;overflow:hidden;position:relative}
.gen-line i{position:absolute;inset:0;width:0;background:linear-gradient(90deg,var(--signal),var(--signal-deep));border-radius:5px}
.gen-cap{font-family:var(--mono);font-size:11.5px;color:var(--slate);margin-top:12px;display:flex;align-items:center;gap:8px}
.gen-cap b{width:6px;height:6px;border-radius:50%;background:var(--signal);animation:blink 1.3s infinite;flex-shrink:0}

.route{display:flex;align-items:center;justify-content:space-between;margin:8px 0 18px;padding:0 6px}
.route .node{display:flex;flex-direction:column;align-items:center;gap:9px;width:88px}
.route .node .ic{width:46px;height:46px;border-radius:13px;background:var(--paper);border:1px solid var(--thread);display:flex;align-items:center;justify-content:center}
.route .node .lb{font-family:var(--mono);font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--slate);text-align:center;line-height:1.35}
.route .wire{flex:1;height:2px;position:relative;margin:0 10px 24px}
.route .wire .base{position:absolute;inset:0;background:var(--thread-2);border-radius:2px}
.route .wire .fill{position:absolute;inset:0;width:0;background:var(--signal);border-radius:2px;transition:width .8s var(--e2)}
.route .wire .pkt{position:absolute;top:50%;left:0;width:9px;height:9px;border-radius:50%;background:var(--signal);transform:translate(-50%,-50%);box-shadow:0 0 9px var(--signal);opacity:0}

.track-list{display:flex;flex-direction:column}
.tk{display:flex;align-items:center;gap:13px;padding:13px 0;border-top:1px solid var(--thread-2)}
.tk:first-child{border-top:none}
.tk .dot{width:24px;height:24px;border-radius:8px;background:var(--paper);border:1px solid var(--thread);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:11px;color:var(--slate);flex-shrink:0;transition:all .4s var(--e1)}
.tk.done .dot{background:var(--signal-soft);border-color:transparent;color:var(--signal)}
.tk.active .dot{border-color:var(--signal);color:var(--signal);animation:ring 1.4s infinite}
@keyframes ring{0%{box-shadow:0 0 0 0 rgba(15,182,126,.4)}100%{box-shadow:0 0 0 7px rgba(15,182,126,0)}}
.tk .lab{font-size:13.5px;flex:1;min-width:0}.tk .lab b{font-weight:500}
.tk .lab span{font-family:var(--mono);font-size:11px;color:var(--slate);display:block;margin-top:2px}
.tk .tm{font-family:var(--mono);font-size:11px;color:var(--slate);flex-shrink:0;white-space:nowrap}
.tk.done .tm{color:var(--signal-deep)}

.wb{background:var(--signal-soft);border:1px solid rgba(15,182,126,.25);border-radius:13px;padding:18px 20px}
.wb-h{display:flex;align-items:center;gap:10px;font-size:14px;font-weight:500;color:var(--signal-deep);line-height:1.35}
.wb-h svg{flex-shrink:0}
.wb-row{font-family:var(--mono);font-size:12.5px;color:var(--ink-soft);display:flex;justify-content:space-between;gap:16px;padding:8px 0;border-top:1px solid rgba(15,182,126,.15)}
.wb-row:first-of-type{border-top:none;margin-top:14px}
.wb-row span:first-child{color:var(--slate)}
.wb-foot{font-family:var(--mono);font-size:11px;color:var(--signal-deep);margin-top:14px;display:flex;align-items:center;gap:8px}

/* problem */
.void{background:radial-gradient(120% 140% at 80% 25%,#152a36,#0C1A23 62%);border-radius:24px;padding:64px 56px;color:var(--paper);position:relative;overflow:hidden}
.void .eyebrow{color:#7E919C}.void .eyebrow::before{background:#3A5260}
.void h2{font-weight:500;font-size:clamp(27px,3.6vw,42px);letter-spacing:-.03em;line-height:1.12;margin-top:16px;color:var(--paper);max-width:20ch}
.void h2 .em{font-family:var(--serif);font-style:italic;font-weight:400;color:#93A5B0}
.void p{color:#A7B5BE;font-size:16.5px;margin-top:20px;max-width:52ch;line-height:1.62}
.void-orbits{position:absolute;right:-70px;top:50%;transform:translateY(-50%);width:330px;height:330px;pointer-events:none;opacity:.85}
.void-orbits circle.o{fill:none;stroke:#2B4150;stroke-width:1}
.void-orbits .core{fill:none;stroke:#3A5260;stroke-width:1;stroke-dasharray:3 4}
.void-orbits .sat{fill:#4A6373}
.void-stats{display:flex;gap:50px;margin-top:48px;flex-wrap:wrap;position:relative;z-index:2}
.void-stat .n{font-family:var(--display);font-size:clamp(38px,4.6vw,58px);font-weight:500;letter-spacing:-.04em;color:var(--paper);line-height:1;font-variant-numeric:tabular-nums}
.void-stat .n em{font-family:var(--serif);font-style:italic;font-weight:400;font-size:.62em;color:#93A5B0}
.void-stat .l{font-family:var(--mono);font-size:12px;color:#7E919C;margin-top:11px;max-width:22ch;line-height:1.5}
@media(max-width:700px){.void{padding:44px 28px}.void-orbits{opacity:.35}}

/* how-it-works: sequenced playback */
.proc2{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--thread)}
.proc2 .step{padding:34px 26px 42px;border-right:1px solid var(--thread);position:relative;transition:background .6s var(--e1)}
.proc2 .step:last-child{border-right:none}
.proc2 .step .trace{position:absolute;top:-1.5px;left:0;height:2.5px;background:var(--signal);width:0;transition:width .9s var(--e2)}
.proc2 .step.go .trace{width:100%}
.proc2 .step.go{background:linear-gradient(180deg,rgba(15,182,126,.05),transparent 70%)}
.proc2 .n{font-family:var(--mono);font-size:12.5px;color:var(--slate);letter-spacing:.08em;transition:color .4s var(--e1)}
.proc2 .step.go .n{color:var(--signal)}
.proc2 h3{font-family:var(--display);font-weight:600;font-size:20px;margin:14px 0 10px;letter-spacing:-.01em}
.proc2 p{font-size:14px;color:var(--slate);line-height:1.6}
@media(max-width:900px){.proc2{grid-template-columns:1fr}.proc2 .step{border-right:none;border-bottom:1px solid var(--thread)}}

.mini{height:48px;margin-top:18px;display:flex;align-items:center}
.mini-write{display:flex;flex-direction:column;gap:7px;width:100%;max-width:170px}
.mini-write .bar{height:7px;border-radius:4px;background:var(--thread-2);overflow:hidden;position:relative}
.mini-write .bar i{position:absolute;inset:0;width:0;background:linear-gradient(90deg,var(--signal),var(--signal-deep));border-radius:4px;transition:width .6s var(--e1)}
.step.go .mini-write .bar:nth-child(1) i{width:100%;transition-delay:.15s}
.step.go .mini-write .bar:nth-child(2) i{width:88%;transition-delay:.35s}
.step.go .mini-write .bar:nth-child(3) i{width:64%;transition-delay:.55s}
.mini-route{display:flex;align-items:center;width:100%;max-width:190px;gap:8px}
.mini-route .nd{width:13px;height:13px;border-radius:4px;border:1.5px solid var(--slate);flex-shrink:0;background:var(--paper-2);transition:border-color .4s var(--e1)}
.step.go .mini-route .nd{border-color:var(--ink)}
.step.go .mini-route .nd.b{border-color:var(--signal);background:var(--signal-soft)}
.mini-route .ln{flex:1;height:2px;background:var(--thread-2);position:relative;border-radius:2px}
.mini-route .ln .fl{position:absolute;inset:0;width:0;background:var(--signal);border-radius:2px;transition:width .9s var(--e2) .2s}
.mini-route .ln .pk{position:absolute;top:50%;left:0;width:8px;height:8px;border-radius:50%;background:var(--signal);transform:translate(-50%,-50%);box-shadow:0 0 8px rgba(15,182,126,.8);opacity:0;transition:left .9s var(--e2) .2s,opacity .25s var(--e1) .2s}
.step.go .mini-route .fl{width:100%}
.step.go .mini-route .pk{left:100%;opacity:1}
.mini-close .ring-base{stroke:var(--thread-2)}
.mini-close .arc{stroke-dasharray:88;stroke-dashoffset:88;transition:stroke-dashoffset .8s var(--e1) .15s}
.mini-close .chk{stroke-dasharray:34;stroke-dashoffset:34;transition:stroke-dashoffset .45s var(--e1) .8s}
.step.go .mini-close .arc{stroke-dashoffset:0}
.step.go .mini-close .chk{stroke-dashoffset:0}

/* savings line */
.savings{margin-top:34px;font-family:var(--mono);font-size:13px;color:var(--slate);display:flex;gap:16px;flex-wrap:wrap;align-items:baseline}
.savings .big{font-family:var(--display);font-weight:500;font-size:17px;color:var(--ink);letter-spacing:-.01em}
.savings .big s{color:var(--slate);text-decoration-color:var(--signal);text-decoration-thickness:2px}
.savings .big b{color:var(--signal);border-radius:5px;padding:1px 5px;background:transparent;transition:background .6s var(--e1)}
.savings.lit .big b{background:var(--signal-soft)}

/* ask tether */
.intel{background:linear-gradient(150deg,var(--paper-2),#FBFCFC);border:1px solid var(--thread);border-radius:24px;padding:54px 50px;display:grid;grid-template-columns:1.05fr .95fr;gap:50px;align-items:center;position:relative;overflow:hidden}
.intel .glow{position:absolute;top:-120px;right:-100px;width:360px;height:360px;background:radial-gradient(circle,rgba(15,182,126,.1),transparent 65%);pointer-events:none}
.intel .copy h2{font-weight:500;font-size:clamp(27px,3.2vw,40px);letter-spacing:-.03em;line-height:1.1;margin-top:16px}
.intel .copy h2 .em{font-family:var(--serif);font-style:italic;font-weight:400}
.intel .copy p{color:var(--ink-soft);font-size:16px;margin-top:16px;line-height:1.6;max-width:38ch}
.intel-list{margin-top:24px;display:flex;flex-direction:column;gap:14px}
.intel-list .li{display:flex;gap:12px;align-items:flex-start}
.intel-list .li b{font-weight:600;font-size:15px}
.intel-list .li span{display:block;color:var(--slate);font-size:13.5px;margin-top:2px;line-height:1.5}
.ask{background:var(--ink);border:1px solid rgba(15,182,126,.16);border-radius:16px;padding:20px;font-family:var(--mono);box-shadow:0 30px 60px -36px rgba(12,26,35,.5),0 0 44px -22px rgba(15,182,126,.35)}
.ask-top{display:flex;align-items:center;gap:8px;padding-bottom:13px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:15px}
.ask-top .av{width:20px;height:20px;border-radius:6px;background:var(--signal-soft);display:flex;align-items:center;justify-content:center}
.ask-top .nm{font-size:12px;color:#fff;font-weight:500}
.ask-top .st{margin-left:auto;font-size:10.5px;color:var(--signal);display:flex;align-items:center;gap:6px}
.ask-top .st i{width:6px;height:6px;border-radius:50%;background:var(--signal);animation:blink 1.5s infinite}
.ask-stage{min-height:208px;display:flex;flex-direction:column;align-items:flex-start;opacity:1;transition:opacity .35s var(--e1)}
.ask-stage.out{opacity:0}
.ask-q{width:100%;font-size:13px;color:#fff;background:rgba(255,255,255,.06);border-radius:10px;padding:12px 14px;min-height:42px}
.ask-q .car{display:inline-block;width:7px;height:14px;background:var(--signal);vertical-align:-2px;margin-left:1px;animation:car .9s step-end infinite}
@keyframes car{50%{opacity:0}}
.ask-think{display:flex;gap:5px;align-items:center;margin:13px 4px 0;height:14px}
.ask-think i{width:5px;height:5px;border-radius:50%;background:#7E919C;animation:thinkB .85s var(--e1) infinite}
.ask-think i:nth-child(2){animation-delay:.12s}
.ask-think i:nth-child(3){animation-delay:.24s}
@keyframes thinkB{0%,100%{opacity:.2;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}
.ask-a{width:100%;margin-top:13px;opacity:0;transition:opacity .4s var(--e1)}
.ask-a.on{opacity:1}
.ask-a .hd{display:flex;align-items:baseline;gap:8px;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:#5C6E79;margin-bottom:8px}
.ask-a .hd .lat{margin-left:auto;color:var(--signal);letter-spacing:.02em;text-transform:none;font-size:10px;display:inline-flex;align-items:center;gap:5px}
.ask-a .hd .lat i{width:4px;height:4px;border-radius:50%;background:var(--signal)}
.ask-a .ln{font-size:12px;color:#9FB0BA;line-height:1.7;opacity:0;transform:translateX(-6px);transition:all .4s var(--e1)}
.ask-a.on .ln{opacity:1;transform:none}
.ask-a.on .ln:nth-child(2){transition-delay:.1s}.ask-a.on .ln:nth-child(3){transition-delay:.2s}.ask-a.on .ln:nth-child(4){transition-delay:.3s}
.ask-a .ln .hit{color:var(--amber)}
.ask-a .ln .ok{color:var(--signal)}
.ask-act{margin-top:14px;display:inline-flex;align-items:center;gap:8px;font-size:11.5px;color:var(--ink);background:var(--signal);padding:9px 14px;border-radius:9px;opacity:0;transform:translateY(8px);transition:all .45s var(--e1)}
.ask-act.on{opacity:1;transform:none}
.ask-dots{display:flex;gap:6px;margin-top:16px;justify-content:center;width:100%}
.ask-dots i{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.15);transition:background .3s var(--e1),transform .3s var(--e1)}
.ask-dots i.on{background:var(--signal);transform:scale(1.25)}
@media(max-width:900px){.intel{grid-template-columns:1fr;padding:38px 26px;gap:34px}}

/* fits your practice */
.fits{display:grid;grid-template-columns:200px 1fr;gap:32px;padding:30px 0;border-bottom:1px solid var(--thread);align-items:start}
.fits:last-child{border-bottom:none}
.fits .when{font-family:var(--mono);font-size:12px;color:var(--slate);padding-top:3px}
.fits .when b{display:block;color:var(--signal);font-size:13px;margin-bottom:5px;letter-spacing:.04em}
.fits.fut .when b{color:var(--slate)}
.fits h3{font-weight:500;font-size:clamp(19px,2.2vw,25px);letter-spacing:-.02em;line-height:1.15}
.fits h3 .em{font-family:var(--serif);font-style:italic;font-weight:400}
.fits p{font-size:14px;color:var(--slate);margin-top:8px;line-height:1.6;max-width:56ch}
@media(max-width:900px){.fits{grid-template-columns:1fr;gap:6px}}

/* releases */
.relc{position:relative}
.relc .rn{font-family:var(--mono);font-size:11px;color:var(--slate);letter-spacing:.1em}
.relc h3{margin-top:14px}
.relc .pip{margin-top:14px;font-family:var(--mono);font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;padding:6px 11px;border-radius:30px;display:inline-flex;align-items:center;gap:6px;border:1px solid var(--thread);color:var(--slate)}
.relc.live .pip{background:var(--signal-soft);border-color:transparent;color:var(--signal-deep)}
.relc.live .pip i{width:6px;height:6px;border-radius:50%;background:var(--signal);animation:blink 1.5s infinite}
.relc.live{border-color:rgba(15,182,126,.35)}

/* close */
.close{text-align:center;padding:130px 0 140px}
.seal{margin:0 auto 40px;display:block}
.close h2{font-weight:500;font-size:clamp(34px,5.6vw,66px);letter-spacing:-.035em;line-height:1.05;max-width:15ch;margin:0 auto}
.close h2 .em{font-family:var(--serif);font-style:italic;font-weight:400}
.close p{font-size:17px;color:var(--ink-soft);margin:22px auto 0;max-width:42ch}
.close .btn-primary{margin-top:34px}
.close .micro{font-family:var(--mono);font-size:11.5px;color:var(--slate);margin-top:20px;letter-spacing:.03em}
`;

const CheckIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" aria-hidden="true">
    <circle cx="8.5" cy="8.5" r="8" fill="none" stroke="#0FB67E" strokeWidth="1.3" />
    <path d="M5 8.5l2.3 2.3L12 6" stroke="#0FB67E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Guided tour: auto-scroll the story, hand control back on any input ── */
const TOUR_STOPS: [string, number][] = [
  ["problem", 4200],
  ["how", 5200],
  ["ask", 6000],
  ["fits", 4200],
  ["releases", 4000],
  ["close", 4200],
];

function useTour() {
  const [touring, setTouring] = useState(false);
  const cancelRef = useRef<(() => void) | null>(null);

  const start = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.getElementById("how")?.scrollIntoView();
      return;
    }
    cancelRef.current?.();

    let timer: ReturnType<typeof setTimeout> | null = null;
    const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    const cancel = () => {
      if (timer) clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, cancel));
      cancelRef.current = null;
      setTouring(false);
    };
    cancelRef.current = cancel;
    /* defer so the click that started the tour doesn't cancel it */
    setTimeout(() => events.forEach((ev) => window.addEventListener(ev, cancel, { passive: true })), 50);
    setTouring(true);

    let i = 0;
    const step = () => {
      if (i >= TOUR_STOPS.length) {
        cancel();
        return;
      }
      const [id, dwellMs] = TOUR_STOPS[i++];
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      timer = setTimeout(step, dwellMs);
    };
    step();
  };

  useEffect(() => () => cancelRef.current?.(), []);
  return { touring, start };
}

/* ── Hero: word reveal + demo card state machine ── */
function Hero({ onTour }: { onTour: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector<T>(sel);
    const $$ = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

    /* entrance */
    if (reduced) {
      $$(".word, .hero-sub, .hero-actions, .hero-meta, .demo").forEach((e) => {
        e.style.opacity = "1";
        e.style.transform = "none";
        e.style.filter = "none";
      });
    } else {
      $$(".word").forEach((w, i) => {
        w.style.animation = `wordIn .8s var(--e1) ${0.15 + i * 0.085}s forwards`;
      });
      const soft = (sel: string, d: number) => {
        const e = $(sel);
        if (e) e.style.animation = `softIn .9s var(--e1) ${d}s forwards`;
      };
      soft(".hero-sub", 0.7);
      soft(".hero-actions", 0.85);
      soft(".hero-meta", 1);
      soft(".demo", 0.85);
    }

    /* demo state machine */
    const demo = $(".demo");
    if (!demo) return;
    const names = ["Patient chart", "Routing", "Lifecycle", "Write-back"];
    const stageEls = ["s1", "s2", "s3", "s4"].map((id) => $(`[data-stage="${id}"]`));
    const stageName = $(".js-stage-name");
    const stageStep = $(".js-stage-step");
    const ring = $<SVGCircleElement & HTMLElement>(".ring-fill");
    const ringNum = $(".ring-num");
    const R = 20;
    const CIRC = 2 * Math.PI * R;
    if (ring) {
      ring.style.strokeDasharray = String(CIRC);
      ring.style.strokeDashoffset = String(CIRC);
    }

    if (reduced) {
      /* single representative stage, ring closed */
      stageEls.forEach((e, k) => e?.classList.toggle("on", k === 2));
      if (ring) ring.style.strokeDashoffset = "0";
      if (ringNum) ringNum.textContent = "4/4";
      if (stageName) stageName.textContent = names[2];
      if (stageStep) stageStep.textContent = "Step 03";
      return;
    }

    let idx = 0;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const clearT = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    function show(i: number) {
      stageEls.forEach((e, k) => e?.classList.toggle("on", k === i));
      if (stageName) stageName.textContent = names[i];
      if (stageStep) stageStep.textContent = `Step 0${i + 1}`;
      if (ring) ring.style.strokeDashoffset = String(CIRC * (1 - (i + 1) / 4));
      if (ringNum) ringNum.textContent = `${i + 1}/4`;

      if (i === 0) {
        $$(".gen-line i").forEach((g, k) =>
          timers.push(
            setTimeout(() => {
              g.style.transition = "width .7s var(--e1)";
              g.style.width = "100%";
            }, 200 + k * 240)
          )
        );
      }
      if (i === 1) {
        const f = $(".js-wfill");
        const p = $(".js-pkt");
        if (f && p) {
          f.style.width = "0";
          p.style.opacity = "0";
          p.style.transition = "none";
          p.style.left = "0";
          timers.push(
            setTimeout(() => {
              f.style.width = "100%";
              p.style.opacity = "1";
              p.style.transition = "left 1s var(--e2)";
              p.style.left = "100%";
            }, 250)
          );
          timers.push(setTimeout(() => (p.style.opacity = "0"), 1400));
        }
      }
      if (i === 2) {
        const tks = $$(".track-list .tk");
        timers.push(
          setTimeout(() => {
            const t2 = tks[2];
            const t3 = tks[3];
            if (t2) {
              t2.classList.remove("active");
              t2.classList.add("done");
              const dot = t2.querySelector(".dot");
              const sub = t2.querySelector(".lab span");
              if (dot) dot.textContent = "✓";
              if (sub) sub.textContent = "visit completed";
            }
            if (t3) {
              t3.classList.add("active");
              const dot = t3.querySelector(".dot");
              const sub = t3.querySelector(".lab span");
              if (dot) dot.textContent = "~";
              if (sub) sub.textContent = "consult note returning…";
            }
          }, 1100)
        );
      }
    }

    function reset() {
      $$(".gen-line i").forEach((g) => {
        g.style.transition = "none";
        g.style.width = "0";
      });
      const tks = $$(".track-list .tk");
      const t2 = tks[2];
      const t3 = tks[3];
      if (t2) {
        t2.classList.add("active");
        t2.classList.remove("done");
        const dot = t2.querySelector(".dot");
        const sub = t2.querySelector(".lab span");
        if (dot) dot.textContent = "~";
        if (sub) sub.textContent = "visit booked · awaiting";
      }
      if (t3) {
        t3.classList.remove("active", "done");
        const dot = t3.querySelector(".dot");
        const sub = t3.querySelector(".lab span");
        const tm = t3.querySelector(".tm");
        if (dot) dot.textContent = "";
        if (sub) sub.textContent = "consult note pending";
        if (tm) tm.textContent = "—";
      }
    }

    const dwell = [2500, 2300, 2800, 2900];
    function loop() {
      clearT();
      show(idx);
      timers.push(
        setTimeout(() => {
          idx = (idx + 1) % 4;
          if (idx === 0) reset();
          loop();
        }, dwell[idx])
      );
    }

    let started = false;
    let startTimer: ReturnType<typeof setTimeout> | null = null;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            startTimer = setTimeout(loop, 1200);
          }
        }),
      { threshold: 0.3 }
    );
    io.observe(demo);

    return () => {
      io.disconnect();
      clearT();
      if (startTimer) clearTimeout(startTimer);
    };
  }, []);

  return (
    <header className="hero wrap" id="top" ref={rootRef}>
      <div className="hero-copy">
        <h1>
          <span className="word">Close</span> <span className="word">the</span>{" "}
          <span className="word em">loop</span>
          <br />
          <span className="word">on</span> <span className="word">every</span>
          <br />
          <span className="word">referral.</span>
        </h1>
        <p className="hero-sub">
          Half of specialist referrals never close. Tether writes the clinical referral from the
          chart, routes it, tracks every stage, and returns the consult note, so the loop closes on
          its own.
        </p>
        <div className="hero-actions">
          <Link href="/request-demo" className="btn btn-primary">
            Request a demo <span className="arr">→</span>
          </Link>
          <button type="button" className="btn btn-ghost btn-tour" onClick={onTour}>
            <svg className="play-ic" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.4" />
              <path d="M7.2 6.2v5.6L11.8 9 7.2 6.2z" fill="currentColor" />
            </svg>
            Take the 30-second tour
          </button>
        </div>
        <div className="hero-meta">
          <span className="item">
            <b></b>Works with your EHR
          </span>
          <span className="item">
            <b></b>HIPAA compliant
          </span>
          <span className="item">
            <b></b>Loop closed automatically
          </span>
        </div>
      </div>

      <div className="demo">
        <div className="demo-frame">
          <div className="demo-bar">
            <div className="dots">
              <i></i>
              <i></i>
              <i></i>
            </div>
            <div className="addr">
              tether · <b>referral</b>
            </div>
            <div style={{ width: 40 }} />
          </div>
          <div className="demo-head">
            <div className="demo-ring">
              <svg viewBox="0 0 46 46">
                <circle className="ring-track" cx="23" cy="23" r="20" />
                <circle className="ring-fill" cx="23" cy="23" r="20" />
              </svg>
              <span className="ring-num">1/4</span>
            </div>
            <div className="pt">
              <b>A.K. · 67F</b>
              <span>Neurology referral</span>
            </div>
            <span className="badge-live">
              <i></i>tracking
            </span>
          </div>
          <div className="demo-body">
            <div className="demo-stagelabel">
              <span className="js-stage-name">Patient chart</span>
              <span className="step js-stage-step">Step 01</span>
            </div>

            <div className="stage on" data-stage="s1">
              <div className="chart-card">
                <div className="chart-row">
                  <span className="k">Reason for referral</span>
                  <span>numbness, B/L hands</span>
                </div>
                <div className="chart-row">
                  <span className="k">From chart</span>
                  <span>HbA1c 7.8 · meds · history</span>
                </div>
                <div className="chart-row hl">
                  <span className="k">Specialty</span>
                  <span>Neurology</span>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div className="gen-line">
                  <i></i>
                </div>
                <div className="gen-line" style={{ width: "88%" }}>
                  <i></i>
                </div>
                <div className="gen-line" style={{ width: "72%" }}>
                  <i></i>
                </div>
                <div className="gen-cap">
                  <b></b>writing the clinical referral from chart context…
                </div>
              </div>
            </div>

            <div className="stage" data-stage="s2">
              <div className="route">
                <div className="node">
                  <div className="ic">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="3" width="14" height="14" rx="3" stroke="#0C1A23" strokeWidth="1.4" />
                      <path d="M7 10h6M10 7v6" stroke="#0FB67E" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="lb">
                    PCP
                    <br />
                    chart
                  </div>
                </div>
                <div className="wire">
                  <div className="base"></div>
                  <div className="fill js-wfill"></div>
                  <div className="pkt js-pkt"></div>
                </div>
                <div className="node">
                  <div className="ic">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 3v14M3 10h14" stroke="#0C1A23" strokeWidth="1.4" strokeLinecap="round" />
                      <circle cx="10" cy="10" r="7" stroke="#0FB67E" strokeWidth="1.4" />
                    </svg>
                  </div>
                  <div className="lb">
                    Neuro
                    <br />
                    specialist
                  </div>
                </div>
              </div>
              <div className="chart-card">
                <div className="chart-row hl">
                  <span className="k">Insurance</span>
                  <span>verified · accepted ✓</span>
                </div>
                <div className="chart-row">
                  <span className="k">Routing</span>
                  <span>Georgetown Neurology · 2.1 mi</span>
                </div>
                <div className="chart-row">
                  <span className="k">Transmitted</span>
                  <span>9:42 AM</span>
                </div>
              </div>
            </div>

            <div className="stage" data-stage="s3">
              <div className="track-list">
                <div className="tk done">
                  <div className="dot">✓</div>
                  <div className="lab">
                    <b>Sent</b>
                    <span>referral transmitted</span>
                  </div>
                  <div className="tm">9:42 AM</div>
                </div>
                <div className="tk done">
                  <div className="dot">✓</div>
                  <div className="lab">
                    <b>Acknowledged</b>
                    <span>specialty office received</span>
                  </div>
                  <div className="tm">10:18 AM</div>
                </div>
                <div className="tk active">
                  <div className="dot">~</div>
                  <div className="lab">
                    <b>Scheduled</b>
                    <span>visit booked · awaiting</span>
                  </div>
                  <div className="tm">Apr 28</div>
                </div>
                <div className="tk">
                  <div className="dot"></div>
                  <div className="lab">
                    <b>Visit complete</b>
                    <span>consult note pending</span>
                  </div>
                  <div className="tm">—</div>
                </div>
              </div>
            </div>

            <div className="stage" data-stage="s4">
              <div className="wb">
                <div className="wb-h">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="8" stroke="#0A8E63" strokeWidth="1.4" />
                    <path d="M5.5 9l2.2 2.2L12.5 6.5" stroke="#0A8E63" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Loop closed · consult note returned to the chart
                </div>
                <div className="wb-row">
                  <span>Diagnosis</span>
                  <span>Carpal tunnel, bilateral</span>
                </div>
                <div className="wb-row">
                  <span>Plan</span>
                  <span>Night splints · EMG ordered</span>
                </div>
                <div className="wb-row">
                  <span>Follow-up</span>
                  <span>PCP visit · 6 weeks</span>
                </div>
                <div className="wb-foot">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 6.5h9M7 3l4 3.5L7 10" stroke="#0FB67E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  A.K. chart updated
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── How it works: sequenced step playback, replayable via "Watch it work" ── */
function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>(".proc2 .step"));
    const savings = root.querySelector<HTMLElement>(".savings");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      steps.forEach((s) => s.classList.add("go"));
      savings?.classList.add("lit");
      return;
    }

    let timers: ReturnType<typeof setTimeout>[] = [];
    const clearT = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };

    const play = () => {
      clearT();
      steps.forEach((s) => s.classList.remove("go"));
      savings?.classList.remove("lit");
      /* force reflow so transitions restart on replay */
      void root.offsetWidth;
      timers.push(setTimeout(() => steps[0]?.classList.add("go"), 200));
      timers.push(setTimeout(() => steps[1]?.classList.add("go"), 1300));
      timers.push(setTimeout(() => steps[2]?.classList.add("go"), 2400));
      timers.push(setTimeout(() => savings?.classList.add("lit"), 3450));
    };

    let played = false;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && !played) {
            played = true;
            play();
          }
        }),
      { threshold: 0.3 }
    );
    io.observe(root);

    return () => {
      io.disconnect();
      clearT();
    };
  }, []);

  return (
    <section id="how" ref={ref}>
      <div className="wrap">
        <div className="sec-head fade">
          <span className="eyebrow">How the loop closes</span>
          <h2>
            One workflow. <span className="em">Zero</span> phone calls.
          </h2>
          <p>
            Each stage runs on its own once the last one lands. Your staff reviews and approves;
            Tether does the chasing.
          </p>
        </div>
        <div className="proc2 fade">
          <div className="step">
            <div className="trace"></div>
            <div className="n">01 · WRITE</div>
            <div className="mini" aria-hidden="true">
              <div className="mini-write">
                <div className="bar">
                  <i></i>
                </div>
                <div className="bar">
                  <i></i>
                </div>
                <div className="bar">
                  <i></i>
                </div>
              </div>
            </div>
            <h3>From the chart</h3>
            <p>
              Tether pulls patient context from the chart and drafts the complete clinical
              referral, ready for a quick physician review.
            </p>
          </div>
          <div className="step">
            <div className="trace"></div>
            <div className="n">02 · ROUTE</div>
            <div className="mini" aria-hidden="true">
              <div className="mini-route">
                <span className="nd"></span>
                <span className="ln">
                  <i className="fl"></i>
                  <i className="pk"></i>
                </span>
                <span className="nd b"></span>
              </div>
            </div>
            <h3>Out the door</h3>
            <p>
              Insurance is checked against the specialist&apos;s accepted plans, then the referral
              routes to the right office. No fax hunting.
            </p>
          </div>
          <div className="step">
            <div className="trace"></div>
            <div className="n">03 · CLOSE</div>
            <div className="mini" aria-hidden="true">
              <svg className="mini-close" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle className="ring-base" cx="20" cy="20" r="14" strokeWidth="2.5" />
                <circle
                  className="arc"
                  cx="20"
                  cy="20"
                  r="14"
                  stroke="var(--signal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  transform="rotate(-90 20 20)"
                />
                <path
                  className="chk"
                  d="M14 20.5l4.5 4.5 8.5-9.5"
                  stroke="var(--signal)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>Back to the chart</h3>
            <p>
              Every stage is tracked automatically. When the consult note returns, it lands back in
              the patient&apos;s chart.
            </p>
          </div>
        </div>
        <div className="savings fade">
          <span className="big">
            Staff time per referral: <s>~25 min</s> → <b>~7 min</b>
          </span>
          <span>against our design-partner baseline.</span>
        </div>
      </div>
    </section>
  );
}

/* ── Broken-loop stats: count up when scrolled into view ── */
function VoidStats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-target]"));
    const setFinal = () =>
      nums.forEach((n) => {
        n.textContent = (n.dataset.prefix || "") + n.dataset.target;
      });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFinal();
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          nums.forEach((n, k) => {
            const target = parseInt(n.dataset.target!, 10);
            const prefix = n.dataset.prefix || "";
            const dur = 1400;
            const t0 = performance.now() + k * 140;
            const tick = (now: number) => {
              const t = Math.min(1, Math.max(0, (now - t0) / dur));
              const eased = 1 - Math.pow(1 - t, 3);
              n.textContent = prefix + Math.round(target * eased);
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          });
        }),
      { threshold: 0.4 }
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="void-stats" ref={ref}>
      <div className="void-stat">
        <div className="n">
          <span data-target="50" data-prefix="~">
            ~0
          </span>
          <em>%</em>
        </div>
        <div className="l">of PCP referrals never close the loop</div>
      </div>
      <div className="void-stat">
        <div className="n">
          <span data-target="25" data-prefix="~">
            ~0
          </span>
          <em>min</em>
        </div>
        <div className="l">of staff coordination time, per referral</div>
      </div>
      <div className="void-stat">
        <div className="n">
          <span data-target="981" data-prefix="$">
            $0
          </span>
          <em>B</em>
        </div>
        <div className="l">US specialty market this workflow runs inside</div>
      </div>
    </div>
  );
}

/* ── Ask Tether widget: multi-scenario ask → instant answer → action loop ── */
const ASK_SCENARIOS = [
  {
    q: "Which referrals need follow-up today?",
    time: "0.6s",
    lines: [
      <>3 referrals need attention today.</>,
      <>› J.M. → Cardiology · sent 6d ago, no response</>,
      <>
        › A.K. → Neurology · <span className="hit">specialist not accepting</span>
      </>,
    ],
    act: "↳ follow-up sent · alternate found for A.K.",
  },
  {
    q: "What does Georgetown Neuro need to book A.K.?",
    time: "0.4s",
    lines: [
      <>Referral note, recent EMG, and insurance.</>,
      <>
        › EMG on file <span className="ok">✓</span> · note drafted from chart
      </>,
      <>
        › insurance verified · <span className="ok">accepted</span>
      </>,
    ],
    act: "↳ packet assembled · sent to Georgetown Neuro",
  },
  {
    q: "Status on J.M.'s cardiology consult?",
    time: "0.3s",
    lines: [
      <>Visit completed Tuesday, 2:10 PM.</>,
      <>› consult note returned this morning</>,
      <>
        › chart updated · <span className="ok">loop closed</span>
      </>,
    ],
    act: "↳ summary filed · PCP notified",
  },
];

type AskPhase = "idle" | "typing" | "thinking" | "answer" | "action" | "out";

function AskWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const [si, setSi] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<AskPhase>("idle");

  useEffect(() => {
    const w = ref.current;
    if (!w) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(ASK_SCENARIOS[0].q);
      setPhase("action");
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    async function cycle() {
      let s = 0;
      while (!cancelled) {
        setSi(s);
        setTyped("");
        setPhase("typing");
        const q = ASK_SCENARIOS[s].q;
        for (let i = 1; i <= q.length; i++) {
          if (cancelled) return;
          setTyped(q.slice(0, i));
          await sleep(26);
        }
        /* a beat of thought, then the answer lands fast */
        setPhase("thinking");
        await sleep(520);
        if (cancelled) return;
        setPhase("answer");
        await sleep(1200);
        if (cancelled) return;
        setPhase("action");
        await sleep(3400);
        if (cancelled) return;
        setPhase("out");
        await sleep(380);
        s = (s + 1) % ASK_SCENARIOS.length;
      }
    }

    let started = false;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            setTimeout(() => {
              if (!cancelled) cycle();
            }, 350);
          }
        }),
      { threshold: 0.4 }
    );
    io.observe(w);

    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  const sc = ASK_SCENARIOS[si];
  const answered = phase === "answer" || phase === "action" || phase === "out";
  const acted = phase === "action" || phase === "out";

  return (
    <div className="ask" ref={ref}>
      <div className="ask-top">
        <span className="av">
          <svg width="11" height="11" viewBox="0 0 11 11">
            <circle cx="5.5" cy="5.5" r="5" fill="none" stroke="#0FB67E" strokeWidth="1.2" />
            <circle cx="8" cy="5.5" r="1.4" fill="#0FB67E" />
          </svg>
        </span>
        <span className="nm">Ask Tether</span>
        <span className="st">
          <i></i>live
        </span>
      </div>
      <div className={`ask-stage${phase === "out" ? " out" : ""}`}>
        <div className="ask-q">
          {typed}
          {(phase === "typing" || phase === "idle") && <span className="car"></span>}
        </div>
        {phase === "thinking" && (
          <div className="ask-think" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
          </div>
        )}
        <div className={`ask-a${answered ? " on" : ""}`}>
          <div className="hd">
            <span>Tether</span>
            <span className="lat">
              <i></i>answered in {sc.time}
            </span>
          </div>
          {sc.lines.map((ln, k) => (
            <div className="ln" key={`${si}-${k}`}>
              {ln}
            </div>
          ))}
        </div>
        <div className={`ask-act${acted ? " on" : ""}`}>{sc.act}</div>
      </div>
      <div className="ask-dots" aria-hidden="true">
        {ASK_SCENARIOS.map((_, k) => (
          <i key={k} className={k === si ? "on" : ""}></i>
        ))}
      </div>
    </div>
  );
}

/* ── Closing seal: self-drawing circle + check ── */
function CloseSeal() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const seal = ref.current;
    if (!seal) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const arc = seal.querySelector<SVGCircleElement>(".seal-arc");
    const chk = seal.querySelector<SVGPathElement>(".seal-check");
    if (!arc || !chk) return;

    const C = 2 * Math.PI * 27;
    arc.style.strokeDasharray = String(C);
    arc.style.strokeDashoffset = reduced ? "0" : String(C);
    const cl = chk.getTotalLength();
    chk.style.strokeDasharray = String(cl);
    chk.style.strokeDashoffset = reduced ? "0" : String(cl);
    if (reduced) return;

    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            arc.animate([{ strokeDashoffset: C }, { strokeDashoffset: 0 }], {
              duration: 1000,
              easing: "cubic-bezier(.22,1,.36,1)",
              fill: "forwards",
            });
            chk.animate([{ strokeDashoffset: cl }, { strokeDashoffset: 0 }], {
              duration: 520,
              delay: 900,
              easing: "ease",
              fill: "forwards",
            });
            io.disconnect();
          }
        }),
      { threshold: 0.6 }
    );
    io.observe(seal);
    return () => io.disconnect();
  }, []);

  return (
    <svg className="seal fade" ref={ref} width="66" height="66" viewBox="0 0 66 66" aria-hidden="true">
      <circle cx="33" cy="33" r="27" fill="none" stroke="var(--thread)" strokeWidth="2" />
      <circle
        className="seal-arc"
        cx="33"
        cy="33"
        r="27"
        fill="none"
        stroke="var(--signal)"
        strokeWidth="2"
        strokeLinecap="round"
        transform="rotate(-90 33 33)"
      />
      <path
        className="seal-check"
        d="M24 33l6 6 12-13"
        fill="none"
        stroke="var(--signal)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  const { touring, start } = useTour();

  return (
    <>
      <style>{CSS}</style>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tether Health",
          url: "https://tetherhealth.co",
          logo: "https://tetherhealth.co/logo.png",
          description:
            "Tether writes the clinical referral from the chart, routes it, tracks every stage, and returns the consult note.",
        }}
      />

      <Hero onTour={start} />

      <div className={`tour-pill${touring ? " on" : ""}`} aria-hidden={!touring}>
        <i></i>Touring · scroll anytime to take over
      </div>

      {/* PROBLEM */}
      <section id="problem">
        <div className="wrap">
          <div className="void fade">
            <span className="eyebrow">The broken loop</span>
            <h2>
              A referral leaves the practice and <span className="em">disappears.</span>
            </h2>
            <p>
              It gets faxed. No confirmation comes back. The staff chase it by phone, the patient
              calls in confused, and the consult note rarely finds its way back. Roughly half of
              referrals never close. Tether is built to close them.
            </p>
            <VoidStats />
            <svg className="void-orbits" viewBox="0 0 330 330" aria-hidden="true">
              <circle className="o" cx="165" cy="165" r="52" />
              <circle className="o" cx="165" cy="165" r="92" />
              <circle className="o" cx="165" cy="165" r="132" />
              <circle className="core" cx="165" cy="165" r="20" />
              <circle className="sat" cx="217" cy="165" r="3.6" />
              <circle className="sat" cx="165" cy="73" r="3.2" />
              <circle className="sat" cx="73" cy="180" r="3.2" />
            </svg>
          </div>
        </div>
      </section>

      {/* HOW */}
      <HowItWorks />

      {/* ASK TETHER */}
      <section id="ask">
        <div className="wrap">
          <div className="intel fade">
            <div className="glow"></div>
            <div className="copy">
              <span className="eyebrow">Ask Tether</span>
              <h2>
                A coordinator that <span className="em">never sleeps.</span>
              </h2>
              <p>
                Ask a question, get an action. Tether watches every referral around the clock and
                answers from your live data.
              </p>
              <div className="intel-list">
                <div className="li">
                  <span>
                    <CheckIcon />
                  </span>
                  <div>
                    <b>Answers from your data</b>
                    <span>
                      Which loops are stuck, what a specialist needs, why a patient hasn&apos;t been
                      seen.
                    </span>
                  </div>
                </div>
                <div className="li">
                  <span>
                    <CheckIcon />
                  </span>
                  <div>
                    <b>Acts, doesn&apos;t just suggest</b>
                    <span>Sends the follow-up. Finds the alternate. Flags the broken loop.</span>
                  </div>
                </div>
                <div className="li">
                  <span>
                    <CheckIcon />
                  </span>
                  <div>
                    <b>Learns your network</b>
                    <span>Over time it knows which specialists actually close the loop.</span>
                  </div>
                </div>
              </div>
            </div>
            <AskWidget />
          </div>
        </div>
      </section>

      {/* FITS YOUR PRACTICE */}
      <section id="fits">
        <div className="wrap">
          <div className="sec-head fade">
            <span className="eyebrow">Fits your practice</span>
            <h2>
              No rip-and-replace. <span className="em">Ever.</span>
            </h2>
            <p>
              Tether runs alongside whatever you already use. It connects directly to athenahealth
              and ModMed, and works for any practice through fax and a shared inbox. Over time it
              does more of the work and asks less of your staff.
            </p>
          </div>
          <div className="stagger">
            <div className="fits">
              <div className="when">
                <b>Today</b>Live
              </div>
              <div>
                <h3>
                  Runs <span className="em">alongside</span> your tools
                </h3>
                <p>
                  A clean app your staff opens to work referrals, with a direct line into
                  athenahealth and ModMed. Practices on other systems join through fax and a shared
                  inbox, no integration required.
                </p>
              </div>
            </div>
            <div className="fits">
              <div className="when">
                <b>Next</b>This year
              </div>
              <div>
                <h3>
                  One click from the <span className="em">chart</span>
                </h3>
                <p>
                  For connected EHRs, launch Tether from inside the chart, already signed in,
                  patient context carried over. No second login.
                </p>
              </div>
            </div>
            <div className="fits fut">
              <div className="when">
                <b>Ahead</b>On the roadmap
              </div>
              <div>
                <h3>
                  A panel <span className="em">inside</span> the chart
                </h3>
                <p>
                  Tether renders right in the record so staff never leave it. Built to an open
                  standard, so the same surface extends to new EHRs without a rebuild.
                </p>
              </div>
            </div>
            <div className="fits fut">
              <div className="when">
                <b>The goal</b>Where this leads
              </div>
              <div>
                <h3>
                  Quietly <span className="em">automatic</span>
                </h3>
                <p>
                  Staff create the referral the way they always have. Tether runs the rest in the
                  background and returns the result. Nothing extra to open.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELEASES */}
      <section id="releases">
        <div className="wrap">
          <div className="sec-head fade">
            <span className="eyebrow">One platform</span>
            <h2>
              Referrals are <span className="em">the start.</span>
            </h2>
            <p>
              Each release removes another piece of manual coordination. The first is live; the
              rest follow in order.
            </p>
          </div>
          <div className="cardgrid c4 stagger">
            <div className="card relc live">
              <div className="rn">RELEASE 01</div>
              <h3>Referrals</h3>
              <p>
                AI-written clinical referral and full lifecycle tracking, with the consult note
                returned to the chart.
              </p>
              <span className="pip">
                <i></i>Live
              </span>
            </div>
            <div className="card relc hover">
              <div className="rn">RELEASE 02</div>
              <h3>Eligibility</h3>
              <p>
                Insurance checked against the specialist&apos;s accepted plans before the referral
                leaves.
              </p>
              <span className="pip">Next</span>
            </div>
            <div className="card relc hover">
              <div className="rn">RELEASE 03</div>
              <h3>Voice</h3>
              <p>
                A voice agent calls specialist offices with no portal: confirmations, reminders,
                follow-up.
              </p>
              <span className="pip">Later</span>
            </div>
            <div className="card relc hover">
              <div className="rn">RELEASE 04</div>
              <h3>Network</h3>
              <p>
                More EHRs and network-level insight into which specialists deliver and which payers
                perform.
              </p>
              <span className="pip">Later</span>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="close" id="close">
        <div className="wrap">
          <CloseSeal />
          <h2 className="fade">
            Close the loop on <span className="em">every</span> referral.
          </h2>
          <p className="fade">Works alongside the tools you already run. No long onboarding.</p>
          <Link href="/request-demo" className="btn btn-primary fade">
            Request a demo <span className="arr">→</span>
          </Link>
          <div className="micro fade">Built for concierge and independent primary care</div>
        </div>
      </section>
    </>
  );
}
