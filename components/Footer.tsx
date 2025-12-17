import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Bowling Kristianstad</h3>
            <p className="text-gray-400">
              Din bowlinghall i Kristianstad för en rolig och spännande upplevelse!
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Kontakt</h3>
            <p className="text-gray-400">
              Telefon: 044-12 22 15<br />
              E-post: bowlingkristianstad@gmail.com<br />
              Adress: Karlavägen 2, Kristianstad
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Snabblänkar</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white font-medium transition-colors">Hem</Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white font-medium transition-colors">Priser</Link>
                </li>
                <li>
                  <Link href="/openinghours" className="hover:text-white font-medium transition-colors">Öppettider</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white font-medium transition-colors">Om Oss</Link>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/birthday" className="hover:text-white font-medium transition-colors">Kalas</Link>
                </li>
                <li>
                  <Link href="/event" className="hover:text-white font-medium transition-colors">Evenemang</Link>
                </li>
                <li>
                  <Link href="/results" className="hover:text-white font-medium transition-colors">Resultat</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bowling Kristianstad. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
}
