'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { OpeningHours } from '@/lib/types';
import { CldImage } from 'next-cloudinary';
import { getStrings } from '@/lib/strings';
import { useLanguage } from '@/lib/LanguageContext';

// Fallback opening hours if Firestore is not configured
const fallbackHours: OpeningHours[] = [
  { id: '1', day: 'Måndag', hours: '12:00 - 22:00', isOpen: true },
  { id: '2', day: 'Tisdag', hours: '12:00 - 22:00', isOpen: true },
  { id: '3', day: 'Onsdag', hours: '12:00 - 22:00', isOpen: true },
  { id: '4', day: 'Torsdag', hours: '12:00 - 22:00', isOpen: true },
  { id: '5', day: 'Fredag', hours: '12:00 - 01:00', isOpen: true },
  { id: '6', day: 'Lördag', hours: '10:00 - 01:00', isOpen: true },
  { id: '7', day: 'Söndag', hours: '10:00 - 22:00', isOpen: true },
];

export default function AboutPage() {
  const { lang } = useLanguage();
  const { event, contact } = getStrings(lang);
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOpeningHours() {
      try {
        // Check if Firebase is configured
        if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
          console.log('Firebase not configured, using fallback hours');
          setOpeningHours(fallbackHours);
          setLoading(false);
          return;
        }

        const hoursCol = collection(db, 'openingHours');
        const hoursSnapshot = await getDocs(hoursCol);
        const hoursList = hoursSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as OpeningHours));

        if (hoursList.length > 0) {
          // Sort by day of week
          const dayOrder = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
          hoursList.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
          setOpeningHours(hoursList);
        } else {
          setOpeningHours(fallbackHours);
        }
      } catch (err) {
        console.error('Error fetching opening hours:', err);
        setOpeningHours(fallbackHours);
      } finally {
        setLoading(false);
      }
    }

    fetchOpeningHours();
  }, []);

  return (
    <div className="bg-linear-to-r from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-900 to-purple-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">{event.heroTitle}</h1>
          <p className="text-xl max-w-2xl mx-auto">
            {event.heroSubtitle}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Vår Historia</h2>
            <p className="text-gray-600 mb-4">
              Bowling Kristianstad har varit en del av stadens underhållningsliv sedan många år. Vi är stolta över att erbjuda en modern och välkomnande miljö där familjer, vänner och företag kan samlas för roliga stunder.
            </p>
            <p className="text-gray-600 mb-4">
              Med våra moderna bowlingbanor och toppmoderna utrustning garanterar vi en fantastisk spelupplevelse för både nybörjare och erfarna spelare.
            </p>
            <p className="text-gray-600">
              Utöver bowling erbjuder vi även en restaurang med god mat och dryck, samt möjlighet att boka för företagsevent, barnkalas och andra speciella tillfällen.
            </p>
          </div>

          {/* Image section with Cloudinary fallback */}
          {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
            <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
              <CldImage
                width="960"
                height="600"
                src="bowling-alley"
                alt="Bowling Kristianstad interior"
                className="w-full h-auto"
              />
            </div>
          ) : (
            <div className="mb-12 bg-linear-to-r from-indigo-900 to-purple-900 rounded-lg overflow-hidden shadow-lg h-96 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🎳</div>
                <p className="text-xl">Moderna Bowlingbanor</p>
              </div>
            </div>
          )}

          {/* Opening Hours */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Öppettider
            </h2>
            {loading ? (
              <div className="text-center text-gray-600">Laddar öppettider...</div>
            ) : (
              <div className="space-y-3">
                {openingHours.map((hours) => (
                  <div 
                    key={hours.id}
                    className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="font-semibold text-gray-800">{hours.day}</span>
                    <span className={hours.isOpen ? 'text-gray-600' : 'text-red-600'}>
                      {hours.isOpen ? hours.hours : 'Stängt'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-linear-to-r from-indigo-900 to-purple-900 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{contact.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">{contact.addressTitle}</h3>
                <p className="whitespace-pre-line">{contact.addressLines.join("\n")}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">{contact.contactTitle}</h3>
                <p className="whitespace-pre-line">{`${contact.phoneLabel}: ${contact.phone}\n${contact.emailLabel}: ${contact.email}`}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
