'use client';

import Link from "next/link";
import Image from "next/image";
import { getStrings } from "@/lib/strings";
import { useLanguage } from "@/lib/LanguageContext";

const HERO_IMAGE_URL = "/hero-bowling-lanes.jpg";

export default function Home() {
  const { lang } = useLanguage();
  const t = getStrings(lang);
  const { home } = t;

  return (
    <div className="bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-96px)] flex items-center justify-center text-white" aria-label="Startsida hero">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE_URL}
            alt="Bowling Kristianstad"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/50 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {home.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-400 transition-colors"
            >
              {home.heroPrimaryCta}
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
            >
              {home.heroSecondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4" aria-label="Erbjudanden">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {home.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.features.map((feature) => (
              <article key={feature.title} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow" aria-label={feature.title}>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-linear-to-r from-red-800 to-rose-800 text-white py-20 px-4" aria-label="Boka nu">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">{home.ctaTitle}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{home.ctaBody}</p>
          <Link
            href="/pricing"
            className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-400 transition-colors inline-block"
          >
            {home.ctaButton}
          </Link>
        </div>
      </section>

      {/* Map Section */}
      <section id="hitta-hit" className="pt-16 bg-linear-to-r from-red-800 to-rose-800 text-white" aria-label="Hitta hit">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">{home.mapHeading}</h2>
        </div>
        <div className="w-full">
          <iframe
            title="Karta till Bowling Kristianstad"
            src="https://www.google.com/maps?q=56.0234928,14.1632581&z=17&hl=sv&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
