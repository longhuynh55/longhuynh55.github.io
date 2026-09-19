---
name: publish-post
description: Write and publish a blog post. Use when creating src/content/blog/*.md or when the homepage Writing section is missing.
---

# Publish a post (Writing entry)

## When to use

New or edited file in `src/content/blog/`.

## Steps

1. Create `src/content/blog/<slug>.md` with `draft: true` and `kind: local | external`
   (see `src/content.config.ts` `blog`). Common frontmatter: `title`, `description`
   (page meta + RSS), `tags[]`, `featured` + `sortOrder` for homepage selection.
2. Local article: requires publication `date`. Write the body with headings, code blocks,
   tables — TOC and prev/next links are automatic (`src/pages/blog/[slug].astro`).
3. External entry: metadata + outbound link only. Requires `externalUrl` (http(s)),
   `publisher`, `author`, `relationship: authored | recommended`. Source `date` is
   optional — omit it when the source publishes none; never substitute bookmark/build time.
4. To publish: set `draft: false`. `draft: true` excludes the post from the listing,
   routes, RSS, sitemap AND the build. Homepage selection uses `selectFeatured` capped
   at 4 (`src/lib/content.ts`); missing count renders as-is, never filler.
5. Nothing else to wire: `/blog`, `/rss.xml`, and `sitemap-index.xml` pick up published
   posts automatically — external entries link straight to their source and never
   generate `/blog/<slug>/`, prev/next, or RSS items (see `resolveWritingHref`).

## Pitfalls

- The homepage Writing section hides when zero public entries exist. That is intentional;
  do not add a fallback message or publish filler.
- External entries never get a local page — do not link to `/blog/<slug>` for them.
- Do not copy full external articles into the site; never attribute another author's
  post as the owner's writing (`relationship` must be honest).
- Use a real past `date` for local posts; future/dummy dates sort wrong.

## Verify

`pnpm run build` — check `/blog/`, `/blog/<slug>/` for local posts only, external cards
pointing at their HTTPS source, and `dist/rss.xml` containing local posts only.
