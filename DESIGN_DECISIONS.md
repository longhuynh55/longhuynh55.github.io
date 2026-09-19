# Design decisions — Data & Research Editorial

Updated: 2026-09-06. Status: direction locked. Spec: DESIGN.md; rubric: REDESIGN_PLAN.md §16.

## Prototypes

- `work/prototypes/editorial-a.html` — Direction A, Editorial systems (preferred).
- `work/prototypes/notebook-b.html` — Direction B, research-notebook bounded variation.
- Both are isolated previews under `work/` (never production routes), same publishable subset:
  real name/role, CASK record, Finnovative (17-01-2026, evidence on file) + DAZONE awards,
  paper title/venue marked UNVERIFIED prototype copy, two Lab entries with PROVISIONAL states.
- Compared at 1440×900 and 390×844 viewports, light theme rendered headless; dark theme verified
  via the same token pairs (dark values from DESIGN.md §4 in both files' `[data-theme="dark"]` block
  and in `src/theme/palette.ts` / `global.css`).

## Rubric scores (1–5)

| Criterion (weight) | A — Editorial | B — Notebook |
| --- | --- | --- |
| Identity 20% | 5 — name is the anchor at ~104px, motif diagram beside it | 4 — same name scale, figure caption competes |
| Hierarchy 20% | 5 — 7/5 hero → feature → awards → dark band reads in order | 4 — margin column narrows copy, order same but slower |
| Typography/spacing 15% | 4 — statement 30 words, wraps clean with diacritics | 4 — same copy, longer scroll from stacked margins |
| Imagery/evidence 20% | 4 — concept SVG captioned, states labeled | 4 — identical graphics honesty, weaker integration |
| Mobile/keyboard 15% | 4 — stacks copy → CTA → figure, 44px CTAs | 3 — CTAs render oversized at 390px, margin notes add length |
| Motion/finish 10% | 4 — static complete, no motion dependency | 4 — same |

Weighted: A = 4.4, B = 3.85. No dimension below 3 in either; A wins outright (tie-break would also
prefer A per plan §18).

## Decision

**Selected: Direction A (Editorial systems).** Rationale: stronger identity/hierarchy with the same
content and palette; B's margin annotations cost horizontal space on desktop and vertical length plus
oversized CTAs on mobile without adding evidence. B introduced no content or component the redesign
needs — its caption discipline is kept as a rule (every diagram keeps an honest caption), not as a layout.

## Locked tokens

Single literal source: `src/theme/palette.ts` (exact DESIGN.md §4 values). Consumed by
`src/styles/global.css` (`:root` / `html.dark`) and serialized into `Base.astro` theme-color metadata
(`palette.light.bg` / `palette.dark.bg`). Old duplicated literals removed. Component styles use
variables only; `--color-focus-on-ink` is scoped to ink surfaces in templates (verified in step 3+).
