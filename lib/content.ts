export type Locale = 'sv' | 'en';
export type Translation = { name: string; description: string; unit: string };
export type CatalogItem = {
  id: string;
  price: number;
  childPrice: number | null;
  childAge: number;
  pricing: 'fixed' | 'quote';
  quantity: 'child' | 'once';
  translations: Record<Locale, Translation>;
};
export const catalogKeys = ['bowling', 'birthdayMenus', 'birthdayExtras', 'eventHall', 'eventMenus'] as const;
export type CatalogKey = typeof catalogKeys[number];
export type DayHours = { closed: boolean; opens: string; closes: string };
export type HoursException = DayHours & { id: string; start: string; end: string; label: string };
export type SiteContent = {
  version: 1;
  week: DayHours[]; // Monday first
  exceptions: HoursException[];
  catalog: Record<CatalogKey, CatalogItem[]>;
};
export type ContentState = { content: SiteContent | null; source: 'database' | 'local' | 'unavailable' };
export const weekdays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function string(value: unknown, max = 2000): value is string {
  return typeof value === 'string' && value.length <= max;
}
function validDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
function validHours(value: unknown): boolean {
  if (!object(value) || typeof value.closed !== 'boolean') return false;
  const time = (v: unknown) => typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
  return time(value.opens) && time(value.closes) && (value.closed || String(value.opens) < String(value.closes));
}

// Applied to database reads as well as admin saves. Never trust a stored payload.
export function validateContent(value: unknown): asserts value is SiteContent {
  if (!object(value) || value.version !== 1) throw new Error('Okänt innehållsformat.');
  if (!Array.isArray(value.week) || value.week.length !== 7 || !value.week.every(validHours)) {
    throw new Error('Ange giltiga öppettider för alla sju veckodagar. Stängning måste vara efter öppning.');
  }
  if (!Array.isArray(value.exceptions) || value.exceptions.length > 200) throw new Error('Högst 200 datumundantag tillåts.');
  const ids = new Set<string>();
  for (const exception of value.exceptions) {
    if (!object(exception) || !validHours(exception) || !validDate(exception.start) || !validDate(exception.end)
      || exception.start > exception.end || !string(exception.label, 150) || !string(exception.id, 100) || !exception.id || ids.has(exception.id)) {
      throw new Error('Kontrollera datum, tider och namn för undantagen.');
    }
    ids.add(exception.id);
  }
  // Single-day exceptions override a period. Overlapping periods or duplicate dates are ambiguous.
  const exceptions = value.exceptions as HoursException[];
  for (let i = 0; i < exceptions.length; i++) {
    for (let j = i + 1; j < exceptions.length; j++) {
      const a = exceptions[i], b = exceptions[j];
      const overlap = a.start <= b.end && b.start <= a.end;
      if (overlap && (a.start === a.end) === (b.start === b.end)) {
        throw new Error('Datumperioder får inte överlappa och ett datum får bara ha ett eget undantag.');
      }
    }
  }
  if (!object(value.catalog)) throw new Error('Prislistor saknas.');
  for (const key of catalogKeys) {
    const items = value.catalog[key];
    if (!Array.isArray(items) || items.length > 50 || (key !== 'birthdayExtras' && !items.length)) throw new Error('Varje prislista behöver 1–50 poster (tillval kan vara tomma).');
    const itemIds = new Set<string>();
    for (const item of items) {
      if (!object(item) || !string(item.id, 100) || !item.id || itemIds.has(item.id)
        || typeof item.price !== 'number' || !Number.isFinite(item.price) || item.price < 0 || item.price > 1000000
        || (item.childPrice !== null && (typeof item.childPrice !== 'number' || !Number.isFinite(item.childPrice) || item.childPrice < 0 || item.childPrice > 1000000 || Math.abs(item.childPrice * 100 - Math.round(item.childPrice * 100)) > 0.000001))
        || !Number.isInteger(item.childAge) || Number(item.childAge) < 1 || Number(item.childAge) > 18
        || Math.abs(item.price * 100 - Math.round(item.price * 100)) > 0.000001
        || !['fixed', 'quote'].includes(String(item.pricing)) || (item.pricing === 'quote' && key !== 'eventMenus')
        || !['child', 'once'].includes(String(item.quantity)) || !object(item.translations)) throw new Error('Kontrollera priserna. Ange 0–1 000 000 kr med högst två decimaler.');
      itemIds.add(item.id);
      for (const lang of ['sv', 'en']) {
        const t = item.translations[lang];
        if (!object(t) || !string(t.name, 150) || !t.name.trim() || !string(t.description) || !string(t.unit, 250)) {
          throw new Error('Varje post behöver ett namn på svenska och engelska.');
        }
      }
    }
  }
}

export function localizeItems(content: SiteContent, key: CatalogKey, lang: Locale) {
  return content.catalog[key].map(item => ({
    ...item, ...item.translations[lang], duration: item.translations[lang].unit, free: item.price === 0,
  }));
}
export function stockholmDate(now = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Stockholm', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}
export function hoursForDate(content: SiteContent, date: string): DayHours {
  const matches = content.exceptions.filter(e => e.start <= date && e.end >= date);
  const exception = matches.find(e => e.start === e.end) ?? matches[0];
  const weekday = (new Date(`${date}T12:00:00Z`).getUTCDay() + 6) % 7;
  return exception ?? content.week[weekday];
}
export function upcomingHours(content: SiteContent, lang: Locale, now = new Date()) {
  const start = new Date(`${stockholmDate(now)}T12:00:00Z`);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + i);
    const iso = date.toISOString().slice(0, 10);
    const hours = hoursForDate(content, iso);
    const weekday = (date.getUTCDay() + 6) % 7;
    return { id: iso, day: (lang === 'sv' ? weekdays : englishDays)[weekday], isOpen: !hours.closed,
      closedDate: `${date.getUTCDate()}/${date.getUTCMonth() + 1}`, hours: `${hours.opens} – ${hours.closes}` };
  });
}
export function calculateBirthdayTotal(content: SiteContent, menuId: string, extras: string[], children: number) {
  const menu = content.catalog.birthdayMenus.find(m => m.id === menuId) ?? content.catalog.birthdayMenus[0];
  return Math.round((menu.price * children + content.catalog.birthdayExtras
    .filter(e => extras.includes(e.id)).reduce((sum, e) => sum + e.price * (e.quantity === 'child' ? children : 1), 0)) * 100) / 100;
}

// Split periods around single-day overrides so structured data has no contradictory intervals.
export function effectiveExceptions(content: SiteContent): HoursException[] {
  const singles = content.exceptions.filter(e => e.start === e.end);
  const shift = (date: string, days: number) => {
    const result = new Date(`${date}T12:00:00Z`);
    result.setUTCDate(result.getUTCDate() + days);
    return result.toISOString().slice(0, 10);
  };
  return content.exceptions.filter(e => e.start !== e.end).flatMap(period => {
    let cursor = period.start;
    const pieces: HoursException[] = [];
    for (const single of singles.filter(e => period.start <= e.start && e.start <= period.end).sort((a, b) => a.start.localeCompare(b.start))) {
      if (cursor < single.start) pieces.push({ ...period, start: cursor, end: shift(single.start, -1) });
      cursor = shift(single.end, 1);
    }
    if (cursor <= period.end) pieces.push({ ...period, start: cursor });
    return pieces;
  }).concat(singles).sort((a, b) => a.start.localeCompare(b.start));
}
