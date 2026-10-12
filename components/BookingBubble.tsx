'use client';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
export default function BookingBubble() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  if (pathname.startsWith('/admin')) return null;
  return <a className="mobile-booking" href="tel:+4644122215">{lang === 'sv' ? 'Ring och boka bana' : 'Call to book a lane'} <span>044-12 22 15 ↗</span></a>;
}
