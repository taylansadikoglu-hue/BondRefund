import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { adsense } from "@/lib/monetisation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BondRefund.online | Free Australian Rental Calculators",
    template: "%s | BondRefund.online",
  },
  description: site.description,
  openGraph: {
    title: "BondRefund.online",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BondRefund.online",
    description: site.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>
        {adsense.client ? (
          <Script
            async
            crossOrigin="anonymous"
            id="adsense-script"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.client}`}
            strategy="afterInteractive"
          />
        ) : null}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            url: site.url,
            description: site.description,
          }}
        />
        {/* Analytics placeholder: add Google Analytics, Plausible or another script here once selected. */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
