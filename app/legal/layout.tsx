import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Tether Health legal information including Terms of Service, Privacy Policy, and HIPAA compliance documentation.",
  alternates: { canonical: "https://tetherhealth.co/legal" },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
