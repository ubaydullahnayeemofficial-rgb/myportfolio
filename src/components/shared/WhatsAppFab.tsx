"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "@/components/shared/SocialIcons";
import { X } from "lucide-react";
import { site } from "@/lib/site";

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[16rem] rounded-card glass shadow-card-hover overflow-hidden"
          >
            <div className="px-5 pt-5 pb-4 bg-gradient-to-br from-emerald-deep to-emerald text-paper">
              <div className="flex items-start gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold-bright/60 shrink-0">
                  <Image
                    src="/main.webp"
                    alt="Ubaydullah Nayeem"
                    fill
                    sizes="48px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-[0.22em] uppercase opacity-70">As-salamu alaykum</p>
                  <p className="font-display text-base mt-0.5 tracking-tight leading-tight">
                    {site.name}
                  </p>
                  <p className="text-[10px] opacity-70">Typically replies within a day</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid place-items-center w-7 h-7 rounded-full bg-paper/15 hover:bg-paper/25 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
            <div className="px-5 py-4 bg-paper">
              <p className="text-sm text-ink-soft leading-relaxed">
                Replies are slow but real, in shaa Allah. We usually answer
                within a working day.
              </p>
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-medium hover:brightness-95 transition"
              >
                <WhatsAppIcon size={14} />
                Open WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label="Chat on WhatsApp"
        onClick={() => setOpen((s) => !s)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.94 }}
        className="relative grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-card-hover hover:brightness-95 transition"
      >
        {/* Pulse ring */}
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-[wa-pulse_2.2s_ease-out_infinite] pointer-events-none" />
        <WhatsAppIcon size={22} />
      </motion.button>

      <style jsx global>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.7); opacity: 0;    }
          100% { transform: scale(1.7); opacity: 0;    }
        }
      `}</style>
    </div>
  );
}
