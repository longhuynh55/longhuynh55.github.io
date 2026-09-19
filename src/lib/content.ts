// Shared publication-state, sorting and link helpers — the ONLY rules used by
// homepage previews, archive pages, detail generation, prev/next, related links,
// RSS and sitemap-facing routes. See REDESIGN_PLAN.md §§4, 18.
// Runtime-clean (type-only astro imports) so fixture checks can run it under node.

import type { CollectionEntry } from 'astro:content';

export const caps = { lab: 2, awards: 3, credentials: 3, writing: 4, research: 1 } as const;

interface Draftable {
  data: { draft?: boolean };
}

/** Draft never schedules: only `draft === false` is public. Dates never publish. */
export function isPublic(entry: Draftable): boolean {
  return entry.data.draft === false;
}

/**
 * Public-first ordering shared by every collection:
 * `sortOrder` ascending (missing = 999), then known content date descending,
 * missing dates last, then entry id ascending. `updatedAt` is never a rank input.
 */
export function sortSelected<T extends { id: string; data: { sortOrder?: number } }>(
  entries: T[],
  dateSelector: (entry: T) => Date | undefined,
): T[] {
  return [...entries].filter(isPublic).sort((a, b) => {
    const order = (a.data.sortOrder ?? 999) - (b.data.sortOrder ?? 999);
    if (order !== 0) return order;
    const da = dateSelector(a)?.valueOf();
    const db = dateSelector(b)?.valueOf();
    if (da == null && db == null) return a.id.localeCompare(b.id);
    if (da == null) return 1;
    if (db == null) return -1;
    if (db !== da) return db - da;
    return a.id.localeCompare(b.id);
  });
}

/** Featured public preview capped per section (missing count renders as-is, never filler). */
export function selectFeatured<T extends { id: string; data: { sortOrder?: number; featured?: boolean } }>(
  entries: T[],
  dateSelector: (entry: T) => Date | undefined,
  cap: number,
): T[] {
  return sortSelected(entries, dateSelector)
    .filter((e) => e.data.featured === true)
    .slice(0, cap);
}

/** Public but not featured — used for CTA/archive fallbacks, never for previews. */
export function selectPublicNonFeatured<
  T extends { id: string; data: { sortOrder?: number; featured?: boolean } },
>(entries: T[], dateSelector: (entry: T) => Date | undefined): T[] {
  return sortSelected(entries, dateSelector).filter((e) => e.data.featured !== true);
}

/** Only http/https are valid external destinations. No `#`/empty placeholders. */
export function isValidExternalUrl(url: unknown): url is string {
  if (typeof url !== 'string' || url.length === 0) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

type WritingEntry = CollectionEntry<'blog'>;

/**
 * Local entries resolve to `/blog/<id>`; external entries resolve to their
 * validated `externalUrl`, or `null` when the URL is missing/invalid.
 */
export function resolveWritingHref(entry: WritingEntry): string | null {
  const data = entry.data;
  if (data.kind === 'external') {
    return isValidExternalUrl(data.externalUrl) ? data.externalUrl : null;
  }
  return `/blog/${entry.id}`;
}

/** Local public posts only — external entries never get detail routes or prev/next. */
export function selectLocalPublic(entries: WritingEntry[]): WritingEntry[] {
  return entries.filter((e) => isPublic(e) && e.data.kind === 'local');
}

/**
 * Related-entry resolution: rejects missing ids, drafts and kind-incompatible
 * (non-local) entries rather than rendering broken links.
 */
export function resolveRelatedWriting(ids: string[] | undefined, pool: WritingEntry[]): WritingEntry[] {
  if (!ids || ids.length === 0) return [];
  const byId = new Map(pool.map((e) => [e.id, e]));
  return ids.flatMap((id) => {
    const entry = byId.get(id);
    if (!entry || !isPublic(entry) || entry.data.kind !== 'local') return [];
    return [entry];
  });
}

/** Content dates per collection (never `updatedAt`, never build/bookmark time). */
export const contentDate = {
  project: (e: CollectionEntry<'projects'>): Date | undefined => e.data.date,
  achievement: (e: CollectionEntry<'achievements'>): Date | undefined =>
    e.data.date ?? (e.data.year != null ? new Date(String(e.data.year)) : undefined),
  certificate: (e: CollectionEntry<'certificates'>): Date | undefined => e.data.date,
  blog: (e: WritingEntry): Date | undefined =>
    e.data.kind === 'local' ? e.data.date : (e.data.date ?? undefined),
  research: (e: CollectionEntry<'research'>): Date | undefined =>
    e.data.publishedAt ?? e.data.eventDate ?? undefined,
};

interface ReadingTimeInput {
  body?: string;
}

/**
 * Reading time from the actual Markdown body (~220 wpm), rounded to minutes.
 * Local posts only — external entries show their source metadata instead.
 */
export function readingMinutes(entry: ReadingTimeInput): number {
  const words = (entry.body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
