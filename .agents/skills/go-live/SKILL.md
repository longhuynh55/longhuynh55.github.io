---
name: go-live
description: Replace every placeholder and run the pre-deploy checklist. Use before any production deploy or when asked to "finish the site".
---

# Go-live checklist

## Placeholders to replace (all marked TODO in code)
1. `astro.config.mjs` → `site`: real deployed URL (canonical, sitemap, absolute OG image depend on it).
2. `public/robots.txt` → sitemap URL; `src/pages/rss.xml.ts` → fallback site constant. Same URL.
3. `src/config.ts` → `socials`: real profile URLs matching the displayed handles; refresh `now`
   (keep it dated, e.g. `Sep 2026 — …`).
4. `public/og-image.png` → real 1200×630 PNG (<300KB, readable at 300px wide). Icon fallbacks (`favicon-32.png`, `apple-touch-icon.png`) already rasterized from `favicon.svg` — regenerate both if the mark ever changes.
5. Certificates (`src/content/certificates/`): real `date` + `credentialUrl` each.
6. Achievements with `kind: paper`: real `url` (proceedings/DOI) so "Read paper" renders.
7. Projects: real `github`/`demo` or omit the field; real `metrics[]`; no commented links.
8. `public/resume.pdf` → current CV (hero "Preview resume" + nav "CV" point here).

## Pitfalls
- `YOUR-DOMAIN` / `YOUR-GITHUB-USERNAME` strings must not survive: `grep -r "YOUR-" src public astro.config.mjs`.
- No `TODO`/`Placeholder` text in any shipped `.md`: `grep -ri "todo\|placeholder" src/content`.
- OG image is referenced by absolute URL — a relative path breaks link previews.

## Verify
`pnpm run build`, then confirm `dist/sitemap-index.xml`, `dist/rss.xml`, `dist/robots.txt` exist
and `<link rel="canonical">` in `dist/index.html` uses the real domain.
