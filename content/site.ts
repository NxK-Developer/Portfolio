/**
 * ─────────────────────────────────────────────────────────────
 *  NXK SITE CONTENT — edit everything here.
 *
 *  This file is the single source of truth for brand, contact
 *  and footer information. Replace the placeholders below with
 *  your real details when you have them. Nothing here is real
 *  data, so nothing ships with invented information.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Nxk Developer",
  shortName: "NXK",
  title: "Nxk Developer — Creative Developer Portfolio",
  description:
    "Explore Nxk Developer's interactive portfolio, creative web experiences, projects, and digital work.",

  /** Hero */
  hero: {
    overline: "Creative developer — digital experiences",
    lineOne: "Nxk",
    lineTwo: "Developer",
    tagline:
      "Building digital experiences that feel as good as they look.", // ← editable
    primaryCta: "Explore My Work",
    secondaryCta: "Let's Connect",
  },

  /** About — editable placeholder copy, no invented facts */
  about: {
    heading: "About Me",
    lead: "I'm Nxk Developer, focused on creating modern digital experiences, interactive interfaces, and creative web solutions.",
    body: "[Add a short second paragraph here — your approach, what drives you, or what a collaboration feels like.]",
    identity: {
      monogram: "N",
      name: "Nxk Developer",
      role: "[Creative Developer]",
      meta: [
        { label: "Focus", value: "[Interactive web experiences]" },
        { label: "Location", value: "[Your location]" },
        { label: "Contact", value: "[your-email@example.com]", href: "mailto:your-email@example.com" },
      ],
    },
  },

  /** Partner — display only. Do NOT add biography or personal info. */
  partner: {
    label: "Built With",
    name: "Khushi",
  },

  /** Contact */
  contact: {
    heading: "Let's Create Something.",
    support: "Have an idea? Let's turn it into something memorable.",
    /** Displayed email — replace with the real address. */
    email: "your-email@example.com",
    /**
     * Form delivery.
     * Leave empty ("") for the built-in frontend-only mode.
     * To enable real delivery, set this to a form/API endpoint,
     * e.g. "https://formspree.io/f/yourid" or your own API route.
     */
    formEndpoint: "",
  },

  /** Social links — replace "" with real profile URLs. */
  socials: [
    { id: "github", label: "GitHub", url: "" },
    { id: "instagram", label: "Instagram", url: "" },
    { id: "linkedin", label: "LinkedIn", url: "" },
  ] as Social[],

  footer: {
    tagline: "Created with curiosity, creativity & code.",
    credit: "Built with",
    backToTop: "Back to top",
  },
} as const;

export type Social = {
  id: "github" | "instagram" | "linkedin";
  label: string;
  /** Empty string = placeholder (button shows a notice instead of a dead link). */
  url: string;
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
