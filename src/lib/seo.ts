import type { Metadata } from "next";
import { site } from "./site";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

type PageMeta = {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
};

export function buildMetadata({ title, description, path = "/", ogImage }: PageMeta): Metadata {
  const url = new URL(path, baseUrl).toString();
  const desc = description ?? site.tagline;
  const image = ogImage ?? "/main.webp";

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title,
      description: desc,
      images: [{ url: image, width: 1080, height: 1080, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [image],
    },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.nameBn,
    jobTitle: "Porichalok (Director), Mu'allim",
    url: baseUrl,
    sameAs: [site.socials.facebook, site.socials.youtube],
    worksFor: {
      "@type": "EducationalOrganization",
      name: site.madrasah.name,
      address: site.madrasah.address,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka",
      addressCountry: "BD",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: baseUrl,
    inLanguage: ["en", "bn"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.madrasah.name,
    foundingDate: String(site.madrasah.founded),
    url: site.madrasah.site,
    address: {
      "@type": "PostalAddress",
      streetAddress: "340/A/2, South Jatrabari",
      addressLocality: "Jatrabari",
      addressRegion: "Dhaka",
      postalCode: "1204",
      addressCountry: "BD",
    },
    sameAs: [baseUrl],
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  published_at: string;
  updated_at?: string;
  category?: string;
  reading_minutes?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: new URL("/main.webp", baseUrl).toString(),
    author: {
      "@type": "Person",
      name: site.name,
      alternateName: site.nameBn,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: new URL("/icon.svg", baseUrl).toString(),
      },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at ?? post.published_at,
    articleSection: post.category,
    timeRequired: post.reading_minutes ? `PT${post.reading_minutes}M` : undefined,
    inLanguage: ["en", "bn"],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": new URL(`/blog/${post.slug}`, baseUrl).toString(),
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; href: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.href, baseUrl).toString(),
    })),
  };
}

export function faqSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function videoObjectSchema(video: {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.title,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.publishedAt,
    contentUrl: video.url,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    publisher: {
      "@type": "Person",
      name: site.name,
      url: baseUrl,
    },
  };
}

export function collectionPageSchema(meta: {
  name: string;
  description: string;
  path: string;
  numberOfItems?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: meta.name,
    description: meta.description,
    url: new URL(meta.path, baseUrl).toString(),
    isPartOf: { "@type": "WebSite", name: site.name, url: baseUrl },
    numberOfItems: meta.numberOfItems,
    inLanguage: ["en", "bn"],
  };
}
