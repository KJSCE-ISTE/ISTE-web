"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import HexGrid from "@/components/fx/HexGrid";
import Magnetic from "@/components/fx/Magnetic";
import { CountUp, SplitWords } from "@/components/fx/TextFX";
import TeamRoster, { type TeamTerm } from "@/components/site/TeamRoster";

/**
 * `/teams` — every council the chapter has had.
 *
 * Moved off the homepage: 140 people across seven years is a section that
 * dwarfs everything around it, and it is reference material people arrive
 * looking for rather than something they scroll past.
 */
export default function TeamsPage({
  terms,
  currentTerm,
}: {
  terms: TeamTerm[];
  currentTerm: string;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const totalPeople = terms.reduce((sum, t) => sum + t.members.length, 0);
  const earliest = terms[terms.length - 1]?.term.split("-")[0];

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
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/60 px-5 py-2 font-mono text-[11px] tracking-[0.2em] text-neutral-600 uppercase backdrop-blur-sm transition-colors hover:border-fill hover:text-neutral-900"
          >
            <span aria-hidden="true">←</span> Back home
          </Link>

          <h1 className="optical-left balance text-[clamp(2.5rem,9vw,6.5rem)] leading-[0.9] font-bold tracking-[-0.04em]">
            <span className="ink-gradient-split">
              <SplitWords text="The Council" as="span" stagger={0.08} />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed font-light text-neutral-600">
            Every student who has run this chapter{earliest ? `, back to ${earliest}` : ""}.
          </p>

          <div className="mt-8 flex items-center justify-center gap-8">
            <Stat value={String(totalPeople)} label="Members" />
            <span className="h-9 w-px bg-neutral-300" />
            <Stat value={String(terms.length)} label="Councils" />
          </div>
        </motion.div>
      </section>

      {/* ── Roster ──────────────────────────────────────────── */}
      <section className="relative bg-canvas pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <TeamRoster terms={terms} currentTerm={currentTerm} />

          <div className="mt-20 flex justify-center">
            <Magnetic strength={0.35} radius={130}>
              <Link
                href="/"
                data-cursor="view"
                data-cursor-text="Home"
                className="group inline-flex items-center gap-3 rounded-full bg-fill px-8 py-4 text-sm font-medium text-white"
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
