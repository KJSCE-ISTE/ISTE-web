"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Perspective tilt that tracks the pointer.
 *
 * Real 3D, not a fake shadow: the wrapper sets `perspective` and the inner
 * element rotates on X and Y, so children marked `.layer-front` / `.layer-back`
 * genuinely separate in depth via `translateZ`.
 *
 * The pointer position is also written to `--mx` / `--my` custom properties,
 * which `.tilt-card::after` in globals.css uses to place a specular highlight.
 * Driving that through CSS vars instead of a React-rendered gradient keeps the
 * whole effect on the compositor.
 */
export default function Tilt3D({
  children,
  className = "",
  intensity = 12,
  scale = 1.02,
  glare = true,
  perspective = 1000,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the edges. Above ~18 it reads as a gimmick. */
  intensity?: number;
  scale?: number;
  glare?: boolean;
  perspective?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Normalised pointer offset from centre, in [-0.5, 0.5].
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 260, damping: 26, mass: 0.5 };
  // Note the axis swap: vertical pointer travel rotates about X, horizontal about Y.
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), spring);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    px.set(nx - 0.5);
    py.set(ny - 0.5);

    if (glare) {
      el.style.setProperty("--mx", `${nx * 100}%`);
      el.style.setProperty("--my", `${ny * 100}%`);
    }
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div ref={ref} style={{ perspective }} onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className={`${glare ? "tilt-card" : ""} relative ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
