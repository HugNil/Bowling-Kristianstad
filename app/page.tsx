import HomePageClient from "./HomePageClient";
import { createFaqJsonLd } from "@/lib/faqSchema";
import { createPageMetadata } from "@/lib/metadata";
import { routeSeo } from "@/lib/seo";
import { stringsSv } from "@/lib/strings";

export const metadata = createPageMetadata(routeSeo.home);
const faqJsonLd = createFaqJsonLd(routeSeo.home.path, stringsSv.home.faqItems);

export default function Home() {
  return (
    <>
      <HomePageClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
