// Discogs API integration for the UnClick MCP server.
// Uses the Discogs REST API via fetch - no external dependencies.
// Requires DISCOGS_TOKEN environment variable.

const DISCOGS_BASE = "https://api.discogs.com";

// ─── API helper ───────────────────────────────────────────────────────────────

function requireToken(): string {
  const token = process.env.DISCOGS_TOKEN?.trim() ?? "";
  if (!token) throw new Error("DISCOGS_TOKEN environment variable is not set.");
  return token;
}

async function discogsCall(
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<unknown> {
  const token = requireToken();
  const url = new URL(`${DISCOGS_BASE}${path}`);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Discogs token=${token}`,
      "User-Agent": "UnClick/1.0",
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} from Discogs API: ${body}`);
  }

  return response.json();
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function discogsSearch(args: Record<string, unknown>): Promise<unknown> {
  const params: Record<string, string | undefined> = {};
  if (args.query) params.q = String(args.query);
  if (args.artist) params.artist = String(args.artist);
  if (args.release_title) params.release_title = String(args.release_title);
  if (args.genre) params.genre = String(args.genre);
  if (args.style) params.style = String(args.style);
  if (args.year) params.year = String(args.year);
  if (args.type) params.type = String(args.type);
  return discogsCall("/database/search", params);
}

export async function discogsGetRelease(args: Record<string, unknown>): Promise<unknown> {
  const id = args.id;
  if (!id) throw new Error("id is required.");
  return discogsCall(`/releases/${id}`);
}

export async function discogsGetArtist(args: Record<string, unknown>): Promise<unknown> {
  const id = args.id;
  if (!id) throw new Error("id is required.");
  return discogsCall(`/artists/${id}`);
}

export async function discogsArtistReleases(args: Record<string, unknown>): Promise<unknown> {
  const id = args.id;
  if (!id) throw new Error("id is required.");
  const params: Record<string, string | undefined> = {};
  if (args.sort) params.sort = String(args.sort);
  if (args.sort_order) params.sort_order = String(args.sort_order);
  return discogsCall(`/artists/${id}/releases`, params);
}

export async function discogsGetLabel(args: Record<string, unknown>): Promise<unknown> {
  const id = args.id;
  if (!id) throw new Error("id is required.");
  return discogsCall(`/labels/${id}`);
}

export async function discogsMarketplaceStats(args: Record<string, unknown>): Promise<unknown> {
  const releaseId = args.release_id;
  if (!releaseId) throw new Error("release_id is required.");
  return discogsCall(`/marketplace/stats/${releaseId}`);
}
