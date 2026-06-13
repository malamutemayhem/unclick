// PokeAPI Pokemon data.
// No API key required - completely free and open.
// Base URL: https://pokeapi.co/api/v2/

import { stampMeta } from "./connector-meta.js";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";
const POKEAPI_TIMEOUT_MS = Number(process.env.POKEAPI_TIMEOUT_MS) || 10000;

async function pokeFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), POKEAPI_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${POKEAPI_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`PokeAPI request timed out after ${POKEAPI_TIMEOUT_MS}ms.`);
    }
    throw new Error(`PokeAPI network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`PokeAPI rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`PokeAPI HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

// ─── Raw API response shapes ────────────────────────────────────────────────

interface RawPokemon {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  stats: Array<{ stat: { name: string }; base_stat: number }>;
  abilities: Array<{ ability: { name: string } }>;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
}

interface RawPaginatedList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

interface RawType {
  id: number;
  name: string;
  damage_relations: Record<string, unknown>;
  pokemon: Array<{ pokemon: { name: string; url: string } }>;
}

interface RawAbility {
  id: number;
  name: string;
  effect_entries: Array<{ effect: string; short_effect: string; language: { name: string } }>;
  pokemon: Array<{ pokemon: { name: string; url: string } }>;
}

interface RawGeneration {
  id: number;
  name: string;
  main_region: { name: string };
  pokemon_species: Array<{ name: string; url: string }>;
}

// ─── poke_get_pokemon ────────────────────────────────────────────────────────
// GET /pokemon/{name_or_id}

export async function pokeGetPokemon(args: Record<string, unknown>): Promise<unknown> {
  const name = String(args.name ?? "").trim().toLowerCase();
  if (!name) return { error: "name is required (pokemon name or id, e.g. pikachu or 25)." };

  try {
    const data = await pokeFetch<RawPokemon>(`/pokemon/${encodeURIComponent(name)}`);

    return stampMeta({
      id: data.id,
      name: data.name,
      types: data.types.map((t) => t.type.name),
      stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
      abilities: data.abilities.map((a) => a.ability.name),
      height: data.height,
      weight: data.weight,
      sprite_url: data.sprites.front_default ?? null,
    }, {
      source: "PokeAPI",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use poke_get_type to explore a type's strengths and weaknesses.",
        "Use poke_get_ability to learn what an ability does.",
        "Use poke_search_pokemon to browse all pokemon.",
      ],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── poke_search_pokemon ─────────────────────────────────────────────────────
// GET /pokemon?limit={limit}&offset={offset}

export async function pokeSearchPokemon(args: Record<string, unknown>): Promise<unknown> {
  const limit = Math.min(100, Math.max(1, Number(args.limit ?? 20)));
  const offset = Math.max(0, Number(args.offset ?? 0));

  try {
    const data = await pokeFetch<RawPaginatedList>(`/pokemon?limit=${limit}&offset=${offset}`);

    return stampMeta({
      total: data.count,
      limit,
      offset,
      count: data.results.length,
      pokemon: data.results.map((p) => p.name),
    }, {
      source: "PokeAPI",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use poke_get_pokemon with a name from this list for full details.",
        `Use poke_search_pokemon with offset ${offset + limit} to see the next page.`,
      ],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── poke_get_type ───────────────────────────────────────────────────────────
// GET /type/{name_or_id}

export async function pokeGetType(args: Record<string, unknown>): Promise<unknown> {
  const type = String(args.type ?? "").trim().toLowerCase();
  if (!type) return { error: "type is required (type name or id, e.g. fire or 10)." };

  try {
    const data = await pokeFetch<RawType>(`/type/${encodeURIComponent(type)}`);

    return stampMeta({
      id: data.id,
      name: data.name,
      damage_relations: data.damage_relations,
      pokemon_count: data.pokemon.length,
      pokemon: data.pokemon.slice(0, 50).map((p) => p.pokemon.name),
    }, {
      source: "PokeAPI",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use poke_get_pokemon with a name from this list for full details.",
        "Use poke_get_type with another type to compare matchups.",
      ],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── poke_get_ability ────────────────────────────────────────────────────────
// GET /ability/{name_or_id}

export async function pokeGetAbility(args: Record<string, unknown>): Promise<unknown> {
  const ability = String(args.ability ?? "").trim().toLowerCase();
  if (!ability) return { error: "ability is required (ability name or id, e.g. static or 9)." };

  try {
    const data = await pokeFetch<RawAbility>(`/ability/${encodeURIComponent(ability)}`);

    const englishEntry = data.effect_entries.find((e) => e.language.name === "en");

    return stampMeta({
      id: data.id,
      name: data.name,
      effect: englishEntry?.effect ?? null,
      short_effect: englishEntry?.short_effect ?? null,
      pokemon_count: data.pokemon.length,
      pokemon: data.pokemon.slice(0, 50).map((p) => p.pokemon.name),
    }, {
      source: "PokeAPI",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use poke_get_pokemon with a name from this list for full details.",
        "Use poke_search_pokemon to browse all pokemon.",
      ],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── poke_get_generation ─────────────────────────────────────────────────────
// GET /generation/{id}

export async function pokeGetGeneration(args: Record<string, unknown>): Promise<unknown> {
  const generation = String(args.generation ?? "").trim().toLowerCase();
  if (!generation) return { error: "generation is required (generation id or name, e.g. 1 or generation-i)." };

  try {
    const data = await pokeFetch<RawGeneration>(`/generation/${encodeURIComponent(generation)}`);

    return stampMeta({
      id: data.id,
      name: data.name,
      main_region: data.main_region.name,
      pokemon_count: data.pokemon_species.length,
      pokemon: data.pokemon_species.map((p) => p.name),
    }, {
      source: "PokeAPI",
      fetched_at: new Date().toISOString(),
      next_steps: [
        "Use poke_get_pokemon with a name from this list for full details.",
        "Use poke_get_generation with another id to explore a different generation.",
      ],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
