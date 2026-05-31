// Genius API integration for the UnClick MCP server.
// Uses the Genius REST API via fetch - no external dependencies.
// Requires GENIUS_ACCESS_TOKEN environment variable.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";

const GENIUS_BASE = "https://api.genius.com";

// ─── API helper ───────────────────────────────────────────────────────────────

function requireToken(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("genius", args);
}

const GENIUS_TIMEOUT_MS = Number(process.env.GENIUS_TIMEOUT_MS) || 10000;

async function geniusCall(
  token: string,
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<unknown> {
  const url = new URL(`${GENIUS_BASE}${path}`);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GENIUS_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Genius API request timed out after ${GENIUS_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Genius API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new Error(`Genius API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Genius API HTTP ${response.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }

  const data = (await response.json()) as { meta?: { status: number; message?: string }; response?: unknown };

  if (data.meta && data.meta.status !== 200) {
    throw new Error(`Genius API error ${data.meta.status}: ${data.meta.message ?? "Unknown error"}`);
  }

  return data.response ?? data;
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function geniusSearch(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const q = String(args.q ?? "").trim();
  if (!q) throw new Error("q is required.");
  return geniusCall(token, "/search", { q });
}

export async function geniusGetSong(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = args.id;
  if (!id) throw new Error("id is required.");
  return geniusCall(token, `/songs/${id}`);
}

export async function geniusGetArtist(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = args.id;
  if (!id) throw new Error("id is required.");
  return geniusCall(token, `/artists/${id}`);
}

export async function geniusArtistSongs(args: Record<string, unknown>): Promise<unknown> {
  const token = requireToken(args);
  if (typeof token !== "string") return token;
  const id = args.id;
  if (!id) throw new Error("id is required.");
  const params: Record<string, string | number | undefined> = {};
  if (args.sort) params.sort = String(args.sort);
  if (args.per_page) params.per_page = Number(args.per_page);
  return geniusCall(token, `/artists/${id}/songs`, params);
}
