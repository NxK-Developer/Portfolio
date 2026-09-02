"use client";

import { ArrowUp } from "lucide-react";

import { navLinks, site } from "@/content/site";
import { scrollToSection } from "@/lib/hooks";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* giant ghost wordmark */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center">
        <p className="text-outline -mb-[2.5vw] font-display text-[clamp(5rem,20vw,17rem)] font-semibold leading-none tracking-tight opacity-30">
          NXK
        </p>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-16 sm:px-8 lg:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="inline-flex items-center gap-3 text-bone"
            >
              <span className="relative flex size-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 font-display text-sm font-semibold text-accent-soft">
                N
                <span className="absolute -right-1 -top-1 size-2 rounded-full bg-accent" aria-hidden />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                {site.name}
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-dim">
              {site.footer.tagline}
            </p>
          </div>

          {/* Quick nav */}
          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="text-sm text-fog transition-colors hover:text-accent-soft"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <button
            onClick={() => scrollToSection("home")}
            className="group flex items-center gap-3 self-start rounded-full border border-line px-5 py-3 text-sm text-fog transition-colors hover:border-accent/50 hover:text-bone"
          >
            {site.footer.backToTop}
            <span className="flex size-6 items-center justify-center rounded-full bg-raised transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="size-3.5" aria-hidden />
            </span>
          </button>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] tracking-wider text-dim">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-wider text-dim">
            A project by {site.name} · {site.footer.credit}{" "}
            <span className="text-mint">{site.partner.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
