import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tech: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
          style: z.enum(['filled', 'tonal', 'outlined']).default('tonal'),
        })
      )
      .default([]),
    order: z.number().default(0),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  // icon 用 image():建置時自動壓縮成小尺寸 WebP
  // 圖放 src/assets/icons/,frontmatter 寫相對路徑 ../../assets/icons/xxx.png
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      org: z.string(),
      orgLink: z.string().url().optional(),
      start: z.coerce.string(),
      end: z.coerce.string().optional(),
      order: z.number().default(0),
      type: z.enum(['work', 'education', 'activity']).default('work'),
      icon: image().optional(),
    }),
});

export const collections = { projects, experience };
