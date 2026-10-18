# toppm.ca — TOP Property Management website

Marketing website for TOP Property Management, Cornwall, Ontario. Built with [Astro](https://astro.build) as a fully static site and deployed to GitHub Pages at **https://www.toppm.ca**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/ and generates Open Graph images
npm run preview    # serve the production build locally
npm run check      # type-check Astro files
```

Requires Node 22.22 or newer.

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/site.ts` | Business details, phone, email, pricing, services, testimonials, partners, nav. Edit here and every page updates. |
| `src/content/listings/*.md` | Rental listings (one file per unit). |
| `src/content/blog/*.md` | Blog posts and guides. |
| `src/content/areas/*.md` | Service-area pages (`/property-management/<slug>`). |
| `src/pages/` | Page routes. File paths mirror the live URLs. |
| `src/components/` | Reusable sections (contact form, pricing table, FAQ, listing cards, SEO head). |
| `src/assets/photos/` | Photos (see `CREDITS.md`). Listing photos live under `listings/`. |
| `src/assets/brand/` | Logo SVGs. |
| `public/` | Static files copied as-is: favicons, `robots.txt`, `CNAME`, web manifest. |
| `scripts/generate-og.mjs` | Builds a 1200×630 social-share image for every page after `astro build`. |

## Everyday tasks

### Add or update a rental listing

1. Create `src/content/listings/<slug>.md` (the slug becomes the URL `/cornwall-rental-properties/<slug>`).
2. Put photos in `src/assets/photos/listings/<slug>/` and list them in `photos:` (first photo is the cover).
3. Fill in the frontmatter:

```yaml
---
title: Bright 2-Bedroom Apartment
address: 123 Example Street, Cornwall, ON
neighbourhood: East end            # optional
status: available                  # available | rented
rent: 1650                         # optional, number
rentNote: Heat and water included  # optional
beds: 2
baths: 1                           # optional
propertyType: Apartment
dateListed: 2026-11-01
summary: One-sentence description shown on cards and in search results.
features:
  - Parking for one car
  - In-unit laundry
photos:
  - ../../assets/photos/listings/example-street/photo-1.jpg
photoAlts:
  - Living room with large windows
---
Longer description in Markdown goes here.
```

4. When the unit is rented, change `status: rented`. It moves to the "Recently rented" section automatically.

### Add a blog post

Create `src/content/blog/<slug>.md` with `title`, `description`, `pubDate` and optional `tags`. It is published at `/blog/<slug>`. (The N4 guide uses `legacyPath` to keep its original URL; new posts should not set it.)

### Add a service-area page

Create `src/content/areas/<slug>.md` following an existing file. Write at least 150 words of copy specific to that town so the page is not thin or duplicate content.

### Connect the contact form (Formspree)

1. Create a form at https://formspree.io and copy the form ID from the endpoint URL (`https://formspree.io/f/<ID>`).
2. In `src/data/site.ts`, replace `YOUR_FORMSPREE_ID` with that ID.
3. In the Formspree dashboard, set the notification email to `rentals@toppm.ca` and, optionally, restrict allowed domains to `www.toppm.ca`.

Until the ID is set, the form shows a message asking visitors to email or call instead.

### Google Analytics

The GA4 measurement ID is in `src/data/site.ts` (`gaId`). Set it to an empty string to disable analytics.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

One-time repository setup:

1. **Settings → Pages**: set *Source* to **GitHub Actions**.
2. **Settings → Pages → Custom domain**: enter `www.toppm.ca` and save. (`public/CNAME` already contains it.)
3. Tick **Enforce HTTPS** once the certificate is issued (can take up to an hour after DNS resolves).

### DNS cut-over from the old host

At the domain registrar / DNS provider for `toppm.ca`:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `<github-username>.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Recommended order:

1. Lower the TTL on the existing records to 300 seconds a day before switching.
2. Push the site and confirm the GitHub Pages build is green.
3. Add the records above. Remove any old A/CNAME records pointing at the previous host.
4. In GitHub **Settings → Pages**, confirm the custom domain shows a green check, then enable *Enforce HTTPS*.
5. Verify `https://www.toppm.ca` and `https://toppm.ca` (the apex redirects to `www`).
6. In Google Search Console, submit `https://www.toppm.ca/sitemap-index.xml` and request indexing for the main pages.
7. Keep the old hosting account active for a week, then cancel.

All URLs from the previous site are preserved, so no redirects are needed.

## SEO notes

- Every page has a unique title, meta description and canonical URL.
- Structured data: `LocalBusiness`, `WebSite`, `BreadcrumbList` on all pages; `FAQPage`, `Service`, `Article` and `Apartment` where relevant.
- `sitemap-index.xml` is generated at build and referenced from `robots.txt`.
- Social share images are generated per page into `dist/og/`.
