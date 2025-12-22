import { ExtraItem, MenuItem } from './types';

type Locale = 'sv' | 'en';

// -----------------------------
// Birthday menus & extras
// -----------------------------

const birthdayMenus: Record<Locale, MenuItem[]> = {
  sv: [
    { id: 'korv', name: 'Korvmeny', price: 155, unit: 'kr/barn' },
    { id: 'hamburger-90', name: 'Hamburgaremeny 90 g', price: 180, unit: 'kr/barn' },
    { id: 'hamburger-130', name: 'Hamburgaremeny 130 g', price: 190, unit: 'kr/barn' },
  ],
  en: [
    { id: 'korv', name: 'Hot dog menu', price: 155, unit: 'kr/child' },
    { id: 'hamburger-90', name: 'Burger menu 90 g', price: 180, unit: 'kr/child' },
    { id: 'hamburger-130', name: 'Burger menu 130 g', price: 190, unit: 'kr/child' },
  ],
};

const birthdayExtras: Record<Locale, ExtraItem[]> = {
  sv: [
    { id: 'chips', name: 'Chips istället för godispåse', price: 0, unit: 'kr', free: true },
    { id: 'cake', name: 'Tårta istället för glass', price: 30, unit: 'kr/barn' },
    { id: 'extra-lane', name: 'Extra bowlingbana', price: 140, unit: 'kr' },
  ],
  en: [
    { id: 'chips', name: 'Chips instead of candy bag', price: 0, unit: 'kr', free: true },
    { id: 'cake', name: 'Cake instead of ice cream', price: 30, unit: 'kr/child' },
    { id: 'extra-lane', name: 'Extra bowling lane', price: 140, unit: 'kr' },
  ],
};

export function getBirthdayMenus(lang: Locale): MenuItem[] {
  return birthdayMenus[lang];
}

export function getBirthdayExtras(lang: Locale): ExtraItem[] {
  return birthdayExtras[lang];
}

// -----------------------------
// Event: hall pricing (bowling only)
// -----------------------------

const eventHallPrices: Record<Locale, MenuItem[]> = {
  sv: [
    { id: 'hall3h', name: '3 timmar', price: 2200, unit: 'kr' },
    { id: 'hall4h', name: '4 timmar', price: 3400, unit: 'kr' },
  ],
  en: [
    { id: 'hall3h', name: '3 hours', price: 2200, unit: 'kr' },
    { id: 'hall4h', name: '4 hours', price: 3400, unit: 'kr' },
  ],
};

export function getEventMenus(lang: Locale): MenuItem[] {
  return eventHallPrices[lang];
}

// -----------------------------
// Event: menu options (food)
// -----------------------------

const eventMenus: Record<Locale, MenuItem[]> = {
  sv: [
    {
      id: 'meny1',
      name: 'Meny 1',
      price: 149,
      unit: 'kr/person (barn under 12år 100kr)',
      description: 'Taco med diverse tillbehör',
    },
    {
      id: 'meny2',
      name: 'Meny 2',
      price: 0,
      unit: 'Pris, ring för info',
      description: 'Exotisk planka, Kalkon och rostbiff, 8 sorters frukter efter säsong, Brieost, potatissallad eller potatisgratäng. Catering',
    },
    {
      id: 'meny3',
      name: 'Meny 3',
      price: 0,
      unit: 'Pris, ring för info',
      description: 'Pizza. Catering',
    },
  ],
  en: [
    {
      id: 'meny1',
      name: 'Menu 1',
      price: 149,
      unit: 'kr/child (children under 12 100kr)',
      description: 'Tacos with various toppings',
    },
    {
      id: 'meny2',
      name: 'Menu 2',
      price: 0,
      unit: 'Price, call for info',
      description: 'Exotic platter, Turkey and roast beef, 8 types of seasonal fruits, Brie cheese, potato salad or gratinée. Catering',
    },
    {
      id: 'meny3',
      name: 'Menu 3',
      price: 0,
      unit: 'Price, call for info',
      description: 'Pizza. Catering',
    },
  ],
};

export function getEventMenuOptions(lang: Locale): MenuItem[] {
  return eventMenus[lang];
}