'use client';

import { useState } from 'react';
import FaqSection from '@/components/FaqSection';
import { getStrings } from '@/lib/strings';
import { useLanguage } from '@/lib/LanguageContext';
import { useSiteContent } from '@/lib/ContentContext';
import { localizeItems, calculateBirthdayTotal } from '@/lib/content';

export default function BirthdayPage() {
  interface CardData { title: string; body?: string; footerLines?: string[] }
  const { lang } = useLanguage();
  const { birthday, contact } = getStrings(lang);
  const content = useSiteContent();
  const menus = localizeItems(content, 'birthdayMenus', lang);
  const extras = localizeItems(content, 'birthdayExtras', lang);

  // Calculator state
  const [childCount, setChildCount] = useState<number>(4);
  const [selectedMenu, setSelectedMenu] = useState<string>(menus[0]?.id || '');
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  const selectedMenuData = menus.find(m => m.id === selectedMenu) ?? menus[0];
  const basePrice = selectedMenuData ? selectedMenuData.price * childCount : 0;
  
  const totalPrice = calculateBirthdayTotal(content, selectedMenu, Array.from(selectedExtras), childCount);

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
    <div className="hall-page">
      <section className="page-masthead" aria-label="Barnkalas">
        <div className="container mx-auto"><p className="eyebrow mb-5">{lang === 'sv' ? 'Fira på banan' : 'Celebrate on the lanes'}</p><h1 className="mb-5">{birthday.heroTitle}</h1><p className="max-w-2xl text-lg">{birthday.heroSubtitle}</p></div>
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
              <div key={idx} className="hall-panel   p-6">
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                {card.body && <p className="text-gray-700">{card.body}</p>}
              </div>
            ))}

            {/* Time Card */}
            {birthday.cardsRight?.map((card: CardData, idx: number) => (
              <div key={idx} className="hall-panel   p-6">
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
                      <span className="inline-flex items-center justify-center w-6 h-6  bg-red-500 text-white text-sm shrink-0 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Right: Menu */}
            <article className="menu-sheet" aria-label="Barnkalas meny">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">
                  {lang === 'sv' ? 'Menyalternativ' : 'Menu Options'}
                </h3>
                
                <div className="space-y-6">
                  {menus.map((item) => (
                    <div key={item.id} className="pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-red-600 text-2xl font-bold" aria-hidden="true">—</span>
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-gray-900">{item.name}</h4>
                        </div>
                      </div>
                      <p className="text-gray-700 ml-7 text-base font-semibold mt-2">
                        {item.price}kr, {item.unit}
                        {item.description && <span className="block font-normal mt-2">{item.description}</span>}
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
              <div key={i} className="hall-panel   p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10  bg-red-600 text-white font-bold text-lg shrink-0">
                    {i + 1}
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
        <div className="container mx-auto max-w-5xl hall-panel p-8">
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
                    className="w-10 h-10  bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-lg"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={childCount}
                    onChange={(e) => setChildCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center text-2xl font-bold border border-gray-300  py-2"
                  />
                  <button
                    onClick={() => setChildCount(childCount + 1)}
                    className="w-10 h-10  bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-lg"
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
                  value={selectedMenuData.id}
                  onChange={(e) => setSelectedMenu(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300  focus:outline-none focus:border-red-600"
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
                    <label key={e.id} className="flex items-center gap-3 p-3 border border-gray-200  hover:bg-gray-50 cursor-pointer">
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
            <div className="bg-gray-100  p-6 flex flex-col justify-between">
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
                    const quantity = extra.quantity === 'once' ? 1 : childCount;
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
          <aside className="hall-callout   p-8 max-w-4xl mx-auto text-white">
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
