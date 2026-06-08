import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://api.punkapi.com/v2";
const TIMEOUT_MS = 10_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      signal: ac.signal,
    });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function punkApiRandomBeer(_args: Record<string, unknown>) {
  const data = await fetchJson(`${BASE}/beers/random`);
  if (data && typeof data === "object" && "error" in data) return data;
  const beers = Array.isArray(data) ? data : [data];
  return stampMeta({ beer: beers[0] }, { source: "punkapi.com", fetched_at: new Date().toISOString(), next_steps: ["Use punkapi_search_beers to find beers by name."] });
}

export async function punkApiSearchBeers(args: Record<string, unknown>) {
  const query = String(args.query ?? "").trim();
  const params = new URLSearchParams();
  if (query) params.set("beer_name", query);
  params.set("per_page", String(Math.min(Number(args.per_page) || 10, 25)));
  params.set("page", String(Number(args.page) || 1));
  const data = await fetchJson(`${BASE}/beers?${params}`);
  if (data && typeof data === "object" && "error" in data) return data;
  const beers = Array.isArray(data) ? data : [];
  return stampMeta({ beers, count: beers.length }, { source: "punkapi.com", fetched_at: new Date().toISOString(), next_steps: ["Use punkapi_search_beers to find beers by name."] });
}

export async function punkApiGetBeer(args: Record<string, unknown>) {
  const id = Number(args.id);
  if (!id) return { error: "id is required (numeric beer ID)." };
  const data = await fetchJson(`${BASE}/beers/${id}`);
  if (data && typeof data === "object" && "error" in data) return data;
  const beers = Array.isArray(data) ? data : [data];
  return stampMeta({ beer: beers[0] }, { source: "punkapi.com", fetched_at: new Date().toISOString(), next_steps: ["Use punkapi_search_beers to find beers by name."] });
}
