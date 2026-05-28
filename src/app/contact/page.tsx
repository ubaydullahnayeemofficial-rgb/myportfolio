import type { Metadata } from "next";
import Image from "next/image";
import { blurFor } from "@/lib/blurs";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { FacebookIcon, YoutubeIcon, WhatsAppIcon } from "@/components/shared/SocialIcons";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { ArabesqueBackdrop } from "@/components/effects/ArabesqueBackdrop";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { L } from "@/components/shared/L";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Salam. Reach out about admissions, lectures, tilawah, qira'at, or any sincere question.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Contact", nameBn: "যোগাযোগ", href: "/contact" }]} />
      {/* Hero */}
      <section className="relative section-pad overflow-hidden">
        <GradientBlob tone="emerald" size="xl" opacity={0.12} className="-top-32 -right-32" />
        <ArabesqueBackdrop className="text-emerald" />

        <div className="container-page grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="kicker">
                <L en="Salam · Contact" bn="সালাম · যোগাযোগ" />
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="font-display text-6xl md:text-8xl mt-6 leading-[1] tracking-tight balance">
                <L
                  en={<>Begin a <span className="italic-display gradient-text">conversation</span>.</>}
                  bn={<>একটি <span className="italic-display gradient-text">কথোপকথন</span> শুরু করুন।</>}
                />
              </h1>
            </ScrollReveal>
          </div>
          <ScrollReveal className="lg:col-span-5" delay={0.15}>
            <p className="text-lg text-ink-soft leading-relaxed pretty">
              <L
                en="Whether you are a parent thinking about admissions, a student asking a sincere question, or an institution that wants to talk — we read everything. Replies are slow but real."
                bn="ভর্তি নিয়ে চিন্তিত অভিভাবক হোক, আন্তরিক প্রশ্ন নিয়ে আসা ছাত্র হোক, কিংবা কথা বলতে আগ্রহী কোনো প্রতিষ্ঠান হোক — আমরা সব বার্তা পড়ি। উত্তর আসতে একটু সময় লাগে — কিন্তু আন্তরিকভাবে।"
              />
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main */}
      <section className="section-pad relative overflow-hidden bg-paper-2">
        <div className="container-page grid lg:grid-cols-12 gap-12">
          {/* Channels */}
          <ScrollReveal className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8 p-4 rounded-card-lg bg-paper border border-border">
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-emerald/40 shrink-0">
                <Image
                  src="/main.webp"
                  alt="Hafiz Qari Ubaydullah Nayeem"
                  fill
                  sizes="64px"
                  placeholder="blur"
                  blurDataURL={blurFor("/main.webp")}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-ink-muted">
                  <L en="Replies come from" bn="উত্তর আসে — " />
                </p>
                <p className="font-display text-lg tracking-tight mt-0.5">
                  <L en={site.name} bn={site.nameBn} />
                </p>
                <p className="text-sm text-emerald">
                  <L en={site.role} bn={site.roleBn} />
                </p>
              </div>
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              <L en="Where to find us." bn="আমাদের ঠিকানা।" />
            </h2>
            <p className="mt-3 text-ink-muted">
              <L
                en="Visit during weekday hours. Bring the student. The first meeting is unhurried on purpose."
                bn="কর্মদিবসে সময় বের করে আসুন, ছাত্রকে সঙ্গে আনুন। প্রথম বৈঠকটি ইচ্ছাকৃতভাবেই ধীরস্থির।"
              />
            </p>

            <ul className="mt-10 flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-emerald text-paper">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">
                    <L en="Address" bn="ঠিকানা" />
                  </div>
                  <p className="mt-1 text-lg font-display tracking-tight">
                    <L en={site.madrasah.address} bn={site.madrasah.addressBn} />
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-emerald text-paper">
                  <Phone size={16} />
                </span>
                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">
                    <L en="Phone" bn="ফোন" />
                  </div>
                  <a
                    href={`tel:${site.phone}`}
                    className="mt-1 inline-block text-lg font-display tracking-tight hover:text-emerald link-sweep"
                  >
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-emerald text-paper">
                  <Mail size={16} />
                </span>
                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">
                    <L en="Email" bn="ইমেইল" />
                  </div>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 inline-block text-lg font-display tracking-tight hover:text-emerald link-sweep break-all"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-emerald text-paper">
                  <MessageCircle size={16} />
                </span>
                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">
                    <L en="WhatsApp" bn="হোয়াটসঅ্যাপ" />
                  </div>
                  <MagneticButton
                    href={site.whatsappLink}
                    variant="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-sm"
                  >
                    <L en="Message us" bn="বার্তা পাঠান" />
                  </MagneticButton>
                </div>
              </li>
            </ul>

            <div className="mt-10 pt-8 border-t border-border">
              <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">
                <L en="Elsewhere" bn="অন্যান্য মাধ্যম" />
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid place-items-center w-10 h-10 rounded-full border border-border hover:border-emerald hover:text-emerald transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={16} />
                </a>
                <a
                  href={site.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid place-items-center w-10 h-10 rounded-full border border-border hover:border-emerald hover:text-emerald transition-colors"
                  aria-label="YouTube"
                >
                  <YoutubeIcon size={16} />
                </a>
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid place-items-center w-10 h-10 rounded-full border border-border hover:border-emerald hover:text-emerald transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size={16} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal className="lg:col-span-7" delay={0.1}>
            <div className="rounded-card-lg bg-paper border border-border p-8 md:p-10">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                <L en="Write a short note." bn="একটি ছোট বার্তা লিখুন।" />
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                <L
                  en="Two or three sentences is enough. We'll write back from the same address."
                  bn="দু-তিন বাক্যই যথেষ্ট। আমরা একই ঠিকানা থেকেই উত্তর দেব।"
                />
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
