// ─── eBird Bird Sightings ─────────────────────────────────────────────────────
// Cornell Lab of Ornithology eBird API v2.
// Auth: EBIRD_API_KEY env or api_key arg (X-eBirdApiToken header).
// Docs: https://documenter.getpostman.com/view/664302/S1ENwy59

import { requireCredential } from "./connector-setup.js";
import { type NotConnectedResult } from "./connection-help.js";
import { stampMeta } from "./connector-meta.js";

const EBIRD_BASE = "https://api.ebird.org/v2";

// ─── API helper ──────────────────────────────────────────────────────────────

// Resolves the API key from args/env via the connector registry, or returns a
// guided not-connected card (returned, never thrown).
function requireKey(args: Record<string, unknown>): string | NotConnectedResult {
  return requireCredential("ebird", args);
}

const EBIRD_TIMEOUT_MS = Number(process.env.EBIRD_TIMEOUT_MS) || 10000;

async function ebirdFetch<T>(
  path: string,
  params: Record<string, string>,
  apiKey: string
): Promise<T> {
  const url = new URL(`${EBIRD_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") url.searchParams.set(k, v);
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), EBIRD_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url.toString(), {
      headers: {
        "X-eBirdApiToken": apiKey,
        "Accept":          "application/json",
      },
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`eBird API request timed out after ${EBIRD_TIMEOUT_MS}ms.`);
    }
    throw new Error(`eBird API network error: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 429) {
    const retryAfter = res.headers.get("Retry-After");
    throw new Error(`eBird API rate limit reached (HTTP 429)${retryAfter ? `, retry after ${retryAfter}s` : ""}.`);
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`eBird API HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

// ─── Operations ──────────────────────────────────────────────────────────────

export async function getRecentObservations(
  args: Record<string, unknown>
): Promise<unknown> {
  const apiKey     = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const regionCode = String((args.regionCode ?? args.region_code) ?? "").trim().toUpperCase();
  if (!regionCode) throw new Error("region_code is required (e.g. 'US-NY', 'GB', 'AU-NSW').");

  const back   = String(Math.min(30, Math.max(1, Number(args.back ?? 7))));
  const maxResults = String(Math.min(10000, Math.max(1, Number((args.maxResults ?? args.max_results) ?? 100))));

  const params: Record<string, string> = { back, maxResults };
  if (args.species_code) params.speciesCode = String(args.species_code);

  interface Observation {
    speciesCode: string;
    comName:     string;
    sciName:     string;
    locName:     string;
    locId:       string;
    obsDt:       string;
    howMany:     number;
    lat:         number;
    lng:         number;
    obsValid:    boolean;
    obsReviewed: boolean;
  }

  const data = await ebirdFetch<Observation[]>(
    `/data/obs/${regionCode}/recent`,
    params,
    apiKey
  );

  return stampMeta({
    region_code: regionCode,
    back_days:   Number(back),
    count:       data.length,
    observations: data.map((o) => ({
      species_code: o.speciesCode,
      common_name:  o.comName,
      sci_name:     o.sciName,
      location:     o.locName,
      location_id:  o.locId,
      date:         o.obsDt,
      count:        o.howMany ?? null,
      lat:          o.lat,
      lon:          o.lng,
      valid:        o.obsValid,
      reviewed:     o.obsReviewed,
    })),
  }, {
    source: "eBird (Cornell Lab)",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use ebird_notable_observations for rare sightings, or ebird_species_info for a species."],
  });
}

export async function getNotableObservations(
  args: Record<string, unknown>
): Promise<unknown> {
  const apiKey     = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const regionCode = String((args.regionCode ?? args.region_code) ?? "").trim().toUpperCase();
  if (!regionCode) throw new Error("region_code is required (e.g. 'US-NY', 'GB').");

  const back       = String(Math.min(30, Math.max(1, Number(args.back ?? 7))));
  const maxResults = String(Math.min(10000, Math.max(1, Number(args.max_results ?? 50))));
  const detail     = args.detail === "full" ? "full" : "simple";

  interface NotableObs {
    speciesCode: string;
    comName:     string;
    sciName:     string;
    locName:     string;
    locId:       string;
    obsDt:       string;
    howMany:     number;
    lat:         number;
    lng:         number;
    obsValid:    boolean;
    obsReviewed: boolean;
  }

  const data = await ebirdFetch<NotableObs[]>(
    `/data/obs/${regionCode}/recent/notable`,
    { back, maxResults, detail },
    apiKey
  );

  return {
    region_code:   regionCode,
    back_days:     Number(back),
    count:         data.length,
    notable_birds: data.map((o) => ({
      species_code: o.speciesCode,
      common_name:  o.comName,
      sci_name:     o.sciName,
      location:     o.locName,
      location_id:  o.locId,
      date:         o.obsDt,
      count:        o.howMany ?? null,
      lat:          o.lat,
      lon:          o.lng,
      reviewed:     o.obsReviewed,
    })),
  };
}

export async function getSpeciesInfo(
  args: Record<string, unknown>
): Promise<unknown> {
  const apiKey      = requireKey(args);
  if (typeof apiKey !== "string") return apiKey;
  const speciesCode = String((args.speciesCode ?? args.species_code) ?? "").trim().toLowerCase();
  const locale      = String(args.locale ?? "en").trim();

  const params: Record<string, string> = { locale };
  if (speciesCode) params.species = speciesCode;

  interface TaxonEntry {
    sciName:     string;
    comName:     string;
    speciesCode: string;
    category:    string;
    taxonOrder:  number;
    familyCode:  string;
    familyComName: string;
    order:       string;
    familySciName: string;
    reportAs:    string;
  }

  const data = await ebirdFetch<TaxonEntry[]>(
    "/ref/taxonomy/ebird",
    params,
    apiKey
  );

  if (data.length === 0) {
    return { error: `No taxonomy found for species_code: "${speciesCode}".` };
  }

  return {
    count:   data.length,
    species: data.slice(0, 50).map((t) => ({
      species_code:    t.speciesCode,
      common_name:     t.comName,
      sci_name:        t.sciName,
      category:        t.category,
      taxon_order:     t.taxonOrder,
      order:           t.order       ?? null,
      family_sci_name: t.familySciName ?? null,
      family_com_name: t.familyComName ?? null,
      family_code:     t.familyCode   ?? null,
    })),
  };
}

// ─── Public dispatcher ────────────────────────────────────────────────────────

export async function ebirdAction(
  action: string,
  args:   Record<string, unknown>
): Promise<unknown> {
  switch (action) {
    case "get_recent_observations":  return getRecentObservations(args);
    case "get_notable_observations": return getNotableObservations(args);
    case "get_species_info":         return getSpeciesInfo(args);
    default:
      return {
        error:
          `Unknown eBird action: "${action}". ` +
          "Valid: get_recent_observations, get_notable_observations, get_species_info.",
      };
  }
}
