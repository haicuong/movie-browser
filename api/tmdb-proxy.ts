import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_PATH = /^\/(movie|trending|search)(\/[A-Za-z0-9_-]+)*$/;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TMDB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "Server is missing TMDB_TOKEN" });
  }

  const { path, ...rest } = req.query;
  if (typeof path !== "string" || !ALLOWED_PATH.test(path)) {
    return res.status(400).json({ error: "Invalid path" });
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(rest)) {
    if (typeof value === "string") params.set(key, value);
  }

  try {
    const upstream = await fetch(
      `https://api.themoviedb.org/3${path}?${params}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const body = await upstream.json().catch(() => null);
    return res.status(upstream.status).json(body);
  } catch {
    return res.status(502).json({ error: "Upstream request failed" });
  }
}
