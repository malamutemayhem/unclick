// Unsplash integration for the UnClick MCP server.
// Uses the Unsplash REST API via fetch - no external dependencies.
// Auth: an Access Key sent as "Authorization: Client-ID <key>" from a registered
// app at https://unsplash.com/oauth/applications.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const UNSPLASH_BASE = "https://api.unsplash.com";
const UNSPLASH_SOURCE = "Unsplash API";

function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("unsplash", args);
}

async function usFetch<T>(key: string, path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${UNSPLASH_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const UNSPLASH_TIMEOUT_MS = Number(process.env.UNSPLASH_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UNSPLASH_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), { headers: { Authorization: `Client-ID ${key}`, "Accept-Version": "v1" }, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw new Error(`Unsplash request timed out after ${UNSPLASH_TIMEOUT_MS}ms.`);
    throw new Error(`Unsplash network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) throw new Error("Unsplash rate limit reached (HTTP 429). Please wait and retry.");
  const data = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) {
    const errs = (data.errors as string[] | undefined)?.join(", ");
    throw new Error(`Unsplash error (${res.status}): ${errs ?? `status ${res.status}`}`);
  }
  return data as T;
}

function stamp(result: unknown, nextSteps: string[]): Record<string, unknown> {
  return stampMeta(result, { source: UNSPLASH_SOURCE, fetched_at: new Date().toISOString(), next_steps: nextSteps });
}

export async function unsplashSearchPhotos(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required (what to search for)." };
  const params: Record<string, string> = { query, per_page: String(Math.min(30, Number(args.per_page) || 10)) };
  if (args.orientation) params.orientation = String(args.orientation);
  const data = await usFetch(key, "/search/photos", params);
  return stamp(data, ["Use unsplash_get_photo with a returned id for the full-size URLs and attribution."]);
}

export async function unsplashGetPhoto(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const id = String(args.photo_id ?? "").trim();
  if (!id) return { error: "photo_id is required." };
  const data = await usFetch(key, `/photos/${encodeURIComponent(id)}`);
  return stamp(data, ["Credit the photographer using the returned user.name and links.html (Unsplash guideline)."]);
}

export async function unsplashRandomPhoto(args: Record<string, unknown>): Promise<unknown> {
  const key = requireKey(args);
  if (typeof key !== "string") return key;
  const params: Record<string, string> = {};
  if (args.query) params.query = String(args.query);
  if (args.orientation) params.orientation = String(args.orientation);
  const data = await usFetch(key, "/photos/random", params);
  return stamp(data, ["Use unsplash_search_photos to pick from a set instead of a random one."]);
}
