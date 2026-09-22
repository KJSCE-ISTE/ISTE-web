/**
 * Web Storage that cannot throw.
 *
 * `window.sessionStorage` is not merely "sometimes empty" — reading the
 * PROPERTY ITSELF throws a `SecurityError` when the browser has blocked site
 * data for the origin:
 *
 *   Failed to read the 'sessionStorage' property from 'Window':
 *   Access is denied for this document.
 *
 * Chrome does this when cookies/site-data are blocked for the origin, inside a
 * sandboxed or partitioned frame, and under some privacy extensions. Firefox's
 * "Never remember history" mode behaves the same way. Because it throws on
 * access rather than on `.getItem()`, the usual `typeof window !== "undefined"`
 * guard does not help, and an uncaught throw inside a React effect takes the
 * whole render down — which is exactly what it did here: a blank page with a
 * runtime SecurityError.
 *
 * Every access below is individually wrapped, and an in-memory Map stands in
 * when the real thing is unavailable. Callers get best-effort persistence and
 * never have to think about it.
 */

const memory = new Map<string, string>();

type Backend = "session" | "local";

function backend(kind: Backend): Storage | null {
  try {
    const store = kind === "session" ? window.sessionStorage : window.localStorage;
    // Safari in private mode exposes the object but throws on write, so prove
    // it actually works before trusting it.
    const probe = "__iste_probe__";
    store.setItem(probe, "1");
    store.removeItem(probe);
    return store;
  } catch {
    return null;
  }
}

export const safeStorage = {
  get(key: string, kind: Backend = "session"): string | null {
    try {
      const store = backend(kind);
      if (store) return store.getItem(key);
    } catch {
      /* fall through to memory */
    }
    return memory.get(key) ?? null;
  },

  set(key: string, value: string, kind: Backend = "session"): void {
    try {
      const store = backend(kind);
      if (store) {
        store.setItem(key, value);
        return;
      }
    } catch {
      /* fall through to memory */
    }
    // Memory fallback: lasts for this page view only, which is the right
    // degradation for a "have I shown this already?" flag.
    memory.set(key, value);
  },

  remove(key: string, kind: Backend = "session"): void {
    try {
      backend(kind)?.removeItem(key);
    } catch {
      /* ignore */
    }
    memory.delete(key);
  },
};
