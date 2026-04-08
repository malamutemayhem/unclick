// Last.fm API integration for the UnClick MCP server.
// Uses the Last.fm REST API via fetch - no external dependencies.
// Requires a Last.fm API key set as LASTFM_API_KEY.

const LASTFM_BASE = "https://ws.audioscrobbler.com/2.0/";

// ─── API helper ───────────────────────────────────────────────────────────────

function requireApiKey(): string {
  const key = process.env.LASTFM_API_KEY?.trim() ?? "";
  if (!key) throw new Error("LASTFM_API_KEY environment variable is not set.");
  return key;
}

async function lastfmCall(
  method: string,
  params: Record<string, string | number | undefined> = {}
): Promise<unknown> {
  const apiKey = requireApiKey();
  const url = new URL(LASTFM_BASE);
  url.searchParams.set("method", method);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from Last.fm API`);
  }

  const data = (await response.json()) as Record<string, unknown>;

  if (data.error) {
    throw new Error(`Last.fm API error ${data.error}: ${data.message ?? "Unknown error"}`);
  }

  return data;
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function lastfmArtistInfo(args: Record<string, unknown>): Promise<unknown> {
  const artist = String(args.artist ?? "").trim();
  if (!artist) throw new Error("artist is required.");
  return lastfmCall("artist.getinfo", { artist });
}

export async function lastfmArtistSearch(args: Record<string, unknown>): Promise<unknown> {
  const artist = String(args.artist ?? "").trim();
  if (!artist) throw new Error("artist is required.");
  return lastfmCall("artist.search", { artist });
}

export async function lastfmSimilarArtists(args: Record<string, unknown>): Promise<unknown> {
  const artist = String(args.artist ?? "").trim();
  if (!artist) throw new Error("artist is required.");
  return lastfmCall("artist.getsimilar", { artist });
}

export async function lastfmArtistTopTracks(args: Record<string, unknown>): Promise<unknown> {
  const artist = String(args.artist ?? "").trim();
  if (!artist) throw new Error("artist is required.");
  return lastfmCall("artist.gettoptracks", { artist });
}

export async function lastfmTrackInfo(args: Record<string, unknown>): Promise<unknown> {
  const artist = String(args.artist ?? "").trim();
  const track = String(args.track ?? "").trim();
  if (!artist) throw new Error("artist is required.");
  if (!track) throw new Error("track is required.");
  return lastfmCall("track.getinfo", { artist, track });
}

export async function lastfmChartTopArtists(args: Record<string, unknown>): Promise<unknown> {
  const limit = args.limit !== undefined ? Number(args.limit) : undefined;
  return lastfmCall("chart.gettopartists", { limit });
}

export async function lastfmChartTopTracks(args: Record<string, unknown>): Promise<unknown> {
  const limit = args.limit !== undefined ? Number(args.limit) : undefined;
  return lastfmCall("chart.gettoptracks", { limit });
}

export async function lastfmAlbumInfo(args: Record<string, unknown>): Promise<unknown> {
  const artist = String(args.artist ?? "").trim();
  const album = String(args.album ?? "").trim();
  if (!artist) throw new Error("artist is required.");
  if (!album) throw new Error("album is required.");
  return lastfmCall("album.getinfo", { artist, album });
}
