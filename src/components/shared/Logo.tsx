import Link from "next/link";
import { cn } from "@/lib/utils";
import { L } from "@/components/shared/L";

export function Logo({
  href = "/",
  size = "md",
  className,
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim = size === "lg" ? 44 : size === "sm" ? 28 : 36;

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 group", className)}
      aria-label="Ubaydullah Nayeem"
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 group-hover:rotate-[12deg]"
      >
        <defs>
          <linearGradient id="lg-stroke" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="var(--emerald)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
          <linearGradient id="lg-fill" x1="32" y1="0" x2="32" y2="64">
            <stop offset="0%" stopColor="var(--emerald)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        {/* 8-point Islamic star with inner ligature */}
        <path
          d="M32 4 L40 16 L54 12 L52 26 L60 32 L52 38 L54 52 L40 48 L32 60 L24 48 L10 52 L12 38 L4 32 L12 26 L10 12 L24 16 Z"
          fill="url(#lg-fill)"
          stroke="url(#lg-stroke)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* Ligature suggesting "U N" interlocking */}
        <path
          d="M22 26 V36 a6 6 0 0 0 6 6 H30 M30 42 a6 6 0 0 0 6 -6 V26 M30 28 L36 28"
          stroke="var(--emerald)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="32" cy="32" r="1.6" fill="var(--gold)" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base md:text-[1.05rem] tracking-tight">
          <L en="Ubaydullah Nayeem" bn="উবায়দুল্লাহ নাঈম" />
        </span>
        <span className="text-[10px] tracking-[0.18em] uppercase text-ink-muted">
          <L
            en={<>Mu&apos;allim · Porichalok</>}
            bn={<>মুয়াল্লিম · পরিচালক</>}
          />
        </span>
      </span>
    </Link>
  );
}
