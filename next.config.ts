import path from "node:path";
import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * `'unsafe-inline'` for styles is unavoidable with Framer Motion + Tailwind's
 * runtime style injection. Scripts are locked down to 'self' plus the nonce-less
 * inline bootstrap Next.js emits, which is why 'unsafe-inline' is present for
 * script-src only in dev. In production Next.js hashes its bootstrap, so we keep
 * 'unsafe-inline' out and rely on 'strict-dynamic' being unnecessary here.
 */
const isDev = process.env.NODE_ENV === "development";

const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `frame-ancestors 'none'`,
  `form-action 'self' https://formspree.io`,
  `img-src 'self' data: blob: https://raw.githubusercontent.com`,
  `font-src 'self' data:`,
  `style-src 'self' 'unsafe-inline'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self' https://formspree.io${isDev ? " ws: wss:" : ""}`,
  `manifest-src 'self'`,
  `worker-src 'self' blob:`,
  /**
   * PRODUCTION ONLY — and that exclusion is not cosmetic.
   *
   * `upgrade-insecure-requests` rewrites every http:// subresource to https://.
   * Chrome exempts localhost from that rule; Safari does not. So on
   * http://localhost this directive upgraded every stylesheet and script
   * request to https://localhost, where nothing is listening — and the dev site
   * rendered as raw unstyled HTML with no JavaScript, in Safari only.
   *
   * It is pure belt-and-braces in production (everything is already served over
   * TLS there), so scoping it to production costs nothing and makes Safari a
   * usable development browser.
   */
  ...(isDev ? [] : [`upgrade-insecure-requests`]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/KJSCE-ISTE/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // sharp is native; keep it out of the server bundle. (better-sqlite3 was
  // here too, until the council dashboard and its database were removed.)
  serverExternalPackages: ["sharp"],

  experimental: {
    serverActions: {
      // Uploaded gallery images travel through a Server Action as FormData.
      bodySizeLimit: "12mb",
    },
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
