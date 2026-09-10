"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import HexGrid from "@/components/fx/HexGrid";
import GradientWaves from "@/components/fx/GradientWaves";
import Magnetic from "@/components/fx/Magnetic";
import { CountUp, ScrambleText, SplitWords } from "@/components/fx/TextFX";
import EventTimeline from "@/components/site/EventTimeline";
import type { PublicEvent } from "@/lib/data/content";

/**
 * The events archive, as a horizontal timeline.
 *
 * Eleven events over four years read badly as a vertical list — the shape of
 * the chapter's history (a burst of activity, a quiet stretch, the flagship
 * every spring) only becomes visible when time runs along an axis.
 *
 * Design decisions that matter here:
 *
 *  • The rail is a real scroll container, not a JS-driven carousel. That means
 *    trackpads, shift+wheel, touch-drag, arrow keys, and Tab-to-focus all work
 *    for free, and it degrades to a plain scrolling row with no JS at all.
 *  • Keyboard users get explicit prev/next buttons and roving focus; a
 *    drag-only carousel is unusable without a pointer.
 *  • Selecting a card opens a detail panel BELOW the rail rather than
 *    navigating, so the reader keeps their place on the timeline.
 */

export default function EventsArchive({
  terms,
  total,
}: {
  terms: Array<{ term: string; events: PublicEvent[] }>;
  total: number;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Flatten to a single chronological sequence — the timeline is one line,
  // with term markers dropped in where the year changes.
  const timeline = terms.flatMap((group) => group.events);
  const [selected, setSelected] = useState<string | null>(timeline[0]?.id ?? null);
  const active = timeline.find((e) => e.id === selected) ?? timeline[0] ?? null;

  return (
    <>
      {/* ── Header ──────────────────────────────────────────── */}
      <section
        ref={headerRef}
        className="relative flex min-h-[52svh] items-center justify-center overflow-hidden bg-canvas pt-32 pb-16"
      >
        <HexGrid />

        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        >
          <Link
            href="/"
            data-cursor="link"
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/60 px-5 py-2 font-mono text-[11px] tracking-[0.2em] text-neutral-600 uppercase backdrop-blur-sm transition-colors hover:border-fill hover:text-neutral-900"
          >
            <span aria-hidden="true">←</span> Back home
          </Link>

          <h1 className="optical-left text-[clamp(2.75rem,10vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.04em]">
            <span className="ink-gradient-split">
              <SplitWords text="Events" as="span" stagger={0.08} />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed font-light text-neutral-600">
            Competitions, workshops and flagship showcases, in order.
          </p>

          <div className="mt-9 flex items-center justify-center gap-8 sm:gap-10">
            <Stat value={String(total)} label="Events" />
            <span className="h-9 w-px bg-neutral-300" />
            <Stat value={String(terms.length)} label="Years" />
            <span className="h-9 w-px bg-neutral-300" />
            <div className="text-center">
              <ScrambleText
                text="MH 60"
                className="block text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
              />
              <span className="mt-1 block font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
                Chapter
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Timeline ────────────────────────────────────────── */}
      <section data-surface="dark" className="relative bg-section py-20 text-neutral-100 md:py-28" style={{ background: "rgb(5,7,16)" }}>
        {/* Flowing blue orb gradient — animated, full-bleed, behind everything */}
        <GradientWaves
          className="absolute inset-0 w-full h-full"
          opacity={1.0}
          speed={0.22}
        />

        <div className="relative z-10">
          <EventTimeline
            events={timeline}
            selectedId={active?.id ?? null}
            onSelect={setSelected}
          />
        </div>

        {/* ── Detail panel ──────────────────────────────────────
            Keyed on the event id so switching remounts and replays the enter
            animation. No AnimatePresence: its exit has to finish before the
            old panel unmounts, and if frames are throttled you end up with two
            panels stacked in the DOM at once. */}
        <div className="relative z-10 mx-auto mt-14 max-w-6xl px-6">
          {active && <EventDetail key={active.id} event={active} />}
        </div>
      </section>

      {/* ── Full list, for reading rather than browsing ──────── */}
      <section className="relative bg-canvas py-24">
        <div className="mx-auto max-w-6xl px-6">
          {terms.map(({ term, events }) => (
            <div key={term} className="border-t border-hairline py-10">
              <div className="grid gap-6 lg:grid-cols-[160px_1fr] lg:gap-12">
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <h2 className="font-mono text-sm tracking-[0.16em] text-neutral-900">{term}</h2>
                  <p className="mt-1 font-mono text-[11px] text-neutral-500">
                    {String(events.length).padStart(2, "0")}{" "}
                    {events.length === 1 ? "event" : "events"}
                  </p>
                </div>

                <ul className="space-y-1">
                  {events.map((event) => (
                    <li key={event.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(event.id);
                          document
                            .getElementById("timeline-rail")
                            ?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        data-cursor="view"
                        data-cursor-text="Open"
                        className="group flex w-full items-baseline gap-4 rounded-lg px-3 py-3 text-left transition-colors hover:bg-neutral-900/[0.04]"
                      >
                        <span className="font-mono text-[11px] whitespace-nowrap text-neutral-500">
                          {event.dateLabel}
                        </span>
                        <span className="text-[15px] font-medium text-neutral-900">
                          {event.title}
                        </span>
                        <span className="h-px flex-1 bg-neutral-200 group-hover:bg-neutral-400" />
                        <span
                          className="text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <div className="mt-14 flex justify-center">
            <Magnetic strength={0.35} radius={130}>
              <Link
                href="/#events"
                data-cursor="view"
                data-cursor-text="Home"
                className="group inline-flex items-center gap-3 rounded-full bg-panel px-8 py-4 text-sm font-medium text-white"
              >
                <span
                  className="transition-transform duration-500 group-hover:-translate-x-1"
                  aria-hidden="true"
                >
                  ←
                </span>
                Back to the site
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   The rail
   ═══════════════════════════════════════════════════════════════════ */




/* ═══════════════════════════════════════════════════════════════════
   Detail
   ═══════════════════════════════════════════════════════════════════ */

function EventDetail({ event }: { event: PublicEvent }) {
  return (
    <motion.article
      id={event.slug}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-8 rounded-3xl border border-panel-edge bg-panel/60 p-6 backdrop-blur-sm md:grid-cols-[minmax(0,340px)_1fr] md:p-9"
    >
      {event.image && (
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-section">
          <Image
            src={event.image}
            alt=""
            aria-hidden="true"
            fill
            sizes="340px"
            className="scale-125 object-cover opacity-35 blur-2xl"
            unoptimized={event.image.startsWith("http")}
          />
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="340px"
            className="relative object-contain"
            unoptimized={event.image.startsWith("http")}
          />
        </div>
      )}

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-neutral-950 uppercase">
            {event.dateLabel}
          </span>
          <span className="rounded-full border border-field-edge px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-neutral-400 uppercase">
            {event.term}
          </span>
        </div>

        <h2 className="mt-5 text-[clamp(1.6rem,3.6vw,2.6rem)] leading-tight font-bold tracking-tight text-white">
          {event.title}
        </h2>

        <p className="mt-5 text-[15px] leading-relaxed text-neutral-300">{event.summary}</p>

        {event.details && (
          <>
            <div className="my-6 h-px w-full bg-panel-edge" />
            <p className="text-[15px] leading-relaxed text-neutral-400">{event.details}</p>
          </>
        )}
      </div>
    </motion.article>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <CountUp
        value={value}
        className="block text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl"
      />
      <span className="mt-1 block font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase">
        {label}
      </span>
    </div>
  );
}
