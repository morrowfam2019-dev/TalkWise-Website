/**
 * TalkWise Play — the interactive, game-based practice layer of TalkWise
 * Academy. Positioned as educational practice, never therapy — the same
 * educational-boundary rule in lib/site.ts applies here.
 *
 * Do not overstate features that are not live. If a game isn't shipped,
 * it doesn't belong in `features` below.
 */

export const talkwisePlayFeatures = [
  {
    title: "Speech Adventures",
    description: "Explore interactive worlds while practicing sounds, words and sentences.",
  },
  {
    title: "Speech Basketball",
    description: "Practice speech, take shots, beat challenges and build high scores.",
  },
  {
    title: "Quick Play Games",
    description:
      "Short games built around matching, listening, vocabulary, sounds, shapes, sentences and more.",
  },
  {
    title: "Grows With the Learner",
    description:
      "Activities range from beginner sound practice to words, phrases and complete sentences.",
  },
] as const;

export const talkwisePlayProgression = [
  {
    level: "Beginner",
    focus: "Sounds",
  },
  {
    level: "Intermediate",
    focus: "Words & Phrases",
  },
  {
    level: "Expert",
    focus: "Sentences & Communication",
  },
] as const;

export const talkwiseEcosystem = [
  {
    title: "Children's Speech Education",
    description: "Guided practice and interactive learning.",
    href: "/speech-academy",
  },
  {
    title: "TalkWise Play",
    description: "Game-based communication practice.",
    href: "/talkwise-play",
  },
  {
    title: "Parent Training",
    description: "Tools and guidance for supporting learning at home.",
    href: "/parent-training",
  },
  {
    title: "ESL Learning",
    description: "English learning and pronunciation practice.",
    href: "/esl-academy",
  },
] as const;
