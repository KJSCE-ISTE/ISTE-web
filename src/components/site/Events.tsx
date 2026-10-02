"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import HexGrid from "@/components/fx/HexGrid";
import Magnetic from "@/components/fx/Magnetic";
import { Parallax, Reveal } from "@/components/fx/Reveal";
import { SplitWords } from "@/components/fx/TextFX";
import type { PublicEvent } from "@/lib/data/content";

/**
 * Events showcase.
 *
 * The row a pointer is over expands and its neighbours dim — an "accordion of
 * attention" that lets three events occupy the space of one without a carousel.
 * `hovered` is the only piece of React state here; everything else is CSS
 * transitions and Framer layout animation, so the whole section re-renders at
 * most once per pointer entry.
 */
export default function Events({
  events,
  showHexGrid = true,
  className = "",
}: {
  events: PublicEvent[];
  showHexGrid?: boolean;
  className?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="events"
      data-surface="light"
      className={`relative ${showHexGrid ? "overflow-hidden bg-canvas py-28 md:py-40" : "bg-transparent pt-28 pb-14 md:pt-40 md:pb-20"} text-neutral-900 ${className}`}
    >
      {showHexGrid && <HexGrid className="opacity-70" />}

      <Parallax speed={-60} className="pointer-events-none absolute -top-8 right-0 select-none">
        <div className="text-[16vw] leading-none font-bold text-neutral-900/[0.035]" aria-hidden="true">
          EVENTS
        </div>
      </Parallax>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <h2 className="optical-left text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-tight text-neutral-900">
            <SplitWords text="Events" as="span" stagger={0.07} />
          </h2>

          <Reveal kind="right" delay={0.2}>
            <Magnetic strength={0.35} radius={120}>
              <Link
                href="/events"
                data-cursor="view"
                data-cursor-text="All events"
                className="group inline-flex items-center gap-3 rounded-full border border-neutral-300 bg-white/70 px-7 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:border-fill hover:text-neutral-950"
              >
                View All Events
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        {/* ── Event columns ───────────────────────────────────── */}
        <div className="grid items-start gap-7 md:grid-cols-3" onPointerLeave={() => setHovered(null)}>
          {events.map((event, index) => (
            <Reveal key={event.id} kind="up" delay={index * 0.09} className="h-auto">
              <article
                onPointerEnter={() => setHovered(event.id)}
                className="group relative h-auto"
              >
                <Link
                  href={`/events#${event.slug}`}
                  data-cursor="view"
                  data-cursor-text="Read"
                  className="block h-auto"
                >
                  <motion.div
                    animate={{
                      // Dim the columns the pointer is not on. Opacity only: the
                      // hover used to expand padding and unroll the summary, which
                      // changed one column's height and knocked the other two out
                      // of line. Nothing here affects layout.
                      opacity: hovered === null || hovered === event.id ? 1 : 0.42,
                      y: hovered === event.id ? -6 : 0,
                      boxShadow:
                        hovered === event.id
                          ? "0 36px 32px rgba(9, 1, 77, 0.28)"
                          : "0 8px 18px rgba(9, 1, 77, 0.08)",
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col overflow-hidden rounded-2xl border border-panel-edge bg-panel"
                  >
                    {/* Poster rolls open above the heading on hover. Collapsed to
                        zero height at rest, so a resting card is heading only.
                        A fixed target rather than aspect-ratio because height has
                        to be a number for Framer to interpolate from 0. */}
                    {event.image && (
                      <motion.div
                        initial={false}
                        animate={{ height: hovered === event.id ? 230 : 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full shrink-0 overflow-hidden"
                      >
                        <Image
                          src={event.image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                          /* Only ever true for a URL the council pastes by hand into the
                             dashboard. Archive images are local now, so they go through
                             Next's optimizer; an arbitrary external host would 400 there
                             because it is not in `remotePatterns`, so those bypass it. */
                          unoptimized={event.image.startsWith("http")}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                      </motion.div>
                    )}

                    <motion.div
                      animate={{
                        // The row's 28 -> 40 lift, rescaled for the card's p-6.
                        // Horizontal padding stays put; only the vertical breathes.
                        paddingTop: hovered === event.id ? 34 : 24,
                        paddingBottom: hovered === event.id ? 34 : 24,
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-1 flex-col px-6"
                    >
                      {/* Index and arrow were the row's two ends; in a column they
                          pair across the top of the text block instead. */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-neutral-500 tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <motion.span
                          animate={{
                            x: hovered === event.id ? 0 : -8,
                            opacity: hovered === event.id ? 1 : 0.35,
                          }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="text-2xl text-white"
                          aria-hidden="true"
                        >
                          ↗
                        </motion.span>
                      </div>

                      <div className="mt-4 flex flex-1 flex-col justify-start">
                        <h3 className="text-[clamp(1.3rem,2vw,1.7rem)] leading-tight font-semibold tracking-tight text-white min-h-[3.25rem]">
                          {event.title}
                        </h3>

                        <div className="mt-2">
                          <span className="inline-block rounded-full border border-field-edge px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-neutral-300">
                            {event.term}
                          </span>
                        </div>

                        <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-neutral-500 uppercase">
                          {event.dateLabel}
                        </p>
                      </div>

                      {/* Summary rolls down on hover, from nothing. marginTop is
                          animated too, or the collapsed paragraph would still hold a
                          16px gap under the date.

                          The grid stretches every column to the tallest, so all three
                          grow together and their tops stay locked. */}
                      <motion.p
                        initial={false}
                        animate={{
                          height: hovered === event.id ? "auto" : 0,
                          marginTop: hovered === event.id ? 16 : 0,
                          opacity: hovered === event.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden text-[13px] leading-relaxed text-neutral-400"
                      >
                        {event.summary}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
