// ─── Ticketmaster Discovery API Tool ──────────────────────────────────────────
// Base URL: https://app.ticketmaster.com/discovery/v2/
// Auth: API key via query param (apikey). Set TICKETMASTER_API_KEY env var.
// Docs: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/
// No external dependencies - native fetch only.

const TICKETMASTER_BASE = "https://app.ticketmaster.com/discovery/v2";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getApiKey(args: Record<string, unknown>): string | null {
  return (
    String(args.api_key ?? "").trim() ||
    (process.env.TICKETMASTER_API_KEY ?? "").trim() ||
    null
  );
}

async function tmFetch(
  path: string,
  apiKey: string,
  query?: Record<string, string | number | undefined>,
): Promise<unknown> {
  const url = new URL(`${TICKETMASTER_BASE}${path}`);
  url.searchParams.set("apikey", apiKey);

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
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
    return { error: (e.fault ?? e.errors ?? `HTTP ${response.status}`), status: response.status };
  }

  return data;
}

// ─── ticketmaster_search_events ───────────────────────────────────────────────

export async function ticketmasterSearchEvents(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "TICKETMASTER_API_KEY env var (or api_key arg) is required." };

  return tmFetch("/events.json", apiKey, {
    keyword:            args.keyword            ? String(args.keyword)            : undefined,
    city:               args.city               ? String(args.city)               : undefined,
    countryCode:        args.countryCode        ? String(args.countryCode)        : undefined,
    startDateTime:      args.startDateTime      ? String(args.startDateTime)      : undefined,
    classificationName: args.classificationName ? String(args.classificationName) : undefined,
    size:               args.size               ? Number(args.size)               : undefined,
  });
}

// ─── ticketmaster_get_event ───────────────────────────────────────────────────

export async function ticketmasterGetEvent(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "TICKETMASTER_API_KEY env var (or api_key arg) is required." };

  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };

  return tmFetch(`/events/${id}.json`, apiKey);
}

// ─── ticketmaster_search_venues ───────────────────────────────────────────────

export async function ticketmasterSearchVenues(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "TICKETMASTER_API_KEY env var (or api_key arg) is required." };

  return tmFetch("/venues.json", apiKey, {
    keyword:     args.keyword     ? String(args.keyword)     : undefined,
    city:        args.city        ? String(args.city)        : undefined,
    countryCode: args.countryCode ? String(args.countryCode) : undefined,
  });
}

// ─── ticketmaster_get_venue ───────────────────────────────────────────────────

export async function ticketmasterGetVenue(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "TICKETMASTER_API_KEY env var (or api_key arg) is required." };

  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };

  return tmFetch(`/venues/${id}.json`, apiKey);
}

// ─── ticketmaster_search_attractions ─────────────────────────────────────────

export async function ticketmasterSearchAttractions(args: Record<string, unknown>): Promise<unknown> {
  const apiKey = getApiKey(args);
  if (!apiKey) return { error: "TICKETMASTER_API_KEY env var (or api_key arg) is required." };

  return tmFetch("/attractions.json", apiKey, {
    keyword: args.keyword ? String(args.keyword) : undefined,
  });
}
