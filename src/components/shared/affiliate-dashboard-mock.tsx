/**
 * Illustrative affiliate dashboard. Figures are sample data and labelled as
 * such — never present these as real program performance.
 */
const stats = [
  { label: "Clicks", value: "1,284", delta: "+12%" },
  { label: "Signups", value: "96", delta: "+8%" },
  { label: "Active members", value: "61", delta: "+5%" },
  { label: "Next payout", value: "$915", delta: "Aug 30" },
];

const referrals = [
  { id: "TW-4821", joined: "Aug 02", status: "Active", months: 4 },
  { id: "TW-4817", joined: "Jul 28", status: "Active", months: 5 },
  { id: "TW-4809", joined: "Jul 19", status: "Active", months: 5 },
  { id: "TW-4802", joined: "Jul 11", status: "Cancelled", months: 2 },
  { id: "TW-4795", joined: "Jul 03", status: "Active", months: 6 },
];

// 12 months of referral volume — the shape matters more than the values.
const trend = [4, 6, 5, 9, 8, 12, 11, 15, 14, 19, 22, 26];

export function AffiliateDashboardMock() {
  const max = Math.max(...trend);

  return (
    <div className="glass overflow-hidden rounded-panel p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center gap-2">
        {[0, 1, 2].map((index) => (
          <span key={index} aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink-500" />
        ))}
        <span className="ml-3 rounded-full border border-[var(--hairline)] px-3 py-1 text-2xs text-white/35">
          talkwiseacademy.com/dashboard/affiliate
        </span>
      </div>

      <div className="rounded-card bg-ink-900/70 p-5 sm:p-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-[var(--hairline)] p-5">
              <p className="text-2xs uppercase tracking-[0.2em] text-white/35">{stat.label}</p>
              <p className="mt-3 font-display text-3xl tabular-nums tracking-[-0.02em]">
                {stat.value}
              </p>
              <p className="mt-2 text-2xs text-emerald-accent">{stat.delta}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-5">
          <div className="rounded-xl border border-[var(--hairline)] p-6 lg:col-span-3">
            <p className="text-2xs uppercase tracking-[0.2em] text-white/35">
              Referrals · last 12 months
            </p>
            <div className="mt-6 flex h-36 items-end gap-2" aria-hidden>
              {trend.map((value, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-sm bg-gold/70"
                  style={{
                    height: `${(value / max) * 100}%`,
                    // Emphasize the most recent month, the one being reported on.
                    opacity: index === trend.length - 1 ? 1 : 0.4 + (index / trend.length) * 0.4,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--hairline)] p-6 lg:col-span-2">
            <p className="text-2xs uppercase tracking-[0.2em] text-white/35">Recent referrals</p>
            <ul className="mt-5 space-y-3">
              {referrals.map((referral) => (
                <li key={referral.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="tabular-nums text-white/70">{referral.id}</span>
                  <span className="text-2xs tabular-nums text-white/35">{referral.joined}</span>
                  <span
                    className={
                      referral.status === "Active"
                        ? "rounded-full bg-emerald-accent/15 px-2.5 py-1 text-2xs text-emerald-accent"
                        : "rounded-full bg-white/[0.06] px-2.5 py-1 text-2xs text-white/40"
                    }
                  >
                    {referral.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-2xs text-white/30">
          Sample data shown for illustration.
        </p>
      </div>
    </div>
  );
}
