import type { MetadataRoute } from "next";

/**
 * robots.txt
 *
 * The council portal is deliberately NOT listed here.
 *
 * Adding `Disallow: /c/8f2a…` would publish the exact secret we are trying to
 * keep — robots.txt is world-readable and is the first file an attacker fetches
 * precisely because it is where people list the paths they consider sensitive.
 * The portal stays out of the index by being unlinked, by the `noindex`
 * metadata on the route, and by the `X-Robots-Tag` header from middleware.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Uploaded media is served through a route handler; no value in crawling it.
        disallow: ["/api/"],
      },
    ],
  };
}
