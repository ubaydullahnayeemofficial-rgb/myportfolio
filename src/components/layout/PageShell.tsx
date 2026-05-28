"use client";

import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TopBar } from "@/components/layout/TopBar";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

// Defer non-critical, desktop-only client work until after hydration.
// These have no SSR value (cursor, smooth scroll, idle FABs) and shouldn't
// block the main-thread budget that Lighthouse measures.
const LenisProvider = dynamic(
  () => import("@/components/providers/LenisProvider").then((m) => m.LenisProvider),
  { ssr: false, loading: () => null },
);
const CustomCursor = dynamic(
  () => import("@/components/effects/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false, loading: () => null },
);
const ScrollToTop = dynamic(
  () => import("@/components/shared/ScrollToTop").then((m) => m.ScrollToTop),
  { ssr: false, loading: () => null },
);
const WhatsAppFab = dynamic(
  () => import("@/components/shared/WhatsAppFab").then((m) => m.WhatsAppFab),
  { ssr: false, loading: () => null },
);

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <LenisProvider>
          <NoiseOverlay />
          <CustomCursor />
          <TopBar />
          <Navbar />
          <main id="main-content" className="pt-32 min-h-[60vh]">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
          <ScrollToTop />
          <Toaster position="top-center" theme="light" />
        </LenisProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
