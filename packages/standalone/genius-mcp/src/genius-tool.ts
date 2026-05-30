// Genius API integration for the UnClick MCP server.
// Uses the Genius REST API via fetch - no external dependencies.
// Requires GENIUS_ACCESS_TOKEN environment variable.

const GENIUS_BASE = "https://api.genius.com";

// ─── API helper ───────────────────────────────────────────────────────────────

function requireToken(): string {
  const token = process.env.GENIUS_ACCESS_TOKEN?.trim() ?? "";
  if (!token) throw new Error("GENIUS_ACCESS_TOKEN environment variable is not set.");
  return token;
}

async function geniusCall(
  path: string,
  params: Record<string, string | number | undefined> = {}
): Promise<unknown> {
  const token = requireToken();
  const url = new URL(`${GENIUS_BASE}${path}`);

  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} from Genius API`);
  }

  const data = (await response.json()) as { meta?: { status: number; message?: string }; response?: unknown };

  if (data.meta && data.meta.status !== 200) {
    throw new Error(`Genius API error ${data.meta.status}: ${data.meta.message ?? "Unknown error"}`);
  }

  return data.response ?? data;
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function geniusSearch(args: Record<string, unknown>): Promise<unknown> {
  const q = String(args.q ?? "").trim();
  if (!q) throw new Error("q is required.");
  return geniusCall("/search", { q });
}

export async function geniusGetSong(args: Record<string, unknown>): Promise<unknown> {
  const id = args.id;
  if (!id) throw new Error("id is required.");
  return geniusCall(`/songs/${id}`);
}

export async function geniusGetArtist(args: Record<string, unknown>): Promise<unknown> {
  const id = args.id;
  if (!id) throw new Error("id is required.");
  return geniusCall(`/artists/${id}`);
}

export async function geniusArtistSongs(args: Record<string, unknown>): Promise<unknown> {
  const id = args.id;
  if (!id) throw new Error("id is required.");
  const params: Record<string, string | number | undefined> = {};
  if (args.sort) params.sort = String(args.sort);
  if (args.per_page) params.per_page = Number(args.per_page);
  return geniusCall(`/artists/${id}/songs`, params);
}
