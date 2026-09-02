"use client";

import type { Project } from "@/content/projects";

/**
 * Abstract, generative-feeling cover art per project (no stock photos).
 * Pure inline SVG — zero image weight, crisp at any size.
 */
const TONES = [
  {
    orb: "#8b7bff",
    orbSoft: "rgba(139,123,255,0.25)",
    line: "rgba(139,123,255,0.35)",
    cell: "rgba(139,123,255,0.08)",
    bg: "linear-gradient(135deg,#0e1019 0%,#12122a 55%,#0b0c12 100%)",
  },
  {
    orb: "#6fe7c8",
    orbSoft: "rgba(111,231,200,0.22)",
    line: "rgba(111,231,200,0.35)",
    cell: "rgba(111,231,200,0.08)",
    bg: "linear-gradient(135deg,#0b1216 0%,#0d1f22 55%,#0b0c12 100%)",
  },
  {
    orb: "#f2b98c",
    orbSoft: "rgba(242,185,140,0.22)",
    line: "rgba(242,185,140,0.35)",
    cell: "rgba(242,185,140,0.08)",
    bg: "linear-gradient(135deg,#151009 0%,#241a12 55%,#0b0c12 100%)",
  },
] as const;

export function ProjectVisual({ project }: { project: Project }) {
  const tone = TONES[project.tone];
  const uid = project.id;

  return (
    <div
      data-cursor="view"
      className="absolute inset-0 overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.045]"
    >
      <div className="absolute inset-0" style={{ background: tone.bg }} />

      {/* fine grid */}
      <svg className="absolute inset-0 size-full opacity-60" aria-hidden preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`grid-${uid}`} width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M56 0H0V56" fill="none" stroke={tone.cell} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${uid})`} />
      </svg>

      {/* rotating concentric rings (centered — stays circular at any ratio) */}
      <div aria-hidden className="animate-spin-slow absolute inset-0">
        <svg
          className="size-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          <circle cx="500" cy="500" r="452" stroke={tone.line} strokeWidth="3" strokeDasharray="8 26" />
          <circle cx="500" cy="500" r="348" stroke={tone.line} strokeWidth="2" opacity="0.65" />
          <circle cx="500" cy="500" r="238" stroke={tone.line} strokeWidth="2" opacity="0.4" />
        </svg>
      </div>

      {/* orbiting satellite */}
      <div aria-hidden className="animate-spin-slower absolute inset-0">
        <div
          className="absolute left-1/2 top-[8%] size-2 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: tone.orb, boxShadow: `0 0 12px ${tone.orbSoft}` }}
        />
      </div>

      {/* core orb */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full blur-2xl"
          style={{ width: "38%", aspectRatio: "1", backgroundColor: tone.orbSoft }}
        />
        <div
          className="absolute rounded-full border"
          style={{
            width: "22%",
            aspectRatio: "1",
            borderColor: tone.line,
            boxShadow: `0 0 60px -8px ${tone.orbSoft}`,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "13%",
            aspectRatio: "1",
            background: `radial-gradient(circle at 35% 30%, ${tone.orb}, transparent 70%)`,
            opacity: 0.9,
          }}
        />
      </div>

      {/* index + year */}
      <span className="absolute left-6 top-5 font-mono text-[11px] tracking-[0.4em] text-bone/70">
        {project.index}
      </span>
      <span className="absolute right-6 top-5 border border-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.3em] text-bone/50">
        {project.year}
      </span>

      {/* accent edge — a subtle sweep that mirrors the custom cursor */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </div>
  );
}
