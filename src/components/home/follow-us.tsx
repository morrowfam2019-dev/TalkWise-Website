import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/brand/social-icons";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const platforms = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: site.social.tiktok, Icon: TiktokIcon },
  { label: "YouTube", href: site.social.youtube, Icon: YoutubeIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
];

export function FollowUs() {
  return (
    <Section id="follow" className="text-center">
      <SectionHeading
        eyebrow="Stay connected"
        title="Follow along."
        description="New lessons, practice tips, and behind-the-scenes — wherever you already spend your time."
        align="center"
        className="mx-auto"
      />

      <Stagger className="mt-12 flex flex-wrap items-center justify-center gap-5">
        {platforms.map(({ label, href, Icon }) => (
          <StaggerItem key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`TalkWise Academy on ${label}`}
              className="group inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-gold hover:text-ink hover:shadow-[0_12px_40px_-8px_rgba(252,191,17,0.55)]"
            >
              <Icon className="h-6 w-6" aria-hidden />
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
