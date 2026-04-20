import BirthdayPageClient from "./BirthdayPageClient";
import { createFaqJsonLd } from "@/lib/faqSchema";
import { createPageMetadata } from "@/lib/metadata";
import { routeSeo } from "@/lib/seo";
import { stringsSv } from "@/lib/strings";

export const metadata = createPageMetadata(routeSeo.birthday);
const faqJsonLd = createFaqJsonLd(routeSeo.birthday.path, stringsSv.birthday.faqItems);

export default function BirthdayPage() {
  return (
    <>
      <BirthdayPageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
