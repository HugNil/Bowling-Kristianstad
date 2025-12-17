import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bowling Kristianstad</h3>
            <p className="text-gray-400">
              Din bowlinghall i Kristianstad för rolig och spännande upplevelser!
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Kontakt</h3>
            <p className="text-gray-400">
              Telefon: 044-XXX XX XX<br />
              E-post: info@bowlingkristianstad.se<br />
              Adress: Bowlinggatan 1, Kristianstad
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Snabblänkar</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Hem</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">Priser</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Om Oss</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bowling Kristianstad. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
}
