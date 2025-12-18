import { ExtraItem, MenuItem } from './types';

// Birthday menus and extras (Swedish)
export const birthdayMenusSv: MenuItem[] = [
	{ id: 'korv', name: 'Korvmeny', price: 155, unit: 'kr/barn' },
	{ id: 'hamburger-90', name: 'Hamburgaremeny 90 g', price: 180, unit: 'kr/barn' },
	{ id: 'hamburger-130', name: 'Hamburgaremeny 130 g', price: 190, unit: 'kr/barn' },
];

export const birthdayExtrasSv: ExtraItem[] = [
	{ id: 'chips', name: 'Chips istället för godispåse', price: 0, unit: 'kr', free: true },
	{ id: 'cake', name: 'Tårta istället för glass', price: 30, unit: 'kr/barn' },
	{ id: 'extra-lane', name: 'Extra bowlingbana', price: 140, unit: 'kr' },
];

// Birthday menus and extras (English)
export const birthdayMenusEn: MenuItem[] = [
	{ id: 'korv', name: 'Hot dog menu', price: 155, unit: 'kr/child' },
	{ id: 'hamburger-90', name: 'Burger menu 90 g', price: 180, unit: 'kr/child' },
	{ id: 'hamburger-130', name: 'Burger menu 130 g', price: 190, unit: 'kr/child' },
];

export const birthdayExtrasEn: ExtraItem[] = [
	{ id: 'chips', name: 'Chips instead of candy bag', price: 0, unit: 'kr', free: true },
	{ id: 'cake', name: 'Cake instead of ice cream', price: 30, unit: 'kr/child' },
	{ id: 'extra-lane', name: 'Extra bowling lane', price: 140, unit: 'kr' },
];

export function getBirthdayMenus(lang: 'sv' | 'en'): MenuItem[] {
	return lang === 'en' ? birthdayMenusEn : birthdayMenusSv;
}

export function getBirthdayExtras(lang: 'sv' | 'en'): ExtraItem[] {
	return lang === 'en' ? birthdayExtrasEn : birthdayExtrasSv;
}

