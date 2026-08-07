"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled || openMenu || mobileOpen
            ? "border-b border-[var(--hairline)] bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <Container size="full">
          <div className="flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
            <Logo />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryNav.map((group) => {
                  const isOpen = openMenu === group.label;
                  if (!group.links) {
                    return (
                      <li key={group.label}>
                        <Link
                          href={group.href ?? "#"}
                          className={cn(
                            "inline-flex h-10 items-center rounded-full px-4 text-sm text-white/75 transition-colors hover:text-white",
                            pathname === group.href && "text-gold",
                          )}
                        >
                          {group.label}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={group.label}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onMouseEnter={() => setOpenMenu(group.label)}
                        onFocus={() => setOpenMenu(group.label)}
                        onClick={() => setOpenMenu(isOpen ? null : group.label)}
                        className={cn(
                          "inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm text-white/75 transition-colors hover:text-white",
                          isOpen && "text-white",
                        )}
                      >
                        {group.label}
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-300",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              {/* Members sign in on Whop, where their lessons live. */}
              <Button href={site.membership.memberUrl} variant="ghost" size="sm" magnetic={false}>
                Member log in
              </Button>
              <Button href="/updates" variant="gold" size="sm">
                Get Updates
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-white lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>

        {/* Desktop mega menu */}
        <AnimatePresence>
          {openMenu ? (
            <motion.div
              key={openMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="hidden border-t border-[var(--hairline)] bg-ink/95 backdrop-blur-xl lg:block"
            >
              <Container size="full">
                <div className="grid grid-cols-2 gap-2 py-8 xl:grid-cols-4">
                  {primaryNav
                    .find((group) => group.label === openMenu)
                    ?.links?.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group rounded-card border border-transparent p-5 transition-colors hover:border-[var(--hairline)] hover:bg-white/[0.04]"
                      >
                        <span className="flex items-center gap-2 text-[0.95rem] font-medium text-white">
                          {link.label}
                          <span
                            aria-hidden
                            className="translate-x-0 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                          >
                            →
                          </span>
                        </span>
                        {link.description ? (
                          <span className="mt-1.5 block text-sm text-mist">{link.description}</span>
                        ) : null}
                      </Link>
                    ))}
                </div>
              </Container>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Mobile sheet — full screen, thumb-reachable, not a shrunken desktop menu. */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ink pt-[4.5rem] lg:hidden"
          >
            <Container className="flex min-h-[calc(100dvh-4.5rem)] flex-col pb-10 pt-6">
              <nav aria-label="Mobile" className="flex-1">
                {primaryNav.map((group, groupIndex) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + groupIndex * 0.06, duration: 0.5 }}
                    className="border-b border-[var(--hairline)] py-6 first:pt-0"
                  >
                    {group.links ? (
                      <>
                        <p className="text-2xs font-medium uppercase tracking-[0.24em] text-gold-300">
                          {group.label}
                        </p>
                        <ul className="mt-4 space-y-1">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="flex items-center justify-between rounded-xl py-3 text-lg text-white/90 active:bg-white/[0.05]"
                              >
                                {link.label}
                                <span aria-hidden className="text-gold">
                                  →
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link
                        href={group.href ?? "#"}
                        className="flex items-center justify-between py-1 text-lg font-medium text-white"
                      >
                        {group.label}
                        <span aria-hidden className="text-gold">
                          →
                        </span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="/updates" variant="gold" size="lg" className="w-full" magnetic={false}>
                  Get Updates
                </Button>
                <Button
                  href={site.membership.memberUrl}
                  variant="outline"
                  size="lg"
                  className="w-full"
                  magnetic={false}
                >
                  Member log in
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
