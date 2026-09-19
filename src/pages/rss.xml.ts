import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config';
import { contentDate, sortSelected } from '../lib/content';

export async function GET(context: APIContext) {
  // Local public posts only — external entries are outbound links, never feed items.
  const posts = sortSelected(await getCollection('blog'), contentDate.blog).filter(
    (p) => p.data.kind === 'local'
  );
  return rss({
    title: `${site.name} — Writing`,
    description: site.bio,
    // context.site comes from `site` in astro.config.mjs.
    site: context.site ?? 'https://longhuynh55.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.kind === 'local' ? post.data.date : new Date(0),
      link: `/blog/${post.id}/`,
    })),
  });
}
