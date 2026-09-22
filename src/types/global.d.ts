import type Lenis from "lenis";

/**
 * The Lenis instance is shared on `window` so components that need to drive
 * scrolling imperatively — the gallery lightbox stopping background scroll,
 * the nav scrolling to an anchor — can reach it without prop-drilling a ref
 * through the whole tree.
 *
 * Named `__isteLenis` rather than `lenis` because the library already declares
 * a global `window.lenis` for its own version/capability info; reusing that
 * name collides with the shipped types.
 */
declare global {
  interface Window {
    __isteLenis?: Lenis;
  }
}

export {};
