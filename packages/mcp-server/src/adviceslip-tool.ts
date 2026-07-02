// Advice Slip API.
// No API key required - completely free and open.
// Base URL: https://api.adviceslip.com/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://api.adviceslip.com";
const TIMEOUT_MS = Number(process.env.ADVICESLIP_TIMEOUT_MS) || 10000;

async function adviceFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Advice Slip request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Advice Slip network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Advice Slip rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Advice Slip HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "adviceslip.com" };

export async function adviceRandom(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await adviceFetch<{ slip: { id: number; advice: string } }>("/advice");
    return stampMeta(data.slip, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use advice_search to find advice on a specific topic."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function adviceSearch(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "");
  if (!query) return { error: "query is required." };
  try {
    const data = await adviceFetch(`/advice/search/${encodeURIComponent(query)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use advice_random for a random piece of advice."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function adviceById(args: Record<string, unknown>): Promise<unknown> {
  const id = Number(args.id ?? 0);
  if (!id) return { error: "id is required (positive integer)." };
  try {
    const data = await adviceFetch<{ slip: { id: number; advice: string } }>(`/advice/${id}`);
    return stampMeta(data.slip, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use advice_random for a random piece of advice."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
