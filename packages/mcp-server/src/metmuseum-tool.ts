// Metropolitan Museum of Art API - search artworks and view details.
// No API key required - completely free and open.
// Base URL: https://collectionapi.metmuseum.org/public/collection/v1/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://collectionapi.metmuseum.org/public/collection/v1";
const TIMEOUT_MS = Number(process.env.METMUSEUM_TIMEOUT_MS) || 12000;

async function metFetch<T>(path: string): Promise<T> {
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
      throw new Error(`Met Museum API request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`Met Museum API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Met Museum API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Met Museum API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "metmuseum.org" };

export async function metSearch(args: Record<string, unknown>): Promise<unknown> {
  const q = String(args.query ?? args.q ?? "");
  if (!q) return { error: "query is required." };
  const hasImages = args.hasImages !== false;
  try {
    const data = await metFetch<{ total: number; objectIDs: number[] }>(`/search?q=${encodeURIComponent(q)}&hasImages=${hasImages}`);
    const ids = data.objectIDs?.slice(0, 20) ?? [];
    return stampMeta({ total: data.total ?? 0, objectIDs: ids }, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use met_object with an objectID to see full artwork details.", "Results are object IDs; fetch each with met_object."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function metObject(args: Record<string, unknown>): Promise<unknown> {
  const id = Number(args.objectID ?? args.id ?? 0);
  if (!id) return { error: "objectID is required (get it from met_search)." };
  try {
    const data = await metFetch(`/objects/${id}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use met_search to find more artworks.", "Use met_departments to browse by department."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function metDepartments(_args: Record<string, unknown>): Promise<unknown> {
  try {
    const data = await metFetch("/departments");
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use met_search with a query to find artworks."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
