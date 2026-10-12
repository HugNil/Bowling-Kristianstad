'use client';

import FaqSection from '@/components/FaqSection';
import { getStrings } from '@/lib/strings';
import { useLanguage } from '@/lib/LanguageContext';
import { useSiteContent } from '@/lib/ContentContext';
import { localizeItems } from '@/lib/content';

export default function PricingPage() {
  const { lang } = useLanguage();
  const { pricing, contact, openingHours: openingText } = getStrings(lang);
  const prices = localizeItems(useSiteContent(), 'bowling', lang);

  return (
    <div className="hall-page py-20 px-4">
      <div className="container mx-auto" aria-label="Priser">
        <section aria-label="Pris hero">
          <h1 className="text-5xl font-bold text-center mb-6 text-gray-800">
            {pricing.heroTitle}
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {pricing.heroSubtitle}
          </p>
        </section>

        <section aria-label="Prislistor" className="price-list">
          {prices.map(price => <article key={price.id} className="price-row">
            <div><h3 className="font-semibold">{price.name}</h3><p>{price.description}</p></div>
            <div className="price-amount"><strong>{price.price} kr</strong>{price.duration && <p>{price.duration}</p>}</div>
          </article>)}
        </section>

        <aside className="mt-16 hall-callout   p-8 max-w-4xl mx-auto text-white" aria-label="Boka bowling">
          <h2 className="text-3xl font-bold mb-4">{openingText.bookTitle}</h2>
          <p className="mb-6">
            {openingText.bookBody}<br/> {openingText.body1} <strong><a href={`tel:${contact.phone}`}>{contact.phone}</a></strong> {openingText.body2} <strong><a href={`mailto:${contact.email}`}>{contact.email}</a></strong>.
          </p>
          <p className="text-sm">{openingText.bookNote}</p>
        </aside>

        <FaqSection
          title={pricing.faqTitle}
          items={pricing.faqItems}
          className="pt-16"
        />
      </div>
    </div>
  );
}
