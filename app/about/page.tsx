'use client';

import Image from "next/image";
import CloudinaryImage from "@/components/CloudinaryImage";
import { getStrings } from "@/lib/strings";
import { useLanguage } from "@/lib/LanguageContext";

const HERO_IMAGE_URL = "https://res.cloudinary.com/dpzybsbxh/image/upload/v1766054100/IMG_20230322_153933_ddn7cd.jpg";

export default function AboutPage() {
  const { lang } = useLanguage();
  const { about } = getStrings(lang);
  return (
    <div className="bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-[40vh] md:min-h-[40vh]" aria-label="Om oss hero">
        <Image
          src={HERO_IMAGE_URL}
          alt="Bowling Kristianstad"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-indigo-950/75 via-blue-950/70 to-purple-900/60" />
        <div className="relative container mx-auto px-4 py-12 md:py-16 flex flex-col items-center justify-center text-center gap-6 h-full">
          <h1 className="text-5xl font-bold">{about.heroTitle}</h1>
          <p className="text-xl max-w-2xl mx-auto">{about.heroSubtitle}</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4" aria-label="Om Bowling Kristianstad">
        <div className="container mx-auto max-w-4xl">
          <article className="bg-white rounded-lg shadow-lg p-8 mb-12" aria-label="Historia">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{about.historyTitle}</h2>
            {about.historyParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-gray-600 mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </article>

          {/* Image section with Cloudinary fallback */}
          {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
            <figure className="rounded-lg overflow-hidden shadow-lg" aria-label="Interiörbild">
              <CloudinaryImage
                width="960"
                height="600"
                src="bowling-alley"
                alt="Bowling Kristianstad interior"
                className="w-full h-auto"
              />
            </figure>
          ) : (
            <div className="mb-12 bg-linear-to-r from-indigo-900 to-purple-900 rounded-lg overflow-hidden shadow-lg h-96 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🎳</div>
                <p className="text-xl">{about.fallbackCardTitle}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
