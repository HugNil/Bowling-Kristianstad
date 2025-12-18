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
    site: "@bowlingkristianstad",
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
      <body className="antialiased flex flex-col min-h-screen">
        <LanguageProvider>
          <Header />
          <main className="grow">
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
