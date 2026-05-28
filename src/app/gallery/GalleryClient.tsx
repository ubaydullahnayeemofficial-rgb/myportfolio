"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { blurFor } from "@/lib/blurs";
import { ChevronLeft, ChevronRight, ExternalLink, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { ArabesqueBackdrop } from "@/components/effects/ArabesqueBackdrop";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/effects/ScrollReveal";
import { L } from "@/components/shared/L";
import type { YouTubeVideo } from "@/lib/youtube";
import type { GalleryImage } from "@/lib/data/gallery";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export function GalleryClient({
  videos,
  images,
  initialTab,
  initialPage,
}: {
  videos: YouTubeVideo[];
  images: GalleryImage[];
  initialTab: "images" | "videos";
  initialPage: number;
}) {
  const [tab, setTab] = useState<"images" | "videos">(initialTab);
  const [page, setPage] = useState(initialPage);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  const dataset = tab === "images" ? images : videos;
  const totalPages = Math.max(1, Math.ceil(dataset.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const pageSlice = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return dataset.slice(start, start + PAGE_SIZE);
  }, [dataset, safePage]);

  function switchTab(next: "images" | "videos") {
    setTab(next);
    setPage(1);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative section-pad overflow-hidden">
        <GradientBlob tone="emerald" size="xl" opacity={0.14} className="-top-40 -right-32" />
        <GradientBlob tone="gold" size="lg" opacity={0.10} className="bottom-10 -left-32" />
        <ArabesqueBackdrop className="text-emerald" />

        <div className="container-page grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="kicker">
              <L en="Gallery · A glimpse" bn="গ্যালারি · এক ঝলক" />
            </span>
            <h1 className="font-display text-6xl md:text-8xl mt-6 leading-[0.96] tracking-tight balance">
              <L
                en={<>The work, <span className="italic-display gradient-text">in moments</span>.</>}
                bn={<>কাজ, <span className="italic-display gradient-text">মুহূর্তে মুহূর্তে</span>।</>}
              />
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-ink-soft leading-relaxed pretty">
              <L
                en="Photographs from gatherings and quiet hours, alongside lectures and tilawah straight from the Ubaydullah Nayeem Official channel."
                bn="মাহফিল ও নীরব সময়ের কিছু ছবি — পাশাপাশি Ubaydullah Nayeem Official চ্যানেল থেকে সরাসরি ওয়াজ ও তিলাওয়াত।"
              />
            </p>
            <a
              href={site.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-emerald font-medium link-sweep"
            >
              <L en="Subscribe on YouTube" bn="ইউটিউবে সাবস্ক্রাইব করুন" />
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-y border-border bg-paper-2">
        <div className="container-page py-6 flex flex-wrap items-center gap-3">
          <TabButton active={tab === "images"} onClick={() => switchTab("images")}>
            <L en="Images" bn="ছবি" />
            <span className="numeral opacity-60">· {images.length}</span>
          </TabButton>
          <TabButton active={tab === "videos"} onClick={() => switchTab("videos")}>
            <L en="Videos" bn="ভিডিও" />
            <span className="numeral opacity-60">· {videos.length}</span>
          </TabButton>
          <div className="ml-auto text-[11px] tracking-[0.18em] uppercase text-ink-muted">
            <L
              en={`Showing ${pageSlice.length} of ${dataset.length}`}
              bn={`${dataset.length}টির মধ্যে ${pageSlice.length}টি দেখানো হচ্ছে`}
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad">
        <div className="container-page">
          {tab === "images" ? (
            <ImageGrid items={pageSlice as GalleryImage[]} onOpen={setLightboxImage} />
          ) : (
            <VideoGrid items={pageSlice as YouTubeVideo[]} onOpen={setActiveVideo} />
          )}

          {dataset.length > PAGE_SIZE && (
            <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
          )}

          {dataset.length === 0 && (
            <div className="text-center py-24 text-ink-muted">
              <L
                en="Nothing to show yet — check back soon, in shaa Allah."
                bn="এখনও কিছু দেখাবার নেই — ইন শা আল্লাহ শীঘ্রই আবার দেখুন।"
              />
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox onClose={() => setLightboxImage(null)}>
            <div className="relative w-[92vw] max-w-3xl aspect-[4/5] sm:aspect-[3/4] rounded-card-lg overflow-hidden">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                sizes="(min-width: 768px) 720px, 92vw"
                placeholder="blur"
                blurDataURL={blurFor(lightboxImage.src)}
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-paper/80 text-sm tracking-wide">
              <L en={lightboxImage.caption} bn={lightboxImage.captionBn} />
            </p>
          </Lightbox>
        )}
        {activeVideo && (
          <Lightbox onClose={() => setActiveVideo(null)}>
            <div className="relative w-[92vw] max-w-4xl aspect-video rounded-card-lg overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-paper/80 text-sm">
              <p className="font-display text-lg tracking-tight max-w-2xl truncate">
                {activeVideo.title}
              </p>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gold-bright link-sweep"
              >
                <L en="Watch on YouTube" bn="ইউটিউবে দেখুন" />
                <ExternalLink size={14} />
              </a>
            </div>
          </Lightbox>
        )}
      </AnimatePresence>
    </>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-colors",
        active
          ? "bg-emerald text-paper border-emerald"
          : "bg-paper border-border text-ink-soft hover:border-emerald/40 hover:text-emerald",
      )}
    >
      {children}
    </button>
  );
}

function ImageGrid({
  items,
  onOpen,
}: {
  items: GalleryImage[];
  onOpen: (img: GalleryImage) => void;
}) {
  return (
    <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {items.map((img) => (
        <StaggerItem key={img.src}>
          <button
            type="button"
            onClick={() => onOpen(img)}
            className="group relative w-full aspect-[3/4] rounded-card-lg overflow-hidden ring-1 ring-border bg-paper-2 hover:shadow-card-hover transition-shadow duration-500"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw"
              placeholder="blur"
              blurDataURL={blurFor(img.src)}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-emerald-deep/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <span className="absolute bottom-3 left-3 right-3 text-paper text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity text-left">
              <L en={img.caption} bn={img.captionBn} />
            </span>
          </button>
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}

function VideoGrid({
  items,
  onOpen,
}: {
  items: YouTubeVideo[];
  onOpen: (v: YouTubeVideo) => void;
}) {
  return (
    <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {items.map((v) => (
        <StaggerItem key={v.id}>
          <button
            type="button"
            onClick={() => onOpen(v)}
            className="group block w-full text-left"
          >
            <div className="relative aspect-video rounded-card overflow-hidden ring-1 ring-border bg-paper-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.thumbnail}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-emerald-deep/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-gold-bright/95 text-emerald-deep shadow-card group-hover:scale-110 transition-transform">
                  <Play size={16} fill="currentColor" />
                </span>
              </div>
              {v.isShort && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] tracking-[0.18em] uppercase bg-gold-bright text-emerald-deep font-medium">
                  Short
                </span>
              )}
            </div>
            <h3 className="mt-3 text-sm md:text-base font-medium leading-snug text-ink line-clamp-2 group-hover:text-emerald transition-colors">
              {v.title}
            </h3>
            {v.views > 0 && (
              <p className="mt-1 text-[11px] tracking-wider uppercase text-ink-muted">
                {formatViews(v.views)}
              </p>
            )}
          </button>
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Gallery pagination"
      className="mt-14 flex items-center justify-center gap-1.5"
    >
      <PageButton
        disabled={page <= 1}
        onClick={() => onChange(Math.max(1, page - 1))}
        ariaLabel="Previous page"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline ml-1">
          <L en="Prev" bn="পূর্ববর্তী" />
        </span>
      </PageButton>

      {numbers.map((n) => (
        <PageButton
          key={n}
          active={n === page}
          onClick={() => onChange(n)}
          ariaLabel={`Page ${n}`}
        >
          {n}
        </PageButton>
      ))}

      <PageButton
        disabled={page >= totalPages}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        ariaLabel="Next page"
      >
        <span className="hidden sm:inline mr-1">
          <L en="Next" bn="পরবর্তী" />
        </span>
        <ChevronRight size={16} />
      </PageButton>
    </nav>
  );
}

function PageButton({
  children,
  active,
  disabled,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center min-w-10 h-10 px-3 rounded-full text-sm border transition-colors",
        active
          ? "bg-emerald text-paper border-emerald"
          : "bg-paper border-border text-ink-soft hover:border-emerald/50 hover:text-emerald",
        disabled && "opacity-40 cursor-not-allowed hover:border-border hover:text-ink-soft",
      )}
    >
      {children}
    </button>
  );
}

function Lightbox({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-midnight/85 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 grid place-items-center w-10 h-10 rounded-full bg-paper/15 text-paper hover:bg-paper/25 transition-colors"
      >
        <X size={18} />
      </button>
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}
