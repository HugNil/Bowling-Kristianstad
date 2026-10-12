'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'sv' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('sv');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved === 'sv' || saved === 'en') {
        // Restore the browser preference only after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState(saved);
      }
    } catch { /* Storage may be disabled by the browser. */ }
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try { localStorage.setItem('language', newLang); } catch { /* Language still works for this visit. */ }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return { lang: 'sv' as const, setLang: () => {} };
  }
  return context;
}
