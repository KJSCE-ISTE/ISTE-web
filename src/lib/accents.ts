/**
 * Categorical accent cycling.
 *
 * The four slots are declared in globals.css `@theme` and re-pointed by each
 * palette. Aurora aims all four at its single blue, so anything cycling through
 * them renders monochrome; Spectrum gives each its own hue, so the same markup
 * reads multi-coloured. That is the whole difference between the two palettes —
 * neither needs its own copy of a component.
 *
 * Returned as a `var()` string rather than a Tailwind class because the index
 * is only known at render time, and Tailwind cannot generate classes from a
 * runtime value.
 */
export const ACCENT_SLOTS = [
  "--color-accent",
  "--color-accent-2",
  "--color-accent-3",
  "--color-accent-4",
] as const;

/** The accent for item `i`, wrapping every 4. Negative indices are safe. */
export function accentAt(i: number): string {
  return `var(${ACCENT_SLOTS[((i % ACCENT_SLOTS.length) + ACCENT_SLOTS.length) % ACCENT_SLOTS.length]})`;
}
