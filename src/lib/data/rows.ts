/**
 * Row shapes for the chapter's content.
 *
 * These were the SQLite table shapes. The database and the council dashboard
 * that wrote to it are gone; the rows now live in `site-content.ts` and are
 * edited by hand. The field names are kept as they were so the read layer in
 * `content.ts` did not have to change.
 */

export interface EventRow {
  id: string;
  slug: string;
  title: string;
  term: string;
  event_date: string;
  summary: string;
  details: string | null;
  image_url: string | null;
  published: number;
  sort_order: number;
  created_at: number;
  updated_at: number;
  updated_by: string | null;
}

export interface TeamRow {
  id: string;
  name: string;
  position: string;
  department: string;
  term: string;
  image_url: string | null;
  socials: string | null;
  phone: string | null;
  published: number;
  sort_order: number;
  created_at: number;
  updated_at: number;
  updated_by: string | null;
}

export interface GalleryRow {
  id: string;
  caption: string | null;
  image_url: string;
  term: string | null;
  width: number | null;
  height: number | null;
  published: number;
  sort_order: number;
  created_at: number;
  updated_at: number;
  updated_by: string | null;
}
