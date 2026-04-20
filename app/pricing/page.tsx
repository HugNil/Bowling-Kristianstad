import PricingPageClient from "./PricingPageClient";
import { createFaqJsonLd } from "@/lib/faqSchema";
import { createPageMetadata } from "@/lib/metadata";
import { routeSeo } from "@/lib/seo";
import { stringsSv } from "@/lib/strings";

export const metadata = createPageMetadata(routeSeo.pricing);
const faqJsonLd = createFaqJsonLd(routeSeo.pricing.path, stringsSv.pricing.faqItems);

export default function PricingPage() {
  return (
    <>
      <PricingPageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
