import Image from "next/image";
import Link from "next/link";
import { blurFor } from "@/lib/blurs";
import { ArrowUpRight, GraduationCap, Users, BookMarked, Heart } from "lucide-react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { madrasah } from "@/lib/data/madrasah";
import { L } from "@/components/shared/L";

const icons = [GraduationCap, Users, BookMarked, Heart];

export function MadrasahPreview() {
  return (
    <section className="relative section-pad overflow-hidden">
      <GradientBlob tone="emerald" size="xl" opacity={0.06} className="-top-32 -right-32" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12 items-stretch mb-16">
          <ScrollReveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] lg:aspect-[4/4.6] rounded-card-lg overflow-hidden ring-1 ring-border shadow-card">
              <Image
                src="/1.webp"
                alt="Hafiz Qari Ubaydullah Nayeem delivering a public lecture from the minbar"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                placeholder="blur"
                blurDataURL={blurFor("/1.webp")}
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-emerald-deep/10 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-paper">
                <p className="text-[10px] tracking-[0.22em] uppercase opacity-80">
                  <L en="From the minbar" bn="মিনবার থেকে" />
                </p>
                <p className="font-display italic-display text-2xl md:text-3xl mt-2 leading-snug text-gold-bright">
                  <L
                    en={<>&ldquo;The Quran sets the rhythm. Everything else is downstream.&rdquo;</>}
                    bn={<>&ldquo;কুরআন ছন্দ ঠিক করে দেয় — বাকি সবকিছু এর পরে।&rdquo;</>}
                  />
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7 flex flex-col justify-end">
            <ScrollReveal>
              <span className="kicker">
                <L en="The Madrasah" bn="মাদরাসা" />
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1.04] tracking-tight balance">
                <L
                  en={<>A school built around <span className="italic-display gradient-text">tilawah</span>, not the other way around.</>}
                  bn={<>একটি মাদরাসা — <span className="italic-display gradient-text">তিলাওয়াতকে কেন্দ্র করে</span> গড়া।</>}
                />
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-8 text-lg text-ink-soft leading-relaxed pretty max-w-xl">
                <L en={madrasah.intro} bn={madrasah.introBn ?? madrasah.intro} />
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <Link
                href="/madrasah"
                className="mt-6 inline-flex items-center gap-2 text-emerald font-medium link-sweep"
              >
                <L
                  en="Visit Baitul Quran wa Assunnah"
                  bn="বায়তুল কুরআন ওয়াস সুন্নাহ দেখুন"
                />
                <ArrowUpRight size={18} />
              </Link>
            </ScrollReveal>
          </div>
        </div>

        <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {madrasah.divisions.map((d, i) => {
            const Icon = icons[i % icons.length];
            return (
              <StaggerItem key={d.key}>
                <div className="group relative h-full rounded-card-lg p-8 border border-border bg-paper-2 hover:bg-paper hover:border-emerald/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full grid place-items-center bg-emerald/10 text-emerald group-hover:bg-emerald group-hover:text-paper transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-xs text-ink-muted">
                      <L en={d.ages} bn={d.agesBn} />
                    </span>
                  </div>
                  <h3 className="font-display text-2xl tracking-tight">
                    <L en={d.name} bn={d.nameBn} />
                  </h3>
                  <p className="text-sm text-ink-soft mt-4 leading-relaxed">
                    <L en={d.summary} bn={d.summaryBn} />
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
