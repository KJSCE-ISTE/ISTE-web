"use client";

import type { PublicSocial, SocialKind } from "@/lib/data/content";

/**
 * Social links for a council member.
 *
 * Three things this gets right that a naive `<a href={url}>` would not:
 *
 *  1. **`rel="noopener noreferrer"` on every external link.** Without
 *     `noopener`, the opened page gets a live `window.opener` handle back to
 *     this tab and can navigate it somewhere else — these URLs come from the
 *     database and are edited by students, so that is a real hole.
 *  2. **Scheme allow-list.** Only `http(s):` and `mailto:` render. A stored
 *     `javascript:` URL would otherwise be a stored-XSS trigger on click.
 *     (`content.ts` filters on read too — this is the second gate.)
 *  3. **Accessible names.** "Instagram" alone, repeated 120 times down the
 *     page, is useless in a screen reader's link list. Each label names the
 *     person: "Tanish Shetty on Instagram".
 */

const ICONS: Record<SocialKind, { label: string; path: string }> = {
  instagram: {
    label: "Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.02a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z",
  },
  linkedin: {
    label: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.02-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z",
  },
  github: {
    label: "GitHub",
    path: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  },
  twitter: {
    label: "X",
    path: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.02 4.13H5.06l12.02 15.64Z",
  },
  email: {
    label: "Email",
    path: "M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2.5 7.8 5.6L19.8 6H4.2Zm15.8 1.9-7.42 5.32a1 1 0 0 1-1.16 0L4 7.9v10.6h16V7.9Z",
  },
  link: {
    label: "Website",
    path: "M10.6 13.4a1 1 0 0 0 1.42 0l3.54-3.54a3 3 0 1 0-4.24-4.24l-1.06 1.06 1.41 1.41 1.06-1.06a1 1 0 1 1 1.42 1.42l-3.54 3.53a1 1 0 0 0 0 1.42Zm2.8-2.8a1 1 0 0 0-1.42 0l-3.53 3.54a1 1 0 1 1-1.42-1.42l3.54-3.53-1.42-1.42-3.53 3.54a3 3 0 1 0 4.24 4.24l3.54-3.53a1 1 0 0 0 0-1.42Z",
  },
};

const SIZES = {
  sm: { box: "h-6 w-6", icon: 12 },
  md: { box: "h-8 w-8", icon: 15 },
} as const;

export default function SocialLinks({
  socials,
  name,
  size = "sm",
  className = "",
}: {
  socials: PublicSocial[];
  name: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const safe = socials.filter((s) => /^(https?:|mailto:)/i.test(s.url));
  if (safe.length === 0) return null;

  const { box, icon } = SIZES[size];

  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {safe.map((social) => {
        const meta = ICONS[social.kind] ?? ICONS.link;
        const external = !social.url.startsWith("mailto:");
        return (
          <li key={social.url}>
            <a
              href={social.url}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              data-cursor="link"
              aria-label={`${name} on ${meta.label}`}
              title={meta.label}
              className={`${box} flex items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/80 backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-white/20 hover:text-white`}
            >
              <svg
                viewBox="0 0 24 24"
                width={icon}
                height={icon}
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={meta.path} />
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
