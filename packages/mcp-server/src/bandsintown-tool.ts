// ─── Bandsintown API Tool ─────────────────────────────────────────────────────
// Base URL: https://rest.bandsintown.com/
// Auth: app_id query param (public identifier, not a secret key).
// Pass app_id directly or set BANDSINTOWN_APP_ID.
// Docs: https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0
// No external dependencies - native fetch only.

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";

const BANDSINTOWN_BASE = "https://rest.bandsintown.com";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAppId(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("bandsintown", args);
}

const BANDSINTOWN_TIMEOUT_MS = Number(process.env.BANDSINTOWN_TIMEOUT_MS) || 10000;

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

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BANDSINTOWN_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { error: `Bandsintown request timed out after ${BANDSINTOWN_TIMEOUT_MS}ms.` };
    }
    return { error: `Network error: ${err instanceof Error ? err.message : String(err)}` };
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    return { error: `Bandsintown rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.` };
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return { error: `Non-JSON response (status ${response.status})`, status: response.status };
  }

  if (!response.ok) {
    const e = data as Record<string, unknown>;
    return { error: (e.message ?? `status ${response.status}`), status: response.status };
  }

  return data;
}

// ─── bandsintown_artist ────────────────────────────────────────────────────────

export async function bandsintownArtist(args: Record<string, unknown>): Promise<unknown> {
  const appId = getAppId(args);
  if (typeof appId !== "string") return appId;

  const artistName = String(args.artist_name ?? "").trim();
  if (!artistName) return { error: "artist_name is required." };

  return bitFetch(`/artists/${encodeURIComponent(artistName)}`, appId);
}

// ─── bandsintown_events ────────────────────────────────────────────────────────

export async function bandsintownEvents(args: Record<string, unknown>): Promise<unknown> {
  const appId = getAppId(args);
  if (typeof appId !== "string") return appId;

  const artistName = String(args.artist_name ?? "").trim();
  if (!artistName) return { error: "artist_name is required." };

  return bitFetch(`/artists/${encodeURIComponent(artistName)}/events`, appId, {
    date: args.date ? String(args.date) : undefined,
  });
}

// ─── bandsintown_recommended ───────────────────────────────────────────────────

export async function bandsintownRecommended(args: Record<string, unknown>): Promise<unknown> {
  const appId = getAppId(args);
  if (typeof appId !== "string") return appId;

  const artistName = String(args.artist_name ?? "").trim();
  if (!artistName) return { error: "artist_name is required." };

  const location = String(args.location ?? "").trim();
  if (!location) return { error: "location is required (e.g. 'Austin,TX' or '33.74,-84.39')." };

  return bitFetch(`/artists/${encodeURIComponent(artistName)}/recommended`, appId, {
    location,
  });
}
