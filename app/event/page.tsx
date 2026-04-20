import EventPageClient from "./EventPageClient";
import { createPageMetadata } from "@/lib/metadata";
import { routeSeo } from "@/lib/seo";

export const metadata = createPageMetadata(routeSeo.event);

export default function EventPage() {
  return <EventPageClient />;
}
