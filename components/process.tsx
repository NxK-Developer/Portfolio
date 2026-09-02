"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/content/process";

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.7", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  return (
    <section id="process" className="relative scroll-mt-24 py-28 sm:py-36" aria-labelledby="process-heading">
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute left-0 bottom-10 select-none font-display text-[clamp(6rem,18vw,16rem)] font-semibold leading-none opacity-40"
      >
        04
      </span>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-6">
        <SectionHeading eyebrow="Approach" title="Creative Process" meta="04 / Method" id="process-heading" />

        <div ref={trackRef} className="relative mx-auto max-w-3xl">
          {/* Track */}
          <div aria-hidden className="absolute bottom-4 left-[23px] top-4 w-px bg-line sm:left-[27px]" />

          {/* Flowing progress line */}
          {!reduced && (
            <motion.div
              aria-hidden
              className="absolute bottom-4 left-[23px] top-4 w-px origin-top bg-gradient-to-b from-accent via-accent to-mint sm:left-[27px]"
              style={{ scaleY: progress, boxShadow: "0 0 12px rgba(139,123,255,0.5)" }}
            />
          )}

          <ol className="relative space-y-14 sm:space-y-20">
            {processSteps.map((step, i) => (
              <Reveal key={step.id} as="li" direction="up" amount={0.5} delay={i * 0.04}>
                <div className="group grid grid-cols-[48px_1fr] items-start gap-5 sm:grid-cols-[56px_1fr] sm:gap-8">
                  {/* Node */}
                  <div className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
                    <span
                      aria-hidden
                      className={`absolute inset-0 rounded-full border bg-ink transition-all duration-500 group-hover:scale-110 ${
                        i === 4
                          ? "border-mint/60 shadow-[0_0_30px_-6px_rgba(111,231,200,0.5)]"
                          : "border-line group-hover:border-accent/60 group-hover:shadow-[0_0_30px_-6px_rgba(139,123,255,0.5)]"
                      }`}
                    />
                    <span className="relative font-mono text-[11px] tracking-[0.2em] text-bone sm:text-xs">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="rounded-card border border-transparent p-1 transition-all duration-500 group-hover:border-line group-hover:bg-raised sm:p-6">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
                        {step.title}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-dim">
                        Step {step.number}
                      </span>
                    </div>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-fog sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
