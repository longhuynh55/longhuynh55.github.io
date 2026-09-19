---
name: design-review
description: Review or fix portfolio visuals against the design system. Use when changing layout, colors, hero, cards, or when the site "looks off".
---

# Design review

Source of truth: `DESIGN.md` first, then code. Tokens live in `src/styles/global.css`
(`:root` light / `html.dark` dark), incl. `--color-on-ink*` for text on dark bands.

## Checklist
1. **Tokens only** — component styles reference semantic CSS variables. HTML theme-color metadata
   serializes literal colors from the shared palette config; allow that metadata case, not duplicate palettes.
   On ink surfaces use --color-focus-on-ink; verify actual ring placement and surrounding contrast.
   Lime `--color-spot` stays an accent (eyebrow pill, kickers, hovers).
2. **Layout** — follow the target layout in `DESIGN.md`: 1200px container, responsive asymmetric sections,
   Hero → Experience → Achievements & Research → Projects / Lab → Certifications → Writing → About & Contact.
   Keep Certifications compact, after Projects and before Writing. Retain #work as a Lab compatibility anchor.
   The old 960px layout and mandatory numbered SectionRail are superseded; do not restore them.
3. **Hero** — prominent name, concise role and statement, two CTA links, original conceptual graphic.
   Follow `DESIGN.md`; do not restore the old repeated stats and contact stack.
4. **Cards** — grid children need `min-width: 0` (regression seen: thumb `aspect-ratio`+`height:100%`
   overflowed its track and body text overlapped art). Use original concept diagrams for Idea/Exploring;
   real screenshots only when available and public. Never use internal CASK screenshots.
   Meaningful diagrams must fit without clipping labels; reserve cropping for decorative imagery.
5. **Motion** — reuse the existing `.reveal`/`.is-visible` observer only; no second observer, no tilt,
   no parallax. Everything must no-op under `prefers-reduced-motion: reduce`
   (smooth-scroll is already guarded).

## Pitfalls
- `.section-watermark` is huge and right-aligned — keep `max-width: 45%` + `overflow: hidden`
  or it collides with dates / "View all →".
- `.timeline` dots position against `.timeline` (entries are not positioned) — do not add
  `position: relative` to entries without re-anchoring dots and spine.
- Dark band + footer always use `--color-on-ink*`, never `--color-text*`.

## Verify
`pnpm run build`, then inspect all redesign routes listed in `DESIGN.md` in both themes.
Capture desktop 1440px, tablet 768px and mobile 390px; spot-check 320px and zoom.
Scroll every section into view before screenshots. Historical `design-validation/*.png` files are references,
not redesign acceptance targets. Verify no-JS visibility, reduced motion, keyboard access, draft exclusion,
external Writing destinations and truthful Lab/paper states. See `REDESIGN_PLAN.md` for rollout status.
Apply section 18 audit clarifications for empty states, CTA fallback, public content selection and paper migration.
