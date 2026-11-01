import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One file per project in src/content/projects. A case study opens with the problem, your role,
// and the outcome, because that is what people read before deciding to read the rest.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      role: z.string(),
      problem: z.string(),
      outcome: z.string(),
      stack: z.array(z.string()).default([]),
      url: z.url().optional(),
      repo: z.url().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Drafts show while you run `bun run dev` and never in a build.
      draft: z.boolean().default(false),
    }),
});

// One file per piece in src/content/writing. Research is long and can hold charts; notes are short.
const writing = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    kind: z.enum(["research", "note"]),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

// One file per design piece in src/content/designs, with its image next to it. The Design page shows them big.
const designs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/designs" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      image: image(),
      alt: z.string(),
      tools: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, writing, designs };
