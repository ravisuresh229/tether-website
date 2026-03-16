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
  metadataBase: new URL("https://www.tetherhealth.co"),
  title: {
    default: "Healthcare Referral Management Software | Tether",
    template: "%s | Tether",
  },
  description:
    "Tether connects primary care and specialty practices with real-time referral tracking, loop closure, and a shared provider directory. Reduce referral leakage and grow your network.",
  keywords: [
    "referral management software",
    "healthcare referral",
    "specialist referral network",
    "referral leakage",
    "PCP referral",
    "closed loop referral",
    "care coordination",
  ],
  authors: [{ name: "Tether Health" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tetherhealth.co",
    siteName: "Tether",
    title: "Healthcare Referral Management Software | Tether",
    description:
      "Tether connects primary care and specialty practices with real-time referral tracking, loop closure, and a shared provider directory.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Tether Health" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Referral Management Software | Tether",
    description:
      "Real-time referral tracking, loop closure, and a shared provider directory for modern medical practices.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
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
