import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal — Terms of Service & Privacy Policy",
  description:
    "Tether Health terms of service, privacy policy, and business associate agreement.",
  alternates: { canonical: "https://tetherhealth.co/legal" },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
