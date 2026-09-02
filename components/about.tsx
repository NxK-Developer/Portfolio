"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Target } from "lucide-react";

import { useRef, type MouseEvent } from "react";

import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { Tilt } from "@/components/motion/tilt";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

const metaIcons = [Target, MapPin, Mail] as const;

/**
 * About — editorial split layout with a small identity card.
 */
export function About() {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const onCardMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width - 0.5) * 2}`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height - 0.5) * 2}`);
  };

  return (
    <section id="about" className="relative scroll-mt-24 py-28 sm:py-36" aria-labelledby="about-heading">
      {/* watermark */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute right-0 top-16 select-none font-display text-[clamp(6rem,18vw,16rem)] font-semibold leading-none opacity-40"
      >
        01
      </span>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-6">
        <SectionHeading eyebrow="Who I am" title={site.about.heading} meta="01 / About" id="about-heading" />

        <div className="grid items-start gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          {/* Editorial copy */}
          <div className="max-w-2xl">
            <Reveal direction="up" amount={0.4}>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-bone sm:text-[2rem]">
                {site.about.lead}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.12} amount={0.4}>
              <p className="mt-8 text-base leading-relaxed text-fog sm:text-lg">
                {site.about.body}
              </p>
            </Reveal>

            {/* Principles strip */}
            <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3" stagger={0.12}>
              {["Modern", "Interactive", "Purposeful"].map((word) => (
                <StaggerItem key={word} className="bg-abyss">
                  <div className="group flex h-full flex-col gap-2 p-5 transition-colors duration-300 hover:bg-raised">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/80">—</span>
                    <span className="font-display text-sm font-medium text-bone">{word}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Identity card */}
          <Reveal direction="left" delay={0.1} amount={0.3} className="lg:mt-4">
            <Tilt max={4}>
              <div
                ref={cardRef}
                onMouseMove={onCardMove}
                className="group relative overflow-hidden rounded-card border border-line bg-raised p-8"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* inner glow following the card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(139,123,255,0.12), transparent 60%)",
                  }}
                />

                <div className="relative flex items-center gap-5">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 font-display text-3xl font-semibold text-accent-soft sm:size-20">
                    {site.about.identity.monogram}
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold tracking-tight text-bone">
                      {site.about.identity.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
                      {site.about.identity.role}
                    </p>
                  </div>
                  <span className="ml-auto flex size-9 items-center justify-center rounded-full border border-line text-dim transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent-soft" aria-hidden>
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>

                <div aria-hidden className="my-7 h-px w-full bg-line" />

                <dl className="relative space-y-5">
                  {site.about.identity.meta.map((item, i) => {
                    const Icon = metaIcons[i];
                    return (
                      <div key={item.label} className="flex items-center gap-4">
                        <span className="flex size-8 items-center justify-center rounded-lg border border-line text-accent/80">
                          <Icon className="size-3.5" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-dim">
                            {item.label}
                          </dt>
                          <dd className="truncate text-sm text-fog">
                            {"href" in item && item.href ? (
                              <a href={item.href} className="transition-colors hover:text-accent-soft">
                                {item.value}
                              </a>
                            ) : (
                              item.value
                            )}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>

                {/* decorative corner scan */}
                {!reduced && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
                    animate={{ opacity: [0, 0.7, 0], x: ["-20%", "20%", "-20%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
