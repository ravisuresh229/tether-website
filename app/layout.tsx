import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Tether - Turn referral chaos into conversion",
  description: "Digital referral coordination for PE-backed specialty practices. Recover $100M+ in lost revenue.",
  openGraph: {
    title: "Tether - Turn referral chaos into conversion",
    description: "Digital referral coordination for PE-backed specialty practices. Recover $100M+ in lost revenue.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tether - Turn referral chaos into conversion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tether - Turn referral chaos into conversion",
    description: "Digital referral coordination for PE-backed specialty practices. Recover $100M+ in lost revenue.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
