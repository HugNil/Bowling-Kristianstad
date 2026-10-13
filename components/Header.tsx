'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { getStrings } from '@/lib/strings';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1201px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  const path = usePathname();
  const { lang, setLang } = useLanguage();
  const t = getStrings(lang);
  const links = [
    ['/pricing', t.header.pricing], ['/openinghours', t.header.openingHours],
    ['/birthday', t.header.birthday], ['/event', t.header.event], ['/results', t.header.results],
  ];
  return <header className="hall-header" onKeyDown={event => {
    if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); }
  }}>
    <a className="skip-link" href="#main-content">{lang === 'sv' ? 'Hoppa till innehållet' : 'Skip to content'}</a>
    <div className="hall-nav">
      <Link href="/" className="wordmark" onClick={() => setOpen(false)} aria-label="Bowling Kristianstad, startsida"><Image src="/bowling-kristianstad-transparent.png" alt="Bowling Kristianstad" width={2172} height={724} sizes="(max-width: 420px) 145px, (max-width: 1200px) 180px, 200px" className="hall-logo" /></Link>
      <nav className="desktop-nav" aria-label={lang === 'sv' ? 'Huvudmeny' : 'Main navigation'}>
        {links.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</Link>)}
      </nav>
      <div className="nav-actions">
        <button className="language-switch" onClick={() => setLang(lang === 'sv' ? 'en' : 'sv')} aria-label={lang === 'sv' ? 'Switch to English' : 'Byt till svenska'}>{lang === 'sv' ? 'EN' : 'SV'}</button>
        <a className="hall-button nav-book" href="tel:+4644122215">{lang === 'sv' ? 'Boka bana' : 'Book a lane'} <span aria-hidden="true">↗</span></a>
        <button ref={menuButton} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? (lang === 'sv' ? 'Stäng' : 'Close') : (lang === 'sv' ? 'Meny' : 'Menu')} <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d={open ? 'M6 6l12 12M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16'} /></svg></button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label={lang === 'sv' ? 'Mobilmeny' : 'Mobile navigation'}>
      <Link href="/" aria-current={path === '/' ? 'page' : undefined} onClick={() => setOpen(false)}>{t.header.home}<span aria-hidden="true">↗</span></Link>
      {links.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></Link>)}
      <a className="mobile-nav-book" href="tel:+4644122215">{lang === 'sv' ? 'Boka bana' : 'Book a lane'}<span>044-12 22 15 ↗</span></a>
    </nav>}
  </header>;
}
