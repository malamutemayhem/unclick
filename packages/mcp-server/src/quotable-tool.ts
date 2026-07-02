// Quotable API - inspirational quotes.
// No API key required - completely free and open.
// Base URL: https://api.quotable.io

import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.quotable.io";
const TIMEOUT_MS = Number(process.env.QUOTABLE_TIMEOUT_MS) || 10000;

async function quoteFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Quotable request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Quotable network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Quotable rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Quotable HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "quotable.io" };

export async function quoteRandom(args: Record<string, unknown>): Promise<unknown> {
  const tags = args.tags ? String(args.tags) : "";
  try {
    let path = "/quotes/random";
    if (tags) path += `?tags=${encodeURIComponent(tags)}`;
    const data = await quoteFetch(path);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use quote_search to find quotes by keyword.", "Use quote_list_tags to browse categories."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function quoteSearch(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "");
  if (!query) return { error: "query is required." };
  const limit = Number(args.limit ?? 10);
  try {
    const data = await quoteFetch(`/search/quotes?query=${encodeURIComponent(query)}&limit=${limit}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use quote_random for a random quote."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function quoteByAuthor(args: Record<string, unknown>): Promise<unknown> {
  const author = String(args.author ?? args.slug ?? "");
  if (!author) return { error: "author is required." };
  const limit = Number(args.limit ?? 10);
  try {
    const data = await quoteFetch(`/quotes?author=${encodeURIComponent(author)}&limit=${limit}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use quote_list_authors to browse all authors."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function quoteListTags(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await quoteFetch("/tags");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use quote_random with a tag to get a themed quote."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function quoteListAuthors(args: Record<string, unknown>): Promise<unknown> {
  const limit = Number(args.limit ?? 20);
  try {
    const data = await quoteFetch(`/authors?limit=${limit}&sortBy=quoteCount&order=desc`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use quote_by_author with a slug to see their quotes."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
