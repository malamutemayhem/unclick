// Jikan API - anime, manga, and character data (unofficial MyAnimeList API).
// No API key required - completely free and open.
// Base URL: https://api.jikan.moe/v4/
// Rate limit: 3 requests/second, 60 requests/minute.

import { stampMeta } from "./connector-meta.js";

const JIKAN_BASE = "https://api.jikan.moe/v4";
const JIKAN_TIMEOUT_MS = Number(process.env.JIKAN_TIMEOUT_MS) || 15000;

async function jikanFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), JIKAN_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${JIKAN_BASE}${path}`, {
      headers: { "User-Agent": "UnClickMCP/1.0 (https://unclick.io)" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Jikan API request timed out after ${JIKAN_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Jikan API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Jikan API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Jikan API HTTP ${res.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

interface JikanAnime {
  mal_id: number;
  title: string;
  title_english: string | null;
  type: string | null;
  episodes: number | null;
  status: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  synopsis: string | null;
  genres: Array<{ name: string }>;
  year: number | null;
  season: string | null;
  images?: { jpg?: { image_url?: string } };
}

interface JikanManga {
  mal_id: number;
  title: string;
  type: string | null;
  chapters: number | null;
  volumes: number | null;
  status: string | null;
  score: number | null;
  synopsis: string | null;
  genres: Array<{ name: string }>;
  images?: { jpg?: { image_url?: string } };
}

interface JikanCharacter {
  mal_id: number;
  name: string;
  name_kanji: string | null;
  nicknames: string[];
  about: string | null;
  images?: { jpg?: { image_url?: string } };
}

function normalizeAnime(a: JikanAnime) {
  return {
    mal_id: a.mal_id,
    title: a.title,
    title_english: a.title_english ?? null,
    type: a.type ?? null,
    episodes: a.episodes ?? null,
    status: a.status ?? null,
    score: a.score ?? null,
    scored_by: a.scored_by ?? null,
    rank: a.rank ?? null,
    popularity: a.popularity ?? null,
    synopsis: a.synopsis ?? null,
    genres: a.genres?.map((g) => g.name) ?? [],
    year: a.year ?? null,
    season: a.season ?? null,
    image_url: a.images?.jpg?.image_url ?? null,
  };
}

function normalizeManga(m: JikanManga) {
  return {
    mal_id: m.mal_id,
    title: m.title,
    type: m.type ?? null,
    chapters: m.chapters ?? null,
    volumes: m.volumes ?? null,
    status: m.status ?? null,
    score: m.score ?? null,
    synopsis: m.synopsis ?? null,
    genres: m.genres?.map((g) => g.name) ?? [],
    image_url: m.images?.jpg?.image_url ?? null,
  };
}

export async function jikanSearchAnime(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required." };
  const params = new URLSearchParams({ q: query });
  const limit = Math.min(25, Math.max(1, Number(args.limit ?? 10)));
  params.set("limit", String(limit));
  if (args.page) params.set("page", String(args.page));
  if (args.type) params.set("type", String(args.type));
  if (args.status) params.set("status", String(args.status));
  if (args.order_by) params.set("order_by", String(args.order_by));
  try {
    const data = await jikanFetch<{ data: JikanAnime[]; pagination: { last_visible_page: number; has_next_page: boolean } }>(`/anime?${params}`);
    return stampMeta({
      count: data.data.length,
      pages: data.pagination.last_visible_page,
      has_next_page: data.pagination.has_next_page,
      anime: data.data.map(normalizeAnime),
    }, {
      source: "Jikan (MyAnimeList)",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use jikan_get_anime with a mal_id for full details.", "Use jikan_top_anime for rankings."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function jikanGetAnime(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required (MyAnimeList ID)." };
  try {
    const data = await jikanFetch<{ data: JikanAnime }>(`/anime/${encodeURIComponent(id)}`);
    return stampMeta(normalizeAnime(data.data), {
      source: "Jikan (MyAnimeList)",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use jikan_search_anime to find similar anime.", "Use jikan_search_manga for the manga version."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function jikanTopAnime(args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  const limit = Math.min(25, Math.max(1, Number(args.limit ?? 10)));
  params.set("limit", String(limit));
  if (args.page) params.set("page", String(args.page));
  if (args.type) params.set("type", String(args.type));
  if (args.filter) params.set("filter", String(args.filter));
  try {
    const data = await jikanFetch<{ data: JikanAnime[]; pagination: { last_visible_page: number; has_next_page: boolean } }>(`/top/anime?${params}`);
    return stampMeta({
      count: data.data.length,
      pages: data.pagination.last_visible_page,
      anime: data.data.map(normalizeAnime),
    }, {
      source: "Jikan (MyAnimeList)",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use jikan_get_anime with a mal_id for full details."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function jikanSearchManga(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required." };
  const params = new URLSearchParams({ q: query });
  const limit = Math.min(25, Math.max(1, Number(args.limit ?? 10)));
  params.set("limit", String(limit));
  if (args.page) params.set("page", String(args.page));
  try {
    const data = await jikanFetch<{ data: JikanManga[]; pagination: { last_visible_page: number; has_next_page: boolean } }>(`/manga?${params}`);
    return stampMeta({
      count: data.data.length,
      pages: data.pagination.last_visible_page,
      manga: data.data.map(normalizeManga),
    }, {
      source: "Jikan (MyAnimeList)",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use jikan_search_anime for the anime adaptation."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function jikanGetCharacter(args: Record<string, unknown>): Promise<unknown> {
  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required (MyAnimeList character ID)." };
  try {
    const data = await jikanFetch<{ data: JikanCharacter }>(`/characters/${encodeURIComponent(id)}`);
    const c = data.data;
    return stampMeta({
      mal_id: c.mal_id,
      name: c.name,
      name_kanji: c.name_kanji ?? null,
      nicknames: c.nicknames ?? [],
      about: c.about ?? null,
      image_url: c.images?.jpg?.image_url ?? null,
    }, {
      source: "Jikan (MyAnimeList)",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use jikan_search_anime to find this character's anime."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
