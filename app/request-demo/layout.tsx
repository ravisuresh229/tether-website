import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Schedule a personalized walkthrough of Tether. See how referral management can work for your practice.",
  alternates: { canonical: "/request-demo" },
};

export default function RequestDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
