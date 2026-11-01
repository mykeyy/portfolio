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

// One file per design piece in src/content/designs, with its images next to it. The site stays two colors; each
// piece sits on its own plate, in a color you pick from the work, and is shown the way its discipline expects:
// websites in a browser frame, logos as a specimen, everything else as is.
const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex color, like #e9e7e1");
const designs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/designs" }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        date: z.coerce.date(),
        /** web: screenshot in a browser frame. logo: specimen. visual: the image as is. */
        kind: z.enum(["web", "logo", "visual"]).default("visual"),
        /** full: the whole column. half: one of two side by side (from tablet width up). */
        size: z.enum(["full", "half"]).default("full"),
        /** The color the work sits on. The page takes on this color while the piece is in view. */
        plate: hex,
        image: image().optional(),
        alt: z.string(),
        /** web: the address shown in the browser bar */
        url: z.url().optional(),
        /** logo: the mark, an optional inverse version, its colors, and its typeface */
        mark: image().optional(),
        markInverse: image().optional(),
        colors: z.array(z.object({ name: z.string(), hex })).default([]),
        typeface: z.string().optional(),
        tools: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
      })
      .refine((d) => (d.kind === "logo" ? Boolean(d.mark) : Boolean(d.image)), {
        message: "A logo needs `mark`; web and visual pieces need `image`.",
      }),
});

export const collections = { projects, writing, designs };
