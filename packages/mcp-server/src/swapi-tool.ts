// Star Wars API (SWAPI).
// No API key required - completely free and open.
// Base URL: https://swapi.dev/api/

import { stampMeta } from "./connector-meta.js";

const BASE = "https://swapi.dev/api";
const TIMEOUT_MS = Number(process.env.SWAPI_TIMEOUT_MS) || 10000;

async function swapiFetch<T>(path: string): Promise<T> {
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
      throw new Error(`SWAPI request timed out after ${TIMEOUT_MS}ms.`);
    }
    throw new Error(`SWAPI network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`SWAPI rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`SWAPI HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const META = { source: "swapi.dev" };

export async function swapiGetPerson(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "");
  if (!id) return { error: "id is required." };
  try {
    const data = await swapiFetch(`/people/${id}/`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use swapi_search_people to find characters by name."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function swapiSearchPeople(args: Record<string, unknown>): Promise<unknown> {
  const search = String(args.query ?? args.search ?? "");
  if (!search) return { error: "query is required." };
  try {
    const data = await swapiFetch(`/people/?search=${encodeURIComponent(search)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use swapi_get_person with an ID for full details."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function swapiGetPlanet(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "");
  if (!id) return { error: "id is required." };
  try {
    const data = await swapiFetch(`/planets/${id}/`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use swapi_search_planets to find planets by name."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function swapiSearchPlanets(args: Record<string, unknown>): Promise<unknown> {
  const search = String(args.query ?? args.search ?? "");
  if (!search) return { error: "query is required." };
  try {
    const data = await swapiFetch(`/planets/?search=${encodeURIComponent(search)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use swapi_get_planet with an ID for full details."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function swapiGetStarship(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "");
  if (!id) return { error: "id is required." };
  try {
    const data = await swapiFetch(`/starships/${id}/`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use swapi_search_starships to find starships by name."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function swapiSearchStarships(args: Record<string, unknown>): Promise<unknown> {
  const search = String(args.query ?? args.search ?? "");
  if (!search) return { error: "query is required." };
  try {
    const data = await swapiFetch(`/starships/?search=${encodeURIComponent(search)}`);
    return stampMeta(data, { ...META, fetched_at: new Date().toISOString(), next_steps: ["Use swapi_get_starship with an ID for full details."] });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
