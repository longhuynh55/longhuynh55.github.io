# Liêu Hoài Phúc — Personal Portfolio

Personal portfolio / blog built with [Astro](https://astro.build). Plain Astro +
one global stylesheet — no Tailwind, no React. Design system: `DESIGN.md`
(Data & Research Editorial, 1200px layout, semantic tokens in `src/theme/palette.ts`
mirrored as CSS variables, light/dark mode).

## Run it

```bash
pnpm install --frozen-lockfile   # first time only
pnpm run dev      # dev server at http://localhost:4321
pnpm run build    # production build → dist/
pnpm run preview  # preview the production build
```

Content logic checks: `node --experimental-strip-types scripts/check-content.mjs`
(synthetic fixtures only — never production entries).

## Deploy

- **Vercel:** import the repo at vercel.com — it detects Astro automatically
  (build command `pnpm run build`, output `dist`). No extra config needed.
- **GitHub Pages (live):** user site at https://longhuynh55.github.io via
  `.github/workflows/deploy.yml` (push to `main` → build → deploy). `site` in
  `astro.config.mjs` points there; no `base` needed for a user site.

## How to update content

All content is data/markdown — routine additions need no component edits.
New entries default to `draft: true`; set `draft: false` to publish (public entries
must pass the per-kind validation in `src/content.config.ts`). Selection, ordering
and link rules live in one module: `src/lib/content.ts`.

| What | Where | How |
| --- | --- | --- |
| Name, role, statement, email, socials, experience, about | `src/config.ts` | Edit the values in that one file. |
| Lab entries | `src/content/projects/` | Add a `.md` file: `title`, `description`, `date` (start date), truthful `status` (`idea`/`exploring`/`prototype`/`released`), `hypothesis`, `nextStep`, `updatedAt`; `outcome`/`evidence[]` only for observed results. See `.claude/skills/add-project/SKILL.md`. |
| Research records | `src/content/research/` | Add a `.md` file: `title`, `authors[]`, `venue`, `reviewStatus`, `publicationStatus`, `summary`; resource URLs only when verified. |
| Writing | `src/content/blog/` | `kind: local` (requires `date`) or `kind: external` (requires `externalUrl`, `publisher`, `author`, `relationship`). See `.claude/skills/publish-post/SKILL.md`. |
| Awards | `src/content/achievements/` | Competitions only: `title`, `rank`, `event`, `date`, `description`. |
| Credentials | `src/content/certificates/` | Add a `.md` file: `title`, `issuer`, `date`, optional `credentialUrl`. |
| CV | `public/resume.pdf` | Replace the file (keep the same name). |
| Images for entries | `src/assets/<collection>/<slug>/` | Reference via frontmatter `image`/`cover` (Astro pipeline). Never put draft-protected files in `public/`. |
| Colors / theme | `src/theme/palette.ts` + `src/styles/global.css` | Literals live in the palette module; components use variables only. Document changes in `DESIGN.md` first. |
| Fonts | `src/styles/fonts.css` | Only the subsets the site renders ship (latin everywhere, Vietnamese for body + article faces). Newsreader (article display) is preloaded on article pages only — pass `preloadArticleFont` to Base. Adding copy in another script means adding that subset's `@font-face` from the `@fontsource-variable/*` package here — the package root CSS imports every subset and would ship them all. |
| Copy buttons | `src/components/CopyControl.astro` | One component renders the button + live region and wires every instance on the page inline; `value` is the text copied. |
| Date display | `src/lib/format.ts` | Shared en-US date formatting for previews/archives/details. |
| Social preview image | `public/og-image.png` | True 1200×630 PNG (regenerate with `node work/make-og.mjs` after identity changes). |

## TODO before going live (owner-gated)

- Verify the GitHub/LinkedIn URLs in `src/config.ts` (inferred from handles).
- Fix placeholder dates on the draft credentials: SQL Intermediate and NVIDIA
  (`2024-01-01`, no credential asset). Both stay `draft: true` until verified.
- Publish the first blog post: the only file under `src/content/blog/` is a `draft: true` template.
- ~~Replace the `YOUR-DOMAIN` placeholder~~ — done: all three point to https://longhuynh55.github.io.
- Confirm `public/resume.pdf` is the current CV.

Already public (evidence on file; re-check if any record changes):
two Lab entries (`released` + `prototype`, both with `updatedAt`), three competition
awards (Finnovative has a full date; DAZONE/RMIT carry `year` only — allowed by the
award schema) and the PAKDD 2026 workshop paper (accepted/published, Springer chapter URL).
