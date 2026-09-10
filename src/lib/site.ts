/**
 * Static chapter constants shared by server and client components.
 * Content that the council edits lives in the database instead — this file
 * holds only the things that change once a decade.
 */

export const SITE = {
  name: "ISTE KJSSE",
  longName: "ISTE KJSSE Students' Chapter",
  tagline: "Serving Technology Better",
  chapterCode: "MH 60",
  established: "2000 - 2001",
  description: "Indian Society for Technical Education - KJSSE Chapter",
  institute: "K. J. Somaiya School of Engineering",
  address: ["K. J. Somaiya School of Engineering,", "Vidyavihar, Mumbai"],
  email: "iste.engg@somaiya.edu",
  footerBlurb:
    "Empowering engineering students through technical excellence, innovation, and leadership at K. J. Somaiya School of Engineering.",
} as const;

/**
 * Navigation.
 *
 * Some entries are in-page anchors, some are real routes. Both are written as
 * absolute hrefs (`/#about`, `/teams`) so a single list works from every page —
 * a bare `#about` would scroll nowhere when the reader is on `/gallery`.
 *
 * `section` is the element id used for scroll-spy on the homepage; route links
 * have none and are highlighted by pathname instead.
 */
export const NAV_LINKS = [
  { href: "/#home", label: "Home", section: "home" },
  { href: "/#about", label: "About Us", section: "about" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/teams", label: "Team" },
  { href: "/#contact", label: "Contact Us", section: "contact" },
] as const;

export const FOOTER_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/teams", label: "The Council" },
  { href: "/#contact", label: "Contact" },
] as const;

export const CONTACTS = [
  { name: "Tanish Shetty", role: "Chairperson", phone: "+91 77000 48974" },
  { name: "Aditi Kanagala", role: "Vice Chairperson", phone: "+91 98204 93896" },
  { name: "Manav Parekh", role: "Treasurer & Secretary", phone: "+91 99876 46965" },
] as const;

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/iste_kjsse/", handle: "@iste_kjsse" },
  { label: "Facebook", href: "https://www.facebook.com/istekjsce/", handle: "ISTE KJSSE" },
  { label: "Email", href: `mailto:${SITE.email}`, handle: SITE.email },
] as const;

/** The "Who We Are" copy, kept as segments so the reveal animation can stagger it. */
export const ABOUT_COPY = [
  { text: "The ", emphasis: false },
  { text: "Indian Society for Technical Education (ISTE)", emphasis: true },
  {
    text: " is the leading National Professional non-profit making Society for the Technical Education System in our country with the motto of ",
    emphasis: false,
  },
  { text: "Career Development of Teachers and Personality Development of Students", emphasis: true },
  { text: " and overall development of our Technical Education System. The ", emphasis: false },
  { text: "ISTE KJSSE Students' Chapter (MH 60)", emphasis: true },
  { text: " was established in the year ", emphasis: false },
  { text: "2000 - 2001", emphasis: true },
  {
    text: ". One of the major object of ISTE is to assist and to contribute the production and development of ",
    emphasis: false,
  },
  { text: "top quality professional engineers and technicians", emphasis: true },
  { text: " needed by the industries and other organizations.", emphasis: false },
] as const;

export const ABOUT_STATS = [
  { value: "25+", label: "Years Active", detail: `Chartered ${SITE.established}` },
  { value: "MH 60", label: "Chapter Code", detail: "Maharashtra section" },
  { value: "20+", label: "Council Members", detail: "Across five departments" },
  { value: "5", label: "Departments", detail: "Core, Ops, Web & Tech, PR, Creative" },
] as const;

/**
 * Department display order, across every year the chapter has existed.
 *
 * The council has reorganised repeatedly: "Web" and "Tech" were separate teams
 * until 2022, "PR & Marketing" later became "PR", and "Literary" and "Events"
 * no longer exist at all. A single hard-coded list would therefore render some
 * years in a nonsensical order, so this ranks every name that has ever
 * appeared. Anything unrecognised — a department a future council invents —
 * falls to the end rather than breaking the layout.
 */
export const DEPARTMENT_RANK: Record<string, number> = {
  "Core Team": 0,
  Core: 0,
  Operations: 1,
  Events: 1,
  "Web & Tech": 2,
  Web: 2,
  Tech: 3,
  PR: 4,
  "PR & Marketing": 4,
  "Social Media": 5,
  Creative: 6,
  Literary: 7,
};

export function departmentRank(name: string): number {
  return DEPARTMENT_RANK[name] ?? 50;
}

/** Departments offered in the dashboard when adding a member to the current year. */
export const DEPARTMENT_ORDER = [
  "Core Team",
  "Operations",
  "Web & Tech",
  "PR",
  "Creative",
] as const;

export type Department = (typeof DEPARTMENT_ORDER)[number];

/**
 * Rank of a position within its department — heads and officers above members.
 *
 * Without this a member added mid-year lands wherever `sort_order` happened to
 * put them, which is how a department ends up rendering with its head buried in
 * the middle. Used to place a newly created member, to seed the initial order,
 * and by the dashboard's "sort by role" action.
 *
 * Matched by pattern rather than an exact list because the chapter's titles
 * drift — "Treasurer", "Treasurer And Secretary", "Secretary & Treasurer" have
 * all been used, and every one of them should rank the same.
 */
export function positionRank(position: string): number {
  const p = position.toLowerCase();
  if (/vice\s*chair/.test(p)) return 1;
  if (/chair/.test(p)) return 0;
  if (/treasurer|secretary/.test(p)) return 2;
  if (/head|lead/.test(p)) return 3;
  return 9;
}
