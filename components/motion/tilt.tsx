"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Subtle 3D tilt on desktop only (reduced-motion aware).
 * Uses a single rotateX/rotateY transform — cheap and GPU-friendly.
 */
export function Tilt({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)", transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}
