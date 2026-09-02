"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useState } from "react";

import { LoadingScreen } from "@/components/loading-screen";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Process } from "@/components/process";
import { Partner } from "@/components/partner";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { PlaceholderToast } from "@/components/ui/placeholder-toast";
import { useBodyLock } from "@/lib/hooks";

/** Root client shell: loading gate → content, cursor, toasts. */
export function PortfolioApp() {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useBodyLock(loading);

  const finish = useCallback(() => {
    setLoading(false);
    // Let the curtain clear before the hero entrance starts.
    requestAnimationFrame(() => setReady(true));
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onComplete={finish} />}
      </AnimatePresence>

      <CustomCursor />
      <Navbar ready={ready} />

      <main id="main" className="relative">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Partner />
        <Contact />
      </main>

      <Footer />
      <PlaceholderToast />
    </>
  );
}
