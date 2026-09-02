"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

/**
 * Subtle custom cursor — desktop fine pointers only.
 * dot: exact position · ring: springy · projects: "View" label.
 * Disabled automatically on touch devices & reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("nxk-cursor");

    let x = -100;
    let y = -100;
    let ringX = -100;
    let ringY = -100;
    let visible = false;
    let raf = 0;
    let mode: "default" | "hover" | "view" = "default";

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (target.closest("[data-cursor='view']")) {
        mode = "view";
      } else if (target.closest(INTERACTIVE)) {
        mode = "hover";
      } else {
        mode = "default";
      }
      applyMode();
    };

    const applyMode = () => {
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!ring || !label) return;
      if (mode === "view") {
        ring.style.width = "84px";
        ring.style.height = "84px";
        ring.style.backgroundColor = "rgba(139,123,255,0.08)";
        ring.style.borderColor = "rgba(139,123,255,0.65)";
        label.style.opacity = "1";
      } else if (mode === "hover") {
        ring.style.width = "44px";
        ring.style.height = "44px";
        ring.style.backgroundColor = "rgba(139,123,255,0.1)";
        ring.style.borderColor = "rgba(139,123,255,0.5)";
        label.style.opacity = "0";
      } else {
        ring.style.width = "30px";
        ring.style.height = "30px";
        ring.style.backgroundColor = "transparent";
        ring.style.borderColor = "rgba(237,238,243,0.35)";
        label.style.opacity = "0";
      }
    };

    const onDown = () => {
      if (ringRef.current) ringRef.current.style.scale = "0.82";
    };
    const onUp = () => {
      if (ringRef.current) ringRef.current.style.scale = "1";
    };
    const onLeave = () => {
      visible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const tick = () => {
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("nxk-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95] hidden [@media(pointer:fine)]:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-bone opacity-0 transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border opacity-0 transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{ width: 30, height: 30 }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-soft opacity-0 transition-opacity duration-200"
        >
          View
        </span>
      </div>
    </div>
  );
}
