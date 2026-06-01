// ── Discogs API tool ────────────────────────────────────────────────────────────
// Free API with personal access token auth.
// Docs: https://www.discogs.com/developers
// Env var: DISCOGS_TOKEN

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const DISCOGS_BASE = "https://api.discogs.com";
const DISCOGS_TIMEOUT_MS = Number(process.env.DISCOGS_TIMEOUT_MS) || 10000;

async function discogsGet(
  token: string,
  path: string,
  params: Record<string, string | number | boolean> = {}
): Promise<Record<string, unknown>> {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  }
  const url = `${DISCOGS_BASE}${path}${qs.toString() ? "?" + qs.toString() : ""}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DISCOGS_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, {
      headers: {
        Authorization:  `Discogs token=${token}`,
        "User-Agent":   "UnClickMCP/1.0",
        Accept:         "application/vnd.discogs.v2.discogs+json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Discogs API request timed out after ${DISCOGS_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Discogs API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`Discogs API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Discogs API HTTP ${res.status}: ${body || res.statusText}`);
  }
  return res.json() as Promise<Record<string, unknown>>;
}

// Resolves the token from args/env via the connector registry, or returns a
// guided not-connected card (returned, never thrown).
function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("discogs", args);
}

// ── Tool functions ─────────────────────────────────────────────────────────────

export async function discogsSearchReleases(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = requireToken(args);
    if (typeof token !== "string") return token;
    const params: Record<string, string | number> = { type: "release" };
    if (args.query)  params.q      = String(args.query);
    if (args.artist) params.artist = String(args.artist);
    if (args.genre)  params.genre  = String(args.genre);
    if (args.year)   params.year   = Number(args.year);
    if (args.format) params.format = String(args.format);
    if (args.label)  params.label  = String(args.label);
    if (args.per_page) params.per_page = Number(args.per_page);
    if (args.page)     params.page     = Number(args.page);
    const data = await discogsGet(token, "/database/search", params);
    return stampMeta({
      total:   (data.pagination as Record<string, unknown>)?.items,
      pages:   (data.pagination as Record<string, unknown>)?.pages,
      page:    (data.pagination as Record<string, unknown>)?.page,
      results: data.results,
    }, {
      source: "Discogs",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use discogs_get_release with a result id, or discogs_get_artist for an artist's discography."],
    });
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function discogsGetRelease(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = requireToken(args);
    if (typeof token !== "string") return token;
    const id = String(args.id ?? "").trim();
    if (!id) return { error: "id is required." };
    const data = await discogsGet(token, `/releases/${encodeURIComponent(id)}`);
    return data;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function discogsGetArtist(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = requireToken(args);
    if (typeof token !== "string") return token;
    const id = String(args.id ?? "").trim();
    if (!id) return { error: "id is required." };
    const data = await discogsGet(token, `/artists/${encodeURIComponent(id)}`);
    return data;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function discogsSearchArtists(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = requireToken(args);
    if (typeof token !== "string") return token;
    const query = String(args.query ?? "").trim();
    if (!query) return { error: "query is required." };
    const params: Record<string, string | number> = { q: query, type: "artist" };
    if (args.per_page) params.per_page = Number(args.per_page);
    if (args.page)     params.page     = Number(args.page);
    const data = await discogsGet(token, "/database/search", params);
    return {
      total:   (data.pagination as Record<string, unknown>)?.items,
      results: data.results,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function discogsGetMarketplaceStats(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = requireToken(args);
    if (typeof token !== "string") return token;
    const releaseId = String(args.release_id ?? "").trim();
    if (!releaseId) return { error: "release_id is required." };
    const data = await discogsGet(token, `/marketplace/stats/${encodeURIComponent(releaseId)}`);
    return data;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function discogsGetLabel(args: Record<string, unknown>): Promise<unknown> {
  try {
    const token = requireToken(args);
    if (typeof token !== "string") return token;
    const id = String(args.id ?? "").trim();
    if (!id) return { error: "id is required." };
    const data = await discogsGet(token, `/labels/${encodeURIComponent(id)}`);
    return data;
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
