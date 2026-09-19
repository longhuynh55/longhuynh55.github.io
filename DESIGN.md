# DESIGN — Data & Research Editorial

Updated: 2026-09-06  
Status: Target specification for the redesign. The current website has NOT yet implemented this version.  
Implementation plan: [REDESIGN_PLAN.md](REDESIGN_PLAN.md).
Reference research: [PORTFOLIO_REFERENCES.md](PORTFOLIO_REFERENCES.md), reviewed 2026-09-06. Detailed screen briefs, asset briefs, interaction states and evaluation rubric: plan sections 9–17. These are design decisions informed by sources, not results from a completed prototype.

## 1. Direction and priority

Build a distinctive personal portfolio for Liêu Hoài Phúc around data engineering, technical writing and research. Use editorial hierarchy, generous whitespace, project-specific graphics and an asymmetric composition.

Priorities: truthful content → clear navigation → strong typography and imagery → responsive usability → restrained motion.

This version supersedes the previous 960px Forest Green layout, mandatory 01–07 rail, full homepage skills matrix and repetitive card stack. Keep Astro, pnpm, Markdown content, self-hosted fonts and lightweight JavaScript. Existing screenshots are historical references, not acceptance targets.

Public copy remains English initially, with correct Vietnamese name rendering. Planning documents may be Vietnamese.

Document ownership: the user's latest decisions take priority. This file owns UI/visual requirements; REDESIGN_PLAN.md owns implementation, schema and migration (including the audit clarifications in section 18). PORTFOLIO_REFERENCES.md is supporting research. See PLAN_AUDIT.md for resolved document findings. Keep shared decisions synchronized.

## 2. Information architecture

Homepage order:
1. Hero
2. Experience
3. Achievements & Research
4. Projects / Lab
5. Certifications
6. Selected Writing
7. About & Contact

Navigation: name links home; Experience, Research, Lab, Writing; Resume and theme control. Experience links to /#experience; Research links to /#research only when that feature is rendered on the homepage; otherwise it links to /research when public papers exist. About and Contact remain reachable from the footer. Certifications links remain in its homepage preview and footer; do not crowd all sections into the header.
Routes: /research and /research/[slug] are new; retain /projects and /projects/[slug] with the visible label Lab; retain /blog and /blog/[slug] with the visible label Writing. About links to /#about. Certificates stay at /certificates and are reachable from the homepage Certifications preview and footer. That archive retains awards and credentials; replace its old duplicated paper section with a /research link when research is public.

Anchors in page order: #experience, #achievements (with #research on the paper feature), #lab, #certificates, #writing, #about, #contact. Preserve #work as a compatibility anchor for Lab. Remove the numbered SectionRail from the homepage; do not keep obsolete rail links. Do not create /lab or /writing aliases in the first version.

Hide empty optional collections rather than publish filler. If Research lacks a publishable record, omit its feature and navigation until ready; retain available achievements. The remaining order stays unchanged. Experience and Achievements & Research establish evidence before exploratory projects; Certifications stays compact between Lab and Writing.

Lab navigation targets /projects and Writing targets /blog. Their archives remain usable with a short empty state and Home/Contact links even when homepage previews are absent. Remove links to absent anchors; Research navigation appears only with public research. Preserve #publication as a compatibility alias when the paper feature exists. Apply hero CTA fallback below when Lab is absent.

## 3. Content boundaries

### CASK / Experience

Keep role, dates and publishable contributions in Experience. A separate technical article explains generalized problem-solving and lessons from the experience.

No company repository, production screenshot, internal dataset, credentials, client identifiers or proprietary architecture may appear in the site, public assets or shipped source. Use synthetic examples and redrawn generic diagrams, clearly identified as illustrative. Do not imply those examples are the production system. Do not infer unverified savings or business impact. Link Experience to the article only when published.

### Lab / Ideas

States: Idea, Exploring, Prototype, Released. State is always visible and conveyed in text, not color alone.

Separate target outcome from demonstrated result. An idea uses a concept diagram, not a fabricated product screenshot. Every entry states the problem, hypothesis, next experiment and available evidence. Released status requires an actual available artifact; do not automatically promote existing entries from their old copy.

### Research

Treat Research as a primary identity section. Feature the question, method illustration, plain-language contribution, author role, exact venue and publication status.

The current paper record describes DMO Fintech 2026 Workshop @ PAKDD Conference, Hong Kong. Verify against an authoritative paper record before public release; do not shorten this into a main-conference publication claim. Avoid unsupported performance claims.

Show Paper, Code, Slides and Behind the paper only when their destinations exist. Represent reviewStatus (unsubmitted/submitted/accepted) separately from publicationStatus (unpublished/published) and an optional preprintUrl; an accepted paper may also have a preprint. Use publishedAt and eventDate only for their actual meanings; do not infer publication from the conference date. An absent URL is not a disabled button or a "#" link.

### Writing

One listing supports local articles and external links. Show title, short summary, topic, date when known and external publisher when applicable. A local article requires its publication date; an external source with no date omits it instead of using the bookmark date. Distinguish the owner's writing from recommended third-party reading through authorship/relationship metadata.

External entries navigate directly to the source and do not create empty local article pages. Do not copy full external articles into the site. Drafts are excluded from listings, routes, RSS, sitemap and previous/next links.

## 4. Palette

All component styles use semantic CSS variables exposed in global.css; no hardcoded component colors. HTML theme-color metadata serializes literal colors from the same shared palette configuration used to generate/expose the CSS tokens; this is a metadata exception, not a second independent palette.
These are proposed tokens. Previous contrast validation does not apply to this palette: verify every actual text, button, status and focus pairing during implementation.

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| --color-bg | #F7F5EF | #151917 | Main canvas |
| --color-surface | #FFFEFA | #1D2320 | Raised reading/media surfaces |
| --color-surface-muted | #ECEEE7 | #262E29 | Secondary surfaces |
| --color-text | #202722 | #F3F4ED | Main text and headings |
| --color-text-muted | #59645C | #B1BDB3 | Secondary copy |
| --color-accent | #285640 | #91C8A5 | Links, active details |
| --color-accent-hover | #1B402E | #B7DFBF | Hover text |
| --color-accent-ink | #214A35 | #B7DFBF | Text on tag backgrounds |
| --color-spot | #C9E875 | #C9E875 | Small lime accents |
| --color-ink-block | #173B2C | #102B20 | Research band |
| --color-border | #D4DBD1 | #455349 | Decorative separators |
| --color-tag-bg | #E3EBDD | #2A3B30 | Topic/status surface |
| --color-on-ink | #F3F5EC | #F3F5EC | Research band text |
| --color-on-ink-muted | #C2D1C4 | #C2D1C4 | Research band metadata |
| --color-on-ink-faint | #ACBFAF | #ACBFAF | Secondary band annotations |
| --color-on-accent | #FFFEFA | #151917 | Filled accent button text |
| --color-on-spot | #173B2C | #173B2C | Lime surface text |
| --color-focus | #285640 | #C9E875 | Focus on neutral canvas |
| --color-focus-on-ink | #C9E875 | #C9E875 | Focus on Research/footer ink surfaces |

Keep the main canvas neutral. Deep green is concentrated in Research and selected details; lime occupies roughly under 5% of a typical viewport. Never use lime body text on a light surface. Band/footer descendants use on-ink tokens regardless of theme. Decorative border tokens are not automatically valid control-boundary colors. Inside ink surfaces scope --color-focus to --color-focus-on-ink and use outline-offset so the ring sits on the measured surrounding surface. Never apply the light neutral focus color directly to the dark Research band.

## 5. Typography

- Body: existing self-hosted Inter Variable, 17–18px desktop and at least 16px mobile, line-height 1.6–1.75.
- Display: existing Space Grotesk Variable; hero name 80–112px desktop, 44–64px mobile via clamp(), adjusted for wrapping and Vietnamese diacritics.
- Section headings: 40–56px desktop, 30–36px mobile.
- Mono: existing JetBrains Mono for short dates, figure labels and metadata only.
- Article serif (exception, added 2026-09-11): Newsreader Variable — latin + vietnamese subsets
  only, used by article detail headers (`.article-head h1`) via `--font-article`. Preloaded on
  article pages only; homepage/archives keep Space Grotesk. This is the deliberate fourth-family
  exception that §5 originally gated behind a prototype; the reference was the Anthropic
  editorial article layout, and the acceptance record is in VALIDATION_REPORT.md.
- Body measure: 65–72ch; keep paragraphs substantially narrower than the page container.
- Default heading color is main text. Accent color is selective.
- No forced line breaks that crop names or paper titles; avoid tight vertical masks clipping diacritics.

## 6. Layout and rhythm

- Main container: max-width 1200px, centered; gutters 20px mobile, 32px tablet, 40px desktop.
- Desktop uses a 12-column conceptual grid: hero 7/5, large features 5/7 or 7/5.
- At <=767px stack content in meaningful reading order; 768–1023px allows compact two-column blocks; >=1024px uses full composition.
- Section spacing: 96–128px desktop, 56–72px mobile; internal spacing uses 8/12/16/24/32/48px steps.
- Separate blocks with whitespace and occasional thin rules. Not every block needs a card.
- Radii 6–12px; avoid pills for large content containers, heavy shadows and uniform dashboard tiles.
- Media reserves aspect ratio before load; all grid children need min-width: 0.
- Article pages use a readable text column with optional sticky table of contents on wide screens; collapse TOC on mobile.
- Sticky navigation must not obscure anchors. Desktop links compact; on small screens use an accessible Menu disclosure if they do not fit. Expose expanded state, keyboard controls and Escape handling. Navigation remains available without JS.

## 7. Section specifications

### Hero

Make the name the main visual anchor with a short role label and one sentence about the work. Suggested working copy: "I build data systems that turn operations into decisions." Review for fit before implementation.

Primary CTA: Explore my work → #lab when the public featured Lab preview is rendered; if only non-featured public projects exist, link to /projects. With no public projects use See my experience → #experience when that section exists, then Contact me → #contact. Secondary: View CV → /resume.pdf when the file exists.
Right column: original SVG composition of sources, transformations and insights; label as conceptual where needed. It represents the practice, not an internal company architecture or live dataset.

No repeated stats strip, long biography or duplicate contact listing in the hero.

### Experience

Immediately after Hero: concise role/company/date presentation, two or three supported contributions, optional published CASK article link. Use 3 columns for date/label and 9 for detail on desktop; stack role/company, date, contributions and link on mobile. With only one entry, use a single feature rather than stretching an empty timeline. Never present confidential company work as a downloadable public project.

### Achievements & Research

After Experience, group selected competition achievements and the distinct Research feature in one section. Show up to two prominent awards in a compact row followed by a wide paper feature, stacking in the same order on mobile. Show award, event, year and evidence link when available; avoid duplicating the paper as an award. Keep the paper's exact venue and publication status visible. Never truncate the paper title merely to fit a small award card.

A deep-green feature panel with exact venue/status, title, question, concise contribution, method diagram and valid links. Text and diagram stack on mobile. Use the actual paper to construct the diagram; use a clearly conceptual treatment while its method is unavailable.

### Projects / Lab

One or two generous alternating image/text features. Every entry has a distinct graphic, visible state and a clear next question or result. Keep a maximum of three prominent stack labels. No identical placeholder line charts and no filtering UI for only two entries.

### Certifications

After Projects / Lab and before Writing, show up to three selected credentials in a compact row/list with title, issuer, year and a valid credential link when available. Link to /certificates for the full collection. Stack on mobile. Keep this section visually lighter than Experience, Research and Lab.

### Selected Writing

One lead article plus a compact editorial list, up to four selected entries initially. Desktop: lead in 5 columns, list in 7; mobile: lead then rows with no carousel. With only one article, use one appropriately sized feature. Metadata includes topic, date and publisher for external links. Covers are optional; title and summary must work without them. External-link indicator has an accessible label. External links open in the same tab by default; any new-tab behavior must be announced.

### About & Contact

Short personal perspective and grouped capabilities supported by work. Do not repeat the achievements or credential listings from earlier sections. A direct email CTA and validated social links close the page. Any "Now" copy must be current and useful; avoid unverified response-time promises.

## 8. Graphic language and motion

Use consistent nodes, connectors, thin rules and figure annotations across hero, paper diagrams and writing covers. Prefer native SVG/CSS for diagrams. Images are specific to the content and carry honest captions. Avoid decorative financial charts with implied results.

One primary interaction per section. Reuse the existing reveal observer; entrance animation 350–600ms, translate <=12px, stagger <=60ms. Hover/focus transitions 150–250ms. A short connector reveal is optional. Pointer feedback only on fine pointers.

No scroll hijacking, custom cursor, infinite ambient animation, 3D tilt, autoplay carousel or full-page particle field. No content is available only on hover. Reduced-motion and no-JS states show all content immediately; a JS failure cannot leave sections invisible. Never delay interaction for an intro.

## 9. Accessibility, theme and performance

- Target WCAG AA: normal text >=4.5:1; large text >=3:1; meaningful UI boundaries and focus indicators >=3:1 against adjacent colors.
- Semantic landmarks, one H1 per page, ordered headings, skip link, visible keyboard focus, descriptive link text and useful image alt text.
- Aim for 44px touch controls; verify 320px width and 200% zoom without page-level horizontal scrolling.
- Persist theme with guarded localStorage access, respect OS preference when unset, prevent flash, synchronize aria-pressed and theme-color.
- Keep favicon, OG image, resume and feed working; review their appearance with the new identity.
- Static Astro first; no client framework or animation library for cosmetic behavior.
- Use optimized responsive images with dimensions, lazy-load below-fold imagery, avoid lazy-loading the hero's principal image.
- Self-host fonts, minimize weights/preloads and use font-display: swap.
- Target representative mobile lab checks: LCP <=2.5s, CLS <=0.1, Lighthouse performance >=90 and accessibility >=95. Record environment; these are targets, not verified results or field guarantees.
- Field target additionally includes INP <=200ms, measured with the other Core Web Vitals at the 75th percentile, split by mobile/desktop. Lighthouse scores do not certify field INP. Record unavailable field data honestly. Source: [web.dev Web Vitals](https://web.dev/articles/vitals).
- The 44px control target is a project usability choice; [WCAG 2.2 SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) specifies 24px with exceptions. Reduced motion is a project requirement; [SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) is AAA and does not imply full AAA conformance here.

## 10. Definition of done

Check the homepage, Research detail, Lab detail, Writing listing/local article, Certificates and 404 in both themes. Cover desktop 1440px, tablet 768px and mobile 390px; spot-check 320px and zoom.

Verify keyboard, touch, reduced motion, no JS, empty collections, long paper titles, unavailable optional links and draft exclusion. Scroll through all sections before capturing screenshots; old full-page screenshots with unrevealed content cannot serve as proof.

Run pnpm run build; verify output routes, anchors, assets, RSS and sitemap. Add focused checks for content-state/link logic rather than tests that merely mirror CSS. Save new screenshots separately from historical references.

## 11. Prototype and visual acceptance

Prototype two compositions with the same content, palette and section order: A, Editorial systems (preferred), and B, Research notebook. Compare Hero → Experience → Achievements & Research at 1440px and 390px before building all templates. The notebook option uses figure captions and restrained margin annotations, not decorative paper textures. Record the chosen composition and rationale in DESIGN_DECISIONS.md during implementation.

The page rhythm is large hero → structured Experience → compact awards and dark Research feature → image-led Lab → light Certifications → text-led Writing → clear contact. Do not repeat the same card/grid treatment across three consecutive sections.

Use the weighted rubric in REDESIGN_PLAN.md section 16: identity 20%, hierarchy 20%, typography/spacing 15%, imagery/evidence 20%, mobile/keyboard 15%, motion/finish 10%. Target >=4/5 overall with no dimension below 3; attach observations and screenshots. These are internal acceptance thresholds, not published industry standards. Content truthfulness, confidentiality, working primary links, draft exclusion and accessibility remain mandatory regardless of score.

## 12. Content and asset implementation briefs

Follow plan section 13 for the CASK article, paper detail and Lab detail. Paper citations must be verified before generating a copyable citation. Copy controls have text fallback and accessible success/failure feedback. Lab entries distinguish hypothesis, target, observed evidence and next experiment.

Maintain an asset inventory with source/rights, alt, caption and concept-versus-real status. Hero uses an original conceptual SVG; paper illustration follows the actual method; every Lab graphic represents its own question. Never reuse a reference site's imagery as personal work. Covers remain optional; the layout must work without them.



