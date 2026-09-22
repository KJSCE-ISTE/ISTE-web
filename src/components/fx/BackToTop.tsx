"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

/**
 * Scroll-to-top control.
 *
 * The homepage runs to about nine screens and `/teams` is longer, which is far
 * enough that getting back to the nav is a chore. It appears only past two
 * viewports, so it never competes with the hero.
 *
 * It scrolls through Lenis when Lenis is running, because a raw `scrollTo`
 * fights the interpolator and produces a visible stutter. The native call is
 * the fallback for reduced-motion, where Lenis is never started.
 */
export default function BackToTop() {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShown(latest > window.innerHeight * 2);
  });

  return (
    <AnimatePresence>
      {shown && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            const lenis = window.__isteLenis;
            if (lenis) lenis.scrollTo(0, { duration: 1.1 });
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Back to top"
          data-cursor="link"
          className="glass fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 shadow-lg shadow-neutral-900/10 transition-colors hover:text-neutral-950"
        >
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
