import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/brand/social-icons";
import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { site } from "@/lib/site";

// Each platform's own brand color, not the site's gold/black palette —
// people recognize these apps by their real colors faster than by a
// re-skinned icon.
const platforms = [
  {
    label: "Instagram",
    href: site.social.instagram,
    Icon: InstagramIcon,
    background:
      "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    glow: "rgba(220,39,67,0.45)",
  },
  {
    label: "TikTok",
    href: site.social.tiktok,
    Icon: TiktokIcon,
    background: "#000000",
    glow: "rgba(37,244,238,0.4)",
  },
  {
    label: "YouTube",
    href: site.social.youtube,
    Icon: YoutubeIcon,
    background: "#FF0000",
    glow: "rgba(255,0,0,0.45)",
  },
  {
    label: "Facebook",
    href: site.social.facebook,
    Icon: FacebookIcon,
    background: "#1877F2",
    glow: "rgba(24,119,242,0.45)",
  },
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
        {platforms.map(({ label, href, Icon, background, glow }) => (
          <StaggerItem key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`TalkWise Academy on ${label}`}
              style={{ background, ["--icon-glow" as string]: glow }}
              className="group inline-flex h-16 w-16 items-center justify-center rounded-full text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_var(--icon-glow)]"
            >
              <Icon className="h-6 w-6" aria-hidden />
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
