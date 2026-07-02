// Spaceflight News API - space news articles and launches.
// No API key required - completely free and open.
// Base URL: https://api.spaceflightnewsapi.net/v4/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.spaceflightnewsapi.net/v4";
const TIMEOUT_MS = Number(process.env.SPACEFLIGHT_TIMEOUT_MS) || 10000;

async function sfFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Spaceflight News request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Spaceflight News network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Spaceflight News rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Spaceflight News HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "spaceflightnewsapi.net" };

export async function spaceflightArticles(args: Record<string, unknown>): Promise<unknown> {
  const limit = Math.min(Number(args.limit ?? 10), 20);
  const search = args.search ? `&search=${encodeURIComponent(String(args.search))}` : "";
  try {
    const data = await sfFetch(`/articles/?limit=${limit}${search}&ordering=-published_at`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use spaceflight_blogs for blog posts.", "Use spaceflight_reports for technical reports."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function spaceflightBlogs(args: Record<string, unknown>): Promise<unknown> {
  const limit = Math.min(Number(args.limit ?? 10), 20);
  const search = args.search ? `&search=${encodeURIComponent(String(args.search))}` : "";
  try {
    const data = await sfFetch(`/blogs/?limit=${limit}${search}&ordering=-published_at`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use spaceflight_articles for news articles."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function spaceflightReports(args: Record<string, unknown>): Promise<unknown> {
  const limit = Math.min(Number(args.limit ?? 10), 20);
  try {
    const data = await sfFetch(`/reports/?limit=${limit}&ordering=-published_at`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use spaceflight_articles for general news."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
