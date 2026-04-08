// ─── Yelp Fusion API Tool ─────────────────────────────────────────────────────
// Base URL: https://api.yelp.com/v3/
// Auth: Bearer token in Authorization header. Set YELP_API_KEY env var.
// Docs: https://docs.developer.yelp.com/docs/fusion-intro
// No external dependencies - native fetch only.

const YELP_BASE = "https://api.yelp.com/v3";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getApiKey(args: Record<string, unknown>): string | null {
  return (
    String(args.api_key ?? "").trim() ||
    (process.env.YELP_API_KEY ?? "").trim() ||
    null
  );
}

async function yelpFetch(
  path: string,
  apiKey: string,
  query?: Record<string, string | number | undefined>,
): Promise<unknown> {
  const url = new URL(`${YELP_BASE}${path}`);

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
    const errObj = e.error as Record<string, unknown> | undefined;
    return {
      error: errObj?.description ?? e.error ?? `HTTP ${response.status}`,
      status: response.status,
    };
  }

  return data;
}

// ─── yelp_search ─────────────────────────────────────────────────────────────

export async function yelpSearch(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "YELP_API_KEY env var (or api_key arg) is required." };

  const location = String(args.location ?? "").trim();
  if (!location) return { error: "location is required." };

  return yelpFetch("/businesses/search", apiKey, {
    term:       args.term       ? String(args.term)       : undefined,
    location,
    categories: args.categories ? String(args.categories) : undefined,
    price:      args.price      ? String(args.price)      : undefined,
    sort_by:    args.sort_by    ? String(args.sort_by)    : undefined,
    limit:      args.limit      ? Number(args.limit)      : undefined,
  });
}

// ─── yelp_get_business ────────────────────────────────────────────────────────

export async function yelpGetBusiness(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "YELP_API_KEY env var (or api_key arg) is required." };

  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };

  return yelpFetch(`/businesses/${id}`, apiKey);
}

// ─── yelp_get_reviews ─────────────────────────────────────────────────────────

export async function yelpGetReviews(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "YELP_API_KEY env var (or api_key arg) is required." };

  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };

  return yelpFetch(`/businesses/${id}/reviews`, apiKey);
}

// ─── yelp_autocomplete ────────────────────────────────────────────────────────

export async function yelpAutocomplete(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "YELP_API_KEY env var (or api_key arg) is required." };

  const text = String(args.text ?? "").trim();
  if (!text) return { error: "text is required." };

  return yelpFetch("/autocomplete", apiKey, {
    text,
    latitude:  args.latitude  ? Number(args.latitude)  : undefined,
    longitude: args.longitude ? Number(args.longitude) : undefined,
  });
}

// ─── yelp_search_events ───────────────────────────────────────────────────────

export async function yelpSearchEvents(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "YELP_API_KEY env var (or api_key arg) is required." };

  return yelpFetch("/events", apiKey, {
    location:   args.location   ? String(args.location)   : undefined,
    categories: args.categories ? String(args.categories) : undefined,
  });
}
