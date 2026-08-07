import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { LogoMark } from "@/components/brand/logo";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden py-32 sm:py-44">
      {/* The gold horizon — the page's closing note, and its brightest moment. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-18rem] -z-10 h-[36rem] opacity-25 blur-[110px]"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 100%, var(--color-gold) 0%, transparent 72%)",
        }}
      />
      <div className="grain-overlay -z-10" />

      <Container size="md">
        <Reveal className="flex flex-col items-center text-center">
          <LogoMark className="h-14 w-14 text-gold animate-float-slow" />

          <h2 className="mt-10 text-balance-pretty font-display text-display-md leading-[1] tracking-[-0.025em]">
            Every confident conversation
            <br className="hidden sm:block" /> started somewhere.
          </h2>

          <p className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-mist">
            Start with one sound, ten minutes, and a child who feels heard.
          </p>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button href={site.membership.checkoutUrl} variant="gold" size="lg">
              Join TalkWise — ${site.membership.price}/month
            </Button>
            <Button href="/updates" variant="outline" size="lg">
              Get Updates
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
