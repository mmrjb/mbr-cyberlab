import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { youtubeId } from './lib/site';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string().min(5),
    description: z.string().min(20),
    category: z.enum(['Network', 'Cybersecurity', 'Linux', 'Windows']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    youtubeUrl: z.url().refine(value => youtubeId(value) !== null, 'Use a specific YouTube video URL').optional(),
    slides: z.string().regex(/^slides\/[a-z0-9-]+\.html$/).optional(),
    durationMinutes: z.number().int().positive().optional(),
    scriptRevision: z.number().int().positive().default(1),
  }).refine(data => data.draft || Boolean(data.youtubeUrl && data.slides && data.publishedAt), {
    message: 'Published lessons require youtubeUrl, slides, and publishedAt.',
  }),
});
export const collections = { lessons };
