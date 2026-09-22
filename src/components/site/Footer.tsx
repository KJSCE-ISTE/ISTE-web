"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal, Stagger, StaggerItem } from "@/components/fx/Reveal";
import { FOOTER_LINKS, SITE, SOCIALS } from "@/lib/site";

/**
 * Footer.
 *
 * Three columns of orientation — who the chapter is, where to go next, how to
 * reach it — closed by a rule and the copyright line. Deliberately plain: it is
 * the last thing on the page and its job is to end it, not to add another
 * feature.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* ── Identity ────────────────────────────────────── */}
          <Reveal kind="up">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image src="/iste-logo.png" alt="" fill sizes="48px" className="object-contain" />
              </div>
              <div className="h-10 w-px bg-neutral-300" />
              <div className="relative h-12 w-12">
                <Image src="/kjsse-logo.png" alt="" fill sizes="48px" className="object-contain" />
              </div>
            </div>

            <h2 className="ink-gradient mt-6 text-2xl font-bold tracking-tight">{SITE.name}</h2>
            <p className="font-mono text-[11px] tracking-[0.2em] text-neutral-500 uppercase">
              Student Chapter
            </p>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-600">
              {SITE.footerBlurb}
            </p>
          </Reveal>

          {/* ── Explore ─────────────────────────────────────── */}
          <Reveal kind="up" delay={0.1}>
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-neutral-500 uppercase">
              Explore
            </h3>
            <Stagger className="mt-5 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <StaggerItem key={link.label} kind="up">
                  <Link
                    href={link.href}
                    data-cursor="link"
                    className="group inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-950"
                  >
                    <span className="h-px w-0 bg-neutral-900 transition-all duration-500 group-hover:w-4" />
                    {link.label}
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>

          {/* ── Reach ───────────────────────────────────────── */}
          <Reveal kind="up" delay={0.18}>
            <h3 className="font-mono text-[10px] tracking-[0.24em] text-neutral-500 uppercase">
              Connect
            </h3>

            <address className="mt-5 text-sm leading-relaxed text-neutral-600 not-italic">
              {SITE.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>

            <ul className="mt-5 space-y-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="group inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-950"
                  >
                    {social.label}
                    <span className="text-neutral-400 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ── Colophon ──────────────────────────────────────── */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-8 sm:flex-row">
          <p className="text-xs text-neutral-500">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-neutral-500">
            Made with
            <span className="text-rose-500" aria-label="love">
              ♥
            </span>
            by
            <Link href="/teams" data-cursor="link" className="font-medium text-neutral-700 hover:text-neutral-950">
              ISTE Council
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
