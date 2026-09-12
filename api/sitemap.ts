/**
 * Dynamic sitemap generator - Vercel serverless function
 *
 * Route: GET /sitemap.xml (via vercel.json rewrite)
 *
 * Lists the live public marketing routes. Arena routes are intentionally
 * absent while Arena is hidden (src/App.tsx redirects every /arena* URL
 * home); restore the arena blocks from git history when Arena returns.
 * Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
 * (Vercel edge caches for 1 hour, background-revalidates up to 24 h)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

const BASE = "https://unclick.world";

interface StaticRoute {
  path: string;
  changefreq: string;
  priority: string;
}

// Keep in sync with the public routes in src/App.tsx. Auth-gated (/admin),
// redirecting, and noindex design-lane routes do not belong here.
const STATIC_ROUTES: StaticRoute[] = [
  { path: "/",                    changefreq: "weekly",  priority: "1.0" },
  { path: "/apps",                changefreq: "weekly",  priority: "0.9" },
  { path: "/tools",               changefreq: "weekly",  priority: "0.9" },
  { path: "/why",                 changefreq: "monthly", priority: "0.8" },
  { path: "/docs",                changefreq: "weekly",  priority: "0.9" },
  { path: "/pricing",             changefreq: "monthly", priority: "0.8" },
  { path: "/memory",              changefreq: "weekly",  priority: "0.8" },
  { path: "/xpass",               changefreq: "weekly",  priority: "0.8" },
  { path: "/crews",               changefreq: "monthly", priority: "0.7" },
  { path: "/browser",             changefreq: "monthly", priority: "0.7" },
  { path: "/autopilot",           changefreq: "monthly", priority: "0.7" },
  { path: "/skills",              changefreq: "monthly", priority: "0.6" },
  { path: "/orchestrator",        changefreq: "monthly", priority: "0.6" },
  { path: "/passport",            changefreq: "monthly", priority: "0.6" },
  { path: "/seats",               changefreq: "monthly", priority: "0.6" },
  { path: "/xgate",               changefreq: "monthly", priority: "0.6" },
  { path: "/jobs",                changefreq: "monthly", priority: "0.6" },
  { path: "/control-tower",       changefreq: "monthly", priority: "0.6" },
  { path: "/ledger",              changefreq: "monthly", priority: "0.6" },
  { path: "/workers",             changefreq: "monthly", priority: "0.6" },
  { path: "/jobsmith",            changefreq: "monthly", priority: "0.6" },
  { path: "/new-to-ai",           changefreq: "monthly", priority: "0.6" },
  { path: "/smarthome",           changefreq: "monthly", priority: "0.6" },
  { path: "/dogfood",             changefreq: "weekly",  priority: "0.6" },
  { path: "/faq",                 changefreq: "monthly", priority: "0.7" },
  { path: "/developers",          changefreq: "weekly",  priority: "0.7" },
  { path: "/developers/docs",     changefreq: "weekly",  priority: "0.6" },
  { path: "/developers/vibe-coding", changefreq: "monthly", priority: "0.5" },
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

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  return res.status(200).send(xml);
}
