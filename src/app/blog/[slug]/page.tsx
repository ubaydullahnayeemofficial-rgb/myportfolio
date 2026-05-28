import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { buildMetadata, articleSchema } from "@/lib/seo";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { formatBnDate } from "@/lib/utils";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { ArabesqueBackdrop } from "@/components/effects/ArabesqueBackdrop";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { Prose } from "@/components/shared/Prose";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { fallbackPosts } from "@/lib/data/posts";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  return fallbackPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) return buildMetadata({ title: "Not found", path: `/blog/${slug}` });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, 3);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          published_at: post.published_at,
          category: post.category,
          reading_minutes: post.reading_minutes,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Journal", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Journal", nameBn: "জার্নাল", href: "/blog" },
          { name: post.title, nameBn: post.title_bn ?? post.title, href: `/blog/${post.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative section-pad overflow-hidden">
        <GradientBlob tone="emerald" size="xl" opacity={0.10} className="-top-32 -left-32" />
        <GradientBlob tone="gold" size="lg" opacity={0.10} className="-bottom-20 -right-20" />
        <ArabesqueBackdrop className="text-emerald" />

        <div className="container-page max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-emerald link-sweep"
          >
            <ArrowLeft size={14} /> All entries
          </Link>

          <div className="mt-10 flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-ink-muted">
            <span className="px-3 py-1 rounded-full border border-border bg-paper">
              {post.category}
            </span>
            <span>{formatBnDate(post.published_at)}</span>
            <span>·</span>
            <span>{post.reading_minutes} min read</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl mt-8 leading-[0.98] tracking-tight balance">
            {post.title}
          </h1>
          {post.title_bn && (
            <p className="font-bn text-2xl md:text-3xl text-emerald mt-5">{post.title_bn}</p>
          )}
          <p className="mt-8 text-xl text-ink-soft leading-relaxed pretty max-w-2xl">
            {post.excerpt}
          </p>
        </div>
      </section>

      <div className="container-page max-w-3xl pb-24">
        <Prose content={post.content} />

        <div className="mt-16 pt-10 border-t border-border flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-ink-muted">Written by</p>
            <p className="font-display text-2xl tracking-tight mt-1">{site.name}</p>
            <p className="text-sm text-ink-muted mt-0.5">{site.role}</p>
          </div>
          <MagneticButton href={site.whatsappLink} variant="primary" target="_blank" rel="noopener noreferrer">
            Reply on WhatsApp
          </MagneticButton>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-pad bg-paper-2 border-t border-border">
          <div className="container-page">
            <ScrollReveal>
              <span className="kicker">Keep reading</span>
              <h2 className="font-display text-4xl md:text-5xl mt-6 leading-tight tracking-tight">
                Other entries from the journal.
              </h2>
            </ScrollReveal>

            <div className="mt-12 grid md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block h-full rounded-card-lg border border-border bg-paper p-7 hover:border-emerald/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">{p.category}</div>
                  <h3 className="font-display text-2xl mt-4 leading-tight tracking-tight group-hover:text-emerald transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed line-clamp-3">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-emerald">
                    Read <ArrowUpRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
