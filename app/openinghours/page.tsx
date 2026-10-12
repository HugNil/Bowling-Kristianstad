import { ContentBoundary } from "@/lib/ContentContext";
import OpeningHoursPageClient from "./OpeningHoursPageClient";
import { createPageMetadata } from "@/lib/metadata";
import { routeSeo } from "@/lib/seo";

export const metadata = createPageMetadata(routeSeo.openingHours);

export default function OpeningHoursPage() {
  return <ContentBoundary><OpeningHoursPageClient /></ContentBoundary>;
}
