import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/config/site";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { WhatsAppFloatingButton } from "@/components/common/WhatsAppFloatingButton";
import { SampleBanner } from "@/components/common/SampleBadge";
import { generateRealEstateAgentJsonLd } from "@/lib/jsonld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.contact.siteUrl || "http://localhost:3000"),
  title: {
    default: `${SITE.brandName} | Real Estate Company in Abuja`,
    template: `%s | ${SITE.brandName}`,
  },
  description: `${SITE.legalName} is a real estate company serving ${SITE.base}. Specializing in property sales, rentals, short lets, and titled land plots.`,
  keywords: [
    "Abuja real estate",
    "property for sale Abuja",
    "duplex in Katampe",
    "land for sale Abuja",
    "short let apartments Abuja",
    "Sally-Nej",
  ],
  authors: [{ name: SITE.legalName }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE.contact.siteUrl || "http://localhost:3000",
    siteName: SITE.legalName,
    title: `${SITE.brandName} | Real Estate Company in Abuja`,
    description: `${SITE.legalName} is a real estate company serving ${SITE.base}. Verified property sales, leases, and titled land plots.`,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.legalName} Real Estate Abuja`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brandName} | Real Estate Company in Abuja`,
    description: `${SITE.legalName} is a real estate company serving ${SITE.base}.`,
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateRealEstateAgentJsonLd();

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/logo/logo-mark.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-[#191c1e] bg-[#f7f9fc]">
        {/* Skip to Content accessible link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-[#24389c] text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg outline-none"
        >
          Skip to main content
        </a>

        {/* Global developer sample content banner */}
        <SampleBanner />

        {/* Sticky Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 w-full">
          {children}
        </main>

        {/* Floating WhatsApp Action Button */}
        <WhatsAppFloatingButton />

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
