"use client";

import { AnimatePresence, motion } from "motion/react";
import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Small toast shown when a placeholder link is clicked,
 * so buttons never feel broken.
 */
export function PlaceholderToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onNotice = (e: Event) => {
      const detail = (e as CustomEvent<{ message: string }>).detail;
      setMessage(detail.message);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(null), 3800);
    };
    window.addEventListener("nxk:placeholder", onNotice);
    return () => {
      window.removeEventListener("nxk:placeholder", onNotice);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2"
        >
          <div className="glass flex items-center gap-3 rounded-full px-5 py-3 text-sm text-bone shadow-2xl">
            <Info className="size-4 shrink-0 text-accent" aria-hidden />
            <span className="whitespace-nowrap">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
