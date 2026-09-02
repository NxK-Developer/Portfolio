/**
 * Projects — EDITABLE PLACEHOLDERS.
 *
 * Replace each entry with a real project when ready. The `demo`
 * and `source` fields are empty strings on purpose: an empty URL
 * renders a placeholder button that explains the link is coming,
 * rather than a dead link. `tone` picks the abstract cover
 * artwork palette (see components/ProjectVisual.tsx).
 */

export type Project = {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  /** Empty string = placeholder (no fake URL). */
  demo: string;
  source: string;
  tone: 0 | 1 | 2;
  year: string;
};

export const projects: Project[] = [
  {
    id: "project-01",
    index: "01",
    title: "Project 01",
    description: "[Short description of the project, its role and the outcome.]",
    tags: ["Tag one", "Tag two", "Tag three"],
    demo: "",
    source: "",
    tone: 0,
    year: "20XX",
  },
  {
    id: "project-02",
    index: "02",
    title: "Project 02",
    description: "[Short description of the project, its role and the outcome.]",
    tags: ["Tag one", "Tag two", "Tag three"],
    demo: "",
    source: "",
    tone: 1,
    year: "20XX",
  },
  {
    id: "project-03",
    index: "03",
    title: "Project 03",
    description: "[Short description of the project, its role and the outcome.]",
    tags: ["Tag one", "Tag two", "Tag three"],
    demo: "",
    source: "",
    tone: 2,
    year: "20XX",
  },
];
