// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.toppm.ca',
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    format: 'file',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname === '/' || url.pathname === '') {
          item.priority = 1.0;
        } else if (/^\/(property-owners|about-us|cornwall-rental-properties)$/.test(url.pathname) || url.pathname.startsWith('/about-us/')) {
          item.priority = 0.9;
        } else if (url.pathname === '/thank-you') {
          return undefined;
        }
        return item;
      },
    }),
  ],
});
