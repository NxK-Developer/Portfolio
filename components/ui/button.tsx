"use client";

import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";

type Variant = "primary" | "ghost";
type Size = "md" | "lg";

export type PlaceholderPayload = { message: string };

/** Fired when a placeholder link (empty URL) is clicked. */
export function notifyPlaceholder(message = "Link coming soon — add your URL in content/site.ts.") {
  const payload = new (window.CustomEvent ?? CustomEvent)("nxk:placeholder", {
    detail: { message },
  }) as CustomEvent<PlaceholderPayload>;
  window.dispatchEvent(payload);
}

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-display text-sm tracking-wide font-medium transition-colors duration-300 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary:
    "bg-bone text-ink hover:bg-accent-soft hover:text-ink shadow-[0_10px_40px_-12px_rgba(139,123,255,0.6)]",
  ghost:
    "border border-line text-bone hover:border-accent/60 hover:bg-accent/10 hover:text-accent-soft",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6",
  lg: "h-[52px] px-8",
};

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  external = false,
  ariaLabel,
  placeholderMessage,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  ariaLabel?: string;
  placeholderMessage?: string;
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]}`;
  const handlePlaceholder = () => notifyPlaceholder(placeholderMessage);

  if (href && href.trim() !== "") {
    return (
      <Magnetic>
        <a
          href={href}
          aria-label={ariaLabel}
          className={classes}
          onClick={(e) => {
            if (onClick) {
              // Handle smooth scrolling ourselves; avoid the double jump.
              e.preventDefault();
              onClick();
            }
          }}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
          {external && (
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          )}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <button type="button" aria-label={ariaLabel} onClick={onClick ?? handlePlaceholder} className={classes}>
        {children}
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
      </button>
    </Magnetic>
  );
}
