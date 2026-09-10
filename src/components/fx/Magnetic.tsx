"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Magnetic attraction: the element leans toward the pointer while it is nearby.
 *
 * Listening on `window` rather than the element itself is the point — the pull
 * has to begin *before* the pointer arrives, otherwise it is just a hover
 * state. The element tracks the pointer from `radius` px away and springs back
 * when it leaves.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 0.35,
  radius = 120,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** 0 = inert, 1 = the element sits exactly under the pointer. */
  strength?: number;
  radius?: number;
  as?: "div" | "span" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spring = { stiffness: 320, damping: 22, mass: 0.4 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        // Falloff so the pull eases in at the edge of the radius instead of
        // snapping on the moment the pointer crosses it.
        const falloff = 1 - dist / radius;
        x.set(dx * strength * falloff);
        y.set(dy * strength * falloff);
      } else if (x.get() !== 0 || y.get() !== 0) {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [radius, strength, x, y]);

  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
