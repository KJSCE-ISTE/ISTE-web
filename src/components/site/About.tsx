"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/fx/Reveal";
import Tilt3D from "@/components/fx/Tilt3D";
import { CountUp, SplitWords } from "@/components/fx/TextFX";
import { ABOUT_COPY, ABOUT_STATS, SITE } from "@/lib/site";

/**
 * "Who We Are".
 *
 * The body copy uses a word-by-word opacity sweep driven by scroll position
 * rather than a timed animation. Because it is bound to `scrollYProgress`, the
 * reader controls the pace — the text illuminates exactly as fast as they
 * scroll, and scrolling back un-illuminates it. A timed fade would run ahead of
 * a slow reader and lag a fast one.
 */
export default function About() {
  const copyRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: copyRef,
    offset: ["start 0.85", "end 0.55"],
  });

  // Flatten the structured copy into words, keeping each word's emphasis flag.
  const words = ABOUT_COPY.flatMap((segment) =>
    segment.text
      .split(/(\s+)/)
      .filter((chunk) => chunk.trim().length > 0)
      .map((word) => ({ word, emphasis: segment.emphasis })),
  );

  return (
    <section id="about" className="relative overflow-hidden bg-canvas py-28 md:py-40">
      {/* Oversized ghost wordmark drifting against the scroll. */}
      <Parallax speed={70} className="pointer-events-none absolute inset-x-0 top-10 select-none">
        <div className="stroke-text text-center text-[20vw] leading-none font-bold opacity-[0.045]" aria-hidden="true">
          ISTE
        </div>
      </Parallax>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="optical-left balance mb-16 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-tight">
          <span className="ink-gradient-split">
            <SplitWords text="Who We Are" as="span" stagger={0.07} />
          </span>
        </h2>

        <div className="grid gap-16 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          {/* ── Scroll-illuminated copy ───────────────────────── */}
          <div>
            <p
              ref={copyRef}
              className="text-[clamp(1.05rem,1.9vw,1.5rem)] leading-[1.65] font-light tracking-tight text-neutral-900"
            >
              {words.map((entry, i) => {
                // Each word gets its own slice of the scroll range, so they
                // light up in sequence across the paragraph.
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word key={i} range={[start, end]} progress={scrollYProgress} emphasis={entry.emphasis}>
                    {entry.word}
                  </Word>
                );
              })}
            </p>

            {/* ── Stats ─────────────────────────────────────── */}
            <Stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-neutral-200 sm:grid-cols-4">
              {ABOUT_STATS.map((stat) => (
                <StaggerItem key={stat.label} kind="up" className="bg-canvas-raised p-5">
                  <div className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="mt-1 text-[13px] font-medium text-neutral-700">{stat.label}</div>
                  <div className="mt-0.5 text-[11px] leading-snug text-neutral-500">{stat.detail}</div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* ── 3D crest card ─────────────────────────────────── */}
          <Reveal kind="rotate3d" delay={0.15}>
            <Tilt3D intensity={14} className="rounded-3xl">
              <div className="preserve-3d grain relative overflow-hidden rounded-3xl border border-hairline bg-white p-9 shadow-xl shadow-neutral-900/5">
                <div className="layer-front preserve-3d">
                  <div className="relative mx-auto h-36 w-36">
                    <Image src="/iste-logo.png" alt="ISTE emblem" fill sizes="144px" className="object-contain" />
                  </div>
                </div>

                <div className="layer-mid mt-8 text-center">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                    Chapter
                  </div>
                  <div className="mt-2 text-3xl font-bold tracking-tight text-neutral-900">
                    {SITE.chapterCode}
                  </div>
                  <div className="mt-4 h-px w-full bg-neutral-200" />

                  <dl className="mt-5 space-y-3 text-left">
                    {[
                      ["Institute", SITE.institute],
                      ["Established", SITE.established],
                      ["Motto", SITE.tagline],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-start justify-between gap-4">
                        <dt className="font-mono text-[10px] tracking-[0.16em] text-neutral-400 uppercase">
                          {label}
                        </dt>
                        <dd className="max-w-[62%] text-right text-[13px] leading-snug font-medium text-neutral-800">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Tilt3D>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** One scroll-illuminated word. Kept out of the map body so hooks stay legal. */
function Word({
  children,
  range,
  progress,
  emphasis,
}: {
  children: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  emphasis: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const blur = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);

  return (
    <motion.span
      style={{ opacity, filter: blur }}
      className={`mr-[0.28em] inline-block ${emphasis ? "font-semibold text-neutral-950" : ""}`}
    >
      {children}
    </motion.span>
  );
}
