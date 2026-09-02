# Nxk Developer — Portfolio

A premium, interactive personal portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS v4** and **Motion**.

> Built with [Khushi].

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
```

## Editing content

Nearly everything lives in `content/` — no component edits needed:

| File | What it controls |
| --- | --- |
| `content/site.ts` | Brand, hero copy, about copy, partner name, email, socials, footer |
| `content/skills.ts` | Skill cards (categories + tags) |
| `content/projects.ts` | Project entries (title, description, tags, live/source URLs, cover tone) |
| `content/process.ts` | Creative process steps |

Placeholders use `[...]` or empty strings on purpose: **no invented personal
information, URLs, achievements or stats ship with this template.**

### Contact form

The form is **frontend-ready** out of the box: it validates and shows a clear
"connect your endpoint" success state. To actually receive messages, set
`formEndpoint` in `content/site.ts` (Formspree, Getform, or any API route).

## Architecture

```
app/                 layout, page, metadata, manifest, favicons
components/          one component per section + shared UI/motion primitives
content/             editable data (site, skills, projects, process)
lib/                 hooks (active section, media queries, body lock)
```

## Accessibility & performance

- Semantic HTML, skip link, visible focus states, aria on all interactive parts
- `prefers-reduced-motion` respected everywhere (loader, cursor, canvas, reveals)
- Custom cursor and mouse-driven effects are desktop fine-pointer only
- Canvas particles pause offscreen; DPR capped; no heavy image assets
- All motion uses GPU-friendly transforms

## Deploy

Push to GitHub and deploy on Vercel / Netlify — the project has no server
dependencies (`next build` output is fully static-capable).

---

**Nxk Developer** · Created with curiosity, creativity & code.
