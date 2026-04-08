// ─── Foursquare Places API Tool ───────────────────────────────────────────────
// Base URL: https://api.foursquare.com/v3/
// Auth: API key in Authorization header. Set FOURSQUARE_API_KEY env var.
// Docs: https://docs.foursquare.com/developer/reference/place-search
// No external dependencies - native fetch only.

const FOURSQUARE_BASE = "https://api.foursquare.com/v3";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getApiKey(args: Record<string, unknown>): string | null {
  return (
    String(args.api_key ?? "").trim() ||
    (process.env.FOURSQUARE_API_KEY ?? "").trim() ||
    null
  );
}

async function fsFetch(
  path: string,
  apiKey: string,
  query?: Record<string, string | number | undefined>,
): Promise<unknown> {
  const url = new URL(`${FOURSQUARE_BASE}${path}`);

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        Authorization: apiKey,
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

// ─── foursquare_search_places ─────────────────────────────────────────────────

export async function foursquareSearchPlaces(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "FOURSQUARE_API_KEY env var (or api_key arg) is required." };

  return fsFetch("/places/search", apiKey, {
    query:      args.query      ? String(args.query)      : undefined,
    ll:         args.ll         ? String(args.ll)         : undefined,
    near:       args.near       ? String(args.near)       : undefined,
    categories: args.categories ? String(args.categories) : undefined,
    limit:      args.limit      ? Number(args.limit)      : undefined,
  });
}

// ─── foursquare_get_place ─────────────────────────────────────────────────────

export async function foursquareGetPlace(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "FOURSQUARE_API_KEY env var (or api_key arg) is required." };

  const fsq_id = String(args.fsq_id ?? "").trim();
  if (!fsq_id) return { error: "fsq_id is required." };

  return fsFetch(`/places/${fsq_id}`, apiKey);
}

// ─── foursquare_get_photos ────────────────────────────────────────────────────

export async function foursquareGetPhotos(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "FOURSQUARE_API_KEY env var (or api_key arg) is required." };

  const fsq_id = String(args.fsq_id ?? "").trim();
  if (!fsq_id) return { error: "fsq_id is required." };

  return fsFetch(`/places/${fsq_id}/photos`, apiKey);
}

// ─── foursquare_get_tips ──────────────────────────────────────────────────────

export async function foursquareGetTips(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "FOURSQUARE_API_KEY env var (or api_key arg) is required." };

  const fsq_id = String(args.fsq_id ?? "").trim();
  if (!fsq_id) return { error: "fsq_id is required." };

  return fsFetch(`/places/${fsq_id}/tips`, apiKey);
}

// ─── foursquare_autocomplete ──────────────────────────────────────────────────

export async function foursquareAutocomplete(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "FOURSQUARE_API_KEY env var (or api_key arg) is required." };

  const query = String(args.query ?? "").trim();
  if (!query) return { error: "query is required." };

  return fsFetch("/autocomplete", apiKey, {
    query,
    ll: args.ll ? String(args.ll) : undefined,
  });
}
