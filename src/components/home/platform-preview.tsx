"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "kids", label: "Speech Academy", caption: "A lesson, start to finish" },
  { id: "parents", label: "Parent Training", caption: "Practical guidance for the adult in the room" },
  { id: "english", label: "ESL Academy", caption: "Sound-level precision for adult learners" },
  { id: "practice", label: "Daily practice", caption: "Ten minutes, tracked" },
  { id: "community", label: "Community", caption: "Families, comparing notes" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function PlatformPreview() {
  const [active, setActive] = useState<TabId>("kids");
  const current = tabs.find((tab) => tab.id === active)!;

  return (
    <Section id="platform">
      <SectionHeading
        eyebrow="Inside the platform"
        title="This is what you actually get."
        description="Not a promise of content — the real surfaces your family will use every week."
      />

      {/* Tabs. Horizontal scroll on mobile rather than a cramped wrap. */}
      <div
        role="tablist"
        aria-label="Platform previews"
        className="mt-12 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors duration-300",
                selected ? "text-ink" : "text-white/60 hover:text-white",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="platform-tab"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  className="absolute inset-0 rounded-full bg-gold"
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-[var(--hairline)]" />
              )}
              <span className="relative z-10 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <p className="text-sm text-mist">{current.caption}</p>

        <div className="glass relative mt-5 overflow-hidden rounded-panel p-4 sm:p-6 lg:p-8">
          {/* Device chrome — reads as product, not screenshot. */}
          <div className="mb-5 flex items-center gap-2">
            {["#3a3a44", "#3a3a44", "#3a3a44"].map((color, index) => (
              <span
                key={index}
                aria-hidden
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: color }}
              />
            ))}
            <span className="ml-3 truncate rounded-full border border-[var(--hairline)] px-3 py-1 text-2xs text-white/35">
              talkwiseacademy.com/{active}
            </span>
          </div>

          <div
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            className="min-h-[26rem] rounded-card bg-ink-900/70 p-5 sm:min-h-[30rem] sm:p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {active === "kids" ? <KidsPanel /> : null}
                {active === "parents" ? <ParentsPanel /> : null}
                {active === "english" ? <EnglishPanel /> : null}
                {active === "practice" ? <PracticePanel /> : null}
                {active === "community" ? <CommunityPanel /> : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------------- */

function PanelHeading({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      <h3 className="font-display text-2xl tracking-[-0.01em]">{title}</h3>
      <span className="text-2xs uppercase tracking-[0.2em] text-white/35">{meta}</span>
    </div>
  );
}

function KidsPanel() {
  return (
    <div>
      <PanelHeading title="Lesson 07 — The /R/ Sound" meta="Ages 4–8 · 9 min" />

      <div className="mt-7 grid gap-5 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-[var(--hairline)] bg-gradient-to-br from-ink-700 to-ink">
            <Image
              src="/lessons/r-sound-cover.jpg"
              alt="Lesson 18 — The R Sound"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            <button
              type="button"
              aria-label="Play lesson preview"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 hover:scale-105"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="ml-1 h-6 w-6 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            {/* Scrub bar */}
            <div className="absolute inset-x-4 bottom-4">
              <div className="h-1 rounded-full bg-white/15">
                <div className="h-1 w-[38%] rounded-full bg-gold" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["Mouth position", "Word practice", "Sentence practice", "Challenge"].map(
              (chip, index) => (
                <span
                  key={chip}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs",
                    index === 1
                      ? "bg-gold/15 text-gold"
                      : "border border-[var(--hairline)] text-white/45",
                  )}
                >
                  {chip}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="text-2xs uppercase tracking-[0.2em] text-white/35">Practice words</p>
          <ul className="mt-4 space-y-2">
            {[
              { word: "rabbit", done: true },
              { word: "rocket", done: true },
              { word: "river", done: false },
              { word: "around", done: false },
              { word: "carrot", done: false },
            ].map((item) => (
              <li
                key={item.word}
                className="flex items-center justify-between rounded-lg border border-[var(--hairline)] px-4 py-3"
              >
                <span className={cn("text-sm", item.done ? "text-white/45 line-through" : "text-white")}>
                  {item.word}
                </span>
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[0.6rem]",
                    item.done ? "bg-emerald-accent text-white" : "border border-[var(--hairline)]",
                  )}
                >
                  {item.done ? "✓" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ParentsPanel() {
  const modules = [
    { title: "What to do when they get it wrong", length: "6 min", progress: 100 },
    { title: "Turning practice into play", length: "8 min", progress: 100 },
    { title: "Building a ten-minute routine", length: "5 min", progress: 45 },
    { title: "When to bring in a professional", length: "7 min", progress: 0 },
    { title: "Handling frustration — theirs and yours", length: "9 min", progress: 0 },
  ];

  return (
    <div>
      <PanelHeading title="Parent Training" meta="12 modules · Self-paced" />
      <ul className="mt-7 space-y-3">
        {modules.map((module) => (
          <li
            key={module.title}
            className="flex items-center gap-5 rounded-xl border border-[var(--hairline)] p-4 transition-colors hover:border-gold/30 sm:p-5"
          >
            <span
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm",
                module.progress === 100
                  ? "bg-emerald-accent/15 text-emerald-accent"
                  : module.progress > 0
                    ? "bg-gold/15 text-gold"
                    : "border border-[var(--hairline)] text-white/30",
              )}
            >
              {module.progress === 100 ? "✓" : module.progress > 0 ? "▶" : "○"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{module.title}</p>
              <div className="mt-2 h-1 w-full max-w-xs rounded-full bg-white/10">
                <div
                  className="h-1 rounded-full bg-gold"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
            <span className="shrink-0 text-xs tabular-nums text-white/35">{module.length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EnglishPanel() {
  return (
    <div>
      <PanelHeading title="Minimal pairs — /l/ vs /r/" meta="Level 2 · Clarity drill" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          { a: "light", b: "right" },
          { a: "collect", b: "correct" },
          { a: "glass", b: "grass" },
          { a: "play", b: "pray" },
        ].map((pair) => (
          <div key={pair.a} className="rounded-xl border border-[var(--hairline)] p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-2xl">{pair.a}</span>
              <span aria-hidden className="text-xs text-white/25">vs</span>
              <span className="font-display text-2xl text-gold">{pair.b}</span>
            </div>
            {/* Waveform — the shape of the drill, not decoration */}
            <div className="mt-4 flex h-8 items-end gap-[3px]" aria-hidden>
              {Array.from({ length: 34 }).map((_, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-sm bg-gold/30"
                  style={{
                    height: `${18 + Math.abs(Math.sin(index * 0.7)) * 78}%`,
                    opacity: index < 17 ? 0.4 : 0.85,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticePanel() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const done = [true, true, true, true, false, false, false];

  return (
    <div>
      <PanelHeading title="Daily practice" meta="4-day streak" />

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {days.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl text-sm font-medium sm:h-14 sm:w-14",
                done[index]
                  ? "bg-gold text-ink"
                  : "border border-[var(--hairline)] text-white/30",
              )}
            >
              {done[index] ? "✓" : day}
            </span>
            <span className="text-2xs text-white/30">{day}</span>
          </div>
        ))}
      </div>

      <div className="mt-9 rounded-xl border border-gold/25 bg-gold/[0.06] p-6">
        <p className="text-2xs uppercase tracking-[0.2em] text-gold-300">Today&apos;s challenge</p>
        <p className="mt-3 text-pretty font-display text-2xl leading-snug">
          Find five things in your kitchen that start with /R/.
        </p>
        <p className="mt-3 text-sm text-mist">Say each one three times. Two minutes, that&apos;s it.</p>
      </div>
    </div>
  );
}

function CommunityPanel() {
  const posts = [
    {
      author: "Danielle M.",
      role: "Parent · /S/ lessons",
      body: "Third week in. He corrected himself at dinner without me saying anything. I nearly cried.",
    },
    {
      author: "Marcus T.",
      role: "Parent · /R/ lessons",
      body: "The ten-minute framing is what made it stick for us. An hour was never happening.",
    },
    {
      author: "Priya R.",
      role: "English learner",
      body: "Minimal pairs finally made /v/ and /w/ click. Six years of English classes never did that.",
    },
  ];

  return (
    <div>
      <PanelHeading title="Member community" meta="Moderated · Members only" />
      <ul className="mt-7 space-y-3">
        {posts.map((post) => (
          <li key={post.author} className="rounded-xl border border-[var(--hairline)] p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">
                {post.author.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-medium">{post.author}</p>
                <p className="text-2xs text-white/35">{post.role}</p>
              </div>
            </div>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-mist">{post.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-2xs text-white/30">
        Sample posts shown for illustration. Real community content is members-only.
      </p>
    </div>
  );
}
