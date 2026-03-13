"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const CSS = `
:root{--navy:#2D3A4E;--navy-deep:#1E2A3A;--navy-darkest:#151F2B;--bg:#FAFAF7;--bg-warm:#F5F3EE;--teal:#0D7377;--teal-light:#E8F4F4;--coral:#D4613E;--text:#2D2D2D;--text-secondary:#6B6B6B;--text-tertiary:#9A9A9A;--border:#E0DDD5;--serif:'Instrument Serif',Georgia,serif;--sans:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif}
.legal-page,.legal-page *{margin:0;padding:0;box-sizing:border-box}
.legal-page{font-family:var(--sans);color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased;overflow-x:hidden}
.legal-page ::selection{background:var(--navy);color:#fff}

.legal-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 48px;height:72px;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(16px) saturate(1.8);background:rgba(250,250,247,0.85);border-bottom:1px solid rgba(224,221,213,0.5)}
.legal-nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--navy-deep)}
.legal-nav-logo-text{font-family:var(--sans);font-weight:600;font-size:22px;letter-spacing:-0.5px}
.legal-nav-links{display:flex;align-items:center;gap:36px;list-style:none}
.legal-nav-links a{font-size:14px;font-weight:500;color:var(--text-secondary);text-decoration:none;transition:color .2s}
.legal-nav-links a:hover{color:var(--navy-deep)}
.legal-nav-cta{background:var(--navy);color:#fff!important;padding:10px 22px;border-radius:8px;font-weight:600!important}
.legal-nav-mob{display:none;background:none;border:none;cursor:pointer;padding:8px;color:var(--navy-deep)}
.legal-nav-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;background:rgba(250,250,247,0.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:80px 24px;opacity:0;animation:legal-mob-in .3s ease forwards}
@keyframes legal-mob-in{to{opacity:1}}
.legal-nav-overlay a{font-size:24px;font-weight:500;color:var(--navy-deep);text-decoration:none}
.legal-nav-overlay-close{position:absolute;top:24px;right:24px;background:none;border:none;cursor:pointer;padding:8px;color:var(--navy-deep)}
.legal-nav-overlay-cta{display:inline-flex;padding:14px 28px;background:var(--coral);color:#fff;border-radius:10px;font-size:15px;font-weight:600;text-decoration:none;margin-top:16px}
.legal-nav-overlay-cta:hover{background:#BF5535}

.legal-hero{padding:140px 48px 60px;text-align:center;border-bottom:1px solid var(--border)}
.legal-hero h1{font-family:var(--serif);font-size:44px;font-weight:400;color:var(--navy-darkest);letter-spacing:-1px;margin-bottom:12px}
.legal-hero p{font-size:16px;color:var(--text-secondary);max-width:500px;margin:0 auto}

.legal-tabs{position:sticky;top:72px;z-index:50;background:var(--bg);border-bottom:1px solid var(--border);padding:0 48px;display:flex;gap:0;overflow-x:auto}
.legal-tab{padding:16px 24px;font-size:14px;font-weight:500;color:var(--text-secondary);text-decoration:none;border-bottom:2px solid transparent;transition:all .2s;white-space:nowrap;cursor:pointer;background:none;border-top:none;border-left:none;border-right:none;font-family:var(--sans)}
.legal-tab:hover{color:var(--navy)}
.legal-tab-active{color:var(--teal);border-bottom-color:var(--teal)}

.legal-body{max-width:800px;margin:0 auto;padding:64px 48px 96px}
.legal-section{padding-top:48px;margin-bottom:64px}
.legal-section-title{font-family:var(--serif);font-size:32px;font-weight:400;color:var(--navy-darkest);letter-spacing:-0.5px;margin-bottom:8px}
.legal-section-meta{font-size:13px;color:var(--text-tertiary);margin-bottom:32px}
.legal-h2{font-size:18px;font-weight:600;color:var(--navy-darkest);margin-top:36px;margin-bottom:12px}
.legal-h3{font-size:15px;font-weight:600;color:var(--teal);margin-top:24px;margin-bottom:8px}
.legal-p{font-size:15px;line-height:1.75;color:var(--text-secondary);margin-bottom:16px}
.legal-list{font-size:15px;line-height:1.75;color:var(--text-secondary);margin-bottom:16px;padding-left:24px}
.legal-list li{margin-bottom:6px}
.legal-divider{height:1px;background:var(--border);margin:64px 0 0}
.legal-contact{background:var(--bg-warm);border:1px solid var(--border);border-radius:12px;padding:24px 28px;margin-top:24px;font-size:14px;line-height:1.7;color:var(--text-secondary)}
.legal-contact strong{color:var(--text);font-weight:600}

.legal-footer{padding:48px;background:var(--navy-darkest);text-align:center}
.legal-footer p{font-size:13px;color:rgba(255,255,255,0.4)}
.legal-footer a{color:rgba(255,255,255,0.6);text-decoration:none}
.legal-footer a:hover{color:#fff}

@media(max-width:900px){
.legal-nav{padding:0 24px}.legal-nav-links{display:none}.legal-nav-mob{display:block}
.legal-hero{padding:110px 24px 48px}.legal-hero h1{font-size:32px}
.legal-tabs{padding:0 24px}.legal-body{padding:48px 24px 72px}
}
`;

const TABS = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
  { id: "cookies", label: "Cookie Policy" },
  { id: "hipaa", label: "HIPAA Information" },
];

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("privacy");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("tether-fonts")) return;
    const link = document.createElement("link");
    link.id = "tether-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && TABS.find(t => t.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    window.history.replaceState(null, "", `#${id}`);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <><style>{CSS}</style>
    <div className="legal-page">

      <nav className="legal-nav">
        <a href="/" className="legal-nav-logo">
          <Image src="/LOGO.jpeg" alt="Tether" width={30} height={30} style={{ objectFit: "contain" }} />
          <span className="legal-nav-logo-text">Tether</span>
        </a>
        <ul className="legal-nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/security">Security</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer" className="legal-nav-cta">Request Demo</a></li>
        </ul>
        <button className="legal-nav-mob" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </nav>
      {mobileMenuOpen && (
        <div className="legal-nav-overlay">
          <button className="legal-nav-overlay-close" aria-label="Close" onClick={() => setMobileMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/security" onClick={() => setMobileMenuOpen(false)}>Security</a>
          <a href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</a>
          <a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer" className="legal-nav-overlay-cta" onClick={() => setMobileMenuOpen(false)}>Request Demo</a>
        </div>
      )}

      <div className="legal-hero">
        <h1>Legal</h1>
        <p>Policies governing your use of Tether Health and our commitment to protecting your information.</p>
      </div>

      <div className="legal-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`legal-tab ${activeTab === tab.id ? "legal-tab-active" : ""}`}
            onClick={() => scrollToSection(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="legal-body">

        {/* ═══ PRIVACY POLICY ═══ */}
        <div id="privacy" className="legal-section">
          <div className="legal-section-title">Privacy Policy</div>
          <div className="legal-section-meta">Effective Date: March 11, 2026 | Last Updated: March 11, 2026</div>

          <p className="legal-p">Tether Health, Inc. (&quot;Tether Health,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides a referral management and specialist discovery platform for healthcare providers through our website and software services (collectively, the &quot;Services&quot;). This Privacy Policy describes how we collect, use, disclose, and protect information when you use the Services, visit our website, or otherwise interact with us.</p>
          <p className="legal-p">The Services are directed towards healthcare provider customers and their authorized staff. Before using the Services or submitting any personal information to us, please review this Privacy Policy carefully. By using the Services, you agree to the practices described in this Privacy Policy. If you do not agree, please do not use the Services.</p>

          <div className="legal-h2">1. Personal Information We Collect</div>
          <div className="legal-h3">Information You Provide Directly</div>
          <p className="legal-p">We collect personal information when you create an account, request a demo, contact us, or otherwise provide information to us. This may include your name, email address, phone number, job title, practice name, NPI number, professional credentials, mailing address, and billing information.</p>
          <div className="legal-h3">Information Collected Through the Services</div>
          <p className="legal-p">When you use the platform, we collect data necessary to operate the referral management and specialist discovery features:</p>
          <ul className="legal-list">
            <li><strong>Referral data:</strong> Information entered by authorized practice users, which may include patient names, dates of birth, contact information, insurance details, diagnoses, and referral notes.</li>
            <li><strong>Directory data:</strong> We compile our specialist directory using publicly available sources including the NPPES NPI Registry, state medical board databases, CMS provider data, and specialty society directories. Providers on the platform may also submit or update their own directory listings.</li>
            <li><strong>Usage data:</strong> Features accessed, actions taken, referral volume, and interaction patterns.</li>
            <li><strong>Device and log data:</strong> IP address, browser type and settings, operating system, device identifiers, access times, pages viewed, and referring URLs.</li>
            <li><strong>Location data:</strong> We derive a rough estimate of your location from your IP address.</li>
          </ul>
          <div className="legal-h3">Information We Process on Behalf of Healthcare Providers</div>
          <p className="legal-p"><strong>Health data:</strong> Our healthcare provider customers share patient information with us through referral forms, intake forms, insurance documentation, and other standard healthcare forms. We process this information on their behalf to automate referral routing, status tracking, and appointment scheduling. We apply HIPAA privacy and security standards to all health data we receive and process it pursuant to our Business Associate Agreements.</p>
          <p className="legal-p"><strong>Patient communications:</strong> If you are a patient of one of our healthcare provider customers and receive text messages or emails regarding your referral status or appointment scheduling, we collect your responses and related scheduling information on behalf of that provider. These communications are sent only with appropriate consent and in compliance with the Telephone Consumer Protection Act (TCPA).</p>
          <div className="legal-h3">De-Identified and Aggregated Data</div>
          <p className="legal-p">We may create de-identified or aggregated data that cannot reasonably be used to identify any individual. De-identification is performed using the Safe Harbor method defined under HIPAA (removal of the 18 specified identifiers). We may use de-identified data for research, product development, refining our algorithms and machine learning models, analytics and benchmarking reports, aggregate referral pattern analysis, and public reports on referral trends containing no individually identifiable information.</p>
          <p className="legal-p">We may share de-identified and aggregated data with partners and third parties. This data is non-personal information and is not subject to the restrictions on PHI described in this policy.</p>
          <div className="legal-h3">Cookies and Tracking Technologies</div>
          <p className="legal-p">We use cookies and similar technologies to operate our website, analyze usage, and improve your experience. For details, please see our <a href="#cookies" onClick={(e) => { e.preventDefault(); scrollToSection("cookies"); }} style={{ color: "var(--teal)" }}>Cookie Policy</a>.</p>
          <p className="legal-p">We use analytics services, including PostHog, to understand how visitors use our website. These services use cookies to collect information in aggregate form. No PHI is transmitted to analytics services. Our website currently does not respond to &quot;Do Not Track&quot; browser signals.</p>

          <div className="legal-h2">2. How We Use Personal Information</div>
          <p className="legal-p">We use the information we collect for the following purposes:</p>
          <ul className="legal-list">
            <li><strong>To provide and operate the Services:</strong> Processing referrals, maintaining the specialist directory, tracking referral status, enabling communication between practices, and facilitating patient appointment scheduling.</li>
            <li><strong>To enable referral network features:</strong> Routing referral information between referring providers and receiving specialists through the platform.</li>
            <li><strong>To send patient communications:</strong> When authorized by the applicable practice and with appropriate patient consent, sending referral status updates, appointment confirmations, or scheduling-related messages.</li>
            <li><strong>To improve and develop the Services:</strong> Analyzing usage patterns, identifying issues, conducting research, and developing new features.</li>
            <li><strong>To communicate with you:</strong> Responding to inquiries, providing customer support, and sending service-related administrative notices.</li>
            <li><strong>To ensure security:</strong> Monitoring for unauthorized access, fraud detection, and maintaining system integrity.</li>
            <li><strong>To comply with legal obligations:</strong> Responding to lawful requests, complying with applicable laws, and enforcing our agreements.</li>
            <li><strong>Marketing:</strong> We may use your contact information to send you information about our products and services. You may opt out at any time by following the unsubscribe instructions in our emails or by contacting us.</li>
          </ul>

          <div className="legal-h2">3. How We Share Personal Information</div>
          <p className="legal-p">We do not sell personal information. We share it only with consent, as necessary to provide the Services, or as required by law.</p>
          <ul className="legal-list">
            <li><strong>Between practices on the platform:</strong> Referral information is shared between the referring practice and the receiving specialist practice as necessary to complete the referral.</li>
            <li><strong>Service providers and vendors:</strong> We share information with third-party vendors who perform services on our behalf, including cloud hosting, database management, communications, analytics, and payment processing. These providers are contractually obligated to protect your information and, where applicable, are bound by Business Associate Agreements.</li>
            <li><strong>Professional advisors:</strong> We may disclose information to lawyers, accountants, auditors, and insurers where necessary.</li>
            <li><strong>Affiliates:</strong> We may share information with any future parent company, subsidiaries, or affiliates for purposes consistent with this Privacy Policy.</li>
            <li><strong>Business transfers:</strong> In connection with a merger, acquisition, financing, or sale of assets, your information may be transferred. We will notify you of any such change.</li>
            <li><strong>Compliance and safety:</strong> We may share information when we believe disclosure is necessary to comply with legal obligations, protect our rights, prevent fraud, or protect safety.</li>
          </ul>

          <div className="legal-h2">4. Protected Health Information</div>
          <p className="legal-p">When Tether Health processes PHI on behalf of a healthcare provider, we do so as a Business Associate under HIPAA and HITECH. Our obligations regarding PHI are governed by the HIPAA Privacy and Security Rules, the HITECH Act, and our Business Associate Agreement with the applicable healthcare provider. We apply the minimum necessary standard to all PHI we access.</p>
          <p className="legal-p">For patients: If you are a patient whose information has been processed through our platform as part of a referral, your rights regarding your health information (including the right to access, amend, and receive an accounting of disclosures) are exercised through your healthcare provider. Your provider&apos;s Notice of Privacy Practices describes your rights in detail.</p>

          <div className="legal-h2">5. How We Protect Your Information</div>
          <p className="legal-p">We use a combination of technical, administrative, and physical safeguards to protect your information, including:</p>
          <ul className="legal-list">
            <li>Encryption of data at rest (AES-256) and in transit (TLS 1.2 or higher)</li>
            <li>Role-based access controls limiting access to authorized personnel</li>
            <li>Multi-factor authentication for administrative and production system access</li>
            <li>Comprehensive audit logging of all access to sensitive data</li>
            <li>Regular security assessments, vulnerability scanning, and penetration testing</li>
            <li>HIPAA workforce training and signed confidentiality agreements for all team members</li>
            <li>HIPAA-compliant infrastructure for all health data storage and processing</li>
          </ul>
          <p className="legal-p">While we take reasonable measures to protect your information, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security.</p>

          <div className="legal-h2">6. Data Retention</div>
          <ul className="legal-list">
            <li><strong>Account and profile information:</strong> Retained for the duration of the account and a reasonable period thereafter</li>
            <li><strong>Referral data containing PHI:</strong> Retained in accordance with HIPAA requirements (minimum 6 years) and our Business Associate Agreements</li>
            <li><strong>Audit logs:</strong> Minimum 6 years</li>
            <li><strong>Usage and analytics data:</strong> Retained in de-identified or aggregated form</li>
          </ul>

          <div className="legal-h2">7. Your Privacy Rights</div>
          <p className="legal-p">Depending on your location and applicable law, you may have the right to know the categories of personal information we have collected, to access the specific pieces of personal information we hold, to request deletion (subject to legal retention obligations), to correct inaccurate information, and to opt out of the sale of personal information (we do not sell personal information).</p>
          <p className="legal-p">Residents of certain states (including California, Virginia, Colorado, and Connecticut) may have additional rights under their state&apos;s privacy statute. To exercise any privacy right, please email support@tetherhealth.co.</p>

          <div className="legal-h2">8. Children</div>
          <p className="legal-p">The Services are directed to healthcare professionals and are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided personal information to us, please contact us immediately and we will promptly delete that information.</p>

          <div className="legal-h2">9. Changes to This Privacy Policy</div>
          <p className="legal-p">We may update this Privacy Policy from time to time. We will post the revised version on this page and update the &quot;Last Updated&quot; date. For material changes, we will provide additional notice. Your continued use of the Services after the effective date constitutes acceptance of the changes.</p>

          <div className="legal-contact">
            <strong>Contact</strong><br/>
            Tether Health, Inc.<br/>
            1209 Orange Street, Wilmington, DE 19801<br/>
            support@tetherhealth.co
          </div>
          <div className="legal-divider" />
        </div>

        {/* ═══ TERMS OF SERVICE ═══ */}
        <div id="terms" className="legal-section">
          <div className="legal-section-title">Terms of Service</div>
          <div className="legal-section-meta">Effective Date: March 11, 2026 | Last Updated: March 11, 2026</div>

          <p className="legal-p">These Terms of Service (&quot;Terms&quot;) are a legally binding agreement between you and Tether Health, Inc. (&quot;Tether Health,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing your access to and use of the Tether Health platform, website, and related services (the &quot;Services&quot;). By accessing or using the Services, you agree to these Terms. &quot;You&quot; refers to the individual using the Services and, if applicable, the healthcare practice or entity on whose behalf you act.</p>

          <div className="legal-h2">1. Eligibility and Account Registration</div>
          <p className="legal-p">The Services are intended for licensed healthcare providers, authorized practice staff, and healthcare organizations in the United States. By registering, you represent that you are at least 18 years old, have authority to bind the practice or organization you represent, and that the information you provide is accurate and complete. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us immediately of any unauthorized use.</p>

          <div className="legal-h2">2. Description of Services</div>
          <p className="legal-p">Tether Health provides a referral management and specialist discovery platform. The Services may include referral creation, submission, and tracking; specialist directory search; referral status updates and loop closure; patient communication tools; analytics and reporting; and EHR integrations.</p>

          <div className="legal-h2">3. Permitted Use and Restrictions</div>
          <p className="legal-p">You may use the Services solely for legitimate healthcare operations. You agree not to:</p>
          <ul className="legal-list">
            <li>Use the Services for any purpose other than legitimate healthcare operations</li>
            <li>Share account credentials with unauthorized individuals or access another user&apos;s account</li>
            <li>Transmit malicious code or harmful content through the Services</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
            <li>Use the Services to send unsolicited marketing communications to patients</li>
            <li>Scrape or collect data from the Services through automated means without prior written consent</li>
            <li>Use specialist directory data for purposes unrelated to patient referrals</li>
            <li>Violate any applicable law, regulation, or third-party rights in connection with your use</li>
          </ul>

          <div className="legal-h2">4. HIPAA and Protected Health Information</div>
          <p className="legal-p">Use of the Services involving PHI requires a fully executed Business Associate Agreement (BAA) between your practice and Tether Health. The BAA is incorporated into these Terms by reference. As a Covered Entity, you are responsible for ensuring your use complies with HIPAA, including obtaining necessary patient authorizations. You agree to include only the minimum necessary PHI in referrals transmitted through the platform.</p>

          <div className="legal-h2">5. Patient Communications and TCPA Compliance</div>
          <p className="legal-p">If you enable patient-facing communications through the Services (such as referral status text messages or appointment notifications), the following requirements apply:</p>
          <ul className="legal-list">
            <li>You must obtain prior express written consent from patients before automated messages are sent on your behalf</li>
            <li>Consent must be documented and stored with a record of who consented, when, and to what</li>
            <li>Patients must be able to opt out at any time, and opt-out requests must be honored immediately</li>
            <li>Consent may not be a condition of receiving treatment or services</li>
            <li>All messages will identify the sending practice, state the purpose, and include opt-out instructions</li>
          </ul>
          <p className="legal-p">Tether Health provides the infrastructure for consent management, message delivery, and opt-out processing, but you are responsible for ensuring consent is properly obtained before enabling patient communications.</p>

          <div className="legal-h2">6. Fees and Payment</div>
          <p className="legal-p">Certain features require payment as described in your subscription agreement or order form. Fees are billed monthly or annually as specified. All fees are non-refundable except as expressly stated or required by law. We may change fees upon 30 days&apos; prior written notice. Failure to pay may result in suspension of access. You are responsible for applicable taxes.</p>

          <div className="legal-h2">7. Intellectual Property</div>
          <p className="legal-p"><strong>Our intellectual property:</strong> The Services, including all software, technology, designs, and content (excluding your data), are owned by Tether Health and protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable license to use the Services in accordance with these Terms.</p>
          <p className="legal-p"><strong>Your data:</strong> You retain all ownership rights in the data you input into the Services. You grant us a limited license to use, process, and store your data solely to provide the Services and as described in our Privacy Policy.</p>
          <p className="legal-p"><strong>Aggregated and de-identified data:</strong> We may create aggregated or de-identified data derived from use of the Services. Such data does not identify any individual or practice. We may use it for product improvement, analytics, benchmarking, and other lawful purposes.</p>

          <div className="legal-h2">8. Disclaimers</div>
          <p className="legal-p">THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE FULLEST EXTENT PERMITTED BY LAW, TETHER HEALTH DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
          <p className="legal-p">Tether Health is not a healthcare provider and does not provide medical advice. We do not guarantee the accuracy or completeness of specialist directory listings. We are not responsible for clinical decisions, referral appropriateness, or patient outcomes associated with referrals made through the platform.</p>

          <div className="legal-h2">9. Limitation of Liability</div>
          <p className="legal-p">TO THE MAXIMUM EXTENT PERMITTED BY LAW, TETHER HEALTH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF (A) AMOUNTS PAID BY YOU IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100).</p>

          <div className="legal-h2">10. Indemnification</div>
          <p className="legal-p">You agree to indemnify and hold harmless Tether Health, its officers, directors, employees, and agents from claims arising out of your use of the Services in violation of these Terms, your violation of any law or regulation, the content or accuracy of data you submit, or your failure to obtain required patient consents.</p>

          <div className="legal-h2">11. Term and Termination</div>
          <p className="legal-p">These Terms remain in effect until terminated. Either party may terminate upon 30 days&apos; written notice for any reason, or immediately upon material breach that is not cured within 30 days of notice. Upon termination, your access will be deactivated, PHI will be returned or destroyed per the BAA, surviving provisions remain in effect, and your data will be available for export for 30 days.</p>

          <div className="legal-h2">12. Governing Law</div>
          <p className="legal-p">These Terms are governed by the laws of the State of Delaware, without regard to conflict of laws principles. Disputes shall be resolved in the state or federal courts located in Delaware.</p>

          <div className="legal-h2">13. General Provisions</div>
          <p className="legal-p"><strong>Entire Agreement:</strong> These Terms, the Privacy Policy, the BAA, and any order form constitute the entire agreement between you and Tether Health. <strong>Amendments:</strong> We may modify these Terms by posting the revised version. Material changes will be communicated with at least 30 days&apos; notice. <strong>Severability:</strong> If any provision is unenforceable, the remaining provisions remain in full force. <strong>Waiver:</strong> Failure to enforce any provision is not a waiver of that provision. <strong>Assignment:</strong> You may not assign these Terms without our consent. We may assign in connection with a merger, acquisition, or asset sale. <strong>Force Majeure:</strong> Neither party is liable for delays due to events beyond reasonable control.</p>

          <div className="legal-contact">
            <strong>Contact</strong><br/>
            Tether Health, Inc.<br/>
            1209 Orange Street, Wilmington, DE 19801<br/>
            support@tetherhealth.co
          </div>
          <div className="legal-divider" />
        </div>

        {/* ═══ COOKIE POLICY ═══ */}
        <div id="cookies" className="legal-section">
          <div className="legal-section-title">Cookie Policy</div>
          <div className="legal-section-meta">Effective Date: March 11, 2026 | Last Updated: March 11, 2026</div>

          <p className="legal-p">This Cookie Policy explains how Tether Health, Inc. uses cookies and similar tracking technologies on our website and platform. It should be read alongside our <a href="#privacy" onClick={(e) => { e.preventDefault(); scrollToSection("privacy"); }} style={{ color: "var(--teal)" }}>Privacy Policy</a>.</p>

          <div className="legal-h2">1. What Are Cookies</div>
          <p className="legal-p">Cookies are small text files placed on your device when you visit a website. They help websites function efficiently, improve user experience, and provide usage information to site operators. Cookies may be session-based (deleted when you close your browser) or persistent (remaining until they expire or you delete them).</p>

          <div className="legal-h2">2. Cookies We Use</div>
          <div className="legal-h3">Strictly Necessary</div>
          <p className="legal-p">Essential for the Services to function. These enable authentication, session management, and security. You cannot opt out of these cookies.</p>
          <div className="legal-h3">Functional</div>
          <p className="legal-p">Allow us to remember your preferences and settings, such as language and display options. These enhance your experience but are not strictly necessary.</p>
          <div className="legal-h3">Analytics</div>
          <p className="legal-p">Help us understand how visitors use our website by collecting aggregated information about page views, traffic sources, and user behavior. We use PostHog for this purpose. No PHI is transmitted to analytics services.</p>
          <div className="legal-h3">Marketing</div>
          <p className="legal-p">We do not currently use marketing or advertising cookies. If this changes, we will update this policy and obtain consent where required.</p>

          <div className="legal-h2">3. Managing Cookies</div>
          <ul className="legal-list">
            <li><strong>Browser settings:</strong> Most browsers allow you to refuse cookies, delete existing cookies, or receive alerts when cookies are placed. Disabling certain cookies may affect functionality.</li>
            <li><strong>Consent banner:</strong> Our website presents a cookie consent banner allowing you to accept or decline non-essential cookies.</li>
            <li><strong>Analytics opt-out:</strong> Third-party analytics providers may offer their own opt-out mechanisms.</li>
          </ul>

          <div className="legal-h2">4. Do Not Track</div>
          <p className="legal-p">Our Services do not currently respond to &quot;Do Not Track&quot; browser signals. We will update this policy if that changes.</p>

          <div className="legal-h2">5. Updates</div>
          <p className="legal-p">We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date.</p>

          <div className="legal-contact">
            <strong>Contact</strong><br/>
            Tether Health, Inc.<br/>
            1209 Orange Street, Wilmington, DE 19801<br/>
            support@tetherhealth.co
          </div>
          <div className="legal-divider" />
        </div>

        {/* ═══ HIPAA INFORMATION ═══ */}
        <div id="hipaa" className="legal-section">
          <div className="legal-section-title">HIPAA Information Notice</div>
          <div className="legal-section-meta">Effective Date: March 11, 2026 | Last Updated: March 11, 2026</div>

          <div className="legal-h2">Our Role Under HIPAA</div>
          <p className="legal-p">Tether Health, Inc. operates as a Business Associate under HIPAA and the HITECH Act. We provide referral management services to healthcare providers (&quot;Covered Entities&quot;) and process protected health information (PHI) on their behalf.</p>

          <div className="legal-h2">What This Means</div>
          <p className="legal-p">As a Business Associate, Tether Health:</p>
          <ul className="legal-list">
            <li>Enters into Business Associate Agreements with every provider that uses our platform to process PHI</li>
            <li>Implements administrative, technical, and physical safeguards to protect PHI</li>
            <li>Limits use and disclosure of PHI to what is necessary to perform our services or as required by law</li>
            <li>Reports breaches of unsecured PHI to affected providers in accordance with HIPAA</li>
            <li>Requires subcontractors who handle PHI to enter into BAAs and comply with HIPAA</li>
            <li>Trains all workforce members on HIPAA privacy and security requirements</li>
          </ul>

          <div className="legal-h2">For Patients</div>
          <p className="legal-p">If your information was transmitted through our platform as part of a referral:</p>
          <ul className="legal-list">
            <li>Your healthcare provider is the Covered Entity responsible for your health information</li>
            <li>Your rights (access, amendment, accounting of disclosures, restrictions) are exercised through your provider</li>
            <li>Your provider&apos;s Notice of Privacy Practices describes your rights in detail</li>
            <li>Questions about how your information was used should be directed to your provider</li>
          </ul>

          <div className="legal-h2">For Healthcare Providers</div>
          <p className="legal-p">If you are interested in using Tether Health:</p>
          <ul className="legal-list">
            <li>A Business Associate Agreement must be executed before any PHI is processed</li>
            <li>Security posture documentation and compliance evidence are available upon request</li>
            <li>Contact support@tetherhealth.co to request a BAA or security documentation</li>
          </ul>

          <div className="legal-h2">Our Security Measures</div>
          <ul className="legal-list">
            <li>AES-256 encryption at rest; TLS 1.2+ in transit</li>
            <li>Role-based access controls and multi-factor authentication</li>
            <li>Comprehensive audit logging of all PHI access</li>
            <li>Regular risk assessments, vulnerability scanning, and penetration testing</li>
            <li>Documented incident response and breach notification procedures</li>
            <li>Workforce HIPAA training and signed confidentiality agreements</li>
          </ul>
          <p className="legal-p">For a detailed overview of our security architecture, visit our <a href="/security" style={{ color: "var(--teal)" }}>Security page</a>.</p>

          <div className="legal-h2">Breach Notification</div>
          <p className="legal-p">In the event of a breach of unsecured PHI, Tether Health will notify the affected healthcare provider(s) without unreasonable delay as required by HIPAA and the applicable BAA, so that the provider can fulfill its notification obligations to patients and regulators.</p>

          <div className="legal-contact">
            <strong>Contact</strong><br/>
            Tether Health, Inc.<br/>
            HIPAA Privacy Officer: Sachin Motwani<br/>
            1209 Orange Street, Wilmington, DE 19801<br/>
            support@tetherhealth.co
          </div>
        </div>

      </div>

      <footer className="legal-footer">
        <p>&copy; 2026 Tether Health, Inc. All rights reserved. <a href="/" style={{ marginLeft: 16 }}>Back to Home</a> <a href="/blog" style={{ marginLeft: 16 }}>Blog</a></p>
      </footer>

    </div></>
  );
}
