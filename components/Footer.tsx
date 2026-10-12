'use client';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { getStrings } from '@/lib/strings';
export default function Footer() {
  const { lang } = useLanguage();
  const { contact, header } = getStrings(lang);
  return <footer className="hall-footer"><div className="footer-main">
    <div><Link href="/" className="wordmark"><span>Bowling<span className="wordmark-dot">●</span></span><small>Kristianstad</small></Link><p>{lang === 'sv' ? 'Vi ses på banan.' : 'See you on the lanes.'}</p></div>
    <div><h2>{lang === 'sv' ? 'Boka & fråga' : 'Bookings & questions'}</h2><a className="footer-phone" href="tel:+4644122215">{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><p>{contact.addressLines.join(', ')}</p></div>
    <nav aria-label={lang === 'sv' ? 'Länkar i sidfoten' : 'Footer navigation'}><h2>{lang === 'sv' ? 'Hitta rätt' : 'Explore'}</h2><Link href="/pricing">{header.pricing}</Link><Link href="/openinghours">{header.openingHours}</Link><Link href="/birthday">{header.birthday}</Link><Link href="/event">{header.event}</Link><Link href="/results">{header.results}</Link></nav>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Bowling Kristianstad</span><a href="https://hugo-nilsson.se/" target="_blank" rel="noopener noreferrer">Webb: Hugo Nilsson</a></div></footer>;
}
