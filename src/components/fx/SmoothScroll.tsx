"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Lenis-driven inertial scrolling.
 *
 * Native scroll jumps in discrete wheel deltas; Lenis interpolates toward the
 * target each frame, which is what makes parallax read as depth rather than
 * as stutter. Everything scroll-linked in this build assumes it.
 *
 * Two things this has to get right:
 *  1. Reduced motion — bail entirely and leave native scroll alone.
 *  2. Anchor links — the nav uses `#hash` hrefs, and native anchor jumping
 *     fights the interpolator, so we intercept and hand them to Lenis.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Exponential ease-out: fast pickup, long settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Touch devices already have native momentum; doubling it feels wrong.
      syncTouch: false,
    });

    // Expose for components that need to drive scrolling imperatively.
    window.__isteLenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onAnchorClick = (e: MouseEvent) => {
      // Let modified clicks (new tab, download, etc.) behave normally.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      /**
       * Handle both `#about` and `/#about`.
       *
       * Nav links are written absolutely so one list works from every page, so
       * a bare `href^="#"` check would miss them all. Resolve the href and
       * intercept only when it points at a hash on the page we are already on;
       * anything else is a real navigation and must fall through to Next.
       */
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (!url.hash || url.hash === "#") return;
      if (url.pathname !== window.location.pathname) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -100, // clear the floating nav
        duration: 1.35,
      });
      history.replaceState(null, "", url.hash);
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      window.__isteLenis = undefined;
    };
  }, []);

  return null;
}
