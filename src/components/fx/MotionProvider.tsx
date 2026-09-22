"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global motion policy.
 *
 * `reducedMotion="user"` makes Framer Motion honour the OS setting: transform
 * and layout animations snap straight to their final state instead of playing.
 * This matters more here than on a typical site — the CSS media query in
 * globals.css can neutralise CSS animations, but it cannot touch anything
 * Framer drives in JavaScript, which is most of this build. Without this, a
 * user who has asked their system for less motion still gets all of it.
 *
 * Opacity-only fades are deliberately still allowed through by Framer under
 * this setting: they carry no vestibular risk and keep content from popping in.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
