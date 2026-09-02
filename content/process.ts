/**
 * Creative process — edit freely.
 */

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description: "Understand the idea, the audience, and what should be felt.",
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    description: "Shape direction, typography, motion and visual hierarchy.",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description: "Turn the design into a fast, polished, working experience.",
  },
  {
    id: "refine",
    number: "04",
    title: "Refine",
    description: "Tune the details — motion, spacing, performance, edge cases.",
  },
  {
    id: "launch",
    number: "05",
    title: "Launch",
    description: "Ship it, watch it live, and keep improving from there.",
  },
];
