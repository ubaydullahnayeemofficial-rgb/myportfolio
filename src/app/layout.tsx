import type { Metadata, Viewport } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema, websiteSchema, organizationSchema } from "@/lib/seo";
import { site } from "@/lib/site";

/* ---------- Fonts ----------
 * One family per script:
 *   - English: Inter (top-class modern sans, used by Vercel, Linear, etc.)
 *   - Bangla:  Hind Siliguri (the most widely-used modern Bengali web font
 *              in 2025; clean strokes, no clipping on i/u/r/e marks).
 *
 * Single-script per locale means we never load a font we won't paint,
 * and there's no "Nayeem looking like Naveem" italic-y confusion.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bn",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ---------- Metadata ---------- */

const TITLE_DEFAULT = `${site.name} — Hafiz · Qari · Porichalok`;
const KEYWORDS = [
  "Ubaydullah Nayeem",
  "উবায়দুল্লাহ নাঈম",
  "Baitul Quran wa Assunnah Madrasah",
  "Hifzul Quran Girls Madrasah",
  "Bangladesh madrasah",
  "hifz program Dhaka",
  "Jatrabari madrasah",
  "Qari Bangladesh",
  "qira'at maqamat",
  "Hafiz Qari Bangladesh",
  "Islamic education Bangladesh",
  "Mahadul Qira'at Bangladesh",
];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE_DEFAULT,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  keywords: KEYWORDS,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  applicationName: site.name,
  category: "Education",
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    url: site.url,
    siteName: site.name,
    title: TITLE_DEFAULT,
    description: site.tagline,
    images: [
      {
        url: "/main.webp",
        width: 1080,
        height: 1080,
        alt: `${site.name} — Hafiz, Qari and Porichalok of Baitul Quran wa Assunnah Madrasah`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: ["/main.webp"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "bn-BD": "/",
      "en-US": "/",
      "x-default": "/",
    },
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `${site.name} — Journal` }],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF6EE" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1410" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const prePaintScript = `(function(){
  try {
    var l = localStorage.getItem('un-locale');
    document.documentElement.setAttribute('data-locale', (l === 'en' || l === 'bn') ? l : 'bn');
    var t = localStorage.getItem('un-theme');
    if (t === 'dark' || t === 'light') document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-locale', 'bn');
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      data-locale="bn"
      suppressHydrationWarning
      className={`${inter.variable} ${hindSiliguri.variable} h-full`}
    >
      <head>
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <script dangerouslySetInnerHTML={{ __html: prePaintScript }} />
      </head>
      <body className="min-h-full flex flex-col font-body antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={personSchema()} />
        <JsonLd data={websiteSchema()} />
        <JsonLd data={organizationSchema()} />
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
