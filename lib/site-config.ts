/**
 * Deployment paths — single source of truth for GitHub Pages.
 *
 * This portfolio is deployed as a *project site*, so it is served
 * from the repository subpath, e.g.:
 *
 *   https://nxk-developer.github.io/Portfolio/
 *
 * `basePath` must match the GitHub repository name. Override with the
 * `NEXT_PUBLIC_BASE_PATH` env var when the repo is renamed, or set it
 * to an empty string ("") for a user/org site at the domain root.
 *
 * `NEXT_PUBLIC_SITE_URL` overrides the canonical/OG origin (required
 * when serving from a custom domain).
 */

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "/Portfolio";

/** Normalized base path: "/Portfolio" | "/" (root site) | "" */
export const basePath = rawBasePath.replace(/\/+$/, "");

const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || `https://nxk-developer.github.io`;

/** Absolute origin + base path, e.g. https://nxk-developer.github.io/Portfolio */
export const siteUrl = `${siteOrigin.replace(/\/+$/, "")}${basePath}`;

/** Prefix an app-relative URL with the base path (for static files). */
export const withBasePath = (path: string) =>
  path.startsWith(basePath) ? path : `${basePath}${path}`;
