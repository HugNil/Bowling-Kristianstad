'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { getStrings } from '@/lib/strings';

export default function ResultsPage() {
  const { lang } = useLanguage();
  const { results } = getStrings(lang);

  const associations = [
    {
      name: "BKALLON",
      description: lang === 'sv' 
        ? "En av bowlinghallens aktiva föreningar med spelare i alla nivåer."
        : "One of the bowling hall's active associations with players of all levels.",
      website: "https://www.laget.se/BKALLON",
    },
    {
      name: "Glenfield",
      description: lang === 'sv'
        ? "Ungdomsförening med tävlingsverksamhet och sociala aktiviteter."
        : "Youth association with competitive activities and social events.",
      website: "https://www.laget.se/GLENFIELD",
    },
    {
      name: "PBK Kristianstad",
      description: lang === 'sv'
        ? "Pensionärsförening med aktiv tävlingsverksamhet och gemytlig bowling."
        : "Senior association with active competitions and leisurely bowling.",
      website: "https://www.laget.se/PBKKRISTIANSTAD",
    },
    {
      name: "Bromölla Bowling",
      description: lang === 'sv'
        ? "Pensionärsförening med aktiv tävlingsverksamhet och gemytlig bowling."
        : "Senior association with active competitions and leisurely bowling.",
      website: "https://www.laget.se/bromollabowling",
    },
  ];

  const externalLinks = [
    {
      name: "Swebowl",
      description: lang === 'sv'
        ? "Sveriges Bowlingförbunds officiella resultatsida"
        : "Official results page of the Swedish Bowling Federation",
      url: "https://www.swebowl.se",
      logo: "/images.jpg",
    },
    {
      name: "Bowlit",
      description: lang === 'sv'
        ? "Live scoring och resultat"
        : "Live scoring and results",
      url: "https://livescoring.bowlit.nu/bowling-kristianstad",
      logo: "/bowlit-150x150.png",
    },
  ];

  return (
    <div className="bg-linear-to-r from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-red-800 to-rose-800 text-white py-20 px-4" aria-label="Resultat hero">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">{results.title}</h1>
          <p className="text-xl">{results.subtitle}</p>
        </div>
      </section>

      {/* Associations Section */}
      <section className="py-16 px-4" aria-label="Föreningar">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">{results.associationsTitle}</h2>
          <p className="text-lg text-gray-700 mb-12">{results.associationsDescription}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {associations.map((assoc, idx) => (
              <article key={idx} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow" aria-label={assoc.name}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{assoc.name}</h3>
                <p className="text-gray-700 mb-6">{assoc.description}</p>
                <a
                  href={assoc.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  {lang === 'sv' ? 'Besök hemsida' : 'Visit website'} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* External Links Section */}
      <section className="py-16 px-4 bg-gray-100" aria-label="Externa resultatlänkar">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">{results.externalLinksTitle}</h2>
          <p className="text-lg text-gray-700 mb-12">{results.externalLinksDescription}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {externalLinks.map((link, idx) => (
              <article
                key={idx}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105 group"
                aria-label={link.name}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={link.logo}
                      alt={link.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {link.name}
                    </h3>
                  </div>
                  <p className="text-gray-700">{link.description}</p>
                  <div className="mt-4 text-red-600 font-semibold flex items-center gap-2">
                    {lang === 'sv' ? 'Besök' : 'Visit'} {link.name} →
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
