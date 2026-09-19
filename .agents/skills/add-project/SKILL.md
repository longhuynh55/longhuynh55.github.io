---
name: add-project
description: Add a new Lab case study to the portfolio. Use when creating src/content/projects/*.md, wiring its card, or debugging a project page.
---

# Add a project (Lab entry)

## When to use

New file in `src/content/projects/`, or Lab card/detail page looks wrong.

## Steps

1. Create `src/content/projects/<slug>.md` with `draft: true` (new entries default to
   draft; see `src/content.config.ts` `projects`). Required frontmatter: `title`,
   `description`, `date` (project start — never used as `article:published_time`).
2. Set the truthful Lab `status`: `idea` | `exploring` | `prototype` | `released`.
   Publishing (`draft: false`) additionally requires `updatedAt`; `released` requires
   `evidence[]` (`{label, url}` with a real available artifact, http(s) URLs only).
3. Add `hypothesis`, `nextStep`, and `targetOutcome` for Idea/Exploring entries.
   `outcome` is for observed results only — it needs support in `CONTENT_INVENTORY.md`.
4. Write the body as Problem → status/last updated → hypothesis → proposed approach →
   smallest experiment → success/failure criteria → observed evidence/results (when
   present) → limitations → next step (see `REDESIGN_PLAN.md` §13). A TOC is automatic.
5. Homepage visibility: `featured: true` + `sortOrder`; the homepage Lab preview renders
   at most 2 featured public entries via `selectFeatured` in `src/lib/content.ts`.
   Never pull drafts or filler to fill the cap.

## Pitfalls

- Targets and hypotheses are NOT achieved outcomes — never describe an idea with
  shipped language ("scheduled", "production", "single source of truth" without evidence).
- OMIT `github`/`demo`/`image` when there is no link/asset; do not leave placeholders.
- NEVER ship `TODO`/`Placeholder` text — the detail page renders the body verbatim.
- No CASK internals: no company repository, screenshot, dataset, identifier or architecture.
- Use real dates; `2024-01-01`-style Jan-1 dates read as placeholders.
- Do not reuse another site's imagery as project art.

## Verify

`pnpm run build` — then open `/projects/<slug>/` and `/projects`. Draft entries must not
appear in either. Run `node scripts/check-content.mjs` if you touched selection logic.
