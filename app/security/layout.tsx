import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security — HIPAA Compliant Referral Platform",
  description:
    "Tether is HIPAA compliant with signed BAAs, encryption at rest and in transit, and row-level security. Learn about our security practices.",
  alternates: { canonical: "https://tetherhealth.co/security" },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
