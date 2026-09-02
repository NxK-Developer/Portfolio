"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { navLinks, site } from "@/content/site";
import { scrollToSection, useActiveSection } from "@/lib/hooks";

const sectionIds = navLinks.map((l) => l.id);

export function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape and lock scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Let the menu close before scrolling on mobile.
    setTimeout(() => scrollToSection(id), open ? 80 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${
          scrolled ? "pt-3 md:pt-4" : "pt-5 md:pt-7"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[max-width] duration-500 sm:px-6 ${
            scrolled ? "md:max-w-5xl" : ""
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-3 rounded-full py-1"
            aria-label="Nxk Developer — back to top"
          >
            <span className="relative flex size-9 items-center justify-center rounded-xl border border-line bg-raised font-display text-xs font-semibold text-accent-soft transition-colors duration-300 group-hover:border-accent/50">
              N
              <span className="absolute -right-1 -top-1 size-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" aria-hidden />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-bone">
              Nxk<span className="text-dim"> Developer</span>
            </span>
          </button>

          {/* Desktop links */}
          <div
            className={`hidden items-center gap-1 rounded-full p-1.5 transition-all duration-500 md:flex ${
              scrolled ? "glass" : "border border-transparent"
            }`}
          >
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    isActive ? "text-bone" : "text-fog hover:text-bone"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-line bg-raised"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      aria-hidden
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-50 flex size-11 items-center justify-center rounded-full border border-line bg-raised/80 md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-bone transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-bone transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-bone transition-all duration-300 ${
                  open ? "bottom-auto top-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              className="flex flex-col gap-2 px-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  onClick={() => go(link.id)}
                  className={`group flex items-baseline gap-4 text-left font-display text-4xl font-semibold tracking-tight transition-colors ${
                    active === link.id ? "text-accent-soft" : "text-bone"
                  }`}
                >
                  <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </motion.nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="absolute bottom-10 left-8 font-mono text-xs uppercase tracking-[0.3em] text-dim"
            >
              {site.name}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
