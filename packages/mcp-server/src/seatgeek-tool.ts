// ─── SeatGeek API Tool ────────────────────────────────────────────────────────
// Base URL: https://api.seatgeek.com/2/
// Auth: client_id query param. Set SEATGEEK_CLIENT_ID env var.
// Docs: https://platform.seatgeek.com/
// No external dependencies - native fetch only.

const SEATGEEK_BASE = "https://api.seatgeek.com/2";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getClientId(args: Record<string, unknown>): string | null {
  return (
    String(args.client_id ?? "").trim() ||
    (process.env.SEATGEEK_CLIENT_ID ?? "").trim() ||
    null
  );
}

async function sgFetch(
  path: string,
  clientId: string,
  query?: Record<string, string | number | undefined>,
): Promise<unknown> {
  const url = new URL(`${SEATGEEK_BASE}${path}`);
  url.searchParams.set("client_id", clientId);

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
    return { error: (e.message ?? `HTTP ${response.status}`), status: response.status };
  }

  return data;
}

// ─── seatgeek_search_events ───────────────────────────────────────────────────

export async function seatgeekSearchEvents(args: Record<string, unknown>): Promise<unknown> {
  const clientId = getClientId(args);
  if (!clientId) return { error: "SEATGEEK_CLIENT_ID env var (or client_id arg) is required." };

  const query: Record<string, string | number | undefined> = {
    q:          args.q          ? String(args.q)          : undefined,
    venue_city: args.venue_city ? String(args.venue_city) : undefined,
    type:       args.type       ? String(args.type)       : undefined,
    performers: args.performers ? String(args.performers) : undefined,
  };

  if (args.datetime_local_gte) {
    query["datetime_local.gte"] = String(args.datetime_local_gte);
  }

  return sgFetch("/events", clientId, query);
}

// ─── seatgeek_get_event ───────────────────────────────────────────────────────

export async function seatgeekGetEvent(args: Record<string, unknown>): Promise<unknown> {
  const clientId = getClientId(args);
  if (!clientId) return { error: "SEATGEEK_CLIENT_ID env var (or client_id arg) is required." };

  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };

  return sgFetch(`/events/${id}`, clientId);
}

// ─── seatgeek_search_performers ───────────────────────────────────────────────

export async function seatgeekSearchPerformers(args: Record<string, unknown>): Promise<unknown> {
  const clientId = getClientId(args);
  if (!clientId) return { error: "SEATGEEK_CLIENT_ID env var (or client_id arg) is required." };

  return sgFetch("/performers", clientId, {
    q: args.q ? String(args.q) : undefined,
  });
}

// ─── seatgeek_get_performer ───────────────────────────────────────────────────

export async function seatgeekGetPerformer(args: Record<string, unknown>): Promise<unknown> {
  const clientId = getClientId(args);
  if (!clientId) return { error: "SEATGEEK_CLIENT_ID env var (or client_id arg) is required." };

  const id = String(args.id ?? "").trim();
  if (!id) return { error: "id is required." };

  return sgFetch(`/performers/${id}`, clientId);
}

// ─── seatgeek_search_venues ───────────────────────────────────────────────────

export async function seatgeekSearchVenues(args: Record<string, unknown>): Promise<unknown> {
  const clientId = getClientId(args);
  if (!clientId) return { error: "SEATGEEK_CLIENT_ID env var (or client_id arg) is required." };

  return sgFetch("/venues", clientId, {
    q:    args.q    ? String(args.q)    : undefined,
    city: args.city ? String(args.city) : undefined,
  });
}
