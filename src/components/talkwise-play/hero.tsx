import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { VideoShowcase } from "@/components/talkwise-play/video-showcase";
import { site } from "@/lib/site";

/**
 * TalkWise Play hero — quieter than the homepage's WebGL hero (matches the
 * interior-page convention set by PageHero), but the gameplay reel is the
 * dominant visual, not a photo.
 */
export function TalkWisePlayHero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-40 sm:pb-24 sm:pt-52">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[38rem] w-[70rem] -translate-x-1/2 opacity-[0.17] blur-[120px]"
        style={{
          background: "radial-gradient(50% 60% at 50% 40%, var(--color-gold) 0%, transparent 70%)",
        }}
      />
      <div className="grain-overlay -z-10" />

      <Container size="full">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-2xs font-medium uppercase tracking-[0.24em] text-gold-300">
              <span aria-hidden className="h-px w-8 bg-gold/50" />
              TalkWise Play
            </p>

            <h1 className="mt-7 max-w-xl text-balance-pretty font-display text-display-md leading-[1.02] tracking-[-0.025em]">
              Where communication practice becomes play.
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-mist">
              TalkWise Play turns speech and language practice into interactive games children
              actually want to play. From exploring speech adventures to shooting hoops, matching
              sounds, building sentences and playing quick learning games, children can practice
              communication skills inside fun, replayable experiences.
            </p>

            <div className="mt-11 flex flex-col gap-3 sm:flex-row">
              <Button href={site.membership.checkoutUrl} variant="gold" size="lg">
                Explore TalkWise Academy
              </Button>
              <Button href="#how-it-works" variant="outline" size="lg">
                See how it works
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <VideoShowcase />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
