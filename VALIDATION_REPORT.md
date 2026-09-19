# Validation report — Data & Research Editorial (local implementation)

Date: 2026-09-06. Scope: local implementation only — NOT a release sign-off.
Spec: `DESIGN.md`; plan: `REDESIGN_PLAN.md` (rubric §16); inventory: `CONTENT_INVENTORY.md`.
Updated: 2026-09-06 — includes the Tier-1 refinement pass (signature diagram grammar,
experience evidence links, writing topic/reading-time meta; see "Tier-1 refinement" below).
Updated again 2026-09-11 — cleanup & performance pass (see that section for current numbers).

Updated once more 2026-09-11 — layout & UX pass (reference-surveyed; see that section).

## Environment

- Windows 11, Node v22.17.1, `pnpm run build` / `pnpm run preview --port 4321` (Astro 5.18).
- Headless Chromium via harness browser (`?perf=` cache-busters for lab runs).
- Baseline: `D:/Portfolio.backup-20260906/` intact; build went 7 pages → 5 (2 draft project
  details correctly gone) → 6 (+`/research`).

## Build & content-state proofs

- `node --experimental-strip-types scripts/check-content.mjs`: **18/18 pass** — draft exclusion,
  every Lab status, sortOrder→date→id ordering, research publishedAt→eventDate fallback,
  accepted+unpublished+preprint, invalid-URL rejection, dateless-external-last sorting,
  related-entry rejection (draft/missing/kind-incompatible), local-only prev/next + RSS,
  no fixture/production id overlap.
- `pnpm run build`: green. `dist/` holds `/`, `/blog`, `/certificates`, `/projects`, `/research`,
  `/404.html`, `/rss.xml`, sitemap (exactly the 5 public routes), assets. Zero detail routes for
  drafts; no local page for external Writing; no paper duplication in `/certificates`;
  no `/research` nav/link rendered while research is non-public.
- Homepage conditionals (current public subset: 1 award, 2 credentials, 0 Lab / 0 Research / 0 Writing):
  Lab + `#work` hidden with no empty anchors, hero CTA → `#experience` ("See my experience");
  Research feature + nav hidden; Writing hidden; order of rendered sections is
  Experience → Achievements → Certifications → About & Contact.
- Positive branches proven with clearly-marked `__verify` temp entries (public released Lab +
  local/external posts + accepted/unpublished research with preprint), then **deleted**:
  `#lab`/`#work` + "Explore my work" CTA, `#research`/`#publication` + nav → `/#research`,
  lead+list Writing with direct HTTPS external card, field-composed citation + copy control,
  Lab detail (status/updatedAt/hypothesis/next/evidence/capped tags/related-local-only),
  RSS 1 item (local only). Post-removal rebuild: 6 pages, `grep __verify` clean in `src/` and `dist/`.

## Browser matrix (all scrolled through every section before capture)

| Route | 1440 | 768 | 390 | 320 | Overflow | h1 count |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | light + dark | light | light + dark | 0 | 0 everywhere | 1 |
| `/research` | light | light | light | — | 0 | 1 |
| `/projects` | light | light | light | — | 0 | 1 |
| `/blog` | light | light | light | — | 0 | 1 |
| `/certificates` | light | light | light | 0 | 0 (after fix) | 1 |
| `/404` | light | light | light | — | 0 | 1 |

Plus: 200%-zoom equivalent (720 CSS px @2x) overflow 0; Vietnamese diacritics unclipped
(name at 112px desktop, wrapping naturally); long paper title rendered in temp detail without clipping.

## Interaction & resilience

- Mobile disclosure: opens on click (`aria-expanded=true`), panel links focusable, link click
  closes, **Escape closes and returns focus to Menu**; 4 links reachable without JS (native `<details>`).
- Skip link first in tab order (keyboard Tab reaches it, then site name).
- Theme: persists via guarded localStorage, survives reload, `theme-color` follows the toggle in
  both directions across repeated toggles (bug found + fixed, see below); light bg `#F7F5EF` verified.
- Focus rings: light `#285640`, dark ink `#C9E875` (2px, offset on ink surfaces).
- Copy email: "Copied" confirmation via live region (clipboard writable headless).
- Reduced motion: every `.reveal` computes to opacity 1 / no transform. No-JS approximation
  (`.js` class removed): zero hidden reveals, nav links reachable.

## Contrast (computed token pairs, not a substitute for in-context QA)

Text pairs 5.6–16.0:1 (AA ≥4.5 ✓); focus-on-ink on research band 9.0–11.0:1 (≥3:1 ✓);
lime-vs-canvas 1.26:1 confirms lime carries no information alone (decorative only, by design).

## Lab performance (localhost headless, Moto-G-class 390px viewport, n=3, median)

LCP **308ms** (runs 296/308/328), CLS **0.0023** — inside LCP ≤2.5s / CLS ≤0.1 targets.
Lighthouse performance/accessibility scores NOT measured (no Lighthouse in this environment);
field INP unavailable (no field data). These are lab observations, not release certification.

## Asset & privacy proofs

- `dist/` + production sources contain no `TODO`/`Placeholder`/lorem/fixture markers and no
  CASK identifiers beyond the owner-provided role/dates/contributions; `VERIFY` notes exist only
  in draft frontmatter, never rendered. Draft award images are optimized into `dist/_astro` but
  unlinked from every page (verified); they render only if their records go public.
- Rasters ≤140KB; `og-image.png` is a true 1200×630 (45KB, margins + diacritics verified);
  icon family retained. Homepage ships zero raster images (inline concept SVG, eager by nature);
  archive scans are width-capped and lazy.

## Failures found during validation (all fixed, rebuild verified)

1. Certificates archive overflowed 89px @768 / 455px @390 — archive image lost its max-width in
   the achievement-CSS cut. Restored as `.achievement-cert` (max-width 100%); now 0 at 768/390/320.
2. `theme-color` followed the first toggle but stuck afterwards (media-attribute selector went
   stale after reassignment). Now selected by stable `data-theme`; verified dark→light→dark.
3. `outcome` field silently dropped by a schema edit (zod strips unknown keys; build stayed green).
   Restored + added `relatedWritingIds`; deprecated `kicker`/`category`/`metrics` removed from
   schema, entries and CSS together with `ProjectCard`/`spotlight`.
4. Blog template `featured` landed outside frontmatter during migration; moved back (build + fixtures green).

## Rubric (§16, internal, screenshot-backed)

| Criterion (weight) | Score | Observation |
| --- | --- | --- |
| Identity 20% | 5 | 112px name anchor, practice-motif SVG, matching OG card |
| Hierarchy 20% | 5 | Locked order in DOM + captures; band/feature/compact/list treatments differ per section |
| Typography/spacing 15% | 4 | Fluid scales, intact diacritics, 65–72ch measures; no serif accent (allowed, unneeded) |
| Imagery/evidence 20% | 4 | Captioned concept diagrams, zero fabricated screenshots; Lab/paper graphics pending real records |
| Mobile/keyboard 15% | 5 | 0 overflow 1440→320 + zoom; disclosure/skip/focus/copy all exercised |
| Motion/finish 10% | 4 | One 450ms/12px reveal, stagger ≤60ms; reduced-motion + no-JS pass |

Weighted **4.55/5**, no dimension below 3. Mandatory gates (no internal leaks, no false claims,
no broken links, no draft leakage, keyboard access) all hold.

## Owner-gated gaps (remain draft, NOT passes)

Both Lab statuses, paper authorship/venue/review/publication state + URLs, SQL/NVIDIA + DAZONE/RMIT
dates, first local article, social-URL confirmation, current-CV confirmation.

## Release blockers (local complete ≠ shippable)

`YOUR-DOMAIN` still in `astro.config.mjs`, `public/robots.txt`, RSS fallback → canonical/OG/sitemap
URLs are placeholders. **Canonical / OG / robots checks FAIL until the domain lands.** Deploy only
on explicit user request (`go-live` skill).

## Evidence

`design-validation/redesign-{home-1440-light,home-390-light,home-1440-dark,home-768-light,research-1440-light,lab-1440-light,writing-1440-light,certificates-390-light,404-1440-light}.png`
(full-page, post-scroll captures; historical `*.png` files there are pre-redesign references).

## Cleanup & performance pass (2026-09-11)

Scope: codebase tidy-up, re-validation and performance work on the current (post-redesign)
implementation. Content state when measured: 2 public Lab entries, 3 awards, 2 credentials,
1 published paper, 0 published Writing (so the homepage renders Experience → Achievements &
Research → Lab → Certifications → About & Contact, and the sections above still describe the
2026-09-06 content subset).

Nothing in the design changed: every route is pixel-identical to the pre-pass build except the
two intended fixes below (verified by full-page screenshot diff, see "Verification").

### What changed

1. **Font subsets** — `src/styles/fonts.css` replaces the three `@fontsource-variable/*` root
   imports: latin everywhere, plus Vietnamese for the body face (the name and award copy render
   Vietnamese diacritics; Space Grotesk and JetBrains Mono fall back to Inter/system for them).
   Shipped: 16 faces / ~360 KB → **4 faces / 118 KB**; the sheet loses 13 `@font-face` blocks and
   a 2 KB inlined base64 face. `/certificates` no longer pulls Inter Latin Extended (85 KB) —
   that page's cold transfer dropped from 337 KB to ~200 KB.
2. **Preload above-the-fold faces** — `Base.astro` preloads Inter Latin and Space Grotesk Latin
   (`?url` imports, `crossorigin`), so the first paint already uses the final fonts.
3. **Dead CSS removed** (~925 B raw): `.card-grid`, `.mono`, `.reveal-mask` / `.reveal-content`
   and their state rules, `.section-number`, `.section-dash`, `.ed-title`, `.ed-about`, and the
   `.contact-actions` selector + mobile block — none had a consumer in `src/`. Stale comments and
   the `.copy-email` name (now `.copy-control`) updated with them.
4. **Dead markup** — the homepage About section had a stray `</div>` left over from a removed
   wrapper; removed with the wrapper's dead grid rules (the section renders single-column, checked
   pixel-identical).
5. **Copy controls deduplicated** — `src/components/CopyControl.astro` renders the button + live
   region and wires every instance with one inline script (email and citation). Keeping it inline
   matters: importing a shared helper turned the page script into external chunks, so the
   component exists precisely to avoid that request.
6. **Date formatting consolidated** — `src/lib/format.ts` (`formatDay`, `formatMonthYear`,
   `formatYear`) replaces six per-page helpers.
7. **320px overflow fixed** — the HarvardX credential ID has no break opportunity: `/certificates`
   scrolled 28px horizontally at 320px and the text left its card at 1440px. `.card-desc` now
   allows `overflow-wrap: break-word`.
8. README refreshed (fonts/copy/format rows; the owner-gated list now reflects the published
   research, Lab and award records).

### Measurements

| Metric | Before | After |
| --- | --- | --- |
| Stylesheet (render-blocking) | 29,292 B / 8,306 B gzip | **22,068 B / 5,381 B gzip** (−25% / −35%) |
| `dist/` | 43 files, 1,676 KB | 32 files, 1,448 KB |
| Font files shipped | 16 (all subsets) | 4 (latin ×3 + vietnamese) |
| Cold 4G, `/certificates` @390 | 337 KB total, 203 KB fonts (5 faces) | ~200 KB total, 120 KB fonts (4 faces) |
| Cold 4G, `/` @390 | 118 KB, 109 KB fonts | 115 KB, 109 KB fonts (only latin faces were ever fetched) |
| CLS @390 `/404` / `/blog` / `/research` | 0.101 / 0.028 / 0.0002 | **0 / 0 / 0** |
| Overflow @320 | `/certificates` +28 px | 0 everywhere |

FCP/LCP under 4G + 4× CPU are unchanged within noise (homepage FCP ≈ 2.6 s both before and
after): paint there is CPU-bound, the fonts already arrived before first paint, so the preload
trades no LCP for the CLS win. Headless lab numbers only — not field Core Web Vitals.

### Verification

- `pnpm run build` green from a clean `dist/` + `.astro/`; fixture checks **19/19 pass**
  (`node --experimental-strip-types scripts/check-content.mjs`).
- Computed-style snapshot diff (8 routes × 1440/768/390, ~40 properties per element) before vs
  after: **zero** style changes; only the renamed copy button class and one scrollspy timing
  artifact.
- Full-page pixel diff vs the pre-pass build (11 route/viewport/theme combinations, screenshots
  after scrolling every section): identical on 9; `/certificates` differs only in (a) the
  intended wrap fix (credential ID now stays inside its card, +28 px card height) and (b) ≤1 px
  line-width/antialiasing change where `Đ`/`ư` now render from the Inter Vietnamese face instead
  of Latin Extended. All Vietnamese diacritics verified covered by Inter (`document.fonts.check`),
  no fallback rendering.
- Copy controls exercised in-browser: success → label "Copied" + live region, restored after 2 s;
  failure → per-button message, clipboard untouched; the research citation copies its
  `data-copy-value` (full citation string).
- No-JS: all 8 routes render with 0 hidden reveals, 0 overflow, 0 console errors; reduced motion:
  every `.reveal` settles at opacity 1. 320 px and 720 px @2×: 0 overflow.
- Evidence: `design-validation/post-cleanup-*.png`; raw run data in `work/perf/*.json`.

### Known residuals (not regressions)

- `/certificates` keeps a cold-load layout shift of ~0.008 (award scan lazy-load + the Inter
  Vietnamese swap) — present before this pass, 12× below the 0.1 threshold.
- Astro still emits the three source achievement JPGs (~348 KB) into `dist/_astro` alongside the
  generated WebP; no page requests them (content-collection `image()` behaviour, deploy size only).
- `--color-surface-muted` and `--color-on-accent` are declared in `src/styles/global.css` and
  `src/theme/palette.ts` but unused; kept because DESIGN.md §4 documents them as palette tokens.
- Release blockers unchanged: `YOUR-DOMAIN` placeholders in `astro.config.mjs`, `public/robots.txt`
  and the RSS fallback; deploy still requires an explicit owner request.


## Layout & UX pass (2026-09-11, later)

Inputs: a primary-observation survey of 12 reference personal sites (rauno.me, paco.me,
joshwcomeau.com, leerob.io, antfu.me, brittanychiang.com, craigmod.com, manuelmoreale.com,
sive.rs, karpathy.github.io, brianlovin.com, maggieappleton.com) and a source-cited
standards checklist (WCAG 2.2 focus/target-size/measure, NN/g portfolio scanning and
F-pattern guidance, web.dev font/CWV guidance). Measured deviations first, then fixed:

1. **Reading measure** — prose measured 59ch actual against the 65–72ch spec (NN/g 50–75,
   Butterick 45–90, WCAG 1.4.8 ceiling 80). `.prose` 65 → **68ch** (68ch verified).
2. **Hero statement** — measured 38ch/3 lines with dead space below; now 1.2rem/52ch
   (2–3 lines, hero copy column balanced).
3. **Research band copy** — 62ch on a 1120px surface read thin; title 30ch / desc 58ch,
   and the two conflicting `.band-title` rules (46ch vs 32ch) merged into one.
4. **Awards** — two floating cards with no left anchor became an editorial ledger
   (hairline rows, mono index, year right-aligned) matching the Certifications ledger.
5. **About & Contact** — restored the 7/5 two-column composition (perspective+capabilities
   left, contact cards right; stacks ≤1023px) per the original `.ed-about` intent.
6. **Certifications ledger** — dotted leaders between title and year (manuelmoreale-style
   archive rows); leaders drop below 768px where they would collide.
7. **Archive headers** — h1 was 32px (≈1.15× body). Now `.archive-head` openers
   (54px h1, lede, hairline) on /projects, /research, /blog; /certificates gained its
   missing lede. Detail pages keep their calmer article headers.
8. **Footer colophon** — one muted line crediting the three typefaces (brittanychiang
   pattern); sitemap and contact rows unchanged.

Deliberately not adopted from the survey: hamburger-on-desktop (nav already fits inline),
view transitions (deferred until the production domain exists — they'd cache-bust the
placeholder canonical URLs), notes/blogs split and margin notes (no content yet),
serif accent (spec gates it behind a prototype), numbered-section removal (the 01–06
eyebrows are this site's editorial identity and DESIGN.md §2 keeps them).

Verified: build green; fixture checks pass; overflow 0 at 1440/768/390/320 on all routes;
0 hidden reveals (scroll + settle, both quick and slow scroll paths); no-JS and
reduced-motion unaffected; one h1 per page; colophon renders on every route; CLS 0 and
LCP 240–408ms (localhost, warm) on the changed surfaces in both themes; awards row
geometry (40px index column, mono year, 1px hairlines) and About columns (625/447px)
confirmed in-browser. Evidence: `design-validation/post-layout-*.png`.

## Article template pass (2026-09-11, evening)

Reference: the user picked the Anthropic article layout as the target look. Anatomy extracted
from its HTML: mono date eyebrow → very large serif display title → kicker/lede above body
measure → prose ~65–70ch → SVG charts with pattern fills + muted captions → grouped
benchmark tables → real footnotes.

Implemented (owner chose the serif option when asked):
- **Newsreader Variable** (opsz) added as the fourth family — latin + vietnamese subsets only,
  `--font-article` token, used by article detail headers. Preloaded **only** on article pages
  (`preloadArticleFont` prop); verified: homepage//blog//certificates never download it,
  project/research details do. DESIGN.md §5 records the exception.
- **`.article-head`** on blog/project/research details: mono date eyebrow (status + dates +
  reading time on blog), serif display title (clamp 2.6–4.2rem desktop / 2.1–2.8rem mobile,
  weight 480, `text-wrap: balance`, max 24ch), lede paragraph, tags/links below.
- First prose paragraph after the header reads as lead-in (1.08rem).

Verified: build green; fixture checks pass; Newsreader resolves in-browser (67px h1, weight 480);
CLS 0 on both article templates; overflow 0 at 1440/390/320; dark theme verified through the
real toggle + persisted localStorage (h1 #F3F4ED on #151917, lede #B1BDB3 — AA); no-JS unaffected
(header is pure HTML). **Process bug found and corrected**: the harness's
`evaluateOnNewDocument` dark-class injection is unreliable — two earlier "dark" screenshots
were actually light. All dark evidence was re-captured via the real theme toggle / persisted
storage and pixel-verified (bg 21,25,23). Bogus files deleted.

Evidence: `design-validation/post-article-{home,research,lab}-1440-dark.png`,
`post-article-project-1440-light.png`.

## Full validation sweep (2026-09-12)

Post-pass audit across links, SEO metadata, a11y structure, perf and feeds. Found and fixed:

1. **Homepage fetched an unnecessary 4th font** — the awards ledger rendered `organizer`
   ("FESE · UEL (ĐHQG-HCM)"), whose `Đ` triggered the Inter Vietnamese subset on the homepage
   (+10 KB, +1 request). Organizer is archive detail; removed from the homepage row. Homepage
   back to 3 fonts / 109 KB cold.
2. **Meta descriptions over the ~155–160 char search-snippet length** on two detail pages
   (QuantVN 209ch, research 282ch). `Base.astro` now clamps the meta/OG/Twitter description at
   158 chars on a word boundary (display lede unchanged — the frontmatter keeps full text).

Verified clean this sweep: internal links + cross-page anchors (0 broken after re-checking with
correct same-page resolution — the initial "23 issues" were my audit script flagging every `#`
before validation); 1 h1 + landmarks + skip link + nav labels + img alt on all 9 pages; RSS
valid (0 items — no published posts yet, correct); sitemap 8 URLs, no placeholder domain leak
into it; all routes overflow 0 / 0 hidden reveals / CLS 0 warm in both themes; fixture checks
pass; clean-slate build green.

Known residual (documented, not fixed): under cold cache + 4× CPU throttle the homepage records
one deterministic CLS 0.0109 (hero block moves ~29px between first paint and DOMContentLoaded —
the webfont-apply window; preload can't help because CPU throttling delays the CSS/parse).
Ablation localized it to the hero reflow on font application; per-element line boxes are
identical across fallback/Inter/Space Grotesk, so a `size-adjust` metric-match has no single
target. 11% of the 0.1 budget, "good" band, warm-cache CLS 0. Fixing it would need a
metric-matched local fallback face per platform — judged over-engineering for now.

## Tier-1 refinement pass (2026-09-06, same day)

Reference-grounded improvements (`PORTFOLIO_REFERENCES.md` §1: Rauno motif, Chiang/Karpathy
evidence linking, Comeau teasers) on top of the validated base:

1. **Signature diagram grammar** — `src/components/DiagramFigure.astro`: shared node/connector/
   annotation system (token colors, arrow markers, dashed hypothesis loop, thin-rule annotation).
   Hero figure upgraded from 3 label-boxes to sources(orders/events/crm) → transform
   (clean/model/check) → insight(decisions, lime emphasis); Lab concept figures reuse the same
   grammar with per-status dashed state node + hypothesis→next-experiment loop. Wired into
   homepage hero + Lab previews and `/projects` listing (old inline SVGs removed).
2. **Experience evidence links** — `src/config.ts` highlights now `{ text, href? }`; the template
   renders "Read the write-up ↗" only when a public `href` exists. Currently zero configured
   (verified: link absent in dist) — activates when the generalized CASK article publishes.
3. **Writing meta** — `readingMinutes()` helper computes reading time from the actual Markdown
   body (~220 wpm, floor 1 min); local posts show "· N min read" and lead shows first topic tag
   on `/blog` and the homepage Writing preview. External entries keep publisher/relationship
   (source metadata, no invented reading time).

Verified: fixture checks still 18/18; build 6 pages clean; diagram present on homepage in both
themes at 1440/768/390/320 with overflow 0 and zero hidden reveals; fills/strokes resolve per
theme (`#FFFEFA`/`#285640` nodes, `#C9E875` emphasis, ink labels); Lab diagram fits its figure at
1440 (601px in 635px track) and 390 (316px, right edge 353 < 390 viewport). Positive branches
(dashed state node, hypothesis loop, min-read + topic) proven with `__t` temp entries then
deleted; `grep __t` clean in `src/` and `dist/`. Evidence refreshed:
`redesign-home-1440-light.png`, `redesign-home-390-light.png`, `redesign-home-1440-light-lab.png`.
