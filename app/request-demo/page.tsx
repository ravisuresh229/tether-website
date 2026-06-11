"use client";

import { useState } from "react";

const CSS = `
.demo-wrap{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;padding-top:150px;padding-bottom:60px}
@media(max-width:900px){.demo-wrap{grid-template-columns:1fr;gap:40px;padding-top:130px}}
.demo-wrap h1{font-weight:500;font-size:clamp(32px,4.6vw,52px);letter-spacing:-.035em;line-height:1.05;margin-top:18px}
.demo-wrap h1 .em{font-family:var(--serif);font-style:italic;font-weight:400}
.demo-wrap .lead{font-size:17px;color:var(--ink-soft);margin-top:20px;line-height:1.6;max-width:42ch}
.points{margin-top:28px;display:flex;flex-direction:column;gap:14px}
.points .li{display:flex;gap:11px;align-items:flex-start;font-size:14.5px;color:var(--ink-soft)}
.points .li svg{flex-shrink:0;margin-top:3px}
.form{background:var(--paper-2);border:1px solid var(--thread);border-radius:18px;padding:32px;box-shadow:0 30px 64px -44px rgba(12,26,35,.3)}
.field{margin-bottom:16px}
.field label{font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--slate);display:block;margin-bottom:7px}
.field input,.field textarea{width:100%;font-family:var(--display);font-size:15px;color:var(--ink);background:var(--paper);border:1px solid var(--thread);border-radius:10px;padding:12px 14px;transition:border-color .2s}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--signal)}
.field textarea{resize:vertical;min-height:80px}
.form .btn-primary{width:100%;justify-content:center;margin-top:6px}
.form .note{font-family:var(--mono);font-size:11px;color:var(--slate);text-align:center;margin-top:14px}
.form .err{font-family:var(--mono);font-size:12px;color:#C0452A;margin:4px 0 10px;line-height:1.5}
.form-done{text-align:center;padding:30px 10px}
.form-done h3{font-weight:600;font-size:20px;letter-spacing:-.01em;margin-top:18px}
.form-done p{font-size:14.5px;color:var(--slate);margin-top:10px;line-height:1.6}
`;

const PointCheck = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" aria-hidden="true">
    <circle cx="8.5" cy="8.5" r="8" fill="none" stroke="#0FB67E" strokeWidth="1.3" />
    <path d="M5 8.5l2.3 2.3L12 6" stroke="#0FB67E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function RequestDemoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    practice: "",
    ehr: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const nameParts = form.name.trim().split(/\s+/);
    if (nameParts.length < 2) {
      setErrorMsg("Please enter your first and last name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErrorMsg("Please enter a valid work email.");
      return;
    }

    const message =
      [form.ehr.trim() ? `EHR: ${form.ehr.trim()}` : null, form.message.trim() || null]
        .filter(Boolean)
        .join("\n\n") || undefined;

    setStatus("loading");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" "),
          email: form.email.trim().toLowerCase(),
          practiceName: form.practice.trim() || undefined,
          message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <style>{CSS}</style>

      <header className="wrap demo-wrap">
        <div className="fade">
          <span className="eyebrow">Request a demo</span>
          <h1>
            See the loop <span className="em">close.</span>
          </h1>
          <p className="lead">
            A short walkthrough of how Tether writes, routes, and closes a referral, against your
            real workflow. We&apos;ll tailor it to how your practice runs today.
          </p>
          <div className="points">
            <div className="li">
              <PointCheck />
              Works alongside the EHR you already run.
            </div>
            <div className="li">
              <PointCheck />
              Free during pilot. No contracts, no setup fees.
            </div>
            <div className="li">
              <PointCheck />
              BAA available before any data is shared.
            </div>
          </div>
        </div>

        <div className="form fade">
          {status === "success" ? (
            <div className="form-done">
              <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true" style={{ margin: "0 auto", display: "block" }}>
                <circle cx="26" cy="26" r="24" fill="none" stroke="#0FB67E" strokeWidth="2" />
                <path d="M16 26l7 7 14-15" fill="none" stroke="#0FB67E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>Request received.</h3>
              <p>
                We&apos;ll reply within one business day to set up your walkthrough. A confirmation
                is on its way to your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="rd-name">Name</label>
                <input
                  id="rd-name"
                  type="text"
                  placeholder="Dr. Jane Doe"
                  value={form.name}
                  onChange={set("name")}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="rd-email">Work email</label>
                <input
                  id="rd-email"
                  type="email"
                  placeholder="jane@practice.com"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="rd-practice">Practice</label>
                <input
                  id="rd-practice"
                  type="text"
                  placeholder="Georgetown Family Medicine"
                  value={form.practice}
                  onChange={set("practice")}
                  autoComplete="organization"
                />
              </div>
              <div className="field">
                <label htmlFor="rd-ehr">What EHR do you use?</label>
                <input
                  id="rd-ehr"
                  type="text"
                  placeholder="athenahealth, ModMed, other…"
                  value={form.ehr}
                  onChange={set("ehr")}
                />
              </div>
              <div className="field">
                <label htmlFor="rd-message">Anything we should know? (optional)</label>
                <textarea
                  id="rd-message"
                  placeholder="Tell us how referrals work in your practice today."
                  value={form.message}
                  onChange={set("message")}
                />
              </div>
              {errorMsg && <div className="err">{errorMsg}</div>}
              <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending…" : "Request a demo"}{" "}
                {status !== "loading" && <span className="arr">→</span>}
              </button>
              <div className="note">We&apos;ll reply within one business day.</div>
            </form>
          )}
        </div>
      </header>
    </>
  );
}
