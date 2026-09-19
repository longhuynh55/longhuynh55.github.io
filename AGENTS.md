# AGENTS.md — Portfolio project rules

Updated: 2026-09-06.

## Read first and determine current state

This repository is Liêu Hoài Phúc's personal portfolio. The agreed redesign is **Data & Research Editorial**.

Read the relevant documents before work:
- [DESIGN.md](DESIGN.md): visual direction, homepage order, navigation, UI behavior and accessibility.
- [REDESIGN_PLAN.md](REDESIGN_PLAN.md): implementation phases, content schemas, migration, dependencies and acceptance; section 18 includes both audit rounds' execution clarifications.
- [PLAN_AUDIT.md](PLAN_AUDIT.md): resolved planning findings and checks still requiring implementation.
- [PORTFOLIO_REFERENCES.md](PORTFOLIO_REFERENCES.md): reference observations and rationale, not extra implementation requirements.

The latest user instruction takes priority over these local rules. Keep shared decisions synchronized across design and plan when changing them. Do not reopen agreed design choices or request repeated approval for reversible implementation within the user's request.

At this update, the redesign documentation has been written and audited twice; that does not mean the redesign code has been implemented. Inspect actual source and working changes at the start of each task. Never assume an unchecked task is complete, or overwrite work from another session based on this historical note.

## Agreed product direction

Homepage order:
1. Hero
2. Experience
3. Achievements & Research
4. Projects / Lab
5. Certifications
6. Writing
7. About & Contact

Keep this order on desktop and mobile. Certifications is compact; Research has its own feature within Achievements & Research. Do not restore the old 960px layout, mandatory numbered SectionRail, repeated hero stats or homepage skills matrix.

Use the 1200px editorial layout, warm neutral canvas, charcoal text, forest-green research band and restrained lime accents defined in DESIGN.md. Prototype A is preferred; B is a bounded composition comparison, not another website or a new theme exploration.

Keep public copy in English initially and preserve the correct Vietnamese spelling of the name. Preserve existing /projects, /blog and /certificates URLs; introduce Research routes according to the plan. Do not rename route families merely to match visible labels.

## Environment and tooling

- The website uses Astro and Node.js. Use **pnpm**, with pnpm-lock.yaml as the dependency lockfile; do not use npm or bun for this project.
- Use pnpm install --frozen-lockfile when dependencies need installing. Use pnpm add only for an intentional dependency change.
- Existing scripts include pnpm run dev, pnpm run build and pnpm run preview. Inspect package.json before invoking additional checks; do not assume a test or typecheck script exists.
- Keep the frontend static-first. Do not add a framework, animation library, CMS, WebGL or backend for cosmetic work.
- Python is optional and separate from the site build. If needed, always use this project's .venv through uv run or the verified venv interpreter; never use system Python or install outside the project venv.
- The existing .venv was created for Python 3.11. Check compatibility with the active OS before running it; do not assume Unix activation paths work in Windows PowerShell. If incompatible, use Node for site tasks rather than silently replacing the environment.
- Install Python packages only into the project venv with uv pip install (or uv add if a pyproject.toml is intentionally in use). Keep .venv git-ignored.
- Inspect git/status when available. Preserve existing changes and create a recoverable baseline before broad redesign edits. A missing Git repository does not justify discarding files.
- Keep scratch files and prototypes in work/, outside public/ and production content globs. Keep visual evidence in design-validation/ with distinct baseline/redesign names.

## Content integrity

Content belongs in Markdown/data collections and src/config.ts. Once schemas are implemented, routine content additions should not require component edits. Schema migration itself may require coordinated application changes.

- **CASK:** present publishable experience and a generalized technical article. Do not add internal repositories, production screenshots, datasets, identifiers, credentials or proprietary architecture to this repository, public assets or deploy output. Use clearly labeled synthetic examples and newly drawn generic diagrams.
- **Lab:** show Idea, Exploring, Prototype or Released according to actual evidence. Targets and hypotheses are not achieved outcomes. Use concept illustrations for ideas and public screenshots only when real artifacts exist.
- **Research:** verify authorship, exact venue and publication state against the paper record. Do not turn a workshop affiliation into a main-conference claim. Review status, publication status and preprint availability are separate. Do not invent diagrams, results, dates or citations.
- **Writing:** support local articles and outbound entries. External entries identify the publisher and author and distinguish authored from recommended material; do not generate an empty local article page for them.
- Missing content must not block independent layout/schema work. Keep unsupported entries draft, omit unknown optional claims and continue with the publishable subset.
- Draft filtering is not protection for files in public/. Never place confidential files there or in build fixtures.

## Migration and implementation

Follow phases 0–6 and tasks R01–R10 in REDESIGN_PLAN.md; they describe the same work at different levels, not two separate implementation cycles.

- Start with baseline/runtime inspection and a content inventory, then prototype and schema work. Do not spend another research cycle expanding scope unless a concrete unresolved issue requires it.
- R04 must update schemas, data and all affected existing consumers together so the build remains usable. Later tasks redesign the templates; they must not be required just to repair schema breakage.
- Paper migration includes homepage, PublicationBanner and Certificates consumers. Keep awards/credentials in their archive and link to Research instead of duplicating the paper.
- New entries default to draft under the target schema; migrate every old entry with an explicit visibility decision. Draft schemas allow incomplete metadata; public entries must pass the required validation for their kind.
- Use shared filtering, ordering and link-resolution helpers across homepage, archives, detail generation, previous/next, related links, RSS and sitemap.
- Featured previews and public archives are different sets. Compute CTA and navigation destinations from the sections actually rendered; preserve archive fallbacks for public non-featured content.
- Implement date semantics, source-aware sorting, optional external dates and related-entry IDs exactly as clarified in plan section 18. A project start date is not article publication time.
- Keep fixture content outside production globs. Validate draft exclusion and external-link routing with meaningful fixtures rather than relying only on visual review.
- Preserve known routes/anchors where content still exists; do not create blank anchors for private or draft entries.
- Keep mandatory content/code/accessibility failures as failures. Missing field metrics or a draft article must be reported separately, not turned into a fabricated pass.

## Visual implementation and validation

Load the design-review skill for visual work, then follow DESIGN.md.

- Component styles use semantic tokens. HTML theme-color may serialize literal colors from the same shared palette source; do not maintain a second independent palette.
- Use --color-focus-on-ink on Research/footer ink surfaces. Validate actual focus ring placement and contrast; the neutral light focus color is unsuitable on the dark research band.
- Keep diagrams readable and uncropped, including labels and Vietnamese diacritics. Reserve media dimensions to avoid layout shifts.
- Reuse the reveal mechanism where practical, but ensure no-JS, script failure and reduced-motion states expose all content. Never make essential information hover-only.
- Run pnpm run build for application/schema changes, plus focused logic checks appropriate to the change. Markdown-only changes need document consistency/link checks, not an application build by default.
- Review relevant routes at 1440px, 768px and 390px in both themes; spot-check 320px and zoom. Test keyboard, navigation, missing data and reduced motion.
- Scroll all sections before screenshots. Historical screenshots with hidden reveal content are not proof of redesign completion.
- Report what changed, what was verified and what remains unknown. Token contrast calculations are not full UI validation; lab scores are not field Core Web Vitals.
- Keep documentation and checklist status current when the corresponding work is actually done. Deployment is separate from local completion and requires a user request covering publication.

## Repository skills

Load the matching skill before its task:
- .claude/skills/add-project/SKILL.md: project/Lab content additions.
- .claude/skills/publish-post/SKILL.md: local/external Writing content.
- .claude/skills/design-review/SKILL.md: visual implementation and checks.
- .claude/skills/go-live/SKILL.md: release preparation and deployment checks when relevant.

Mirrors live under .agents/skills/. Synchronize corresponding skill files when editing them. Some content skills may still describe the old schemas: use the accepted redesign documents for migration, then update these skills in the same schema implementation phase before using them for new entries. Do not follow stale examples that would republish drafts, misstate project status or restore old layouts.

