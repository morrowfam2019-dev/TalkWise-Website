import Image from "next/image";

import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

/**
 * Titles confirmed by the founders (2026-08-04), superseding the older role
 * descriptions in the V2 Brand System Standard.
 *
 * Nia's SLPA credential may be stated as a fact about her background. It must
 * never be used to imply TalkWise delivers therapy — the educational boundary
 * in lib/site.ts applies regardless of who is on the team.
 */
const founders = [
  {
    name: "Nia",
    role: "Co-Founder, CEO",
    credential: "SLPA",
    initial: "N",
    photo: "/founders/nia.webp",
    bio: "A speech-language pathology assistant by training, Nia leads TalkWise and the substance of what it teaches — shaping how each concept is explained so a parent with no background in the subject can teach it confidently at home.",
  },
  {
    name: "Aaron",
    role: "Co-Founder, COO & CMO",
    initial: "A",
    photo: "/founders/aaron.webp",
    bio: "Runs operations and growth, and builds the production system behind every lesson — the curriculum structure, the characters, and the pipeline that keeps a small team shipping like a much larger one.",
  },
];

/**
 * Portrait frames fall back to a monogram plate for any founder without a
 * `photo` set.
 */
export function Founders() {
  return (
    <Section id="founders">
      <SectionHeading
        eyebrow="Meet the founders"
        title="Made by people who answer their own email."
        description="TalkWise is not a content mill. Every lesson is written, voiced, and produced in-house — led by a speech-language pathology assistant who knows what actually helps a family at home."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:gap-12">
        {founders.map((founder, index) => (
          <Reveal key={founder.name} delay={index * 0.12}>
            <figure className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-panel border border-[var(--hairline)] bg-gradient-to-br from-ink-700 via-ink-800 to-ink">
                {founder.photo ? (
                  <Image
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.role}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 460px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-[11rem] leading-none text-gold/15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                      {founder.initial}
                    </span>
                  </div>
                )}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"
                />
                <div
                  aria-hidden
                  className="absolute -inset-x-10 bottom-0 h-40 opacity-40 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(50% 100% at 50% 100%, var(--color-gold) 0%, transparent 70%)",
                  }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <p className="flex flex-wrap items-baseline gap-3 font-display text-4xl tracking-[-0.02em]">
                    {founder.name}
                    {founder.credential ? (
                      <span className="rounded-full border border-gold/40 px-3 py-1 font-sans text-2xs font-medium uppercase tracking-[0.18em] text-gold">
                        {founder.credential}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-2 text-2xs uppercase tracking-[0.2em] text-gold-300">
                    {founder.role}
                  </p>
                </figcaption>
              </div>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-mist">{founder.bio}</p>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
