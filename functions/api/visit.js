// Unique-visitor counter for Cloudflare Pages.
// POST adds one to the total and returns the new count. GET returns the current count.
// The page calls POST once per browser (see index.html), so each browser counts once.
// Needs a D1 database bound as DB, with the table created from schema.sql.

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

export async function onRequest({ request, env }) {
  if (request.method === "POST") {
    const row = await env.DB.prepare("UPDATE counter SET n = n + 1 WHERE id = 1 RETURNING n").first();
    return json({ count: row.n });
  }

  if (request.method === "GET") {
    const row = await env.DB.prepare("SELECT n FROM counter WHERE id = 1").first();
    return json({ count: row ? row.n : 0 });
  }

  return json({ error: "Method not allowed" }, 405);
}
