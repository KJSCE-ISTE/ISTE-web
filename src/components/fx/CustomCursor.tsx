"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Pointer rig — a hexagonal reticle.
 *
 * The hexagon is the chapter's mark: it is the background grid, the WebGL
 * prisms, and the shape of the ISTE crest. Making the cursor the same form ties
 * the whole surface together, and a polygon reads as deliberate where a plain
 * circle reads as a default.
 *
 * Three layers, each doing one job:
 *   • the reticle  — a rotating hex outline that resizes to frame the target
 *   • the dot      — instant, unsmoothed, so input never feels laggy
 *   • the label    — contextual text ("Open", "Expand") inside the reticle
 *
 * Design notes
 * ------------
 * • The dot tracks raw coordinates with no smoothing. Any lag there reads as
 *   broken input, so it is the one element that must be exact.
 * • The reticle runs on a spring and is *allowed* to trail. That gap is what
 *   makes the rig feel physical rather than drawn.
 * • Position is written to MotionValues, never React state. State would
 *   re-render the tree on every mousemove; MotionValues drive the compositor
 *   directly, so this costs zero renders per frame.
 * • Colour is resolved from the surface, not from a blend mode. `mix-blend-
 *   difference` is the usual trick here and it is fragile: any ancestor with a
 *   transform, filter or opacity creates a stacking context and silently
 *   isolates the blend — this page has all three, and the result was a cursor
 *   that rendered flat white and vanished on the light canvas. Instead, dark
 *   sections carry `data-surface="dark"` and the rig reads that from the
 *   element under the pointer, so it is black on light and white on dark with
 *   no way for layout to break it.
 *
 * Interactive targets opt in with data attributes:
 *   data-cursor="link" | "view" | "drag" | "text" | "hide"
 *   data-cursor-text="Open"
 */

type CursorMode = "default" | "link" | "view" | "drag" | "text" | "hide";

const SIZE: Record<CursorMode, number> = {
  default: 34,
  link: 58,
  view: 88,
  drag: 72,
  text: 0,
  hide: 0,
};

/** Pointy-top hexagon on a 100×100 viewBox, matching the background grid. */
const HEX_POINTS = Array.from({ length: 6 }, (_, i) => {
  const angle = (Math.PI / 180) * (60 * i - 90);
  return `${50 + 46 * Math.cos(angle)},${50 + 46 * Math.sin(angle)}`;
}).join(" ");

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [enabled, setEnabled] = useState(false);
  /** Surface under the pointer — drives the cursor's colour. */
  const [onDark, setOnDark] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // The reticle trails; lower stiffness = more lag = more perceived weight.
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  const size = useMotionValue(SIZE.default);
  const springSize = useSpring(size, { stiffness: 300, damping: 28 });
  const offset = useTransform(springSize, (s) => -s / 2);

  const rafRef = useRef<number | null>(null);
  const pending = useRef<{ x: number; y: number } | null>(null);
  /* Latest known position, kept outside MotionValues so a restore after a tab
     switch can put the rig back where the pointer actually is. */
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  /* Read inside listeners without making `visible` an effect dependency —
     otherwise every show/hide tears down and re-attaches every listener. */
  const visibleRef = useRef(false);

  /* Only on devices with a real pointer, and never under reduced motion. */
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const on = fine.matches && !calm.matches;
      setEnabled(on);
      document.documentElement.classList.toggle("has-custom-cursor", on);
    };

    sync();
    fine.addEventListener("change", sync);
    calm.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      calm.removeEventListener("change", sync);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    /* Pointer events outpace frames. Coalesce to one write per frame. */
    const flush = () => {
      rafRef.current = null;
      if (!pending.current) return;
      x.set(pending.current.x);
      y.set(pending.current.y);
      pending.current = null;
    };

    const onMove = (e: PointerEvent) => {
      pending.current = { x: e.clientX, y: e.clientY };
      lastPos.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(flush);
      if (!visibleRef.current) setVisible(true);
    };

    /* One delegated listener resolves the mode by walking up from the target,
       so nothing has to register itself and dynamic content just works. */
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;

      /* Nearest ancestor that declares a surface. Walking up is free here and
         deterministic — unlike sampling pixels, it cannot be confused by an
         image, a gradient or a WebGL canvas sitting on top of the section. */
      const surface = target?.closest?.("[data-surface]");
      setOnDark(surface?.getAttribute("data-surface") === "dark");

      const el = target?.closest?.(
        "[data-cursor], a, button, input, textarea, select, [role='button'], [contenteditable='true']",
      );

      if (!el) {
        setMode("default");
        setLabel(null);
        return;
      }

      const explicit = el.getAttribute("data-cursor") as CursorMode | null;
      const text = el.getAttribute("data-cursor-text");

      if (explicit) {
        setMode(explicit);
      } else if (
        el.matches("input, textarea, select, [contenteditable='true']") &&
        !el.matches(
          "input[type='checkbox'], input[type='radio'], input[type='submit'], input[type='file'], input[type='range']",
        )
      ) {
        setMode("text");
      } else {
        setMode("link");
      }
      setLabel(text ?? null);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    /**
     * Restore after a tab switch.
     *
     * Leaving the tab fires `pointerleave` on the document, which hides the rig.
     * Coming back fires no matching `pointerenter` — the pointer never
     * "entered" from the browser's point of view — so nothing reappears until
     * the next pointer MOVE. Meanwhile the native cursor is suppressed by
     * `cursor: none`, so the reader is left with no pointer at all and no way
     * to tell where it is.
     *
     * Showing the rig again the moment the document becomes visible fixes that.
     * `pressed` is cleared too: a mouse button released while the tab was
     * hidden never delivers its pointerup, and the rig would come back stuck in
     * its pressed state.
     */
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      setPressed(false);
      if (lastPos.current) {
        x.set(lastPos.current.x);
        y.set(lastPos.current.y);
      }
      setVisible(true);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    document.addEventListener("visibilitychange", onVisibility);
    // Alt-tabbing back to the browser restores focus without a visibility
    // change, so both signals are needed.
    window.addEventListener("focus", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onVisibility);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, x, y]);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    size.set(label ? 104 : SIZE[mode]);
  }, [mode, label, size]);

  if (!enabled) return null;

  const showReticle = visible && mode !== "hide" && mode !== "text";
  const showCaret = visible && mode === "text";

  /* Near-black rather than pure black: #0a0a0a against the neutral-100 canvas
     matches the site's ink and avoids the harsh edge of #000. */
  const ink = onDark ? "#ffffff" : "#0a0a0a";

  return (
    <div className="cursor-layer" aria-hidden="true">
      {/* ── Reticle ─────────────────────────────────────────── */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          width: springSize,
          height: springSize,
          translateX: offset,
          translateY: offset,
        }}
        animate={{ opacity: showReticle ? 1 : 0, scale: pressed ? 0.85 : 1 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 flex items-center justify-center"
      >
        {/* Slow counter-rotation keeps the shape legible as a hexagon rather
            than reading as a slightly-wrong circle. */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: mode === "view" ? 30 : 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <polygon
            points={HEX_POINTS}
            fill="none"
            stroke={ink}
            strokeWidth={mode === "default" ? 4 : 2.5}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            /* Matches the reticle's own resize easing, so crossing a section
               boundary reads as one movement rather than a colour flash. */
            style={{ transition: "stroke 0.25s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </motion.svg>

        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              style={{ color: ink, transition: "color 0.25s cubic-bezier(0.16,1,0.3,1)" }}
              className="relative px-3 text-center font-mono text-[10px] leading-tight font-medium tracking-[0.16em] uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Dot — exact, unsmoothed ─────────────────────────── */}
      <motion.div
        style={{ x, y }}
        animate={{
          opacity: visible && mode !== "hide" && !label ? 1 : 0,
          scale: pressed ? 0.5 : 1,
        }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className="block h-[7px] w-[7px] rounded-full"
          style={{ backgroundColor: ink, transition: "background-color 0.25s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </motion.div>

      {/* ── Caret for text fields ───────────────────────────── */}
      <motion.div
        style={{ x, y }}
        animate={{ opacity: showCaret ? 1 : 0 }}
        transition={{ duration: 0.16 }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className="block h-[24px] w-[2px]"
          style={{ backgroundColor: ink, transition: "background-color 0.25s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </motion.div>

      {/* ── Click ripple, also hexagonal ────────────────────── */}
      <AnimatePresence>
        {pressed && (
          <motion.svg
            key="ripple"
            viewBox="0 0 100 100"
            style={{ x: ringX, y: ringY }}
            initial={{ opacity: 0.55, scale: 0.4 }}
            animate={{ opacity: 0, scale: 1.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 -ml-9 -mt-9 h-18 w-18"
          >
            <polygon
              points={HEX_POINTS}
              fill="none"
              stroke={ink}
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  );
}
