import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  TiktokIcon,
  YoutubeIcon,
} from "@/components/brand/social-icons";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { DISCLAIMER, footerNav, site } from "@/lib/site";

const socials = [
  { label: "TalkWise Academy on Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "TalkWise Academy on TikTok", href: site.social.tiktok, Icon: TiktokIcon },
  { label: "TalkWise Academy on YouTube", href: site.social.youtube, Icon: YoutubeIcon },
  { label: "TalkWise Academy on Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "All TalkWise links", href: site.social.linktree, Icon: LinkIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--hairline)] bg-ink">
      {/* Ambient gold horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 opacity-[0.13] blur-3xl"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, var(--color-gold) 0%, transparent 70%)",
        }}
      />

      <Container size="full" className="relative">
        <div className="grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-pretty text-[0.95rem] leading-relaxed text-mist">
              Helping children, parents, and English learners grow through engaging communication
              education.
            </p>

            <div className="mt-8">
              <p className="text-2xs font-medium uppercase tracking-[0.24em] text-gold-300">
                Weekly practice ideas
              </p>
              <NewsletterForm source="footer" className="mt-4 max-w-sm" />
            </div>

            <ul className="mt-8 flex items-center gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] text-white/70 transition-all duration-300 hover:border-gold/50 hover:text-gold"
                  >
                    <Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {footerNav.map((column) => (
              <div key={column.title}>
                <h2 className="text-2xs font-medium uppercase tracking-[0.24em] text-white/45">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => {
                    const external = /^https?:\/\//.test(link.href);
                    const className =
                      "text-sm text-mist transition-colors hover:text-white";

                    return (
                      <li key={link.href}>
                        {external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className={className}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className={className}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-[var(--hairline)] py-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-white/40">{DISCLAIMER}</p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
