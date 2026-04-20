import AboutPageClient from "./AboutPageClient";
import { createPageMetadata } from "@/lib/metadata";
import { routeSeo } from "@/lib/seo";

export const metadata = createPageMetadata(routeSeo.about);

export default function AboutPage() {
  return <AboutPageClient />;
}
