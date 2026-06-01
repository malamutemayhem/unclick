// MusicBrainz API integration for the UnClick MCP server.
// Uses the MusicBrainz REST API via fetch - no external dependencies.
// No auth required. Identifies with a User-Agent header as required by MusicBrainz policy.

import { stampMeta } from "./connector-meta.js";

const MB_BASE = "https://musicbrainz.org/ws/2";
const MB_USER_AGENT = "UnClick/1.0 (support@unclick.world)";
const MUSICBRAINZ_TIMEOUT_MS = Number(process.env.MUSICBRAINZ_TIMEOUT_MS) || 10000;

// ─── API helper ───────────────────────────────────────────────────────────────

async function mbCall(
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<unknown> {
  const url = new URL(`${MB_BASE}${path}`);
  url.searchParams.set("fmt", "json");

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "" && k !== "fmt") {
      url.searchParams.set(k, String(v));
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MUSICBRAINZ_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: { "User-Agent": MB_USER_AGENT },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`MusicBrainz API request timed out after ${MUSICBRAINZ_TIMEOUT_MS}ms.`);
    }
    throw new Error(`MusicBrainz API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new Error(`MusicBrainz API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`MusicBrainz API HTTP ${response.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }

  return response.json();
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function mbSearchArtists(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) throw new Error("query is required.");
  const limit = args.limit !== undefined ? Number(args.limit) : undefined;
  const __res = await mbCall("/artist", { query, limit }) as Record<string, unknown>;
  return stampMeta(__res, {
    source: "MusicBrainz",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use mb_get_artist with an mbid for full detail, or mb_search_releases to find albums."],
  });
}

export async function mbSearchReleases(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) throw new Error("query is required.");
  const limit = args.limit !== undefined ? Number(args.limit) : undefined;

  let fullQuery = query;
  if (args.artist) {
    fullQuery = `${query} artist:${args.artist}`;
  }

  return mbCall("/release", { query: fullQuery, limit });
}

export async function mbSearchRecordings(args: Record<string, unknown>): Promise<unknown> {
  const query = String(args.query ?? "").trim();
  if (!query) throw new Error("query is required.");
  const limit = args.limit !== undefined ? Number(args.limit) : undefined;

  let fullQuery = query;
  if (args.artist) {
    fullQuery = `${query} artist:${args.artist}`;
  }

  return mbCall("/recording", { query: fullQuery, limit });
}

export async function mbGetArtist(args: Record<string, unknown>): Promise<unknown> {
  const mbid = String(args.mbid ?? "").trim();
  if (!mbid) throw new Error("mbid is required.");
  return mbCall(`/artist/${mbid}`, { inc: "releases" });
}

export async function mbGetRelease(args: Record<string, unknown>): Promise<unknown> {
  const mbid = String(args.mbid ?? "").trim();
  if (!mbid) throw new Error("mbid is required.");
  return mbCall(`/release/${mbid}`, { inc: "recordings" });
}
