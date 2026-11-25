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
  // Addresses from the previous (Duda) site that people or search engines may still follow.
  // GitHub Pages cannot send real redirects, so each of these is built as a small page that
  // forwards the visitor straight away. Folder addresses (/about-us, /contact-us,
  // /property-management) are handled by the index.html files under public/.
  redirects: {
    '/home': '/',
    '/property-management-cornwall-ontario-home': '/',
    '/cart': '/',
    '/property-management-cornwall-ont-about-us': '/about-us/cornwall-property-management',
    '/about-us/copy-of-about-us': '/about-us/cornwall-property-management',
    '/property-management-locations': '/about-us/cornwall-property-management',
    '/property-management-cornwall-ont-contact': '/contact-us/cornwall-property-management',
    '/property-managementy-location-cornwall-ontario-ont': '/contact-us/cornwall-property-management',
    '/contact': '/contact-us/cornwall-property-management',
    '/property-management-cornwall-ont-services-and-pricing': '/property-owners',
    '/property-management-owner': '/property-owners',
    '/property-management-acquisitions': '/property-owners',
    '/property-management-referrals': '/property-owners',
    '/property-management-agent': '/property-owners',
    '/cornwall-ont-propety-rental-listings': '/cornwall-rental-properties',
    '/property-management-renter': '/renters',
    '/cornwall-ont-property-maintenance-request': '/renters',
    '/residential-property-helpful-links': '/blog',
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
