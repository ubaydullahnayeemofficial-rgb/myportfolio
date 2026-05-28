import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { blurFor } from "@/lib/blurs";
import { bio } from "@/lib/data/bio";
import { site } from "@/lib/site";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { ArabesqueBackdrop } from "@/components/effects/ArabesqueBackdrop";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/effects/ScrollReveal";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { Parallax } from "@/components/effects/Parallax";
import { L } from "@/components/shared/L";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: bio.shortIntro,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", nameBn: "পরিচয়", href: "/about" }]} />
      {/* Hero */}
      <section className="relative section-pad overflow-hidden">
        <GradientBlob tone="emerald" size="xl" opacity={0.14} className="-top-40 -left-32" />
        <GradientBlob tone="gold" size="lg" opacity={0.12} className="top-40 -right-32" />
        <ArabesqueBackdrop className="text-emerald" />

        <div className="container-page grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="kicker">
                <L en="About · Porichoy" bn="পরিচয় · About" />
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="font-display text-6xl md:text-8xl mt-6 leading-[0.96] tracking-tight balance">
                <L
                  en={<>A life arranged <span className="italic-display gradient-text">around the Quran</span>.</>}
                  bn={<>কুরআনকে কেন্দ্র করে <span className="italic-display gradient-text">গড়া এক জীবন</span>।</>}
                />
              </h1>
            </ScrollReveal>
          </div>

          <ScrollReveal className="lg:col-span-5" delay={0.15}>
            <p className="text-lg text-ink-soft leading-relaxed pretty">
              <L
                en="A young hafiz, qari, and educator from Jatrabari, Dhaka — serving the Quran through hifz, qira'at, mashq, and the patient work of two residential madrasahs."
                bn="যাত্রাবাড়ী, ঢাকার এক তরুণ হাফেজ, ক্বারী ও শিক্ষাবিদ — হিফজ, ক্বিরাত, মশক এবং দুটি আবাসিক মাদরাসার ধীর-স্থির খিদমতের মাধ্যমে কুরআনের সেবায় নিবেদিত।"
              />
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Long bio */}
      <section className="relative section-pad bg-paper-2 overflow-hidden">
        <GradientBlob tone="emerald" size="lg" opacity={0.05} className="top-40 -right-32" />
        <div className="container-page grid lg:grid-cols-12 gap-12">
          <ScrollReveal className="lg:col-span-4">
            <h2 className="font-display text-3xl md:text-4xl leading-tight tracking-tight balance">
              <L en="The short version, told properly." bn="সংক্ষেপে — তবু পূর্ণভাবে।" />
            </h2>
            <p className="mt-4 text-sm tracking-[0.18em] uppercase text-ink-muted">
              <L
                en="Hafiz · Qari · Porichalok · Mu'allim"
                bn="হাফেজ · ক্বারী · পরিচালক · মুয়াল্লিম"
              />
            </p>
          </ScrollReveal>
          <div className="lg:col-span-8 flex flex-col gap-6">
            {bio.longIntro.map((para, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.06}>
                <p className="text-lg text-ink-soft leading-relaxed pretty">
                  <L en={para} bn={bio.longIntroBn[i] ?? para} />
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Glimpses gallery */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-page">
          <ScrollReveal>
            <span className="kicker">
              <L en="Glimpses" bn="ঝলক" />
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-4xl md:text-5xl mt-6 leading-[1.04] tracking-tight balance max-w-2xl">
              <L
                en="A few moments — outside the classroom, on the road."
                bn="কিছু মুহূর্ত — ক্লাসের বাইরে, পথের ধারে।"
              />
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-12 gap-4 md:gap-5">
            <ScrollReveal className="col-span-12 md:col-span-7 row-span-2">
              <div className="relative aspect-[4/5] md:aspect-[4/4.4] rounded-card-lg overflow-hidden ring-1 ring-border">
                <Image
                  src="/1.webp"
                  alt="Hafiz Qari Ubaydullah Nayeem speaking at an annual gathering"
                  fill
                  sizes="(min-width: 768px) 56vw, 100vw"
                  placeholder="blur"
                  blurDataURL={blurFor("/1.webp")}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal className="col-span-6 md:col-span-5" delay={0.08}>
              <div className="relative aspect-[4/3] rounded-card-lg overflow-hidden ring-1 ring-border">
                <Image
                  src="/2.webp"
                  alt="Ubaydullah Nayeem between sessions"
                  fill
                  sizes="(min-width: 768px) 35vw, 50vw"
                  placeholder="blur"
                  blurDataURL={blurFor("/2.webp")}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal className="col-span-6 md:col-span-5" delay={0.16}>
              <div className="relative aspect-[4/3] rounded-card-lg overflow-hidden ring-1 ring-border">
                <Image
                  src="/3.webp"
                  alt="Ubaydullah Nayeem during a quiet hour"
                  fill
                  sizes="(min-width: 768px) 35vw, 50vw"
                  placeholder="blur"
                  blurDataURL={blurFor("/3.webp")}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal className="col-span-12 md:col-span-5" delay={0.24}>
              <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-card-lg overflow-hidden ring-1 ring-border">
                <Image
                  src="/4.webp"
                  alt="Ubaydullah Nayeem at home in Dhaka"
                  fill
                  sizes="(min-width: 768px) 35vw, 100vw"
                  placeholder="blur"
                  blurDataURL={blurFor("/4.webp")}
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section-pad relative overflow-hidden bg-paper-2">
        <div className="container-page">
          <ScrollReveal>
            <span className="kicker">
              <L en="Education · Shiksha-gata Joggota" bn="শিক্ষাগত যোগ্যতা" />
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1.02] tracking-tight balance max-w-3xl">
              <L
                en={<>A long apprenticeship — <span className="italic-display gradient-text">the only kind that produces a qari</span>.</>}
                bn={<>দীর্ঘ এক প্রশিক্ষণ — <span className="italic-display gradient-text">যা একজন ক্বারী গড়ে তোলে</span>।</>}
              />
            </h2>
          </ScrollReveal>

          <div className="mt-16 grid gap-px bg-border rounded-card-lg overflow-hidden border border-border">
            {bio.timeline.map((item, i) => (
              <ScrollReveal key={i} delay={0.05 + i * 0.05}>
                <div className="grid md:grid-cols-12 gap-6 p-8 md:p-10 bg-paper hover:bg-paper-2 transition-colors">
                  <div className="md:col-span-3">
                    <span className="numeral text-xs tracking-[0.2em] uppercase text-emerald">
                      <L en={item.yearLatin} bn={item.year} />
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight">
                      <L en={item.titleEn} bn={item.title} />
                    </h3>
                    <p className="mt-3 text-ink-soft leading-relaxed pretty max-w-2xl">
                      <L en={item.bodyEn} bn={item.body} />
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section-pad relative overflow-hidden">
        <div className="container-page">
          <ScrollReveal>
            <span className="kicker">
              <L en="Experience · Avijhota" bn="অভিজ্ঞতা" />
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1.02] tracking-tight balance max-w-3xl">
              <L
                en={<>Where the <span className="italic-display gradient-text">work happens</span>.</>}
                bn={<>যেখানে <span className="italic-display gradient-text">কাজ ঘটে</span>।</>}
              />
            </h2>
          </ScrollReveal>

          <StaggerReveal className="mt-14 grid md:grid-cols-3 gap-5">
            {bio.experience.map((e, i) => (
              <StaggerItem key={i}>
                <div className="h-full rounded-card-lg border border-border bg-paper-2 p-8 hover:bg-paper hover:border-emerald/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
                  <span className="numeral text-xs tracking-[0.2em] uppercase text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl mt-3 leading-tight tracking-tight">
                    <L en={e.roleEn} bn={e.role} />
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                    <L en={e.placeEn} bn={e.place} />
                  </p>
                  <p className="mt-4 text-xs tracking-[0.18em] uppercase text-emerald">
                    <L en={e.periodEn} bn={e.period} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Philosophy — 2x2 */}
      <section className="section-pad bg-paper-2 relative overflow-hidden">
        <GradientBlob tone="gold" size="xl" opacity={0.06} className="-top-32 -left-32" />
        <div className="container-page">
          <ScrollReveal>
            <span className="kicker">
              <L en="Philosophy" bn="দর্শন" />
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="font-display text-5xl md:text-6xl mt-6 leading-[1.02] tracking-tight balance max-w-3xl">
              <L
                en="Four things I believe — and live by."
                bn="চারটি কথা — যাতে আমি বিশ্বাস করি এবং যা দিয়ে জীবন গড়ি।"
              />
            </h2>
          </ScrollReveal>

          <StaggerReveal className="mt-16 grid md:grid-cols-2 gap-5">
            {bio.philosophy.map((p, i) => (
              <StaggerItem key={i}>
                <div className="relative h-full rounded-card-lg bg-paper border border-border p-8 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500">
                  <span className="numeral text-xs tracking-[0.2em] uppercase text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl mt-3 tracking-tight">
                    <L en={p.heading} bn={p.headingBn} />
                  </h3>
                  <p className="mt-4 text-ink-soft leading-relaxed pretty">
                    <L en={p.body} bn={p.bodyBn} />
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Big quote with parallax */}
      <section className="relative py-32 md:py-48 overflow-hidden bg-midnight text-paper">
        <GradientBlob tone="emerald" size="hero" opacity={0.25} className="-top-40 -left-40" />
        <GradientBlob tone="gold" size="xl" opacity={0.2} className="-bottom-40 -right-40" />
        <ArabesqueBackdrop className="text-gold-bright opacity-[0.10]" />

        <Parallax speed={30} className="container-page text-center">
          <p className="font-display text-3xl md:text-5xl leading-[1.18] tracking-tight balance max-w-4xl mx-auto">
            <L en={bio.quote.en} bn={bio.quote.bn} />
          </p>
        </Parallax>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-page flex flex-col md:flex-row items-start md:items-center justify-between gap-8 rounded-card-lg border border-border p-10 md:p-12 bg-paper-2">
          <div>
            <h3 className="font-display text-3xl md:text-4xl tracking-tight">
              <L
                en="Want to talk about your child's tarbiyyah?"
                bn="আপনার সন্তানের তরবিয়াত নিয়ে কথা বলতে চান?"
              />
            </h3>
            <p className="mt-2 text-ink-muted">
              <L
                en="Send a salam. The first conversation is a meeting, not a sales call."
                bn="একটি সালাম পাঠান। প্রথম কথোপকথন একটি বৈঠক — কোনো বিক্রয়-আলাপ নয়।"
              />
            </p>
          </div>
          <MagneticButton href={site.whatsappLink} variant="primary" target="_blank" rel="noopener noreferrer">
            <L en="Message on WhatsApp" bn="হোয়াটসঅ্যাপে লিখুন" />
          </MagneticButton>
        </div>
      </section>
    </>
  );
}
