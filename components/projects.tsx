"use client";

import { ExternalLink } from "lucide-react";

import { GithubIcon } from "@/components/icons/brand-icons";
import { ProjectVisual } from "./projects/project-visual";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button, notifyPlaceholder } from "@/components/ui/button";
import { scrollToSection } from "@/lib/hooks";
import { projects } from "@/content/projects";

/**
 * Selected Work — asymmetric editorial grid on desktop,
 * clean single column on mobile.
 */
const LAYOUTS = [
  "lg:col-span-7",
  "lg:col-span-5 lg:col-start-8 lg:mt-24",
  "lg:col-span-7 lg:col-start-3 lg:-mt-10",
] as const;

const RATIOS = ["aspect-[16/10]", "aspect-[4/3]", "aspect-[16/10]"] as const;

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-28 sm:py-36" aria-labelledby="projects-heading">
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute right-0 top-16 select-none font-display text-[clamp(6rem,18vw,16rem)] font-semibold leading-none opacity-40"
      >
        03
      </span>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          meta="03 / Projects"
          id="projects-heading"
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-28">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              direction="up"
              delay={i * 0.05}
              amount={0.2}
              className={LAYOUTS[i % LAYOUTS.length]}
            >
              <article className="group">
                {/* Visual */}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live demo of ${project.title}`}
                    className={`relative block overflow-hidden rounded-card border border-line bg-raised transition-all duration-500 hover:border-white/15 hover:shadow-2xl hover:shadow-black/50 ${RATIOS[i % RATIOS.length]}`}
                  >
                    <ProjectVisual project={project} />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      notifyPlaceholder(
                        `Add ${project.title}'s live URL in content/projects.ts`
                      )
                    }
                    aria-label={`${project.title} — preview (demo link coming soon)`}
                    className={`relative block w-full overflow-hidden rounded-card border border-line bg-raised text-left transition-all duration-500 hover:border-white/15 hover:shadow-2xl hover:shadow-black/50 ${RATIOS[i % RATIOS.length]}`}
                  >
                    <ProjectVisual project={project} />
                  </button>
                )}

                {/* Meta */}
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-bone transition-colors duration-300 group-hover:text-accent-soft">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-fog">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:max-w-[180px] sm:justify-end">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-wide text-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Button
                    href={project.demo}
                    external={Boolean(project.demo)}
                    ariaLabel={`Open live demo of ${project.title}`}
                    placeholderMessage={`Add ${project.title}'s live URL in content/projects.ts`}
                  >
                    <ExternalLink className="size-4" aria-hidden />
                    Live Demo
                  </Button>
                  <Button
                    href={project.source}
                    external={Boolean(project.source)}
                    variant="ghost"
                    ariaLabel={`Open source code of ${project.title}`}
                    placeholderMessage={`Add ${project.title}'s source URL in content/projects.ts`}
                  >
                    <GithubIcon className="size-4" aria-hidden />
                    Source Code
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Footer note for the section */}
        <Reveal direction="up" amount={0.4} className="mt-24">
          <div className="flex flex-col items-start justify-between gap-6 rounded-card border border-dashed border-line p-8 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-xl font-semibold text-bone">
                More work on the way<span className="text-accent">.</span>
              </p>
              <p className="mt-1 text-sm text-dim">
                Replace these placeholders with real projects in{" "}
                <code className="rounded bg-raised px-1.5 py-0.5 font-mono text-[11px] text-accent-soft">
                  content/projects.ts
                </code>
              </p>
            </div>
            <Button href="#contact" onClick={() => scrollToSection("contact")} variant="ghost">
              Discuss a project
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
