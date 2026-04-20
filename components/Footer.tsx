'use client';

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getStrings } from '@/lib/strings';

export default function Footer() {
  const { lang } = useLanguage();
  const strings = getStrings(lang);
  const contact = strings.contact;
  const t = getStrings(lang);

  return (
    <footer className="bg-gray-800 text-white mt-auto" role="contentinfo" aria-label="Sidfot">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bowling Kristianstad</h3>
            <p className="text-gray-400">
              {lang === 'sv' 
                ? <>Din bowlinghall i Kristianstad för en<br />rolig och spännande upplevelse!</>
                : <>Your bowling alley in Kristianstad for<br />a fun and exciting experience!</>}
            </p>
          </div>
          
          <div itemScope itemType="https://schema.org/ContactPoint">
            <h3 className="text-xl font-bold mb-4">{lang === 'sv' ? 'Kontakt' : 'Contact'}</h3>
            <p className="text-gray-400">
              <span itemProp="contactType" className="sr-only">Customer service</span>
              {lang === 'sv' ? 'Telefon' : 'Phone'}: <a href={`tel:${contact.phone}`} className="underline" itemProp="telephone">{contact.phone}</a><br />
              {lang === 'sv' ? 'E-post' : 'Email'}: <a href={`mailto:${contact.email}`} className="underline" itemProp="email">{contact.email}</a><br />
              <span itemProp="areaServed" className="sr-only">SE</span>
              <span itemProp="availableLanguage" className="sr-only">sv</span>
              <span itemProp="availableLanguage" className="sr-only">en</span>
              {lang === 'sv' ? 'Adress' : 'Address'}: <span itemProp="address">{contact.addressLines.join(', ')}</span>
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{lang === 'sv' ? 'Snabblänkar' : 'Quick Links'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white font-medium transition-colors">{t.header.home}</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white font-medium transition-colors">{t.header.pricing}</Link>
                </li>
                <li>
                  <Link href="/openinghours" className="hover:text-white font-medium transition-colors">{t.header.openingHours}</Link>
                </li>
                {/*
                <li>
                  <Link href="/about" className="hover:text-white font-medium transition-colors">{t.header.about}</Link>
                </li>
                */}
              </ul>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/birthday" className="hover:text-white font-medium transition-colors">{t.header.birthday}</Link>
                </li>
                <li>
                  <Link href="/event" className="hover:text-white font-medium transition-colors">{t.header.event}</Link>
                </li>
                <li>
                  <Link href="/results" className="hover:text-white font-medium transition-colors">{t.header.results}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} 
            <Link href="/" className="hover:text-white transition-colors"> Bowling Kristianstad</Link>. 
            All rights reserved | 
            <Link href="https://hugo-nilsson.se/"target="_blank"rel="noopener noreferrer"className="hover:text-white transition-colors"> Hugo Nilsson </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
