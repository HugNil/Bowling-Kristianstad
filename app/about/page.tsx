'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { OpeningHours } from '@/lib/types';
import { CldImage } from 'next-cloudinary';

// Fallback opening hours if Firestore is not configured
const fallbackHours: OpeningHours[] = [
  { id: '1', day: 'Måndag', hours: '09:30 - 20:00', isOpen: true },
  { id: '2', day: 'Tisdag', hours: '11:00 - 20:00', isOpen: true },
  { id: '3', day: 'Onsdag', hours: '09:30 - 20:00', isOpen: true },
  { id: '4', day: 'Torsdag', hours: '11:00 - 20:00', isOpen: true },
  { id: '5', day: 'Fredag', hours: '14:00 - 19:00', isOpen: true },
  { id: '6', day: 'Lördag', hours: '13:00 - 19:00', isOpen: true },
  { id: '7', day: 'Söndag', hours: '13:00 - 18:00', isOpen: true },
];

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Om Bowling Kristianstad</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Din favoritbowlinghall i hjärtat av Kristianstad
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Vår Historia</h2>
            <p className="text-gray-600 mb-4">
              Bowling Kristianstad har varit en del av stadens underhållningsliv i många år. Vi är stolta över att erbjuda en välkomnande och trivsam miljö där familjer, vänner och företag kan samlas för roliga och minnesvärda stunder.
            </p>
            <p className="text-gray-600 mb-4">
              Med våra moderna bowlingbanor och utrustning garanterar vi en fantastisk spelupplevelse för både nybörjare och erfarna spelare.
            </p>
            <p className="text-gray-600 mb-4">
              Utöver bowling erbjuder vi möjlighet att boka fest, kalas och andra speciella tillfällen. För barnkalas serverar vi enklare mat som hamburgare eller korv, anpassat för de yngre gästerna.
            </p>
            <p className="text-gray-600">
              Vid fester och företagsevent ordnar vi maten genom catering eller pizza, vilket gör det enkelt att skräddarsy arrangemanget efter önskemål.
            </p>
          </div>

          {/* Image section with Cloudinary fallback */}
          {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
            <div className="rounded-lg overflow-hidden shadow-lg">
              <CldImage
                width="960"
                height="600"
                src="bowling-alley"
                alt="Bowling Kristianstad interior"
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="mb-12 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-lg overflow-hidden shadow-lg h-96 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🎳</div>
                <p className="text-xl">Moderna Bowlingbanor</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
