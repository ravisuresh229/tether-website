import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tether – The referral network for modern medical practices",
  description:
    "Tether connects primary care and specialty practices with real-time referral tracking, loop closure, and a shared provider directory.",
  openGraph: {
    title: "Tether – The referral network for modern medical practices",
    description:
      "Real-time referral tracking, loop closure, and a shared provider directory for medical practices.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tether – The referral network for modern medical practices",
    description:
      "Real-time referral tracking, loop closure, and a shared provider directory for medical practices.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
