"use client";

import { useReducedMotion } from "motion/react";

import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

/**
 * Partner section — pure collaboration identity.
 * Displays ONLY the name "Khushi"; no biography, role,
 * skills or links (see content/site.ts comments).
 */
export function Partner() {
  const reduced = useReducedMotion();

  return (
    <section
      id="partner"
      className="relative overflow-hidden py-28 sm:py-40"
      aria-labelledby="partner-heading"
    >
      {/* backdrop */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[130px]" />
        <div className="grid-overlay absolute inset-0 opacity-60" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal direction="up" amount={0.5}>
          <p className="mb-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.4em] text-accent-soft">
            <span className="h-px w-8 bg-accent/60" aria-hidden />
            {site.partner.label}
            <span className="h-px w-8 bg-accent/60" aria-hidden />
          </p>
        </Reveal>

        {/* Monogram orbit */}
        <Reveal direction="up" delay={0.08} amount={0.5}>
          <div className="relative mx-auto mb-10 flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
            <div
              aria-hidden
              className={`absolute inset-0 rounded-full border border-line ${reduced ? "" : "animate-spin-slow"}`}
              style={{
                borderStyle: "dashed",
                background:
                  "radial-gradient(circle, rgba(139,123,255,0.12), transparent 65%)",
              }}
            />

            {/* N — Nxk Developer */}
            <div className="absolute -left-2 top-1/2 flex size-16 -translate-y-1/2 items-center justify-center rounded-2xl border border-accent/30 bg-ink font-display text-2xl font-semibold text-accent-soft shadow-glow sm:size-20 sm:text-3xl">
              N
            </div>
            {/* K — Khushi */}
            <div className="absolute -right-2 top-1/2 flex size-16 -translate-y-1/2 items-center justify-center rounded-2xl border border-mint/30 bg-ink font-display text-2xl font-semibold text-mint sm:size-20 sm:text-3xl">
              K
            </div>

            <svg aria-hidden className="absolute inset-6" viewBox="0 0 100 100">
              <path d="M20 50 H80" stroke="rgba(237,238,243,0.18)" strokeWidth="0.6" strokeDasharray="2 3" />
            </svg>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.14} amount={0.5}>
          <h2 id="partner-heading" className="font-display text-[clamp(3.6rem,12vw,8rem)] font-semibold leading-none tracking-tight">
            <span className="text-bone">{site.partner.name}</span>
            <span className="text-accent">.</span>
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.22} amount={0.5}>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-fog sm:text-base">
            A creative collaboration shaping the {site.name} experience — together
            from first idea to launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
