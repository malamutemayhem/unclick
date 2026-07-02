// Bible API - bible verses and passages.
// No API key required - completely free and open.
// Base URL: https://bible-api.com/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://bible-api.com";
const TIMEOUT_MS = Number(process.env.BIBLE_TIMEOUT_MS) || 10000;

async function bibleFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Bible API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Bible API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Bible API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Bible API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "bible-api.com" };

export async function bibleVerse(args: Record<string, unknown>): Promise<unknown> {
  const ref = String(args.reference ?? args.verse ?? "");
  if (!ref) return { error: "reference is required (e.g. 'John 3:16', 'Psalm 23', 'Romans 8:28-30')." };
  try {
    const data = await bibleFetch(`/${encodeURIComponent(ref)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use bible_random for a random verse."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function bibleRandom(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await bibleFetch("/?random=verse");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use bible_verse with a reference for a specific passage."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
