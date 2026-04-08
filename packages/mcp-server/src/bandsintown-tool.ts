// ─── Bandsintown API Tool ─────────────────────────────────────────────────────
// Base URL: https://rest.bandsintown.com/
// Auth: app_id query param (public identifier, not a secret key).
// Uses "unclick" as app_id by default. Override via BANDSINTOWN_APP_ID env var.
// Docs: https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0
// No external dependencies - native fetch only.

const BANDSINTOWN_BASE = "https://rest.bandsintown.com";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAppId(args: Record<string, unknown>): string {
  return (
    String(args.app_id ?? "").trim() ||
    (process.env.BANDSINTOWN_APP_ID ?? "").trim() ||
    "unclick"
  );
}

async function bitFetch(
  path: string,
  appId: string,
  query?: Record<string, string | undefined>,
): Promise<unknown> {
  const url = new URL(`${BANDSINTOWN_BASE}${path}`);
  url.searchParams.set("app_id", appId);

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, v);
    }
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
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

// ─── bandsintown_artist ────────────────────────────────────────────────────────

export async function bandsintownArtist(args: Record<string, unknown>): Promise<unknown> {
  const appId = getAppId(args);

  const artistName = String(args.artist_name ?? "").trim();
  if (!artistName) return { error: "artist_name is required." };

  return bitFetch(`/artists/${encodeURIComponent(artistName)}`, appId);
}

// ─── bandsintown_events ────────────────────────────────────────────────────────

export async function bandsintownEvents(args: Record<string, unknown>): Promise<unknown> {
  const appId = getAppId(args);

  const artistName = String(args.artist_name ?? "").trim();
  if (!artistName) return { error: "artist_name is required." };

  return bitFetch(`/artists/${encodeURIComponent(artistName)}/events`, appId, {
    date: args.date ? String(args.date) : undefined,
  });
}

// ─── bandsintown_recommended ───────────────────────────────────────────────────

export async function bandsintownRecommended(args: Record<string, unknown>): Promise<unknown> {
  const appId = getAppId(args);

  const artistName = String(args.artist_name ?? "").trim();
  if (!artistName) return { error: "artist_name is required." };

  const location = String(args.location ?? "").trim();
  if (!location) return { error: "location is required (e.g. 'Austin,TX' or '33.74,-84.39')." };

  return bitFetch(`/artists/${encodeURIComponent(artistName)}/recommended`, appId, {
    location,
  });
}
