"use client";

/**
 * Last-resort error boundary.
 *
 * `global-error.tsx` replaces the root layout entirely when it fires, so it
 * must render its own <html> and <body>. It also has to exist for the App
 * Router to own every error path — without it, Next falls back to the Pages
 * Router `_error` component during prerendering, which is what produces the
 * confusing "<Html> should not be imported outside of pages/_document" build
 * failure on projects that have a root catch-all route.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#f5f5f5",
          color: "#171717",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          display: "flex",
          minHeight: "100svh",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#a3a3a3",
              margin: 0,
            }}
          >
            Something broke
          </p>

          <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0 0.5rem" }}>
            We hit an unexpected error
          </h1>

          <p style={{ color: "#525252", lineHeight: 1.6, margin: "0 0 1.75rem" }}>
            Try again — if it keeps happening, let the Web &amp; Tech team know.
          </p>

          {/* The digest is safe to surface: it is an opaque id for the server log. */}
          {error.digest && (
            <p style={{ fontFamily: "ui-monospace, monospace", fontSize: "11px", color: "#a3a3a3" }}>
              ref {error.digest}
            </p>
          )}

          <button
            onClick={reset}
            style={{
              marginTop: "0.5rem",
              background: "#171717",
              color: "#fff",
              border: 0,
              borderRadius: "999px",
              padding: "0.9rem 2rem",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
