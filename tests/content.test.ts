import { createDefaultContent } from '../lib/defaultContent.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { effectiveExceptions, validateContent, hoursForDate, upcomingHours, calculateBirthdayTotal, type SiteContent } from '../lib/content.ts';

function fixture(): SiteContent {
  const item = { id: 'menu', price: 155, childPrice: null, childAge: 12, pricing: 'fixed' as const, quantity: 'once' as const, translations: { sv: { name: 'Korv', description: '', unit: '' }, en: { name: 'Hot dog', description: '', unit: '' } } };
  return { version: 1, week: Array.from({ length: 7 }, () => ({ closed: false, opens: '09:00', closes: '18:00' })),
    exceptions: [], catalog: { bowling: [item], birthdayMenus: [item], birthdayExtras: [], eventHall: [item], eventMenus: [item] } };
}
test('summer closure, special opening day and ordinary week', () => {
  const content = fixture();
  content.exceptions = [
    { id: 'summer', label: '', start: '2026-06-06', end: '2026-08-11', closed: true, opens: '09:00', closes: '18:00' },
    { id: 'special', label: '', start: '2026-07-14', end: '2026-07-14', closed: false, opens: '14:00', closes: '17:00' },
  ];
  validateContent(content);
  assert.equal(hoursForDate(content, '2026-07-13').closed, true);
  assert.equal(hoursForDate(content, '2026-07-14').opens, '14:00');
  assert.equal(hoursForDate(content, '2026-08-12').closed, false);
});
test('Stockholm date rolls over before UTC, also across year boundary', () => {
  const content = fixture();
  content.exceptions = [{ id: 'ny', label: '', start: '2027-01-01', end: '2027-01-01', closed: true, opens: '09:00', closes: '18:00' }];
  const hours = upcomingHours(content, 'sv', new Date('2026-12-31T23:30:00Z'));
  assert.equal(hours[0].id, '2027-01-01');
  assert.equal(hours[0].day, 'Fredag');
  assert.equal(hours[0].isOpen, false);
  assert.equal(upcomingHours(content, 'sv', new Date('2026-07-01T22:30:00Z'))[0].id, '2026-07-02');
});
test('reject ambiguous overlap, malformed dates, inverted times and invalid prices', () => {
  for (const mutate of [
    (c: SiteContent) => { c.week[0].closes = '08:00'; },
    (c: SiteContent) => { c.catalog.bowling[0].price = -1; },
    (c: SiteContent) => { c.catalog.bowling[0].price = NaN; },
    (c: SiteContent) => { c.catalog.bowling[0].price = 1.001; },
    (c: SiteContent) => { c.catalog.birthdayMenus = []; },
    (c: SiteContent) => { c.exceptions = [{ id: 'bad', label: '', start: '2026-02-30', end: '2026-03-01', closed: true, opens: '09:00', closes: '18:00' }]; },
  ]) { const c = fixture(); mutate(c); assert.throws(() => validateContent(c)); }
  const c = fixture();
  c.exceptions = [1, 2].map(id => ({ id: String(id), label: '', start: '2026-07-01', end: '2026-07-31', closed: true, opens: '09:00', closes: '18:00' }));
  assert.throws(() => validateContent(c), /överlappa/);
});
test('calculator uses shared prices, per-child extras and once-per-party extras', () => {
  const content = fixture();
  const base = content.catalog.birthdayMenus[0];
  content.catalog.birthdayExtras = [{ ...base, id: 'cake', price: 30, quantity: 'child' }, { ...base, id: 'lane', price: 140, quantity: 'once' }];
  assert.equal(calculateBirthdayTotal(content, 'menu', ['cake', 'lane'], 4), 880);
  content.catalog.birthdayMenus[0].price = 160;
  assert.equal(calculateBirthdayTotal(content, 'removed-menu', ['cake', 'lane', 'removed-extra'], 4), 900);
});

test('existing content migrates with shared event child price and valid dates', () => {
  const content = createDefaultContent(2026);
  validateContent(content);
  assert.equal(content.catalog.eventMenus[0].childPrice, 100);
  assert.equal(content.catalog.eventMenus[0].translations.en.unit, 'kr/person');
  assert.equal(hoursForDate(content, '2026-07-13').closed, true);
  assert.equal(calculateBirthdayTotal(content, 'korv', ['cake', 'extra-lane'], 4), 880);
});

test('structured data splits a closed period around special opening dates', () => {
  const c = fixture();
  c.exceptions = [
    { id: 'summer', label: '', start: '2026-07-01', end: '2026-07-31', closed: true, opens: '09:00', closes: '18:00' },
    { id: 'special', label: '', start: '2026-07-14', end: '2026-07-14', closed: false, opens: '14:00', closes: '17:00' },
  ];
  assert.deepEqual(effectiveExceptions(c).map(e => [e.start, e.end, e.closed]), [
    ['2026-07-01', '2026-07-13', true], ['2026-07-14', '2026-07-14', false], ['2026-07-15', '2026-07-31', true],
  ]);
});
