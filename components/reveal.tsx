"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { createElement, type ComponentPropsWithoutRef, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  duration?: number;
  direction?: Direction;
  once?: boolean;
  amount?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li" | "p" | "header" | "footer";
};

/**
 * Scroll-triggered reveal used across every section.
 * Falls back to an instant, non-animated render for
 * prefers-reduced-motion users.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  direction = "up",
  once = true,
  amount = 0.25,
  className,
  as = "div",
  ...rest
}: RevealProps & ComponentPropsWithoutRef<typeof motion.div>) {
  const reduced = useReducedMotion();

  if (reduced) {
    return createElement(as, { className, ...rest }, children);
  }

  const MotionTag = (motion[as] ?? motion.div) as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0, ...offset[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Stagger container — children should use <StaggerItem />. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "span";
}) {
  const reduced = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const MotionTag = (motion[as] ?? motion.div) as typeof motion.div;
  return (
    <MotionTag className={className} variants={reduced ? undefined : variants}>
      {children}
    </MotionTag>
  );
}

export const EASE = [0.22, 1, 0.36, 1] as const;
