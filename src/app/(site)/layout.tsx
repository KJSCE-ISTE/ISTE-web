import BackToTop from "@/components/fx/BackToTop";
import CustomCursor from "@/components/fx/CustomCursor";
import Preloader from "@/components/fx/Preloader";
import ScrollProgress from "@/components/fx/ScrollProgress";
import SmoothScroll from "@/components/fx/SmoothScroll";

/**
 * Chrome for the public site.
 *
 * These five used to live in the root layout, which meant they also mounted on
 * the council dashboard — a route group with no layout of its own. That broke
 * the dashboard in two ways at once:
 *
 *   Lenis binds `wheel` and calls preventDefault, and honours only
 *   `data-lenis-prevent` (used nowhere here). So the admin modal, a
 *   `fixed inset-0 overflow-y-auto` overlay, never received a wheel event and
 *   could not scroll. The edit-member form is taller than the viewport, so its
 *   lower fields and the Save button were simply unreachable.
 *
 *   CustomCursor sets `cursor: none` document-wide, which is a poor trade on a
 *   data-entry form even when everything else works.
 *
 * A route group cannot escape the root layout, so the fix is the other
 * direction: the root keeps only the document shell, and anything site-only
 * lives here. `(site)` and `(portal)` are both route groups, so no URL changes.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Keyboard users must be able to skip past the animated nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:rounded-lg focus:bg-fill focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Preloader />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />
      <BackToTop />

      {children}
    </>
  );
}
