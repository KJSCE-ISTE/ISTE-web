import type { EventRow, GalleryRow, TeamRow } from "@/lib/data/rows";
import {
  DEPARTMENT_ORDER_ROWS,
  EVENT_ROWS,
  GALLERY_ROWS,
  SETTINGS,
  TEAM_ROWS,
} from "@/lib/data/site-content";
import { TEAM_SOCIALS } from "@/lib/data/team-socials";
import { departmentRank } from "@/lib/site";

/**
 * Read layer for public site content.
 *
 * This used to query SQLite, written by the council dashboard. Both are gone;
 * the content is now a static module and this file reads from arrays instead.
 *
 * The exported functions are deliberately unchanged — same names, same return
 * shapes, same ordering and fallback rules — so not one of the site components
 * had to be touched when the store was swapped. Every array is already sorted
 * by the generator in the order the old SQL asked for.
 */

/* ── Events ────────────────────────────────────────────────────────── */

export interface PublicEvent {
  id: string;
  slug: string;
  title: string;
  term: string;
  date: string;
  dateLabel: string;
  summary: string;
  details: string | null;
  image: string | null;
}

function toPublicEvent(row: EventRow): PublicEvent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    term: row.term,
    date: row.event_date,
    dateLabel: formatDate(row.event_date),
    summary: row.summary,
    details: row.details,
    image: row.image_url,
  };
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function getEvents(limit?: number): PublicEvent[] {
  const rows = [...EVENT_ROWS].sort(
    (a, b) => a.sort_order - b.sort_order || b.event_date.localeCompare(a.event_date),
  );
  return (limit ? rows.slice(0, limit) : rows).map(toPublicEvent);
}

export function getEventBySlug(slug: string): PublicEvent | null {
  const row = EVENT_ROWS.find((e) => e.slug === slug);
  return row ? toPublicEvent(row) : null;
}

/** Events bucketed by academic term, newest term first. */
export function getEventsByTerm(): Array<{ term: string; events: PublicEvent[] }> {
  const grouped = new Map<string, PublicEvent[]>();
  for (const event of getEvents()) {
    const bucket = grouped.get(event.term) ?? [];
    bucket.push(event);
    grouped.set(event.term, bucket);
  }
  return [...grouped.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([term, events]) => ({ term, events }));
}

/* ── Team ──────────────────────────────────────────────────────────── */

export type SocialKind = "instagram" | "linkedin" | "github" | "twitter" | "email" | "link";

export interface PublicSocial {
  kind: SocialKind;
  url: string;
}

export interface PublicTeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  term: string;
  image: string | null;
  socials: PublicSocial[];
  phone: string | null;
}

const SOCIAL_KINDS: SocialKind[] = ["instagram", "linkedin", "github", "twitter", "email", "link"];

/**
 * The only schemes that may ever reach an `href`. Shared by both resolvers
 * below so a link typed by hand goes through exactly the same gate as one
 * written by the dashboard — a `javascript:` URL is a stored-XSS trigger, and
 * two copies of this rule is how one of them silently drifts.
 */
const SAFE_URL = /^(https?:|mailto:)/i;

/**
 * Socials are stored as a JSON string. Parsed defensively: a malformed value —
 * hand-edited in the database, or written by an older schema — must degrade to
 * "no links" rather than throwing inside a server component and 500-ing the
 * whole page for one bad row.
 */
function parseSocials(raw: string | null): PublicSocial[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry): PublicSocial[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { kind, url } = entry as { kind?: unknown; url?: unknown };
      if (typeof url !== "string" || !url) return [];
      // Only http(s) and mailto ever reach an href — no javascript: URLs.
      if (!SAFE_URL.test(url)) return [];
      const safeKind = SOCIAL_KINDS.includes(kind as SocialKind) ? (kind as SocialKind) : "link";
      return [{ kind: safeKind, url }];
    });
  } catch {
    return [];
  }
}

/**
 * Links typed by hand into `team-socials.ts`, which is readable in a way the
 * escaped JSON string on the row is not.
 *
 * Returns `null` — not `[]` — when there is nothing usable, so the caller can
 * tell "no override" apart from "an override that clears the links". That
 * distinction is what keeps the 55 members who already have stored links
 * untouched by a stray blank entry.
 *
 * Emitted in `SOCIAL_KINDS` order rather than object-key order, so icons line
 * up down the page however the file was typed.
 */
function overlaySocials(id: string): PublicSocial[] | null {
  const entry = TEAM_SOCIALS[id];
  if (!entry) return null;

  const links = SOCIAL_KINDS.flatMap((kind): PublicSocial[] => {
    const url = entry[kind]?.trim();
    // Blank slots are the normal state of this file, not an error: it ships
    // pre-filled with every member and gets completed over time.
    if (!url || !SAFE_URL.test(url)) return [];
    return [{ kind, url }];
  });

  return links.length > 0 ? links : null;
}

function toPublicMember(row: TeamRow): PublicTeamMember {
  return {
    id: row.id,
    name: row.name,
    position: row.position,
    department: row.department,
    term: row.term,
    image: row.image_url,
    socials: overlaySocials(row.id) ?? parseSocials(row.socials),
    phone: row.phone,
  };
}

export function getCurrentTerm(): string {
  return SETTINGS.current_term ?? "2025-2026";
}

/**
 * Published roster for a term.
 *
 * Falls back to the most recent term that actually has published members when
 * the requested one is empty.
 *
 * This is not defensive padding — it is the difference between the site working
 * and not. A handover flips `current_term` to the incoming council's year, and
 * that year has no roster until the new chair runs "Start a new year" and
 * publishes each entry. Without this fallback the public Team section renders a
 * heading and then nothing, from the moment of handover until someone gets
 * round to the dashboard. Showing last year's council in the meantime is
 * obviously right; showing an empty page is not.
 */
export function getTeam(term?: string): PublicTeamMember[] {
  const requested = term ?? getCurrentTerm();

  const forTerm = (t: string): TeamRow[] =>
    TEAM_ROWS.filter((m) => m.term === t).sort(
      (a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name),
    );

  const rows = forTerm(requested);
  if (rows.length > 0) return rows.map(toPublicMember);

  // An explicit request for a specific term is answered honestly — the caller
  // asked for that year. Only the implicit "current" lookup falls back.
  if (term) return [];

  const newestPopulated = [...new Set(TEAM_ROWS.map((m) => m.term))].sort((a, b) =>
    b.localeCompare(a),
  )[0];

  if (!newestPopulated || newestPopulated === requested) return [];
  return forTerm(newestPopulated).map(toPublicMember);
}

/**
 * The term the roster on screen actually belongs to, which is not always
 * `current_term` — see the fallback above. The Team heading uses this so it
 * never labels last year's council with next year's dates.
 */
export function getDisplayedTeamTerm(): string {
  const roster = getTeam();
  return roster[0]?.term ?? getCurrentTerm();
}

/**
 * A term's department order, as arranged in the dashboard.
 *
 * Empty when the council has never reordered that year — callers fall back to
 * the built-in ranking, which covers every department name the chapter has
 * historically used.
 */
export function getDepartmentOrder(term: string): string[] {
  return DEPARTMENT_ORDER_ROWS.filter((d) => d.term === term)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((d) => d.name);
}

/**
 * Sort comparator for a term's departments.
 *
 * A custom order always wins; anything the council has not explicitly placed
 * (a department added after the last reorder) falls in behind, ranked by the
 * built-in map so it still lands somewhere sensible rather than at random.
 */
export function departmentSorter(term: string): (a: string, b: string) => number {
  const custom = getDepartmentOrder(term);
  if (custom.length === 0) return (a, b) => departmentRank(a) - departmentRank(b);

  const index = new Map(custom.map((name, i) => [name, i]));
  return (a, b) => {
    const ai = index.get(a);
    const bi = index.get(b);
    if (ai !== undefined && bi !== undefined) return ai - bi;
    if (ai !== undefined) return -1;
    if (bi !== undefined) return 1;
    return departmentRank(a) - departmentRank(b);
  };
}

/** Team grouped by department, in the order the chapter presents them. */
export function getTeamByDepartment(
  term?: string,
): Array<{ department: string; members: PublicTeamMember[] }> {
  const activeTerm = term ?? getCurrentTerm();
  const grouped = new Map<string, PublicTeamMember[]>();

  for (const member of getTeam(term)) {
    const bucket = grouped.get(member.department) ?? [];
    bucket.push(member);
    grouped.set(member.department, bucket);
  }

  const sorter = departmentSorter(activeTerm);
  return [...grouped.entries()]
    .sort((a, b) => sorter(a[0], b[0]))
    .map(([department, members]) => ({ department, members }));
}

/** Every term that has a published roster, newest first. */
export function getTerms(): string[] {
  return [...new Set(TEAM_ROWS.map((m) => m.term))].sort((a, b) => b.localeCompare(a));
}

/** Headcount per term — drives the year switcher's counts. */
export function getTermSummaries(): Array<{ term: string; count: number }> {
  const counts = new Map<string, number>();
  for (const m of TEAM_ROWS) counts.set(m.term, (counts.get(m.term) ?? 0) + 1);
  return [...counts.entries()]
    .map(([term, count]) => ({ term, count }))
    .sort((a, b) => b.term.localeCompare(a.term));
}

/* ── Gallery ───────────────────────────────────────────────────────── */

export interface PublicGalleryItem {
  id: string;
  caption: string | null;
  image: string;
  /** Academic year, when known — drives the gallery's year filter. */
  term: string | null;
  width: number | null;
  height: number | null;
}

export function getGallery(limit?: number): PublicGalleryItem[] {
  const rows: GalleryRow[] = [...GALLERY_ROWS].sort(
    (a, b) => a.sort_order - b.sort_order || b.created_at - a.created_at,
  );
  const limited = limit ? rows.slice(0, limit) : rows;

  return limited.map((row) => ({
    id: row.id,
    caption: row.caption,
    image: row.image_url,
    term: row.term,
    width: row.width,
    height: row.height,
  }));
}

/**
 * Who the public Contact section lists.
 *
 * Derived from the live council's core officers rather than a static list, so
 * publishing a new council updates this too — a hardcoded list goes stale
 * silently the moment a term rolls over, which is exactly what it did here
 * until this existed.
 *
 * Officers are listed whether or not they have a number on file. Dropping the
 * ones without would mean a freshly published council shows an empty contact
 * block; showing the names with no number is honest and still tells a visitor
 * who to ask for. The number is filled in from the dashboard.
 */
export function getCouncilContacts(): Array<{
  name: string;
  role: string;
  phone: string | null;
}> {
  return getTeam(getDisplayedTeamTerm())
    .filter((m) => /^core/i.test(m.department))
    .slice(0, 4)
    .map((m) => ({ name: m.name, role: m.position, phone: m.phone }));
}
