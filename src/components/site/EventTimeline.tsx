"use client";

import { motion } from "motion/react";

import { accentAt } from "@/lib/accents";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { PublicEvent } from "@/lib/data/content";

/**
 * Horizontal event timeline.
 *
 * A real scroll container, not a carousel. Trackpad, shift+wheel, touch drag,
 * Tab-to-focus and native scrollbars all work because the browser is doing the
 * scrolling — there is no transform-based track to keep in sync, and no state
 * to desynchronise from the DOM.
 *
 * Layered on top of that:
 *   • a continuous axis with a node per event and a year label at each term
 *   • proximity focus — cards nearest the centre of the rail sit forward,
 *     everything else recedes
 *   • click-and-drag panning with a grab cursor
 *   • vertical wheel mapped to horizontal travel
 *   • a progress bar tied to real scroll position
 *
 * PERFORMANCE
 * -----------
 * The proximity effect writes a `--prox` custom property directly onto each
 * card from one rAF-throttled scroll handler; CSS turns that into transform and
 * opacity. Driving it through React state would re-render every card on every
 * scroll frame. This way the component renders once and the compositor does the
 * rest.
 */

export default function EventTimeline({
  events,
  selectedId,
  onSelect,
}: {
  events: PublicEvent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<number | null>(null);

  /* ── Scroll-linked state: edges, progress, proximity ──────────── */
  const sync = useCallback(() => {
    frame.current = null;
    const rail = railRef.current;
    if (!rail) return;

    const max = rail.scrollWidth - rail.clientWidth;
    setEdges({ start: rail.scrollLeft <= 4, end: rail.scrollLeft >= max - 4 });
    setProgress(max > 0 ? rail.scrollLeft / max : 0);

    // Proximity: 1 at the rail's centre, falling to 0 about a card away.
    const centre = rail.scrollLeft + rail.clientWidth / 2;
    const cards = rail.querySelectorAll<HTMLElement>("[data-card]");
    const falloff = Math.max(rail.clientWidth * 0.42, 260);

    for (const card of cards) {
      const cardCentre = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCentre - centre);
      const prox = Math.max(0, 1 - distance / falloff);
      // Eased so the focused card stands out rather than the whole rail
      // brightening evenly.
      card.style.setProperty("--prox", (prox * prox).toFixed(3));
    }
  }, []);

  const requestSync = useCallback(() => {
    if (frame.current === null) frame.current = requestAnimationFrame(sync);
  }, [sync]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    sync();
    rail.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    /* A vertical wheel over the rail should travel along it. Only claimed when
       the gesture is clearly vertical and the rail can still move that way —
       otherwise a trackpad's horizontal component is passed through, and the
       page keeps scrolling once the rail hits an end. */
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = rail.scrollWidth - rail.clientWidth;
      const next = rail.scrollLeft + e.deltaY;
      if (next < 0 || next > max) return;
      e.preventDefault();
      rail.scrollLeft = next;
    };
    rail.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      rail.removeEventListener("scroll", requestSync);
      rail.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", requestSync);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [sync, requestSync]);

  /* ── Drag to pan ──────────────────────────────────────────────── */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let startX = 0;
    let startScroll = 0;
    let pointerId: number | null = null;
    let moved = 0;

    const onDown = (e: PointerEvent) => {
      // Left button only, and never start a drag from a control.
      if (e.button !== 0) return;
      if ((e.target as Element).closest("a, button")) return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = rail.scrollLeft;
      moved = 0;
      setDragging(true);
    };

    const onMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      const delta = e.clientX - startX;
      moved = Math.max(moved, Math.abs(delta));
      // Capture only once it is unambiguously a drag, so a click still clicks.
      if (moved > 6 && !rail.hasPointerCapture(e.pointerId)) {
        rail.setPointerCapture(e.pointerId);
      }
      if (moved > 6) rail.scrollLeft = startScroll - delta;
    };

    const onUp = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      if (rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
      pointerId = null;
      setDragging(false);
    };

    rail.addEventListener("pointerdown", onDown);
    rail.addEventListener("pointermove", onMove);
    rail.addEventListener("pointerup", onUp);
    rail.addEventListener("pointercancel", onUp);
    return () => {
      rail.removeEventListener("pointerdown", onDown);
      rail.removeEventListener("pointermove", onMove);
      rail.removeEventListener("pointerup", onUp);
      rail.removeEventListener("pointercancel", onUp);
    };
  }, []);

  /* Keep an externally-selected card in view. */
  useEffect(() => {
    if (!selectedId) return;
    railRef.current
      ?.querySelector(`[data-event-id="${CSS.escape(selectedId)}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [selectedId]);

  const nudge = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.max(300, rail.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <div id="timeline-rail" className="relative z-10">
      {/* ── Header ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-12 flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6"
      >
        <div>
          <p className="font-mono text-[11px] tracking-[0.32em] text-neutral-400 uppercase">
            The Timeline
          </p>
          <h2 className="optical-left balance mt-3 text-[clamp(2.5rem,7vw,5rem)] leading-[0.92] font-bold tracking-[-0.035em] text-white">
            Everything we&rsquo;ve run
          </h2>
          <p className="mt-4 text-[15px] text-neutral-400">
            <span className="font-semibold text-white tabular-nums">{events.length}</span> events
            across{" "}
            <span className="font-semibold text-white tabular-nums">
              {new Set(events.map((e) => e.term)).size}
            </span>{" "}
            council years · drag, scroll or use the arrows
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress rail doubles as the position indicator. */}
          {/* Thick enough to read as a control rather than a hairline. */}
          <div
            className="hidden h-[3px] w-56 overflow-hidden rounded-full bg-panel-edge sm:block"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-white transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(6, Math.round(progress * 100))}%` }}
            />
          </div>
          <div className="flex gap-2">
            <RailButton label="Earlier in the rail" disabled={edges.start} onClick={() => nudge(-1)}>
              ←
            </RailButton>
            <RailButton label="Later in the rail" disabled={edges.end} onClick={() => nudge(1)}>
              →
            </RailButton>
          </div>
        </div>
      </motion.div>

      {/* One entrance for the whole rail. Per-card entrances would fight the
          proximity effect, which owns opacity from the first scroll tick. */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Edge fades removed — no more blue shadows on left/right. */}

        <div
          ref={railRef}
          role="list"
          aria-label="Event timeline"
          data-cursor={dragging ? "drag" : undefined}
          className={`scrollbar-none flex snap-x snap-mandatory items-start gap-7 overflow-x-auto scroll-smooth px-6 pt-2 pb-8 md:px-[max(1.5rem,calc((100%-72rem)/2))] ${dragging ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
        >
          {events.map((event, i) => (
            <TimelineCard
              key={event.id}
              event={event}
              index={i}
              // A year label only where the term actually changes — repeating it
              // on every card turns the axis into noise.
              showTerm={i === 0 || events[i - 1].term !== event.term}
              selected={event.id === selectedId}
              onSelect={() => onSelect(event.id)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TimelineCard({
  event,
  showTerm,
  selected,
  onSelect,
  index,
}: {
  event: PublicEvent;
  showTerm: boolean;
  selected: boolean;
  onSelect: () => void;
  index: number;
}) {
  // Cycles the four categorical slots. Monochrome under Aurora, four
  // hues under Spectrum — same markup either way.
  const accent = accentAt(index);

  return (
    <div
      role="listitem"
      data-card
      data-event-id={event.id}
      className="w-[300px] shrink-0 snap-center sm:w-[360px] lg:w-[400px]"
      style={{
        // Set so the first paint is not un-proximate before the first scroll tick.
        ["--prox" as string]: "0",
      }}
    >
      {/* ── Year marker ──────────────────────────────────────────
          Display-scale, not a caption. These are the anchors a reader
          navigates by, so they carry the same weight as a section heading —
          and they lift and brighten as the rail brings them to centre. */}
      <div className="flex h-[4.5rem] items-end">
        {showTerm && (
          <span
            className="block leading-[0.85] font-bold tracking-[-0.03em] tabular-nums transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              color: `color-mix(in srgb, #ffffff calc(26% + var(--prox) * 74%), transparent)`,
              transform: "translateY(calc(var(--prox) * -6px))",
            }}
          >
            {event.term.slice(0, 4)}
            <span
              className="font-normal"
              style={{ color: `color-mix(in srgb, #ffffff calc(14% + var(--prox) * 46%), transparent)` }}
            >
              -{event.term.slice(-4)}
            </span>
          </span>
        )}
      </div>

      {/* ── Axis + node ──────────────────────────────────────── */}
      <div className="relative h-12" aria-hidden="true">
        {/* The axis is drawn per card and bleeds through the gap, so it reads as
            one continuous line without a separate absolutely-positioned rule
            that would drift out of sync when cards resize.

            Two layers: a constant base rule, and a brighter segment that fades
            up with proximity. The second is what makes the line feel alive
            under the pointer rather than being a static divider. */}
        <span className="absolute top-1/2 -left-7 h-[2px] w-[calc(100%+3.5rem)] -translate-y-1/2 rounded-full bg-panel-edge" />
        <span
          className="absolute top-1/2 -left-7 h-[2px] w-[calc(100%+3.5rem)] -translate-y-1/2 rounded-full transition-opacity duration-500"
          style={{
            opacity: `calc(var(--prox) * 0.9)`,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.85) 50%, transparent)",
          }}
        />

        {/* Halo grows with proximity, so the focused point on the axis is
            obvious from across the rail. */}
        <span
          className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
          style={{
            width: 56,
            height: 56,
            background: `radial-gradient(circle, color-mix(in srgb, #ffffff calc(var(--prox) * 22%), transparent), transparent 66%)`,
          }}
        />

        {/* Only the selected node pulses. Everything pulsing would be noise. */}
        {selected && (
          <span
            className="animate-pulse-ring absolute top-1/2 left-1/2 block h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{ borderColor: accent }}
          />
        )}
        <span
          className="absolute top-1/2 left-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300"
          style={{
            width: selected ? 24 : 16,
            height: selected ? 24 : 16,
            backgroundColor: selected ? accent : "var(--color-section)",
            borderColor: selected
              ? accent
              : `color-mix(in srgb, ${accent} calc(35% + var(--prox) * 65%), transparent)`,
            transform: "translate(-50%, -50%) scale(calc(1 + var(--prox) * 0.18))",
          }}
        />
      </div>

      {/* Stem tying the node to its card — without it the two rows read as
          separate lists rather than one timeline. */}
      <span
        aria-hidden="true"
        className="mx-auto block rounded-full transition-all duration-500"
        style={{
          height: 32,
          width: 2,
          background: `linear-gradient(to bottom, color-mix(in srgb, #ffffff calc(22% + var(--prox) * 68%), transparent), transparent)`,
        }}
      />

      {/* ── Card ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={onSelect}
        data-cursor="view"
        data-cursor-text={selected ? "Showing" : "Read"}
        aria-pressed={selected}
        className="group mt-1 block w-full text-left"
        style={{
          // Proximity drives lift and clarity. Both are compositor properties,
          // so this costs nothing per frame.
          transform: "translateY(calc(var(--prox) * -14px)) scale(calc(0.965 + var(--prox) * 0.035))",
          opacity: `calc(0.4 + var(--prox) * 0.6)`,
          transition: "transform 220ms cubic-bezier(0.16,1,0.3,1), opacity 220ms linear",
        }}
      >
        <span
          className={`relative block overflow-hidden rounded-2xl border transition-colors duration-300 ${selected
            ? "border-white/70 bg-panel"
            : "border-panel-edge bg-panel/60 group-hover:border-field-edge"
            }`}
        >
          <span className="relative block aspect-[4/3] w-full overflow-hidden bg-panel-edge">
            {event.image ? (
              <Image
                src={event.image}
                alt=""
                fill
                sizes="(max-width: 640px) 300px, 400px"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                /* Only ever true for a URL the council pastes by hand into the
                   dashboard. Archive images are local now, so they go through
                   Next's optimizer; an arbitrary external host would 400 there
                   because it is not in `remotePatterns`, so those bypass it. */
                unoptimized={event.image.startsWith("http")}
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-mono text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
                No poster
              </span>
            )}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-section/80 via-transparent to-transparent" />
          </span>

          <span className="block p-5">
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-neutral-500 uppercase">
              {event.dateLabel}
              <span className="h-px flex-1 bg-panel-edge" />
              <span className="tabular-nums">{event.term.slice(2, 4)}/{event.term.slice(-2)}</span>
            </span>

            <span className="mt-2.5 block text-[22px] leading-tight font-bold tracking-tight text-balance text-white">
              {event.title}
            </span>

            {/* No `block` here: `line-clamp-2` sets `display: -webkit-box`, and the
                `block` utility overrides it — which silently disables the clamp
                and renders the entire write-up. */}
            <span className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-neutral-400">
              {event.summary}
            </span>

            <span
              className="mt-4 flex items-center gap-1.5 text-[12px] font-medium transition-colors duration-300"
              style={{ color: selected ? "#ffffff" : "#a3a3a3" }}
            >
              {selected ? "Showing below" : "Read the write-up"}
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
}

function RailButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      data-cursor="link"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-field-edge text-[15px] text-neutral-300 transition-all duration-300 hover:scale-105 hover:border-white hover:text-white disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:scale-100"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
