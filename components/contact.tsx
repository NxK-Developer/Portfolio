"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  Send,
} from "lucide-react";

import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { notifyPlaceholder } from "@/components/ui/button";
import { site, type Social } from "@/content/site";

const SOCIAL_ICONS = {
  github: GithubIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
} as const;

type Status = "idle" | "sending" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const endpoint = useMemo(() => site.contact.formEndpoint, []);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please tell me your name.";
    else if (name.trim().length < 2) next.name = "Name looks too short.";
    if (!email.trim()) next.email = "An email is required.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "That email doesn't look right.";
    if (!message.trim()) next.message = "A message is required.";
    else if (message.trim().length < 10) next.message = "Give me a little more detail — at least 10 characters.";
    return next;
  };

  const onBlur = (field: keyof Errors) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(next).length > 0) return;

    // Frontend-ready capture: without an endpoint we don't fake a send.
    if (!endpoint) {
      setStatus("success");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const fieldClass = (invalid: boolean) =>
    `w-full rounded-xl border bg-abyss px-4 py-3.5 text-sm text-bone placeholder:text-dim/70 transition-colors duration-300 focus:outline-none ${
      invalid
        ? "border-red-400/60 focus:border-red-400"
        : "border-line hover:border-white/15 focus:border-accent/70"
    }`;

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 sm:py-36" aria-labelledby="contact-heading">
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute right-0 bottom-10 select-none font-display text-[clamp(6rem,18vw,16rem)] font-semibold leading-none opacity-40"
      >
        05
      </span>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-6">
        <SectionHeading eyebrow="Contact" title="Let's Create Something." meta="05 / Contact" id="contact-heading" />

        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Left — pitch + details */}
          <div>
            <Reveal direction="up" amount={0.4}>
              <p className="max-w-md text-base leading-relaxed text-fog sm:text-lg">
                {site.contact.support}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.1} amount={0.4}>
              <a
                href={`mailto:${site.contact.email}`}
                className="group mt-10 inline-flex items-center gap-4 font-display text-xl font-semibold tracking-tight text-bone transition-colors hover:text-accent-soft sm:text-2xl"
              >
                <span className="flex size-11 items-center justify-center rounded-xl border border-line bg-raised text-accent transition-transform duration-300 group-hover:-rotate-6">
                  <Mail className="size-4" aria-hidden />
                </span>
                {site.contact.email}
                <ArrowUpRight className="size-4 text-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" aria-hidden />
              </a>
            </Reveal>

            <Reveal direction="up" delay={0.18} amount={0.4}>
              <div className="mt-10 flex flex-wrap gap-3">
                {site.socials.map((social) => (
                  <SocialLink key={social.id} social={social} />
                ))}
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.24} amount={0.4}>
              <p className="mt-10 max-w-sm border-l border-line pl-4 font-mono text-[11px] leading-relaxed tracking-wide text-dim">
                Response time: [typically within N days] — replace this placeholder
                with your own note.
              </p>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal direction="left" amount={0.3}>
            <div className="relative rounded-card border border-line bg-raised/60 p-6 backdrop-blur-sm sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              />

              {status === "success" ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center" role="status">
                  <span className="flex size-16 items-center justify-center rounded-full border border-mint/40 bg-mint/10 text-mint">
                    <CheckCircle2 className="size-7" aria-hidden />
                  </span>
                  <p className="mt-6 font-display text-2xl font-semibold text-bone">
                    Message ready to send<span className="text-mint">.</span>
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-fog">
                    {endpoint
                      ? "Your message left the browser and is on its way."
                      : "The form is frontend-ready. Connect a delivery endpoint in content/site.ts (formEndpoint) and your message will reach you here."}
                  </p>
                  <button
                    onClick={reset}
                    className="mt-8 rounded-full border border-line px-6 py-2.5 text-sm text-fog transition-colors hover:border-accent/50 hover:text-bone"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      id="contact-name"
                      label="Name"
                      error={touched.name ? errors.name : undefined}
                    >
                      <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => onBlur("name")}
                        aria-invalid={Boolean(touched.name && errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className={fieldClass(Boolean(touched.name && errors.name))}
                      />
                    </Field>
                    <Field
                      id="contact-email"
                      label="Email"
                      error={touched.email ? errors.email : undefined}
                    >
                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => onBlur("email")}
                        aria-invalid={Boolean(touched.email && errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className={fieldClass(Boolean(touched.email && errors.email))}
                      />
                    </Field>
                  </div>

                  <Field
                    id="contact-message"
                    label="Message"
                    error={touched.message ? errors.message : undefined}
                  >
                    <textarea
                      id="contact-message"
                      rows={6}
                      placeholder="Tell me about your idea…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onBlur={() => onBlur("message")}
                      aria-invalid={Boolean(touched.message && errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      className={`${fieldClass(Boolean(touched.message && errors.message))} resize-none`}
                    />
                  </Field>

                  {status === "error" && (
                    <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                      Something went wrong while sending. Please try again or email me directly.
                    </p>
                  )}

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-bone px-8 font-display text-sm font-medium tracking-wide text-ink transition-all duration-300 hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden />
                        </>
                      )}
                    </button>
                    {!endpoint && (
                      <p className="font-mono text-[10px] leading-relaxed tracking-wide text-dim">
                        Frontend-ready form · connect <code>formEndpoint</code> in content/site.ts
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function SocialLink({ social }: { social: Social }) {
  const Icon = SOCIAL_ICONS[social.id];
  const placeholder = !social.url;

  if (placeholder) {
    return (
      <button
        type="button"
        onClick={() => notifyPlaceholder(`${social.label} — add your profile URL in content/site.ts`)}
        aria-label={`${social.label} (coming soon)`}
        className="group flex items-center gap-2.5 rounded-full border border-dashed border-line px-5 py-2.5 text-sm text-dim transition-all duration-300 hover:border-accent/50 hover:text-fog"
      >
        <Icon className="size-4" aria-hidden />
        {social.label}
        <span className="font-mono text-[9px] uppercase tracking-widest text-dim/70">soon</span>
      </button>
    );
  }

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2.5 rounded-full border border-line px-5 py-2.5 text-sm text-fog transition-all duration-300 hover:border-accent/50 hover:text-bone"
    >
      <Icon className="size-4 transition-transform duration-300 group-hover:-rotate-6" aria-hidden />
      {social.label}
      <ArrowUpRight className="size-3.5 text-dim transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </a>
  );
}
