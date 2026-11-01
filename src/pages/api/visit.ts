// Unique-visitor counter, carried over from the coming-soon page.
// POST adds one to the total and returns the new count. GET returns the current count.
// The footer calls POST once per browser (see Footer.astro), so each browser counts once.
// Needs the D1 database bound as DB in wrangler.jsonc, with the table from schema.sql.
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const unavailable = () => json({ error: "The visitor counter has no database here." }, 503);

export const GET: APIRoute = async () => {
  if (!env.DB) return unavailable();
  const row = await env.DB.prepare("SELECT n FROM counter WHERE id = 1").first<{ n: number }>();
  return json({ count: row ? row.n : 0 });
};

export const POST: APIRoute = async () => {
  if (!env.DB) return unavailable();
  const row = await env.DB.prepare("UPDATE counter SET n = n + 1 WHERE id = 1 RETURNING n").first<{ n: number }>();
  return json({ count: row ? row.n : 0 });
};
