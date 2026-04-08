// ─── Setlist.fm API Tool ──────────────────────────────────────────────────────
// Base URL: https://api.setlist.fm/rest/1.0/
// Auth: x-api-key header. Set SETLISTFM_API_KEY env var.
// Docs: https://api.setlist.fm/docs/1.0/index.html
// No external dependencies - native fetch only.

const SETLISTFM_BASE = "https://api.setlist.fm/rest/1.0";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getApiKey(args: Record<string, unknown>): string | null {
  return (
    String(args.api_key ?? "").trim() ||
    (process.env.SETLISTFM_API_KEY ?? "").trim() ||
    null
  );
}

async function sfmFetch(
  path: string,
  apiKey: string,
  query?: Record<string, string | number | undefined>,
): Promise<unknown> {
  const url = new URL(`${SETLISTFM_BASE}${path}`);

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
    });
  } catch (err) {
    return { error: `Network error: ${err instanceof Error ? err.message : String(err)}` };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return { error: `Non-JSON response (HTTP ${response.status})`, status: response.status };
  }

  if (!response.ok) {
    const e = data as Record<string, unknown>;
    return { error: (e.message ?? `HTTP ${response.status}`), status: response.status };
  }

  return data;
}

// ─── setlistfm_search_artist ──────────────────────────────────────────────────

export async function setlistfmSearchArtist(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "SETLISTFM_API_KEY env var (or api_key arg) is required." };

  return sfmFetch("/search/artists", apiKey, {
    artistName: args.artistName ? String(args.artistName) : undefined,
  });
}

// ─── setlistfm_artist_setlists ────────────────────────────────────────────────

export async function setlistfmArtistSetlists(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "SETLISTFM_API_KEY env var (or api_key arg) is required." };

  const mbid = String(args.mbid ?? "").trim();
  if (!mbid) return { error: "mbid (MusicBrainz ID) is required." };

  return sfmFetch(`/artist/${encodeURIComponent(mbid)}/setlists`, apiKey, {
    p: args.page ? Number(args.page) : undefined,
  });
}

// ─── setlistfm_search_setlists ────────────────────────────────────────────────

export async function setlistfmSearchSetlists(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "SETLISTFM_API_KEY env var (or api_key arg) is required." };

  return sfmFetch("/search/setlists", apiKey, {
    artistName: args.artistName ? String(args.artistName) : undefined,
    venueName:  args.venueName  ? String(args.venueName)  : undefined,
    cityName:   args.cityName   ? String(args.cityName)   : undefined,
    year:       args.year       ? Number(args.year)       : undefined,
  });
}

// ─── setlistfm_get_setlist ────────────────────────────────────────────────────

export async function setlistfmGetSetlist(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "SETLISTFM_API_KEY env var (or api_key arg) is required." };

  const setlistId = String(args.setlistId ?? "").trim();
  if (!setlistId) return { error: "setlistId is required." };

  return sfmFetch(`/setlist/${encodeURIComponent(setlistId)}`, apiKey);
}
