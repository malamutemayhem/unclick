// Podcast Index API integration for the UnClick MCP server.
// Uses the Podcast Index REST API via fetch - no external dependencies.
// Requires PODCASTINDEX_API_KEY and PODCASTINDEX_API_SECRET environment variables.
// Auth uses HMAC-SHA1: SHA1(api_key + api_secret + unix_timestamp).

import { createHash } from "crypto";
import { notConnectedFor } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";

const PI_BASE = "https://api.podcastindex.org/api/1.0";

// ─── Auth helper ──────────────────────────────────────────────────────────────

function buildAuthHeaders(args: Record<string, unknown>): Record<string, string> | NotConnectedResult {
  const apiKey = String(args.api_key ?? process.env.PODCASTINDEX_API_KEY ?? "").trim();
  const apiSecret = String(args.api_secret ?? process.env.PODCASTINDEX_API_SECRET ?? "").trim();

  if (!apiKey || !apiSecret) return notConnectedFor("podcastindex");

  const timestamp = Math.floor(Date.now() / 1000);
  const hash = createHash("sha1")
    .update(apiKey + apiSecret + String(timestamp))
    .digest("hex");

  return {
    "X-Auth-Key": apiKey,
    "X-Auth-Date": String(timestamp),
    Authorization: hash,
    "User-Agent": "UnClick/1.0",
  };
}

// ─── API helper ───────────────────────────────────────────────────────────────

async function piCall(
  args: Record<string, unknown>,
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<unknown> {
  const headers = buildAuthHeaders(args);
  if ("not_connected" in headers) return headers;

  const url = new URL(`${PI_BASE}${path}`);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const PODCASTINDEX_TIMEOUT_MS = Number(process.env.PODCASTINDEX_TIMEOUT_MS) || 15000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PODCASTINDEX_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers,
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Podcast Index request timed out after ${PODCASTINDEX_TIMEOUT_MS}ms.`);
    }
    throw new Error(`Podcast Index network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    throw new Error("Podcast Index rate limit exceeded. Please wait and retry.");
  }
  if (!response.ok) {
    throw new Error(`Podcast Index API HTTP ${response.status}`);
  }

  const data = (await response.json()) as Record<string, unknown>;

  if (data.status === "false" || data.status === false) {
    throw new Error(`Podcast Index API error: ${data.description ?? "Unknown error"}`);
  }

  return data;
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function podcastSearch(args: Record<string, unknown>): Promise<unknown> {
  const q = String(args.q ?? "").trim();
  if (!q) throw new Error("q is required.");
  const params: Record<string, string | number | undefined> = { q };
  if (args.max) params.max = Number(args.max);
  return piCall(args, "/search/byterm", params);
}

export async function podcastGetByFeedUrl(args: Record<string, unknown>): Promise<unknown> {
  const url = String(args.url ?? "").trim();
  if (!url) throw new Error("url is required.");
  return piCall(args, "/podcasts/byfeedurl", { url });
}

export async function podcastGetEpisodes(args: Record<string, unknown>): Promise<unknown> {
  const feedId = args.feed_id;
  if (!feedId) throw new Error("feed_id is required.");
  const params: Record<string, string | number | undefined> = { id: Number(feedId) };
  if (args.max) params.max = Number(args.max);
  if (args.since) params.since = Number(args.since);
  return piCall(args, "/episodes/byfeedid", params);
}

export async function podcastSearchEpisodes(args: Record<string, unknown>): Promise<unknown> {
  const q = String(args.q ?? "").trim();
  if (!q) throw new Error("q is required.");
  const params: Record<string, string | number | undefined> = { q };
  if (args.max) params.max = Number(args.max);
  return piCall(args, "/search/byterm", params);
}

export async function podcastTrending(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string | number | undefined> = {};
  if (args.max) params.max = Number(args.max);
  if (args.lang) params.lang = String(args.lang);
  if (args.cat) params.cat = String(args.cat);
  return piCall(args, "/podcasts/trending", params);
}

export async function podcastRecentEpisodes(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string | number | undefined> = {};
  if (args.max) params.max = Number(args.max);
  return piCall(args, "/episodes/recent", params);
}
