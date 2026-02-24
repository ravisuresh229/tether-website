import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tether - Never Lose a Referral Again",
  description: "Digital referral coordination platform for specialists and PCPs. Replace fax-based chaos with structured workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
