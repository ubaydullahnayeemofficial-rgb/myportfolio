"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { L } from "@/components/shared/L";

type Intent = "admissions" | "lecture" | "writing" | "other";

const intents: Array<{
  value: Intent;
  en: string;
  bn: string;
}> = [
  { value: "admissions", en: "Admissions inquiry", bn: "ভর্তি জিজ্ঞাসা" },
  { value: "lecture", en: "Lecture or dars request", bn: "ওয়াজ বা দরসের অনুরোধ" },
  { value: "writing", en: "A writing question", bn: "লেখা সম্পর্কিত প্রশ্ন" },
  { value: "other", en: "Something else", bn: "অন্য কিছু" },
];

export function ContactForm() {
  const { locale } = useLocale();
  const isBn = locale === "bn";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [intent, setIntent] = useState<Intent>("admissions");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, intent, message }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.error ||
            (isBn
              ? "পাঠানো গেল না। আবার চেষ্টা করুন অথবা হোয়াটসঅ্যাপে লিখুন।"
              : "Could not send. Please try again or message on WhatsApp."),
        );
      }
      toast.success(isBn ? "সালাম — আমরা পেয়েছি।" : "Salam — we received it.", {
        description: isBn
          ? "আমরা সব পড়ি। উত্তর দিতে একটু সময় নিই — কিন্তু আন্তরিকভাবে।"
          : "We read everything. Replies are slow but real.",
      });
      setName("");
      setEmail("");
      setPhone("");
      setIntent("admissions");
      setMessage("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : isBn ? "কিছু একটা ভুল হয়েছে।" : "Something went wrong.";
      toast.error(isBn ? "পাঠানো গেল না" : "Could not send", { description: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid md:grid-cols-2 gap-5">
        <Field labelEn="Your name" labelBn="আপনার নাম">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
            placeholder={isBn ? "মুহাম্মদ আইমান" : "Mohammad Aiman"}
          />
        </Field>
        <Field labelEn="Email" labelBn="ইমেইল">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="you@example.com"
          />
        </Field>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field labelEn="Phone (optional)" labelBn="ফোন (ঐচ্ছিক)">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
            placeholder="+880…"
          />
        </Field>
        <Field labelEn="About" labelBn="বিষয়">
          <select
            value={intent}
            onChange={(e) => setIntent(e.target.value as Intent)}
            className={inputCls}
          >
            {intents.map((it) => (
              <option key={it.value} value={it.value}>
                {isBn ? it.bn : it.en}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field labelEn="Your note" labelBn="আপনার বার্তা">
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className={inputCls}
          placeholder={
            isBn
              ? "দু-তিন বাক্যই যথেষ্ট।"
              : "Two or three sentences is enough."
          }
        />
      </Field>

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-xs text-ink-muted max-w-xs">
          <L
            en={<>By sending this you agree to a slow, sincere reply — not a marketing email. We do not share your information.</>}
            bn={<>এই বার্তা পাঠানোর অর্থ — আপনি একটি ধীর, আন্তরিক উত্তরে সম্মত। কোনো মার্কেটিং মেইল নয়। আপনার তথ্য কারও সঙ্গে ভাগ করা হবে না।</>}
          />
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-mag btn-mag-primary disabled:opacity-60 shrink-0"
        >
          <Send size={14} />
          {submitting ? (
            <L en="Sending…" bn="পাঠানো হচ্ছে…" />
          ) : (
            <L en="Send the note" bn="বার্তা পাঠান" />
          )}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-button px-4 py-3 bg-paper-2 border border-border focus:bg-paper focus:border-emerald focus:ring-2 focus:ring-emerald/15 outline-none text-ink placeholder:text-ink-subtle transition-colors font-body";

function Field({
  labelEn,
  labelBn,
  children,
}: {
  labelEn: string;
  labelBn: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs tracking-[0.18em] uppercase text-ink-muted">
        <L en={labelEn} bn={labelBn} />
      </span>
      {children}
    </label>
  );
}
