"use client";

import Image from "next/image";
import Link from "next/link";

import Magnetic from "@/components/fx/Magnetic";
import { Reveal, Stagger, StaggerItem } from "@/components/fx/Reveal";
import { SplitWords } from "@/components/fx/TextFX";
import Tilt3D from "@/components/fx/Tilt3D";
import SocialLinks from "@/components/site/SocialLinks";
import type { PublicTeamMember } from "@/lib/data/content";

/**
 * Homepage council teaser.
 *
 * The full roster moved to `/teams` — 140 people across seven years is
 * reference material, not something to scroll past on the way to the contact
 * form. What stays here is the three officers plus a headcount, which is what a
 * first-time visitor actually wants: who runs this, and how big is it.
 */
export default function TeamTeaser({
  core,
  term,
  totalMembers,
  totalTerms,
}: {
  core: PublicTeamMember[];
  term: string;
  totalMembers: number;
  totalTerms: number;
}) {
  return (
    <section id="team" className="relative overflow-hidden bg-canvas py-28 md:py-40">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 className="optical-left balance text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] font-bold tracking-tight">
            <span className="ink-gradient-split">
              <SplitWords text="Meet the People" as="span" stagger={0.06} />
            </span>
          </h2>

          <Reveal kind="right" delay={0.15}>
            <div className="lg:text-right">
              <p className="text-[15px] leading-relaxed text-neutral-600">
                The {term} council — and{" "}
                <strong className="font-semibold text-neutral-900">{totalMembers} students</strong>{" "}
                across {totalTerms} councils before them.
              </p>

              <Magnetic strength={0.32} radius={120}>
                <Link
                  href="/teams"
                  data-cursor="view"
                  data-cursor-text="All councils"
                  className="group mt-5 inline-flex items-center gap-3 rounded-full border border-neutral-300 px-7 py-3.5 text-sm font-medium text-neutral-700 transition-colors hover:border-fill hover:text-neutral-950"
                >
                  See every council
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Stagger gap={0.1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((member) => (
            <StaggerItem key={member.id} kind="rotate3d">
              <Tilt3D intensity={13} className="h-full rounded-3xl">
                <article className="preserve-3d group relative h-full overflow-hidden rounded-3xl border border-hairline bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-neutral-900/10">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top grayscale-[35%] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
                        /* Only ever true for a URL the council pastes by hand into the
                           dashboard. Archive images are local now, so they go through
                           Next's optimizer; an arbitrary external host would 400 there
                           because it is not in `remotePatterns`, so those bypass it. */
                        unoptimized={member.image.startsWith("http")}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-neutral-400">
                        {member.name
                          .split(/\s+/)
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/15 to-transparent" />

                    <div className="layer-front absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xl leading-tight font-semibold tracking-tight text-white">
                        {member.name}
                      </p>
                      <p className="mt-0.5 font-mono text-[11px] tracking-[0.12em] text-neutral-300 uppercase">
                        {member.position}
                      </p>
                      {member.socials.length > 0 && (
                        <SocialLinks
                          socials={member.socials}
                          name={member.name}
                          size="md"
                          className="mt-3"
                        />
                      )}
                    </div>
                  </div>
                </article>
              </Tilt3D>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
