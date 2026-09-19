// Display formatting shared by archives, previews and detail pages so every
// surface renders the same en-US editorial dates (the content dates themselves
// stay in frontmatter; see src/lib/content.ts for ordering rules).
// `undefined` renders as an empty string — call sites already guard or gate on it.

/** Short day, e.g. `Jan 15, 2026` — list rows and previews. */
export function formatDay(date: Date | undefined): string {
  return date?.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) ?? '';
}

/** Month precision, e.g. `January 2026` — credentials and paper records. */
export function formatMonthYear(date: Date | undefined): string {
  return date?.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) ?? '';
}

/** Year only, e.g. `2026`. */
export function formatYear(date: Date | undefined): string {
  return date == null ? '' : String(date.getFullYear());
}
