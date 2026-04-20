'use client';

import { getStrings } from '@/lib/strings';
import { useLanguage } from '@/lib/LanguageContext';
import { getEventMenus, getEventMenuOptions } from '@/lib/eventsData';

export default function EventPage() {
  const { lang } = useLanguage();
  const { event, contact, openingHours: openingText } = getStrings(lang);
  const hallPrices = getEventMenus(lang);
  const menuOptions = getEventMenuOptions(lang);

  return (
    <div className="bg-linear-to-r from-gray-50 to-white">
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
                    </p>
                  ))}
                </div>
              </div>
            </article>

            {/* Right: Menu */}
            <article className="relative bg-white rounded-lg p-8 shadow-lg overflow-hidden" style={{ fontFamily: "'Playfair Display', serif" }} aria-label="Event meny">
              {/* Decorative corner ornaments */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-600 rounded-tl-lg"></div>
              <div className="absolute top-1 left-1 w-10 h-10 opacity-20">
                <svg viewBox="0 0 100 100" className="text-red-600 fill-current">
                  <path d="M10,10 Q30,5 50,10 T90,10 M10,10 Q5,30 10,50 T10,90" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-red-600 rounded-tr-lg"></div>
              <div className="absolute top-1 right-1 w-10 h-10 opacity-20 transform scale-x-[-1]">
                <svg viewBox="0 0 100 100" className="text-red-600 fill-current">
                  <path d="M10,10 Q30,5 50,10 T90,10 M10,10 Q5,30 10,50 T10,90" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-red-600 rounded-bl-lg"></div>
              <div className="absolute bottom-1 left-1 w-10 h-10 opacity-20 transform scale-y-[-1]">
                <svg viewBox="0 0 100 100" className="text-red-600 fill-current">
                  <path d="M10,10 Q30,5 50,10 T90,10 M10,10 Q5,30 10,50 T10,90" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-red-600 rounded-br-lg"></div>
              <div className="absolute bottom-1 right-1 w-10 h-10 opacity-20 transform scale-[-1]">
                <svg viewBox="0 0 100 100" className="text-red-600 fill-current">
                  <path d="M10,10 Q30,5 50,10 T90,10 M10,10 Q5,30 10,50 T10,90" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8 text-center text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {event.menuTitle}
                </h3>
                
                <div className="space-y-6">
                  {menuOptions.map((item) => (
                    <div key={item.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-red-600 text-2xl font-bold">✦</span>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h4>
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-gray-700 ml-7 text-base leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>{item.description}</p>
                      )}
                      {item.price > 0 ? (
                        <p className="text-gray-700 ml-7 text-base font-semibold mt-2">
                          {item.price}kr, {item.unit}
                        </p>
                      ) : (
                        <p className="text-gray-700 ml-7 text-base font-semibold mt-2">
                          {item.unit}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
        <aside className="mt-16 mb-16 bg-linear-to-r from-red-800 to-rose-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto text-white" aria-label="Boka event">
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
