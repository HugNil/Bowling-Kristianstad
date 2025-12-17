import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Välkommen till Bowling Kristianstad
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Upplev den bästa bowlingen i Kristianstad med moderna banor och fantastisk atmosfär
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors"
            >
              Se Priser
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-900 transition-colors"
            >
              Om Oss
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Varför Välja Oss?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎳</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Moderna Banor</h3>
              <p className="text-gray-600">
                Våra bowlingbanor är utrustade med den senaste teknologin för en optimal spelupplevelse.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Familjevänligt</h3>
              <p className="text-gray-600">
                Perfekt för hela familjen! Vi har bowling för alla åldrar och erfarenhetsnivåer.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🍕</div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Mat & Dryck</h3>
              <p className="text-gray-600">
                Njut av god mat och dryck från vår restaurang medan du bowlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Redo att Börja Bowla?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Boka din bana idag och upplev den bästa bowlingen i Kristianstad!
          </p>
          <Link
            href="/pricing"
            className="bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors inline-block"
          >
            Se Våra Priser
          </Link>
        </div>
      </section>
    </div>
  );
}
