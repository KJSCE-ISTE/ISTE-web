"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/**
 * Reading-progress rail pinned to the right edge, plus a hairline at the top.
 * Both are driven by one `useScroll` subscription and a shared spring, so the
 * whole indicator costs a single scroll listener.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0008 });
  const percent = useTransform(progress, (v) => `${Math.round(v * 100)}`);

  return (
    <>
      {/* Top hairline */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-fill via-accent to-fill"
        aria-hidden="true"
      />

      {/* Right rail with live percentage */}
      <div
        className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] tracking-[0.18em] text-neutral-400">SCROLL</span>
        <div className="relative h-40 w-px overflow-hidden bg-neutral-300">
          <motion.div
            style={{ scaleY: progress }}
            className="absolute inset-0 origin-top bg-fill"
          />
        </div>
        <motion.span className="font-mono text-[10px] tabular-nums text-neutral-500">
          {percent}
        </motion.span>
      </div>
    </>
  );
}
