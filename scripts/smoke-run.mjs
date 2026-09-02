/**
 * jsdom harness for scripts/smoke-entry.tsx (audit tooling, not shipped).
 * Sets up DOM globals + browser API stubs, then loads the bundled app.
 */
import { JSDOM } from "jsdom";

const dom = new JSDOM(
  `<!doctype html><html lang="en"><body><div id="root"></div></body></html>`,
  { url: "http://localhost/", pretendToBeVisual: true }
);

const { window } = dom;
const globalScope = globalThis;

for (const key of Object.getOwnPropertyNames(window)) {
  if (!(key in globalScope)) {
    try {
      Object.defineProperty(globalScope, key, {
        value: window[key],
        writable: true,
        configurable: true,
      });
    } catch {
      /* ignore */
    }
  }
}

// --- browser API stubs -------------------------------------------------
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent() {
    return false;
  },
});

class IO {
  constructor(cb) {
    this.cb = cb;
  }
  observe(el) {
    setTimeout(() => this.cb([{ isIntersecting: true, target: el }], this), 0);
  }
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IO;
globalScope.IntersectionObserver = IO;

class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = RO;
globalScope.ResizeObserver = RO;

window.Element.prototype.scrollIntoView = function () {};
window.HTMLElement.prototype.scrollIntoView = function () {};
window.HTMLElement.prototype.setPointerCapture = function () {};
window.HTMLElement.prototype.releasePointerCapture = function () {};

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
  window.cancelAnimationFrame = (id) => clearTimeout(id);
}
globalScope.requestAnimationFrame = window.requestAnimationFrame.bind(window);
globalScope.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);

// --- collect React/runtime errors (deduped, capped) ---------------------
const runtimeErrors = [];
const seen = new Set();
const nativeError = console.error.bind(console);
console.error = (...args) => {
  const msg = args
    .map((a) => (typeof a === "string" ? a : a?.message || String(a)))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  if (!msg || /not implemented|Error: Not implemented|jsdom/i.test(msg)) return;
  if (seen.has(msg)) return;
  seen.add(msg);
  runtimeErrors.push(msg);
  nativeError("[captured]", msg.slice(0, 300));
};

process.on("uncaughtException", (e) => {
  const m = String(e?.stack || e).slice(0, 300);
  if (!seen.has(m)) {
    seen.add(m);
    runtimeErrors.push(m);
  }
});
process.on("unhandledRejection", (e) => {
  const m = String(e?.stack || e).slice(0, 300);
  if (!seen.has(m)) {
    seen.add(m);
    runtimeErrors.push(m);
  }
});

await import("/tmp/nxk-smoke.bundle.mjs").then((m) => m.run());

console.log(runtimeErrors.length === 0 ? "RUNTIME ERRORS: none" : `RUNTIME ERRORS (${runtimeErrors.length} unique):`);
for (const e of runtimeErrors.slice(0, 10)) console.error(" -", e);

process.exit(process.exitCode ?? 0);
