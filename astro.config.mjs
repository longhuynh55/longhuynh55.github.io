// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Canonical links, sitemap.xml and absolute OG image URLs depend on it.
  site: 'https://longhuynh55.github.io',
  integrations: [sitemap()],
});
