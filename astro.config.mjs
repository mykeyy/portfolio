// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";

// Cloudflare's local runtime (workerd) can't be started from Bun on Windows, so `bun run dev` runs plain Astro.
// Every page works the same; only the visitor counter (a Worker route) is missing and shows a dash.
// Builds always use the Cloudflare adapter.
const devOnBun = Boolean(process.versions.bun) && process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
  site: "https://myky.cc",
  // Every page is prerendered to static HTML. Only routes that opt out with `export const prerender = false`
  // (the visitor counter) run as a Worker, so almost every request is a free static asset hit.
  adapter: devOnBun
    ? undefined
    : cloudflare({
        // Images are resized once at build time, so nothing is billed per transform at runtime.
        imageService: "compile",
        // Static pages are rendered in the build process rather than in workerd, for the same Bun reason.
        prerenderEnvironment: "node",
      }),
  vite: devOnBun
    ? { resolve: { alias: { "cloudflare:workers": fileURLToPath(new URL("./src/lib/dev-workers-stub.ts", import.meta.url)) } } }
    : {},
  // No logins or carts, so no sessions: this stops the adapter from creating a KV store on deploy.
  session: false,
  // Astro's floating dev toolbar sits on top of the design while you judge it; turn it back on here if you want it.
  devToolbar: { enabled: false },
  integrations: [mdx()],
  markdown: {
    // Code blocks are set in the site's two colors, so no syntax theme paints them.
    syntaxHighlight: false,
  },
});
