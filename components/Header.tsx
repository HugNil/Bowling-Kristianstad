'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-indigo-200 transition-colors">
            Bowling Kristianstad
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
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

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-indigo-200 transition-colors">
              Hem
            </Link>
            <Link href="/pricing" className="hover:text-indigo-200 transition-colors">
              Priser
            </Link>
            <Link href="/about" className="hover:text-indigo-200 transition-colors">
              Om Oss
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link 
              href="/" 
              className="block py-2 hover:text-indigo-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hem
            </Link>
            <Link 
              href="/pricing" 
              className="block py-2 hover:text-indigo-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Priser
            </Link>
            <Link 
              href="/about" 
              className="block py-2 hover:text-indigo-200 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Om Oss
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
