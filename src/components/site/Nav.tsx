"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Magnetic from "@/components/fx/Magnetic";
import { NAV_LINKS, SITE } from "@/lib/site";

/**
 * Framer-animated next/link. Created once at module scope — calling
 * `motion.create` inside the component would build a new component type on
 * every render and remount every link.
 */
const MotionLink = motion.create(Link);

/**
 * Floating glass navigation.
 *
 * Keeps the original site's signature chrome — a centred, rounded, frosted
 * pill — and adds two behaviours:
 *
 *  • It *condenses* past the hero: the wordmark and KJSSE crest fold away and
 *    the pill tightens, so the nav takes less of the viewport once reading has
 *    started.
 *  • The active link is derived from an IntersectionObserver over the sections,
 *    not from scroll maths. Observers report from the browser's own layout
 *    pass, so the highlight stays correct through Lenis's interpolated scroll,
 *    resizes, and anchor jumps alike.
 */
export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // On a route page the current link is simply the one matching the pathname;
  // on the homepage it is whichever section is on screen (set by the observer).
  const [active, setActive] = useState(() =>
    pathname === "/" ? "/#home" : pathname,
  );

  useEffect(() => {
    setActive(pathname === "/" ? "/#home" : pathname);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 120);
  });

  /**
   * Scroll-spy, but only for entries that are in-page anchors AND only on a
   * page that actually contains them. On `/teams` or `/gallery` there are no
   * such sections, so the highlight comes from the pathname instead.
   */
  useEffect(() => {
    const sections = NAV_LINKS.flatMap((link) => {
      if (!("section" in link) || !link.section) return [];
      const el = document.getElementById(link.section);
      return el ? [el] : [];
    });
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section rather than the first —
        // with tall sections several can intersect at once.
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best?.target.id) setActive(`/#${best.target.id}`);
      },
      // Band across the upper-middle of the viewport: a section counts as
      // "current" once its content is where the eye actually is.
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.05, 0.25, 0.5, 0.75] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile sheet on Escape — a panel with no keyboard exit is a trap.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 z-50 w-[95%] max-w-[1280px] -translate-x-1/2"
      >
        <motion.nav
          animate={{
            paddingLeft: condensed ? 14 : 20,
            paddingRight: condensed ? 14 : 20,
            paddingTop: condensed ? 8 : 12,
            paddingBottom: condensed ? 8 : 12,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass relative flex items-center justify-between rounded-2xl shadow-lg shadow-neutral-900/5"
        >
          {/* ── Brand ───────────────────────────────────────────── */}
          <Link
            href="/#home"
            className="flex items-center gap-3"
            data-cursor="link"
            aria-label={`${SITE.name} — home`}
          >
            <Magnetic strength={0.28} radius={90}>
              <div className="relative h-11 w-11 shrink-0">
                <Image src="/iste-logo.png" alt="ISTE logo" fill sizes="44px" className="object-contain" priority />
              </div>
            </Magnetic>

            {/* The KJSSE crest and wordmark collapse to zero width when condensed. */}
            <motion.div
              animate={{ width: condensed ? 0 : 44, opacity: condensed ? 0 : 1, marginLeft: condensed ? -12 : 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-11 shrink-0 overflow-hidden"
            >
              <Image src="/kjsse-logo.png" alt="KJSSE logo" fill sizes="44px" className="object-contain" />
            </motion.div>

            <motion.div
              animate={{ width: condensed ? 0 : 1, opacity: condensed ? 0 : 1 }}
              className="hidden h-9 bg-neutral-300 md:block"
            />

            <motion.span
              animate={{ opacity: condensed ? 0 : 1, x: condensed ? -8 : 0 }}
              transition={{ duration: 0.4 }}
              className="ink-gradient hidden text-xl font-bold whitespace-nowrap md:block"
            >
              {SITE.name}
            </motion.span>
          </Link>

          {/* ── Desktop links ───────────────────────────────────── */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link, i) => (
              /* next/link for real routes so they prefetch and client-navigate;
                 SmoothScroll intercepts the `/#hash` ones on the homepage. */
              <MotionLink
                key={link.href}
                href={link.href}
                data-active={active === link.href}
                data-cursor="link"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="link-underline group relative rounded-lg px-4 py-2.5 text-[15px] font-medium whitespace-nowrap text-neutral-700 transition-colors hover:text-neutral-950"
              >
                {/* Pill slides between links via a shared layoutId. */}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-neutral-900/[0.055]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </MotionLink>
            ))}
          </div>

          {/* ── Mobile toggle ───────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-cursor="link"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-neutral-900/5 lg:hidden"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-5 bg-neutral-800"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="block h-[1.5px] w-5 bg-neutral-800"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              className="block h-[1.5px] w-5 bg-neutral-800"
            />
          </button>
        </motion.nav>

        {/* ── Mobile sheet ──────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -14, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -14, height: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-2 overflow-hidden rounded-2xl shadow-lg shadow-neutral-900/5 lg:hidden"
            >
              <ul className="flex flex-col p-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.055, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                        active === link.href
                          ? "bg-neutral-900/[0.06] text-neutral-950"
                          : "text-neutral-700 hover:bg-neutral-900/[0.04]"
                      }`}
                    >
                      {link.label}
                      <span className="font-mono text-[10px] text-neutral-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
