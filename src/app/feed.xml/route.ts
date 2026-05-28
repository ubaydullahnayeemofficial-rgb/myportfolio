import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const revalidate = 3600;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllPosts();
  const updated = posts.length
    ? new Date(posts[0].published_at).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${baseUrl}/blog/${p.slug}`;
      return `
    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
      <category>${escape(p.category)}</category>
      <description><![CDATA[${p.excerpt}]]></description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)} — Journal</title>
    <link>${baseUrl}/blog</link>
    <description>${escape(site.tagline)}</description>
    <language>en-bn</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
