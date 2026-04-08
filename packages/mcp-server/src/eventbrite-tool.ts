// ─── Eventbrite API Tool ──────────────────────────────────────────────────────
// Base URL: https://www.eventbriteapi.com/v3/
// Auth: Bearer token in Authorization header. Set EVENTBRITE_TOKEN env var.
// Docs: https://www.eventbrite.com/platform/api
// No external dependencies - native fetch only.

const EVENTBRITE_BASE = "https://www.eventbriteapi.com/v3";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToken(args: Record<string, unknown>): string | null {
  return (
    String(args.token ?? "").trim() ||
    (process.env.EVENTBRITE_TOKEN ?? "").trim() ||
    null
  );
}

async function ebFetch(
  path: string,
  token: string,
  query?: Record<string, string | number | undefined>,
  method?: "GET" | "POST",
  body?: unknown,
): Promise<unknown> {
  const url = new URL(`${EVENTBRITE_BASE}${path}`);

  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    }
  }

  const init: RequestInit = {
    method: method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };

  let response: Response;
  try {
    response = await fetch(url.toString(), init);
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
    return {
      error: e.error_description ?? e.error ?? `HTTP ${response.status}`,
      status: response.status,
    };
  }

  return data;
}

// ─── eventbrite_search_events ─────────────────────────────────────────────────

export async function eventbriteSearchEvents(args: Record<string, unknown>): Promise<unknown> {
  const token = getToken(args);
  if (!token) return { error: "EVENTBRITE_TOKEN env var (or token arg) is required." };

  return ebFetch("/events/search/", token, {
    q:                        args.q                        ? String(args.q)                        : undefined,
    "location.address":       args.location_address        ? String(args.location_address)        : undefined,
    "start_date.range_start": args.start_date_range_start  ? String(args.start_date_range_start)  : undefined,
    categories:               args.category_id             ? String(args.category_id)             : undefined,
    sort_by:                  args.sort_by                 ? String(args.sort_by)                 : undefined,
  });
}

// ─── eventbrite_get_event ─────────────────────────────────────────────────────

export async function eventbriteGetEvent(args: Record<string, unknown>): Promise<unknown> {
  const token = getToken(args);
  if (!token) return { error: "EVENTBRITE_TOKEN env var (or token arg) is required." };

  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };

  return ebFetch(`/events/${id}/`, token);
}

// ─── eventbrite_get_event_attendees ───────────────────────────────────────────

export async function eventbriteGetEventAttendees(args: Record<string, unknown>): Promise<unknown> {
  const token = getToken(args);
  if (!token) return { error: "EVENTBRITE_TOKEN env var (or token arg) is required." };

  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };

  return ebFetch(`/events/${id}/attendees/`, token);
}

// ─── eventbrite_create_event ──────────────────────────────────────────────────

export async function eventbriteCreateEvent(args: Record<string, unknown>): Promise<unknown> {
  const token = getToken(args);
  if (!token) return { error: "EVENTBRITE_TOKEN env var (or token arg) is required." };

  const organization_id = String(args.organization_id ?? "").trim();
  if (!organization_id) return { error: "organization_id is required." };

  const name     = args.name     ? String(args.name)     : undefined;
  const start    = args.start;
  const end      = args.end;
  const currency = args.currency ? String(args.currency) : undefined;

  if (!name)     return { error: "name is required." };
  if (!start)    return { error: "start is required (object with utc and timezone)." };
  if (!end)      return { error: "end is required (object with utc and timezone)." };
  if (!currency) return { error: "currency is required (e.g. 'USD')." };

  const eventBody: Record<string, unknown> = {
    event: {
      name:     { html: name },
      start,
      end,
      currency,
      ...(args.venue_id ? { venue_id: String(args.venue_id) } : {}),
    },
  };

  return ebFetch(`/organizations/${organization_id}/events/`, token, undefined, "POST", eventBody);
}

// ─── eventbrite_list_categories ───────────────────────────────────────────────

export async function eventbriteListCategories(args: Record<string, unknown>): Promise<unknown> {
  const token = getToken(args);
  if (!token) return { error: "EVENTBRITE_TOKEN env var (or token arg) is required." };

  return ebFetch("/categories/", token);
}

// ─── eventbrite_get_venue ─────────────────────────────────────────────────────

export async function eventbriteGetVenue(args: Record<string, unknown>): Promise<unknown> {
  const token = getToken(args);
  if (!token) return { error: "EVENTBRITE_TOKEN env var (or token arg) is required." };

  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };

  return ebFetch(`/venues/${id}/`, token);
}
