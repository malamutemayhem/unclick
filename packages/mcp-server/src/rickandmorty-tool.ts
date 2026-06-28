// Rick and Morty API - characters, episodes, and locations.
// No API key required - completely free and open.
// Base URL: https://rickandmortyapi.com/api/

import { stampMeta } from "./connector-meta.js";

const RAM_BASE = "https://rickandmortyapi.com/api";
const RAM_TIMEOUT_MS = Number(process.env.RAM_TIMEOUT_MS) || 10000;

async function ramFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RAM_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${RAM_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Rick and Morty API request timed out after ${RAM_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Rick and Morty API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Rick and Morty API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Rick and Morty API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

interface RamCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
}

interface RamEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

interface RamLocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

interface RamPage<T> {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: T[];
}

function normalizeCharacter(c: RamCharacter) {
  return {
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    type: c.type || null,
    gender: c.gender,
    origin: c.origin?.name ?? null,
    location: c.location?.name ?? null,
    image: c.image,
    episode_count: c.episode?.length ?? 0,
  };
}

export async function ramGetCharacter(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };
  try {
    const data = await ramFetch<RamCharacter>(`/character/${encodeURIComponent(id)}`);
    return stampMeta(normalizeCharacter(data), {
      source: "Rick and Morty API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use ram_search_characters to find more characters.", "Use ram_get_episode for episode details."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function ramSearchCharacters(args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  if (args.name) params.set("name", String(args.name));
  if (args.status) params.set("status", String(args.status));
  if (args.species) params.set("species", String(args.species));
  if (args.gender) params.set("gender", String(args.gender));
  if (args.page) params.set("page", String(args.page));
  try {
    const data = await ramFetch<RamPage<RamCharacter>>(`/character?${params}`);
    return stampMeta({
      count: data.info.count,
      pages: data.info.pages,
      characters: data.results.map(normalizeCharacter),
    }, {
      source: "Rick and Morty API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use ram_get_character with an id for full details."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function ramGetEpisode(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };
  try {
    const data = await ramFetch<RamEpisode>(`/episode/${encodeURIComponent(id)}`);
    return stampMeta({
      id: data.id,
      name: data.name,
      air_date: data.air_date,
      episode_code: data.episode,
      character_count: data.characters?.length ?? 0,
    }, {
      source: "Rick and Morty API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use ram_search_episodes to browse more episodes."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function ramSearchEpisodes(args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  if (args.name) params.set("name", String(args.name));
  if (args.episode_code) params.set("episode", String(args.episode_code));
  if (args.page) params.set("page", String(args.page));
  try {
    const data = await ramFetch<RamPage<RamEpisode>>(`/episode?${params}`);
    return stampMeta({
      count: data.info.count,
      pages: data.info.pages,
      episodes: data.results.map((e) => ({
        id: e.id,
        name: e.name,
        air_date: e.air_date,
        episode_code: e.episode,
        character_count: e.characters?.length ?? 0,
      })),
    }, {
      source: "Rick and Morty API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use ram_get_episode with an id for full details."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function ramGetLocation(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };
  try {
    const data = await ramFetch<RamLocation>(`/location/${encodeURIComponent(id)}`);
    return stampMeta({
      id: data.id,
      name: data.name,
      type: data.type,
      dimension: data.dimension,
      resident_count: data.residents?.length ?? 0,
    }, {
      source: "Rick and Morty API",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use ram_search_characters to find characters from this location."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
