'use client';
import Link from 'next/link';
import Image from 'next/image';
import FaqSection from '@/components/FaqSection';
import { useLanguage } from '@/lib/LanguageContext';
import { getStrings } from '@/lib/strings';
import { business } from '@/lib/seo';

export default function Home() {
  const { lang } = useLanguage();
  const sv = lang === 'sv';
  const { home, contact } = getStrings(lang);
  return <div className="hall-home">
    <section className="home-hero">
      <div className="home-hero-copy">
        <p className="eyebrow">Karlavägen 2 · Kristianstad</p>
        <h1>{sv ? <>Vi ses<br />på banan.</> : <>See you<br />on the lanes.</>}</h1>
        <p className="hero-description">{sv ? 'En runda med kompisarna. En match med familjen. Hos oss finns plats för både vinnarskallar och nybörjare.' : 'A game with friends. A match with family. There’s room here for competitive spirits and first-timers alike.'}</p>
        <div className="hero-actions"><a className="hall-button light" href="tel:+4644122215">{sv ? 'Ring och boka' : 'Call to book'} <span aria-hidden="true">↗</span></a><Link className="text-link" href="/pricing">{sv ? 'Se våra priser' : 'See our prices'}</Link></div>
        <div className="hero-footnote"><span className="lane-lines" aria-hidden="true" /><span>{sv ? 'Bowling. Precis som det ska vara.' : 'Bowling. Just as it should be.'}</span></div>
      </div>
      <div className="home-hero-photo"><Image src="/hero-bowling-lanes.jpg" alt={sv ? 'Käglor och träbanor i en bowlinghall' : 'Pins and wooden bowling lanes'} fill priority sizes="(max-width: 760px) 100vw, 56vw" className="object-cover" /><div className="photo-label">BOWLING KRISTIANSTAD <span aria-hidden="true">↙</span></div></div>
    </section>

    <div className="hall-quick-links">
      <a href="tel:+4644122215"><span className="eyebrow">{sv ? 'Boka din bana' : 'Book your lane'}</span><strong>044-12 22 15</strong><span aria-hidden="true">↗</span></a>
      <Link href="/openinghours"><span className="eyebrow">{sv ? 'Planera ditt besök' : 'Plan your visit'}</span><strong>{sv ? 'Öppettider' : 'Opening hours'}</strong><span aria-hidden="true">↗</span></Link>
      <Link href="/pricing"><span className="eyebrow">{sv ? 'Skohyran ingår alltid' : 'Shoe rental included'}</span><strong>{sv ? 'Priser & bowling' : 'Prices & bowling'}</strong><span aria-hidden="true">↗</span></Link>
    </div>

    <section className="hall-section home-gather">
      <div className="gather-intro"><p className="eyebrow">{sv ? 'En anledning att träffas' : 'A reason to get together'}</p><h2>{sv ? <>Lite tävling.<br /><em>Mycket umgänge.</em></> : <>A little competition.<br /><em>A lot of good company.</em></>}</h2><p>{sv ? 'Du behöver inte kunna slå en strike för att trivas här. Ta med familjen, utmana kollegorna eller samla hela gänget. Vi ordnar banan.' : 'You don’t need to bowl a strike to feel at home here. Bring the family, challenge your colleagues or gather your friends. We’ll sort out the lane.'}</p></div>
      <div className="occasion-list">
        {[
          { href: '/birthday', name: sv ? 'Barnkalas på banan' : 'Birthday parties', text: sv ? 'Bowling, mat och något att fira. Vi hjälper till med kalaset.' : 'Bowling, food and something to celebrate. Let us help with the party.' },
          { href: '/event', name: sv ? 'Hela gänget, hela hallen' : 'Your group, your hall', text: sv ? 'Samla jobbet eller vännerna för bowling och en bit mat.' : 'Bring colleagues or friends together for bowling and a bite to eat.' },
          { href: '/results', name: sv ? 'För dig som vill lite mer' : 'For the competitive ones', text: sv ? 'Föreningar, tävlingar och resultat. Hitta din nästa match.' : 'Clubs, competitions and results. Find your next match.' },
        ].map((item, index) => <Link className="occasion-row" key={item.href} href={item.href}><span className="occasion-number">0{index + 1}</span><div><h3>{item.name}</h3><p>{item.text}</p></div><span className="occasion-arrow" aria-hidden="true">↗</span></Link>)}
      </div>
    </section>

    <section className="home-social">
      <div className="social-photo"><Image src="/event-bowling-drinks.jpg" alt={sv ? 'Vänner som umgås mellan bowlingrundorna' : 'Friends spending time together between games'} fill sizes="(max-width: 760px) 100vw, 55vw" className="object-cover" /></div>
      <div className="social-copy"><p className="eyebrow">{sv ? 'En kväll tillsammans' : 'An evening together'}</p><h2>{sv ? <>Mer än<br />bara käglor.</> : <>More than<br />just pins.</>}</h2><p>{sv ? 'Det bästa med bowling händer ibland mellan slagen. Snacket, skratten och den där revanschen. Kombinera ert besök med mat – hör av er så planerar vi tillsammans.' : 'Sometimes the best part of bowling happens between turns. The chats, the laughs and that rematch. Add food to your visit – give us a call and we’ll plan it together.'}</p><Link className="text-link" href="/event">{sv ? 'Mat, fest & företagsevent' : 'Food, parties & company events'} <span aria-hidden="true">↗</span></Link></div>
    </section>

    <FaqSection title={sv ? 'Bra att veta innan du kommer.' : 'Before you visit.'} items={home.faqItems} contactPhone={contact.phone} />

    <section className="hall-section home-visit" id="hitta-hit"><div><p className="eyebrow">{sv ? 'Välkommen in' : 'Come on in'}</p><h2>{sv ? 'Vi finns i Kristianstad.' : 'Find us in Kristianstad.'}</h2><p>Karlavägen 2<br />291 54 Kristianstad</p><p>{sv ? 'Nära Kristianstad Arena. Ring oss för att boka en bana eller om du undrar över något.' : 'Near Kristianstad Arena. Call to book a lane or ask us anything.'}</p><a className="hall-button" href={business.mapUrl} target="_blank" rel="noopener noreferrer">{sv ? 'Visa vägbeskrivning' : 'Get directions'} <span aria-hidden="true">↗</span></a></div><iframe title={sv ? 'Karta till Bowling Kristianstad' : 'Map to Bowling Kristianstad'} src="https://www.google.com/maps?q=56.0234928,14.1632581&z=17&hl=sv&output=embed" width="100%" height="380" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>
  </div>;
}
