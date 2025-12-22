import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";

const SITE_URL = "https://www.bowlingkristianstad.se";
const OG_IMAGE = "https://www.bowlingkristianstad.se/wp-content/uploads/2017/12/shutterstock_420254671.jpg";
const MAP_LINK = "https://www.google.com/maps?q=56.0234928,14.1632581";
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Bowling Kristianstad",
  description:
    "Bowla i Kristianstad med moderna banor, disco bowling, kalas och företagsevent nära Kristianstad Arena.",
  url: SITE_URL,
  image: OG_IMAGE,
  hasMap: MAP_LINK,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 56.0234928,
    longitude: 14.1632581,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kristianstad",
    addressCountry: "SE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+46-44-12-22-15",
    contactType: "customer service",
    areaServed: "SE",
    availableLanguage: ["sv", "en"],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bowling Kristianstad | Bowlinghall vid Kristianstad Arena",
    template: "%s | Bowling Kristianstad",
  },
  description:
    "Bowla i Kristianstad med moderna banor, disco bowling, kalas och företagsevent nära Kristianstad Arena.",
  keywords: [
    "bowling",
    "bowling kristianstad",
    "disco bowling",
    "bowlinghall",
    "kalas bowling",
    "företagsevent",
    "kristianstad arena",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: SITE_URL,
    siteName: "Bowling Kristianstad",
    title: "Bowling Kristianstad | Bowlinghall vid Kristianstad Arena",
    description:
      "Bowla i Kristianstad med moderna banor, disco bowling, kalas och företagsevent nära Kristianstad Arena.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Bowling Kristianstad banor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bowling Kristianstad | Bowlinghall vid Kristianstad Arena",
    description:
      "Bowla i Kristianstad med moderna banor, disco bowling, kalas och företagsevent nära Kristianstad Arena.",
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        <link rel="alternate" href={SITE_URL} hrefLang="sv" />
        <link rel="alternate" href={`${SITE_URL}/en`} hrefLang="en" />
        <link rel="alternate" href={SITE_URL} hrefLang="x-default" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <LanguageProvider>
          <Header />
          <main className="grow" role="main" aria-label="Main content">
            {children}
          </main>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
