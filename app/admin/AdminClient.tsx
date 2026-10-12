'use client';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence, type User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { SessionExpiredError } from '@/lib/adminSession';
import { useAdminSession } from '@/lib/useAdminSession';
import { getFirebase } from '@/lib/firebase';
import { readEditorContent, saveEditorContent } from '@/lib/contentAdmin';
import { catalogKeys, weekdays, type CatalogItem, type CatalogKey, type DayHours, type SiteContent } from '@/lib/content';

const groups: Record<CatalogKey, string> = { bowling: 'Bowlingpriser', birthdayMenus: 'Kalasmenyer', birthdayExtras: 'Kalastillval', eventHall: 'Hyra hela hallen', eventMenus: 'Eventmenyer' };
const descriptions: Record<CatalogKey, string> = {
  bowling: 'Priser för att boka en bana, till exempel vardagar, helger och skolor.',
  birthdayMenus: 'Maten som går att välja till barnkalas. Priset gäller per barn och används i priskalkylatorn.',
  birthdayExtras: 'Extra val till kalaset, till exempel tårta eller en extra bana.',
  eventHall: 'Paketpriser för att boka hela bowlinghallen.',
  eventMenus: 'Mat till fester och företagsevent, inklusive eventuella barnpriser.',
};
const addLabels: Record<CatalogKey, string> = {
  bowling: 'Lägg till bowlingpris', birthdayMenus: 'Lägg till kalasmeny',
  birthdayExtras: 'Lägg till kalastillval', eventHall: 'Lägg till hallpaket', eventMenus: 'Lägg till eventmeny',
};
function dateLabel(date: string) {
  if (!date) return 'Välj datum';
  return new Intl.DateTimeFormat('sv-SE', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`));
}
const sectionStyle = 'group rounded-xl border border-gray-200 bg-white shadow-sm';
const summaryStyle = 'cursor-pointer rounded-xl p-5 sm:p-6 focus-visible:outline-2 focus-visible:outline-red-800';
const input = 'mt-1 block w-full rounded border border-gray-400 bg-white p-2 text-gray-950';
const button = 'rounded bg-red-800 px-4 py-2 text-white font-semibold disabled:opacity-50';
function errorText(error: unknown) {
  if (error instanceof FirebaseError) {
    if (['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'].includes(error.code)) return 'Inloggningen misslyckades. Kontrollera e-post och lösenord.';
    if (error.code === 'auth/too-many-requests') return 'För många inloggningsförsök. Vänta en stund och försök igen.';
    if (error.code === 'permission-denied') return 'Åtkomst nekad. Kontrollera administratörsbehörigheten och att databasreglerna är publicerade.';
    return 'Kunde inte ansluta till Firebase. Kontrollera anslutningen och projektets inställningar.';
  }
  return error instanceof Error ? error.message : 'Ett fel uppstod. Försök igen.';
}
function HoursFields({ value, change }: { value: DayHours; change: (value: DayHours) => void }) {
  return <div className="flex flex-wrap items-end gap-4">
    <label className="flex gap-2 items-center py-2"><input type="checkbox" checked={value.closed} onChange={e => change({ ...value, closed: e.target.checked })} /> Stängt</label>
    <label>Öppnar<input className={input} type="time" required disabled={value.closed} value={value.opens} onChange={e => change({ ...value, opens: e.target.value })} /></label>
    <label>Stänger<input className={input} type="time" required disabled={value.closed} value={value.closes} onChange={e => change({ ...value, closes: e.target.value })} /></label>
  </div>;
}

export default function AdminClient() {
  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [changedSections, setChangedSections] = useState<string[]>([]);

  const expired = useRef(false);
  const expireSession = useCallback(() => {
    expired.current = true;
    setUser(null); setContent(null); setDirty(false); setBusy(false); setLoading(false);
    setChangedSections([]); setNewIds(new Set()); setPassword(''); setError('');
    setMessage(new SessionExpiredError().message);
    void signOut(getFirebase().auth).catch(() => {
      setError('Kunde inte avsluta inloggningen. Ladda om sidan innan du loggar in igen.');
    });
  }, []);
  const warningSeconds = useAdminSession(user, expireSession);

  useEffect(() => {
    let active = true;
    let generation = 0;
    let unsubscribe = () => {};
    try {
      unsubscribe = onAuthStateChanged(getFirebase().auth, async next => {
        const current = ++generation;
        if (next) expired.current = false;
        setUser(next); setContent(null); setDirty(false); setLoading(true); setError('');
        try {
          if (next) {
            const result = await readEditorContent(next.uid);
            if (!active || expired.current || current !== generation) return;
            setContent(result.content); setRevision(result.revision);
          }
        } catch (e) { if (active && current === generation) { if (e instanceof SessionExpiredError) expireSession(); else setError(errorText(e)); } }
        finally { if (active && current === generation) setLoading(false); }
      });
    } catch (e) {
      // Report configuration failures discovered while attaching the auth subscription.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(errorText(e));
      setLoading(false);
    }
    return () => { active = false; unsubscribe(); };
  }, [expireSession]);
  useEffect(() => {
    if (!dirty) return;
    const prevent = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', prevent);
    return () => window.removeEventListener('beforeunload', prevent);
  }, [dirty]);

  function edit(next: SiteContent) {
    const changed: string[] = [];
    if (content?.week !== next.week) changed.push('Ordinarie öppettider');
    if (content?.exceptions !== next.exceptions) changed.push('Specialtider och stängda dagar');
    for (const key of catalogKeys) if (content?.catalog[key] !== next.catalog[key]) changed.push(groups[key]);
    setChangedSections(previous => [...new Set([...previous, ...changed])]);
    setContent(next); setDirty(true); setMessage('');
  }
  function newId() {
    const id = crypto.randomUUID();
    setNewIds(previous => new Set([...previous, id]));
    return id;
  }
  function updateItem(key: CatalogKey, index: number, item: CatalogItem) {
    if (content) edit({ ...content, catalog: { ...content.catalog, [key]: content.catalog[key].map((old, i) => i === index ? item : old) } });
  }
  async function login(event: FormEvent) {
    event.preventDefault(); setError(''); setMessage(''); setBusy(true);
    try {
      const { auth } = getFirebase();
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      setPassword('');
    } catch (e) { setError(errorText(e)); }
    finally { setBusy(false); }
  }
  async function logout() {
    if (dirty && !window.confirm('Du har osparade ändringar. Logga ut ändå?')) return;
    try { await signOut(getFirebase().auth); setMessage(''); } catch (e) { setError(errorText(e)); }
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!content) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const nextRevision = await saveEditorContent(content, revision);
      if (expired.current) return;
      setRevision(nextRevision); setDirty(false); setChangedSections([]);
      setMessage('Sparat! Ändringarna visas på hemsidan normalt inom 1–2 minuter.');
    } catch (e) { if (e instanceof SessionExpiredError) expireSession(); else setError(errorText(e)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    finally { setBusy(false); }
  }

  return <div className="bg-gray-50 text-gray-950 min-h-screen px-4 py-12 pb-32"><div className="max-w-5xl mx-auto">
    <div className="flex flex-wrap gap-4 items-center justify-between mb-6"><div><p className="text-sm font-semibold text-red-800 mb-2">Bowling Kristianstad</p><h1 className="text-3xl font-bold">Hantera hemsidan</h1><p className="mt-3 text-gray-600">Öppna det du vill ändra. Spara när du är klar.</p></div>{user && <button className={button} disabled={busy} onClick={logout}>Logga ut</button>}</div>
    {user && <p className="text-sm text-gray-600 mb-6">Du loggas ut efter 15 minuter utan aktivitet, eller senast en timme efter inloggning.</p>}
    {user && warningSeconds !== null && <aside role="alert" className="sticky top-0 z-50 rounded border border-amber-400 bg-amber-50 p-4 mb-6">
      <p className="font-semibold">Du loggas snart ut (inom {warningSeconds} sekunder).</p>
      <p>Spara dina ändringar nu. Vid inaktivitet kan du fortsätta arbeta för att förlänga tiden. Efter en timme behöver du logga in igen.</p>
    </aside>}
    {error && <p role="alert" className="rounded border border-red-300 bg-red-50 p-4 mb-6">{error}</p>}
    {message && <p role="status" className="rounded border border-green-300 bg-green-50 p-4 mb-6">{message}</p>}
    {loading ? <p role="status">Hämtar…</p> : !user ? <form onSubmit={login} className="max-w-md space-y-5 bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-bold">Logga in</h2>
      <label className="block">E-post<input className={input} type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label className="block">Lösenord<input className={input} type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button className={button} disabled={busy}>{busy ? 'Loggar in…' : 'Logga in'}</button>
      <p className="text-sm text-gray-600">Konton och behörigheter hanteras av projektägaren.</p>
    </form> : content ? <form onSubmit={save} onInvalidCapture={event => {
      // Native validation must be able to focus fields inside collapsed sections.
      let element: HTMLElement | null = event.target as HTMLElement;
      while (element) {
        if (element instanceof HTMLDetailsElement) element.open = true;
        element = element.parentElement;
      }
    }}>
      {revision === 0 && <p className="bg-amber-50 border border-amber-300 rounded p-4 mb-6">Databasen är tom. Här visas sidans tidigare innehåll som förslag. Kontrollera priser och alla stängda datum, särskilt sommaruppehållet, innan du publicerar första gången.</p>}
      <fieldset disabled={busy} className="space-y-4">
        <details className={sectionStyle} open>
          <summary className={summaryStyle}><h2 className="inline text-xl font-bold">Ordinarie öppettider</h2><p className="mt-2 text-gray-600">Veckoschemat som gäller när inga specialtider är inlagda.</p></summary>
          <div className="border-t border-gray-100 p-5 sm:p-6">
          <p className="mb-4 text-gray-600">Tiderna gäller svensk tid. Öppning och stängning ska vara samma dag.</p>
          <div className="grid md:grid-cols-2 gap-5">{content.week.map((day, index) => <fieldset key={index} className="border rounded p-3"><legend className="font-semibold px-1">{weekdays[index]}</legend><HoursFields value={day} change={next => edit({ ...content, week: content.week.map((old, i) => i === index ? next : old) })} /></fieldset>)}</div>
          </div>
        </details>
        <details className={sectionStyle}>
          <summary className={summaryStyle}><h2 className="inline text-xl font-bold">Specialtider och stängda dagar</h2><span className="ml-3 rounded-full bg-gray-100 px-2 py-1 text-sm">{content.exceptions.length} inlagda</span><p className="mt-2 text-gray-600">Öppna för att se eller ändra helgdagar, semester och andra undantag.</p></summary>
          <div className="border-t border-gray-100 p-5 sm:p-6">
          <p className="mb-5 text-gray-600">Här ändrar du bara särskilda datum – ditt vanliga veckoschema påverkas inte. Välj samma start- och slutdatum för en enda dag. En enskild dag gäller före en längre period. Undantagen upprepas inte nästa år.</p>
          <div className="space-y-4">{content.exceptions.map((exception, index) => {
            const change = (next: typeof exception) => edit({ ...content, exceptions: content.exceptions.map((old, i) => i === index ? next : old) });
            return <details key={exception.id} className="rounded-lg border border-gray-200" open={newIds.has(exception.id) ? true : undefined}>
              <summary className="cursor-pointer p-4 focus-visible:outline-2 focus-visible:outline-red-800">
                <span className="font-semibold">{exception.label || 'Nytt datumundantag'}</span>
                <span className={`ml-3 rounded-full px-2 py-1 text-xs font-semibold ${exception.closed ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>{exception.closed ? 'Stängt' : `${exception.opens}–${exception.closes}`}</span>
                <span className="block mt-2 text-sm text-gray-600">{dateLabel(exception.start)}{exception.end !== exception.start && ` – ${dateLabel(exception.end)}`} · Öppna för att ändra</span>
              </summary>
              <div className="border-t border-gray-100 p-4 space-y-4">
              <label className="block">Vad gäller ändringen? <span className="text-sm text-gray-500">(t.ex. julafton eller sommarstängt)</span><input className={input} placeholder="Till exempel Sommarstängt" maxLength={150} value={exception.label} onChange={e => change({ ...exception, label: e.target.value })} /></label>
              <div className="flex flex-wrap gap-4"><label>Första dagen<input className={input} type="date" required value={exception.start} onChange={e => change({ ...exception, start: e.target.value })} /></label><label>Sista dagen<input className={input} type="date" required value={exception.end} onChange={e => change({ ...exception, end: e.target.value })} /></label></div>
              <HoursFields value={exception} change={next => change({ ...exception, ...next })} />
              <button type="button" className="underline text-red-800" onClick={() => { if (window.confirm(`Ta bort ${exception.label || "detta datumundantag"}? Ordinarie tider eller en överlappande period gäller då igen. Ändringen publiceras när du sparar.`)) edit({ ...content, exceptions: content.exceptions.filter((_, i) => i !== index) }); }}>Ta bort datumundantaget</button>
              </div>
            </details>;
          })}</div>
          <button type="button" className={`${button} mt-4`} onClick={() => edit({ ...content, exceptions: [...content.exceptions, { id: newId(), label: '', start: '', end: '', closed: true, opens: '09:00', closes: '18:00' }] })}>Lägg till stängd dag eller specialtid</button>
          </div>
        </details>
        {catalogKeys.map(key => <details key={key} className={sectionStyle}>
          <summary className={summaryStyle}><h2 className="inline text-xl font-bold">{groups[key]}</h2><span className="ml-3 rounded-full bg-gray-100 px-2 py-1 text-sm">{content.catalog[key].length} alternativ</span><p className="mt-2 text-gray-600">{descriptions[key]}</p></summary>
          <div className="border-t border-gray-100 p-5 sm:p-6">
          <p className="text-sm text-gray-600 mb-4">Öppna ett alternativ för att ändra namn, innehåll eller pris. Alla ändringar publiceras med Spara-knappen längst ned.</p>
          <div className="space-y-4">{content.catalog[key].map((item, index) => <details key={item.id} className="rounded-lg border border-gray-200" open={newIds.has(item.id) ? true : undefined}>
            <summary className="cursor-pointer p-4 focus-visible:outline-2 focus-visible:outline-red-800"><span className="font-semibold">{item.translations.sv.name || 'Nytt alternativ'}</span><span className="ml-3 text-red-800 font-semibold">{item.pricing === 'quote' ? 'Ring för pris' : `${Number.isFinite(item.price) ? item.price : '–'} kr`}</span><span className="block mt-1 text-sm text-gray-600">{item.translations.sv.unit || 'Öppna för att ändra'}</span></summary>
            <div className="border-t border-gray-100 p-4 space-y-4">
            <div className="flex flex-wrap gap-4 items-end">
              <label>{key === 'birthdayMenus' ? 'Pris per barn (kr)' : 'Pris (kr)'}<input className={input} type="number" min="0" max="1000000" step="0.01" required disabled={item.pricing === 'quote'} value={Number.isNaN(item.price) ? '' : item.price} onChange={e => updateItem(key, index, { ...item, price: e.target.valueAsNumber })} /></label>
              {key === 'eventMenus' && <label className="py-2"><input type="checkbox" checked={item.pricing === 'quote'} onChange={e => updateItem(key, index, { ...item, pricing: e.target.checked ? 'quote' : 'fixed', price: e.target.checked ? 0 : item.price })} /> Ring för pris</label>}
              {key === 'eventMenus' && item.pricing === 'fixed' && <>
                <label className="py-2"><input type="checkbox" checked={item.childPrice !== null} onChange={e => updateItem(key, index, { ...item, childPrice: e.target.checked ? 0 : null })} /> Särskilt barnpris</label>
                {item.childPrice !== null && <><label>Barnpris (kr)<input className={input} type="number" min="0" max="1000000" step="0.01" required value={Number.isNaN(item.childPrice) ? '' : item.childPrice} onChange={e => updateItem(key, index, { ...item, childPrice: e.target.valueAsNumber })} /></label><label>För barn under (år)<input className={input} type="number" min="1" max="18" required value={item.childAge} onChange={e => updateItem(key, index, { ...item, childAge: e.target.valueAsNumber })} /></label></>}
              </>}
              {key === 'birthdayExtras' && <label>Hur räknas tillvalets pris?<select className={input} value={item.quantity} onChange={e => updateItem(key, index, { ...item, quantity: e.target.value as 'child' | 'once' })}><option value="child">Per barn</option><option value="once">En gång per kalas</option></select></label>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">{(['sv', 'en'] as const).map(lang => <fieldset key={lang} className="space-y-3"><legend className="font-semibold mb-2">{lang === 'sv' ? 'På svenska' : 'På engelska'}</legend>
              {(['name', 'description', 'unit'] as const).map(field => <label key={field} className="block">{{ name: 'Namn', description: 'Beskrivning / villkor', unit: 'Text efter priset (t.ex. per timme eller per person)' }[field]}
                <input className={input} required={field === 'name'} maxLength={field === 'name' ? 150 : field === 'unit' ? 250 : 2000} value={item.translations[lang][field]} onChange={e => updateItem(key, index, { ...item, translations: { ...item.translations, [lang]: { ...item.translations[lang], [field]: e.target.value } } })} />
              </label>)}
            </fieldset>)}</div>
            <button type="button" className="underline text-red-800" disabled={key !== 'birthdayExtras' && content.catalog[key].length === 1} onClick={() => { if (window.confirm(`Ta bort ${item.translations.sv.name || "detta alternativ"}? Ändringen publiceras när du sparar.`)) edit({ ...content, catalog: { ...content.catalog, [key]: content.catalog[key].filter((_, i) => i !== index) } }); }}>Ta bort alternativet</button>
            </div>
          </details>)}</div>
          <button type="button" className={`${button} mt-4`} onClick={() => edit({ ...content, catalog: { ...content.catalog, [key]: [...content.catalog[key], { id: newId(), price: 0, childPrice: null, childAge: 12, pricing: 'fixed', quantity: key === 'birthdayExtras' ? 'child' : 'once', translations: { sv: { name: '', description: '', unit: '' }, en: { name: '', description: '', unit: '' } } }] } })}>{addLabels[key]}</button>
          </div>
        </details>)}
      </fieldset>
      <div className="sticky bottom-0 z-40 mt-6 bg-white border rounded p-4 flex flex-wrap gap-4 items-center shadow-lg">
        <button className={button} disabled={busy || (!dirty && revision !== 0)}>{busy ? 'Sparar…' : revision === 0 ? 'Publicera startinnehåll' : 'Spara ändringar'}</button>
        <span role="status">{dirty ? `Inte sparat ännu: ${changedSections.join(', ')}.` : revision ? 'Alla ändringar är sparade.' : 'Kontrollera startinnehållet före publicering.'}</span>
      </div>
    </form> : <p>Kontakta projektägaren för hjälp med åtkomst. Ditt UID: <code className="break-all">{user.uid}</code></p>}
  </div></div>;
}
