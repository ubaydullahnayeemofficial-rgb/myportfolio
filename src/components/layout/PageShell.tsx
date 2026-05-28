"use client";

import { LenisProvider } from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { WhatsAppFab } from "@/components/shared/WhatsAppFab";
import { Toaster } from "sonner";
import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LenisProvider>
        <NoiseOverlay />
        <CustomCursor />
        <Navbar />
        <main id="main-content" className="pt-24 min-h-[60vh]">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
        <ScrollToTop />
        <Toaster position="top-center" theme="light" />
      </LenisProvider>
    </ThemeProvider>
  );
}
