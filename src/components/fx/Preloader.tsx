"use client";

import { useEffect, useState } from "react";

import { safeStorage } from "@/lib/safe-storage";

/**
 * Entry curtain.
 *
 * Shown once per browser session, ~1.25 s. A preloader that reappears on every
 * navigation is a tax on the reader, not an experience.
 *
 * THIS COMPONENT COVERS THE WHOLE PAGE AND LOCKS SCROLL, so it is written
 * defensively — anything that can leave it on screen is a broken site, and the
 * two ways that can happen are both handled here:
 *
 *  1. `requestAnimationFrame` is throttled to a standstill in background tabs
 *     and some embedded contexts. A progress loop driven by rAF never reaches
 *     the end, so the curtain never lifts. A `setTimeout` failsafe unmounts it
 *     regardless.
 *  2. An exit ANIMATION that must finish before unmounting has the same
 *     problem — which is why there is no `AnimatePresence` here. The curtain
 *     leaves via a plain CSS transition, and a timer removes it from the tree
 *     unconditionally whether or not that transition ever painted.
 *
 * Storage goes through `safeStorage` because reading `window.sessionStorage`
 * throws outright when the browser has blocked site data for the origin.
 */

const DURATION = 1250;
const EXIT_MS = 800;

type Phase = "idle" | "showing" | "leaving" | "gone";

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const seen = safeStorage.get("iste:intro");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || calm) {
      setPhase("gone");
      return;
    }

    setPhase("showing");
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;
    let finished = false;
    let exitTimer: number | undefined;

    const release = () => {
      document.body.style.overflow = "";
      safeStorage.set("iste:intro", "1");
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      release();
      setPhase("leaving");
      // Unmount on a timer, NOT on transitionend — a transition that never
      // paints never fires that event, and the curtain would stay forever.
      exitTimer = window.setTimeout(() => setPhase("gone"), EXIT_MS);
    };

    const tick = (now: number) => {
      // Guard against a frame timestamp fractionally behind our start mark.
      const t = Math.min(1, Math.max(0, (now - start) / DURATION));
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else finish();
    };

    raf = requestAnimationFrame(tick);
    const failsafe = window.setTimeout(finish, DURATION + 700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
      if (exitTimer) clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // "idle" renders the curtain too, so there is no flash of un-curtained page
  // between first paint and the effect deciding. "gone" removes it entirely.
  if (phase === "gone") return null;

  const leaving = phase === "leaving";

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-neutral-100"
      style={{
        clipPath: leaving ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        transition: `clip-path ${EXIT_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
        // Stop intercepting clicks the moment it starts leaving.
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <span className="font-mono text-[11px] tracking-[0.4em] text-neutral-400 uppercase">
          ISTE&nbsp;&middot;&nbsp;MH 60
        </span>

        <h1 className="ink-gradient text-5xl font-bold tracking-tight md:text-7xl">ISTE KJSSE</h1>

        <div className="relative h-px w-56 overflow-hidden bg-neutral-300">
          <div
            className="absolute inset-y-0 left-0 bg-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-mono text-xs tabular-nums text-neutral-500">
          {String(progress).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
