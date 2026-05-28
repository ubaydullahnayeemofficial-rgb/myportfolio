import type { Metadata } from "next";
import { Play, ExternalLink } from "lucide-react";
import { buildMetadata, collectionPageSchema, videoObjectSchema } from "@/lib/seo";
import { fetchYouTubeVideos } from "@/lib/youtube";
import { site } from "@/lib/site";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/effects/ScrollReveal";
import { L } from "@/components/shared/L";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Lectures",
  description:
    "Lectures, tilawah, and qira'at sessions from the Ubaydullah Nayeem Official YouTube channel — full sessions, recitations, and reflections.",
  path: "/lectures",
});

export const revalidate = 3600;

export default async function LecturesPage() {
  const videos = await fetchYouTubeVideos();
  const fullVideos = videos.filter((v) => !v.isShort);
  const shorts = videos.filter((v) => v.isShort);

  return (
    <>
      <JsonLd
        data={collectionPageSchema({
          name: "Lectures — Ubaydullah Nayeem",
          description:
            "Recorded lectures, tilawah, qira'at and dars from Ubaydullah Nayeem's YouTube channel.",
          path: "/lectures",
          numberOfItems: videos.length,
        })}
      />
      {fullVideos.slice(0, 5).map((v) => (
        <JsonLd key={v.id} data={videoObjectSchema(v)} />
      ))}
      <Breadcrumbs items={[{ name: "Lectures", nameBn: "ওয়াজ", href: "/lectures" }]} />
      {/* Hero */}
      <section className="relative section-pad overflow-hidden">
        <GradientBlob tone="emerald" size="xl" opacity={0.12} className="-top-32 -left-32" />
        <GradientBlob tone="gold" size="lg" opacity={0.10} className="-bottom-20 -right-20" />

        <div className="container-page grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="kicker">
              <L en="Lectures · Tilawah · Qira'at" bn="ওয়াজ · তিলাওয়াত · ক্বিরাত" />
            </span>
            <h1 className="font-display text-6xl md:text-8xl mt-6 leading-[0.96] tracking-tight balance">
              <L
                en={<>Sit with us, <span className="italic-display gradient-text">unhurried</span>.</>}
                bn={<>আমাদের সাথে বসুন, <span className="italic-display gradient-text">ধৈর্যের সাথে</span>।</>}
              />
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-ink-soft leading-relaxed pretty">
              <L
                en="Pulled straight from the Ubaydullah Nayeem Official YouTube channel — full sessions, recitations, and reflections, in his own voice."
                bn="সরাসরি Ubaydullah Nayeem Official ইউটিউব চ্যানেল থেকে — পূর্ণ মজলিস, তিলাওয়াত ও আলোচনা — তাঁরই কণ্ঠে।"
              />
            </p>
            <a
              href={site.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-emerald font-medium link-sweep"
            >
              <L en="Open the channel" bn="চ্যানেলে যান" />
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Full lectures */}
      <section className="section-pad bg-paper-2">
        <div className="container-page">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10 gap-6">
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                <L en="Sessions" bn="মজলিস" />
              </h2>
              <span className="text-xs tracking-[0.2em] uppercase text-ink-muted numeral">
                {fullVideos.length}{" "}
                <L en="entries" bn="টি ভিডিও" />
              </span>
            </div>
          </ScrollReveal>

          {fullVideos.length === 0 ? (
            <EmptyState />
          ) : (
            <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {fullVideos.map((v) => (
                <StaggerItem key={v.id}>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full rounded-card-lg bg-paper border border-border overflow-hidden hover:border-emerald/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="relative aspect-video bg-paper-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 grid place-items-center">
                        <span className="grid place-items-center w-12 h-12 rounded-full bg-gold-bright/95 text-emerald-deep shadow-card group-hover:scale-110 transition-transform">
                          <Play size={16} fill="currentColor" />
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg leading-snug tracking-tight group-hover:text-emerald transition-colors line-clamp-2">
                        {v.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-ink-muted">
                        <span>{formatDate(v.publishedAt)}</span>
                        {v.views > 0 && (
                          <>
                            <span>·</span>
                            <span className="numeral">{formatViews(v.views)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerReveal>
          )}
        </div>
      </section>

      {/* Shorts strip */}
      {shorts.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10 gap-6">
                <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                  <L en="Shorts" bn="শর্টস" />
                </h2>
                <span className="text-xs tracking-[0.2em] uppercase text-ink-muted numeral">
                  {shorts.length}{" "}
                  <L en="clips" bn="টি ক্লিপ" />
                </span>
              </div>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {shorts.map((v) => (
                <StaggerItem key={v.id}>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="relative aspect-[9/16] rounded-card overflow-hidden ring-1 ring-border bg-paper-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 to-transparent opacity-80" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] tracking-[0.18em] uppercase bg-gold-bright text-emerald-deep font-medium">
                        Short
                      </div>
                      <div className="absolute bottom-3 inset-x-3 text-paper text-xs leading-snug line-clamp-3">
                        {v.title}
                      </div>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-card-lg border border-border bg-paper p-10 text-center text-ink-muted">
      <p className="text-base">
        <L
          en="No lectures could be loaded right now. Please visit the channel directly."
          bn="এখন কোনো ভিডিও লোড করা গেল না। সরাসরি চ্যানেলে দেখুন।"
        />
      </p>
      <a
        href={site.socials.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-emerald font-medium link-sweep"
      >
        <L en="Open YouTube" bn="ইউটিউবে যান" /> <ExternalLink size={16} />
      </a>
    </div>
  );
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}
