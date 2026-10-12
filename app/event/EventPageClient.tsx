'use client';

import { getStrings } from '@/lib/strings';
import { useLanguage } from '@/lib/LanguageContext';
import { useSiteContent } from '@/lib/ContentContext';
import { localizeItems } from '@/lib/content';

export default function EventPage() {
  const { lang } = useLanguage();
  const { event, contact, openingHours: openingText } = getStrings(lang);
  const content = useSiteContent();
  const hallPrices = localizeItems(content, 'eventHall', lang);
  const menuOptions = localizeItems(content, 'eventMenus', lang);

  return (
    <div className="hall-page">
      {/* Hero with Background Image */}
      <section
        aria-label="Event hero"
        style={{
          backgroundImage: `url('/event-bowling-drinks.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="text-white min-h-[40vh] md:min-h-[40vh] px-4 relative flex flex-col items-center justify-center"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">{event.heroTitle}</h1>
          <p className="text-xl max-w-3xl mx-auto">{event.heroSubtitle}</p>
        </div>
      </section>

      {/* Menu & Info Section */}
      <section className="px-4 pt-16" aria-label="Event information och meny">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Info Section */}
            <article className="flex flex-col justify-center" aria-label="Event information">
              <h2 className="text-4xl font-extrabold tracking-tight mb-6 text-gray-900">{event.introTitle}</h2>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-red-600 mb-6 font-bold text-4xl">{event.tailorText}</p>
                
                <p>
                  {event.introParagraph1}
                  <a href={`tel:${contact.phone}`} className="text-red-600 hover:text-red-700 font-semibold">{contact.phone}</a>
                  {event.introParagraph1Link}
                </p>

                <p>{event.introParagraph2}</p>

                <p className="text-gray-600">{event.arrangementText}</p>

                <p className="text-gray-600">{event.contactText}</p>

                <p className="font-semibold text-gray-800">
                  <a href={`tel:${contact.phone}`} className="hover:text-red-700">{contact.phone}</a>
                </p>

                <div className="pt-4 space-y-2 text-gray-600">
                  <p className="font-semibold">{event.priceTitle}</p>
                  {hallPrices.map((price) => (
                    <p key={price.id}>
                      {price.name} {price.price}{price.unit} {event.priceBowlingTime}
                      {price.description && <span className="block">{price.description}</span>}
                    </p>
                  ))}
                </div>
              </div>
            </article>

            {/* Right: Menu */}
            <article className="menu-sheet" aria-label="Event meny">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">
                  {event.menuTitle}
                </h3>
                
                <div className="space-y-6">
                  {menuOptions.map((item) => (
                    <div key={item.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-red-600 text-2xl font-bold" aria-hidden="true">—</span>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900">{item.name}</h4>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-gray-700 ml-7 text-base leading-relaxed">{item.description}</p>
                      )}
                      {item.pricing === 'fixed' ? (
                        <p className="text-gray-700 ml-7 text-base font-semibold mt-2">
                          {item.price}kr, {item.unit}
                          {item.childPrice !== null && <span className="block">{lang === 'sv' ? `Barn under ${item.childAge} år: ${item.childPrice} kr` : `Children under ${item.childAge}: ${item.childPrice} kr`}</span>}
                        </p>
                      ) : (
                        <p className="text-gray-700 ml-7 text-base font-semibold mt-2">
                          {lang === 'sv' ? 'Ring för pris' : 'Call for price'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
        <aside className="mt-16 mb-16 hall-callout   p-8 max-w-4xl mx-auto text-white" aria-label="Boka event">
          <h2 className="text-3xl font-bold mb-4">{openingText.bookTitle}</h2>
          <p className="mb-6">
            {openingText.bookBody}<br/> {openingText.body1} <strong><a href={`tel:${contact.phone}`}>{contact.phone}</a></strong> {openingText.body2} <strong><a href={`mailto:${contact.email}`}>{contact.email}</a></strong>.
          </p>
          <p className="text-sm">{openingText.bookNote}</p>
        </aside>
      </section>
    </div>
  );
}
