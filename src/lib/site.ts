export const site = {
  name: "TalkWise Academy",
  shortName: "TalkWise",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://talkwiseacademy.com",
  tagline: "Confidence Begins With Communication.",
  description:
    "TalkWise helps children, families, and adult English learners build clearer communication and stronger confidence through practical, visual, accessible education.",
  membership: {
    price: 30,
    currency: "USD",
    interval: "month",
    /**
     * Checkout and content delivery run on Whop, per the V2 Product Portfolio
     * standard. This site is the marketing and lead-capture layer; membership,
     * payment, and lesson access all live in Whop.
     *
     * Every "Join TalkWise" CTA points here. Change it in one place only.
     */
    checkoutUrl: "https://whop.com/checkout/plan_43qYm7fS1zGEv",
    /** Where existing members go to sign in and reach their lessons. */
    memberUrl: "https://whop.com/orders",
    /** The general Whop storefront/community page — distinct from the
     * plan-specific checkoutUrl above. Use this for "visit us on Whop"
     * links; use checkoutUrl for every "Join" CTA. */
    communityUrl: "https://whop.com/talkwise-academy",
  },
  /**
   * Confirmed by the founder — see "TalkWise Official Links" doc in Drive.
   * (An earlier placeholder Facebook/Instagram handle was live on the site
   * and pointed at an unrelated business — verify any new handle against
   * that doc before shipping it.)
   */
  social: {
    instagram: "https://www.instagram.com/talkwiseofficial",
    tiktok: "https://www.tiktok.com/@talkwiseofficial",
    youtube: "https://www.youtube.com/@TalkWiseWithAaron",
    facebook: "https://www.facebook.com/profile.php?id=1258951573968533",
    linktree: "https://linktr.ee/talkwise1",
  },
  contactEmail: "talkwiseaaron@outlook.com",
} as const;

/**
 * Compliance language, quoted from the V2 Brand System Standard
 * (Drive → TalkWise Headquarters v2 → 04 - Brand System).
 *
 * Do not reword this. The standard forbids therapy, treatment, cure,
 * guaranteed-outcome, and diagnostic language anywhere on the site unless
 * legally reviewed and explicitly approved.
 */
export const DISCLAIMER =
  "TalkWise is educational. It does not diagnose, treat, or replace licensed clinical care.";

/** Longer form, for legal pages and product footers. */
export const EDUCATIONAL_POSITION =
  "TalkWise provides education, practice, tools, and guided learning experiences. It does not diagnose, treat, or replace licensed clinical services.";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  links?: NavLink[];
};

/**
 * Nav is deliberately terse: each dropdown row is a real page, and pages that
 * cover closely related ground share ONE row rather than two. Where a row
 * points at one of a pair, the other page is still reachable — as a
 * cross-link inside the page the row lands on, not through the nav.
 *
 *   About & FAQ        → lands on /about, which links to /faq
 *   Partner & Affiliates → lands on /partner, whose Affiliates card links to /affiliates
 *   Terms & Legal        → lands on /terms, which links to /legal
 *
 * Resource Library is deliberately not linked from navigation — the page
 * still exists and is reachable directly, just not promoted as a top-level
 * destination. Do not re-add it here without asking; it was removed on
 * purpose to cut down the nav, not by oversight.
 */
export const primaryNav: NavGroup[] = [
  {
    label: "Academies",
    links: [
      {
        label: "Speech Academy",
        href: "/speech-academy",
        description: "Speech-sound learning for families",
      },
      {
        label: "ESL Academy",
        href: "/esl-academy",
        description: "American English pronunciation for adults",
      },
      {
        label: "Parent Training",
        href: "/parent-training",
        description: "Practical guidance you can use at home",
      },
      {
        label: "Interactive Speech Adventures",
        href: "/interactive-speech-adventures",
        description: "Story-based practice that never rushes",
      },
      {
        label: "How TalkWise Helps",
        href: "/how-talkwise-helps",
        description: "The method behind every lesson",
      },
    ],
  },
  {
    label: "Explore",
    links: [
      { label: "Gallery", href: "/gallery", description: "Lessons, characters, behind the scenes" },
      { label: "About & FAQ", href: "/about", description: "Why TalkWise exists, and the common questions" },
    ],
  },
  {
    label: "Partner",
    links: [
      {
        label: "Partner & Affiliates",
        href: "/partner",
        description: "Schools, orgs, sponsors, and creators",
      },
      { label: "Contact", href: "/contact", description: "Talk to a human" },
    ],
  },
  { label: "Membership", href: "/membership" },
  { label: "Follow Us", href: "/#follow" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Academies",
    links: [
      { label: "Speech Academy", href: "/speech-academy" },
      { label: "ESL Academy", href: "/esl-academy" },
      { label: "Parent Training", href: "/parent-training" },
      { label: "Interactive Speech Adventures", href: "/interactive-speech-adventures" },
      { label: "How TalkWise Helps", href: "/how-talkwise-helps" },
      { label: "Membership", href: "/membership" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Gallery", href: "/gallery" },
      { label: "About & FAQ", href: "/about" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Partner & Affiliates", href: "/partner" },
      { label: "Schools & Organizations", href: "/partner#schools" },
      { label: "Media & Press", href: "/partner#media" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Get Updates", href: "/updates" },
      { label: "Join TalkWise", href: "https://whop.com/checkout/plan_43qYm7fS1zGEv" },
      { label: "Member Log In", href: "https://whop.com/orders" },
      { label: "TalkWise on Whop", href: "https://whop.com/talkwise-academy" },
      { label: "Membership Details", href: "/membership" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Legal", href: "/terms" },
    ],
  },
];
