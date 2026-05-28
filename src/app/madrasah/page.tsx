import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { L } from "@/components/shared/L";
import { site } from "@/lib/site";
import { madrasah } from "@/lib/data/madrasah";
import { faqs } from "@/lib/data/faqs";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { ArabesqueBackdrop } from "@/components/effects/ArabesqueBackdrop";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";

export const metadata: Metadata = buildMetadata({
  title: "Madrasah",
  description: madrasah.intro,
  path: "/madrasah",
});

export default function MadrasahPage() {
  return (
    <>
      <JsonLd
        data={faqSchema(faqs.map((f) => ({ q: f.q, a: f.a })))}
      />
      <Breadcrumbs items={[{ name: "Madrasah", nameBn: "মাদরাসা", href: "/madrasah" }]} />
      {/* Hero */}
      <section className="relative section-pad overflow-hidden">
        <GradientBlob tone="emerald" size="xl" opacity={0.14} className="-top-32 -right-32" />
        <ArabesqueBackdrop className="text-emerald" />

        <div className="container-page grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="kicker">
                <L en="The Madrasah" bn="মাদরাসা" />
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="font-display text-6xl md:text-8xl mt-6 leading-[1] tracking-tight balance">
                <L
                  en={<>Baitul Quran <span className="italic-display gradient-text">wa Assunnah</span>.</>}
                  bn={<>বায়তুল কুরআন <span className="italic-display gradient-text">ওয়াস সুন্নাহ</span>।</>}
                />
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <p className="text-2xl md:text-3xl text-ink-soft mt-5">
                <L en={site.madrasah.name} bn={site.madrasah.nameBn} />
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal className="lg:col-span-5" delay={0.18}>
            <p className="text-lg text-ink-soft leading-relaxed pretty">
              <L en={madrasah.intro} bn={madrasah.introBn} />
            </p>
            <div className="mt-6 text-sm text-ink-muted">
              <div>
                <span className="text-emerald font-medium">
                  <L en={`Est. ${site.madrasah.founded}`} bn={`প্রতিষ্ঠা ${site.madrasah.founded}`} />
                </span>
                <span className="mx-2">·</span>
                <span>
                  <L en={site.madrasah.address} bn={site.madrasah.addressBn} />
                </span>
              </div>
            </div>
            <a
              href={site.madrasah.site}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-emerald font-medium link-sweep"
            >
              <L en="Institutional site" bn="প্রতিষ্ঠানের ওয়েবসাইট" /> <ArrowUpRight size={18} />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-paper-2 section-pad relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-12 gap-10 items-center">
          <ScrollReveal className="lg:col-span-5">
            <span className="kicker">
              <L en="Mission" bn="লক্ষ্য" />
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-6 leading-[1.1] tracking-tight balance">
              <L
                en="We are raising a generation, not running a school."
                bn="আমরা একটি প্রজন্ম গড়ছি — শুধু একটি স্কুল চালাচ্ছি না।"
              />
            </h2>
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-7" delay={0.1}>
            <p className="text-lg md:text-xl text-ink-soft leading-relaxed pretty">
              <L en={madrasah.mission} bn={madrasah.missionBn} />
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Divisions */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-page">
          <ScrollReveal>
            <span className="kicker">
              <L en="Divisions · Programs" bn="বিভাগ · কোর্সসমূহ" />
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1.05] tracking-tight balance max-w-3xl">
              <L
                en={<>Four programs. One <span className="italic-display gradient-text">centered child</span>.</>}
                bn={<>চারটি বিভাগ। একজন <span className="italic-display gradient-text">কেন্দ্রিত শিক্ষার্থী</span>।</>}
              />
            </h2>
          </ScrollReveal>

          <StaggerReveal className="mt-16 grid gap-5 lg:grid-cols-2">
            {madrasah.divisions.map((d, i) => (
              <StaggerItem key={d.key}>
                <div
                  className={`group relative h-full rounded-card-lg p-10 transition-all duration-500 hover:-translate-y-1 ${
                    i % 3 === 1
                      ? "bg-emerald text-paper border border-emerald hover:shadow-[0_30px_60px_-20px_rgba(15,81,50,0.5)]"
                      : "bg-paper-2 border border-border hover:border-emerald/40 hover:shadow-card-hover"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-4xl tracking-tight">{d.name}</h3>
                    <span className="numeral text-xs tracking-[0.18em] uppercase opacity-70">{d.ages}</span>
                  </div>
                  <p className={`font-bn text-base mt-1 ${i % 3 === 1 ? "text-gold-bright" : "text-emerald"}`}>
                    {d.nameBn}
                  </p>
                  <p className="mt-5 leading-relaxed opacity-90">{d.summary}</p>
                  <ul className="mt-6 space-y-2.5">
                    {d.track.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-sm leading-snug">
                        <Check
                          size={16}
                          className={`shrink-0 mt-0.5 ${i % 3 === 1 ? "text-gold-bright" : "text-emerald"}`}
                        />
                        <span className="opacity-95">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Approach */}
      <section className="section-pad bg-paper-2 relative overflow-hidden">
        <GradientBlob tone="gold" size="lg" opacity={0.07} className="-top-32 -right-32" />
        <div className="container-page">
          <ScrollReveal>
            <span className="kicker">
              <L en="The approach" bn="পদ্ধতি" />
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1.05] tracking-tight balance max-w-3xl">
              <L
                en={<>How we run an <span className="italic-display gradient-text">uncommonly small institution</span>.</>}
                bn={<>একটি <span className="italic-display gradient-text">ছোট প্রতিষ্ঠান</span> কীভাবে চালানো হয়।</>}
              />
            </h2>
          </ScrollReveal>

          <StaggerReveal className="mt-14 grid md:grid-cols-2 gap-5">
            {madrasah.approach.map((a) => (
              <StaggerItem key={a.title}>
                <div className="rounded-card-lg bg-paper border border-border p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
                  <h3 className="font-display text-2xl md:text-3xl tracking-tight">{a.title}</h3>
                  <p className="mt-3 text-ink-soft leading-relaxed pretty">{a.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <div className="mt-14 rounded-card-lg border border-border p-8 bg-paper">
            <h3 className="font-display text-2xl tracking-tight">
              <L en="Facilities" bn="সুযোগ-সুবিধা" />
            </h3>
            <ul className="mt-5 grid md:grid-cols-2 gap-x-10 gap-y-3">
              {madrasah.facilities.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-ink-soft">
                  <Check size={16} className="text-emerald mt-1 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <ScrollReveal>
              <span className="kicker">
                <L en="Admissions" bn="ভর্তি" />
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h2 className="font-display text-4xl md:text-5xl mt-6 leading-[1.1] tracking-tight balance">
                <L
                  en="A four-step conversation, not a form."
                  bn="চার ধাপের একটি কথোপকথন — কোনো ফরম নয়।"
                />
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-6 text-ink-soft leading-relaxed pretty">
                <L en={madrasah.admissions.summary} bn={madrasah.admissions.summaryBn ?? madrasah.admissions.summary} />
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <MagneticButton
                href={site.whatsappLink}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8"
              >
                <L en="Begin a conversation" bn="কথা শুরু করুন" />
              </MagneticButton>
            </ScrollReveal>
          </div>

          <StaggerReveal className="lg:col-span-8 grid gap-5">
            {madrasah.admissions.process.map((p) => (
              <StaggerItem key={p.step}>
                <div className="grid md:grid-cols-12 gap-6 rounded-card-lg p-8 bg-paper-2 border border-border hover:bg-paper hover:border-emerald/40 hover:shadow-card-hover transition-all duration-500">
                  <div className="md:col-span-2 numeral text-3xl md:text-4xl text-emerald">{p.step}</div>
                  <div className="md:col-span-10">
                    <h3 className="font-display text-2xl md:text-3xl tracking-tight">{p.title}</h3>
                    <p className="mt-3 text-ink-soft leading-relaxed pretty">{p.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-paper-2 relative overflow-hidden">
        <div className="container-page grid lg:grid-cols-12 gap-12">
          <ScrollReveal className="lg:col-span-4">
            <span className="kicker">
              <L en="FAQ" bn="প্রশ্নোত্তর" />
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-6 leading-[1.1] tracking-tight balance">
              <L
                en="The questions we receive most often."
                bn="যেসব প্রশ্ন বেশি আসে।"
              />
            </h2>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-emerald font-medium link-sweep"
            >
              <L en="Ask your own" bn="নিজের প্রশ্ন করুন" /> <ArrowUpRight size={18} />
            </Link>
          </ScrollReveal>
          <div className="lg:col-span-8 divide-y divide-border">
            {faqs.map((f, i) => (
              <ScrollReveal key={f.q} delay={0.05 + i * 0.04}>
                <details className="group py-6">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
                    <span className="font-display text-xl md:text-2xl tracking-tight">{f.q}</span>
                    <span className="text-emerald text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-ink-soft leading-relaxed pretty max-w-2xl">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
