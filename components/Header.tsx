'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { getStrings } from '@/lib/strings';

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { lang, setLang } = useLanguage();
  const t = getStrings(lang);
  const links = [
    ['/pricing', t.header.pricing], ['/openinghours', t.header.openingHours],
    ['/birthday', t.header.birthday], ['/event', t.header.event], ['/results', t.header.results],
  ];
  return <header className="hall-header">
    <a className="skip-link" href="#main-content">{lang === 'sv' ? 'Hoppa till innehållet' : 'Skip to content'}</a>
    <div className="hall-nav">
      <Link href="/" className="wordmark" onClick={() => setOpen(false)} aria-label="Bowling Kristianstad, startsida"><span>Bowling<span className="wordmark-dot">●</span></span><small>Kristianstad</small></Link>
      <nav className="desktop-nav" aria-label={lang === 'sv' ? 'Huvudmeny' : 'Main navigation'}>
        {links.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</Link>)}
      </nav>
      <div className="nav-actions">
        <button className="language-switch" onClick={() => setLang(lang === 'sv' ? 'en' : 'sv')} aria-label={lang === 'sv' ? 'Switch to English' : 'Byt till svenska'}>{lang === 'sv' ? 'EN' : 'SV'}</button>
        <a className="hall-button nav-book" href="tel:+4644122215">{lang === 'sv' ? 'Boka bana' : 'Book a lane'} <span aria-hidden="true">↗</span></a>
        <button className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? (lang === 'sv' ? 'Stäng' : 'Close') : (lang === 'sv' ? 'Meny' : 'Menu')} <span aria-hidden="true">{open ? '×' : '☰'}</span></button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label={lang === 'sv' ? 'Mobilmeny' : 'Mobile navigation'}>
      <Link href="/" onClick={() => setOpen(false)}>{t.header.home}</Link>
      {links.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></Link>)}
      <a href="tel:+4644122215">{lang === 'sv' ? 'Boka på' : 'Book on'} 044-12 22 15</a>
    </nav>}
  </header>;
}
