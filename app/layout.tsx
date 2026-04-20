import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingBubble from "@/components/BookingBubble";
import { LanguageProvider } from "@/lib/LanguageContext";
import {
  absoluteUrl,
  business,
  DEFAULT_OG_IMAGE,
  keywords,
  LOGO_IMAGE,
  openingHoursSpecification,
  routeSeo,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: "Bowling Kristianstad AB",
    description: routeSeo.home.description,
    url: SITE_URL,
    image: [DEFAULT_OG_IMAGE],
    logo: LOGO_IMAGE,
    hasMap: business.mapUrl,
    telephone: business.telephone,
    email: business.email,
    priceRange: business.priceRange,
    paymentAccepted: "Swish, Cash",
    currenciesAccepted: "SEK",
    sameAs: [business.facebookUrl],
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.latitude,
      longitude: business.longitude,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      postalCode: business.postalCode,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      addressCountry: business.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: business.telephone,
      email: business.email,
      contactType: "customer service",
      areaServed: "SE",
      availableLanguage: ["sv", "en"],
    },
    openingHoursSpecification: openingHoursSpecification.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      ...hours,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["sv-SE", "en"],
    publisher: {
      "@id": `${SITE_URL}/#business`,
    },
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: routeSeo.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: routeSeo.home.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Bowlinghall",
  keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: routeSeo.home.title,
    description: routeSeo.home.description,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Bowling Kristianstad banor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: routeSeo.home.title,
    description: routeSeo.home.description,
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: absoluteUrl(routeSeo.home.path),
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
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" />
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
          <BookingBubble />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
