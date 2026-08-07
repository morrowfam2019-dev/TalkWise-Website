"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const INTERESTS = [
  "Speech Sounds",
  "Parent Education",
  "English",
  "Updates",
  "Community",
] as const;

const ROLES = [
  "Parent",
  "Caregiver",
  "Educator",
  "Speech Professional",
  "English Learner",
] as const;

type Status = "idle" | "loading" | "success" | "error";

/**
 * Updates signup — email and optional SMS.
 *
 * This is NOT an account and grants no lesson access. Membership is purchased
 * on Whop; this form only collects contact permission.
 *
 * Email and SMS consent are deliberately SEPARATE checkboxes, both unticked by
 * default. Bundling them, or pre-ticking either, would not be valid consent —
 * SMS in particular carries its own disclosure requirements.
 */
export function UpdatesSignupForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<string>("");
  const [interests, setInterests] = useState<string[]>(["Speech Sounds"]);
  const [emailConsent, setEmailConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function toggleInterest(interest: string) {
    setInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "loading") return;

    if (!emailConsent) {
      setStatus("error");
      setMessage("Please tick the email box so we know it's okay to write to you.");
      return;
    }
    if (smsConsent && !phone.trim()) {
      setStatus("error");
      setMessage("Add a phone number, or untick the text-message box.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          // Only transmit the phone number if they actually consented to texts.
          phone: smsConsent ? phone : undefined,
          role: role || undefined,
          interests,
          emailConsent,
          smsConsent,
          source: compact ? "updates-inline" : "updates-page",
        }),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "You're on the list. Check your inbox.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="glass gold-hairline flex min-h-[22rem] flex-col items-center justify-center rounded-panel p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl text-ink">
          ✓
        </span>
        <p className="mt-6 font-display text-3xl">You&apos;re on the list.</p>
        <p className="mt-3 max-w-sm text-pretty text-mist">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-panel p-7 sm:p-9" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email address" htmlFor="updates-email" required>
          <input
            id="updates-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className={inputClass}
          />
        </Field>

        <Field label="Mobile number" htmlFor="updates-phone" hint="Optional">
          <input
            id="updates-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="(555) 000-0000"
            className={inputClass}
          />
        </Field>
      </div>

      {!compact ? (
        <div className="mt-5">
          <Field label="I'm a…" htmlFor="updates-role" hint="Optional">
            <select
              id="updates-role"
              name="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className={cn(inputClass, "appearance-none bg-ink-800")}
            >
              <option value="">Prefer not to say</option>
              {ROLES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>
        </div>
      ) : null}

      <fieldset className="mt-7">
        <legend className="text-2xs uppercase tracking-[0.2em] text-white/45">
          What should we send you?
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {INTERESTS.map((interest) => {
            const checked = interests.includes(interest);
            return (
              <label
                key={interest}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-300",
                  checked
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-[var(--hairline)] text-white/55 hover:border-white/30 hover:text-white",
                )}
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  checked={checked}
                  onChange={() => toggleInterest(interest)}
                  className="sr-only"
                />
                {interest}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-8 space-y-4 border-t border-[var(--hairline)] pt-7">
        <legend className="sr-only">Contact permissions</legend>

        <ConsentToggle
          id="consent-email"
          checked={emailConsent}
          onChange={setEmailConsent}
          label="Email me TalkWise updates"
          detail="Practice ideas, new lessons, and occasional announcements. Unsubscribe in one click, anytime."
        />

        <ConsentToggle
          id="consent-sms"
          checked={smsConsent}
          onChange={setSmsConsent}
          label="Text me TalkWise updates"
          detail="Recurring messages. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to cancel, HELP for help."
        />
      </fieldset>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-7 h-14 w-full rounded-full bg-gold text-base font-medium text-ink shadow-[0_10px_40px_-12px_rgba(252,191,17,0.65)] transition-colors duration-300 hover:bg-gold-200 disabled:opacity-60"
      >
        {status === "loading" ? "Signing you up…" : "Sign me up"}
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

      <p className="mt-4 text-center text-2xs leading-relaxed text-white/35">
        We never sell your information. See our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-white/60">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}

function ConsentToggle({
  id,
  checked,
  onChange,
  label,
  detail,
}: {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  detail: string;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-4">
      <span className="relative mt-0.5 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={cn(
            "block h-6 w-11 rounded-full border transition-colors duration-300",
            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
            checked ? "border-gold bg-gold" : "border-[var(--hairline-strong)] bg-white/[0.06]",
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute left-0.5 top-0.5 block h-5 w-5 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            checked ? "translate-x-5 bg-ink" : "translate-x-0 bg-white/60",
          )}
        />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-white/90">{label}</span>
        <span className="mt-1 block text-2xs leading-relaxed text-white/40">{detail}</span>
      </span>
    </label>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-[var(--hairline-strong)] bg-white/[0.03] px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold/60";

function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline gap-2 text-sm text-white/75">
        {label}
        {required ? <span className="text-gold">*</span> : null}
        {hint ? <span className="text-2xs text-white/35">{hint}</span> : null}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
