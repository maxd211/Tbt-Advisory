import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { siteContent } from "@/content/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "TBT Advisory",
  description:
    "Commercial advisory & execution. Advisory across strategy, GTM execution, and commercial scaling for VC and PE-backed companies.",
  openGraph: {
    title: "TBT Advisory",
    description:
      "Commercial advisory & execution. Advisory across strategy, GTM execution, and commercial scaling for VC and PE-backed companies.",
    url: "https://example.com",
    siteName: "TBT Advisory",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TBT Advisory"
      }
    ],
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <div className="min-h-screen">
          {children}
          <a href="#hero" className="sr-only focus:not-sr-only">
            Back to top - {siteContent.brand}
          </a>
        </div>
      </body>
    </html>
  );
}
