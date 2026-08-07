/**
 * Homepage "Choose Your Journey" cards.
 * Mapped to real V2 products — see lib/content/products.ts.
 *
 * Voice rules from the V2 Brand System Standard apply here: plain English,
 * lead with usefulness, name the next action, never shame a learner or parent,
 * and avoid "coaching" in any sense implying licensed professional services.
 */
export type Journey = {
  id: string;
  title: string;
  audience: string;
  description: string;
  href: string;
  highlights: string[];
};

export const journeys: Journey[] = [
  {
    id: "parents",
    title: "Parent Training",
    audience: "Parents & caregivers",
    description:
      "Understand what to practice, how to practice it, and how to support confidence at home — explained plainly, without fear-based advice.",
    href: "/parent-training",
    highlights: ["Guided video modules", "Demonstrations you can copy", "Downloadable home guides"],
  },
  {
    id: "kids",
    title: "Speech Academy",
    audience: "Families & children",
    description:
      "Structured speech-sound lessons a parent with no background in the subject can teach, with practice built into every step.",
    href: "/speech-academy",
    highlights: ["Sound-by-sound lesson paths", "Guided at-home practice", "Progress tracking"],
  },
  {
    id: "english",
    title: "ESL Academy",
    audience: "Adult English learners",
    description:
      "American English pronunciation and real-life speaking, taught for work, school, travel, and the conversations that matter most.",
    href: "/esl-academy",
    highlights: [
      "Pronunciation lessons",
      "Real-life communication practice",
      "First-language transfer guidance",
    ],
  },
];

/**
 * The method, as a genuine sequence — each step depends on the one before it,
 * which is why these carry numbers. Structured around the V2 North Star:
 * every learner should leave understanding what to practice, why it matters,
 * and what to do next.
 */
export const method = [
  {
    step: "01",
    title: "Know what to practice",
    description:
      "Every lesson opens by naming the target plainly: which sound or skill, where the tongue and lips go, and what it should feel like when it's right.",
  },
  {
    step: "02",
    title: "Understand why it matters",
    description:
      "Practice sticks when it connects to real life — being understood at school, at work, on the phone, or at the dinner table. We make that link explicit, never abstract.",
  },
  {
    step: "03",
    title: "Know exactly what to do next",
    description:
      "Every lesson ends with one clear action. No learner should ever finish a TalkWise experience wondering what comes next.",
  },
];

export const membershipBenefits = [
  "Speech Academy — structured speech-sound learning",
  "ESL Academy — American English pronunciation",
  "The full Parent Training library",
  "Interactive Speech Adventures episodes",
  "Resource Library — printables, trackers, guides",
  "New lessons added regularly",
  "Cancel anytime, no contract",
];

/**
 * What signing up to the list actually gets you.
 *
 * There is no free content tier — every TalkWise lesson requires membership.
 * Nothing here may promise lessons, courses, or platform access.
 */
export const updateBenefits = [
  "Practical practice ideas you can use at home",
  "New lesson and episode announcements",
  "Occasional printables and reference sheets",
  "Email or text — you choose, and you can change your mind",
];
