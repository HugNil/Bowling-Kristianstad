'use client';

import { useState } from 'react';
import { getStrings } from '@/lib/strings';
import { useLanguage } from '@/lib/LanguageContext';
import { getBirthdayMenus, getBirthdayExtras } from '@/lib/eventsData';

function MenuCard({ name, price, unit }: { name: string; price: number; unit?: string }) {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow overflow-hidden">
      <div className="bg-gray-800 text-white p-6">
        <h3 className="text-2xl font-bold mb-0">{name}</h3>
      </div>
      <div className="p-6">
        <div className="text-4xl font-bold text-gray-800 mb-2">
          {price} kr
        </div>
        {unit && <div className="text-gray-600">{unit}</div>}
      </div>
    </div>
  );
}

function ExtraBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200 text-sm">
      {label}
    </span>
  );
}

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
      {/* Hero */}
      <section className="bg-linear-to-r from-indigo-900 to-purple-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">{birthday.heroTitle}</h1>
          <p className="text-xl max-w-3xl mx-auto">{birthday.heroSubtitle}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-extrabold tracking-tight mb-6">{birthday.introTitle}</h2>
          <div className="text-gray-700 text-lg">
            {<p>{birthday.introParagraph1}</p>}
            {<p>{birthday.introParagraph2}</p>}
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Card */}
            {birthday.cardsLeft?.map((card: CardData, idx: number) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6 h-full">
                <div className="flex gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                    {card.body && <p className="text-gray-700">{card.body}</p>}
                  </div>
                </div>
              </div>
            ))}

            {/* Time Card */}
            {birthday.cardsRight?.map((card: CardData, idx: number) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6 h-full">
                <div className="flex gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                    {card.body && <p className="text-gray-700">{card.body}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planning & Setup */}
      <section className="px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">{lang === 'sv' ? 'Så går kalaset till' : 'How the party works'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthday.introParagraphs?.map((p: string, i: number) => (
              <div key={i} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold text-lg shrink-0">
                    {i + 1}
                  </div>
                  <div className="text-3xl">{['🎁', '🥤', '🍔', '🎳', '🍦', '🎉'][i] || '✨'}</div>
                </div>
                <p className="text-gray-700 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">{lang === 'sv' ? 'Paketerbjudanden' : 'Package Deals'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menus.map(m => (
              <MenuCard key={m.id} name={m.name} price={m.price} unit={m.unit} />
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="px-4 pb-12">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-6">{lang === 'sv' ? 'Tillval' : 'Add-ons'}</h2>
          <div className="flex flex-wrap gap-3">
            {extras.map(e => (
              <ExtraBadge key={e.id} label={`${e.name} ${e.price > 0 ? `+${e.price} ${e.unit ?? 'kr'}` : '+0kr'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-5xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6">{birthday.includesTitle}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
            {birthday.includesList?.map((item: string, idx: number) => (
              <li key={idx} className="flex gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-sm shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact */}
      <section className="px-4 pb-16">
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
    </div>
  );
}
