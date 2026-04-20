import ResultsPageClient from "./ResultsPageClient";
import { createPageMetadata } from "@/lib/metadata";
import { routeSeo } from "@/lib/seo";

export const metadata = createPageMetadata(routeSeo.results);

export default function ResultsPage() {
  return <ResultsPageClient />;
}
