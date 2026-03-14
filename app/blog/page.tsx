"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const POSTS = [
  {
    slug: "what-is-referral-leakage",
    title: "What Is Referral Leakage and Why Should Your Practice Care?",
    date: "March 13, 2026",
    readTime: "7 min read",
    category: "Education",
    categoryColor: "#0D7377",
    excerpt: "Referral leakage is the silent revenue drain affecting every practice in America. Here is what it means, why it happens, and what it costs you.",
    content: `When a primary care physician refers a patient to a specialist, the assumption is simple: the patient goes, gets seen, and the referring doctor hears back. In reality, that handoff fails roughly half the time. And the consequences of that failure ripple across the entire healthcare system.

Referral leakage is the term for what happens when a patient is referred to a specialist but the appointment never completes, or the patient ends up seeking care outside the referring provider's network. It is not a niche operational problem. It is one of the largest sources of preventable revenue loss in American medicine, and it directly compromises patient safety.

The scale of the problem is difficult to overstate. According to research compiled by Dialog Health, U.S. healthcare loses more than $150 billion annually to referral leakage. At the individual physician level, each provider's leakage translates to an average annual revenue loss of $821,000 to $971,000. For a health system with 100 affiliated providers, Advanced Medical Reviews estimates that preventable leakage costs $78 to $97 million per year. Clarify Health puts the broader impact at 10 to 30% of a health system's total revenue, every single year.

These are not theoretical projections. They reflect the compounding cost of referrals that are faxed and forgotten, patients who fall through scheduling gaps, and specialist visits that happen outside the network because the referring physician lacked the tools to find an in-network alternative.

The clinical picture is equally alarming. A study published in the Journal of General Internal Medicine found that only about 35% of specialty referrals result in a documented visit. ReferralMD reports that 46% of faxed referrals never lead to a scheduled appointment. And Dialog Health found that between 25% and 50% of referring physicians never receive confirmation of whether their patient was actually seen. The patient's care journey effectively disappears into a void.

Patient safety suffers as a direct result. CRICO, the Harvard-affiliated medical malpractice organization, found that patient handoffs during referrals contribute to 20% of diagnostic errors that lead to malpractice claims. A separate analysis published in the Journal of the American Medical Informatics Association found that errors in referral management accounted for nearly a third of all diagnostic errors, totaling over $168 million in malpractice costs between 2006 and 2010. These are not abstract risks. They are the real-world consequences of a communication system that was built for a different era.

So why does referral leakage persist? The root causes are painfully familiar to anyone who works in a medical office.

The fax machine remains the default. Over 75% of North American healthcare providers still rely on fax for referrals. Once a fax is sent, there is no tracking, no delivery confirmation, and no way to know whether the receiving practice acted on it. The referral enters a black hole.

EHR systems do not talk to each other. Research from the Regenstrief Institute found that cross-institutional referrals fail because of excessive faxed documents, missing or delayed documentation, and organizational privacy policies that block information sharing. Even when both practices use EHRs, interoperability gaps mean patient data often does not flow between them.

Physicians lack the information to make good referral decisions. WebMD Ignite found that 91% of physicians say access to specialist information is critical for referral decisions, but only 57 to 63% actually have reliable access to details like subspecialty focus, availability, and accepted insurance. The result: 7 in 10 physicians refer to the same provider for a given specialty regardless of fit. And 79% of providers who say in-network coordination matters still refer out-of-network because they simply cannot find the right specialist fast enough.

Nobody owns the referral after it leaves the PCP's desk. In most practices, there is no systematic process for tracking whether a patient scheduled, whether the specialist received the clinical context, or whether notes were sent back. The patient becomes the de facto messenger between their own physicians, carrying information between providers who should be communicating directly.

The practices that are solving referral leakage share several common traits. They have replaced fax-based workflows with digital referral platforms that provide real-time visibility into referral status. They give their care teams access to searchable, filterable specialist directories that include subspecialty focus, insurance acceptance, location, and availability. They have empowered the medical assistant, the person who actually processes referrals in most practices, with tools that follow the 10-second, 3-click design principle: fast, intuitive, no training required. And they have automated loop closure so the referring provider is notified when the specialist visit is complete, without anyone picking up a phone.

Referral leakage is not an unsolvable problem. It is an infrastructure problem. The systems connecting PCPs to specialists were never designed for the complexity of modern healthcare delivery. Fax machines and phone tag were adequate when referral volumes were lower and care networks were simpler. They are inadequate today. The first step toward fixing it is understanding exactly how much it is costing your practice.`,
    sources: "Dialog Health (2025), Journal of General Internal Medicine (Patel et al., 2018), Advanced Medical Reviews, Clarify Health, WebMD Ignite, PerfectServe (2024), ReferralMD, CRICO/Harvard Risk Management Foundation, JAMIA (2018), Regenstrief Institute (2024), MedCity News (2025)"
  },
  {
    slug: "closed-loop-referral-tracking",
    title: "What Is Closed-Loop Referral Tracking?",
    date: "March 6, 2026",
    readTime: "6 min read",
    category: "Product",
    categoryColor: "#D4613E",
    excerpt: "Closed-loop tracking means the referring provider knows exactly what happened after the referral was sent. Here is how it works and why it matters for patient safety, revenue, and quality reporting.",
    content: `In most medical practices, the referral process ends the moment the fax goes out. The PCP has no way of knowing whether the specialist received the referral, whether the patient scheduled an appointment, or whether the visit ever happened. This one-directional workflow is what the industry calls an "open loop," and it is the single biggest reason referrals fail at scale.

Closed-loop referral tracking is the opposite model. It means every referral is tracked from creation through completion, with the referring provider receiving status updates at each stage: sent, received, scheduled, completed. When the specialist visit happens, the loop closes and the PCP knows their care plan was followed.

The gap between these two models is enormous. Dialog Health reports that between 25% and 50% of referring physicians never receive confirmation of whether their patient actually saw the specialist. That is not a minor communication gap. It is a structural failure that affects hundreds of millions of patient encounters every year.

The patient safety implications are severe. The Harvard Risk Management Foundation found that referral tracking failures appeared in 55% of cases for high-severity missed-diagnosis malpractice claims. When a PCP refers a patient for a suspicious skin lesion and never hears back, they may assume the visit happened and the results were normal. In reality, the patient may never have been seen. The diagnosis is delayed, potentially by months. This pattern accounts for 20% of diagnostic errors that lead to malpractice claims, according to CRICO data.

Beyond malpractice risk, the financial cost of open-loop referrals is significant. Every referral that is not tracked is a referral that may not convert to a visit. ReferralMD reports that 50% of all referrals are never completed, and up to 50% of physicians' referrals are not tracked at all. For specialist practices, each unconverted referral is a lost billable encounter. For the referring practice, it is a patient who may leave the network entirely.

The mechanics of closed-loop tracking are straightforward. When a PCP creates a referral through a digital tracking system, the specialist practice receives it with full clinical context: patient demographics, insurance information, relevant diagnoses, and any attached documents. The specialist's team can update the referral status as it progresses: received, assigned to a provider, appointment scheduled, visit completed. Each status change is visible to the referring practice in real time.

This eliminates the most common failure mode in referral management: the follow-up phone call that never happens. In a traditional workflow, someone at the PCP's office (usually the medical assistant) would need to manually call the specialist to ask "did our patient show up?" In a busy practice managing dozens of outbound referrals per week, these calls do not happen consistently. With closed-loop tracking, that information surfaces automatically.

The specialist side benefits equally. Instead of receiving a barely legible fax with incomplete patient information, the specialist practice receives a structured, digital referral with all the clinical context they need to triage and schedule appropriately. Research from O'Malley and Reschovsky found that although over 80% of specialists report sending visit notes back to referring physicians, only 62% of referring physicians report receiving them. Closed-loop systems solve this by making the communication bidirectional and automatic.

For practices operating in value-based care models, closed-loop referral tracking is not optional. It is a reporting requirement. Quality metrics in ACO and MSSP arrangements include care coordination measures that require documented referral completion. CMS tracks whether referred patients actually receive specialty care and whether the results are communicated back to the primary care team. Practices without a systematic tracking method cannot reliably report these metrics, which directly affects reimbursement.

The Advisory Board found that only 55% of referral revenue attributed to employed PCPs stays in-network. That means even health systems that employ their primary care physicians are losing nearly half of referral-driven revenue. Employment alone does not solve referral leakage because it does not address the underlying workflow and information gaps. What does address those gaps is a system that tracks every referral from send to completion and makes that data visible to both sides.

Patients also benefit from closed-loop tracking in ways that directly affect satisfaction and outcomes. When a referral is tracked, the patient receives proactive communication about their appointment status. They are less likely to fall through the cracks between two offices that are not communicating. And when their PCP can see that the specialist visit is complete, the follow-up conversation at the next primary care visit is informed and productive rather than starting from scratch.

The technology to close the referral loop is not futuristic. It exists today. The question for most practices is whether they are still relying on fax machines and phone tag, or whether they have adopted a system that gives them visibility into what happens after the referral is sent.`,
    sources: "Dialog Health (2025), Harvard Risk Management Foundation / CRICO, PerfectServe (2024), ReferralMD, O'Malley & Reschovsky (2011), Advisory Board (2024), MedCity News (2025)"
  },
  {
    slug: "how-much-revenue-referral-leakage-costs",
    title: "How Much Revenue Does Referral Leakage Cost Per Physician?",
    date: "February 27, 2026",
    readTime: "6 min read",
    category: "Data",
    categoryColor: "#2D3A4E",
    excerpt: "The average physician loses nearly $1 million per year to referral leakage. Here is how the numbers break down for PCPs, specialists, and health systems.",
    content: `The headline statistic is one that most practice leaders have a hard time believing the first time they see it: each physician's referral leakage translates to an average annual revenue loss of $821,000 to $971,000, according to research compiled by Dialog Health. That number captures the direct revenue from specialist visits that never happen, the downstream revenue from follow-up care and procedures that are lost when the patient leaves the network, and the ancillary service revenue that evaporates when the care relationship breaks.

To understand how the numbers get that large, you need to follow the money through the entire referral chain.

Start with the specialist side. When a dermatology practice receives 20 referrals per week and converts only half of them to completed visits, the unconverted 10 represent direct lost revenue. At an average new patient visit reimbursement of $200 to $400 (depending on payer mix and complexity), that is $2,000 to $4,000 per week in lost visit revenue alone. Over a year, a single specialist losing 10 referrals per week forfeits $100,000 to $200,000 in initial visit revenue. But the real cost is higher because each completed specialist visit generates follow-up appointments, procedures, and diagnostic orders. A dermatology referral that leads to a biopsy, a follow-up visit, and ongoing monitoring may represent $1,500 to $3,000 in total episode revenue. When that referral never converts, the entire downstream revenue stream disappears.

Now consider the PCP side. When a referring physician's patient sees an out-of-network specialist, three things happen. First, the specialist's notes may never come back to the PCP, meaning the PCP cannot coordinate ongoing care. Second, the patient may be routed into the specialist's own referral network for additional services, pulling the patient further from the original practice. Third, in value-based care arrangements, the PCP loses credit for care coordination quality metrics because the referral was never documented as complete.

WebMD Ignite quantified the provider behavior driving this problem: 79% of healthcare providers say in-network care coordination is important, yet 8 in 10 refer out-of-network. This is not because physicians prefer to send patients elsewhere. It is because they lack the tools to identify in-network specialists who match their patient's needs. PerfectServe found that 91 to 96% of physicians say details like subspecialty focus and timely availability are highly important for referral decisions, but only 57 to 63% actually have access to this information. Without a reliable directory, physicians default to the same handful of familiar names, regardless of network status, insurance acceptance, or appointment availability.

At the health system level, the numbers compound rapidly. Advanced Medical Reviews estimates that systems with 100 affiliated providers face $78 to $97 million in annual financial losses from referral leakage. Clarify Health puts the broader impact at 10 to 30% of total system revenue. For a mid-size health system generating $500 million in annual revenue, that is $50 to $150 million leaking out through broken referral workflows.

The Advisory Board added another important finding: employing PCPs does not meaningfully reduce leakage. Their data shows that employed PCPs are only marginally more likely to refer in-network than independent physicians. Employment addresses the contractual relationship but not the workflow problem. If an employed PCP cannot quickly find an in-network specialist who accepts the patient's insurance and has availability within an acceptable timeframe, the referral goes out-of-network regardless of employment status.

There is also a cost borne directly by patients. ReferralMD estimates that clinically inappropriate referrals cost patients $1.9 billion annually in lost wages and unnecessary co-pays. Nearly 20 million clinically inappropriate referrals occur each year, largely because providers lack adequate information about the specialists they are referring to. When a patient is sent to a specialist who does not accept their insurance, or who has a 3-month wait for new patients, the referral fails not because of patient noncompliance, but because the referral itself was poorly matched.

The path to recovering leaked revenue requires three things working together. First, a reliable specialist directory that enables informed referral decisions: filterable by specialty, subspecialty, insurance, location, and availability. This addresses the 8-in-10 out-of-network problem by giving PCPs the information they need to keep referrals in-network. Second, a tracking system that provides real-time visibility into referral status. When a practice can see that a referral is pending, scheduled, or completed, they can intervene on the ones that stall rather than discovering weeks later that the patient was never seen. Third, automated loop closure that confirms when the specialist visit is complete and notifies the referring provider. This eliminates the manual follow-up burden and ensures that no referral silently disappears.

None of this requires a massive IT project or EHR replacement. The practices recovering the most leaked revenue are those that have adopted tools that layer on top of their existing systems and address the specific workflow gaps where referrals break down.

The $971,000 per physician per year is not a number that any practice can afford to treat as background noise. It is recoverable revenue sitting in the gap between how referrals work today and how they should work.`,
    sources: "Dialog Health (2025), Advanced Medical Reviews, Clarify Health, WebMD Ignite, PerfectServe (2024), ReferralMD, Advisory Board (2024), O'Malley & Reschovsky (2011)"
  }
];

const CSS = `
:root{--navy:#2D3A4E;--navy-deep:#1E2A3A;--navy-darkest:#151F2B;--bg:#FAFAF7;--bg-warm:#F5F3EE;--teal:#0D7377;--teal-light:#E8F4F4;--coral:#D4613E;--text:#2D2D2D;--text-secondary:#6B6B6B;--text-tertiary:#9A9A9A;--border:#E0DDD5;--serif:'Instrument Serif',Georgia,serif;--sans:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif}
.blog-page,.blog-page *{margin:0;padding:0;box-sizing:border-box}
.blog-page{font-family:var(--sans);color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased;overflow-x:hidden}
.blog-page ::selection{background:var(--navy);color:#fff}

/* Nav */
.blog-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 48px;height:72px;display:flex;align-items:center;justify-content:space-between;backdrop-filter:blur(16px) saturate(1.8);background:rgba(250,250,247,0.85);border-bottom:1px solid rgba(224,221,213,0.5)}
.blog-nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--navy-deep)}
.blog-nav-logo-text{font-family:var(--sans);font-weight:600;font-size:22px;letter-spacing:-0.5px}
.blog-nav-links{display:flex;align-items:center;gap:36px;list-style:none}
.blog-nav-links a{font-size:14px;font-weight:500;color:var(--text-secondary);text-decoration:none;transition:color .2s}
.blog-nav-links a:hover{color:var(--navy-deep)}
.blog-nav-cta{background:var(--navy);color:#fff!important;padding:10px 22px;border-radius:8px;font-weight:600!important}
.blog-nav-mob{display:none;background:none;border:none;cursor:pointer;padding:8px;color:var(--navy-deep)}
.blog-nav-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:200;background:rgba(250,250,247,0.98);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:80px 24px;opacity:0;animation:blog-mob-in .3s ease forwards}
@keyframes blog-mob-in{to{opacity:1}}
.blog-nav-overlay a{font-size:24px;font-weight:500;color:var(--navy-deep);text-decoration:none}
.blog-nav-overlay-close{position:absolute;top:24px;right:24px;background:none;border:none;cursor:pointer;padding:8px;color:var(--navy-deep)}
.blog-nav-overlay-cta{display:inline-flex;padding:14px 28px;background:var(--coral);color:#fff;border-radius:10px;font-size:15px;font-weight:600;text-decoration:none;margin-top:16px}
.blog-nav-overlay-cta:hover{background:#BF5535}

/* Hero */
.blog-hero{padding:140px 48px 64px;border-bottom:1px solid var(--border)}
.blog-hero-inner{max-width:800px;margin:0 auto}
.blog-hero h1{font-family:var(--serif);font-size:48px;font-weight:400;color:var(--navy-darkest);letter-spacing:-1px;margin-bottom:12px}
.blog-hero p{font-size:17px;color:var(--text-secondary);line-height:1.6}

/* Post list */
.blog-list{max-width:800px;margin:0 auto;padding:48px 48px 96px}
.blog-card{display:block;text-decoration:none;color:inherit;padding:40px 0;border-bottom:1px solid var(--border);transition:all .2s}
.blog-card:first-child{padding-top:0}
.blog-card:last-child{border-bottom:none}
.blog-card:hover .blog-card-title{color:var(--teal)}
.blog-card-meta{display:flex;align-items:center;gap:16px;margin-bottom:12px;font-size:13px;color:var(--text-tertiary)}
.blog-card-cat{padding:3px 10px;border-radius:100px;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#fff}
.blog-card-title{font-family:var(--serif);font-size:28px;font-weight:400;color:var(--navy-darkest);letter-spacing:-0.5px;margin-bottom:10px;transition:color .2s;line-height:1.25}
.blog-card-excerpt{font-size:15px;line-height:1.65;color:var(--text-secondary)}
.blog-card-read{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:14px;font-weight:600;color:var(--teal);transition:gap .2s}
.blog-card:hover .blog-card-read{gap:10px}

/* Post page */
.blog-post{max-width:700px;margin:0 auto;padding:140px 48px 96px}
.blog-post-back{display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:500;color:var(--text-secondary);text-decoration:none;margin-bottom:32px;transition:color .2s}
.blog-post-back:hover{color:var(--teal)}
.blog-post-cat{display:inline-block;padding:3px 10px;border-radius:100px;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#fff;margin-bottom:16px;margin-left:0.75rem}
.blog-post h1{font-family:var(--serif);font-size:40px;font-weight:400;color:var(--navy-darkest);letter-spacing:-0.8px;line-height:1.2;margin-bottom:16px}
.blog-post-meta{font-size:14px;color:var(--text-tertiary);margin-bottom:48px;padding-bottom:32px;border-bottom:1px solid var(--border)}
.blog-post-body{font-size:16px;line-height:1.85;color:var(--text-secondary)}
.blog-post-body p{margin-bottom:24px}
.blog-post-sources{margin-top:48px;padding-top:32px;border-top:1px solid var(--border);font-size:13px;color:var(--text-tertiary);line-height:1.7}
.blog-post-sources strong{color:var(--text);font-weight:600}
.blog-post-cta{margin-top:56px;padding:40px;background:var(--bg-warm);border:1px solid var(--border);border-radius:16px;text-align:center}
.blog-post-cta p{font-family:var(--serif);font-size:22px;color:var(--navy-darkest);margin-bottom:6px}
.blog-post-cta span{font-size:14px;color:var(--text-secondary);display:block;margin-bottom:20px}
.blog-post-cta a{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:var(--coral);color:#fff;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;transition:all .25s}
.blog-post-cta a:hover{background:#BF5535;transform:translateY(-2px);box-shadow:0 6px 20px rgba(212,97,62,.25)}

/* Footer */
.blog-footer{padding:48px;background:var(--navy-darkest);text-align:center}
.blog-footer p{font-size:13px;color:rgba(255,255,255,0.4)}
.blog-footer a{color:rgba(255,255,255,0.6);text-decoration:none}

@media(max-width:768px){
.blog-nav{padding:0 24px}.blog-nav-links{display:none}.blog-nav-mob{display:block}
.blog-hero{padding:110px 24px 48px}.blog-hero h1{font-size:34px}
.blog-list{padding:32px 24px 72px}
.blog-card-title{font-size:22px}
.blog-post{padding:110px 28px 72px}.blog-post h1{font-size:30px;padding-right:8px}.blog-post-back{margin-left:4px}.blog-post-cat{margin-left:0.75rem}
}
`;

export default function BlogPage() {
  const [currentPost, setCurrentPost] = useState<typeof POSTS[0] | null>(null);
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
    const sync = () => {
      const slug = window.location.hash.replace("#", "");
      const post = POSTS.find(p => p.slug === slug);
      setCurrentPost(post || null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const navigateToPost = (post: typeof POSTS[0]) => {
    setCurrentPost(post);
    window.history.pushState(null, "", `/blog#${post.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToList = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentPost(null);
    window.history.pushState(null, "", "/blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const IconArrow = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  );
  const IconBack = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
  );

  return (
    <><style>{CSS}</style>
    <div className="blog-page">

      <nav className="blog-nav">
        <a href="/" className="blog-nav-logo">
          <Image src="/LOGO.jpeg" alt="Tether" width={30} height={30} style={{ objectFit: "contain" }} />
          <span className="blog-nav-logo-text">Tether</span>
        </a>
        <ul className="blog-nav-links">
          <li><a href="/#how">How It Works</a></li>
          <li><a href="/#product">Product</a></li>
          <li><a href="/#specialists">For Specialists</a></li>
          <li><a href="/#network">The Network</a></li>
          <li><a href="/security">Security</a></li>
          <li><a href="/blog" style={{ color: "var(--navy-deep)", fontWeight: 600 }}>Blog</a></li>
          <li><a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer" className="blog-nav-cta">Request Demo</a></li>
        </ul>
        <button className="blog-nav-mob" aria-label="Menu" onClick={() => setMobileMenuOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </nav>
      {mobileMenuOpen && (
        <div className="blog-nav-overlay">
          <button className="blog-nav-overlay-close" aria-label="Close" onClick={() => setMobileMenuOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <a href="/#how" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="/#product" onClick={() => setMobileMenuOpen(false)}>Product</a>
          <a href="/#specialists" onClick={() => setMobileMenuOpen(false)}>For Specialists</a>
          <a href="/#network" onClick={() => setMobileMenuOpen(false)}>The Network</a>
          <a href="/security" onClick={() => setMobileMenuOpen(false)}>Security</a>
          <a href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</a>
          <a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer" className="blog-nav-overlay-cta" onClick={() => setMobileMenuOpen(false)}>Request Demo</a>
        </div>
      )}

      {!currentPost ? (
        <>
          <div className="blog-hero">
            <div className="blog-hero-inner">
              <h1>Blog</h1>
              <p>Research, insights, and perspectives on referral management and healthcare coordination.</p>
            </div>
          </div>

          <div className="blog-list">
            {POSTS.map((post) => (
              <a key={post.slug} className="blog-card" href={`#${post.slug}`} onClick={(e) => { e.preventDefault(); navigateToPost(post); }}>
                <div className="blog-card-meta">
                  <span className="blog-card-cat" style={{ background: post.categoryColor }}>{post.category}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <div className="blog-card-title">{post.title}</div>
                <div className="blog-card-excerpt">{post.excerpt}</div>
                <div className="blog-card-read">Read more <IconArrow /></div>
              </a>
            ))}
          </div>
        </>
      ) : (
        <article className="blog-post">
          <a href="/blog" className="blog-post-back" onClick={(e) => navigateToList(e)}>
            <IconBack /> Back to Blog
          </a>
          <span className="blog-post-cat" style={{ background: currentPost.categoryColor }}>{currentPost.category}</span>
          <h1>{currentPost.title}</h1>
          <div className="blog-post-meta">Tether Health Team &middot; {currentPost.date} &middot; {currentPost.readTime}</div>
          <div className="blog-post-body">
            {currentPost.content.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="blog-post-sources">
            <strong>Sources:</strong> {currentPost.sources}
          </div>
          <div className="blog-post-cta">
            <p>Stop losing referrals.</p>
            <span>See how Tether closes the loop for your practice.</span>
            <a href="https://calendly.com/tetherhealth-support/30min" target="_blank" rel="noopener noreferrer">
              Request a Demo <IconArrow />
            </a>
          </div>
        </article>
      )}

      <footer className="blog-footer">
        <p>&copy; 2026 Tether Health, Inc. All rights reserved. <a href="/" style={{ marginLeft: 16 }}>Back to Home</a> <a href="/blog" style={{ marginLeft: 16 }}>Blog</a></p>
      </footer>

    </div></>
  );
}
