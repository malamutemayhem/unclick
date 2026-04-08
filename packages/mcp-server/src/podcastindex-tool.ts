// Podcast Index API integration for the UnClick MCP server.
// Uses the Podcast Index REST API via fetch - no external dependencies.
// Requires PODCASTINDEX_API_KEY and PODCASTINDEX_API_SECRET environment variables.
// Auth uses HMAC-SHA1: SHA1(api_key + api_secret + unix_timestamp).

import { createHash } from "crypto";

const PI_BASE = "https://api.podcastindex.org/api/1.0";

// ─── Auth helper ──────────────────────────────────────────────────────────────

function buildAuthHeaders(): Record<string, string> {
  const apiKey = process.env.PODCASTINDEX_API_KEY?.trim() ?? "";
  const apiSecret = process.env.PODCASTINDEX_API_SECRET?.trim() ?? "";

  if (!apiKey) throw new Error("PODCASTINDEX_API_KEY environment variable is not set.");
  if (!apiSecret) throw new Error("PODCASTINDEX_API_SECRET environment variable is not set.");

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
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<unknown> {
  const url = new URL(`${PI_BASE}${path}`);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const response = await fetch(url.toString(), {
    headers: buildAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from Podcast Index API`);
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
  return piCall("/search/byterm", params);
}

export async function podcastGetByFeedUrl(args: Record<string, unknown>): Promise<unknown> {
  const url = String(args.url ?? "").trim();
  if (!url) throw new Error("url is required.");
  return piCall("/podcasts/byfeedurl", { url });
}

export async function podcastGetEpisodes(args: Record<string, unknown>): Promise<unknown> {
  const feedId = args.feed_id;
  if (!feedId) throw new Error("feed_id is required.");
  const params: Record<string, string | number | undefined> = { id: Number(feedId) };
  if (args.max) params.max = Number(args.max);
  if (args.since) params.since = Number(args.since);
  return piCall("/episodes/byfeedid", params);
}

export async function podcastSearchEpisodes(args: Record<string, unknown>): Promise<unknown> {
  const q = String(args.q ?? "").trim();
  if (!q) throw new Error("q is required.");
  const params: Record<string, string | number | undefined> = { q };
  if (args.max) params.max = Number(args.max);
  return piCall("/search/byterm", params);
}

export async function podcastTrending(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string | number | undefined> = {};
  if (args.max) params.max = Number(args.max);
  if (args.lang) params.lang = String(args.lang);
  if (args.cat) params.cat = String(args.cat);
  return piCall("/podcasts/trending", params);
}

export async function podcastRecentEpisodes(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string | number | undefined> = {};
  if (args.max) params.max = Number(args.max);
  return piCall("/episodes/recent", params);
}
