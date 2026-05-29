"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

/**
 * Locale switcher.
 *
 * Toggles between Bengali (default at /) and English (/en/*).
 * Switching navigates the URL itself — /en is a real, shareable URL —
 * and the middleware sets the locale cookie on every visit so the
 * choice persists across navigations.
 */
export function LocaleToggle({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const { locale } = useLocale();

  // Compute the URL path stripped of any /en prefix.
  const stripped = pathname.replace(/^\/en(\/|$)/, "/");

  const goBn = () => {
    const target = stripped === "" ? "/" : stripped;
    router.push(target);
  };

  const goEn = () => {
    const target = stripped === "/" ? "/en" : `/en${stripped}`;
    router.push(target);
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        "inline-flex items-center text-[11px] tracking-[0.18em] uppercase rounded-full border border-border bg-paper/60 backdrop-blur p-0.5",
        className,
      )}
    >
      <button
        type="button"
        onClick={goBn}
        aria-pressed={locale === "bn"}
        className={cn(
          "px-3 py-1 rounded-full transition-colors",
          locale === "bn"
            ? "bg-emerald text-paper"
            : "text-ink-muted hover:text-emerald",
        )}
      >
        বাং
      </button>
      <button
        type="button"
        onClick={goEn}
        aria-pressed={locale === "en"}
        className={cn(
          "px-3 py-1 rounded-full transition-colors",
          locale === "en"
            ? "bg-emerald text-paper"
            : "text-ink-muted hover:text-emerald",
        )}
      >
        EN
      </button>
    </div>
  );
}
