/**
 * Dynamic sitemap generator - Vercel serverless function
 *
 * Route: GET /sitemap.xml (via vercel.json rewrite)
 *
 * Combines hardcoded static routes with live arena problems from Supabase.
 * Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
 * (Vercel edge caches for 1 hour, background-revalidates up to 24 h)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const BASE = "https://unclick.world";

// Static arena problem IDs (seeded in api/arena.ts PROBLEMS array)
const STATIC_ARENA_IDS = [
  "p_backoff", "p_chain_apis", "p_cron_overlap", "p_webhooks",
  "p_oauth_vs_apikeys", "p_react_rerenders", "p_monorepo", "p_ts_complex",
  "p_postgres_slow", "p_csv_commas", "p_anomaly", "p_lighthouse",
  "p_ai_search", "p_ratelimit", "p_timezones", "p_supabase_key",
  "p_mvs_security", "p_landing_page", "p_blog_signups", "p_burnout",
  "p_saas_pricing", "p_follow_up", "p_audience_first",
];

interface StaticRoute {
  path: string;
  changefreq: string;
  priority: string;
}

const STATIC_ROUTES: StaticRoute[] = [
  { path: "/",                    changefreq: "weekly",  priority: "1.0" },
  { path: "/tools",               changefreq: "weekly",  priority: "0.9" },
  { path: "/arena",               changefreq: "daily",   priority: "0.9" },
  { path: "/arena/leaderboard",   changefreq: "daily",   priority: "0.7" },
  { path: "/docs",                changefreq: "weekly",  priority: "0.9" },
  { path: "/pricing",             changefreq: "monthly", priority: "0.8" },
  { path: "/memory",              changefreq: "weekly",  priority: "0.8" },
  { path: "/backstagepass",       changefreq: "monthly", priority: "0.7" },
  { path: "/faq",                 changefreq: "monthly", priority: "0.7" },
  { path: "/developers",          changefreq: "weekly",  priority: "0.7" },
  { path: "/developers/docs",     changefreq: "weekly",  priority: "0.6" },
  { path: "/tools/link-in-bio",   changefreq: "weekly",  priority: "0.8" },
  { path: "/tools/scheduling",    changefreq: "weekly",  priority: "0.8" },
  { path: "/tools/solve",         changefreq: "weekly",  priority: "0.8" },
  { path: "/terms",               changefreq: "monthly", priority: "0.4" },
  { path: "/privacy",             changefreq: "monthly", priority: "0.4" },
];

function urlEntry(path: string, lastmod: string, changefreq: string, priority: string): string {
  return [
    "  <url>",
    `    <loc>${BASE}${path}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const today = new Date().toISOString().slice(0, 10);
  const entries: string[] = [];

  // Static marketing and product pages
  for (const r of STATIC_ROUTES) {
    entries.push(urlEntry(r.path, today, r.changefreq, r.priority));
  }

  // Static seeded arena problems (IDs hardcoded in api/arena.ts)
  for (const id of STATIC_ARENA_IDS) {
    entries.push(urlEntry(`/arena/${id}`, today, "daily", "0.6"));
  }

  // Dynamic: user-submitted arena problems from Supabase
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: problems } = await supabase
        .from("arena_problems")
        .select("id, created_at, updated_at")
        .eq("status", "active");

      for (const p of problems ?? []) {
        const lastmod = ((p.updated_at ?? p.created_at ?? today) as string).slice(0, 10);
        entries.push(urlEntry(`/arena/${p.id}`, lastmod, "daily", "0.6"));
      }
    } catch {
      // Supabase unavailable - static entries still render fine
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(xml);
}
