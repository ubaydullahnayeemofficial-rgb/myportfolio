import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";
import { FacebookIcon, YoutubeIcon, InstagramIcon } from "@/components/shared/SocialIcons";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { GradientBlob } from "@/components/effects/GradientBlob";
import { ArabesqueBackdrop } from "@/components/effects/ArabesqueBackdrop";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { MagneticButton } from "@/components/effects/MagneticButton";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Salam. Reach out about admissions, lectures, writings, or a question we haven't answered yet.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative section-pad overflow-hidden">
        <GradientBlob tone="emerald" size="xl" opacity={0.12} className="-top-32 -right-32" />
        <ArabesqueBackdrop className="text-emerald" />

        <div className="container-page grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="kicker">Salam · যোগাযোগ</span>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="font-display text-6xl md:text-8xl mt-6 leading-[0.96] tracking-tight balance">
                Begin a <span className="italic-display gradient-text">conversation</span>.
              </h1>
            </ScrollReveal>
          </div>
          <ScrollReveal className="lg:col-span-5" delay={0.15}>
            <p className="text-lg text-ink-soft leading-relaxed pretty">
              Whether you are a parent thinking about admissions, a student
              asking a sincere question, or an institution that wants to talk —
              we read everything. Replies are slow but real.
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
                  src="/main.jpeg"
                  alt="Ubaydullah Nayeem"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-ink-muted">Replies come from</p>
                <p className="font-display text-lg tracking-tight mt-0.5">{site.name}</p>
                <p className="font-bn text-sm text-emerald">{site.nameBn}</p>
              </div>
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
              Where to find us.
            </h2>
            <p className="mt-3 text-ink-muted">
              Visit during weekday hours. Bring the student. The first meeting is unhurried on purpose.
            </p>

            <ul className="mt-10 flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-emerald text-paper">
                  <MapPin size={16} />
                </span>
                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">Address</div>
                  <p className="mt-1 text-lg font-display tracking-tight">{site.madrasah.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-full bg-emerald text-paper">
                  <Phone size={16} />
                </span>
                <div>
                  <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">Phone</div>
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
                  <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">Email</div>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 inline-block text-lg font-display tracking-tight hover:text-emerald link-sweep"
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
                  <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">WhatsApp</div>
                  <MagneticButton
                    href={site.whatsappLink}
                    variant="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-sm"
                  >
                    Message us
                  </MagneticButton>
                </div>
              </li>
            </ul>

            <div className="mt-10 pt-8 border-t border-border">
              <div className="text-xs tracking-[0.18em] uppercase text-ink-muted">Elsewhere</div>
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
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid place-items-center w-10 h-10 rounded-full border border-border hover:border-emerald hover:text-emerald transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={16} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal className="lg:col-span-7" delay={0.1}>
            <div className="rounded-card-lg bg-paper border border-border p-8 md:p-10">
              <h2 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                Write a short note.
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Two or three sentences is enough. We&apos;ll write back from the same address.
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
