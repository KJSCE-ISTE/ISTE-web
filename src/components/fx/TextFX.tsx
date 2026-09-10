"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Text animation primitives.
 *
 * ACCESSIBILITY: splitting a sentence into per-word or per-character spans
 * destroys it for screen readers — VoiceOver announces "H. e. l. l. o." one
 * fragment at a time. Every component here therefore puts the real string in
 * `aria-label` on the wrapper and marks the animated fragments `aria-hidden`.
 * Assistive tech reads the clean sentence; sighted users get the motion.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Words rise out of a clipping mask, staggered left to right. */
export function SplitWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag] as typeof motion.span;

  return (
    <MotionTag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="split-line inline-block" aria-hidden="true">
          <motion.span
            className={`split-word ${wordClassName}`}
            variants={{
              hidden: { y: "110%", opacity: 0, rotateX: -55 },
              shown: { y: "0%", opacity: 1, rotateX: 0 },
            }}
            transition={{ duration, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Characters fade + unblur in sequence. Best on short strings. */
export function SplitChars({
  text,
  className = "",
  delay = 0,
  stagger = 0.028,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {[...text].map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: "blur(8px)", y: 14 },
            shown: { opacity: 1, filter: "blur(0px)", y: 0 },
          }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * Scramble-to-reveal: characters cycle through noise, then lock in one by one.
 * Runs once when scrolled into view.
 */
export function ScrambleText({
  text,
  className = "",
  speed = 34,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+",
}: {
  text: string;
  className?: string;
  /** ms per tick. */
  speed?: number;
  charset?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    // Each character locks after ~3 ticks; total run scales with length.
    const total = text.length * 3;

    const id = setInterval(() => {
      frame++;
      const locked = Math.floor(frame / 3);

      setDisplay(
        [...text]
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < locked) return char;
            return charset[Math.floor(Math.random() * charset.length)];
          })
          .join(""),
      );

      if (frame >= total) {
        clearInterval(id);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(id);
  }, [inView, text, speed, charset]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

/**
 * Seamless horizontal marquee.
 *
 * The children are rendered twice and the track translates by exactly -50%,
 * so the second copy lands where the first began — no gap, no snap. Pausing
 * on hover is handled in CSS (`.marquee-host:hover`).
 */
export function Marquee({
  children,
  duration = 38,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee-host relative overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex w-max items-center"
        style={{
          ["--marquee-duration" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex items-center" aria-hidden={false}>
          {children}
        </div>
        {/* Duplicate is decorative — never announced twice. */}
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Counts up to a target when scrolled into view. Handles "25+", "MH 60" etc. */
export function CountUp({
  value,
  className = "",
  duration = 1600,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\D*)(\d+)(\D*)$/);
    if (!inView || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    let start: number | null = null;
    let raf = 0;

    const tick = (now: number) => {
      /**
       * The clock starts on the FIRST FRAME, not when the effect runs.
       *
       * A rAF timestamp is the time the frame began, which can predate a
       * `performance.now()` captured moments earlier in the same task — the
       * frame was already in flight. That makes `now - start` negative, and an
       * ease-out cubic amplifies it: t = -0.08 gives eased = 1 - 1.08³ ≈ -0.26,
       * so "25+" renders as "-6+" and "MH 60" as "MH -4" before correcting.
       *
       * Seeding from the first frame makes the first delta exactly 0. The
       * clamp is belt and braces for a clock that steps backwards.
       */
      if (start === null) start = now;
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setShown(`${prefix}${Math.round(target * eased)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // If frames stall (background tab, throttled renderer), the counter would
    // freeze part-way and display a number that is simply wrong — "0+" where
    // the chapter has been active 25 years. Snap to the real value instead.
    const failsafe = window.setTimeout(() => {
      cancelAnimationFrame(raf);
      setShown(value);
    }, duration + 600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
