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
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOpeningHours() {
      try {
        // Check if Firebase is configured
        if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) { // Sätt till ! för att hämta från firestore
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
    <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      {/* Hero Section */}
      <h1 className="text-5xl font-bold text-center mb-6 text-gray-800">
          Våra Öppettider
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Här hittar du våra aktuella öppettider för Bowling Kristianstad. Välkommen in för en rolig stund!
        </p>

      {/* About Content */}
      <section className="px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Opening Hours */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
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

          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Bra att veta!</h2>
            <p className="text-gray-600 mb-4">
              Vi förbehåller oss rätten att ändra öppettider vid helgdagar och speciella evenemang vid låg beläggning.<br /> Kontakta oss gärna för att få den senaste informationen.
            </p>
            <p className="text-gray-600 mb-4">
              Max antal spelare per bana är <mark className='bg-transparent font-bold '>5</mark> personer för att garantera en bra spelupplevelse för alla.<br /> Övriga personer i sällskapet är välkomna att kolla på uppifrån banområdet.
            </p>
            <p className="text-gray-600 mb-4">
              Vi har discobowling varje fredag från kl. 18:00 och lördagar/söndagar från kl. 14:00 tills stängning.<br /> Under discobowlingen är det hög musik och blinkande lampor, vilket kan påverka spelupplevelsen.
            </p>
            <p className="text-gray-600 mb-4">
              Kom ihåg att boka din bana i förväg, särskilt under helger och lov, för att säkerställa att ni får plats när ni vill spela.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-gradient-to-r from-red-800 to-rose-800 text-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Kontakta Oss</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Besöksadress</h3>
                <p>Karlavägen 2<br />291 XX Kristianstad</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Kontaktuppgifter</h3>
                <p>
                  Telefon: 044-12 22 15<br />
                  E-post: bowlingkristianstad@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
