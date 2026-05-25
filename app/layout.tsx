import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    default: "Tether — Intelligent Referral Coordination for Medical Practices",
    template: "%s | Tether",
  },
  description:
    "AI agents that connect PCPs and specialists, close the referral loop, and integrate directly with your EHR. Built for practices that are done losing patients to referral black holes.",
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
    title: "Tether — Intelligent Referral Coordination for Medical Practices",
    description:
      "AI agents that connect PCPs and specialists, close the referral loop, and integrate directly with your EHR. Built for practices that are done losing patients to referral black holes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tether — Intelligent Referral Coordination for Medical Practices",
    description:
      "AI agents that connect PCPs and specialists, close the referral loop, and integrate directly with your EHR.",
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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
