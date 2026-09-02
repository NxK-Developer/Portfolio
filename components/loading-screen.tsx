"use client";

import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NXK = ["N", "X", "K"] as const;
const REVEAL_AT = 1.0; // seconds — when "NXK" hands over to the brand mark
const TOTAL = 2.1;

/**
 * Cinematic loading screen:
 *  "N X K" → "Nxk Developer" → curtain exit.
 * Skipped into a short static state for reduced motion.
 */
export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"nxk" | "brand">("nxk");
  const completed = useRef(false);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: reduced ? 0.35 : TOTAL,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
    });

    const phaseTimer = setTimeout(
      () => setPhase("brand"),
      reduced ? 150 : REVEAL_AT * 1000
    );
    const doneTimer = setTimeout(
      () => {
        if (!completed.current) {
          completed.current = true;
          onComplete();
        }
      },
      (reduced ? 0.8 : TOTAL) * 1000
    );

    return () => {
      controls.stop();
      clearTimeout(phaseTimer);
      clearTimeout(doneTimer);
    };
  }, [reduced, onComplete]);

  const letter = {
    hidden: { y: "110%", rotate: 6 },
    show: (i: number) => ({
      y: "0%",
      rotate: 0,
      transition: {
        delay: 0.12 + i * 0.09,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
    exit: { y: "-120%", opacity: 0, transition: { duration: 0.45, ease: [0.6, 0, 0.7, 1] as const } },
  };

  const brandReveal = {
    hidden: { y: "115%" },
    show: { y: "0%", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      role="status"
      aria-label="Loading Nxk Developer"
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(6px)",
        transition: { duration: 0.65, ease: [0.6, 0, 0.4, 1] },
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]"
      />

      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {phase === "nxk" ? (
            <motion.div
              key="nxk"
              className="flex overflow-hidden font-display text-[clamp(4rem,14vw,9rem)] font-semibold leading-none tracking-tight"
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div aria-hidden className="flex">
                {NXK.map((l, i) => (
                  <motion.span key={l} custom={i} variants={letter} className="inline-block">
                    {l}
                  </motion.span>
                ))}
              </div>
              <span className="sr-only">NXK</span>
            </motion.div>
          ) : (
            <motion.div
              key="brand"
              className="flex flex-col items-center text-center"
              initial="hidden"
              animate="show"
            >
              <div className="overflow-hidden">
                <motion.p
                  variants={brandReveal}
                  className="font-display text-[clamp(2.6rem,8vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-bone"
                >
                  Nxk <span className="text-accent">Developer</span>
                </motion.p>
              </div>
              <div className="mt-4 overflow-hidden">
                <motion.p
                  variants={brandReveal}
                  className="font-mono text-xs uppercase tracking-[0.45em] text-dim"
                >
                  Digital experiences
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress */}
        <div className="mt-14 flex w-56 flex-col items-center gap-3 sm:w-72">
          <div className="flex w-full items-baseline justify-between font-mono text-[11px] tracking-[0.2em] text-dim">
            <span>{phase === "nxk" ? "INITIALIZING" : "LOADING IDENTITY"}</span>
            <span className="tabular-nums text-accent-soft">{progress}%</span>
          </div>
          <div className="relative h-px w-full overflow-hidden bg-line">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
