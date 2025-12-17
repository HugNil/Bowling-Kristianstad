'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Price } from '@/lib/types';

// Fallback prices if Firestore is not configured
const fallbackPrices: Price[] = [
  {
    id: '1',
    name: 'Förmiddag',
    description: 'Måndag - Fredag före kl 16.00',
    price: 180,
    duration: 'per timme'
  },
  {
    id: '2',
    name: 'Eftermiddag',
    description: 'Måndag - Fredag mellan kl 16.00 - 18.00',
    price: 200,
    duration: 'per timme'
  },
  {
    id: '3',
    name: 'Kväll',
    description: 'Måndag - Torsdag efter kl 18.00',
    price: 240,
    duration: 'per timme'
  },
  {
    id: '4',
    name: 'Helg',
    description: 'Lördag - Söndag före kl 18.00',
    price: 240,
    duration: 'per timme'
  },
  {
    id: '5',
    name: 'Helg',
    description: 'Fredag - Lördag efter kl 18.00',
    price: 275,
    duration: 'per timme'
  },
  {
    id: '6',
    name: 'Skolor',
    description: 'Vardagar före kl 16.00',
    price: 140,
    duration: 'per timme, minst 5 banor för bokning utanför öppettider'
  }
];

export default function PricingPage() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        // Check if Firebase is configured
        if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) { // Sätt till ! för att hämta från firestore
          console.log('Firebase not configured, using fallback prices');
          setPrices(fallbackPrices);
          setLoading(false);
          return;
        }

        const pricesCol = collection(db, 'prices');
        const pricesSnapshot = await getDocs(pricesCol);
        const pricesList = pricesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Price));

        if (pricesList.length > 0) {
          setPrices(pricesList);
        } else {
          // Use fallback if no prices in Firestore
          setPrices(fallbackPrices);
        }
      } catch (err) {
        console.error('Error fetching prices:', err);
        setError('Could not load prices from database, showing default prices');
        setPrices(fallbackPrices);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Laddar priser...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6 text-gray-800">
          Våra Priser
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Vi erbjuder konkurrenskraftiga priser för alla tillfällen. Kontakta oss för större bokningar och specialerbjudanden.
        </p>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-8 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prices.map((price) => (
            <div 
              key={price.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow overflow-hidden"
            >
              <div className="bg-gray-800 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{price.name}</h3>
                <p>{price.description}</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {price.price} kr
                </div>
                {price.duration && (
                  <div className="text-gray-600">{price.duration}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-red-800 to-rose-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-4">Boka Nu!</h2>
          <p className="mb-6">
            Ring oss på <strong>044-12 22 15</strong> för att boka din bana eller skicka ett mail till{' '}
            <strong>bowlingkristianstad@gmail.com</strong>
          </p>
          <p className="text-sm">
            Skohyra ingår i priset. Vi tar emot Swish och .
          </p>
        </div>
      </div>
    </div>
  );
}
