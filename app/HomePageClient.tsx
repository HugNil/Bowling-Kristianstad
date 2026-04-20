'use client';

import Link from "next/link";
import Image from "next/image";
import FaqSection from "@/components/FaqSection";
import { getStrings } from "@/lib/strings";
import { useLanguage } from "@/lib/LanguageContext";
import { business } from "@/lib/seo";

const HERO_IMAGE_URL = "/hero-bowling-lanes.jpg";

export default function Home() {
  const { lang } = useLanguage();
  const t = getStrings(lang);
  const { home, contact } = t;
  const phoneHref = `tel:${contact.phone.replace(/\s|-/g, "")}`;

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

      {/* Local Intro Section */}
      <section className="px-4 py-16 bg-white" aria-label={home.localIntroTitle}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            {home.localIntroTitle}
          </h2>
          <div className="space-y-4 text-lg text-gray-600">
            {home.localIntroParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="px-4 pb-16 bg-white" aria-label={home.bookingTitle}>
        <div className="container mx-auto max-w-4xl">
          <aside className="bg-linear-to-r from-red-800 to-rose-800 rounded-lg shadow-lg p-8 text-white">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{home.bookingTitle}</h2>
              <p>{home.bookingBody}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href={phoneHref}
                className="rounded-lg bg-white px-6 py-3 text-center font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                {home.bookingCallButton}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="rounded-lg border border-white px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-gray-900"
              >
                {home.bookingEmailButton}
              </a>
            </div>
          </div>
          </aside>
        </div>
      </section>

      {/* Popular Choices */}
      <section className="px-4 pb-20 bg-white" aria-label={home.popularChoicesTitle}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {home.popularChoicesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.popularChoices.map((choice) => (
              <article key={choice.title} className="rounded-lg border border-gray-200 bg-gray-50 p-8 shadow-sm">
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{choice.title}</h3>
                <p className="text-gray-600 mb-6">{choice.body}</p>
                <Link href={choice.href} className="font-semibold text-red-800 underline underline-offset-4 hover:text-red-900">
                  {choice.label}
                </Link>
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

      {/* FAQ Section */}
      <FaqSection
        title={home.faqTitle}
        intro={home.faqIntro}
        items={home.faqItems}
        contactPhone={contact.phone}
      />

      {/* Map Section */}
      <section id="hitta-hit" className="bg-linear-to-r from-red-800 to-rose-800 text-white" aria-label="Hitta hit">
        <div className="container mx-auto px-4 py-10 text-center">
          <h2 className="text-4xl font-bold">{home.mapHeading}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/90">{home.mapBody}</p>
          <a
            href={business.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
          >
            {home.mapButton}
          </a>
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
