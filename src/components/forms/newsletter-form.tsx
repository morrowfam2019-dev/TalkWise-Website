"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Newsletter capture. Posts to /api/subscribe, which is the single entry point
 * for every list-building surface (footer, lead magnets, exit intent).
 */
export function NewsletterForm({
  source,
  className,
  placeholder = "you@email.com",
}: {
  source: string;
  className?: string;
  placeholder?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Submitting this form is the consent act; the notice sits below it.
        body: JSON.stringify({ email, source, emailConsent: true, smsConsent: false }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "You're in. Check your inbox.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)} noValidate>
      <div className="flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-white/[0.04] p-1.5 pl-5 transition-colors focus-within:border-gold/60">
        <label htmlFor={`newsletter-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-${source}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          placeholder={placeholder}
          onChange={(event) => setEmail(event.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/35"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Subscribe"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-all duration-300 hover:bg-gold-200 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : status === "success" ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2.5 min-h-[1.25rem] px-1 text-xs",
          status === "error" ? "text-red-400" : "text-gold-300",
        )}
      >
        {message}
      </p>

      <p className="px-1 text-2xs leading-relaxed text-white/30">
        By subscribing you agree to receive TalkWise emails. Unsubscribe anytime.
      </p>
    </form>
  );
}
