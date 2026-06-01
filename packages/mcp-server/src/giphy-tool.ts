// Giphy integration for the UnClick MCP server.
// Uses the Giphy REST API v1 via fetch - no external dependencies.
// Auth: an API key passed as the api_key query parameter from
// https://developers.giphy.com/dashboard/.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const GIPHY_BASE = "https://api.giphy.com/v1";
const GIPHY_SOURCE = "Giphy API v1";

function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("giphy", args);
}

async function giphyFetch<T>(key: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${GIPHY_BASE}${path}`);
  url.searchParams.set("api_key", key);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const GIPHY_TIMEOUT_MS = Number(process.env.GIPHY_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GIPHY_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Accept: "application/json" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Giphy request timed out after ${GIPHY_TIMEOUT_MS}ms.`);
    throw new Error(`Giphy network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Giphy rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const meta = data.meta as { msg?: string } | undefined;
    throw new Error(`Giphy error (${res.status}): ${meta?.msg ?? `status ${res.status}`}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: GIPHY_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function giphySearch(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const q = String(args.query ?? args.q ?? "").trim();
  if (!q) return { error: "query is required (what GIF to search for)." };
  const params: Record<string, string> = { q, limit: String(Math.min(50, Number(args.limit) || 10)) };
  if (args.rating) params.rating = String(args.rating);
  const data = await giphyFetch(key, "/gifs/search", params);
  return stamp(data, ["Use giphy_trending for what is hot now, or giphy_random for a single surprise GIF."]);
}

export async function giphyTrending(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const params: Record<string, string> = { limit: String(Math.min(50, Number(args.limit) || 10)) };
  if (args.rating) params.rating = String(args.rating);
  const data = await giphyFetch(key, "/gifs/trending", params);
  return stamp(data, ["Use giphy_search to find GIFs for a specific term."]);
}

export async function giphyRandom(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const params: Record<string, string> = {};
  if (args.tag) params.tag = String(args.tag);
  if (args.rating) params.rating = String(args.rating);
  const data = await giphyFetch(key, "/gifs/random", params);
  return stamp(data, ["Use giphy_search to choose from several matching GIFs instead."]);
}
