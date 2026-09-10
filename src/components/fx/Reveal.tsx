"use client";

import { motion, useScroll, useSpring, useTransform, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-triggered entrance animations.
 *
 * All of these use `whileInView` with `once: true`. Re-animating on every
 * scroll-past is the single most common way motion turns from polish into
 * nausea — content that has already been read should stay put.
 *
 * The viewport margin fires the animation slightly *before* the element is
 * fully on screen, so the reveal completes as it settles rather than starting
 * once the reader is already looking at it.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export type RevealKind = "up" | "down" | "left" | "right" | "blur" | "clip" | "scale" | "rotate3d";

const VARIANTS: Record<RevealKind, Variants> = {
  up: { hidden: { opacity: 0, y: 42 }, shown: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -42 }, shown: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -52 }, shown: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 52 }, shown: { opacity: 1, x: 0 } },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)", y: 20 },
    shown: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  clip: {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    shown: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
  },
  scale: { hidden: { opacity: 0, scale: 0.9 }, shown: { opacity: 1, scale: 1 } },
  // Enters rotated away from the reader and settles flat.
  rotate3d: {
    hidden: { opacity: 0, rotateX: -28, y: 46, transformPerspective: 900 },
    shown: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 900 },
  },
};

export function Reveal({
  children,
  kind = "up",
  delay = 0,
  duration = 0.85,
  className = "",
  amount = 0.25,
}: {
  children: ReactNode;
  kind?: RevealKind;
  delay?: number;
  duration?: number;
  className?: string;
  /** Fraction of the element that must be visible before firing. */
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={VARIANTS[kind]}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent that staggers its `<Stagger.Item>` children.
 * Split from `Reveal` because Framer Motion propagates variants by *name*, so
 * parent and child must agree on "hidden"/"shown" rather than each animating
 * independently.
 */
export function Stagger({
  children,
  className = "",
  gap = 0.09,
  delay = 0,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  kind = "up",
  className = "",
  duration = 0.75,
}: {
  children: ReactNode;
  kind?: RevealKind;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={VARIANTS[kind]}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked vertical parallax.
 *
 * `speed` is the total travel in px across the element's full pass through the
 * viewport. Negative moves against the scroll (feels closer), positive with it
 * (feels further away).
 */
export function Parallax({
  children,
  speed = -80,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [-speed, speed]), {
    stiffness: 120,
    damping: 30,
    restDelta: 0.5,
  });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/** Scales and lifts a section as it scrolls past — used for the gallery slab. */
export function ScrollScale({
  children,
  className = "",
  from = 0.86,
  to = 1,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [from, to]), {
    stiffness: 130,
    damping: 30,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, opacity }}>{children}</motion.div>
    </div>
  );
}
