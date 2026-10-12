'use client';

import Image from "next/image";
import { getStrings } from "@/lib/strings";
import { useLanguage } from "@/lib/LanguageContext";

const HERO_IMAGE_URL = "https://res.cloudinary.com/dpzybsbxh/image/upload/v1766054100/IMG_20230322_153933_ddn7cd.jpg";

export default function AboutPage() {
  const { lang } = useLanguage();
  const { about } = getStrings(lang);
  return (
    <div className="hall-page">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-[40vh] md:min-h-[40vh]" aria-label="Om oss hero">
        <Image
          src={HERO_IMAGE_URL}
          alt="Bowling Kristianstad"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative container mx-auto px-4 py-12 md:py-16 flex flex-col items-center justify-center text-center gap-6 h-full">
          <h1 className="text-5xl font-bold">{about.heroTitle}</h1>
          <p className="text-xl max-w-2xl mx-auto">{about.heroSubtitle}</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4" aria-label="Om Bowling Kristianstad">
        <div className="container mx-auto max-w-4xl">
          <article className="hall-panel p-8 mb-12" aria-label="Historia">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{about.historyTitle}</h2>
            {about.historyParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-gray-600 mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </article>

          <figure className="mt-10">
            <Image src="/event-bowling-drinks.jpg" alt={lang === 'sv' ? 'Umgänge mellan bowlingrundorna' : 'Good company between games'} width={1200} height={800} className="w-full h-auto" />
          </figure>
        </div>
      </section>
    </div>
  );
}
