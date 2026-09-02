/**
 * Runtime smoke test (jsdom). Not shipped — used by scripts/smoke-run.mjs.
 * Renders the real app, waits for the loading screen, then exercises:
 * nav clicks, mobile menu, form validation + success, placeholder toasts.
 */
import { createRoot } from "react-dom/client";
import { PortfolioApp } from "@/components/portfolio-app";

const results: { name: string; ok: boolean; info?: string }[] = [];
const check = (name: string, ok: boolean, info = "") =>
  results.push({ name, ok, info });

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const $ = (sel: string) => document.querySelector(sel);
const $$ = (sel: string) => [...document.querySelectorAll(sel)];

function click(el: Element) {
  el.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true }));
}
function input(el: Element, value: string) {
  const proto =
    el instanceof window.HTMLTextAreaElement
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value")!.set!;
  setter.call(el, value);
  el.dispatchEvent(new window.Event("input", { bubbles: true }));
  el.dispatchEvent(new window.Event("change", { bubbles: true }));
}

export async function run() {
  const rootEl = document.getElementById("root")!;

  try {
    createRoot(rootEl).render(<PortfolioApp />);

    // Allow React's first concurrent commit to flush, then check the loader.
    await sleep(150);
    check(
      "loader mounting",
      !!$('[role="status"][aria-label="Loading Nxk Developer"]')
    );
    await sleep(3200);
    check(
      "loader completes + unmounts",
      !$('[role="status"][aria-label="Loading Nxk Developer"]')
    );

    // 2. All sections rendered
    for (const id of ["home", "about", "skills", "projects", "process", "partner", "contact"]) {
      check(`section #${id}`, !!document.getElementById(id));
    }

    // 3. Nav: logo + 5 links + mobile toggle (toggle lives inside <nav>)
    const navButtons = $$('nav[aria-label="Primary"] button');
    check("nav renders logo + 5 links + toggle (7 buttons)", navButtons.length === 7);
    const skillsBtn = navButtons.find((b) => b.textContent?.includes("Skills"));
    check("nav Skills button exists", !!skillsBtn);

    // 4. Hero CTAs link to sections
    const heroLinks = $$("#home a[href]");
    check(
      "hero CTAs are real anchors to #projects/#contact",
      heroLinks.some((a) => a.getAttribute("href") === "#projects") &&
        heroLinks.some((a) => a.getAttribute("href") === "#contact")
    );

    // 5. Mobile menu toggle
    const toggle = $('button[aria-controls="mobile-nav"]');
    check("mobile menu toggle exists", !!toggle);
    if (toggle) {
      click(toggle);
      await sleep(300);
      check("mobile menu opens", !!$("#mobile-nav"));
      click(toggle!); // toggle stays mounted through open/close
      await sleep(800); // allow the AnimatePresence exit animation to finish
      check("mobile menu closes", !$("#mobile-nav"));
    }

    // 6. Contact form — invalid submit shows errors
    const form = $("form") as HTMLFormElement;
    check("contact form present", !!form);
    if (form) {
      form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
      await sleep(150);
      const errs = $$('[role="alert"]');
      check("empty submit shows validation errors", errs.length >= 3, `alerts=${errs.length}`);

      const name = $("#contact-name") as HTMLInputElement;
      const email = $("#contact-email") as HTMLInputElement;
      const msg = $("#contact-message") as HTMLTextAreaElement;
      input(name, "Audit Tester");
      input(email, "audit@example.com");
      input(msg, "This is a valid audit test message.");
      await sleep(50);
      form.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
      await sleep(300);
      check(
        "valid submit reaches frontend-ready success",
        !!document.body.textContent?.includes("Message ready to send")
      );
    }

    // 7. Placeholder toast for empty social link
    const socialSoon = $$("button").find((b) => b.textContent?.includes("soon"));
    check("placeholder social button exists", !!socialSoon);
    if (socialSoon) {
      click(socialSoon);
      await sleep(150);
      check(
        "placeholder toast appears",
        !!document.body.textContent?.includes("add your profile URL")
      );
    }

    // 8. Project cards + placeholder demo buttons
    check("3 project cards", $$("#projects article").length === 3);
    check(
      "Live Demo placeholder button exists",
      !!$$("#projects button").find((b) => b.textContent?.includes("Live Demo"))
    );

    // 9. Footer nav
    check("footer nav has 5 links", $$('nav[aria-label="Footer"] a').length === 5);

    // 10. Form got replaced by success panel (aria state OK)
    check("success panel has role=status", !!$('[role="status"]'));
  } catch (err) {
    check("uncaught exception during run", false, String(err));
  }

  const failed = results.filter((r) => !r.ok);
  for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.info ? ` — ${r.info}` : ""}`);
  console.log(failed.length === 0 ? `SMOKE: ALL ${results.length} CHECKS PASS` : `SMOKE: ${failed.length}/${results.length} FAILED`);
  process.exitCode = failed.length === 0 ? 0 : 1;
}
