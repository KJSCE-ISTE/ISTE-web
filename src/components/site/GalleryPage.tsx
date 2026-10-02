"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import HexGrid from "@/components/fx/HexGrid";
import Magnetic from "@/components/fx/Magnetic";
import { Reveal } from "@/components/fx/Reveal";
import { CountUp, SplitWords } from "@/components/fx/TextFX";
import Lightbox from "@/components/site/Lightbox";
import type { PublicGalleryItem } from "@/lib/data/content";
import { accentAt } from "@/lib/accents";

/**
 * The full gallery.
 *
 * A CSS `columns` masonry rather than a JS grid: images here vary wildly in
 * aspect ratio (square candids next to portrait event posters), and columns
 * pack them without cropping or leaving gaps — with no layout measuring and no
 * resize listener.
 *
 * The trade-off columns make is reading order: they fill top-to-bottom per
 * column, not left-to-right. That is fine for a gallery, where there is no
 * meaningful sequence, and the lightbox navigates the flat array anyway.
 */
export default function GalleryPage({ items }: { items: PublicGalleryItem[] }) {
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const terms = useMemo(() => {
    const found = new Set<string>();
    for (const item of items) if (item.term) found.add(item.term);
    return [...found].sort((a, b) => b.localeCompare(a));
  }, [items]);

  const [filter, setFilter] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.term === filter)),
    [items, filter],
  );

  return (
    <>
      {/* ── Header ──────────────────────────────────────────── */}
      <section
        ref={headerRef}
        className="relative flex min-h-[48svh] items-center justify-center overflow-hidden bg-canvas pt-32 pb-14"
      >
        <HexGrid />

        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <Link
            href="/"
            data-cursor="link"
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/60 px-5 py-2 text-[15px] font-medium text-neutral-600 backdrop-blur-sm transition-colors hover:border-fill hover:text-neutral-900"
          >
            <span aria-hidden="true">←</span> Back home
          </Link>

          <h1 className="optical-left text-[clamp(2.75rem,10vw,7.5rem)] leading-[0.9] font-bold tracking-[-0.04em]">
            <span className="ink-gradient-split">
              <SplitWords text="Gallery" as="span" stagger={0.08} />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed font-light text-neutral-600">
            Photographs and posters from everything the chapter has run.
          </p>

          <div className="mt-8 flex items-center justify-center gap-8">
            <Stat value={String(items.length)} label="Images" />
            <span className="h-9 w-px bg-neutral-300" />
            <Stat value={String(terms.length)} label="Years" />
          </div>
        </motion.div>
      </section>

      {/* ── Filter + masonry ────────────────────────────────── */}
      <section className="relative bg-canvas pb-28">
        <div className="mx-auto max-w-7xl px-6">
          {terms.length > 0 && (
            <Reveal kind="up">
              <div
                role="tablist"
                aria-label="Filter gallery by year"
                className="mb-10 flex flex-wrap gap-2 border-t border-hairline pt-8"
              >
                <FilterPill
                  label="All"
                  count={items.length}
                  selected={filter === "all"}
                  onClick={() => setFilter("all")}
                  index={0}
                />
                {terms.map((term, i) => (
                  <FilterPill
                    key={term}
                    label={term}
                    count={items.filter((it) => it.term === term).length}
                    selected={filter === term}
                    onClick={() => setFilter(term)}
                    index={i + 1}
                  />
                ))}
              </div>
            </Reveal>
          )}

          {visible.length === 0 ? (
            <p className="py-24 text-center text-neutral-500">Nothing here for {filter}.</p>
          ) : (
            /* Keyed on the filter so switching remounts and re-animates. */
            <div key={filter} className="columns-2 gap-4 md:columns-3 md:gap-5 lg:columns-4">
              {visible.map((item, i) => (
                <GalleryTile
                  key={item.id}
                  item={item}
                  index={i}
                  onOpen={() => setOpenIndex(items.findIndex((x) => x.id === item.id))}
                />
              ))}
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <Magnetic strength={0.35} radius={130}>
              <Link
                href="/"
                data-cursor="view"
                data-cursor-text="Home"
                className="group inline-flex items-center gap-3 rounded-full bg-fill px-8 py-4 text-[15px] font-medium text-white"
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

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: PublicGalleryItem;
  index: number;
  onOpen: () => void;
}) {
  /**
   * The intrinsic ratio when we know it, so the tile reserves the right height
   * before the image decodes and the masonry doesn't reflow as things load.
   * Falls back to 4:5 for rows seeded without dimensions.
   */
  const ratio = item.width && item.height ? item.width / item.height : 0.8;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      data-cursor="view"
      data-cursor-text="Expand"
      aria-label={item.caption ?? "Open image"}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-hairline bg-neutral-200 md:mb-5"
    >
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        <Image
          src={item.image}
          alt={item.caption ?? ""}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          /* Only ever true for a URL the council pastes by hand into the
             dashboard. Archive images are local now, so they go through
             Next's optimizer; an arbitrary external host would 400 there
             because it is not in `remotePatterns`, so those bypass it. */
          unoptimized={item.image.startsWith("http")}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-3 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {item.caption && (
            <p className="text-xs font-medium text-white">{item.caption}</p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function FilterPill({
  label,
  count,
  selected,
  onClick,
  index,
}: {
  label: string;
  count: number;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      role="tab"
      type="button"
      aria-selected={selected}
      onClick={onClick}
      data-cursor="link"
      className={`relative rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors ${
        selected ? "text-white" : "text-neutral-500 hover:text-neutral-900"
      }`}
    >
      {selected && (
        <motion.span
          layoutId="gallery-filter-pill"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: accentAt(index) }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
      <span className="relative z-10 ml-2 text-[11px] text-neutral-400">{count}</span>
    </button>
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
