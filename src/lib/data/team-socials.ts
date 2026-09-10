/**
 * Hand-entered social links for the council roster.
 *
 * ── WHY THIS FILE EXISTS ────────────────────────────────────────────
 * `site-content.ts` stores socials as an escaped JSON string, because that
 * is the shape the council dashboard writes. It is unpleasant to edit by
 * hand and easy to corrupt — one missing backslash breaks a row.
 *
 * So links typed by hand live here instead, in a format a human can read,
 * and `content.ts` merges them in when it builds each member. Nothing in
 * `site-content.ts` has to be touched.
 *
 * ── HOW TO ADD SOMEONE'S LINKS ──────────────────────────────────────
 * Find the person by the name in the comment above their line, and type
 * the URL between the quotes. That is the whole job:
 *
 *     "tm_gb7GcZcTVgK8": { instagram: "https://instagram.com/their_handle" },
 *
 * Rules:
 *   • Leave a slot as "" (or delete the line) and that icon simply does
 *     not appear. Nobody needs all three.
 *   • A URL must start with `https://`, `http://` or `mailto:`. Anything
 *     else is ignored on purpose — that check is what stops a pasted
 *     `javascript:` URL turning into a security hole.
 *   • Paste the full URL, including `https://`. `instagram.com/x` on its
 *     own will not work.
 *   • Icons always render in the order listed below, whatever order you
 *     type them in.
 *   • Do not edit the `"tm_..."` keys — those match the roster.
 *
 * Available slots: instagram, linkedin, github, twitter, email, link.
 * `email` takes a `mailto:` URL; `link` is for a personal site or portfolio.
 *
 * ── WHEN THE DASHBOARD COMES BACK (December) ────────────────────────
 * The dashboard will own this data again. At that point: copy anything
 * entered here into the dashboard, delete this file, and drop the
 * `overlaySocials(...) ??` call in `content.ts`. Nothing else refers to it.
 */

export interface TeamSocialEntry {
  instagram?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  email?: string;
  link?: string;
}

/**
 * Keyed by the member's `id` in `site-content.ts`. An id that is not listed
 * here, or an entry whose slots are all blank, falls back to whatever is
 * stored on the row — so the councils that already have links are untouched.
 */
export const TEAM_SOCIALS: Record<string, TeamSocialEntry> = {
  /* ═══════════════════ 2026-2027 ═══════════════════ */

  /* ── Core Team ─────────────────────────────────── */
  // Shounak Dutta — Chairperson
  "tm_FLceRZ6UGSJG": { instagram: "", linkedin: "https://www.linkedin.com/in/shounak-d-3b500b214/", github: "https://github.com/sudoDreamer" },
  // Aarohi Paranjape — Vice Chairperson
  "tm_PON2bIa6d-c2": { instagram: "", linkedin: "https://www.linkedin.com/in/aarohi-paranjape/", github: "https://github.com/Aarohi17" },
  // Arham Jain — Treasurer And Secretary
  "tm_vGt7n3XzAc0V": { instagram: "", linkedin: "", github: "" },

  /* ── Operations ────────────────────────────────── */
  // Aditya — Head
  "tm_gb7GcZcTVgK8": { instagram: "", linkedin: "https://www.linkedin.com/in/aditya-jhaaj", github: "https://github.com/Adityaj45" },
  // Munal — Member
  "tm_-lpsxpK7AQ9g": { instagram: "", linkedin: "https://www.linkedin.com/in/mrunal-deshpande-2065993b2", github: "" },
  // Aarush — Member
  "tm_O13dzPXQG3cg": { instagram: "", linkedin: "https://www.linkedin.com/in/aarush-verma-3537b5382", github: "https://github.com/AarushVerma07" },
  // Tanisha — Member
  "tm_ohqKRr7LKkad": { instagram: "", linkedin: "https://www.linkedin.com/in/tanisha-wani-921a10385/", github: "" },

  /* ── Web & Tech ────────────────────────────────── */
  // Richa — Head
  "tm_Wgc0PEPteWgY": { instagram: "", linkedin: "https://www.linkedin.com/in/richa-handa-994497349/", github: "" },
  // Aarya — Member
  "tm_wuR9HD4rANvT": { instagram: "", linkedin: "https://www.linkedin.com/in/aarya-p-0260b8178", github: "https://github.com/AaryaP2025" },
  // Jaskaran — Member
  "tm_H8X76iGysE4I": { instagram: "", linkedin: "https://www.linkedin.com/in/jaskaran-singh-sethi-0425b5411/", github: "https://github.com/Jassi-codes" },
  // Risheek — Member
  "tm_N8h_yAWKyHMa": { instagram: "", linkedin: "https://www.linkedin.com/in/risheek-b-7544ag/", github: "https://github.com/rishrek" },
  // Rishim — Member
  "tm_eufyiHYMYBEJ": { instagram: "", linkedin: "", github: "https://github.com/Rishim-Sharma" },

  /* ── PR & Marketing ────────────────────────────── */
  // Rugveda — Head
  "tm_YXzFk9vaGAju": { instagram: "", linkedin: "https://www.linkedin.com/in/rugveda-belekar-711bb0320/", github: "" },
  // Digvijay — Member
  "tm_dmNjzc-Zgozm": { instagram: "", linkedin: "https://linkedin.com/in/digvijaydhamane", github: "https://github.com/digvijayd-art" },
  // Shriya — Member
  "tm_LKUz_zfyUhkG": { instagram: "", linkedin: "https://www.linkedin.com/in/shriya-patel-70a5a1411", github: "" },
  // Tanishka — Member
  "tm_5OMSYwiUrI_K": { instagram: "", linkedin: "https://www.linkedin.com/in/tanishka-kakde-674175300", github: "https://github.com/tanishkakakde-gif" },

  /* ── Creative ──────────────────────────────────── */
  // Molaika — Head
  "tm_6nxOdiYGI5Jq": { instagram: "", linkedin: "https://www.linkedin.com/in/molaika-dhiraj/", github: "https://github.com/Molaika18" },
  // Aayush — Member
  "tm_uK4SXibN7w_9": { instagram: "", linkedin: "https://www.linkedin.com/in/aayush-shendarkar", github: "" },
  // Sahil — Member
  "tm_E6cIBP-PH_tl": { instagram: "", linkedin: "https://www.linkedin.com/in/sahil-bhere-58b170364", github: "https://github.com/bsahil-09" },
  // Shloka — Member
  "tm_6pjrmBcRaWZ9": { instagram: "", linkedin: "https://www.linkedin.com/in/shloka-naik-153b06354/", github: "" },
};
