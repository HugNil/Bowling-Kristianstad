'use client';

import { getStrings } from "@/lib/strings";
import { useLanguage } from "@/lib/LanguageContext";

export default function BookingBubble() {
  const { lang } = useLanguage();
  const { contact } = getStrings(lang);
  const phoneHref = `tel:${contact.phone.replace(/\s|-/g, "")}`;

  return (
    <aside
      aria-label={lang === "sv" ? "Snabb bokning" : "Quick booking"}
      className="fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)]"
    >
      <a
        href={phoneHref}
        className="group flex items-center gap-3 rounded-lg bg-white/95 px-4 py-3 text-gray-900 shadow-xl ring-1 ring-black/10 backdrop-blur transition hover:bg-white hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-800 text-lg text-white transition group-hover:bg-red-900">
          <span aria-hidden="true">☎</span>
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold">
            {lang === "sv" ? "Boka nu" : "Book now"}
          </span>
          <span className="block text-sm font-semibold text-red-800">
            {contact.phone}
          </span>
        </span>
      </a>
    </aside>
  );
}
