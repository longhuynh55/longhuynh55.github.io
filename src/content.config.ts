import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { isValidExternalUrl } from './lib/content';

// New entries default to draft; every migrated old entry carries an explicit
// draft decision (see CONTENT_INVENTORY.md). Draft schemas allow incomplete
// metadata; `draft: false` requires the public fields per kind (superRefine).
// credentialUrl accepts http(s) or a site-relative asset path (local PDF scan).
const credentialLink = z
  .string()
  .refine((value) => isValidExternalUrl(value) || value.startsWith('/'), {
    message: 'credentialUrl must be http(s) or a site-relative path',
  })
  .optional();
const httpUrl = (message: string) =>
  z
    .string()
    .refine((value) => isValidExternalUrl(value), { message })
    .optional();

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z
      .object({
        draft: z.boolean().default(true),
        title: z.string(),
        description: z.string(),
        // Lab state — required when public; targets are not observed outcomes.
        status: z.enum(['idea', 'exploring', 'prototype', 'released']).optional(),
        hypothesis: z.string().optional(),
        nextStep: z.string().optional(),
        targetOutcome: z.string().optional(),
        // Observed result — only when the inventory records support.
        outcome: z.string().optional(),
        evidence: z.array(z.object({ label: z.string(), url: z.string().refine((value) => isValidExternalUrl(value), { message: 'evidence.url must be http(s)' }) })).default([]),
        relatedWritingIds: z.array(z.string()).default([]),
        date: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        featured: z.boolean().default(false),
        sortOrder: z.number().optional(),
        image: image().optional(),
        github: z.string().optional(),
        demo: z.string().optional(),
        tags: z.array(z.string()).default([]),
      })
      .superRefine((val, ctx) => {
        if (val.draft === false) {
          if (!val.status) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['status'], message: 'status is required when public' });
          }
          if (!val.updatedAt) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['updatedAt'], message: 'updatedAt is required when public' });
          }
          if (val.status === 'released' && val.evidence.length === 0) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['evidence'], message: 'released requires a real available artifact in evidence' });
          }
        }
      }),
});

const researchAuthor = z.object({ name: z.string(), role: z.string().optional() });

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: ({ image }) =>
    z
      .object({
        draft: z.boolean().default(true),
        title: z.string(),
        authors: z.array(researchAuthor).default([]),
        venue: z.string().optional(),
        // Review and publication state are independent; preprint is optional.
        reviewStatus: z.enum(['unsubmitted', 'submitted', 'accepted']).optional(),
        publicationStatus: z.enum(['unpublished', 'published']).optional(),
        preprintUrl: httpUrl('preprintUrl must be http(s)'),
        publishedAt: z.coerce.date().optional(),
        eventDate: z.coerce.date().optional(),
        updatedAt: z.coerce.date().optional(),
        summary: z.string().optional(),
        researchQuestion: z.string().optional(),
        contribution: z.string().optional(),
        limitations: z.string().optional(),
        paperUrl: httpUrl('paperUrl must be http(s)'),
        codeUrl: httpUrl('codeUrl must be http(s)'),
        slidesUrl: httpUrl('slidesUrl must be http(s)'),
        behindPost: z.string().optional(),
        cover: image().optional(),
        featured: z.boolean().default(false),
        sortOrder: z.number().optional(),
      })
      .superRefine((val, ctx) => {
        if (val.draft === false) {
          if (val.authors.length === 0) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['authors'], message: 'authors are required when public' });
          }
          if (!val.venue) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['venue'], message: 'venue is required when public' });
          }
          if (!val.reviewStatus) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['reviewStatus'], message: 'reviewStatus is required when public' });
          }
          if (!val.publicationStatus) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['publicationStatus'], message: 'publicationStatus is required when public' });
          }
          if (!val.summary) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['summary'], message: 'summary is required when public' });
          }
        }
      }),
});

const blogBase = {
  draft: z.boolean().default(true),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  cover: z.string().optional(),
  sortOrder: z.number().optional(),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.discriminatedUnion('kind', [
    z.object({
      ...blogBase,
      kind: z.literal('local'),
      date: z.coerce.date(),
    }),
    z.object({
      ...blogBase,
      kind: z.literal('external'),
      // Source publication date when known; omitted (never bookmark time) when unknown.
      date: z.coerce.date().optional(),
      externalUrl: z.string().refine((value) => isValidExternalUrl(value), { message: 'externalUrl must be http(s)' }),
      publisher: z.string(),
      author: z.string(),
      relationship: z.enum(['authored', 'recommended']),
    }),
  ]),
});

// Competitions only — the paper moved to the research collection (R04).
const achievements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/achievements' }),
  schema: ({ image }) =>
    z
      .object({
        draft: z.boolean().default(true),
        kind: z.literal('competition'),
        title: z.string(),
        date: z.coerce.date().optional(),
        year: z.number().optional(),
        description: z.string(),
        rank: z.string(),
        event: z.string(),
        organizer: z.string().optional(),
        teamAward: z.boolean().default(false),
        certificate: image().optional(),
        credentialUrl: credentialLink,
        featured: z.boolean().default(false),
        sortOrder: z.number().optional(),
      })
      .superRefine((val, ctx) => {
        if (val.draft === false && val.date == null && val.year == null) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['date'], message: 'date or year is required when public' });
        }
      }),
});

const certificates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certificates' }),
  schema: z
    .object({
      draft: z.boolean().default(true),
      title: z.string(),
      issuer: z.string(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      credentialUrl: credentialLink,
      featured: z.boolean().default(false),
      sortOrder: z.number().optional(),
    })
    .superRefine((val, ctx) => {
      if (val.draft === false && !val.date) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['date'], message: 'date is required when public' });
      }
    }),
});

export const collections = { projects, research, certificates, achievements, blog };
