'use client';

import { getStrings } from '@/lib/strings';
import { useLanguage } from '@/lib/LanguageContext';
import { getPricing } from '@/lib/pricingData';

export default function PricingPage() {
  const { lang } = useLanguage();
  const { pricing, contact } = getStrings(lang);
  const prices = getPricing(lang);

  return (
    <div className="bg-linear-to-b from-gray-50 to-white py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6 text-gray-800">
          {pricing.heroTitle}
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {pricing.heroSubtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prices.map((price) => (
            <div 
              key={price.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow overflow-hidden"
            >
              <div className="bg-gray-800 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{price.name}</h3>
                <p>{price.description}</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {price.price} kr
                </div>
                {price.duration && (
                  <div className="text-gray-600">{price.duration}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-linear-to-r from-red-800 to-rose-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-4">{pricing.bookTitle}</h2>
          <p className="mb-6">
            {pricing.bookBody} Ring oss på <strong>{contact.phone}</strong> eller maila <strong>{contact.email}</strong>.
          </p>
          <p className="text-sm">{pricing.bookNote}</p>
        </div>
      </div>
    </div>
  );
}
