// OMDB (Open Movie Database) API integration for the UnClick MCP server.
// Uses the OMDB REST API via fetch - no external dependencies.
// Requires OMDB_API_KEY environment variable.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";

const OMDB_BASE = "http://www.omdbapi.com/";
const OMDB_TIMEOUT_MS = Number(process.env.OMDB_TIMEOUT_MS) || 10000;

// ─── API helper ───────────────────────────────────────────────────────────────

function requireApiKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("omdb", args);
}

async function omdbCall(apiKey: string, params: Record<string, string | number | undefined>): Promise<unknown> {
  const url = new URL(OMDB_BASE);
  url.searchParams.set("apikey", apiKey);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OMDB_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), { signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`OMDB API request timed out after ${OMDB_TIMEOUT_MS}ms.`);
    }
    throw new Error(`OMDB API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new Error(`OMDB API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`OMDB API HTTP ${response.status}${body ? `: ${body.slice(0, 200)}` : ""}`);
  }

  const data = (await response.json()) as Record<string, unknown>;

  if (data.Response === "False") {
    throw new Error(`OMDB API error: ${data.Error ?? "Unknown error"}`);
  }

  return data;
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function omdbSearch(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireApiKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const s = String(args.s ?? "").trim();
  if (!s) throw new Error("s (search query) is required.");
  const params: Record<string, string | number | undefined> = { s };
  if (args.type) params.type = String(args.type);
  if (args.y) params.y = String(args.y);
  if (args.page) params.page = Number(args.page);
  return omdbCall(apiKey, params);
}

export async function omdbGetByTitle(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireApiKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const t = String(args.t ?? "").trim();
  if (!t) throw new Error("t (title) is required.");
  const params: Record<string, string | number | undefined> = { t };
  if (args.type) params.type = String(args.type);
  if (args.y) params.y = String(args.y);
  return omdbCall(apiKey, params);
}

export async function omdbGetById(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = requireApiKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const i = String(args.i ?? "").trim();
  if (!i) throw new Error("i (IMDb ID) is required.");
  return omdbCall(apiKey, { i });
}
