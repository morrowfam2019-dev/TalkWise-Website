/**
 * Source: "Global ESL Growth Engine for Underserved Child Speech Needs"
 * (founder-provided research memo, 2026-08). A weighted model (child
 * population, speech/language burden proxy, SLP service shortage, coverage
 * gap, English-learner demand, and social/video reach) built from WHO,
 * WHO-UNICEF, World Bank, British Council, NIDCD, and DataReportal country
 * reports.
 *
 * TEN_MARKETS is the memo's "operational top 10" — need + English demand +
 * a realistic path to reach through YouTube/TikTok/Instagram/Facebook — NOT
 * the raw top-25 model output. The memo explicitly separates the two: high
 * -need markets with weaker current reach (Ethiopia, Kenya, Tanzania) are a
 * second-wave watchlist, not part of this list.
 *
 * IMPORTANT — what this list may and may not be used to claim:
 * The memo scores market OPPORTUNITY (need + demand + reach), not TalkWise's
 * existing user base. TalkWise has not launched paid international
 * membership yet. Copy built from this list must stay forward-looking
 * ("built for," "reaches learners across") — never state or imply these are
 * countries current members already come from. That distinction is a direct
 * application of the memo's own FTC/platform-compliance section: claims must
 * be truthful and not misleading.
 */
export const TEN_MARKETS = [
  "India",
  "Pakistan",
  "Indonesia",
  "Bangladesh",
  "Egypt",
  "Nigeria",
  "Brazil",
  "Mexico",
  "Vietnam",
  "Colombia",
] as const;

export type GrowthMarket = (typeof TEN_MARKETS)[number];
