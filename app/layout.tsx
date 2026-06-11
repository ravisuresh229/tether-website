import type { Metadata } from "next";
import { Space_Grotesk, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Rail from "@/components/Rail";
import TetherFX from "@/components/TetherFX";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tetherhealth.co"),
  title: {
    default: "Tether · Close the loop on every referral",
    template: "%s | Tether",
  },
  description:
    "Tether writes the clinical referral from the chart, routes it, tracks every stage, and returns the consult note, so the loop closes on its own.",
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
    title: "Tether · Close the loop on every referral",
    description:
      "Tether writes the clinical referral from the chart, routes it, tracks every stage, and returns the consult note, so the loop closes on its own.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tether · Close the loop on every referral",
    description:
      "Tether writes the clinical referral from the chart, routes it, tracks every stage, and returns the consult note.",
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
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <Rail />
        <Nav />
        {children}
        <Footer />
        <TetherFX />
      </body>
    </html>
  );
}
