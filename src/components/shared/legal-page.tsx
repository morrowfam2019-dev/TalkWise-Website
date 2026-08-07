import Link from "next/link";

import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

/**
 * Paragraphs are plain strings, but may contain ONE `[label](/href)` markdown
 * link — used for the Terms/Legal cross-link now that they share a single nav
 * row. Kept intentionally minimal: one link per paragraph, no nesting, no
 * general markdown. Reach for a real markdown renderer if this needs more.
 */
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/;

function renderParagraph(text: string) {
  const match = text.match(LINK_PATTERN);
  if (!match || match.index === undefined) return text;

  const [full, label, href] = match;
  const before = text.slice(0, match.index);
  const after = text.slice(match.index + full.length);

  return (
    <>
      {before}
      <Link href={href} className="text-gold underline underline-offset-4 hover:text-gold-200">
        {label}
      </Link>
      {after}
    </>
  );
}

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

/**
 * Shared shell for Privacy, Terms, and Legal Notices.
 *
 * Content is sourced from TalkWise's real Legal & Compliance library (Drive,
 * founder-authored, Status: Complete, effective 2026-08-01) — not a draft.
 * Each source document lists "Approved By:" blank, meaning the founders
 * stand behind these as company policy but outside counsel has not signed
 * off. The banner says exactly that: founder-approved, not yet attorney-
 * reviewed. Do not soften it to imply counsel review that hasn't happened,
 * and do not revert to "draft" language — these are live, effective policy.
 */
export function LegalPage({
  title,
  eyebrow,
  updated,
  intro,
  sections,
  documentId,
}: {
  title: string;
  eyebrow: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  /** Source document ID from the Legal & Compliance library, e.g. "L-001". */
  documentId?: string;
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lede={intro}
        meta={[
          { label: "Effective", value: updated },
          ...(documentId ? [{ label: "Document", value: documentId }] : []),
        ]}
      />

      <Section className="pt-0" bleed>
        <Container size="sm">
          <p className="rounded-card border border-gold/25 bg-gold/[0.06] p-5 text-sm leading-relaxed text-gold-100">
            <strong className="font-medium">Official TalkWise Academy policy.</strong> Approved by
            the founders and effective as stated above. It has not yet been reviewed by outside
            counsel.
          </p>

          <div className="mt-14 space-y-14">
            {sections.map((section, index) => (
              <section key={section.heading}>
                <h2 className="flex items-baseline gap-4 font-display text-2xl tracking-[-0.01em] sm:text-3xl">
                  <span aria-hidden className="text-base tabular-nums text-gold/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4 pl-0 sm:pl-10">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-pretty leading-relaxed text-mist">
                      {renderParagraph(paragraph)}
                    </p>
                  ))}
                  {section.list ? (
                    <ul className="space-y-2.5 pt-2">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 leading-relaxed text-mist">
                          <span
                            aria-hidden
                            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-gold"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
