"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import HexGrid from "@/components/fx/HexGrid";
import Magnetic from "@/components/fx/Magnetic";
import { Reveal } from "@/components/fx/Reveal";
import { SplitWords } from "@/components/fx/TextFX";
import Lightbox from "@/components/site/Lightbox";
import type { PublicGalleryItem } from "@/lib/data/content";

/**
 * Gallery.
 *
 * Images are dealt into three columns that scroll at different rates. The
 * differential is the whole effect — equal speeds would just be a grid — so
 * the middle column runs fastest and the outer two lag, which reads as depth.
 *
 * The lightbox is a real modal: focus is trapped, Escape closes, arrows
 * navigate, and background scroll is locked while it is open.
 */
export default function Gallery({
  items,
  showHexGrid = true,
  className = "",
}: {
  items: PublicGalleryItem[];
  showHexGrid?: boolean;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const colA = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const colB = useTransform(scrollYProgress, [0, 1], [-40, 160]);
  const colC = useTransform(scrollYProgress, [0, 1], [50, -110]);

  // Deal images round-robin so columns stay balanced at any count.
  const columns: PublicGalleryItem[][] = [[], [], []];
  items.forEach((item, i) => columns[i % 3].push(item));
  const offsets = [colA, colB, colC];

  // Keyboard handling, focus trap and scroll locking all live in <Lightbox>.
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className={`relative ${showHexGrid ? "overflow-hidden bg-canvas py-28 md:py-40" : "bg-transparent pt-14 pb-28 md:pt-20 md:pb-40"} ${className}`}
    >
      {showHexGrid && <HexGrid className="opacity-65" />}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <h2 className="optical-left text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-tight text-neutral-900">
            <span className="ink-gradient-split">
              <SplitWords text="Visuals." as="span" stagger={0.07} />
            </span>
          </h2>

          <Reveal kind="right" delay={0.2}>
            <Magnetic strength={0.35} radius={120}>
              <Link
                href="/gallery"
                data-cursor="view"
                data-cursor-text="Gallery"
                className="group inline-flex items-center gap-3 rounded-full border border-neutral-300 bg-white/70 px-7 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:border-fill hover:text-neutral-950"
              >
                View All Works
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {columns.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              style={{ y: offsets[colIndex] }}
              // Third column is hidden on small screens; its images still reach
              // the lightbox because that reads from the flat `items` array.
              className={`flex flex-col gap-4 md:gap-6 ${colIndex === 2 ? "hidden md:flex" : ""}`}
            >
              {column.map((item) => {
                const flatIndex = items.findIndex((entry) => entry.id === item.id);
                return (
                  <Reveal key={item.id} kind="scale" amount={0.12}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(flatIndex)}
                      data-cursor="view"
                      data-cursor-text="Expand"
                      aria-label={item.caption ?? "Open image"}
                      className="group relative block w-full overflow-hidden rounded-2xl border border-hairline bg-neutral-200"
                      suppressHydrationWarning
                    >
                      <div className="relative aspect-[4/5] w-full">
                        <Image
                          src={item.image}
                          alt={item.caption ?? ""}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover object-top transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                          /* Only ever true for a URL the council pastes by hand into the
                             dashboard. Archive images are local now, so they go through
                             Next's optimizer; an arbitrary external host would 400 there
                             because it is not in `remotePatterns`, so those bypass it. */
                          unoptimized={item.image.startsWith("http")}
                        />
                      </div>

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      {item.caption && (
                        <span className="pointer-events-none absolute bottom-4 left-4 translate-y-3 text-left text-xs font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          {item.caption}
                        </span>
                      )}
                    </button>
                  </Reveal>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared with the /gallery page so keyboard behaviour can't drift. */}
      <Lightbox
        items={items}
        index={openIndex}
        onClose={close}
        onIndexChange={setOpenIndex}
      />

    </section>
  );
}
