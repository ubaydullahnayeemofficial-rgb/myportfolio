import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blurFor } from "@/lib/blurs";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata, collectionPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { L } from "@/components/shared/L";
import { getAllPosts } from "@/lib/blog";
import { formatBnDate } from "@/lib/utils";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { ArabesqueBackdrop } from "@/components/effects/ArabesqueBackdrop";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/effects/ScrollReveal";

export const metadata: Metadata = buildMetadata({
  title: "Journal",
  description:
    "Field notes from the work itself — Islamic education, family rhythms, character formation, and the small uncelebrated decisions that shape an institution.",
  path: "/blog",
});

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: "Journal — Ubaydullah Nayeem",
          description:
            "Field notes on Islamic education, hifz, qira'at, family rhythms, and the small uncelebrated decisions that shape an institution.",
          path: "/blog",
          numberOfItems: posts.length,
        })}
      />
      <Breadcrumbs items={[{ name: "Journal", nameBn: "জার্নাল", href: "/blog" }]} />
      {/* Hero */}
      <section className="relative section-pad overflow-hidden">
        <GradientBlob tone="emerald" size="xl" opacity={0.12} className="-top-40 -right-32" />
        <ArabesqueBackdrop className="text-emerald" />

        <div className="container-page grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="kicker">
                <L en="Journal" bn="জার্নাল" />
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="font-display text-6xl md:text-8xl mt-6 leading-[1] tracking-tight balance">
                <L
                  en={<>Field notes from <span className="italic-display gradient-text">the work itself</span>.</>}
                  bn={<>কাজের মাঠ থেকে <span className="italic-display gradient-text">কিছু টোকা</span>।</>}
                />
              </h1>
            </ScrollReveal>
          </div>
          <ScrollReveal className="lg:col-span-5" delay={0.15}>
            <p className="text-lg text-ink-soft leading-relaxed pretty">
              <L
                en="Short, practical, written on the side of teaching. Islamic education, family rhythms, character formation, and the small decisions that quietly shape an institution."
                bn="ছোট, প্রায়োগিক, পড়ানোর ফাঁকে লেখা। ইসলামি শিক্ষা, পারিবারিক ছন্দ, চরিত্র গঠন, এবং নীরবে প্রতিষ্ঠান গড়ে তোলা ছোট ছোট সিদ্ধান্ত।"
              />
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="border-t border-border">
          <div className="container-page py-16">
            <ScrollReveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid lg:grid-cols-12 gap-10 items-start"
              >
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-muted">
                    <span className="px-3 py-1 rounded-full bg-emerald/10 text-emerald font-medium">
                      <L en="Featured" bn="বিশেষ" />
                    </span>
                    <span>{featured.category}</span>
                    <span>·</span>
                    <span>{formatBnDate(featured.published_at)}</span>
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.98] tracking-tight balance group-hover:text-emerald transition-colors">
                    {featured.title}
                  </h2>
                  <p className="font-bn text-lg text-emerald mt-3">{featured.title_bn}</p>
                  <p className="mt-6 text-lg text-ink-soft leading-relaxed pretty max-w-xl">
                    {featured.excerpt}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-emerald font-medium link-sweep">
                    <L en="Read the entry" bn="পড়ুন" /> <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <div className="aspect-[4/5] rounded-card-lg overflow-hidden relative ring-1 ring-border shadow-card group-hover:shadow-card-hover transition-shadow duration-500">
                    <Image
                      src="/1.webp"
                      alt={`Featured journal entry: ${featured.title}`}
                      fill
                      sizes="(min-width: 1024px) 420px, 90vw"
                      placeholder="blur"
                      blurDataURL={blurFor("/1.webp")}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-emerald-deep/85 via-emerald-deep/30 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-paper flex items-end justify-between">
                      <div>
                        <div className="font-display text-6xl md:text-7xl leading-none">
                          {featured.reading_minutes}
                        </div>
                        <div className="mt-1 text-[10px] tracking-[0.22em] uppercase opacity-80">
                          <L en="min read" bn="মিনিট পড়া" />
                        </div>
                      </div>
                      <span className="text-[10px] tracking-[0.22em] uppercase opacity-80">
                        <L en="From the journal" bn="জার্নাল থেকে" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="border-y border-border bg-paper-2">
        <div className="container-page py-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-xs tracking-[0.2em] uppercase text-ink-muted mr-1">
            <L en="Categories" bn="বিভাগসমূহ" />
          </span>
          {categories.map((c) => (
            <span
              key={c}
              className="px-4 py-1.5 rounded-full border border-border bg-paper"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad">
        <div className="container-page">
          <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p) => (
              <StaggerItem key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group h-full block rounded-card-lg border border-border bg-paper-2 p-8 hover:bg-paper hover:border-emerald/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-muted">
                    <span>{p.category}</span>
                    <span>·</span>
                    <span>
                      {p.reading_minutes}{" "}
                      <L en="min" bn="মিনিট" />
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mt-5 leading-tight tracking-tight group-hover:text-emerald transition-colors">
                    <L en={p.title} bn={p.title_bn ?? p.title} />
                  </h3>
                  <p className="mt-4 text-sm text-ink-soft leading-relaxed pretty line-clamp-4">{p.excerpt}</p>
                  <div className="mt-5 text-xs text-ink-muted">{formatBnDate(p.published_at)}</div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
