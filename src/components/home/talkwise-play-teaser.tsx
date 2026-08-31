import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * Homepage teaser for /talkwise-play — deliberately short. The full pitch,
 * feature cards, and video reel live on the dedicated page; this section
 * only needs to make a visitor click through.
 */
export function TalkWisePlayTeaser() {
  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--color-gold) 0%, transparent 68%)" }}
      />

      <Container size="lg">
        <Reveal className="glass gold-hairline mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-panel p-10 text-center sm:p-14">
          <p className="text-2xs font-medium uppercase tracking-[0.24em] text-gold-300">
            New: TalkWise Play
          </p>
          <h2 className="max-w-xl text-balance-pretty font-display text-display-sm leading-[1.05]">
            Communication practice becomes a game.
          </h2>
          <p className="max-w-xl text-pretty leading-relaxed text-mist">
            Explore Speech Adventures, Speech Basketball and a growing collection of interactive
            learning games.
          </p>
          <Button href="/talkwise-play" variant="gold" size="lg" className="mt-2">
            Explore TalkWise Play
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
