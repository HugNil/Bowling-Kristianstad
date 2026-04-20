import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

type PageSeo = {
  path: string;
  title: string;
  description: string;
  image: string;
};

export function createPageMetadata(seo: PageSeo): Metadata {
  const canonical = absoluteUrl(seo.path);

  return {
    title: {
      absolute: seo.title,
    },
    description: seo.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "sv_SE",
      url: canonical,
      siteName: SITE_NAME,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: seo.image,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} i Kristianstad`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    },
  };
}
