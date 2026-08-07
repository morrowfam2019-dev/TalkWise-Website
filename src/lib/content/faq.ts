import { EDUCATIONAL_POSITION } from "@/lib/site";

/**
 * Answers follow the V2 Brand System Standard voice rules: plain English,
 * lead with usefulness, name the next action. No diagnosis, treatment claims,
 * guarantees, or fear-based framing. Never shame an accent, a speech
 * difference, a parent, or a learner.
 */
export type FaqItem = {
  question: string;
  answer: string;
  category: FaqCategory;
};

export type FaqCategory =
  | "Getting started"
  | "The lessons"
  | "Membership & billing"
  | "For English learners"
  | "About TalkWise";

export const faqCategories: FaqCategory[] = [
  "Getting started",
  "The lessons",
  "Membership & billing",
  "For English learners",
  "About TalkWise",
];

export const faqs: FaqItem[] = [
  {
    category: "About TalkWise",
    question: "Is TalkWise speech therapy?",
    answer: `No. ${EDUCATIONAL_POSITION} If you have questions about your child's development, a licensed speech-language pathologist is the right person to ask — many families use TalkWise alongside professional care.`,
  },
  {
    category: "About TalkWise",
    question: "What is TalkWise trying to do?",
    answer:
      "TalkWise helps children, families, and adult English learners build clearer communication and stronger confidence through practical, visual, accessible education. Our standard is simple: every learner should leave a TalkWise experience understanding what to practice, why it matters, and what to do next.",
  },
  {
    category: "About TalkWise",
    question: "Who is behind TalkWise?",
    answer:
      "TalkWise was co-founded by Nia and Aaron. Nia is our CEO and a speech-language pathology assistant (SLPA), and leads what TalkWise teaches. Aaron is our COO and CMO, and runs operations, growth, and the production system behind every lesson. On screen, lessons are taught by our educational characters — Miss Maya for speech and family content, and Mr. Diego for English learning.",
  },
  {
    category: "Getting started",
    question: "Which academy should I start with?",
    answer:
      "If you're a parent supporting a child's speech-sound learning, start with Speech Academy and add Parent Training alongside it. If you're an adult learning American English, start with ESL Academy. One membership covers all of them, so you can move between paths without paying more or choosing wrong.",
  },
  {
    category: "Getting started",
    question: "What ages is this for?",
    answer:
      "Speech Academy and Interactive Speech Adventures are built for children learning with a parent or caregiver. Parent Training is for the adults supporting them. ESL Academy is built for adult English learners and is deliberately not child-coded.",
  },
  {
    category: "The lessons",
    question: "Do I need any special equipment?",
    answer:
      "No. A phone, tablet, or computer is enough. Printables from the Resource Library are optional — everything works on screen if you'd rather not print.",
  },
  {
    category: "The lessons",
    question: "What are Interactive Speech Adventures?",
    answer:
      "Story-based speech episodes for children. Each one is built from ten polished scene cards with narration, captions, and deliberately protected pauses, so a child gets time to respond and is never rushed or pressured through a sound.",
  },
  {
    category: "The lessons",
    question: "Who teaches the lessons?",
    answer:
      "Miss Maya leads speech and family content. Mr. Diego leads English learning for adults. TJ is our child character, appearing in Academy lessons and Interactive Speech Adventures. Aaron and Nia appear in founder-led and human-facing content.",
  },
  {
    category: "Membership & billing",
    question: "What does membership cost?",
    answer:
      "One membership, $30 per month, covering every academy and the Resource Library. There are no tiers and no upsells at checkout.",
  },
  {
    category: "Membership & billing",
    question: "Where do the lessons actually live?",
    answer:
      "On Whop, which hosts our membership and course delivery. You join through Whop, and you sign in there to reach your lessons. This site is where you learn what TalkWise is; Whop is where you use it.",
  },
  {
    category: "Membership & billing",
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from your membership settings on Whop. You keep access through the end of the period you've already paid for, and we don't ask you why.",
  },
  {
    category: "For English learners",
    question: "Will TalkWise change my accent?",
    answer:
      "We teach American English pronunciation as a target, not as a correction. Other varieties of English are not inferior, and your accent is not a problem to be erased. Lessons focus on the specific sounds, rhythms, and stress patterns that most affect whether you're understood — so you can be heard clearly while still sounding like yourself.",
  },
  {
    category: "For English learners",
    question: "Do you account for my first language?",
    answer:
      "Yes. Lessons draw on language-transfer context — the specific sounds and patterns that tend to be hardest depending on the language you already speak. Localization means real country and language context, not translated text.",
  },
  {
    category: "For English learners",
    question: "Do I need to know grammar first?",
    answer:
      "No. The pronunciation path is independent of grammar study, and many learners run it alongside a grammar or conversation course.",
  },
];

const HOMEPAGE_QUESTIONS = [
  "Is TalkWise speech therapy?",
  "Which academy should I start with?",
  "What are Interactive Speech Adventures?",
  "What does membership cost?",
  "Will TalkWise change my accent?",
];

export const homepageFaqs = HOMEPAGE_QUESTIONS.map(
  (question) => faqs.find((faq) => faq.question === question)!,
);
