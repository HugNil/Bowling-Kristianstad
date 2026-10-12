import { getPricing } from './pricingData.ts';
import { getBirthdayMenus, getBirthdayExtras, getEventMenus, getEventMenuOptions } from './eventsData.ts';
import type { CatalogItem, SiteContent } from './content';

type OldItem = { id: string; name: string; price: number; description?: string; unit?: string; duration?: string };
function convert(sv: OldItem[], en: OldItem[], group: string): CatalogItem[] {
  return sv.map(item => {
    const english = en.find(e => e.id === item.id) ?? item;
    const text = (entry: OldItem) => ({ name: entry.name, description: entry.description ?? '', unit: (entry.unit ?? entry.duration ?? '').replace(/ \(.*(?:100kr).*\)/, '') });
    return { id: item.id, price: item.price, childPrice: group === 'eventMenus' && item.id === 'meny1' ? 100 : null, childAge: 12, pricing: group === 'eventMenus' && item.price === 0 ? 'quote' : 'fixed',
      quantity: group === 'birthdayExtras' && item.id !== 'extra-lane' ? 'child' : 'once',
      translations: { sv: text(item), en: text(english) } };
  });
}

// Seed only. Once Firebase is configured, missing/unavailable data is never silently replaced with these prices.
export function createDefaultContent(year = new Date().getFullYear()): SiteContent {
  const holidays = ['01-01', '01-06', '05-01', '12-23', '12-24', '12-25', '12-26', '12-31'];
  return {
    version: 1,
    week: [['09:30', '20:00'], ['11:00', '20:00'], ['09:30', '20:00'], ['11:00', '20:00'], ['14:00', '19:00'], ['13:00', '19:00'], ['13:00', '18:00']]
      .map(([opens, closes]) => ({ closed: false, opens, closes })),
    exceptions: [year, year + 1].flatMap(y => [
      ...holidays.map(day => ({ id: `holiday-${y}-${day}`, start: `${y}-${day}`, end: `${y}-${day}`, label: 'Helgstängt', closed: true, opens: '09:00', closes: '18:00' })),
      { id: `summer-${y}`, start: `${y}-06-06`, end: `${y}-08-11`, label: 'Sommarstängt – kontrollera datumen', closed: true, opens: '09:00', closes: '18:00' },
    ]),
    catalog: {
      bowling: convert(getPricing('sv'), getPricing('en'), 'bowling'),
      birthdayMenus: convert(getBirthdayMenus('sv'), getBirthdayMenus('en'), 'birthdayMenus'),
      birthdayExtras: convert(getBirthdayExtras('sv'), getBirthdayExtras('en'), 'birthdayExtras'),
      eventHall: convert(getEventMenus('sv'), getEventMenus('en'), 'eventHall'),
      eventMenus: convert(getEventMenuOptions('sv'), getEventMenuOptions('en'), 'eventMenus'),
    },
  };
}
