'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from './LanguageContext';
import { validateContent, type ContentState, type SiteContent } from './content';

const Context = createContext<ContentState>({ content: null, source: 'unavailable' });
export function ContentProvider({ initial, children }: { initial: ContentState; children: React.ReactNode }) {
  const [state, setState] = useState(initial);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith('/admin')) return;
    const controller = new AbortController();
    const refresh = async () => {
      if (document.visibilityState === 'hidden') return;
      try {
        const response = await fetch('/api/content', { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) throw new Error('Unavailable');
        const next: ContentState = await response.json();
        validateContent(next.content);
        setState(next);
      } catch {
        if (!controller.signal.aborted) setState({ content: null, source: 'unavailable' });
      }
    };
    const interval = setInterval(refresh, 60000);
    document.addEventListener('visibilitychange', refresh);
    return () => { clearInterval(interval); controller.abort(); document.removeEventListener('visibilitychange', refresh); };
  }, [pathname]);
  return <Context.Provider value={state}>{children}</Context.Provider>;
}
export function useSiteContent(): SiteContent {
  const { content } = useContext(Context);
  if (!content) throw new Error('ContentBoundary must wrap content consumers.');
  return content;
}
export function ContentBoundary({ children }: { children: React.ReactNode }) {
  const { content } = useContext(Context);
  const { lang } = useLanguage();
  if (!content) return <section className="mx-auto max-w-3xl px-6 py-20 text-gray-900 bg-white" role="status">
    <h1 className="text-3xl font-bold mb-4">{lang === 'sv' ? 'Informationen kan inte hämtas just nu' : 'Information is temporarily unavailable'}</h1>
    <p>{lang === 'sv' ? 'Ring oss för aktuella öppettider, menyer och priser:' : 'Please call us for current hours, menus and prices:'} <a className="underline" href="tel:+4644122215">044-12 22 15</a></p>
  </section>;
  return children;
}
