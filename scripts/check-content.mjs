// Focused fixture checks for R04 (schemas + shared helpers).
// Synthetic entries only — kept outside production content globs and public/,
// never imported by the production build. Run: node scripts/check-content.mjs
// (Node >= 22 type-strips the ../src/lib/content.ts import; no other deps).
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  caps,
  contentDate,
  isPublic,
  isValidExternalUrl,
  resolveRelatedWriting,
  resolveWritingHref,
  selectFeatured,
  selectLocalPublic,
  selectPublicNonFeatured,
  sortSelected,
} from '../src/lib/content.ts';

const here = dirname(fileURLToPath(import.meta.url));
let failures = 0;
function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) {
    failures += 1;
    console.error(`FAIL ${name}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`);
  } else {
    console.log(`ok ${name}`);
  }
}
const ids = (entries) => entries.map((e) => e.id);

// --- Fixtures: every Lab status, draft/public, featured/non-featured ---
const D = (s) => new Date(s);
const projects = [
  { id: 'p-draft-no-status', data: { draft: true, title: 't', description: 'd', date: D('2026-01-01'), featured: true, sortOrder: 1 } },
  { id: 'p-idea', data: { draft: false, title: 't', description: 'd', date: D('2026-02-01'), updatedAt: D('2026-03-01'), status: 'idea', featured: true, sortOrder: 2 } },
  { id: 'p-exploring', data: { draft: false, title: 't', description: 'd', date: D('2026-01-15'), updatedAt: D('2026-03-02'), status: 'exploring', featured: true, sortOrder: 1 } },
  { id: 'p-prototype', data: { draft: false, title: 't', description: 'd', date: D('2026-03-01'), updatedAt: D('2026-03-03'), status: 'prototype', featured: false } },
  { id: 'p-released', data: { draft: false, title: 't', description: 'd', date: D('2025-12-01'), updatedAt: D('2026-03-04'), status: 'released', featured: false } },
];

// Draft never publishes, even when featured with a sortOrder.
check('draft project missing status is not public', isPublic(projects[0]), false);
check('public project is public', isPublic(projects[1]), true);

// sortOrder first, then content date desc, missing dates last, id tiebreak.
const ordered = sortSelected(projects, contentDate.project);
check('project order is sortOrder then date desc', ids(ordered), ['p-exploring', 'p-idea', 'p-prototype', 'p-released']);
check('lab featured cap', ids(selectFeatured(projects, contentDate.project, caps.lab)), ['p-exploring', 'p-idea']);
check('public non-featured fallback set', ids(selectPublicNonFeatured(projects, contentDate.project)), ['p-prototype', 'p-released']);

// --- Research: missing date, accepted+unpublished+preprint, missing links ---
const research = [
  { id: 'r-nodate', data: { draft: false, title: 't', authors: [{ name: 'A' }], venue: 'V', reviewStatus: 'accepted', publicationStatus: 'unpublished', preprintUrl: 'https://example.com/pre', summary: 's', featured: true } },
  { id: 'r-dated', data: { draft: false, title: 't', authors: [{ name: 'A' }], venue: 'V', reviewStatus: 'submitted', publicationStatus: 'unpublished', summary: 's', publishedAt: D('2026-06-01'), featured: true } },
  { id: 'r-event', data: { draft: false, title: 't', authors: [{ name: 'A' }], venue: 'V', reviewStatus: 'submitted', publicationStatus: 'unpublished', summary: 's', eventDate: D('2026-07-01'), featured: true } },
  { id: 'r-draft', data: { draft: true, title: 't', featured: true, sortOrder: 1 } },
];
check('research date falls back publishedAt then eventDate', ids(sortSelected(research, contentDate.research)), ['r-event', 'r-dated', 'r-nodate']);
check('research feature cap 1 picks newest dated first', ids(selectFeatured(research, contentDate.research, caps.research)), ['r-event']);
check('accepted+unpublished+preprint stays public', isPublic(research[0]), true);
check('research missing date contentDate is undefined', contentDate.research(research[0]), undefined);

// --- Writing: local/draft/external/date/invalid-url/related/prev-next/rss ---
const writing = [
  { id: 'w-local', data: { draft: false, kind: 'local', title: 't', description: 'd', date: D('2026-02-01'), tags: [], featured: true } },
  { id: 'w-local-draft', data: { draft: true, kind: 'local', title: 't', description: 'd', date: D('2026-03-01'), tags: [] } },
  { id: 'w-ext', data: { draft: false, kind: 'external', title: 't', description: 'd', date: D('2026-01-01'), externalUrl: 'https://example.com/a', publisher: 'P', author: 'A', relationship: 'authored', tags: [], featured: true } },
  { id: 'w-ext-nodate', data: { draft: false, kind: 'external', title: 't', description: 'd', externalUrl: 'https://example.com/b', publisher: 'P', author: 'A', relationship: 'recommended', tags: [], featured: true } },
  { id: 'w-ext-draft', data: { draft: true, kind: 'external', title: 't', description: 'd', externalUrl: 'https://example.com/c', publisher: 'P', author: 'A', relationship: 'authored', tags: [] } },
  { id: 'w-ext-bad', data: { draft: false, kind: 'external', title: 't', description: 'd', externalUrl: '#', publisher: 'P', author: 'A', relationship: 'authored', tags: [] } },
];
check('local href resolves internally', resolveWritingHref(writing[0]), '/blog/w-local');
check('external href resolves to source', resolveWritingHref(writing[2]), 'https://example.com/a');
check('invalid external URL resolves null', resolveWritingHref(writing[5]), null);
check('isValidExternalUrl rejects # and empty', [isValidExternalUrl('#'), isValidExternalUrl(''), isValidExternalUrl('/local.pdf')], [false, false, false]);
check('external without date sorts after dated entries', ids(sortSelected(writing, contentDate.blog)), ['w-local', 'w-ext', 'w-ext-bad', 'w-ext-nodate']);
check(
  'related rejects missing draft kind-incompatible',
  ids(resolveRelatedWriting(['w-local', 'w-local-draft', 'w-ext', 'nope'], writing)),
  ['w-local'],
);
// Prev/next + RSS source: local public only.
const localOnly = selectLocalPublic(writing);
check('prev-next pool is local-only', ids(localOnly), ['w-local']);
check('rss pool is local-only', ids(selectLocalPublic(sortSelected(writing, contentDate.blog))), ['w-local']);

// --- Achievements: year-only public records carry year, no date ---
const achievements = [
  { id: 'a-dated', data: { draft: false, title: 't', description: 'd', rank: 'r', event: 'e', date: D('2026-01-17'), featured: true, sortOrder: 1 } },
  { id: 'a-year-only', data: { draft: false, title: 't', description: 'd', rank: 'r', event: 'e', year: 2025, featured: true, sortOrder: 2 } },
];
check('achievement year-only record resolves Jan 1 and sorts public', [contentDate.achievement(achievements[1]), ids(sortSelected(achievements, contentDate.achievement))], [D('2025'), ['a-dated', 'a-year-only']]);

// --- Fixtures must not leak into production collections ---
const prodIds = new Set();
for (const coll of ['projects', 'research', 'blog', 'achievements', 'certificates']) {
  for (const f of readdirSync(join(here, '..', 'src', 'content', coll))) {
    prodIds.add(f.replace(/\.md$/, ''));
  }
}
const fixtureIds = [...projects, ...research, ...writing, ...achievements].map((e) => e.id);
check('no fixture id collides with production entries', fixtureIds.filter((id) => prodIds.has(id)), []);

if (failures > 0) {
  console.error(`\n${failures} fixture check(s) failed`);
  process.exit(1);
}
console.log('\nAll fixture checks passed; no production entries emitted from fixtures.');
