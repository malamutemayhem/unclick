// Open Brewery DB - search and browse breweries.
// No API key required - completely free and open.
// Base URL: https://api.openbrewerydb.org/v1/

import { stampMeta } from "./connector-meta.js";

const BREWERY_BASE = "https://api.openbrewerydb.org/v1";
const BREWERY_TIMEOUT_MS = Number(process.env.BREWERY_TIMEOUT_MS) || 10000;

async function breweryFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BREWERY_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${BREWERY_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Open Brewery DB request timed out after ${BREWERY_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Open Brewery DB network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Open Brewery DB rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Open Brewery DB HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

interface RawBrewery {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string | null;
  city: string | null;
  state_province: string | null;
  country: string | null;
  phone: string | null;
  website_url: string | null;
  latitude: string | null;
  longitude: string | null;
}

function normalizeBrewery(b: RawBrewery) {
  return {
    id: b.id,
    name: b.name,
    brewery_type: b.brewery_type,
    address: b.address_1 ?? null,
    city: b.city ?? null,
    state: b.state_province ?? null,
    country: b.country ?? null,
    phone: b.phone ?? null,
    website_url: b.website_url ?? null,
    latitude: b.latitude ? Number(b.latitude) : null,
    longitude: b.longitude ? Number(b.longitude) : null,
  };
}

export async function brewerySearch(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required." };
  const perPage = Math.min(50, Math.max(1, Number(args.per_page ?? 10)));
  try {
    const data = await breweryFetch<RawBrewery[]>(`/breweries/search?query=${encodeURIComponent(query)}&per_page=${perPage}`);
    return stampMeta({
      query,
      count: data.length,
      breweries: data.map(normalizeBrewery),
    }, {
      source: "Open Brewery DB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use brewery_get with an id for full details."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function breweryGet(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };
  try {
    const data = await breweryFetch<RawBrewery>(`/breweries/${encodeURIComponent(id)}`);
    return stampMeta(normalizeBrewery(data), {
      source: "Open Brewery DB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use brewery_search to find more breweries.", "Use brewery_list to browse by city or state."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function breweryList(args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  if (args.city) params.set("by_city", String(args.city));
  if (args.state) params.set("by_state", String(args.state));
  if (args.type) params.set("by_type", String(args.type));
  const perPage = Math.min(50, Math.max(1, Number(args.per_page ?? 10)));
  params.set("per_page", String(perPage));
  if (args.page) params.set("page", String(args.page));
  try {
    const data = await breweryFetch<RawBrewery[]>(`/breweries?${params}`);
    return stampMeta({
      count: data.length,
      breweries: data.map(normalizeBrewery),
    }, {
      source: "Open Brewery DB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use brewery_get with an id for full details."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function breweryRandom(args: Record<string, unknown>): Promise<unknown> {
  const size = Math.min(50, Math.max(1, Number(args.size ?? 1)));
  try {
    const data = await breweryFetch<RawBrewery[]>(`/breweries/random?size=${size}`);
    return stampMeta({
      count: data.length,
      breweries: data.map(normalizeBrewery),
    }, {
      source: "Open Brewery DB",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use brewery_get with an id for full details."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
