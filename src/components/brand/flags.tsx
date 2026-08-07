/**
 * Flags for the ESL Academy procession.
 *
 * Country selection follows "Global ESL Growth Engine for Underserved Child
 * Speech Needs" (founder-provided, 2026-08) — a weighted model citing WHO,
 * WHO-UNICEF, World Bank, British Council, NIDCD, and DataReportal country
 * reports. The document's "operational top 10" (need + English demand +
 * realistic social-video reach) is: India, Pakistan, Indonesia, Bangladesh,
 * Egypt, Nigeria, Brazil, Mexico, Vietnam, Colombia. All ten are represented
 * here — see `lib/content/growth-markets.ts` for the full citation.
 *
 * Most flags are hand-drawn vector, sized to a 3:2 field. A flag rendered
 * wrong disrespects the country it claims to represent, which the V2 Brand
 * System Standard treats as a hard failure — so Egypt and Mexico, whose
 * emblems are too fine-detailed to hand-draw faithfully, are NOT approximated
 * here. They render from real files instead: `public/flags/eg.svg` and
 * `public/flags/mx.svg`, sourced from the flag-icons project (MIT licensed,
 * https://github.com/lipis/flag-icons). Do not replace those two with
 * hand-drawn approximations.
 */

export type FlagCode =
  | "jp" | "vn" | "cn" | "in" | "ua" | "pl"
  | "fr" | "de" | "ng" | "co" | "br" | "id"
  | "pk" | "bd" | "eg" | "mx";

export const FLAG_LABELS: Record<FlagCode, string> = {
  jp: "Japan",
  vn: "Vietnam",
  cn: "China",
  in: "India",
  ua: "Ukraine",
  pl: "Poland",
  fr: "France",
  de: "Germany",
  ng: "Nigeria",
  co: "Colombia",
  br: "Brazil",
  id: "Indonesia",
  pk: "Pakistan",
  bd: "Bangladesh",
  eg: "Egypt",
  mx: "Mexico",
};

/** Flags rendered from a real file in public/flags/ rather than drawn inline. */
const EXTERNAL_FILE_FLAGS = new Set<FlagCode>(["eg", "mx"]);

/** Five-pointed star, point-up, centred on (cx, cy). */
function star(cx: number, cy: number, r: number, rotation = -90) {
  // Fixed precision keeps the server and client markup byte-identical.
  const n = (v: number) => v.toFixed(3);
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const outer = ((rotation + i * 72) * Math.PI) / 180;
    const inner = ((rotation + i * 72 + 36) * Math.PI) / 180;
    pts.push(`${n(cx + Math.cos(outer) * r)},${n(cy + Math.sin(outer) * r)}`);
    pts.push(`${n(cx + Math.cos(inner) * r * 0.382)},${n(cy + Math.sin(inner) * r * 0.382)}`);
  }
  return pts.join(" ");
}

const FLAGS: Partial<Record<FlagCode, React.ReactNode>> = {
  jp: (
    <>
      <rect width="60" height="40" fill="#fff" />
      <circle cx="30" cy="20" r="12" fill="#BC002D" />
    </>
  ),
  vn: (
    <>
      <rect width="60" height="40" fill="#DA251D" />
      <polygon points={star(30, 20, 11)} fill="#FFFF00" />
    </>
  ),
  cn: (
    <>
      <rect width="60" height="40" fill="#DE2910" />
      <polygon points={star(10, 10, 6)} fill="#FFDE00" />
      <polygon points={star(20, 4.5, 2)} fill="#FFDE00" />
      <polygon points={star(24, 8.5, 2)} fill="#FFDE00" />
      <polygon points={star(24, 14, 2)} fill="#FFDE00" />
      <polygon points={star(20, 18, 2)} fill="#FFDE00" />
    </>
  ),
  in: (
    <>
      <rect width="60" height="13.34" fill="#FF9933" />
      <rect y="13.34" width="60" height="13.33" fill="#fff" />
      <rect y="26.67" width="60" height="13.33" fill="#138808" />
      <circle cx="30" cy="20" r="5.2" fill="none" stroke="#000080" strokeWidth="0.9" />
      <circle cx="30" cy="20" r="1.1" fill="#000080" />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i * 15 * Math.PI) / 180;
        // Round before rendering: React serializes raw floats to slightly
        // different strings on server and client, which trips a hydration
        // mismatch on every spoke.
        const r3 = (n: number) => Number(n.toFixed(3));
        return (
          <line
            key={i}
            x1={r3(30 + Math.cos(a) * 1.1)}
            y1={r3(20 + Math.sin(a) * 1.1)}
            x2={r3(30 + Math.cos(a) * 5.2)}
            y2={r3(20 + Math.sin(a) * 5.2)}
            stroke="#000080"
            strokeWidth="0.35"
          />
        );
      })}
    </>
  ),
  ua: (
    <>
      <rect width="60" height="20" fill="#0057B7" />
      <rect y="20" width="60" height="20" fill="#FFDD00" />
    </>
  ),
  pl: (
    <>
      <rect width="60" height="20" fill="#fff" />
      <rect y="20" width="60" height="20" fill="#DC143C" />
    </>
  ),
  fr: (
    <>
      <rect width="20" height="40" fill="#002395" />
      <rect x="20" width="20" height="40" fill="#fff" />
      <rect x="40" width="20" height="40" fill="#ED2939" />
    </>
  ),
  de: (
    <>
      <rect width="60" height="13.34" fill="#000" />
      <rect y="13.34" width="60" height="13.33" fill="#DD0000" />
      <rect y="26.67" width="60" height="13.33" fill="#FFCE00" />
    </>
  ),
  ng: (
    <>
      <rect width="20" height="40" fill="#008751" />
      <rect x="20" width="20" height="40" fill="#fff" />
      <rect x="40" width="20" height="40" fill="#008751" />
    </>
  ),
  co: (
    <>
      <rect width="60" height="20" fill="#FCD116" />
      <rect y="20" width="60" height="10" fill="#003893" />
      <rect y="30" width="60" height="10" fill="#CE1126" />
    </>
  ),
  br: (
    <>
      <rect width="60" height="40" fill="#009C3B" />
      <polygon points="30,4 56,20 30,36 4,20" fill="#FFDF00" />
      <circle cx="30" cy="20" r="9.5" fill="#002776" />
      <path
        d="M20.9 16.6a25 25 0 0 1 18.4 5.2"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
      />
    </>
  ),
  id: (
    <>
      <rect width="60" height="20" fill="#CE1126" />
      <rect y="20" width="60" height="20" fill="#fff" />
    </>
  ),
  // Dark green field, white hoist bar (1/4 width), white crescent + star
  // centred in the green field — proportions per the official design.
  pk: (
    <>
      <rect width="60" height="40" fill="#01411C" />
      <rect width="15" height="40" fill="#fff" />
      <circle cx="38" cy="20" r="9" fill="#fff" />
      <circle cx="40.6" cy="17.2" r="7.4" fill="#01411C" />
      <polygon points={star(45, 14, 3.6)} fill="#fff" />
    </>
  ),
  // Green field, red disc shifted slightly toward the hoist — matches the
  // official design, which is intentionally off-centre to read as centred
  // when the flag is flying.
  bd: (
    <>
      <rect width="60" height="40" fill="#006A4E" />
      <circle cx="26.25" cy="20" r="15" fill="#F42A41" />
    </>
  ),
};

export function Flag({ code, className }: { code: FlagCode; className?: string }) {
  if (EXTERNAL_FILE_FLAGS.has(code)) {
    // eslint-disable-next-line @next/next/no-img-element -- decorative,
    // fixed-size flag icon; Next/Image's overhead isn't worth it here.
    return (
      <img
        src={`/flags/${code}.svg`}
        alt={FLAG_LABELS[code]}
        className={className}
        style={{ borderRadius: 3, border: "1px solid rgba(0,0,0,.22)" }}
      />
    );
  }

  return (
    <svg viewBox="0 0 60 40" role="img" aria-label={FLAG_LABELS[code]} className={className}>
      {FLAGS[code]}
      {/* Hairline keeps white-edged flags (Japan, Poland, Indonesia) from
          dissolving into a light background. */}
      <rect
        width="60"
        height="40"
        fill="none"
        stroke="rgba(0,0,0,.22)"
        strokeWidth="1"
      />
    </svg>
  );
}

export const ALL_FLAGS = Object.keys(FLAG_LABELS) as FlagCode[];
