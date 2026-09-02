"use client";

import { ArrowUpRight } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/reveal";
import { Tilt } from "@/components/motion/tilt";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills } from "@/content/skills";

/**
 * Acents: restrained per-card hue instead of neon overload.
 */
const ACCENTS = [
  {
    text: "text-accent-soft",
    border: "group-hover:border-accent/50",
    glowBg: "radial-gradient(220px circle at 30% 0%, rgba(139,123,255,0.14), transparent 65%)",
    dot: "bg-accent",
  },
  {
    text: "text-mint",
    border: "group-hover:border-mint/50",
    glowBg: "radial-gradient(220px circle at 30% 0%, rgba(111,231,200,0.1), transparent 65%)",
    dot: "bg-mint",
  },
  {
    text: "text-[#f2b98c]",
    border: "group-hover:border-[#f2b98c]/50",
    glowBg: "radial-gradient(220px circle at 30% 0%, rgba(242,185,140,0.1), transparent 65%)",
    dot: "bg-[#f2b98c]",
  },
  {
    text: "text-[#9ed2ff]",
    border: "group-hover:border-[#9ed2ff]/50",
    glowBg: "radial-gradient(220px circle at 30% 0%, rgba(158,210,255,0.1), transparent 65%)",
    dot: "bg-[#9ed2ff]",
  },
] as const;

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-28 sm:py-36" aria-labelledby="skills-heading">
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute left-0 top-10 select-none font-display text-[clamp(6rem,18vw,16rem)] font-semibold leading-none opacity-40"
      >
        02
      </span>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-6">
        <SectionHeading eyebrow="Expertise" title="What I Build" meta="02 / Skills" id="skills-heading" />

        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {skills.map((skill) => {
            const accent = ACCENTS[skill.accent];
            const Icon = skill.icon;
            return (
              <StaggerItem key={skill.id}>
                <Tilt max={4} className="h-full">
                  <article
                    className={`group relative h-full overflow-hidden rounded-card border border-line bg-raised p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 ${accent.border}`}
                  >
                    {/* hover glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: accent.glowBg }}
                    />

                    <div className="relative flex h-full flex-col">
                      <div className="mb-8 flex items-start justify-between">
                        <span className={`flex size-12 items-center justify-center rounded-xl border border-line bg-abyss text-fog transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 ${accent.text}`}>
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <span className={`font-mono text-[11px] tracking-[0.3em] ${accent.dot} bg-clip-text text-transparent opacity-80`}>
                          /{skill.index}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-semibold tracking-tight text-bone">
                        {skill.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-fog">
                        {skill.description}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-2 pt-1">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-wide text-dim transition-colors duration-300 group-hover:border-line group-hover:text-fog"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span
                        aria-hidden
                        className="mt-auto flex items-center gap-1.5 pt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-dim opacity-0 transition-all duration-500 group-hover:opacity-100"
                      >
                        Explore <ArrowUpRight className="size-3 rotate-45" />
                      </span>
                    </div>
                  </article>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
