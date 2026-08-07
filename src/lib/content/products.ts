/**
 * Source of truth: "TalkWise V2 Product Portfolio & Operating Standard"
 * and "TalkWise V2 Mission & Vision" (Drive → TalkWise Headquarters v2).
 *
 * Product names, audiences, and promises are quoted or closely paraphrased
 * from those documents. Do not invent products or soften the educational
 * boundary language — both are governed by the V2 Brand System Standard.
 */

export type ProductStatus =
  | "Concept"
  | "Building"
  | "Content Complete"
  | "Launch Ready"
  | "Live";

export type Product = {
  id: string;
  /** Canonical product name from the V2 portfolio. */
  name: string;
  /** Route on this site. */
  href: string;
  audience: string;
  /** "Primary need" in the portfolio doc. */
  need: string;
  /** "Core promise" in the portfolio doc. */
  promise: string;
  description: string;
  /** Approved presenter(s) per the Brand System Standard. */
  presenter?: string;
  status: ProductStatus;
  highlights: string[];
  /** Approved content pillars this product routes to. */
  pillars: Pillar[];
};

export type Pillar =
  | "Learn English Clearly"
  | "Speak With Confidence"
  | "English for Real Life"
  | "Global English"
  | "Parent and Family Support"
  | "TalkWise Products and Learning Paths"
  | "TalkWise Brand and Founder Story";

export const pillars: Pillar[] = [
  "Learn English Clearly",
  "Speak With Confidence",
  "English for Real Life",
  "Global English",
  "Parent and Family Support",
  "TalkWise Products and Learning Paths",
  "TalkWise Brand and Founder Story",
];

export const products: Product[] = [
  {
    id: "speech-academy",
    name: "Speech Academy",
    href: "/speech-academy",
    audience: "Parents, caregivers, and children",
    need: "Clear, structured, family-friendly education and practice support.",
    promise: "Help families understand and practice communication skills with confidence.",
    description:
      "Structured lessons for speech-sound learning, built so a parent with no background in the subject can teach them at home. Sound learning, guided practice, parent support, and the resources that go with them.",
    presenter: "Miss Maya",
    status: "Building",
    highlights: [
      "Sound-by-sound lesson paths",
      "Guided at-home practice",
      "Parent support built into every lesson",
      "Progress tracking",
    ],
    pillars: [
      "Speak With Confidence",
      "Parent and Family Support",
      "TalkWise Products and Learning Paths",
    ],
  },
  {
    id: "esl-academy",
    name: "ESL Academy",
    href: "/esl-academy",
    audience: "Adult English learners worldwide",
    need: "Clearer American English pronunciation, stronger real-life communication, and greater speaking confidence.",
    promise: "Practical American English learning connected to real situations.",
    description:
      "American English pronunciation and real-life speaking, taught for the situations that actually matter — work, school, travel, interviews, and everyday conversation. Localized by country and first language, not by translation alone.",
    presenter: "Mr. Diego",
    status: "Building",
    highlights: [
      "American English pronunciation lessons",
      "Real-life communication practice",
      "First-language transfer guidance",
      "Country-specific learner context",
    ],
    pillars: [
      "Learn English Clearly",
      "Speak With Confidence",
      "English for Real Life",
      "Global English",
      "TalkWise Products and Learning Paths",
    ],
  },
  {
    id: "parent-training",
    name: "Parent Training",
    href: "/parent-training",
    audience: "Parents and caregivers",
    need: "Understand what to do, how to practice, and how to support confidence — without fear-based messaging.",
    promise: "Give families practical educational guidance they can use at home.",
    description:
      "Guidance for the adult in the room. Video, demonstrations, checklists, and downloadable guides that explain what to practice, why it matters, and what to do next.",
    status: "Building",
    highlights: [
      "Guided video modules",
      "Demonstrations you can copy",
      "Practical checklists",
      "Downloadable home guides",
    ],
    pillars: [
      "Parent and Family Support",
      "Speak With Confidence",
      "TalkWise Products and Learning Paths",
    ],
  },
  {
    id: "interactive-speech-adventures",
    name: "Interactive Speech Adventures",
    href: "/interactive-speech-adventures",
    audience: "Children and families",
    need: "Engaging practice that protects learner pauses and avoids pressure.",
    promise: "Turn speech practice into a polished interactive adventure.",
    description:
      "Story-based speech episodes: ten scene cards, gentle camera movement, captions, narration, and deliberately protected pauses so a child is never rushed through a sound.",
    presenter: "TJ",
    status: "Building",
    highlights: [
      "Ten polished scene cards per episode",
      "Narration with captions",
      "Protected learner pauses",
      "One approved reference episode complete",
    ],
    pillars: [
      "Speak With Confidence",
      "Parent and Family Support",
      "TalkWise Products and Learning Paths",
    ],
  },
  {
    id: "resource-library",
    name: "Resource Library",
    href: "/resources",
    audience: "TalkWise members",
    need: "Easy access to organized, useful resources.",
    promise: "Make TalkWise easier to use and apply consistently.",
    description:
      "PDFs, checklists, trackers, guides, and templates — the practical materials that turn a lesson into something you actually do on a Tuesday night.",
    status: "Building",
    highlights: [
      "Printable practice materials",
      "Progress trackers",
      "Reference guides",
      "Reusable templates",
    ],
    pillars: [
      "Parent and Family Support",
      "Learn English Clearly",
      "TalkWise Products and Learning Paths",
    ],
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

/** Mission & Vision, quoted from the V2 standard. */
export const mission = {
  statement:
    "TalkWise helps children, families, adult English learners, and future professional learners build clearer communication and stronger confidence through practical, visual, accessible education.",
  vision:
    "TalkWise will become a trusted global communication-learning company with connected products for speech education, American English pronunciation, parent support, real-life communication, and future professional communication training.",
  northStar:
    "Every learner should leave a TalkWise experience understanding what to practice, why it matters, and what to do next.",
  promise: "Confidence through communication.",
  serves: [
    "Families supporting children's communication development.",
    "Adult ESL learners building American English pronunciation and real-life speaking skills.",
    "Learners seeking confidence in school, work, travel, relationships, interviews, and everyday communication.",
    "Future TalkWise audiences, including business and professional communication learners.",
  ],
};

/** Brand personality, from the V2 Brand System Standard. */
export const brandPersonality = [
  "Clear",
  "Encouraging",
  "Credible",
  "Practical",
  "Modern",
  "Inclusive",
  "Hopeful",
];
