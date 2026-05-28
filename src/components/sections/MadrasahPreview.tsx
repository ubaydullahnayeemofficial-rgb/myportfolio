import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Users, BookMarked, Heart } from "lucide-react";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/effects/ScrollReveal";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { madrasah } from "@/lib/data/madrasah";

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
                src="/1.jpg"
                alt="Ubaydullah Nayeem at a public lecture"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-emerald-deep/10 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-paper">
                <p className="text-[10px] tracking-[0.22em] uppercase opacity-80">From the minbar</p>
                <p className="font-display italic-display text-2xl md:text-3xl mt-2 leading-snug text-gold-bright">
                  &ldquo;The Quran sets the rhythm. Everything else is downstream.&rdquo;
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7 flex flex-col justify-end">
            <ScrollReveal>
              <span className="kicker">The Madrasah</span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1.04] tracking-tight balance">
                A school built around <span className="italic-display gradient-text">tilawah</span>, not the other way around.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-8 text-lg text-ink-soft leading-relaxed pretty max-w-xl">{madrasah.intro}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <Link
                href="/madrasah"
                className="mt-6 inline-flex items-center gap-2 text-emerald font-medium link-sweep"
              >
                Visit Baitul Quran wa Assunnah <ArrowUpRight size={18} />
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
                    <span className="numeral text-xs text-ink-muted">{d.ages}</span>
                  </div>
                  <h3 className="font-display text-2xl tracking-tight">{d.name}</h3>
                  <p className="font-bn text-emerald text-sm mt-0.5">{d.nameBn}</p>
                  <p className="text-sm text-ink-soft mt-4 leading-relaxed">{d.summary}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
