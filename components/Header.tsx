'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { getStrings } from '@/lib/strings';

export default function Header({ backgroundImage }: { backgroundImage?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = getStrings(lang);

  const toggleLanguage = () => {
    setLang(lang === 'sv' ? 'en' : 'sv');
  };

  const headerStyle = backgroundImage
    ? {
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <header
      role="banner"
      style={headerStyle}
      className={`text-white sticky top-0 transition-colors duration-300 ${
        !backgroundImage ? 'bg-linear-to-r from-red-800 to-rose-800' : ''
      } z-50 shadow-lg`}
    >
      <nav className="container mx-auto px-4 py-8" aria-label="Huvudnavigation">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold hover:text-gray-300 transition-colors">
            Bowling Kristianstad
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded transition-colors"
            >
              {lang === 'sv' ? 'EN' : 'SV'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-gray-300 text-xl font-medium transition-colors">
              {t.header.home}
            </Link>
            <Link href="/pricing" className="hover:text-gray-300 text-xl font-medium transition-colors">
              {t.header.pricing}
            </Link>
            <Link href="/openinghours" className="hover:text-gray-300 text-xl font-medium transition-colors">
              {t.header.openingHours}
            </Link>
            {/*
            <Link href="/about" className="hover:text-gray-300 text-xl font-medium transition-colors">
              {t.header.about}
            </Link>
            */}
            <Link href="/birthday" className="hover:text-gray-300 text-xl font-medium transition-colors">
              {t.header.birthday}
            </Link>
            <Link href="/event" className="hover:text-gray-300 text-xl font-medium transition-colors">
              {t.header.event}
            </Link>
            <Link href="/results" className="hover:text-gray-300 text-xl font-medium transition-colors">
              {t.header.results}
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link 
              href="/" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.home}
            </Link>
            <Link 
              href="/pricing" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.pricing}
            </Link>
            {/*
            <Link 
              href="/about" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.about}
            </Link>
            */}
            <Link 
              href="/openinghours" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.openingHours}
            </Link>
            <Link 
              href="/birthday" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.birthday}
            </Link>
            <Link 
              href="/event" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.event}
            </Link>
            <Link 
              href="/results" 
              className="block py-2 hover:text-gray-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.results}
            </Link>
          </div>
        )}
      </nav>

      {/* Language toggle button - Desktop - Absolute positioned */}
      <button
        onClick={toggleLanguage}
        className="hidden md:block absolute top-8 right-4 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded transition-colors"
      >
        {lang === 'sv' ? 'EN' : 'SV'}
      </button>
    </header>
  );
}
