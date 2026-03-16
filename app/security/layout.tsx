import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security: HIPAA Compliant Referral Platform",
  description:
    "Learn how Tether protects patient referral data with HIPAA-compliant infrastructure, encryption, and BAA availability.",
  alternates: { canonical: "/security" },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
