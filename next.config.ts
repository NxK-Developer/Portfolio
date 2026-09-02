import type { NextConfig } from "next";
import { basePath } from "./lib/site-config";

/**
 * Static GitHub Pages deployment:
 *
 *  - `output: "export"`  → `next build` emits a fully static site into `out/`
 *    (no server, no Node runtime — pure HTML/CSS/JS).
 *  - `basePath`          → matches the repository name so every asset,
 *    metadata URL and route works from the GitHub Pages subpath
 *    (https://nxk-developer.github.io/Portfolio/).
 *
 * The GitHub Actions workflow (`.github/workflows/deploy.yml`) uploads
 * `out/` to Pages. No backend is required anywhere.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath,
};

export default nextConfig;
