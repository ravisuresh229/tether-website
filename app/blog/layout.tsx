import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog: Referral Management Insights",
  description:
    "Expert insights on healthcare referral management, reducing referral leakage, and building specialist networks.",
  alternates: { canonical: "https://tetherhealth.co/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
