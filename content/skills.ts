/**
 * Skills / expertise — purely EDITABLE CATEGORIES.
 *
 * Replace or reorder these freely. The accent index drives the
 * per-card hue (0 = violet, 1 = mint, 2 = warm, 3 = electric).
 */

import {
  Braces,
  Compass,
  Layers,
  MousePointer2,
  PenTool,
  Waves,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  accent: 0 | 1 | 2 | 3;
};

export const skills: Skill[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend Development",
    description:
      "Modern, fast, and maintainable interfaces built on the web platform.",
    tags: ["React", "TypeScript", "Next.js"],
    icon: Braces,
    accent: 0,
  },
  {
    id: "design",
    index: "02",
    title: "Creative Web Design",
    description:
      "Editorial layouts with strong typography and careful visual rhythm.",
    tags: ["UI Systems", "Art Direction", "Motion"],
    icon: Compass,
    accent: 1,
  },
  {
    id: "ux",
    index: "03",
    title: "UI / UX",
    description:
      "Interfaces shaped around clarity, hierarchy and human behavior.",
    tags: ["Prototyping", "Design Systems", "Accessibility"],
    icon: PenTool,
    accent: 2,
  },
  {
    id: "interactive",
    index: "04",
    title: "Interactive Experiences",
    description:
      "Scroll-driven stories, micro-interactions and spatial depth.",
    tags: ["Scroll Animation", "WebGL", "3D"],
    icon: MousePointer2,
    accent: 3,
  },
  {
    id: "apps",
    index: "05",
    title: "Web Applications",
    description:
      "Complete products — components, state, data and deployment.",
    tags: ["Architecture", "APIs", "Performance"],
    icon: Layers,
    accent: 0,
  },
  {
    id: "digital",
    index: "06",
    title: "Digital Experiences",
    description:
      "Single experiences that move, respond, and leave an impression.",
    tags: ["Brand Sites", "Campaigns", "Interactive"],
    icon: Waves,
    accent: 1,
  },
];
