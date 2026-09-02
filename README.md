# Nxk Developer — Portfolio

A premium, interactive personal portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS v4** and **Motion**.

> Built with [Khushi].

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run audit:smoke  # jsdom runtime smoke test (loader, nav, menu, form, toasts)
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

## Deploy — GitHub Pages (static, no server)

The portfolio is a **100% static site**: `next.config.ts` sets
`output: "export"`, so `next build` emits plain HTML/CSS/JS into `out/`
with **no Node runtime or backend**. Everything is served from the
repository subpath (`basePath: "/Portfolio"`), matching

`https://nxk-developer.github.io/Portfolio/`

### One-time setup

1. In the repository: **Settings → Pages → Build and deployment →
   Source: “GitHub Actions”**.
2. Set the **Pages** environment protection as desired (optional).
3. Push to `main` (or run the workflow manually from the Actions tab).

`.github/workflows/deploy.yml` then:

1. `npm ci` + typecheck + lint
2. `npm run build` → static export in `out/`
3. uploads `out/` as a Pages artifact
4. deploys it to Pages (permissions are scoped to the workflow)

No other configuration is needed — asset paths, manifest `start_url`/`scope`,
OG image URLs and the skip-link target are all already subpath-aware.

### Overrides (only if you change things)

- **Repo renamed / different subpath** — add a repository Variable
  `NEXT_PUBLIC_BASE_PATH` (e.g. `/MyNewName`; use `/` for a user/org site
  at the domain root).
- **Custom domain** — add a repository Variable `NEXT_PUBLIC_SITE_URL`
  (e.g. `https://example.com`); it becomes the canonical/OG origin.

### Preview the built site locally

```bash
npm run build
npm run preview:pages      # serves out/ at http://localhost:4141/Portfolio/
```

`scripts/serve-pages.mjs` behaves like github.io — trailing-slash redirect,
correct MIME types for fonts/`_next` assets, `start_url`-correct subpath and a
custom `404.html`. `npm run dev` also runs under `/Portfolio` locally.

---

**Nxk Developer** · Created with curiosity, creativity & code.
