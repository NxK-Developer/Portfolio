"use client";

import { Reveal } from "@/components/reveal";

/** Shared section heading with an eyebrow, word count and title. */
export function SectionHeading({
  eyebrow,
  title,
  meta,
  id,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  /** Small secondary label shown opposite the title (e.g. "01 / About"). */
  meta?: string;
  /** id for aria-labelledby — the visible h2 carries it. */
  id?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div
      className={`mb-14 flex flex-col gap-4 sm:mb-20 ${
        centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={centered ? "flex flex-col items-center" : ""}>
        <Reveal direction="up" amount={0.6}>
          <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            <span className="h-px w-8 bg-accent/70" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal direction="up" delay={0.08} amount={0.6}>
          <h2 id={id} className="font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl lg:text-6xl">
            {title}
            <span className="text-accent">.</span>
          </h2>
        </Reveal>
      </div>
      {meta && (
        <Reveal direction="up" delay={0.16} amount={0.6}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-dim">{meta}</p>
        </Reveal>
      )}
    </div>
  );
}
