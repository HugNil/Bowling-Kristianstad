'use client';

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getStrings } from '@/lib/strings';

export default function Footer() {
  const { lang } = useLanguage();
  const strings = getStrings(lang);
  const contact = strings.contact;

  return (
    <footer className="bg-gray-800 text-white mt-auto">
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
          
          <div>
            <h3 className="text-xl font-bold mb-4">{lang === 'sv' ? 'Kontakt' : 'Contact'}</h3>
            <p className="text-gray-400">
              {lang === 'sv' ? 'Telefon' : 'Phone'}: <a href={`tel:${contact.phone}`} className="underline">{contact.phone}</a><br />
              {lang === 'sv' ? 'E-post' : 'Email'}: <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a><br />
              {lang === 'sv' ? 'Adress' : 'Address'}: {contact.addressLines.join(', ')}
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">{lang === 'sv' ? 'Snabblänkar' : 'Quick Links'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white font-medium transition-colors">{lang === 'sv' ? 'Hem' : 'Home'}</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white font-medium transition-colors">{lang === 'sv' ? 'Priser' : 'Pricing'}</Link>
                </li>
                <li>
                  <Link href="/openinghours" className="hover:text-white font-medium transition-colors">{lang === 'sv' ? 'Öppettider' : 'Opening Hours'}</Link>
                </li>
                {/*
                <li>
                  <Link href="/about" className="hover:text-white font-medium transition-colors">{lang === 'sv' ? 'Om Oss' : 'About'}</Link>
                </li>
                */}
              </ul>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/birthday" className="hover:text-white font-medium transition-colors">{lang === 'sv' ? 'Kalas' : 'Party'}</Link>
                </li>
                <li>
                  <Link href="/event" className="hover:text-white font-medium transition-colors">{lang === 'sv' ? 'Evenemang' : 'Events'}</Link>
                </li>
                <li>
                  <Link href="/results" className="hover:text-white font-medium transition-colors">{lang === 'sv' ? 'Resultat' : 'Results'}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bowling Kristianstad | <Link href="https://hugonilsson.vercel.app/" className="hover:text-white font-medium transition-colors">Hugo Nilsson</Link></p>
        </div>
      </div>
    </footer>
  );
}
