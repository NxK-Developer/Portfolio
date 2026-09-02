"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { MouseEvent } from "react";

import { HeroCanvas } from "./hero-canvas";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { scrollToSection } from "@/lib/hooks";

/**
 * Hero — layered depth: canvas particles, blueprint grid,
 * floating geometric objects, mouse parallax, editorial type.
 */
export function Hero({ ready }: { ready: boolean }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  const layerFar = { x: useTransform(sx, (v) => v * -14), y: useTransform(sy, (v) => v * -10) };
  const layerMid = { x: useTransform(sx, (v) => v * 22), y: useTransform(sy, (v) => v * 16) };
  const layerNear = { x: useTransform(sx, (v) => v * -34), y: useTransform(sy, (v) => v * -26) };

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const { innerWidth, innerHeight } = window;
    mx.set((e.clientX / innerWidth - 0.5) * 2);
    my.set((e.clientY / innerHeight - 0.5) * 2);
  };

  const enter = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 40 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="home"
      aria-label="Introduction"
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] overflow-hidden"
    >
      {/* Layer 0 — base atmosphere */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,123,255,0.16),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_90%,rgba(111,231,200,0.05),transparent_60%)]" />
        <div className="grid-overlay absolute inset-0" />
        <div className="noise-layer absolute inset-0 opacity-[0.035]" />
      </div>

      {/* Layer 1 — particles (parallax far) */}
      <motion.div aria-hidden style={reduced ? undefined : layerFar} className="absolute inset-0">
        <HeroCanvas active={ready} />
      </motion.div>

      {/* Layer 2 — floating geometry (parallax mid) */}
      <motion.div aria-hidden style={reduced ? undefined : layerMid} className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute left-[8%] top-[18%] h-24 w-24 rounded-full border border-line sm:h-36 sm:w-36" />
        <div className="animate-float-slower absolute right-[10%] top-[24%] h-14 w-14 rotate-12 rounded-xl border border-accent/25 sm:h-20 sm:w-20" />
        <svg
          className="animate-spin-slow absolute -bottom-24 right-[-6%] hidden opacity-70 lg:block"
          width="420"
          height="420"
          viewBox="0 0 420 420"
          fill="none"
        >
          <circle cx="210" cy="210" r="190" stroke="rgba(139,123,255,0.16)" strokeDasharray="4 10" />
          <circle cx="210" cy="210" r="140" stroke="rgba(237,238,243,0.08)" />
        </svg>
        <svg
          className="animate-spin-rev absolute left-[-140px] top-[52%] hidden opacity-60 lg:block"
          width="420"
          height="420"
          viewBox="0 0 420 420"
          fill="none"
        >
          <rect x="60" y="60" width="300" height="300" rx="60" stroke="rgba(111,231,200,0.12)" transform="rotate(45 210 210)" />
          <rect x="120" y="120" width="180" height="180" rx="36" stroke="rgba(237,238,243,0.07)" transform="rotate(45 210 210)" />
        </svg>
      </motion.div>

      {/* Layer 3 — content (my-auto centers when it fits, grows when it doesn't) */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-6xl px-6 py-28 sm:px-8 sm:py-32 lg:px-6">
        <motion.p
          {...enter(0.15)}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] text-accent-soft sm:mb-8"
        >
          <span className="h-px w-10 bg-accent/70" aria-hidden />
          {site.hero.overline}
        </motion.p>

        <h1 className="font-display font-semibold leading-[0.95] tracking-[-0.03em]">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[clamp(3rem,12.5vw,9.5rem)] text-bone"
              initial={reduced ? false : { y: "110%", rotate: 3 }}
              animate={ready ? { y: "0%", rotate: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {site.hero.lineOne}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="text-outline-strong block text-[clamp(3rem,12.5vw,9.5rem)]"
              initial={reduced ? false : { y: "110%", rotate: -2 }}
              animate={ready ? { y: "0%", rotate: 0 } : {}}
              transition={{ duration: 1, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              {site.hero.lineTwo}
              <span className="text-accent" style={{ WebkitTextStroke: "0px", color: "rgb(139 123 255)" }}>.</span>
            </motion.span>
          </span>
        </h1>

        <div className="mt-8 flex max-w-xl flex-col gap-10 sm:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <motion.p {...enter(0.55)} className="max-w-md text-base leading-relaxed text-fog sm:text-lg">
            {site.hero.tagline}
          </motion.p>

          <motion.div {...enter(0.7)} className="flex flex-wrap items-center gap-4">
            <Button href="#projects" onClick={() => scrollToSection("projects")} size="lg">
              {site.hero.primaryCta}
            </Button>
            <Button href="#contact" onClick={() => scrollToSection("contact")} variant="ghost" size="lg">
              {site.hero.secondaryCta}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Layer 4 — near foreground objects */}
      <motion.div aria-hidden style={reduced ? undefined : layerNear} className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute bottom-[26%] right-[22%] hidden size-3 rounded-full bg-accent/80 blur-[1px] lg:block" />
        <div className="animate-float-slower absolute bottom-[18%] left-[16%] hidden h-16 w-px bg-gradient-to-b from-transparent via-line to-transparent lg:block" />
      </motion.div>

      {/* Corner meta */}
      <motion.div
        {...enter(0.85)}
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[10px] uppercase tracking-[0.5em] text-dim xl:block"
      >
        Creative developer
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        {...enter(1.0)}
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to About section"
        className="group absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-dim transition-colors group-hover:text-fog">
          Scroll
        </span>
        <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-line p-1.5">
          {!reduced && (
            <motion.span
              className="block size-1 rounded-full bg-accent"
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {reduced && <span className="block size-1 rounded-full bg-accent" />}
        </span>
      </motion.button>
    </section>
  );
}
