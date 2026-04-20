'use client';

import { useState } from 'react';
import FaqSection from '@/components/FaqSection';
import { getStrings } from '@/lib/strings';
import { useLanguage } from '@/lib/LanguageContext';
import { getBirthdayMenus, getBirthdayExtras } from '@/lib/eventsData';

const partyStepIcons = [
  (
    <svg key="gift" viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path d="M4 10h16v10H4V10ZM3 7h18v3H3V7ZM12 7v13M8.5 7C7.1 7 6 5.9 6 4.5S7.1 2 8.5 2C11 2 12 7 12 7s-1-5 3.5-5C16.9 2 18 3.1 18 4.5S16.9 7 15.5 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  ),
  (
    <svg key="drink" viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path d="M7 3h10l-1 17H8L7 3ZM8 8h8M14 3l3-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  ),
  (
    <svg key="food" viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path d="M5 12h14M7 12c0-3 2.2-5 5-5s5 2 5 5M6 16h12M8 20h8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  ),
  (
    <svg key="bowling" viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM10 8.5h.1M13.5 8h.1M12 11.5h.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  ),
  (
    <svg key="dessert" viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path d="M8 21h8M9 17l-2-7h10l-2 7H9ZM8 10c0-3 1.8-5 4-5s4 2 4 5M12 5V2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  ),
  (
    <svg key="party" viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8">
      <path d="m5 20 4-14 9 9L5 20ZM11 5l2-2M16 8l3-3M18 13l3-1M7 15l4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  ),
];

export default function BirthdayPage() {
  interface CardData { title: string; body?: string; footerLines?: string[] }
  const { lang } = useLanguage();
  const { birthday, contact } = getStrings(lang);
  const menus = getBirthdayMenus(lang);
  const extras = getBirthdayExtras(lang);

  // Calculator state
  const [childCount, setChildCount] = useState<number>(4);
  const [selectedMenu, setSelectedMenu] = useState<string>(menus[0]?.id || '');
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  const selectedMenuData = menus.find(m => m.id === selectedMenu);
  const basePrice = selectedMenuData ? selectedMenuData.price * childCount : 0;
  
  const extrasPrice = Array.from(selectedExtras).reduce((sum, extraId) => {
    const extra = extras.find(e => e.id === extraId);
    // For per-child extras, multiply by childCount; for per-lane extras, add as flat fee
    const quantity = extra?.id === 'extra-lane' ? 1 : childCount;
    return sum + (extra ? (extra.price * quantity) : 0);
  }, 0);

  const totalPrice = basePrice + extrasPrice;

  const toggleExtra = (extraId: string) => {
    const newExtras = new Set(selectedExtras);
    if (newExtras.has(extraId)) {
      newExtras.delete(extraId);
    } else {
      newExtras.add(extraId);
    }
    setSelectedExtras(newExtras);
  };

  return (
    <div className="bg-linear-to-r from-gray-50 to-white">
      {/* Hero with Background Image */}
      <section
        aria-label="Barnkalas hero"
        style={{
          backgroundImage: `url('/gemini_birthday.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="text-white min-h-[40vh] md:min-h-[40vh] px-4 relative flex flex-col items-center justify-center"
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">{birthday.heroTitle}</h1>
          <p className="text-xl max-w-3xl mx-auto">{birthday.heroSubtitle}</p>
        </div>
      </section>


      {/* Intro */}
      <section className="py-16 px-4" aria-label="Barnkalas intro">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-extrabold tracking-tight mb-6">{birthday.introTitle}</h2>
          <div className="text-gray-700 text-lg">
            <p>{birthday.introParagraph1}</p>
            <p>{birthday.introParagraph2}</p>
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="px-4 pb-8" aria-label="Barnkalas kort">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Card */}
            {birthday.cardsLeft?.map((card: CardData, idx: number) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6">
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                {card.body && <p className="text-gray-700">{card.body}</p>}
              </div>
            ))}

            {/* Time Card */}
            {birthday.cardsRight?.map((card: CardData, idx: number) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6">
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                {card.body && <p className="text-gray-700">{card.body}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu & Info Section */}
      <section className="px-4 py-16" aria-label="Barnkalas information och meny">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Info Section */}
            <article className="flex flex-col justify-center" aria-label="Vad som ingår">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">{birthday.includesTitle}</h2>
              
              <div>
                <ul className="space-y-3 text-gray-700">
                  {birthday.includesList?.map((item: string, idx: number) => (
                    <li key={idx} className="flex gap-3">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm shrink-0 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Right: Menu */}
            <article className="relative bg-white rounded-lg p-8 shadow-lg overflow-hidden" style={{ fontFamily: "'Playfair Display', serif" }} aria-label="Barnkalas meny">
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
                  {lang === 'sv' ? 'Menyalternativ' : 'Menu Options'}
                </h3>
                
                <div className="space-y-6">
                  {menus.map((item) => (
                    <div key={item.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-red-600 text-2xl font-bold">✦</span>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>{item.name}</h4>
                        </div>
                      </div>
                      <p className="text-gray-700 ml-7 text-base font-semibold mt-2">
                        {item.price}kr, {item.unit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Planning & Setup */}
      <section className="px-4 pb-16" aria-label="Så går kalaset till">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{lang === 'sv' ? 'Så går kalaset till' : 'How the party works'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthday.introParagraphs?.map((p: string, i: number) => (
              <div key={i} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold text-lg shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-800">
                    {partyStepIcons[i]}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-4" aria-label="Beräkna pris">
        <div className="container mx-auto max-w-5xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8">{birthday.calculator.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Inputs */}
            <div className="space-y-6">
              {/* Children count */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  {birthday.calculator.childrenLabel}
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setChildCount(Math.max(1, childCount - 1))}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-lg"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={childCount}
                    onChange={(e) => setChildCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center text-2xl font-bold border border-gray-300 rounded-lg py-2"
                  />
                  <button
                    onClick={() => setChildCount(childCount + 1)}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Menu select */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  {birthday.calculator.menuLabel}
                </label>
                <select
                  value={selectedMenu}
                  onChange={(e) => setSelectedMenu(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                >
                  {menus.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.price} kr
                    </option>
                  ))}
                </select>
              </div>

              {/* Extras */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  {birthday.calculator.extrasLabel}
                </label>
                <div className="space-y-2">
                  {extras.map(e => (
                    <label key={e.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedExtras.has(e.id)}
                        onChange={() => toggleExtra(e.id)}
                        className="w-5 h-5 cursor-pointer"
                      />
                      <span className="text-gray-700">
                        {e.name} {e.price > 0 ? `(+${e.price} kr)` : '(+0 kr)'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Price display */}
            <div className="bg-linear-to-b from-gray-50 to-gray-100 rounded-lg p-6 flex flex-col justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">Sammandrag:</p>
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
                  {selectedMenuData && (
                    <div className="flex justify-between text-gray-700">
                      <span>{selectedMenuData.name} × {childCount}</span>
                      <span className="font-semibold">{basePrice} kr</span>
                    </div>
                  )}
                  {Array.from(selectedExtras).map(extraId => {
                    const extra = extras.find(e => e.id === extraId);
                    if (!extra) return null;
                    const quantity = extra.id === 'extra-lane' ? 1 : childCount;
                    return (
                      <div key={extraId} className="flex justify-between text-gray-700">
                        <span>{extra.name}</span>
                        <span className="font-semibold">{extra.price * quantity} kr</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">{birthday.calculator.totalPrice}:</p>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  {totalPrice} <span className="text-lg">kr</span>
                </div>
                <div className="text-center">
                  <p className="text-gray-700 font-semibold text-lg mb-2">
                    {birthday.calculator.bookingCTA1}<br />
                    {birthday.calculator.bookingCTA2}
                  </p>
                  <p className="text-3xl font-bold text-red-700 mb-4"><a href={`tel:${contact.phone}`} className="hover:text-red-800">{contact.phone}</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title={birthday.faqTitle}
        items={birthday.faqItems}
        className="px-4 py-16"
      />

      {/* Contact Section */}
      <section className="py-16" aria-label="Boka barnkalas">
        <div className="max-w-6xl mx-auto px-4">
          <aside className="bg-linear-to-r from-red-800 to-rose-800 rounded-lg shadow-lg p-8 max-w-4xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">{getStrings(lang).openingHours.bookTitle}</h2>
            <p className="mb-6">
              {getStrings(lang).openingHours.bookBody}<br/> {getStrings(lang).openingHours.body1} <strong><a href={`tel:${contact.phone}`}>{contact.phone}</a></strong> {getStrings(lang).openingHours.body2} <strong><a href={`mailto:${contact.email}`}>{contact.email}</a></strong>.
            </p>
            <p className="text-sm">{getStrings(lang).openingHours.bookNote}</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
