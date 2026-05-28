"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 backdrop-blur-xl bg-paper/75"
            : "py-5 bg-transparent",
        )}
      >
        <div className="container-page flex items-center justify-between gap-6">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7">
            {site.navigation.map((item) => {
              const active =
                pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={active ? "true" : undefined}
                  className={cn(
                    "link-sweep text-[0.92rem] font-medium tracking-tight transition-colors",
                    active ? "text-emerald" : "text-ink-soft hover:text-emerald",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton
              href={site.whatsappLink}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm"
            >
              Get in Touch
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden grid place-items-center w-11 h-11 rounded-full border border-border bg-paper/80"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-paper/95 backdrop-blur-2xl"
          >
            <nav className="h-full pt-28 px-6 flex flex-col gap-3">
              {site.navigation.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="flex items-baseline gap-3 py-3 border-b border-border"
                  >
                    <span className="font-display text-3xl">{item.label}</span>
                    <span className="font-bn text-base text-ink-muted">
                      {item.labelBn}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex items-center justify-between">
                <ThemeToggle />
                <MagneticButton
                  href={site.whatsappLink}
                  variant="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get in Touch
                </MagneticButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
