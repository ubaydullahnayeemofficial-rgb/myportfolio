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
  const image = ogImage ?? "/main.jpeg";

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
    sameAs: [
      site.socials.facebook,
      site.socials.youtube,
      site.socials.x,
      site.socials.instagram,
    ],
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
      streetAddress: "Bijbi Market Jame Mosque",
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: site.name, url: baseUrl },
    datePublished: post.published_at,
    mainEntityOfPage: new URL(`/blog/${post.slug}`, baseUrl).toString(),
  };
}
