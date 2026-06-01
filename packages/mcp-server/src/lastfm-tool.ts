// ── Last.fm API tool ────────────────────────────────────────────────────────────
// Unlimited free read access. No OAuth needed for read operations.
// Docs: https://www.last.fm/api
// Env var: LASTFM_API_KEY

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";
const LASTFM_BASE = "https://ws.audioscrobbler.com/2.0";
const LASTFM_TIMEOUT_MS = Number(process.env.LASTFM_TIMEOUT_MS) || 10000;

async function lastfmGet(
  apiKey: string,
  method: string,
  params: Record<string, string | number>
): Promise<Record<string, unknown>> {
  const qs = new URLSearchParams({
    method,
    api_key: apiKey,
    format:  "json",
  });
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LASTFM_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(`${LASTFM_BASE}/?${qs}`, { signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Last.fm API request timed out after ${LASTFM_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Last.fm API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Last.fm API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) throw new Error(`Last.fm API HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json() as Record<string, unknown>;
  if (json.error) throw new Error(`Last.fm error ${json.error}: ${json.message}`);
  return json;
}

function getApiKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("lastfm", args);
}

// ── Tool functions ─────────────────────────────────────────────────────────────

export async function lastfmGetArtistInfo(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const artist = String(args.artist ?? "").trim();
    if (!artist) return { error: "artist is required." };
    const params: Record<string, string | number> = { artist };
    if (args.lang) params.lang = String(args.lang);
    const data = await lastfmGet(apiKey, "artist.getinfo", params);
    return stampMeta((data.artist ?? data) as Record<string, unknown>, {
      source: "Last.fm",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use lastfm_top_tracks for this artist, or lastfm_similar_artists for related acts."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function lastfmSearchArtists(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const query = String(args.query ?? "").trim();
    if (!query) return { error: "query is required." };
    const params: Record<string, string | number> = { artist: query };
    if (args.limit) params.limit = Number(args.limit);
    if (args.page)  params.page  = Number(args.page);
    const data = await lastfmGet(apiKey, "artist.search", params);
    const results = data.results as Record<string, unknown> | undefined;
    const matches = (results?.artistmatches as Record<string, unknown>)?.artist;
    return {
      total: (results?.["opensearch:totalResults"] as string | undefined),
      artists: Array.isArray(matches) ? matches : matches ? [matches] : [],
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function lastfmGetTopTracks(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const artist = String(args.artist ?? "").trim();
    if (!artist) return { error: "artist is required." };
    const params: Record<string, string | number> = { artist };
    if (args.limit) params.limit = Number(args.limit);
    if (args.page)  params.page  = Number(args.page);
    const data = await lastfmGet(apiKey, "artist.gettoptracks", params);
    const toptracks = data.toptracks as Record<string, unknown> | undefined;
    return {
      artist,
      tracks: toptracks?.track ?? [],
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function lastfmGetSimilarArtists(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const artist = String(args.artist ?? "").trim();
    if (!artist) return { error: "artist is required." };
    const params: Record<string, string | number> = { artist };
    if (args.limit) params.limit = Number(args.limit);
    const data = await lastfmGet(apiKey, "artist.getsimilar", params);
    const similar = data.similarartists as Record<string, unknown> | undefined;
    return {
      artist,
      similar_artists: similar?.artist ?? [],
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function lastfmGetChartTopArtists(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const params: Record<string, string | number> = {};
    if (args.limit) params.limit = Number(args.limit);
    if (args.page)  params.page  = Number(args.page);
    const data = await lastfmGet(apiKey, "chart.gettopartists", params);
    const artists = data.artists as Record<string, unknown> | undefined;
    return {
      artists: artists?.artist ?? [],
      total: (artists?.["@attr"] as Record<string, unknown> | undefined)?.total,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function lastfmGetChartTopTracks(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const params: Record<string, string | number> = {};
    if (args.limit) params.limit = Number(args.limit);
    if (args.page)  params.page  = Number(args.page);
    const data = await lastfmGet(apiKey, "chart.gettoptracks", params);
    const tracks = data.tracks as Record<string, unknown> | undefined;
    return {
      tracks: tracks?.track ?? [],
      total: (tracks?.["@attr"] as Record<string, unknown> | undefined)?.total,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function lastfmGetAlbumInfo(args: Record<string, unknown>): Promise<unknown> {
  try {
    const apiKey = getApiKey(args);
    if (typeof apiKey !== "string") return apiKey;
    const artist = String(args.artist ?? "").trim();
    const album  = String(args.album  ?? "").trim();
    if (!artist) return { error: "artist is required." };
    if (!album)  return { error: "album is required." };
    const params: Record<string, string | number> = { artist, album };
    if (args.lang) params.lang = String(args.lang);
    const data = await lastfmGet(apiKey, "album.getinfo", params);
    return data.album ?? data;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
