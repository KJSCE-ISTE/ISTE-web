"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Reveal, Stagger, StaggerItem } from "@/components/fx/Reveal";
import Tilt3D from "@/components/fx/Tilt3D";
import SocialLinks from "@/components/site/SocialLinks";
import type { PublicTeamMember } from "@/lib/data/content";
import { departmentRank } from "@/lib/site";

/**
 * Year switcher + roster grids.
 *
 * Extracted so the full `/teams` page and any preview elsewhere render the
 * identical thing — two copies of this would drift the moment one of them got
 * a fix.
 *
 * Every year's roster is already in the payload, so switching is instant.
 * ~140 people is a few KB of JSON against a navigation per year.
 */

export interface TeamTerm {
  term: string;
  members: PublicTeamMember[];
  /**
   * Department order as arranged in the dashboard. Empty when the council has
   * never reordered that year, in which case the built-in ranking applies.
   */
  departmentOrder: string[];
}

export default function TeamRoster({
  terms,
  currentTerm,
}: {
  terms: TeamTerm[];
  currentTerm: string;
}) {
  const [active, setActive] = useState(
    () => terms.find((t) => t.term === currentTerm)?.term ?? terms[0]?.term ?? "",
  );

  /**
   * Memoised so the identity is stable — otherwise the `?? []` produces a new
   * array literal on every render, which invalidates the grouping memo below
   * every single time and makes it pointless.
   */
  const activeTerm = useMemo(
    () => terms.find((t) => t.term === active),
    [terms, active],
  );
  const roster = useMemo(() => activeTerm?.members ?? [], [activeTerm]);

  const groups = useMemo(() => {
    const map = new Map<string, PublicTeamMember[]>();
    for (const member of roster) {
      const bucket = map.get(member.department) ?? [];
      bucket.push(member);
      map.set(member.department, bucket);
    }

    // The council's own arrangement wins; anything they have not explicitly
    // placed falls in behind by the built-in ranking rather than at random.
    const custom = activeTerm?.departmentOrder ?? [];
    const index = new Map(custom.map((name, i) => [name, i]));
    const compare = (a: string, b: string) => {
      const ai = index.get(a);
      const bi = index.get(b);
      if (ai !== undefined && bi !== undefined) return ai - bi;
      if (ai !== undefined) return -1;
      if (bi !== undefined) return 1;
      return departmentRank(a) - departmentRank(b);
    };

    return [...map.entries()]
      .sort((a, b) => compare(a[0], b[0]))
      .map(([department, members]) => ({ department, members }));
  }, [roster, activeTerm]);

  const core = groups.find((g) => /^core/i.test(g.department));
  const departments = groups.filter((g) => !/^core/i.test(g.department));

  return (
    <>
      {/* ── Year switcher ───────────────────────────────────── */}
      <Reveal kind="up">
        <div
          role="tablist"
          aria-label="Council year"
          className="flex flex-wrap gap-2 border-t border-hairline pt-8"
        >
          {terms.map((entry) => {
            const selected = entry.term === active;
            return (
              <button
                key={entry.term}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setActive(entry.term)}
                data-cursor="link"
                className={`relative rounded-full px-5 py-2.5 font-mono text-[13px] tracking-wide transition-colors ${
                  selected ? "text-white" : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="term-pill"
                    className="absolute inset-0 rounded-full bg-fill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{entry.term}</span>
                <span className="relative z-10 ml-2 text-[10px] text-neutral-400">
                  {entry.members.length}
                </span>
                {entry.term === currentTerm && (
                  <span
                    className="relative z-10 ml-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle"
                    aria-label="current council"
                  />
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Keyed on the term so switching remounts and re-staggers. */}
      <div key={active}>
        {core && core.members.length > 0 && (
          <section aria-label={`Core team, ${active}`} className="mt-12">
            <DepartmentHeading label={core.department} />
            <Stagger gap={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {core.members.map((member) => (
                <StaggerItem key={member.id} kind="up">
                  <Tilt3D intensity={12} className="h-full rounded-3xl">
                    <MemberCard member={member} featured />
                  </Tilt3D>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}

        {departments.map((group) => {
          const heads = group.members.filter((m) =>
            /head|lead|co-head|chair/i.test(m.position.trim())
          );
          const headMembers = heads.length > 0 ? heads : [group.members[0]];
          const regularMembers = group.members.filter((m) => !headMembers.includes(m));

          return (
            <section
              key={group.department}
              aria-label={`${group.department}, ${active}`}
              className="mt-20"
            >
              <DepartmentHeading label={group.department} />
              
              {/* Single line: Team Head (big) + Members (slightly smaller) all in 1 line */}
              <Stagger
                gap={0.04}
                className="flex flex-nowrap items-center gap-3 sm:gap-4 md:gap-5 lg:gap-5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none w-full"
              >
                {/* Team Head(s) - Big image size */}
                {headMembers.map((head) => (
                  <StaggerItem
                    key={head.id}
                    kind="up"
                    className="flex-[1.25] min-w-[190px] max-w-[275px] shrink-0 lg:shrink"
                  >
                    <Tilt3D intensity={12} scale={1.02} className="h-full rounded-3xl">
                      <MemberCard member={head} featured />
                    </Tilt3D>
                  </StaggerItem>
                ))}

                {/* Subtle vertical divider between Head and Members */}
                {regularMembers.length > 0 && (
                  <div
                    className="hidden h-36 w-px bg-neutral-200/80 lg:block shrink-0 mx-1"
                    aria-hidden="true"
                  />
                )}

                {/* Team Members - Slightly smaller image size, all in 1 line */}
                {regularMembers.map((member) => (
                  <StaggerItem
                    key={member.id}
                    kind="up"
                    className="flex-1 min-w-[150px] max-w-[220px] shrink-0 lg:shrink"
                  >
                    <Tilt3D intensity={8} scale={1.03} className="h-full rounded-2xl">
                      <MemberCard member={member} featured={false} />
                    </Tilt3D>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          );
        })}

        {roster.length === 0 && (
          <p className="mt-16 rounded-2xl border border-dashed border-neutral-300 py-16 text-center text-neutral-500">
            No roster recorded for {active}.
          </p>
        )}
      </div>
    </>
  );
}

function DepartmentHeading({ label }: { label: string }) {
  return (
    <Reveal kind="left">
      <div className="mb-5 flex items-baseline gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900">{label}</h3>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>
    </Reveal>
  );
}

export function MemberCard({
  member,
  featured = false,
}: {
  member: PublicTeamMember;
  featured?: boolean;
}) {
  const initials = member.name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article
      className={`preserve-3d group relative h-full overflow-hidden border border-hairline bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl hover:shadow-neutral-900/10 ${
        featured ? "rounded-3xl" : "rounded-2xl"
      }`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes={
              featured
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            }
            /* object-top: these are portraits, and a centre crop cuts foreheads
               off on the taller source images. */
            className="object-cover object-top grayscale-[35%] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
            /* Only ever true for a URL the council pastes by hand into the
               dashboard. Archive images are local now, so they go through
               Next's optimizer; an arbitrary external host would 400 there
               because it is not in `remotePatterns`, so those bypass it. */
            unoptimized={member.image.startsWith("http")}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-3xl font-bold text-neutral-400">
            {initials}
          </div>
        )}

        {/* Permanent scrim — the old site revealed names only on hover, which
            made the roster unreadable at a glance and unusable on touch. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/15 to-transparent" />

        <div className="layer-front absolute inset-x-0 bottom-0 p-4">
          <p
            className={`leading-tight font-semibold tracking-tight text-white ${
              featured ? "text-xl" : "text-[15px] sm:text-base"
            }`}
          >
            {member.name}
          </p>
          <p
            className={`mt-0.5 font-mono tracking-[0.12em] text-neutral-300 uppercase ${
              featured ? "text-[11px]" : "text-[10px]"
            }`}
          >
            {member.position}
          </p>

          {member.socials.length > 0 && (
            <SocialLinks
              socials={member.socials}
              name={member.name}
              size={featured ? "md" : "sm"}
              className="mt-2.5"
            />
          )}
        </div>
      </div>
    </article>
  );
}
