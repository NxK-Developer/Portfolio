/**
 * Faithful GitHub Pages preview server (local only, not shipped).
 *
 * Serves the static export `out/` at the production subpath
 * (default /Portfolio) exactly like github.io:
 *
 *   - GET /Portfolio        → 301 → /Portfolio/
 *   - GET /Portfolio/       → out/index.html
 *   - GET /Portfolio/<file> → out/<file> (correct Content-Type)
 *   - missing → 404.html (status 404)
 *
 * Also aliases the site at "/" so the live preview proxy works.
 *
 * Usage: node scripts/serve-pages.mjs  (or: npm run preview:pages)
 */

import { createServer } from "node:http";
import { existsSync, statSync, createReadStream } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..", "out");
const port = Number(process.env.PORT || 4141);
const base = "/Portfolio";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
};

function send(req, res, file, status = 200) {
  res.writeHead(status, {
    "Content-Type": TYPES[extname(file)] || "application/octet-stream",
    "Cache-Control": status === 404 ? "no-cache" : "public, max-age=31536000, immutable",
  });
  createReadStream(file).pipe(res);
}

function resolvePath(pathname) {
  // Strip expected subpath (or serve root alias for the preview proxy).
  let rest = pathname;
  if (rest === base || rest.startsWith(base + "/")) {
    rest = rest.slice(base.length) || "/";
  }
  if (!rest.startsWith("/")) rest = "/" + rest;

  // Directory → index.html
  if (rest.endsWith("/")) rest += "index.html";
  const file = normalize(join(root, rest));
  if (!file.startsWith(root)) return null; // path traversal guard
  return file;
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let { pathname } = url;

  // Exact subpath without trailing slash → redirect like GitHub Pages.
  if (pathname === base) {
    res.writeHead(301, { Location: `${base}/` });
    res.end();
    return;
  }

  const file = resolvePath(pathname);
  if (file && existsSync(file) && statSync(file).isFile()) {
    send(req, res, file);
    return;
  }

  // html-pretty style lookup (e.g. /Portfolio/about → about.html)
  if (file && existsSync(file + ".html")) {
    send(req, res, file + ".html");
    return;
  }

  // GitHub Pages 404
  const notFound = join(root, "404.html");
  if (existsSync(notFound)) send(req, res, notFound, 404);
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`GitHub Pages preview: http://localhost:${port}${base}/`);
  console.log(`Static root: ${root}`);
});
