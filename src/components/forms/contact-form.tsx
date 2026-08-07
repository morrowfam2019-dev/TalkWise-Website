"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const topics = [
  "Membership & billing",
  "Lessons & academies",
  "Partnerships",
  "Press",
  "Something else",
] as const;

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(body.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(body.message ?? "Message received. We'll reply soon.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="glass gold-hairline flex min-h-[24rem] flex-col items-center justify-center rounded-panel p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl text-ink">
          ✓
        </span>
        <p className="mt-6 font-display text-3xl">Message received.</p>
        <p className="mt-3 max-w-sm text-pretty text-mist">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-panel p-7 sm:p-9" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" required>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="contact-email" required>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="you@email.com"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="What's this about?" htmlFor="contact-topic" required>
          <select
            id="contact-topic"
            name="topic"
            required
            defaultValue={defaultTopic ?? topics[0]}
            className={cn(inputClass, "appearance-none bg-ink-800")}
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" htmlFor="contact-message" required>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            className={cn(inputClass, "h-auto resize-y py-3.5 leading-relaxed")}
            placeholder="Tell us what you need."
          />
        </Field>
      </div>

      {/* Honeypot — bots fill it, humans never see it. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-7 h-14 w-full rounded-full bg-gold text-base font-medium text-ink shadow-[0_10px_40px_-12px_rgba(252,191,17,0.65)] transition-colors duration-300 hover:bg-gold-200 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-3 min-h-[1.25rem] text-center text-xs",
          status === "error" ? "text-red-400" : "text-gold-300",
        )}
      >
        {message}
      </p>
    </form>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-[var(--hairline-strong)] bg-white/[0.03] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold/60";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline gap-2 text-sm text-white/75">
        {label}
        {required ? <span className="text-gold">*</span> : null}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
