import Link from "next/link";
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  return (
    <footer className="t-foot">
      <div className="wrap">
        <div className="foot">
          <div>
            <Link className="brand" href="/">
              <BrandMark />
              Tether
            </Link>
            <p className="tagline">The referral platform for modern primary care.</p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h5>Product</h5>
              <Link href="/#how">How it works</Link>
              <Link href="/#ask">Ask Tether</Link>
              <Link href="/#fits">The platform</Link>
            </div>
            <div className="foot-col">
              <h5>Company</h5>
              <Link href="/security">Security</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/request-demo">Contact</Link>
            </div>
            <div className="foot-col">
              <h5>Legal</h5>
              <Link href="/legal#privacy">Privacy</Link>
              <Link href="/legal#terms">Terms</Link>
              <Link href="/legal#hipaa">HIPAA notice</Link>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 Tether Health, Inc.</span>
          <span>Built for the way practices actually work.</span>
        </div>
      </div>
    </footer>
  );
}
