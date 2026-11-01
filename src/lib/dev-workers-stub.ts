// Stands in for `cloudflare:workers` while `bun run dev` runs plain Astro (see astro.config.mjs).
// No bindings exist there, so the visitor counter answers 503 and the footer keeps its dash.
export const env = {} as Partial<Env>;
