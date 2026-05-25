"use client";

import { useState } from "react";

const ROLE_OPTIONS = [
  "Practice Manager",
  "Medical Assistant",
  "Office Administrator",
  "Physician",
  "Other",
];

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function RequestDemoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    practiceName: "",
    role: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const { firstName, lastName, email, practiceName, role, message } = formData;
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      setErrorMsg("First name, last name, and email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          practiceName: practiceName?.trim() || undefined,
          role: role || undefined,
          message: message?.trim() || undefined,
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
    <div className="rd-page">
      <style>{RD_CSS}</style>

      <main className="rd-main">
        <div className="rd-grid">
          <div className="rd-left">
            <div className="rd-label">REQUEST A DEMO</div>
            <h1 className="rd-headline">See Tether in action.</h1>
            <p className="rd-subtitle">
              Learn how Tether can streamline referral management for your practice. We&apos;ll walk you through the platform and answer your questions.
            </p>
            <ul className="rd-value-list">
              <li><span className="rd-value-icon"><CheckIcon /></span>Live product walkthrough</li>
              <li><span className="rd-value-icon"><CheckIcon /></span>Personalized to your practice type</li>
              <li><span className="rd-value-icon"><CheckIcon /></span>15-20 minutes, no commitment</li>
            </ul>
          </div>

          <div className="rd-right">
            <div className="rd-card">
              {status === "success" ? (
                <div className="rd-success">
                  <span className="rd-success-icon"><CheckCircleIcon /></span>
                  <p className="rd-success-text">Thanks! We&apos;ll be in touch within 24 hours to schedule your demo.</p>
                </div>
              ) : (
                <>
                  <form className="rd-form" onSubmit={handleSubmit}>
                    <label htmlFor="rd-first">First Name *</label>
                    <input id="rd-first" type="text" required value={formData.firstName} onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))} placeholder="First name" />
                    <label htmlFor="rd-last">Last Name *</label>
                    <input id="rd-last" type="text" required value={formData.lastName} onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))} placeholder="Last name" />
                    <label htmlFor="rd-email">Work Email *</label>
                    <input id="rd-email" type="email" required value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} placeholder="you@practice.com" />
                    <label htmlFor="rd-practice">Practice Name</label>
                    <input id="rd-practice" type="text" value={formData.practiceName} onChange={(e) => setFormData((p) => ({ ...p, practiceName: e.target.value }))} placeholder="Your practice name" />
                    <label htmlFor="rd-role">Your Role</label>
                    <select id="rd-role" value={formData.role} onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}>
                      <option value="">Select role</option>
                      {ROLE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <label htmlFor="rd-message">Message</label>
                    <textarea id="rd-message" rows={3} value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} placeholder="Anything specific you'd like to see in the demo?" />
                    {errorMsg && <p className="rd-form-error">{errorMsg}</p>}
                    <button type="submit" className="rd-submit" disabled={status === "loading"}>
                      {status === "loading" ? "Sending…" : "Request Demo →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

const RD_CSS = `
.rd-page { font-family: var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif; color: #0C0D0F; background: #F7F5F0; min-height: 100vh; -webkit-font-smoothing: antialiased; }

.rd-main { max-width: 1100px; margin: 0 auto; padding: 132px 48px 120px; }
.rd-grid { display: grid; grid-template-columns: 42% 1fr; gap: 64px; align-items: start; }
.rd-left { position: sticky; top: 96px; }
.rd-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #00A882; margin-bottom: 16px; }
.rd-headline { font-family: var(--font-serif), Georgia, serif; font-size: clamp(30px, 4vw, 44px); line-height: 1.12; font-weight: 400; color: #0C0D0F; letter-spacing: -1px; margin-bottom: 20px; }
.rd-subtitle { font-size: 17px; line-height: 1.65; color: #3D3B38; margin-bottom: 32px; }
.rd-value-list { list-style: none; margin: 0; padding: 0; }
.rd-value-list li { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #0C0D0F; margin-bottom: 14px; }
.rd-value-icon { width: 22px; height: 22px; border-radius: 6px; background: rgba(0,168,130,0.12); color: #00A882; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.rd-right { min-width: 0; }
.rd-card { background: #FFFFFF; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 36px; box-shadow: 0 4px 24px rgba(10,11,15,0.05); }
.rd-form label { display: block; font-size: 13px; font-weight: 600; color: #0C0D0F; margin-bottom: 6px; margin-top: 16px; }
.rd-form label:first-of-type { margin-top: 0; }
.rd-form input, .rd-form select, .rd-form textarea { width: 100%; padding: 12px 14px; border: 1px solid rgba(0,0,0,0.12); background: #FFFFFF; color: #0C0D0F; border-radius: 8px; font-size: 15px; font-family: inherit; margin-bottom: 4px; }
.rd-form input::placeholder, .rd-form textarea::placeholder { color: #8C8A85; }
.rd-form input:focus, .rd-form select:focus, .rd-form textarea:focus { outline: none; border-color: #00A882; box-shadow: 0 0 0 3px rgba(0,168,130,0.15); }
.rd-form textarea { resize: vertical; min-height: 88px; }
.rd-form-error { font-size: 14px; color: #C44A28; margin-top: 12px; margin-bottom: 0; }
.rd-submit { width: 100%; margin-top: 24px; padding: 14px 24px; background: #E8501A; color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; font-family: inherit; cursor: pointer; transition: background 0.2s, transform 0.15s ease; }
.rd-submit:hover:not(:disabled) { background: #CC4615; transform: translateY(-1px); }
.rd-submit:disabled { opacity: 0.7; cursor: not-allowed; }

.rd-success { text-align: center; padding: 24px 0; }
.rd-success-icon { display: inline-flex; color: #00A882; margin-bottom: 20px; }
.rd-success-text { font-size: 18px; line-height: 1.5; color: #0C0D0F; margin: 0; }

@media (max-width: 900px) {
  .rd-main { padding: 110px 24px 80px; }
  .rd-grid { grid-template-columns: 1fr; gap: 40px; }
  .rd-left { position: static; }
  .rd-headline { font-size: 30px; }
  .rd-card { padding: 28px 24px; }
}
`;
