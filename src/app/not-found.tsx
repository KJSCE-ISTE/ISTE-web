import Link from "next/link";

/**
 * 404.
 *
 * This page is load-bearing for the hidden portal: a wrong guess at the portal
 * path renders exactly this, indistinguishable from any other missing URL.
 * Keep it generic — no hints, no "did you mean", no route listing.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-canvas px-6 text-center">
      <span className="font-mono text-[11px] tracking-[0.32em] text-neutral-400 uppercase">
        Error 404
      </span>

      <h1 className="ink-gradient mt-6 text-[clamp(4rem,18vw,12rem)] leading-none font-bold tracking-tighter">
        404
      </h1>

      <p className="mt-4 max-w-md text-neutral-600">
        We couldn&apos;t find that page. It may have been moved, or the link might be out of date.
      </p>

      <Link
        href="/"
        data-cursor="link"
        className="group mt-10 inline-flex items-center gap-3 rounded-full bg-fill px-8 py-4 text-sm font-medium text-white"
      >
        <span className="transition-transform duration-500 group-hover:-translate-x-1" aria-hidden="true">
          ←
        </span>
        Back to ISTE KJSSE
      </Link>
    </main>
  );
}
