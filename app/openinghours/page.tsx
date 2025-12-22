'use client';

import { getStrings } from '@/lib/strings';
import { useLanguage } from '@/lib/LanguageContext';
import { getOpeningHours } from '@/lib/hoursData';

interface HoursData {
  id: string;
  day: string;
  hours: string;
  isOpen: boolean;
  closedDate?: string;
}

export default function AboutPage() {
  const { lang } = useLanguage();
  const { openingHours: openingText, contact } = getStrings(lang);
  const openingHours = getOpeningHours(lang);

  return (
    <div className="bg-linear-to-r from-gray-50 to-white">
      <section className="px-4 pt-16" aria-label="Öppettider hero">
        <h1 className="text-5xl font-bold text-center mb-6 text-gray-800">
          {openingText.heroTitle}
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {openingText.heroSubtitle}
        </p>
      </section>

      {/* About Content */}
      <section className="px-4 mb-16" aria-label="Öppettider och information">
        <div className="container mx-auto max-w-4xl">
          {/* Opening Hours */}
          <article className="bg-white rounded-lg shadow-lg p-8 mb-12" aria-label="Öppettider lista">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              {openingText.secondaryTitle}
            </h2>
            <div className="space-y-3">
              {openingHours.map((hours: HoursData) => (
                <div 
                  key={hours.id}
                  className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                >
                  <span className="font-semibold text-gray-800">
                    {hours.day}
                    {hours.closedDate && (
                      <span className="ml-2 text-sm text-gray-500">({hours.closedDate})</span>
                    )}
                  </span>
                  <span className={hours.isOpen ? 'text-gray-600' : 'text-red-600 font-semibold'}>
                    {hours.isOpen ? hours.hours : (lang === 'sv' ? 'Stängt' : 'Closed')}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-lg p-8 mb-12" aria-label="Information om öppettider">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {openingText.infoTitle}
            </h2>

            {openingText.infoParagraphs.map((text, index) => (
              <p
                key={index}
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            ))}
          </article>

          {/* Contact Information */}
          <aside className="mt-16 bg-linear-to-r from-red-800 to-rose-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto text-white" aria-label="Boka bowling">
            <h2 className="text-3xl font-bold mb-4">{openingText.bookTitle}</h2>
            <p className="mb-6">
              {openingText.bookBody}<br/> {openingText.body1} <strong><a href={`tel:${contact.phone}`}>{contact.phone}</a></strong> {openingText.body2} <strong><a href={`mailto:${contact.email}`}>{contact.email}</a></strong>.
            </p>
            <p className="text-sm">{openingText.bookNote}</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
