import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const listings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/listings' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      address: z.string(),
      neighbourhood: z.string().optional(),
      status: z.enum(['available', 'rented']),
      rent: z.number().optional(),
      rentNote: z.string().optional(),
      beds: z.number(),
      baths: z.number().optional(),
      propertyType: z.string().default('Apartment'),
      features: z.array(z.string()).default([]),
      photos: z.array(image()).default([]),
      photoAlts: z.array(z.string()).default([]),
      summary: z.string(),
      dateListed: z.coerce.date(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** If set, the post is served at this legacy path instead of /blog/<id> */
    legacyPath: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('TOP Property Management'),
    draft: z.boolean().default(false),
  }),
});

const areas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/areas' }),
  schema: z.object({
    name: z.string(),
    township: z.string().optional(),
    seoTitle: z.string(),
    description: z.string(),
    intro: z.string(),
    driveTime: z.string(),
    highlights: z.array(z.string()).default([]),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    order: z.number().default(50),
  }),
});

export const collections = { listings, blog, areas };
