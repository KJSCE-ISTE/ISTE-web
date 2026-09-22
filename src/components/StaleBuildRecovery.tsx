"use client";

import { useEffect, useState } from "react";

import { safeStorage } from "@/lib/safe-storage";

/**
 * Recovery for a client bundle that has outlived its server.
 *
 * Server Actions are addressed by a content hash baked into the client bundle
 * at build time. Restart the dev server, or deploy, and every one of those ids
 * changes — so a tab that was already open posts an id the new server has never
 * heard of and gets:
 *
 *   UnrecognizedActionError: Server Action "404dd…" was not found on the server
 *
 * Next.js does not recover from this on its own; the error propagates to the
 * nearest boundary and the page is simply dead. On the sign-in screen that is
 * particularly bad — the reader has no idea the fix is a reload, and every
 * further click fails the same way.
 *
 * A reload fixes it completely, because it fetches the current bundle. So this
 * detects that specific failure and reloads once, guarded by a one-shot flag so
 * a genuinely broken build cannot put the page in a refresh loop. Anything else
 * gets a plain, honest error card.
 */

const RELOAD_FLAG = "iste:stale-reload";

/** True for the "your bundle is older than the server" family of errors. */
function isStaleBuildError(error: Error & { digest?: string }): boolean {
  const text = `${error.name} ${error.message} ${error.digest ?? ""}`.toLowerCase();
  return (
    text.includes("unrecognizedaction") ||
    text.includes("was not found on the server") ||
    text.includes("failed to find server action") ||
    // Chunk fetches fail the same way after a deploy.
    text.includes("loading chunk") ||
    text.includes("failed to fetch dynamically imported module")
  );
}

export default function StaleBuildRecovery({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    if (!isStaleBuildError(error)) return;

    // Only ever auto-reload once per session. If the fresh bundle throws the
    // same error the build is genuinely broken, and looping would hide that.
    if (safeStorage.get(RELOAD_FLAG)) return;

    safeStorage.set(RELOAD_FLAG, "1");
    setReloading(true);
    window.location.reload();
  }, [error]);

  // Reaching a normal render means the session is healthy; clear the guard so a
  // later deploy can auto-recover too.
  useEffect(() => {
    if (!isStaleBuildError(error)) safeStorage.remove(RELOAD_FLAG);
  }, [error]);

  const stale = isStaleBuildError(error);

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-md rounded-2xl border border-hairline bg-white/80 p-8 text-center backdrop-blur-sm">
        <span className="font-mono text-[10px] tracking-[0.24em] text-neutral-400 uppercase">
          {stale ? "Updated" : "Error"}
        </span>

        <h1 className="mt-3 text-xl font-semibold tracking-tight text-neutral-900">
          {stale ? "This page was out of date" : "Something went wrong"}
        </h1>

        <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
          {stale
            ? reloading
              ? "Reloading with the current version…"
              : "The site was updated while this tab was open. Reload to continue — nothing was lost."
            : "The page could not be displayed. Reloading usually clears it."}
        </p>

        <div className="mt-7 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-fill px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-panel-edge"
          >
            Reload
          </button>
          {!stale && (
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-neutral-300 px-5 py-2.5 text-[13px] font-medium text-neutral-700 transition-colors hover:border-fill hover:text-neutral-950"
            >
              Try again
            </button>
          )}
        </div>

        {error.digest && (
          <p className="mt-6 font-mono text-[10px] text-neutral-400">ref {error.digest}</p>
        )}
      </div>
    </main>
  );
}
