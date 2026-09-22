"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

import HexGrid from "@/components/fx/HexGrid";
import LazyScene from "@/components/fx/three/LazyScene";
import Magnetic from "@/components/fx/Magnetic";
import { SplitWords } from "@/components/fx/TextFX";
import { SITE } from "@/lib/site";

/**
 * Hero.
 *
 * Two independent motion systems layered on one another:
 *
 *  1. POINTER PARALLAX — a shared normalised pointer position drives every
 *     layer at a different depth multiplier. One listener, many depths.
 *  2. SCROLL EXIT — the whole stage recedes on `translateZ` and blurs as the
 *     reader scrolls away, so the hero feels like it is behind the next
 *     section rather than simply scrolled past.
 */
export default function Hero() {
  const stageRef = useRef<HTMLElement>(null);

  // Normalised pointer offset from viewport centre, [-0.5, 0.5] on both axes.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const soft = { stiffness: 90, damping: 24, mass: 0.7 };
  const sx = useSpring(px, soft);
  const sy = useSpring(py, soft);

  // Depth multipliers — bigger number = closer to the reader = moves more.
  const titleX = useTransform(sx, [-0.5, 0.5], [26, -26]);
  const titleY = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const titleRotY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const titleRotX = useTransform(sy, [-0.5, 0.5], [5, -5]);

  const glowX = useTransform(sx, [-0.5, 0.5], [-90, 90]);
  const glowY = useTransform(sy, [-0.5, 0.5], [-60, 60]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });

  const exitZ = useTransform(scrollYProgress, [0, 1], [0, -420]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const exitBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(11px)"]);
  const exitY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      ref={stageRef}
      id="home"
      /* Top padding reserves the fixed nav's space — without it, centred
         content slides under the nav on a short viewport. */
      className="scene relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-canvas pt-28 pb-20"
    >
      {/* Two backdrop layers that read as one space: the 2D grid is the
          surface, the WebGL prisms are objects floating above it. The scene
          gates itself on WebGL support and reduced motion, so the grid alone
          is always a complete backdrop. */}
      <HexGrid />
      <LazyScene scene="hero" />

      {/* Pointer-tracking bloom, sat behind everything. */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(28,57,142,0.10),transparent_62%)] blur-2xl"
        aria-hidden="true"
      />

      <motion.div
        style={{ translateZ: exitZ, opacity: exitOpacity, filter: exitBlur, y: exitY }}
        className="preserve-3d relative z-10 flex w-full max-w-6xl flex-col items-center px-6 text-center"
      >
        {/* ── Title ───────────────────────────────────────────── */}
        <motion.h1
          style={{
            x: titleX,
            y: titleY,
            rotateY: titleRotY,
            rotateX: titleRotX,
            transformPerspective: 900,
          }}
          className="preserve-3d optical-left text-[clamp(3rem,13vw,10.5rem)] leading-[0.86] font-bold tracking-[-0.045em]"
        >
          <span className="ink-gradient-split block">
            <SplitWords text="ISTE" delay={0.55} stagger={0.08} />
          </span>
          <span className="block text-neutral-900">
            <SplitWords text="KJSSE" delay={0.68} stagger={0.08} />
          </span>
        </motion.h1>

        {/* ── Tagline ─────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-[clamp(1.05rem,2.2vw,1.6rem)] font-light tracking-tight text-neutral-600"
        >
          {SITE.tagline}
        </motion.p>

        {/* ── Actions ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.42} radius={130}>
            <a
              href="#events"
              data-cursor="view"
              data-cursor-text="Explore"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-fill px-8 py-4 text-sm font-medium tracking-wide text-white"
            >
              {/* Wipe fills from the left on hover. */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-panel-edge to-fill transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
              <span className="relative z-10">Explore our work</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M2 8h12M9 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>

          <Magnetic strength={0.3} radius={110}>
            <a
              href="#about"
              data-cursor="link"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-8 py-4 text-sm font-medium text-neutral-700 transition-colors hover:border-fill hover:text-neutral-950"
            >
              Who we are
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        data-cursor="hide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        style={{ opacity: exitOpacity }}
        /* Hidden on short viewports, where it would land on the CTA row. */
        className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex [@media(max-height:720px)]:!hidden"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400">SCROLL</span>
        <span className="relative block h-10 w-px overflow-hidden bg-neutral-300">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-fill"
          />
        </span>
      </motion.a>
    </section>
  );
}
