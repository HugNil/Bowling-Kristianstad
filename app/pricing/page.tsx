'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Price } from '@/lib/types';

// Fallback prices if Firestore is not configured
const fallbackPrices: Price[] = [
  {
    id: '1',
    name: 'Vardagsbowling',
    description: 'Måndag - Fredag före 17:00',
    price: 150,
    duration: 'per timme'
  },
  {
    id: '2',
    name: 'Kvällsbowling',
    description: 'Vardagar efter 17:00',
    price: 200,
    duration: 'per timme'
  },
  {
    id: '3',
    name: 'Helgbowling',
    description: 'Lördag & Söndag',
    price: 250,
    duration: 'per timme'
  },
  {
    id: '4',
    name: 'Skolbowling',
    description: 'För skolor och föreningar',
    price: 120,
    duration: 'per timme'
  },
  {
    id: '5',
    name: 'Barnkalas',
    description: 'Inkluderar bowling, mat och dryck',
    price: 2500,
    duration: 'paket för 10 barn'
  },
  {
    id: '6',
    name: 'Företagsevent',
    description: 'Bowling och mingel för företag',
    price: 5000,
    duration: 'paket från'
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
        if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
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
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">{price.name}</h3>
                <p className="text-indigo-200">{price.description}</p>
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

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Boka Nu!</h2>
          <p className="text-gray-600 mb-6">
            Ring oss på <strong>044-XXX XX XX</strong> för att boka din bana eller skicka ett mail till{' '}
            <strong>info@bowlingkristianstad.se</strong>
          </p>
          <p className="text-sm text-gray-500">
            * Priserna kan variera beroende på säsong och tillgänglighet. Skoavgift tillkommer.
          </p>
        </div>
      </div>
    </div>
  );
}
