import Link from "next/link";

function TetherMarkDark() {
  return (
    <span className="t-gfooter-brand" aria-label="Tether">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M3 6 H11 V16 H19"
          stroke="#4CE7CC"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="t-gfooter-brand-text">Tether</span>
    </span>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.5 9.5H6V18h2.5V9.5zM7.25 8.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zM18 13.5c0-2.04-1.31-3.25-3-3.25a2.6 2.6 0 0 0-2.36 1.27V10H10v8h2.64v-4.32c0-1.06.69-1.6 1.51-1.6.79 0 1.35.52 1.35 1.6V18H18v-4.5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="t-gfooter">
      <div className="t-gfooter-inner">
        <div className="t-gfooter-top">
          <div className="t-gfooter-brand-col">
            <TetherMarkDark />
            <p className="t-gfooter-tagline">
              The referral network for modern medical practices.
            </p>
          </div>
          <div className="t-gfooter-cols">
            <div className="t-gfooter-col">
              <h5>Product</h5>
              <Link href="/#how">How It Works</Link>
              <Link href="/security">Security</Link>
              <Link href="/for-specialists">For Specialists</Link>
            </div>
            <div className="t-gfooter-col">
              <h5>Company</h5>
              <Link href="/request-demo">Contact</Link>
              <Link href="/blog">Blog</Link>
            </div>
            <div className="t-gfooter-col">
              <h5>Legal</h5>
              <Link href="/legal#privacy">Privacy Policy</Link>
              <Link href="/legal#terms">Terms of Service</Link>
              <Link href="/legal#hipaa">HIPAA Notice</Link>
            </div>
          </div>
        </div>

        <div className="t-gfooter-rule" />

        <div className="t-gfooter-bottom">
          <span>&copy; 2026 Tether Health, Inc.</span>
          <a
            href="https://www.linkedin.com/company/111649326/"
            target="_blank"
            rel="noopener noreferrer"
            className="t-gfooter-social"
            aria-label="Tether on LinkedIn"
          >
            <IconLinkedIn />
          </a>
        </div>
      </div>
    </footer>
  );
}
