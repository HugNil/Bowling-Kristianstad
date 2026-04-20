'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { getStrings } from '@/lib/strings';

export default function ResultsPage() {
  const { lang } = useLanguage();
  const { results, contact } = getStrings(lang);
  const phoneHref = `tel:${contact.phone.replace(/\s|-/g, '')}`;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <section className="bg-linear-to-r from-red-800 to-rose-800 px-4 py-20 text-white" aria-label="Resultat hero">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">
            Bowling Kristianstad
          </p>
          <h1 className="mb-6 text-5xl font-bold">{results.title}</h1>
          <p className="mx-auto max-w-3xl text-xl text-white/90">{results.subtitle}</p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            {results.quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16" aria-label={results.externalLinksTitle}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">{results.externalLinksTitle}</h2>
            <p className="text-lg text-gray-700">{results.externalLinksDescription}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {results.externalLinks.map((link) => (
              <article key={link.name} className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg transition hover:shadow-xl">
                <div className="mb-6 flex items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                    <Image
                      src={link.logo}
                      alt={link.name}
                      width={54}
                      height={54}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{link.name}</h3>
                    <p className="text-gray-600">{link.description}</p>
                  </div>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-red-800 px-6 py-3 font-semibold text-white transition hover:bg-red-900"
                >
                  {results.externalLinkButton}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="foreningar" className="px-4 py-16 bg-gray-100" aria-label={results.associationsTitle}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">{results.associationsTitle}</h2>
            <p className="text-lg text-gray-700">{results.associationsDescription}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {results.associations.map((association) => (
              <article key={association.name} className="rounded-lg bg-white p-8 shadow-lg transition hover:shadow-xl">
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-800">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
                      <path
                        d="M7 20h10M8 4h8v5a4 4 0 0 1-8 0V4ZM6 6H4v2a4 4 0 0 0 4 4M18 6h2v2a4 4 0 0 1-4 4M12 13v7"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{association.name}</h3>
                    <p className="mt-2 text-gray-700">{association.description}</p>
                  </div>
                </div>
                <a
                  href={association.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red-800 underline underline-offset-4 hover:text-red-900"
                >
                  {results.associationButton}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16" aria-label={results.ctaTitle}>
        <div className="container mx-auto max-w-4xl">
          <aside className="rounded-lg bg-linear-to-r from-red-800 to-rose-800 p-8 text-white shadow-lg">
            <h2 className="mb-4 text-3xl font-bold">{results.ctaTitle}</h2>
            <p className="mb-6 text-white/90">{results.ctaBody}</p>
            <a
              href={phoneHref}
              className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
            >
              {results.ctaButton}
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}
